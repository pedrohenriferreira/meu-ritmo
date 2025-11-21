"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi, type AuthResponse } from "@/lib/api/auth";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem("auth_token", response.token);
      setUser(response.user);
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  async function register(data: any) {
    try {
      const response = await authApi.register(data.step1, data.step2);
      localStorage.setItem("auth_token", response.token);
      setUser(response.user);
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await authApi.logout();
      localStorage.removeItem("auth_token");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  async function loginWithGoogle() {
    try {
      const response = await authApi.loginWithGoogle();
      localStorage.setItem("auth_token", response.token);
      setUser(response.user);
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
