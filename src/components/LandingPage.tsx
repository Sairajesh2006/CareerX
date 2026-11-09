import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Rocket,
  Target,
  Map,
  Briefcase,
  Sparkles,
  Bot,
  FileCheck2,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Star,
  Zap,
  Code2,
  ChevronRight,
  Layers
} from 'lucide-react';

interface LandingPageProps {
  onStartJourney: () => void;
  onOpenProfile: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartJourney }) => {
  const { setActiveTab, setIsLoggedIn, readinessScore } = useApp();
  const [activePreviewTab, setActivePreviewTab] = useState<'readiness' | 'gaps' | 'roadmap'>('readiness');

  const handleLaunchDashboard = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const sampleStats = [
    { value: '14,200+', label: 'Students Prepared', sub: 'Across 120+ Tier-1 & Tier-2 Colleges' },
    { value: '88.4%', label: 'Placement Conversion', sub: 'Placed within 90 days of roadmap completion' },
    { value: '420+', label: 'Hiring Companies', sub: 'FAANG, Product Startups & Mass Recruiters' },
    { value: '14.6 LPA', label: 'Average Package', sub: '4.2x higher than typical college baseline' },
  ];

  const features = [
    {
      icon: Target,
      color: 'from-indigo-500 to-blue-600',
      title: 'Smart Skill Gap Analyzer',
      desc: 'Evaluates your competency across 10 critical placement dimensions: DSA, Java, SQL, OS, Networks, OOP, Aptitude, Projects, and Live Coding.',
      actionTab: 'skill-analyzer',
    },
    {
      icon: Map,
      color: 'from-emerald-500 to-teal-600',
      title: 'Dynamic Personalized Roadmap',
      desc: 'Generates an actionable 7-stage prep blueprint with curated documentation, weekly milestones, and problem sets calibrated to your target CTC.',
      actionTab: 'roadmap',
    },
    {
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-600',
      title: 'Placement Application Pipeline',
      desc: 'Interactive Kanban board & round-by-round tracker for on-campus and off-campus drives, OA deadlines, and HR interviews.',
      actionTab: 'applications',
    },
    {
      icon: Bot,
      color: 'from-purple-500 to-pink-600',
      title: 'AI Career Guidance Assistant',
      desc: 'Round-the-clock placement mentor providing instant algorithmic hints, STAR method behavioral phrasing, and company-specific tips.',
      actionTab: 'ai-assistant',
    },
    {
      icon: FileCheck2,
      color: 'from-amber-500 to-orange-600',
      title: 'ATS Resume Diagnostic Engine',
      desc: 'Evaluates ATS compatibility, checks for missing technical keywords, calculates action-verb ratios, and suggests quantifiable project bullets.',
      actionTab: 'resume-analyzer',
    },
    {
      icon: Building2,
      color: 'from-rose-500 to-red-600',
      title: 'Company Preparation Hub',
      desc: 'Deep breakdown of hiring rounds, CGPA cutoffs, past interview questions, and prep strategies for Amazon, Google, Microsoft, TCS, and Infosys.',
      actionTab: 'company-hub',
    },
  ];

  const sampleTestimonials = [
    {
      name: 'Rohan Sharma',
      role: 'SDE-1 @ Amazon',
      college: 'NIT Surathkal, 2025 Batch',
      package: '28.5 LPA',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      quote: 'I had an 8.9 CGPA but kept failing product company OAs. Smart Placement Tracker highlighted that my Dynamic Programming and System Design fundamentals were my blindspots. The 7-stage roadmap gave me exact weekly goals.',
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Associate Software Engineer @ Atlassian',
      college: 'VIT Vellore, 2025 Batch',
      package: '32.0 LPA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      quote: 'The Mock Interview Center and ATS Resume Analyzer helped restructure my final year projects. Recruiters directly complimented my clear STAR-format project bullets during the Atlassian Bar Raiser round.',
    },
    {
      name: 'Karthik Raja',
      role: 'Systems Engineer @ TCS Digital',
      college: 'Anna University, 2025 Batch',
      package: '9.2 LPA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      quote: 'From being scared of campus screening aptitude rounds to clearing TCS Digital on the first attempt! The daily streaks and aptitude drills made preparation feel like a rewarding game.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-slate-900/80 border-b border-indigo-500/20 px-4 py-2 text-center text-xs text-indigo-200 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-semibold text-white">2026 Campus Placement Season is Active:</span>
        <span className="hidden sm:inline">Evaluate your placement readiness score in under 3 minutes.</span>
        <button
          onClick={handleLaunchDashboard}
          className="underline font-bold text-white hover:text-indigo-300 ml-1"
        >
          Take Assessment →
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              Your Skills. Your Roadmap. Your Dream Placement.
            </div>

            {/* Main Hero Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Don't Just Graduate.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                Get Placement Ready.
              </span>
            </h1>

            {/* Subheading / Value Proposition */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Most students focus only on CGPA, but top recruiters evaluate DSA, system architecture, core CS, SQL, aptitude, and live coding. We analyze your exact skill gaps and build you a personalized roadmap to land your dream package.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onStartJourney}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 group transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Explore Features</span>
              </button>
            </div>

            {/* Interactive Live Dashboard Preview Box */}
            <div className="relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800/40 to-slate-900/80 shadow-2xl border border-slate-700/60">
              <div className="rounded-xl bg-slate-950 p-4 sm:p-6 text-left overflow-hidden">
                {/* Header bar of the preview */}
                <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-slate-800/80 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      portal.smartplacementtracker.com/demo
                    </span>
                  </div>

                  {/* Switchable mini preview tabs */}
                  <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setActivePreviewTab('readiness')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        activePreviewTab === 'readiness'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Readiness Meter
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('gaps')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        activePreviewTab === 'gaps'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Skill Gap Matrix
                    </button>
                    <button
                      onClick={() => setActivePreviewTab('roadmap')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        activePreviewTab === 'roadmap'
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      7-Stage Roadmap
                    </button>
                  </div>
                </div>

                {/* Tab 1: Readiness Overview */}
                {activePreviewTab === 'readiness' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Overall Placement Score
                        </span>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-4xl font-extrabold text-white">{readinessScore}</span>
                          <span className="text-slate-400 text-sm">/ 100</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> High Placement Probability (Top 15%)
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                        Targeting: <span className="text-indigo-300 font-semibold">18 - 25 LPA (SDE-1)</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Competency Breakdown
                      </span>
                      <div className="space-y-2 text-xs">
                        <div>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span>Data Structures & Algorithms</span>
                            <span className="font-bold text-amber-400">70%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{ width: '70%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span>SQL & Database Internals</span>
                            <span className="font-bold text-emerald-400">85%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span>Core CS (OS & Networks)</span>
                            <span className="font-bold text-indigo-400">78%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-400 h-full rounded-full" style={{ width: '78%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> Immediate Focus
                        </span>
                        <h4 className="text-sm font-bold text-white mt-2">Dynamic Programming 2D</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Your assessment flagged knapsack and state memoization as a high-impact gap for Amazon and Microsoft OAs.
                        </p>
                      </div>

                      <button
                        onClick={handleLaunchDashboard}
                        className="mt-4 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Open Complete Dashboard</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab 2: Skill Gaps */}
                {activePreviewTab === 'gaps' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                        <CheckCircle2 className="w-4 h-4" /> Strong Skills (Industry Ready)
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Java Collections', 'SQL Window Functions', 'Two Pointers', 'OOP Principles', 'HTTP & REST'].map(s => (
                          <span key={s} className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
                        <Zap className="w-4 h-4" /> Priority Areas to Improve
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Dynamic Programming', 'B-Tree Indexing', 'Graph Dijkstra', 'STAR Behavioral Phrasing'].map(s => (
                          <span key={s} className="px-2 py-1 rounded bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-2">
                        <Code2 className="w-4 h-4" /> Missing Resume Keywords
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Unit Testing (JUnit)', 'Docker Containerization', 'Redis Caching', 'CI/CD Pipelines'].map(s => (
                          <span key={s} className="px-2 py-1 rounded bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Roadmap */}
                {activePreviewTab === 'roadmap' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Structured Placement Roadmap: 7 Stages</span>
                      <span className="text-emerald-400 font-semibold">Stage 2 in progress (65% completed)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40">
                        <div className="text-emerald-400 font-bold mb-1">Stage 1: Completed</div>
                        <div className="text-slate-300">Programming & OOP Fundamentals</div>
                      </div>
                      <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/40">
                        <div className="text-indigo-400 font-bold mb-1">Stage 2: Active</div>
                        <div className="text-slate-300">DSA & Pattern Mastery (Trees/DP)</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <div className="text-slate-400 font-bold mb-1">Stage 3: Next</div>
                        <div className="text-slate-400">Core Computer Science (OS & CN)</div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                        <div className="text-slate-400 font-bold mb-1">Stage 4-7</div>
                        <div className="text-slate-400">SQL, Projects & Mock Interviews</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Statistics Section */}
      <section className="py-12 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Platform Impact (Sample Demo Statistics)
              </h3>
              <p className="text-sm text-slate-400">
                Representative performance metrics across benchmark campus cohort evaluations.
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Demo Simulation Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sampleStats.map((stat, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features-section" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Everything You Need To Crack Placements
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Complete Preparation Ecosystem
            </p>
            <p className="text-slate-400 text-base mt-3">
              Eliminate guesswork with data-driven skill diagnostics, structured schedules, and automated company preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setIsLoggedIn(true);
                    setActiveTab(feature.actionTab);
                  }}
                  className="cursor-pointer group p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
              The 3-Step Methodology
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Skill Gaps to Placement Offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-white mb-2">Diagnose Your Real Skill Gaps</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Complete self-evaluations and quick interactive quizzes across DSA, SQL, OS, CN, and Aptitude. Understand where recruiters will find weaknesses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-white mb-2">Execute Your Personalized Roadmap</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Follow high-yield milestones tailored to your target CTC. Mark completed tasks, solve curated problems, and practice mock technical rounds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-white mb-2">Track Applications & Secure Offers</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Manage all your campus drives and off-campus referrals in one unified pipeline. Clear each round with company-specific interview prep guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials (Clearly labeled demo stories) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Sample Student Stories (Illustrative Demo Testimonials)
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                Real Breakthroughs from Campus Cohorts
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              *The following profiles reflect sample representative user stories illustrating platform outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                  <div>
                    <div className="text-sm font-bold text-white">{item.name}</div>
                    <div className="text-xs text-indigo-400 font-semibold">{item.role} • {item.package}</div>
                    <div className="text-[10px] text-slate-500">{item.college}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-indigo-950/40 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/25">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to Accelerate Your Placement Preparation?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Take control of your technical career today. Discover your skill gaps, follow your personalized roadmap, and become placement-ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLaunchDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              <span>Launch Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">SMART PLACEMENT TRACKER</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Intelligent student placement preparation platform. Identifying skill gaps and constructing structured roadmaps for campus placements.
            </p>
            <p className="text-[11px] text-slate-400">
              Tagline: "Your Skills. Your Roadmap. Your Dream Placement."
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Features & Tools</h4>
            <ul className="space-y-2">
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('skill-analyzer'); }} className="hover:text-white transition-colors">Skill Gap Analyzer</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('roadmap'); }} className="hover:text-white transition-colors">7-Stage Roadmap</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('applications'); }} className="hover:text-white transition-colors">Application Tracker</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('resume-analyzer'); }} className="hover:text-white transition-colors">ATS Resume Analyzer</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('mock-interview'); }} className="hover:text-white transition-colors">Mock Interview Center</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Target Recruiters</h4>
            <ul className="space-y-2">
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('company-hub'); }} className="hover:text-white transition-colors">Amazon SDE Prep</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('company-hub'); }} className="hover:text-white transition-colors">Google SWE Prep</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('company-hub'); }} className="hover:text-white transition-colors">Microsoft Codility OA</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('company-hub'); }} className="hover:text-white transition-colors">TCS Digital & Prime</button></li>
              <li><button onClick={() => { setIsLoggedIn(true); setActiveTab('company-hub'); }} className="hover:text-white transition-colors">Infosys Specialist Programmer</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3">Support & Guidance</h4>
            <p className="leading-relaxed mb-3">
              Need assistance setting up your college placement preparation schedule?
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-white font-medium block">Campus Placement Office</span>
              <span className="text-slate-400">support@smartplacementtracker.io</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SMART PLACEMENT TRACKER. Built for ambitious student engineers.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Placement Ethics</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
