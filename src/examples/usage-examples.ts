/**
 * EXEMPLOS DE USO DO SISTEMA MEU RITMO
 * 
 * Este arquivo demonstra como utilizar as principais funcionalidades
 * implementadas no sistema.
 */

import {
  calculatePhysicalHealthScore,
  calculateMentalHealthScore,
  calculateFinancialScore,
  calculateDailyWaterGoal,
} from '@/lib/score-calculator';

import {
  generateAutomaticInsights,
  markInsightAsViewed,
} from '@/lib/insights-engine';

import {
  calculateGoalPeriod,
  updateGoalProgress,
  validateGoalCompletion,
} from '@/lib/goals-manager';

import {
  updateStreak,
  addXP,
  XP_REWARDS,
  processAchievements,
} from '@/lib/gamification';

import type {
  Workout,
  Sleep,
  Hydration,
  Mood,
  Stress,
  Goal,
  UserStreak,
  UserXP,
} from '@/types';

// ============================================
// EXEMPLO 1: CALCULAR SCORE DE SAÚDE FÍSICA
// ============================================

function exemploCalculoScoreFisico() {
  const userId = 'user-123';
  const hoje = new Date();

  // Dados dos últimos 7 dias de treinos
  const treinos: Workout[] = [
    {
      id: '1',
      userId,
      date: hoje,
      type: 'musculacao',
      intensity: 'alta',
      duration: 60, // minutos
      calories: 400,
      timestamp: hoje,
    },
    {
      id: '2',
      userId,
      date: new Date(hoje.getTime() - 86400000), // ontem
      type: 'cardio',
      intensity: 'media',
      duration: 30,
      calories: 250,
      timestamp: new Date(),
    },
  ];

  // Dados de sono de hoje
  const sono: Sleep = {
    id: '1',
    userId,
    date: hoje,
    hours: 7.5,
    quality: 4, // 1-5
    timestamp: hoje,
  };

  // Dados de hidratação
  const hidratacao: Hydration = {
    id: '1',
    userId,
    date: hoje,
    liters: 2.5,
    goalLiters: calculateDailyWaterGoal(70), // peso: 70kg
    timestamp: hoje,
  };

  // Calcular score
  const score = calculatePhysicalHealthScore(
    userId,
    hoje,
    treinos,
    sono,
    hidratacao,
    null, // passos
    null  // nutrição
  );

  console.log('Score de Saúde Física:', score.score);
  console.log('Breakdown:', score.breakdown);
  // Output: Score: 87, breakdown com cada componente
}

// ============================================
// EXEMPLO 2: CALCULAR SCORE DE SAÚDE MENTAL
// ============================================

function exemploCalculoScoreMental() {
  const userId = 'user-123';
  const hoje = new Date();

  const humor: Mood = {
    id: '1',
    userId,
    date: hoje,
    level: 4, // 1-5 (4 = bom humor)
    timestamp: hoje,
  };

  const estresse: Stress = {
    id: '1',
    userId,
    date: hoje,
    level: 2, // 1-5 (2 = estresse baixo)
    timestamp: hoje,
  };

  const sono: Sleep = {
    id: '1',
    userId,
    date: hoje,
    hours: 7,
    quality: 4,
    timestamp: hoje,
  };

  const habitosBemEstar = [
    {
      id: '1',
      userId,
      date: hoje,
      type: 'meditacao' as const,
      duration: 15,
      completed: true,
      timestamp: hoje,
    },
    {
      id: '2',
      userId,
      date: hoje,
      type: 'leitura' as const,
      duration: 30,
      completed: true,
      timestamp: hoje,
    },
  ];

  const score = calculateMentalHealthScore(
    userId,
    hoje,
    humor,
    estresse,
    sono,
    habitosBemEstar
  );

  console.log('Score de Saúde Mental:', score.score);
  console.log('Breakdown:', score.breakdown);
}

// ============================================
// EXEMPLO 3: GERAR INSIGHTS AUTOMÁTICOS
// ============================================

function exemploGerarInsights() {
  const userId = 'user-123';
  const hoje = new Date();

  // Simular dados dos últimos 3 dias com humor baixo
  const moods: Mood[] = [
    { id: '1', userId, date: hoje, level: 2, timestamp: hoje },
    { id: '2', userId, date: new Date(hoje.getTime() - 86400000), level: 2, timestamp: hoje },
    { id: '3', userId, date: new Date(hoje.getTime() - 172800000), level: 1, timestamp: hoje },
  ];

  // Simular estresse alto por 3 dias (RB21)
  const stress: Stress[] = [
    { id: '1', userId, date: hoje, level: 5, timestamp: hoje },
    { id: '2', userId, date: new Date(hoje.getTime() - 86400000), level: 4, timestamp: hoje },
    { id: '3', userId, date: new Date(hoje.getTime() - 172800000), level: 5, timestamp: hoje },
  ];

  const insights = generateAutomaticInsights({
    userId,
    moods,
    stress,
    sleep: [],
    workouts: [],
    transactions: [],
    budgets: [],
  });

  console.log('Insights gerados:', insights.length);
  insights.forEach(insight => {
    console.log(`[${insight.priority}] ${insight.title}`);
    console.log(insight.message);
  });

  // Marcar como visualizado (RB41: não pode ser apagado)
  if (insights.length > 0) {
    const insightVisualizado = markInsightAsViewed(insights[0]);
    console.log('Insight visualizado:', insightVisualizado.viewed);
  }
}

// ============================================
// EXEMPLO 4: GERENCIAR METAS
// ============================================

function exemploGerenciarMetas() {
  const userId = 'user-123';
  const hoje = new Date();

  // Criar meta semanal (RB04)
  const periodo = calculateGoalPeriod('semanal', hoje);
  
  const meta: Goal = {
    id: 'goal-1',
    userId,
    title: 'Treinar 4 vezes',
    description: 'Meta semanal de treinos',
    type: 'fisica',
    period: 'semanal',
    target: 4,
    current: 0,
    unit: 'treinos',
    startDate: periodo.startDate,
    endDate: periodo.endDate,
    status: 'em-andamento',
    createdAt: hoje,
  };

  console.log('Meta criada:', meta.title);
  console.log('Período:', periodo.startDate, 'até', periodo.endDate);

  // Atualizar progresso
  let metaAtualizada = updateGoalProgress(meta, 1);
  console.log('Progresso: 1/4');

  metaAtualizada = updateGoalProgress(metaAtualizada, 1);
  console.log('Progresso: 2/4');

  metaAtualizada = updateGoalProgress(metaAtualizada, 2);
  console.log('Progresso: 4/4 - Status:', metaAtualizada.status);
  // Output: "concluida"

  // Validar conclusão
  const metaValidada = validateGoalCompletion(metaAtualizada, hoje);
  console.log('Meta validada:', metaValidada.status);
}

// ============================================
// EXEMPLO 5: GAMIFICAÇÃO - STREAKS E XP
// ============================================

function exemploGamificacao() {
  const userId = 'user-123';
  const hoje = new Date();

  // Streak inicial
  let streak: UserStreak = {
    userId,
    currentStreak: 5,
    longestStreak: 10,
    lastActivityDate: new Date(hoje.getTime() - 86400000), // ontem
  };

  console.log('Streak atual:', streak.currentStreak, 'dias');

  // Usuário registrou atividade hoje
  streak = updateStreak(streak, true, hoje);
  console.log('Nova streak:', streak.currentStreak, 'dias');

  // Sistema de XP
  let xp: UserXP = {
    userId,
    totalXP: 450,
    level: 4,
    xpToNextLevel: 150, // faltam 150 XP para nível 5
  };

  console.log('Nível atual:', xp.level, 'XP:', xp.totalXP);

  // Completar meta semanal
  const resultado = addXP(xp, XP_REWARDS.META_SEMANAL_CONCLUIDA);
  
  if (resultado.leveledUp) {
    console.log('🎉 Subiu de nível!', resultado.newLevel);
  }
  
  console.log('Novo XP:', resultado.totalXP);
  console.log('Faltam', resultado.xpToNextLevel, 'XP para o próximo nível');
}

// ============================================
// EXEMPLO 6: VERIFICAR CONQUISTAS
// ============================================

function exemploConquistas() {
  const userId = 'user-123';

  // Estatísticas do usuário
  const stats = {
    consecutiveWorkouts: 7, // 7 dias seguidos treinando
    daysWithFinancialRecords: 25,
    monthlyScoreAbove: 85,
    streakDays: 30, // 30 dias de streak!
    allMonthlyGoalsCompleted: false,
    consecutiveHydrationDays: 10,
    consecutiveMeditationDays: 15,
    monthsWithBudgetControl: 2,
  };

  // Conquistas já desbloqueadas
  const conquistasAtuais = [
    {
      userId,
      achievementId: 'achievement-7-dias-treino',
      unlockedAt: new Date(),
    },
  ];

  // Processar novas conquistas
  const resultado = processAchievements(stats, conquistasAtuais);

  console.log('Novas conquistas desbloqueadas:', resultado.newAchievements.length);
  console.log('XP ganho:', resultado.xpEarned);

  resultado.newAchievements.forEach(achievement => {
    console.log('🏆 Nova conquista:', achievement.achievementId);
  });
}

// ============================================
// EXEMPLO 7: VALIDAÇÕES IMPORTANTES
// ============================================

function exemploValidacoes() {
  // RB10: Treino deve ter mínimo 10 minutos
  const treinoInvalido: Workout = {
    id: '1',
    userId: 'user-123',
    date: new Date(),
    type: 'cardio',
    intensity: 'baixa',
    duration: 5, // menos de 10 minutos!
    timestamp: new Date(),
  };

  console.log('Treino válido?', treinoInvalido.duration >= 10); // false

  // RB12: Sono crítico (< 4h)
  const sonoCritico: Sleep = {
    id: '1',
    userId: 'user-123',
    date: new Date(),
    hours: 3.5,
    quality: 1,
    timestamp: new Date(),
  };

  console.log('Sono crítico?', sonoCritico.hours < 4); // true - ALERTA!

  // RB13: Meta de hidratação
  const peso = 75; // kg
  const metaAgua = calculateDailyWaterGoal(peso);
  console.log(`Meta de água para ${peso}kg:`, metaAgua, 'litros'); // 2.625L

  // RB32: Alerta de orçamento
  const orcamento = {
    spent: 850,
    limit: 1000,
  };
  const percentual = (orcamento.spent / orcamento.limit) * 100;
  
  if (percentual >= 80 && percentual < 100) {
    console.log('⚠️ ALERTA: 80% do orçamento atingido!');
  } else if (percentual >= 100) {
    console.log('🚨 BLOQUEIO: Orçamento ultrapassado!');
  }
}

// ============================================
// EXECUTAR EXEMPLOS
// ============================================

export function executarExemplos() {
  console.log('=== EXEMPLO 1: Score Físico ===');
  exemploCalculoScoreFisico();

  console.log('\n=== EXEMPLO 2: Score Mental ===');
  exemploCalculoScoreMental();

  console.log('\n=== EXEMPLO 3: Insights ===');
  exemploGerarInsights();

  console.log('\n=== EXEMPLO 4: Metas ===');
  exemploGerenciarMetas();

  console.log('\n=== EXEMPLO 5: Gamificação ===');
  exemploGamificacao();

  console.log('\n=== EXEMPLO 6: Conquistas ===');
  exemploConquistas();

  console.log('\n=== EXEMPLO 7: Validações ===');
  exemploValidacoes();
}
