import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
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
  title: "Mint Media House | The Elite Creative Media Agency | MintMedia",
  description: "Mint Media House (MintMedia) creates viral UI animations, premium launch videos & personal growth content for founders. Rank #1 with Mint Media's elite video production.",
  keywords: [
    "Mint Media", 
    "MintMedia", 
    "Mint Media House", 
    "MintMediaHouse", 
    "Creative Media Agency", 
    "UI animations", 
    "Launch videos", 
    "Viral branding", 
    "Video production for founders"
  ],
  openGraph: {
    title: "Mint Media House | The Elite Creative Media Agency",
    description: "Mint Media House creates viral UI animations and premium launch videos for founders. Work with MintMedia today.",
    url: "https://mintmediahouse.com",
    siteName: "Mint Media House",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mint Media House Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint Media House | The Elite Creative Media Agency",
    description: "Mint Media House creates viral UI animations and premium launch videos for founders. Work with MintMedia today.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://mintmediahouse.com",
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
      <body className="flex flex-col">
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
