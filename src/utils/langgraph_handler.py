import os
import json
import base64
from typing import TypedDict, Annotated, List
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import StateGraph, END, START
from pypdf import PdfReader
import io
from IPython.display import Markdown, display
import re
from dotenv import load_dotenv

load_dotenv()
#API_KEY = os.getenv("GOOGLE_API_KEY")
API_KEY = 'AIzaSyBIEXjxmBa5rZew3XcmobLqCwg37dq1BbM'
print(f"DEBUG: Loaded Key starts with: {API_KEY[:10]}...")

class AgentState(TypedDict):
    resume_text: str
    skills: List[str]
    experience: str
    projects: List[str]
    user_prompt: str
    chat_history: List[BaseMessage]
    classification: str
    agent_response: str

llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", google_api_key=API_KEY)

def extract_resume_info(state: AgentState) -> AgentState:
    print("---NODE: EXTRACT RESUME INFO---")
    resume_text = state["resume_text"]
    
    prompt = extraction_prompt = f"""
      Based on the following resume text, extract the following information:
      1. A list of key skills.
      2. A summary of the professional experience.
      3. A list of major projects with a brief description of each.

      Format your response as a JSON object with three keys:
      - "skills": list of strings
      - "experience_summary": string
      - "projects": list of {{ "title": string, "description": string }}

      Resume Text:
      ---
      {resume_text}
      ---

      You MUST respond only with valid JSON. Do not add any explanation or formatting.
      You MUST return only a raw JSON object. Do NOT use markdown, ```json, or add any extra characters or indentation.
      """


    
    response = llm.invoke(prompt)
    print(f"  > Extraction Response: {response.content}")

    raw = response.content
    cleaned = raw.replace("\n", "").replace("\t", "").replace("c    \"C\"", "\"C\"")
    cleaned = re.sub(r"```(?:json)?", "", cleaned).strip()
    #print(f"Cleaned: {cleaned}")

    try:
        data = json.loads(response.content)
        state["skills"] = data.get("skills", [])
        state["experience"] = data.get("experience_summary", "")
        state["projects"] = data.get("projects", [])
        print(f"  > Extracted Skills: {len(state['skills'])} found.\n")
        print(f"  > Extracted Experience Summary: {len(state['experience'])} found.\n")
        print(f"  > Extracted Projects Description: {len(state['projects'])} found.\n")
    except json.JSONDecodeError:
      print("Trying to parse fallback...")
      try:
          match = re.search(r'\{.*\}', response.content, re.DOTALL)
          if match:
              data = json.loads(match.group(0))
              state["skills"] = data.get("skills", [])
              state["experience"] = data.get("experience_summary", "")
              state["projects"] = data.get("projects", [])
              print(f"  > Extracted Skills: {len(state['skills'])} found.\n")
              print(f"  > Extracted Experience Summary: {len(state['experience'])} found.\n")
              print(f"  > Extracted Projects Description: {len(state['projects'])} found.\n")
          else:
              raise ValueError("No valid JSON block found.")
      except Exception as e:
          print(f"  > ERROR: Failed fallback parse: {e}")
          state["skills"] = []
          state["experience"] = "Could not parse experience from resume."
          state["projects"] = []
          return state
        
    return state

def classify_intent(state: AgentState) -> AgentState:
    print("---NODE: CLASSIFY INTENT---")
    prompt = state["user_prompt"]
    
    classification_prompt = f"""
    Classify the user's request into one of the following categories: "job_recommendation", "resume_analysis", or "general_chat".

    User Request: "{prompt}"
    
    Respond with only the category name.
    """
    
    response = llm.invoke(classification_prompt)
    classification = response.content.strip().lower()
    print(f"  > Classification: {classification}")
    state["classification"] = classification
    return state

def job_recommendation_agent(state: AgentState) -> AgentState:
    print("---NODE: JOB RECOMMENDATION AGENT---")
    skills = state["skills"]
    experience = state["experience"]
    
    agent_prompt = f"""
    You are a helpful AI career advisor. Based on the user's skills: {skills} and experience: "{experience}", provide 2-3 relevant job recommendations after searching in websites like internshala, glassdoor, LinkedIn, etc. 
    Explain why each role is a good fit with the link to apply.
    
    User's original query: "{state['user_prompt']}"

    Give pretty response by adding emojis and also some slang.
    """
    
    response = llm.invoke(agent_prompt)
    state["agent_response"] = response.content
    return state

def resume_analysis_agent(state: AgentState) -> AgentState:
    print("---NODE: RESUME ANALYSIS AGENT---")
    agent_prompt = f"""
    You are a resume analysis expert. The user wants to improve their resume.
    Their resume text is below:
    ---
    {state['resume_text']}
    ---
    
    Based on their query "{state['user_prompt']}", provide actionable tips. For example, if they mention a job description, analyze skill gaps. If not, give general advice on how to make their resume stronger based on their extracted skills: {state['skills']}.
    Give pretty response by adding emojis and also some slang.
    """
    response = llm.invoke(agent_prompt)
    state["agent_response"] = response.content
    return state

def general_chat_agent(state: AgentState) -> AgentState:
    print("---NODE: GENERAL CHAT AGENT---")
    messages = state["chat_history"] + [HumanMessage(content=state["user_prompt"])]
    response = llm.invoke(messages)
    state["agent_response"] = response.content
    return state

def route_after_classification(state: AgentState) -> str:
    print("---ROUTING---")
    resume_attached = bool(state.get("resume_text", "").strip())
    if "job_recommendation" in state["classification"] and resume_attached:
        return "job_recommendation_agent"
    elif "resume_analysis" in state["classification"] and resume_attached:
        return "resume_analysis_agent"
    else:
        return "general_chat_agent"
    
workflow = StateGraph(AgentState)

workflow.add_node("extract_resume_info", extract_resume_info)
workflow.add_node("classify_intent", classify_intent)
workflow.add_node("job_recommendation_agent", job_recommendation_agent)
workflow.add_node("resume_analysis_agent", resume_analysis_agent)
workflow.add_node("general_chat_agent", general_chat_agent)

workflow.add_edge(START, "extract_resume_info")
workflow.add_edge("extract_resume_info", "classify_intent")

workflow.add_conditional_edges(
    "classify_intent",
    route_after_classification,
    {
        "job_recommendation_agent": "job_recommendation_agent",
        "resume_analysis_agent": "resume_analysis_agent",
        "general_chat_agent": "general_chat_agent",
    },
)

workflow.add_edge("job_recommendation_agent", END)
workflow.add_edge("resume_analysis_agent", END)
workflow.add_edge("general_chat_agent", END)

app = workflow.compile()

def run_resume_bot(prompt: str, resume_pdf_path: str = None):
    resume_text = ""
    if resume_pdf_path:
        try:
            with open(resume_pdf_path, "rb") as f:
                resume_bytes = f.read()
            reader = PdfReader(io.BytesIO(resume_bytes))
            resume_text = "".join(page.extract_text() or "" for page in reader.pages)
        except Exception as e:
            return f"❌ Failed to extract resume text: {e}"

    chat_history = []
    state_input = {
        "resume_text": resume_text,
        "user_prompt": prompt,
        "chat_history": chat_history
    }

    response = app.invoke(state_input)

    display(Markdown(response.get("agent_response", "An error occurred or no response was generated.")))