# 顺序思维 MCP 服务器

<div align="center">

[![License: MIT](https://img.shields.io/badge/许可证-MIT-yellow.svg)](LICENSE)
[![Language](https://img.shields.io/badge/开发语言-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/运行环境-Node.js-green.svg)](https://nodejs.org/)

[Switch to English](README.md) | [切换到英文](README.md)

</div>

## 📖 概述

这是一个 MCP 服务器实现，提供一个动态和反思性问题解决的工具，通过结构化思维过程。该服务器帮助将复杂问题分解为可管理的步骤，同时保持修订和替代路径的灵活性。

## ✨ 特性

- 🔍 将复杂问题分解为可管理的步骤
- 🔄 随着理解的加深，修订和完善思路
- 🌲 分支到替代推理路径
- 📊 动态调整思维总数
- ✅ 生成和验证解决假设

## 🛠 工具

### sequential_thinking

促进详细的逐步思维过程，用于问题解决和分析。

#### 输入参数

| 参数 | 类型 | 必需 | 描述 |
|-----------|------|----------|-------------|
| `thought` | 字符串 | 是 | 当前思维步骤 |
| `nextThoughtNeeded` | 布尔值 | 是 | 是否需要另一个思维步骤 |
| `thoughtNumber` | 整数 | 是 | 当前思维编号 |
| `totalThoughts` | 整数 | 是 | 估计所需的总思维数 |
| `isRevision` | 布尔值 | 否 | 是否修订之前的思维 |
| `revisesThought` | 整数 | 否 | 正在重新考虑的思维 |
| `branchFromThought` | 整数 | 否 | 分支点思维编号 |
| `branchId` | 字符串 | 否 | 分支标识符 |
| `needsMoreThoughts` | 布尔值 | 否 | 是否需要更多思维 |

## 🎯 用途

顺序思维工具旨在：

- 📝 将复杂问题分解为步骤
- 🎨 规划和设计时留有修订空间
- 🔄 可能需要调整方向的分析
- 🌐 全面范围可能最初不清晰的问题
- 📚 需要在多个步骤中保持上下文的任务
- 🔍 需要过滤掉无关信息的情况

## ⚙️ 配置

### 与 Claude Desktop 一起使用

将以下内容添加到你的 `claude_desktop_config.json`：

<details>
<summary>📦 NPX 配置</summary>

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
</details>

<details>
<summary>🐳 Docker 配置</summary>

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
</details>

### 与 Cursor IDE 一起使用

<details>
<summary>💻 本地构建方法</summary>

1. 首先在本地构建项目：
```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

2. 在 Cursor 设置中配置（JSON）：
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
</details>

<details>
<summary>🐳 Docker 方法</summary>

1. 构建 Docker 镜像：
```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

2. 在 Cursor 设置中配置（JSON）：
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
</details>

<details>
<summary>🔧 环境变量方法</summary>

1. 创建启动脚本：
```bash
#!/bin/sh
export CURSOR_MCP_CONFIG=/path/to/your/mcp_config.json
open -a Cursor
```

2. 在 `mcp_config.json` 中添加配置：
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

3. 使脚本可执行：
```bash
chmod +x start_cursor_with_mcp.sh
```

> **注意**：MCP 集成主要在 Cursor IDE 的 Composer 功能中支持。
</details>

## 🚀 构建

<details>
<summary>本地构建</summary>

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```
</details>

<details>
<summary>Docker 构建</summary>

```bash
# 构建 Docker 镜像
docker build -t mcp/sequentialthinking .

# 验证构建结果
docker images | grep sequentialthinking
```
</details>

## ❗ 故障排除

如果你在使用 npx 方法时遇到问题，请尝试以下方法：

1. 🔧 使用本地构建方法并提供构建的 JavaScript 文件的绝对路径
2. 📝 确保文件权限设置正确：`chmod +x dist/index.js`
3. 🐳 尝试 Docker 方法作为替代
4. 📚 检查 Cursor 的文档或社区论坛以获取最新的 MCP 集成方法

## 📄 许可证

本项目根据 MIT 许可证进行许可 - 详见 [LICENSE](LICENSE) 文件。

## 🔗 源码

本项目基于 [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) 的源代码。 