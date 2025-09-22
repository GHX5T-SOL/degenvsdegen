import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './mobile.css'

// Direct imports
import { Header } from '../src/components/Header'
import { ClientWrapper } from '../src/components/ClientWrapper'
import { ErrorBoundary } from '../src/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Degen vs Degen - Solana Casino',
  description: 'Play coin flip games on Solana with instant payouts',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#7c3aed',
  // icons: {
  //   icon: '/favicon.svg',
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-20`}>
        <ErrorBoundary>
          <ClientWrapper>
            <Header />
            <main>
              {children}
            </main>
          </ClientWrapper>
        </ErrorBoundary>
      </body>
    </html>
  )
}
