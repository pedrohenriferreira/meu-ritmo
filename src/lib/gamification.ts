import { UserStreak, UserXP, Achievement, UserAchievement } from '@/types';

// ============================================
// SISTEMA DE GAMIFICAÇÃO (RB50-RB52)
// ============================================

/**
 * RB50: Gerencia streak de consistência
 * Zera se não registrar nada em 24h
 */
export function updateStreak(
  currentStreak: UserStreak,
  hadActivityToday: boolean,
  currentDate: Date = new Date()
): UserStreak {
  const lastActivity = new Date(currentStreak.lastActivityDate);
  const timeDiff = currentDate.getTime() - lastActivity.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  // Se passou 24h sem atividade, zera streak
  if (hoursDiff > 24 && !hadActivityToday) {
    return {
      ...currentStreak,
      currentStreak: 0,
      lastActivityDate: currentDate,
    };
  }

  // Se teve atividade hoje, incrementa
  if (hadActivityToday) {
    const newStreak = currentStreak.currentStreak + 1;
    return {
      ...currentStreak,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, currentStreak.longestStreak),
      lastActivityDate: currentDate,
    };
  }

  return currentStreak;
}

/**
 * RB51: Sistema de XP e níveis
 * Cada meta concluída gera XP
 */
export const XP_REWARDS = {
  META_SEMANAL_CONCLUIDA: 50,
  META_MENSAL_CONCLUIDA: 200,
  TREINO_COMPLETO: 10,
  HABITO_DIARIO: 5,
  STREAK_7_DIAS: 100,
  STREAK_30_DIAS: 500,
  SCORE_ACIMA_80: 30,
} as const;

/**
 * Calcula XP necessário para próximo nível
 * Fórmula: nível * 100 (cresce linearmente)
 */
export function calculateXPForNextLevel(currentLevel: number): number {
  return currentLevel * 100;
}

/**
 * Adiciona XP e verifica se subiu de nível
 */
export function addXP(
  currentXP: UserXP,
  xpToAdd: number
): UserXP & { leveledUp: boolean; newLevel?: number } {
  const newTotalXP = currentXP.totalXP + xpToAdd;
  let newLevel = currentXP.level;
  let xpToNext = currentXP.xpToNextLevel - xpToAdd;
  let leveledUp = false;

  // Verifica se subiu de nível (pode subir múltiplos níveis)
  while (xpToNext <= 0) {
    newLevel++;
    leveledUp = true;
    xpToNext = calculateXPForNextLevel(newLevel) + xpToNext;
  }

  return {
    userId: currentXP.userId,
    totalXP: newTotalXP,
    level: newLevel,
    xpToNextLevel: xpToNext,
    leveledUp,
    newLevel: leveledUp ? newLevel : undefined,
  };
}

/**
 * RB52: Conquistas disponíveis
 */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'achievement-7-dias-treino',
    type: '7-dias-treino',
    title: 'Guerreiro da Semana',
    description: '7 dias seguidos treinando',
    icon: '🏆',
    xpReward: 100,
    requirements: { consecutiveWorkouts: 7 },
  },
  {
    id: 'achievement-30-dias-financas',
    type: '30-dias-financas',
    title: 'Mestre das Finanças',
    description: '30 dias de finanças registradas',
    icon: '💰',
    xpReward: 300,
    requirements: { daysWithFinancialRecords: 30 },
  },
  {
    id: 'achievement-primeiro-mes-80',
    type: 'primeiro-mes-80',
    title: 'Performance Excepcional',
    description: 'Primeiro mês com score acima de 80',
    icon: '⭐',
    xpReward: 200,
    requirements: { monthlyScoreAbove: 80 },
  },
  {
    id: 'achievement-streak-30',
    type: 'streak-30',
    title: 'Disciplina de Ferro',
    description: '30 dias de streak sem quebrar',
    icon: '🔥',
    xpReward: 500,
    requirements: { streakDays: 30 },
  },
  {
    id: 'achievement-todas-metas-mes',
    type: 'todas-metas-mes',
    title: 'Perfeccionista',
    description: 'Completou todas as metas do mês',
    icon: '🎯',
    xpReward: 300,
    requirements: { allMonthlyGoalsCompleted: true },
  },
  {
    id: 'achievement-hidratacao-perfeita',
    type: 'hidratacao-perfeita',
    title: 'Hidratado Pro',
    description: '14 dias seguidos atingindo meta de água',
    icon: '💧',
    xpReward: 150,
    requirements: { consecutiveHydrationDays: 14 },
  },
  {
    id: 'achievement-meditacao-zen',
    type: 'meditacao-zen',
    title: 'Mente Zen',
    description: '21 dias seguidos de meditação',
    icon: '🧘',
    xpReward: 250,
    requirements: { consecutiveMeditationDays: 21 },
  },
  {
    id: 'achievement-orcamento-controlado',
    type: 'orcamento-controlado',
    title: 'Economista Nato',
    description: '3 meses seguidos dentro do orçamento',
    icon: '📊',
    xpReward: 400,
    requirements: { monthsWithBudgetControl: 3 },
  },
];

/**
 * Verifica se usuário desbloqueou uma conquista
 */
export function checkAchievementUnlock(
  achievement: Achievement,
  userStats: Record<string, any>
): boolean {
  const reqs = achievement.requirements;

  // Verifica cada requisito
  for (const [key, value] of Object.entries(reqs)) {
    if (userStats[key] === undefined) return false;
    
    if (typeof value === 'number') {
      if (userStats[key] < value) return false;
    } else if (typeof value === 'boolean') {
      if (userStats[key] !== value) return false;
    }
  }

  return true;
}

/**
 * Desbloqueia conquista para usuário
 */
export function unlockAchievement(
  userId: string,
  achievementId: string
): UserAchievement {
  return {
    userId,
    achievementId,
    unlockedAt: new Date(),
  };
}

/**
 * Calcula estatísticas do usuário para verificar conquistas
 */
export interface UserStats {
  consecutiveWorkouts: number;
  daysWithFinancialRecords: number;
  monthlyScoreAbove: number;
  streakDays: number;
  allMonthlyGoalsCompleted: boolean;
  consecutiveHydrationDays: number;
  consecutiveMeditationDays: number;
  monthsWithBudgetControl: number;
}

/**
 * Processa todas as conquistas e retorna as desbloqueadas
 */
export function processAchievements(
  userStats: UserStats,
  currentAchievements: UserAchievement[]
): {
  newAchievements: UserAchievement[];
  xpEarned: number;
} {
  const alreadyUnlocked = new Set(currentAchievements.map(a => a.achievementId));
  const newAchievements: UserAchievement[] = [];
  let xpEarned = 0;

  for (const achievement of ACHIEVEMENTS) {
    // Se já foi desbloqueada, pula
    if (alreadyUnlocked.has(achievement.id)) continue;

    // Verifica se os requisitos foram atingidos
    if (checkAchievementUnlock(achievement, userStats)) {
      const userAchievement = unlockAchievement(userStats.streakDays.toString(), achievement.id);
      newAchievements.push(userAchievement);
      xpEarned += achievement.xpReward;
    }
  }

  return { newAchievements, xpEarned };
}

/**
 * Formata progresso de conquista para exibição
 */
export function formatAchievementProgress(
  achievement: Achievement,
  userStats: UserStats
): {
  percentage: number;
  current: number;
  target: number;
  label: string;
} {
  // Pega o primeiro requisito (simplificado)
  const [key, target] = Object.entries(achievement.requirements)[0];
  const current = (userStats as any)[key] || 0;
  const percentage = typeof target === 'number' ? Math.min((current / target) * 100, 100) : 0;

  return {
    percentage,
    current: typeof current === 'number' ? current : 0,
    target: typeof target === 'number' ? target : 1,
    label: formatRequirementLabel(key),
  };
}

function formatRequirementLabel(key: string): string {
  const labels: Record<string, string> = {
    consecutiveWorkouts: 'dias de treino',
    daysWithFinancialRecords: 'dias registrados',
    monthlyScoreAbove: 'score mensal',
    streakDays: 'dias de streak',
    consecutiveHydrationDays: 'dias hidratado',
    consecutiveMeditationDays: 'dias de meditação',
    monthsWithBudgetControl: 'meses controlados',
  };
  return labels[key] || key;
}
