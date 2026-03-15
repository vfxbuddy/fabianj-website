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
  metadataBase: new URL("https://fabianj.com"),
  title: {
    default: "Fabian Jimenez — Compositing Supervisor & XR Spatial Designer",
    template: "%s | Fabian Jimenez",
  },
  description:
    "Transforming VFX with Creative Leadership. Senior Compositing Supervisor with credits on Dr. Strange, Avengers, Supergirl, Batwoman, and more.",
  keywords: ["VFX", "Compositing", "Supervisor", "XR", "Spatial Design", "Mixed Reality", "Fabian Jimenez"],
  authors: [{ name: "Fabian Jimenez" }],
  creator: "Fabian Jimenez",
  openGraph: {
    title: "Fabian Jimenez — VFX Compositing Supervisor",
    description: "Transforming VFX with Creative Leadership!",
    type: "website",
    url: "https://fabianj.com",
    siteName: "Fabian Jimenez Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fabian Jimenez — VFX Compositing Supervisor",
    description: "Transforming VFX with Creative Leadership!",
    creator: "@vfxbuddy", // Assuming based on repo name
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
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
