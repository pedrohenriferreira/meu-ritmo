import {
  Insight,
  InsightType,
  InsightPriority,
  Mood,
  Stress,
  Sleep,
  Workout,
  FinancialTransaction,
  Budget,
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

// ============================================
// ENGINE DE INSIGHTS AUTOMÁTICOS (RB40-RB41)
// ============================================

interface InsightGeneratorContext {
  userId: string;
  // Dados dos últimos 7 dias
  moods: Mood[];
  stress: Stress[];
  sleep: Sleep[];
  workouts: Workout[];
  transactions: FinancialTransaction[];
  budgets: Budget[];
}

/**
 * Gera insights automáticos baseado em padrões detectados (RB40)
 */
export function generateAutomaticInsights(
  context: InsightGeneratorContext
): Insight[] {
  const insights: Insight[] = [];

  // RB21: Estresse alto (>4) durante 3 dias consecutivos
  insights.push(...detectHighStressPattern(context));

  // RB24: Correlação entre pilares
  insights.push(...detectCrossPillarCorrelations(context));

  // Detecção de padrões positivos (elogios)
  insights.push(...detectPositivePatterns(context));

  // Alertas financeiros (RB32)
  insights.push(...detectFinancialAlerts(context));

  // Alertas de saúde (RB12)
  insights.push(...detectHealthAlerts(context));

  return insights;
}

/**
 * RB21: Detecta estresse alto (>4) por 3 dias consecutivos
 */
function detectHighStressPattern(context: InsightGeneratorContext): Insight[] {
  const insights: Insight[] = [];
  const sortedStress = [...context.stress].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  let consecutiveDays = 0;
  for (const stress of sortedStress) {
    if (stress.level >= 4) {
      consecutiveDays++;
      if (consecutiveDays >= 3) {
        insights.push({
          id: uuidv4(),
          userId: context.userId,
          type: 'alerta',
          priority: 'alta',
          title: 'Estresse elevado persistente',
          message:
            'Você está com níveis altos de estresse há 3 dias consecutivos. Considere práticas de relaxamento como meditação, exercícios leves ou conversar com alguém de confiança.',
          relatedPillars: ['mental'],
          data: { consecutiveDays, avgStressLevel: stress.level },
          viewed: false,
          createdAt: new Date(),
        });
        break;
      }
    } else {
      consecutiveDays = 0;
    }
  }

  return insights;
}

/**
 * RB24: Correlações entre pilares
 */
function detectCrossPillarCorrelations(
  context: InsightGeneratorContext
): Insight[] {
  const insights: Insight[] = [];

  // Humor baixo + treino ausente
  const recentMoods = context.moods.slice(-3);
  const recentWorkouts = context.workouts.slice(-7);
  const avgMood = recentMoods.reduce((acc, m) => acc + m.level, 0) / recentMoods.length;

  if (avgMood <= 2 && recentWorkouts.length < 2) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'recomendacao',
      priority: 'media',
      title: 'Humor baixo e inatividade física',
      message:
        'Notamos que seu humor está baixo e você não tem praticado exercícios. Atividade física pode melhorar significativamente o bem-estar mental. Que tal uma caminhada leve?',
      relatedPillars: ['mental', 'fisica'],
      data: { avgMood, workoutCount: recentWorkouts.length },
      viewed: false,
      createdAt: new Date(),
    });
  }

  // Estresse alto + gastos altos
  const recentStress = context.stress.slice(-3);
  const avgStress = recentStress.reduce((acc, s) => acc + s.level, 0) / recentStress.length;
  const totalExpenses = context.transactions
    .filter(t => t.type === 'gasto')
    .reduce((acc, t) => acc + t.amount, 0);

  const hasHighExpenses = context.budgets.some(b => (b.spent / b.limit) > 0.9);

  if (avgStress >= 4 && hasHighExpenses) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'correlacao',
      priority: 'alta',
      title: 'Estresse e gastos elevados detectados',
      message:
        'Identificamos estresse alto junto com gastos acima do normal. Isso pode indicar compras emocionais. Considere revisar seu orçamento e praticar técnicas de controle emocional.',
      relatedPillars: ['mental', 'financeira'],
      data: { avgStress, totalExpenses },
      viewed: false,
      createdAt: new Date(),
    });
  }

  // Sono ruim afetando tudo
  const recentSleep = context.sleep.slice(-3);
  const avgSleepHours = recentSleep.reduce((acc, s) => acc + s.hours, 0) / recentSleep.length;

  if (avgSleepHours < 6 && avgMood <= 3) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'recomendacao',
      priority: 'alta',
      title: 'Sono inadequado afetando humor',
      message:
        'Seu sono tem sido insuficiente e isso está impactando seu humor. Tente estabelecer uma rotina de sono mais consistente, evitando telas antes de dormir.',
      relatedPillars: ['fisica', 'mental'],
      data: { avgSleepHours, avgMood },
      viewed: false,
      createdAt: new Date(),
    });
  }

  return insights;
}

/**
 * Detecta padrões positivos e gera elogios
 */
function detectPositivePatterns(context: InsightGeneratorContext): Insight[] {
  const insights: Insight[] = [];

  // Alta consistência em treinos
  if (context.workouts.length >= 5) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'elogio',
      priority: 'baixa',
      title: 'Excelente consistência nos treinos!',
      message: `Parabéns! Você treinou ${context.workouts.length} vezes esta semana. Continue assim para alcançar seus objetivos!`,
      relatedPillars: ['fisica'],
      data: { workoutCount: context.workouts.length },
      viewed: false,
      createdAt: new Date(),
    });
  }

  // Humor consistentemente alto
  const recentMoods = context.moods.slice(-5);
  const avgMood = recentMoods.reduce((acc, m) => acc + m.level, 0) / recentMoods.length;

  if (avgMood >= 4) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'elogio',
      priority: 'baixa',
      title: 'Humor excelente!',
      message:
        'Seu humor tem sido ótimo nos últimos dias. Continue fazendo o que está funcionando para você!',
      relatedPillars: ['mental'],
      data: { avgMood },
      viewed: false,
      createdAt: new Date(),
    });
  }

  // Gastos sob controle
  const allBudgetsOk = context.budgets.every(b => (b.spent / b.limit) <= 0.8);
  if (allBudgetsOk && context.budgets.length > 0) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'elogio',
      priority: 'baixa',
      title: 'Finanças sob controle!',
      message:
        'Todos os seus gastos estão dentro do orçamento planejado. Ótimo controle financeiro!',
      relatedPillars: ['financeira'],
      data: { budgetsCount: context.budgets.length },
      viewed: false,
      createdAt: new Date(),
    });
  }

  return insights;
}

/**
 * RB32: Alertas financeiros (80% do orçamento, acima de 100%)
 */
function detectFinancialAlerts(context: InsightGeneratorContext): Insight[] {
  const insights: Insight[] = [];

  for (const budget of context.budgets) {
    const percentage = (budget.spent / budget.limit) * 100;

    // Alerta em 80%
    if (percentage >= 80 && percentage < 100 && !budget.alert80Sent) {
      insights.push({
        id: uuidv4(),
        userId: context.userId,
        type: 'alerta',
        priority: 'media',
        title: `Orçamento de ${budget.category} em 80%`,
        message: `Você já gastou ${percentage.toFixed(0)}% do orçamento de ${
          budget.category
        }. Cuidado para não ultrapassar o limite!`,
        relatedPillars: ['financeira'],
        data: { category: budget.category, percentage, spent: budget.spent, limit: budget.limit },
        viewed: false,
        createdAt: new Date(),
      });
    }

    // Bloqueio acima de 100%
    if (percentage >= 100) {
      insights.push({
        id: uuidv4(),
        userId: context.userId,
        type: 'alerta',
        priority: 'alta',
        title: `Orçamento de ${budget.category} ultrapassado!`,
        message: `Você ultrapassou o orçamento de ${budget.category} (${percentage.toFixed(
          0
        )}%). Revise seus gastos nesta categoria.`,
        relatedPillars: ['financeira'],
        data: { category: budget.category, percentage, spent: budget.spent, limit: budget.limit },
        viewed: false,
        createdAt: new Date(),
      });
    }
  }

  return insights;
}

/**
 * RB12: Alertas de saúde (sono < 4h)
 */
function detectHealthAlerts(context: InsightGeneratorContext): Insight[] {
  const insights: Insight[] = [];

  // Alerta de sono crítico
  const criticalSleep = context.sleep.find(s => s.hours < 4);
  if (criticalSleep) {
    insights.push({
      id: uuidv4(),
      userId: context.userId,
      type: 'alerta',
      priority: 'alta',
      title: 'Sono crítico detectado',
      message: `Você dormiu menos de 4 horas. Isso pode prejudicar seriamente sua saúde. Tente descansar mais quando possível.`,
      relatedPillars: ['fisica', 'mental'],
      data: { hours: criticalSleep.hours },
      viewed: false,
      createdAt: new Date(),
    });
  }

  return insights;
}

/**
 * Marca insight como visualizado (RB41)
 * Insights não podem ser apagados, apenas marcados como visualizados
 */
export function markInsightAsViewed(insight: Insight): Insight {
  return {
    ...insight,
    viewed: true,
    viewedAt: new Date(),
  };
}
