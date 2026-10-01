import React, { useState } from 'react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const repoUrl = 'https://github.com/haneeshaksr/ai-resume-analyzer.git';

  const gitCommands = [
    {
      label: '1. Clone this repository',
      cmd: `git clone ${repoUrl}`,
    },
    {
      label: '2. Or push existing project to your GitHub',
      cmd: `git init\ngit add .\ngit commit -m "feat: complete AI Resume Analyzer FSD platform"\ngit branch -M main\ngit remote add origin ${repoUrl}\ngit push -u origin main`,
    },
    {
      label: '3. Run locally',
      cmd: 'npm install\nnpm run dev',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1070 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white p-4 border-0">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white text-dark rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                <i className="bi bi-github fs-4"></i>
              </div>
              <div>
                <span className="badge bg-secondary font-monospace mb-1" style={{ fontSize: '0.7rem' }}>
                  Open Source Project
                </span>
                <h5 className="modal-title fw-bold mb-0">
                  GitHub Repository & Version Control Guide
                </h5>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 bg-white">
            {/* Repo Info Card */}
            <div className="p-3 bg-light rounded-3 border mb-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-journal-code text-primary fs-5"></i>
                  <span className="fw-bold text-dark font-monospace">haneeshaksr / ai-resume-analyzer</span>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill font-monospace small">
                    Public
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-white text-dark border font-monospace small">
                    <i className="bi bi-star-fill text-warning me-1"></i> Star
                  </span>
                  <span className="badge bg-white text-dark border font-monospace small">
                    <i className="bi bi-bezier2 me-1"></i> Fork
                  </span>
                </div>
              </div>

              <p className="text-secondary small mb-3">
                AI-Powered Resume Analyzer & Personalized Job Role Recommendation System built for Full Stack Development demonstration.
              </p>

              {/* Clone input bar with Copy button */}
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 text-muted font-monospace small">
                  HTTPS
                </span>
                <input
                  type="text"
                  readOnly
                  className="form-control font-monospace small bg-white border-start-0"
                  value={repoUrl}
                />
                <button
                  className="btn btn-primary d-flex align-items-center gap-1.5 px-3"
                  onClick={() => handleCopy(repoUrl, 999)}
                >
                  <i className={`bi ${copiedIndex === 999 ? 'bi-check-lg' : 'bi-clipboard'}`}></i>
                  <span>{copiedIndex === 999 ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>

            {/* Quick Git Commands */}
            <h6 className="fw-bold text-dark mb-3">
              <i className="bi bi-terminal-fill text-dark me-2"></i>
              Command Line Instructions (Git & Push)
            </h6>

            <div className="d-flex flex-column gap-3 mb-4">
              {gitCommands.map((item, idx) => (
                <div key={idx} className="border rounded-3 p-3 bg-light position-relative">
                  <div className="d-flex justify-content-between align-items-center mb-1.5">
                    <span className="fw-semibold text-dark small font-monospace">{item.label}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary py-0.5 px-2 rounded font-monospace small"
                      onClick={() => handleCopy(item.cmd, idx)}
                    >
                      <i className={`bi ${copiedIndex === idx ? 'bi-check-lg text-success' : 'bi-clipboard'} me-1`}></i>
                      {copiedIndex === idx ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="mb-0 bg-dark text-light p-2.5 rounded-2 font-monospace small overflow-x-auto">
                    <code>{item.cmd}</code>
                  </pre>
                </div>
              ))}
            </div>

            {/* Included in Repository */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 border h-100">
                  <span className="fw-bold text-dark small d-block mb-1">
                    <i className="bi bi-file-earmark-check text-success me-1.5"></i> Included in Repository:
                  </span>
                  <ul className="mb-0 ps-3 small text-secondary">
                    <li>Full React 19 + Bootstrap 5 Frontend source code</li>
                    <li>Complete README.md with system architecture diagrams</li>
                    <li>API Service layer ready for ASP.NET Core & FastAPI</li>
                    <li>Calibrated sample resume dataset & ontology maps</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 border h-100">
                  <span className="fw-bold text-dark small d-block mb-1">
                    <i className="bi bi-award text-primary me-1.5"></i> Viva & Interview Ready:
                  </span>
                  <ul className="mb-0 ps-3 small text-secondary">
                    <li>Clean commit history and modular file organization</li>
                    <li>FSD Multi-tier decoupled architecture</li>
                    <li>Transparent 100-point profile scoring explanation</li>
                    <li>Predefined role match & gap analysis ontologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-light p-3 border-top d-flex justify-content-between">
            <span className="text-muted small font-monospace">
              Branch: <strong>main</strong> • License: <strong>MIT</strong>
            </span>
            <button type="button" className="btn btn-dark rounded-pill px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
