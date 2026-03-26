from google import genai
from dotenv
# Initialize client (uses GEMINI_API_KEY from environment)
client = genai.Client()

# List all available models
models = client.models.list()

# Print model names
for model in models:
    print(model.name)