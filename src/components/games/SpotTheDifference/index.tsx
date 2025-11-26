'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Search, Lightbulb, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { spotTheDifferenceGames, Difference } from '@/data/spotTheDifference';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';

interface SpotTheDifferenceProps {
  level: number;
}

export default function SpotTheDifference({ level }: SpotTheDifferenceProps) {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [foundDifferences, setFoundDifferences] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [wrongClickPosition, setWrongClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [devMode, setDevMode] = useState(false); // Developer mode to show coordinates
  const imageRef = useRef<HTMLDivElement>(null);

  const gameData = spotTheDifferenceGames.find((g) => g.level === level);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isGameComplete) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Developer mode: log coordinates
    if (devMode) {
      console.log(`📍 Clicked coordinates: x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
      console.log(`Copy this format: { id: 'diff-X', x: ${x.toFixed(1)}, y: ${y.toFixed(1)}, radius: 10, hint: 'Your hint here' }`);
      return; // Don't check for differences in dev mode
    }

    // Check if click is near any unfound difference
    const clickedDifference = gameData.differences.find((diff) => {
      if (foundDifferences.includes(diff.id)) return false;

      const distance = Math.sqrt(
        Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2)
      );
      return distance <= diff.radius;
    });

    if (clickedDifference) {
      // Found a difference!
      const newFoundDifferences = [...foundDifferences, clickedDifference.id];
      setFoundDifferences(newFoundDifferences);

      // Check if all differences are found
      if (newFoundDifferences.length === gameData.differences.length) {
        setIsGameComplete(true);
        completeLevel(level);
        celebrationConfetti();
        setTimeout(() => {
          router.push(`/riddle/${level}`);
        }, 2000);
      }
    } else {
      // Wrong click
      setWrongClicks((prev) => prev + 1);
      setWrongClickPosition({ x, y });
      setTimeout(() => setWrongClickPosition(null), 1000);
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  const resetGame = () => {
    setFoundDifferences([]);
    setWrongClicks(0);
    setWrongClickPosition(null);
    setIsGameComplete(false);
    setShowHint(false);
  };

  const renderDifferenceMarkers = () => {
    return foundDifferences.map((diffId) => {
      const diff = gameData.differences.find((d) => d.id === diffId);
      if (!diff) return null;

      return (
        <motion.div
          key={diffId}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute pointer-events-none"
          style={{
            left: `${diff.x}%`,
            top: `${diff.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-500 rounded-full bg-green-500/20 animate-pulse" />
            <CheckCircle
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
              size={24}
            />
          </div>
        </motion.div>
      );
    });
  };

  const renderWrongClickMarker = () => {
    if (!wrongClickPosition) return null;

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute pointer-events-none"
        style={{
          left: `${wrongClickPosition.x}%`,
          top: `${wrongClickPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <XCircle className="text-red-500" size={32} />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-lavender via-white to-birthday-lightBlue p-4">
      <div className="container mx-auto max-w-6xl">
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
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-3">
                  <Search size={32} />
                </div>
                <div>
                  <CardTitle className="text-2xl font-heading">
                    Spot the Difference
                  </CardTitle>
                  <p className="text-birthday-lavender text-sm mt-1">
                    Level {level} • Find all {gameData.differences.length} differences
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {foundDifferences.length}/{gameData.differences.length}
                </div>
                <div className="text-xs text-birthday-lavender">Found</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {!isGameComplete ? (
              <>
                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    🔍 Click on the differences you find between the two images. Find all {gameData.differences.length} differences to unlock the riddle!
                  </p>
                </div>

                {/* Developer Mode Toggle */}
                <div className="mb-6">
                  <Button
                    onClick={() => setDevMode(!devMode)}
                    variant={devMode ? "default" : "outline"}
                    size="sm"
                    className={devMode ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {devMode ? "🔧 Dev Mode ON (check console)" : "🔧 Enable Dev Mode"}
                  </Button>
                  {devMode && (
                    <p className="text-xs text-purple-600 mt-2">
                      📍 Click on the images to get coordinates in the browser console (F12)
                    </p>
                  )}
                </div>

                {/* Game Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Original Image */}
                  <div>
                    <h3 className="text-center font-semibold text-gray-700 mb-2">
                      Original Image
                    </h3>
                    <div
                      ref={imageRef}
                      className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-crosshair border-4 border-birthday-periwinkle"
                      onClick={handleImageClick}
                    >
                      <img
                        src={gameData.originalImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      {renderDifferenceMarkers()}
                      <AnimatePresence>
                        {renderWrongClickMarker()}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Modified Image */}
                  <div>
                    <h3 className="text-center font-semibold text-gray-700 mb-2">
                      Modified Image
                    </h3>
                    <div
                      className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden cursor-crosshair border-4 border-birthday-periwinkle"
                      onClick={handleImageClick}
                    >
                      <img
                        src={gameData.modifiedImage}
                        alt="Modified"
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                      {renderDifferenceMarkers()}
                      <AnimatePresence>
                        {renderWrongClickMarker()}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Wrong Clicks:</span>{' '}
                      <span className="font-semibold text-red-600">{wrongClicks}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Remaining:</span>{' '}
                      <span className="font-semibold text-birthday-deepBlue">
                        {gameData.differences.length - foundDifferences.length}
                      </span>
                    </div>
                  </div>

                  {/* Hint Button */}
                  {!showHint && foundDifferences.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(true)}
                      className="border-birthday-skyBlue text-birthday-deepBlue"
                    >
                      <Lightbulb className="mr-2" size={16} />
                      Need a Hint?
                    </Button>
                  )}
                </div>

                {/* Hint Display */}
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-2">
                        <Lightbulb className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="text-sm font-medium text-yellow-800 mb-2">
                            Hints for remaining differences:
                          </p>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            {gameData.differences
                              .filter((diff) => !foundDifferences.includes(diff.id))
                              .map((diff) => (
                                <li key={diff.id}>• {diff.hint}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold font-heading text-birthday-deepBlue mb-4">
                  All Differences Found!
                </h3>
                <p className="text-gray-600 mb-6">
                  Great job! You found all {gameData.differences.length} differences!
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
