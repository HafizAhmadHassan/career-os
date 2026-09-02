from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from client.client import (
    get_mcp_tools,
    call_mcp_tool
)


BASE_DIR = Path(__file__).resolve().parent


app = FastAPI(
    title="MCP Business Intelligence",
    description="AI-powered business intelligence using MCP",
    version="1.0.0",
)


app.mount(
    "/static",
    StaticFiles(
        directory=BASE_DIR / "static"
    ),
    name="static"
)


templates = Jinja2Templates(
    directory=BASE_DIR / "templates"
)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={}
    )


@app.get("/health")
async def health():

    return {
        "status": "healthy",
        "application": "MCP Business Intelligence"
    }


@app.get("/mcp/tools")
async def mcp_tools():

    tools = await get_mcp_tools()

    return {
        "tools": [
            {
                "name": tool.name,
                "description": tool.description
            }
            for tool in tools
        ]
    }


@app.post("/mcp/sales")
async def get_sales():

    result = await call_mcp_tool(
        "get_sales_data",
        {}
    )

    return {
        "result": str(result)
    }
