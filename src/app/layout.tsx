import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { AuthProvider, useAuth } from './auth/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tmak corporation',
  description: "La pointe de l'actualité Minières en Afrique",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
      <html lang="fr">
        <head>
        </head>
          <body className={inter.className}>
            < div className='w-[100vw]'>
              <Navbar />
              {children}
            </div>
          </body>
      </html>
  )
}
