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

type AnalysisSectionProps = {
  metricsA: OfferMetrics;
  metricsB: OfferMetrics;
};

const CHART_COLORS = {
  offerA: "hsl(217, 91%, 58%)",
  offerB: "hsl(162, 73%, 42%)",
};

export function AnalysisSection({ metricsA, metricsB }: AnalysisSectionProps) {
  const winnerHourly =
    metricsA.veraTariffaOraria >= metricsB.veraTariffaOraria ? "A" : "B";
  const winnerHappiness =
    metricsA.happinessScore >= metricsB.happinessScore ? "A" : "B";

  const ralChartData = [
    {
      name: "Offerta A",
      value: Math.round(metricsA.ralLorda),
      fill: CHART_COLORS.offerA,
    },
    {
      name: "Offerta B",
      value: Math.round(metricsB.ralLorda),
      fill: CHART_COLORS.offerB,
    },
  ];
  const valoreRealeChartData = [
    {
      name: "Offerta A",
      value: Math.round(metricsA.valorePacchettoTotale),
      fill: CHART_COLORS.offerA,
    },
    {
      name: "Offerta B",
      value: Math.round(metricsB.valorePacchettoTotale),
      fill: CHART_COLORS.offerB,
    },
  ];

  const formatEuro = (v: number) =>
    `€ ${v.toLocaleString("it-IT", { maximumFractionDigits: 0 })}`;
  const formatHourly = (v: number) => `€ ${v.toFixed(2)}/h`;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Confronto e risultati
        </h2>
        <Badge variant="offerA" className="rounded-lg px-3 py-1">
          Offerta A
        </Badge>
        <Badge variant="offerB" className="rounded-lg px-3 py-1">
          Offerta B
        </Badge>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card className="border-offerA/30 bg-gradient-to-br from-offerA/5 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-offerA" />
              Migliore tariffa oraria reale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={winnerHourly === "A" ? "winner" : "secondary"}
                className={
                  winnerHourly === "A"
                    ? "bg-offerA/20 text-offerA-dark font-semibold"
                    : ""
                }
              >
                Offerta A: {formatHourly(metricsA.veraTariffaOraria)}
              </Badge>
              <span className="text-slate-400">vs</span>
              <Badge
                variant={winnerHourly === "B" ? "winner" : "secondary"}
                className={
                  winnerHourly === "B"
                    ? "bg-offerB/20 text-offerB-dark font-semibold"
                    : ""
                }
              >
                Offerta B: {formatHourly(metricsB.veraTariffaOraria)}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Vince l&apos;offerta {winnerHourly} per valore reale per ora
              lavorata.
            </p>
          </CardContent>
        </Card>
        <Card className="border-offerB/30 bg-gradient-to-br from-offerB/5 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Smile className="h-5 w-5 text-offerB" />
              Migliore qualità di vita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={winnerHappiness === "A" ? "winner" : "secondary"}
                className={
                  winnerHappiness === "A"
                    ? "bg-offerA/20 text-offerA-dark font-semibold"
                    : ""
                }
              >
                Offerta A: {metricsA.happinessScore.toFixed(1)}/10
              </Badge>
              <span className="text-slate-400">vs</span>
              <Badge
                variant={winnerHappiness === "B" ? "winner" : "secondary"}
                className={
                  winnerHappiness === "B"
                    ? "bg-offerB/20 text-offerB-dark font-semibold"
                    : ""
                }
              >
                Offerta B: {metricsB.happinessScore.toFixed(1)}/10
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Vince l&apos;offerta {winnerHappiness} per interesse, ambiente e
              carriera.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-5 w-5 text-amber-500" />
            Vera tariffa oraria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            Lavorando per l&apos;<strong className="text-offerA">Offerta A</strong>{" "}
            guadagni <strong>{formatHourly(metricsA.veraTariffaOraria)}</strong>{" "}
            reali. L&apos;<strong className="text-offerB">Offerta B</strong>{" "}
            paga <strong>{formatHourly(metricsB.veraTariffaOraria)}</strong>{" "}
            reali.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Lordo annuo (€/anno)
            </CardTitle>
            <p className="text-sm text-slate-500">
              RAL + bonus oppure fatturato lordo (P.IVA).
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-slate-200"
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) =>
                      v >= 1000 ? `${v / 1000}k` : String(v)
                    }
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={70}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    formatter={(v: number) => [formatEuro(v), "Lordo annuo"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar dataKey="value" name="Lordo" radius={[0, 8, 8, 0]}>
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
            <CardTitle className="text-base font-semibold">
              Valore reale netto (€/mese)
            </CardTitle>
            <p className="text-sm text-slate-500">
              Netto + benefit − costo viaggio (stimato da km e alimentazione).
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
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-slate-200"
                  />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `${v} €`}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={70}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                  />
                  <Tooltip
                    formatter={(v: number) => [
                      formatEuro(v),
                      "Valore mensile",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar dataKey="value" name="Valore mensile" radius={[0, 8, 8, 0]}>
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
