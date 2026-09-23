import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Save,
  RotateCcw,
  Lock,
  KeyRound,
  Monitor,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import PasswordResetModal from "../../components/modals/PasswordResetModal";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

interface ToggleSettingProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface InfoCardProps {
  title: string;
  value: string;
  valueClass?: string;
}

function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [settings, setSettings] = useState({
    systemName: "InternTrack",
    institutionName: "Internship Monitoring System",
    adminName: "System Administrator",
    adminEmail: "admin@interntrack.com",
    emailNotifications: true,
    memoNotifications: true,
    progressNotifications: true,
    loginAlerts: true,
    twoFactor: false,
    sessionTimeout: "30",
  });

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      systemName: "InternTrack",
      institutionName: "Internship Monitoring System",
      adminName: "System Administrator",
      adminEmail: "admin@interntrack.com",
      emailNotifications: true,
      memoNotifications: true,
      progressNotifications: true,
      loginAlerts: true,
      twoFactor: false,
      sessionTimeout: "30",
    });
  };

  const menuItems: MenuItem[] = [
    {
      id: "general",
      name: "General",
      description: "Basic system settings",
      icon: SettingsIcon,
    },
    {
      id: "administrator",
      name: "Administrator",
      description: "Admin account details",
      icon: User,
    },
    {
      id: "notifications",
      name: "Notifications",
      description: "Notification preferences",
      icon: Bell,
    },
    {
      id: "security",
      name: "Security",
      description: "Security and login settings",
      icon: Shield,
    },
    {
      id: "system",
      name: "System",
      description: "Application information",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar />

      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <SettingsIcon className="h-6 w-6 text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="mt-1 text-slate-400">
                Manage system preferences and administrator settings.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* SETTINGS MENU */}
          <div className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Settings
            </p>

            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-2 ${
                        isActive ? "bg-white/10" : "bg-slate-800"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p
                        className={`mt-0.5 text-xs ${
                          isActive ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SETTINGS CONTENT */}
          <div className="lg:col-span-2">
            {/* GENERAL */}
            {activeSection === "general" && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <SettingsIcon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        General Settings
                      </h2>
                      <p className="text-sm text-slate-500">
                        Configure basic system information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      System Name
                    </label>
                    <input
                      type="text"
                      value={settings.systemName}
                      onChange={(e) =>
                        handleChange("systemName", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      value={settings.institutionName}
                      onChange={(e) =>
                        handleChange("institutionName", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">
                          Internship Monitoring System
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Central administration panel for InternTrack.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ADMINISTRATOR */}
            {activeSection === "administrator" && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Administrator Profile
                      </h2>
                      <p className="text-sm text-slate-500">
                        Manage administrator account information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {settings.adminName}
                      </p>
                      <p className="text-sm text-slate-500">
                        System Administrator
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Administrator Name
                      </label>
                      <input
                        type="text"
                        value={settings.adminName}
                        onChange={(e) =>
                          handleChange("adminName", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) =>
                          handleChange("adminEmail", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Account Role
                    </p>
                    <p className="mt-2 font-medium text-white">Administrator</p>
                  </div>
                </div>
              </section>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-500/10 p-2">
                      <Bell className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Notification Preferences
                      </h2>
                      <p className="text-sm text-slate-500">
                        Choose which notifications the administrator receives.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-800">
                  <ToggleSetting
                    title="Email Notifications"
                    description="Receive important system notifications by email."
                    checked={settings.emailNotifications}
                    onChange={(value) =>
                      handleChange("emailNotifications", value)
                    }
                  />

                  <ToggleSetting
                    title="Work Memo Notifications"
                    description="Notify when students submit work memos."
                    checked={settings.memoNotifications}
                    onChange={(value) =>
                      handleChange("memoNotifications", value)
                    }
                  />

                  <ToggleSetting
                    title="Progress Notifications"
                    description="Receive alerts when student progress changes."
                    checked={settings.progressNotifications}
                    onChange={(value) =>
                      handleChange("progressNotifications", value)
                    }
                  />

                  <ToggleSetting
                    title="Login Alerts"
                    description="Receive alerts for administrator login activity."
                    checked={settings.loginAlerts}
                    onChange={(value) => handleChange("loginAlerts", value)}
                  />
                </div>
              </section>
            )}

            {/* SECURITY */}
            {activeSection === "security" && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-red-500/10 p-2">
                      <Shield className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        Security Settings
                      </h2>
                      <p className="text-sm text-slate-500">
                        Manage administrator login and security options.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <KeyRound className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          Administrator Password
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Change your administrator login password.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsResetModalOpen(true)}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500"
                    >
                      Change Password
                    </button>
                  </div>

                  <ToggleSetting
                    title="Two-Factor Authentication"
                    description="Add an additional security layer to administrator login."
                    checked={settings.twoFactor}
                    onChange={(value) => handleChange("twoFactor", value)}
                  />

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-red-400" />
                      <div>
                        <p className="font-medium text-white">
                          Session Timeout
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Automatically end inactive administrator sessions.
                        </p>
                      </div>
                    </div>

                    <select
                      value={settings.sessionTimeout}
                      onChange={(e) =>
                        handleChange("sessionTimeout", e.target.value)
                      }
                      className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {/* SYSTEM */}
            {activeSection === "system" && (
              <section className="rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <Database className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        System Information
                      </h2>
                      <p className="text-sm text-slate-500">
                        View current application information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  <InfoCard title="Application" value="InternTrack" />
                  <InfoCard title="Version" value="1.0.0" />
                  <InfoCard title="Frontend" value="React + Vite" />
                  <InfoCard title="Styling" value="Tailwind CSS" />
                  <InfoCard
                    title="Backend"
                    value="Django"
                    valueClass="text-yellow-400"
                  />
                  <InfoCard
                    title="Database"
                    value="Coming with Django"
                    valueClass="text-yellow-400"
                  />
                </div>

                <div className="border-t border-slate-800 p-6">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                    <div className="flex gap-3">
                      <Database className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">
                          Backend Integration
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Database persistence, authentication, email
                          notifications and other server-side features will be
                          connected when the Django backend is implemented.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                <Save className="h-4 w-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
        <PasswordResetModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          userRole="Admin"
        />
      </main>
    </div>
  );
}

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between gap-6 p-5">
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function InfoCard({ title, value, valueClass = "text-white" }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{title}</p>
      <p className={`mt-2 font-medium ${valueClass}`}>{value}</p>
    </div>
  );
}

export default Settings;
