import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleCompanyGuides } from '../data/mockData';
import { CompanyGuide } from '../types';
import {
  Building2,
  Search,
  Briefcase,
  Layers,
  ChevronRight,
  Plus,
  BookOpen,
  Code2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const CompanyPrepHub: React.FC = () => {
  const { addJobApplication, setActiveTab, showToast } = useApp();

  const [companies, setCompanies] = useState<CompanyGuide[]>(sampleCompanyGuides);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(sampleCompanyGuides[0].id);
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.keySkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = tierFilter === 'All' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddToTracker = (company: CompanyGuide) => {
    addJobApplication({
      companyName: company.name,
      role: 'Graduate Software Engineer 2026',
      packageCTC: company.ctcRange.split(' ')[0] + ' LPA',
      location: 'Pan India / Remote',
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Interested',
      roundsCompleted: 0,
      totalRounds: company.rounds.length,
      notes: `Targeting campus drive. Focus areas: ${company.frequentTopics.slice(0, 3).join(', ')}.`,
    });
    showToast('Added to Tracker', `Added ${company.name} to your Placement Pipeline!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900/90 to-indigo-950/60 border border-rose-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Recruiter Intel & Campus Cutoffs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Company Preparation Hub
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Curated preparation guides for Tier-1 Product giants and Mass IT recruiters. Interview rounds breakdown, CGPA cutoffs, and frequently asked topics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleAddToTracker(selectedCompany)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Track {selectedCompany.name} in Pipeline</span>
            </button>
          </div>
        </div>

        {/* Disclaimer / Note */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>*Sample recruitment information based on previous campus batches. Cutoffs and rounds vary by college tier.</span>
          <span className="text-rose-400 font-semibold">Editable Reference Bank</span>
        </div>
      </div>

      {/* Search & Tier Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company or skill..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['All', 'Tier-1 Product', 'IT Services / Mass Recruiter'].map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                tierFilter === tier
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Companies Selector List */}
        <div className="space-y-3">
          {filteredCompanies.map(comp => {
            const isSelected = comp.id === selectedCompany.id;

            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-rose-500/50 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-rose-500 to-indigo-500" />
                    {comp.name}
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-400">{comp.ctcRange}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">{comp.tier}</span>
                  <span className="text-slate-400">{comp.rounds.length} Rounds</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-2.5">
                  {comp.keySkills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-300 border border-slate-850">
                      {skill}
                    </span>
                  ))}
                  {comp.keySkills.length > 3 && (
                    <span className="text-[10px] text-slate-400">+{comp.keySkills.length - 3}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Company Deep-Dive View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card for Selected Company */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  {selectedCompany.tier}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-0.5">
                  {selectedCompany.name} Recruitment Blueprint
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-400">CTC Range</div>
                  <div className="text-sm font-extrabold text-emerald-400">{selectedCompany.ctcRange}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-400">CGPA Cutoff</div>
                  <div className="text-sm font-extrabold text-indigo-300">{selectedCompany.cgpaCutoff}</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <strong className="text-white">Eligibility Criteria:</strong> {selectedCompany.eligibility}
            </p>
          </div>

          {/* Hiring Rounds Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Interview Rounds & Evaluation Criteria
            </h3>

            <div className="space-y-3">
              {selectedCompany.rounds.map(round => (
                <div
                  key={round.roundNumber}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-[11px]">
                        {round.roundNumber}
                      </span>
                      {round.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {round.focus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-7">
                    {round.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequent Topics & Sample Practice Questions */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Most Frequent Interview Topics for {selectedCompany.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {selectedCompany.frequentTopics.map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5"
                >
                  <span>🔥 {topic}</span>
                </span>
              ))}
            </div>

            {/* Sample Questions with tips */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sample Practice Questions:
              </h4>

              {selectedCompany.sampleQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white">{q.title}</h5>
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {q.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{q.question}</p>
                  <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-start gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Interviewer Tip:</strong> {q.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
