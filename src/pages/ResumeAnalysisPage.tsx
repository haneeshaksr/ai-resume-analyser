import React, { useState } from 'react';
import { ResumeAnalysisResult, SkillCategory } from '../types';

interface ResumeAnalysisPageProps {
  analysis: ResumeAnalysisResult | null;
  onNavigate: (page: string) => void;
}

export const ResumeAnalysisPage: React.FC<ResumeAnalysisPageProps> = ({ analysis, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!analysis) {
    return (
      <div className="p-5 text-center">
        <div className="card p-5 max-w-lg mx-auto bg-white border rounded-4 shadow-sm">
          <i className="bi bi-file-earmark-x fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold text-dark mb-2">No resume analyzed yet.</h4>
          <p className="text-secondary small mb-4">
            Upload and analyze a resume to inspect extracted information and detected technical skills.
          </p>
          <button
            onClick={() => onNavigate('upload')}
            className="btn btn-primary rounded-pill px-4 py-2"
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const { resumeInfo, detectedSkills } = analysis;

  const categories: (SkillCategory | 'All')[] = [
    'All',
    'Programming',
    'Frontend',
    'Backend',
    'Database',
    'Tools',
    'AI/ML',
  ];

  const getBadgeClass = (cat: SkillCategory) => {
    switch (cat) {
      case 'Programming':
        return 'badge-programming';
      case 'Frontend':
        return 'badge-frontend';
      case 'Backend':
        return 'badge-backend';
      case 'Database':
        return 'badge-database';
      case 'Tools':
        return 'badge-tools';
      case 'AI/ML':
        return 'badge-aiml';
      default:
        return 'bg-secondary text-white';
    }
  };

  const filteredSkills = detectedSkills.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Extraction Summary
              </span>
              <span className="text-muted small">Analyzed on {analysis.analyzedAt}</span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Extracted Resume & Skill Profile</h2>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={() => onNavigate('score')}
              className="btn btn-primary btn-sm rounded-pill px-3 py-2 fw-medium shadow-xs"
            >
              <i className="bi bi-speedometer2 me-1"></i> View Resume Score
            </button>
            <button
              onClick={() => onNavigate('job-recommendations')}
              className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-medium"
            >
              <i className="bi bi-briefcase me-1"></i> Job Matches
            </button>
          </div>
        </div>

        {/* ================= RESUME INFORMATION SECTION ================= */}
        <div className="card p-4 p-md-5 bg-white border rounded-4 shadow-sm mb-4">
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary text-white rounded-3 p-2 shadow-xs" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-file-earmark-person-fill fs-5"></i>
              </div>
              <h4 className="fw-bold text-dark mb-0">Resume Information</h4>
            </div>
            <span className="badge bg-light text-muted border font-monospace small">
              {analysis.fileName} ({analysis.fileSize})
            </span>
          </div>

          <div className="row g-4">
            {/* Candidate Identity */}
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <span className="text-muted small d-block mb-1 font-monospace">Candidate Name</span>
                <h5 className="fw-bold text-dark mb-2">{resumeInfo.name}</h5>
                <div className="d-flex flex-column gap-1 small text-secondary">
                  <div>
                    <i className="bi bi-envelope text-primary me-2"></i>
                    <span>{resumeInfo.email}</span>
                  </div>
                  <div>
                    <i className="bi bi-telephone text-primary me-2"></i>
                    <span>{resumeInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <span className="text-muted small d-block mb-1 font-monospace">Education</span>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-mortarboard-fill text-success fs-5 mt-1"></i>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">{resumeInfo.education}</h6>
                    <small className="text-muted">Degree verified via institutional keyword parsing</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="col-12">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted small d-block mb-1 font-monospace">Experience Summary</span>
                <div className="d-flex align-items-start gap-2">
                  <i className="bi bi-briefcase-fill text-primary fs-5 mt-1"></i>
                  <div>
                    <p className="fw-medium text-dark mb-0 small">{resumeInfo.experience}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="col-12">
              <span className="text-muted small d-block mb-2 font-monospace">Certifications</span>
              <div className="d-flex flex-wrap gap-2">
                {resumeInfo.certifications.map((cert, idx) => (
                  <div key={idx} className="badge bg-light text-dark border p-2 d-flex align-items-center gap-2 rounded-3 shadow-xs">
                    <i className="bi bi-patch-check-fill text-primary"></i>
                    <span className="fw-medium text-wrap text-start">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="col-12">
              <span className="text-muted small d-block mb-2 font-monospace">Key Technical Projects</span>
              <div className="row g-3">
                {resumeInfo.projects.map((proj, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className="card h-100 p-3 bg-white border rounded-3 shadow-xs">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-code-square text-primary fs-5"></i>
                        <h6 className="fw-bold text-dark mb-0 small text-truncate" title={proj.title}>
                          {proj.title}
                        </h6>
                      </div>
                      <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '0.78rem' }}>
                        {proj.description}
                      </p>
                      <div className="d-flex flex-wrap gap-1 pt-2 border-top">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="badge bg-light text-secondary border font-monospace" style={{ fontSize: '0.65rem' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DETECTED SKILLS SECTION ================= */}
        <div className="card p-4 p-md-5 bg-white border rounded-4 shadow-sm">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-2 border-bottom">
            <div>
              <div className="d-flex align-items-center gap-2">
                <div className="bg-indigo text-white rounded-3 p-2 shadow-xs" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-cpu fs-5"></i>
                </div>
                <h4 className="fw-bold text-dark mb-0">Detected Skills</h4>
              </div>
              <small className="text-muted">
                {detectedSkills.length} skills recognized by NLP classification models
              </small>
            </div>

            {/* Search Input */}
            <div className="input-group" style={{ maxWidth: '240px' }}>
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search small"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0 py-1.5 small"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="d-flex flex-wrap gap-1.5 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1 font-monospace ${
                  selectedCategory === cat ? 'btn-primary shadow-xs' : 'btn-light border text-secondary'
                }`}
                style={{ fontSize: '0.78rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Badges Matrix */}
          <div className="p-4 bg-light rounded-3 border mb-4">
            {filteredSkills.length === 0 ? (
              <div className="text-center text-muted py-3 small">
                No skills matched your search filter.
              </div>
            ) : (
              <div className="d-flex flex-wrap gap-2">
                {filteredSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`skill-badge ${getBadgeClass(skill.category)} shadow-xs`}
                  >
                    <span>{skill.name}</span>
                    <span
                      className="opacity-75 font-monospace"
                      style={{ fontSize: '0.7rem' }}
                    >
                      • {skill.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Breakdown Counter */}
          <div className="row g-2 text-center">
            {categories.filter(c => c !== 'All').map((cat) => {
              const count = detectedSkills.filter(s => s.category === cat).length;
              return (
                <div className="col-4 col-md-2" key={cat}>
                  <div className="p-2 bg-white rounded-3 border">
                    <span className="fw-bold text-dark d-block fs-5">{count}</span>
                    <span className="text-muted font-monospace" style={{ fontSize: '0.68rem' }}>{cat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
