'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  HelpCircle,
  Trophy,
  Star,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { quizGames } from '@/data/quizGame';
import { celebrationConfetti } from '@/lib/utils';
import { useGameProgress } from '@/hooks/useGameProgress';
import { cn } from '@/lib/utils';

interface QuizGameProps {
  level: number;
}

export default function QuizGame({ level }: QuizGameProps) {
  const router = useRouter();
  const { completeLevel } = useGameProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const gameData = quizGames.find((g) => g.level === level);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const question = gameData.questions[currentQuestion];
  const totalQuestions = gameData.questions.length;
  const progress = ((currentQuestion) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = answerIndex === question.correctAnswer;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz complete
      setShowResult(true);
      const finalCorrect = correctAnswers + (selectedAnswer === question.correctAnswer ? 1 : 0);
      
      if (finalCorrect >= gameData.passingScore) {
        setIsGameComplete(true);
        completeLevel(level);
        celebrationConfetti();
        setTimeout(() => {
          router.push(`/riddle/${level}`);
        }, 3000);
      }
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setIsGameComplete(false);
    setShowResult(false);
  };

  const getOptionStyle = (index: number) => {
    if (!isAnswered) {
      return selectedAnswer === index 
        ? 'border-purple-500 bg-purple-50' 
        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50';
    }
    
    if (index === question.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    
    return 'border-gray-200 opacity-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="container mx-auto max-w-3xl">
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
          <Button
            variant="outline"
            onClick={resetGame}
            className="bg-white/80"
          >
            <RotateCcw className="mr-2" size={18} />
            Restart
          </Button>
        </div>

        {!showResult ? (
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-purple-200">
            <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <HelpCircle size={32} />
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {gameData.title}
                    </CardTitle>
                    <p className="text-purple-100 text-sm mt-1">
                      Level {level} - {gameData.description}
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-bold">{currentQuestion + 1}/{totalQuestions}</div>
                  <div className="text-xs text-purple-100">Question</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Score Display */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="font-bold text-green-700">{correctAnswers}</span>
                </div>
                <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                  <XCircle className="text-red-500" size={20} />
                  <span className="font-bold text-red-700">{wrongAnswers}</span>
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{question.emoji}</div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {question.question}
                    </h2>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        className={cn(
                          'p-4 rounded-xl border-2 text-left transition-all duration-200 relative',
                          getOptionStyle(index)
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                            isAnswered && index === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : isAnswered && index === selectedAnswer
                                ? 'bg-red-500 text-white'
                                : 'bg-purple-100 text-purple-700'
                          )}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium text-gray-800">{option}</span>
                        </div>
                        
                        {isAnswered && index === question.correctAnswer && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={24} />
                        )}
                        {isAnswered && index === selectedAnswer && index !== question.correctAnswer && (
                          <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={24} />
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {isAnswered && question.explanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          'mt-6 p-4 rounded-xl text-center',
                          selectedAnswer === question.correctAnswer
                            ? 'bg-green-50 border-2 border-green-200'
                            : 'bg-amber-50 border-2 border-amber-200'
                        )}
                      >
                        <p className={cn(
                          'font-medium',
                          selectedAnswer === question.correctAnswer
                            ? 'text-green-700'
                            : 'text-amber-700'
                        )}>
                          {selectedAnswer === question.correctAnswer ? '🎉 Benar! ' : '💡 '}
                          {question.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 flex justify-center"
                    >
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                      >
                        {currentQuestion < totalQuestions - 1 ? (
                          <>
                            Next Question
                            <ChevronRight className="ml-2" size={20} />
                          </>
                        ) : (
                          <>
                            See Results
                            <Trophy className="ml-2" size={20} />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        ) : (
          /* Results Screen */
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-purple-200">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {isGameComplete ? (
                  <>
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
                      🏆
                    </motion.div>
                    <h2 className="text-4xl font-bold text-purple-600 mb-4">
                      Congratulations!
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      Kamu berhasil menjawab {correctAnswers} dari {totalQuestions} pertanyaan dengan benar!
                    </p>
                    
                    {/* Stars */}
                    <div className="flex justify-center gap-2 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star
                            size={40}
                            className={cn(
                              i < Math.ceil((correctAnswers / totalQuestions) * 5)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            )}
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4 inline-block">
                      <p className="text-green-700 font-semibold">
                        ✨ Unlocking your riddle...
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-8xl mb-6">😢</div>
                    <h2 className="text-4xl font-bold text-gray-600 mb-4">
                      Almost There!
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      Kamu menjawab {correctAnswers} dari {totalQuestions} dengan benar.
                      <br />
                      Butuh minimal {gameData.passingScore} jawaban benar untuk lulus.
                    </p>
                    
                    <Button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                    >
                      <RotateCcw className="mr-2" size={20} />
                      Try Again
                    </Button>
                  </>
                )}
              </motion.div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
