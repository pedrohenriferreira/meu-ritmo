"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTransactionDialog({ open, onOpenChange }: AddTransactionDialogProps) {
  const [type, setType] = useState<"receita" | "despesa">("despesa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" style={{ background: 'oklch(0.145 0 0)' }}>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>
            Registre uma receita ou despesa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType("receita")}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                type === "receita"
                  ? "border-green-500 bg-green-500/10"
                  : "border-white/5 bg-white/5 hover:border-white/10"
              }`}
            >
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium">Receita</span>
            </button>
            <button
              type="button"
              onClick={() => setType("despesa")}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                type === "despesa"
                  ? "border-red-500 bg-red-500/10"
                  : "border-white/5 bg-white/5 hover:border-white/10"
              }`}
            >
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span className="font-medium">Despesa</span>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Input placeholder="Ex: Salário, Supermercado, Netflix..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor (R$)</label>
              <Input type="number" step="0.01" placeholder="0,00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>
            <Input placeholder="Ex: Alimentação, Transporte, Lazer..." />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
