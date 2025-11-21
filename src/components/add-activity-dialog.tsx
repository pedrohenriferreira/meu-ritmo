"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Moon, Droplets, Apple } from "lucide-react";

interface AddActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddActivityDialog({ open, onOpenChange }: AddActivityDialogProps) {
  const [activeTab, setActiveTab] = useState("treino");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" style={{ background: 'oklch(0.145 0 0)' }}>
        <DialogHeader>
          <DialogTitle>Adicionar Atividade Física</DialogTitle>
          <DialogDescription>
            Registre sua atividade física para acompanhar seu progresso
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="treino" className="data-[state=active]:bg-white/10">
              <Dumbbell className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="sono" className="data-[state=active]:bg-white/10">
              <Moon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="agua" className="data-[state=active]:bg-white/10">
              <Droplets className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="alimentacao" className="data-[state=active]:bg-white/10">
              <Apple className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="treino" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Treino</label>
                <Input placeholder="Ex: Musculação, Corrida, Yoga..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duração (min)</label>
                  <Input type="number" placeholder="60" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Intensidade</label>
                  <Input type="number" min="1" max="10" placeholder="1-10" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sono" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horas Dormidas</label>
                  <Input type="number" step="0.5" placeholder="8" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Qualidade (1-10)</label>
                  <Input type="number" min="1" max="10" placeholder="8" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agua" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantidade (ml)</label>
                <Input type="number" placeholder="500" />
              </div>
            </TabsContent>

            <TabsContent value="alimentacao" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Refeição</label>
                <Input placeholder="Ex: Café da manhã, Almoço..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Input placeholder="O que você comeu?" />
              </div>
            </TabsContent>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
