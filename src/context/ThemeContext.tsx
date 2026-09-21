import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type ThemeMode = "light" | "dark";
export type ThemeName =
  | "default"
  | "ocean"
  | "sunset"
  | "forest"
  | "lavender";

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryGlow: string;
  secondary: string;
  accent: string;
}

interface ThemeConfig {
  name: ThemeName;
  label: string;
  light: ThemeColors;
  dark: ThemeColors;
}

interface ThemeContextType {
  mode: ThemeMode;
  theme: ThemeName;
  themes: ThemeConfig[];
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeName) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const themeConfigs: ThemeConfig[] = [
  {
    name: "default",
    label: "Default",
    light: {
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      primaryGlow: "rgba(37, 99, 235, 0.15)",
      secondary: "#64748b",
      accent: "#8b5cf6",
    },
    dark: {
      primary: "#3b82f6",
      primaryHover: "#60a5fa",
      primaryGlow: "rgba(59, 130, 246, 0.2)",
      secondary: "#94a3b8",
      accent: "#a78bfa",
    },
  },
  {
    name: "ocean",
    label: "Ocean",
    light: {
      primary: "#0ea5e9",
      primaryHover: "#0284c7",
      primaryGlow: "rgba(14, 165, 233, 0.15)",
      secondary: "#0284c7",
      accent: "#06b6d4",
    },
    dark: {
      primary: "#06b6d4",
      primaryHover: "#22d3ee",
      primaryGlow: "rgba(6, 182, 212, 0.2)",
      secondary: "#7dd3fc",
      accent: "#22d3ee",
    },
  },
  {
    name: "sunset",
    label: "Sunset",
    light: {
      primary: "#f97316",
      primaryHover: "#ea580c",
      primaryGlow: "rgba(249, 115, 22, 0.15)",
      secondary: "#dc2626",
      accent: "#ec4899",
    },
    dark: {
      primary: "#fb923c",
      primaryHover: "#fdba74",
      primaryGlow: "rgba(251, 146, 60, 0.2)",
      secondary: "#fca5a5",
      accent: "#f472b6",
    },
  },
  {
    name: "forest",
    label: "Forest",
    light: {
      primary: "#16a34a",
      primaryHover: "#15803d",
      primaryGlow: "rgba(22, 163, 74, 0.15)",
      secondary: "#059669",
      accent: "#0ea5e9",
    },
    dark: {
      primary: "#22c55e",
      primaryHover: "#4ade80",
      primaryGlow: "rgba(34, 197, 94, 0.2)",
      secondary: "#6ee7b7",
      accent: "#38bdf8",
    },
  },
  {
    name: "lavender",
    label: "Lavender",
    light: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      primaryGlow: "rgba(124, 58, 237, 0.15)",
      secondary: "#0ea5e9",
      accent: "#ec4899",
    },
    dark: {
      primary: "#a78bfa",
      primaryHover: "#c4b5fd",
      primaryGlow: "rgba(167, 139, 250, 0.2)",
      secondary: "#93c5fd",
      accent: "#f0abfc",
    },
  },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [theme, setTheme] = useState<ThemeName>("default");

  // Load saved preferences
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode | null;
    const savedTheme = localStorage.getItem("themeName") as ThemeName | null;
    if (savedMode) setMode(savedMode);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("themeName", theme);
  }, [mode, theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const config = themeConfigs.find((t) => t.name === theme)!;
    const colors = config[mode];

    root.setAttribute("data-theme-mode", mode);
    root.setAttribute("data-theme-name", theme);

    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-primary-hover", colors.primaryHover);
    root.style.setProperty("--theme-primary-glow", colors.primaryGlow);
    root.style.setProperty("--theme-secondary", colors.secondary);
    root.style.setProperty("--theme-accent", colors.accent);

    if (mode === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [mode, theme]);

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        themes: themeConfigs,
        setMode,
        setTheme,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}