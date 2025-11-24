import { Level } from '@/types';

/**
 * Level configuration data
 * Note: isUnlocked and isCompleted are derived from game progress store
 * They should NOT be stored here
 */
export const levels: Level[] = [
  {
    id: 1,
    gameType: 'memory',
    title: 'Memory Match',
    description: 'Match pairs of birthday-themed cards to unlock your first clue!',
    difficulty: 'easy',
    giftId: 'sleeping-dress',
  },
  {
    id: 2,
    gameType: 'spot-difference',
    title: 'Spot the Difference',
    description: 'Find all the differences between two birthday celebration images.',
    difficulty: 'easy',
    giftId: 'prayer-robe',
  },
  {
    id: 3,
    gameType: 'hidden-objects',
    title: 'Hidden Objects',
    description: 'Find all the hidden birthday items in the scene.',
    difficulty: 'medium',
    giftId: 'parfume',
  },
  {
    id: 4,
    gameType: 'word-search',
    title: 'Word Search',
    description: 'Find all the birthday-related words hidden in the grid.',
    difficulty: 'medium',
    giftId: 'shoes',
  },
  {
    id: 5,
    gameType: 'puzzle',
    title: 'Puzzle Challenge',
    description: 'Complete the birthday puzzle to find your final gift!',
    difficulty: 'hard',
    giftId: 'bag',
  },
];
