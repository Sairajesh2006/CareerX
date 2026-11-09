import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleQuizQuestions } from '../data/mockData';
import { QuizQuestion } from '../types';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  Code2,
  Play,
  History,
  TrendingUp,
  Flame
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export const MockInterviewCenter: React.FC = () => {
  const { quizAttempts, recordQuizAttempt, awardXP } = useApp();

  const categories = [
    'All Categories',
    'Java & OOP',
    'DSA & Algorithms',
    'SQL & DBMS',
    'Core CS (OS & Networks)',
    'Aptitude & Reasoning',
    'HR & Behavioral',
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Filter questions based on selected category
  const filteredQuestions = sampleQuizQuestions.filter(q => {
    if (selectedCategory === 'All Categories') return true;
    return q.category === selectedCategory;
  });

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[activeQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      awardXP(30, 'Correct answer in placement assessment test');
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex + 1 < filteredQuestions.length) {
      setActiveQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz finished!
      setQuizFinished(true);
      const finalScore = (selectedOption === currentQuestion?.correctIndex ? quizScore : quizScore);
      const total = filteredQuestions.length;
      const percentage = Math.round((finalScore / total) * 100);

      recordQuizAttempt({
        category: selectedCategory,
        totalQuestions: total,
        score: finalScore,
        percentage,
      });

      if (percentage >= 80) {
        triggerConfetti();
      }
    }
  };

  const restartQuiz = () => {
    setActiveQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-indigo-950/60 border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Screening Assessment Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mock Interview & Diagnostic Center
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Real questions asked in online assessments (OA) and technical rounds for Amazon, Google, Microsoft, TCS Digital, and Infosys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800 text-right">
              <div className="text-xs text-slate-400">Total Tests Taken</div>
              <div className="text-base font-bold text-white">{quizAttempts.length} Assessments</div>
              <div className="text-[11px] text-emerald-400">Earn +30 XP per question</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              restartQuiz();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Quiz Box */}
      {!quizFinished && currentQuestion ? (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          {/* Question Header & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
                {currentQuestion.category}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                currentQuestion.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : currentQuestion.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>Question <strong className="text-white">{activeQuestionIndex + 1}</strong> of {filteredQuestions.length}</span>
              <span className="text-indigo-400 font-semibold">• Score: {quizScore}</span>
            </div>
          </div>

          {/* Question Title & Code Snippet if present */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>

            {currentQuestion.codeSnippet && (
              <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre">
                {currentQuestion.codeSnippet}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/10';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-blue-950/40 border-blue-500 text-white font-semibold shadow-md shadow-blue-500/10';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm">{option}</span>
                  </div>

                  {isAnswerSubmitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Explanation Box when submitted */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                <HelpCircle className="w-4 h-4" /> Explanation & Interview Tip
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500">
              Select an option and click Verify to see instant explanation.
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all"
              >
                Verify Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
              >
                <span>{activeQuestionIndex + 1 < filteredQuestions.length ? 'Next Question' : 'Complete Quiz'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Assessment Complete!</h2>
            <p className="text-xs text-slate-400 mt-1">
              Your technical assessment score for {selectedCategory} has been recorded.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-around">
            <div>
              <div className="text-xs text-slate-400">Total Score</div>
              <div className="text-3xl font-extrabold text-white mt-1">
                {quizScore} / {filteredQuestions.length}
              </div>
            </div>
            <div className="w-px h-12 bg-slate-800" />
            <div>
              <div className="text-xs text-slate-400">Percentage</div>
              <div className={`text-3xl font-extrabold mt-1 ${
                (quizScore / filteredQuestions.length) >= 0.8 ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {Math.round((quizScore / (filteredQuestions.length || 1)) * 100)}%
              </div>
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 mx-auto transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake This Assessment</span>
          </button>
        </div>
      )}

      {/* Performance History Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-400" />
          Past Diagnostic Test History
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Scores contribute directly to your Placement Readiness Score.
        </p>

        <div className="space-y-2.5">
          {quizAttempts.map(attempt => (
            <div
              key={attempt.id}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-white">{attempt.category}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Attempted on {attempt.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">
                  {attempt.score}/{attempt.totalQuestions} ({attempt.percentage}%)
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  attempt.percentage >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {attempt.percentage >= 80 ? 'Passed' : 'Needs Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
