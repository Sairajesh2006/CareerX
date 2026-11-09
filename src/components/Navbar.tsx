import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Rocket, 
  Flame, 
  Sparkles, 
  RotateCcw, 
  User, 
  LayoutDashboard, 
  Globe, 
  Menu, 
  X,
  Target
} from 'lucide-react';

interface NavbarProps {
  onOpenProfile: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenProfile, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const { 
    isLoggedIn, 
    setIsLoggedIn, 
    activeTab, 
    setActiveTab, 
    profile, 
    readinessScore, 
    resetToDefaultData 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (isLoggedIn) setActiveTab('dashboard');
              else setActiveTab('landing');
            }} 
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  SMART PLACEMENT TRACKER
                </span>
                <span className="hidden xl:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  SaaS v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Your Skills. Your Roadmap. Your Dream Placement.
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Landing / Dashboard switch */}
          <div className="hidden md:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('landing');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'landing'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Landing Page
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(true);
                if (activeTab === 'landing') setActiveTab('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab !== 'landing'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Student Portal
            </button>
          </div>

          {/* Placement Readiness Badge */}
          {activeTab !== 'landing' && (
            <div 
              onClick={() => setActiveTab('skill-analyzer')}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors"
              title="Click to view detailed Skill Gap Analyzer"
            >
              <div className="relative flex items-center justify-center">
                <Target className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Readiness</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span className={readinessScore >= 75 ? 'text-emerald-400' : readinessScore >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                    {readinessScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* Streak & XP Badges */}
          <div className="flex items-center gap-2">
            {/* Streak */}
            <div 
              onClick={() => setActiveTab('gamification')}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold hover:border-amber-500/40 transition-colors"
              title="Daily Preparation Streak"
            >
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>{profile.streakDays}d</span>
            </div>

            {/* XP */}
            <div 
              onClick={() => setActiveTab('gamification')}
              className="cursor-pointer hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold hover:border-indigo-500/40 transition-colors"
              title={`Level ${profile.level} Aspirant - ${profile.xpPoints} XP earned`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{profile.xpPoints} XP</span>
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetToDefaultData}
            title="Reset to Demo Data"
            className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">Reset Data</span>
          </button>

          {/* Profile Avatar & Details */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all text-left group"
          >
            <div className="hidden md:block text-right">
              <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                {profile.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {profile.targetPackage}
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
