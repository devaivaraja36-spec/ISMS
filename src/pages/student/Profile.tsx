import { useState, ChangeEvent, FormEvent } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Save,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import Sidebar from "../../components/layout/Sidebar";
import PasswordResetModal from "../../components/modals/PasswordResetModal";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();
  const [isResetOpen, setIsResetOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "Arun Kumar",
    email: "arun@example.com",
    phone: "+91 98765 43210",
    college: "ABC College of Engineering",
    department: "Computer Science and Engineering",
    year: "Final Year",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    updateUser({
      name: profile.name,
    });

    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar />

      <main className="ml-20 transition-all duration-300 flex-1 p-6 md:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Profile & Security Settings</h1>
          <p className="mt-2 text-slate-400">
            Manage your student credentials, personal details, and account password.
          </p>
        </div>

        {/* Profile Header */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">
              AK
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white">
                {profile.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Student • Computer Science and Engineering
              </p>
              <span className="mt-3 inline-block rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                ● Internship Active
              </span>
            </div>
          </div>
        </div>

        {/* Password Reset Section (Fixing Requirement 5c) */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Account Password</h3>
                <p className="text-xs text-slate-400">
                  Update your security password for portal login.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-purple-600/20 hover:bg-purple-500 transition"
            >
              <ShieldCheck className="h-4 w-4" /> Reset Password
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Update your student information.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</label>
              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</label>
              <div className="relative mt-2">
                <Phone
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* College */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">College</label>
              <div className="relative mt-2">
                <Building2
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />
                <input
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Department</label>
              <div className="relative mt-2">
                <GraduationCap
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-500"
                />
                <input
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Academic Year</label>
              <select
                name="year"
                value={profile.year}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              >
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Final Year</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              <Save size={18} />
              Save Profile Changes
            </button>
          </div>
        </form>

        {/* Reset Password Modal */}
        <PasswordResetModal
          isOpen={isResetOpen}
          onClose={() => setIsResetOpen(false)}
          userRole="Student"
        />
      </main>
    </div>
  );
}

export default Profile;
