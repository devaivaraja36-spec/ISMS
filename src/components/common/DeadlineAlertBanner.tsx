import React from "react";
import { AlertTriangle, Calendar, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DeadlineAlertProps {
  projectName?: string;
  daysLeft?: number;
  dueDate?: string;
  onDismiss?: () => void;
}

export const DeadlineAlertBanner: React.FC<DeadlineAlertProps> = ({
  projectName = "Internship Activity Monitoring System",
  daysLeft = 2,
  dueDate = "Sep 22, 2026",
  onDismiss,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/15 p-4 shadow-lg backdrop-blur-md transition-all">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/30">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
                ⚠️ Deadline Warning
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Due in {daysLeft} days ({dueDate})
              </span>
            </div>

            <p className="mt-1 text-sm font-medium text-slate-200">
              Project <span className="font-semibold text-amber-300">"{projectName}"</span> is close to deadline! Please submit pending deliverables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => navigate("/student/project")}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-amber-400 hover:shadow-md hover:shadow-amber-500/20"
          >
            View Submission <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeadlineAlertBanner;
