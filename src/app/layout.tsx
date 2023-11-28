import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T-Mak Corporation',
  description: 'La pointe de l\'actualité minière en Afrique.',
  keywords: 'Mali, mining, news, actualité, T-Mak, corporation',
  authors: [{ name: 'Nzirani IO' }],
  category: 'news',
  viewport: 'width=device-width, initial-scale=1',
  metadataBase: new URL('https://www.t-mak.org'),

  openGraph: {
    url: 'www.t-mak.org/', // Replace with your page's URL
    type: 'website', // Could be 'article' for specific articles
    title: 'T-Mak Corporation',
    description: 'La pointe de l\'actualité minière en Afrique.',
    images: '/TMAKLOGO.png',
    siteName: 'T-Mak Corporation',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <>
      <html lang="fr">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </>
  )
}
