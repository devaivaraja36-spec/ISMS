import { useState } from "react";
import {
  ClipboardCheck,
  Search,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

import MentorSidebar from "../../components/layout/MentorSidebar";

interface ActivityReviewItem {
  id: number;
  student: string;
  date: string;
  title: string;
  description: string;
  status: "Pending Review" | "Approved" | "Rejected";
}

function ActivityReviews() {
  const [search, setSearch] = useState("");
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityReviewItem | null>(null);

  const [activities, setActivities] = useState<ActivityReviewItem[]>([
    {
      id: 1,
      student: "Arun Kumar",
      date: "20 Sep 2026",
      title: "Completed Dashboard UI",
      description:
        "Designed the student dashboard interface and completed the statistics cards.",
      status: "Pending Review",
    },
    {
      id: 2,
      student: "Rahul Sharma",
      date: "20 Sep 2026",
      title: "Database Integration",
      description:
        "Worked on connecting the project dashboard with the database structure.",
      status: "Approved",
    },
    {
      id: 3,
      student: "Priya Nair",
      date: "19 Sep 2026",
      title: "Hospital Module Design",
      description:
        "Created the initial UI design for the hospital management module.",
      status: "Pending Review",
    },
    {
      id: 4,
      student: "Vikram Singh",
      date: "19 Sep 2026",
      title: "Library Search Module",
      description:
        "Implemented the search functionality for the library management project.",
      status: "Rejected",
    },
  ]);

  const filteredActivities = activities.filter(
    (activity) =>
      activity.student.toLowerCase().includes(search.toLowerCase()) ||
      activity.title.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (
    id: number,
    status: "Pending Review" | "Approved" | "Rejected"
  ) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, status } : activity
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MentorSidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Activity Reviews</h1>
          <p className="mt-2 text-slate-400">
            Review and approve daily activities submitted by students.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Total Activities</p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {activities.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Pending Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {
                activities.filter(
                  (activity) => activity.status === "Pending Review"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Approved</p>
            <h2 className="mt-2 text-3xl font-bold text-green-400">
              {
                activities.filter(
                  (activity) => activity.status === "Approved"
                ).length
              }
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
              placeholder="Search student or activity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Activities */}
        <div className="mt-6 space-y-4">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                {/* Activity Details */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <ClipboardCheck size={21} className="text-blue-400" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold text-white">
                        {activity.title}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          activity.status === "Approved"
                            ? "bg-green-500/10 text-green-400"
                            : activity.status === "Rejected"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Student:{" "}
                      <span className="text-slate-200">
                        {activity.student}
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Submitted: {activity.date}
                    </p>

                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
                  >
                    <Eye size={17} />
                    View Details
                  </button>

                  {activity.status === "Pending Review" && (
                    <>
                      <button
                        onClick={() => updateStatus(activity.id, "Approved")}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                      >
                        <CheckCircle size={17} />
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(activity.id, "Rejected")}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        <XCircle size={17} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-500">
            No activities found.
          </div>
        )}

        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-blue-400">Activity Details</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {selectedActivity.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedActivity(null)}
                  className="text-2xl text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="text-xs text-slate-500">Student</p>
                  <p className="mt-1 font-medium text-white">
                    {selectedActivity.student}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-800 p-4">
                  <p className="text-xs text-slate-500">Submitted Date</p>
                  <p className="mt-1 font-medium text-white">
                    {selectedActivity.date}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-800 p-4 md:col-span-2">
                  <p className="text-xs text-slate-500">Current Status</p>
                  <p className="mt-1 font-medium text-white">
                    {selectedActivity.status}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-300">
                  Activity Description
                </p>

                <div className="mt-2 rounded-lg bg-slate-800 p-4">
                  <p className="text-sm leading-6 text-slate-300">
                    {selectedActivity.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ActivityReviews;
