import type { OfferInputs, OfferMetrics } from "@/types/offer";
import { COSTO_PER_KM } from "@/types/offer";

const GIORNI_LAVORATIVI_MENSILI = 22;
const SETTIMANE_PER_MESE = 52 / 12;

function stimaCostoPendolarismoMensile(input: OfferInputs): number {
  const giorniInUfficio = Math.max(0, 5 - input.smartWorkingGiorni);
  const giorniInUfficioAlMese = (giorniInUfficio / 5) * GIORNI_LAVORATIVI_MENSILI;
  const costoPerKm = COSTO_PER_KM[input.alimentazioneAuto];
  return input.kmAndataRitorno * costoPerKm * giorniInUfficioAlMese;
}

export function computeMetrics(input: OfferInputs): OfferMetrics {
  const taxRate = input.tassazionePercent / 100;
  const costoPendolarismoStimatoMensile = stimaCostoPendolarismoMensile(input);

  // Netto: per dipendente (RAL+bonus)*tax; per P.IVA fatturato*tax (stesso campo "ral" = fatturato lordo)
  const lordoAnnuo = input.ral + (input.tipoContratto === "dipendente" ? input.bonus : 0);
  const stipendioNettoMensile = (lordoAnnuo * (1 - taxRate)) / 12;

  const giorniInUfficio = Math.max(0, 5 - input.smartWorkingGiorni);
  const oreViaggioSettimanali =
    (input.tempoViaggioMinuti * giorniInUfficio) / 60;

  const oreRealiImpegnateSettimanali =
    input.oreSettimanali + input.straordinariNonPagati + oreViaggioSettimanali;

  const oreRealiImpegnateMensili =
    oreRealiImpegnateSettimanali * SETTIMANE_PER_MESE;

  // Buoni pasto: solo per dipendenti, solo giorni in ufficio
  const buoniPastoMensili =
    input.tipoContratto === "dipendente"
      ? input.buoniPastoGiornalieri *
        GIORNI_LAVORATIVI_MENSILI *
        (giorniInUfficio / 5)
      : 0;
  const welfareMensile = input.welfareBenefit / 12;

  const valorePacchettoTotale =
    stipendioNettoMensile +
    buoniPastoMensili +
    welfareMensile -
    costoPendolarismoStimatoMensile;

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
    ralLorda: lordoAnnuo,
    costoPendolarismoStimatoMensile,
  };
}
