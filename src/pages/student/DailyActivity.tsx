import { useState, FormEvent } from "react";
import { CalendarDays, Clock3, CheckCircle2 } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";

interface ActivityItem {
  id: number;
  date: string;
  task: string;
  hours: number;
  completion: number;
  description: string;
}

function DailyActivity() {
  const [date, setDate] = useState("2026-09-20");
  const [task, setTask] = useState("Create Student Dashboard UI");
  const [hours, setHours] = useState("6");
  const [completion, setCompletion] = useState("75");
  const [description, setDescription] = useState("");

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      date: "2026-09-19",
      task: "Design Login Interface",
      hours: 5,
      completion: 100,
      description: "Completed the login page UI and authentication layout.",
    },
    {
      id: 2,
      date: "2026-09-18",
      task: "Project Setup",
      hours: 4,
      completion: 100,
      description: "Configured React, Tailwind CSS and project structure.",
    },
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Please enter your work description.");
      return;
    }

    const newActivity: ActivityItem = {
      id: Date.now(),
      date,
      task,
      hours: Number(hours),
      completion: Number(completion),
      description,
    };

    setActivities([newActivity, ...activities]);
    setDescription("");
    setHours("6");
    setCompletion("75");

    alert("Daily activity submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Daily Activity</h1>
          <p className="mt-2 text-slate-400">
            Submit and track your daily internship work.
          </p>
        </div>

        {/* Activity Form */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Submit Today's Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Record the work you completed today.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Date + Task */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-400">Activity Date</label>
                <div className="relative mt-2">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-3 text-slate-500"
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Task</label>
                <select
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option>Create Student Dashboard UI</option>
                  <option>Build My Tasks Page</option>
                  <option>Prepare Daily Activity Module</option>
                  <option>Project Documentation</option>
                </select>
              </div>
            </div>

            {/* Hours + Completion */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-400">Hours Worked</label>
                <div className="relative mt-2">
                  <Clock3
                    size={18}
                    className="absolute left-3 top-3 text-slate-500"
                  />
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">
                  Completion Percentage
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={completion}
                    onChange={(e) => setCompletion(e.target.value)}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="w-12 text-right font-semibold text-blue-400">
                    {completion}%
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-slate-400">
                Work Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you worked on today..."
                className="mt-2 w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Activity
            </button>
          </form>
        </div>

        {/* Recent Activities */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={22} className="text-green-400" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                Recent Activities
              </h2>
              <p className="text-sm text-slate-500">
                Your previously submitted internship activities.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-lg border border-slate-800 bg-slate-800/50 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {activity.task}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {activity.date} • {activity.hours} hours
                    </p>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    {activity.completion}% Complete
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DailyActivity;
