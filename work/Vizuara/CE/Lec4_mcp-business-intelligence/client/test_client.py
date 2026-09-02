import asyncio

from client.client import get_mcp_tools, call_mcp_tool


async def main():

    print("\nConnecting to MCP server...\n")

    tools = await get_mcp_tools()

    print("Available MCP tools:")

    for tool in tools:
        print(f"  - {tool.name}")

    print("\nCalling get_sales_data...\n")

    result = await call_mcp_tool(
        "get_sales_data",
        {}
    )

    print("MCP response:")
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
