"use client";

import type { OfferInputs } from "@/types/offer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Euro, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type OfferFormProps = {
  title: string;
  subtitle: string;
  value: OfferInputs;
  onChange: (data: Partial<OfferInputs>) => void;
  variant: "offerA" | "offerB";
};

const sliderVariant = (v: "offerA" | "offerB") => v;

export function OfferForm({
  title,
  subtitle,
  value,
  onChange,
  variant,
}: OfferFormProps) {
  const update = (key: keyof OfferInputs, val: number) =>
    onChange({ [key]: val });

  const borderClass =
    variant === "offerA"
      ? "border-l-4 border-l-offerA"
      : "border-l-4 border-l-offerB";
  const headerBg =
    variant === "offerA" ? "bg-offerA/5" : "bg-offerB/5";

  return (
    <Card className={cn("h-fit", borderClass)}>
      <CardHeader className={headerBg}>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="pt-2">
        <Accordion type="multiple" defaultValue={["economia", "tempo", "qualita"]} className="w-full">
          <AccordionItem value="economia">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Economia
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  RAL (Retribuzione Annua Lorda) €
                </label>
                <Input
                  type="number"
                  value={value.ral || ""}
                  onChange={(e) => update("ral", Number(e.target.value) || 0)}
                  placeholder="35000"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Bonus/Variabile annuo €
                </label>
                <Input
                  type="number"
                  value={value.bonus || ""}
                  onChange={(e) => update("bonus", Number(e.target.value) || 0)}
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Valore Buoni Pasto (giornaliero) €
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={value.buoniPastoGiornalieri || ""}
                  onChange={(e) =>
                    update("buoniPastoGiornalieri", Number(e.target.value) || 0)
                  }
                  placeholder="7.00"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Welfare/Benefit extra (valore annuo) €
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
                <label className="text-xs text-muted-foreground">
                  Tassazione stimata {value.tassazionePercent}%
                </label>
                <Slider
                  variant={sliderVariant(variant)}
                  value={[value.tassazionePercent]}
                  onValueChange={([v]) => update("tassazionePercent", v ?? 35)}
                  min={20}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tempo">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Tempo e Logistica
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">
                  Ore settimanali da contratto
                </label>
                <Input
                  type="number"
                  value={value.oreSettimanali || ""}
                  onChange={(e) =>
                    update("oreSettimanali", Number(e.target.value) || 40)
                  }
                  placeholder="40"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Straordinari non pagati (ore/settimana)
                </label>
                <Input
                  type="number"
                  value={value.straordinariNonPagati || ""}
                  onChange={(e) =>
                    update("straordinariNonPagati", Number(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Smart Working (giorni/settimana) {value.smartWorkingGiorni}
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
                <label className="text-xs text-muted-foreground">
                  Tempo viaggio (min andata+ritorno/giorno)
                </label>
                <Input
                  type="number"
                  value={value.tempoViaggioMinuti || ""}
                  onChange={(e) =>
                    update("tempoViaggioMinuti", Number(e.target.value) || 0)
                  }
                  placeholder="60"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Costo pendolarismo mensile €
                </label>
                <Input
                  type="number"
                  value={value.costoPendolarismoMensile || ""}
                  onChange={(e) =>
                    update(
                      "costoPendolarismoMensile",
                      Number(e.target.value) || 0
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
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
                <label className="text-xs text-muted-foreground">
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
                <label className="text-xs text-muted-foreground">
                  Ambiente/Cultura {value.ambienteCultura}/10
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
                <label className="text-xs text-muted-foreground">
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
