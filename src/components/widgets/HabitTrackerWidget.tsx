import React, { useState } from "react";
import { Activity, Check, Code, BookOpen, HeartPulse, Brain } from "lucide-react";

export const HabitTrackerWidget: React.FC = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const [habits, setHabits] = useState([
    {
      id: "h1",
      name: "Study & Research",
      icon: BookOpen,
      color: "text-purple-400 bg-purple-500/20",
      completedDays: [true, true, true, true, true, false, false],
    },
    {
      id: "h2",
      name: "Project Coding",
      icon: Code,
      color: "text-blue-400 bg-blue-500/20",
      completedDays: [true, true, true, false, true, false, false],
    },
    {
      id: "h3",
      name: "Work Memo Log",
      icon: Activity,
      color: "text-emerald-400 bg-emerald-500/20",
      completedDays: [false, true, true, true, true, false, false],
    },
    {
      id: "h4",
      name: "Review & Learn",
      icon: Brain,
      color: "text-amber-400 bg-amber-500/20",
      completedDays: [true, false, true, true, false, false, false],
    },
  ]);

  const toggleHabit = (habitIndex: number, dayIndex: number) => {
    const updated = [...habits];
    updated[habitIndex].completedDays[dayIndex] = !updated[habitIndex].completedDays[dayIndex];
    setHabits(updated);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md text-white">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <HeartPulse className="h-4 w-4" />
          </div>
          <h3 className="text-base font-bold text-white">Habit & Progress Tracker</h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">This Week</span>
      </div>

      <div className="space-y-3">
        {/* Header Days */}
        <div className="grid grid-cols-12 gap-1 text-center text-xs font-bold text-slate-500 pb-1">
          <div className="col-span-5 text-left pl-2">Task / Activity</div>
          {days.map((d, i) => (
            <div key={i} className="col-span-1">
              {d}
            </div>
          ))}
        </div>

        {/* Habit Rows */}
        {habits.map((h, habitIdx) => {
          const Icon = h.icon;

          return (
            <div
              key={h.id}
              className="grid grid-cols-12 gap-1 items-center rounded-xl border border-slate-800 bg-slate-950/60 p-2 text-xs transition hover:border-slate-700"
            >
              <div className="col-span-5 flex items-center gap-2 pl-1 truncate">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${h.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-slate-200 truncate">{h.name}</span>
              </div>

              {h.completedDays.map((isDone, dayIdx) => (
                <div key={dayIdx} className="col-span-1 flex justify-center">
                  <button
                    onClick={() => toggleHabit(habitIdx, dayIdx)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
                      isDone
                        ? "bg-purple-600 text-white shadow-sm shadow-purple-600/40"
                        : "border border-slate-800 bg-slate-900 text-transparent hover:border-slate-600"
                    }`}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HabitTrackerWidget;
