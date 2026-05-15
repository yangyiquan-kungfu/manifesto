import type { Metadata } from 'next'
import { Inter, Noto_Serif_TC, ZCOOL_XiaoWei, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

// Traditional Chinese serif - complete glyph coverage for both traditional and simplified
const notoSerifTC = Noto_Serif_TC({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-chinese',
  preload: false, // Large font file, load on demand
})

// Artistic Chinese display font for decorative headers
const zcoolXiaoWei = ZCOOL_XiaoWei({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-calligraphy',
  preload: false,
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'YANGYIQUAN KUNG FU — Self Defense Association',
  description: 'Official Certification Dossier of Yangyiquan Kung Fu (陽意拳) — The Fist of Nurturing Intention. Founded by Shénmì Lóng, The Mystical Dragon. Elite tactical self-defense system combining ancient wisdom with modern combat science.',
  keywords: ['Kung Fu', 'Yangyiquan', 'Self Defense', 'Martial Arts', 'Wushu', 'Shénmì Lóng', 'Pedro Barros', 'Combat Science'],
  authors: [{ name: 'Shénmì Lóng (Pedro Barros / Sultan Assad Abd-Al-Ghalib)' }],
  openGraph: {
    title: 'YANGYIQUAN KUNG FU — Self Defense Association',
    description: 'Official Certification Dossier. The Fist of Nurturing Intention. Elite tactical self-defense system.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifTC.variable} ${zcoolXiaoWei.variable} ${geistMono.variable} bg-[#0a0a0a]`}>
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#e5e5e5]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
