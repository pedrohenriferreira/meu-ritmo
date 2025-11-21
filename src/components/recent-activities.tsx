import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, BookOpen, Heart, Briefcase, Droplet } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Completou: Exercício Matinal",
    time: "Há 2 horas",
    category: "Saúde",
    icon: Dumbbell,
  },
  {
    id: 2,
    title: "Meta atingida: Ler 30 minutos",
    time: "Há 4 horas",
    category: "Educação",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Sequência mantida: Meditação",
    time: "Há 6 horas",
    category: "Bem-estar",
    icon: Heart,
  },
  {
    id: 4,
    title: "Projeto concluído: Dashboard",
    time: "Ontem",
    category: "Trabalho",
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Hábito: Água 2L",
    time: "Ontem",
    category: "Saúde",
    icon: Droplet,
  },
];

export function RecentActivities() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <Icon className="h-4 w-4 text-white/70" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground/60">{activity.time}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {activity.category}
            </Badge>
          </div>
        );
      })}
    </div>
  );
}
