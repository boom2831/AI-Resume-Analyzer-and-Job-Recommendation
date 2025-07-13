# 🤖 AI Resume Analyzer & Job Recommender

A cloud-based multi-agent system that analyzes resumes, evaluates ATS compatibility, identifies skill gaps, and recommends personalized job roles using LLMs (Gemini-2.5-pro)), deployed with a React frontend and a Python backend.

## 🚀 Features

- 📄 **PDF Resume Upload**: Upload your resume directly from the UI.
- 🧠 **LLM-Powered Resume Parsing**: Extracts key information such as skills, experience, and project summaries.
- 📊 **ATS Compatibility Scoring**: Simulates how your resume fares in an Applicant Tracking System.
- 🔍 **Skill Gap Analysis**: Identifies missing skills relevant to top industry roles.
- 🎯 **Job Recommendations**: Suggests job titles tailored to your resume using LLMs.
- 💬 **Chatbot UI**: Conversational agent to assist users interactively.
- ☁️ **Cloud-Ready**: Easily deployable on AWS Lambda.

## 🛠️ Tech Stack

| Frontend | Backend | Cloud | LLM |
|----------|---------|-------|-----|
| React.js (Vite) | Python | AWS Lambda | Gemini 2.5 Pro |
| Tailwind CSS | LangGraph + LangChain | S3 + DynamoDB |
| Lucide Icons | IAM, CloudFront | - |

## 📂 Folder Structure

```
resumeAIapp/
├── src/        # React frontend (Vite + Tailwind)
│   └── pages/
│       └── Home.jsx
│   └──utils/
│   ├── langgraph_handler.py
│   ├── server.py
│   ├── requirements.txt
├── README.md
```

## 🖼️ Architecture

```
User ⟶ React Frontend ⟶ Python API (LangGraph) ⟶ LLM (Gemini)
                         ⤷ PDF Resume Parser
                         ⤷ ATS Scorer
                         ⤷ Skill Gap Analyzer
                         ⤷ Job Recommender
```

## 💡 Setup Instructions

### Frontend

```bash
cd resumeaiapp
yarn install
yarn dev
```

### Backend (Local)

```bash
cd src/utils
pip install -r requirements.txt
python server.py
```

## 🔐 Environment Variables

Create a `.env` file:

```env
GOOGLE_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

## 📥 API Example

**POST** `/chat`

```json
{
  "prompt": "Suggest jobs for me",
  "resume_base64": "base64_encoded_pdf"
}
```

**Response:**
```json
{
  "response": "Based on your skills, we recommend roles such as..."
}
```

## 🧪 Sample Use Cases

- "What jobs can I get with this resume?"
- "How can I improve my ATS score?"
- "What skills should I add for a data scientist role?"

## 📝 Future Enhancements

- Leaderboard for resume quality
- Resume templates
- Resume Autofill with all suggestions

## 👥 Authors

- **Bhumika** — LangGraph Multi-Agent System, LLM Integration
- **Manya** — Frontend (React.js), UI/UX Enhancements
- **Omkar** — Frontend (React.js), Tailwind Integration

## 📄 License

MIT License — feel free to fork, build, and deploy!
