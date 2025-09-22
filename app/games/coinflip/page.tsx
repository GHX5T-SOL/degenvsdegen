import Link from 'next/link'
import { Header } from '../../../src/components/Header'
import { CoinflipGame } from '../../../src/components/CoinflipGame'

export default function CoinflipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Link
              href="/games"
              className="text-gray-400 hover:text-white transition-colors mb-6 inline-block text-lg"
            >
              ← Back to Games
            </Link>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Coin Flip
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Bet on heads or tails and win instantly with Solana's fastest payouts
            </p>
          </div>

          <CoinflipGame />

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">How to Play</h2>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">1️⃣</span>
                  </div>
                  <p className="text-gray-300 font-medium">Connect your Solana wallet</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">2️⃣</span>
                  </div>
                  <p className="text-gray-300 font-medium">Choose your bet amount</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">3️⃣</span>
                  </div>
                  <p className="text-gray-300 font-medium">Pick heads or tails</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">4️⃣</span>
                  </div>
                  <p className="text-gray-300 font-medium">Click "Flip Coin" and win!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
