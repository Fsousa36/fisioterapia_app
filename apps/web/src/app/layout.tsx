import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FisioBase Academy",
  description: "Biblioteca cientifica e trilhas de fisioterapia baseadas em evidencias."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
