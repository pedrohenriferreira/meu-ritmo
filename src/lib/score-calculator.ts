import {
  PhysicalHealthScore,
  MentalHealthScore,
  FinancialScore,
  Workout,
  Sleep,
  Hydration,
  Steps,
  Nutrition,
  Mood,
  Stress,
  WellnessHabit,
  Budget,
  FinancialTransaction,
  Debt,
} from '@/types';

// ============================================
// CÁLCULO DE SCORE: SAÚDE FÍSICA (RB14)
// ============================================

/**
 * Calcula o score de saúde física baseado em:
 * - Frequência semanal de treinos (40%)
 * - Sono (25%)
 * - Hidratação (15%)
 * - Passos/atividade diária (10%)
 * - Nutrição (10%)
 */
export function calculatePhysicalHealthScore(
  userId: string,
  date: Date,
  workouts: Workout[],
  sleep: Sleep | null,
  hydration: Hydration | null,
  steps: Steps | null,
  nutrition: Nutrition | null
): PhysicalHealthScore {
  // 1. Frequência de treinos (40%) - RB10
  // Considera últimos 7 dias, ideal = 4-5 treinos/semana
  const validWorkouts = workouts.filter(w => w.duration >= 10); // RB10: mínimo 10min
  const workoutScore = Math.min((validWorkouts.length / 5) * 100, 100);
  const workoutWeight = workoutScore * 0.4;

  // 2. Sono (25%) - RB12
  let sleepScore = 0;
  if (sleep) {
    if (sleep.hours < 4) {
      sleepScore = 20; // alerta de saúde
    } else if (sleep.hours >= 6 && sleep.hours <= 8) {
      sleepScore = 100; // ideal
    } else if (sleep.hours >= 8 && sleep.hours <= 9) {
      sleepScore = 90;
    } else if (sleep.hours >= 4 && sleep.hours < 6) {
      sleepScore = 60;
    } else {
      sleepScore = 70;
    }
    // Considera qualidade do sono
    sleepScore = (sleepScore + (sleep.quality * 20)) / 2;
  }
  const sleepWeight = sleepScore * 0.25;

  // 3. Hidratação (15%) - RB13
  let hydrationScore = 0;
  if (hydration) {
    const percentage = (hydration.liters / hydration.goalLiters) * 100;
    if (percentage >= 80 && percentage <= 120) {
      hydrationScore = 100;
    } else if (percentage >= 60 && percentage < 80) {
      hydrationScore = 70;
    } else if (percentage < 60) {
      hydrationScore = Math.max(percentage, 20);
    } else {
      hydrationScore = 80; // mais de 120%
    }
  }
  const hydrationWeight = hydrationScore * 0.15;

  // 4. Passos (10%)
  let stepsScore = 0;
  if (steps) {
    const percentage = (steps.steps / steps.goal) * 100;
    stepsScore = Math.min(percentage, 100);
  }
  const stepsWeight = stepsScore * 0.1;

  // 5. Nutrição (10%)
  let nutritionScore = 0;
  if (nutrition) {
    // Qualidade nutricional (1-5) convertida para 0-100
    nutritionScore = (nutrition.quality / 5) * 100;
  }
  const nutritionWeight = nutritionScore * 0.1;

  // Score final
  const totalScore = Math.round(
    workoutWeight + sleepWeight + hydrationWeight + stepsWeight + nutritionWeight
  );

  return {
    userId,
    date,
    score: totalScore,
    breakdown: {
      workoutFrequency: Math.round(workoutScore),
      sleep: Math.round(sleepScore),
      hydration: Math.round(hydrationScore),
      steps: Math.round(stepsScore),
      nutrition: Math.round(nutritionScore),
    },
    timestamp: new Date(),
  };
}

// ============================================
// CÁLCULO DE SCORE: SAÚDE MENTAL (RB23)
// ============================================

/**
 * Calcula o score de saúde mental baseado em:
 * - Humor (40%)
 * - Estresse (20%)
 * - Qualidade do sono (20%)
 * - Hábitos de bem-estar (20%)
 */
export function calculateMentalHealthScore(
  userId: string,
  date: Date,
  mood: Mood | null,
  stress: Stress | null,
  sleep: Sleep | null,
  wellnessHabits: WellnessHabit[]
): MentalHealthScore {
  // 1. Humor (40%) - RB20
  let moodScore = 0;
  if (mood) {
    moodScore = (mood.level / 5) * 100;
  }
  const moodWeight = moodScore * 0.4;

  // 2. Estresse (20%) - RB21
  // Invertido: menos estresse = mais pontos
  let stressScore = 0;
  if (stress) {
    stressScore = ((6 - stress.level) / 5) * 100;
  }
  const stressWeight = stressScore * 0.2;

  // 3. Qualidade do sono (20%) - RB12
  let sleepQualityScore = 0;
  if (sleep) {
    sleepQualityScore = (sleep.quality / 5) * 100;
  }
  const sleepWeight = sleepQualityScore * 0.2;

  // 4. Hábitos de bem-estar (20%) - RB22
  // Cada hábito concluído gera pontos
  const completedHabits = wellnessHabits.filter(h => h.completed).length;
  const maxHabits = 4; // leitura, meditação, journaling, tempo offline
  const habitsScore = (completedHabits / maxHabits) * 100;
  const habitsWeight = habitsScore * 0.2;

  // Score final
  const totalScore = Math.round(
    moodWeight + stressWeight + sleepWeight + habitsWeight
  );

  return {
    userId,
    date,
    score: totalScore,
    breakdown: {
      mood: Math.round(moodScore),
      stress: Math.round(stressScore),
      sleepQuality: Math.round(sleepQualityScore),
      wellnessHabits: Math.round(habitsScore),
    },
    timestamp: new Date(),
  };
}

// ============================================
// CÁLCULO DE SCORE: SAÚDE FINANCEIRA (RB33)
// ============================================

/**
 * Calcula o score financeiro baseado em:
 * - Gastos vs orçamento (40%)
 * - Regularidade de registro (20%)
 * - Aportes mensais / reserva (20%)
 * - Dívidas em andamento (20%)
 */
export function calculateFinancialScore(
  userId: string,
  date: Date,
  budgets: Budget[],
  transactions: FinancialTransaction[],
  savings: number,
  savingsGoal: number,
  debts: Debt[]
): FinancialScore {
  // 1. Gastos vs orçamento (40%) - RB32
  let budgetScore = 0;
  if (budgets.length > 0) {
    const scores = budgets.map(budget => {
      const percentage = (budget.spent / budget.limit) * 100;
      if (percentage <= 80) return 100;
      if (percentage <= 100) return 70;
      return 30;
    });
    budgetScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  } else {
    budgetScore = 50; // neutro se não tem orçamento definido
  }
  const budgetWeight = budgetScore * 0.4;

  // 2. Regularidade de registro (20%)
  // Considera últimos 30 dias
  const daysWithRecords = new Set(
    transactions.map(t => t.date.toISOString().split('T')[0])
  ).size;
  const recordConsistencyScore = Math.min((daysWithRecords / 30) * 100, 100);
  const recordWeight = recordConsistencyScore * 0.2;

  // 3. Aportes/reserva (20%)
  let savingsScore = 0;
  if (savingsGoal > 0) {
    const percentage = (savings / savingsGoal) * 100;
    savingsScore = Math.min(percentage, 100);
  } else {
    savingsScore = savings > 0 ? 70 : 30;
  }
  const savingsWeight = savingsScore * 0.2;

  // 4. Dívidas (20%)
  let debtsScore = 100;
  if (debts.length > 0) {
    const activeDebts = debts.filter(d => d.status === 'ativa');
    const overdueDebts = debts.filter(d => d.status === 'atrasada');
    
    if (overdueDebts.length > 0) {
      debtsScore = 20;
    } else if (activeDebts.length > 0) {
      const avgPaidPercentage = activeDebts.reduce((acc, debt) => {
        return acc + (debt.paidAmount / debt.totalAmount);
      }, 0) / activeDebts.length;
      debtsScore = avgPaidPercentage * 100;
    }
  }
  const debtsWeight = debtsScore * 0.2;

  // Score final
  const totalScore = Math.round(
    budgetWeight + recordWeight + savingsWeight + debtsWeight
  );

  return {
    userId,
    date,
    score: totalScore,
    breakdown: {
      budgetCompliance: Math.round(budgetScore),
      recordConsistency: Math.round(recordConsistencyScore),
      savings: Math.round(savingsScore),
      debts: Math.round(debtsScore),
    },
    timestamp: new Date(),
  };
}

// ============================================
// UTILITÁRIOS DE CÁLCULO
// ============================================

/**
 * Calcula meta diária de água baseada no peso (RB13)
 * Fórmula: 35ml × peso corporal
 */
export function calculateDailyWaterGoal(weightKg: number): number {
  return (weightKg * 35) / 1000; // retorna em litros
}

/**
 * Verifica se treino é válido (RB10)
 * Mínimo de 10 minutos
 */
export function isValidWorkout(workout: Workout): boolean {
  return workout.duration >= 10;
}

/**
 * Verifica se sono está em alerta (RB12)
 */
export function isSleepAlert(sleep: Sleep): boolean {
  return sleep.hours < 4;
}

/**
 * Verifica se orçamento está próximo do limite (RB32)
 */
export function shouldSendBudgetAlert(budget: Budget): {
  alert80: boolean;
  blocked: boolean;
} {
  const percentage = (budget.spent / budget.limit) * 100;
  return {
    alert80: percentage >= 80 && percentage < 100,
    blocked: percentage >= 100,
  };
}
