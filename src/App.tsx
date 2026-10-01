/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { FSDIntegrationGuideModal } from './components/FSDIntegrationGuideModal';
import { GitHubModal } from './components/GitHubModal';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { ResumeUploadPage } from './pages/ResumeUploadPage';
import { ResumeAnalysisPage } from './pages/ResumeAnalysisPage';
import { ResumeScorePage } from './pages/ResumeScorePage';
import { JobRecommendationsPage } from './pages/JobRecommendationsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { AnalysisHistoryPage } from './pages/AnalysisHistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';

import {
  UserProfile,
  ResumeAnalysisResult,
  AnalysisHistoryItem,
} from './types';
import {
  getCurrentUser,
  logoutUser,
  getResumeAnalysis,
} from './services/apiService';
import {
  INITIAL_USER,
  INITIAL_ANALYSIS_RESULT,
  INITIAL_JOB_RECOMMENDATIONS,
  INITIAL_LEARNING_PATH,
} from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [analysis, setAnalysis] = useState<ResumeAnalysisResult | null>(INITIAL_ANALYSIS_RESULT);
  const [selectedRoleForGap, setSelectedRoleForGap] = useState<string>('Full Stack Developer');
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    getResumeAnalysis().then((res) => {
      if (res) setAnalysis(res);
    });
  }, []);

  const handleNavigate = (page: string) => {
    // If navigating to home hash anchor
    if (page === 'features' || page === 'how-it-works') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(page);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (page === 'dashboard') {
      setCurrentPage('dashboard-overview');
    } else {
      setCurrentPage(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileSidebarOpen(false);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentPage('dashboard-overview');
  };

  const handleRegisterSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentPage('dashboard-overview');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const handleAnalysisComplete = (newAnalysis: ResumeAnalysisResult) => {
    setAnalysis(newAnalysis);
    setCurrentPage('dashboard-overview');
  };

  const handleViewHistoricalAnalysis = (item: AnalysisHistoryItem) => {
    if (analysis) {
      setAnalysis({
        ...analysis,
        fileName: item.resumeName,
        fileSize: item.fileSize,
        analyzedAt: item.date,
        scoreBreakdown: {
          ...analysis.scoreBreakdown,
          totalScore: item.score,
        },
      });
    }
    setCurrentPage('dashboard-overview');
  };

  // Determine if current page is within dashboard layout
  const isDashboardView = [
    'dashboard-overview',
    'upload',
    'analysis',
    'score',
    'job-recommendations',
    'skill-gap',
    'learning-path',
    'history',
    'profile',
  ].includes(currentPage);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow-1">
        {isDashboardView ? (
          <div className="container-fluid px-0">
            {/* Mobile Dashboard Bar */}
            <div className="d-lg-none bg-white border-bottom p-3 d-flex align-items-center justify-content-between">
              <button
                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-3"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                <i className="bi bi-layout-sidebar-inset"></i>
                <span>Dashboard Menu</span>
              </button>
              <span className="small text-muted font-monospace text-capitalize">
                {currentPage.replace('-', ' ')}
              </span>
            </div>

            <div className="row g-0">
              {/* Sidebar Column */}
              <div
                className={`col-lg-3 col-xl-2 d-lg-block ${
                  mobileSidebarOpen ? 'd-block' : 'd-none'
                }`}
              >
                <Sidebar
                  currentTab={currentPage}
                  onSelectTab={(tab) => {
                    handleNavigate(tab);
                    setMobileSidebarOpen(false);
                  }}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onOpenBackendModal={() => setIsBackendModalOpen(true)}
                  onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
                  hasResume={!!analysis}
                />
              </div>

              {/* Main Content Column */}
              <div className="col-lg-9 col-xl-10 bg-light min-vh-100">
                {currentPage === 'dashboard-overview' && (
                  <DashboardOverview
                    currentUser={currentUser || INITIAL_USER}
                    analysis={analysis}
                    onNavigate={handleNavigate}
                    onSelectRoleForGap={(role) => setSelectedRoleForGap(role)}
                  />
                )}

                {currentPage === 'upload' && (
                  <ResumeUploadPage
                    onAnalysisComplete={handleAnalysisComplete}
                    onNavigate={handleNavigate}
                    currentAnalysis={analysis}
                  />
                )}

                {currentPage === 'analysis' && (
                  <ResumeAnalysisPage
                    analysis={analysis}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'score' && (
                  <ResumeScorePage
                    analysis={analysis}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'job-recommendations' && (
                  <JobRecommendationsPage
                    roles={analysis?.jobRecommendations || INITIAL_JOB_RECOMMENDATIONS}
                    onSelectRoleForGap={(role) => setSelectedRoleForGap(role)}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'skill-gap' && (
                  <SkillGapPage
                    selectedRoleTitle={selectedRoleForGap}
                    onSelectRole={(role) => setSelectedRoleForGap(role)}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'learning-path' && (
                  <LearningPathPage
                    learningSteps={analysis?.learningPath || INITIAL_LEARNING_PATH}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'history' && (
                  <AnalysisHistoryPage
                    onViewAnalysis={handleViewHistoricalAnalysis}
                    onNavigate={handleNavigate}
                  />
                )}

                {currentPage === 'profile' && (
                  <ProfilePage
                    currentUser={currentUser || INITIAL_USER}
                    onUpdateUser={(updated) => setCurrentUser(updated)}
                    onNavigate={handleNavigate}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Public Views */
          <>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenBackendModal={() => setIsBackendModalOpen(true)}
              />
            )}

            {currentPage === 'login' && (
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigate={handleNavigate}
                onOpenBackendModal={() => setIsBackendModalOpen(true)}
              />
            )}

            {currentPage === 'register' && (
              <RegisterPage
                onRegisterSuccess={handleRegisterSuccess}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onNavigate={handleNavigate}
                onOpenBackendModal={() => setIsBackendModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBackendModal={() => setIsBackendModalOpen(true)}
        onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      />

      {/* Backend & FSD Architecture Modal */}
      <FSDIntegrationGuideModal
        isOpen={isBackendModalOpen}
        onClose={() => setIsBackendModalOpen(false)}
      />

      {/* GitHub Repository & Clone Instructions Modal */}
      <GitHubModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
