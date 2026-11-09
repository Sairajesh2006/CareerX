import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  Star,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Layers,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

export const SkillAnalyzer: React.FC = () => {
  const { 
    skillCategories, 
    updateSkillRating, 
    skillBreakdown, 
    readinessScore, 
    setActiveTab, 
    profile 
  } = useApp();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(skillCategories[0]?.id || 'prog-languages');
  const [filterMode, setFilterMode] = useState<'all' | 'weak' | 'critical'>('all');

  const selectedCategory = skillCategories.find(c => c.id === selectedCategoryId) || skillCategories[0];

  // Radar/Polygon SVG dimensions for visual analytics
  const radarRadius = 90;
  const radarCenter = 120;
  const categoriesCount = skillCategories.length;

  // Compute polygon points for SVG radar chart
  const radarPoints = skillCategories.map((cat, i) => {
    let totalScore = 0;
    let maxScore = 0;
    cat.skills.forEach(s => {
      totalScore += s.rating;
      maxScore += s.expectedLevel;
    });
    const ratio = maxScore > 0 ? totalScore / maxScore : 0.5;
    const angle = (Math.PI * 2 * i) / categoriesCount - Math.PI / 2;
    const distance = radarRadius * ratio;
    const x = radarCenter + distance * Math.cos(angle);
    const y = radarCenter + distance * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Compute background guide rings for radar
  const guideRings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-purple-950/60 border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Diagnostic Assessment Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Smart Skill Gap Analyzer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Companies don't hire by CGPA alone. We evaluate your competencies across 10 technical and behavioral pillars against standard hiring benchmarks for {profile.targetPackage}.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-right">
              <div className="text-xs text-slate-400">Target Benchmark</div>
              <div className="text-base font-bold text-white">{profile.targetPackage}</div>
              <div className="text-[11px] text-emerald-400">Current Score: {readinessScore}/100</div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-indigo-500/40 flex items-center justify-center font-extrabold text-white text-lg bg-indigo-950/50">
              {readinessScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics & Skill Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: SVG Radar Analysis */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-between">
          <div className="w-full text-left mb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              10-Pillar Competency Radar
            </h3>
            <p className="text-xs text-slate-400">
              Polygon shape reveals gaps against target placement baseline.
            </p>
          </div>

          <div className="relative py-2 flex items-center justify-center">
            <svg width="240" height="240" className="overflow-visible">
              {/* Background concentric guide circles */}
              {guideRings.map((scale, idx) => (
                <circle
                  key={idx}
                  cx={radarCenter}
                  cy={radarCenter}
                  r={radarRadius * scale}
                  fill="none"
                  stroke="#1e293b"
                  strokeDasharray={scale === 1.0 ? '0' : '3 3'}
                  strokeWidth="1"
                />
              ))}

              {/* Axis rays */}
              {skillCategories.map((_, i) => {
                const angle = (Math.PI * 2 * i) / categoriesCount - Math.PI / 2;
                const x = radarCenter + radarRadius * Math.cos(angle);
                const y = radarCenter + radarRadius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={radarCenter}
                    y1={radarCenter}
                    x2={x}
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon */}
              <polygon
                points={radarPoints}
                fill="rgba(99, 102, 241, 0.25)"
                stroke="#6366f1"
                strokeWidth="2"
              />

              {/* Data points */}
              {skillCategories.map((cat, i) => {
                let totalScore = 0;
                let maxScore = 0;
                cat.skills.forEach(s => {
                  totalScore += s.rating;
                  maxScore += s.expectedLevel;
                });
                const ratio = maxScore > 0 ? totalScore / maxScore : 0.5;
                const angle = (Math.PI * 2 * i) / categoriesCount - Math.PI / 2;
                const distance = radarRadius * ratio;
                const x = radarCenter + distance * Math.cos(angle);
                const y = radarCenter + distance * Math.sin(angle);
                return (
                  <circle
                    key={cat.id}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#a855f7"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="hover:r-6 cursor-pointer transition-all"
                  />
                );
              })}
            </svg>
          </div>

          <div className="w-full flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Your Skill Coverage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-slate-600" />
              100% Target Baseline
            </span>
          </div>
        </div>

        {/* Right 2 Columns: Strong vs Weak vs Missing Summary Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Strong Skills */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Strong Skills
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {skillBreakdown.strongSkills.length} Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Skills where you meet or exceed high-tier recruiter standards.
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {skillBreakdown.strongSkills.map(s => (
                  <span
                    key={s.id}
                    className="px-2 py-1 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-emerald-400">★{s.rating}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold mt-3">
              Maintain speed via weekly mock quizzes
            </div>
          </div>

          {/* Weak Skills */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Weak Skills
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {skillBreakdown.weakSkills.length} Needs Work
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Areas evaluated below 3 stars that cause OA screening rejections.
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {skillBreakdown.weakSkills.map(s => (
                  <span
                    key={s.id}
                    className="px-2 py-1 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-amber-400">★{s.rating}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold mt-3">
              Included in Stage 2 & 4 Roadmaps
            </div>
          </div>

          {/* Missing / High-Priority Skills */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500" /> Critical Gaps
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {skillBreakdown.missingSkills.length} Urgent
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Mandatory criteria for SDE-1 packages above 18 LPA.
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {skillBreakdown.missingSkills.map(s => (
                  <div key={s.id} className="p-1.5 rounded bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 flex items-center justify-between">
                    <span className="truncate">{s.name}</span>
                    <span className="text-[10px] bg-rose-900/60 text-rose-300 px-1.5 py-0.5 rounded shrink-0">
                      Req: ★{s.expectedLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="mt-3 w-full py-2 rounded-lg bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/40 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Bridge Gaps in Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Assessment & Self-Rating System */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Interactive Skill Evaluation & Rating
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click the stars to adjust your honest proficiency. Your Readiness Score and Roadmap update instantly.
            </p>
          </div>

          {/* Quick Quiz Shortcut */}
          <button
            onClick={() => setActiveTab('mock-interview')}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Take Diagnostic MCQ Test</span>
          </button>
        </div>

        {/* Category Horizontal Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {skillCategories.map(cat => {
            const isSelected = cat.id === selectedCategory.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details & Skill Sliders/Stars */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-white">{selectedCategory.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>
            <div className="text-xs text-slate-400 shrink-0">
              Weight in placement index: <strong className="text-indigo-300">{(selectedCategory.weight * 100).toFixed(0)}%</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategory.skills.map(skill => {
              const isWeak = skill.rating <= 2;
              const isStrong = skill.rating >= 4;

              return (
                <div
                  key={skill.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isWeak
                      ? 'bg-slate-950/80 border-amber-500/30'
                      : isStrong
                      ? 'bg-slate-950/80 border-emerald-500/20'
                      : 'bg-slate-950/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-white">{skill.name}</h5>
                        {skill.isCritical && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {skill.notes || 'Tap stars below to update your proficiency.'}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-400">Target</div>
                      <div className="text-xs font-bold text-indigo-400">★{skill.expectedLevel}/5</div>
                    </div>
                  </div>

                  {/* Interactive Star Rating */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-3">
                    <span className="text-xs text-slate-400 font-medium">Your Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(starIndex => (
                        <button
                          key={starIndex}
                          onClick={() => updateSkillRating(selectedCategory.id, skill.id, starIndex)}
                          className="p-1 hover:scale-125 transition-transform"
                          title={`Rate ${starIndex} out of 5`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              starIndex <= skill.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600 hover:text-slate-400'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-white ml-1.5">
                        {skill.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
