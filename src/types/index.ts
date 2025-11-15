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

export interface MemoryCard {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface MemoryMatchState {
  cards: MemoryCard[];
  flippedCards: number[];
  matchedPairs: number[];
  moves: number;
  isComplete: boolean;
}
