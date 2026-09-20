import { Search, Users, Eye, TrendingUp } from "lucide-react";
import { useState } from "react";
import MentorSidebar from "../../components/layout/MentorSidebar";
import StudentDetailsModal, { StudentModalInfo } from "../../components/modals/StudentDetailsModal";

interface StudentInfo {
  id: number;
  name: string;
  email: string;
  project: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  status: "On Track" | "Needs Attention";
}

function MyStudents() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentModalInfo | null>(null);

  const students: StudentInfo[] = [
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@example.com",
      project: "Internship Activity Monitoring System",
      progress: 65,
      tasksCompleted: 13,
      totalTasks: 20,
      status: "On Track",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      project: "E-Commerce Management System",
      progress: 82,
      tasksCompleted: 16,
      totalTasks: 20,
      status: "On Track",
    },
    {
      id: 3,
      name: "Priya Nair",
      email: "priya@example.com",
      project: "Hospital Management System",
      progress: 48,
      tasksCompleted: 10,
      totalTasks: 21,
      status: "Needs Attention",
    },
    {
      id: 4,
      name: "Vikram Singh",
      email: "vikram@example.com",
      project: "Library Management System",
      progress: 71,
      tasksCompleted: 14,
      totalTasks: 20,
      status: "On Track",
    },
  ];

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.project}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <MentorSidebar />

      <main className="ml-64 flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Students</h1>
            <p className="mt-2 text-slate-400">
              View and monitor all students assigned to you.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
            <Users size={20} className="text-purple-400" />
            <div>
              <p className="text-xs text-slate-400">Total Students</p>
              <p className="font-semibold text-white">{students.length}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-3 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student or project..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder-slate-500 outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Students Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl backdrop-blur-md"
            >
              {/* Student Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-sm font-bold text-white shadow-md">
                    {student.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>

                  <div>
                    <h2 className="font-semibold text-white text-base">{student.name}</h2>
                    <p className="text-xs text-slate-400">{student.email}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    student.status === "On Track"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              {/* Project */}
              <div className="mt-6">
                <p className="text-[10px] uppercase font-bold tracking-wide text-slate-500">
                  Current Project
                </p>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  {student.project}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Overall Progress
                  </span>
                  <span className="text-xs font-bold text-purple-400">
                    {student.progress}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-purple-500"
                    style={{
                      width: `${student.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-purple-400" />
                    <span className="text-xs text-slate-400 font-medium">Progress</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-white">
                    {student.progress}%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/70 p-4 border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-emerald-400" />
                    <span className="text-xs text-slate-400 font-medium">Tasks</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-white">
                    {student.tasksCompleted} / {student.totalTasks}
                  </p>
                </div>
              </div>

              {/* Functional View Student Details Button */}
              <button
                onClick={() => setSelectedStudent(student)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-xs font-semibold text-purple-300 transition hover:bg-purple-600 hover:text-white shadow-md"
              >
                <Eye size={16} />
                View Student Details
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <Users size={40} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">No students found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different name or project.
            </p>
          </div>
        )}

        {/* Student Details Modal */}
        <StudentDetailsModal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          student={selectedStudent}
        />
      </main>
    </div>
  );
}

export default MyStudents;
