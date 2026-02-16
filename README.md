# JobMatch: Comparatore di Offerte Lavorative

Applicazione web per confrontare due offerte di lavoro in base a **valore orario reale** e **qualità di vita**. Supporta **dipendenti** e **Partita IVA / freelance**.

## Parametri (solo dati facili da sapere)

- **Economia:** tipo contratto (Dipendente / P.IVA), RAL o fatturato lordo, bonus (solo dipendente), buoni pasto (solo dipendente), welfare, tassazione %
- **Tempo e spostamenti:** ore settimanali, straordinari non pagati, giorni in smart working, tempo viaggio (min), **km andata e ritorno**, **alimentazione** (benzina, diesel, GPL, elettrico, treno/altro, nessuno) per stimare il costo viaggio
- **Qualità:** interesse progetto, ambiente/cultura, opportunità carriera (1–10)

Il costo del pendolarismo è **stimato automaticamente** da km e tipo di alimentazione (non serve inserire un importo mensile).

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Tech stack

- Next.js 14, React 18, Tailwind CSS, Radix UI (Accordion, Slider), Lucide, Recharts
- Font: Outfit (Google Fonts)
