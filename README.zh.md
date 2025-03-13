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
        "@zengwenliang0416/mcp-server-sequential-thinking"
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

### 与 Cursor IDE 一起使用

<details>
<summary>📦 NPX 方法（推荐）</summary>

1. 安装包：
```bash
# 全局安装
npm install -g @zengwenliang0416/mcp-server-sequential-thinking

# 或直接使用 NPX
npx -y @zengwenliang0416/mcp-server-sequential-thinking
```

2. 在 Cursor 设置中配置（JSON）：
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
<summary>💻 本地构建方法</summary>

1. 首先在本地构建项目：
```bash
cd /path/to/sequential-thinking
npm install
npm run build
```

2. 在 Cursor 设置中配置（JSON）：
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
<summary>🐳 Docker 方法</summary>

1. 构建 Docker 镜像：
```bash
docker build -t zengwenliang0416/mcp-server-sequential-thinking .
```

2. 在 Cursor 设置中配置（JSON）：
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
    "sequential-thinking": {
      "command": "node",
      "args": [
        "/absolute/path/to/sequential-thinking/dist/index.js"
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
cd /path/to/sequential-thinking
npm install
npm run build
```
</details>

<details>
<summary>Docker 构建</summary>

```bash
# 构建 Docker 镜像
docker build -t zengwenliang0416/mcp-server-sequential-thinking .

# 验证构建结果
docker images | grep sequential-thinking
```
</details>

## 📦 发布

本节说明如何将包发布到 npm 注册表。

### 前提条件

1. **Node.js 和 npm**：确保已安装 Node.js 和 npm
2. **npm 账号**：您需要一个 npm 账号才能发布包
3. **组织**：对于作用域包（例如 `@zengwenliang0416/mcp-server-sequential-thinking`），您需要是该组织的成员

### 步骤 1：更新包信息

确保您的 `package.json` 包含正确的信息：

```json
{
  "name": "@zengwenliang0416/mcp-server-sequential-thinking",
  "version": "0.6.2",
  "description": "MCP server for sequential thinking and problem solving",
  // 其他字段...
}
```

### 步骤 2：切换到官方 npm 注册表

如果您使用的是镜像注册表（如 npmmirror.com），请切换到官方 npm 注册表：

```bash
npm config set registry https://registry.npmjs.org/
```

### 步骤 3：登录到 npm

```bash
npm login
```

按照提示通过浏览器登录。

### 步骤 4：创建或加入组织

对于作用域包，您需要是组织的一部分：

```bash
# 检查您是否是组织的成员
npm org ls 您的组织名称

# 如果不是，可以通过 npm 网站创建新组织
# 或请组织管理员将您添加进来
```

### 步骤 5：构建包

```bash
npm run build
```

### 步骤 6：发布包

```bash
# 首次发布作用域包
npm publish --access public

# 后续更新
npm publish
```

### 步骤 7：验证发布

```bash
npm view @zengwenliang0416/mcp-server-sequential-thinking
```

### 步骤 8：提交您的更改

```bash
git add .
git commit -m "feat(publish): 🚀 发布npm包@zengwenliang0416/mcp-server-sequential-thinking"
git push
```

### 更新包

要更新包：

1. 对代码进行更改
2. 按照[语义化版本](https://semver.org/)更新 `package.json` 中的版本
   ```bash
   # 补丁更新（错误修复）
   npm version patch
   
   # 次要更新（新功能，向后兼容）
   npm version minor
   
   # 主要更新（破坏性变更）
   npm version major
   ```
3. 再次构建和发布
   ```bash
   npm run build
   npm publish
   ```

## 🔐 CI/CD 密钥配置

本节说明如何配置通过 GitHub Actions 自动发布所需的密钥。

### GitHub Actions 密钥

要启用自动发布到 npm 和 Docker Hub，您需要在 GitHub 仓库中添加以下密钥：

#### 1. 创建 NPM 访问令牌 (NPM_TOKEN)

1. 登录您的 npm 账户：https://www.npmjs.com/login
2. 点击右上角的个人头像，然后选择"Access Tokens"
3. 点击"Generate New Token"按钮
4. **重要**：对于 GitHub Actions，请选择"Automation"类型的令牌（不是"Publish"）以绕过 OTP 要求
5. 填写令牌描述（例如："GitHub Actions"）
6. 点击"Generate Token"按钮
7. **重要**：立即复制生成的令牌！它只会显示一次

> **双因素认证用户注意**：如果您在 npm 账户上启用了双因素认证(2FA)，您必须：
> - 使用"Automation"类型的令牌（推荐）
> - 将双因素认证设置更改为"仅登录时验证"（不推荐）
> - 手动发布包（无法自动化）

#### 2. 获取 Docker Hub 凭据

如果您还没有 Docker Hub 账号，请先注册：https://hub.docker.com/signup

1. 登录您的 Docker Hub 账号
2. 点击右上角的用户名，然后选择"Account Settings"
3. 在左侧导航栏中选择"Security"
4. 点击"New Access Token"
5. 填写描述并选择适当的权限（至少需要"Read & Write"权限）
6. 点击"Generate"按钮
7. **重要**：立即复制生成的令牌！它只会显示一次

#### 3. 在 GitHub 仓库中添加密钥

1. 前往您的 GitHub 仓库：https://github.com/Zengwenliang0416/mcp-server-sequential-thinking
2. 点击"Settings"选项卡
3. 在左侧导航栏中，点击"Secrets and variables"然后选择"Actions"
4. 点击"New repository secret"按钮
5. 添加以下密钥（一次添加一个）：

   a. **NPM_TOKEN**：
   - 名称：`NPM_TOKEN`
   - 值：[粘贴您之前复制的 npm 访问令牌]
   - 点击"Add secret"

   b. **DOCKERHUB_USERNAME**：
   - 名称：`DOCKERHUB_USERNAME`
   - 值：[您的 Docker Hub 用户名]
   - 点击"Add secret"

   c. **DOCKERHUB_TOKEN**：
   - 名称：`DOCKERHUB_TOKEN`
   - 值：[粘贴您之前复制的 Docker Hub 访问令牌]
   - 点击"Add secret"

#### 4. 验证密钥添加

添加完所有密钥后，您应该在"Actions secrets"列表中看到 3 个密钥：
- NPM_TOKEN
- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN

#### 5. 手动触发工作流测试（可选）

要测试自动发布工作流：

1. 在您的 GitHub 仓库中，点击"Actions"选项卡
2. 在左侧找到"Publish Package"工作流
3. 点击"Run workflow"按钮
4. 从分支下拉菜单中选择"main"分支
5. 点击绿色的"Run workflow"按钮

这将触发您的发布工作流程。您可以在 Actions 标签页中监控其进度和结果。

## ❗ 故障排除

如果你在使用 npx 方法时遇到问题，请尝试以下方法：

1. 🔧 使用本地构建方法并提供构建的 JavaScript 文件的绝对路径
2. 📝 确保文件权限设置正确：`chmod +x dist/index.js`
3. 🐳 尝试 Docker 方法作为替代
4. 📚 检查 Cursor 的文档或社区论坛以获取最新的 MCP 集成方法

## 📄 许可证

本项目根据 MIT 许可证进行许可 - 详见 [LICENSE](LICENSE) 文件。

## 🔗 源码

本项目基于 [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) 的源代码，并在 [Zengwenliang0416/mcp-server-sequential-thinking](https://github.com/Zengwenliang0416/mcp-server-sequential-thinking) 维护。 