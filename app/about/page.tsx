import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                About Degen vs Degen
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The future of decentralized gaming on Solana
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Degen vs Degen is revolutionizing the online casino experience by bringing transparency,
              fairness, and instant payouts to the world of decentralized gaming. Built on the Solana
              blockchain, our platform ensures that every game is provably fair and every transaction
              is secure.
            </p>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              We're committed to creating a gaming ecosystem where players can enjoy their favorite
              casino games with complete confidence in the integrity of the system. No more wondering
              if the games are rigged - everything is verifiable on-chain.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">⚡ Instant Payouts</h3>
                <p className="text-gray-300">
                  All winnings are paid out instantly through smart contracts - no waiting periods or withdrawal limits.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🔒 Provably Fair</h3>
                <p className="text-gray-300">
                  Every game outcome is generated using blockchain-verifiable randomness, ensuring complete fairness.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">💰 Low Fees</h3>
                <p className="text-gray-300">
                  Only 3% house fee on winnings - much lower than traditional online casinos.
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-3">🎮 Multiple Games</h3>
                <p className="text-gray-300">
                  Coin Flip, Slots, Dice, and more games coming soon with unique mechanics and rewards.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Solana</h3>
                <p className="text-gray-300">
                  Built on the fastest blockchain for instant transactions
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Anchor</h3>
                <p className="text-gray-300">
                  Secure smart contracts with built-in safety checks
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">React</h3>
                <p className="text-gray-300">
                  Modern, responsive frontend with wallet integration
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Roadmap</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-6 mt-1">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 1: Launch</h3>
                  <p className="text-gray-300">Coin Flip game, basic UI, wallet integration</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-6 mt-1">
                  <span className="text-white text-lg">🚧</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 2: Expansion</h3>
                  <p className="text-gray-300">Slots, Dice games, $DVD token launch</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-6 mt-1">
                  <span className="text-gray-400 text-lg">⏳</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Phase 3: Ecosystem</h3>
                  <p className="text-gray-300">NFT integration, tournaments, staking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
