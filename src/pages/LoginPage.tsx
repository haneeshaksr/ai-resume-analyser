import React, { useState } from 'react';
import { loginUser } from '../services/apiService';
import { CONFIG } from '../services/config';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (page: string) => void;
  onOpenBackendModal: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
  onOpenBackendModal,
}) => {
  const [email, setEmail] = useState('alex.johnson@student.edu');
  const [password, setPassword] = useState('SecurePass123!');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginUser({ email: email.trim(), password });
      setIsLoading(false);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleDemoFill = () => {
    setEmail('alex.johnson@student.edu');
    setPassword('SecurePass123!');
    setErrorMessage(null);
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Left Side: Branding & Story */}
                <div className="col-lg-6 bg-gradient-primary p-5 text-white d-flex flex-column justify-content-between">
                  <div>
                    {/* Brand */}
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <div className="bg-white text-primary rounded-3 p-2 shadow-xs d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                        <i className="bi bi-cpu-fill fs-4"></i>
                      </div>
                      <span className="fs-4 fw-bold">AI Resume Analyzer</span>
                    </div>

                    <h2 className="fw-bold tracking-tight mb-3">
                      Unlock AI-Powered Career Insights
                    </h2>

                    <p className="text-white text-opacity-90 mb-4 leading-relaxed">
                      Transform your raw resume into actionable intelligence. Discover your skill profile, address critical tech gaps, and target roles that match your capabilities.
                    </p>

                    <div className="d-flex flex-column gap-3 mb-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <i className="bi bi-check-lg text-white"></i>
                        </div>
                        <span className="small">Explainable 100-Point Resume Scoring</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <i className="bi bi-check-lg text-white"></i>
                        </div>
                        <span className="small">Predefined Job-Role Matching Engine</span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <i className="bi bi-check-lg text-white"></i>
                        </div>
                        <span className="small">Targeted Skill Gap & Learning Roadmaps</span>
                      </div>
                    </div>
                  </div>

                  {/* Backend Readiness Note */}
                  <div className="pt-4 border-top border-white border-opacity-20">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="small text-white text-opacity-75 font-monospace">
                        Target API: {CONFIG.API_BASE_URL}
                      </span>
                      <button
                        onClick={onOpenBackendModal}
                        className="btn btn-sm btn-light py-0 px-2 rounded font-monospace"
                        style={{ fontSize: '0.72rem' }}
                      >
                        API Info
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Login Card */}
                <div className="col-lg-6 p-5 bg-white d-flex flex-column justify-content-center">
                  <div className="mb-4">
                    <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
                    <p className="text-secondary small">
                      Sign in to access your resume analysis dashboard and career recommendations.
                    </p>
                  </div>

                  {/* Error Alert */}
                  {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 py-2.5 rounded-3 mb-3 small" role="alert">
                      <i className="bi bi-exclamation-triangle-fill fs-6 flex-shrink-0"></i>
                      <div className="flex-grow-1">{errorMessage}</div>
                      <button
                        type="button"
                        className="btn-close small p-2"
                        onClick={() => setErrorMessage(null)}
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    {/* Email Input */}
                    <div>
                      <label className="form-label small fw-semibold text-dark mb-1">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="bi bi-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className="form-control bg-light border-start-0 py-2 small"
                          placeholder="name@student.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="form-label small fw-semibold text-dark mb-0">
                          Password <span className="text-danger">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => alert('Password reset link will be dispatched via ASP.NET Core Identity Email Service.')}
                          className="btn btn-link p-0 text-primary small text-decoration-none"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="bi bi-lock"></i>
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control bg-light border-start-0 border-end-0 py-2 small"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light border-start-0 text-muted"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid mt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary py-2.5 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-xs"
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span>Signing In...</span>
                          </>
                        ) : (
                          <>
                            <span>Login</span>
                            <i className="bi bi-box-arrow-in-right"></i>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Demo Account Helper */}
                    <div className="p-2.5 bg-light rounded-3 border text-center">
                      <span className="text-muted small d-block mb-1">Testing for demonstration or viva?</span>
                      <button
                        type="button"
                        onClick={handleDemoFill}
                        className="btn btn-sm btn-outline-secondary py-1 px-3 rounded-pill font-monospace"
                        style={{ fontSize: '0.75rem' }}
                      >
                        <i className="bi bi-magic me-1 text-primary"></i> Fill Pre-Calibrated Demo Credentials
                      </button>
                    </div>

                    {/* Switch to Register */}
                    <div className="text-center pt-2">
                      <span className="text-muted small">Don't have an account yet? </span>
                      <button
                        type="button"
                        onClick={() => onNavigate('register')}
                        className="btn btn-link p-0 text-primary fw-semibold small text-decoration-none"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
