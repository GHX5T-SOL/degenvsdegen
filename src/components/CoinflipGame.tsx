'use client'

import { useState, useEffect } from 'react'
import * as anchor from '@coral-xyz/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useRouter } from 'next/navigation'

const PROGRAM_ID = new anchor.web3.PublicKey('3CkSjNQAeoA4Zx5ZhQ7qrREFqw3xiyuFZF7mG97jQZNU')
const HOUSE_WALLET = new anchor.web3.PublicKey('7Po3gCenxonM4W6WfDEqMonhQQP59kBr5uZV6BUZLxaf')

const BET_AMOUNTS = [
  { label: '0.05 SOL', value: 0.05 * LAMPORTS_PER_SOL },
  { label: '0.1 SOL', value: 0.1 * LAMPORTS_PER_SOL },
  { label: '0.25 SOL', value: 0.25 * LAMPORTS_PER_SOL },
  { label: '0.5 SOL', value: 0.5 * LAMPORTS_PER_SOL },
  { label: '1 SOL', value: LAMPORTS_PER_SOL },
  { label: '2 SOL', value: 2 * LAMPORTS_PER_SOL },
]

export function CoinflipGame() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const router = useRouter()
  const [selectedBet, setSelectedBet] = useState<number>(BET_AMOUNTS[0].value)
  const [isPlaying, setIsPlaying] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [coinSide, setCoinSide] = useState<'heads' | 'tails' | null>(null)
  const [userChoice, setUserChoice] = useState<'heads' | 'tails' | null>(null)
  const [gameOutcome, setGameOutcome] = useState<'win' | 'lose' | null>(null)
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null)

  useEffect(() => {
    if (wallet.publicKey && connection) {
      connection.getBalance(wallet.publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL)
      })
    }
  }, [wallet.publicKey, connection])

  const playGame = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      alert('Please connect your wallet')
      return
    }

    if (!userChoice) {
      alert('Please select Heads or Tails before flipping the coin')
      return
    }

    setIsPlaying(true)
    setResult(null)
    setIsSpinning(true)
    setCoinSide(null)
    setGameOutcome(null)
    setTransactionSignature(null)

    // Start coin spinning animation
    const spinDuration = 3000 // 3 seconds
    const spinInterval = setInterval(() => {
      setCoinSide(prev => prev === 'heads' ? 'tails' : 'heads')
    }, 100)

    try {
      const provider = new anchor.AnchorProvider(connection, wallet as any, {
        commitment: 'confirmed'
      })

      // Generate IDL for the program
      const idl = {
        version: "0.1.0",
        name: "degen_vs_degen",
        instructions: [
          {
            name: "initialize_house_vault",
            accounts: [
              { name: "house", isMut: true, isSigner: true },
              { name: "house_vault", isMut: true, isSigner: false },
              { name: "system_program", isMut: false, isSigner: false }
            ]
          },
          {
            name: "play_game",
            accounts: [
              { name: "user", isMut: true, isSigner: true },
              { name: "house", isMut: true, isSigner: false },
              { name: "escrow", isMut: true, isSigner: false },
              { name: "house_vault", isMut: false, isSigner: false },
              { name: "system_program", isMut: false, isSigner: false }
            ],
            args: [{ name: "bet", type: "u64" }]
          }
        ]
      }

      const program = new anchor.Program(idl as any, PROGRAM_ID, provider)

      // Find PDAs
      const [escrow] = await anchor.web3.PublicKey.findProgramAddress(
        [
          Buffer.from('escrow'),
          wallet.publicKey.toBuffer()
        ],
        PROGRAM_ID
      )

      const [houseVault] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('house-vault')],
        PROGRAM_ID
      )

      // Create and send transaction
      const tx = await program.methods
        .playGame(new anchor.BN(selectedBet))
        .accounts({
          user: wallet.publicKey,
          house: HOUSE_WALLET,
          escrow: escrow,
          houseVault: houseVault,
          systemProgram: SystemProgram.programId,
        })
        .transaction()

      // Send transaction
      const signature = await wallet.sendTransaction(tx, connection)
      setTransactionSignature(signature)
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      // Wait for spin animation to complete
      await new Promise(resolve => setTimeout(resolve, spinDuration))
      clearInterval(spinInterval)

      // Get transaction details to determine outcome
      const txDetails = await connection.getTransaction(signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0
      })

      if (txDetails) {
        // Check if user received winnings (indicates win)
        const userWon = txDetails.meta?.postTokenBalances?.some(
          (balance) => balance.owner === wallet.publicKey?.toString() && 
          balance.uiTokenAmount?.uiAmount && balance.uiTokenAmount.uiAmount > 0
        ) || txDetails.meta?.postBalances?.[0] > txDetails.meta?.preBalances?.[0]

        const finalSide = userWon ? 'heads' : 'tails'
        setCoinSide(finalSide)
        setIsSpinning(false)
        
        // Check if user's choice matches the outcome
        const userChoiceCorrect = userChoice === finalSide
        setGameOutcome(userChoiceCorrect ? 'win' : 'lose')
        setResult(userChoiceCorrect ? 'You won!' : 'You lost!')
      } else {
        // Fallback: determine outcome based on user choice
        const finalSide = userChoice === 'heads' ? 'heads' : 'tails'
        setCoinSide(finalSide)
        setIsSpinning(false)
        setGameOutcome('win')
        setResult('You won!')
      }

      // Update balance
      if (wallet.publicKey) {
        const newBalance = await connection.getBalance(wallet.publicKey)
        setBalance(newBalance / LAMPORTS_PER_SOL)
      }

    } catch (error) {
      console.error('Error playing game:', error)
      clearInterval(spinInterval)
      setIsSpinning(false)
      setResult('Transaction failed')
      
      // Show specific error messages
      if (error instanceof Error) {
        if (error.message.includes('insufficient funds')) {
          setResult('Insufficient funds')
        } else if (error.message.includes('user rejected')) {
          setResult('Transaction cancelled')
        } else {
          setResult('Transaction failed: ' + error.message)
        }
      }
    } finally {
      setIsPlaying(false)
    }
  }

  if (!wallet.connected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-400 mb-4">Connect your wallet to play</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto shadow-2xl border border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">🪙 Coin Flip</h3>

      {/* Coin Animation */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="relative">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-yellow-400 shadow-lg transition-all duration-300 ${
            isSpinning ? 'animate-spin' : ''
          }`} style={{
            background: coinSide === 'heads' 
              ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
              : coinSide === 'tails'
              ? 'linear-gradient(135deg, #6b7280, #4b5563)'
              : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            transform: isSpinning ? 'rotateY(0deg)' : coinSide === 'tails' ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {coinSide === 'heads' ? (
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-900">👑</span>
              ) : coinSide === 'tails' ? (
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100">🦅</span>
              ) : (
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-900">👑</span>
              )}
            </div>
          </div>
          
          {/* Spinning effect overlay */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping"></div>
          )}
        </div>
      </div>

      {/* Bet Selection */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Select Bet Amount</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BET_AMOUNTS.map((bet) => (
            <button
              key={bet.value}
              onClick={() => setSelectedBet(bet.value)}
              className={`py-2 sm:py-3 px-1 sm:px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedBet === bet.value
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
              }`}
            >
              {bet.label}
            </button>
          ))}
        </div>
      </div>

      {/* Heads/Tails Selection */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-white mb-2 sm:mb-3 font-semibold text-sm sm:text-base">Choose Your Side</h4>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => setUserChoice('heads')}
            disabled={isPlaying || isSpinning}
            className={`py-3 sm:py-4 px-3 sm:px-6 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform ${
              userChoice === 'heads'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
            } ${isPlaying || isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            👑 Heads
          </button>
          <button
            onClick={() => setUserChoice('tails')}
            disabled={isPlaying || isSpinning}
            className={`py-3 sm:py-4 px-3 sm:px-6 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform ${
              userChoice === 'tails'
                ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
            } ${isPlaying || isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            🦅 Tails
          </button>
        </div>
        {userChoice && (
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-2">
            You chose: <span className="font-semibold text-white">{userChoice === 'heads' ? '👑 Heads' : '🦅 Tails'}</span>
          </p>
        )}
      </div>

      {/* Balance */}
      <div className="mb-4 sm:mb-6 text-center">
        <p className="text-gray-400 text-xs sm:text-sm">
          💰 Balance: {balance ? `${balance.toFixed(4)} SOL` : 'Loading...'}
        </p>
      </div>

      {/* Flip Button */}
      <button
        onClick={playGame}
        disabled={isPlaying || isSpinning || !userChoice}
        className={`w-full py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg transition-all duration-300 transform ${
          isPlaying || isSpinning || !userChoice
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black shadow-lg hover:shadow-xl hover:scale-105'
        }`}
      >
        {!userChoice ? '🎯 Select Heads or Tails First' : 
         isSpinning ? '🔄 Spinning...' : 
         isPlaying ? '⏳ Processing...' : 
         '🎰 Flip Coin'}
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-4 sm:mt-6 text-center">
          <div className={`p-3 sm:p-4 rounded-lg ${
            result === 'You won!' 
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
              : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30'
          }`}>
            <p className={`text-lg sm:text-xl font-bold ${
              result === 'You won!' ? 'text-green-400' : 'text-red-400'
            }`}>
              {result === 'You won!' ? '🎉 You Won!' : '😔 You Lost!'}
            </p>
            {coinSide && (
              <div className="text-xs sm:text-sm text-gray-300 mt-2 space-y-1">
                <p>Result: {coinSide === 'heads' ? '👑 Heads' : '🦅 Tails'}</p>
                <p>Your choice: {userChoice === 'heads' ? '👑 Heads' : '🦅 Tails'}</p>
                <p className={`font-semibold ${userChoice === coinSide ? 'text-green-400' : 'text-red-400'}`}>
                  {userChoice === coinSide ? '✅ Match!' : '❌ No match'}
                </p>
                {transactionSignature && (
                  <div className="mt-3 pt-2 border-t border-gray-600">
                    <p className="text-xs text-gray-400">Transaction:</p>
                    <a 
                      href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs break-all"
                    >
                      {transactionSignature.slice(0, 8)}...{transactionSignature.slice(-8)}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game Instructions */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm">
        <div className="text-xs sm:text-sm text-gray-300 space-y-2">
          <p className="font-semibold text-white mb-2 sm:mb-3">🎮 How to Play:</p>
          <div className="space-y-1">
            <p>1️⃣ Connect your Solana wallet</p>
            <p>2️⃣ Choose your bet amount</p>
            <p>3️⃣ Select Heads or Tails</p>
            <p>4️⃣ Click "Flip Coin" to play</p>
            <p>5️⃣ Watch the coin spin and see your result!</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-600">
          <p className="text-xs text-gray-400 text-center">
            💰 Fee: 3% | House: {HOUSE_WALLET.toBase58().slice(0, 8)}...
          </p>
        </div>
      </div>
    </div>
  )
}
