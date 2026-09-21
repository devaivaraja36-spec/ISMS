import { useState, FormEvent } from "react";
import {
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import MentorSidebar from "../../components/layout/MentorSidebar";

interface MemoItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface StudentWithMemos {
  id: number;
  name: string;
  project: string;
  memos: MemoItem[];
}

function WorkMemos() {
  const [students, setStudents] = useState<StudentWithMemos[]>([
    {
      id: 1,
      name: "Arun Kumar",
      project: "Internship Activity Monitoring System",
      memos: [
        {
          id: 101,
          title: "Weekly Progress Update",
          date: "20 Sep 2026",
          description:
            "Completed dashboard and started task management module.",
        },
        {
          id: 102,
          title: "Project Review",
          date: "18 Sep 2026",
          description:
            "Reviewed project progress and discussed next tasks.",
        },
      ],
    },
    {
      id: 2,
      name: "Rahul Sharma",
      project: "E-Commerce Management System",
      memos: [
        {
          id: 201,
          title: "Database Progress",
          date: "19 Sep 2026",
          description: "Completed initial database integration.",
        },
      ],
    },
    {
      id: 3,
      name: "Priya Nair",
      project: "Hospital Management System",
      memos: [
        {
          id: 301,
          title: "UI Review",
          date: "18 Sep 2026",
          description: "Completed the hospital module UI.",
        },
        {
          id: 302,
          title: "Module Progress",
          date: "17 Sep 2026",
          description: "Worked on the patient management module.",
        },
        {
          id: 303,
          title: "Weekly Review",
          date: "15 Sep 2026",
          description: "Reviewed weekly internship progress.",
        },
      ],
    },
    {
      id: 4,
      name: "Vikram Singh",
      project: "Library Management System",
      memos: [],
    },
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [newMemo, setNewMemo] = useState({
    title: "",
    description: "",
  });

  const selectedStudent = students.find(
    (student) => student.id === selectedStudentId
  );

  const handleCreateMemo = (e: FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    if (selectedStudent.memos.length >= 3) {
      return;
    }

    const memo: MemoItem = {
      id: Date.now(),
      title: newMemo.title,
      description: newMemo.description,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              memos: [...student.memos, memo],
            }
          : student
      )
    );

    setNewMemo({
      title: "",
      description: "",
    });

    setShowModal(false);
  };

  const handleDeleteMemo = (memoId: number) => {
    if (!selectedStudent) return;

    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === selectedStudent.id
          ? {
              ...student,
              memos: student.memos.filter((memo) => memo.id !== memoId),
            }
          : student
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MentorSidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Work Memos</h1>
          <p className="mt-2 text-slate-400">
            Manage individual work memos for your students.
          </p>
        </div>

        {/* STUDENT LIST */}
        {!selectedStudent && (
          <>
            <div className="mb-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Total Students</p>
                <h2 className="mt-2 text-3xl font-bold text-white">
                  {students.length}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Total Memos</p>
                <h2 className="mt-2 text-3xl font-bold text-blue-400">
                  {students.reduce(
                    (total, student) => total + student.memos.length,
                    0
                  )}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <p className="text-sm text-slate-400">Maximum Per Student</p>
                <h2 className="mt-2 text-3xl font-bold text-purple-400">3</h2>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Students</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Each student can have a maximum of 3 work memos.
                </p>
              </div>

              <div className="space-y-4">
                {students.map((student) => {
                  const memoCount = student.memos.length;
                  const remaining = 3 - memoCount;
                  const percentage = (memoCount / 3) * 100;

                  return (
                    <div
                      key={student.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                            <User size={22} className="text-white" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-white">
                              {student.name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {student.project}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            {memoCount} / 3
                          </p>
                          <p className="text-xs text-slate-500">Memos Used</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-slate-400">Memo Usage</span>
                          <span
                            className={
                              remaining === 0
                                ? "text-red-400"
                                : "text-slate-400"
                            }
                          >
                            {remaining} remaining
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-slate-800">
                          <div
                            className={`h-2 rounded-full ${
                              memoCount === 3 ? "bg-red-500" : "bg-blue-500"
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Bottom */}
                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {memoCount === 3 ? (
                            <>
                              <AlertCircle
                                size={16}
                                className="text-red-400"
                              />
                              <span className="text-sm text-red-400">
                                Maximum reached
                              </span>
                            </>
                          ) : (
                            <>
                              <CheckCircle
                                size={16}
                                className="text-green-400"
                              />
                              <span className="text-sm text-green-400">
                                {remaining} memo
                                {remaining !== 1 ? "s" : ""} available
                              </span>
                            </>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedStudentId(student.id)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                        >
                          View Memos
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* INDIVIDUAL STUDENT MEMOS */}
        {selectedStudent && (
          <>
            <button
              onClick={() => setSelectedStudentId(null)}
              className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Students
            </button>

            {/* Student Header */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                    <User size={25} className="text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedStudent.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedStudent.project}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {selectedStudent.memos.length} / 3
                  </p>
                  <p className="text-sm text-slate-500">Memos</p>
                </div>
              </div>
            </div>

            {/* Memo Section */}
            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Work Memos
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedStudent.memos.length} of 3 memos used
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  disabled={selectedStudent.memos.length >= 3}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                    selectedStudent.memos.length >= 3
                      ? "cursor-not-allowed bg-slate-700 text-slate-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  <Plus size={18} />
                  Create Memo
                </button>
              </div>

              {/* Maximum message */}
              {selectedStudent.memos.length >= 3 && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <AlertCircle size={20} className="text-red-400" />
                  <p className="text-sm text-red-400">
                    This student has reached the maximum limit of 3 work memos.
                  </p>
                </div>
              )}

              {/* No memos */}
              {selectedStudent.memos.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-700 p-10 text-center">
                  <FileText size={40} className="mx-auto text-slate-600" />
                  <p className="mt-4 text-slate-400">
                    No work memos created for this student.
                  </p>
                </div>
              )}

              {/* Memo Cards */}
              <div className="space-y-4">
                {selectedStudent.memos.map((memo) => (
                  <div
                    key={memo.id}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                          <FileText size={20} className="text-blue-400" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {memo.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {memo.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMemo(memo.id)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {memo.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* CREATE MEMO MODAL */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                Create Work Memo
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                For {selectedStudent.name}
              </p>
              <p className="mt-2 text-xs text-blue-400">
                {selectedStudent.memos.length} / 3 memos used
              </p>
            </div>

            <form onSubmit={handleCreateMemo} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Memo Title
                </label>
                <input
                  type="text"
                  required
                  value={newMemo.title}
                  onChange={(e) =>
                    setNewMemo({
                      ...newMemo,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter memo title"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  required
                  rows={5}
                  value={newMemo.description}
                  onChange={(e) =>
                    setNewMemo({
                      ...newMemo,
                      description: e.target.value,
                    })
                  }
                  placeholder="Write the work memo..."
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Create Memo
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
