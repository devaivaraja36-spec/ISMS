import React from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Activity,
  BarChart3,
  FolderKanban,
  Calendar as CalendarIcon,
  UploadCloud,
  Settings,
  LogOut,
  User,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/student",
    },
    {
      name: "Calendar & Deadlines",
      icon: CalendarIcon,
      path: "/student/calendar",
    },
    {
      name: "File Uploads",
      icon: UploadCloud,
      path: "/student/files",
    },
    {
      name: "My Tasks",
      icon: ClipboardList,
      path: "/student/tasks",
    },
    {
      name: "Daily Activity",
      icon: Activity,
      path: "/student/activity",
    },
    {
      name: "Progress",
      icon: BarChart3,
      path: "/student/progress",
    },
    {
      name: "Project",
      icon: FolderKanban,
      path: "/student/project",
    },
  ];

  return (
    <aside className="sidebar-container group fixed left-4 top-4 bottom-4 z-50 flex w-20 hover:w-64 flex-col rounded-3xl vision-glass-pill transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-900/40 overflow-hidden">
      {/* Logo */}
      <div className="border-b border-white/10 p-3.5 flex items-center justify-between min-h-[72px] overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-bold text-white shadow-md shadow-blue-600/20">
            IT
          </div>
          <div className="whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            <h1 className="text-lg font-bold text-white leading-tight">
              Intern<span className="text-blue-500">Track</span>
            </h1>
            <p className="text-[11px] text-slate-400">Student Portal</p>
          </div>
        </div>

        {/* Quick Theme Toggle */}
        <button
          onClick={toggleMode}
          className="shrink-0 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition max-w-0 opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 overflow-hidden"
          title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
        >
          {mode === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-purple-400" />}
        </button>
      </div>

      {/* User */}
      <div className="border-b border-slate-800/80 p-3 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md">
            <User size={20} />
          </div>

          <div className="min-w-0 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Student"}
            </p>
            <p className="text-xs capitalize text-slate-400">
              {user?.role || "student"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto p-3 overflow-x-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              title={item.name}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-slate-800/80 p-3 space-y-1 overflow-hidden">
        <button
          onClick={() => navigate("/student/profile")}
          title="Profile & Security"
          className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Settings size={20} className="shrink-0" />
          <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            Profile & Security
          </span>
        </button>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={20} className="shrink-0" />
          <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
