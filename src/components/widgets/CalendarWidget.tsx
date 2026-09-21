import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, User, Clock, AlertCircle, CheckCircle2, Tag, X } from "lucide-react";

export interface ProjectDeadline {
  id: string;
  title: string;
  studentName: string;
  mentorName: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  description?: string;
}

interface CalendarWidgetProps {
  userRole?: "student" | "mentor" | "admin";
  onSelectDeadline?: (deadline: ProjectDeadline) => void;
}

const DEFAULT_DEADLINES: ProjectDeadline[] = [
  {
    id: "d1",
    title: "Internship Activity System Beta",
    studentName: "Arun Kumar",
    mentorName: "Dr. Priya Sharma",
    date: "2026-09-22",
    dayNumber: 22,
    priority: "High",
    status: "In Progress",
    description: "Submit core dashboard & calendar widgets documentation.",
  },
  {
    id: "d2",
    title: "AI Analytics Model Review",
    studentName: "Rahul Kumar",
    mentorName: "Dr. Manoj",
    date: "2026-09-25",
    dayNumber: 25,
    priority: "Medium",
    status: "Pending",
    description: "Dataset training report and evaluation metrics.",
  },
  {
    id: "d3",
    title: "Web Development Final Code Audit",
    studentName: "Sneha Patel",
    mentorName: "Dr. Anitha",
    date: "2026-09-28",
    dayNumber: 28,
    priority: "High",
    status: "Completed",
    description: "Final UI layout check and responsiveness verification.",
  },
  {
    id: "d4",
    title: "Weekly Activity Work Memo",
    studentName: "Arun Kumar",
    mentorName: "Dr. Priya Sharma",
    date: "2026-09-20",
    dayNumber: 20,
    priority: "Low",
    status: "Completed",
    description: "Weekly log of completed frontend components.",
  },
];

const STUDENTS_LIST = [
  "Arun Kumar (Intern - CSE)",
  "Rahul Kumar (Intern - AI)",
  "Sneha Patel (Intern - Web Dev)",
  "Ananya Sharma (Intern - Mobile App)",
];

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  userRole = "student",
}) => {
  const [deadlines, setDeadlines] = useState<ProjectDeadline[]>(DEFAULT_DEADLINES);
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [selectedDeadline, setSelectedDeadline] = useState<ProjectDeadline | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State for Adding/Marking Deadline
  const [newTitle, setNewTitle] = useState("");
  const [newStudent, setNewStudent] = useState(STUDENTS_LIST[0]);
  const [newDate, setNewDate] = useState("2026-09-24");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("High");
  const [newDescription, setNewDescription] = useState("");

  const daysInMonth = 30; // Sep 2026 representation
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const dayNum = parseInt(newDate.split("-")[2]) || 15;

    const deadlineObj: ProjectDeadline = {
      id: `d-${Date.now()}`,
      title: newTitle,
      studentName: newStudent.split(" (")[0],
      mentorName: userRole === "mentor" ? "Dr. Priya Sharma" : "Mentor Official",
      date: newDate,
      dayNumber: dayNum,
      priority: newPriority,
      status: "Pending",
      description: newDescription || "Marked by official mentor.",
    };

    setDeadlines([...deadlines, deadlineObj]);
    setIsAdding(false);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md text-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Project Calendar</h3>
            <p className="text-xs text-slate-400">Mark & Track Student Deadlines</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {userRole !== "student" && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-purple-500 transition"
            >
              <Plus className="h-3.5 w-3.5" /> Mark Deadline
            </button>
          )}
        </div>
      </div>

      {/* Month Navigator */}
      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-sm font-semibold text-slate-200">September 2026</span>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="rounded-lg p-1 hover:bg-slate-800 hover:text-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1 hover:bg-slate-800 hover:text-white transition">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day Labels */}
      <div className="mt-3 grid grid-cols-7 text-center text-xs font-semibold text-slate-500">
        {dayLabels.map((d, i) => (
          <div key={i} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Month Days Grid */}
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs font-medium">
        {/* Empty padding days */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={`pad-${i}`} className="py-2 text-slate-700">
            {29 + i}
          </div>
        ))}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const dayDeadlines = deadlines.filter((d) => d.dayNumber === day);
          const hasHigh = dayDeadlines.some((d) => d.priority === "High");
          const hasDeadline = dayDeadlines.length > 0;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                if (dayDeadlines.length > 0) {
                  setSelectedDeadline(dayDeadlines[0]);
                } else {
                  setSelectedDeadline(null);
                }
              }}
              className={`relative flex flex-col items-center justify-center rounded-xl py-2 transition ${
                isSelected
                  ? "bg-purple-600 font-bold text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400"
                  : hasDeadline
                  ? "bg-slate-800 text-purple-300 font-semibold border border-purple-500/40 hover:bg-slate-700"
                  : "text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              <span>{day}</span>
              {hasDeadline && (
                <span
                  className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                    hasHigh ? "bg-purple-400 animate-ping" : "bg-blue-400"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Deadlines List */}
      <div className="mt-5 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Deadlines for Sep {selectedDay}
          </p>
          <span className="text-xs text-slate-500">
            {deadlines.filter((d) => d.dayNumber === selectedDay).length} Scheduled
          </span>
        </div>

        {deadlines.filter((d) => d.dayNumber === selectedDay).length > 0 ? (
          <div className="space-y-2">
            {deadlines
              .filter((d) => d.dayNumber === selectedDay)
              .map((dl) => (
                <div
                  key={dl.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 transition hover:border-purple-500/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{dl.title}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <User className="h-3 w-3 text-purple-400" /> {dl.studentName} • Mentor: {dl.mentorName}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        dl.priority === "High"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {dl.priority}
                    </span>
                  </div>
                  {dl.description && (
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2">{dl.description}</p>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="py-3 text-center text-xs text-slate-500">
            No project deadlines marked for September {selectedDay}.
          </p>
        )}
      </div>

      {/* Modal to Add/Mark Deadline */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Tag className="h-4 w-4 text-purple-400" /> Mark Project Deadline
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddDeadline} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Select Student</label>
                <select
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                >
                  {STUDENTS_LIST.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Project / Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. System Design Architecture Submission"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Description / Notes</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Specific requirements for this submission..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white outline-none"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-500 shadow-md shadow-purple-600/20"
                >
                  Save & Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
