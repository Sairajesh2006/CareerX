import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResumeAnalysisResult } from '../types';
import {
  FileCheck2,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  TrendingUp,
  Download,
  RotateCcw,
  Layers,
  Code,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export const ResumeAnalyzer: React.FC = () => {
  const { resumeAnalysis, updateResumeAnalysis, awardXP } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>(
    resumeAnalysis.lastAnalyzedFile || 'Arjun_Sharma_SDE_Resume_2026.pdf'
  );

  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: true,
  });

  const toggleChecklistItem = (idx: number) => {
    setCompletedChecklist(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleSimulateUpload = (fileName: string) => {
    setIsAnalyzing(true);
    setSelectedFileName(fileName);

    setTimeout(() => {
      setIsAnalyzing(false);
      triggerConfetti();

      const newAnalysis: ResumeAnalysisResult = {
        overallScore: 84,
        atsCompatibility: 91,
        impactScore: 78,
        formattingScore: 88,
        detectedSkills: [
          'Java', 'Spring Boot', 'Data Structures & Algorithms', 'React', 'Node.js',
          'PostgreSQL', 'Docker', 'Git', 'REST APIs', 'Tailwind CSS', 'Redis', 'Unit Testing'
        ],
        missingCriticalSkills: [
          'CI/CD GitHub Actions', 'AWS Cloud Architecture (EC2, S3)', 'Microservices Architecture'
        ],
        actionVerbCount: 18,
        strengths: [
          'Strong quantification in backend projects: "Reduced response latency by 35%".',
          'High ATS compatibility with standard clear section headers.',
          'GitHub profile with active commit history and live demo links included.',
        ],
        weaknesses: [
          'Could add open-source contributions or competitive coding rankings (LeetCode/Codeforces rating).',
          'Soft skills and leadership roles in student tech club are placed too low in the page.',
        ],
        keyRecommendations: [
          'Add a "Certifications & Achievements" section highlighting hackathon rank.',
          'Quantify database query optimization metrics with execution times.',
          'Target keyword match improved from 78% to 84%!',
        ],
        lastAnalyzedFile: fileName,
      };

      updateResumeAnalysis(newAnalysis);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-orange-950/60 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
              <span>ATS Parser & Keyword Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume Analyzer & ATS Optimizer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              75% of resumes are rejected by automated Applicant Tracking Systems before a human recruiter even sees them. We scan your resume against Tier-1 SDE keyword baselines.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-right">
              <div className="text-xs text-slate-400">Current ATS Score</div>
              <div className="text-xl font-bold text-white">{resumeAnalysis.overallScore} / 100</div>
              <div className="text-[11px] text-emerald-400">ATS Pass Likelihood: High</div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-amber-500/50 flex items-center justify-center font-extrabold text-white text-lg bg-amber-950/50">
              {resumeAnalysis.overallScore}
            </div>
          </div>
        </div>

        {/* Demo Indicator Note */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            Active File: <strong className="text-white">{selectedFileName}</strong>
          </span>
          <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
            Interactive Demo Evaluation Engine
          </span>
        </div>
      </div>

      {/* Upload Zone & Quick Sample Resumes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Drop Zone */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleSimulateUpload(file.name);
            }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10'
                : 'border-slate-700/80 hover:border-amber-500/40 bg-slate-950/60'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Upload Your PDF / Word Resume
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-5 leading-relaxed">
              Drag and drop your resume file here or choose from your computer. Supports PDF, DOCX format up to 5MB.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <label className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer transition-all">
                <span>Browse Files</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleSimulateUpload(file.name);
                  }}
                />
              </label>

              <button
                onClick={() => handleSimulateUpload('Arjun_Sharma_SDE_Updated_v2.pdf')}
                disabled={isAnalyzing}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                {isAnalyzing ? 'Scanning ATS Filters...' : 'Analyze Sample CS Resume'}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Scanned with Standard ATS Engine Filters (Workday, Greenhouse, Taleo)
            </span>
            <span>PDF Text Layer Compatible</span>
          </div>
        </div>

        {/* ATS Score Pillars */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            ATS Breakdown Scores
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>ATS Parsing Compatibility</span>
                <span className="font-bold text-emerald-400">{resumeAnalysis.atsCompatibility}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${resumeAnalysis.atsCompatibility}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Formatting & Single-Column Layout</span>
                <span className="font-bold text-indigo-400">{resumeAnalysis.formattingScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${resumeAnalysis.formattingScore}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>STAR Impact & Action Verbs</span>
                <span className="font-bold text-amber-400">{resumeAnalysis.impactScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${resumeAnalysis.impactScore}%` }} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span>Action Verbs Identified:</span>
                <strong className="text-white">{resumeAnalysis.actionVerbCount} verbs</strong>
              </div>
              <div className="flex justify-between">
                <span>Recommended Count:</span>
                <strong className="text-emerald-400">16+ verbs</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSimulateUpload('Arjun_Sharma_Optimized_Resume.pdf')}
            className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-run Full ATS Scan</span>
          </button>
        </div>
      </div>

      {/* Keywords & Improvement Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keywords Matched vs Missing */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-indigo-400" />
            Technical Keyword Match Analysis
          </h3>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" /> Matched High-Yield SDE Keywords ({resumeAnalysis.detectedSkills.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resumeAnalysis.detectedSkills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" /> Missing Keywords Recruiters Screen For ({resumeAnalysis.missingCriticalSkills.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resumeAnalysis.missingCriticalSkills.map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20"
                >
                  + Add: {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Recruiter Diagnostic Feedback
          </h3>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Key Strengths:
            </span>
            {resumeAnalysis.strengths.map((str, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{str}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Priority Fixes Needed:
            </span>
            {resumeAnalysis.weaknesses.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Resume Improvement Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Interactive Resume Polish Checklist (Pre-Application)
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Complete these checks before submitting applications to companies like Amazon, Google, or TCS.
        </p>

        <div className="space-y-3">
          {[
            { title: 'Single page PDF without graphics or tables that confuse ATS readers', impact: 'High Impact' },
            { title: 'Every project bullet contains at least one quantified numerical metric (%, ms, users)', impact: 'Crucial for SDE-1' },
            { title: 'Standard section names used: "Education", "Technical Skills", "Experience", "Projects"', impact: 'ATS Standard' },
            { title: 'Clean hyperlinks for GitHub repositories and live hosted web demos', impact: 'Portfolio' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleChecklistItem(idx)}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                completedChecklist[idx]
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  completedChecklist[idx] ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                }`}>
                  {completedChecklist[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={`text-xs ${completedChecklist[idx] ? 'text-white font-medium' : 'text-slate-400'}`}>
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-900 text-slate-400 border border-slate-850 shrink-0">
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
