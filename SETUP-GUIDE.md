# Setup Guide
## Mila's Birthday Website - Technical Setup

---

## Quick Start Commands

### Option 1: Next.js (Recommended)

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --app --use-npm

# Install shadcn/ui
npx shadcn@latest init

# Install core dependencies
npm install framer-motion zustand lucide-react canvas-confetti

# Install additional dev dependencies
npm install -D @types/canvas-confetti
```

### Option 2: Vite + React

```bash
# Create Vite project
npm create vite@latest . -- --template react-ts

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install shadcn/ui
npx shadcn@latest init

# Install dependencies
npm install framer-motion zustand lucide-react canvas-confetti
npm install -D @types/canvas-confetti
```

---

## Detailed Setup Steps

### 1. Project Initialization

#### If using Next.js:
```bash
npx create-next-app@latest mila-birthday28 --typescript --tailwind --app --use-npm
cd mila-birthday28
```

Configuration prompts:
- ✅ TypeScript: Yes
- ✅ ESLint: Yes
- ✅ Tailwind CSS: Yes
- ✅ `src/` directory: Yes
- ✅ App Router: Yes
- ❌ Import alias: No (or use default @/*)

#### If using Vite:
```bash
npm create vite@latest mila-birthday28 -- --template react-ts
cd mila-birthday28
npm install
```

---

### 2. Install Tailwind CSS (Vite only)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3d52a0',
          50: '#ede8f5',
          100: '#adbbda',
          200: '#8697c4',
          300: '#7091e6',
          400: '#3d52a0',
        },
      },
    },
  },
  plugins: [],
}
```

Create `src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #3d52a0;
  --primary-light: #7091e6;
  --primary-lighter: #8697c4;
  --primary-lightest: #adbbda;
  --background: #ede8f5;
}
```

---

### 3. Install shadcn/ui

```bash
npx shadcn@latest init
```

Configuration:
- Style: Default
- Base color: Blue
- CSS variables: Yes

Install commonly needed components:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add progress
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add toast
npx shadcn@latest add tabs
npx shadcn@latest add badge
```

---

### 4. Install Core Dependencies

```bash
# Animation library
npm install framer-motion

# State management
npm install zustand

# Icons
npm install lucide-react

# Confetti effects
npm install canvas-confetti
npm install -D @types/canvas-confetti

# Sound effects (optional)
npm install howler
npm install -D @types/howler
```

---

### 5. Install Magic UI Components

Visit [magicui.design](https://magicui.design) and install components as needed:

```bash
# Example: Install specific Magic UI components
npx magicui-cli add animated-beam
npx magicui-cli add particles
npx magicui-cli add text-reveal
```

---

### 6. Create Project Structure

```bash
# Create directory structure
mkdir -p src/components/ui
mkdir -p src/components/games/{MemoryMatch,SpotDifference,HiddenObjects,WordSearch,Puzzle}
mkdir -p src/components/layout
mkdir -p src/components/features/{LandingPage,GameDashboard,RiddleDisplay,GiftCollection,GreetingCard}
mkdir -p src/components/shared
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/data
mkdir -p public/images/{gifts,backgrounds,icons}
mkdir -p public/sounds
```

---

### 7. Configure Custom Theme

Update `tailwind.config.js` with complete theme:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3d52a0",
          50: "#ede8f5",
          100: "#adbbda",
          200: "#8697c4",
          300: "#7091e6",
          400: "#3d52a0",
          500: "#2d3d7a",
          600: "#1f2b54",
          foreground: "#ffffff",
        },
        birthday: {
          lavender: "#ede8f5",
          lightBlue: "#adbbda",
          periwinkle: "#8697c4",
          skyBlue: "#7091e6",
          deepBlue: "#3d52a0",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

### 8. Create Base Type Definitions

Create `src/types/index.ts`:

```typescript
export interface Gift {
  id: string;
  name: string;
  level: number;
  image: string;
  isCollected: boolean;
  riddleClue: string;
  answer: string;
  houseLocation: string;
}

export interface Level {
  id: number;
  gameType: 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle';
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  giftId: string;
}

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  collectedGifts: string[];
  totalGifts: number;
  isGameComplete: boolean;
  startedAt?: string;
  completedAt?: string;
}

export type GameType = 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle';
```

---

### 9. Create Custom Hooks

Create `src/hooks/useLocalStorage.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

Create `src/hooks/useGameProgress.ts`:

```typescript
import { useLocalStorage } from './useLocalStorage';
import { GameProgress } from '@/types';

const initialProgress: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  collectedGifts: [],
  totalGifts: 5,
  isGameComplete: false,
};

export function useGameProgress() {
  const [progress, setProgress] = useLocalStorage<GameProgress>('mila-birthday-progress', initialProgress);

  const completeLevel = (levelId: number) => {
    setProgress((prev) => ({
      ...prev,
      completedLevels: [...prev.completedLevels, levelId],
      currentLevel: levelId + 1,
    }));
  };

  const collectGift = (giftId: string) => {
    setProgress((prev) => {
      const newCollectedGifts = [...prev.collectedGifts, giftId];
      return {
        ...prev,
        collectedGifts: newCollectedGifts,
        isGameComplete: newCollectedGifts.length === prev.totalGifts,
        completedAt: newCollectedGifts.length === prev.totalGifts ? new Date().toISOString() : undefined,
      };
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    completeLevel,
    collectGift,
    resetProgress,
  };
}
```

---

### 10. Create Data Files

Create `src/data/gifts.ts`:

```typescript
import { Gift } from '@/types';

export const gifts: Gift[] = [
  {
    id: 'sleeping-dress',
    name: 'Sleeping Dress',
    level: 1,
    image: '/images/gifts/sleeping-dress.png',
    isCollected: false,
    riddleClue: 'Your riddle for sleeping dress goes here',
    answer: 'bedroom',
    houseLocation: 'Bedroom closet',
  },
  {
    id: 'prayer-robe',
    name: 'Prayer Robe',
    level: 2,
    image: '/images/gifts/prayer-robe.png',
    isCollected: false,
    riddleClue: 'Your riddle for prayer robe goes here',
    answer: 'prayer room',
    houseLocation: 'Prayer room',
  },
  {
    id: 'parfume',
    name: 'Parfume',
    level: 3,
    image: '/images/gifts/parfume.png',
    isCollected: false,
    riddleClue: 'Your riddle for parfume goes here',
    answer: 'vanity',
    houseLocation: 'Vanity table',
  },
  {
    id: 'shoes',
    name: 'Shoes',
    level: 4,
    image: '/images/gifts/shoes.png',
    isCollected: false,
    riddleClue: 'Your riddle for shoes goes here',
    answer: 'shoe rack',
    houseLocation: 'Shoe rack by entrance',
  },
  {
    id: 'bag',
    name: 'Bag',
    level: 5,
    image: '/images/gifts/bag.png',
    isCollected: false,
    riddleClue: 'Your riddle for bag goes here',
    answer: 'closet',
    houseLocation: 'Main closet top shelf',
  },
];
```

Create `src/data/levels.ts`:

```typescript
import { Level } from '@/types';

export const levels: Level[] = [
  {
    id: 1,
    gameType: 'memory',
    title: 'Memory Match',
    description: 'Match pairs of birthday-themed cards',
    isUnlocked: true,
    isCompleted: false,
    difficulty: 'easy',
    giftId: 'sleeping-dress',
  },
  {
    id: 2,
    gameType: 'spot-difference',
    title: 'Spot the Difference',
    description: 'Find differences between two images',
    isUnlocked: false,
    isCompleted: false,
    difficulty: 'easy',
    giftId: 'prayer-robe',
  },
  {
    id: 3,
    gameType: 'hidden-objects',
    title: 'Hidden Objects',
    description: 'Find all hidden birthday items',
    isUnlocked: false,
    isCompleted: false,
    difficulty: 'medium',
    giftId: 'parfume',
  },
  {
    id: 4,
    gameType: 'word-search',
    title: 'Word Search',
    description: 'Find birthday-related words',
    isUnlocked: false,
    isCompleted: false,
    difficulty: 'medium',
    giftId: 'shoes',
  },
  {
    id: 5,
    gameType: 'puzzle',
    title: 'Puzzle Challenge',
    description: 'Solve the birthday puzzle',
    isUnlocked: false,
    isCompleted: false,
    difficulty: 'hard',
    giftId: 'bag',
  },
];
```

---

### 11. Install Additional Utilities

```bash
# Class name utility (if not included)
npm install clsx tailwind-merge

# Date formatting
npm install date-fns

# Animation utilities
npm install @react-spring/web
```

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function celebrationConfetti() {
  // Confetti utility function
  import('canvas-confetti').then((confetti) => {
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  });
}
```

---

### 12. Environment Setup

Create `.env.local` (if needed):

```env
# Add any environment variables here
NEXT_PUBLIC_APP_NAME="Mila's Birthday Adventure"
NEXT_PUBLIC_BIRTHDAY_DATE="2024-12-01"
```

---

### 13. Git Setup

Create `.gitignore` (should be auto-generated, but verify):

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
*.pem
.env.local
.env.development.local
.env.test.local
.env.production.local

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# typescript
*.tsbuildinfo
```

Initialize git:

```bash
git init
git add .
git commit -m "chore: initial project setup for Mila's birthday website"
```

---

### 14. Development Scripts

Update `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

### 15. VS Code Recommended Extensions

Create `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

---

### 16. Start Development

```bash
# Install all dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` (Next.js) or `http://localhost:5173` (Vite)

---

## Verification Checklist

After setup, verify:

- [ ] Project runs without errors
- [ ] Tailwind CSS is working (check with test classes)
- [ ] shadcn/ui components are accessible
- [ ] TypeScript compilation works
- [ ] Hot reload is functioning
- [ ] Custom colors from palette are available
- [ ] File structure is created
- [ ] Git repository is initialized

---

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Tailwind styles not loading
- Check `tailwind.config.js` content paths
- Verify globals.css is imported in root layout/app

**Issue**: shadcn components not found
```bash
# Reinitialize shadcn
npx shadcn@latest init
```

---

## Next Steps

After setup is complete:
1. Review PROJECT-REQUIREMENTS.md
2. Start with Phase 1: Landing Page
3. Follow development phases outlined in requirements
4. Regular commits following commit message guidelines

Happy coding! 🎂
