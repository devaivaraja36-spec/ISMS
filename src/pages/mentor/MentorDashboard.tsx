import React from "react";
import { Users, CheckCircle2, Clock3, TrendingUp, Calendar, UploadCloud, ArrowRight } from "lucide-react";
import MentorSidebar from "../../components/layout/MentorSidebar";
import CalendarWidget from "../../components/widgets/CalendarWidget";
import { useNavigate } from "react-router-dom";

function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <MentorSidebar />

      <main className="ml-24 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Top Floating VisionOS Pill Header Matching Reference Image */}
        <div className="vision-glass-pill rounded-full px-6 py-3.5 flex items-center justify-between gap-4 mb-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 font-bold text-white shadow-md text-sm ring-2 ring-purple-400/30">
              PS
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                Welcome, Dr. Priya Sharma 👋
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Mentor Portal • Overview & Reviews</p>
            </div>
          </div>

          {/* Center Actions / Quick Badges */}
          <div className="hidden md:flex items-center gap-3 rounded-full bg-slate-950/50 px-5 py-2 border border-white/10 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <span className="text-purple-300">4 Active Interns</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Guide • Mentor • Review</span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/mentor/calendar")}
              className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20 hover:text-white shadow-sm"
            >
              <Calendar className="h-3.5 w-3.5" /> Mark Deadlines
            </button>
            <button
              onClick={() => navigate("/mentor/files")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition hover:from-purple-500 hover:to-indigo-500 hover:scale-[1.02]"
            >
              <UploadCloud className="h-3.5 w-3.5" /> Uploads
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Students */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Total Assigned Students</p>
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-black text-white">4</h2>
            <p className="mt-1 text-xs text-slate-400">Active intern candidates</p>
          </div>

          {/* Completed Tasks */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Tasks Completed</p>
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-black text-white">53</h2>
            <p className="mt-1 text-xs text-slate-400">Across assigned interns</p>
          </div>

          {/* Pending Reviews */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Pending Reviews</p>
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Clock3 size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-black text-white">7</h2>
            <p className="mt-1 text-xs text-slate-400">Memos & code reviews</p>
          </div>

          {/* Average Progress */}
          <div className="group vision-glass-panel rounded-3xl p-6 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-400">Average Student Progress</p>
              <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                <TrendingUp size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-black text-white">66.5%</h2>
            <p className="mt-1 text-xs text-slate-400 font-medium">Internship completion rate</p>
          </div>
        </div>

        {/* Main Grid: Student Overview & Calendar Marker */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2 vision-glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Student Progress Overview</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Interns currently assigned under your supervision
                </p>
              </div>

              {/* Working View All Navigation */}
              <button
                onClick={() => navigate("/mentor/students")}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white shadow-sm"
              >
                View All Students <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">Arun Kumar</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Internship Activity Monitoring System
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-400">65%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-sm" style={{ width: "65%" }} />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">Rahul Sharma</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      E-Commerce Management System
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">82%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                  <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm" style={{ width: "82%" }} />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/40 p-4 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm">Priya Nair</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Hospital Management System
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400">48%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                  <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm" style={{ width: "48%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CalendarWidget userRole="mentor" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MentorDashboard;
