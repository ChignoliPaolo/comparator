"use client";

import type { OfferMetrics } from "@/types/offer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Trophy, TrendingUp, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

type AnalysisSectionProps = {
  metricsA: OfferMetrics;
  metricsB: OfferMetrics;
};

const CHART_COLORS = {
  offerA: "hsl(217, 91%, 60%)",
  offerB: "hsl(160, 84%, 39%)",
};

export function AnalysisSection({ metricsA, metricsB }: AnalysisSectionProps) {
  const winnerHourly = metricsA.veraTariffaOraria >= metricsB.veraTariffaOraria ? "A" : "B";
  const winnerHappiness = metricsA.happinessScore >= metricsB.happinessScore ? "A" : "B";

  const ralChartData = [
    { name: "Offerta A", value: Math.round(metricsA.ralLorda), fill: CHART_COLORS.offerA },
    { name: "Offerta B", value: Math.round(metricsB.ralLorda), fill: CHART_COLORS.offerB },
  ];
  const valoreRealeChartData = [
    { name: "Offerta A", value: Math.round(metricsA.valorePacchettoTotale), fill: CHART_COLORS.offerA },
    { name: "Offerta B", value: Math.round(metricsB.valorePacchettoTotale), fill: CHART_COLORS.offerB },
  ];

  const formatEuro = (v: number) => `€ ${v.toLocaleString("it-IT", { maximumFractionDigits: 0 })}`;
  const formatHourly = (v: number) => `€ ${v.toFixed(2)}/h`;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Confronto e risultati
        </h2>
        <Badge variant="offerA">Offerta A</Badge>
        <Badge variant="offerB">Offerta B</Badge>
      </div>

      {/* Winner badges */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-offerA/30 bg-offerA/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-offerA" />
              Migliore tariffa oraria reale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge
                variant={winnerHourly === "A" ? "winner" : "secondary"}
                className={winnerHourly === "A" ? "bg-offerA/20 text-offerA" : ""}
              >
                Offerta A: {formatHourly(metricsA.veraTariffaOraria)}
              </Badge>
              <span className="text-muted-foreground">vs</span>
              <Badge
                variant={winnerHourly === "B" ? "winner" : "secondary"}
                className={winnerHourly === "B" ? "bg-offerB/20 text-offerB" : ""}
              >
                Offerta B: {formatHourly(metricsB.veraTariffaOraria)}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Vince l&apos;offerta {winnerHourly} per valore reale per ora lavorata.
            </p>
          </CardContent>
        </Card>
        <Card className="border-offerB/30 bg-offerB/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Smile className="h-4 w-4 text-offerB" />
              Migliore qualità di vita ( Happiness Score )
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge
                variant={winnerHappiness === "A" ? "winner" : "secondary"}
                className={winnerHappiness === "A" ? "bg-offerA/20 text-offerA" : ""}
              >
                Offerta A: {metricsA.happinessScore.toFixed(1)}/10
              </Badge>
              <span className="text-muted-foreground">vs</span>
              <Badge
                variant={winnerHappiness === "B" ? "winner" : "secondary"}
                className={winnerHappiness === "B" ? "bg-offerB/20 text-offerB" : ""}
              >
                Offerta B: {metricsB.happinessScore.toFixed(1)}/10
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Vince l&apos;offerta {winnerHappiness} per interesse, ambiente e carriera.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visual breakdown: hourly rate card */}
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4 w-4 text-amber-500" />
            Vera tariffa oraria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Lavorando per l&apos;<strong className="text-offerA">Offerta A</strong> guadagni{" "}
            <strong>{formatHourly(metricsA.veraTariffaOraria)}</strong> reali. L&apos;
            <strong className="text-offerB">Offerta B</strong> paga{" "}
            <strong>{formatHourly(metricsB.veraTariffaOraria)}</strong> reali.
          </p>
        </CardContent>
      </Card>

      {/* Bar charts: RAL and Valore reale */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">RAL lorda (€/anno)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Retribuzione annua lorda totale (RAL + bonus).
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ralChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                  <XAxis type="number" tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))} />
                  <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => [formatEuro(v), "RAL"]} />
                  <Bar dataKey="value" name="RAL" radius={[0, 4, 4, 0]}>
                    {ralChartData.map((_, i) => (
                      <Cell key={i} fill={ralChartData[i].fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Valore reale netto (€/mese)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Netto + benefit − costi pendolarismo.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={valoreRealeChartData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                  <XAxis type="number" tickFormatter={(v) => `${v} €`} />
                  <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => [formatEuro(v), "Valore mensile"]} />
                  <Bar dataKey="value" name="Valore mensile" radius={[0, 4, 4, 0]}>
                    {valoreRealeChartData.map((_, i) => (
                      <Cell key={i} fill={valoreRealeChartData[i].fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
