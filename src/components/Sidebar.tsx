import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Target,
  Map,
  Briefcase,
  Bot,
  FileCheck2,
  BrainCircuit,
  Building2,
  Trophy,
  User,
  ExternalLink,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  onOpenProfile: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenProfile, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const { 
    activeTab, 
    setActiveTab, 
    readinessScore, 
    profile, 
    jobApplications 
  } = useApp();

  const activeAppsCount = jobApplications.filter(
    a => a.status !== 'Rejected' && a.status !== 'Selected'
  ).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Student Dashboard',
      description: 'Readiness & Activity',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'skill-analyzer',
      label: 'Skill Gap Analyzer',
      description: 'Diagnostics & Radar',
      icon: Target,
      badge: `${readinessScore}%`,
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    },
    {
      id: 'roadmap',
      label: 'Personalized Roadmap',
      description: '7-Stage Step by Step',
      icon: Map,
      badge: '7 Stages',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
    {
      id: 'applications',
      label: 'Application Tracker',
      description: 'Jobs & Interview Rounds',
      icon: Briefcase,
      badge: activeAppsCount > 0 ? `${activeAppsCount} Active` : null,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    },
    {
      id: 'ai-assistant',
      label: 'AI Career Assistant',
      description: 'Instant Prep Mentor',
      icon: Bot,
      badge: 'AI Powered',
      badgeColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    },
    {
      id: 'resume-analyzer',
      label: 'Resume Analyzer',
      description: 'ATS Score & Keywords',
      icon: FileCheck2,
      badge: 'ATS 78',
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    },
    {
      id: 'mock-interview',
      label: 'Mock Interview Center',
      description: 'Java, DSA, SQL, HR',
      icon: BrainCircuit,
      badge: 'Quiz Bank',
      badgeColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    },
    {
      id: 'company-hub',
      label: 'Company Prep Hub',
      description: 'Amazon, Google, TCS',
      icon: Building2,
      badge: '6 Top Recruiters',
      badgeColor: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    },
    {
      id: 'gamification',
      label: 'Streak & Leaderboard',
      description: 'XP, Badges & Ranks',
      icon: Trophy,
      badge: `Lvl ${profile.level}`,
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-slate-950/95 border-r border-slate-800/80 p-4 flex flex-col justify-between z-30 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div>
          {/* Quick status mini-card */}
          <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900/60 to-purple-950/30 border border-indigo-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                Target Placement
              </span>
              <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                {profile.targetPackage}
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Readiness Score</span>
                <span className="font-bold text-slate-200">{readinessScore}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Core Modules
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/40' 
                        : 'bg-slate-900 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate font-medium group-hover:text-white transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ml-1.5 ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer with Profile quick access */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2 mt-4">
          <button
            onClick={onOpenProfile}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/30 transition-all text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-200 truncate">{profile.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{profile.college}</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
          </button>

          <button
            onClick={() => setActiveTab('landing')}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Landing Page</span>
          </button>
        </div>
      </aside>
    </>
  );
};
