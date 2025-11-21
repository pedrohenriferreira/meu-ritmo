# Meu Ritmo - Sistema de Performance e Desenvolvimento Pessoal

## 📋 Visão Geral

Sistema completo de acompanhamento de desenvolvimento pessoal dividido em 3 pilares principais:
- 🏃 **Saúde Física** - Treinos, sono, hidratação, nutrição
- 🧠 **Saúde Mental** - Humor, estresse, bem-estar, hábitos
- 💰 **Saúde Financeira** - Gastos, orçamento, metas financeiras

## 🎯 Regras de Negócio Implementadas

### Regras Gerais (RB01-RB07)

✅ **RB01** - Perfil único por usuário (isolamento de dados por UID)  
✅ **RB02** - Todas as métricas com timestamp  
✅ **RB03** - Sistema de scores (0-100) para cada pilar  
✅ **RB04** - Metas semanais (reiniciam segunda) e mensais (reiniciam dia 1)  
✅ **RB05** - Registro manual de dados  
✅ **RB06** - Insights automáticos baseados em padrões  
✅ **RB07** - Exportação de relatórios mensais  

### Saúde Física (RB10-RB14)

✅ **RB10** - Registro de treinos (mínimo 10min para validar)  
✅ **RB11** - Peso corporal (último registro diário conta)  
✅ **RB12** - Sono (<4h = alerta, 6-8h = ideal)  
✅ **RB13** - Hidratação (meta: 35ml × peso corporal)  
✅ **RB14** - Score composto:
  - Frequência de treinos (40%)
  - Sono (25%)
  - Hidratação (15%)
  - Passos diários (10%)
  - Nutrição (10%)

### Saúde Mental (RB20-RB24)

✅ **RB20** - Registro de humor (escala 1-5, 1 por dia)  
✅ **RB21** - Estresse (>4 por 3 dias = alerta automático)  
✅ **RB22** - Hábitos: leitura, meditação, journaling, tempo offline  
✅ **RB23** - Score composto:
  - Humor (40%)
  - Estresse (20%)
  - Qualidade do sono (20%)
  - Hábitos de bem-estar (20%)
✅ **RB24** - Correlação entre pilares com insights

### Saúde Financeira (RB30-RB34)

✅ **RB30** - Categorias pré-definidas + customizadas  
✅ **RB31** - Registro completo (valor, categoria, tipo, data, forma pagamento)  
✅ **RB32** - Orçamento mensal:
  - Alerta em 80%
  - Bloqueio acima de 100%
✅ **RB33** - Score composto:
  - Gastos vs orçamento (40%)
  - Regularidade de registro (20%)
  - Aportes/reserva (20%)
  - Dívidas (20%)
✅ **RB34** - Metas financeiras com status automático

### Insights Automáticos (RB40-RB41)

✅ **RB40** - Geração automática por padrões:
  - Sono baixo + humor baixo
  - Gastos altos + estresse alto
  - Alta consistência em treinos
  - Alertas de orçamento
  - Alertas de saúde

✅ **RB41** - Insights não podem ser apagados (apenas marcados como visualizados)

### Gamificação (RB50-RB52)

✅ **RB50** - Streak de consistência (zera em 24h sem atividade)  
✅ **RB51** - Sistema de XP e níveis (cada meta concluída gera XP)  
✅ **RB52** - Conquistas:
  - 7 dias seguidos treinando
  - 30 dias de finanças registradas
  - Primeiro mês com score acima de 80
  - Streak de 30 dias
  - Todas as metas do mês completas
  - E mais...

## 📁 Estrutura do Projeto

```
src/
├── types/
│   └── index.ts                  # Todos os tipos TypeScript do sistema
├── lib/
│   ├── score-calculator.ts       # Cálculo de scores dos 3 pilares
│   ├── insights-engine.ts        # Engine de insights automáticos
│   ├── goals-manager.ts          # Gerenciamento de metas
│   ├── gamification.ts           # Sistema de XP, streaks e conquistas
│   └── utils.ts                  # Utilitários gerais
└── components/
    ├── dashboard.tsx             # Dashboard principal
    ├── overview-chart.tsx        # Gráfico de progresso
    ├── recent-activities.tsx     # Lista de atividades
    └── goals-progress.tsx        # Cards de metas
```

## 🔧 Tecnologias Utilizadas

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática completa
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Recharts** - Gráficos e visualizações
- **date-fns** - Manipulação de datas
- **uuid** - Geração de IDs únicos

## 📊 Sistema de Scores

Cada pilar possui um score de 0-100 calculado diariamente:

### Saúde Física
```typescript
Score = (treinos × 0.4) + (sono × 0.25) + (hidratação × 0.15) + 
        (passos × 0.1) + (nutrição × 0.1)
```

### Saúde Mental
```typescript
Score = (humor × 0.4) + (estresse × 0.2) + (sono_qualidade × 0.2) + 
        (hábitos × 0.2)
```

### Saúde Financeira
```typescript
Score = (orçamento × 0.4) + (regularidade × 0.2) + (poupança × 0.2) + 
        (dívidas × 0.2)
```

## 🎮 Sistema de Gamificação

### XP por Ação
- Meta semanal concluída: **50 XP**
- Meta mensal concluída: **200 XP**
- Treino completo: **10 XP**
- Hábito diário: **5 XP**
- Streak 7 dias: **100 XP**
- Streak 30 dias: **500 XP**
- Score acima de 80: **30 XP**

### Níveis
- Fórmula: `XP necessário = nível atual × 100`
- Exemplo: Nível 1→2 = 100 XP, Nível 2→3 = 200 XP

### Conquistas
8 conquistas implementadas com recompensas de 100-500 XP cada.

## 🔍 Engine de Insights

O sistema detecta automaticamente:

1. **Padrões de Alerta**
   - Estresse alto (>4) por 3+ dias
   - Sono crítico (<4h)
   - Orçamento em 80% ou ultrapassado

2. **Correlações entre Pilares**
   - Humor baixo + falta de exercício
   - Estresse alto + gastos elevados
   - Sono ruim + humor baixo

3. **Reconhecimentos Positivos**
   - Alta frequência de treinos
   - Humor consistentemente alto
   - Gastos sob controle

## 📈 Metas e Validações

### Tipos de Metas
- **Semanais**: Reiniciam toda segunda-feira às 00:00
- **Mensais**: Reiniciam dia 1 do mês às 00:00

### Status
- `em-andamento` - Meta ativa
- `concluida` - 100% atingido
- `falhou` - Prazo expirado sem atingir meta

### Histórico
Todas as metas mantém histórico completo para análises futuras.

## 🚀 Próximos Passos

### Backend (Firebase/Supabase)
- [ ] Configurar autenticação de usuários
- [ ] Implementar banco de dados
- [ ] APIs de CRUD para todas as entidades
- [ ] Sistema de notificações

### Formulários de Registro
- [ ] Formulário de treino
- [ ] Formulário de sono e hidratação
- [ ] Formulário de humor e estresse
- [ ] Formulário de gastos e receitas
- [ ] Formulário de metas

### Visualizações Avançadas
- [ ] Gráficos de evolução por período
- [ ] Calendário de atividades (heatmap)
- [ ] Comparação entre pilares
- [ ] Dashboard de insights

### Relatórios
- [ ] Relatório mensal PDF
- [ ] Exportação de dados CSV
- [ ] Compartilhamento de conquistas

### Mobile
- [ ] PWA para instalação mobile
- [ ] Notificações push
- [ ] Modo offline

## 📝 Notas de Desenvolvimento

### Validações Importantes
- Treino: mínimo 10 minutos
- Sono: alerta se <4h
- Hidratação: meta baseada em peso (35ml/kg)
- Orçamento: alertas automáticos em 80% e 100%
- Streak: zera se 24h sem atividade

### Cálculos Automáticos
- Scores recalculados diariamente
- Metas validadas no prazo
- Insights gerados em tempo real
- XP e conquistas processadas após cada ação

### Isolamento de Dados
Todos os dados são filtrados por `userId` (UID do Firebase/Auth).
Não há acesso cruzado entre usuários (RB01).

---

**Desenvolvido com ❤️ usando Next.js + TypeScript**
