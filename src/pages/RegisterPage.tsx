import React, { useState } from 'react';
import { registerUser } from '../services/apiService';
import { UserProfile } from '../types';

interface RegisterPageProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    education: '',
    experienceLevel: 'Fresher' as 'Fresher' | '0–1 Years' | '1–3 Years' | '3+ Years',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.education.trim()) {
      newErrors.education = 'Education details are required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await registerUser(formData);
      setIsLoading(false);
      onRegisterSuccess(res.user);
    } catch (err: any) {
      setIsLoading(false);
      setGeneralError(err.message || 'Registration failed. Please check inputs.');
    }
  };

  const handleFillSample = () => {
    setFormData({
      fullName: 'Jordan Taylor',
      email: 'jordan.taylor@student.edu',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      phone: '+1 (555) 789-0123',
      education: 'B.Tech in Computer Science, State Tech University',
      experienceLevel: 'Fresher',
    });
    setErrors({});
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-11">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="bg-primary text-white rounded-3 mx-auto mb-3 shadow-xs d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px' }}
                >
                  <i className="bi bi-person-plus-fill fs-4"></i>
                </div>
                <h3 className="fw-bold text-dark mb-1">Create Your Candidate Account</h3>
                <p className="text-secondary small">
                  Join AI Resume Analyzer to benchmark your technical profile and discover high-fit roles.
                </p>
              </div>

              {/* General Error Alert */}
              {generalError && (
                <div className="alert alert-danger py-2.5 rounded-3 mb-3 small d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-octagon-fill"></i>
                  <span>{generalError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control bg-light py-2 small ${errors.fullName ? 'is-invalid' : ''}`}
                      placeholder="e.g. Alex Johnson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <div className="invalid-feedback small">{errors.fullName}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control bg-light py-2 small ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="name@student.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div className="invalid-feedback small">{errors.email}</div>}
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control bg-light py-2 small ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <div className="invalid-feedback small">{errors.password}</div>}
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control bg-light py-2 small ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      placeholder="Repeat your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback small">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control bg-light py-2 small ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <div className="invalid-feedback small">{errors.phone}</div>}
                  </div>

                  {/* Experience Level Dropdown */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Experience Level <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select bg-light py-2 small"
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experienceLevel: e.target.value as any,
                        })
                      }
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="0–1 Years">0–1 Years</option>
                      <option value="1–3 Years">1–3 Years</option>
                      <option value="3+ Years">3+ Years</option>
                    </select>
                  </div>

                  {/* Education */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-dark mb-1">
                      Education & Degree <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control bg-light py-2 small ${errors.education ? 'is-invalid' : ''}`}
                      placeholder="e.g. B.Tech in Computer Science & Engineering, College of Engineering"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    />
                    {errors.education && <div className="invalid-feedback small">{errors.education}</div>}
                  </div>
                </div>

                {/* Submit button */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary py-2.5 rounded-3 fw-semibold shadow-xs d-flex align-items-center justify-content-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Registering Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Auto-fill button */}
                <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={handleFillSample}
                    className="btn btn-sm btn-link text-muted text-decoration-none small"
                  >
                    <i className="bi bi-lightning-charge text-warning me-1"></i> Auto-fill sample student data
                  </button>
                </div>

                {/* Switch to Login */}
                <div className="text-center pt-3 border-top mt-4">
                  <span className="text-muted small">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('login')}
                    className="btn btn-link p-0 text-primary fw-semibold small text-decoration-none"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
