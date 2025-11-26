'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { hiddenObjectsGames, HiddenObject } from '@/data/hiddenObjects';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface HiddenObjectsProps {
  level: number;
}

export default function HiddenObjects({ level }: HiddenObjectsProps) {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [wrongClickPosition, setWrongClickPosition] = useState<{ x: number; y: number } | null>(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const gameData = hiddenObjectsGames.find((g) => g.level === level);

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
      console.log(`Copy this format: { id: 'obj-X', name: 'Object Name', x: ${x.toFixed(1)}, y: ${y.toFixed(1)}, radius: 8, emoji: '🎈' }`);
      return;
    }

    // Check if click is near any unfound object
    const clickedObject = gameData.objects.find((obj) => {
      if (foundObjects.includes(obj.id)) return false;

      const distance = Math.sqrt(
        Math.pow(x - obj.x, 2) + Math.pow(y - obj.y, 2)
      );
      return distance <= obj.radius;
    });

    if (clickedObject) {
      // Found an object!
      const newFoundObjects = [...foundObjects, clickedObject.id];
      setFoundObjects(newFoundObjects);

      // Check if all objects are found
      if (newFoundObjects.length === gameData.objects.length) {
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
    setFoundObjects([]);
    setWrongClicks(0);
    setWrongClickPosition(null);
    setIsGameComplete(false);
    setDevMode(false);
  };

  const renderFoundMarkers = () => {
    return foundObjects.map((objId) => {
      const obj = gameData.objects.find((o) => o.id === objId);
      if (!obj) return null;

      return (
        <motion.div
          key={objId}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute pointer-events-none"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            <div className="w-12 h-12 border-3 border-green-500 rounded-full bg-green-500/20 animate-pulse" />
            <CheckCircle
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
              size={20}
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
      <div className="container mx-auto max-w-7xl">
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Objects List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-4">
              <CardHeader className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue text-white">
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  <Eye size={20} />
                  Find These Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {gameData.objects.map((obj) => (
                    <motion.div
                      key={obj.id}
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: foundObjects.includes(obj.id) ? 1 : 0.5,
                        scale: foundObjects.includes(obj.id) ? 1 : 0.95,
                      }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border-2 transition-all',
                        foundObjects.includes(obj.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 bg-white'
                      )}
                    >
                      <div className="text-2xl">{obj.emoji}</div>
                      <div className="flex-1">
                        <p
                          className={cn(
                            'font-medium text-sm',
                            foundObjects.includes(obj.id)
                              ? 'text-green-700 line-through'
                              : 'text-gray-700'
                          )}
                        >
                          {obj.name}
                        </p>
                      </div>
                      {foundObjects.includes(obj.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-bold text-birthday-deepBlue">
                      {foundObjects.length}/{gameData.objects.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-birthday-deepBlue to-birthday-skyBlue h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(foundObjects.length / gameData.objects.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wrong Clicks:</span>
                    <span className="font-semibold text-red-600">{wrongClicks}</span>
                  </div>
                </div>

                {/* Dev Mode Toggle */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => setDevMode(!devMode)}
                    variant={devMode ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full",
                      devMode && "bg-purple-600 hover:bg-purple-700"
                    )}
                  >
                    {devMode ? "🔧 Dev Mode ON" : "🔧 Dev Mode"}
                  </Button>
                  {devMode && (
                    <p className="text-xs text-purple-600 mt-2 text-center">
                      Check console (F12)
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Scene */}
          <div className="lg:col-span-3">
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
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {!isGameComplete ? (
                  <>
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        👁️ Click on the items in the scene as you find them. Find all {gameData.objects.length} items to unlock the riddle!
                      </p>
                    </div>

                    {/* Game Scene */}
                    <div
                      ref={imageRef}
                      className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-crosshair border-4 border-birthday-periwinkle"
                      onClick={handleImageClick}
                    >
                      <img
                        src={gameData.sceneImage}
                        alt="Hidden Objects Scene"
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                      {renderFoundMarkers()}
                      <AnimatePresence>
                        {renderWrongClickMarker()}
                      </AnimatePresence>
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
                      All Objects Found!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Amazing! You found all {gameData.objects.length} hidden objects!
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
