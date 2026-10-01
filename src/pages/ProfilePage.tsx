import React, { useState } from 'react';
import { UserProfile } from '../types';
import { saveUserProfile } from '../services/apiService';

interface ProfilePageProps {
  currentUser: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  onUpdateUser,
  onNavigate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(currentUser);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    saveUserProfile(formData);
    onUpdateUser(formData);
    setIsEditing(false);
    setToastMessage('Profile changes saved successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !formData.skills.includes(newSkillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkillInput.trim()],
      });
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Candidate Account
              </span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Candidate Profile</h2>
            <p className="text-secondary small mb-0 mt-1">
              Manage personal details, academic qualifications, and verified skill inventory.
            </p>
          </div>

          <div className="d-flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-xs d-flex align-items-center gap-1.5"
              >
                <i className="bi bi-pencil-square"></i>
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setFormData(currentUser);
                    setIsEditing(false);
                  }}
                  className="btn btn-outline-secondary rounded-pill px-3 py-2 fw-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-xs d-flex align-items-center gap-1.5"
                >
                  <i className="bi bi-check2"></i>
                  <span>Save Changes</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Feedback Alert */}
        {toastMessage && (
          <div className="alert alert-success py-2.5 px-3 rounded-3 mb-4 shadow-xs d-flex align-items-center gap-2 small">
            <i className="bi bi-check-circle-fill text-success fs-6"></i>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Profile Card */}
        <div className="card p-4 p-md-5 bg-white border rounded-4 shadow-sm mb-4">
          <div className="row g-4 align-items-center pb-4 border-bottom">
            {/* Profile Photo */}
            <div className="col-sm-auto text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                  alt={formData.name}
                  className="rounded-circle border shadow-sm"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                {isEditing && (
                  <span
                    className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1.5 shadow-sm"
                    style={{ cursor: 'pointer' }}
                    title="Change profile avatar"
                    onClick={() => {
                      const newUrl = prompt('Enter image URL for profile photo:', formData.avatarUrl);
                      if (newUrl) setFormData({ ...formData, avatarUrl: newUrl });
                    }}
                  >
                    <i className="bi bi-camera-fill small"></i>
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="col">
              {isEditing ? (
                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-0">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm py-1.5 fw-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted mb-0">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm py-1.5"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="fw-bold text-dark mb-1">{formData.name}</h3>
                  <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                    <div>
                      <i className="bi bi-envelope text-primary me-1"></i>
                      <span>{formData.email}</span>
                    </div>
                    <div>
                      <i className="bi bi-telephone text-primary me-1"></i>
                      <span>{formData.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="row g-4 pt-4">
            {/* Education */}
            <div className="col-md-6">
              <label className="text-muted small fw-semibold d-block mb-1 font-monospace">
                Education & Degree
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control form-control-sm py-2"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                />
              ) : (
                <div className="p-3 bg-light rounded-3 border">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-mortarboard text-success fs-5"></i>
                    <span className="fw-medium text-dark small">{formData.education}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div className="col-md-6">
              <label className="text-muted small fw-semibold d-block mb-1 font-monospace">
                Experience Level
              </label>
              {isEditing ? (
                <select
                  className="form-select form-select-sm py-2"
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
              ) : (
                <div className="p-3 bg-light rounded-3 border">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-briefcase text-primary fs-5"></i>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-monospace px-3 py-1.5 rounded-pill">
                      {formData.experienceLevel}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Phone */}
            {isEditing && (
              <div className="col-md-6">
                <label className="text-muted small fw-semibold d-block mb-1 font-monospace">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm py-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            )}

            {/* Skills */}
            <div className="col-12">
              <label className="text-muted small fw-semibold d-block mb-2 font-monospace">
                Skills Inventory ({formData.skills.length})
              </label>
              <div className="p-3 bg-light rounded-3 border">
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="badge bg-white text-dark border px-3 py-2 rounded-pill font-monospace shadow-xs d-inline-flex align-items-center gap-1.5"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <i
                          className="bi bi-x-circle-fill text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveSkill(skill)}
                          title={`Remove ${skill}`}
                        ></i>
                      )}
                    </span>
                  ))}
                </div>

                {isEditing && (
                  <form onSubmit={handleAddSkill} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm py-1.5"
                      placeholder="Add a new skill (e.g. Next.js, Redis)..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-sm btn-primary rounded-pill px-3">
                      Add
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="col-12">
              <label className="text-muted small fw-semibold d-block mb-2 font-monospace">
                Certifications
              </label>
              <div className="d-flex flex-column gap-2">
                {formData.certifications.map((cert, idx) => (
                  <div key={idx} className="p-2.5 bg-light rounded-3 border d-flex align-items-center gap-2 small">
                    <i className="bi bi-patch-check-fill text-primary"></i>
                    <span className="fw-medium text-dark">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="col-12">
              <label className="text-muted small fw-semibold d-block mb-2 font-monospace">
                Key Projects
              </label>
              <div className="d-flex flex-column gap-2">
                {formData.projects.map((proj, idx) => (
                  <div key={idx} className="p-2.5 bg-light rounded-3 border d-flex align-items-center gap-2 small">
                    <i className="bi bi-code-slash text-success"></i>
                    <span className="fw-medium text-dark">{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions if editing */}
          {isEditing && (
            <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
              <button
                onClick={() => {
                  setFormData(currentUser);
                  setIsEditing(false);
                }}
                className="btn btn-outline-secondary rounded-pill px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-xs"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
