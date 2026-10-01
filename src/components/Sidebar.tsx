import React from 'react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenBackendModal: () => void;
  onOpenGitHubModal: () => void;
  hasResume: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onLogout,
  onOpenBackendModal,
  onOpenGitHubModal,
  hasResume,
}) => {
  const navItems = [
    { id: 'dashboard-overview', label: 'Dashboard', icon: 'bi-grid-1x2' },
    { id: 'upload', label: 'Resume Analyzer', icon: 'bi-cloud-arrow-up', badge: !hasResume ? 'Upload' : undefined },
    { id: 'analysis', label: 'Resume Analysis', icon: 'bi-file-earmark-person', disabled: !hasResume },
    { id: 'score', label: 'Resume Score', icon: 'bi-speedometer2', disabled: !hasResume },
    { id: 'job-recommendations', label: 'Job Recommendations', icon: 'bi-briefcase', disabled: !hasResume },
    { id: 'skill-gap', label: 'Skill Gaps', icon: 'bi-bar-chart-steps', disabled: !hasResume },
    { id: 'learning-path', label: 'Learning Path', icon: 'bi-signpost-split', disabled: !hasResume },
    { id: 'history', label: 'Analysis History', icon: 'bi-clock-history' },
    { id: 'profile', label: 'Profile', icon: 'bi-person-circle' },
  ];

  return (
    <aside className="dashboard-sidebar p-3 d-flex flex-column h-100">
      {/* User Quick Info */}
      {currentUser && (
        <div className="p-3 mb-3 bg-light rounded-3 border d-flex align-items-center gap-3">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
            alt={currentUser.name}
            className="rounded-circle border"
            style={{ width: '42px', height: '42px', objectFit: 'cover' }}
          />
          <div className="overflow-hidden">
            <h6 className="mb-0 text-dark fw-bold text-truncate" style={{ fontSize: '0.9rem' }}>
              {currentUser.name}
            </h6>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.7rem' }}>
              {currentUser.experienceLevel}
            </span>
          </div>
        </div>
      )}

      {/* Nav List */}
      <div className="nav flex-column gap-1 flex-grow-1">
        <div className="text-uppercase text-muted fw-bold px-3 py-1 mb-1 font-monospace" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
          Platform Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              disabled={item.disabled}
              className={`sidebar-nav-item border-0 w-100 text-start ${isActive ? 'active' : ''} ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span className="flex-grow-1">{item.label}</span>
              {item.badge && (
                <span className="badge bg-warning text-dark rounded-pill ms-2" style={{ fontSize: '0.65rem' }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <hr className="my-3 border-secondary-subtle" />

      {/* GitHub Repository Helper */}
      <button
        onClick={onOpenGitHubModal}
        className="btn btn-dark btn-sm d-flex align-items-center justify-content-center gap-2 mb-2 rounded-2 shadow-xs"
        style={{ fontSize: '0.8rem' }}
      >
        <i className="bi bi-github"></i>
        <span>GitHub Repository</span>
      </button>

      {/* FSD Backend Helper */}
      <button
        onClick={onOpenBackendModal}
        className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-2 mb-2 rounded-2"
        style={{ fontSize: '0.8rem' }}
      >
        <i className="bi bi-diagram-2"></i>
        <span>ASP.NET & AI API Specs</span>
      </button>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="sidebar-nav-item border-0 w-100 text-start text-danger hover-bg-danger-subtle"
        style={{ marginTop: 'auto' }}
      >
        <i className="bi bi-box-arrow-right text-danger"></i>
        <span>Logout</span>
      </button>
    </aside>
  );
};
