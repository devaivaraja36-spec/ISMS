import { useState } from "react";
import { CheckCircle2, Clock3, AlertCircle, CalendarDays } from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";

export interface StudentTaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Pending";
  progress: number;
}

function MyTasks() {
  const [tasks, setTasks] = useState<StudentTaskItem[]>([
    {
      id: 1,
      title: "Design Login Interface",
      description: "Create the initial login page UI for the internship system.",
      dueDate: "2026-09-22",
      priority: "High",
      status: "Completed",
      progress: 100,
    },
    {
      id: 2,
      title: "Create Student Dashboard UI",
      description: "Build the main student dashboard with cards and statistics.",
      dueDate: "2026-09-24",
      priority: "High",
      status: "In Progress",
      progress: 65,
    },
    {
      id: 3,
      title: "Build My Tasks Page",
      description: "Create the student task management interface.",
      dueDate: "2026-09-25",
      priority: "Medium",
      status: "In Progress",
      progress: 40,
    },
    {
      id: 4,
      title: "Prepare Daily Activity Module",
      description: "Create the interface for submitting daily internship activities.",
      dueDate: "2026-09-27",
      priority: "Medium",
      status: "Pending",
      progress: 0,
    },
    {
      id: 5,
      title: "Project Documentation",
      description: "Prepare technical documentation for the internship project.",
      dueDate: "2026-09-30",
      priority: "Low",
      status: "Pending",
      progress: 0,
    },
  ]);

  const updateTaskStatus = (
    id: number,
    status: "Completed" | "In Progress" | "Pending"
  ) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status,
          progress:
            status === "Completed"
              ? 100
              : status === "In Progress"
              ? Math.max(task.progress, 10)
              : 0,
        };
      })
    );
  };

  const getStatusStyle = (status: string) => {
    if (status === "Completed") {
      return "bg-green-500/10 text-green-400";
    }

    if (status === "In Progress") {
      return "bg-blue-500/10 text-blue-400";
    }

    return "bg-yellow-500/10 text-yellow-400";
  };

  const getPriorityStyle = (priority: string) => {
    if (priority === "High") {
      return "text-red-400";
    }

    if (priority === "Medium") {
      return "text-yellow-400";
    }

    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          <p className="mt-2 text-slate-400">
            View and manage your assigned internship tasks.
          </p>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-400" size={22} />
              <p className="text-sm text-slate-400">Completed</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white">
              {tasks.filter((task) => task.status === "Completed").length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <Clock3 className="text-blue-400" size={22} />
              <p className="text-sm text-slate-400">In Progress</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white">
              {tasks.filter((task) => task.status === "In Progress").length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-yellow-400" size={22} />
              <p className="text-sm text-slate-400">Pending</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-white">
              {tasks.filter((task) => task.status === "Pending").length}
            </h2>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Task Information */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">
                      {task.title}
                    </h2>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {task.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <CalendarDays size={16} />
                      <span>Due: {task.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Priority:</span>
                      <span className={getPriorityStyle(task.priority)}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="w-full lg:w-64">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-white">
                      {task.progress}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{
                        width: `${task.progress}%`,
                      }}
                    />
                  </div>

                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value as "Completed" | "In Progress" | "Pending"
                      )
                    }
                    className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyTasks;
