import {
  Bell,
  FileText,
  TrendingUp,
  Clock,
  UserPlus,
  CheckCircle,
  Mail,
  LucideIcon,
} from "lucide-react";

import AdminSidebar from "../../components/layout/AdminSidebar";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "memo" | "progress" | "review" | "student" | "email" | "success";
  icon: LucideIcon;
  unread: boolean;
}

function Notifications() {
  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Work Memo Submitted",
      message:
        "Arun Kumar submitted a new work memo for Internship Monitoring System.",
      time: "10 minutes ago",
      type: "memo",
      icon: FileText,
      unread: true,
    },
    {
      id: 2,
      title: "Progress Updated",
      message: "Sneha Patel's internship progress has been updated to 91%.",
      time: "35 minutes ago",
      type: "progress",
      icon: TrendingUp,
      unread: true,
    },
    {
      id: 3,
      title: "Mentor Review Pending",
      message:
        "Dr. Priya Sharma has 3 student work updates waiting for review.",
      time: "1 hour ago",
      type: "review",
      icon: Clock,
      unread: true,
    },
    {
      id: 4,
      title: "New Student Added",
      message:
        "Rahul Kumar has been added to the internship monitoring system.",
      time: "3 hours ago",
      type: "student",
      icon: UserPlus,
      unread: false,
    },
    {
      id: 5,
      title: "Memo Email Sent",
      message:
        "Work memo notification email was successfully sent to the admin.",
      time: "Yesterday",
      type: "email",
      icon: Mail,
      unread: false,
    },
    {
      id: 6,
      title: "Task Completed",
      message: "Arun Kumar completed the task 'Create Dashboard UI'.",
      time: "Yesterday",
      type: "success",
      icon: CheckCircle,
      unread: false,
    },
  ];

  const getIconStyle = (type: string) => {
    switch (type) {
      case "memo":
        return "bg-blue-500/10 text-blue-400";
      case "progress":
        return "bg-green-500/10 text-green-400";
      case "review":
        return "bg-yellow-500/10 text-yellow-400";
      case "student":
        return "bg-purple-500/10 text-purple-400";
      case "email":
        return "bg-cyan-500/10 text-cyan-400";
      case "success":
        return "bg-emerald-500/10 text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="mt-2 text-slate-400">
              View important internship system activities.
            </p>
          </div>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">
            Mark All as Read
          </button>
        </div>

        {/* Notification Summary */}
        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Total Notifications</p>
                <h2 className="mt-1 text-2xl font-bold">6</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-500/10 p-3">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Unread</p>
                <h2 className="mt-1 text-2xl font-bold">3</h2>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">Read</p>
                <h2 className="mt-1 text-2xl font-bold">3</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-6 py-5">
            <h2 className="text-xl font-semibold">Recent Notifications</h2>
            <p className="mt-1 text-sm text-slate-400">
              Latest activities from students and mentors
            </p>
          </div>

          <div>
            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 border-b border-slate-800 px-6 py-5 transition hover:bg-slate-800/40 ${
                    notification.unread ? "bg-slate-800/20" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${getIconStyle(
                      notification.type
                    )}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">
                            {notification.title}
                          </h3>

                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>

                        <p className="mt-1 text-sm text-slate-400">
                          {notification.message}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-slate-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notifications;
