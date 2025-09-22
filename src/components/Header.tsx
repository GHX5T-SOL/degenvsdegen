'use client'

import { useState, useEffect } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletLoaded, setIsWalletLoaded] = useState(false)

  useEffect(() => {
    // Ensure wallet button only renders on client side
    setIsWalletLoaded(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/20 backdrop-blur-md border-b border-purple-400/30 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.svg"
              alt="Degen vs Degen Logo"
              width={40}
              height={40}
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-lg">Degen vs Degen</h1>
              <p className="text-xs text-white/80 drop-shadow-md">Solana Casino</p>
            </div>
          </Link>

          {/* Centered Navigation Menu */}
          <nav className="hidden md:flex justify-center flex-1">
            <div className="flex space-x-8">
              <Link href="/" className="text-white/90 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm">
                Home
              </Link>
              <Link href="/games" className="text-white/90 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm">
                Games
              </Link>
              <Link href="/token" className="text-white/90 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm">
                Token
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm">
                About
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-2">
            {isWalletLoaded ? (
              <div className="wallet-button backdrop-blur-sm bg-purple-500/20 rounded-lg border border-purple-400/30">
                <WalletMultiButton className="wallet-button" />
              </div>
            ) : (
              <div className="wallet-button h-10 w-32 bg-purple-500/20 rounded-lg animate-pulse backdrop-blur-sm border border-purple-400/30"></div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/90 hover:text-white p-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm transition-all duration-300"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
              title="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-400/30 backdrop-blur-md bg-purple-500/10 rounded-lg">
              <nav className="flex flex-col space-y-4 pt-4 px-4">
                <Link
                  href="/"
                  className="text-white/90 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/games"
                  className="text-white/90 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  href="/token"
                  className="text-white/90 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Token
                </Link>
                <Link
                  href="/about"
                  className="text-white/90 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-purple-500/20 backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
