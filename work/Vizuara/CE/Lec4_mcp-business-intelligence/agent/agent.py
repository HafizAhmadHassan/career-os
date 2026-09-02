import json

from client.client import (
    get_mcp_tools,
    call_mcp_tool
)

from llm.provider import (
    get_groq_client,
    get_groq_model
)


async def run_agent(question: str):

    # --------------------------------
    # 1. Discover MCP tools
    # --------------------------------

    tools = await get_mcp_tools()


    # --------------------------------
    # 2. Convert MCP tools to
    #    Groq tool definitions
    # --------------------------------

    groq_tools = []


    for tool in tools:

        groq_tools.append({

            "type": "function",

            "function": {

                "name": tool.name,

                "description":
                    tool.description or "",

                "parameters":
                    tool.input_schema

            }

        })


    # --------------------------------
    # 3. Ask Groq what tool is needed
    # --------------------------------

    client = get_groq_client()


    messages = [

        {
            "role": "system",

            "content": """
You are a business intelligence agent.

You have access to business data through MCP tools.

Use the available tools whenever the user's
question requires business data.

Do not invent business data.
"""
        },

        {
            "role": "user",

            "content": question
        }

    ]

    # --------------------------------
    # 3.1 Ask Groq passed available tools
    # --------------------------------

       response = client.chat.completions.create(

        model=get_groq_model(),

        messages=messages,

        tools=groq_tools,

        tool_choice="auto",

        temperature=0.1
    )


    assistant_message = response.choices[0].message


    # --------------------------------
    # 4. Did Groq request an MCP tool?
    # --------------------------------

    if not assistant_message.tool_calls:

        return {

            "answer":
                assistant_message.content,

            "tools_used": []

        }


    # --------------------------------
    # 5. Execute requested MCP tools
    # --------------------------------

    messages.append({

        "role": "assistant",

        "content":
            assistant_message.content,

        "tool_calls":
            assistant_message.tool_calls

    })


    tools_used = []


    for tool_call in assistant_message.tool_calls:

        tool_name = (
            tool_call.function.name
        )


        arguments = json.loads(
            tool_call.function.arguments
        )


        print(
            f"Calling MCP tool: "
            f"{tool_name}"
        )


        result = await call_mcp_tool(

            tool_name,

            arguments

        )


        tools_used.append(
            tool_name
        )


        # Convert MCP result to text

        result_text = str(result)


        messages.append({

            "role": "tool",

            "tool_call_id":
                tool_call.id,

            "content":
                result_text

        })


    # --------------------------------
    # 6. Ask Groq for final answer
    # --------------------------------

    final_response = client.chat.completions.create(

        model=get_groq_model(),

        messages=messages,

        temperature=0.2

    )


    return {

        "answer":
            final_response.choices[0].message.content,

        "tools_used":
            tools_used

    }
