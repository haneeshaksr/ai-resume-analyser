import React from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBackendModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBackendModal }) => {
  const features = [
    {
      icon: 'bi-file-earmark-code',
      title: '1. AI Resume Analysis',
      description: 'Analyze uploaded resumes and extract relevant information seamlessly with robust parsing algorithms.',
      badge: 'NLP Parsing',
      color: 'primary',
    },
    {
      icon: 'bi-cpu',
      title: '2. Skill Detection',
      description: 'Identify technical and professional skills across Programming, Frontend, Backend, Databases, and Tools.',
      badge: 'Categorized',
      color: 'indigo',
    },
    {
      icon: 'bi-speedometer2',
      title: '3. Resume Profile Score',
      description: 'Generate an explainable profile score based on available resume information, broken down into 5 distinct categories.',
      badge: 'Explainable AI',
      color: 'success',
    },
    {
      icon: 'bi-briefcase',
      title: '4. Job Role Matching',
      description: 'Compare detected skills with predefined job-role requirements and calculate authentic Role Match percentages.',
      badge: 'Ontology Engine',
      color: 'info',
    },
    {
      icon: 'bi-bar-chart-steps',
      title: '5. Skill Gap Analysis',
      description: 'Identify skills that may be missing for selected roles, contrasting strengths against required tech stacks.',
      badge: 'Side-by-Side',
      color: 'warning',
    },
    {
      icon: 'bi-signpost-split',
      title: '6. Learning Recommendations',
      description: 'Suggest areas to learn based on detected skill gaps, ordered from Beginner to Advanced with curated milestones.',
      badge: 'Step-by-Step',
      color: 'danger',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'UPLOAD RESUME',
      subtitle: 'Upload PDF or DOCX',
      description: 'Drag and drop your current technical resume or choose one of our pre-calibrated sample profiles.',
      icon: 'bi-cloud-arrow-up',
    },
    {
      num: '02',
      title: 'AI ANALYSIS',
      subtitle: 'Extract resume information & skills',
      description: 'Our system extracts educational background, work history, projects, and detects technical skills.',
      icon: 'bi-cpu',
    },
    {
      num: '03',
      title: 'SKILL MATCHING',
      subtitle: 'Compare skills with job-role requirements',
      description: 'Calculates skill alignment against modern full stack, backend, frontend, and data engineering standards.',
      icon: 'bi-intersect',
    },
    {
      num: '04',
      title: 'GET INSIGHTS',
      subtitle: 'Role matches, skill gaps & learning paths',
      description: 'Receive your transparent profile score, explore matching careers, and follow customized learning roadmaps.',
      icon: 'bi-graph-up-arrow',
    },
  ];

  return (
    <div className="homepage-wrapper">
      {/* ================= HERO SECTION ================= */}
      <section className="py-5 py-lg-6 bg-gradient-soft border-bottom position-relative overflow-hidden">
        {/* Decorative background blurs */}
        <div
          className="position-absolute rounded-circle bg-primary opacity-10 filter-blur"
          style={{ width: '400px', height: '400px', top: '-100px', right: '-80px', filter: 'blur(80px)' }}
        ></div>
        <div
          className="position-absolute rounded-circle bg-info opacity-10 filter-blur"
          style={{ width: '350px', height: '350px', bottom: '-80px', left: '-60px', filter: 'blur(70px)' }}
        ></div>

        <div className="container position-relative">
          <div className="row align-items-center g-5">
            {/* Left Column */}
            <div className="col-lg-6 text-center text-lg-start">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-white border shadow-xs mb-3">
                <span className="badge bg-primary text-white rounded-pill px-2 py-0.5" style={{ fontSize: '0.72rem' }}>
                  FSD Capstone
                </span>
                <span className="text-secondary small fw-medium">
                  AI-Powered Career Intelligence Platform
                </span>
              </div>

              <h1 className="display-4 fw-extrabold text-dark tracking-tight mb-3">
                Build a Stronger <span className="text-primary text-gradient">Resume with AI</span>
              </h1>

              <p className="lead text-primary fw-semibold mb-2" style={{ fontSize: '1.15rem' }}>
                &ldquo;Understand your skills. Improve your resume. Discover relevant career roles.&rdquo;
              </p>

              <p className="text-secondary mb-4 leading-relaxed fs-6">
                Analyze your resume, discover your skills, identify skill gaps, and explore job roles that match your current profile with explainable scoring and structured learning paths.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
                <button
                  onClick={() => onNavigate('upload')}
                  className="btn btn-primary btn-lg px-4 py-2.5 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2"
                >
                  <i className="bi bi-file-earmark-text"></i>
                  <span>Analyze My Resume</span>
                </button>

                <button
                  onClick={() => onNavigate('register')}
                  className="btn btn-outline-dark btn-lg px-4 py-2.5 rounded-pill fw-semibold d-flex align-items-center gap-2"
                >
                  <span>Get Started</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 border-top d-flex align-items-center justify-content-center justify-content-lg-start gap-4 text-muted small">
                <div className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Explainable Score</span>
                </div>
                <div className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Role Match %</span>
                </div>
                <div className="d-flex align-items-center gap-1.5">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  <span>Zero Guesswork</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Flow Illustration & Floating Cards */}
            <div className="col-lg-6">
              <div className="position-relative p-2 p-md-4">
                {/* Main Workflow Showcase Card */}
                <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white p-4">
                  {/* Top Header of Card */}
                  <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <span className="p-2 rounded-3 bg-primary-subtle text-primary">
                        <i className="bi bi-stars fs-5"></i>
                      </span>
                      <div>
                        <h6 className="mb-0 fw-bold text-dark">Automated Resume Intelligence Flow</h6>
                        <small className="text-muted">Live Analysis Pipeline Demonstration</small>
                      </div>
                    </div>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1">
                      <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }}></i> Active Engine
                    </span>
                  </div>

                  {/* Flow Steps Diagram: Resume -> AI Analysis -> Skills -> Job Roles */}
                  <div className="bg-light p-3 rounded-3 mb-4 border">
                    <div className="d-flex align-items-center justify-content-between text-center gap-1">
                      {/* Flow Node 1 */}
                      <div className="flex-fill">
                        <div className="bg-white text-primary rounded-3 p-2.5 mx-auto mb-1 shadow-xs border" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-file-earmark-pdf fs-5"></i>
                        </div>
                        <span className="fw-bold small text-dark d-block" style={{ fontSize: '0.78rem' }}>Resume</span>
                        <span className="text-muted font-monospace" style={{ fontSize: '0.65rem' }}>PDF / DOCX</span>
                      </div>

                      <i className="bi bi-arrow-right text-primary opacity-50 fs-5"></i>

                      {/* Flow Node 2 */}
                      <div className="flex-fill">
                        <div className="bg-primary text-white rounded-3 p-2.5 mx-auto mb-1 shadow-xs" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-cpu fs-5"></i>
                        </div>
                        <span className="fw-bold small text-dark d-block" style={{ fontSize: '0.78rem' }}>AI Analysis</span>
                        <span className="text-muted font-monospace" style={{ fontSize: '0.65rem' }}>FastAPI NLP</span>
                      </div>

                      <i className="bi bi-arrow-right text-primary opacity-50 fs-5"></i>

                      {/* Flow Node 3 */}
                      <div className="flex-fill">
                        <div className="bg-white text-indigo rounded-3 p-2.5 mx-auto mb-1 shadow-xs border" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-tags-fill fs-5 text-indigo"></i>
                        </div>
                        <span className="fw-bold small text-dark d-block" style={{ fontSize: '0.78rem' }}>Skills</span>
                        <span className="text-muted font-monospace" style={{ fontSize: '0.65rem' }}>Classified</span>
                      </div>

                      <i className="bi bi-arrow-right text-primary opacity-50 fs-5"></i>

                      {/* Flow Node 4 */}
                      <div className="flex-fill">
                        <div className="bg-success text-white rounded-3 p-2.5 mx-auto mb-1 shadow-xs" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-briefcase-fill fs-5"></i>
                        </div>
                        <span className="fw-bold small text-dark d-block" style={{ fontSize: '0.78rem' }}>Job Roles</span>
                        <span className="text-muted font-monospace" style={{ fontSize: '0.65rem' }}>Ranked Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample Live Analysis Snapshot */}
                  <div className="card border bg-white p-3 rounded-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="text-muted small fw-medium">Candidate: Alex Johnson (Full Stack Aspirant)</span>
                      <span className="badge bg-primary text-white rounded-pill">Analyzed</span>
                    </div>

                    {/* Progress bars inside card */}
                    <div className="mb-2">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-semibold text-dark">Full Stack Developer Match</span>
                        <span className="fw-bold text-primary">85%</span>
                      </div>
                      <div className="progress" style={{ height: '7px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-1 mt-2">
                      <span className="badge badge-frontend">HTML5</span>
                      <span className="badge badge-frontend">CSS3</span>
                      <span className="badge badge-programming">JavaScript</span>
                      <span className="badge badge-backend">ASP.NET</span>
                      <span className="badge badge-database">MongoDB</span>
                      <span className="badge badge-tools">Git</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: Resume Score 83/100 */}
                <div
                  className="card position-absolute bg-white shadow-lg border-0 rounded-3 p-3 d-flex flex-row align-items-center gap-3 animate-float"
                  style={{
                    bottom: '-25px',
                    left: '-20px',
                    maxWidth: '240px',
                    zIndex: 3,
                  }}
                >
                  <div className="bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px' }}>
                    <i className="bi bi-speedometer2 fs-5"></i>
                  </div>
                  <div>
                    <span className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Calculated Quality</span>
                    <span className="fw-bold text-dark fs-5">Resume Score 83/100</span>
                  </div>
                </div>

                {/* Floating Card 2: 12 Skills Detected */}
                <div
                  className="card position-absolute bg-white shadow-lg border-0 rounded-3 p-2.5 d-flex flex-row align-items-center gap-2.5"
                  style={{
                    top: '-15px',
                    right: '-15px',
                    maxWidth: '210px',
                    zIndex: 3,
                  }}
                >
                  <div className="bg-success text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                    <i className="bi bi-check2-all fs-5"></i>
                  </div>
                  <div>
                    <span className="fw-bold text-dark d-block small">12 Skills Detected</span>
                    <span className="text-success small fw-medium" style={{ fontSize: '0.7rem' }}>Across 5 Categories</span>
                  </div>
                </div>

                {/* Floating Card 3: 4 Role Matches */}
                <div
                  className="card position-absolute bg-white shadow-md border-0 rounded-3 p-2 d-none d-md-flex flex-row align-items-center gap-2"
                  style={{
                    top: '40%',
                    right: '-30px',
                    maxWidth: '180px',
                    zIndex: 3,
                  }}
                >
                  <div className="bg-info-subtle text-info rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    <i className="bi bi-briefcase fs-6 text-primary"></i>
                  </div>
                  <div>
                    <span className="fw-bold text-dark d-block" style={{ fontSize: '0.8rem' }}>4 Role Matches</span>
                    <span className="text-muted" style={{ fontSize: '0.68rem' }}>85% Max Fit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-5 py-lg-6 bg-white border-bottom" id="features">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 mb-2">
              Capabilities
            </span>
            <h2 className="display-6 fw-bold text-dark tracking-tight">
              Everything You Need to Understand Your Resume
            </h2>
            <p className="text-secondary lead fs-6">
              Our intelligent multi-stage system breaks down technical resumes into explainable metrics, pinpointing missing skills and matching you with high-potential industry roles.
            </p>
          </div>

          <div className="row g-4">
            {features.map((f, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="card h-100 card-hover p-4 bg-white border">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 bg-primary-subtle text-primary shadow-xs"
                      style={{ width: '50px', height: '50px' }}
                    >
                      <i className={`bi ${f.icon} fs-4`}></i>
                    </div>
                    <span className="badge bg-light text-secondary border font-monospace small">
                      {f.badge}
                    </span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{f.title}</h5>
                  <p className="text-secondary small mb-3 flex-grow-1 leading-relaxed">
                    {f.description}
                  </p>
                  <div className="pt-2 border-top">
                    <button
                      onClick={() => onNavigate('upload')}
                      className="btn btn-link p-0 text-primary text-decoration-none fw-semibold small d-inline-flex align-items-center gap-1"
                    >
                      <span>Explore feature</span>
                      <i className="bi bi-chevron-right small"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-5 py-lg-6 bg-light border-bottom position-relative" id="how-it-works">
        <div className="container position-relative">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 mb-2">
              Workflow
            </span>
            <h2 className="display-6 fw-bold text-dark tracking-tight">
              How It Works
            </h2>
            <p className="text-secondary fs-6">
              Four structured phases from initial resume ingestion to personalized career roadmap generation.
            </p>
          </div>

          {/* Visual connected cards */}
          <div className="position-relative">
            <div className="step-timeline-connector"></div>

            <div className="row g-4 position-relative" style={{ zIndex: 2 }}>
              {steps.map((s, idx) => (
                <div className="col-lg-3 col-md-6 text-center" key={idx}>
                  <div className="card h-100 p-4 border bg-white card-lift">
                    <div className="step-circle bg-primary text-white">
                      <i className={`bi ${s.icon} fs-3`}></i>
                      <span
                        className="position-absolute bg-dark text-white rounded-circle font-monospace fw-bold"
                        style={{
                          width: '24px',
                          height: '24px',
                          fontSize: '0.72rem',
                          top: '-4px',
                          right: '-4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill mb-2 font-monospace mx-auto" style={{ fontSize: '0.7rem' }}>
                      STEP {s.num}
                    </span>
                    <h5 className="fw-bold text-dark mb-1">{s.title}</h5>
                    <p className="text-primary fw-medium small mb-2">{s.subtitle}</p>
                    <p className="text-secondary small mb-0 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Demo Banner */}
          <div className="mt-5 p-4 rounded-4 bg-white border shadow-sm">
            <div className="row align-items-center g-3">
              <div className="col-lg-8">
                <h5 className="fw-bold text-dark mb-1">
                  Ready to test with pre-calibrated sample resumes?
                </h5>
                <p className="text-secondary small mb-0">
                  Try our 1-click presets for Full Stack Developer, Frontend Specialist, or Python Data Analyst without preparing a PDF.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button
                  onClick={() => onNavigate('upload')}
                  className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-xs"
                >
                  <i className="bi bi-play-circle me-1.5"></i>
                  <span>Test Resume Analyzer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FSD ARCHITECTURE & ABOUT PREVIEW ================= */}
      <section className="py-5 py-lg-6 bg-white" id="about-preview">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-info-subtle text-info border border-info-subtle rounded-pill px-3 py-1 mb-2">
                Full Stack Architecture
              </span>
              <h2 className="fw-bold text-dark tracking-tight mb-3">
                Engineered for High-Performance Academic & Interview Portfolios
              </h2>
              <p className="text-secondary mb-3 leading-relaxed">
                This project represents a complete, decoupled Full Stack Development (FSD) architecture designed to solve real candidate-job matching challenges.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light">
                    <span className="fw-bold text-dark d-block small mb-1">
                      <i className="bi bi-window-fullscreen text-primary me-1.5"></i> Frontend Layer
                    </span>
                    <span className="text-secondary small">
                      React, Bootstrap 5, TypeScript, Responsive CSS3
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light">
                    <span className="fw-bold text-dark d-block small mb-1">
                      <i className="bi bi-hdd-network text-success me-1.5"></i> Web API Layer
                    </span>
                    <span className="text-secondary small">
                      ASP.NET Core Web API (C# Controllers & JWT Auth)
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light">
                    <span className="fw-bold text-dark d-block small mb-1">
                      <i className="bi bi-database text-warning me-1.5"></i> Data Store
                    </span>
                    <span className="text-secondary small">
                      MongoDB Document Store for Resumes & User Collections
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 border rounded-3 bg-light">
                    <span className="fw-bold text-dark d-block small mb-1">
                      <i className="bi bi-cpu text-info me-1.5"></i> AI / NLP Service
                    </span>
                    <span className="text-secondary small">
                      Python FastAPI microservice with NLP text parsing
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBackendModal}
                className="btn btn-outline-primary rounded-pill px-4 py-2 fw-medium"
              >
                <i className="bi bi-file-earmark-code me-1.5"></i>
                <span>View Full Architecture & API Specs</span>
              </button>
            </div>

            {/* Right side card */}
            <div className="col-lg-6">
              <div className="card p-4 border bg-gradient-card rounded-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="fw-bold text-dark mb-0">Project Credentials</h6>
                  <span className="badge bg-primary text-white font-monospace">FSD 2026</span>
                </div>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0 small">
                    <tbody>
                      <tr>
                        <td className="text-muted fw-medium py-1.5">Project Title:</td>
                        <td className="fw-semibold text-dark py-1.5">
                          AI-Powered Resume Analyzer & Job Role Recommender
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-medium py-1.5">Domain:</td>
                        <td className="fw-semibold text-dark py-1.5">
                          Career Tech / EdTech / Natural Language Processing
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-medium py-1.5">Target Audience:</td>
                        <td className="fw-semibold text-dark py-1.5">
                          College Graduates, Freshers, Career Changers
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted fw-medium py-1.5">Score Formula:</td>
                        <td className="fw-semibold text-dark py-1.5">
                          Skills (40) + Education (20) + Projects (15) + Exp (15) + Certs (10)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 p-3 bg-light rounded-3 border">
                  <div className="d-flex align-items-start gap-2">
                    <i className="bi bi-info-circle-fill text-primary mt-0.5"></i>
                    <p className="text-secondary mb-0 small" style={{ fontSize: '0.8rem' }}>
                      Designed specifically for seamless demonstration in college labs, viva presentations, and technical hiring interviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
