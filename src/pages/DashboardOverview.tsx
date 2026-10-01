import React from 'react';
import { UserProfile, ResumeAnalysisResult } from '../types';

interface DashboardOverviewProps {
  currentUser: UserProfile;
  analysis: ResumeAnalysisResult | null;
  onNavigate: (page: string) => void;
  onSelectRoleForGap: (roleTitle: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentUser,
  analysis,
  onNavigate,
  onSelectRoleForGap,
}) => {
  // If no resume analyzed yet
  if (!analysis) {
    return (
      <div className="p-4 p-lg-5">
        <div className="card p-5 text-center bg-white border rounded-4 shadow-sm max-w-2xl mx-auto">
          <div
            className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mx-auto mb-3"
            style={{ width: '64px', height: '64px' }}
          >
            <i className="bi bi-file-earmark-arrow-up fs-2"></i>
          </div>
          <h4 className="fw-bold text-dark mb-2">No resume analyzed yet.</h4>
          <p className="text-secondary small mb-4">
            Upload your technical resume in PDF or DOCX format to detect your skills, calculate your profile score, and generate matching job roles.
          </p>
          <div>
            <button
              onClick={() => onNavigate('upload')}
              className="btn btn-primary px-4 py-2.5 rounded-pill fw-semibold shadow-xs"
            >
              <i className="bi bi-cloud-arrow-up me-2"></i>
              Upload Resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  const score = analysis.scoreBreakdown.totalScore;
  const skillsCount = analysis.detectedSkills.length;
  const recommendedRolesCount = analysis.jobRecommendations.length;
  const skillGapsCount = analysis.skillGap.skillsToDevelop.length;

  return (
    <div className="p-3 p-md-4 p-lg-5">
      {/* Welcome Banner */}
      <div className="bg-gradient-primary rounded-4 p-4 p-md-5 text-white mb-4 shadow-sm position-relative overflow-hidden">
        <div className="position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <span className="badge bg-white bg-opacity-25 rounded-pill px-3 py-1 font-monospace mb-2" style={{ fontSize: '0.72rem' }}>
                Full Stack Candidate Portal
              </span>
              <h2 className="display-6 fw-bold mb-1">
                Welcome back, {currentUser.name}!
              </h2>
              <p className="text-white text-opacity-90 mb-0 small" style={{ fontSize: '0.95rem' }}>
                Your resume <span className="fw-semibold text-white">&ldquo;{analysis.fileName}&rdquo;</span> is actively analyzed. Here is your current career intelligence summary.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => onNavigate('upload')}
                className="btn btn-light text-primary fw-semibold rounded-pill px-3 py-2 shadow-xs d-flex align-items-center gap-1.5"
              >
                <i className="bi bi-arrow-repeat"></i>
                <span>Upload New Resume</span>
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-outline-light rounded-pill px-3 py-2 d-none d-sm-flex align-items-center gap-1.5"
                title="Print or save PDF summary"
              >
                <i className="bi bi-printer"></i>
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Four Summary Cards */}
      <div className="row g-3 g-md-4 mb-4">
        {/* 1. Resume Score */}
        <div className="col-xl-3 col-sm-6">
          <div
            className="card p-3 p-md-4 h-100 card-hover bg-white border cursor-pointer"
            onClick={() => onNavigate('score')}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold small text-uppercase">Resume Score</span>
              <div className="p-2 rounded-3 bg-primary-subtle text-primary">
                <i className="bi bi-speedometer2 fs-5"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <h2 className="display-6 fw-bold text-dark mb-0">{score}</h2>
              <span className="text-muted fw-medium fs-5">/100</span>
            </div>
            <div className="progress mb-2" style={{ height: '6px' }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="text-success small fw-medium d-flex align-items-center gap-1">
              <i className="bi bi-graph-up-arrow"></i>
              <span>High Profile Strength</span>
            </span>
          </div>
        </div>

        {/* 2. Skills Detected */}
        <div className="col-xl-3 col-sm-6">
          <div
            className="card p-3 p-md-4 h-100 card-hover bg-white border cursor-pointer"
            onClick={() => onNavigate('analysis')}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold small text-uppercase">Skills Detected</span>
              <div className="p-2 rounded-3 bg-indigo-subtle text-indigo">
                <i className="bi bi-cpu fs-5"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <h2 className="display-6 fw-bold text-dark mb-0">{skillsCount}</h2>
              <span className="text-muted small">verified</span>
            </div>
            <div className="d-flex flex-wrap gap-1 mb-2">
              <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: '0.68rem' }}>Frontend</span>
              <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: '0.68rem' }}>Backend</span>
              <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: '0.68rem' }}>Database</span>
            </div>
            <span className="text-primary small fw-medium d-flex align-items-center gap-1">
              <span>View categorized skills</span>
              <i className="bi bi-arrow-right small"></i>
            </span>
          </div>
        </div>

        {/* 3. Recommended Roles */}
        <div className="col-xl-3 col-sm-6">
          <div
            className="card p-3 p-md-4 h-100 card-hover bg-white border cursor-pointer"
            onClick={() => onNavigate('job-recommendations')}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold small text-uppercase">Recommended Roles</span>
              <div className="p-2 rounded-3 bg-success-subtle text-success">
                <i className="bi bi-briefcase fs-5"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <h2 className="display-6 fw-bold text-dark mb-0">{recommendedRolesCount}</h2>
              <span className="text-muted small">roles matched</span>
            </div>
            <p className="text-muted small mb-2 text-truncate">
              Top match: <strong className="text-dark">{analysis.jobRecommendations[0]?.title}</strong> (85%)
            </p>
            <span className="text-success small fw-medium d-flex align-items-center gap-1">
              <span>Compare requirements</span>
              <i className="bi bi-arrow-right small"></i>
            </span>
          </div>
        </div>

        {/* 4. Skill Gaps */}
        <div className="col-xl-3 col-sm-6">
          <div
            className="card p-3 p-md-4 h-100 card-hover bg-white border cursor-pointer"
            onClick={() => onNavigate('skill-gap')}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold small text-uppercase">Skill Gaps</span>
              <div className="p-2 rounded-3 bg-warning-subtle text-warning">
                <i className="bi bi-bar-chart-steps fs-5"></i>
              </div>
            </div>
            <div className="d-flex align-items-baseline gap-1 mb-2">
              <h2 className="display-6 fw-bold text-dark mb-0">{skillGapsCount}</h2>
              <span className="text-muted small">to develop</span>
            </div>
            <p className="text-muted small mb-2 text-truncate">
              For: <span className="text-dark fw-semibold">{analysis.skillGap.selectedRole}</span>
            </p>
            <span className="text-warning text-dark-emphasis small fw-medium d-flex align-items-center gap-1">
              <span>Inspect side-by-side</span>
              <i className="bi bi-arrow-right small"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Score Gauge preview + Job Recommendations preview */}
      <div className="row g-4 mb-4">
        {/* Left: Quick Score Breakdown */}
        <div className="col-lg-5">
          <div className="card p-4 h-100 bg-white border">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold text-dark mb-0">Score Summary</h5>
                <small className="text-muted">Explainable Resume Index</small>
              </div>
              <button
                onClick={() => onNavigate('score')}
                className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                style={{ fontSize: '0.75rem' }}
              >
                Full Breakdown
              </button>
            </div>

            {/* Circular Gauge */}
            <div className="text-center my-3">
              <div
                className="score-circle mx-auto"
                style={{ ['--score-percent' as any]: score }}
              >
                <div className="score-circle-inner">
                  <span className="display-6 fw-bold text-primary">{score}</span>
                  <span className="text-muted small" style={{ fontSize: '0.75rem' }}>out of 100</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="d-flex flex-column gap-2 mt-2">
              <div className="d-flex justify-content-between small">
                <span className="text-muted">Skills Detected</span>
                <span className="fw-bold text-dark">{analysis.scoreBreakdown.skillsScore}/40</span>
              </div>
              <div className="progress">
                <div className="progress-bar bg-primary" style={{ width: `${(analysis.scoreBreakdown.skillsScore / 40) * 100}%` }}></div>
              </div>

              <div className="d-flex justify-content-between small pt-1">
                <span className="text-muted">Education Evaluation</span>
                <span className="fw-bold text-dark">{analysis.scoreBreakdown.educationScore}/20</span>
              </div>
              <div className="progress">
                <div className="progress-bar bg-success" style={{ width: `${(analysis.scoreBreakdown.educationScore / 20) * 100}%` }}></div>
              </div>

              <div className="d-flex justify-content-between small pt-1">
                <span className="text-muted">Technical Projects</span>
                <span className="fw-bold text-dark">{analysis.scoreBreakdown.projectsScore}/15</span>
              </div>
              <div className="progress">
                <div className="progress-bar bg-info" style={{ width: `${(analysis.scoreBreakdown.projectsScore / 15) * 100}%` }}></div>
              </div>
            </div>

            <p className="text-muted small mt-3 mb-0" style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
              &ldquo;{analysis.scoreBreakdown.summaryNote}&rdquo;
            </p>
          </div>
        </div>

        {/* Right: Top Role Matches */}
        <div className="col-lg-7">
          <div className="card p-4 h-100 bg-white border">
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold text-dark mb-0">Top Role Matches</h5>
                <small className="text-muted">Predefined role alignment</small>
              </div>
              <button
                onClick={() => onNavigate('job-recommendations')}
                className="btn btn-sm btn-outline-primary rounded-pill px-2.5 py-1"
                style={{ fontSize: '0.75rem' }}
              >
                View All Roles
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {analysis.jobRecommendations.slice(0, 3).map((role) => (
                <div
                  key={role.id}
                  className="p-3 rounded-3 border bg-light d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 card-lift"
                >
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h6 className="fw-bold text-dark mb-0">{role.title}</h6>
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.68rem' }}>
                        Role Match: {role.roleMatch}%
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-1 mb-1">
                      {role.matchedSkills.slice(0, 4).map((s, i) => (
                        <span key={i} className="badge bg-white text-success border border-success-subtle font-monospace" style={{ fontSize: '0.65rem' }}>
                          ✓ {s}
                        </span>
                      ))}
                      {role.missingSkills.slice(0, 2).map((s, i) => (
                        <span key={i} className="badge bg-white text-danger border border-danger-subtle font-monospace" style={{ fontSize: '0.65rem' }}>
                          ⚠ {s}
                        </span>
                      ))}
                    </div>
                    <small className="text-muted d-block">{role.avgSalary} • {role.demandLevel} Demand</small>
                  </div>

                  <button
                    onClick={() => {
                      onSelectRoleForGap(role.title);
                      onNavigate('skill-gap');
                    }}
                    className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 flex-shrink-0 align-self-start align-self-sm-center"
                  >
                    View Skill Gap
                  </button>
                </div>
              ))}
            </div>

            {/* Quick action to learning path */}
            <div className="mt-4 p-3 bg-primary-subtle rounded-3 border border-primary-subtle d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-bold text-primary mb-0">Personalized Learning Roadmap</h6>
                <small className="text-secondary">5 sequential steps prepared to bridge your technical gaps</small>
              </div>
              <button
                onClick={() => onNavigate('learning-path')}
                className="btn btn-sm btn-primary rounded-pill px-3"
              >
                Start Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
