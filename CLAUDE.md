# Project Instructions

## MCP Server
An MCP server is running at http://localhost:3000/mcp.
Tool: `get_docs_for_npm_package`

Before writing any code that uses an npm package:
1. Call `get_docs_for_npm_package` for every package you plan to use
2. Only use functions, props, and APIs that exist in the tool response
3. Never use deprecated APIs — if a function is marked @deprecated in the types, say so and use the replacement

## Stack
- React Native (check package version via the tool)
- [add your other packages here e.g. react-navigation, zustand etc.]

## Rules
- Always fetch types before coding, not after
- If unsure whether an API exists, fetch it — don't guess
- Flag any deprecated usages found in the fetched types