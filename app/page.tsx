"use client";

import { useMemo, useState, useCallback } from "react";
import { OfferForm } from "@/components/OfferForm";
import { AnalysisSection } from "@/components/AnalysisSection";
import { DEFAULT_OFFER } from "@/types/offer";
import { computeMetrics } from "@/lib/calculations";
import type { OfferInputs } from "@/types/offer";
import { Scale } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200/60 bg-white/90 shadow-soft backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-offerA to-offerA-dark text-white shadow-soft">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                JobMatch
              </h1>
              <p className="mt-0.5 text-sm font-medium text-slate-500 sm:text-base">
                Comparatore di offerte lavorative — calcola il vero valore del tuo tempo
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="animate-fade-in">
            <OfferForm
              title="Offerta A"
              subtitle="Inserisci i dati della prima offerta"
              value={offerA}
              onChange={updateA}
              variant="offerA"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <OfferForm
              title="Offerta B"
              subtitle="Inserisci i dati della seconda offerta"
              value={offerB}
              onChange={updateB}
              variant="offerB"
            />
          </div>
        </div>

        <div className="mt-14 lg:mt-18">
          <AnalysisSection metricsA={metricsA} metricsB={metricsB} />
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200/80 bg-white/50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          JobMatch — Confronta stipendio, ore reali e qualità di vita con dati alla mano.
        </div>
      </footer>
    </div>
  );
}
