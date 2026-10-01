/**
 * API Configuration for AI Resume Analyzer & Recommendation System
 * Prepared for integration with:
 * - ASP.NET Core Web API (Port 5000 or custom)
 * - Python FastAPI NLP AI Microservice (Port 8000 or custom)
 * - MongoDB Atlas / Local Database
 */

export const CONFIG = {
  // Main Backend API (ASP.NET Core Web API)
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  // Python FastAPI AI / NLP Microservice for resume parsing and embeddings
  AI_SERVICE_URL: import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:8000/api/ai',

  // Toggle for local development / testing without a running ASP.NET Core backend
  // When true: uses rich realistic mock responses and realistic network latencies
  // When false: sends real HTTP requests to the ASP.NET Core API endpoints
  USE_MOCK_DATA: true,

  // Timeout settings
  REQUEST_TIMEOUT_MS: 15000,

  // Endpoints map matching standard ASP.NET Core controllers
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      CURRENT_USER: '/auth/me',
      REFRESH_TOKEN: '/auth/refresh',
    },
    RESUME: {
      UPLOAD: '/resume/upload',
      ANALYZE: '/resume/analyze',
      GET_ANALYSIS: (id: string) => `/resume/analysis/${id}`,
      HISTORY: '/resume/history',
      DELETE: (id: string) => `/resume/${id}`,
    },
    RECOMMENDATIONS: {
      ROLES: '/recommendations/roles',
      SKILL_GAPS: '/recommendations/skill-gaps',
      LEARNING_PATH: '/recommendations/learning-path',
    },
    PROFILE: {
      GET: '/profile',
      UPDATE: '/profile',
    },
  },
};
