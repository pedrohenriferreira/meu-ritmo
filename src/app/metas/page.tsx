"use client";

import { useState } from "react";
import { GoalsProgress } from "@/components/goals-progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { AddGoalDialog } from "@/components/add-goal-dialog";

export default function MetasPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Metas</h1>
            <p className="text-muted-foreground/60 mt-1 text-sm">
              Gerencie suas metas semanais e mensais
            </p>
          </div>
          <Button size="lg" className="shadow-sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Meta
          </Button>
        </div>

      {/* Estatísticas */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'oklch(0.205 0 0)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Prazo</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 dias</div>
            <p className="text-xs text-muted-foreground">Meta semanal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ativas" className="space-y-6">
        <TabsList className="bg-white/5 p-1 rounded-lg">
          <TabsTrigger value="ativas" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Ativas</TabsTrigger>
          <TabsTrigger value="semanais" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Semanais</TabsTrigger>
          <TabsTrigger value="mensais" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Mensais</TabsTrigger>
          <TabsTrigger value="historico" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="ativas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas em Andamento (RB04)</CardTitle>
              <CardDescription>
                Metas semanais reiniciam toda segunda-feira, mensais reiniciam no dia 1
              </CardDescription>
            </CardHeader>
          </Card>
          <GoalsProgress />
        </TabsContent>

        <TabsContent value="semanais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas Semanais</CardTitle>
              <CardDescription>Reiniciam toda segunda-feira às 00:00</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Treinar 5 vezes", current: 3, target: 5, type: "fisica", daysLeft: 2 },
                { title: "Meditar todos os dias", current: 5, target: 7, type: "mental", daysLeft: 2 },
                { title: "Registrar gastos diariamente", current: 7, target: 7, type: "financeira", daysLeft: 2 },
              ].map((meta, i) => {
                const percentage = (meta.current / meta.target) * 100;
                return (
                  <div key={i} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{meta.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{meta.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {meta.daysLeft} dias restantes
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {meta.current} / {meta.target} concluído
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensais" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas Mensais</CardTitle>
              <CardDescription>Reiniciam no dia 1 do mês às 00:00</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Perder 2kg", current: 1.2, target: 2, type: "fisica", daysLeft: 12 },
                { title: "Ler 2 livros", current: 1, target: 2, type: "mental", daysLeft: 12 },
                { title: "Economizar R$ 1000", current: 650, target: 1000, type: "financeira", daysLeft: 12 },
                { title: "Dormir 8h por dia", current: 22, target: 30, type: "fisica", daysLeft: 12 },
              ].map((meta, i) => {
                const percentage = (meta.current / meta.target) * 100;
                return (
                  <div key={i} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{meta.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{meta.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {meta.daysLeft} dias restantes
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {meta.current} / {meta.target}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Metas</CardTitle>
              <CardDescription>Metas concluídas e falhadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Treinar 4 vezes", period: "Semana passada", status: "concluida", achievement: "4/4" },
                  { title: "Meditar 7 dias", period: "Semana passada", status: "concluida", achievement: "7/7" },
                  { title: "Economizar R$ 800", period: "Outubro", status: "concluida", achievement: "R$ 950" },
                  { title: "Ler 2 livros", period: "Outubro", status: "falhou", achievement: "1/2" },
                ].map((meta, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{meta.title}</p>
                      <p className="text-sm text-muted-foreground">{meta.period}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{meta.achievement}</span>
                      {meta.status === "concluida" ? (
                        <Badge className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Concluída
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" />
                          Falhou
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </>
  );
}
