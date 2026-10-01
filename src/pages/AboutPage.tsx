import React from 'react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenBackendModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBackendModal }) => {
  return (
    <div className="p-3 p-md-4 p-lg-5 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 font-monospace mb-2">
            Academic & Capstone Brief
          </span>
          <h1 className="display-5 fw-bold text-dark mb-3">About AI Resume Analyzer</h1>
          <p className="lead text-primary fw-semibold max-w-3xl mx-auto fs-5">
            &ldquo;AI Resume Analyzer is a Full Stack Development project designed to help users understand their resume, identify skills, analyze skill gaps and explore relevant job roles.&rdquo;
          </p>
        </div>

        {/* Project Mission & Purpose */}
        <div className="card p-4 p-md-5 bg-light border rounded-4 mb-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <h3 className="fw-bold text-dark mb-3">Project Overview & Motivation</h3>
              <p className="text-secondary leading-relaxed mb-3">
                Graduates and software developers often struggle with evaluating their resume from an automated ATS (Applicant Tracking System) perspective. Job descriptions demand specific frameworks, libraries, and architectural paradigms, yet candidates rarely receive objective, explainable feedback on where they stand.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                <strong>AI Resume Analyzer</strong> bridges this gap by combining modern frontend presentation, robust C# ASP.NET Core Web APIs, scalable MongoDB document persistence, and Python-driven Natural Language Processing.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigate('upload')}
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-xs"
                >
                  <i className="bi bi-play-fill me-1"></i> Launch Analyzer
                </button>
                <button
                  onClick={onOpenBackendModal}
                  className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold"
                >
                  <i className="bi bi-diagram-3 me-1"></i> Architecture & APIs
                </button>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card p-4 bg-white border rounded-4 shadow-sm">
                <h6 className="fw-bold text-dark mb-3 text-uppercase font-monospace small">
                  Key Evaluation Pillars
                </h6>
                <div className="d-flex flex-column gap-3 small">
                  <div className="d-flex align-items-start gap-2.5">
                    <i className="bi bi-check-circle-fill text-success fs-5 mt-0.5"></i>
                    <div>
                      <strong className="text-dark d-block">100-Point Explainable Index</strong>
                      <span className="text-muted">Skills (40), Education (20), Projects (15), Exp (15), Certs (10).</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2.5">
                    <i className="bi bi-check-circle-fill text-success fs-5 mt-0.5"></i>
                    <div>
                      <strong className="text-dark d-block">Categorized Skill Extraction</strong>
                      <span className="text-muted">Programming, Frontend, Backend, Database, Tools, AI/ML.</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2.5">
                    <i className="bi bi-check-circle-fill text-success fs-5 mt-0.5"></i>
                    <div>
                      <strong className="text-dark d-block">Predefined Job-Role Ontologies</strong>
                      <span className="text-muted">Calculates honest Role Match percentages without hiring promises.</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-start gap-2.5">
                    <i className="bi bi-check-circle-fill text-success fs-5 mt-0.5"></i>
                    <div>
                      <strong className="text-dark d-block">Actionable Learning Roadmap</strong>
                      <span className="text-muted">Sequenced milestones to overcome missing technical requirements.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section requested in prompt */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <span className="badge bg-secondary-subtle text-secondary border rounded-pill px-3 py-1 font-monospace mb-2">
              Multi-Tier Tech Stack
            </span>
            <h2 className="fw-bold text-dark">Technologies Used in This Project</h2>
          </div>

          <div className="row g-4">
            {/* Frontend */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 p-4 bg-white border rounded-4 card-hover shadow-xs">
                <div className="p-3 rounded-3 bg-primary-subtle text-primary d-inline-block mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-laptop fs-4"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Frontend</h5>
                <span className="text-muted small font-monospace d-block mb-3">Client Presentation</span>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-primary"></i> HTML5 (Semantic Layouts)
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-primary"></i> CSS3 (Gradients & Gauges)
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-primary"></i> JavaScript / TypeScript
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-primary"></i> Bootstrap 5 & Bootstrap Icons
                  </li>
                </ul>
              </div>
            </div>

            {/* Backend */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 p-4 bg-white border rounded-4 card-hover shadow-xs">
                <div className="p-3 rounded-3 bg-success-subtle text-success d-inline-block mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-hdd-rack fs-4"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Backend</h5>
                <span className="text-muted small font-monospace d-block mb-3">Enterprise Web API</span>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-success"></i> ASP.NET Core Web API
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-success"></i> C# (.NET 8/9 LTS)
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-success"></i> JWT Authentication
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-success"></i> Dependency Injection & DTOs
                  </li>
                </ul>
              </div>
            </div>

            {/* Database */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 p-4 bg-white border rounded-4 card-hover shadow-xs">
                <div className="p-3 rounded-3 bg-warning-subtle text-warning text-dark-emphasis d-inline-block mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-database fs-4"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">Database</h5>
                <span className="text-muted small font-monospace d-block mb-3">NoSQL Document Store</span>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-warning"></i> MongoDB Atlas / Community
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-warning"></i> MongoDB.Driver for C#
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-warning"></i> Resume Collections Schema
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-warning"></i> User Profiles & Audit History
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Service */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 p-4 bg-white border rounded-4 card-hover shadow-xs">
                <div className="p-3 rounded-3 bg-info-subtle text-info d-inline-block mb-3" style={{ width: 'fit-content' }}>
                  <i className="bi bi-cpu fs-4"></i>
                </div>
                <h5 className="fw-bold text-dark mb-1">AI & NLP</h5>
                <span className="text-muted small font-monospace d-block mb-3">Microservice Engine</span>
                <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-0">
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-info"></i> Python 3.11+
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-info"></i> FastAPI Asynchronous Engine
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-info"></i> NLP Entity Recognition
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="bi bi-check2 text-info"></i> Role Match Vector Calculations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Local Run Guide Card */}
        <div className="card p-4 p-md-5 bg-gradient-soft border rounded-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4 className="fw-bold text-dark mb-0">How to Run & Connect Locally</h4>
            <span className="badge bg-primary text-white font-monospace">Quickstart</span>
          </div>
          <p className="text-secondary small mb-3">
            The frontend is already configured with dedicated service abstractions (<code className="text-primary font-monospace">apiService.ts</code> and <code className="text-primary font-monospace">config.ts</code>). You can toggle between standalone demo mock mode and live ASP.NET Core API anytime.
          </p>
          <div className="bg-dark text-light p-3 rounded-3 font-monospace small mb-3 overflow-x-auto">
            <div># 1. Run the Frontend (React + Vite + Bootstrap):</div>
            <div className="text-info">npm install</div>
            <div className="text-info">npm run dev</div>
            <div className="mt-2"># 2. Run the ASP.NET Core Backend (in your backend project folder):</div>
            <div className="text-success">dotnet run --urls="http://localhost:5000"</div>
            <div className="mt-2"># 3. In src/services/config.ts, toggle:</div>
            <div className="text-warning">USE_MOCK_DATA: false</div>
          </div>
          <button onClick={onOpenBackendModal} className="btn btn-outline-primary rounded-pill px-4 py-2 font-monospace small">
            View Complete Controller & Endpoint Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
