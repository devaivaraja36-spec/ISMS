import { useState, ChangeEvent, FormEvent } from "react";
import {
  User,
  Mail,
  Briefcase,
  Lock,
  Bell,
  Save,
  CheckCircle,
} from "lucide-react";

import MentorSidebar from "../../components/layout/MentorSidebar";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "Dr. Priya Sharma",
    email: "priya.sharma@example.com",
    department: "Computer Science & Engineering",
    designation: "Internship Mentor",
  });

  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    activityReviews: true,
    memoNotifications: true,
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();

    updateUser({
      name: profile.name,
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();

    if (password.newPassword !== password.confirm) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (!password.current || !password.newPassword) {
      alert("Please fill all password fields.");
      return;
    }

    alert("Password changed successfully.");

    setPassword({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <MentorSidebar />

      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Profile & Settings
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your mentor profile and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
              <User size={30} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                {profile.name}
              </h2>
              <p className="text-sm text-slate-500">Mentor Account</p>
            </div>
          </div>

          {saved && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
              <CheckCircle size={18} />
              Profile updated successfully.
            </div>
          )}

          <form
            onSubmit={handleSaveProfile}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Department
              </label>

              <div className="relative">
                <Briefcase
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />

                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Designation
              </label>

              <div className="relative">
                <Briefcase
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />

                <input
                  type="text"
                  name="designation"
                  value={profile.designation}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Save */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Notifications */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Bell size={21} />
              Notifications
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose which notifications you want to receive.
            </p>
          </div>

          <div className="space-y-5">
            {/* Task Updates */}
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div>
                <p className="font-medium text-white">Task Updates</p>
                <p className="mt-1 text-sm text-slate-500">
                  Receive notifications when students update their tasks.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    taskUpdates: !notifications.taskUpdates,
                  })
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  notifications.taskUpdates ? "bg-blue-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications.taskUpdates ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Activity Reviews */}
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div>
                <p className="font-medium text-white">Activity Reviews</p>
                <p className="mt-1 text-sm text-slate-500">
                  Get notified when a student submits daily activity.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    activityReviews: !notifications.activityReviews,
                  })
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  notifications.activityReviews
                    ? "bg-blue-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications.activityReviews ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Memo Notifications */}
            <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div>
                <p className="font-medium text-white">Memo Notifications</p>
                <p className="mt-1 text-sm text-slate-500">
                  Receive notifications related to work memos.
                </p>
              </div>

              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    memoNotifications: !notifications.memoNotifications,
                  })
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  notifications.memoNotifications
                    ? "bg-blue-600"
                    : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    notifications.memoNotifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
              <Lock size={21} />
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account password.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="max-w-xl space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Current Password
              </label>

              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-500"
            >
              <Lock size={18} />
              Change Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
