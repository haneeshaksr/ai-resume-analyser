import {
  UserProfile,
  ResumeAnalysisResult,
  AnalysisHistoryItem,
  JobRoleRecommendation,
  SkillGapAnalysis,
  LearningStep,
  DetectedSkill,
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_fsd_2026_01',
  name: 'Alex Johnson',
  email: 'alex.johnson@student.edu',
  phone: '+1 (555) 234-5678',
  education: 'B.Tech in Computer Science & Engineering, Tech University (2022 - 2026)',
  experienceLevel: 'Fresher',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  skills: [
    'HTML', 'CSS', 'JavaScript', 'Bootstrap',
    'C#', 'ASP.NET', 'MongoDB', 'Python', 'Git', 'SQL'
  ],
  certifications: [
    'Microsoft Certified: Azure Fundamentals (AZ-900)',
    'Meta Front-End Developer Specialization',
    'MongoDB Node.js & C# Developer Basics'
  ],
  projects: [
    'AI-Powered Resume Analyzer & Job Role Recommender (Full Stack)',
    'E-Commerce REST API with ASP.NET Core & MongoDB',
    'Student Portal & Grade Tracking System using Bootstrap & JS'
  ]
};

export const INITIAL_DETECTED_SKILLS: DetectedSkill[] = [
  // Programming
  { name: 'C#', category: 'Programming', proficiency: 'Intermediate' },
  { name: 'JavaScript', category: 'Programming', proficiency: 'Advanced' },
  { name: 'Python', category: 'Programming', proficiency: 'Intermediate' },
  
  // Frontend
  { name: 'HTML5', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'CSS3', category: 'Frontend', proficiency: 'Advanced' },
  { name: 'Bootstrap 5', category: 'Frontend', proficiency: 'Advanced' },
  
  // Backend
  { name: 'ASP.NET Core', category: 'Backend', proficiency: 'Intermediate' },
  { name: 'Express.js', category: 'Backend', proficiency: 'Intermediate' },
  
  // Database
  { name: 'MongoDB', category: 'Database', proficiency: 'Intermediate' },
  { name: 'SQL / PostgreSQL', category: 'Database', proficiency: 'Intermediate' },
  
  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 'Advanced' },
  { name: 'Postman', category: 'Tools', proficiency: 'Intermediate' },
  
  // AI/ML
  { name: 'NLP Basics', category: 'AI/ML', proficiency: 'Beginner' }
];

export const INITIAL_JOB_RECOMMENDATIONS: JobRoleRecommendation[] = [
  {
    id: 'role_fullstack',
    title: 'Full Stack Developer',
    roleMatch: 85,
    category: 'Full Stack Engineering',
    demandLevel: 'Very High',
    avgSalary: '$78,000 - $110,000 / yr',
    description: 'Design and build end-to-end web applications combining robust backend services with modern responsive frontend interfaces.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Backend', 'Database', 'React', 'REST API'],
    matchedSkills: ['HTML', 'CSS', 'JavaScript', 'Database', 'ASP.NET Core', 'MongoDB'],
    missingSkills: ['React', 'REST API Best Practices', 'Docker']
  },
  {
    id: 'role_frontend',
    title: 'Frontend Developer',
    roleMatch: 88,
    category: 'Client Side Engineering',
    demandLevel: 'High',
    avgSalary: '$72,000 - $102,000 / yr',
    description: 'Create responsive, intuitive, and high-performance user experiences using modern HTML, CSS, JavaScript, and UI frameworks.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design', 'React / TypeScript'],
    matchedSkills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design'],
    missingSkills: ['React State Management', 'TypeScript Advanced']
  },
  {
    id: 'role_dotnet',
    title: '.NET Developer',
    roleMatch: 82,
    category: 'Enterprise Software',
    demandLevel: 'High',
    avgSalary: '$80,000 - $115,000 / yr',
    description: 'Develop scalable enterprise web APIs, microservices, and enterprise applications using C# and Microsoft ASP.NET Core ecosystem.',
    requiredSkills: ['C#', 'ASP.NET Core', 'Web API', 'SQL / ORM', 'Unit Testing', 'Azure'],
    matchedSkills: ['C#', 'ASP.NET Core', 'SQL / Database', 'Git'],
    missingSkills: ['Entity Framework Core', 'Azure DevOps', 'xUnit']
  },
  {
    id: 'role_backend',
    title: 'Backend Developer',
    roleMatch: 80,
    category: 'Server Side Engineering',
    demandLevel: 'Very High',
    avgSalary: '$82,000 - $120,000 / yr',
    description: 'Engineer scalable APIs, database architectures, background workers, and secure authentication flows.',
    requiredSkills: ['Backend Frameworks', 'REST APIs', 'Databases (SQL/NoSQL)', 'Caching', 'Security'],
    matchedSkills: ['ASP.NET Core', 'MongoDB', 'SQL', 'Git'],
    missingSkills: ['Redis Caching', 'Docker & Containerization', 'OAuth2 / JWT']
  },
  {
    id: 'role_python',
    title: 'Python Developer',
    roleMatch: 76,
    category: 'Backend & Automation',
    demandLevel: 'Moderate',
    avgSalary: '$75,000 - $108,000 / yr',
    description: 'Construct automated scripts, REST microservices with FastAPI/Flask, and data processing pipelines in Python.',
    requiredSkills: ['Python', 'FastAPI or Django', 'REST APIs', 'SQL / NoSQL', 'Data Structures'],
    matchedSkills: ['Python Core', 'MongoDB', 'Git'],
    missingSkills: ['FastAPI Microservices', 'Pandas', 'Celery Workers']
  },
  {
    id: 'role_data_analyst',
    title: 'Data Analyst',
    roleMatch: 70,
    category: 'Data & Analytics',
    demandLevel: 'Moderate',
    avgSalary: '$68,000 - $95,000 / yr',
    description: 'Extract actionable insights from relational and document databases, visualize trends, and support data-backed decisions.',
    requiredSkills: ['SQL', 'Python', 'Excel / BI Tools', 'Data Cleaning', 'Statistics'],
    matchedSkills: ['SQL Basics', 'Python Basics', 'MongoDB'],
    missingSkills: ['PowerBI / Tableau', 'Advanced Data Wrangling', 'Statistical Modeling']
  }
];

export const INITIAL_SKILL_GAP: SkillGapAnalysis = {
  selectedRole: 'Full Stack Developer',
  currentMatch: 85,
  matchedSkills: [
    'HTML',
    'CSS',
    'JavaScript',
    'Bootstrap',
    'C#',
    'ASP.NET',
    'MongoDB'
  ],
  skillsToDevelop: [
    'React',
    'REST APIs',
    'Docker'
  ],
  recommendedActions: [
    'Complete a hands-on project linking React frontend with ASP.NET Core Web API',
    'Deepen understanding of REST architectural constraints, status codes, and DTOs',
    'Containerize a multi-service full stack app using Docker Compose'
  ]
};

export const INITIAL_LEARNING_PATH: LearningStep[] = [
  {
    step: 1,
    title: 'REST API Development',
    level: 'Beginner',
    estimatedDuration: '8 - 12 hours',
    description: 'Learn clean RESTful architecture in ASP.NET Core and Express, focusing on route design, request validation, error handling middleware, and JSON serialization.',
    keySkills: ['REST Constraints', 'HTTP Status Codes', 'DTO Mapping', 'API Versioning'],
    suggestedResources: [
      { name: 'ASP.NET Core Web API Official Tutorial', type: 'Documentation' },
      { name: 'RESTful API Design Best Practices', type: 'Course' }
    ],
    completed: true
  },
  {
    step: 2,
    title: 'React Fundamentals',
    level: 'Beginner',
    estimatedDuration: '14 - 18 hours',
    description: 'Master modern React functional components, hooks (useState, useEffect, useMemo), state lifting, and component lifecycle for dynamic web user interfaces.',
    keySkills: ['JSX', 'Custom Hooks', 'Virtual DOM', 'Props & State'],
    suggestedResources: [
      { name: 'React.dev Interactive Guide', type: 'Documentation' },
      { name: 'Modern React 19 from Scratch', type: 'Course' }
    ],
    completed: false
  },
  {
    step: 3,
    title: 'Authentication & Security',
    level: 'Intermediate',
    estimatedDuration: '10 - 14 hours',
    description: 'Implement JWT (JSON Web Tokens), role-based access control (RBAC), password hashing with BCrypt/Argon2, and secure cookie management.',
    keySkills: ['JWT Authentication', 'RBAC Middleware', 'CORS Configuration', 'Security Headers'],
    suggestedResources: [
      { name: 'Securing Web APIs with ASP.NET Identity', type: 'Course' },
      { name: 'OWASP Top 10 Web Application Security', type: 'Documentation' }
    ],
    completed: false
  },
  {
    step: 4,
    title: 'Advanced MongoDB & Data Modeling',
    level: 'Intermediate',
    estimatedDuration: '12 - 16 hours',
    description: 'Design optimal document schemas, master aggregation pipelines, indexing strategies, and connection pooling in high-concurrency environments.',
    keySkills: ['Aggregation Pipeline', 'Index Optimization', 'Mongoose / C# MongoDB Driver', 'Transactions'],
    suggestedResources: [
      { name: 'MongoDB University: M220 for C# / JS Developers', type: 'Course' },
      { name: 'Designing NoSQL Data Schemas', type: 'Documentation' }
    ],
    completed: false
  },
  {
    step: 5,
    title: 'Docker & Deployment',
    level: 'Advanced',
    estimatedDuration: '15 - 20 hours',
    description: 'Package client, backend API, and database services into containerized microservices using Docker and multi-stage Dockerfiles ready for cloud deployment.',
    keySkills: ['Dockerfiles', 'Docker Compose', 'Environment Management', 'CI/CD Pipelines'],
    suggestedResources: [
      { name: 'Containerizing Full Stack Applications', type: 'Project' },
      { name: 'Cloud Deployment with Linux Containers', type: 'Documentation' }
    ],
    completed: false
  }
];

export const INITIAL_ANALYSIS_RESULT: ResumeAnalysisResult = {
  id: 'ana_2026_0981',
  fileName: 'Resume_Alex_Johnson_FullStack.pdf',
  fileSize: '412 KB',
  analyzedAt: '10 Sep 2026',
  resumeInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    phone: '+1 (555) 234-5678',
    education: 'Bachelor of Technology in Computer Science & Engineering (CGPA: 8.7/10.0)',
    experience: 'Academic & Capstone Projects (1+ Year equivalent practical lab & freelance development)',
    certifications: [
      'Microsoft Certified: Azure Fundamentals',
      'Meta Front-End Developer Specialization',
      'MongoDB Basics for C# & Node Developers'
    ],
    projects: [
      {
        title: 'AI Resume Analyzer & Job Role Recommender',
        description: 'Engineered an end-to-end web system extracting skills, computing score profiles, and matching candidate capabilities to job ontologies.',
        technologies: ['C#', 'ASP.NET Core', 'MongoDB', 'Python FastAPI', 'Bootstrap 5']
      },
      {
        title: 'Campus Event & Hackathon Management Portal',
        description: 'Built a multi-tier portal facilitating student registrations, team formations, and judging workflows.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST API', 'Git']
      },
      {
        title: 'E-Commerce Inventory & Order Processing API',
        description: 'Developed an asynchronous REST API managing product inventory, orders, and real-time status transitions.',
        technologies: ['ASP.NET Core', 'MongoDB', 'Swagger', 'Postman']
      }
    ]
  },
  detectedSkills: INITIAL_DETECTED_SKILLS,
  scoreBreakdown: {
    totalScore: 83,
    skillsScore: 34,
    skillsMax: 40,
    educationScore: 18,
    educationMax: 20,
    projectsScore: 13,
    projectsMax: 15,
    experienceScore: 10,
    experienceMax: 15,
    certificatesScore: 8,
    certificatesMax: 10,
    summaryNote: 'This score summarizes the information detected in your resume. It is not a guarantee of employment.',
    categories: [
      {
        label: 'Skills',
        score: 34,
        max: 40,
        icon: 'bi-cpu',
        description: '12 technical & core industry skills verified across backend, frontend, database, and programming categories.'
      },
      {
        label: 'Education',
        score: 18,
        max: 20,
        icon: 'bi-mortarboard',
        description: 'Accredited university degree detected with clear major, completion timeline, and strong academic standing.'
      },
      {
        label: 'Projects',
        score: 13,
        max: 15,
        icon: 'bi-kanban',
        description: '3 detailed real-world software projects with technical stacks, architecture descriptions, and deliverables.'
      },
      {
        label: 'Experience',
        score: 10,
        max: 15,
        icon: 'bi-briefcase',
        description: 'Practical capstone and project development work noted. Adding industrial internships will unlock the full 15 points.'
      },
      {
        label: 'Certificates',
        score: 8,
        max: 10,
        icon: 'bi-patch-check',
        description: 'Recognized industry certifications from Microsoft and Meta detected with relevant technology alignment.'
      }
    ]
  },
  jobRecommendations: INITIAL_JOB_RECOMMENDATIONS,
  skillGap: INITIAL_SKILL_GAP,
  learningPath: INITIAL_LEARNING_PATH
};

export const INITIAL_HISTORY: AnalysisHistoryItem[] = [
  {
    id: 'hist_01',
    date: '10 Sep 2026',
    resumeName: 'Resume_v1.pdf',
    fileSize: '412 KB',
    score: 83,
    topRole: 'Full Stack Developer',
    status: 'Completed'
  },
  {
    id: 'hist_02',
    date: '02 Sep 2026',
    resumeName: 'Alex_Johnson_Draft2.docx',
    fileSize: '318 KB',
    score: 76,
    topRole: 'Frontend Developer',
    status: 'Completed'
  },
  {
    id: 'hist_03',
    date: '24 Aug 2026',
    resumeName: 'Alex_Resume_Initial.pdf',
    fileSize: '380 KB',
    score: 68,
    topRole: 'Junior Web Developer',
    status: 'Completed'
  }
];

export const SAMPLE_RESUMES = [
  {
    id: 'sample_fullstack',
    title: 'Full Stack Developer (.NET + MongoDB + JS)',
    fileName: 'Alex_Johnson_FullStack_Resume.pdf',
    fileSize: '412 KB',
    targetRole: 'Full Stack Developer',
    description: 'Ideal candidate with C#, ASP.NET Core, MongoDB, JavaScript, and Bootstrap background.',
    content: `ALEX JOHNSON
Email: alex.johnson@student.edu | Phone: +1 (555) 234-5678
GitHub: github.com/alexjohnson | LinkedIn: linkedin.com/in/alexjohnson

EDUCATION
Bachelor of Technology in Computer Science & Engineering (2022 - 2026)
Tech University | CGPA: 8.7/10.0

TECHNICAL SKILLS
- Programming: C#, JavaScript (ES6+), Python, SQL
- Frontend: HTML5, CSS3, Bootstrap 5, Responsive UI Design
- Backend: ASP.NET Core Web API, Node.js, Express.js
- Database: MongoDB, PostgreSQL, SQL Server
- Tools & Practices: Git, GitHub, Postman, Swagger, Visual Studio, VS Code, Agile/Scrum

PROJECTS
1. AI-Powered Resume Analyzer & Job Role Recommender (Capstone Project)
   - Architected a full-stack platform parsing resumes, classifying skills using NLP, and calculating explainable fit scores.
   - Built backend API endpoints with ASP.NET Core and persisted records in MongoDB.
2. E-Commerce Inventory & Order API
   - Designed a high-throughput REST API with authentication, pagination, and MongoDB schema validation.
3. Campus Hackathon Portal
   - Developed responsive UI using Bootstrap 5 and vanilla JavaScript with dynamic filtering.

CERTIFICATIONS
- Microsoft Certified: Azure Fundamentals (AZ-900)
- Meta Front-End Developer Specialization
- MongoDB Developer Basics`
  },
  {
    id: 'sample_frontend',
    title: 'Frontend Web Developer (React + JS + UI/UX)',
    fileName: 'Taylor_Frontend_Web_Dev.docx',
    fileSize: '298 KB',
    targetRole: 'Frontend Developer',
    description: 'Strong client-side profile emphasizing modern JavaScript, React, CSS3, and design systems.',
    content: `TAYLOR REED
Email: taylor.reed@example.com | Phone: +1 (555) 987-6543
Portfolio: taylorcodes.dev

OBJECTIVE
Motivated Frontend Developer eager to create user-centric, accessible, and fast web applications.

EDUCATION
B.S. in Information Systems & Web Engineering (2021 - 2025)

SKILLS
- HTML5, CSS3, SCSS, Tailwind CSS, Bootstrap 5
- JavaScript, TypeScript, React, Next.js, Redux Toolkit
- REST APIs, Fetch, Axios, Webpack, Vite, Git, Figma

PROJECTS
- Realtime Task Collaboration Dashboard (React, Tailwind, WebSockets)
- Interactive Music Player & Audio Visualizer (JavaScript, HTML5 Canvas)
- SaaS Landing Page System (Bootstrap 5, Semantic HTML)

CERTIFICATIONS
- Google UX Design Professional Certificate
- FreeCodeCamp Responsive Web Design & JavaScript Algorithms`
  },
  {
    id: 'sample_python',
    title: 'Python Backend & Data Analyst',
    fileName: 'Jordan_Python_Data_Analyst.pdf',
    fileSize: '345 KB',
    targetRole: 'Python Developer / Data Analyst',
    description: 'Data-driven profile with Python, FastAPI, Pandas, SQL, and data visualization experience.',
    content: `JORDAN PATEL
Email: jordan.patel@datahub.io | Phone: +1 (555) 432-8765

EDUCATION
B.Sc. in Computer Science with Data Analytics Specialization (2022 - 2026)

CORE COMPETENCIES
- Python, FastAPI, Flask, SQL, PostgreSQL, MongoDB
- Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn
- Jupyter Notebooks, Docker, Git, Linux CLI

PROJECTS
- Financial Sentiment Analysis Pipeline with Python & NLP
- FastAPI Microservice for Stock Metric Calculations
- Interactive Sales Performance Dashboard with SQL & Plotly

CERTIFICATES
- IBM Data Science Professional Certificate
- Python for Everybody Specialization (University of Michigan)`
  }
];
