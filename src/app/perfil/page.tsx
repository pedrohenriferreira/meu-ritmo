import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Star, 
  Zap, 
  TrendingUp, 
  Award, 
  Calendar,
  Settings,
  Bell,
  Moon,
  Globe,
  Lock,
  LogOut,
  Mail,
  Shield
} from "lucide-react";

const userData = {
  name: "Pedro Nogueira",
  email: "pedro@example.com",
  initials: "PN",
  level: 12,
  currentXP: 2450,
  xpToNextLevel: 3000,
  totalXP: 14450,
  streak: 18,
  longestStreak: 45,
  joinDate: "01/11/2024",
  lastActive: "Hoje às 14:30",
};

const stats = [
  { label: "Metas Completadas", value: "32", icon: Award },
  { label: "Insights Gerados", value: "68", icon: TrendingUp },
  { label: "Conquistas", value: "5/8", icon: Star },
  { label: "Dias Ativos", value: "87", icon: Calendar },
];

export default function PerfilPage() {
  const xpProgress = (userData.currentXP / userData.xpToNextLevel) * 100;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Perfil</h2>
          <p className="text-muted-foreground">
            Gerencie sua conta e configurações
          </p>
        </div>
      </div>

      {/* Cabeçalho do Perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {userData.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-2xl font-bold">{userData.name}</h3>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>

              {/* XP e Nível */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      Nível {userData.level}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Zap className="h-3 w-3" />
                      {userData.currentXP} / {userData.xpToNextLevel} XP
                    </Badge>
                  </div>
                </div>
                <Progress value={xpProgress} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {userData.xpToNextLevel - userData.currentXP} XP para o próximo nível
                </p>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900">
                    <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userData.streak}</p>
                    <p className="text-xs text-muted-foreground">Dias de Sequência</p>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <p className="text-sm font-medium">Melhor Sequência</p>
                  <p className="text-xs text-muted-foreground">{userData.longestStreak} dias</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="informacoes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="informacoes">Informações</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>Detalhes da sua conta e estatísticas gerais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Nome Completo</p>
                      <p className="text-sm text-muted-foreground">{userData.name}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Membro desde</p>
                      <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">XP Total Acumulado</p>
                      <p className="text-sm text-muted-foreground">{userData.totalXP} XP</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Último acesso</p>
                      <p className="text-sm text-muted-foreground">{userData.lastActive}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Personalize sua experiência no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Notificações</p>
                    <p className="text-sm text-muted-foreground">Receber alertas e lembretes</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Tema</p>
                    <p className="text-sm text-muted-foreground">Modo claro ou escuro</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Sistema</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Idioma</p>
                    <p className="text-sm text-muted-foreground">Português (Brasil)</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Alterar</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Horário de Lembrete</p>
                    <p className="text-sm text-muted-foreground">Definir quando receber lembretes</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Alterar Senha</p>
                    <p className="text-sm text-muted-foreground">Atualizar sua senha de acesso</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Alterar</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Autenticação em Duas Etapas</p>
                    <p className="text-sm text-muted-foreground">Ativada</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Gerenciar</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Sessões Ativas</p>
                    <p className="text-sm text-muted-foreground">Gerenciar dispositivos conectados</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Ver Todas</Button>
              </div>

              <Separator />

              <div className="pt-4">
                <Button variant="destructive" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>Ações irreversíveis da conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Excluir Conta</p>
                  <p className="text-sm text-muted-foreground">
                    Remove permanentemente sua conta e todos os dados
                  </p>
                </div>
                <Button variant="destructive" size="sm">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
