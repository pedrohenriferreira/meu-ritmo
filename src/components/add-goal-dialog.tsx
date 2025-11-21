"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Wallet } from "lucide-react";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddGoalDialog({ open, onOpenChange }: AddGoalDialogProps) {
  const [category, setCategory] = useState<"fisica" | "mental" | "financeira">("fisica");
  const [period, setPeriod] = useState<"semanal" | "mensal">("semanal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    onOpenChange(false);
  };

  const categories = [
    { value: "fisica", label: "Física", icon: Activity, color: "text-green-500" },
    { value: "mental", label: "Mental", icon: Brain, color: "text-purple-500" },
    { value: "financeira", label: "Financeira", icon: Wallet, color: "text-blue-500" },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" style={{ background: 'oklch(0.145 0 0)' }}>
        <DialogHeader>
          <DialogTitle>Nova Meta</DialogTitle>
          <DialogDescription>
            Defina uma meta para acompanhar seu progresso
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      category === cat.value
                        ? "border-white/20 bg-white/10"
                        : "border-white/5 bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${cat.color}`} />
                    <span className="text-xs font-medium">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Período</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeriod("semanal")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  period === "semanal"
                    ? "border-white/20 bg-white/10"
                    : "border-white/5 bg-white/5 hover:border-white/10"
                }`}
              >
                Semanal
              </button>
              <button
                type="button"
                onClick={() => setPeriod("mensal")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  period === "mensal"
                    ? "border-white/20 bg-white/10"
                    : "border-white/5 bg-white/5 hover:border-white/10"
                }`}
              >
                Mensal
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Título da Meta</label>
            <Input placeholder="Ex: Treinar 4x na semana" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meta</label>
              <Input type="number" placeholder="7" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Unidade</label>
              <Input placeholder="dias, vezes, horas..." />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Meta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
