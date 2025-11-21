"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { OverviewChart } from "@/components/overview-chart";
import { RecentActivities } from "@/components/recent-activities";
import { GoalsProgress } from "@/components/goals-progress";
import { AddGoalDialog } from "@/components/add-goal-dialog";

export function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddGoalDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-2">Acompanhe seu progresso e performance</p>
          </div>
          <Button size="lg" className="shadow-sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Meta
          </Button>
        </div>
                <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/5 p-1 rounded-lg">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="goals" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Metas</TabsTrigger>
            <TabsTrigger value="habits" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Hábitos</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">
                    Produtividade
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-white/70"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">87%</div>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    +12% em relação ao mês passado
                  </p>
                  <Progress value={87} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">
                    Metas Concluídas
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-white/70"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">8/12</div>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    4 metas restantes este mês
                  </p>
                  <Progress value={67} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">
                    Sequência Atual
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-white/70"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">23 dias</div>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Seu melhor: 45 dias
                  </p>
                  <div className="mt-3 flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-full rounded-sm ${
                          i < 5 ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">
                    Horas Focadas
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-white/70"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">142h</div>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    +8h desde a última semana
                  </p>
                  <Progress value={78} className="mt-3" />
                </CardContent>
              </Card>
            </div>

            {/* Charts and Activities */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Progresso Semanal</CardTitle>
                  <CardDescription className="text-muted-foreground/60">
                    Seu desempenho nos últimos 7 dias
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <OverviewChart />
                </CardContent>
              </Card>

              <Card className="col-span-3 group hover:shadow-md hover:border-white/10 transition-all duration-300" style={{ background: 'oklch(0.205 0 0)' }}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Atividades Recentes</CardTitle>
                  <CardDescription className="text-muted-foreground/60">
                    Suas últimas realizações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivities />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <GoalsProgress />
          </TabsContent>

          <TabsContent value="habits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hábitos Diários</CardTitle>
                <CardDescription>
                  Acompanhe seus hábitos e construa uma rotina consistente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conteúdo de hábitos em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Análises Detalhadas</CardTitle>
                <CardDescription>
                  Insights profundos sobre seu desenvolvimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conteúdo de análises em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
