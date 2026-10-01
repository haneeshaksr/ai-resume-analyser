import React, { useState } from 'react';
import { JobRoleRecommendation } from '../types';

interface JobRecommendationsPageProps {
  roles: JobRoleRecommendation[];
  onSelectRoleForGap: (roleTitle: string) => void;
  onNavigate: (page: string) => void;
}

export const JobRecommendationsPage: React.FC<JobRecommendationsPageProps> = ({
  roles,
  onSelectRoleForGap,
  onNavigate,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack Engineering', 'Client Side Engineering', 'Enterprise Software', 'Server Side Engineering', 'Backend & Automation', 'Data & Analytics'];

  const filteredRoles = filterCategory === 'All'
    ? roles
    : roles.filter((r) => r.category === filterCategory);

  const handleViewGap = (roleTitle: string) => {
    onSelectRoleForGap(roleTitle);
    onNavigate('skill-gap');
  };

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Job Role Matching
              </span>
              <span className="text-muted small">Based on candidate ontology match</span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Recommended Job Roles</h2>
            <p className="text-secondary small mb-0 mt-1">
              Showing job roles matched against detected technical skills. Metric displays <strong>Role Match</strong> alignment (not probability of hiring).
            </p>
          </div>

          <button
            onClick={() => onNavigate('skill-gap')}
            className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-medium"
          >
            <i className="bi bi-bar-chart-steps me-1"></i> Skill Gap Analysis
          </button>
        </div>

        {/* Filter Pills */}
        <div className="d-flex flex-wrap gap-1.5 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm rounded-pill px-3 py-1 font-monospace ${
                filterCategory === cat ? 'btn-primary shadow-xs' : 'btn-light border text-secondary'
              }`}
              style={{ fontSize: '0.75rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Role Cards Grid */}
        <div className="row g-4">
          {filteredRoles.map((role) => (
            <div className="col-lg-6" key={role.id}>
              <div className="card h-100 p-4 bg-white border card-hover rounded-4 d-flex flex-column justify-content-between">
                <div>
                  {/* Card Header: Role Name & Role Match % */}
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                    <div>
                      <span className="badge bg-light text-muted border font-monospace mb-1" style={{ fontSize: '0.7rem' }}>
                        {role.category}
                      </span>
                      <h4 className="fw-bold text-dark mb-0">{role.title}</h4>
                    </div>

                    <div className="text-end">
                      <div className="d-inline-flex flex-column align-items-end">
                        <span className="badge bg-primary text-white fs-6 px-3 py-1.5 rounded-pill shadow-xs">
                          Role Match: {role.roleMatch}%
                        </span>
                        <span className="text-muted font-monospace" style={{ fontSize: '0.65rem' }}>
                          Ontology Score
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Role Match Progress Bar */}
                  <div className="progress mb-3" style={{ height: '7px' }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${role.roleMatch}%` }}
                    ></div>
                  </div>

                  {/* Description & Market Info */}
                  <p className="text-secondary small mb-3 leading-relaxed">
                    {role.description}
                  </p>

                  <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom text-muted small">
                    <div>
                      <i className="bi bi-cash-stack text-success me-1"></i>
                      <span>{role.avgSalary}</span>
                    </div>
                    <div>
                      <i className="bi bi-reception-4 text-primary me-1"></i>
                      <span>{role.demandLevel} Demand</span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="mb-3">
                    <span className="text-muted fw-semibold small d-block mb-1.5 font-monospace" style={{ fontSize: '0.72rem' }}>
                      Required Skills:
                    </span>
                    <div className="d-flex flex-wrap gap-1">
                      {role.requiredSkills.map((s, idx) => (
                        <span key={idx} className="badge bg-light text-dark border font-monospace" style={{ fontSize: '0.7rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Matched vs Missing Skills breakdown */}
                  <div className="row g-2 mb-3">
                    {/* Matched Skills */}
                    <div className="col-sm-6">
                      <div className="p-2.5 bg-success-subtle bg-opacity-40 rounded-3 border border-success-subtle h-100">
                        <span className="fw-bold text-success small d-block mb-1 font-monospace" style={{ fontSize: '0.72rem' }}>
                          Matched Skills ({role.matchedSkills.length}):
                        </span>
                        <div className="d-flex flex-wrap gap-1">
                          {role.matchedSkills.map((s, idx) => (
                            <span key={idx} className="badge bg-white text-success border border-success-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Missing Skills */}
                    <div className="col-sm-6">
                      <div className="p-2.5 bg-warning-subtle bg-opacity-40 rounded-3 border border-warning-subtle h-100">
                        <span className="fw-bold text-warning text-dark-emphasis small d-block mb-1 font-monospace" style={{ fontSize: '0.72rem' }}>
                          Missing Skills ({role.missingSkills.length}):
                        </span>
                        <div className="d-flex flex-wrap gap-1">
                          {role.missingSkills.map((s, idx) => (
                            <span key={idx} className="badge bg-white text-danger border border-danger-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                              ⚠ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action: View Skill Gap */}
                <div className="pt-2">
                  <button
                    onClick={() => handleViewGap(role.title)}
                    className="btn btn-outline-primary w-100 rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>View Skill Gap</span>
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
