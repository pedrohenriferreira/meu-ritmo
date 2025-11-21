import { Goal, GoalPeriod } from '@/types';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isBefore, isAfter } from 'date-fns';

// ============================================
// SISTEMA DE METAS (RB04)
// ============================================

/**
 * RB04: Calcula datas de início e fim baseado no período
 * - Semanal: reinicia toda segunda-feira
 * - Mensal: reinicia no 1º dia do mês
 */
export function calculateGoalPeriod(period: GoalPeriod, referenceDate: Date = new Date()): {
  startDate: Date;
  endDate: Date;
} {
  if (period === 'semanal') {
    // Segunda-feira às 00:00
    return {
      startDate: startOfWeek(referenceDate, { weekStartsOn: 1 }),
      endDate: endOfWeek(referenceDate, { weekStartsOn: 1 }),
    };
  } else {
    // Dia 1 do mês às 00:00
    return {
      startDate: startOfMonth(referenceDate),
      endDate: endOfMonth(referenceDate),
    };
  }
}

/**
 * Verifica se meta deve ser reiniciada
 */
export function shouldResetGoal(goal: Goal, currentDate: Date = new Date()): boolean {
  // Se já está concluída ou falhou, não reinicia
  if (goal.status === 'concluida' || goal.status === 'falhou') {
    return false;
  }

  // Verifica se passou do período
  return isAfter(currentDate, goal.endDate);
}

/**
 * Reinicia meta para novo período
 */
export function resetGoal(goal: Goal, currentDate: Date = new Date()): Goal {
  const newPeriod = calculateGoalPeriod(goal.period, currentDate);
  
  return {
    ...goal,
    current: 0,
    status: 'em-andamento',
    startDate: newPeriod.startDate,
    endDate: newPeriod.endDate,
  };
}

/**
 * Atualiza progresso da meta
 */
export function updateGoalProgress(goal: Goal, increment: number): Goal {
  const newCurrent = goal.current + increment;
  const newStatus = newCurrent >= goal.target ? 'concluida' : 'em-andamento';
  
  return {
    ...goal,
    current: newCurrent,
    status: newStatus,
    completedAt: newStatus === 'concluida' ? new Date() : goal.completedAt,
  };
}

/**
 * Valida se meta foi concluída no prazo
 */
export function validateGoalCompletion(goal: Goal, currentDate: Date = new Date()): Goal {
  // Se ainda está em andamento e passou do prazo
  if (goal.status === 'em-andamento' && isAfter(currentDate, goal.endDate)) {
    if (goal.current >= goal.target) {
      return {
        ...goal,
        status: 'concluida',
        completedAt: new Date(),
      };
    } else {
      return {
        ...goal,
        status: 'falhou',
      };
    }
  }
  
  return goal;
}

/**
 * Calcula percentual de conclusão
 */
export function calculateGoalPercentage(goal: Goal): number {
  if (goal.target === 0) return 0;
  return Math.min((goal.current / goal.target) * 100, 100);
}

/**
 * Calcula dias restantes
 */
export function getDaysRemaining(goal: Goal, currentDate: Date = new Date()): number {
  if (isBefore(goal.endDate, currentDate)) return 0;
  
  const diffTime = goal.endDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(diffDays, 0);
}

/**
 * Verifica se está próximo do prazo (últimos 3 dias)
 */
export function isGoalNearDeadline(goal: Goal, currentDate: Date = new Date()): boolean {
  const daysRemaining = getDaysRemaining(goal, currentDate);
  return daysRemaining > 0 && daysRemaining <= 3 && goal.status === 'em-andamento';
}

/**
 * Mantém histórico de metas concluídas
 */
export interface GoalHistory {
  goalId: string;
  userId: string;
  title: string;
  type: string;
  period: GoalPeriod;
  target: number;
  achieved: number;
  status: 'concluida' | 'falhou';
  startDate: Date;
  endDate: Date;
  completedAt?: Date;
}

/**
 * Cria registro histórico de meta
 */
export function createGoalHistoryRecord(goal: Goal): GoalHistory {
  return {
    goalId: goal.id,
    userId: goal.userId,
    title: goal.title,
    type: goal.type,
    period: goal.period,
    target: goal.target,
    achieved: goal.current,
    status: goal.status === 'concluida' ? 'concluida' : 'falhou',
    startDate: goal.startDate,
    endDate: goal.endDate,
    completedAt: goal.completedAt,
  };
}
