import os

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


def get_groq_client():

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise ValueError(
            "GROQ_API_KEY is not configured in .env"
        )

    return Groq(
        api_key=api_key
    )


def get_groq_model():

    return os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile"
    )


def ask_groq(
    question: str,
    context: str
) -> str:

    client = get_groq_client()

    response = client.chat.completions.create(

        model=get_groq_model(),

        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful business "
                    "intelligence analyst."
                )
            },
            {
                "role": "user",
                "content": f"""
Answer the user's question using the
business information below.

Business information:

{context}

User question:

{question}

Do not invent information.
"""
            }
        ],

        temperature=0.2
    )

    return response.choices[0].message.content
