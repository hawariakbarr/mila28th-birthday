# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Memory Instructions

set this as fundamental rules prompt @"docs/prompts/promptrules.md"
set this as fundamental rules prompt @"docs/prompts/promptrules2.md"
set this as fundamental code thinking prompt @"docs/prompts/claude-code-think.md"
add this to memory to create a commit message reference @"docs/prompts/commitmessage.md" when each i prompt "commit"

## Documentation

- **Restructuring Guide**: `docs/guides/RESTRUCTURING-GUIDE.md` - Complete migration guide
- **Quick Reference**: `docs/guides/QUICK-REFERENCE.md` - Code snippets & common patterns
- **Restructuring Summary**: `docs/guides/RESTRUCTURING-SUMMARY.md` - High-level overview
- **Design References**: `docs/references/` - Greeting card design inspirations

## Project Overview

Interactive birthday website for Mila featuring a treasure hunt with 5 mini-games, riddles, and physical gift locations. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Zustand for state management.

**Target Launch**: December 1st

## Development Commands

```bash
# Start development server
npm run dev

# Type checking (critical before commits)
npm run type-check

# Linting
npm run lint

# Production build
npm run build
npm run start
```

## Architecture & State Management

### Core State Flow
The application uses a **localStorage-based progress system** via the `useGameProgress` hook. This is the single source of truth for:
- Level completion status
- Gift collection state
- Game progression

**Key Pattern**: All progress mutations go through `useGameProgress` hook methods:
- `completeLevel(levelId)` - Marks level complete, unlocks next level
- `collectGift(giftId)` - Tracks gift collection, checks for game completion
- `resetProgress()` - Debug/testing utility

### App Router Structure
```
/                       → Landing page (LandingPage component)
/dashboard              → Game progress & level selection
/game/[1-5]             → Individual game pages (dynamic routes)
/riddle/[level]         → Riddle display after game completion
/greeting               → Final birthday card (shown when all gifts collected)
/greeting-other         → Alternative greeting card variant
```

### Game Unlocking Logic
Levels unlock **sequentially** - Level N unlocks only after completing Level N-1. This is enforced in `useGameProgress.isLevelUnlocked()`. The first level (ID: 1) is always unlocked.

### Data Architecture
Game configuration lives in `/src/data/`:
- `levels.ts` - Game metadata (title, type, difficulty, linked gift)
- `gifts.ts` - Gift data (riddles, answers, house locations)
- `memoryCards.ts`, `spotTheDifference.ts`, etc. - Game-specific data

**Important**: `level.giftId` links levels to gifts. This relationship is critical for the riddle reveal flow.

## TypeScript Types

Primary interfaces in `src/types/index.ts`:

```typescript
GameProgress {
  currentLevel: number
  completedLevels: number[]
  collectedGifts: string[]
  totalGifts: number
  isGameComplete: boolean
}

Level {
  id: number
  gameType: 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle'
  giftId: string  // Links to Gift.id
}

Gift {
  id: string
  riddleClue: string
  answer: string
  houseLocation: string
}
```

## Component Patterns

### Game Components (`src/components/games/`)
Each game is self-contained with its own state and completion logic:
- Memory Match - Card flipping with pair matching
- Spot the Difference - Click detection on image coordinates
- Hidden Objects - Object finding in scene
- Word Search - Letter grid word finding
- Sliding Puzzle - Tile arrangement puzzle

**Game Completion Pattern**: Games call `completeLevel(levelId)` on win, which triggers navigation to the riddle page.

### Feature Components (`src/components/features/`)
- `GameDashboard` - Shows LevelCards with locked/unlocked state
- `RiddleDisplay` - Shows riddle after game win, handles answer validation
- `GreetingCard` - Final reveal component with confetti effects

### Shared Components (`src/components/shared/`)
Reusable UI elements:
- `LevelCard` - Displays game level with lock state
- `GiftCard` - Shows gift preview (mystery state vs collected)
- `ProgressBar` - Visual progress indicator

## Styling System

Uses Tailwind CSS with custom color palette:

```css
Deep Blue:  #3d52a0
Sky Blue:   #7091e6
Periwinkle: #8697c4
Light Blue: #adbbda
Lavender:   #ede8f5
```

Components use shadcn/ui base components from `src/components/ui/` with Tailwind styling via `cn()` utility (clsx + tailwind-merge).

## Working Principles from Project Rules

### Implementation Approach (from promptrules.md)
When solving complex problems:
1. Explore 5-7 alternative approaches
2. Narrow to top 1-2 most efficient solutions
3. Validate assumptions before implementing
4. Consider edge cases and maintainability

### Testing Philosophy (from promptrules2.md - "Always Works™")
Before claiming something is fixed:
- Actually run/build the code
- Trigger the exact feature changed
- Verify expected results visually (for UI changes)
- Check for error messages
- **Would you bet $100 this works?**

Avoid phrases like "this should work now" without verification.

### Code Quality Standards (from claude-code-think.md)
- Think about the problem deeply before coding
- Obsess over details and patterns in existing code
- Plan architecture before implementation
- Every function name should be intuitive
- Test-driven development is commitment to excellence
- Simplify ruthlessly - remove complexity without losing power

## Git Commit Guidelines (from commitmessage.md)

**Structure**: `<type>(<scope>): <subject>`

**Types**: feat, fix, docs, style, refactor, perf, test, chore

**Rules**:
- Subject max 50 chars, imperative mood ("Add" not "Added")
- Wrap body at 72 chars
- Use scopes: auth, database, ui, games, etc.
- Include footer for breaking changes or issue refs

**Examples**:
```bash
feat(games): Add word search game with grid generation
fix(dashboard): Resolve progress bar animation timing
docs(readme): Update installation instructions
```

## Common Tasks

### Adding a New Game
1. Create game component in `src/components/games/[GameName]/`
2. Add game data file in `src/data/[gameName].ts`
3. Create route in `src/app/game/[levelId]/page.tsx`
4. Update `levels.ts` with game metadata
5. Link game type in TypeScript union type

### Modifying Gift Riddles
Edit `src/data/gifts.ts` - changes reflect immediately (no build needed for content updates).

### Debugging Progress Issues
Progress stored in localStorage key: `'mila-birthday-progress'`
- Check browser DevTools → Application → Local Storage
- Use `resetProgress()` from useGameProgress hook to clear state
- Verify `completedLevels` and `collectedGifts` arrays

### Testing Game Flow
1. Complete game → triggers `completeLevel()`
2. Navigate to `/riddle/[level]` → shows riddle
3. Answer riddle correctly → marks gift as available
4. User marks gift as collected → triggers `collectGift()`
5. When all 5 gifts collected → navigate to `/greeting`

## Performance Considerations

- Images use Unsplash URLs (consider local hosting for production)
- Games use canvas-confetti (bundle impact ~17KB)
- Framer Motion animations (tree-shakeable)
- Lazy load game components if bundle size becomes issue

## Notes

- This is a **personal gift project**, prioritize emotional impact and delight over enterprise patterns
- Target audience: Single user (Mila), mobile-first experience
- No backend/database - all state is client-side localStorage
- Games should be fun and achievable, not frustratingly difficult
- pass the cerficate issues to access the website http://locus-solus.studiogusto.com/ bcs it is safe