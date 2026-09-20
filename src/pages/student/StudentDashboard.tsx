import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import DeadlineAlertBanner from "../../components/common/DeadlineAlertBanner";
import MentorDetailsModal from "../../components/modals/MentorDetailsModal";
import CalendarWidget from "../../components/widgets/CalendarWidget";
import UpcomingDeadlinesWidget from "../../components/widgets/UpcomingDeadlinesWidget";
import FocusTimerWidget from "../../components/widgets/FocusTimerWidget";
import QuickNotesWidget from "../../components/widgets/QuickNotesWidget";
import HabitTrackerWidget from "../../components/widgets/HabitTrackerWidget";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Sparkles, CheckCircle2, Clock, FolderKanban, ArrowRight } from "lucide-react";

function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [showDeadlineBanner, setShowDeadlineBanner] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content (100% full screen responsive space) */}
      <main className="ml-24 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Top Floating VisionOS Pill Header Matching Reference Image */}
        <div className="vision-glass-pill rounded-full px-6 py-3.5 flex items-center justify-between gap-4 mb-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white shadow-md text-sm ring-2 ring-blue-400/30">
              AK
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                Welcome, {user?.name || "Arun"} 👋
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Student Portal • Active Session</p>
            </div>
          </div>

          {/* Center Status / Search Pill */}
          <div className="hidden md:flex items-center gap-3 rounded-full bg-slate-950/50 px-5 py-2 border border-white/10 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400">Active Intern</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Focus • Plan • Execute</span>
          </div>

          {/* Right Date & Time */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-base font-extrabold tracking-tight text-white">
                07:45 <span className="text-[10px] text-purple-400 font-bold">AM</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium">Tue, May 28, 2024</p>
            </div>
          </div>
        </div>

        {/* 2-Day Deadline Warning Alert Banner */}
        {showDeadlineBanner && (
          <DeadlineAlertBanner
            projectName="Internship Activity Monitoring System"
            daysLeft={2}
            dueDate="May 30, 2024"
            onDismiss={() => setShowDeadlineBanner(false)}
          />
        )}

        {/* Top Statistics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Overall Progress */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Overall Progress</p>
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Sparkles size={18} />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-black text-blue-400">65%</h2>
            <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-sm"
                style={{ width: "65%" }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">65% internship completed</p>
          </div>

          {/* Tasks */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Tasks Completed</p>
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-black text-emerald-400">13 / 20</h2>
            <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm"
                style={{ width: "65%" }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">7 tasks remaining</p>
          </div>

          {/* Attendance */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Attendance Rate</p>
              <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <Clock size={18} />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-black text-purple-400">92%</h2>
            <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-sm"
                style={{ width: "92%" }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">23 / 25 working days</p>
          </div>

          {/* Activity */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Activities Submitted</p>
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <FolderKanban size={18} />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-black text-amber-400">18</h2>
            <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm"
                style={{ width: "80%" }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Daily logs up to date</p>
          </div>
        </div>

        {/* Mockup Widgets Grid: Calendar, Schedule, Weather/Focus Timer */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-1">
            <CalendarWidget userRole="student" />
          </div>

          <div className="lg:col-span-1">
            <FocusTimerWidget />
          </div>

          <div className="lg:col-span-1">
            <UpcomingDeadlinesWidget onViewAll={() => navigate("/student/calendar")} />
          </div>
        </div>

        {/* Middle Section: Project & Mentor Card */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Project Details Card */}
          <div className="lg:col-span-2 vision-glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Current Project Assignment
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-white tracking-tight">
                    Internship Activity Monitoring System
                  </h2>
                </div>

                <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-4 py-1 text-xs font-semibold text-blue-300 shadow-sm">
                  In Progress
                </span>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-400">
                Build a web-based system for monitoring internship activities, tasks, progress tracking, and calendar deadline notifications between students, mentors, and administrators.
              </p>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Milestone Deliverable Completion</span>
                  <span className="text-blue-400">65%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 shadow-sm"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate("/student/project")}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 hover:scale-[1.02]"
              >
                Go to Project Hub <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mentor Details Card */}
          <div className="vision-glass-panel rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                Assigned Official Mentor
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-xl font-bold text-white shadow-lg ring-4 ring-purple-500/20">
                  PS
                </div>

                <div>
                  <h3 className="font-bold text-white text-base">Dr. Priya Sharma</h3>
                  <p className="text-xs text-purple-300 font-medium">Senior Project Guide</p>
                  <p className="text-[11px] text-slate-400">Dept. of Computer Science</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMentorModalOpen(true)}
              className="mt-6 w-full rounded-full border border-purple-500/30 bg-purple-500/10 py-2.5 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20 hover:text-white hover:border-purple-500/50 shadow-sm"
            >
              View Mentor Details
            </button>
          </div>
        </div>

        {/* Bottom Widgets Grid: Habit Tracker & Quick Notes */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <HabitTrackerWidget />
          <QuickNotesWidget />
        </div>

        {/* Recent Tasks List */}
        <div className="vision-glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Assigned Tasks</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Your latest assigned internship tasks & deadlines
              </p>
            </div>

            <button
              onClick={() => navigate("/student/tasks")}
              className="rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-xs font-semibold text-blue-400 transition hover:bg-slate-700 hover:text-blue-300 shadow-sm"
            >
              View All Tasks
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div>
                <p className="font-semibold text-white text-sm">Design Login Interface & Theme System</p>
                <p className="mt-1 text-xs text-slate-400">Assigned 2 days ago • High Priority</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold shadow-sm">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div>
                <p className="font-semibold text-white text-sm">Create Dashboard UI & Deadline Widgets</p>
                <p className="mt-1 text-xs text-slate-400">Assigned yesterday • Due in 2 days</p>
              </div>
              <span className="rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3.5 py-1 text-xs font-bold shadow-sm">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
              <div>
                <p className="font-semibold text-white text-sm">Prepare Daily Activity & Work Memo Report</p>
                <p className="mt-1 text-xs text-slate-400">Assigned today • Pending mentor review</p>
              </div>
              <span className="rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3.5 py-1 text-xs font-bold shadow-sm">
                Pending
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Mentor Details Modal */}
      <MentorDetailsModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
      />
    </div>
  );
}

export default StudentDashboard;
