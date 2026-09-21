import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Filter,
    Eye,
    Pencil,
    Mail,
    GraduationCap,
    Users,
    CheckCircle,
    Clock,
} from "lucide-react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import SendDeadlineEmailModal from "../../components/modals/SendDeadlineEmailModal";

interface StudentItem {
    id: number;
    name: string;
    username: string;
    email: string;
    project: string;
    mentor: string;
    progress: number;
    status: string;
    department: string;
}

function Students() {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [emailTargetStudent, setEmailTargetStudent] = useState<StudentItem | null>(null);

    const students: StudentItem[] = [
        {
            id: 1,
            name: "Arun Kumar",
            username: "student1",
            email: "arun@example.com",
            project: "InternTrack",
            mentor: "Dr. Priya Sharma",
            progress: 75,
            status: "On Track",
            department: "Computer Science",
        },
        {
            id: 2,
            name: "Rahul Kumar",
            username: "rahul01",
            email: "rahul@example.com",
            project: "AI Analytics",
            mentor: "Dr. Manoj Kumar",
            progress: 48,
            status: "Needs Attention",
            department: "Information Technology",
        },
        {
            id: 3,
            name: "Sneha Patel",
            username: "sneha01",
            email: "sneha@example.com",
            project: "Web Development",
            mentor: "Dr. Anitha",
            progress: 91,
            status: "On Track",
            department: "Computer Science",
        },
        {
            id: 4,
            name: "Vikram Singh",
            username: "vikram01",
            email: "vikram@example.com",
            project: "Cloud Computing",
            mentor: "Dr. Rajesh",
            progress: 63,
            status: "On Track",
            department: "Information Technology",
        },
        {
            id: 5,
            name: "Priya Nair",
            username: "priya01",
            email: "priya@example.com",
            project: "Data Science",
            mentor: "Dr. Meena",
            progress: 35,
            status: "Needs Attention",
            department: "Data Science",
        },
        {
            id: 6,
            name: "Aditya Sharma",
            username: "aditya01",
            email: "aditya@example.com",
            project: "Mobile Application",
            mentor: "Dr. Karthik",
            progress: 82,
            status: "Completed",
            department: "Computer Science",
        },
    ];

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch =
                student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.username.toLowerCase().includes(search.toLowerCase()) ||
                student.project.toLowerCase().includes(search.toLowerCase()) ||
                student.mentor.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "All" ||
                student.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const getStatusStyle = (status: string): string => {
        if (status === "Completed") {
            return "bg-green-500/10 text-green-400";
        }

        if (status === "Needs Attention") {
            return "bg-yellow-500/10 text-yellow-400";
        }

        return "bg-blue-500/10 text-blue-400";
    };

    const getProgressStyle = (progress: number): string => {
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
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="ml-20 transition-all duration-300 min-h-screen p-6 md:p-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Students
                            </h1>

                            <p className="mt-2 text-slate-400">
                                Manage and monitor all internship students.
                            </p>
                        </div>

                        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                            <GraduationCap className="h-5 w-5" />
                            Add Student
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Total Students */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Total Students
                            </p>

                            <div className="rounded-lg bg-blue-500/10 p-2">
                                <Users className="h-5 w-5 text-blue-400" />
                            </div>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {students.length}
                        </h2>
                    </div>

                    {/* On Track */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                On Track
                            </p>

                            <div className="rounded-lg bg-green-500/10 p-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {
                                students.filter(
                                    (student) => student.status === "On Track"
                                ).length
                            }
                        </h2>
                    </div>

                    {/* Needs Attention */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Needs Attention
                            </p>

                            <div className="rounded-lg bg-yellow-500/10 p-2">
                                <Clock className="h-5 w-5 text-yellow-400" />
                            </div>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {
                                students.filter(
                                    (student) => student.status === "Needs Attention"
                                ).length
                            }
                        </h2>
                    </div>

                    {/* Completed */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">
                                Completed
                            </p>

                            <div className="rounded-lg bg-purple-500/10 p-2">
                                <CheckCircle className="h-5 w-5 text-purple-400" />
                            </div>
                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {
                                students.filter(
                                    (student) => student.status === "Completed"
                                ).length
                            }
                        </h2>
                    </div>
                </div>

                {/* Student Management Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900">

                    {/* Search + Filter */}
                    <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between">

                        {/* Search */}
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                                type="text"
                                placeholder="Search students, projects or mentors..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-slate-500" />

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                            >
                                <option value="All">All Status</option>
                                <option value="On Track">On Track</option>
                                <option value="Needs Attention">
                                    Needs Attention
                                </option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1100px] text-left">

                            <thead>
                                <tr className="border-b border-slate-800 text-sm text-slate-400">
                                    <th className="px-5 py-4">
                                        Student
                                    </th>

                                    <th className="px-5 py-4">
                                        Department
                                    </th>

                                    <th className="px-5 py-4">
                                        Project
                                    </th>

                                    <th className="px-5 py-4">
                                        Mentor
                                    </th>

                                    <th className="px-5 py-4">
                                        Progress
                                    </th>

                                    <th className="px-5 py-4">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="border-b border-slate-800 transition hover:bg-slate-800/40"
                                        >
                                            {/* Student */}
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
                                                        {student.name.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-white">
                                                            {student.name}
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            {student.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Department */}
                                            <td className="px-5 py-5">
                                                <span className="text-sm text-slate-300">
                                                    {student.department}
                                                </span>
                                            </td>

                                            {/* Project */}
                                            <td className="px-5 py-5">
                                                <span className="text-sm text-slate-300">
                                                    {student.project}
                                                </span>
                                            </td>

                                            {/* Mentor */}
                                            <td className="px-5 py-5">
                                                <span className="text-sm text-slate-300">
                                                    {student.mentor}
                                                </span>
                                            </td>

                                            {/* Progress */}
                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-2 w-24 rounded-full bg-slate-700">
                                                        <div
                                                            className={`h-2 rounded-full ${getProgressStyle(
                                                                student.progress
                                                            )}`}
                                                            style={{
                                                                width: `${student.progress}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <span className="text-sm font-medium">
                                                        {student.progress}%
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-5">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                        student.status
                                                    )}`}
                                                >
                                                    {student.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-5">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        title="View Student"
                                                        onClick={() =>
                                                            navigate(`/admin/students/${student.id}`)
                                                        }
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>


                                                    <button
                                                        title="Edit Student"
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        title="Send Deadline Warning Email"
                                                        onClick={() => setEmailTargetStudent(student)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-amber-400"
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-slate-400">
                                                No students found.
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                Try changing your search or filter.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-2 border-t border-slate-800 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Showing{" "}
                            <span className="font-medium text-slate-300">
                                {filteredStudents.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-slate-300">
                                {students.length}
                            </span>{" "}
                            students
                        </p>

                        <p>
                            Admin Student Management
                        </p>
                    </div>
                </div>

                {/* Send Deadline Email Modal */}
                <SendDeadlineEmailModal
                    isOpen={!!emailTargetStudent}
                    onClose={() => setEmailTargetStudent(null)}
                    studentName={emailTargetStudent?.name}
                    studentEmail={emailTargetStudent?.email}
                    projectName={emailTargetStudent?.project}
                    dueDate="May 30, 2024"
                    senderRole="Admin"
                />
            </main>
        </div>
    );
}

export default Students;
