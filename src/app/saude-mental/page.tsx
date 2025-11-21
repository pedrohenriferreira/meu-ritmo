"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile, Frown, Meh, Activity as ActivityIcon, Book, Wind, Plus } from "lucide-react";
import { AddMoodDialog } from "@/components/add-mood-dialog";

export default function SaudeMentalPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddMoodDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Saúde Mental</h1>
            <p className="text-muted-foreground/60 mt-1 text-sm">
              Monitore seu humor, estresse e bem-estar emocional
            </p>
          </div>
          <Button size="lg" className="shadow-sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Humor
          </Button>
        </div>

      {/* Score Card */}
      <Card className="border-l-4 border-l-purple-500" style={{ background: 'oklch(0.205 0 0)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Score de Saúde Mental</CardTitle>
              <CardDescription>Seu bem-estar emocional hoje</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">82</div>
              <p className="text-sm text-muted-foreground">de 100</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={82} className="h-3" />
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Humor</p>
              <p className="text-sm font-medium">85% (40%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Estresse</p>
              <p className="text-sm font-medium">78% (20%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Sono</p>
              <p className="text-sm font-medium">84% (20%)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Hábitos</p>
              <p className="text-sm font-medium">80% (20%)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="humor" className="space-y-6">
        <TabsList className="bg-white/5 p-1 rounded-lg">
          <TabsTrigger value="humor" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Humor</TabsTrigger>
          <TabsTrigger value="estresse" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Estresse</TabsTrigger>
          <TabsTrigger value="habitos" className="rounded-md data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">Hábitos de Bem-Estar</TabsTrigger>
        </TabsList>

        <TabsContent value="humor" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Humor Hoje
                </CardTitle>
                <Smile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-4xl">😊</div>
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">de 5 (Bom)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média Semanal
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2</div>
                <p className="text-xs text-muted-foreground">
                  Humor estável e positivo
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tendência
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  <div>
                    <div className="text-sm font-bold text-green-600">+8%</div>
                    <p className="text-xs text-muted-foreground">vs semana passada</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Humor */}
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Histórico de Humor</CardTitle>
              <CardDescription>Últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Hoje", mood: 4, emoji: "😊", label: "Bom" },
                  { day: "Ontem", mood: 4, emoji: "😊", label: "Bom" },
                  { day: "2 dias atrás", mood: 3, emoji: "😐", label: "Neutro" },
                  { day: "3 dias atrás", mood: 5, emoji: "😄", label: "Excelente" },
                  { day: "4 dias atrás", mood: 4, emoji: "😊", label: "Bom" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="font-medium">{item.day}</p>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                    <Badge>{item.mood}/5</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estresse" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nível Hoje
                </CardTitle>
                <Frown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  de 5 (Baixo)
                </p>
                <Badge className="mt-2" variant="secondary">Controlado</Badge>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média Semanal
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4</div>
                <p className="text-xs text-muted-foreground">
                  Estresse sob controle
                </p>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Alertas
                </CardTitle>
                <ActivityIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Nenhum alerta este mês
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Alerta RB21 */}
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚠️</span>
                Alerta de Estresse (RB21)
              </CardTitle>
              <CardDescription>
                Sistema monitora estresse alto (&gt;4) por 3+ dias consecutivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Atualmente sem alertas. Continue assim! 💪
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habitos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leitura</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5/7</div>
                <p className="text-xs text-muted-foreground">dias esta semana</p>
                <Progress value={71} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meditação</CardTitle>
                <Wind className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6/7</div>
                <p className="text-xs text-muted-foreground">dias esta semana</p>
                <Progress value={86} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Journaling</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/7</div>
                <p className="text-xs text-muted-foreground">dias esta semana</p>
                <Progress value={57} className="mt-2" />
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Offline</CardTitle>
                <Meh className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7/7</div>
                <p className="text-xs text-muted-foreground">dias esta semana</p>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detalhes dos Hábitos */}
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Hábitos de Bem-Estar (RB22)</CardTitle>
              <CardDescription>
                Cada hábito concluído gera pontos para o score mental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { habit: "Leitura", duration: "30 min", today: true },
                  { habit: "Meditação", duration: "15 min", today: true },
                  { habit: "Journaling", duration: "10 min", today: false },
                  { habit: "Tempo Offline", duration: "2h", today: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="space-y-1">
                      <p className="font-medium">{item.habit}</p>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                    </div>
                    <Badge variant={item.today ? "default" : "secondary"}>
                      {item.today ? "Concluído hoje" : "Pendente"}
                    </Badge>
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
