from llm import get_llm_client
import os

client = get_llm_client()

response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[
        {
            "role": "user",
            "content": "Explain MCP in two sentences."
        }
    ]
)

print(response.choices[0].message.content)
