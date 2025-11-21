import { z } from "zod";

// Schemas de validação
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export const registerStep1Schema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Za-z]/, "Senha deve conter letras")
    .regex(/[0-9]/, "Senha deve conter números"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const registerStep2Schema = z.object({
  birthdate: z.string().min(1, "Data de nascimento é obrigatória"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  pillars: z.object({
    physical: z.boolean(),
    mental: z.boolean(),
    financial: z.boolean(),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterStep1Input = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Input = z.infer<typeof registerStep2Schema>;

// Tipos de resposta
export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

// Funções de API
export const authApi = {
  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = "Erro ao fazer login";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch {
        errorMessage = "API não disponível. Configure os endpoints de autenticação.";
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async register(
    step1Data: RegisterStep1Input,
    step2Data: RegisterStep2Input
  ): Promise<AuthResponse> {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...step1Data,
        ...step2Data,
      }),
    });

    if (!response.ok) {
      let errorMessage = "Erro ao criar conta";
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch {
        errorMessage = "API não disponível. Configure os endpoints de autenticação.";
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async loginWithGoogle(): Promise<AuthResponse> {
    // Implementar OAuth com Google
    throw new Error("Login com Google não implementado");
  },

  async logout(): Promise<void> {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer logout");
    }
  },

  async getCurrentUser(): Promise<AuthResponse["user"] | null> {
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
    
    if (!token) {
      return null;
    }

    const response = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  },
};
