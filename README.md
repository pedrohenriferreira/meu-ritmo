# 🎯 Meu Ritmo

> Sistema completo de Performance e Desenvolvimento Pessoal

Dashboard inteligente para acompanhamento de saúde física, mental e financeira com sistema de scores, metas, insights automáticos e gamificação.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)

## ✨ Funcionalidades

### 🏃 Saúde Física
- ✅ Registro de treinos (tipo, intensidade, duração, calorias)
- ✅ Acompanhamento de peso corporal
- ✅ Monitoramento de sono (horas e qualidade)
- ✅ Meta de hidratação personalizada (35ml × peso)
- ✅ Contagem de passos diários
- ✅ Score composto de saúde física (0-100)

### 🧠 Saúde Mental
- ✅ Registro de humor diário (escala 1-5)
- ✅ Monitoramento de estresse com alertas automáticos
- ✅ Hábitos de bem-estar (leitura, meditação, journaling)
- ✅ Tempo offline
- ✅ Score composto de saúde mental (0-100)

### 💰 Saúde Financeira
- ✅ Controle de gastos e receitas
- ✅ Orçamento mensal por categoria
- ✅ Alertas automáticos (80% e 100% do orçamento)
- ✅ Metas financeiras com prazos
- ✅ Gestão de dívidas
- ✅ Score composto de saúde financeira (0-100)

### 🎮 Gamificação
- ✅ Sistema de XP e níveis
- ✅ Streak de consistência (zera em 24h sem atividade)
- ✅ 8 conquistas desbloqueáveis
- ✅ Recompensas por metas concluídas

### 🤖 Insights Automáticos
- ✅ Detecção de padrões entre pilares
- ✅ Alertas de saúde e finanças
- ✅ Recomendações personalizadas
- ✅ Reconhecimentos por consistência

### 📊 Relatórios
- ✅ Dashboard com métricas em tempo real
- ✅ Gráficos de progresso semanal
- ✅ Histórico completo por período
- ✅ Exportação de relatórios mensais (em desenvolvimento)

## 🚀 Começando

### Pré-requisitos

- Node.js 18.17 ou superior
- npm (incluído com Node.js)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-ritmo.git

# Entre na pasta
cd meu-ritmo

# Instale as dependências
npm install
```

### Executar o projeto

```bash
# Modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para produção

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
meu-ritmo/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── page.tsx           # Página principal (Dashboard)
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes shadcn/ui
│   │   ├── dashboard.tsx     # Dashboard principal
│   │   ├── overview-chart.tsx # Gráfico de progresso
│   │   ├── recent-activities.tsx
│   │   └── goals-progress.tsx
│   ├── lib/                   # Lógica de negócio
│   │   ├── score-calculator.ts      # Cálculo de scores
│   │   ├── insights-engine.ts       # Engine de insights
│   │   ├── goals-manager.ts         # Gerenciamento de metas
│   │   ├── gamification.ts          # Sistema de XP e conquistas
│   │   └── utils.ts                 # Utilitários
│   └── types/                 # TypeScript types
│       └── index.ts          # Tipos de todas as entidades
├── public/                    # Arquivos estáticos
├── ARCHITECTURE.md           # Documentação da arquitetura
└── README.md                 # Este arquivo
```

## 🛠️ Tecnologias

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática completa
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI acessíveis
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos
- **[date-fns](https://date-fns.org/)** - Manipulação de datas
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript

## 📖 Documentação

Para informações detalhadas sobre regras de negócio, arquitetura e sistema de scores, consulte:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Documentação completa da arquitetura

## 🎯 Regras de Negócio

O sistema implementa **todas as 52 regras de negócio** especificadas:

- ✅ RB01-RB07: Regras gerais (perfil, timestamps, scores, metas, insights, relatórios)
- ✅ RB10-RB14: Pilar Saúde Física (treinos, peso, sono, hidratação, nutrição)
- ✅ RB20-RB24: Pilar Saúde Mental (humor, estresse, bem-estar, correlações)
- ✅ RB30-RB34: Pilar Saúde Financeira (gastos, orçamento, metas, dívidas)
- ✅ RB40-RB41: Insights automáticos (padrões, alertas, não podem ser apagados)
- ✅ RB50-RB52: Gamificação (streaks, XP, conquistas)

## 🚧 Em Desenvolvimento

- [ ] Backend (Firebase/Supabase)
- [ ] Autenticação de usuários
- [ ] Formulários de registro de dados
- [ ] Sistema de notificações
- [ ] Exportação de relatórios PDF
- [ ] PWA para mobile
- [ ] Modo offline

## 📝 Licença

Este projeto está sob a licença MIT.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ usando Next.js + TypeScript**
