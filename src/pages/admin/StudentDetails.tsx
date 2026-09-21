import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  Briefcase,
  UserRoundCheck,
  CalendarDays,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Send,
} from "lucide-react";
import AdminSidebar from "../../components/layout/AdminSidebar";

interface StudentData {
  name: string;
  username: string;
  email: string;
  department: string;
  project: string;
  mentor: string;
  progress: number;
  status: "On Track" | "Needs Attention" | "Completed";
  startDate: string;
  endDate: string;
  tasksCompleted: number;
  totalTasks: number;
}

function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const students: Record<string, StudentData> = {
    "1": {
      name: "Arun Kumar",
      username: "student1",
      email: "arun@example.com",
      department: "Computer Science",
      project: "InternTrack",
      mentor: "Dr. Priya Sharma",
      progress: 75,
      status: "On Track",
      startDate: "01 June 2026",
      endDate: "31 August 2026",
      tasksCompleted: 15,
      totalTasks: 20,
    },
    "2": {
      name: "Rahul Kumar",
      username: "rahul01",
      email: "rahul@example.com",
      department: "Information Technology",
      project: "AI Analytics",
      mentor: "Dr. Manoj Kumar",
      progress: 48,
      status: "Needs Attention",
      startDate: "01 June 2026",
      endDate: "31 August 2026",
      tasksCompleted: 10,
      totalTasks: 20,
    },
    "3": {
      name: "Sneha Patel",
      username: "sneha01",
      email: "sneha@example.com",
      department: "Computer Science",
      project: "Web Development",
      mentor: "Dr. Anitha",
      progress: 91,
      status: "On Track",
      startDate: "15 May 2026",
      endDate: "15 August 2026",
      tasksCompleted: 18,
      totalTasks: 20,
    },
    "4": {
      name: "Vikram Singh",
      username: "vikram01",
      email: "vikram@example.com",
      department: "Information Technology",
      project: "Cloud Computing",
      mentor: "Dr. Rajesh",
      progress: 63,
      status: "On Track",
      startDate: "01 June 2026",
      endDate: "31 August 2026",
      tasksCompleted: 13,
      totalTasks: 20,
    },
    "5": {
      name: "Priya Nair",
      username: "priya01",
      email: "priya@example.com",
      department: "Data Science",
      project: "Data Science",
      mentor: "Dr. Meena",
      progress: 35,
      status: "Needs Attention",
      startDate: "10 June 2026",
      endDate: "10 September 2026",
      tasksCompleted: 7,
      totalTasks: 20,
    },
    "6": {
      name: "Aditya Sharma",
      username: "aditya01",
      email: "aditya@example.com",
      department: "Computer Science",
      project: "Mobile Application",
      mentor: "Dr. Karthik",
      progress: 82,
      status: "Completed",
      startDate: "01 May 2026",
      endDate: "31 July 2026",
      tasksCompleted: 20,
      totalTasks: 20,
    },
  };

  const student = id ? students[id] : undefined;

  // If student doesn't exist
  if (!student) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <AdminSidebar />

        <main className="ml-20 transition-all duration-300 min-h-screen p-8">
          <button
            onClick={() => navigate("/admin/students")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </button>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h1 className="text-2xl font-bold">Student Not Found</h1>
            <p className="mt-2 text-slate-400">
              The requested student could not be found.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const progressColor =
    student.progress >= 80
      ? "bg-green-500"
      : student.progress >= 50
      ? "bg-blue-500"
      : "bg-yellow-500";

  const statusColor =
    student.status === "Completed"
      ? "bg-green-500/10 text-green-400"
      : student.status === "Needs Attention"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-blue-500/10 text-blue-400";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-20 transition-all duration-300 min-h-screen p-6 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/students")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </button>

        {/* Student Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-bold">
                {student.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-bold">{student.name}</h1>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
                  >
                    {student.status}
                  </span>
                </div>

                <p className="mt-1 text-slate-400">@{student.username}</p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">
                <Mail className="h-4 w-4" />
                Email Student
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium transition hover:bg-blue-700">
                Edit Student
              </button>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <GraduationCap className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Department</p>
                <p className="mt-1 text-sm font-medium">
                  {student.department}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Briefcase className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Project</p>
                <p className="mt-1 text-sm font-medium">{student.project}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <UserRoundCheck className="h-5 w-5 text-green-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Mentor</p>
                <p className="mt-1 text-sm font-medium">{student.mentor}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-500/10 p-2">
                <CalendarDays className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Internship Period</p>
                <p className="mt-1 text-sm font-medium">{student.startDate}</p>
                <p className="text-xs text-slate-500">to {student.endDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Progress */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Internship Progress</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Overall completion status
                </p>
              </div>

              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <span className="text-sm text-slate-400">Overall Progress</span>
                <span className="text-3xl font-bold">{student.progress}%</span>
              </div>

              <div className="mt-3 h-4 w-full rounded-full bg-slate-800">
                <div
                  className={`h-4 rounded-full transition-all ${progressColor}`}
                  style={{
                    width: `${student.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Task Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Completed Tasks</p>
                <p className="mt-2 text-2xl font-bold">
                  {student.tasksCompleted}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Total Tasks</p>
                <p className="mt-2 text-2xl font-bold">{student.totalTasks}</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-500">Remaining</p>
                <p className="mt-2 text-2xl font-bold">
                  {student.totalTasks - student.tasksCompleted}
                </p>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Project Summary</h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs text-slate-500">Project</p>
                <p className="mt-1 font-medium">{student.project}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Assigned Mentor</p>
                <p className="mt-1 font-medium">{student.mentor}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Start Date</p>
                <p className="mt-1 font-medium">{student.startDate}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">End Date</p>
                <p className="mt-1 font-medium">{student.endDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Work Updates */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent Work Updates</h2>
              <p className="mt-1 text-sm text-slate-400">
                Latest activities submitted by the student
              </p>
            </div>

            <Clock className="h-6 w-6 text-blue-400" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex gap-4 rounded-xl bg-slate-950 p-4">
              <div className="mt-1">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>

              <div>
                <p className="font-medium">Completed dashboard UI</p>
                <p className="mt-1 text-sm text-slate-400">
                  Student completed the admin dashboard interface.
                </p>
                <p className="mt-2 text-xs text-slate-600">Today</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-slate-950 p-4">
              <div className="mt-1">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>

              <div>
                <p className="font-medium">Implemented authentication</p>
                <p className="mt-1 text-sm text-slate-400">
                  Login system and role-based navigation completed.
                </p>
                <p className="mt-2 text-xs text-slate-600">Yesterday</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl bg-slate-950 p-4">
              <div className="mt-1">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="font-medium">Working on backend API</p>
                <p className="mt-1 text-sm text-slate-400">
                  Preparing API integration with Django.
                </p>
                <p className="mt-2 text-xs text-slate-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Memos */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Work Memos</h2>
              <p className="mt-1 text-sm text-slate-400">
                Student work memo submission history
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium transition hover:bg-blue-700">
              <Send className="h-4 w-4" />
              Send Reminder
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Memo 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Submitted
                </span>
              </div>
              <h3 className="mt-4 font-semibold">Memo #1</h3>
              <p className="mt-1 text-sm text-slate-500">
                Submitted on 10 June 2026
              </p>
            </div>

            {/* Memo 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Submitted
                </span>
              </div>
              <h3 className="mt-4 font-semibold">Memo #2</h3>
              <p className="mt-1 text-sm text-slate-500">
                Submitted on 24 June 2026
              </p>
            </div>

            {/* Memo 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <FileText className="h-5 w-5 text-yellow-400" />
                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                  Pending
                </span>
              </div>
              <h3 className="mt-4 font-semibold">Memo #3</h3>
              <p className="mt-1 text-sm text-slate-500">
                Awaiting submission
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDetails;
