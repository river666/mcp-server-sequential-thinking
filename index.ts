#!/usr/bin/env node
// 这是一个 shebang 指令，告诉系统使用 node 来执行此脚本

// 导入 MCP SDK 相关的模块和类型
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
// 导入 chalk 用于在控制台输出彩色文本
import chalk from 'chalk';

/**
 * 定义思考数据的接口
 * 这个接口描述了一个思考步骤的所有属性
 */
interface ThoughtData {
  thought: string;              // 当前思考的内容
  thoughtNumber: number;        // 当前思考的序号
  totalThoughts: number;        // 估计的总思考步骤数
  isRevision?: boolean;         // 是否修改之前的思考（可选）
  revisesThought?: number;      // 修改的是哪个思考（可选）
  branchFromThought?: number;   // 从哪个思考分支出来的（可选）
  branchId?: string;            // 分支标识符（可选）
  needsMoreThoughts?: boolean;  // 是否需要更多思考（可选）
  nextThoughtNeeded: boolean;   // 是否需要下一个思考步骤
}

/**
 * 顺序思考服务器类
 * 负责处理和管理思考步骤的核心逻辑
 */
class SequentialThinkingServer {
  // 存储所有思考步骤的历史记录
  private thoughtHistory: ThoughtData[] = [];
  // 存储不同分支的思考步骤，键为分支ID，值为该分支下的思考步骤数组
  private branches: Record<string, ThoughtData[]> = {};

  /**
   * 验证输入的思考数据是否有效
   * @param input 未经验证的输入数据
   * @returns 验证后的思考数据对象
   * @throws 如果数据无效则抛出错误
   */
  private validateThoughtData(input: unknown): ThoughtData {
    const data = input as Record<string, unknown>;

    // 验证必填字段是否存在且类型正确
    if (!data.thought || typeof data.thought !== 'string') {
      throw new Error('Invalid thought: must be a string');
    }
    if (!data.thoughtNumber || typeof data.thoughtNumber !== 'number') {
      throw new Error('Invalid thoughtNumber: must be a number');
    }
    if (!data.totalThoughts || typeof data.totalThoughts !== 'number') {
      throw new Error('Invalid totalThoughts: must be a number');
    }
    if (typeof data.nextThoughtNeeded !== 'boolean') {
      throw new Error('Invalid nextThoughtNeeded: must be a boolean');
    }

    // 返回验证后的思考数据对象，包括可选字段
    return {
      thought: data.thought,
      thoughtNumber: data.thoughtNumber,
      totalThoughts: data.totalThoughts,
      nextThoughtNeeded: data.nextThoughtNeeded,
      isRevision: data.isRevision as boolean | undefined,
      revisesThought: data.revisesThought as number | undefined,
      branchFromThought: data.branchFromThought as number | undefined,
      branchId: data.branchId as string | undefined,
      needsMoreThoughts: data.needsMoreThoughts as boolean | undefined,
    };
  }

  /**
   * 格式化思考步骤，生成美观的控制台输出
   * @param thoughtData 思考数据对象
   * @returns 格式化后的字符串，用于控制台显示
   */
  private formatThought(thoughtData: ThoughtData): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;

    let prefix = '';
    let context = '';

    // 根据思考类型设置不同的前缀和上下文信息
    if (isRevision) {
      // 如果是修改之前的思考，使用黄色文本和🔄图标
      prefix = chalk.yellow('🔄 Revision');
      context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
      // 如果是从某个思考分支出来的，使用绿色文本和🌿图标
      prefix = chalk.green('🌿 Branch');
      context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
      // 如果是普通思考，使用蓝色文本和💭图标
      prefix = chalk.blue('💭 Thought');
      context = '';
    }

    // 创建思考步骤的标题
    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    // 创建边框，边框长度与标题或思考内容的最大长度相匹配
    const border = '─'.repeat(Math.max(header.length, thought.length) + 4);

    // 返回格式化后的思考步骤，包含边框和内容
    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${thought.padEnd(border.length - 2)} │
└${border}┘`;
  }

  /**
   * 处理思考步骤输入并返回结果
   * @param input 输入的思考数据
   * @returns 包含响应内容的对象，或包含错误信息的对象
   */
  public processThought(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      // 验证输入数据
      const validatedInput = this.validateThoughtData(input);

      // 如果当前思考序号超过了估计的总数，则更新总数
      if (validatedInput.thoughtNumber > validatedInput.totalThoughts) {
        validatedInput.totalThoughts = validatedInput.thoughtNumber;
      }

      // 将思考步骤添加到历史记录
      this.thoughtHistory.push(validatedInput);

      // 如果是分支思考，将其添加到相应的分支集合中
      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) {
          this.branches[validatedInput.branchId] = [];
        }
        this.branches[validatedInput.branchId].push(validatedInput);
      }

      // 格式化思考步骤并输出到控制台
      const formattedThought = this.formatThought(validatedInput);
      console.error(formattedThought);

      // 返回处理结果，包含当前思考状态的JSON
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            thoughtNumber: validatedInput.thoughtNumber,
            totalThoughts: validatedInput.totalThoughts,
            nextThoughtNeeded: validatedInput.nextThoughtNeeded,
            branches: Object.keys(this.branches),
            thoughtHistoryLength: this.thoughtHistory.length
          }, null, 2)
        }]
      };
    } catch (error) {
      // 如果处理过程中出现错误，返回错误信息
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            status: 'failed'
          }, null, 2)
        }],
        isError: true
      };
    }
  }
}

/**
 * 定义顺序思考工具
 * 这是提供给MCP客户端使用的工具定义
 */
const SEQUENTIAL_THINKING_TOOL: Tool = {
  name: "sequentialthinking",
  description: `A detailed tool for dynamic and reflective problem-solving through thoughts.
This tool helps analyze problems through a flexible thinking process that can adapt and evolve.
Each thought can build on, question, or revise previous insights as understanding deepens.

When to use this tool:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope might not be clear initially
- Problems that require a multi-step solution
- Tasks that need to maintain context over multiple steps
- Situations where irrelevant information needs to be filtered out

Key features:
- You can adjust total_thoughts up or down as you progress
- You can question or revise previous thoughts
- You can add more thoughts even after reaching what seemed like the end
- You can express uncertainty and explore alternative approaches
- Not every thought needs to build linearly - you can branch or backtrack
- Generates a solution hypothesis
- Verifies the hypothesis based on the Chain of Thought steps
- Repeats the process until satisfied
- Provides a correct answer

Parameters explained:
- thought: Your current thinking step, which can include:
* Regular analytical steps
* Revisions of previous thoughts
* Questions about previous decisions
* Realizations about needing more analysis
* Changes in approach
* Hypothesis generation
* Hypothesis verification
- next_thought_needed: True if you need more thinking, even if at what seemed like the end
- thought_number: Current number in sequence (can go beyond initial total if needed)
- total_thoughts: Current estimate of thoughts needed (can be adjusted up/down)
- is_revision: A boolean indicating if this thought revises previous thinking
- revises_thought: If is_revision is true, which thought number is being reconsidered
- branch_from_thought: If branching, which thought number is the branching point
- branch_id: Identifier for the current branch (if any)
- needs_more_thoughts: If reaching end but realizing more thoughts needed

You should:
1. Start with an initial estimate of needed thoughts, but be ready to adjust
2. Feel free to question or revise previous thoughts
3. Don't hesitate to add more thoughts if needed, even at the "end"
4. Express uncertainty when present
5. Mark thoughts that revise previous thinking or branch into new paths
6. Ignore information that is irrelevant to the current step
7. Generate a solution hypothesis when appropriate
8. Verify the hypothesis based on the Chain of Thought steps
9. Repeat the process until satisfied with the solution
10. Provide a single, ideally correct answer as the final output
11. Only set next_thought_needed to false when truly done and a satisfactory answer is reached`,
  // 定义工具的输入模式，包括各个参数的类型和描述
  inputSchema: {
    type: "object",
    properties: {
      thought: {
        type: "string",
        description: "Your current thinking step"
      },
      nextThoughtNeeded: {
        type: "boolean",
        description: "Whether another thought step is needed"
      },
      thoughtNumber: {
        type: "integer",
        description: "Current thought number",
        minimum: 1
      },
      totalThoughts: {
        type: "integer",
        description: "Estimated total thoughts needed",
        minimum: 1
      },
      isRevision: {
        type: "boolean",
        description: "Whether this revises previous thinking"
      },
      revisesThought: {
        type: "integer",
        description: "Which thought is being reconsidered",
        minimum: 1
      },
      branchFromThought: {
        type: "integer",
        description: "Branching point thought number",
        minimum: 1
      },
      branchId: {
        type: "string",
        description: "Branch identifier"
      },
      needsMoreThoughts: {
        type: "boolean",
        description: "If more thoughts are needed"
      }
    },
    // 定义必填参数
    required: ["thought", "nextThoughtNeeded", "thoughtNumber", "totalThoughts"]
  }
};

/**
 * 创建 MCP 服务器实例
 * 配置服务器名称、版本和功能
 */
const server = new Server(
  {
    name: "sequential-thinking-server",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 创建顺序思考服务器实例
const thinkingServer = new SequentialThinkingServer();

/**
 * 设置处理列出工具请求的处理程序
 * 当客户端请求可用工具时，返回顺序思考工具
 */
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [SEQUENTIAL_THINKING_TOOL],
}));

/**
 * 设置处理调用工具请求的处理程序
 * 当客户端调用工具时，验证工具名称并转发请求到顺序思考服务器
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "sequentialthinking") {
    return thinkingServer.processThought(request.params.arguments);
  }

  // 如果工具名称不匹配，返回错误
  return {
    content: [{
      type: "text",
      text: `Unknown tool: ${request.params.name}`
    }],
    isError: true
  };
});

/**
 * 启动服务器的主函数
 * 使用标准输入/输出作为传输层
 */
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sequential Thinking MCP Server running on stdio");
}

// 调用主函数启动服务器，并捕获任何错误
runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
