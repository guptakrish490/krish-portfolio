import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Krish Gupta — Backend Engineering & Systems",
  description: "Krish Gupta is a software developer building backend systems and dependable software, with projects in job processing, developer productivity, and research tools.",
  openGraph: { title: "Krish — Engineering Progression System", description: "Building systems, one difficult concept at a time.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
