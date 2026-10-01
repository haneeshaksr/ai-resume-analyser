# AI-Powered Resume Analyzer & Personalized Job Role Recommendation System

[![Full Stack Development](https://img.shields.io/badge/Project-Full%20Stack%20Development-blue.svg)](https://github.com)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Bootstrap%205-61dafb.svg)](https://react.dev)
[![ASP.NET Core](https://img.shields.io/badge/Backend-ASP.NET%20Core%20Web%20API-512bd4.svg)](https://dotnet.microsoft.com/)
[![Python FastAPI](https://img.shields.io/badge/AI%2FNLP-Python%20FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20NoSQL-47a248.svg)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **"Understand your skills. Improve your resume. Discover relevant career roles."**

A complete, production-grade career technology platform built as a **Full Stack Development (FSD) Capstone Project**. This system analyzes candidates' resumes using Natural Language Processing (NLP), evaluates an explainable 100-point profile quality score, matches verified skills against industry job-role ontologies, identifies technical skill gaps, and generates personalized learning roadmaps.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup (React + Bootstrap 5)](#1-frontend-setup)
  - [Backend Setup (ASP.NET Core Web API)](#2-backend-setup-aspnet-core)
  - [AI Microservice Setup (Python FastAPI NLP)](#3-ai-microservice-setup-python-fastapi)
  - [Database Setup (MongoDB)](#4-database-setup-mongodb)
- [REST API Endpoints Specification](#-rest-api-endpoints-specification)
- [Explainable Scoring Algorithm](#-explainable-scoring-algorithm)
- [Git Setup & Push Instructions](#-git-setup--push-instructions)
- [License](#-license)

---

## 🚀 Project Overview

Technical graduates and job seekers often struggle to gauge how their resume performs against automated Applicant Tracking Systems (ATS) and modern hiring standards. 

**AI Resume Analyzer** solves this challenge by providing:
1. **Automated Resume Ingestion:** Parses PDF and DOCX files to extract structured candidate information, educational qualifications, projects, and certifications.
2. **Entity-Based Skill Classification:** Recognizes and categorizes technical competencies across *Programming*, *Frontend*, *Backend*, *Databases*, *Tools*, and *AI/ML*.
3. **Transparent 100-Point Quality Score:** Breaks down candidate profiles into 5 quantifiable criteria without arbitrary black-box outputs.
4. **Job Role Ontology Matching:** Compares candidate skills against benchmark requirements for roles like *Full Stack Developer*, *Frontend Developer*, *.NET Developer*, *Backend Engineer*, *Python Developer*, and *Data Analyst*.
5. **Skill Gap Diagnostics & Learning Roadmaps:** Highlights missing frameworks and technologies side-by-side, providing a sequential 5-step curriculum from Beginner to Advanced.

---

## 🏛 System Architecture

The project is structured into four decoupled layers for maximum scalability and separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                 Client Layer (Port 3000)                    │
│      React 19 • Bootstrap 5 • TypeScript • Bootstrap Icons   │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON (REST APIs)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Core API Layer (Port 5000)                    │
│      ASP.NET Core 8 Web API (C#) • JWT Auth • Controllers   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │ HTTP Async Requests          │ MongoDB Driver
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│ AI / NLP Microservice (8000) │ │ Document Database (27017)  │
│ Python 3.11+ • FastAPI • NLP │ │ MongoDB NoSQL Collections  │
│ Skill Entity Extraction      │ │ Users, Resumes, Audit Logs │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## ✨ Key Features

- **Responsive Multi-Page Dashboard:** Includes Home, Features, How It Works, Login, Register, User Dashboard, Resume Analyzer, Profile Score, Job Recommendations, Skill Gaps, Learning Path, Analysis History, and Candidate Profile.
- **Explainable Profile Score:** Circular progress gauge (83/100) with category score breakdowns:
  - Skills: `34/40`
  - Education: `18/20`
  - Projects: `13/15`
  - Experience: `10/15`
  - Certificates: `8/10`
- **Pre-Calibrated 1-Click Sample Resumes:** Test profiles for *Full Stack Developer*, *Frontend Web Developer*, and *Python Data Analyst* for instant presentation and viva demonstration.
- **Authentic Role Match Percentages:** Strict avoidance of false "hiring probability" claims; focuses on verified ontology skill alignment.
- **Dual Runtime Mode:** Switch seamlessly between **Mock Mode** (for offline demonstration) and **Live ASP.NET Core API Mode** via `src/services/config.ts` or the interactive UI modal.

---

## 🛠 Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Bootstrap 5.3, Bootstrap Icons, Vite 8, Tailwind CSS |
| **Backend API** | ASP.NET Core 8.0 Web API, C#, JWT Bearer Authentication, Dependency Injection |
| **Database** | MongoDB Atlas / Local MongoDB, MongoDB.Driver for .NET |
| **AI / NLP** | Python 3.11+, FastAPI, Natural Language Processing (spaCy / NLTK) |

---

## 📂 Repository Structure

```
ai-resume-analyzer/
├── index.html                           # HTML5 entry with Bootstrap 5 & fonts
├── metadata.json                        # Application metadata
├── package.json                         # Node dependencies & npm scripts
├── vite.config.ts                       # Vite bundler configuration
├── tsconfig.json                        # TypeScript configuration
├── README.md                            # Complete documentation & GitHub guide
├── src/
│   ├── main.tsx                         # React entry point
│   ├── App.tsx                          # Router, layout & master state
│   ├── index.css                        # Bootstrap customization & score gauges
│   ├── types/
│   │   └── index.ts                     # TypeScript data interfaces
│   ├── services/
│   │   ├── config.ts                    # Central API configuration (API_BASE_URL)
│   │   └── apiService.ts                # Service functions (login, upload, analyze, getRoles)
│   ├── data/
│   │   └── mockData.ts                  # Preset resumes, ontology data & learning paths
│   ├── components/
│   │   ├── Navbar.tsx                   # Responsive navbar with auth controls
│   │   ├── Footer.tsx                   # Footer with links & tech badges
│   │   ├── Sidebar.tsx                  # Dashboard sidebar navigation
│   │   ├── GitHubModal.tsx              # GitHub repository clone & push modal
│   │   └── FSDIntegrationGuideModal.tsx # Architecture specifications & API schema
│   └── pages/
│       ├── HomePage.tsx                 # Hero, 6 feature cards, workflow timeline
│       ├── LoginPage.tsx                # Split-screen login with demo credentials
│       ├── RegisterPage.tsx             # Candidate signup with validation
│       ├── DashboardOverview.tsx        # Summary cards, score preview, top matches
│       ├── ResumeUploadPage.tsx         # Drag-and-drop ingestion & progress pipeline
│       ├── ResumeAnalysisPage.tsx       # Extracted information & skill badges
│       ├── ResumeScorePage.tsx          # Circular gauge & metric breakdown
│       ├── JobRecommendationsPage.tsx   # Recommended job roles & match %
│       ├── SkillGapPage.tsx             # Side-by-side skill gap comparison
│       ├── LearningPathPage.tsx         # 5-step curriculum roadmap
│       ├── AnalysisHistoryPage.tsx      # Historical audits table
│       ├── ProfilePage.tsx              # Candidate profile management
│       └── AboutPage.tsx                # Project description & FSD architecture
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js:** v18.0 or higher
- **npm:** v9.0 or higher
- **.NET SDK:** .NET 8.0 SDK (for ASP.NET Core backend)
- **Python:** 3.10+ (for AI microservice)
- **MongoDB:** Community Edition or MongoDB Atlas cluster

---

### 1. Frontend Setup

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

### 2. Backend Setup (ASP.NET Core)

1. Navigate to your ASP.NET Core backend folder (or create a new webapi):
   ```bash
   dotnet new webapi -n ResumeAnalyzer.Api
   cd ResumeAnalyzer.Api
   ```

2. Install required NuGet packages:
   ```bash
   dotnet add package MongoDB.Driver
   dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
   dotnet add package Swashbuckle.AspNetCore
   ```

3. Run the API on port 5000:
   ```bash
   dotnet run --urls="http://localhost:5000"
   ```
   Swagger UI will be available at `http://localhost:5000/swagger`.

---

### 3. AI Microservice Setup (Python FastAPI)

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install fastapi uvicorn spacy pydantic python-multipart
   python -m spacy download en_core_web_sm
   ```

3. Start FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   API Docs will be available at `http://localhost:8000/docs`.

---

### 4. Database Setup (MongoDB)

1. Start MongoDB locally on port `27017`:
   ```bash
   mongod --dbpath /data/db
   ```
2. Collections created by the system:
   - `users`: Stores candidate authentication and profile information.
   - `resumes`: Stores uploaded resume metadata, raw text, and parsed entities.
   - `analysis_results`: Stores computed scores, detected skill categories, and recommendations.

---

## 📡 REST API Endpoints Specification

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate candidate & issue JWT token |
| `POST` | `/api/auth/register` | Register new student or candidate profile |
| `POST` | `/api/resume/upload` | Multipart file upload (PDF / DOCX) |
| `POST` | `/api/resume/analyze` | Run NLP entity extraction & score calculation |
| `GET` | `/api/resume/analysis/{id}` | Retrieve comprehensive resume analysis by ID |
| `GET` | `/api/recommendations/roles` | Retrieve ranked job roles with Role Match % |
| `GET` | `/api/recommendations/skill-gaps` | Get side-by-side matched vs missing skills |
| `GET` | `/api/recommendations/learning-path`| Get 5-step prioritized curriculum |
| `GET` | `/api/resume/history` | Get audit log of past analyzed resumes |

---

## 📊 Explainable Scoring Algorithm

```
Total Profile Score (Max 100) = 
    Skills Score (Max 40) +
    Education Score (Max 20) +
    Projects Score (Max 15) +
    Experience Score (Max 15) +
    Certifications Score (Max 10)
```

> **Mandatory Disclaimer:** *"This score summarizes the information detected in your resume. It is not a guarantee of employment."*

---

## 🐙 Git Setup & Push Instructions

To push this codebase to your own GitHub repository:

```bash
# 1. Initialize Git in the project root
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "feat: complete AI Resume Analyzer & Job Role Recommender FSD project"

# 4. Set main branch
git branch -M main

# 5. Add your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/ai-resume-analyzer.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License

This project is created for educational, portfolio, and capstone demonstration purposes under the **MIT License**.
