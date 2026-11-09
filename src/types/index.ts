export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  rating: number; // 1 to 5
  expectedLevel: number; // 1 to 5 required for target package
  isCritical: boolean;
  notes?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  weight: number; // for overall score calculation
  skills: SkillItem[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resourceTitle: string;
  resourceUrl: string;
  completed: boolean;
  completedAt?: string;
  category: string;
}

export interface RoadmapStage {
  id: number;
  title: string;
  subtitle: string;
  durationWeeks: number;
  tasks: RoadmapTask[];
}

export type ApplicationStatus = 
  | 'Interested' 
  | 'Applied' 
  | 'Online Assessment' 
  | 'Technical Interview' 
  | 'HR Interview' 
  | 'Selected' 
  | 'Rejected';

export interface JobApplication {
  id: string;
  companyName: string;
  role: string;
  packageCTC: string; // e.g. "18.5 LPA"
  location: string;
  applicationDate: string;
  status: ApplicationStatus;
  roundsCompleted: number;
  totalRounds: number;
  nextStepDate?: string;
  notes?: string;
  logoColor?: string;
  jobType?: 'Full-Time' | 'Internship' | '6M Intern + PPO';
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizAttempt {
  id: string;
  category: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  date: string;
}

export interface CompanyGuide {
  id: string;
  name: string;
  tier: 'Tier-1 Product' | 'High-Growth Tech' | 'IT Services / Mass Recruiter';
  logoColor: string;
  ctcRange: string;
  cgpaCutoff: string;
  eligibility: string;
  rounds: {
    roundNumber: number;
    title: string;
    focus: string;
    description: string;
  }[];
  keySkills: string[];
  frequentTopics: string[];
  sampleQuestions: {
    title: string;
    type: 'Coding' | 'System Design' | 'CS Core' | 'Behavioral';
    question: string;
    tip: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  avatarUrl: string;
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  cgpa: number;
  targetPackage: string; // e.g. "18 - 25 LPA"
  targetCompanies: string[];
  preferredRoles: string[];
  careerInterests: string[];
  githubUsername?: string;
  linkedinUsername?: string;
  leetcodeCount?: number;
  streakDays: number;
  xpPoints: number;
  level: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface ResumeAnalysisResult {
  overallScore: number;
  atsCompatibility: number;
  impactScore: number;
  formattingScore: number;
  detectedSkills: string[];
  missingCriticalSkills: string[];
  actionVerbCount: number;
  strengths: string[];
  weaknesses: string[];
  keyRecommendations: string[];
  lastAnalyzedFile?: string;
}
