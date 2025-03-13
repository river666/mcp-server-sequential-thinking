# 顺序思维 MCP 服务器

<div align="center">

[![License: MIT](https://img.shields.io/badge/许可证-MIT-yellow.svg)](LICENSE)
[![Language](https://img.shields.io/badge/开发语言-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/运行环境-Node.js-green.svg)](https://nodejs.org/)

[English](README.md) | [中文](README.zh.md)

</div>

## 📖 概述

一个强大的MCP服务器，实现了顺序思维协议，提供结构化的问题解决方法。该服务器帮助将复杂问题分解为可管理的步骤，同时保持修订和替代推理路径的灵活性。

## ✨ 特性

- 🔍 **结构化分析** - 将复杂问题分解为可管理的步骤
- 🔄 **迭代改进** - 随着理解的加深，修订和完善思路
- 🌲 **多路径思考** - 分支到替代推理路径
- 📊 **动态调整** - 根据需要调整思考步骤总数
- ✅ **解决方案验证** - 生成和验证解决方案假设

## 🛠️ 工具接口

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

## 🎯 适用场景

顺序思维工具特别适合：

- 📝 需要逐步分解的复杂问题
- 🎨 需要迭代改进的规划和设计项目
- 🔄 可能需要调整方向的分析工作流
- 🌐 初始范围不完全清晰的情境
- 📚 需要在多个步骤中保持上下文的任务
- 🔍 从复杂场景中过滤无关信息

## ⚙️ 集成方法

### 与 Claude Desktop 集成

<details>
<summary><b>📦 NPX 配置</b></summary>

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@zengwenliang0416/mcp-server-sequential-thinking"
      ]
    }
  }
}
```
</details>

<details>
<summary><b>🐳 Docker 配置</b></summary>

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "zengwenliang0416/mcp-server-sequential-thinking"
      ]
    }
  }
}
```
</details>

### 与 Cursor IDE 集成

<details>
<summary><b>📦 NPX 方法（推荐）</b></summary>

```bash
# 全局安装
npm install -g @zengwenliang0416/mcp-server-sequential-thinking

# 或直接使用 NPX
npx -y @zengwenliang0416/mcp-server-sequential-thinking
```

在 Cursor 设置中配置（JSON）：
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@zengwenliang0416/mcp-server-sequential-thinking"
      ]
    }
  }
}
```
</details>

<details>
<summary><b>💻 本地构建方法</b></summary>

本地构建：
```bash
cd /path/to/sequential-thinking
npm install
npm run build
```

在 Cursor 设置中配置（JSON）：
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "node",
      "args": [
        "/absolute/path/to/sequential-thinking/dist/index.js"
      ]
    }
  }
}
```
</details>

<details>
<summary><b>🐳 Docker 方法</b></summary>

```bash
# 构建 Docker 镜像
docker build -t zengwenliang0416/mcp-server-sequential-thinking .
```

在 Cursor 设置中配置（JSON）：
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "zengwenliang0416/mcp-server-sequential-thinking"
      ]
    }
  }
}
```
</details>

<details>
<summary><b>🔧 环境变量方法</b></summary>

创建启动脚本：
```bash
#!/bin/sh
export CURSOR_MCP_CONFIG=/path/to/your/mcp_config.json
open -a Cursor
```

在 `mcp_config.json` 中添加配置：
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "node",
      "args": [
        "/absolute/path/to/sequential-thinking/dist/index.js"
      ]
    }
  }
}
```

使脚本可执行：
```bash
chmod +x start_cursor_with_mcp.sh
```

> **注意**：MCP 集成主要在 Cursor IDE 的 Composer 功能中支持。
</details>

## 🚀 从源码构建

<details>
<summary><b>本地构建</b></summary>

```bash
git clone https://github.com/Zengwenliang0416/mcp-server-sequential-thinking.git
cd mcp-server-sequential-thinking
npm install
npm run build
```
</details>

<details>
<summary><b>Docker 构建</b></summary>

```bash
git clone https://github.com/Zengwenliang0416/mcp-server-sequential-thinking.git
cd mcp-server-sequential-thinking
docker build -t zengwenliang0416/mcp-server-sequential-thinking .
```
</details>

## 📦 发布指南

<details>
<summary><b>发布到 npm</b></summary>

### 前提条件

- 已安装 Node.js 和 npm
- 拥有可访问 @zengwenliang0416 作用域的 npm 账号
- 本地已构建的包

### 发布步骤

1. **更新 package.json 中的版本**
   ```json
   {
     "name": "@zengwenliang0416/mcp-server-sequential-thinking",
     "version": "0.6.2",
     "description": "MCP server for sequential thinking and problem solving"
   }
   ```

2. **使用官方 npm 注册表**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

3. **登录 npm**
   ```bash
   npm login
   ```

4. **构建并发布**
   ```bash
   npm run build
   npm publish --access public
   ```

5. **验证发布**
   ```bash
   npm view @zengwenliang0416/mcp-server-sequential-thinking
   ```

### 版本更新

使用语义化版本：
```bash
# 补丁更新（错误修复）
npm version patch

# 次要更新（新功能）
npm version minor

# 主要更新（破坏性变更）
npm version major
```
</details>

## 🔐 CI/CD 配置

<details>
<summary><b>设置 GitHub Actions</b></summary>

### 所需密钥

添加这些密钥到您的仓库设置：

1. **NPM_TOKEN**
   - 在 npm 生成：账户 → 访问令牌 → 选择"Automation"令牌类型
   - 双因素认证用户注意：必须使用"Automation"令牌

2. **DOCKERHUB_USERNAME**
   - 您的 Docker Hub 用户名

3. **DOCKERHUB_TOKEN**
   - 在 Docker Hub 生成：账户设置 → 安全 → 新访问令牌

### 添加密钥到 GitHub

1. 进入仓库设置 → Secrets and variables → Actions
2. 逐个添加每个密钥
3. 在 Actions 标签页手动触发工作流测试

> **双因素认证用户注意**：如果您在 npm 账户上启用了双因素认证(2FA)，您必须：
> - 使用"Automation"类型的令牌（推荐）
> - 将双因素认证设置更改为"仅登录时验证"（不推荐）
> - 手动发布包（无法自动化）
</details>

## ❗ 故障排除

如果您遇到集成问题：

1. 🔧 使用本地构建方法，提供 JS 文件的绝对路径
2. 📝 确认文件权限：`chmod +x dist/index.js`
3. 🐳 尝试使用 Docker 作为替代方案
4. 📚 查阅 Cursor 文档了解最新的 MCP 集成方法

## 📄 许可证

本项目根据 MIT 许可证进行许可 - 详见 [LICENSE](LICENSE) 文件。

## 🔗 源码

基于 [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) 的源代码，并在 [Zengwenliang0416/mcp-server-sequential-thinking](https://github.com/Zengwenliang0416/mcp-server-sequential-thinking) 维护。 