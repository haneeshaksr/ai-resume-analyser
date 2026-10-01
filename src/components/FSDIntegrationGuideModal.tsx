import React, { useState } from 'react';
import { CONFIG } from '../services/config';

interface FSDIntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FSDIntegrationGuideModal: React.FC<FSDIntegrationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'endpoints' | 'structure' | 'instructions'>('architecture');
  const [apiUrl, setApiUrl] = useState(CONFIG.API_BASE_URL);
  const [aiUrl, setAiUrl] = useState(CONFIG.AI_SERVICE_URL);
  const [useMock, setUseMock] = useState(CONFIG.USE_MOCK_DATA);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveConfig = () => {
    CONFIG.API_BASE_URL = apiUrl;
    CONFIG.AI_SERVICE_URL = aiUrl;
    CONFIG.USE_MOCK_DATA = useMock;
    setSaveStatus('Runtime configuration updated successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', zIndex: 1060 }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-gradient-indigo text-white p-4 border-0">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-primary rounded-pill px-2.5 py-1 font-monospace" style={{ fontSize: '0.7rem' }}>
                  FSD Architecture
                </span>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill font-monospace" style={{ fontSize: '0.7rem' }}>
                  ASP.NET Core + MongoDB + FastAPI
                </span>
              </div>
              <h4 className="modal-title fw-bold mb-0">
                Backend Integration & Project Blueprint
              </h4>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-light px-4 pt-3 border-bottom">
            <ul className="nav nav-pills gap-2 pb-3 font-monospace small">
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill py-1.5 px-3 ${activeTab === 'architecture' ? 'active' : 'text-secondary'}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  <i className="bi bi-diagram-3 me-1"></i> Multi-Tier Architecture
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill py-1.5 px-3 ${activeTab === 'endpoints' ? 'active' : 'text-secondary'}`}
                  onClick={() => setActiveTab('endpoints')}
                >
                  <i className="bi bi-hdd-network me-1"></i> ASP.NET API Endpoints
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill py-1.5 px-3 ${activeTab === 'structure' ? 'active' : 'text-secondary'}`}
                  onClick={() => setActiveTab('structure')}
                >
                  <i className="bi bi-folder2-open me-1"></i> Folder & Code Structure
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill py-1.5 px-3 ${activeTab === 'instructions' ? 'active' : 'text-secondary'}`}
                  onClick={() => setActiveTab('instructions')}
                >
                  <i className="bi bi-terminal me-1"></i> Local Run Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Body */}
          <div className="modal-body p-4 bg-white" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
            {/* TAB 1: ARCHITECTURE & RUNTIME CONFIG */}
            {activeTab === 'architecture' && (
              <div>
                <h5 className="fw-bold text-dark mb-2">End-to-End System Architecture</h5>
                <p className="text-secondary small mb-4">
                  The application is decoupled into four dedicated tiers to demonstrate professional Full Stack Development principles:
                </p>

                <div className="p-3 bg-light rounded-3 border mb-4">
                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center">
                    <div className="p-3 bg-white rounded-3 border shadow-xs flex-fill">
                      <span className="badge bg-primary text-white font-monospace mb-1">1. Frontend UI</span>
                      <h6 className="fw-bold text-dark mb-0">React + Bootstrap 5</h6>
                      <small className="text-muted">Port 3000</small>
                    </div>

                    <i className="bi bi-arrow-left-right text-primary fs-4 d-none d-md-block"></i>

                    <div className="p-3 bg-white rounded-3 border shadow-xs flex-fill">
                      <span className="badge bg-success text-white font-monospace mb-1">2. Core API</span>
                      <h6 className="fw-bold text-dark mb-0">ASP.NET Core (C#)</h6>
                      <small className="text-muted">Port 5000</small>
                    </div>

                    <i className="bi bi-arrow-left-right text-primary fs-4 d-none d-md-block"></i>

                    <div className="p-3 bg-white rounded-3 border shadow-xs flex-fill">
                      <span className="badge bg-info text-white font-monospace mb-1">3. AI Microservice</span>
                      <h6 className="fw-bold text-dark mb-0">Python FastAPI NLP</h6>
                      <small className="text-muted">Port 8000</small>
                    </div>

                    <i className="bi bi-arrow-left-right text-primary fs-4 d-none d-md-block"></i>

                    <div className="p-3 bg-white rounded-3 border shadow-xs flex-fill">
                      <span className="badge bg-warning text-dark font-monospace mb-1">4. Database</span>
                      <h6 className="fw-bold text-dark mb-0">MongoDB</h6>
                      <small className="text-muted">Port 27017</small>
                    </div>
                  </div>
                </div>

                <div className="card p-3 border bg-light rounded-3 mb-3">
                  <h6 className="fw-bold text-dark mb-2">Live API Connection Switch</h6>
                  <p className="text-secondary small mb-3">
                    Use this panel to point the frontend to your local ASP.NET Core backend when running locally.
                  </p>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark mb-1 font-monospace">
                        ASP.NET Core API Base URL:
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm font-monospace"
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark mb-1 font-monospace">
                        Python FastAPI AI URL:
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm font-monospace"
                        value={aiUrl}
                        onChange={(e) => setAiUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="mockSwitch"
                      checked={useMock}
                      onChange={(e) => setUseMock(e.target.checked)}
                    />
                    <label className="form-check-label small fw-semibold text-dark" htmlFor="mockSwitch">
                      Use Mock Data for Frontend Demo (Default: Enabled for offline inspection)
                    </label>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={handleSaveConfig}
                      className="btn btn-sm btn-primary rounded-pill px-3"
                    >
                      Apply Runtime Configuration
                    </button>
                    {saveStatus && <span className="text-success small fw-medium">{saveStatus}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ENDPOINTS SPECIFICATION */}
            {activeTab === 'endpoints' && (
              <div>
                <h5 className="fw-bold text-dark mb-2">ASP.NET Core Controller Endpoint Mapping</h5>
                <p className="text-secondary small mb-3">
                  All frontend functions in <code className="text-primary font-monospace">src/services/apiService.ts</code> map directly to these REST endpoints:
                </p>

                <div className="table-responsive">
                  <table className="table table-bordered table-sm small align-middle">
                    <thead className="table-light font-monospace" style={{ fontSize: '0.72rem' }}>
                      <tr>
                        <th>Method</th>
                        <th>Endpoint Route</th>
                        <th>Target Controller (C#)</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="badge bg-success font-monospace">POST</span></td>
                        <td><code>/api/auth/login</code></td>
                        <td>AuthController.Login()</td>
                        <td>Authenticates user and returns JWT bearer token</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-success font-monospace">POST</span></td>
                        <td><code>/api/auth/register</code></td>
                        <td>AuthController.Register()</td>
                        <td>Creates user document in MongoDB collection</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-success font-monospace">POST</span></td>
                        <td><code>/api/resume/upload</code></td>
                        <td>ResumeController.UploadResume()</td>
                        <td>Accepts multipart/form-data PDF or DOCX file</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-success font-monospace">POST</span></td>
                        <td><code>/api/resume/analyze</code></td>
                        <td>ResumeController.Analyze()</td>
                        <td>Calls Python NLP microservice to extract skills & score</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-primary font-monospace">GET</span></td>
                        <td><code>/api/resume/analysis/:id</code></td>
                        <td>ResumeController.GetAnalysis(id)</td>
                        <td>Retrieves full parsed resume metadata and score</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-primary font-monospace">GET</span></td>
                        <td><code>/api/recommendations/roles</code></td>
                        <td>RecommendationsController.GetRoles()</td>
                        <td>Calculates candidate-role ontology match percentages</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-primary font-monospace">GET</span></td>
                        <td><code>/api/recommendations/skill-gaps</code></td>
                        <td>RecommendationsController.GetSkillGaps(role)</td>
                        <td>Returns matched skills vs missing skills comparison</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-primary font-monospace">GET</span></td>
                        <td><code>/api/recommendations/learning-path</code></td>
                        <td>RecommendationsController.GetLearningPath()</td>
                        <td>Returns 5-step prioritized curriculum</td>
                      </tr>
                      <tr>
                        <td><span className="badge bg-primary font-monospace">GET</span></td>
                        <td><code>/api/resume/history</code></td>
                        <td>ResumeController.GetHistory()</td>
                        <td>Fetches list of historical resume audits for logged-in user</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: FOLDER STRUCTURE */}
            {activeTab === 'structure' && (
              <div>
                <h5 className="fw-bold text-dark mb-2">Project Folder & File Structure</h5>
                <p className="text-secondary small mb-3">
                  Standard modular architecture adhering to modern clean code and React/TypeScript standards:
                </p>

                <div className="bg-dark text-light p-3 rounded-3 font-monospace small" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                  <div>├── index.html                  # HTML5 entry with Bootstrap 5 CDN & Fonts</div>
                  <div>├── package.json                # Dependencies (@google/genai, express, bootstrap, lucide)</div>
                  <div>├── vite.config.ts              # Vite 8 & React 19 configuration</div>
                  <div>├── src/</div>
                  <div>│   ├── main.tsx                # React application bootstrapper</div>
                  <div>│   ├── App.tsx                 # Master state, page router & responsive layout</div>
                  <div>│   ├── index.css               # Bootstrap custom styling, gradients & circular score gauges</div>
                  <div>│   ├── types/</div>
                  <div>│   │   └── index.ts            # Type definitions (UserProfile, DetectedSkill, ScoreBreakdown, JobRole)</div>
                  <div>│   ├── services/</div>
                  <div>│   │   ├── config.ts           # Central API configuration (API_BASE_URL, endpoints)</div>
                  <div>│   │   └── apiService.ts       # Service layer (login, register, upload, analyze, getRecommendations)</div>
                  <div>│   ├── data/</div>
                  <div>│   │   └── mockData.ts         # Pre-calibrated sample resumes, skills & learning roadmap</div>
                  <div>│   ├── components/</div>
                  <div>│   │   ├── Navbar.tsx          # Responsive navbar with mobile hamburger & auth toggles</div>
                  <div>│   │   ├── Footer.tsx          # Footer with branding & tech stack credits</div>
                  <div>│   │   ├── Sidebar.tsx         # Dashboard sidebar with active tabs & logout</div>
                  <div>│   │   └── FSDIntegrationGuideModal.tsx # Full Stack architecture modal & documentation</div>
                  <div>│   └── pages/</div>
                  <div>│       ├── HomePage.tsx        # Hero with floating cards, 6 Features, 4-step workflow</div>
                  <div>│       ├── LoginPage.tsx       # Split-screen login with validation & demo autofill</div>
                  <div>│       ├── RegisterPage.tsx    # Candidate registration with experience level & validation</div>
                  <div>│       ├── DashboardOverview.tsx # 4 Summary cards, score gauge & quick actions</div>
                  <div>│       ├── ResumeUploadPage.tsx# Drag-and-drop file upload & real analysis animation</div>
                  <div>│       ├── ResumeAnalysisPage.tsx # Resume info & categorized detected skills badges</div>
                  <div>│       ├── ResumeScorePage.tsx # Circular 83/100 gauge, category score breakdown & tips</div>
                  <div>│       ├── JobRecommendationsPage.tsx # Role match cards (Full Stack, Frontend, .NET, Python)</div>
                  <div>│       ├── SkillGapPage.tsx    # Side-by-side Matched Skills vs Skills to Develop</div>
                  <div>│       ├── LearningPathPage.tsx# 5-step curriculum from Beginner to Advanced</div>
                  <div>│       ├── AnalysisHistoryPage.tsx # Audit log table with view action</div>
                  <div>│       ├── ProfilePage.tsx     # Candidate profile with interactive editing & skill tags</div>
                  <div>│       └── AboutPage.tsx       # FSD capstone overview & technical brief</div>
                </div>
              </div>
            )}

            {/* TAB 4: RUN INSTRUCTIONS */}
            {activeTab === 'instructions' && (
              <div>
                <h5 className="fw-bold text-dark mb-2">Instructions to Run the System Locally</h5>
                <p className="text-secondary small mb-3">
                  Follow these step-by-step instructions to run both the frontend and connect your ASP.NET Core backend:
                </p>

                <div className="d-flex flex-column gap-3 small">
                  <div className="card p-3 border rounded-3 bg-light">
                    <h6 className="fw-bold text-dark mb-1">Step 1: Run the Frontend (React + Vite)</h6>
                    <p className="text-secondary mb-2">Ensure Node.js 18+ is installed on your machine:</p>
                    <div className="bg-dark text-white p-2.5 rounded font-monospace">
                      <div>npm install</div>
                      <div>npm run dev</div>
                    </div>
                    <small className="text-muted mt-1 d-block">Frontend will run on <code>http://localhost:3000</code></small>
                  </div>

                  <div className="card p-3 border rounded-3 bg-light">
                    <h6 className="fw-bold text-dark mb-1">Step 2: Start ASP.NET Core Web API (Backend)</h6>
                    <p className="text-secondary mb-2">In your ASP.NET Core project root:</p>
                    <div className="bg-dark text-white p-2.5 rounded font-monospace">
                      <div>dotnet restore</div>
                      <div>dotnet run --launch-profile "https" --urls="http://localhost:5000"</div>
                    </div>
                    <small className="text-muted mt-1 d-block">Swagger UI will be accessible at <code>http://localhost:5000/swagger</code></small>
                  </div>

                  <div className="card p-3 border rounded-3 bg-light">
                    <h6 className="fw-bold text-dark mb-1">Step 3: Run MongoDB</h6>
                    <p className="text-secondary mb-2">Ensure MongoDB is running locally or provide a MongoDB Atlas connection string in <code className="font-monospace">appsettings.json</code>:</p>
                    <div className="bg-dark text-white p-2.5 rounded font-monospace">
                      <div>"MongoDB": &#123; "ConnectionString": "mongodb://localhost:27017", "DatabaseName": "ResumeAnalyzerDb" &#125;</div>
                    </div>
                  </div>

                  <div className="card p-3 border rounded-3 bg-light">
                    <h6 className="fw-bold text-dark mb-1">Step 4: Connect Frontend to Backend</h6>
                    <p className="text-secondary mb-1">
                      In <code className="font-monospace">src/services/config.ts</code>, simply change <code className="font-monospace">USE_MOCK_DATA: false</code> or use the toggle switch in Tab 1 of this modal!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light p-3 border-top d-flex justify-content-between">
            <span className="text-muted small font-monospace">
              Target Framework: ASP.NET Core 8.0 • MongoDB Driver 2.25 • FastAPI 0.110
            </span>
            <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={onClose}>
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
