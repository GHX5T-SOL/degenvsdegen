# 🎰 Degen vs Degen - Solana Casino

A fully functional Solana-based coinflip casino built with Next.js 15, Anchor framework, and Tailwind CSS. Features real blockchain integration with automatic escrow, house matching, and instant payouts.

## ✨ Features

### 🎮 Core Gameplay
- **Coin Flip Game**: Simple heads/tails betting with real Solana transactions
- **Real Blockchain Integration**: All transactions processed on Solana devnet
- **Automatic Escrow**: User bets are held in Program Derived Addresses (PDAs)
- **House Matching**: House wallet automatically matches user bets
- **Instant Payouts**: Winners receive funds immediately after transaction confirmation
- **3% House Fee**: Transparent fee structure with automatic deduction

### 🔧 Technical Features
- **Anchor Framework**: Solana smart contracts written in Rust
- **Next.js 15**: Modern React framework with App Router
- **Solana Wallet Integration**: Support for Phantom, Solflare, and Torus wallets
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Real-time Updates**: Live balance updates and transaction tracking
- **Transaction Explorer**: Direct links to Solana Explorer for transparency

### 🎨 UI/UX Features
- **Liquid Glass Design**: Modern transparent header with backdrop blur
- **Purple Gradient Theme**: Consistent branding across all pages
- **Spinning Coin Animation**: Visual feedback during game play
- **Mobile-First Design**: Touch-friendly interface with proper spacing
- **Error Handling**: Comprehensive error messages and user feedback

## 🏗️ Architecture

### Smart Contract (Anchor)
```
Program ID: 3CkSjNQAeoA4Zx5ZhQ7qrREFqw3xiyuFZF7mG97jQZNU
House Wallet: 7Po3gCenxonM4W6WfDEqMonhQQP59kBr5uZV6BUZLxaf
```

**Instructions:**
- `initialize_house_vault`: Sets up the house vault PDA
- `play_game`: Main game logic with escrow, matching, and payout

**Account Structure:**
- `HouseVault`: Stores house wallet ownership and bump seed
- `EscrowAccount`: Temporary account for holding user and house funds

### Frontend (Next.js)
- **App Router**: Modern Next.js routing with server components
- **Wallet Integration**: Solana wallet adapter with multiple wallet support
- **Real-time Updates**: Live balance and transaction status updates
- **Mobile Optimization**: Responsive design with touch-friendly controls

## 🚀 Game Flow

1. **User Connection**: User connects Solana wallet (Phantom, Solflare, etc.)
2. **Bet Selection**: User chooses bet amount (0.05 SOL to 2 SOL)
3. **Side Selection**: User picks Heads or Tails
4. **Transaction Approval**: User approves transaction in wallet
5. **Escrow Creation**: Program creates unique escrow PDA for the game
6. **Fund Transfer**: User's bet is transferred to escrow
7. **House Matching**: House wallet matches the bet amount
8. **Coin Flip**: Program generates random outcome using slot hash
9. **Automatic Payout**: 
   - **Win**: User receives 97% of total pot (3% house fee)
   - **Lose**: House receives 100% of total pot
10. **Transaction Confirmation**: All transactions confirmed on blockchain

## 🛠️ Setup & Deployment

### Prerequisites
- Node.js 18+
- Rust 1.70+
- Solana CLI 1.16+
- Anchor CLI 0.31.1

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build Anchor program
anchor build

# Deploy to devnet (optional)
anchor deploy
```

### Vercel Deployment
The project includes `vercel.json` configuration for seamless deployment:

```bash
# Deploy to Vercel
vercel --prod
```

**Environment Variables:**
```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
ANCHOR_WALLET=~/.config/solana/id.json
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
```

## 🔒 Security Features

- **PDA-based Escrow**: Each game uses a unique Program Derived Address
- **Random Number Generation**: Uses Solana slot hash for provably fair outcomes
- **Automatic Fee Collection**: Transparent 3% house edge
- **Balance Validation**: Prevents insufficient fund transactions
- **Transaction Confirmation**: All transactions require blockchain confirmation

## 📱 Mobile Optimization

- **Touch Targets**: Minimum 44px touch targets for mobile devices
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Scrolling**: Optimized scrolling performance
- **Viewport Configuration**: Proper mobile viewport settings
- **Font Size Optimization**: Prevents zoom on input focus

## 🎯 Production Ready Features

- **Error Boundaries**: Comprehensive error handling
- **Loading States**: Visual feedback during transactions
- **Transaction Links**: Direct links to Solana Explorer
- **Balance Updates**: Real-time wallet balance updates
- **Mobile Performance**: Optimized animations and interactions

## 🔗 Links

- **Live Demo**: [Deploy to Vercel](https://vercel.com)
- **Solana Explorer**: [View Transactions](https://explorer.solana.com/?cluster=devnet)
- **Program ID**: `3CkSjNQAeoA4Zx5ZhQ7qrREFqw3xiyuFZF7mG97jQZNU`

## 📄 License

MIT License - Feel free to use this project as a starting point for your own Solana casino!

---

**⚠️ Disclaimer**: This is a demonstration project. Always conduct thorough testing and security audits before deploying to mainnet.