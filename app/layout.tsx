import type React from "react"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import NoiseOverlay from "@/components/noise-overlay"
import VibePlayer from "@/components/vibe-player"
import "./globals.css"
import { LanguageProvider } from "@/components/LanguageContext"
import { Toaster } from 'sonner'

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-league-spartan",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Rendi Saputra | Internet Engineer & UI/UX Designer",
    template: "%s | RENNVSWRLD"
  },
  description:
    "Transforming complex networks into elegant web experiences. Explore the portfolio of Rendi Saputra, an Internet Engineer and AI Enthusiast.",
  keywords: [
    "Rendi Saputra", 
    "RENNVSWRLD",
    "Internet Engineer", 
    "Network Architecture", 
    "Rendi Saputra Portfolio", 
    "Portofolio Rendi Saputra",  
    "IoT Systems Developer", 
    "Frontend Engineer", 
    "Web Developer Lampung", 
    "AI Enthusiast"
  ],
  authors: [{ name: "Rendi Saputra", url: "https://github.com/" }],
  creator: "Rendi Saputra",
  publisher: "Rendi Saputra",
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: '/favicon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "http://localhost:3000",
                "name": "RENNVSWRLD Portfolio",
                "description": "Portfolio of Rendi Saputra, an Internet Engineer and AI Enthusiast.",
                "publisher": {
                  "@type": "Person",
                  "name": "Rendi Saputra"
                }
              }
            ]),
          }}
        />
      </head>
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        {/* --- PEMBUNGKUS BAHASA DIMULAI DISINI --- */}
        <LanguageProvider>
          <NoiseOverlay />
          <VibePlayer />
          
          {children}
          
          <Toaster position="top-center" richColors theme="dark" />
          <Analytics />
        </LanguageProvider>
        {/* --- PEMBUNGKUS BAHASA BERAKHIR DISINI --- */}
      </body>
    </html>
  )
}