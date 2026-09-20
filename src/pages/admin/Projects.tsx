import {
  Search,
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  Eye,
  X,
  CalendarDays,
  UserRound,
  ClipboardList,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

interface AdminProjectItem {
  id: number;
  name: string;
  description: string;
  mentor: string;
  students: number;
  progress: number;
  status: "Active" | "Completed" | "Needs Attention";
  startDate: string;
  endDate: string;
}

function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<AdminProjectItem | null>(
    null
  );

  const projects: AdminProjectItem[] = [
    {
      id: 1,
      name: "InternTrack",
      description: "Internship Activity Monitoring System",
      mentor: "Dr. Priya Sharma",
      students: 12,
      progress: 75,
      status: "Active",
      startDate: "01 Jan 2026",
      endDate: "30 Jun 2026",
    },
    {
      id: 2,
      name: "AI Analytics",
      description: "Analytics platform using machine learning",
      mentor: "Dr. Manoj Kumar",
      students: 8,
      progress: 48,
      status: "Active",
      startDate: "15 Feb 2026",
      endDate: "15 Aug 2026",
    },
    {
      id: 3,
      name: "Web Development",
      description: "Modern full-stack web application",
      mentor: "Dr. Anitha",
      students: 10,
      progress: 91,
      status: "Completed",
      startDate: "01 Jan 2026",
      endDate: "31 May 2026",
    },
    {
      id: 4,
      name: "Cloud Computing",
      description: "Cloud infrastructure and deployment project",
      mentor: "Dr. Rajesh",
      students: 6,
      progress: 63,
      status: "Active",
      startDate: "01 Mar 2026",
      endDate: "30 Sep 2026",
    },
    {
      id: 5,
      name: "Data Science",
      description: "Data analysis and visualization project",
      mentor: "Dr. Meena",
      students: 9,
      progress: 35,
      status: "Needs Attention",
      startDate: "10 Feb 2026",
      endDate: "10 Aug 2026",
    },
    {
      id: 6,
      name: "Mobile Application",
      description: "Cross-platform mobile application",
      mentor: "Dr. Karthik",
      students: 7,
      progress: 82,
      status: "Completed",
      startDate: "05 Jan 2026",
      endDate: "05 Jun 2026",
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(searchText) ||
        project.description.toLowerCase().includes(searchText) ||
        project.mentor.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const totalStudents = projects.reduce(
    (total, project) => total + project.students,
    0
  );

  const getStatusStyle = (status: string) => {
    if (status === "Completed") {
      return "bg-green-500/10 text-green-400";
    }

    if (status === "Needs Attention") {
      return "bg-yellow-500/10 text-yellow-400";
    }

    return "bg-blue-500/10 text-blue-400";
  };

  const getProgressStyle = (progress: number) => {
    if (progress >= 80) {
      return "bg-green-500";
    }

    if (progress >= 50) {
      return "bg-blue-500";
    }

    return "bg-yellow-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-6 md:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-slate-400">
            Manage internship projects and monitor project progress.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Total Projects</p>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{projects.length}</h2>
          </div>

          {/* Active Projects */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Active Projects</p>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{activeProjects}</h2>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Completed</p>
              <div className="rounded-lg bg-green-500/10 p-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{completedProjects}</h2>
          </div>

          {/* Assigned Students */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Assigned Students</p>
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <h2 className="mt-3 text-3xl font-bold">{totalStudents}</h2>
          </div>
        </div>

        {/* PROJECT TABLE */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          {/* SEARCH + FILTER */}
          <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Search projects or mentors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead>
                <tr className="border-b border-slate-800 text-sm text-slate-400">
                  <th className="px-5 py-4">Project</th>
                  <th className="px-5 py-4">Mentor</th>
                  <th className="px-5 py-4">Students</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">End Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-slate-800 transition hover:bg-slate-800/40"
                    >
                      {/* PROJECT */}
                      <td className="px-5 py-5">
                        <p className="font-medium text-white">{project.name}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {project.description}
                        </p>
                      </td>

                      {/* MENTOR */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {project.mentor}
                        </span>
                      </td>

                      {/* STUDENTS */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {project.students}
                        </span>
                      </td>

                      {/* PROGRESS */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 rounded-full bg-slate-700">
                            <div
                              className={`h-2 rounded-full ${getProgressStyle(
                                project.progress
                              )}`}
                              style={{
                                width: `${project.progress}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>

                      {/* END DATE */}
                      <td className="px-5 py-5">
                        <span className="text-sm text-slate-300">
                          {project.endDate}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            title="View Project"
                            onClick={() => {
                              setSelectedProject(project);
                            }}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center">
                      <p className="text-slate-400">No projects found.</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-800 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-300">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-300">
                {projects.length}
              </span>{" "}
              projects
            </p>
          </div>
        </div>
      </main>

      {/* PROJECT VIEW MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-slate-800 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-6 p-6">
              {/* STATUS + PROGRESS */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Project Status
                  </p>
                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Overall Progress
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-slate-700">
                      <div
                        className={`h-2 rounded-full ${getProgressStyle(
                          selectedProject.progress
                        )}`}
                        style={{
                          width: `${selectedProject.progress}%`,
                        }}
                      />
                    </div>

                    <span className="font-semibold text-white">
                      {selectedProject.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* PROJECT INFORMATION */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Project Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <UserRound className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Mentor</p>
                      <p className="text-sm font-medium text-white">
                        {selectedProject.mentor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Assigned Students</p>
                      <p className="text-sm font-medium text-white">
                        {selectedProject.students} Students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <CalendarDays className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Start Date</p>
                      <p className="text-sm font-medium text-white">
                        {selectedProject.startDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div className="rounded-lg bg-yellow-500/10 p-2">
                      <CalendarDays className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">End Date</p>
                      <p className="text-sm font-medium text-white">
                        {selectedProject.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Project Description
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {selectedProject.description}
                </p>
              </div>

              {/* SUMMARY */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                <h3 className="text-sm font-semibold text-white">
                  Project Summary
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  This project is being monitored by{" "}
                  <span className="font-medium text-slate-200">
                    {selectedProject.mentor}
                  </span>{" "}
                  with{" "}
                  <span className="font-medium text-slate-200">
                    {selectedProject.students} students
                  </span>{" "}
                  currently assigned. The project has reached{" "}
                  <span className="font-medium text-blue-400">
                    {selectedProject.progress}%
                  </span>{" "}
                  overall progress.
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end border-t border-slate-800 p-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
