// ============================================
// TIPOS PRINCIPAIS DO SISTEMA
// ============================================

export type UserId = string; // UID do Firebase/Auth

// ============================================
// PILAR: SAÚDE FÍSICA (RB10-RB14)
// ============================================

export interface Workout {
  id: string;
  userId: UserId;
  date: Date;
  type: 'cardio' | 'musculacao' | 'funcional' | 'esporte' | 'yoga' | 'outro';
  intensity: 'baixa' | 'media' | 'alta' | 'muito-alta';
  duration: number; // minutos (mínimo 10 para ser válido - RB10)
  calories?: number;
  notes?: string;
  timestamp: Date; // RB02
}

export interface Weight {
  id: string;
  userId: UserId;
  date: Date;
  weight: number; // kg
  timestamp: Date; // RB02
  // RB11: apenas último registro diário conta
}

export interface Sleep {
  id: string;
  userId: UserId;
  date: Date;
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5; // 1=péssima, 5=excelente
  timestamp: Date; // RB02
  // RB12: < 4h = alerta, 6-8h = ideal
}

export interface Hydration {
  id: string;
  userId: UserId;
  date: Date;
  liters: number;
  goalLiters: number; // RB13: 35ml × peso corporal
  timestamp: Date; // RB02
}

export interface Steps {
  id: string;
  userId: UserId;
  date: Date;
  steps: number;
  goal: number; // meta diária
  timestamp: Date; // RB02
}

export interface Nutrition {
  id: string;
  userId: UserId;
  date: Date;
  meals: number; // quantidade de refeições
  quality: 1 | 2 | 3 | 4 | 5; // qualidade nutricional
  timestamp: Date; // RB02
}

// RB14: Score de Saúde Física
export interface PhysicalHealthScore {
  userId: UserId;
  date: Date;
  score: number; // 0-100
  breakdown: {
    workoutFrequency: number; // 40%
    sleep: number; // 25%
    hydration: number; // 15%
    steps: number; // 10%
    nutrition: number; // 10%
  };
  timestamp: Date;
}

// ============================================
// PILAR: SAÚDE MENTAL (RB20-RB24)
// ============================================

export interface Mood {
  id: string;
  userId: UserId;
  date: Date;
  level: 1 | 2 | 3 | 4 | 5; // 1=péssimo, 5=excelente
  notes?: string;
  timestamp: Date; // RB02
  // RB20: apenas um registro diário (último substitui)
}

export interface Stress {
  id: string;
  userId: UserId;
  date: Date;
  level: 1 | 2 | 3 | 4 | 5; // 1=baixo, 5=muito alto
  notes?: string;
  timestamp: Date; // RB02
  // RB21: > 4 durante 3 dias = insight de alerta
}

export type WellnessHabitType = 'leitura' | 'meditacao' | 'journaling' | 'tempo-offline';

export interface WellnessHabit {
  id: string;
  userId: UserId;
  date: Date;
  type: WellnessHabitType;
  duration?: number; // minutos
  completed: boolean;
  timestamp: Date; // RB02
  // RB22: cada hábito concluído gera pontos
}

// RB23: Score de Saúde Mental
export interface MentalHealthScore {
  userId: UserId;
  date: Date;
  score: number; // 0-100
  breakdown: {
    mood: number; // 40%
    stress: number; // 20%
    sleepQuality: number; // 20%
    wellnessHabits: number; // 20%
  };
  timestamp: Date;
}

// ============================================
// PILAR: SAÚDE FINANCEIRA (RB30-RB34)
// ============================================

export type ExpenseCategory =
  | 'moradia'
  | 'transporte'
  | 'alimentacao'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'vestuario'
  | 'outros'
  | string; // RB30: permite categorias personalizadas

export type PaymentMethod = 'dinheiro' | 'debito' | 'credito' | 'pix' | 'outros';

export interface FinancialTransaction {
  id: string;
  userId: UserId;
  date: Date;
  amount: number;
  category: ExpenseCategory;
  type: 'receita' | 'gasto';
  description?: string;
  paymentMethod?: PaymentMethod;
  timestamp: Date; // RB02
  // RB31: todos os campos obrigatórios exceto paymentMethod
}

export interface Budget {
  id: string;
  userId: UserId;
  month: string; // formato: YYYY-MM
  category: ExpenseCategory;
  limit: number;
  spent: number;
  alert80Sent: boolean; // RB32: alerta em 80%
  blocked: boolean; // RB32: bloqueio acima de 100%
  timestamp: Date;
}

export interface FinancialGoal {
  id: string;
  userId: UserId;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: ExpenseCategory;
  deadline: Date;
  status: 'em-andamento' | 'concluida' | 'cancelada';
  createdAt: Date;
  completedAt?: Date;
  // RB34: quando atinge 100% → status "concluída"
}

export interface Debt {
  id: string;
  userId: UserId;
  description: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: Date;
  status: 'ativa' | 'paga' | 'atrasada';
  timestamp: Date;
}

// RB33: Score Financeiro
export interface FinancialScore {
  userId: UserId;
  date: Date;
  score: number; // 0-100
  breakdown: {
    budgetCompliance: number; // 40%
    recordConsistency: number; // 20%
    savings: number; // 20%
    debts: number; // 20%
  };
  timestamp: Date;
}

// ============================================
// METAS (RB04)
// ============================================

export type GoalPeriod = 'semanal' | 'mensal';
export type GoalType = 'fisica' | 'mental' | 'financeira' | 'geral';

export interface Goal {
  id: string;
  userId: UserId;
  title: string;
  description?: string;
  type: GoalType;
  period: GoalPeriod;
  target: number;
  current: number;
  unit: string; // ex: 'treinos', 'litros', 'reais'
  startDate: Date;
  endDate: Date;
  status: 'em-andamento' | 'concluida' | 'falhou';
  createdAt: Date;
  completedAt?: Date;
  // RB04: semanal reinicia segunda, mensal reinicia dia 1
}

// ============================================
// INSIGHTS AUTOMÁTICOS (RB40-RB41)
// ============================================

export type InsightType = 'alerta' | 'recomendacao' | 'elogio' | 'correlacao';
export type InsightPriority = 'baixa' | 'media' | 'alta';

export interface Insight {
  id: string;
  userId: UserId;
  type: InsightType;
  priority: InsightPriority;
  title: string;
  message: string;
  relatedPillars: Array<'fisica' | 'mental' | 'financeira'>;
  data?: Record<string, any>; // dados que geraram o insight
  viewed: boolean; // RB41: não podem ser apagados, apenas marcados como visualizados
  createdAt: Date;
  viewedAt?: Date;
}

// ============================================
// GAMIFICAÇÃO (RB50-RB52)
// ============================================

export interface UserStreak {
  userId: UserId;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  // RB50: zera se não registrar nada em 24h
}

export interface UserXP {
  userId: UserId;
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  // RB51: cada meta concluída gera XP
}

export type AchievementType =
  | '7-dias-treino'
  | '30-dias-financas'
  | 'primeiro-mes-80'
  | 'streak-30'
  | 'todas-metas-mes'
  | string;

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirements: Record<string, any>;
}

export interface UserAchievement {
  userId: UserId;
  achievementId: string;
  unlockedAt: Date;
  // RB52: conquistas baseadas em padrões
}

// ============================================
// PERFIL DO USUÁRIO (RB01)
// ============================================

export interface UserProfile {
  userId: UserId;
  name: string;
  email: string;
  weight?: number; // para cálculo de hidratação
  dateOfBirth?: Date;
  gender?: 'masculino' | 'feminino' | 'outro' | 'prefiro-nao-dizer';
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    dailyStepsGoal: number;
    dailyWaterGoal?: number; // calculado automaticamente se peso definido
    notifications: boolean;
  };
  // RB01: cada usuário possui perfil único, não pode acessar dados de outros
}

// ============================================
// RELATÓRIOS (RB07)
// ============================================

export interface MonthlyReport {
  userId: UserId;
  month: string; // formato: YYYY-MM
  physicalScore: {
    average: number;
    evolution: number; // % comparado ao mês anterior
    highlights: string[];
  };
  mentalScore: {
    average: number;
    evolution: number;
    highlights: string[];
  };
  financialScore: {
    average: number;
    evolution: number;
    highlights: string[];
  };
  goalsCompleted: number;
  totalGoals: number;
  insights: Insight[];
  achievements: UserAchievement[];
  generatedAt: Date;
  // RB07: exportável com resumo de performance
}

// ============================================
// HISTÓRICO E AGREGAÇÕES (RB02)
// ============================================

export interface DailySnapshot {
  userId: UserId;
  date: Date;
  physicalScore?: number;
  mentalScore?: number;
  financialScore?: number;
  activitiesCount: number;
  timestamp: Date;
  // RB02: permite visualizar histórico por dia, semana, mês, ano
}

export type TimePeriod = 'dia' | 'semana' | 'mes' | 'ano';

export interface HistoricalData<T> {
  period: TimePeriod;
  data: T[];
  startDate: Date;
  endDate: Date;
}
