"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, Meh, Frown } from "lucide-react";

interface AddMoodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMoodDialog({ open, onOpenChange }: AddMoodDialogProps) {
  const [mood, setMood] = useState<number | null>(null);
  const [stress, setStress] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    onOpenChange(false);
  };

  const moods = [
    { value: 1, emoji: "😢", label: "Muito Mal" },
    { value: 2, emoji: "😟", label: "Mal" },
    { value: 3, emoji: "😐", label: "Neutro" },
    { value: 4, emoji: "😊", label: "Bem" },
    { value: 5, emoji: "😄", label: "Muito Bem" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" style={{ background: 'oklch(0.145 0 0)' }}>
        <DialogHeader>
          <DialogTitle>Registrar Humor</DialogTitle>
          <DialogDescription>
            Como você está se sentindo agora?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Humor Atual</label>
            <div className="grid grid-cols-5 gap-2">
              {moods.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    mood === m.value 
                      ? "border-white/20 bg-white/10" 
                      : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Nível de Estresse (1-10)</label>
            <div className="flex items-center gap-2">
              <Input 
                type="range" 
                min="1" 
                max="10" 
                value={stress || 5}
                onChange={(e) => setStress(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold w-8 text-center">{stress || 5}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sem estresse</span>
              <span>Muito estressado</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notas (opcional)</label>
            <Input placeholder="Como foi seu dia? O que te deixou assim?" />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Registrar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
