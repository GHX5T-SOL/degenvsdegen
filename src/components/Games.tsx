'use client'

import Image from 'next/image'
import Link from 'next/link'

const games = [
  {
    name: 'Coin Flip',
    description: 'Bet on heads or tails with instant payouts',
    image: '/CoinFlip.png',
    href: '/games/coinflip',
    comingSoon: false
  },
  {
    name: 'Slots',
    description: 'Classic slot machine with multiple paylines',
    image: '/Slot.svg',
    href: '/games/slots',
    comingSoon: true
  },
  {
    name: 'Dice',
    description: 'Roll the dice and test your luck',
    image: '/Dice.svg',
    href: '/games/dice',
    comingSoon: true
  }
]

export function Games() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {games.map((game) => (
        <div
          key={game.name}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
        >
          <div className="relative mb-4">
            <Image
              src={game.image}
              alt={game.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
            {game.comingSoon && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                Coming Soon
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{game.name}</h3>
          <p className="text-gray-400 mb-4">{game.description}</p>
          {game.comingSoon ? (
            <button
              disabled
              className="w-full bg-gray-600 text-gray-400 cursor-not-allowed py-2 px-4 rounded font-semibold"
            >
              Coming Soon
            </button>
          ) : (
            <Link
              href={game.href}
              className="block w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded font-semibold text-center transition-colors"
            >
              Play Now
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
