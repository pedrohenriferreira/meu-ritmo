import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  AlertCircle, 
  ThumbsUp, 
  TrendingUp, 
  Eye, 
  EyeOff,
  Activity,
  Brain,
  Wallet
} from "lucide-react";

const insights = [
  {
    id: 1,
    type: "alerta",
    priority: "alta",
    title: "Estresse elevado persistente",
    message: "Você está com níveis altos de estresse há 3 dias consecutivos. Considere práticas de relaxamento como meditação, exercícios leves ou conversar com alguém de confiança.",
    pillars: ["mental"],
    viewed: false,
    date: "Hoje",
  },
  {
    id: 2,
    type: "correlacao",
    priority: "alta",
    title: "Estresse e gastos elevados detectados",
    message: "Identificamos estresse alto junto com gastos acima do normal. Isso pode indicar compras emocionais. Considere revisar seu orçamento e praticar técnicas de controle emocional.",
    pillars: ["mental", "financeira"],
    viewed: false,
    date: "Hoje",
  },
  {
    id: 3,
    type: "alerta",
    priority: "media",
    title: "Orçamento de Alimentação em 80%",
    message: "Você já gastou 80% do orçamento de Alimentação. Cuidado para não ultrapassar o limite!",
    pillars: ["financeira"],
    viewed: false,
    date: "Ontem",
  },
  {
    id: 4,
    type: "recomendacao",
    priority: "media",
    title: "Humor baixo e inatividade física",
    message: "Notamos que seu humor está baixo e você não tem praticado exercícios. Atividade física pode melhorar significativamente o bem-estar mental. Que tal uma caminhada leve?",
    pillars: ["mental", "fisica"],
    viewed: true,
    date: "2 dias atrás",
  },
  {
    id: 5,
    type: "elogio",
    priority: "baixa",
    title: "Excelente consistência nos treinos!",
    message: "Parabéns! Você treinou 5 vezes esta semana. Continue assim para alcançar seus objetivos!",
    pillars: ["fisica"],
    viewed: true,
    date: "3 dias atrás",
  },
  {
    id: 6,
    type: "elogio",
    priority: "baixa",
    title: "Finanças sob controle!",
    message: "Todos os seus gastos estão dentro do orçamento planejado. Ótimo controle financeiro!",
    pillars: ["financeira"],
    viewed: true,
    date: "5 dias atrás",
  },
];

const priorityConfig = {
  alta: { color: "destructive", icon: AlertCircle },
  media: { color: "secondary", icon: Lightbulb },
  baixa: { color: "outline", icon: ThumbsUp },
};

const typeConfig = {
  alerta: { emoji: "⚠️", label: "Alerta" },
  recomendacao: { emoji: "💡", label: "Recomendação" },
  elogio: { emoji: "👏", label: "Elogio" },
  correlacao: { emoji: "🔗", label: "Correlação" },
};

const pillarIcons = {
  fisica: { icon: Activity, label: "Saúde Física" },
  mental: { icon: Brain, label: "Saúde Mental" },
  financeira: { icon: Wallet, label: "Saúde Financeira" },
};

export default function InsightsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
          <p className="text-muted-foreground">
            Insights automáticos baseados em padrões detectados
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.length}</div>
            <p className="text-xs text-muted-foreground">Insights gerados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Não Visualizados</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.filter((i) => !i.viewed).length}
            </div>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.filter((i) => i.priority === "alta").length}
            </div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Novos insights</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="alertas">Alertas</TabsTrigger>
          <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
          <TabsTrigger value="elogios">Elogios</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights Automáticos (RB40-RB41)</CardTitle>
              <CardDescription>
                Sistema detecta padrões e correlações entre pilares. Insights não podem ser apagados, apenas marcados como visualizados.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {insights.map((insight) => {
              const PriorityIcon = priorityConfig[insight.priority as keyof typeof priorityConfig].icon;
              const typeInfo = typeConfig[insight.type as keyof typeof typeConfig];
              
              return (
                <Card
                  key={insight.id}
                  className={`${!insight.viewed ? "border-l-4 border-l-primary" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-2xl">{typeInfo.emoji}</span>
                          <Badge variant={priorityConfig[insight.priority as keyof typeof priorityConfig].color as any}>
                            <PriorityIcon className="mr-1 h-3 w-3" />
                            {insight.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{typeInfo.label}</Badge>
                          {insight.pillars.map((pillar) => {
                            const PillarIcon = pillarIcons[pillar as keyof typeof pillarIcons].icon;
                            return (
                              <Badge key={pillar} variant="secondary" className="gap-1">
                                <PillarIcon className="h-3 w-3" />
                                {pillarIcons[pillar as keyof typeof pillarIcons].label}
                              </Badge>
                            );
                          })}
                        </div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      {!insight.viewed ? (
                        <Badge variant="default" className="gap-1 ml-2">
                          <EyeOff className="h-3 w-3" />
                          Novo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1 ml-2">
                          <Eye className="h-3 w-3" />
                          Visualizado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{insight.date}</span>
                      {!insight.viewed && (
                        <Button size="sm" variant="outline">
                          Marcar como Visualizado
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-4">
          <div className="space-y-4">
            {insights
              .filter((i) => i.type === "alerta")
              .map((insight) => {
                const PriorityIcon = priorityConfig[insight.priority as keyof typeof priorityConfig].icon;
                const typeInfo = typeConfig[insight.type as keyof typeof typeConfig];
                
                return (
                  <Card key={insight.id} className="border-l-4 border-l-red-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-2xl">{typeInfo.emoji}</span>
                            <Badge variant="destructive">
                              <PriorityIcon className="mr-1 h-3 w-3" />
                              {insight.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                      <span className="text-xs text-muted-foreground">{insight.date}</span>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="recomendacoes" className="space-y-4">
          <div className="space-y-4">
            {insights
              .filter((i) => i.type === "recomendacao" || i.type === "correlacao")
              .map((insight) => {
                const typeInfo = typeConfig[insight.type as keyof typeof typeConfig];
                
                return (
                  <Card key={insight.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-2xl">{typeInfo.emoji}</span>
                            <Badge variant="secondary">{typeInfo.label}</Badge>
                          </div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                      <span className="text-xs text-muted-foreground">{insight.date}</span>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="elogios" className="space-y-4">
          <div className="space-y-4">
            {insights
              .filter((i) => i.type === "elogio")
              .map((insight) => {
                const typeInfo = typeConfig[insight.type as keyof typeof typeConfig];
                
                return (
                  <Card key={insight.id} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-2xl">{typeInfo.emoji}</span>
                            <Badge variant="outline">{typeInfo.label}</Badge>
                          </div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{insight.message}</p>
                      <span className="text-xs text-muted-foreground">{insight.date}</span>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
