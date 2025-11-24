# 📁 Project Structure

Clean and organized directory structure for the Mila Birthday project.

## 🏗️ Root Directory

```
mila-birthday28/
├── 📄 CLAUDE.md                    # AI assistant guidance
├── 📄 README.md                    # Project README
├── 📄 PROJECT-STRUCTURE.md         # This file
├── 📦 package.json                 # Dependencies
├── ⚙️  next.config.ts               # Next.js configuration
├── ⚙️  tailwind.config.ts           # Tailwind + design tokens
├── ⚙️  tsconfig.json                # TypeScript configuration
│
├── 📁 src/                         # Source code
│   ├── app/                        # Next.js App Router
│   ├── components/                 # React components
│   ├── data/                       # Game data & configurations
│   ├── lib/                        # Utilities & helpers
│   ├── store/                      # Zustand state management
│   ├── types/                      # TypeScript types
│   └── styles/                     # Global styles
│
├── 📁 docs/                        # All documentation
│   ├── guides/                     # How-to guides
│   ├── prompts/                    # AI assistant prompts
│   └── references/                 # Design references
│
└── 📁 public/                      # Static assets
```

---

## 📂 Source Code (`src/`)

### `src/app/` - Next.js Routes

```
app/
├── layout.tsx                      # Root layout
├── page.tsx                        # Landing page (/)
├── error.tsx                       # Root error boundary
├── loading.tsx                     # Root loading state
│
├── dashboard/
│   ├── page.tsx                    # Game dashboard
│   ├── error.tsx
│   └── loading.tsx
│
├── game/
│   └── [levelId]/                  # Dynamic game routes
│       ├── page.tsx                # Game loader
│       ├── error.tsx               # Game error boundary
│       └── loading.tsx             # Game loading state
│
├── riddle/
│   └── [level]/                    # Dynamic riddle routes
│       └── page.tsx
│
└── greeting/                       # Birthday card routes
    ├── page.tsx                    # Main greeting
    ├── greeting-locus/
    ├── greeting-locus-origin/
    ├── greeting-nomadic/
    └── greeting-other/
```

### `src/components/` - React Components

```
components/
├── ui/                             # shadcn/ui primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── progress.tsx
│
├── shared/                         # Reusable components
│   ├── GameContainer.tsx           # Game wrapper
│   ├── GameHeader.tsx              # Game header with back button
│   ├── CompletionModal.tsx         # Win modal
│   ├── LevelCard.tsx               # Level display card
│   ├── GiftCard.tsx                # Gift display card
│   └── ProgressBar.tsx             # Progress indicator
│
├── games/                          # Game implementations
│   ├── MemoryMatch/
│   ├── SpotTheDifference/
│   ├── HiddenObjects/
│   ├── WordSearch/
│   └── SlidingPuzzle/
│
└── features/                       # Feature components
    ├── LandingPage/
    ├── GameDashboard/
    ├── RiddleDisplay/
    ├── GreetingCard/
    └── greeting/                   # Greeting variants
```

### `src/lib/` - Utilities & Helpers

```
lib/
├── utils.ts                        # General utilities (cn, etc.)
├── game-logic.ts                   # Game utilities
│   ├── detectCollision()
│   ├── getRelativeCoordinates()
│   ├── findClickedItem()
│   ├── checkWinCondition()
│   └── shuffleArray()
│
├── animations.ts                   # Animation helpers
│   ├── celebrationConfetti()
│   ├── continuousConfetti()
│   ├── fireworksConfetti()
│   ├── fadeInVariants
│   ├── slideUpVariants
│   └── staggerContainer
│
└── constants.ts                    # Application constants
    ├── GAME_CONFIG
    ├── ROUTES
    ├── MESSAGES
    ├── THEME_COLORS
    └── COLLISION
```

### `src/store/` - State Management

```
store/
└── useGameStore.ts                 # Zustand store
    ├── State: completedLevels, collectedGifts
    ├── Actions: completeLevel(), collectGift()
    └── Selectors: isLevelUnlocked(), isLevelCompleted()
```

### `src/data/` - Game Data

```
data/
├── levels.ts                       # 5 level definitions
├── gifts.ts                        # 5 gifts + bonus
├── memoryCards.ts                  # Memory game data
├── spotTheDifference.ts            # Difference coordinates
├── hiddenObjects.ts                # Object locations
├── wordSearch.ts                   # Word grid
└── puzzleGame.ts                   # Puzzle data
```

### `src/types/` - TypeScript Types

```
types/
└── index.ts                        # All interfaces
    ├── Gift
    ├── Level
    ├── GameProgress
    ├── GameType
    └── Game-specific types
```

---

## 📚 Documentation (`docs/`)

### `docs/guides/` - How-To Guides

- **RESTRUCTURING-SUMMARY.md** - High-level overview of restructuring changes
- **QUICK-REFERENCE.md** - Code snippets and common patterns
- **RESTRUCTURING-GUIDE.md** - Complete migration guide with examples

### `docs/prompts/` - AI Assistant Configuration

- **promptrules.md** - Fundamental coding rules
- **promptrules2.md** - Additional coding guidelines
- **claude-code-think.md** - Code thinking patterns
- **commitmessage.md** - Git commit message guidelines
- **initiate-notes.md** - Project initialization notes

### `docs/references/` - Design References

- **LOCUS-SOLUS-REFERENCE.md** - Locus Solus greeting design
- **MAKE-ME-PULSE-REFERENCE.md** - Make Me Pulse animations
- **NOMADIC-GREETING-SUMMARY.md** - Nomadic tribe design
- **greeting.md** - General greeting card notes
- **locus-solus-main.css** - Original CSS reference
- **locus-solus-raw.html** - Original HTML reference

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | AI assistant guidance for working with this repo |
| `README.md` | Project overview and setup instructions |
| `src/store/useGameStore.ts` | Centralized game state (Zustand) |
| `src/lib/game-logic.ts` | Shared game utilities |
| `src/lib/animations.ts` | Animation & confetti helpers |
| `src/lib/constants.ts` | Application constants |
| `tailwind.config.ts` | Design tokens & theme |
| `docs/guides/QUICK-REFERENCE.md` | Code snippets for developers |

---

## 🚀 Quick Navigation

**For Developers:**
- Start with: `docs/guides/RESTRUCTURING-SUMMARY.md`
- Code snippets: `docs/guides/QUICK-REFERENCE.md`
- Detailed guide: `docs/guides/RESTRUCTURING-GUIDE.md`

**For AI Assistants:**
- Read: `CLAUDE.md`
- Prompts: `docs/prompts/`

**For Designers:**
- References: `docs/references/`

---

## 📝 Notes

- All markdown documentation is now in `docs/`
- Test artifacts are gitignored (test-screenshots/, test_app.py)
- Build artifacts are gitignored (*.tsbuildinfo, .next/)
- Configuration files remain in root for tooling compatibility
