"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Dumbbell, 
  Brain, 
  Wallet,
  Plus,
  Trash2,
  Edit,
  Save,
  X
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("perfil");

  return (
    <div className="flex-1 space-y-6 p-6 md:p-10 pt-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground/60 mt-1 text-sm">
          Personalize sua experiência e configure suas atividades
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/5 p-1 rounded-lg grid w-full grid-cols-6">
          <TabsTrigger value="perfil" className="rounded-md data-[state=active]:bg-white/10">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="treinos" className="rounded-md data-[state=active]:bg-white/10">
            <Dumbbell className="h-4 w-4 mr-2" />
            Treinos
          </TabsTrigger>
          <TabsTrigger value="mental" className="rounded-md data-[state=active]:bg-white/10">
            <Brain className="h-4 w-4 mr-2" />
            Atividades Mentais
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="rounded-md data-[state=active]:bg-white/10">
            <Wallet className="h-4 w-4 mr-2" />
            Categorias
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="rounded-md data-[state=active]:bg-white/10">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="avancado" className="rounded-md data-[state=active]:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Avançado
          </TabsTrigger>
        </TabsList>

        {/* PERFIL */}
        <TabsContent value="perfil" className="space-y-6">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Seus dados básicos de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome Completo</label>
                  <Input placeholder="João Silva" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="joao@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data de Nascimento</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Peso (kg)</label>
                  <Input type="number" placeholder="70" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Altura (cm)</label>
                  <Input type="number" placeholder="175" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gênero</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Masculino", "Feminino", "Outro", "Prefiro não dizer"].map((genero) => (
                    <Button
                      key={genero}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {genero}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TREINOS */}
        <TabsContent value="treinos" className="space-y-6">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tipos de Treino</CardTitle>
                  <CardDescription>Configure os treinos que você pratica</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Treino
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Musculação", category: "Força", duration: 60, intensity: 8, color: "#ef4444" },
                  { name: "Corrida", category: "Cardio", duration: 30, intensity: 7, color: "#3b82f6" },
                  { name: "Yoga", category: "Flexibilidade", duration: 45, intensity: 4, color: "#8b5cf6" },
                  { name: "Natação", category: "Cardio", duration: 45, intensity: 6, color: "#06b6d4" },
                ].map((treino, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: treino.color + "20" }}
                      >
                        <Dumbbell className="h-5 w-5" style={{ color: treino.color }} />
                      </div>
                      <div>
                        <p className="font-medium">{treino.name}</p>
                        <p className="text-sm text-muted-foreground">{treino.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{treino.duration} min</p>
                        <p className="text-xs text-muted-foreground">Intensidade: {treino.intensity}/10</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ATIVIDADES MENTAIS */}
        <TabsContent value="mental" className="space-y-6">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Atividades de Bem-Estar</CardTitle>
                  <CardDescription>Configure suas práticas de saúde mental</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Atividade
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Meditação", category: "Mindfulness", frequency: "Diária", color: "#8b5cf6" },
                  { name: "Leitura", category: "Aprendizado", frequency: "5x/semana", color: "#06b6d4" },
                  { name: "Journaling", category: "Reflexão", frequency: "Diária", color: "#10b981" },
                  { name: "Terapia", category: "Profissional", frequency: "1x/semana", color: "#f59e0b" },
                ].map((atividade, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: atividade.color + "20" }}
                      >
                        <Brain className="h-5 w-5" style={{ color: atividade.color }} />
                      </div>
                      <div>
                        <p className="font-medium">{atividade.name}</p>
                        <p className="text-sm text-muted-foreground">{atividade.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge variant="outline">{atividade.frequency}</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CATEGORIAS FINANCEIRAS */}
        <TabsContent value="financeiro" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Categorias de Despesas</CardTitle>
                    <CardDescription>Organize seus gastos</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Moradia", budget: 2000, color: "#ef4444" },
                    { name: "Alimentação", budget: 800, color: "#f59e0b" },
                    { name: "Transporte", budget: 400, color: "#3b82f6" },
                    { name: "Lazer", budget: 300, color: "#8b5cf6" },
                  ].map((cat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-lg"
                          style={{ backgroundColor: cat.color + "20" }}
                        />
                        <div>
                          <p className="font-medium text-sm">{cat.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Orçamento: R$ {cat.budget}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card style={{ background: 'oklch(0.205 0 0)' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Categorias de Receitas</CardTitle>
                    <CardDescription>Fontes de renda</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Salário", color: "#10b981" },
                    { name: "Freelance", color: "#06b6d4" },
                    { name: "Investimentos", color: "#8b5cf6" },
                  ].map((cat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-lg"
                          style={{ backgroundColor: cat.color + "20" }}
                        />
                        <p className="font-medium text-sm">{cat.name}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* NOTIFICAÇÕES */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Controle como e quando você recebe alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  title: "Lembretes de Metas",
                  description: "Receba lembretes diários sobre suas metas",
                  enabled: true,
                },
                {
                  title: "Relatório Semanal",
                  description: "Resumo do seu progresso toda segunda-feira",
                  enabled: true,
                },
                {
                  title: "Relatório Mensal",
                  description: "Análise completa todo dia 1º do mês",
                  enabled: true,
                },
                {
                  title: "Alertas de Orçamento",
                  description: "Aviso quando atingir 80% do orçamento",
                  enabled: true,
                },
                {
                  title: "Conquistas",
                  description: "Notificação ao desbloquear achievement",
                  enabled: true,
                },
                {
                  title: "Insights Automáticos",
                  description: "Sugestões baseadas nos seus dados",
                  enabled: false,
                },
              ].map((notif, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/5"
                >
                  <div>
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                  </div>
                  <Button
                    variant={notif.enabled ? "default" : "outline"}
                    size="sm"
                  >
                    {notif.enabled ? "Ativado" : "Desativado"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AVANÇADO */}
        <TabsContent value="avancado" className="space-y-6">
          <Card style={{ background: 'oklch(0.205 0 0)' }}>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>Opções de privacidade e personalização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tema</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["Escuro", "Claro", "Automático"].map((tema) => (
                      <Button
                        key={tema}
                        variant={tema === "Escuro" ? "default" : "outline"}
                        size="sm"
                      >
                        {tema}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Formato de Data</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["DD/MM/YYYY", "MM/DD/YYYY"].map((formato) => (
                      <Button
                        key={formato}
                        variant={formato === "DD/MM/YYYY" ? "default" : "outline"}
                        size="sm"
                      >
                        {formato}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Primeiro Dia da Semana</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Domingo", "Segunda"].map((dia) => (
                      <Button
                        key={dia}
                        variant={dia === "Domingo" ? "default" : "outline"}
                        size="sm"
                      >
                        {dia}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium mb-4">Privacidade e Dados</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Exportar Meus Dados
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
