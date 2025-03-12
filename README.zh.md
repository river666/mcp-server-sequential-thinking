# 顺序思维 MCP 服务器

[Switch to English](README.md) | [切换到英文](README.md)

这是一个 MCP 服务器实现，提供一个动态和反思性问题解决的工具，通过结构化思维过程。

## 特性

- 将复杂问题分解为可管理的步骤
- 随着理解的加深，修订和完善思路
- 分支到替代推理路径
- 动态调整思维总数
- 生成和验证解决假设

## 工具

### sequential_thinking

促进详细的逐步思维过程，用于问题解决和分析。

**输入：**
- `thought` (字符串)：当前思维步骤
- `nextThoughtNeeded` (布尔值)：是否需要另一个思维步骤
- `thoughtNumber` (整数)：当前思维编号
- `totalThoughts` (整数)：估计所需的总思维数
- `isRevision` (布尔值，可选)：是否修订之前的思维
- `revisesThought` (整数，可选)：正在重新考虑的思维
- `branchFromThought` (整数，可选)：分支点思维编号
- `branchId` (字符串，可选)：分支标识符
- `needsMoreThoughts` (布尔值，可选)：是否需要更多思维

## 用法

顺序思维工具旨在：
- 将复杂问题分解为步骤
- 规划和设计时留有修订空间
- 可能需要调整方向的分析
- 全面范围可能最初不清晰的问题
- 需要在多个步骤中保持上下文的任务
- 需要过滤掉无关信息的情况

## 配置

### 与 Claude Desktop 一起使用

将以下内容添加到你的 `claude_desktop_config.json`：

#### npx

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
  }
}
```

#### docker

```json
{
  "mcpServers": {
    "sequentialthinking": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/sequentialthinking"
      ]
    }
  }
}
```

### 与 Cursor IDE 一起使用

要将顺序思维 MCP 服务器与 Cursor IDE 集成，可以使用以下方法之一：

#### 本地构建方法

首先在本地构建项目：

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

然后在 Cursor 设置中配置（JSON）：

```json
{
  "mcpServers": {
    "sequentialthinking": {
      "command": "node",
      "args": [
        "/absolute/path/to/sequentialthinking/dist/index.js"
      ]
    }
  }
}
```

#### Docker 方法

构建 Docker 镜像：

```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

在 Cursor 设置中配置（JSON）：

```json
{
  "mcpServers": {
    "sequentialthinking": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "mcp/sequentialthinking"
      ]
    }
  }
}
```

#### 环境变量方法

创建启动脚本：

```bash
#!/bin/sh
export CURSOR_MCP_CONFIG=/path/to/your/mcp_config.json
open -a Cursor
```

其中 `mcp_config.json` 包含：

```json
{
  "mcpServers": {
    "sequentialthinking": {
      "command": "node",
      "args": [
        "/absolute/path/to/sequentialthinking/dist/index.js"
      ]
    }
  }
}
```

使用 `chmod +x start_cursor_with_mcp.sh` 使脚本可执行，并运行它以启动带有 MCP 配置的 Cursor。

**注意**：MCP 集成主要在 Cursor IDE 的 Composer 功能中支持。

## 构建

### 本地构建

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

### Docker

```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

## 故障排除

如果你在使用 npx 方法时遇到问题，请尝试以下方法：

1. 使用本地构建方法并提供构建的 JavaScript 文件的绝对路径
2. 确保文件权限设置正确：`chmod +x dist/index.js`
3. 尝试 Docker 方法作为替代
4. 检查 Cursor 的文档或社区论坛以获取最新的 MCP 集成方法

## 许可证

本项目根据 MIT 许可证进行许可 - 详见 [LICENSE](LICENSE) 文件。

## 源码

本项目基于 [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) 的源代码。 