"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Seg", total: 85 },
  { name: "Ter", total: 92 },
  { name: "Qua", total: 78 },
  { name: "Qui", total: 88 },
  { name: "Sex", total: 95 },
  { name: "Sáb", total: 72 },
  { name: "Dom", total: 68 },
];

const chartConfig = {
  total: {
    label: "Produtividade",
    color: "hsl(0 0% 85%)",
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="rgba(255, 255, 255, 0.9)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            style={{ fill: 'rgba(255, 255, 255, 0.9)' }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.9)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            style={{ fill: 'rgba(255, 255, 255, 0.9)' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="total"
            fill="var(--color-total)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
