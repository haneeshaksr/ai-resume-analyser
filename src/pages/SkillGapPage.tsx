import React, { useState, useEffect } from 'react';
import { getSkillGaps } from '../services/apiService';
import { SkillGapAnalysis } from '../types';

interface SkillGapPageProps {
  selectedRoleTitle: string;
  onSelectRole: (roleTitle: string) => void;
  onNavigate: (page: string) => void;
}

export const SkillGapPage: React.FC<SkillGapPageProps> = ({
  selectedRoleTitle,
  onSelectRole,
  onNavigate,
}) => {
  const [currentGap, setCurrentGap] = useState<SkillGapAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableRoles = [
    'Full Stack Developer',
    'Frontend Developer',
    '.NET Developer',
    'Backend Developer',
  ];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getSkillGaps(selectedRoleTitle).then((res) => {
      if (isMounted) {
        setCurrentGap(res);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedRoleTitle]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectRole(e.target.value);
  };

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-warning-subtle text-warning text-dark-emphasis border border-warning-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Comparative Gap Diagnostics
              </span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Your Skill Gap Analysis</h2>
            <p className="text-secondary small mb-0 mt-1">
              Detailed comparative analysis between your verified competencies and standard market requirements.
            </p>
          </div>

          {/* Role Selector Dropdown */}
          <div className="d-flex align-items-center gap-2">
            <label className="text-muted small fw-medium text-nowrap">Selected Role:</label>
            <select
              className="form-select form-select-sm fw-semibold rounded-pill px-3 py-1.5 border-primary"
              value={selectedRoleTitle}
              onChange={handleRoleChange}
              style={{ minWidth: '220px' }}
            >
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading || !currentGap ? (
          <div className="p-5 text-center bg-white rounded-4 border">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted small mt-2">Computing skill gap vectors...</p>
          </div>
        ) : (
          <>
            {/* Top Match Progress Banner */}
            <div className="card p-4 bg-white border rounded-4 shadow-sm mb-4">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-2">
                <div>
                  <h5 className="fw-bold text-dark mb-0">
                    Current Skill Match for <span className="text-primary">{currentGap.selectedRole}</span>
                  </h5>
                  <small className="text-muted">
                    Based on keyword and ontology alignment with job requirements
                  </small>
                </div>
                <div className="text-end">
                  <span className="display-6 fw-bold text-primary mb-0">{currentGap.currentMatch}%</span>
                  <span className="text-muted d-block font-monospace" style={{ fontSize: '0.7rem' }}>Match Ratio</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress mb-2" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${currentGap.currentMatch}%` }}
                ></div>
              </div>
              <div className="d-flex justify-content-between small text-muted font-monospace">
                <span>0% Entry Level</span>
                <span>Current Fit: {currentGap.currentMatch}%</span>
                <span>100% Complete Alignment</span>
              </div>
            </div>

            {/* TWO COLUMNS: MATCHED SKILLS vs SKILLS TO DEVELOP */}
            <div className="row g-4 mb-4">
              {/* Column 1: MATCHED SKILLS */}
              <div className="col-md-6">
                <div className="card p-4 h-100 bg-white border rounded-4 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-success text-white rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <i className="bi bi-check-lg fw-bold"></i>
                      </div>
                      <h5 className="fw-bold text-dark mb-0">MATCHED SKILLS</h5>
                    </div>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill font-monospace">
                      {currentGap.matchedSkills.length} Verified
                    </span>
                  </div>

                  <p className="text-secondary small mb-3">
                    These technical skills were successfully detected in your resume and meet standard requirements:
                  </p>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {currentGap.matchedSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-3 bg-success-subtle bg-opacity-30 border border-success-subtle d-flex align-items-center justify-content-between"
                      >
                        <span className="fw-semibold text-dark small">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {skill}
                        </span>
                        <span className="badge bg-white text-success border border-success-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                          Verified ✓
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 2: SKILLS TO DEVELOP */}
              <div className="col-md-6">
                <div className="card p-4 h-100 bg-white border rounded-4 shadow-sm">
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-warning text-white rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <i className="bi bi-exclamation-triangle-fill text-dark fw-bold"></i>
                      </div>
                      <h5 className="fw-bold text-dark mb-0">SKILLS TO DEVELOP</h5>
                    </div>
                    <span className="badge bg-warning-subtle text-dark border border-warning-subtle rounded-pill font-monospace">
                      {currentGap.skillsToDevelop.length} Skill Gaps
                    </span>
                  </div>

                  <p className="text-secondary small mb-3">
                    Acquiring these high-impact technologies will directly advance your match for this role:
                  </p>

                  <div className="d-flex flex-column gap-2 mb-3">
                    {currentGap.skillsToDevelop.map((skill, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-3 bg-warning-subtle bg-opacity-40 border border-warning-subtle d-flex align-items-center justify-content-between"
                      >
                        <span className="fw-semibold text-dark small">
                          <i className="bi bi-cone-striped text-warning me-2"></i>
                          {skill}
                        </span>
                        <span className="badge bg-white text-danger border border-danger-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                          Priority ⚠
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation action plan */}
                  <div className="p-3 bg-light rounded-3 border mt-auto">
                    <span className="fw-bold text-dark small d-block mb-1.5">Recommended Actions:</span>
                    <ul className="mb-0 ps-3 text-secondary small">
                      {currentGap.recommendedActions.map((act, i) => (
                        <li key={i} className="mb-1 leading-relaxed">{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA to Learning Path */}
            <div className="p-4 bg-gradient-card rounded-4 border shadow-sm d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <h5 className="fw-bold text-dark mb-1">Bridge Your Gaps with a Structured Roadmap</h5>
                <p className="text-secondary small mb-0">
                  Follow a 5-step curriculum curated for these exact technologies from Beginner to Advanced.
                </p>
              </div>
              <button
                onClick={() => onNavigate('learning-path')}
                className="btn btn-primary rounded-pill px-4 py-2.5 fw-semibold shadow-xs flex-shrink-0 d-inline-flex align-items-center gap-2"
              >
                <span>View Learning Path</span>
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
