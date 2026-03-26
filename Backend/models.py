from pydantic import BaseModel
from typing import Optional

class SolveRequest(BaseModel):
    url: str

class ComplexityInfo(BaseModel):
    time: str
    space: str
    explanation: str

class SolveResponse(BaseModel):
    problem_title: str
    problem_description: str
    cpp_solution: str
    complexity: ComplexityInfo
    approach_explanation: str
    follow_up_hints: list[str]

class ChatRequest(BaseModel):
    problem_title: str
    problem_description: str
    cpp_solution: str
    user_message: str
    chat_history: Optional[list[dict]] = []

class ChatResponse(BaseModel):
    reply: str