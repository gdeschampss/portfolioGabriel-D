import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "G. Deschamps | Full Stack & AI Developer",
  description:
    "Desenvolvo sistemas inteligentes de alto desempenho, automações de processos estratégicas e arquitetura de software completa para impulsionar e escalar negócios.",
  keywords: [
    "Full Stack Developer",
    "Inteligência Artificial",
    "Automação de Processos",
    "Desenvolvimento de Software",
    "n8n",
    "OpenAI",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "G. Deschamps" }],
  openGraph: {
    title: "G. Deschamps | Full Stack & AI Developer",
    description:
      "Desenvolvo sistemas inteligentes, automações estratégicas e arquiteturas de software de alta performance.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-deep-black text-foreground antialiased selection:bg-neon-purple/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
