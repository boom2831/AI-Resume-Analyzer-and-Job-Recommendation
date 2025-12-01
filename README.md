# AI Resume Analyzer and Job Recommendation

AI Resume Analyzer and Job Recommendation is a full-stack application that analyzes candidate resumes and returns structured insights and personalized job recommendations. The project combines a JavaScript/TypeScript frontend, a Python backend for NLP/ML tasks, and optional third-party integrations (resume parsing, job APIs, large language models) to provide recruiters and job seekers an intelligent matching experience.

> NOTE: This README is written to be adaptable to the current repository layout (mixed JavaScript/TypeScript frontend and Python backend). If your repo structure differs, follow the sections most relevant to your codebase or update the commands/paths accordingly.

Table of Contents
- About
- Key features
- Architecture & Tech stack
- Prerequisites
- Quick start (development)
  - Backend (Python)
  - Frontend (Node / JavaScript / TypeScript)
- Environment / Configuration
- Example API usage
- Running with Docker
- Testing
- Recommended file layout
- Contributing
- License
- Acknowledgements & contact

About
-----
This project provides:
- Automated resume parsing (extract name, contact, skills, experience, education).
- Skill-to-job matching and ranking of job openings by fit.
- Structured resume output (JSON) for storage or further processing.
- A web UI to upload resumes and view analysis + recommended roles.

Key features
------------
- Resume ingestion (PDF, DOCX, plain text)
- Named-entity extraction for experience, education, skills
- Skill normalization and vectorized matching to job descriptions
- Confidence scoring and short explanation per recommendation
- Frontend UI with upload, results, and job list
- Extensible integrations for job provider APIs and language models

Architecture & Tech stack
-------------------------
- Frontend: JavaScript / TypeScript, React (or similar), HTML, CSS
- Backend: Python (Flask, FastAPI or Django — adjust to repo specifics)
- NLP/ML: spaCy / transformers / scikit-learn (optional, depending on repo)
- Data & storage: PostgreSQL, SQLite or simple JSON (configurable)
- Optional external services: OpenAI/LLM, resume parsing APIs, job listing APIs
- Development tooling: npm / yarn, pip, Docker

Prerequisites
-------------
- Node.js (14+ recommended) and npm or yarn
- Python 3.8+ and pip
- (Optional) Docker & Docker Compose
- (Optional) API keys for external services (OpenAI, job listing APIs, etc.)

Quick start (development)
-------------------------

1) Clone the repo
```bash
git clone https://github.com/boom2831/AI-Resume-Analyzer-and-Job-Recommendation.git
cd AI-Resume-Analyzer-and-Job-Recommendation
```

2) Backend (Python)
- Create virtual environment and install
```bash
cd backend         # adjust path to actual backend directory if different
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

- Run the backend
  - If FastAPI:
  ```bash
  uvicorn main:app --reload --port 8000
  ```
  - If Flask:
  ```bash
  export FLASK_APP=app.py
  export FLASK_ENV=development
  flask run --port=8000
  ```
  Adjust filenames (main.py, app.py) and module names according to your repository.

3) Frontend (JavaScript / TypeScript)
- Install dependencies and run
```bash
cd frontend       # adjust if frontend folder is named differently
npm install
npm run dev       # or `npm start` depending on package.json
```
- Open http://localhost:3000 (or the port configured by the frontend) and the UI should connect to the backend API (CORS or proxy may be required).

Environment / Configuration
---------------------------
Create a .env file in the backend and frontend (if needed). Example environment variables to support typical features:

Backend (.env)
```
PORT=8000
DATABASE_URL=sqlite:///./db.sqlite3   # or PostgreSQL connection string
OPENAI_API_KEY=sk-...
JOB_API_KEY=your_job_api_key
RESUME_PARSER_API_KEY=your_parser_api_key
SECRET_KEY=supersecretvalue
LOG_LEVEL=info
```

Frontend (.env)
```
REACT_APP_API_BASE=http://localhost:8000/api
REACT_APP_SENTRY_DSN=
```

Be careful never to commit API keys or secrets. Add .env to .gitignore.

Example API usage
-----------------
1) Upload a resume (multipart/form-data)
POST /api/resumes/upload
Body: file (resume.pdf)

Response (example)
```json
{
  "id": "resume_1234",
  "name": "Jane Doe",
  "contact": { "email": "jane@example.com", "phone": "..." },
  "skills": ["python", "nlp", "machine learning"],
  "experience": [
    { "title": "Data Scientist", "company": "Acme", "start": "2019-01", "end": "2021-06" }
  ],
  "education": [ { "school": "State University", "degree": "BSc Computer Science" } ],
  "raw_text": "Extracted full text..."
}
```

2) Get job recommendations for a resume
GET /api/resumes/:id/recommendations
Query params: top=5

Response (example)
```json
{
  "resume_id": "resume_1234",
  "recommendations": [
    { "job_id": "job_987", "title": "NLP Engineer", "company": "AI Co", "score": 0.92, "explain": "strong match on skills: nlp, python" }
  ]
}
```

Running with Docker
-------------------
If you prefer Docker, add a Dockerfile and docker-compose.yml (if not present) or use existing ones. Example quick commands if docker files are present:
```bash
docker build -t ai-resume-analyzer .
docker run -p 8000:8000 --env-file backend/.env ai-resume-analyzer
```
Or with docker-compose:
```bash
docker-compose up --build
```
Check your docker-compose.yml for service names and ports.

Testing
-------
- Backend unit tests (pytest)
```bash
cd backend
pytest
```
- Frontend tests (Jest/React Testing Library)
```bash
cd frontend
npm test
```
If tests are not yet implemented, consider adding end-to-end tests (Cypress) for the upload → analyze → recommend flow.

Recommended file layout
-----------------------
(Adjust to the actual repository layout)
```
/backend
  ├─ app.py / main.py
  ├─ requirements.txt
  ├─ routes/
  ├─ services/
  ├─ models/
  └─ tests/
/frontend
  ├─ package.json
  ├─ src/
  └─ public/
/docker
  ├─ Dockerfile
  └─ docker-compose.yml
README.md
LICENSE
```

Contributing
------------
Thank you for considering contributing! A simple workflow:
1. Fork the repository
2. Create a feature branch: git checkout -b feat/your-feature
3. Implement feature or fix, add tests
4. Commit and push
5. Open a pull request describing the change

Please follow these guidelines:
- Keep changes small and focused
- Write tests for new features or bug fixes
- Run linters and tests before opening a PR
- Document configuration and API changes in this README

License
-------
Specify your license (e.g., MIT). Example:
```
MIT License
```
Replace with the license used in this repository.

Acknowledgements & contact
--------------------------
- Built with open source libraries (spaCy, scikit-learn, FastAPI, React — adjust to actual dependencies)
- If you need help or want to collaborate, open an issue or contact the maintainer: boom2831 on GitHub.

---

If anything in this README doesn't match the exact layout or scripts in your repository (for example different filenames, or the absence of backend/frontend folders), tell me which files or structure you'd like the README to reflect and I will update it to match the repo precisely.
