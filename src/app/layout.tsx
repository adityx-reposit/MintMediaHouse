import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
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
  title: "Mint Media House",
  description: "Viral video content for SaaS founders. Custom UI animations, launch videos & brand films that generated 10M+ views. Mumbai-based. Get custom quote in 24h →",
  keywords: [
    "video production agency Mumbai",
    "UI animation services",
    "SaaS video marketing",
    "launch video production",
    "product demo videos",
    "explainer video agency India",
    "personal brand videos",
    "motion design studio",
    "video production for startups",
    "viral video agency"
  ],
  openGraph: {
    title: "UI Animation & Launch Video Agency for SaaS | Mint Media House",
    description: "Viral video content for SaaS founders. 10M+ views generated. Custom UI animations, launch videos & brand films. Mumbai-based. Get quote →",
    url: "https://mintmediahouse.in",
    siteName: "Mint Media House",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mint Media House - Video Production for SaaS",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Animation & Launch Video Agency | Mint Media House",
    description: "Viral video content for SaaS founders. 10M+ views generated.",
    images: ["/og-image.png"],
    creator: "@mintmediahouse",
  },
  alternates: {
    canonical: "https://mintmediahouse.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
      <head>
        <SchemaMarkup />
      </head>
      <body className="flex flex-col">
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
