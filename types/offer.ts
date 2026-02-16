export interface OfferInputs {
  // Economia
  ral: number;
  bonus: number;
  buoniPastoGiornalieri: number;
  welfareBenefit: number;
  tassazionePercent: number;
  // Tempo e Logistica
  oreSettimanali: number;
  straordinariNonPagati: number;
  smartWorkingGiorni: number;
  tempoViaggioMinuti: number;
  costoPendolarismoMensile: number;
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
}

export const DEFAULT_OFFER: OfferInputs = {
  ral: 35000,
  bonus: 0,
  buoniPastoGiornalieri: 7,
  welfareBenefit: 0,
  tassazionePercent: 35,
  oreSettimanali: 40,
  straordinariNonPagati: 0,
  smartWorkingGiorni: 0,
  tempoViaggioMinuti: 60,
  costoPendolarismoMensile: 0,
  interesseProgetto: 5,
  ambienteCultura: 5,
  opportunitaCarriera: 5,
};
