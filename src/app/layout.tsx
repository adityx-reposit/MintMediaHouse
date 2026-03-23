import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MintMediaHouse — Creative Media Agency",
  description: "UI animations, launch videos & personal growth content built for founders who refuse to be ignored by their audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
      <body className="flex flex-col">
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
