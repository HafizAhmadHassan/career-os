import asyncio

from agent.agent import run_agent


async def main():

    question = (
        "Which product has the lowest sales "
        "and what is its performance?"
    )


    result = await run_agent(
        question
    )


    print("\n==============================")

    print("AI ANSWER")

    print("==============================\n")

    print(
        result["answer"]
    )


    print("\n==============================")

    print("MCP TOOLS USED")

    print("==============================\n")

    for tool in result["tools_used"]:

        print(
            f"  ✓ {tool}"
        )


if __name__ == "__main__":

    asyncio.run(main())
