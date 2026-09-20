import {
  FolderKanban,
  CalendarDays,
  User,
  Target,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";

interface Milestone {
  id: number;
  title: string;
  date: string;
  status: "Completed" | "In Progress" | "Pending";
}

function Project() {
  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Project Planning",
      date: "Sep 05, 2026",
      status: "Completed",
    },
    {
      id: 2,
      title: "UI/UX Design",
      date: "Sep 12, 2026",
      status: "Completed",
    },
    {
      id: 3,
      title: "Frontend Development",
      date: "Sep 25, 2026",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Backend Development",
      date: "Oct 05, 2026",
      status: "Pending",
    },
    {
      id: 5,
      title: "Testing & Deployment",
      date: "Oct 15, 2026",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">My Project</h1>
          <p className="mt-2 text-slate-400">
            View your internship project details and milestones.
          </p>
        </div>

        {/* Project Overview */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                <FolderKanban size={28} className="text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Current Project</p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  Internship Activity Monitoring System
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Web-based internship monitoring and activity management
                  platform.
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
              In Progress
            </span>
          </div>

          {/* Project Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white">
              Project Description
            </h3>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
              The Internship Activity Monitoring System is designed to help
              students, mentors and administrators manage internship activities.
              Students can track assigned tasks, submit daily work, monitor their
              progress and communicate their internship activities to mentors.
            </p>
          </div>
        </div>

        {/* Project Information */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-blue-400" />
              <span className="text-sm text-slate-500">Start Date</span>
            </div>
            <p className="mt-3 font-semibold text-white">Sep 01, 2026</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-purple-400" />
              <span className="text-sm text-slate-500">End Date</span>
            </div>
            <p className="mt-3 font-semibold text-white">Oct 31, 2026</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <User size={20} className="text-green-400" />
              <span className="text-sm text-slate-500">Mentor</span>
            </div>
            <p className="mt-3 font-semibold text-white">Dr. Priya Sharma</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <Target size={20} className="text-orange-400" />
              <span className="text-sm text-slate-500">Progress</span>
            </div>
            <p className="mt-3 font-semibold text-white">65%</p>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Project Milestones
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Track the major stages of your project.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {milestones.map((milestone, index) => {
              const completed = milestone.status === "Completed";
              const inProgress = milestone.status === "In Progress";

              return (
                <div key={milestone.id} className="flex gap-4">
                  {/* Timeline Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        completed
                          ? "bg-green-500/10"
                          : inProgress
                          ? "bg-blue-500/10"
                          : "bg-slate-800"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle2 size={20} className="text-green-400" />
                      ) : inProgress ? (
                        <Clock3 size={20} className="text-blue-400" />
                      ) : (
                        <span className="text-sm text-slate-500">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {index !== milestones.length - 1 && (
                      <div className="mt-2 h-10 w-px bg-slate-700" />
                    )}
                  </div>

                  {/* Milestone Details */}
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {milestone.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {milestone.date}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs ${
                          completed
                            ? "bg-green-500/10 text-green-400"
                            : inProgress
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-slate-800 text-slate-500"
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Project;
