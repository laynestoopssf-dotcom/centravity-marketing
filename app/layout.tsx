import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport = {
  themeColor: "#2563eb",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Centravity — The Compliant Growth Engine for Insurance Agencies",
  description:
    "Centravity pairs strict OBA compliance with real-time activity pacing, 30-day rolling conversion metrics, and a God-Mode agent dashboard built for modern insurance agencies.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Centravity",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
