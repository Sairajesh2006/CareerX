import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  StudentProfile, 
  SkillCategory, 
  SkillItem, 
  RoadmapStage, 
  RoadmapTask, 
  JobApplication, 
  Badge, 
  QuizAttempt, 
  ResumeAnalysisResult 
} from '../types';
import { 
  initialStudentProfile, 
  initialSkillCategories, 
  initialRoadmapStages, 
  initialJobApplications, 
  initialBadges, 
  initialResumeAnalysis 
} from '../data/mockData';
import { triggerConfetti, triggerAchievementCelebration } from '../utils/confetti';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'xp';
}

interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  skillCategories: SkillCategory[];
  updateSkillRating: (categoryId: string, skillId: string, newRating: number) => void;
  roadmapStages: RoadmapStage[];
  toggleTask: (stageId: number, taskId: string) => void;
  addTask: (stageId: number, task: Omit<RoadmapTask, 'id' | 'completed'>) => void;
  jobApplications: JobApplication[];
  addJobApplication: (app: Omit<JobApplication, 'id'>) => void;
  updateJobApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteJobApplication: (id: string) => void;
  badges: Badge[];
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => void;
  resumeAnalysis: ResumeAnalysisResult;
  updateResumeAnalysis: (res: ResumeAnalysisResult) => void;
  readinessScore: number;
  skillBreakdown: {
    strongSkills: SkillItem[];
    weakSkills: SkillItem[];
    missingSkills: SkillItem[];
    categoryScores: { id: string; title: string; score: number }[];
  };
  awardXP: (amount: number, reason: string) => void;
  resetToDefaultData: () => void;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'xp') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'spt_v1_';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation & Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}isLoggedIn`);
    return saved ? JSON.parse(saved) : true; // default to true so users can immediately test dashboard
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}activeTab`);
    return saved ? saved : 'dashboard';
  });

  // Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}profile`);
    return saved ? JSON.parse(saved) : initialStudentProfile;
  });

  // Skills
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}skillCategories`);
    return saved ? JSON.parse(saved) : initialSkillCategories;
  });

  // Roadmap
  const [roadmapStages, setRoadmapStages] = useState<RoadmapStage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}roadmapStages`);
    return saved ? JSON.parse(saved) : initialRoadmapStages;
  });

  // Job Applications
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}jobApplications`);
    return saved ? JSON.parse(saved) : initialJobApplications;
  });

  // Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}badges`);
    return saved ? JSON.parse(saved) : initialBadges;
  });

  // Quiz Attempts
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quizAttempts`);
    return saved ? JSON.parse(saved) : [
      { id: 'qa-1', category: 'Java & OOP', totalQuestions: 5, score: 4, percentage: 80, date: '2026-11-04' },
      { id: 'qa-2', category: 'DSA & Algorithms', totalQuestions: 5, score: 3, percentage: 60, date: '2026-11-06' },
      { id: 'qa-3', category: 'SQL & DBMS', totalQuestions: 5, score: 5, percentage: 100, date: '2026-11-07' },
    ];
  });

  // Resume Analysis
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}resumeAnalysis`);
    return saved ? JSON.parse(saved) : initialResumeAnalysis;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}isLoggedIn`, JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}activeTab`, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}skillCategories`, JSON.stringify(skillCategories));
  }, [skillCategories]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}roadmapStages`, JSON.stringify(roadmapStages));
  }, [roadmapStages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}jobApplications`, JSON.stringify(jobApplications));
  }, [jobApplications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}badges`, JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}quizAttempts`, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}resumeAnalysis`, JSON.stringify(resumeAnalysis));
  }, [resumeAnalysis]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'xp' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev.slice(-3), { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const awardXP = (amount: number, reason: string) => {
    setProfile(prev => {
      const newXP = prev.xpPoints + amount;
      const newLevel = Math.floor(newXP / 700) + 1;
      const leveledUp = newLevel > prev.level;
      if (leveledUp) {
        triggerAchievementCelebration();
        showToast('Level Up! 🎉', `You reached Level ${newLevel}! Amazing dedication.`, 'xp');
      } else {
        showToast(`+${amount} XP Gained! ⚡`, reason, 'xp');
      }
      return {
        ...prev,
        xpPoints: newXP,
        level: newLevel,
      };
    });
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Your student information has been saved.', 'success');
  };

  const updateSkillRating = (categoryId: string, skillId: string, newRating: number) => {
    setSkillCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        skills: cat.skills.map(s => s.id === skillId ? { ...s, rating: newRating } : s),
      };
    }));
    awardXP(25, 'Assessed technical skill proficiency');
  };

  const toggleTask = (stageId: number, taskId: string) => {
    let nowCompleted = false;
    setRoadmapStages(prev => prev.map(stage => {
      if (stage.id !== stageId) return stage;
      return {
        ...stage,
        tasks: stage.tasks.map(task => {
          if (task.id === taskId) {
            nowCompleted = !task.completed;
            return {
              ...task,
              completed: nowCompleted,
              completedAt: nowCompleted ? new Date().toISOString().split('T')[0] : undefined,
            };
          }
          return task;
        }),
      };
    }));

    if (nowCompleted) {
      triggerConfetti();
      awardXP(75, 'Completed placement roadmap milestone');
    }
  };

  const addTask = (stageId: number, taskData: Omit<RoadmapTask, 'id' | 'completed'>) => {
    const newTask: RoadmapTask = {
      ...taskData,
      id: `custom-${Date.now()}`,
      completed: false,
    };
    setRoadmapStages(prev => prev.map(stage => {
      if (stage.id !== stageId) return stage;
      return {
        ...stage,
        tasks: [...stage.tasks, newTask],
      };
    }));
    showToast('Task Added', `Added "${taskData.title}" to Stage ${stageId}.`, 'info');
  };

  const addJobApplication = (appData: Omit<JobApplication, 'id'>) => {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now()}`,
    };
    setJobApplications(prev => [newApp, ...prev]);
    awardXP(50, `Logged job application for ${appData.companyName}`);
  };

  const updateJobApplication = (id: string, updates: Partial<JobApplication>) => {
    setJobApplications(prev => prev.map(app => {
      if (app.id !== id) return app;
      const updated = { ...app, ...updates };
      if (updates.status === 'Selected') {
        triggerAchievementCelebration();
        awardXP(500, `Offer selected! Incredible achievement with ${app.companyName}!`);
      }
      return updated;
    }));
    showToast('Application Updated', 'Changes saved to your placement pipeline.', 'info');
  };

  const deleteJobApplication = (id: string) => {
    setJobApplications(prev => prev.filter(app => app.id !== id));
    showToast('Application Removed', 'Removed application from tracker.', 'info');
  };

  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'date'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `qa-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);
    const earnedXP = attemptData.score * 30 + (attemptData.percentage >= 80 ? 100 : 20);
    if (attemptData.percentage >= 80) {
      triggerConfetti();
    }
    awardXP(earnedXP, `Completed ${attemptData.category} assessment (${attemptData.percentage}%)`);
  };

  const updateResumeAnalysis = (res: ResumeAnalysisResult) => {
    setResumeAnalysis(res);
    awardXP(100, 'Analyzed placement resume ATS score');
  };

  const resetToDefaultData = () => {
    setProfile(initialStudentProfile);
    setSkillCategories(initialSkillCategories);
    setRoadmapStages(initialRoadmapStages);
    setJobApplications(initialJobApplications);
    setBadges(initialBadges);
    setResumeAnalysis(initialResumeAnalysis);
    showToast('Data Reset', 'Restored rich demo placement dataset.', 'info');
  };

  // Compute Skill Gaps & Readiness Score dynamically
  const skillBreakdown = useMemo(() => {
    const allSkills: SkillItem[] = [];
    const categoryScores: { id: string; title: string; score: number }[] = [];

    skillCategories.forEach(cat => {
      let totalRating = 0;
      let totalExpected = 0;
      cat.skills.forEach(s => {
        allSkills.push(s);
        totalRating += s.rating;
        totalExpected += s.expectedLevel;
      });
      const catScore = Math.round((totalRating / totalExpected) * 100);
      categoryScores.push({ id: cat.id, title: cat.title, score: catScore });
    });

    const strongSkills = allSkills.filter(s => s.rating >= 4);
    const weakSkills = allSkills.filter(s => s.rating > 0 && s.rating < 3);
    const missingSkills = allSkills.filter(s => s.rating <= 2 && s.isCritical);

    return { strongSkills, weakSkills, missingSkills, categoryScores };
  }, [skillCategories]);

  // Overall Placement Readiness Score (0-100)
  const readinessScore = useMemo(() => {
    // 1. Skill Assessment component (50% weight)
    let totalSkillWeightedScore = 0;
    skillCategories.forEach(cat => {
      let catRating = 0;
      let catMax = 0;
      cat.skills.forEach(s => {
        catRating += s.rating;
        catMax += s.expectedLevel;
      });
      const ratio = catMax > 0 ? catRating / catMax : 0.6;
      totalSkillWeightedScore += ratio * cat.weight;
    });
    const skillScore = Math.min(100, Math.round(totalSkillWeightedScore * 100));

    // 2. Roadmap completion component (30% weight)
    let totalTasks = 0;
    let completedTasks = 0;
    roadmapStages.forEach(s => {
      s.tasks.forEach(t => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });
    const roadmapScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 50;

    // 3. Resume ATS component (20% weight)
    const resumeScore = resumeAnalysis.overallScore || 70;

    const composite = Math.round(skillScore * 0.50 + roadmapScore * 0.30 + resumeScore * 0.20);
    return Math.max(10, Math.min(99, composite));
  }, [skillCategories, roadmapStages, resumeAnalysis]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        activeTab,
        setActiveTab,
        profile,
        updateProfile,
        skillCategories,
        updateSkillRating,
        roadmapStages,
        toggleTask,
        addTask,
        jobApplications,
        addJobApplication,
        updateJobApplication,
        deleteJobApplication,
        badges,
        quizAttempts,
        recordQuizAttempt,
        resumeAnalysis,
        updateResumeAnalysis,
        readinessScore,
        skillBreakdown,
        awardXP,
        resetToDefaultData,
        toasts,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
