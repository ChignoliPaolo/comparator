"use client";

import { useMemo, useState, useCallback } from "react";
import { OfferForm } from "@/components/OfferForm";
import { AnalysisSection } from "@/components/AnalysisSection";
import { DEFAULT_OFFER } from "@/types/offer";
import { computeMetrics } from "@/lib/calculations";
import type { OfferInputs } from "@/types/offer";
import { Calculator } from "lucide-react";

export default function Home() {
  const [offerA, setOfferA] = useState<OfferInputs>({ ...DEFAULT_OFFER });
  const [offerB, setOfferB] = useState<OfferInputs>({
    ...DEFAULT_OFFER,
    ral: 38000,
    smartWorkingGiorni: 2,
  });

  const updateA = useCallback((data: Partial<OfferInputs>) => {
    setOfferA((prev) => ({ ...prev, ...data }));
  }, []);
  const updateB = useCallback((data: Partial<OfferInputs>) => {
    setOfferB((prev) => ({ ...prev, ...data }));
  }, []);

  const metricsA = useMemo(() => computeMetrics(offerA), [offerA]);
  const metricsB = useMemo(() => computeMetrics(offerB), [offerB]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-offerA/10 text-offerA">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                JobMatch: Comparatore di Offerte Lavorative
              </h1>
              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                Calcola il vero valore del tuo tempo
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Grid: two columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          <OfferForm
            title="Offerta A"
            subtitle="Inserisci i dati della prima offerta"
            value={offerA}
            onChange={updateA}
            variant="offerA"
          />
          <OfferForm
            title="Offerta B"
            subtitle="Inserisci i dati della seconda offerta"
            value={offerB}
            onChange={updateB}
            variant="offerB"
          />
        </div>

        {/* Analysis Section - sticky on desktop or flow on mobile */}
        <div className="mt-12 lg:mt-16">
          <AnalysisSection metricsA={metricsA} metricsB={metricsB} />
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 py-6 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-8">
          JobMatch — Confronta RAL, ore reali e qualità di vita per scegliere con dati alla mano.
        </div>
      </footer>
    </div>
  );
}
