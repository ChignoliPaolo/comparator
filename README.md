# JobMatch: Comparatore di Offerte Lavorative

Applicazione web single-page per confrontare due offerte di lavoro in base a **valore orario reale** e **qualità di vita**.

## Tech stack

- **Next.js 14** (App Router) + React 18
- **Tailwind CSS** per lo stile
- **Shadcn-style UI**: Card, Slider, Accordion, Input, Badge (Radix UI + Tailwind)
- **Lucide React** per le icone
- **Recharts** per i grafici a barre

## Avvio

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Funzionalità

- **Due colonne** (Offerta A / Offerta B) con dati in sezioni espandibili:
  - **Economia**: RAL, bonus, buoni pasto, welfare, tassazione %
  - **Tempo e logistica**: ore settimanali, straordinari non pagati, giorni di smart working, tempo viaggio, costo pendolarismo
  - **Qualità**: interesse progetto, ambiente/cultura, opportunità carriera (1–10)

- **Metriche calcolate in tempo reale**:
  - Stipendio netto mensile
  - Valore pacchetto totale (netto + benefit − costi)
  - Ore reali impegnate (contratto + straordinari + viaggio sui giorni in ufficio)
  - **Vera tariffa oraria** = valore mensile / ore reali mensili
  - Happiness score (media degli slider qualità)

- **Sezione analisi**:
  - Badge “vincitore” per tariffa oraria e per happiness score
  - Card con confronto: “Offerta A paga X €/h reali, Offerta B Y €/h reali”
  - Grafici a barre: RAL lorda e valore reale netto mensile

## Build

```bash
npm run build
npm start
```
