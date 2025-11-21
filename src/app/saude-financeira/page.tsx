"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CreditCard, 
  Target as TargetIcon,
  Plus 
} from "lucide-react";
import { AddTransactionDialog } from "@/components/add-transaction-dialog";

export default function SaudeFinanceiraPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddTransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Saúde Financeira</h1>
            <p className="text-muted-foreground/60 mt-1 text-sm">
              Controle seus gastos, orçamento e metas financeiras
            </p>
          </div>
          <Button size="lg" className="shadow-sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Transação
          </Button>
        </div>

      {/* Score Card */}
      <Card className="border-l-4 border-l-blue-500" style={{ background: 'oklch(0.205 0 0)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Score de Saúde Financeira</CardTitle>
              <CardDescription>Seu controle financeiro este mês</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">78</div>
              <p className="text-sm text-muted-foreground">de 100</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={78} className="h-3" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Orçamento</p>
              <p className="text-sm font-medium">75% (40%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Regularidade</p>
              <p className="text-sm font-medium">85% (20%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Poupança</p>
              <p className="text-sm font-medium">70% (20%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Dívidas</p>
              <p className="text-sm font-medium">82% (20%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Mensal */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 6.500</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.850</div>
            <p className="text-xs text-muted-foreground">75% do orçamento</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 1.650</div>
            <p className="text-xs text-muted-foreground">+25% vs mês passado</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserva</CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8.200</div>
            <p className="text-xs text-muted-foreground">68% da meta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orcamento" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orcamento">Orçamento</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="metas">Metas Financeiras</TabsTrigger>
          <TabsTrigger value="dividas">Dívidas</TabsTrigger>
        </TabsList>

        <TabsContent value="orcamento" className="space-y-4">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Orçamento por Categoria (RB32)</CardTitle>
              <CardDescription>
                Alertas automáticos em 80% e bloqueio acima de 100%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { category: "Moradia", spent: 1800, limit: 2000, percentage: 90, alert: true },
                { category: "Alimentação", spent: 800, limit: 1000, percentage: 80, alert: true },
                { category: "Transporte", spent: 450, limit: 600, percentage: 75, alert: false },
                { category: "Saúde", spent: 300, limit: 500, percentage: 60, alert: false },
                { category: "Lazer", spent: 550, limit: 400, percentage: 137, blocked: true },
                { category: "Educação", spent: 450, limit: 800, percentage: 56, alert: false },
              ].map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.category}</span>
                      {item.blocked && (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Bloqueado
                        </Badge>
                      )}
                      {item.alert && !item.blocked && (
                        <Badge variant="secondary" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Alerta
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        R$ {item.spent} / R$ {item.limit}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(item.percentage, 100)} 
                    className={item.blocked ? "bg-red-100" : item.alert ? "bg-yellow-100" : ""}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacoes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Transações Este Mês
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">
                  Média: 4.1/dia
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket Médio
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 39,11</div>
                <p className="text-xs text-muted-foreground">
                  Por transação
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dias Registrados
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18/18</div>
                <p className="text-xs text-muted-foreground">
                  100% este mês
                </p>
              </CardContent>
            </Card>
          </div>

          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Transações Recentes (RB31)</CardTitle>
              <CardDescription>
                Valor, categoria, tipo, data e forma de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { description: "Mercado", amount: -245.50, category: "Alimentação", type: "Débito", date: "Hoje" },
                  { description: "Salário", amount: 6500.00, category: "Receita", type: "PIX", date: "Hoje" },
                  { description: "Uber", amount: -32.00, category: "Transporte", type: "Crédito", date: "Ontem" },
                  { description: "Netflix", amount: -39.90, category: "Lazer", type: "Crédito", date: "Ontem" },
                  { description: "Academia", amount: -150.00, category: "Saúde", type: "Débito", date: "2 dias atrás" },
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{transaction.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metas" className="space-y-4">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Metas Financeiras (RB34)</CardTitle>
              <CardDescription>
                Status muda automaticamente ao atingir 100%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Fundo de Emergência", current: 8200, target: 12000, deadline: "Dez 2025", status: "em-andamento" },
                { title: "Viagem para Europa", current: 4500, target: 8000, deadline: "Jun 2026", status: "em-andamento" },
                { title: "Novo Notebook", current: 3200, target: 3000, deadline: "Nov 2025", status: "concluida" },
              ].map((goal, i) => {
                const percentage = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{goal.title}</p>
                        <p className="text-sm text-muted-foreground">Prazo: {goal.deadline}</p>
                      </div>
                      <Badge variant={goal.status === "concluida" ? "default" : "secondary"}>
                        {goal.status === "concluida" ? "Concluída" : "Em andamento"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        R$ {goal.current.toLocaleString()} / R$ {goal.target.toLocaleString()}
                      </span>
                      <span className="font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dividas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dívidas Ativas
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Em pagamento
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total a Pagar
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 3.200</div>
                <p className="text-xs text-muted-foreground">
                  Saldo devedor
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Já Pago
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 4.800</div>
                <p className="text-xs text-muted-foreground">
                  60% quitado
                </p>
              </CardContent>
            </Card>
          </div>

          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Detalhes das Dívidas</CardTitle>
              <CardDescription>Acompanhamento de pagamentos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Cartão de Crédito", total: 5000, paid: 3000, status: "ativa", dueDate: "05/Dez" },
                { name: "Empréstimo Pessoal", total: 3000, paid: 1800, status: "ativa", dueDate: "15/Dez" },
              ].map((debt, i) => {
                const percentage = (debt.paid / debt.total) * 100;
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{debt.name}</p>
                        <p className="text-sm text-muted-foreground">Vencimento: {debt.dueDate}</p>
                      </div>
                      <Badge variant="secondary">Ativa</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        R$ {debt.paid} / R$ {debt.total} pagos
                      </span>
                      <span className="font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={percentage} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </>
  );
}
