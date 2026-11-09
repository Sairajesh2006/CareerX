import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Sparkles, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-slate-100 transition-all duration-300 animate-in slide-in-from-bottom-2"
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'xp' ? (
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
            ) : toast.type === 'success' ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Info className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
