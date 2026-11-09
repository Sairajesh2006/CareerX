import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  Flame,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Calendar,
  Zap,
  Clock,
  Map,
  BookOpen,
  ChevronRight,
  AlertTriangle,
  Award,
  Layers,
  Code
} from 'lucide-react';

interface DashboardProps {
  onOpenProfile: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onOpenProfile }) => {
  const { 
    profile, 
    readinessScore, 
    skillBreakdown, 
    jobApplications, 
    roadmapStages, 
    setActiveTab, 
    awardXP 
  } = useApp();

  const [activeActivityMetric, setActiveActivityMetric] = useState<'hours' | 'problems'>('hours');

  // Realistic weekly activity demo data
  const weeklyActivityData = [
    { day: 'Mon', hours: 4.5, problems: 6 },
    { day: 'Tue', hours: 3.2, problems: 4 },
    { day: 'Wed', hours: 5.0, problems: 7 },
    { day: 'Thu', hours: 6.2, problems: 9 },
    { day: 'Fri', hours: 4.0, problems: 5 },
    { day: 'Sat', hours: 7.5, problems: 12 },
    { day: 'Sun (Today)', hours: 3.8, problems: 5 },
  ];

  const maxVal = activeActivityMetric === 'hours' ? 8 : 14;

  // Compute application counts
  const appsStats = {
    total: jobApplications.length,
    inProgress: jobApplications.filter(a => a.status === 'Applied' || a.status === 'Online Assessment' || a.status === 'Technical Interview' || a.status === 'HR Interview').length,
    interviews: jobApplications.filter(a => a.status === 'Technical Interview' || a.status === 'HR Interview').length,
    offers: jobApplications.filter(a => a.status === 'Selected').length,
  };

  // Compute completed roadmap tasks
  let totalTasks = 0;
  let completedTasks = 0;
  roadmapStages.forEach(stage => {
    stage.tasks.forEach(task => {
      totalTasks++;
      if (task.completed) completedTasks++;
    });
  });
  const roadmapPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Upcoming placement timeline events
  const upcomingGoals = [
    {
      title: 'Amazon SDE-1 Technical Round',
      date: 'In 6 days (Nov 14)',
      type: 'Interview',
      badge: 'High Priority',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
    },
    {
      title: 'Microsoft Codility OA Deadline',
      date: 'In 4 days (Nov 12)',
      type: 'Online Assessment',
      badge: 'Test Pending',
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    },
    {
      title: 'Complete Dynamic Programming Module',
      date: 'This Sunday',
      type: 'Roadmap Milestone',
      badge: 'Stage 2 Goal',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
    },
  ];

  // Dynamic next recommended actions based on weakest skills
  const weakSkillNames = skillBreakdown.weakSkills.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome & Student Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-purple-950/60 border border-indigo-500/20 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Campus Hiring Drive 2026 Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile.name}! 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeting <span className="text-indigo-400 font-semibold">{profile.targetPackage}</span> at top tech firms. You have solved <span className="text-emerald-400 font-semibold">{profile.leetcodeCount}+ questions</span> and hold a <span className="text-amber-400 font-semibold">{profile.streakDays}-day streak</span>.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                {profile.college}
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                CGPA: <strong className="text-white">{profile.cgpa}</strong>
              </span>
              <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                {profile.branch}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('skill-analyzer')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
            >
              <Target className="w-4 h-4" />
              <span>Diagnose Skill Gaps</span>
            </button>
            <button
              onClick={onOpenProfile}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Readiness Score */}
        <div 
          onClick={() => setActiveTab('skill-analyzer')}
          className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Placement Readiness
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{readinessScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                readinessScore >= 75 ? 'bg-emerald-400' : readinessScore >= 50 ? 'bg-indigo-400' : 'bg-amber-400'
              }`}
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>Probability: <strong className="text-slate-200">{readinessScore >= 75 ? 'High (Tier-1 Ready)' : 'Medium'}</strong></span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Metric 2: Roadmap Progress */}
        <div 
          onClick={() => setActiveTab('roadmap')}
          className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Roadmap Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Map className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{completedTasks}</span>
            <span className="text-xs text-slate-400">/ {totalTasks} tasks completed</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${roadmapPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>{roadmapPct}% total milestone progress</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Metric 3: Active Job Pipeline */}
        <div 
          onClick={() => setActiveTab('applications')}
          className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Application Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{appsStats.inProgress}</span>
            <span className="text-xs text-slate-400">active / {appsStats.total} total</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {appsStats.offers} Offer Received
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              {appsStats.interviews} In Interview
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>Amazon, Microsoft, Swiggy</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Metric 4: Daily Streak & Level */}
        <div 
          onClick={() => setActiveTab('gamification')}
          className="cursor-pointer p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Prep Streak & XP
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 flex items-center gap-1">
              {profile.streakDays}
              <span className="text-xs text-slate-400 font-normal">days 🔥</span>
            </span>
            <span className="text-xs text-indigo-300 font-semibold">Lvl {profile.level}</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200">{profile.xpPoints} XP</span>
            <span className="text-[10px] text-slate-400">Next level in 50 XP</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>5 Badges Unlocked</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide on desktop): Weekly Activity & Skill Radar Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Weekly Learning Activity Chart */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Weekly Learning & Problem Solving Activity
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Consistent daily execution is the #1 predictor of cracking campus technical rounds.
                </p>
              </div>

              {/* Metric selector toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setActiveActivityMetric('hours')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    activeActivityMetric === 'hours'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hours Studied
                </button>
                <button
                  onClick={() => setActiveActivityMetric('problems')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    activeActivityMetric === 'problems'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Problems Solved
                </button>
              </div>
            </div>

            {/* Custom SVG / Bar representation */}
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 border-b border-slate-800 pb-3">
                {weeklyActivityData.map((d, idx) => {
                  const val = activeActivityMetric === 'hours' ? d.hours : d.problems;
                  const heightPercent = Math.min(100, Math.round((val / maxVal) * 100));
                  const isToday = idx === 6;

                  return (
                    <div key={d.day} className="flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="text-[11px] font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        {val}{activeActivityMetric === 'hours' ? 'h' : ''}
                      </div>
                      <div className="w-full max-w-[42px] bg-slate-800/60 rounded-t-lg h-36 flex items-end p-1">
                        <div
                          className={`w-full rounded-md transition-all duration-500 ${
                            isToday
                              ? 'bg-gradient-to-t from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/20'
                              : 'bg-gradient-to-t from-slate-700 to-indigo-500/70 group-hover:from-indigo-600 group-hover:to-indigo-400'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <div className={`text-xs font-medium ${isToday ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
                        {d.day.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    Total this week:{' '}
                    <strong className="text-white">
                      {activeActivityMetric === 'hours' ? '34.2 hrs' : '48 questions'}
                    </strong>
                  </span>
                  <span className="hidden sm:inline text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18% vs last week
                  </span>
                </div>
                <button
                  onClick={() => {
                    awardXP(30, 'Logged extra placement study session');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
                >
                  + Log 1 hr study session
                </button>
              </div>
            </div>
          </div>

          {/* Skill Performance Quick Summary */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Key Placement Skill Readiness
                </h3>
                <p className="text-xs text-slate-400">
                  Scores calculated from diagnostic tests and self-assessments.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('skill-analyzer')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View All 10 Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillBreakdown.categoryScores.slice(0, 6).map(cat => (
                <div key={cat.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-300 truncate max-w-[180px]">
                      {cat.title}
                    </span>
                    <span className={`text-xs font-bold ${
                      cat.score >= 80 ? 'text-emerald-400' : cat.score >= 60 ? 'text-indigo-400' : 'text-amber-400'
                    }`}>
                      {cat.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.score >= 80 ? 'bg-emerald-400' : cat.score >= 60 ? 'bg-indigo-500' : 'bg-amber-400'
                      }`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col wide): Actionable Next Steps & Upcoming Deadlines */}
        <div className="space-y-6">
          {/* Actionable Next Steps (Prioritized Fixes) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-900 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Recommended Next Actions
              </h3>
              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                AI Prioritized
              </span>
            </div>

            <div className="space-y-3">
              {weakSkillNames.length > 0 ? (
                weakSkillNames.map(skill => (
                  <div
                    key={skill.id}
                    onClick={() => setActiveTab('skill-analyzer')}
                    className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] text-slate-500">Rating: {skill.rating}/5</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {skill.notes || 'Identified as a critical requirement for your target package.'}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                  All critical core skills are evaluated at 4+ stars! Great work.
                </div>
              )}

              {/* Quick action buttons */}
              <button
                onClick={() => setActiveTab('mock-interview')}
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  Take 5-min DSA Quick Quiz
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span>Check Resume ATS Score (78/100)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Upcoming Placement Deadlines & Goals */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Upcoming Deadlines & Goals
              </h3>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-[11px] text-slate-400 hover:text-indigo-400"
              >
                View Tracker
              </button>
            </div>

            <div className="space-y-3">
              {upcomingGoals.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" /> {item.date}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold shrink-0 border ${item.color}`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Placement Activity */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Recent Placement Activity
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-slate-300">
                    Cleared <strong className="text-white">TCS Digital Systems Interview</strong> (Offer Secured)
                  </p>
                  <span className="text-[10px] text-slate-500">2 days ago</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-slate-300">
                    Completed <strong className="text-white">SQL Window Functions Module</strong> (+75 XP)
                  </p>
                  <span className="text-[10px] text-slate-500">Yesterday</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-slate-300">
                    Submitted application to <strong className="text-white">Amazon SDE-1 2026</strong>
                  </p>
                  <span className="text-[10px] text-slate-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
