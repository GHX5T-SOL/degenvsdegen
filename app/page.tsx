import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Degen vs Degen
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8">
                The Ultimate Solana Casino Experience
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0">
                Play thrilling coin flip games with instant payouts, powered by Solana blockchain. 
                Fair, fast, and decentralized gaming at its finest.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link 
                  href="/games/coinflip"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🎰 Play Now
                </Link>
                <Link 
                  href="/games"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/10"
                >
                  🎮 All Games
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="relative">
                <Image
                  src="/Hero.svg"
                  alt="Degen vs Degen Casino Hero"
                  width={600}
                  height={600}
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto drop-shadow-2xl"
                  priority
                />
                {/* Floating elements for visual appeal */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 -left-4 sm:-left-6 lg:-left-8 w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 bg-blue-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
            Why Choose Degen vs Degen?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Payouts</h3>
              <p className="text-gray-400">Get your winnings immediately through Solana's lightning-fast blockchain</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Provably Fair</h3>
              <p className="text-gray-400">Every game is transparent and verifiable on the blockchain</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Low Fees</h3>
              <p className="text-gray-400">Minimal transaction costs with Solana's efficient network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
            Featured Games
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coin Flip Game */}
            <Link href="/games/coinflip" className="group">
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-xl backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 transform group-hover:scale-105">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-spin">
                    <span className="text-3xl">🪙</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Coin Flip</h3>
                  <p className="text-gray-300">Classic 50/50 chance game with instant results</p>
                </div>
              </div>
            </Link>

            {/* Coming Soon Games */}
            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 p-6 rounded-xl backdrop-blur-sm border border-gray-500/30 opacity-60">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎲</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Dice Roll</h3>
                <p className="text-gray-300">Coming Soon</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 p-6 rounded-xl backdrop-blur-sm border border-gray-500/30 opacity-60">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎰</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Slots</h3>
                <p className="text-gray-300">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Play?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your Solana wallet and start playing with instant payouts
          </p>
          <Link 
            href="/games/coinflip"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🚀 Start Playing Now
          </Link>
        </div>
      </section>
    </div>
  )
}
