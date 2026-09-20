import {
  Search,
  UserRoundCheck,
  Users,
  Briefcase,
  Eye,
  Mail,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

interface MentorRecord {
  id: number;
  name: string;
  username: string;
  email: string;
  department: string;
  students: number;
  projects: number;
  status: "Active" | "Inactive";
}

function Mentors() {
  const [search, setSearch] = useState("");

  const mentors: MentorRecord[] = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      username: "mentor1",
      email: "priya@example.com",
      department: "Computer Science",
      students: 12,
      projects: 4,
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Manoj Kumar",
      username: "manoj01",
      email: "manoj@example.com",
      department: "Information Technology",
      students: 8,
      projects: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Dr. Anitha",
      username: "anitha01",
      email: "anitha@example.com",
      department: "Computer Science",
      students: 10,
      projects: 3,
      status: "Active",
    },
    {
      id: 4,
      name: "Dr. Rajesh",
      username: "rajesh01",
      email: "rajesh@example.com",
      department: "Cloud Computing",
      students: 6,
      projects: 2,
      status: "Active",
    },
    {
      id: 5,
      name: "Dr. Meena",
      username: "meena01",
      email: "meena@example.com",
      department: "Data Science",
      students: 9,
      projects: 3,
      status: "Inactive",
    },
  ];

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const searchText = search.toLowerCase();

      return (
        mentor.name.toLowerCase().includes(searchText) ||
        mentor.username.toLowerCase().includes(searchText) ||
        mentor.department.toLowerCase().includes(searchText)
      );
    });
  }, [search]);

  const activeMentors = mentors.filter(
    (mentor) => mentor.status === "Active"
  ).length;

  const totalStudents = mentors.reduce(
    (total, mentor) => total + mentor.students,
    0
  );

  const totalProjects = mentors.reduce(
    (total, mentor) => total + mentor.projects,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mentors</h1>
          <p className="mt-2 text-slate-400">
            Manage mentors and monitor their assigned students.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total Mentors</p>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <UserRoundCheck className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{mentors.length}</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Active Mentors</p>
              <div className="rounded-lg bg-green-500/10 p-2">
                <UserRoundCheck className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{activeMentors}</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Assigned Students</p>
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{totalStudents}</h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Active Projects</p>
              <div className="rounded-lg bg-yellow-500/10 p-2">
                <Briefcase className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{totalProjects}</h2>
          </div>
        </div>

        {/* Mentor Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          {/* Search */}
          <div className="border-b border-slate-800 p-5">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Search mentors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead>
                <tr className="border-b border-slate-800 text-sm text-slate-400">
                  <th className="px-5 py-4">Mentor</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">Students</th>
                  <th className="px-5 py-4">Projects</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                    <tr
                      key={mentor.id}
                      className="border-b border-slate-800 transition hover:bg-slate-800/40"
                    >
                      {/* Mentor */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
                            {mentor.name.charAt(4) || "M"}
                          </div>

                          <div>
                            <p className="font-medium text-white">
                              {mentor.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {mentor.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {mentor.department}
                        </span>
                      </td>

                      {/* Students */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {mentor.students}
                        </span>
                      </td>

                      {/* Projects */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {mentor.projects}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            mentor.status === "Active"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-slate-500/10 text-slate-400"
                          }`}
                        >
                          {mentor.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            title="View Mentor"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            title="Send Email"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          >
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <p className="text-slate-400">No mentors found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-800 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {filteredMentors.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-300">
                {mentors.length}
              </span>{" "}
              mentors
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mentors;
