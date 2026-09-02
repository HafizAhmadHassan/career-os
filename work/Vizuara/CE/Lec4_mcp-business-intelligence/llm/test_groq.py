from provider import ask_groq


result = ask_groq(
    question="Which product is performing best?",
    context="""
    Product A: 120 units
    Product B: 80 units
    Product C: 150 units
    """
)

print(result)
