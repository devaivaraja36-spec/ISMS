import {
    Search,
    FileText,
    Users,
    Clock,
    CheckCircle,
    Eye,
    Mail,
    X,
    CalendarDays,
    UserRound,
    Briefcase,
    ClipboardList,
    Send,
} from "lucide-react";
import { useMemo, useState, FormEvent } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";

interface MemoItem {
    id: number;
    student: string;
    username: string;
    email: string;
    project: string;
    mentor: string;
    title: string;
    date: string;
    status: string;
    description: string;
}

interface EmailFormState {
    recipient: string;
    subject: string;
    message: string;
}

function WorkMemos() {
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("All");

    const [selectedMemo, setSelectedMemo] = useState<MemoItem | null>(null);
    const [emailMemo, setEmailMemo] = useState<MemoItem | null>(null);

    const [emailForm, setEmailForm] = useState<EmailFormState>({
        recipient: "",
        subject: "",
        message: "",
    });

    const memos: MemoItem[] = [
        {
            id: 1,
            student: "Arun Kumar",
            username: "student1",
            email: "arun.kumar@example.com",
            project: "InternTrack",
            mentor: "Dr. Priya Sharma",
            title: "Frontend Dashboard Development",
            date: "18 Sep 2026",
            status: "Reviewed",
            description:
                "Completed the admin dashboard layout and connected the student management interface.",
        },
        {
            id: 2,
            student: "Rahul Kumar",
            username: "rahul01",
            email: "rahul.kumar@example.com",
            project: "AI Analytics",
            mentor: "Dr. Manoj Kumar",
            title: "Data Preprocessing",
            date: "18 Sep 2026",
            status: "Pending",
            description:
                "Worked on cleaning the dataset and preparing the data for the machine learning model.",
        },
        {
            id: 3,
            student: "Sneha Patel",
            username: "sneha01",
            email: "sneha.patel@example.com",
            project: "Web Development",
            mentor: "Dr. Anitha",
            title: "API Integration",
            date: "17 Sep 2026",
            status: "Reviewed",
            description:
                "Integrated the frontend with the project API and tested the main application endpoints.",
        },
        {
            id: 4,
            student: "Vikram Singh",
            username: "vikram01",
            email: "vikram.singh@example.com",
            project: "Cloud Computing",
            mentor: "Dr. Rajesh",
            title: "Cloud Deployment",
            date: "17 Sep 2026",
            status: "Pending",
            description:
                "Configured the cloud deployment environment and tested the application deployment process.",
        },
        {
            id: 5,
            student: "Priya Nair",
            username: "priya01",
            email: "priya.nair@example.com",
            project: "Data Science",
            mentor: "Dr. Meena",
            title: "Data Visualization",
            date: "16 Sep 2026",
            status: "Reviewed",
            description:
                "Created charts and visual reports to understand the current dataset and identify patterns.",
        },
        {
            id: 6,
            student: "Aditya Sharma",
            username: "aditya01",
            email: "aditya.sharma@example.com",
            project: "Mobile Application",
            mentor: "Dr. Karthik",
            title: "Mobile UI Development",
            date: "16 Sep 2026",
            status: "Pending",
            description:
                "Developed the mobile application screens and improved the navigation experience.",
        },
    ];

    const filteredMemos = useMemo(() => {
        return memos.filter((memo) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                memo.student.toLowerCase().includes(searchText) ||
                memo.username.toLowerCase().includes(searchText) ||
                memo.project.toLowerCase().includes(searchText) ||
                memo.title.toLowerCase().includes(searchText) ||
                memo.mentor.toLowerCase().includes(searchText);

            const matchesStatus =
                statusFilter === "All" ||
                memo.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const reviewedMemos = memos.filter(
        (memo) => memo.status === "Reviewed"
    ).length;

    const pendingMemos = memos.filter(
        (memo) => memo.status === "Pending"
    ).length;

    const totalStudents = new Set(
        memos.map((memo) => memo.student)
    ).size;

    /* ================================= */
    /* OPEN EMAIL MODAL */
    /* ================================= */

    const openEmailModal = (memo: MemoItem) => {
        setEmailMemo(memo);

        setEmailForm({
            recipient: memo.email,
            subject: `Work Memo - ${memo.title}`,
            message: `Hello ${memo.student},

This is regarding your work memo "${memo.title}" submitted on ${memo.date}.

Project: ${memo.project}
Mentor: ${memo.mentor}

Work completed:
${memo.description}

Regards,
InternTrack Administration`,
        });
    };

    /* ================================= */
    /* SEND EMAIL */
    /* ================================= */

    const handleSendEmail = (e: FormEvent) => {
        e.preventDefault();

        if (!emailForm.recipient.trim()) {
            alert("Please enter a recipient email address.");
            return;
        }

        if (!emailForm.subject.trim()) {
            alert("Please enter an email subject.");
            return;
        }

        alert(
            `Email prepared successfully for ${emailForm.recipient}.\n\nActual email delivery will be connected when the Django backend is added.`
        );

        setEmailMemo(null);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <AdminSidebar />

            <main className="ml-20 transition-all duration-300 min-h-screen p-6 md:p-8">

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold">
                        Work Memos
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Review and monitor student daily work submissions.
                    </p>

                </div>

                {/* Statistics */}
                <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Total Memos
                            </p>

                            <div className="rounded-lg bg-blue-500/10 p-2">
                                <FileText className="h-5 w-5 text-blue-400" />
                            </div>

                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {memos.length}
                        </h2>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Reviewed
                            </p>

                            <div className="rounded-lg bg-green-500/10 p-2">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>

                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {reviewedMemos}
                        </h2>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Pending Review
                            </p>

                            <div className="rounded-lg bg-yellow-500/10 p-2">
                                <Clock className="h-5 w-5 text-yellow-400" />
                            </div>

                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {pendingMemos}
                        </h2>

                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                        <div className="flex items-center justify-between">

                            <p className="text-sm text-slate-400">
                                Students
                            </p>

                            <div className="rounded-lg bg-purple-500/10 p-2">
                                <Users className="h-5 w-5 text-purple-400" />
                            </div>

                        </div>

                        <h2 className="mt-3 text-3xl font-bold">
                            {totalStudents}
                        </h2>

                    </div>

                </div>

                {/* Memo Table */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900">

                    {/* Search */}
                    <div className="flex flex-col gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:justify-between">

                        <div className="relative w-full md:max-w-md">

                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                            <input
                                type="text"
                                placeholder="Search student, project or memo..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                            />

                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
                        >

                            <option value="All">
                                All Status
                            </option>

                            <option value="Reviewed">
                                Reviewed
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                        </select>

                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1200px] text-left">

                            <thead>

                                <tr className="border-b border-slate-800 text-sm text-slate-400">

                                    <th className="px-5 py-4">
                                        Student
                                    </th>

                                    <th className="px-5 py-4">
                                        Project
                                    </th>

                                    <th className="px-5 py-4">
                                        Memo
                                    </th>

                                    <th className="px-5 py-4">
                                        Date
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

                                {filteredMemos.length > 0 ? (

                                    filteredMemos.map((memo) => (

                                        <tr
                                            key={memo.id}
                                            className="border-b border-slate-800 transition hover:bg-slate-800/40"
                                        >

                                            {/* Student */}
                                            <td className="px-5 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
                                                        {memo.student.charAt(0)}
                                                    </div>

                                                    <div>

                                                        <p className="font-medium text-white">
                                                            {memo.student}
                                                        </p>

                                                        <p className="text-xs text-slate-500">
                                                            {memo.username}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* Project */}
                                            <td className="px-5 py-5">

                                                <span className="text-sm text-slate-300">
                                                    {memo.project}
                                                </span>

                                            </td>

                                            {/* Memo */}
                                            <td className="max-w-md px-5 py-5">

                                                <p className="font-medium text-white">
                                                    {memo.title}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-slate-500">
                                                    {memo.description}
                                                </p>

                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-5">

                                                <span className="text-sm text-slate-300">
                                                    {memo.date}
                                                </span>

                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${memo.status === "Reviewed"
                                                            ? "bg-green-500/10 text-green-400"
                                                            : "bg-yellow-500/10 text-yellow-400"
                                                        }`}
                                                >
                                                    {memo.status}
                                                </span>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-5">

                                                <div className="flex justify-end gap-2">

                                                    {/* VIEW */}
                                                    <button
                                                        type="button"
                                                        title="View Memo"
                                                        onClick={() =>
                                                            setSelectedMemo(memo)
                                                        }
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>

                                                    {/* EMAIL */}
                                                    <button
                                                        type="button"
                                                        title="Send Email"
                                                        onClick={() =>
                                                            openEmailModal(memo)
                                                        }
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400"
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
                                            colSpan={6}
                                            className="px-5 py-12 text-center"
                                        >

                                            <p className="text-slate-400">
                                                No work memos found.
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
                    <div className="border-t border-slate-800 px-5 py-4">

                        <p className="text-sm text-slate-500">

                            Showing{" "}

                            <span className="font-medium text-slate-300">
                                {filteredMemos.length}
                            </span>{" "}

                            of{" "}

                            <span className="font-medium text-slate-300">
                                {memos.length}
                            </span>{" "}

                            memos

                        </p>

                    </div>

                </div>

            </main>

            {/* ================================================= */}
            {/* VIEW MEMO MODAL */}
            {/* ================================================= */}

            {selectedMemo && (

                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedMemo(null)}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex items-start justify-between border-b border-slate-800 p-6">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                                    <FileText className="h-6 w-6 text-blue-400" />
                                </div>

                                <div>

                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Work Memo
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-white">
                                        {selectedMemo.title}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Submitted by {selectedMemo.student}
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedMemo(null)}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                        </div>

                        <div className="space-y-6 p-6">

                            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-5">

                                <div>

                                    <p className="text-xs uppercase tracking-wide text-slate-500">
                                        Review Status
                                    </p>

                                    <span
                                        className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${selectedMemo.status === "Reviewed"
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                            }`}
                                    >
                                        {selectedMemo.status}
                                    </span>

                                </div>

                                <FileText className="h-7 w-7 text-slate-600" />

                            </div>

                            <div>

                                <h3 className="mb-4 text-sm font-semibold text-white">
                                    Student Information
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                        <div className="rounded-lg bg-blue-500/10 p-2">
                                            <UserRound className="h-5 w-5 text-blue-400" />
                                        </div>

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Student
                                            </p>

                                            <p className="text-sm font-medium text-white">
                                                {selectedMemo.student}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                        <div className="rounded-lg bg-purple-500/10 p-2">
                                            <UserRound className="h-5 w-5 text-purple-400" />
                                        </div>

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Username
                                            </p>

                                            <p className="text-sm font-medium text-white">
                                                {selectedMemo.username}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div>

                                <h3 className="mb-4 text-sm font-semibold text-white">
                                    Project Information
                                </h3>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                        <div className="rounded-lg bg-blue-500/10 p-2">
                                            <Briefcase className="h-5 w-5 text-blue-400" />
                                        </div>

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Project
                                            </p>

                                            <p className="text-sm font-medium text-white">
                                                {selectedMemo.project}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                        <div className="rounded-lg bg-green-500/10 p-2">
                                            <UserRound className="h-5 w-5 text-green-400" />
                                        </div>

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Mentor
                                            </p>

                                            <p className="text-sm font-medium text-white">
                                                {selectedMemo.mentor}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">

                                        <div className="rounded-lg bg-yellow-500/10 p-2">
                                            <CalendarDays className="h-5 w-5 text-yellow-400" />
                                        </div>

                                        <div>

                                            <p className="text-xs text-slate-500">
                                                Submission Date
                                            </p>

                                            <p className="text-sm font-medium text-white">
                                                {selectedMemo.date}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

                                <div className="flex items-center gap-2">

                                    <ClipboardList className="h-5 w-5 text-blue-400" />

                                    <h3 className="text-sm font-semibold text-white">
                                        Work Description
                                    </h3>

                                </div>

                                <p className="mt-4 text-sm leading-7 text-slate-400">
                                    {selectedMemo.description}
                                </p>

                            </div>

                        </div>

                        <div className="flex justify-end border-t border-slate-800 p-5">

                            <button
                                type="button"
                                onClick={() => setSelectedMemo(null)}
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

            {/* ================================================= */}
            {/* SEND EMAIL MODAL */}
            {/* ================================================= */}

            {emailMemo && (

                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setEmailMemo(null)}
                >

                    <div
                        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Email Header */}
                        <div className="flex items-start justify-between border-b border-slate-800 p-6">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                                    <Mail className="h-6 w-6 text-blue-400" />
                                </div>

                                <div>

                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Work Memo
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        Send Email
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Send a message to {emailMemo.student}
                                    </p>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => setEmailMemo(null)}
                                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>

                        </div>

                        {/* Email Form */}
                        <form
                            onSubmit={handleSendEmail}
                            className="space-y-5 p-6"
                        >

                            {/* Recipient */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    To
                                </label>

                                <input
                                    type="email"
                                    value={emailForm.recipient}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            recipient: e.target.value,
                                        })
                                    }
                                    placeholder="student@example.com"
                                    required
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                                />

                            </div>

                            {/* Subject */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    value={emailForm.subject}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            subject: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Message */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Message
                                </label>

                                <textarea
                                    rows={9}
                                    value={emailForm.message}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            message: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Memo Reference */}
                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">

                                <div className="flex gap-3">

                                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />

                                    <div>

                                        <p className="text-sm font-medium text-white">
                                            Memo Reference
                                        </p>

                                        <p className="mt-1 text-sm text-slate-400">
                                            {emailMemo.title}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Submitted by {emailMemo.student} on {emailMemo.date}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

                                <button
                                    type="button"
                                    onClick={() => setEmailMemo(null)}
                                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                                >
                                    <Send className="h-4 w-4" />
                                    Send Email
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default WorkMemos;
