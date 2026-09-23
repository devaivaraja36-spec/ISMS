import React from "react";
import CalendarWidget from "../../components/widgets/CalendarWidget";
import UpcomingDeadlinesWidget from "../../components/widgets/UpcomingDeadlinesWidget";
import Sidebar from "../../components/layout/Sidebar";
import MentorSidebar from "../../components/layout/MentorSidebar";
import AdminSidebar from "../../components/layout/AdminSidebar";
import { useAuth } from "../../context/AuthContext";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";

export const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.role || "STUDENT";
  const normalizedRole = userRole.toLowerCase();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Role-based Sidebar */}
      {normalizedRole === "admin" && <AdminSidebar />}
      {normalizedRole === "mentor" && <MentorSidebar />}
      {normalizedRole === "student" && <Sidebar />}

      {/* Main Content */}
      <main className="ml-20 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400 border border-purple-500/20">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Project Deadlines & Calendar</h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage, mark, and track project deadlines for intern students.
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CalendarWidget userRole={userRole as any} />
          </div>

          <div className="space-y-6">
            <UpcomingDeadlinesWidget />

            {/* Quick Tips */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Deadline Guidelines
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• High priority deadlines trigger a 2-day warning alert banner.</li>
                <li>• Mentors & officials can mark deadlines for assigned students.</li>
                <li>• Deadlines automatically sync with student task portals.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
