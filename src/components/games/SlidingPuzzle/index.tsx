'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Shuffle, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { puzzleGames } from '@/data/puzzleGame';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface SlidingPuzzleProps {
  level: number;
}

export default function SlidingPuzzle({ level }: SlidingPuzzleProps) {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const gameData = puzzleGames.find((g) => g.level === level);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const gridSize = gameData.gridSize;
  const totalTiles = gridSize * gridSize;

  // Initialize puzzle
  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    // Create solved puzzle (0 represents empty space)
    const solvedPuzzle = Array.from({ length: totalTiles }, (_, i) => i);

    // Shuffle it
    const shuffled = shufflePuzzle(solvedPuzzle);
    setTiles(shuffled);
    setMoves(0);
    setIsComplete(false);
  };

  const shufflePuzzle = (puzzle: number[]): number[] => {
    let current = [...puzzle];
    let emptyIndex = current.indexOf(0);

    // Perform 200 random valid moves
    for (let i = 0; i < 200; i++) {
      const validMoves = getValidMoves(emptyIndex, current);
      if (validMoves.length > 0) {
        const randomIndex = validMoves[Math.floor(Math.random() * validMoves.length)];

        // Swap
        [current[emptyIndex], current[randomIndex]] = [current[randomIndex], current[emptyIndex]];
        emptyIndex = randomIndex;
      }
    }

    return current;
  };

  const getValidMoves = (emptyIndex: number, currentTiles: number[]): number[] => {
    const row = Math.floor(emptyIndex / gridSize);
    const col = emptyIndex % gridSize;
    const validMoves: number[] = [];

    // Up
    if (row > 0) validMoves.push(emptyIndex - gridSize);
    // Down
    if (row < gridSize - 1) validMoves.push(emptyIndex + gridSize);
    // Left
    if (col > 0) validMoves.push(emptyIndex - 1);
    // Right
    if (col < gridSize - 1) validMoves.push(emptyIndex + 1);

    return validMoves;
  };

  const handleTileClick = (clickedIndex: number) => {
    if (isComplete || tiles[clickedIndex] === 0) return;

    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex, tiles);

    if (validMoves.includes(clickedIndex)) {
      // Swap clicked tile with empty space
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[clickedIndex]] = [newTiles[clickedIndex], newTiles[emptyIndex]];

      setTiles(newTiles);
      setMoves(prev => prev + 1);

      // Check if puzzle is solved
      checkCompletion(newTiles);
    }
  };

  const checkCompletion = (currentTiles: number[]) => {
    const isSolved = currentTiles.every((tile, index) => tile === index);

    if (isSolved) {
      setIsComplete(true);
      completeLevel(level);
      celebrationConfetti();
      setTimeout(() => {
        router.push(`/riddle/${level}`);
      }, 2000);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const resetGame = () => {
    initializePuzzle();
  };

  const getTileBackgroundPosition = (tileNumber: number) => {
    if (tileNumber === 0) return '0% 0%';

    const row = Math.floor(tileNumber / gridSize);
    const col = tileNumber % gridSize;

    const xPercent = gridSize === 1 ? 0 : (col / (gridSize - 1)) * 100;
    const yPercent = gridSize === 1 ? 0 : (row / (gridSize - 1)) * 100;

    return `${xPercent}% ${yPercent}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue p-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="mb-4"
          >
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
        <Card className="bg-white shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-heading">
                  {gameData.title}
                </CardTitle>
                <p className="text-birthday-lavender text-sm mt-1">
                  Level {level} • {gameData.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{moves}</div>
                <div className="text-xs text-birthday-lavender">Moves</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {!isComplete ? (
              <>
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    🧩 Click on tiles adjacent to the empty space to slide them. Arrange all tiles in order to complete the image!
                  </p>
                </div>

                {/* Controls */}
                <div className="flex gap-3 mb-6 flex-wrap">
                  <Button
                    onClick={() => initializePuzzle()}
                    variant="outline"
                    size="sm"
                    className="border-birthday-skyBlue text-birthday-deepBlue"
                  >
                    <Shuffle className="mr-2" size={16} />
                    Shuffle
                  </Button>
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    size="sm"
                    className="border-birthday-skyBlue text-birthday-deepBlue"
                  >
                    {showPreview ? (
                      <>
                        <EyeOff className="mr-2" size={16} />
                        Hide Preview
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2" size={16} />
                        Show Preview
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Puzzle Grid */}
                  <div>
                    <h3 className="text-center font-semibold text-gray-700 mb-3">
                      Puzzle
                    </h3>
                    <div
                      className="aspect-square bg-gray-300 rounded-lg overflow-hidden border-4 border-birthday-periwinkle"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                        gap: '2px',
                      }}
                    >
                      {tiles.map((tileNumber, index) => (
                        <motion.div
                          key={index}
                          className={cn(
                            'relative cursor-pointer transition-all',
                            tileNumber === 0
                              ? 'bg-gray-300'
                              : 'bg-white hover:opacity-80'
                          )}
                          onClick={() => handleTileClick(index)}
                          whileHover={tileNumber !== 0 ? { scale: 0.95 } : {}}
                          whileTap={tileNumber !== 0 ? { scale: 0.9 } : {}}
                        >
                          {tileNumber !== 0 && (
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: `url(${gameData.imageUrl})`,
                                backgroundSize: `${gridSize * 100}%`,
                                backgroundPosition: getTileBackgroundPosition(tileNumber),
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Preview Image */}
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <h3 className="text-center font-semibold text-gray-700 mb-3">
                        Reference Image
                      </h3>
                      <div className="aspect-square rounded-lg overflow-hidden border-4 border-birthday-periwinkle">
                        <img
                          src={gameData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
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
                  Puzzle Complete!
                </h3>
                <p className="text-gray-600 mb-6">
                  Amazing! You solved the puzzle in {moves} moves!
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
  );
}
