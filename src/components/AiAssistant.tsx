import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Zap,
  RotateCcw,
  BookOpen,
  Code2,
  Briefcase,
  HelpCircle,
  Copy,
  Check,
  Trash2,
  PlusCircle,
  AlertCircle,
  RefreshCw,
  Terminal,
  GraduationCap
} from 'lucide-react';

// Lightweight, crisp Markdown parser for clean AI responses
const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  // Split by code blocks ```...```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-slate-100">
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = /^[a-zA-Z0-9#+-]+$/.test(firstLine);
          const lang = hasLang ? firstLine : '';
          const code = (hasLang ? lines.slice(1) : lines).join('\n');

          return (
            <div key={pIdx} className="my-3 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" />
                  {lang || 'code'}
                </span>
                <button
                  type="button"
                  onClick={() => copyCode(code, pIdx)}
                  className="flex items-center gap-1 hover:text-white transition-colors px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-750"
                >
                  {copiedCodeIdx === pIdx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-xs font-mono text-emerald-300 bg-slate-950/90 leading-normal">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Regular text formatting (headers, bold, bullets, inline code)
        const paragraphs = part.split('\n\n');

        return (
          <div key={pIdx} className="space-y-2">
            {paragraphs.map((para, paraIdx) => {
              if (!para.trim()) return null;

              // Check for headers
              if (para.startsWith('### ')) {
                return (
                  <h4 key={paraIdx} className="text-sm sm:text-base font-bold text-white pt-2 border-b border-slate-800/80 pb-1 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 rounded bg-purple-500 inline-block" />
                    {para.replace('### ', '')}
                  </h4>
                );
              }
              if (para.startsWith('## ')) {
                return (
                  <h3 key={paraIdx} className="text-base sm:text-lg font-extrabold text-white pt-2">
                    {para.replace('## ', '')}
                  </h3>
                );
              }

              // Check for unordered list
              if (para.includes('\n* ') || para.includes('\n- ') || para.startsWith('* ') || para.startsWith('- ')) {
                const listItems = para.split(/\n(?=[*-] )/).map(item => item.replace(/^[*-] /, ''));
                return (
                  <ul key={paraIdx} className="space-y-1.5 pl-4 list-disc list-outside marker:text-purple-400 text-slate-200">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="leading-relaxed">
                        {renderInlineFormatting(li)}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Check for numbered list
              if (/^\d+\.\s/.test(para)) {
                const listItems = para.split(/\n(?=\d+\.\s)/).map(item => item.replace(/^\d+\.\s/, ''));
                return (
                  <ol key={paraIdx} className="space-y-1.5 pl-4 list-decimal list-outside marker:text-indigo-400 text-slate-200">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="leading-relaxed">
                        {renderInlineFormatting(li)}
                      </li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={paraIdx} className="leading-relaxed text-slate-200">
                  {renderInlineFormatting(para)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Helper for inline bold, italics, and code
function renderInlineFormatting(text: string) {
  // Split inline code `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((sub, sIdx) => {
    if (sub.startsWith('`') && sub.endsWith('`') && sub.length > 2) {
      return (
        <code key={sIdx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-purple-300 text-[11px] mx-0.5 font-semibold">
          {sub.slice(1, -1)}
        </code>
      );
    }

    // Bold **...**
    const boldParts = sub.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={sIdx}>
        {boldParts.map((bSub, bIdx) => {
          if (bSub.startsWith('**') && bSub.endsWith('**') && bSub.length > 4) {
            return (
              <strong key={bIdx} className="font-bold text-white">
                {bSub.slice(2, -2)}
              </strong>
            );
          }
          return bSub;
        })}
      </span>
    );
  });
}

export const AiAssistant: React.FC = () => {
  const { profile, readinessScore, skillBreakdown, roadmapStages, awardXP } = useApp();

  const initialWelcomeText = `Hey ${profile.name}! Welcome to Smart Placement Tracker. How can I help you with your placement preparation today?`;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('spt_chat_history_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback to default
      }
    }
    return [
      {
        id: 'm-welcome',
        sender: 'assistant',
        text: initialWelcomeText,
        timestamp: 'Just now',
      },
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync chat history to localStorage
  useEffect(() => {
    localStorage.setItem('spt_chat_history_v2', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewChat = () => {
    const freshWelcome: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'assistant',
      text: `Starting a fresh chat session, ${profile.name}! What would you like to focus on now?`,
      timestamp: 'Just now',
    };
    setMessages([freshWelcome]);
    setErrorMessage(null);
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('spt_chat_history_v2');
    setErrorMessage(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setErrorMessage(null);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare comprehensive student context for Gemini server endpoint
      const studentContext = {
        name: profile.name,
        college: profile.college,
        degree: profile.degree,
        branch: profile.branch,
        currentYear: profile.currentYear,
        cgpa: profile.cgpa,
        targetPackage: profile.targetPackage,
        targetCompanies: profile.targetCompanies,
        preferredRoles: profile.preferredRoles,
        careerInterests: profile.careerInterests,
        leetcodeCount: profile.leetcodeCount,
        streakDays: profile.streakDays,
        readinessScore,
        weakSkills: skillBreakdown.weakSkills,
        strongSkills: skillBreakdown.strongSkills,
      };

      // Call secure server-side endpoint
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          history: updatedMessages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
          studentProfile: studentContext,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}`);
      }

      if (!data.text) {
        throw new Error('Received empty response from Gemini model');
      }

      const botMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
      awardXP(25, 'Consulted Gemini Career Mentor for live placement guidance');
    } catch (err: any) {
      console.error('Failed to get real Gemini response:', err);
      const errMsg = err?.message || 'Failed to communicate with AI server';
      setErrorMessage(errMsg);

      const errorBotMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ **AI Mentor Error:** ${errMsg}\n\nPlease verify that your Gemini API key is configured under **Settings > Secrets** or try rephrasing your message.`,
        timestamp: 'Error',
      };
      setMessages(prev => [...prev, errorBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'Teach me DSA.',
    'Prepare me for Java interviews.',
    'Create my placement roadmap.',
    'Analyze my weak skills.',
    'Give me today’s coding challenge.',
    'Prepare me for a 12+ LPA job.',
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-indigo-950/60 border border-purple-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Official Google Gemini API Integration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Career Assistant & Technical Mentor
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Real conversational placement mentor powered by Gemini AI. Ask questions on DSA patterns, core CS fundamentals, STAR behavioral phrasing, or custom roadmaps.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left">
              <span className="text-white font-semibold block">Gemini 3.8 Flash Engine</span>
              <span className="text-[11px] text-slate-400">Server-Side Verified • Zero Browser Exposure</span>
            </div>
          </div>
        </div>

        {/* Personalized Student Context Strip */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Active Student: <strong className="text-white">{profile.name}</strong> ({profile.branch}, {profile.college})</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CGPA: <strong className="text-white">{profile.cgpa}</strong></span>
            <span>Target: <strong className="text-indigo-300">{profile.targetPackage}</strong></span>
            <span>Readiness: <strong className="text-emerald-400">{readinessScore}%</strong></span>
          </div>
        </div>
      </div>

      {/* Suggested Question Chips (These send REAL prompts to Gemini!) */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Instant One-Click Prompts (Sends Real Questions to Gemini)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-850 hover:border-purple-500/40 text-xs font-medium text-slate-200 border border-slate-800 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Session Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl flex flex-col h-[700px] overflow-hidden">
        {/* Chat Control Toolbar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">
              Interactive Placement Session ({messages.length} messages)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 transition-colors"
              title="Start a new chat session"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>New Chat</span>
            </button>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-medium text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
              title="Clear all messages"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <Bot className="w-12 h-12 text-slate-600 mb-3" />
              <h4 className="text-sm font-semibold text-slate-300">Your Placement Mentor is ready</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Ask any question or pick a suggested topic above to start learning.
              </p>
            </div>
          ) : (
            messages.map(msg => {
              const isUser = msg.sender === 'user';
              const isError = msg.id.startsWith('err-');

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-md ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : isError
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : isError ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className={`p-4 sm:p-5 rounded-2xl shadow-sm ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : isError
                        ? 'bg-rose-950/40 text-rose-200 border border-rose-500/30 rounded-tl-none'
                        : 'bg-slate-950 text-slate-100 border border-slate-800/90 rounded-tl-none'
                    }`}>
                      {isUser ? (
                        <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      ) : (
                        <FormattedMessage content={msg.text} />
                      )}
                    </div>

                    <div className={`flex items-center gap-3 text-[10px] text-slate-500 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.timestamp}</span>
                      {!isUser && !isError && (
                        <button
                          onClick={() => copyToClipboard(msg.id, msg.text)}
                          className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy response</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 rounded-tl-none text-xs text-slate-300 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
                </div>
                <span>Gemini is formulating personalized placement guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90">
          {errorMessage && (
            <div className="mb-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => handleSendMessage()}
                className="px-2.5 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold text-[11px] flex items-center gap-1 shrink-0"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                rows={2}
                placeholder="Ask about Java, DSA patterns, mock questions, or tell me: 'I want a 20 LPA package'..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="absolute right-3 bottom-2.5 text-[10px] text-slate-500 hidden sm:block">
                Press Enter to send, Shift+Enter for newline
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-500/25 flex items-center gap-2 transition-all shrink-0 h-[50px]"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
            <span>Powered by official Google GenAI SDK (Server-Side)</span>
            <span>+25 XP per session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
