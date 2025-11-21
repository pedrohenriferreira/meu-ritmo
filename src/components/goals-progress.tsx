import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const goals = [
  {
    id: 1,
    title: "Aprender TypeScript",
    description: "Dominar os fundamentos e conceitos avançados",
    progress: 75,
    category: "Educação",
    deadline: "30 Nov 2025",
    status: "Em progresso",
  },
  {
    id: 2,
    title: "Exercícios 5x por semana",
    description: "Manter rotina de exercícios físicos",
    progress: 60,
    category: "Saúde",
    deadline: "31 Dez 2025",
    status: "Em progresso",
  },
  {
    id: 3,
    title: "Meditar diariamente",
    description: "Praticar mindfulness 15 minutos por dia",
    progress: 90,
    category: "Bem-estar",
    deadline: "31 Dez 2025",
    status: "Quase lá",
  },
  {
    id: 4,
    title: "Ler 12 livros",
    description: "Um livro por mês durante o ano",
    progress: 45,
    category: "Educação",
    deadline: "31 Dez 2025",
    status: "Em progresso",
  },
];

export function GoalsProgress() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <CardDescription>{goal.description}</CardDescription>
              </div>
              <Badge
                variant={goal.progress >= 80 ? "default" : "secondary"}
              >
                {goal.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-medium">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Badge variant="outline">{goal.category}</Badge>
              <span className="text-muted-foreground">
                Prazo: {goal.deadline}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
