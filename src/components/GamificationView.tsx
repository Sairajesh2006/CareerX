import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleLeaderboard } from '../data/mockData';
import {
  Trophy,
  Flame,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  Calendar,
  Users,
  Target,
  ArrowRight,
  TrendingUp,
  Zap
} from 'lucide-react';
import { triggerAchievementCelebration } from '../utils/confetti';

export const GamificationView: React.FC = () => {
  const { profile, badges, awardXP, showToast } = useApp();

  const [weeklyChallenges, setWeeklyChallenges] = useState([
    {
      id: 'wc-1',
      title: 'Solve 10 Graph & Tree Problems',
      current: 7,
      total: 10,
      rewardXP: 150,
      completed: false,
    },
    {
      id: 'wc-2',
      title: 'Complete 3 Mock Assessment Tests',
      current: 3,
      total: 3,
      rewardXP: 200,
      completed: true,
    },
    {
      id: 'wc-3',
      title: 'Maintain 7-Day Consistency Streak',
      current: 7,
      total: 7,
      rewardXP: 250,
      completed: true,
    },
  ]);

  const levelThreshold = profile.level * 700;
  const currentLevelProgress = profile.xpPoints % 700;
  const levelProgressPct = Math.min(100, Math.round((currentLevelProgress / 700) * 100));

  const handleClaimChallenge = (id: string, xp: number) => {
    awardXP(xp, 'Claimed weekly placement challenge reward');
    triggerAchievementCelebration();
    setWeeklyChallenges(prev => prev.map(c => c.id === id ? { ...c, completed: true } : c));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-orange-950/60 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Gamified Placement Motivation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Streak, XP & Campus Leaderboard
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Transform repetitive technical prep into consistent daily momentum. Earn XP by solving problems, verifying resume bullets, and clearing mock interviews.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-right">
              <div className="text-xs text-slate-400">Total Placement XP</div>
              <div className="text-2xl font-extrabold text-amber-400">{profile.xpPoints} XP</div>
              <div className="text-[11px] text-indigo-300 font-semibold">Level {profile.level} SDE Aspirant</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Level Progression Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Level {profile.level} Progression ({currentLevelProgress} / 700 XP)</span>
            <span className="text-amber-400 font-semibold">{700 - currentLevelProgress} XP to Level {profile.level + 1}</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${levelProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily Streak Highlight & Weekly Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Streak Spotlight */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" /> Daily Learning Streak
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Active Streak
              </span>
            </div>

            <div className="text-center py-4">
              <div className="text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                <span>{profile.streakDays}</span>
                <span className="text-2xl text-orange-400">Days</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                You studied consecutively for the past 2 weeks without skipping a day!
              </p>
            </div>

            {/* Streak day indicators */}
            <div className="flex items-center justify-between gap-1 pt-3 border-t border-slate-800">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-[10px] text-slate-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              awardXP(50, 'Checked in for daily preparation streak');
              showToast('Streak Extended! 🔥', 'Keep up the remarkable consistency.', 'xp');
            }}
            className="mt-4 w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs shadow-md shadow-orange-500/20 transition-all"
          >
            Check-In Today (+50 XP)
          </button>
        </div>

        {/* Weekly Quests & Challenges */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                Active Weekly Challenges
              </h3>
              <p className="text-xs text-slate-400">
                Resets every Monday. Bonus XP applied directly to campus tier rankings.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> 4 days left
            </span>
          </div>

          <div className="space-y-3">
            {weeklyChallenges.map(quest => {
              const isFinished = quest.current >= quest.total;
              const pct = Math.min(100, Math.round((quest.current / quest.total) * 100));

              return (
                <div
                  key={quest.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{quest.title}</h4>
                      <span className="text-xs font-semibold text-amber-400">+{quest.rewardXP} XP</span>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Progress: {quest.current} / {quest.total} completed ({pct}%)
                    </div>
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    {quest.completed ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : isFinished ? (
                      <button
                        onClick={() => handleClaimChallenge(quest.id, quest.rewardXP)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm transition-all"
                      >
                        Claim Reward
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 italic">In progress</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" />
          Achievement Badges Showcase ({badges.filter(b => b.unlocked).length} / {badges.length} Unlocked)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all ${
                badge.unlocked
                  ? 'bg-slate-950/80 border-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  badge.unlocked
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-slate-800 text-slate-600 border border-slate-700'
                }`}>
                  {badge.unlocked ? <Sparkles className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  badge.unlocked
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  +{badge.xpReward} XP
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {badge.description}
                </p>
                {badge.unlockedDate && (
                  <span className="text-[10px] text-indigo-400 font-medium block mt-1.5">
                    Unlocked on {badge.unlockedDate}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Peer Leaderboard (Demo Cohort Data) */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Campus Aspirants Leaderboard (Demo Cohort)
            </h3>
            <p className="text-xs text-slate-400">
              Benchmark your preparation intensity against top students across premier institutions.
            </p>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 self-start sm:self-auto">
            Weekly Updated Rankings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Rank</th>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">College</th>
                <th className="p-3.5">Problems Solved</th>
                <th className="p-3.5">Readiness Score</th>
                <th className="p-3.5 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sampleLeaderboard.map(student => {
                const isCurrent = student.name.includes('(You)');

                return (
                  <tr
                    key={student.rank}
                    className={`hover:bg-slate-850/50 transition-colors ${
                      isCurrent ? 'bg-indigo-950/30 font-semibold' : ''
                    }`}
                  >
                    <td className="p-3.5 font-bold">
                      {student.rank === 1 ? '🥇 1' : student.rank === 2 ? '🥈 2' : student.rank === 3 ? '🥉 3' : `#${student.rank}`}
                    </td>
                    <td className="p-3.5 flex items-center gap-2.5">
                      <img src={student.avatar} alt={student.name} className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                      <span className={isCurrent ? 'text-indigo-300 font-bold' : 'text-white'}>
                        {student.name}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{student.college}</td>
                    <td className="p-3.5 font-mono text-slate-300">{student.solved}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {student.readiness}%
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-extrabold text-amber-400">
                      {student.xp} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
