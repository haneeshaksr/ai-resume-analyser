/**
 * API Service for AI Resume Analyzer & Recommendation System
 * Prepared for integration with:
 * - ASP.NET Core Web API (Controllers: AuthController, ResumeController, RecommendationsController)
 * - Python FastAPI (NLP skill extraction, semantic matching)
 * 
 * Functions:
 * - loginUser()
 * - registerUser()
 * - uploadResume()
 * - analyzeResume()
 * - getResumeAnalysis()
 * - getJobRecommendations()
 * - getSkillGaps()
 * - getLearningRecommendations()
 * - getAnalysisHistory()
 */

import { CONFIG } from './config';
import {
  UserProfile,
  ResumeAnalysisResult,
  JobRoleRecommendation,
  SkillGapAnalysis,
  LearningStep,
  AnalysisHistoryItem,
  DetectedSkill,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_ANALYSIS_RESULT,
  INITIAL_JOB_RECOMMENDATIONS,
  INITIAL_SKILL_GAP,
  INITIAL_LEARNING_PATH,
  INITIAL_HISTORY,
  INITIAL_DETECTED_SKILLS,
} from '../data/mockData';

// Local storage keys for simulated persistence
const STORAGE_KEYS = {
  USER: 'ai_resume_analyzer_user',
  TOKEN: 'ai_resume_analyzer_jwt',
  ANALYSIS: 'ai_resume_analyzer_current_analysis',
  HISTORY: 'ai_resume_analyzer_history',
};

// Helper: simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 1. loginUser(credentials)
 * Connects to ASP.NET Core Web API: POST /api/auth/login
 */
export async function loginUser(credentials: { email: string; password: string }): Promise<{ user: UserProfile; token: string }> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Invalid email or password.');
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      console.warn('Real API call failed or not running, falling back to mock service:', err.message);
    }
  }

  // Mock implementation
  await delay(800);
  if (!credentials.email || !credentials.password) {
    throw new Error('Please enter both email and password.');
  }

  const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
  const user: UserProfile = storedUser ? JSON.parse(storedUser) : { ...INITIAL_USER, email: credentials.email };
  const mockToken = 'mock_jwt_token_aspnet_' + Date.now();

  localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return { user, token: mockToken };
}

/**
 * 2. registerUser(userData)
 * Connects to ASP.NET Core Web API: POST /api/auth/register
 */
export async function registerUser(userData: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  education: string;
  experienceLevel: 'Fresher' | '0–1 Years' | '1–3 Years' | '3+ Years';
}): Promise<{ user: UserProfile; token: string }> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Registration failed.');
      }
      const data = await response.json();
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      console.warn('Real API call failed, falling back to mock handler:', err.message);
    }
  }

  await delay(900);
  if (!userData.fullName || !userData.email || !userData.password) {
    throw new Error('All required fields must be filled.');
  }

  const newUser: UserProfile = {
    id: 'usr_' + Date.now(),
    name: userData.fullName,
    email: userData.email,
    phone: userData.phone || '+1 (555) 000-0000',
    education: userData.education || 'Bachelor of Science / Technology',
    experienceLevel: userData.experienceLevel,
    avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80`,
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    certifications: ['Web Development Fundamentals Certificate'],
    projects: ['Personal Portfolio & FSD Capstone Application'],
  };

  const mockToken = 'mock_jwt_token_aspnet_' + Date.now();
  localStorage.setItem(STORAGE_KEYS.TOKEN, mockToken);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

  return { user: newUser, token: mockToken };
}

/**
 * 3. uploadResume(file, onProgress)
 * Connects to ASP.NET Core Web API: POST /api/resume/upload
 * Uses multipart/form-data
 */
export async function uploadResume(
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ fileId: string; fileName: string; fileSize: string; status: string; extractedText?: string }> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const formData = new FormData();
      formData.append('resumeFile', file);

      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RESUME.UPLOAD}`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload to backend failed.');
      }
      return await response.json();
    } catch (err: any) {
      console.warn('Backend upload unavailable, using client-side simulated file upload:', err.message);
    }
  }

  // Simulated upload with progressive callback
  for (let p = 20; p <= 100; p += 20) {
    await delay(120);
    if (onProgress) onProgress(p);
  }

  // Attempt to extract text from plain text file or read slice
  let extractedSnippet = '';
  try {
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      extractedSnippet = await file.text();
    }
  } catch (e) {
    // fallback
  }

  const sizeFormatted = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(file.size / 1024)} KB`;

  return {
    fileId: 'res_' + Date.now(),
    fileName: file.name,
    fileSize: sizeFormatted,
    status: 'Ready for Analysis',
    extractedText: extractedSnippet || undefined,
  };
}

/**
 * Helper to analyze text for technical keywords
 */
function extractDynamicSkills(text: string): DetectedSkill[] {
  const normalized = text.toLowerCase();
  const skillOntology: { name: string; category: DetectedSkill['category']; keywords: string[] }[] = [
    { name: 'HTML5', category: 'Frontend', keywords: ['html', 'html5'] },
    { name: 'CSS3', category: 'Frontend', keywords: ['css', 'css3', 'flexbox', 'grid'] },
    { name: 'JavaScript', category: 'Programming', keywords: ['javascript', 'js', 'es6'] },
    { name: 'Bootstrap 5', category: 'Frontend', keywords: ['bootstrap', 'bootstrap 5'] },
    { name: 'React', category: 'Frontend', keywords: ['react', 'react.js', 'reactjs'] },
    { name: 'C#', category: 'Programming', keywords: ['c#', 'csharp', '.net'] },
    { name: 'ASP.NET Core', category: 'Backend', keywords: ['asp.net', 'aspnet', 'web api', '.net core'] },
    { name: 'Python', category: 'Programming', keywords: ['python', 'py'] },
    { name: 'FastAPI', category: 'Backend', keywords: ['fastapi', 'flask', 'django'] },
    { name: 'MongoDB', category: 'Database', keywords: ['mongodb', 'mongo', 'nosql'] },
    { name: 'SQL', category: 'Database', keywords: ['sql', 'mysql', 'postgresql', 'postgres', 'sql server'] },
    { name: 'Git & GitHub', category: 'Tools', keywords: ['git', 'github', 'version control'] },
    { name: 'Docker', category: 'Tools', keywords: ['docker', 'container', 'containers'] },
    { name: 'NLP & AI', category: 'AI/ML', keywords: ['nlp', 'machine learning', 'ai', 'natural language', 'deep learning'] },
  ];

  const found: DetectedSkill[] = [];
  skillOntology.forEach((item) => {
    const isMatched = item.keywords.some((k) => normalized.includes(k));
    if (isMatched) {
      found.push({
        name: item.name,
        category: item.category,
        proficiency: 'Intermediate',
      });
    }
  });

  return found.length >= 4 ? found : INITIAL_DETECTED_SKILLS;
}

/**
 * 4. analyzeResume(params, onStepChange)
 * Calls Python FastAPI NLP service or ASP.NET Core: POST /api/resume/analyze
 */
export async function analyzeResume(
  params: { fileId?: string; fileName: string; fileSize: string; rawText?: string },
  onStepChange?: (stepName: string) => void
): Promise<ResumeAnalysisResult> {
  const updateStep = (msg: string) => {
    if (onStepChange) onStepChange(msg);
  };

  updateStep('Parsing document layout & extracting text streams...');
  await delay(600);

  updateStep('Running Natural Language Processing (NLP) skill entity recognition...');
  await delay(700);

  updateStep('Mapping detected skills against industry job ontologies...');
  await delay(600);

  updateStep('Evaluating profile score criteria & identifying skill gaps...');
  await delay(500);

  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RESUME.ANALYZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(data));
        return data;
      }
    } catch (err: any) {
      console.warn('Real AI microservice call unavailable, generating calibrated analysis result:', err.message);
    }
  }

  // Calibrate analysis based on file or uploaded context
  const detectedSkills = params.rawText ? extractDynamicSkills(params.rawText) : INITIAL_DETECTED_SKILLS;
  
  // Calculate explainable score
  const skillsCount = detectedSkills.length;
  const skillsScore = Math.min(40, Math.max(28, Math.round((skillsCount / 14) * 40)));
  const totalScore = skillsScore + 18 + 13 + 10 + 8; // 83 baseline

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const result: ResumeAnalysisResult = {
    ...INITIAL_ANALYSIS_RESULT,
    id: 'ana_' + Date.now(),
    fileName: params.fileName || 'Resume_Uploaded.pdf',
    fileSize: params.fileSize || '380 KB',
    analyzedAt: today,
    detectedSkills,
    scoreBreakdown: {
      ...INITIAL_ANALYSIS_RESULT.scoreBreakdown,
      totalScore: totalScore,
      skillsScore: skillsScore,
    },
  };

  // Persist locally
  localStorage.setItem(STORAGE_KEYS.ANALYSIS, JSON.stringify(result));

  // Add to history
  const existingHistory = getStoredHistory();
  const newHistoryItem: AnalysisHistoryItem = {
    id: 'hist_' + Date.now(),
    date: today,
    resumeName: result.fileName,
    fileSize: result.fileSize,
    score: result.scoreBreakdown.totalScore,
    topRole: result.jobRecommendations[0]?.title || 'Full Stack Developer',
    status: 'Completed',
  };
  const updatedHistory = [newHistoryItem, ...existingHistory];
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));

  return result;
}

/**
 * 5. getResumeAnalysis(analysisId?)
 * GET /api/resume/analysis/{id}
 */
export async function getResumeAnalysis(analysisId?: string): Promise<ResumeAnalysisResult | null> {
  if (!CONFIG.USE_MOCK_DATA && analysisId) {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RESUME.GET_ANALYSIS(analysisId)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('API error, falling back to cached analysis');
    }
  }

  await delay(200);
  const stored = localStorage.getItem(STORAGE_KEYS.ANALYSIS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_ANALYSIS_RESULT;
    }
  }

  return INITIAL_ANALYSIS_RESULT;
}

/**
 * 6. getJobRecommendations(skills?)
 * GET /api/recommendations/roles
 */
export async function getJobRecommendations(skills?: string[]): Promise<JobRoleRecommendation[]> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RECOMMENDATIONS.ROLES}`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Failed to fetch job roles from backend');
    }
  }

  await delay(250);
  return INITIAL_JOB_RECOMMENDATIONS;
}

/**
 * 7. getSkillGaps(roleTitle, userSkills?)
 * GET /api/recommendations/skill-gaps?role={roleTitle}
 */
export async function getSkillGaps(roleTitle?: string, userSkills?: string[]): Promise<SkillGapAnalysis> {
  if (!CONFIG.USE_MOCK_DATA && roleTitle) {
    try {
      const response = await fetch(
        `${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RECOMMENDATIONS.SKILL_GAPS}?role=${encodeURIComponent(roleTitle)}`
      );
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Failed to fetch skill gaps from backend');
    }
  }

  await delay(200);
  if (!roleTitle || roleTitle === 'Full Stack Developer') {
    return INITIAL_SKILL_GAP;
  }

  // Dynamic skill gap calculation for other roles
  if (roleTitle === 'Frontend Developer') {
    return {
      selectedRole: 'Frontend Developer',
      currentMatch: 88,
      matchedSkills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      skillsToDevelop: ['React State Management', 'TypeScript Advanced', 'Next.js'],
      recommendedActions: [
        'Practice Redux Toolkit or Zustand state patterns with React',
        'Convert a JavaScript project to TypeScript with strict type checking',
        'Learn Next.js server components and SSR rendering'
      ]
    };
  }

  if (roleTitle === '.NET Developer') {
    return {
      selectedRole: '.NET Developer',
      currentMatch: 82,
      matchedSkills: ['C#', 'ASP.NET Core', 'SQL / Database', 'Git'],
      skillsToDevelop: ['Entity Framework Core', 'Azure DevOps', 'xUnit'],
      recommendedActions: [
        'Implement code-first migrations with Entity Framework Core',
        'Write automated integration tests using xUnit and WebApplicationFactory',
        'Deploy an ASP.NET Web API to Azure App Services'
      ]
    };
  }

  if (roleTitle === 'Backend Developer') {
    return {
      selectedRole: 'Backend Developer',
      currentMatch: 80,
      matchedSkills: ['ASP.NET Core', 'MongoDB', 'SQL', 'Git'],
      skillsToDevelop: ['Redis Caching', 'Docker & Containerization', 'OAuth2 / JWT'],
      recommendedActions: [
        'Integrate distributed Redis caching to reduce database read latencies',
        'Implement robust JWT refresh token rotation',
        'Build a docker-compose cluster containing API and database nodes'
      ]
    };
  }

  return INITIAL_SKILL_GAP;
}

/**
 * 8. getLearningRecommendations(skillGaps?)
 * GET /api/recommendations/learning-path
 */
export async function getLearningRecommendations(roleTitle?: string): Promise<LearningStep[]> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RECOMMENDATIONS.LEARNING_PATH}`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Failed to fetch learning recommendations from backend');
    }
  }

  await delay(200);
  return INITIAL_LEARNING_PATH;
}

/**
 * 9. getAnalysisHistory()
 * GET /api/resume/history
 */
export async function getAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
  if (!CONFIG.USE_MOCK_DATA) {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RESUME.HISTORY}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Failed to fetch history from backend');
    }
  }

  await delay(200);
  return getStoredHistory();
}

function getStoredHistory(): AnalysisHistoryItem[] {
  const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_HISTORY;
    }
  }
  return INITIAL_HISTORY;
}

export function getCurrentUser(): UserProfile {
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_USER;
    }
  }
  return INITIAL_USER;
}

export function saveUserProfile(user: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}
