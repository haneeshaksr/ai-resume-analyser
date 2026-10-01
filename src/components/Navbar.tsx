import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CONFIG } from '../services/config';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenBackendModal: () => void;
  onOpenGitHubModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
  onOpenBackendModal,
  onOpenGitHubModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-2 shadow-xs">
      <div className="container-fluid px-3 px-lg-4">
        {/* Brand */}
        <button
          onClick={() => handleNav('home')}
          className="navbar-brand d-flex align-items-center gap-2 fw-bold text-primary border-0 bg-transparent p-0"
        >
          <div
            className="d-flex align-items-center justify-content-center bg-primary text-white rounded-3 shadow-sm"
            style={{ width: '38px', height: '38px' }}
          >
            <i className="bi bi-cpu-fill fs-5"></i>
          </div>
          <div className="text-start">
            <span className="fs-5 text-dark fw-bold tracking-tight">AI Resume</span>
            <span className="fs-5 text-primary fw-bold ms-1">Analyzer</span>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill ms-2 d-none d-sm-inline-block font-monospace" style={{ fontSize: '0.68rem' }}>
              FSD 2026
            </span>
          </div>
        </button>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-4 text-dark`}></i>
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium gap-lg-1">
            <li className="nav-item">
              <button
                onClick={() => handleNav('home')}
                className={`nav-link border-0 bg-transparent px-3 rounded-2 text-start w-100 ${
                  currentPage === 'home' ? 'text-primary fw-semibold active' : 'text-secondary'
                }`}
              >
                <i className="bi bi-house-door me-1 d-lg-none"></i> Home
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleNav('features')}
                className={`nav-link border-0 bg-transparent px-3 rounded-2 text-start w-100 ${
                  currentPage === 'features' ? 'text-primary fw-semibold active' : 'text-secondary'
                }`}
              >
                <i className="bi bi-stars me-1 d-lg-none"></i> Features
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleNav('how-it-works')}
                className={`nav-link border-0 bg-transparent px-3 rounded-2 text-start w-100 ${
                  currentPage === 'how-it-works' ? 'text-primary fw-semibold active' : 'text-secondary'
                }`}
              >
                <i className="bi bi-diagram-3 me-1 d-lg-none"></i> How It Works
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleNav('about')}
                className={`nav-link border-0 bg-transparent px-3 rounded-2 text-start w-100 ${
                  currentPage === 'about' ? 'text-primary fw-semibold active' : 'text-secondary'
                }`}
              >
                <i className="bi bi-info-circle me-1 d-lg-none"></i> About
              </button>
            </li>
          </ul>

          {/* Right Action Buttons */}
          <div className="d-flex align-items-center flex-wrap gap-2 pt-2 pt-lg-0">
            {/* GitHub Repo Button */}
            <button
              onClick={onOpenGitHubModal}
              className="btn btn-sm btn-dark d-flex align-items-center gap-1.5 rounded-pill px-3 py-1 font-monospace shadow-xs"
              title="View GitHub Repository & Clone Instructions"
            >
              <i className="bi bi-github fs-6"></i>
              <span className="small d-none d-sm-inline">GitHub</span>
            </button>

            {/* Backend Integration indicator button */}
            <button
              onClick={onOpenBackendModal}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 rounded-pill px-3 py-1 font-monospace"
              title="Click to view ASP.NET Core & FastAPI API configuration"
            >
              <span className={`p-1 rounded-circle ${CONFIG.USE_MOCK_DATA ? 'bg-success' : 'bg-primary'}`}></span>
              <span style={{ fontSize: '0.75rem' }}>
                {CONFIG.USE_MOCK_DATA ? 'Mock API Active' : 'ASP.NET Core Live'}
              </span>
              <i className="bi bi-sliders text-secondary ms-1"></i>
            </button>

            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`btn btn-sm ${
                    currentPage.startsWith('dashboard') ? 'btn-primary' : 'btn-outline-primary'
                  } d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill fw-medium`}
                >
                  <i className="bi bi-speedometer2"></i>
                  <span>Dashboard</span>
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-light border d-flex align-items-center gap-2 rounded-pill px-2 py-1"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
                      alt={currentUser.name}
                      className="rounded-circle"
                      style={{ width: '26px', height: '26px', objectFit: 'cover' }}
                    />
                    <span className="small fw-semibold d-none d-md-inline pe-1">{currentUser.name.split(' ')[0]}</span>
                    <i className="bi bi-chevron-down small text-muted"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 mt-1">
                    <li>
                      <div className="px-3 py-2 border-bottom">
                        <p className="mb-0 fw-semibold small text-dark">{currentUser.name}</p>
                        <p className="mb-0 text-muted font-monospace" style={{ fontSize: '0.75rem' }}>{currentUser.email}</p>
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={() => handleNav('dashboard-overview')}>
                        <i className="bi bi-grid text-primary"></i> Dashboard
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={() => handleNav('profile')}>
                        <i className="bi bi-person text-secondary"></i> Profile
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={() => handleNav('upload')}>
                        <i className="bi bi-cloud-arrow-up text-success"></i> Upload Resume
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 small d-flex align-items-center gap-2" onClick={() => handleNav('history')}>
                        <i className="bi bi-clock-history text-info"></i> Analysis History
                      </button>
                    </li>
                    <li><hr className="dropdown-divider my-1" /></li>
                    <li>
                      <button className="dropdown-item py-2 small text-danger d-flex align-items-center gap-2" onClick={onLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="btn btn-outline-primary btn-sm rounded-pill px-3 py-1.5 fw-medium"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="btn btn-primary btn-sm rounded-pill px-3 py-1.5 fw-medium shadow-sm"
                >
                  <i className="bi bi-person-plus me-1"></i> Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
