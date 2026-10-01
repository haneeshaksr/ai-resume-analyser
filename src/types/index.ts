export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  experienceLevel: 'Fresher' | '0–1 Years' | '1–3 Years' | '3+ Years';
  avatarUrl?: string;
  skills: string[];
  certifications: string[];
  projects: string[];
}

export type SkillCategory = 'Programming' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'AI/ML';

export interface DetectedSkill {
  name: string;
  category: SkillCategory;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ScoreCategory {
  label: string;
  score: number;
  max: number;
  icon: string;
  description: string;
}

export interface ScoreBreakdown {
  totalScore: number;
  skillsScore: number;
  skillsMax: number;
  educationScore: number;
  educationMax: number;
  projectsScore: number;
  projectsMax: number;
  experienceScore: number;
  experienceMax: number;
  certificatesScore: number;
  certificatesMax: number;
  summaryNote: string;
  categories: ScoreCategory[];
}

export interface ResumeInformation {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  certifications: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
}

export interface JobRoleRecommendation {
  id: string;
  title: string;
  roleMatch: number; // percentage, e.g. 85
  category: string;
  demandLevel: 'High' | 'Very High' | 'Moderate';
  avgSalary: string;
  description: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
}

export interface SkillGapAnalysis {
  selectedRole: string;
  currentMatch: number;
  matchedSkills: string[];
  skillsToDevelop: string[];
  recommendedActions: string[];
}

export interface LearningStep {
  step: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  description: string;
  keySkills: string[];
  suggestedResources: { name: string; type: 'Course' | 'Documentation' | 'Project' }[];
  completed?: boolean;
}

export interface AnalysisHistoryItem {
  id: string;
  date: string;
  resumeName: string;
  fileSize: string;
  score: number;
  topRole: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  analyzedAt: string;
  resumeInfo: ResumeInformation;
  detectedSkills: DetectedSkill[];
  scoreBreakdown: ScoreBreakdown;
  jobRecommendations: JobRoleRecommendation[];
  skillGap: SkillGapAnalysis;
  learningPath: LearningStep[];
}
