import { TrendingUp, CheckCircle2, Clock3, Target } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";

interface WeeklyItem {
  day: string;
  value: number;
}

function Progress() {
  const weeklyProgress: WeeklyItem[] = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 55 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 78 },
    { day: "Sun", value: 82 },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">My Progress</h1>
          <p className="mt-2 text-slate-400">
            Track your internship progress and performance.
          </p>
        </div>

        {/* Main Progress */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  Overall Internship Progress
                </p>
                <h2 className="mt-2 text-5xl font-bold text-blue-400">65%</h2>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <TrendingUp size={30} className="text-blue-400" />
              </div>
            </div>

            <div className="mt-8 h-4 rounded-full bg-slate-700">
              <div
                className="h-4 rounded-full bg-blue-500 transition-all"
                style={{ width: "65%" }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-slate-500">Internship completion</span>
              <span className="text-slate-300">65 / 100</span>
            </div>
          </div>

          {/* Target */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <Target size={22} className="text-purple-400" />
              <p className="text-sm text-slate-400">Monthly Target</p>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">82%</h2>
            <p className="mt-2 text-sm text-green-400">+17% this month</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={22} className="text-green-400" />
              <span className="text-sm text-slate-400">Completed Tasks</span>
            </div>

            <h2 className="mt-3 text-3xl font-bold text-white">13</h2>
            <p className="mt-1 text-sm text-slate-500">out of 20 tasks</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <Clock3 size={22} className="text-blue-400" />
              <span className="text-sm text-slate-400">Hours Worked</span>
            </div>

            <h2 className="mt-3 text-3xl font-bold text-white">138</h2>
            <p className="mt-1 text-sm text-slate-500">internship hours</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={22} className="text-orange-400" />
              <span className="text-sm text-slate-400">Activities</span>
            </div>

            <h2 className="mt-3 text-3xl font-bold text-white">18</h2>
            <p className="mt-1 text-sm text-slate-500">submitted activities</p>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Weekly Progress</h2>
          <p className="mt-1 text-sm text-slate-500">
            Your progress over the last 7 days.
          </p>

          <div className="mt-8 flex h-64 items-end justify-between gap-3">
            {weeklyProgress.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >
                <span className="text-xs text-slate-400">{item.value}%</span>

                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-blue-500 transition-all"
                    style={{
                      height: `${item.value}%`,
                    }}
                  />
                </div>

                <span className="text-xs text-slate-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Breakdown */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Progress Breakdown
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Tasks</span>
                <span className="text-white">65%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: "65%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Daily Activities</span>
                <span className="text-white">80%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "80%" }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Project Milestones</span>
                <span className="text-white">55%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: "55%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Progress;
