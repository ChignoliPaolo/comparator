"use client";

import type { OfferInputs, TipoContratto, AlimentazioneAuto } from "@/types/offer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Euro, Clock, Heart, Car } from "lucide-react";
import { cn } from "@/lib/utils";

type OfferFormProps = {
  title: string;
  subtitle: string;
  value: OfferInputs;
  onChange: (data: Partial<OfferInputs>) => void;
  variant: "offerA" | "offerB";
};

const sliderVariant = (v: "offerA" | "offerB") => v;

const ALIMENTAZIONE_OPTIONS: { value: AlimentazioneAuto; label: string }[] = [
  { value: "nessuno", label: "Non mi sposto in ufficio" },
  { value: "benzina", label: "Benzina" },
  { value: "diesel", label: "Diesel" },
  { value: "gpl", label: "GPL" },
  { value: "elettrico", label: "Elettrico" },
  { value: "treno_altro", label: "Treno / altro (costo non stimato)" },
];

export function OfferForm({
  title,
  subtitle,
  value,
  onChange,
  variant,
}: OfferFormProps) {
  const update = (key: keyof OfferInputs, val: number | string) =>
    onChange({ [key]: val });
  const isDipendente = value.tipoContratto === "dipendente";

  const borderClass =
    variant === "offerA"
      ? "border-l-4 border-l-offerA"
      : "border-l-4 border-l-offerB";
  const headerBg =
    variant === "offerA" ? "bg-offerA/10" : "bg-offerB/10";

  return (
    <Card className={cn("h-fit transition-all duration-300", borderClass)}>
      <CardHeader className={headerBg}>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm opacity-80">{subtitle}</p>
      </CardHeader>
      <CardContent className="pt-2">
        <Accordion
          type="multiple"
          defaultValue={["economia", "tempo", "qualita"]}
          className="w-full"
        >
          <AccordionItem value="economia">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Economia
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Tipo contratto
                </label>
                <Select
                  value={value.tipoContratto}
                  onChange={(e) =>
                    update("tipoContratto", e.target.value as TipoContratto)
                  }
                >
                  <option value="dipendente">Dipendente</option>
                  <option value="partita_iva">Partita IVA / Freelance</option>
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  {isDipendente
                    ? "RAL (Retribuzione Annua Lorda) €"
                    : "Fatturato lordo annuo €"}
                </label>
                <Input
                  type="number"
                  value={value.ral || ""}
                  onChange={(e) => update("ral", Number(e.target.value) || 0)}
                  placeholder={isDipendente ? "35000" : "40000"}
                  className="mt-1"
                />
              </div>

              {isDipendente && (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-medium opacity-80">
                      Bonus / variabile annuo €
                    </label>
                    <Input
                      type="number"
                      value={value.bonus || ""}
                      onChange={(e) =>
                        update("bonus", Number(e.target.value) || 0)
                      }
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium opacity-80">
                      Buoni pasto (valore giornaliero) €
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={value.buoniPastoGiornalieri ?? ""}
                      onChange={(e) =>
                        update(
                          "buoniPastoGiornalieri",
                          Number(e.target.value) || 0
                        )
                      }
                      placeholder="7"
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Welfare / benefit extra (valore annuo) €
                </label>
                <Input
                  type="number"
                  value={value.welfareBenefit || ""}
                  onChange={(e) =>
                    update("welfareBenefit", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Tassazione effettiva stimata {value.tassazionePercent}%
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.tassazionePercent]}
                  onValueChange={([v]) =>
                    update("tassazionePercent", v ?? 35)
                  }
                  min={20}
                  max={55}
                  step={1}
                  className="mt-2"
                />
                {!isDipendente && (
                  <p className="mt-1 text-xs opacity-70">
                    Per P.IVA: IRPEF + INPS + acconti (es. 40–45%)
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tempo">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Tempo e spostamenti
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Ore settimanali da contratto
                </label>
                <Input
                  type="number"
                  value={value.oreSettimanali ?? ""}
                  onChange={(e) =>
                    update("oreSettimanali", Number(e.target.value) || 40)
                  }
                  placeholder="40"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Straordinari non pagati (ore/settimana)
                </label>
                <Input
                  type="number"
                  value={value.straordinariNonPagati ?? ""}
                  onChange={(e) =>
                    update(
                      "straordinariNonPagati",
                      Number(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Giorni in smart working (a settimana) {value.smartWorkingGiorni}
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.smartWorkingGiorni]}
                  onValueChange={([v]) =>
                    update("smartWorkingGiorni", v ?? 0)
                  }
                  min={0}
                  max={5}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Tempo viaggio (minuti andata + ritorno)
                </label>
                <Input
                  type="number"
                  value={value.tempoViaggioMinuti ?? ""}
                  onChange={(e) =>
                    update("tempoViaggioMinuti", Number(e.target.value) || 0)
                  }
                  placeholder="60"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Km andata e ritorno (al giorno)
                </label>
                <Input
                  type="number"
                  value={value.kmAndataRitorno ?? ""}
                  onChange={(e) =>
                    update("kmAndataRitorno", Number(e.target.value) || 0)
                  }
                  placeholder="30"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  <span className="flex items-center gap-1">
                    <Car className="h-3.5 w-3" />
                    Alimentazione (per stima costo viaggio)
                  </span>
                </label>
                <Select
                  value={value.alimentazioneAuto}
                  onChange={(e) =>
                    update(
                      "alimentazioneAuto",
                      e.target.value as AlimentazioneAuto
                    )
                  }
                  className="mt-1"
                >
                  {ALIMENTAZIONE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="qualita">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Qualità
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Interesse per il progetto {value.interesseProgetto}/10
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.interesseProgetto]}
                  onValueChange={([v]) =>
                    update("interesseProgetto", v ?? 5)
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Ambiente / cultura {value.ambienteCultura}/10
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.ambienteCultura]}
                  onValueChange={([v]) =>
                    update("ambienteCultura", v ?? 5)
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium opacity-80">
                  Opportunità di carriera {value.opportunitaCarriera}/10
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.opportunitaCarriera]}
                  onValueChange={([v]) =>
                    update("opportunitaCarriera", v ?? 5)
                  }
                  min={1}
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
