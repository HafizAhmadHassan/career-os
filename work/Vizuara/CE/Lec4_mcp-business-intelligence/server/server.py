from mcp.server import MCPServer

mcp = MCPServer("Business Intelligence Server")


@mcp.tool()
def get_sales_data() -> dict:
    """
    Return sample sales data for analysis.
    """

    return {
        "Q1": {
            "Laptop": 120,
            "Phone": 250,
            "Tablet": 90
        },
        "Q2": {
            "Laptop": 150,
            "Phone": 220,
            "Tablet": 70
        }
    }


@mcp.tool()
def calculate_growth(old_value: float, new_value: float) -> float:
    """
    Calculate percentage growth between two values.
    """

    if old_value == 0:
        return 0

    return round(((new_value - old_value) / old_value) * 100, 2)


@mcp.tool()
def get_business_context() -> str:
    """
    Return business context that the AI can use when analyzing sales.
    """

    return """
    The company sells laptops, phones and tablets.
    Management wants to identify products with declining sales
    and determine where corrective action may be required.
    """


if __name__ == "__main__":
    mcp.run(transport="streamable-http")

