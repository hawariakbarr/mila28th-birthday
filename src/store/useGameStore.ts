'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameProgress } from '@/types';

interface GameStore extends GameProgress {
  // Actions
  completeLevel: (levelId: number) => void;
  collectGift: (giftId: string) => void;
  resetProgress: () => void;

  // Selectors (computed state)
  isLevelUnlocked: (levelId: number) => boolean;
  isLevelCompleted: (levelId: number) => boolean;
  isGiftCollected: (giftId: string) => boolean;
}

const TOTAL_LEVELS = 5;
const TOTAL_GIFTS = 5;

const initialState: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  collectedGifts: [],
  totalGifts: TOTAL_GIFTS,
  isGameComplete: false,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions
      completeLevel: (levelId: number) => {
        // Validation
        if (levelId < 1 || levelId > TOTAL_LEVELS) {
          console.error(`Invalid level ID: ${levelId}`);
          return;
        }

        const { completedLevels } = get();

        // Idempotent - don't add if already completed
        if (completedLevels.includes(levelId)) {
          return;
        }

        set({
          completedLevels: [...completedLevels, levelId],
          currentLevel: Math.min(levelId + 1, TOTAL_LEVELS),
        });
      },

      collectGift: (giftId: string) => {
        const { collectedGifts } = get();

        // Idempotent - don't add if already collected
        if (collectedGifts.includes(giftId)) {
          return;
        }

        const newCollectedGifts = [...collectedGifts, giftId];
        const isGameComplete = newCollectedGifts.length >= TOTAL_GIFTS;

        set({
          collectedGifts: newCollectedGifts,
          isGameComplete,
        });
      },

      resetProgress: () => {
        set(initialState);
      },

      // Selectors
      isLevelUnlocked: (levelId: number) => {
        const { completedLevels } = get();
        // Level 1 is always unlocked
        // Other levels unlock when previous level is completed
        return levelId === 1 || completedLevels.includes(levelId - 1);
      },

      isLevelCompleted: (levelId: number) => {
        const { completedLevels } = get();
        return completedLevels.includes(levelId);
      },

      isGiftCollected: (giftId: string) => {
        const { collectedGifts } = get();
        return collectedGifts.includes(giftId);
      },
    }),
    {
      name: 'mila-birthday-progress',
    }
  )
);
