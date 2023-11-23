import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T-MAK Corporation',
  description: "La pointe de l'actualité minière en Afrique",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="fr">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
    </html>
  )
}
