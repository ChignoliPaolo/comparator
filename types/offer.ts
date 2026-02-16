export type TipoContratto = "dipendente" | "partita_iva";

export type AlimentazioneAuto =
  | "benzina"
  | "diesel"
  | "gpl"
  | "elettrico"
  | "treno_altro"
  | "nessuno";

export interface OfferInputs {
  tipoContratto: TipoContratto;
  // Economia (Dipendente: RAL+bonus; P.IVA: fatturato lordo)
  ral: number;
  bonus: number;
  buoniPastoGiornalieri: number;
  welfareBenefit: number;
  tassazionePercent: number;
  // Tempo e spostamenti (solo parametri facili da sapere)
  oreSettimanali: number;
  straordinariNonPagati: number;
  smartWorkingGiorni: number;
  tempoViaggioMinuti: number;
  kmAndataRitorno: number; // km totali andata+ritorno al giorno
  alimentazioneAuto: AlimentazioneAuto;
  // Qualità
  interesseProgetto: number;
  ambienteCultura: number;
  opportunitaCarriera: number;
}

export interface OfferMetrics {
  stipendioNettoMensile: number;
  valorePacchettoTotale: number;
  oreRealiImpegnateSettimanali: number;
  oreRealiImpegnateMensili: number;
  veraTariffaOraria: number;
  happinessScore: number;
  ralLorda: number;
  costoPendolarismoStimatoMensile: number;
}

export const DEFAULT_OFFER: OfferInputs = {
  tipoContratto: "dipendente",
  ral: 35000,
  bonus: 0,
  buoniPastoGiornalieri: 7,
  welfareBenefit: 0,
  tassazionePercent: 35,
  oreSettimanali: 40,
  straordinariNonPagati: 0,
  smartWorkingGiorni: 0,
  tempoViaggioMinuti: 60,
  kmAndataRitorno: 30,
  alimentazioneAuto: "benzina",
  interesseProgetto: 5,
  ambienteCultura: 5,
  opportunitaCarriera: 5,
};

// Costo per km stimato (€/km) per alimentazione
export const COSTO_PER_KM: Record<AlimentazioneAuto, number> = {
  benzina: 0.15,
  diesel: 0.12,
  gpl: 0.08,
  elettrico: 0.05,
  treno_altro: 0, // non stimato automaticamente
  nessuno: 0,
};
