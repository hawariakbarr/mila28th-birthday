# Quick Start Guide
## Get Started in 15 Minutes

---

## Prerequisites Check

Before you begin, ensure you have:
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm or pnpm installed (`npm --version`)
- [ ] Code editor (VS Code recommended)
- [ ] Git installed
- [ ] Basic React/TypeScript knowledge

---

## Step-by-Step Initialization

### 1. Choose Your Framework (Pick One)

#### Option A: Next.js (Recommended for this project)
```bash
npx create-next-app@latest . --typescript --tailwind --app --use-npm
```

When prompted:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Import alias: **No** (or keep default)

#### Option B: Vite + React
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

### 2. Install shadcn/ui
```bash
npx shadcn@latest init
```

Select:
- Style: **Default**
- Base color: **Blue**
- CSS variables: **Yes**

---

### 3. Install Essential Dependencies
```bash
npm install framer-motion zustand lucide-react canvas-confetti
npm install -D @types/canvas-confetti
```

---

### 4. Install shadcn Components
```bash
npx shadcn@latest add button card dialog progress input label toast tabs badge
```

---

### 5. Create Project Structure
```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path src/components/ui
New-Item -ItemType Directory -Force -Path src/components/games/MemoryMatch
New-Item -ItemType Directory -Force -Path src/components/games/SpotDifference
New-Item -ItemType Directory -Force -Path src/components/games/HiddenObjects
New-Item -ItemType Directory -Force -Path src/components/games/WordSearch
New-Item -ItemType Directory -Force -Path src/components/games/Puzzle
New-Item -ItemType Directory -Force -Path src/components/layout
New-Item -ItemType Directory -Force -Path src/components/features/LandingPage
New-Item -ItemType Directory -Force -Path src/components/features/GameDashboard
New-Item -ItemType Directory -Force -Path src/components/features/RiddleDisplay
New-Item -ItemType Directory -Force -Path src/components/features/GiftCollection
New-Item -ItemType Directory -Force -Path src/components/features/GreetingCard
New-Item -ItemType Directory -Force -Path src/components/shared
New-Item -ItemType Directory -Force -Path src/lib
New-Item -ItemType Directory -Force -Path src/hooks
New-Item -ItemType Directory -Force -Path src/types
New-Item -ItemType Directory -Force -Path src/data
New-Item -ItemType Directory -Force -Path public/images/gifts
New-Item -ItemType Directory -Force -Path public/images/backgrounds
New-Item -ItemType Directory -Force -Path public/images/icons
New-Item -ItemType Directory -Force -Path public/sounds

# Or for Unix/Mac/Git Bash:
mkdir -p src/components/{ui,games/{MemoryMatch,SpotDifference,HiddenObjects,WordSearch,Puzzle},layout,features/{LandingPage,GameDashboard,RiddleDisplay,GiftCollection,GreetingCard},shared}
mkdir -p src/{lib,hooks,types,data}
mkdir -p public/images/{gifts,backgrounds,icons}
mkdir -p public/sounds
```

---

### 6. Update Tailwind Config

Replace `tailwind.config.js` (or `tailwind.config.ts`):

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
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3d52a0",
          50: "#ede8f5",
          100: "#adbbda",
          200: "#8697c4",
          300: "#7091e6",
          400: "#3d52a0",
        },
        birthday: {
          lavender: "#ede8f5",
          lightBlue: "#adbbda",
          periwinkle: "#8697c4",
          skyBlue: "#7091e6",
          deepBlue: "#3d52a0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

### 7. Create Core Files

Copy the following files from `SETUP-GUIDE.md`:
- [ ] `src/types/index.ts` (type definitions)
- [ ] `src/hooks/useLocalStorage.ts`
- [ ] `src/hooks/useGameProgress.ts`
- [ ] `src/data/gifts.ts`
- [ ] `src/data/levels.ts`
- [ ] `src/lib/utils.ts`

---

### 8. Test Your Setup

```bash
npm run dev
```

Visit `http://localhost:3000` (Next.js) or `http://localhost:5173` (Vite)

You should see the default welcome page with no errors.

---

### 9. Create First Component

Create `src/components/features/LandingPage/index.tsx`:

```typescript
'use client'; // Only for Next.js App Router

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-birthday-lavender flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4"
      >
        <h1 className="text-6xl font-bold text-primary mb-4">
          Happy Birthday Mila! 🎂
        </h1>
        <p className="text-xl text-primary-400 mb-8">
          Your adventure awaits...
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary-500"
        >
          Start Your Adventure
        </Button>
      </motion.div>
    </div>
  );
}
```

---

### 10. Test the Component

**For Next.js:**
Update `src/app/page.tsx`:
```typescript
import LandingPage from '@/components/features/LandingPage';

export default function Home() {
  return <LandingPage />;
}
```

**For Vite:**
Update `src/App.tsx`:
```typescript
import LandingPage from './components/features/LandingPage';

function App() {
  return <LandingPage />;
}

export default App;
```

---

### 11. Verify Everything Works

Check that you see:
- [ ] Purple/lavender background
- [ ] "Happy Birthday Mila!" heading
- [ ] Smooth fade-in animation
- [ ] Blue button
- [ ] No console errors

---

## What's Next?

Now that your project is set up, follow these documents in order:

1. **Read** `PROJECT-REQUIREMENTS.md` - Understand full scope
2. **Reference** `SETUP-GUIDE.md` - For detailed technical info
3. **Follow** `DEVELOPMENT-ROADMAP.md` - Day-by-day implementation guide

---

## Immediate Next Steps

### Day 1 Tasks:
1. ✅ Project initialization (you just completed this!)
2. [ ] Complete the Landing Page component
3. [ ] Create layout components (Header, Footer)
4. [ ] Set up routing for all pages
5. [ ] Create shared components (GiftCard, ProgressBar)

### Content Needed:
- [ ] Write 5 personalized riddles
- [ ] Gather/create 5 gift images
- [ ] Choose background images
- [ ] Write final birthday message

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind not working
- Verify `globals.css` imports are in root layout
- Check `content` paths in `tailwind.config.js`

### TypeScript errors
```bash
npm run type-check
```

---

## Useful Commands

```bash
# Development
npm run dev

# Add more shadcn components
npx shadcn@latest add [component-name]

# Type checking
npm run type-check

# Build for production
npm run build

# Git commit
git add .
git commit -m "feat: initial setup complete"
```

---

## Pro Tips

1. **Commit Often**: After each feature or significant change
2. **Test on Mobile**: Check responsive design frequently
3. **Use Color Palette**: Stick to the birthday colors defined
4. **Keep It Personal**: Add inside jokes and personal touches
5. **Start Simple**: Get basic functionality working first, then add polish

---

## Project Structure Overview

```
mila-birthday28/
├── src/
│   ├── app/ or pages/          # Routes (Next.js)
│   ├── components/
│   │   ├── games/              # 5 mini-games
│   │   ├── features/           # Main pages
│   │   ├── ui/                 # shadcn components
│   │   └── shared/             # Reusable components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities
│   ├── types/                  # TypeScript types
│   └── data/                   # Game/gift data
└── public/
    ├── images/                 # All images
    └── sounds/                 # Sound effects (optional)
```

---

## Timeline Reminder

**Today (Day 1)**: Setup & Foundation
**Days 2-4**: Landing Page & Dashboard
**Days 5-8**: Build 5 Mini-Games
**Days 9-10**: Riddle & Collection System
**Days 11-13**: Greeting Card & Polish
**Days 14-15**: Testing & Deployment
**December 1st**: 🎉 Launch Day!

---

## Need Help?

- Check `SETUP-GUIDE.md` for detailed setup
- Review `DEVELOPMENT-ROADMAP.md` for implementation details
- Refer to `PROJECT-REQUIREMENTS.md` for feature specs

---

## You're All Set! 🚀

Your project is now initialized and ready for development. Time to build an amazing birthday experience for Mila!

Remember: Focus on making it personal, fun, and memorable. Good luck! 🎂✨
