"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Brain, Wallet, Target, Lightbulb, User, Settings, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { getInitials, getAvatarColor } from "@/lib/utils/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Principal",
    items: [
      { title: "Dashboard", href: "/", icon: Home },
    ],
  },
  {
    title: "Pilares",
    items: [
      { title: "Saúde Física", href: "/saude-fisica", icon: Activity },
      { title: "Saúde Mental", href: "/saude-mental", icon: Brain },
      { title: "Saúde Financeira", href: "/saude-financeira", icon: Wallet },
    ],
  },
  {
    title: "Acompanhamento",
    items: [
      { title: "Metas", href: "/metas", icon: Target },
      { title: "Insights", href: "/insights", icon: Lightbulb },
    ],
  },
  {
    title: "Conta",
    items: [
      { title: "Perfil", href: "/perfil", icon: User },
      { title: "Configurações", href: "/configuracoes", icon: Settings },
    ],
  },
];

function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  const initials = getInitials(user.name);
  const avatarColor = getAvatarColor(user.name);

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2.5 backdrop-blur-sm">
      <Avatar className="h-9 w-9">
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name} />
        ) : null}
        <AvatarFallback 
          className="font-medium text-xs text-black"
          style={{ background: avatarColor }}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col text-sm">
        <span className="font-medium truncate">{user.name}</span>
        <span className="text-xs text-muted-foreground/60 truncate">{user.email}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/perfil">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/configuracoes">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AppSidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="border-b border-white/5 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-black shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">Meu Ritmo</span>
            <span className="text-xs text-muted-foreground/60">Performance Pessoal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-3 flex-1">
        {menuItems.map((section) => (
          <SidebarGroup key={section.title} className="mb-3">
            <SidebarGroupLabel className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground/50">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className="h-8 rounded-lg transition-all duration-300 hover:bg-white/5 data-[active=true]:bg-white/10"
                      >
                        <Link href={item.href}>
                          <Icon className="h-4 w-4" />
                          <span className="font-normal">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-3 mt-auto">
        <UserProfile />
      </SidebarFooter>
    </>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Não renderizar sidebar em rotas de autenticação
  if (pathname?.startsWith('/login') || pathname?.startsWith('/cadastro') || pathname?.startsWith('/recuperar-senha')) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex">
          <AppSidebarContent />
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Header */}
          <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar>
                  <AppSidebarContent />
                </Sidebar>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <span className="font-bold">Meu Ritmo</span>
            </div>
          </header>

          {/* Desktop Header */}
          <header className="sticky top-0 z-50 hidden h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 md:flex">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>

          {/* Page Content */}
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
