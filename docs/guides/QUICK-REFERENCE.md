# 🚀 Quick Reference Guide

## Common Tasks & Code Snippets

### State Management

```typescript
// Import the store
import { useGameStore } from '@/store/useGameStore';

// Read state
const completedLevels = useGameStore(state => state.completedLevels);
const collectedGifts = useGameStore(state => state.collectedGifts);

// Use selectors (recommended for derived state)
const isUnlocked = useGameStore(state => state.isLevelUnlocked(levelId));
const isCompleted = useGameStore(state => state.isLevelCompleted(levelId));
const isCollected = useGameStore(state => state.isGiftCollected(giftId));

// Update state
const completeLevel = useGameStore(state => state.completeLevel);
const collectGift = useGameStore(state => state.collectGift);
const resetProgress = useGameStore(state => state.resetProgress);

// Usage
completeLevel(1);  // Complete level 1
collectGift('sleeping-dress');  // Collect gift
resetProgress();  // Reset all progress
```

---

### Game Logic Utilities

```typescript
import {
  getRelativeCoordinates,
  findClickedItem,
  detectCollision,
  checkWinCondition,
  shuffleArray,
} from '@/lib/game-logic';

// Get click coordinates (as percentage)
const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const point = getRelativeCoordinates(e);  // { x: 45.2, y: 67.8 }
};

// Find clicked item from list
const clickedItem = findClickedItem(
  clickPoint,
  gameItems,
  alreadyFoundIds  // Items to exclude
);

// Check collision manually
const isHit = detectCollision(clickPoint, targetItem);

// Check win condition
const hasWon = checkWinCondition(foundItems, requiredItems);

// Shuffle array (Fisher-Yates)
const shuffledCards = shuffleArray(cards);
```

---

### Animations

```typescript
import {
  celebrationConfetti,
  continuousConfetti,
  fireworksConfetti,
  fadeInVariants,
  slideUpVariants,
  staggerContainer,
} from '@/lib/animations';

// Trigger confetti
useEffect(() => {
  if (isComplete) {
    celebrationConfetti();  // Standard celebration
    // OR
    continuousConfetti(3000);  // 3 seconds
    // OR
    fireworksConfetti();  // Big celebration
  }
}, [isComplete]);

// Use Framer Motion variants
<motion.div variants={fadeInVariants} initial="hidden" animate="visible">
  Content
</motion.div>

<motion.div variants={slideUpVariants} initial="hidden" animate="visible">
  Content
</motion.div>

<motion.ul variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={fadeInVariants}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

---

### Constants

```typescript
import {
  GAME_CONFIG,
  ROUTES,
  MESSAGES,
  THEME_COLORS,
  THEME_COLORS_ARRAY,
  COLLISION,
  ANIMATION_DURATION,
} from '@/lib/constants';

// Game config
GAME_CONFIG.TOTAL_LEVELS;  // 5
GAME_CONFIG.TOTAL_GIFTS;   // 5
GAME_CONFIG.FIRST_LEVEL_ID;  // 1

// Routes (use for navigation)
router.push(ROUTES.DASHBOARD);
router.push(ROUTES.GAME(levelId));
router.push(ROUTES.RIDDLE(level));
router.push(ROUTES.GREETING);

// Messages
alert(MESSAGES.LEVEL_COMPLETE);
alert(MESSAGES.WRONG_ANSWER);

// Theme colors
const colors = THEME_COLORS_ARRAY;  // For confetti
const blue = THEME_COLORS.DEEP_BLUE;  // #3d52a0

// Collision detection radius
const radius = COLLISION.DEFAULT_RADIUS;  // 8
const touchRadius = COLLISION.TOUCH_RADIUS;  // 12

// Animation durations
const fast = ANIMATION_DURATION.FAST;  // 150ms
const normal = ANIMATION_DURATION.NORMAL;  // 300ms
```

---

### Shared Components

```typescript
import {
  GameContainer,
  GameHeader,
  CompletionModal,
} from '@/components/shared';

// Wrap your game
export function MyGame() {
  return (
    <GameContainer>
      <GameHeader
        title="Game Title"
        description="Game description"
        showBackButton={true}
      />

      {/* Your game content */}

      <CompletionModal
        isOpen={isComplete}
        title="Well Done!"
        message="You completed the game!"
        buttonText="Next Level"
        onButtonClick={handleNext}
        showConfetti={true}
      />
    </GameContainer>
  );
}
```

---

### Design Tokens

```typescript
// Colors
className="bg-primary-100 text-primary-900"  // Lightest bg, darkest text
className="bg-primary-500 text-white"  // Primary button
className="bg-birthday-lavender text-birthday-deepBlue"  // Legacy names

// Spacing
className="space-y-18"  // 4.5rem
className="max-w-100"   // 25rem

// Animations (Tailwind)
className="animate-fade-in"
className="animate-slide-up"
className="animate-bounce-in"
className="animate-scale-in"
className="animate-shimmer"

// Transitions
className="transition-all duration-normal"  // 300ms
className="transition-all duration-slow"    // 500ms
className="transition-all duration-2000"    // 2000ms
```

---

### Common Patterns

#### Complete Level Flow

```typescript
import { useGameStore } from '@/store/useGameStore';
import { ROUTES } from '@/lib/constants';
import { celebrationConfetti } from '@/lib/animations';
import { useRouter } from 'next/navigation';

export function MyGame({ levelId }: { levelId: number }) {
  const router = useRouter();
  const completeLevel = useGameStore(state => state.completeLevel);
  const [isComplete, setIsComplete] = useState(false);

  const handleCompletion = () => {
    setIsComplete(true);
    celebrationConfetti();
    completeLevel(levelId);

    setTimeout(() => {
      router.push(ROUTES.RIDDLE(levelId));
    }, 2000);
  };

  // ...game logic that calls handleCompletion when won
}
```

#### Check Level Access

```typescript
import { useGameStore } from '@/store/useGameStore';
import { useRouter } from 'next/navigation';
import { ROUTES, MESSAGES } from '@/lib/constants';

export function GamePage({ params }: { params: { levelId: string } }) {
  const router = useRouter();
  const levelId = parseInt(params.levelId);
  const isUnlocked = useGameStore(state => state.isLevelUnlocked(levelId));

  useEffect(() => {
    if (!isUnlocked) {
      alert(MESSAGES.LEVEL_LOCKED);
      router.push(ROUTES.DASHBOARD);
    }
  }, [isUnlocked, router]);

  // ...render game
}
```

#### Display Gift Status

```typescript
import { useGameStore } from '@/store/useGameStore';

export function GiftCard({ gift }: { gift: Gift }) {
  const isCollected = useGameStore(state => state.isGiftCollected(gift.id));

  return (
    <div className={isCollected ? 'opacity-50' : ''}>
      {isCollected ? '✓ Collected' : 'Available'}
      {/* ...rest of card */}
    </div>
  );
}
```

---

### File Structure Quick Lookup

```
src/
├── store/useGameStore.ts         → Game state management
├── lib/
│   ├── utils.ts                  → cn(), general utilities
│   ├── game-logic.ts             → Game-specific utilities
│   ├── animations.ts             → Confetti & motion variants
│   └── constants.ts              → App-wide constants
├── components/shared/
│   ├── GameContainer.tsx         → Game page wrapper
│   ├── GameHeader.tsx            → Game header component
│   ├── CompletionModal.tsx       → Win modal
│   ├── LevelCard.tsx             → Level display card
│   ├── GiftCard.tsx              → Gift display card
│   └── ProgressBar.tsx           → Progress indicator
├── data/
│   ├── levels.ts                 → Level config (no derived state)
│   └── gifts.ts                  → Gift config (no derived state)
└── types/index.ts                → TypeScript interfaces
```

---

### TypeScript Interfaces

```typescript
// Level (static data)
interface Level {
  id: number;
  gameType: 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  giftId: string;
}

// Gift (static data)
interface Gift {
  id: string;
  name: string;
  level: number;
  image: string;
  riddleClue: string;
  answer: string;
  houseLocation: string;
}

// Game Progress (runtime state)
interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  collectedGifts: string[];
  totalGifts: number;
  isGameComplete: boolean;
  startedAt?: string;
  completedAt?: string;
}

// Coordinate (game logic)
interface Coordinate {
  x: number;  // Percentage (0-100)
  y: number;  // Percentage (0-100)
}

// Clickable Item (game logic)
interface ClickableItem extends Coordinate {
  id: string;
  radius: number;
}
```

---

## 🔍 Debugging Tips

### Check Game Progress

```typescript
// In browser console or React DevTools
const state = useGameStore.getState();
console.log('Progress:', state);

// Or use Zustand DevTools
// Install: https://github.com/pmndrs/zustand#devtools
```

### Reset Progress (Development)

```typescript
import { useGameStore } from '@/store/useGameStore';

// In component
const resetProgress = useGameStore(state => state.resetProgress);

// Or manually in console
localStorage.removeItem('mila-birthday-progress');
window.location.reload();
```

### Type Check

```bash
npm run type-check
```

### Build Check

```bash
npm run build
```

---

## 📦 Build & Deploy

```bash
# Development
npm run dev

# Type check
npm run type-check

# Production build
npm run build

# Start production server
npm run start
```

---

## 🎯 Launch Checklist

- [ ] Run `npm run type-check` (should pass)
- [ ] Run `npm run build` (should succeed)
- [ ] Test all 5 games
- [ ] Test level unlocking
- [ ] Test gift collection
- [ ] Test riddle solving
- [ ] Test greeting card display
- [ ] Test on mobile device
- [ ] Verify confetti animations
- [ ] Check all routes for error boundaries
- [ ] Verify localStorage persistence

**December 1st Ready!** 🎉
