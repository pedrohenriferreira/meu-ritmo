export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function getAvatarColor(name: string): string {
  // Gerar cor consistente baseada no nome
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    "oklch(0.7 0.15 0)", // Vermelho suave
    "oklch(0.7 0.15 30)", // Laranja suave
    "oklch(0.7 0.15 60)", // Amarelo suave
    "oklch(0.7 0.15 120)", // Verde suave
    "oklch(0.7 0.15 180)", // Ciano suave
    "oklch(0.7 0.15 240)", // Azul suave
    "oklch(0.7 0.15 270)", // Roxo suave
    "oklch(0.7 0.15 300)", // Magenta suave
  ];
  
  return colors[Math.abs(hash) % colors.length];
}
