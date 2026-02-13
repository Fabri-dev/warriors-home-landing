import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Oswald } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// <CHANGE> Added Oswald for headings and Inter for body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Warrior's Home | CrossFit Mar del Plata",
  description:
    "No es motivación. Es necesidad. CrossFit, entrenamiento personalizado y comunidad en Mar del Plata. Transformá tu cuerpo y mente con Coti del Ferrero.",
  keywords: ["CrossFit", "Mar del Plata", "gimnasio", "entrenamiento", "fitness", "Warrior Women"],
  authors: [{ name: "Warrior's Home" }],
  openGraph: {
    title: "Warrior's Home | CrossFit Mar del Plata",
    description: "No es motivación. Es necesidad. Entrenamiento de élite en Mar del Plata.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-[#0a0a0a] text-[#fafafa]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
