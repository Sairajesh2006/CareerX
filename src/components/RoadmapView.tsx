import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Plus,
  Filter,
  Flame,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { 
    roadmapStages, 
    toggleTask, 
    addTask, 
    profile, 
    readinessScore, 
    skillBreakdown 
  } = useApp();

  const [expandedStageId, setExpandedStageId] = useState<number>(2); // Stage 2 DSA active by default
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const [targetStageForNewTask, setTargetStageForNewTask] = useState<number>(2);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskHours, setNewTaskHours] = useState(10);
  const [newTaskDiff, setNewTaskDiff] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [newTaskResource, setNewTaskResource] = useState('');
  const [newTaskUrl, setNewTaskUrl] = useState('');

  // Overall milestone statistics
  let totalTasks = 0;
  let completedTasks = 0;
  let totalEstimatedHours = 0;

  roadmapStages.forEach(stage => {
    stage.tasks.forEach(task => {
      totalTasks++;
      totalEstimatedHours += task.estimatedHours;
      if (task.completed) completedTasks++;
    });
  });

  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask(targetStageForNewTask, {
      title: newTaskTitle,
      description: newTaskDesc || 'Custom placement goal added by student.',
      estimatedHours: Number(newTaskHours) || 8,
      difficulty: newTaskDiff,
      resourceTitle: newTaskResource || 'Recommended Documentation',
      resourceUrl: newTaskUrl || 'https://takeuforward.org/',
      category: 'Custom Prep',
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskResource('');
    setNewTaskUrl('');
    setShowAddTaskModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900/90 to-indigo-950/60 border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailored for {profile.targetPackage}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized 7-Stage Learning Roadmap
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Dynamically calibrated to your weakest competencies (DP, B-Tree Indexing, System Design). Complete weekly milestones to elevate your placement readiness to 90%+.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs text-slate-400">Total Completion</div>
              <div className="text-base font-bold text-white">{completedTasks} / {totalTasks} Tasks</div>
              <div className="text-[11px] text-emerald-400">{completionPercent}% of Roadmap</div>
            </div>
            <button
              onClick={() => setShowAddTaskModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Goal</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
            <span>Overall Roadmap Progress: {completionPercent}%</span>
            <span>~{totalEstimatedHours} Total Prep Hours</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className="bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filter Tasks by Difficulty:</span>
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterDifficulty === diff
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Easy: 4-8 hrs
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Medium: 8-15 hrs
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Hard: 15-25 hrs
          </span>
        </div>
      </div>

      {/* 7-Stage Accordion List */}
      <div className="space-y-4">
        {roadmapStages.map(stage => {
          const isExpanded = expandedStageId === stage.id;
          const stageTotal = stage.tasks.length;
          const stageDone = stage.tasks.filter(t => t.completed).length;
          const stagePct = stageTotal > 0 ? Math.round((stageDone / stageTotal) * 100) : 0;
          const isAllDone = stageDone === stageTotal && stageTotal > 0;

          const filteredTasks = stage.tasks.filter(t => {
            if (filterDifficulty === 'All') return true;
            return t.difficulty === filterDifficulty;
          });

          return (
            <div
              key={stage.id}
              className={`rounded-2xl border transition-all ${
                isAllDone
                  ? 'bg-slate-900/60 border-emerald-500/30'
                  : isExpanded
                  ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {/* Stage Header Accordion trigger */}
              <div
                onClick={() => setExpandedStageId(isExpanded ? 0 : stage.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/50 transition-colors rounded-2xl"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 mt-0.5 ${
                    isAllDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {stage.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{stage.title}</h3>
                      {isAllDone && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Mastered
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{stage.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-200">
                      {stageDone}/{stageTotal} Tasks Done ({stagePct}%)
                    </div>
                    <div className="w-28 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${isAllDone ? 'bg-emerald-400' : 'bg-indigo-500'}`}
                        style={{ width: `${stagePct}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Tasks body when expanded */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3">
                  {filteredTasks.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 italic">
                      No tasks in this stage matching the "{filterDifficulty}" difficulty filter.
                    </div>
                  ) : (
                    filteredTasks.map(task => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          task.completed
                            ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                            : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTask(stage.id, task.id)}
                            className="mt-0.5 text-slate-400 hover:text-white transition-colors p-0.5"
                            title={task.completed ? 'Mark uncompleted' : 'Mark completed (+75 XP)'}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400" />
                            )}
                          </button>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                                {task.title}
                              </h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                task.difficulty === 'Easy'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : task.difficulty === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}>
                                {task.difficulty}
                              </span>
                              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {task.estimatedHours} hrs
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {task.description}
                            </p>
                            {task.completedAt && (
                              <span className="text-[10px] text-emerald-400 font-medium mt-1 inline-block">
                                Completed on {task.completedAt}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Learning Resource Link */}
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          {task.resourceUrl && (
                            <a
                              href={task.resourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white text-xs font-medium border border-slate-700/80 flex items-center gap-1.5 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                              <span className="truncate max-w-[120px]">{task.resourceTitle}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add task in this stage button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setTargetStageForNewTask(stage.id);
                        setShowAddTaskModal(true);
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-slate-800 hover:border-indigo-500/40 text-xs text-slate-400 hover:text-indigo-300 font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Goal to Stage {stage.id}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Add Custom Task */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-white mb-1">Add Personalized Learning Goal</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a specialized topic, contest target, or campus round preparation milestone.
            </p>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Target Roadmap Stage</label>
                <select
                  value={targetStageForNewTask}
                  onChange={e => setTargetStageForNewTask(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  {roadmapStages.map(s => (
                    <option key={s.id} value={s.id}>
                      Stage {s.id}: {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Trie Data Structure & Prefix Matching"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Task Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief notes or problem links..."
                  value={newTaskDesc}
                  onChange={e => setNewTaskDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newTaskHours}
                    onChange={e => setNewTaskHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={newTaskDiff}
                    onChange={e => setNewTaskDiff(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Learning Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. GeeksforGeeks Trie Implementation"
                  value={newTaskResource}
                  onChange={e => setNewTaskResource(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
