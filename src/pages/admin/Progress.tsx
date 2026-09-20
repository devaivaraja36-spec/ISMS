import {
  TrendingUp,
  Users,
  CheckCircle,
  Briefcase,
  Clock,
  LucideIcon,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import AdminSidebar from "../../components/layout/AdminSidebar";

interface StudentProgressData {
  name: string;
  progress: number;
}

interface ProjectProgressData {
  name: string;
  progress: number;
  students: number;
}

interface StatCard {
  title: string;
  value: string;
  icon: LucideIcon;
}

function Progress() {
  const studentProgress: StudentProgressData[] = [
    {
      name: "Arun",
      progress: 75,
    },
    {
      name: "Rahul",
      progress: 48,
    },
    {
      name: "Sneha",
      progress: 91,
    },
    {
      name: "Vikram",
      progress: 63,
    },
    {
      name: "Priya",
      progress: 35,
    },
    {
      name: "Aditya",
      progress: 82,
    },
  ];

  const projectProgress: ProjectProgressData[] = [
    {
      name: "InternTrack",
      progress: 75,
      students: 12,
    },
    {
      name: "AI Analytics",
      progress: 48,
      students: 8,
    },
    {
      name: "Web Development",
      progress: 91,
      students: 10,
    },
    {
      name: "Cloud Computing",
      progress: 63,
      students: 6,
    },
    {
      name: "Data Science",
      progress: 35,
      students: 9,
    },
    {
      name: "Mobile Application",
      progress: 82,
      students: 7,
    },
  ];

  const stats: StatCard[] = [
    {
      title: "Average Progress",
      value: "66%",
      icon: TrendingUp,
    },
    {
      title: "Active Students",
      value: "120",
      icon: Users,
    },
    {
      title: "Completed Tasks",
      value: "156",
      icon: CheckCircle,
    },
    {
      title: "Active Projects",
      value: "18",
      icon: Briefcase,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Progress & Analytics</h1>
          <p className="mt-2 text-slate-400">
            Monitor student and project progress across the internship program.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{stat.title}</p>
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                </div>

                <h2 className="mt-4 text-3xl font-bold">{stat.value}</h2>
              </div>
            );
          })}
        </div>

        {/* Student Progress Chart */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Student Progress</h2>
            <p className="mt-1 text-sm text-slate-400">
              Current progress percentage for each student.
            </p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentProgress}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                <XAxis dataKey="name" stroke="#94a3b8" />

                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}%`, "Progress"]}
                />

                <Bar dataKey="progress" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Project Progress</h2>

            <p className="mt-1 text-sm text-slate-400">
              Current progress across internship projects.
            </p>
          </div>

          <div className="space-y-6">
            {projectProgress.map((project) => (
              <div key={project.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{project.name}</p>
                    <p className="text-xs text-slate-500">
                      {project.students} students
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-slate-300">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-700">
                  <div
                    className="h-3 rounded-full bg-blue-500 transition-all"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Students On Track</p>
                <h3 className="mt-1 text-2xl font-bold">82</h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-500/10 p-3">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Needs Attention</p>
                <h3 className="mt-1 text-2xl font-bold">24</h3>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-3">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Completion Rate</p>
                <h3 className="mt-1 text-2xl font-bold">68%</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Progress;
