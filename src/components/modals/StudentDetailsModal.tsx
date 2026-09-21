import React, { useState } from "react";
import { X, Mail, BookOpen, CheckCircle2, TrendingUp, Clock, User, Award, ArrowUpRight, AlertTriangle } from "lucide-react";
import SendDeadlineEmailModal from "./SendDeadlineEmailModal";

export interface StudentModalInfo {
  id: number;
  name: string;
  email: string;
  project: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  status: "On Track" | "Needs Attention" | "Completed";
  department?: string;
  college?: string;
}

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentModalInfo | null;
  senderRole?: "Admin" | "Mentor";
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({
  isOpen,
  onClose,
  student,
  senderRole = "Mentor",
}) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  if (!isOpen || !student) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fadeIn text-white">
        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          {/* Top Banner */}
          <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="px-6 relative pb-6">
            <div className="flex justify-between items-end -mt-10 mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-2xl font-bold text-white shadow-xl ring-4 ring-slate-900">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  student.status === "On Track"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : student.status === "Completed"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}
              >
                ● {student.status}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">{student.name}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{student.email}</p>
              <p className="text-xs text-purple-400 font-medium mt-1">
                {student.department || "Computer Science & Engineering"}
              </p>
            </div>

            {/* Project & Progress Card */}
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Assigned Project</p>
              <h4 className="mt-1 text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" /> {student.project}
              </h4>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-400">Project Progress</span>
                  <span className="text-blue-400">{student.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Tasks Completed
                </div>
                <p className="mt-2 text-lg font-extrabold text-white">
                  {student.tasksCompleted} / {student.totalTasks}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <TrendingUp className="h-4 w-4 text-purple-400" /> Attendance Rate
                </div>
                <p className="mt-2 text-lg font-extrabold text-white">94%</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400 shadow-lg shadow-amber-500/20"
              >
                <AlertTriangle className="h-4 w-4" /> Send Default Deadline Warning Email
              </button>

              <div className="flex gap-2">
                <a
                  href={`mailto:${student.email}`}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  <Mail className="h-4 w-4" /> Custom Email
                </a>
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Default Deadline Warning Mail Modal */}
      <SendDeadlineEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        studentName={student.name}
        studentEmail={student.email}
        projectName={student.project}
        dueDate="May 30, 2024"
        senderRole={senderRole}
      />
    </>
  );
};

export default StudentDetailsModal;
