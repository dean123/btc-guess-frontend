# BTC Guess - Frontend

A React-based single-page application (SPA) where users can guess whether Bitcoin's price will go UP or DOWN in the next minute. Track your score, view your guess history, and compete to see how well you can predict the market!

## 🎮 Features

- **Real-time BTC Price** - Live Bitcoin price updates
- **Guess UP or DOWN** - Predict if the price will increase or decrease
- **User Authentication** - Register and login to track your performance
- **Guess History** - View all your past guesses and results
- **Score Tracking** - See your cumulative score based on correct predictions
- **Responsive Design** - Works on desktop and mobile devices

## 🏗️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **ESLint + Prettier** - Code quality and formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Backend API** - The BTC Guess backend must be running (see backend repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd btc-guess-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Note:** If your backend is running on a different port or host, update the URL accordingly.

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3001](http://localhost:3001)

Your browser should automatically open. If not, manually navigate to the URL above.

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── BTCPriceDisplay.tsx   # Shows current BTC price
│   ├── GuessButtons.tsx      # UP/DOWN guess buttons
│   ├── GuessHistory.tsx      # User's guess history
│   ├── Login.tsx             # Login form
│   ├── Register.tsx          # Registration form
│   └── UserScore.tsx         # Displays user score
├── contexts/           # React context providers
│   └── AuthContext.tsx       # Authentication context
├── services/           # API services
│   └── api.ts               # API client functions
├── types/              # TypeScript type definitions
│   └── auth.ts              # Auth-related types
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── vite-env.d.ts      # Vite environment types
```

### Available Scripts

#### `npm run dev`

Starts the development server with hot reload at [http://localhost:3001](http://localhost:3001)

#### `npm run build`

Creates an optimized production build in the `build/` directory

#### `npm run preview`

Preview the production build locally

#### `npm run lint`

Run ESLint to check for code issues

#### `npm run lint:fix`

Automatically fix ESLint issues where possible

#### `npm run format`

Format code using Prettier

#### `npm run format:check`

Check if code is properly formatted

### Code Quality

This project uses:

- **ESLint** - Catches bugs and enforces code standards
- **Prettier** - Ensures consistent code formatting
- **TypeScript** - Provides type safety

```bash
# Check everything
npm run lint
npm run format:check

# Fix issues automatically
npm run lint:fix
npm run format
```

## 🔧 Configuration

### Environment Variables

The app uses Vite's environment variable system. Variables must be prefixed with `VITE_`:

- `VITE_API_BASE_URL` - Backend API URL (required)
