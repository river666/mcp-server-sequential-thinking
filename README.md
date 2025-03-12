# Sequential Thinking MCP Server

An MCP server implementation that provides a tool for dynamic and reflective problem-solving through a structured thinking process.

## Features

- Break down complex problems into manageable steps
- Revise and refine thoughts as understanding deepens
- Branch into alternative paths of reasoning
- Adjust the total number of thoughts dynamically
- Generate and verify solution hypotheses

## Tool

### sequential_thinking

Facilitates a detailed, step-by-step thinking process for problem-solving and analysis.

**Inputs:**
- `thought` (string): The current thinking step
- `nextThoughtNeeded` (boolean): Whether another thought step is needed
- `thoughtNumber` (integer): Current thought number
- `totalThoughts` (integer): Estimated total thoughts needed
- `isRevision` (boolean, optional): Whether this revises previous thinking
- `revisesThought` (integer, optional): Which thought is being reconsidered
- `branchFromThought` (integer, optional): Branching point thought number
- `branchId` (string, optional): Branch identifier
- `needsMoreThoughts` (boolean, optional): If more thoughts are needed

## Usage

The Sequential Thinking tool is designed for:
- Breaking down complex problems into steps
- Planning and design with room for revision
- Analysis that might need course correction
- Problems where the full scope might not be clear initially
- Tasks that need to maintain context over multiple steps
- Situations where irrelevant information needs to be filtered out

## Configuration

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

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

### Usage with Cursor IDE

To integrate the Sequential Thinking MCP server with Cursor IDE, you can use one of the following methods:

#### Local Build Method

Build the project locally first:

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

Then configure in Cursor settings (JSON):

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

#### Docker Method

Build Docker image:

```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

Configure in Cursor settings (JSON):

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

#### Environment Variables Method

Create a startup script:

```bash
#!/bin/sh
export CURSOR_MCP_CONFIG=/path/to/your/mcp_config.json
open -a Cursor
```

Where `mcp_config.json` contains:

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

Make the script executable with `chmod +x start_cursor_with_mcp.sh` and run it to launch Cursor with MCP configuration.

**Note**: The MCP integration is primarily supported in the Composer feature of Cursor IDE.

## Building

### Local Build

```bash
cd /path/to/sequentialthinking
npm install
npm run build
```

### Docker

```bash
docker build -t mcp/sequentialthinking -f src/sequentialthinking/Dockerfile .
```

## Troubleshooting

If you encounter issues with the npx method, try the following:

1. Use the local build method and provide the absolute path to the built JavaScript file
2. Ensure file permissions are set correctly: `chmod +x dist/index.js`
3. Try the Docker method as an alternative
4. Check Cursor's documentation or community forums for the latest MCP integration methods

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Source Code

This project is based on the source code from [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers).
