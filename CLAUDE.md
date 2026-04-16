# Project Instructions

## MCP Server
An MCP server is running at http://localhost:3000/mcp.
Tool: `get_docs_for_npm_package`

⚠️ MANDATORY — NO EXCEPTIONS: Before writing ANY code that touches an npm package:
1. STOP — do NOT write code yet
2. Call `get_docs_for_npm_package` for EVERY package you plan to use
3. Only use functions, props, and APIs that exist in the tool response — never guess or rely on prior knowledge
4. Never use deprecated APIs — if a function is marked @deprecated in the types, say so and use the replacement
5. If the tool response does not contain the API you were about to use, it does NOT exist — find an alternative from the tool response

This applies to: adding new props, using navigator options, calling library functions, configuring packages — anything npm-related.
Skipping this step is not allowed under any circumstance.

## Stack
- React Native (check package version via the tool)
- [add your other packages here e.g. react-navigation, zustand etc.]

## Rules
- Always fetch types before coding, not after
- If unsure whether an API exists, fetch it — don't guess
- Flag any deprecated usages found in the fetched types