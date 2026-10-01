import React from 'react';
import { ResumeAnalysisResult } from '../types';

interface ResumeScorePageProps {
  analysis: ResumeAnalysisResult | null;
  onNavigate: (page: string) => void;
}

export const ResumeScorePage: React.FC<ResumeScorePageProps> = ({ analysis, onNavigate }) => {
  if (!analysis) {
    return (
      <div className="p-5 text-center">
        <div className="card p-5 max-w-lg mx-auto bg-white border rounded-4 shadow-sm">
          <i className="bi bi-speedometer2 fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold text-dark mb-2">No resume score available yet.</h4>
          <p className="text-secondary small mb-4">
            Upload your resume to calculate an explainable quality profile score.
          </p>
          <button onClick={() => onNavigate('upload')} className="btn btn-primary rounded-pill px-4 py-2">
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const { scoreBreakdown } = analysis;
  const { totalScore } = scoreBreakdown;

  const scoreRows = [
    {
      category: 'Skills',
      score: scoreBreakdown.skillsScore,
      max: scoreBreakdown.skillsMax,
      percentage: (scoreBreakdown.skillsScore / scoreBreakdown.skillsMax) * 100,
      icon: 'bi-cpu',
      colorClass: 'bg-primary',
      tip: 'Add in-demand frontend frameworks like React and containerization tools like Docker.',
    },
    {
      category: 'Education',
      score: scoreBreakdown.educationScore,
      max: scoreBreakdown.educationMax,
      percentage: (scoreBreakdown.educationScore / scoreBreakdown.educationMax) * 100,
      icon: 'bi-mortarboard',
      colorClass: 'bg-success',
      tip: 'Strong standing. Ensure your expected graduation year and relevant coursework are highlighted.',
    },
    {
      category: 'Projects',
      score: scoreBreakdown.projectsScore,
      max: scoreBreakdown.projectsMax,
      percentage: (scoreBreakdown.projectsScore / scoreBreakdown.projectsMax) * 100,
      icon: 'bi-kanban',
      colorClass: 'bg-info',
      tip: 'Include live demo URLs and GitHub repository links for capstone full stack projects.',
    },
    {
      category: 'Experience',
      score: scoreBreakdown.experienceScore,
      max: scoreBreakdown.experienceMax,
      percentage: (scoreBreakdown.experienceScore / scoreBreakdown.experienceMax) * 100,
      icon: 'bi-briefcase',
      colorClass: 'bg-warning',
      tip: 'Add industrial internships or freelance web development experience to reach 15/15.',
    },
    {
      category: 'Certificates',
      score: scoreBreakdown.certificatesScore,
      max: scoreBreakdown.certificatesMax,
      percentage: (scoreBreakdown.certificatesScore / scoreBreakdown.certificatesMax) * 100,
      icon: 'bi-patch-check',
      colorClass: 'bg-indigo',
      tip: 'Pursue an advanced cloud certification (e.g. AWS Certified Developer or Azure AZ-204).',
    },
  ];

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 font-monospace mb-2">
            Explainable AI Scoring
          </span>
          <h2 className="fw-bold text-dark mb-1">Resume Profile Score</h2>
          <p className="text-secondary small">
            Transparent breakdown of detected credentials and technical readiness.
          </p>
        </div>

        {/* Large Resume Score Card */}
        <div className="card p-4 p-md-5 bg-white border rounded-4 shadow-sm mb-4">
          <div className="row align-items-center g-4">
            {/* Circular Gauge */}
            <div className="col-md-5 text-center border-md-end">
              <div
                className="score-circle mx-auto mb-3"
                style={{ ['--score-percent' as any]: totalScore }}
              >
                <div className="score-circle-inner">
                  <h1 className="display-4 fw-extrabold text-primary mb-0">{totalScore}</h1>
                  <span className="text-muted fw-semibold small">out of 100</span>
                </div>
              </div>

              <div className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 mb-2 font-monospace">
                High Competitive Strength
              </div>
              <p className="text-muted small mb-0">
                Score calibrated for Entry to Junior Full Stack Engineer positions.
              </p>
            </div>

            {/* Score Breakdown List */}
            <div className="col-md-7 ps-md-4">
              <h5 className="fw-bold text-dark mb-3">Scoring Metric Breakdown</h5>
              <div className="d-flex flex-column gap-3">
                {scoreRows.map((row, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between align-items-center small mb-1">
                      <span className="fw-semibold text-dark d-flex align-items-center gap-2">
                        <i className={`bi ${row.icon} text-primary`}></i>
                        <span>{row.category}</span>
                      </span>
                      <span className="fw-bold text-dark font-monospace">
                        {row.score}/{row.max}
                      </span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div
                        className={`progress-bar ${row.colorClass}`}
                        role="progressbar"
                        style={{ width: `${row.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mandatory Disclaimer Note from Prompt */}
          <div className="mt-4 pt-4 border-top">
            <div className="p-3 bg-light rounded-3 border d-flex align-items-start gap-3">
              <i className="bi bi-info-circle-fill text-primary fs-5 mt-0.5"></i>
              <div>
                <p className="text-dark fw-medium small mb-1">
                  &ldquo;{scoreBreakdown.summaryNote}&rdquo;
                </p>
                <small className="text-muted">
                  The Resume Profile Score reflects algorithmic pattern recognition across structural resume sections and industry terminology keywords.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Tips to Reach 90+ Score */}
        <div className="card p-4 bg-white border rounded-4 shadow-sm mb-4">
          <h5 className="fw-bold text-dark mb-3">
            <i className="bi bi-lightbulb-fill text-warning me-2"></i>
            How to Boost Your Score to 90+
          </h5>
          <div className="row g-3">
            {scoreRows.map((row, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-3 bg-light rounded-3 border h-100">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-white text-dark border font-monospace small">
                      {row.category}
                    </span>
                    <span className="small text-muted">({row.score}/{row.max})</span>
                  </div>
                  <p className="text-secondary small mb-0">{row.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('job-recommendations')}
              className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-xs"
            >
              Explore Job Role Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
