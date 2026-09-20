import React from "react";
import { FileText, Beaker, BookOpen, Clock, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface DeadlineItem {
  id: string;
  title: string;
  dueDate: string;
  daysLeft: number;
  priority: "High" | "Medium" | "Low";
  category: "Assignment" | "Report" | "Quiz" | "Code";
  icon: "file" | "lab" | "book" | "code";
}

interface UpcomingDeadlinesProps {
  onViewAll?: () => void;
}

const ITEMS: DeadlineItem[] = [
  {
    id: "ud1",
    title: "Data Structures & Systems Report",
    dueDate: "Sep 22, 2026",
    daysLeft: 2,
    priority: "High",
    category: "Report",
    icon: "file",
  },
  {
    id: "ud2",
    title: "AI & ML Lab Prototype Test",
    dueDate: "Sep 24, 2026",
    daysLeft: 4,
    priority: "Medium",
    category: "Assignment",
    icon: "lab",
  },
  {
    id: "ud3",
    title: "Fullstack Architecture Memo",
    dueDate: "Sep 27, 2026",
    daysLeft: 7,
    priority: "Medium",
    category: "Quiz",
    icon: "book",
  },
];

export const UpcomingDeadlinesWidget: React.FC<UpcomingDeadlinesProps> = ({
  onViewAll,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onViewAll) onViewAll();
    else navigate("/student/calendar");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md text-white">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
            <Clock className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-white">Upcoming Deadlines</h3>
        </div>

        <button
          onClick={handleNavigate}
          className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          View All <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {ITEMS.map((item) => {
          const isUrgent = item.daysLeft <= 2;

          return (
            <div
              key={item.id}
              className={`group flex items-center justify-between rounded-xl border p-3.5 transition ${
                isUrgent
                  ? "border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/15"
                  : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    item.icon === "file"
                      ? "bg-purple-500/20 text-purple-400"
                      : item.icon === "lab"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {item.icon === "file" && <FileText className="h-5 w-5" />}
                  {item.icon === "lab" && <Beaker className="h-5 w-5" />}
                  {item.icon === "book" && <BookOpen className="h-5 w-5" />}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    {isUrgent && (
                      <span className="font-semibold text-purple-400 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 animate-pulse text-purple-400" /> Due in {item.daysLeft} days
                      </span>
                    )}
                    {!isUrgent && <span>Due in {item.daysLeft} days</span>}
                    <span>• {item.dueDate}</span>
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  item.priority === "High"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}
              >
                {item.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDeadlinesWidget;
