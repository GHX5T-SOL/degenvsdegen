import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function useSolana() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    if (wallet.publicKey && connection) {
      connection.getBalance(wallet.publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL)
      }).catch(error => {
        console.error('Error fetching balance:', error)
      })
    }
  }, [wallet.publicKey, connection])

  return {
    publicKey: wallet.publicKey,
    balance,
    connection,
    wallet,
  }
}
