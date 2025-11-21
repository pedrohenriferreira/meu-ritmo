# API Documentation - Meu Ritmo

## Arquitetura da API

A API do Meu Ritmo foi projetada seguindo princípios REST, com foco em:
- **Personalização total por usuário**
- **Métricas precisas e reais**
- **Configurações granulares**
- **Escalabilidade e performance**

## Estrutura Base

### Headers Obrigatórios
```
Content-Type: application/json
Authorization: Bearer {token}
```

### Formato de Resposta Padrão
```typescript
{
  "success": boolean,
  "data": T | null,
  "error": {
    "code": string,
    "message": string,
    "details": any
  } | null,
  "metadata": {
    "page": number,
    "limit": number,
    "total": number,
    "hasMore": boolean
  } | null
}
```

---

## Endpoints - Configurações do Usuário

### 1. Tipos de Treino (Workout Types)

**GET** `/api/users/{userId}/workout-types`
- Lista todos os tipos de treino configurados pelo usuário
- Response: Array de WorkoutType

**POST** `/api/users/{userId}/workout-types`
- Cria novo tipo de treino personalizado
- Body:
```json
{
  "name": "Musculação",
  "category": "strength",
  "icon": "dumbbell",
  "color": "#ef4444",
  "defaultDuration": 60,
  "defaultIntensity": 8,
  "isActive": true
}
```

**PUT** `/api/users/{userId}/workout-types/{typeId}`
- Atualiza tipo de treino existente

**DELETE** `/api/users/{userId}/workout-types/{typeId}`
- Remove tipo de treino (soft delete)

---

### 2. Tipos de Atividade Mental (Mental Activity Types)

**GET** `/api/users/{userId}/mental-activity-types`
- Lista atividades mentais configuradas

**POST** `/api/users/{userId}/mental-activity-types`
- Body:
```json
{
  "name": "Meditação Guiada",
  "category": "meditation",
  "icon": "brain",
  "color": "#8b5cf6",
  "targetFrequency": 7,
  "isActive": true
}
```

---

### 3. Categorias de Transações (Transaction Categories)

**GET** `/api/users/{userId}/transaction-categories`
- Lista categorias financeiras personalizadas
- Query params: `?type=income|expense`

**POST** `/api/users/{userId}/transaction-categories`
- Body:
```json
{
  "name": "Investimentos",
  "type": "income",
  "icon": "trending-up",
  "color": "#10b981",
  "monthlyBudget": 1000,
  "isActive": true
}
```

---

## Endpoints - Registro de Atividades

### 4. Atividades Físicas (Workout Activities)

**POST** `/api/users/{userId}/workouts`
- Registra nova atividade física
- Body:
```json
{
  "workoutTypeId": "uuid-do-tipo-treino",
  "date": "2025-11-20T10:00:00Z",
  "duration": 60,
  "intensity": 8,
  "calories": 450,
  "notes": "Treino intenso de peito e tríceps"
}
```

**GET** `/api/users/{userId}/workouts`
- Lista atividades
- Query params: `?startDate=2025-11-01&endDate=2025-11-30&page=1&limit=20`

**GET** `/api/users/{userId}/workouts/statistics`
- Estatísticas agregadas
- Query params: `?startDate=2025-11-01&endDate=2025-11-30`
- Response:
```json
{
  "totalWorkouts": 20,
  "totalDuration": 1200,
  "totalCalories": 9000,
  "averageIntensity": 7.5,
  "byType": {
    "musculacao": { "count": 12, "duration": 720 },
    "corrida": { "count": 8, "duration": 240 }
  },
  "byWeek": [
    { "week": "2025-W45", "count": 5, "duration": 300 }
  ]
}
```

---

### 5. Registro de Sono (Sleep Records)

**POST** `/api/users/{userId}/sleep`
- Body:
```json
{
  "date": "2025-11-20",
  "bedTime": "2025-11-19T23:00:00Z",
  "wakeTime": "2025-11-20T07:00:00Z",
  "quality": 4,
  "interruptions": 1,
  "notes": "Dormi bem, apenas acordei uma vez"
}
```

**GET** `/api/users/{userId}/sleep/statistics`
- Response:
```json
{
  "averageDuration": 7.5,
  "averageQuality": 4.2,
  "totalNights": 30,
  "sleepDebtHours": 3,
  "recommendations": [
    {
      "type": "alert",
      "message": "Você está com débito de sono de 3h. Tente dormir mais cedo hoje."
    }
  ]
}
```

---

### 6. Hidratação (Water Intake)

**POST** `/api/users/{userId}/water`
- Body:
```json
{
  "date": "2025-11-20T14:30:00Z",
  "amount": 500
}
```

**GET** `/api/users/{userId}/water/daily/{date}`
- Response:
```json
{
  "date": "2025-11-20",
  "totalIntake": 2100,
  "goal": 2500,
  "percentage": 84,
  "entries": [
    { "timestamp": "2025-11-20T08:00:00Z", "amount": 500 },
    { "timestamp": "2025-11-20T12:00:00Z", "amount": 600 }
  ]
}
```

---

### 7. Registro de Humor (Mood Records)

**POST** `/api/users/{userId}/mood`
- Body:
```json
{
  "date": "2025-11-20T16:00:00Z",
  "mood": 4,
  "stress": 3,
  "anxiety": 2,
  "energy": 7,
  "notes": "Dia produtivo, me sinto bem",
  "triggers": ["trabalho", "exercicio"]
}
```

**GET** `/api/users/{userId}/mood/statistics`
- Response com trends, padrões e alertas RB21

---

### 8. Transações Financeiras

**POST** `/api/users/{userId}/transactions`
- Body:
```json
{
  "categoryId": "uuid-categoria",
  "type": "expense",
  "amount": 45.90,
  "description": "Almoço restaurante",
  "date": "2025-11-20T13:00:00Z",
  "isRecurring": false,
  "tags": ["alimentacao", "trabalho"]
}
```

**GET** `/api/users/{userId}/transactions/statistics`
- Response:
```json
{
  "totalIncome": 5000,
  "totalExpenses": 3200,
  "balance": 1800,
  "byCategory": {
    "moradia": { "amount": 1500, "count": 3, "percentage": 47 },
    "alimentacao": { "amount": 800, "count": 45, "percentage": 25 }
  },
  "budgetAlerts": [
    {
      "categoryId": "uuid",
      "categoryName": "Lazer",
      "spent": 280,
      "budget": 300,
      "percentage": 93,
      "alert": "Você atingiu 93% do orçamento de Lazer"
    }
  ]
}
```

---

## Endpoints - Metas e Hábitos

### 9. Metas (Goals)

**POST** `/api/users/{userId}/goals`
- Body:
```json
{
  "title": "Treinar 4x na semana",
  "description": "Manter consistência nos treinos",
  "category": "physical",
  "type": "weekly",
  "target": 4,
  "unit": "treinos",
  "startDate": "2025-11-18T00:00:00Z",
  "priority": "high"
}
```

**PATCH** `/api/users/{userId}/goals/{goalId}/progress`
- Atualiza progresso atual
- Body:
```json
{
  "current": 3
}
```

**GET** `/api/users/{userId}/goals?status=active&category=physical`

---

### 10. Hábitos (Habits)

**POST** `/api/users/{userId}/habits`
- Body:
```json
{
  "name": "Meditar pela manhã",
  "description": "10 minutos de meditação ao acordar",
  "category": "mental",
  "frequency": "daily",
  "targetDays": [1, 2, 3, 4, 5],
  "reminderTime": "07:00"
}
```

**POST** `/api/users/{userId}/habits/{habitId}/log`
- Marca hábito como cumprido
- Body:
```json
{
  "date": "2025-11-20",
  "completed": true,
  "notes": "Meditação de 15 minutos"
}
```

---

## Endpoints - Dashboard

### 11. Overview do Dashboard

**GET** `/api/users/{userId}/dashboard/overview?date=2025-11-20`
- Response:
```json
{
  "date": "2025-11-20",
  "scores": {
    "overall": 85,
    "physical": 87,
    "mental": 82,
    "financial": 78
  },
  "todayActivities": {
    "workouts": 1,
    "water": 2100,
    "mood": 4,
    "transactions": 3
  },
  "activeGoals": {
    "total": 8,
    "onTrack": 6,
    "atRisk": 2
  },
  "insights": [
    {
      "type": "recommendation",
      "priority": "medium",
      "message": "Você está com ótima consistência nos treinos! Continue assim.",
      "relatedPillars": ["fisica"]
    }
  ]
}
```

### 12. Widgets Customizáveis

**GET** `/api/users/{userId}/dashboard/widgets`
- Lista widgets configurados

**POST** `/api/users/{userId}/dashboard/widgets`
- Adiciona novo widget
- Body:
```json
{
  "widgetType": "kpi",
  "title": "Calorias Queimadas",
  "dataSource": "workouts.calories",
  "size": "small",
  "isVisible": true,
  "config": {
    "aggregation": "sum",
    "period": "week",
    "showTrend": true
  }
}
```

---

## Endpoints - Scores de Saúde

### 13. Health Scores

**GET** `/api/users/{userId}/health-scores/current`
- Score completo do dia atual

**GET** `/api/users/{userId}/health-scores/physical?date=2025-11-20`
- Cálculo detalhado:
```json
{
  "date": "2025-11-20",
  "score": 87,
  "breakdown": {
    "workoutFrequency": {
      "weight": 0.40,
      "score": 90,
      "data": {
        "workoutsThisWeek": 4,
        "target": 4,
        "consistency": 0.9
      }
    },
    "sleep": {
      "weight": 0.25,
      "score": 85,
      "data": {
        "averageHours": 7.5,
        "averageQuality": 4.2
      }
    },
    "hydration": {
      "weight": 0.15,
      "score": 84,
      "data": {
        "achievedDays": 6,
        "totalDays": 7
      }
    },
    "steps": {
      "weight": 0.10,
      "score": 92
    },
    "nutrition": {
      "weight": 0.10,
      "score": 88
    }
  },
  "trend": {
    "lastWeek": 85,
    "change": +2,
    "changePercentage": 2.35
  }
}
```

---

## Endpoints - Insights e Análises

### 14. Insights Automáticos

**GET** `/api/users/{userId}/insights?viewed=false&priority=high`
- Response:
```json
{
  "insights": [
    {
      "id": "uuid",
      "type": "alert",
      "priority": "high",
      "title": "Alerta de Estresse Elevado",
      "message": "Seu nível de estresse está acima de 7 há 3 dias consecutivos. Considere atividades relaxantes.",
      "relatedPillars": ["mental"],
      "data": {
        "stressLevels": [8, 8, 7],
        "recommendation": "meditation"
      },
      "viewed": false,
      "createdAt": "2025-11-20T18:00:00Z"
    }
  ]
}
```

**PATCH** `/api/users/{userId}/insights/{insightId}/view`
- Marca insight como visualizado (RB41)

---

## Endpoints - Relatórios

### 15. Relatório Mensal

**GET** `/api/users/{userId}/reports/monthly/2025-11`
- Response:
```json
{
  "month": "2025-11",
  "period": {
    "start": "2025-11-01",
    "end": "2025-11-30"
  },
  "summary": {
    "physicalScore": {
      "average": 87,
      "evolution": +3,
      "highlights": [
        "Melhor consistência de treinos dos últimos 3 meses",
        "Qualidade de sono aumentou 8%"
      ]
    },
    "mentalScore": {
      "average": 82,
      "evolution": +1,
      "highlights": [
        "Humor mais estável ao longo do mês"
      ]
    },
    "financialScore": {
      "average": 78,
      "evolution": -2,
      "highlights": [
        "Gastos com lazer 15% acima do orçamento"
      ]
    }
  },
  "goals": {
    "total": 12,
    "completed": 9,
    "completionRate": 75
  },
  "achievements": [
    {
      "type": "streak-30",
      "title": "30 Dias de Consistência",
      "unlockedAt": "2025-11-15"
    }
  ],
  "insights": [],
  "generatedAt": "2025-12-01T00:00:00Z"
}
```

---

## Configurações do Usuário

### 16. Settings

**GET** `/api/users/{userId}/settings`
**PUT** `/api/users/{userId}/settings`
- Body completo:
```json
{
  "theme": "dark",
  "language": "pt-BR",
  "dateFormat": "DD/MM/YYYY",
  "timeFormat": "24h",
  "firstDayOfWeek": 0,
  "emailNotifications": true,
  "pushNotifications": true,
  "reminderNotifications": true,
  "weeklyReport": true,
  "monthlyReport": true,
  "profileVisibility": "private",
  "dataSharing": false,
  "enablePhysicalHealth": true,
  "enableMentalHealth": true,
  "enableFinancialHealth": true,
  "autoBackup": false
}
```

---

## Códigos de Erro

| Código | Mensagem | HTTP Status |
|--------|----------|-------------|
| UNAUTHORIZED | Token inválido ou expirado | 401 |
| FORBIDDEN | Acesso negado aos dados de outro usuário | 403 |
| NOT_FOUND | Recurso não encontrado | 404 |
| VALIDATION_ERROR | Dados inválidos no request | 400 |
| DUPLICATE_ENTRY | Registro já existe | 409 |
| RATE_LIMIT_EXCEEDED | Muitas requisições | 429 |
| INTERNAL_ERROR | Erro interno do servidor | 500 |

---

## Rate Limiting

- 100 requisições por minuto por usuário
- 1000 requisições por hora por usuário
- Headers de resposta:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

---

## Webhooks (Futuro)

Eventos disponíveis:
- `goal.completed`
- `achievement.unlocked`
- `insight.generated`
- `budget.alert`
- `streak.broken`

---

## Próximos Passos de Implementação

1. **Fase 1**: Implementar endpoints de configuração (workout types, categories)
2. **Fase 2**: Implementar registros de atividades com validação
3. **Fase 3**: Implementar cálculos de scores
4. **Fase 4**: Implementar sistema de insights
5. **Fase 5**: Implementar dashboard customizável
6. **Fase 6**: Implementar relatórios e exports
