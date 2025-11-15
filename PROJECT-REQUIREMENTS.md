# Project Requirements & Pre-requisites
## Mila's Birthday Interactive Website - December 1st

---

## 1. Project Overview

An interactive birthday celebration website featuring a treasure hunt game where the user (Mila) must complete 5 mini-games to unlock clues and find 5 hidden birthday gifts around the house. Upon collecting all gifts, a beautiful greeting card is revealed.

### Target Launch Date
December 1st

---

## 2. Technical Stack

### Core Technologies
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite or Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Package Manager**: npm or pnpm

### UI Component Libraries
1. **shadcn/ui** (ui.shadcn.com)
   - Core UI components
   - Form elements, dialogs, cards

2. **Magic UI** (magicui.design)
   - Advanced animations
   - Engaging interactive components

3. **TweakCN** (tweakcn.com)
   - Theme configuration
   - ShadCN UI integration
   - Design system management

4. **React Bits** (reactbits.dev)
   - 100+ animated components
   - Free animation library

### Additional Libraries Needed
- **Animation**: Framer Motion or React Spring
- **State Management**: Zustand or React Context
- **Icons**: Lucide React or Heroicons
- **Confetti/Celebrations**: react-confetti or canvas-confetti
- **Sound Effects**: Howler.js (optional)

---

## 3. Development Pre-requisites

### Required Software
- [ ] Node.js v18+ installed
- [ ] npm/pnpm package manager
- [ ] Git for version control
- [ ] Code editor (VS Code recommended)
- [ ] Modern browser for testing (Chrome/Firefox/Safari)

### Required Knowledge
- [ ] React/TypeScript fundamentals
- [ ] Tailwind CSS
- [ ] Component-based architecture
- [ ] Local storage API (for game progress)
- [ ] Responsive design principles
- [ ] Animation concepts

### Optional Tools
- [ ] Figma/Design tool (for mockups)
- [ ] Browser DevTools
- [ ] React DevTools extension

---

## 4. Design Requirements

### Color Palette
```css
Primary Colors:
- Deep Blue: #3d52a0 (rgb(61,82,160))
- Sky Blue: #7091e6 (rgb(112,145,230))
- Periwinkle: #8697c4 (rgb(134,151,196))
- Light Blue: #adbbda (rgb(173,187,218))
- Lavender: #ede8f5 (rgb(237,232,245))
```

### Typography Requirements
- Clean, readable fonts
- Aesthetic and modern
- Good font pairing for headings and body text
- Suggested: Inter/Poppins for headings, Open Sans/Roboto for body

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- Touch-friendly interactions for mobile
- Optimized game experiences for both screen sizes

### Visual Elements
- Birthday-themed imagery
- Gift illustrations/icons
- Celebration animations
- Smooth transitions between states
- Microinteractions for user feedback

---

## 5. Feature Requirements

### 5.1 Game Mechanics

#### Game Structure
5 levels, each unlocking a gift clue:

1. **Level 1** → Sleeping Dress
2. **Level 2** → Prayer Robe
3. **Level 3** → Parfume
4. **Level 4** → Shoes
5. **Level 5** → Bag
6. **Bonus** → Bouquet of Flowers

#### Mini-Game Types (Select 5)
Reference games from crazygames.com:
- Memory Match
- Spot the Difference
- Hidden Objects
- Word Search
- Puzzle Games
- Pattern Matching
- Simple Quiz/Trivia

#### Game Flow
```
Start → Level Selection → Play Mini-Game → Solve Game →
Receive Riddle Clue → Solve Riddle → Input Gift Location →
Mark as Collected → Next Level → All Collected → Greeting Card
```

### 5.2 Core Features

#### Landing Page
- [ ] Welcome animation
- [ ] Brief introduction
- [ ] "Start Adventure" CTA button
- [ ] Birthday theme visuals

#### Game Dashboard
- [ ] Progress tracker (X/5 gifts collected)
- [ ] Level selection (locked/unlocked states)
- [ ] Visual gift gallery
- [ ] Current level indicator

#### Mini-Games
- [ ] 5 different interactive games
- [ ] Clear instructions per game
- [ ] Timer/scoring system
- [ ] Success/failure states
- [ ] Replay option

#### Riddle System
- [ ] Riddle display after game completion
- [ ] Personal inside jokes/references
- [ ] Hint system (optional)
- [ ] Answer validation

#### Gift Collection
- [ ] Confirmation input system
- [ ] Gift marked as "found" state
- [ ] Visual feedback on collection
- [ ] Progress update

#### Final Greeting Card
- [ ] Revealed after all gifts collected
- [ ] Interactive/animated card
- [ ] Personal birthday message
- [ ] Celebration effects (confetti, animations)
- [ ] Inspired by: https://2019.makemepulse.com/

### 5.3 Data Persistence
- [ ] Local Storage for game progress
- [ ] Save collected gifts state
- [ ] Save completed levels
- [ ] Resume functionality

---

## 6. Project Structure

```
mila-birthday28/
├── public/
│   ├── images/
│   │   ├── gifts/
│   │   ├── backgrounds/
│   │   └── icons/
│   └── sounds/ (optional)
├── src/
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── games/
│   │   │   ├── MemoryMatch/
│   │   │   ├── SpotDifference/
│   │   │   ├── HiddenObjects/
│   │   │   ├── WordSearch/
│   │   │   └── GameWrapper/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── features/
│   │   │   ├── LandingPage/
│   │   │   ├── GameDashboard/
│   │   │   ├── RiddleDisplay/
│   │   │   ├── GiftCollection/
│   │   │   └── GreetingCard/
│   │   └── shared/
│   │       ├── ProgressBar.tsx
│   │       ├── GiftCard.tsx
│   │       └── LevelCard.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/
│   │   ├── useGameProgress.ts
│   │   └── useLocalStorage.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── riddles.ts
│   │   ├── gifts.ts
│   │   └── levels.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts (or next.config.js)
└── README.md
```

---

## 7. Development Phases

### Phase 1: Setup & Foundation (Day 1-2)
- [ ] Initialize React project
- [ ] Install and configure all dependencies
- [ ] Set up Tailwind CSS with color palette
- [ ] Install shadcn/ui components
- [ ] Set up project structure
- [ ] Create basic routing

### Phase 2: UI Components (Day 3-4)
- [ ] Design and build layout components
- [ ] Create gift card components
- [ ] Build level selection interface
- [ ] Implement progress tracking UI
- [ ] Add responsive design

### Phase 3: Game Development (Day 5-8)
- [ ] Develop 5 mini-games
- [ ] Implement game logic
- [ ] Add win/loss conditions
- [ ] Create transitions between games
- [ ] Test game mechanics

### Phase 4: Riddle & Collection System (Day 9-10)
- [ ] Create riddle data structure
- [ ] Build riddle display component
- [ ] Implement gift collection logic
- [ ] Add validation system
- [ ] Connect to local storage

### Phase 5: Greeting Card & Polish (Day 11-13)
- [ ] Design final greeting card
- [ ] Add celebration animations
- [ ] Implement confetti effects
- [ ] Add sound effects (optional)
- [ ] Final polish and animations

### Phase 6: Testing & Deployment (Day 14-15)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Deploy to hosting (Vercel/Netlify)
- [ ] Final testing on deployment

---

## 8. Data Structure Examples

### Gift Type
```typescript
interface Gift {
  id: string;
  name: string;
  level: number;
  image: string;
  isCollected: boolean;
  riddleClue: string;
  houseLocation: string; // Actual location in house
}
```

### Level Type
```typescript
interface Level {
  id: number;
  gameType: 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle';
  isUnlocked: boolean;
  isCompleted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  giftId: string;
}
```

### Game Progress Type
```typescript
interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  collectedGifts: string[];
  totalGifts: number;
  isGameComplete: boolean;
}
```

---

## 9. Performance Requirements

- [ ] Initial load time < 3 seconds
- [ ] Smooth 60fps animations
- [ ] Optimized images (WebP format)
- [ ] Lazy loading for games
- [ ] Minimal bundle size
- [ ] Progressive Web App (optional)

---

## 10. Deployment Requirements

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify (for Vite)
- GitHub Pages

### Pre-deployment Checklist
- [ ] Build optimization
- [ ] Image compression
- [ ] Meta tags for sharing
- [ ] Favicon
- [ ] Mobile testing
- [ ] Performance audit

---

## 11. Content Requirements

### Riddles (5 Personal Inside Jokes)
- To be provided based on personal references
- Should relate to locations in the house
- Should be solvable but clever

### Birthday Message
- Personal message for final greeting card
- To be written separately

### Images Needed
- Gift illustrations (6 items)
- Birthday-themed backgrounds
- Celebration graphics
- Icons for UI elements

---

## 12. Success Criteria

- [ ] All 5 games are functional and bug-free
- [ ] Responsive on mobile and desktop
- [ ] Smooth animations and transitions
- [ ] Gift collection system works correctly
- [ ] Final greeting card displays beautifully
- [ ] Birthday theme is cohesive and aesthetic
- [ ] Game is fun and engaging
- [ ] Launches successfully before December 1st

---

## 13. Nice-to-Have Features (Future Enhancements)

- [ ] Background music toggle
- [ ] Sound effects for interactions
- [ ] Save/load game state
- [ ] Photo gallery integration
- [ ] Timer challenges for extra rewards
- [ ] Achievement badges
- [ ] Share celebration on social media

---

## Notes

- Keep the codebase clean and well-documented
- Test thoroughly on Mila's likely devices
- Consider printing backup clues in case of technical issues
- Have fun with the implementation!
