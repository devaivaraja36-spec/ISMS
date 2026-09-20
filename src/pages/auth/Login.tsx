import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../types";

import {
  ShieldCheck,
  GraduationCap,
  UserRoundCheck,
  ArrowLeft,
  LockKeyhole,
  User,
  LogIn,
  LucideIcon,
} from "lucide-react";
import GradientWaves from "../../components/ui/GradientWaves";

interface Portal {
  id: UserRole;
  title: string;
  description: string;
  icon: LucideIcon;
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const portals: Portal[] = [
    {
      id: "admin",
      title: "Admin Portal",
      description: "Manage students, mentors and internship activities",
      icon: ShieldCheck,
    },
    {
      id: "mentor",
      title: "Mentor Portal",
      description: "Manage students, tasks and work progress",
      icon: UserRoundCheck,
    },
    {
      id: "student",
      title: "Student Portal",
      description: "View tasks, update work and track progress",
      icon: GraduationCap,
    },
  ];

  const handlePortalSelect = (portal: Portal) => {
    setSelectedPortal(portal);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleBack = () => {
    setSelectedPortal(null);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    if (!selectedPortal) return;

    const result = login(username, password);

    if (!result.success || !result.user) {
      setError(result.message || "Login failed.");
      return;
    }

    if (result.user.role !== selectedPortal.id) {
      setError(
        `This account does not belong to the ${selectedPortal.title}.`
      );
      localStorage.removeItem("user");
      return;
    }

    if (result.user.role === "admin") {
      navigate("/admin");
    } else if (result.user.role === "mentor") {
      navigate("/mentor");
    } else if (result.user.role === "student") {
      navigate("/student");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 px-6 py-8 text-white overflow-hidden">
      {/* Exclusive Full-Screen Gradient Waves Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#38bdf8"
          speed={0.5}
          amplitude={2.8}
          waveScale={0.7}
          zoom={1.1}
        />
      </div>

      {/* Screen Content Wrapper */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center">
        {!selectedPortal ? (
          /* Portal Selection Screen */
          <div>
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold md:text-5xl text-white">
                Intern<span className="text-blue-500">Track</span>
              </h1>
              <p className="mt-2 text-slate-300 font-medium">
                Internship Activity Monitoring System
              </p>
              <h2 className="mt-8 text-2xl font-bold">
                Choose Your Portal
              </h2>

            </div>

            {/* Portal Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {portals.map((portal) => {
                const Icon = portal.icon;

                return (
                  <button
                    key={portal.id}
                    onClick={() => handlePortalSelect(portal)}
                    className="group rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 text-left backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-blue-500/60 hover:bg-slate-900/95 shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 transition group-hover:bg-blue-500/20">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white">
                      {portal.title}
                    </h3>

                    <p className="mt-3 min-h-[48px] text-xs leading-6 text-slate-400">
                      {portal.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400">
                      Enter Portal
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="mt-12 text-center text-xs text-slate-400 font-medium">
              Secure internship management platform
            </p>
          </div>
        ) : (
          /* Login Form Screen */
          <div className="flex min-h-[80vh] items-center justify-center">
            <div className="w-full max-w-md">
              <button
                onClick={handleBack}
                className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Portals
              </button>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                    {selectedPortal.id === "admin" && <ShieldCheck className="h-8 w-8 text-blue-400" />}
                    {selectedPortal.id === "mentor" && <UserRoundCheck className="h-8 w-8 text-purple-400" />}
                    {selectedPortal.id === "student" && <GraduationCap className="h-8 w-8 text-emerald-400" />}
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h1 className="text-2xl font-bold text-white">{selectedPortal.title}</h1>
                  <p className="mt-1 text-xs text-slate-400">
                    Sign in to continue to your dashboard
                  </p>
                </div>

                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Username
                    </label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3 pl-10 pr-4 text-xs text-white outline-none transition focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                    <div className="relative mt-1.5">
                      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3 pl-10 pr-4 text-xs text-white outline-none transition focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </button>
                </form>

                <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Test Account Credentials
                  </p>
                  {selectedPortal.id === "admin" && (
                    <p className="text-xs text-slate-300">
                      Username: <span className="font-bold text-blue-400">admin</span> • Password: <span className="font-bold text-blue-400">1234</span>
                    </p>
                  )}
                  {selectedPortal.id === "mentor" && (
                    <p className="text-xs text-slate-300">
                      Username: <span className="font-bold text-purple-400">mentor1</span> • Password: <span className="font-bold text-purple-400">1234</span>
                    </p>
                  )}
                  {selectedPortal.id === "student" && (
                    <p className="text-xs text-slate-300">
                      Username: <span className="font-bold text-emerald-400">student1</span> • Password: <span className="font-bold text-emerald-400">1234</span>
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                InternTrack © 2026
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
