import { useState, FormEvent } from "react";
import { ClipboardList, Plus, Search, Edit, Trash2 } from "lucide-react";

import MentorSidebar from "../../components/layout/MentorSidebar";

interface MentorTask {
  id: number;
  title: string;
  student: string;
  project: string;
  dueDate: string;
  status: "Completed" | "In Progress" | "Pending";
}

function TaskManagement() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    student: "",
    project: "",
    dueDate: "",
    description: "",
  });

  const [tasks, setTasks] = useState<MentorTask[]>([
    {
      id: 1,
      title: "Design Login Interface",
      student: "Arun Kumar",
      project: "Internship Activity Monitoring System",
      dueDate: "25 Sep 2026",
      status: "Completed",
    },
    {
      id: 2,
      title: "Create Dashboard UI",
      student: "Arun Kumar",
      project: "Internship Activity Monitoring System",
      dueDate: "27 Sep 2026",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Prepare Daily Activity Report",
      student: "Rahul Sharma",
      project: "E-Commerce Management System",
      dueDate: "26 Sep 2026",
      status: "Pending",
    },
    {
      id: 4,
      title: "Database Schema Design",
      student: "Priya Nair",
      project: "Hospital Management System",
      dueDate: "29 Sep 2026",
      status: "Pending",
    },
  ]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.student.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault();

    const task: MentorTask = {
      id: Date.now(),
      title: newTask.title,
      student: newTask.student,
      project: newTask.project,
      dueDate: newTask.dueDate,
      status: "Pending",
    };

    setTasks([...tasks, task]);

    setNewTask({
      title: "",
      student: "",
      project: "",
      dueDate: "",
      description: "",
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MentorSidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Task Management</h1>
            <p className="mt-2 text-slate-400">
              Create and manage tasks assigned to your students.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Assign New Task
          </button>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-400">
              {tasks.filter((task) => task.status === "Completed").length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">In Progress</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {tasks.filter((task) => task.status === "In Progress").length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-400">
              {tasks.filter((task) => task.status === "Pending").length}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search tasks or students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Task Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <ClipboardList size={20} className="text-blue-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Assigned Tasks
                </h2>
                <p className="text-sm text-slate-500">
                  Tasks assigned to your students
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-800 bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Task
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Student
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Project
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{task.title}</p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-300">
                      {task.student}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {task.project}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-400">
                      {task.dueDate}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-500/10 text-green-400"
                            : task.status === "In Progress"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-blue-400"
                          title="Edit Task"
                        >
                          <Edit size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                          title="Delete Task"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTasks.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No tasks found.
            </div>
          )}
        </div>

        {/* Assign Task Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Assign New Task
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Assign a new task to a student.
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-2xl text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateTask} className="mt-6 space-y-5">
                {/* Task Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter task title"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Student */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Assign Student
                  </label>
                  <select
                    required
                    value={newTask.student}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        student: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="">Select Student</option>
                    <option value="Arun Kumar">Arun Kumar</option>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Priya Nair">Priya Nair</option>
                    <option value="Vikram Singh">Vikram Singh</option>
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Project
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.project}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        project: e.target.value,
                      })
                    }
                    placeholder="Enter project name"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        dueDate: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter task description"
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Assign Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TaskManagement;
