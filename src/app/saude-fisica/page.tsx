"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Moon, Droplets, Footprints, Apple, Plus } from "lucide-react";
import { AddActivityDialog } from "@/components/add-activity-dialog";

export default function SaudeFisicaPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddActivityDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Saúde Física</h1>
            <p className="text-muted-foreground/60 mt-1 text-sm">
              Acompanhe seus treinos, sono, hidratação e nutrição
            </p>
          </div>
          <Button size="lg" className="shadow-sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Atividade
          </Button>
        </div>

      {/* Score Card */}
      <Card className="border-l-4 border-l-green-500" style={{ background: 'oklch(0.205 0 0)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Score de Saúde Física</CardTitle>
              <CardDescription>Seu desempenho geral hoje</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">87</div>
              <p className="text-sm text-muted-foreground">de 100</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={87} className="h-3" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Treinos</p>
              <p className="text-sm font-medium">92% (40%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Sono</p>
              <p className="text-sm font-medium">85% (25%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Hidratação</p>
              <p className="text-sm font-medium">90% (15%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Passos</p>
              <p className="text-sm font-medium">78% (10%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Nutrição</p>
              <p className="text-sm font-medium">88% (10%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="treinos" className="space-y-6">
        <TabsList className="bg-white/5 p-1 rounded-lg">
          <TabsTrigger value="treinos" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Treinos</TabsTrigger>
          <TabsTrigger value="sono" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Sono</TabsTrigger>
          <TabsTrigger value="hidratacao" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Hidratação</TabsTrigger>
          <TabsTrigger value="passos" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Passos</TabsTrigger>
          <TabsTrigger value="nutricao" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Nutrição</TabsTrigger>
        </TabsList>

        <TabsContent value="treinos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Treinos esta semana
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Meta: 5 treinos/semana
                </p>
                <Progress value={80} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Horas
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.5h</div>
                <p className="text-xs text-muted-foreground">
                  Esta semana
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Calorias Queimadas
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,450</div>
                <p className="text-xs text-muted-foreground">
                  Esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Treinos */}
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Últimos Treinos</CardTitle>
              <CardDescription>Histórico de atividades físicas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Musculação", duration: "60 min", intensity: "Alta", date: "Hoje" },
                  { type: "Cardio", duration: "30 min", intensity: "Média", date: "Ontem" },
                  { type: "Funcional", duration: "45 min", intensity: "Alta", date: "2 dias atrás" },
                ].map((treino, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{treino.type}</p>
                      <p className="text-sm text-muted-foreground">{treino.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{treino.duration}</Badge>
                      <Badge>{treino.intensity}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sono" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média de Sono
                </CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.5h</div>
                <p className="text-xs text-muted-foreground">
                  Últimos 7 dias
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Qualidade do Sono
                </CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <p className="text-xs text-muted-foreground">
                  de 5.0 (Boa)
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Última Noite
                </CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.0h</div>
                <p className="text-xs text-muted-foreground">
                  Qualidade: Excelente
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hidratacao" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hoje
                </CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1L</div>
                <p className="text-xs text-muted-foreground">
                  de 2.5L (84%)
                </p>
                <Progress value={84} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média Semanal
                </CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3L</div>
                <p className="text-xs text-muted-foreground">
                  92% da meta diária
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sequência
                </CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 dias</div>
                <p className="text-xs text-muted-foreground">
                  Atingindo a meta
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="passos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hoje
                </CardTitle>
                <Footprints className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,456</div>
                <p className="text-xs text-muted-foreground">
                  de 10,000 (85%)
                </p>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média Semanal
                </CardTitle>
                <Footprints className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,234</div>
                <p className="text-xs text-muted-foreground">
                  92% da meta
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Distância
                </CardTitle>
                <Footprints className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.4 km</div>
                <p className="text-xs text-muted-foreground">
                  Hoje
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutricao" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Refeições Hoje
                </CardTitle>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  de 5 planejadas
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Qualidade
                </CardTitle>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5</div>
                <p className="text-xs text-muted-foreground">
                  de 5.0 (Muito Boa)
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consistência
                </CardTitle>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 dias</div>
                <p className="text-xs text-muted-foreground">
                  Alimentação equilibrada
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </>
  );
}
