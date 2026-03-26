import os
import json
from google import genai
from dotenv import load_dotenv

from scraper import scrape_problem
from models import SolveResponse, ComplexityInfo, ChatResponse
from prompts import SYSTEM_PROMPT, TUTOR_SYSTEM_PROMPT

load_dotenv()

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# ─────────────────────────────────────────────
# 1. TOOL DEFINITION
# ─────────────────────────────────────────────
tools = [
    {
        "function_declarations": [
            {
                "name": "scrape_problem",
                "description": "Fetches a DSA problem title and description from a LeetCode or Codeforces URL.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "url": {"type": "string"}
                    },
                    "required": ["url"]
                }
            }
        ]
    }
]

# ─────────────────────────────────────────────
# 2. SOLVER AGENT
# ─────────────────────────────────────────────
async def run_agent(url: str) -> SolveResponse:
    contents = [
        {
            "role": "user",
            "parts": [{"text": f"Solve this problem: {url}"}]
        }
    ]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config={
            "system_instruction": SYSTEM_PROMPT,
            
            "tools": tools,

        }
    )

    # ── TOOL CALL HANDLING ────────────────────
    if response.candidates and response.candidates[0].content.parts:
        for part in response.candidates[0].content.parts:
            if hasattr(part, "function_call") and part.function_call:
                fn_call = part.function_call

                if fn_call.name == "scrape_problem":
                    tool_url = fn_call.args["url"]

                    try:
                        scrape_result = await scrape_problem(tool_url)
                    except Exception as e:
                        scrape_result = {"error": str(e)}

                    # Send tool response back
                    contents.append({
                        "role": "model",
                        "parts": [part]
                    })

                    contents.append({
                        "role": "user",
                        "parts": [{
                            "function_response": {
                                "name": "scrape_problem",
                                "response": {"result": scrape_result}
                            }
                        }]
                    })

                    # Call model again
                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=contents,
                        config={
                            "system_instruction": SYSTEM_PROMPT,
                            "response_mime_type": "application/json",
                        }
                    )

    # ── CLEAN RESPONSE ────────────────────────
    raw_text = response.text.strip()
    
    print("==== RAW AI RESPONSE ====")
    print(raw_text)
    print("=========================")

    if raw_text.startswith("```json"):
        raw_text = raw_text[7:-3].strip()
    elif raw_text.startswith("```"):
        raw_text = raw_text[3:-3].strip()

    try:
        data = json.loads(raw_text)
        
        return SolveResponse(
            problem_title=data.get("problem_title", "Unknown"),
            problem_description=data.get("problem_description", ""),
            cpp_solution=data.get("cpp_solution", ""),
            complexity=ComplexityInfo(**data.get("complexity", {"time": "", "space": "", "explanation": ""})),
            approach_explanation=data.get("approach_explanation", ""),
            follow_up_hints=data.get("follow_up_hints", [])
        )
    except Exception as e:
        print(f"CRASH REPORT: {str(e)}")
        raise ValueError(f"Failed to parse AI response. Error: {str(e)}")

# ─────────────────────────────────────────────
# 3. TUTOR AGENT (CHAT)
# ─────────────────────────────────────────────
async def run_tutor(request) -> ChatResponse:
    system_prompt = f"""
{TUTOR_SYSTEM_PROMPT}

Problem: {request.problem_title}
Description: {request.problem_description}
Solution:
{request.cpp_solution}
"""

    contents = []

    # Chat history
    for msg in request.chat_history:
        contents.append({
            "role": "user" if msg["role"] == "user" else "model",
            "parts": [{"text": msg["content"]}]
        })

    # New user message
    contents.append({
        "role": "user",
        "parts": [{"text": request.user_message}]
    })

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config={
            "system_instruction": system_prompt
        }
    )

    return ChatResponse(reply=response.text)