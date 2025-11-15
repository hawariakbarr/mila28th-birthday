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
  const [progress, setProgress] = useLocalStorage<GameProgress>(
    'mila-birthday-progress',
    initialProgress
  );

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
      const isComplete = newCollectedGifts.length === prev.totalGifts;

      return {
        ...prev,
        collectedGifts: newCollectedGifts,
        isGameComplete: isComplete,
        completedAt: isComplete ? new Date().toISOString() : prev.completedAt,
        startedAt: prev.startedAt || new Date().toISOString(),
      };
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    return levelId === 1 || progress.completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number): boolean => {
    return progress.completedLevels.includes(levelId);
  };

  const isGiftCollected = (giftId: string): boolean => {
    return progress.collectedGifts.includes(giftId);
  };

  return {
    progress,
    completeLevel,
    collectGift,
    resetProgress,
    isLevelUnlocked,
    isLevelCompleted,
    isGiftCollected,
  };
}
