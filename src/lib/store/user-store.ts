// Armazenamento temporário em memória (substituir por banco de dados em produção)

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Em produção, use hash bcrypt
  birthdate?: string;
  gender?: string;
  weight?: number;
  height?: number;
  pillars?: {
    physical: boolean;
    mental: boolean;
    financial: boolean;
  };
  avatar?: string;
  createdAt: string;
}

// Map compartilhado entre todas as rotas da API
const users = new Map<string, User>([
  ["admin@example.com", {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "Admin123",
    createdAt: new Date().toISOString(),
  }]
]);

export const userStore = {
  getByEmail(email: string): User | undefined {
    return users.get(email);
  },

  getById(id: string): User | undefined {
    for (const user of users.values()) {
      if (user.id === id) {
        return user;
      }
    }
    return undefined;
  },

  create(user: User): void {
    users.set(user.email, user);
  },

  emailExists(email: string): boolean {
    return users.has(email);
  },

  getAll(): User[] {
    return Array.from(users.values());
  },
};
