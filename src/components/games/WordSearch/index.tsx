'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search, CheckCircle, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { wordSearchGames, WordSearchWord } from '@/data/wordSearch';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface WordSearchProps {
  level: number;
}

interface SelectedCell {
  row: number;
  col: number;
}

export default function WordSearch({ level }: WordSearchProps) {
  const router = useRouter();
  const { completeLevel, isLevelCompleted } = useGameProgress();
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const gameData = wordSearchGames.find((g) => g.level === level);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;

    const firstCell = selectedCells[0];
    if (!firstCell) return;

    // Only allow straight lines (horizontal, vertical, or diagonal)
    const rowDiff = row - firstCell.row;
    const colDiff = col - firstCell.col;

    // Check if it's a valid straight line
    if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
      return; // Not a straight line
    }

    // Build selection path
    const newSelection: SelectedCell[] = [firstCell];
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    for (let i = 1; i <= steps; i++) {
      newSelection.push({
        row: firstCell.row + i * rowStep,
        col: firstCell.col + i * colStep,
      });
    }

    setSelectedCells(newSelection);
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Check if selection matches any word
    const selectedWord = selectedCells
      .map((cell) => gameData.grid[cell.row][cell.col])
      .join('');

    const foundWord = gameData.words.find((w) => {
      if (foundWords.includes(w.word)) return false; // Already found

      // Check forward
      const forward = selectedCells.every((cell, idx) => {
        const wordIdx = idx;
        const expectedRow =
          w.startRow + (wordIdx * (w.endRow - w.startRow)) / (w.word.length - 1);
        const expectedCol =
          w.startCol + (wordIdx * (w.endCol - w.startCol)) / (w.word.length - 1);
        return cell.row === expectedRow && cell.col === expectedCol;
      });

      // Check backward
      const backward = selectedCells.every((cell, idx) => {
        const wordIdx = selectedCells.length - 1 - idx;
        const expectedRow =
          w.startRow + (wordIdx * (w.endRow - w.startRow)) / (w.word.length - 1);
        const expectedCol =
          w.startCol + (wordIdx * (w.endCol - w.startCol)) / (w.word.length - 1);
        return cell.row === expectedRow && cell.col === expectedCol;
      });

      return (forward || backward) && selectedWord.length === w.word.length;
    });

    if (foundWord) {
      const newFoundWords = [...foundWords, foundWord.word];
      setFoundWords(newFoundWords);

      // Check if all words found
      if (newFoundWords.length === gameData.words.length) {
        setIsGameComplete(true);
        completeLevel(level);
        celebrationConfetti();
        setTimeout(() => {
          router.push(`/riddle/${level}`);
        }, 2000);
      }
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };

  const isCellInFoundWord = (row: number, col: number) => {
    return gameData.words.some((word) => {
      if (!foundWords.includes(word.word)) return false;

      const steps = word.word.length - 1;
      const rowStep = steps === 0 ? 0 : (word.endRow - word.startRow) / steps;
      const colStep = steps === 0 ? 0 : (word.endCol - word.startCol) / steps;

      for (let i = 0; i <= steps; i++) {
        const currentRow = word.startRow + i * rowStep;
        const currentCol = word.startCol + i * colStep;
        if (currentRow === row && currentCol === col) {
          return true;
        }
      }
      return false;
    });
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const resetGame = () => {
    setFoundWords([]);
    setIsSelecting(false);
    setSelectedCells([]);
    setIsGameComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBackToDashboard} className="mb-4">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={resetGame}
            className="mb-4 border-birthday-skyBlue text-birthday-deepBlue hover:bg-birthday-lightBlue"
          >
            <RotateCcw className="mr-2" size={18} />
            Restart Game
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Word List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-4">
              <CardHeader className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white">
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  <Search size={20} />
                  Find These Words
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {gameData.words.map((word) => (
                    <motion.div
                      key={word.word}
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: foundWords.includes(word.word) ? 1 : 0.5,
                        scale: foundWords.includes(word.word) ? 1 : 0.95,
                      }}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-lg border-2 transition-all',
                        foundWords.includes(word.word)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white'
                      )}
                    >
                      <span
                        className={cn(
                          'font-medium text-sm',
                          foundWords.includes(word.word)
                            ? 'text-green-700 line-through'
                            : 'text-gray-700'
                        )}
                      >
                        {word.word}
                      </span>
                      {foundWords.includes(word.word) && (
                        <CheckCircle className="text-green-500" size={18} />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-bold text-birthday-deepBlue">
                      {foundWords.length}/{gameData.words.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(foundWords.length / gameData.words.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Word Search Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white rounded-t-lg">
                <div>
                  <CardTitle className="text-2xl font-heading">
                    {gameData.title}
                  </CardTitle>
                  <p className="text-birthday-lavender text-sm mt-1">
                    Level {level} • {gameData.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {!isGameComplete ? (
                  <>
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        🔍 Click and drag to select words. Words can be horizontal,
                        vertical, or diagonal!
                      </p>
                    </div>

                    {/* Word Search Grid */}
                    <div
                      className="inline-block select-none"
                      onMouseLeave={() => {
                        if (isSelecting) handleMouseUp();
                      }}
                    >
                      <div className="grid gap-1.5 p-6 bg-gradient-to-br from-birthday-lavender to-birthday-lightBlue rounded-lg">
                        {gameData.grid.map((row, rowIndex) => (
                          <div key={rowIndex} className="flex gap-1.5">
                            {row.map((letter, colIndex) => (
                              <div
                                key={`${rowIndex}-${colIndex}`}
                                className={cn(
                                  'w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center font-bold text-base md:text-lg lg:text-xl rounded cursor-pointer transition-all',
                                  isCellInFoundWord(rowIndex, colIndex)
                                    ? 'bg-green-500 text-white'
                                    : isCellSelected(rowIndex, colIndex)
                                    ? 'bg-birthday-skyBlue text-white scale-110'
                                    : 'bg-white text-gray-700 hover:bg-birthday-lightBlue'
                                )}
                                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                onMouseUp={handleMouseUp}
                              >
                                {letter}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-3xl font-bold font-heading text-birthday-deepBlue mb-4">
                      All Words Found!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Great job! You found all {gameData.words.length} words!
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 inline-block">
                      <p className="text-sm text-green-800">
                        ✅ Redirecting to riddle...
                      </p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
