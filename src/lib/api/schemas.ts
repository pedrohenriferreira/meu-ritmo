import { z } from 'zod';

// ==================== VALIDATION SCHEMAS ====================

// User & Profile
export const userProfileSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  weight: z.number().positive().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.enum(['masculino', 'feminino', 'outro', 'prefiro-nao-dizer']).optional(),
  preferences: z.object({
    dailyStepsGoal: z.number().int().positive(),
    dailyWaterGoal: z.number().positive().optional(),
    notifications: z.boolean(),
  }),
});

// Workout Type (User Custom Configuration)
export const workoutTypeSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.enum(['cardio', 'musculacao', 'funcional', 'esporte', 'yoga', 'outro']),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  defaultDuration: z.number().int().positive().optional(),
  defaultIntensity: z.number().int().min(1).max(10).optional(),
  isActive: z.boolean().default(true),
});

// Workout Activity
export const workoutActivitySchema = z.object({
  workoutTypeId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().int().min(10), // RB10: mínimo 10 minutos
  intensity: z.number().int().min(1).max(10),
  calories: z.number().int().positive().optional(),
  notes: z.string().max(500).optional(),
});

// Sleep Record
export const sleepRecordSchema = z.object({
  date: z.string().datetime(),
  bedTime: z.string().datetime(),
  wakeTime: z.string().datetime(),
  quality: z.number().int().min(1).max(5),
  interruptions: z.number().int().min(0).optional(),
  notes: z.string().max(500).optional(),
}).refine((data) => {
  const bed = new Date(data.bedTime);
  const wake = new Date(data.wakeTime);
  return wake > bed;
}, {
  message: "Wake time must be after bed time",
});

// Water Intake
export const waterIntakeSchema = z.object({
  date: z.string().datetime(),
  amount: z.number().int().positive(), // ml
});

// Nutrition Record
export const nutritionRecordSchema = z.object({
  date: z.string().datetime(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  description: z.string().min(1).max(200),
  calories: z.number().int().positive().optional(),
  protein: z.number().positive().optional(),
  carbs: z.number().positive().optional(),
  fat: z.number().positive().optional(),
});

// Mood Record
export const moodRecordSchema = z.object({
  date: z.string().datetime(),
  mood: z.number().int().min(1).max(5),
  stress: z.number().int().min(1).max(10),
  anxiety: z.number().int().min(1).max(10).optional(),
  energy: z.number().int().min(1).max(10).optional(),
  notes: z.string().max(500).optional(),
  triggers: z.array(z.string()).optional(),
});

// Mental Activity Type (User Custom Configuration)
export const mentalActivityTypeSchema = z.object({
  name: z.string().min(1).max(50),
  category: z.enum(['meditacao', 'leitura', 'journaling', 'terapia', 'hobby', 'social', 'outro']),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  targetFrequency: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

// Mental Activity
export const mentalActivitySchema = z.object({
  activityTypeId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().int().positive(),
  notes: z.string().max(500).optional(),
});

// Transaction Category (User Custom Configuration)
export const transactionCategorySchema = z.object({
  name: z.string().min(1).max(50),
  type: z.enum(['income', 'expense']),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  monthlyBudget: z.number().positive().optional(),
  isActive: z.boolean().default(true),
});

// Transaction
export const transactionSchema = z.object({
  categoryId: z.string().uuid(),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  description: z.string().min(1).max(200),
  date: z.string().datetime(),
  isRecurring: z.boolean().default(false),
  recurringFrequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  tags: z.array(z.string()).optional(),
});

// Financial Goal
export const financialGoalSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['savings', 'debt', 'investment', 'budget']),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0).default(0),
  deadline: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// Goal
export const goalSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['physical', 'mental', 'financial', 'custom']),
  type: z.enum(['weekly', 'monthly', 'yearly', 'custom']),
  target: z.number().positive(),
  unit: z.string().min(1).max(20),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// Habit
export const habitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['physical', 'mental', 'financial', 'productivity', 'social', 'custom']),
  frequency: z.enum(['daily', 'weekly', 'custom']),
  targetDays: z.array(z.number().int().min(0).max(6)).optional(),
  reminderTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
});

// Dashboard Widget
export const dashboardWidgetSchema = z.object({
  widgetType: z.enum(['kpi', 'chart', 'list', 'progress', 'calendar', 'custom']),
  title: z.string().min(1).max(50),
  dataSource: z.string().min(1),
  size: z.enum(['small', 'medium', 'large', 'full']),
  isVisible: z.boolean().default(true),
  config: z.record(z.any()),
});

// User Settings
export const userSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'auto']).default('dark'),
  language: z.string().default('pt-BR'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  timeFormat: z.enum(['12h', '24h']).default('24h'),
  firstDayOfWeek: z.enum([0, 1]).default(0),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  reminderNotifications: z.boolean().default(true),
  weeklyReport: z.boolean().default(true),
  monthlyReport: z.boolean().default(true),
  profileVisibility: z.enum(['private', 'friends', 'public']).default('private'),
  dataSharing: z.boolean().default(false),
  enablePhysicalHealth: z.boolean().default(true),
  enableMentalHealth: z.boolean().default(true),
  enableFinancialHealth: z.boolean().default(true),
  dataRetentionDays: z.number().int().positive().optional(),
  autoBackup: z.boolean().default(false),
});

// Query Parameters
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const dateRangeSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
}).refine((data) => {
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "End date must be after or equal to start date",
});

// Statistics Query
export const statisticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  metrics: z.array(z.string()).optional(),
});

// Export for type inference
export type WorkoutTypeInput = z.infer<typeof workoutTypeSchema>;
export type WorkoutActivityInput = z.infer<typeof workoutActivitySchema>;
export type SleepRecordInput = z.infer<typeof sleepRecordSchema>;
export type WaterIntakeInput = z.infer<typeof waterIntakeSchema>;
export type NutritionRecordInput = z.infer<typeof nutritionRecordSchema>;
export type MoodRecordInput = z.infer<typeof moodRecordSchema>;
export type MentalActivityTypeInput = z.infer<typeof mentalActivityTypeSchema>;
export type MentalActivityInput = z.infer<typeof mentalActivitySchema>;
export type TransactionCategoryInput = z.infer<typeof transactionCategorySchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
export type FinancialGoalInput = z.infer<typeof financialGoalSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
export type HabitInput = z.infer<typeof habitSchema>;
export type DashboardWidgetInput = z.infer<typeof dashboardWidgetSchema>;
export type UserSettingsInput = z.infer<typeof userSettingsSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
export type DateRangeParams = z.infer<typeof dateRangeSchema>;
export type StatisticsQueryParams = z.infer<typeof statisticsQuerySchema>;
