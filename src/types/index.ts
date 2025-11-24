/**
 * Gift data structure
 * Note: isCollected is derived from GameProgress.collectedGifts
 */
export interface Gift {
  id: string;
  name: string;
  level: number;
  image: string;
  riddleClue: string;
  answer: string;
  houseLocation: string;
}

/**
 * Level data structure
 * Note: isUnlocked and isCompleted are derived from GameProgress
 * Use useGameStore.isLevelUnlocked() and isLevelCompleted() to get these values
 */
export interface Level {
  id: number;
  gameType: 'memory' | 'spot-difference' | 'hidden-objects' | 'word-search' | 'puzzle';
  title: string;
  description: string;
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
