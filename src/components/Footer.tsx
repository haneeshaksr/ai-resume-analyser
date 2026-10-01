import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBackendModal: () => void;
  onOpenGitHubModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBackendModal, onOpenGitHubModal }) => {
  return (
    <footer className="bg-white border-top mt-auto pt-5 pb-4 text-secondary">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Brand Col */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="d-flex align-items-center justify-content-center bg-primary text-white rounded-3 shadow-xs"
                style={{ width: '34px', height: '34px' }}
              >
                <i className="bi bi-cpu-fill fs-5"></i>
              </div>
              <span className="fs-5 text-dark fw-bold">AI Resume</span>
              <span className="fs-5 text-primary fw-bold">Analyzer</span>
            </div>
            <p className="text-secondary small mb-3 leading-relaxed">
              AI-powered resume insights for smarter career preparation. Understand your skills, improve your resume, and discover relevant career roles.
            </p>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="badge bg-light text-dark border font-monospace small">ASP.NET Core</span>
              <span className="badge bg-light text-dark border font-monospace small">MongoDB</span>
              <span className="badge bg-light text-dark border font-monospace small">FastAPI NLP</span>
              <span className="badge bg-light text-dark border font-monospace small">Bootstrap 5</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="col-lg-2 col-md-3 col-6">
            <h6 className="text-dark fw-bold mb-3 small text-uppercase tracking-wider">Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <button onClick={() => onNavigate('home')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  About Project
                </button>
              </li>
            </ul>
          </div>

          {/* Analysis Tools */}
          <div className="col-lg-3 col-md-3 col-6">
            <h6 className="text-dark fw-bold mb-3 small text-uppercase tracking-wider">Core Tools</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <button onClick={() => onNavigate('upload')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Resume Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('score')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Resume Profile Score
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('job-recommendations')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Job Role Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skill-gap')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Skill Gap Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learning-path')} className="btn btn-link p-0 text-secondary text-decoration-none hover-primary">
                  Personalized Learning Path
                </button>
              </li>
            </ul>
          </div>

          {/* Account & FSD Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-dark fw-bold mb-3 small text-uppercase tracking-wider">Full Stack Development</h6>
            <p className="small text-secondary mb-3">
              Built for college capstone demonstration & Full Stack Development interview portfolio.
            </p>
            <div className="d-flex flex-column gap-2">
              <button
                onClick={onOpenGitHubModal}
                className="btn btn-sm btn-dark d-inline-flex align-items-center justify-content-center gap-2 rounded-2 shadow-xs"
              >
                <i className="bi bi-github"></i>
                <span>GitHub Repository & Code</span>
              </button>
              <button
                onClick={onOpenBackendModal}
                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center gap-2 rounded-2"
              >
                <i className="bi bi-code-slash"></i>
                <span>Backend Architecture & APIs</span>
              </button>
              <div className="d-flex gap-2">
                <button onClick={() => onNavigate('login')} className="btn btn-sm btn-light border flex-fill">
                  Login
                </button>
                <button onClick={() => onNavigate('register')} className="btn btn-sm btn-light border flex-fill">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary-subtle my-4" />

        <div className="row align-items-center small text-muted">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <span>© 2026 AI Resume Analyzer. All rights reserved.</span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="me-3">Full Stack Development Project</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle">v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
