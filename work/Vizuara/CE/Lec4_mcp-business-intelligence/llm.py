import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()


def get_llm_client():

    provider = os.getenv("LLM_PROVIDER", "groq").lower()

    if provider == "groq":

        return OpenAI(
            api_key=os.getenv("GROQ_API_KEY"),
            base_url="https://api.groq.com/openai/v1"
        )

    elif provider == "openai":

        return OpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

    else:
        raise ValueError(f"Unsupported provider: {provider}")
