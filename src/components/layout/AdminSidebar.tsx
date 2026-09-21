import React from "react";
import {
  LayoutDashboard,
  Users,
  UserRoundCheck,
  Briefcase,
  Calendar as CalendarIcon,
  UploadCloud,
  FileText,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mode, toggleMode } = useTheme();

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Calendar & Deadlines",
      path: "/admin/calendar",
      icon: CalendarIcon,
    },
    {
      name: "File Uploads",
      path: "/admin/files",
      icon: UploadCloud,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: Users,
    },
    {
      name: "Mentors",
      path: "/admin/mentors",
      icon: UserRoundCheck,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: Briefcase,
    },
    {
      name: "Work Memos",
      path: "/admin/memos",
      icon: FileText,
    },
    {
      name: "Progress",
      path: "/admin/progress",
      icon: TrendingUp,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            <p className="text-[11px] text-slate-400">Admin Panel</p>
          </div>
        </div>

        <button
          onClick={toggleMode}
          className="shrink-0 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition max-w-0 opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 overflow-hidden"
          title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
        >
          {mode === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-purple-400" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 overflow-x-hidden space-y-1">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
          Management
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              title={item.name}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
                {item.name}
              </span>
            </NavLink>
          );
        })}

        {/* Settings */}
        <div className="pt-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            System
          </p>

          <NavLink
            to="/admin/settings"
            title="Settings & Security"
            className={({ isActive }) =>
              `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Settings className="h-5 w-5 shrink-0" />
            <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
              Settings & Security
            </span>
          </NavLink>
        </div>
      </nav>

      {/* Admin Profile / Logout */}
      <div className="border-t border-slate-800/80 p-3 overflow-hidden">
        <div className="mb-2 flex items-center rounded-xl bg-slate-900 p-2 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow">
            A
          </div>

          <div className="min-w-0 ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            <p className="truncate text-xs font-semibold text-white">
              System Admin
            </p>
            <p className="text-[10px] text-slate-400">Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex w-full items-center rounded-xl px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="ml-3 whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[170px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
