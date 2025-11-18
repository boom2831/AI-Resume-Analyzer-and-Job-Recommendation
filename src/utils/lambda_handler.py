import json
import base64
import io
from pypdf import PdfReader
from langgraph_handler import app  # Your workflow code is here

def lambda_handler(event, context):
    try:
        # Parse the body
        if "body" not in event:
            return {"statusCode": 400, "body": json.dumps({"error": "Missing body"})}

        body = json.loads(event["body"])
        prompt = body.get("prompt", "")
        resume_base64 = body.get("resume_base64", "")

        if not prompt or not resume_base64:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Both 'prompt' and 'resume_base64' are required."})
            }

        # Decode resume from base64
        try:
            resume_bytes = base64.b64decode(resume_base64)
            reader = PdfReader(io.BytesIO(resume_bytes))
            resume_text = "".join(page.extract_text() or "" for page in reader.pages)
        except Exception as e:
            return {
                "statusCode": 500,
                "body": json.dumps({"error": f"Failed to parse PDF: {str(e)}"})
            }

        # Prepare state input for LangGraph
        state_input = {
            "resume_text": resume_text,
            "user_prompt": prompt,
            "chat_history": []
        }

        # Invoke LangGraph app
        response = app.invoke(state_input)

        return {
            "statusCode": 200,
            "body": json.dumps({
                "response": response.get("agent_response", "❌ No response generated.")
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"Internal Server Error: {str(e)}"})
        }
