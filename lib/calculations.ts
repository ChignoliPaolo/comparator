import type { OfferInputs, OfferMetrics } from "@/types/offer";

const GIORNI_LAVORATIVI_MENSILI = 22;
const SETTIMANE_PER_MESE = 52 / 12;

export function computeMetrics(input: OfferInputs): OfferMetrics {
  const taxRate = input.tassazionePercent / 100;
  const stipendioNettoMensile =
    ((input.ral + input.bonus) * (1 - taxRate)) / 12;

  const giorniInUfficio = 5 - input.smartWorkingGiorni;
  const minutiViaggioSettimanali =
    input.tempoViaggioMinuti * Math.max(0, giorniInUfficio);
  const oreViaggioSettimanali = minutiViaggioSettimanali / 60;

  const oreRealiImpegnateSettimanali =
    input.oreSettimanali +
    input.straordinariNonPagati +
    oreViaggioSettimanali;

  const oreRealiImpegnateMensili =
    oreRealiImpegnateSettimanali * SETTIMANE_PER_MESE;

  const buoniPastoMensili =
    input.buoniPastoGiornalieri *
    GIORNI_LAVORATIVI_MENSILI *
    (giorniInUfficio / 5);
  const welfareMensile = input.welfareBenefit / 12;

  const valorePacchettoTotale =
    stipendioNettoMensile +
    buoniPastoMensili +
    welfareMensile -
    input.costoPendolarismoMensile;

  const veraTariffaOraria =
    oreRealiImpegnateMensili > 0
      ? valorePacchettoTotale / oreRealiImpegnateMensili
      : 0;

  const happinessScore =
    (input.interesseProgetto +
      input.ambienteCultura +
      input.opportunitaCarriera) /
    3;

  return {
    stipendioNettoMensile,
    valorePacchettoTotale,
    oreRealiImpegnateSettimanali,
    oreRealiImpegnateMensili,
    veraTariffaOraria,
    happinessScore,
    ralLorda: input.ral + input.bonus,
  };
}
