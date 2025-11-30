'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RotateCcw, Eye, EyeOff, Puzzle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jigsawPuzzles } from '@/data/jigsawPuzzle';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface JigsawPuzzleProps {
  level: number;
}

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number | null; // null means in tray
}

export default function JigsawPuzzle({ level }: JigsawPuzzleProps) {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [placedCount, setPlacedCount] = useState(0);

  const gameData = jigsawPuzzles.find((g) => g.level === level);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const gridSize = gameData.gridSize;
  const totalPieces = gridSize * gridSize;

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: null,
    }));

    // Shuffle the pieces array for the tray
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }

    setPieces(newPieces);
    setIsComplete(false);
    setPlacedCount(0);
  };

  const handleDragStart = (pieceId: number) => {
    setDraggedPiece(pieceId);
  };

  const handleDragEnd = () => {
    setDraggedPiece(null);
  };

  const handleDrop = (targetPosition: number) => {
    if (draggedPiece === null) return;

    const pieceIndex = pieces.findIndex((p) => p.id === draggedPiece);
    if (pieceIndex === -1) return;

    // Check if target position is already occupied
    const isOccupied = pieces.some((p) => p.currentPosition === targetPosition);
    if (isOccupied) return;

    const newPieces = [...pieces];
    const wasInTray = newPieces[pieceIndex].currentPosition === null;
    newPieces[pieceIndex].currentPosition = targetPosition;

    setPieces(newPieces);

    // Update placed count
    const newPlacedCount = newPieces.filter((p) => p.currentPosition !== null).length;
    setPlacedCount(newPlacedCount);

    // Check completion
    checkCompletion(newPieces);
    setDraggedPiece(null);
  };

  const handleReturnToTray = (pieceId: number) => {
    const pieceIndex = pieces.findIndex((p) => p.id === pieceId);
    if (pieceIndex === -1) return;

    const newPieces = [...pieces];
    newPieces[pieceIndex].currentPosition = null;
    setPieces(newPieces);

    const newPlacedCount = newPieces.filter((p) => p.currentPosition !== null).length;
    setPlacedCount(newPlacedCount);
  };

  const checkCompletion = (currentPieces: PuzzlePiece[]) => {
    const allCorrect = currentPieces.every(
      (piece) => piece.currentPosition === piece.correctPosition
    );

    if (allCorrect) {
      setIsComplete(true);
      completeLevel(level);
      celebrationConfetti();
      setTimeout(() => {
        router.push(`/riddle/${level}`);
      }, 2500);
    }
  };

  const getPieceBackgroundPosition = (pieceId: number) => {
    const row = Math.floor(pieceId / gridSize);
    const col = pieceId % gridSize;
    const xPercent = (col / (gridSize - 1)) * 100;
    const yPercent = (row / (gridSize - 1)) * 100;
    return `${xPercent}% ${yPercent}%`;
  };

  const isPieceCorrect = (piece: PuzzlePiece) => {
    return piece.currentPosition === piece.correctPosition;
  };

  const trayPieces = pieces.filter((p) => p.currentPosition === null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="hover:bg-white/60"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              size="sm"
              className="bg-white/80"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2" size={16} />
                  Hide Hint
                </>
              ) : (
                <>
                  <Eye className="mr-2" size={16} />
                  Show Hint
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={initializePuzzle}
              className="bg-white/80"
            >
              <RotateCcw className="mr-2" size={18} />
              Restart
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Puzzle size={32} />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {gameData.title}
                  </CardTitle>
                  <p className="text-purple-100 text-sm mt-1">
                    Level {level} - {gameData.description}
                  </p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-2xl font-bold text-center">{placedCount}/{totalPieces}</div>
                <div className="text-xs text-purple-100">Pieces Placed</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {!isComplete ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                {/* Puzzle Board */}
                <div>
                  <h3 className="text-center font-semibold text-gray-700 mb-3 flex items-center justify-center gap-2">
                    <Puzzle size={18} />
                    Puzzle Board
                  </h3>
                  
                  {/* Preview overlay */}
                  <div className="relative">
                    {showPreview && (
                      <div className="absolute inset-0 z-10 rounded-xl overflow-hidden opacity-30 pointer-events-none">
                        <img
                          src={gameData.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border-4 border-purple-300 shadow-inner"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                        gap: '4px',
                        padding: '4px',
                      }}
                    >
                      {Array.from({ length: totalPieces }).map((_, position) => {
                        const placedPiece = pieces.find((p) => p.currentPosition === position);
                        const isCorrect = placedPiece && isPieceCorrect(placedPiece);

                        return (
                          <div
                            key={position}
                            className={cn(
                              'relative rounded-lg transition-all duration-200',
                              !placedPiece && 'bg-white/50 border-2 border-dashed border-purple-300',
                              draggedPiece !== null && !placedPiece && 'border-purple-500 bg-purple-100/50 scale-105'
                            )}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('scale-105');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('scale-105');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('scale-105');
                              handleDrop(position);
                            }}
                          >
                            {placedPiece ? (
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={cn(
                                  'w-full h-full rounded-lg cursor-grab active:cursor-grabbing relative overflow-hidden',
                                  isCorrect && 'ring-4 ring-green-400 ring-offset-2'
                                )}
                                draggable
                                onDragStart={() => handleDragStart(placedPiece.id)}
                                onDragEnd={handleDragEnd}
                                onDoubleClick={() => handleReturnToTray(placedPiece.id)}
                              >
                                <div
                                  className="w-full h-full"
                                  style={{
                                    backgroundImage: `url(${gameData.imageUrl})`,
                                    backgroundSize: `${gridSize * 100}%`,
                                    backgroundPosition: getPieceBackgroundPosition(placedPiece.id),
                                  }}
                                />
                                {isCorrect && (
                                  <div className="absolute top-1 right-1">
                                    <CheckCircle className="text-green-500 bg-white rounded-full" size={20} />
                                  </div>
                                )}
                              </motion.div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-purple-300">
                                <span className="text-2xl font-bold opacity-30">{position + 1}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-sm text-purple-800">
                      <strong>How to play:</strong> Drag pieces from the tray to the puzzle board. 
                      Double-click a placed piece to return it to the tray. 
                      Green checkmarks show correctly placed pieces!
                    </p>
                  </div>
                </div>

                {/* Piece Tray */}
                <div>
                  <h3 className="text-center font-semibold text-gray-700 mb-3">
                    Puzzle Pieces ({trayPieces.length} left)
                  </h3>
                  <div 
                    className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-4 border-purple-200 min-h-[400px]"
                  >
                    <div className="grid grid-cols-3 gap-2">
                      <AnimatePresence>
                        {trayPieces.map((piece) => (
                          <motion.div
                            key={piece.id}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 20 }}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              'aspect-square rounded-lg cursor-grab active:cursor-grabbing shadow-lg border-2 border-white overflow-hidden',
                              draggedPiece === piece.id && 'opacity-50'
                            )}
                            draggable
                            onDragStart={() => handleDragStart(piece.id)}
                            onDragEnd={handleDragEnd}
                          >
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: `url(${gameData.imageUrl})`,
                                backgroundSize: `${gridSize * 100}%`,
                                backgroundPosition: getPieceBackgroundPosition(piece.id),
                              }}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {trayPieces.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-[300px] text-purple-400">
                        <CheckCircle size={48} className="mb-2" />
                        <p className="text-sm">All pieces placed!</p>
                        <p className="text-xs mt-1">Check if they&apos;re in the right spots</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>
                <h3 className="text-4xl font-bold text-purple-600 mb-4">
                  Puzzle Complete!
                </h3>
                <p className="text-xl text-gray-600 mb-6">
                  Amazing work! You assembled the entire picture!
                </p>
                
                {/* Show completed image */}
                <div className="max-w-md mx-auto mb-6 rounded-xl overflow-hidden shadow-2xl border-4 border-purple-400">
                  <img
                    src={gameData.imageUrl}
                    alt="Completed Puzzle"
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 inline-block">
                  <p className="text-green-700 font-semibold">
                    ✨ Unlocking your riddle...
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
