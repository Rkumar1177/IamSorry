import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

interface Question {
  id: number;
  text: string;
  subtext: string;
  image: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "I'm really sorry... 😔",
    subtext: "Will you forgive me?",
    image: "/sorry-bear.jpg"
  },
  {
    id: 2,
    text: "I know I messed up... 🥺",
    subtext: "Can we start over?",
    image: "/sorry-bear.jpg"
  },
  {
    id: 3,
    text: "You mean everything to me! 💕",
    subtext: "Please say yes?",
    image: "/celebration1.jpg"
  },
  {
    id: 4,
    text: "I promise to do better! 🤞",
    subtext: "Will you give me another chance?",
    image: "/celebration2.jpg"
  },
  {
    id: 5,
    text: "You're my everything! 🌟",
    subtext: "Please forgive me?",
    image: "/celebration1.jpg"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const funnyMessages = [
    "Nice try! 😏",
    "Too slow! 🏃‍♂️",
    "Catch me if you can! 😜",
    "Nope! Try again! 🙈",
    "Almost got me! 😎",
    "Keep trying! 💪",
    "Missed me! 😋",
    "Over here! 👈",
    "Not today! 🌟",
    "Try the other button! 💝"
  ];

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 50;
    
    const maxX = container.width - buttonWidth - 40;
    const maxY = container.height - buttonHeight - 100;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoClickCount(prev => prev + 1);
    
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setShowMessage(randomMessage);
    
    setTimeout(() => setShowMessage(""), 1500);
  }, []);

  const handleYesClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setNoClickCount(0);
      setNoButtonPosition({ x: 0, y: 0 });
    } else {
      setAccepted(true);
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
      });
    }, 250);
  };

  useEffect(() => {
    if (accepted) {
      const timer = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6b9d', '#feca57', '#ff9ff3', '#54a0ff']
        });
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [accepted]);

  if (accepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 flex items-center justify-center p-4 overflow-hidden">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            className="mb-6"
          >
            <PartyPopper className="w-24 h-24 mx-auto text-pink-600" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-pink-700 mb-4"
          >
            YAAAY! 🎉
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-purple-700 mb-6"
          >
            You forgave me! You're the best! 💕
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="relative"
          >
            <img 
              src="/celebration1.jpg" 
              alt="Happy couple" 
              className="w-64 h-64 mx-auto rounded-3xl shadow-2xl border-4 border-white"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Heart className="w-12 h-12 text-red-500 fill-red-500" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              className="absolute -bottom-4 -left-4"
            >
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex justify-center gap-2 flex-wrap"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              >
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-lg text-pink-600 font-medium"
          >
            I love you so much! ❤️
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800 
            }}
            animate={{ 
              y: -100,
              x: `+=${Math.sin(i) * 100}`
            }}
            transition={{ 
              duration: 8 + Math.random() * 4, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
          >
            <Heart 
              className={`text-pink-300 fill-pink-200 opacity-40`}
              style={{ width: 20 + Math.random() * 30 }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md w-full relative z-10"
        >
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= currentQuestion ? 'bg-pink-500' : 'bg-pink-200'
                }`}
                animate={i === currentQuestion ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Image */}
          <motion.div 
            className="mb-6 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img 
              src={currentQ.image} 
              alt="Sorry" 
              className="w-48 h-48 mx-auto rounded-3xl shadow-xl border-4 border-white object-cover"
            />
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Question text */}
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-pink-700 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentQ.text}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-purple-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentQ.subtext}
          </motion.p>

          {/* Funny message */}
          <AnimatePresence>
            {showMessage && (
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-pink-500 font-medium mb-4 text-lg"
              >
                {showMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex justify-center gap-4 items-center relative h-24">
            {/* Yes Button */}
            <motion.button
              onClick={handleYesClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              YES! 💕
            </motion.button>

            {/* No Button - Moves around! */}
            <motion.button
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
              animate={{ 
                x: noButtonPosition.x, 
                y: noButtonPosition.y 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-gray-400 text-white font-bold rounded-full shadow-lg cursor-not-allowed absolute"
              style={{ position: 'relative' }}
            >
              No 😢
            </motion.button>
          </div>

          {/* Attempt counter */}
          {noClickCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-pink-400"
            >
              No button escaped {noClickCount} time{noClickCount !== 1 ? 's' : ''}! 😅
            </motion.p>
          )}

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm text-purple-400"
          >
            Psst... try clicking the pink button! 💝
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
