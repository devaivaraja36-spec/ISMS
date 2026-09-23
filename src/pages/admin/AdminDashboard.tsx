import React from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import CalendarWidget from "../../components/widgets/CalendarWidget";
import { Users, Briefcase, TrendingUp, AlertTriangle, Calendar, UploadCloud, ArrowRight, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const stats: StatItem[] = [
    {
      title: "Total Students",
      value: "120",
      icon: Users,
    },
    {
      title: "Active Projects",
      value: "18",
      icon: Briefcase,
    },
    {
      title: "Average Progress",
      value: "68%",
      icon: TrendingUp,
    },
    {
      title: "Pending Reviews",
      value: "14",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-24 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Top Floating VisionOS Pill Header Matching Reference Image */}
        <div className="vision-glass-pill rounded-full px-6 py-3.5 flex items-center justify-between gap-4 mb-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white shadow-md text-sm ring-2 ring-blue-400/30">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                Welcome, System Admin 👋
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">Admin Panel • System Overview</p>
            </div>
          </div>

          {/* Center Search / Quick Badges */}
          <div className="hidden md:flex items-center gap-3 rounded-full bg-slate-950/50 px-5 py-2 border border-white/10 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            <span className="text-blue-300">120 Students</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">18 Active Projects</span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/calendar")}
              className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20 hover:text-white shadow-sm"
            >
              <Calendar className="h-3.5 w-3.5" /> Deadlines
            </button>
            <button
              onClick={() => navigate("/admin/files")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02]"
            >
              <UploadCloud className="h-3.5 w-3.5" /> Uploads
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const accentColors = [
              { border: "hover:border-blue-500/40", text: "text-blue-400", bg: "bg-blue-500/10", borderIcon: "border-blue-500/20" },
              { border: "hover:border-purple-500/40", text: "text-purple-400", bg: "bg-purple-500/10", borderIcon: "border-purple-500/20" },
              { border: "hover:border-emerald-500/40", text: "text-emerald-400", bg: "bg-emerald-500/10", borderIcon: "border-emerald-500/20" },
              { border: "hover:border-amber-500/40", text: "text-amber-400", bg: "bg-amber-500/10", borderIcon: "border-amber-500/20" },
            ][idx % 4];

            return (
              <div
                key={stat.title}
                className={`group vision-glass-panel rounded-3xl p-6 transition-all duration-300 ${accentColors.border} hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-400">{stat.title}</p>
                  <div className={`rounded-xl ${accentColors.bg} p-2.5 ${accentColors.text} border ${accentColors.borderIcon} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h2 className="mt-4 text-3xl font-black text-white">{stat.value}</h2>
              </div>
            );
          })}
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Student Overview Table */}
          <div className="lg:col-span-2 vision-glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Student Overview</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Current internship progress and assigned mentors
                </p>
              </div>

              {/* Working View All Button */}
              <button
                onClick={() => navigate("/admin/students")}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white shadow-sm"
              >
                View All Students <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Project</th>
                    <th className="pb-3">Mentor</th>
                    <th className="pb-3">Progress</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30">
                          AK
                        </div>
                        <div>
                          <p className="font-semibold text-white">Arun Kumar</p>
                          <p className="text-[10px] text-slate-400">student1</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-300 font-medium">InternTrack System</td>
                    <td className="text-purple-400 font-medium">Dr. Priya Sharma</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                          <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-sm" style={{ width: "75%" }} />
                        </div>
                        <span className="font-bold text-white">75%</span>
                      </div>
                    </td>
                    <td>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold shadow-sm">
                        On Track
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 font-bold border border-amber-500/30">
                          RK
                        </div>
                        <div>
                          <p className="font-semibold text-white">Rahul Kumar</p>
                          <p className="text-[10px] text-slate-400">rahul01</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-300 font-medium">AI Analytics</td>
                    <td className="text-purple-400 font-medium">Dr. Manoj</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                          <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm" style={{ width: "48%" }} />
                        </div>
                        <span className="font-bold text-white">48%</span>
                      </div>
                    </td>
                    <td>
                      <span className="rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold shadow-sm">
                        Needs Attention
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30">
                          SP
                        </div>
                        <div>
                          <p className="font-semibold text-white">Sneha Patel</p>
                          <p className="text-[10px] text-slate-400">sneha01</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-300 font-medium">Web Development</td>
                    <td className="text-purple-400 font-medium">Dr. Anitha</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-slate-900/80 overflow-hidden border border-white/5">
                          <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm" style={{ width: "91%" }} />
                        </div>
                        <span className="font-bold text-white">91%</span>
                      </div>
                    </td>
                    <td>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold shadow-sm">
                        On Track
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Calendar Deadline Widget */}
          <div className="lg:col-span-1">
            <CalendarWidget userRole="admin" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
