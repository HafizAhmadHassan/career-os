import os

from dotenv import load_dotenv
from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client


load_dotenv()


MCP_SERVER_URL = os.getenv(
    "MCP_SERVER_URL",
    "http://127.0.0.1:8000/mcp"
)


async def get_mcp_tools():

    """
    Connect to the MCP server and return
    the available tools.
    """

    async with streamable_http_client(
        MCP_SERVER_URL
    ) as (
        read_stream,
        write_stream
    ):

        async with ClientSession(
            read_stream,
            write_stream
        ) as session:

            await session.initialize()

            result = await session.list_tools()

            return result.tools


async def call_mcp_tool(
    tool_name: str,
    arguments: dict
):

    """
    Connect to the MCP server and execute
    an MCP tool.
    """

    async with streamable_http_client(
        MCP_SERVER_URL
    ) as (
        read_stream,
        write_stream
    ):

        async with ClientSession(
            read_stream,
            write_stream
        ) as session:

            await session.initialize()

            result = await session.call_tool(
                tool_name,
                arguments
            )

            return result
