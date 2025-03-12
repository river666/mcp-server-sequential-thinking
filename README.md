# Sequential Thinking MCP Server

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-Node.js-green.svg)](https://nodejs.org/)

[Switch to Chinese](README.zh.md) | [切换到中文](README.zh.md)

</div>

## 📖 Overview

An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process. This server helps break down complex problems into manageable steps while maintaining flexibility for revisions and alternative paths.

## ✨ Features

- 🔍 Break down complex problems into manageable steps
- 🔄 Revise and refine thoughts as understanding deepens
- 🌲 Branch into alternative paths of reasoning
- 📊 Adjust the total number of thoughts dynamically
- ✅ Generate and verify solution hypotheses

## 🛠 Tool

### sequential_thinking

Facilitates a detailed, step-by-step thinking process for problem-solving and analysis.

#### Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `thought` | string | Yes | The current thinking step |
| `nextThoughtNeeded` | boolean | Yes | Whether another thought step is needed |
| `thoughtNumber` | integer | Yes | Current thought number |
| `totalThoughts` | integer | Yes | Estimated total thoughts needed |
| `isRevision` | boolean | No | Whether this revises previous thinking |
| `revisesThought` | integer | No | Which thought is being reconsidered |
| `branchFromThought` | integer | No | Branching point thought number |
| `branchId` | string | No | Branch identifier |
| `needsMoreThoughts` | boolean | No | If more thoughts are needed |

## 🎯 Usage

The Sequential Thinking tool is designed for:

- 📝 Breaking down complex problems into steps
- 🎨 Planning and design with room for revision
- 🔄 Analysis that might need course correction
- 🌐 Problems where the full scope might not be clear initially
- 📚 Tasks that need to maintain context over multiple steps
- 🔍 Situations where irrelevant information needs to be filtered out

## ⚙️ Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

<details>
<summary>📦 NPX Configuration</summary>

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
<summary>🐳 Docker Configuration</summary>

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

### Usage with Cursor IDE

<details>
<summary>💻 Local Build Method</summary>

1. Build the project locally first:
```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

2. Configure in Cursor settings (JSON):
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
<summary>🐳 Docker Method</summary>

1. Build Docker image:
```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

2. Configure in Cursor settings (JSON):
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
<summary>🔧 Environment Variables Method</summary>

1. Create a startup script:
```bash
#!/bin/sh
export CURSOR_MCP_CONFIG=/path/to/your/mcp_config.json
open -a Cursor
```

2. Add configuration to `mcp_config.json`:
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

3. Make the script executable:
```bash
chmod +x start_cursor_with_mcp.sh
```

> **Note**: The MCP integration is primarily supported in the Composer feature of Cursor IDE.
</details>

## 🚀 Building

<details>
<summary>Local Build</summary>

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```
</details>

<details>
<summary>Docker Build</summary>

```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```
</details>

## ❗ Troubleshooting

If you encounter issues with the npx method, try the following:

1. 🔧 Use the local build method and provide the absolute path to the built JavaScript file
2. 📝 Ensure file permissions are set correctly: `chmod +x dist/index.js`
3. 🐳 Try the Docker method as an alternative
4. 📚 Check Cursor's documentation or community forums for the latest MCP integration methods

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Source Code

This project is based on the source code from [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers).
