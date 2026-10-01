import React, { useState } from 'react';
import { LearningStep } from '../types';

interface LearningPathPageProps {
  learningSteps: LearningStep[];
  onNavigate: (page: string) => void;
}

export const LearningPathPage: React.FC<LearningPathPageProps> = ({
  learningSteps: initialSteps,
  onNavigate,
}) => {
  const [steps, setSteps] = useState<LearningStep[]>(initialSteps);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const toggleStepCompletion = (stepIndex: number) => {
    setSteps((prev) =>
      prev.map((step, idx) =>
        idx === stepIndex ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const getLevelBadgeClass = (lvl: LearningStep['level']) => {
    switch (lvl) {
      case 'Beginner':
        return 'bg-success-subtle text-success border-success-subtle';
      case 'Intermediate':
        return 'bg-warning-subtle text-dark border-warning-subtle';
      case 'Advanced':
        return 'bg-danger-subtle text-danger border-danger-subtle';
      default:
        return 'bg-light text-dark';
    }
  };

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Curated Upskilling Roadmap
              </span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Personalized Learning Path</h2>
            <p className="text-secondary small mb-0 mt-1">
              Sequential curriculum engineered to bridge identified skill gaps from <strong>Beginner</strong> to <strong>Advanced</strong>.
            </p>
          </div>

          <button
            onClick={() => onNavigate('skill-gap')}
            className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-medium"
          >
            <i className="bi bi-arrow-left me-1"></i> Back to Skill Gap
          </button>
        </div>

        {/* Learning Progression Banner */}
        <div className="card p-4 bg-white border rounded-4 shadow-sm mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
            <div>
              <h5 className="fw-bold text-dark mb-1">Curriculum Mastery Track</h5>
              <div className="d-flex align-items-center gap-2 small text-muted">
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2">Beginner</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-warning-subtle text-dark border border-warning-subtle rounded-pill px-2">Intermediate</span>
                <i className="bi bi-arrow-right text-muted"></i>
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2">Advanced</span>
              </div>
            </div>

            <div className="text-end">
              <span className="fs-5 fw-bold text-primary">{completedCount} of {steps.length} Steps</span>
              <span className="text-muted d-block small font-monospace">({progressPercent}% Completed)</span>
            </div>
          </div>

          <div className="progress" style={{ height: '10px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Step-by-Step Timeline Cards */}
        <div className="d-flex flex-column gap-3 mb-4">
          {steps.map((item, idx) => {
            const isSelected = activeStepIndex === idx;

            return (
              <div
                key={item.step}
                className={`card p-4 bg-white border rounded-4 transition-all ${
                  isSelected ? 'border-primary shadow-md' : 'card-hover'
                }`}
                onClick={() => setActiveStepIndex(idx)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
                  <div className="d-flex align-items-start gap-3">
                    {/* Step Number Circle */}
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center fw-bold font-monospace shadow-xs ${
                        item.completed
                          ? 'bg-success text-white'
                          : isSelected
                          ? 'bg-primary text-white'
                          : 'bg-light text-secondary border'
                      }`}
                      style={{ width: '46px', height: '46px', flexShrink: 0 }}
                    >
                      {item.completed ? <i className="bi bi-check-lg fs-5"></i> : `0${item.step}`}
                    </div>

                    <div>
                      <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                        <span className="text-uppercase text-muted font-monospace fw-bold" style={{ fontSize: '0.72rem' }}>
                          STEP {item.step}
                        </span>
                        <span className={`badge border rounded-pill font-monospace small ${getLevelBadgeClass(item.level)}`}>
                          {item.level}
                        </span>
                        <span className="badge bg-light text-muted border font-monospace small">
                          <i className="bi bi-clock me-1"></i> {item.estimatedDuration}
                        </span>
                      </div>

                      <h5 className="fw-bold text-dark mb-1">{item.title}</h5>
                      <p className="text-secondary small mb-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Skills */}
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {item.keySkills.map((k, i) => (
                          <span key={i} className="badge bg-primary-subtle text-primary border border-primary-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Complete Checkbox Toggle */}
                  <div className="d-flex align-items-center gap-2 align-self-start">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStepCompletion(idx);
                      }}
                      className={`btn btn-sm rounded-pill px-3 py-1.5 fw-medium d-flex align-items-center gap-1.5 ${
                        item.completed ? 'btn-success' : 'btn-outline-secondary'
                      }`}
                    >
                      <i className={`bi ${item.completed ? 'bi-check-circle-fill' : 'bi-circle'}`}></i>
                      <span>{item.completed ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Details when active */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-top bg-light p-3 rounded-3">
                    <h6 className="fw-bold text-dark small mb-2">Suggested Learning Resources:</h6>
                    <div className="row g-2">
                      {item.suggestedResources.map((res, i) => (
                        <div className="col-md-6" key={i}>
                          <div className="p-2.5 bg-white rounded-3 border d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2 overflow-hidden">
                              <i className="bi bi-link-45deg text-primary fs-5"></i>
                              <span className="small fw-semibold text-dark text-truncate">{res.name}</span>
                            </div>
                            <span className="badge bg-light text-secondary border font-monospace ms-2" style={{ fontSize: '0.65rem' }}>
                              {res.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
