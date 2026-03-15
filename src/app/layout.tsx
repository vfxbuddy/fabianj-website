import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalGrid } from "@/components/layout/GlobalGrid";
import "react-notion-x/src/styles.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fabian Jimenez — Compositing Supervisor & XR Spatial Designer",
  description:
    "Transforming VFX with Creative Leadership. Senior Compositing Supervisor with credits on Dr. Strange, Avengers, Supergirl, Batwoman, and more.",
  openGraph: {
    title: "Fabian Jimenez — VFX Compositing Supervisor",
    description: "Transforming VFX with Creative Leadership!",
    type: "website",
    url: "https://www.fabianj.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Jimenez — VFX Compositing Supervisor",
    description: "Transforming VFX with Creative Leadership!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950`}
      >
        <GlobalGrid />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
