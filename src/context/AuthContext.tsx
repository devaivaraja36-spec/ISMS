import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "../types";

export interface AuthUser {
  username: string;
  password?: string;
  role: UserRole;
  name: string;
  email?: string;
  phone?: string;
  department?: string;
  bio?: string;
}

interface LoginResult {
  success: boolean;
  message?: string;
  user?: AuthUser;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
  updateUser: (updatedData: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const users: AuthUser[] = [
  {
    username: "student1",
    password: "1234",
    role: "student",
    name: "Arun Kumar",
  },
  {
    username: "mentor1",
    password: "1234",
    role: "mentor",
    name: "Dr. Priya Sharma",
  },
  {
    username: "admin",
    password: "1234",
    role: "admin",
    name: "System Administrator",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, password: string): LoginResult => {
    const foundUser = users.find(
      (item) => item.username === username && item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));

    return {
      success: true,
      user: foundUser,
    };
  };

  const updateUser = (updatedData: Partial<AuthUser>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
