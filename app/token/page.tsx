import Link from 'next/link'

export default function TokenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                $DVD Token
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The native token powering the Degen vs Degen ecosystem
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Token Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Token Details</h3>
                <ul className="text-gray-300 space-y-3">
                  <li><strong>Symbol:</strong> DVD</li>
                  <li><strong>Network:</strong> Solana Devnet</li>
                  <li><strong>Total Supply:</strong> 1,000,000,000</li>
                  <li><strong>Decimals:</strong> 9</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Token Address</h3>
                <p className="text-gray-300 text-sm font-mono break-all">
                  Coming Soon - Token will be deployed after mainnet launch
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Token Utilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎰</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Gaming</h3>
                <p className="text-gray-300">
                  Use $DVD tokens to play games and earn rewards
                </p>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Staking</h3>
                <p className="text-gray-300">
                  Stake $DVD tokens to earn passive income
                </p>
              </div>
              <div className="text-center bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🗳️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Governance</h3>
                <p className="text-gray-300">
                  Vote on platform decisions and proposals
                </p>
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
