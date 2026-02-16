import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobMatch: Comparatore di Offerte Lavorative",
  description: "Calcola il vero valore del tuo tempo. Confronta due offerte di lavoro per stipendio reale, ore impegnate e qualità di vita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={outfit.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
