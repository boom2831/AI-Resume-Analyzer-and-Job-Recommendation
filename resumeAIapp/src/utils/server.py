from http.server import BaseHTTPRequestHandler, HTTPServer
import json, base64, io, re
from langgraph_handler import app  
from pypdf import PdfReader

class SimpleHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.end_headers()

    def do_POST(self):
        if self.path != "/chat":
            self.send_response(404)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b"Not Found")
            return

        content_length = int(self.headers.get('Content-Length', 0))
        raw_data = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_data)
            prompt = payload.get("prompt", "")
            resume_b64 = payload.get("resume_base64", "")

            resume_text = ""
            if resume_b64:
                resume_bytes = base64.b64decode(resume_b64)
                reader = PdfReader(io.BytesIO(resume_bytes))
                resume_text = "".join(page.extract_text() or "" for page in reader.pages)
                print("\n--- PDF PARSED SUCCESSFULLY ---")
                print(resume_text[:500])

            state = {
                "resume_text": resume_text,
                "user_prompt": prompt,
                "chat_history": [],
                "skills": [],
                "experience": "",
                "projects": [],
                "classification": "",
                "agent_response": ""
            }

            response = app.invoke(state)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"response": response["agent_response"]}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())


def run():
    server = HTTPServer(("localhost", 8000), SimpleHandler)
    print("✅ Python server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run()
