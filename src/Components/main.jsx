import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Stars,
  Gift,
  Music,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

const noMessages = [
  "No",
  "Are you sure?",
  "Really?",
  "Think again!",
  "Please?",
  "Don't do this!",
  "Give me a chance!",
  "I'll be sad...",
  "Pretty please?",
  "😢",
  "💔",
  "🥺",
];

const loveMessages = [
  "You're amazing! ❤️",
  "You're perfect babe!😊",
  "You're my sunshine ☀️",
  "My only sunshine! ",
  "Together forever 💑",
  "You're my perfect match 💖",
  "My heart beats for you 💓",
];

const ValentinePage = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (yesPressed) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % loveMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [yesPressed]);

  const handleYesClick = () => {
    setYesPressed(true);
    setShowConfetti(true);
    // Start playing music
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const yesButtonSize = Math.min(100 + noCount * 20, 300);
  const noButtonSize = Math.max(150 - noCount * 15, 15);
  const shouldShowNo = noButtonSize > 14;
  const noButtonFontSize = Math.max(20 - noCount * 1.2, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        src="https://dl.dropboxusercontent.com/s/e93f5kxsmtankf3/Best-Happy-Background-Music-For-Videos.mp3"
      />

      {/* Sound control button - only show when music is playing */}
      {yesPressed && (
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isMuted ? (
            <VolumeX size={24} className="text-red-500" />
          ) : (
            <Volume2 size={24} className="text-red-500" />
          )}
        </button>
      )}

      {!yesPressed ? (
        <div className="text-center relative">
          <div className="mb-8 animate-bounce">
            <Heart
              size={64}
              className="text-red-500 mx-auto transform hover:scale-125 transition-transform duration-300"
              fill="currentColor"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && (
              <Sparkles
                size={24}
                className="text-yellow-400 absolute top-0 right-1/2 animate-spin"
              />
            )}
          </div>

          <h1 className="text-5xl font-bold text-red-600 mb-8 animate-pulse">
            Will you be my Valentine? 💖
          </h1>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleYesClick}
              style={{ width: `${yesButtonSize}px` }}
              className="flex items-center justify-center bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 
                       text-white font-bold py-4 px-20 rounded-full transition-all duration-300 
                        shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Yes! 😊
            </button>

            {shouldShowNo && (
              <button
                onClick={() => setNoCount(noCount + 1)}
                style={{
                  width: `${noButtonSize}px`,
                  fontSize: `${noButtonFontSize}px`,
                  opacity: Math.max(1 - noCount * 0.1, 0.5),
                }}
                className="flex justify-center text-black bg-gray-400 hover:bg-gray-500 font-bold py-2 px-4 
                         rounded-full transition-all duration-300 transform hover:scale-95"
              >
                {noMessages[Math.min(noCount, noMessages.length - 1)]}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center animate-fadeIn">
          <div className="mb-8 relative">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inline-block">
                <Heart
                  size={48}
                  className="text-red-500 mx-2 animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    transform: `rotate(${i * 30}deg)`,
                  }}
                  fill="currentColor"
                />
                <Stars
                  size={24}
                  className="text-yellow-400 absolute animate-ping"
                  style={{
                    top: `${Math.sin(i) * 30}px`,
                    left: `${50 + i * 60}px`,
                  }}
                />
              </div>
            ))}
          </div>

          <h1 className="text-5xl font-bold text-red-600 mb-6 animate-bounce">
            Yaaay! I'm so happy! 🎉
          </h1>

          <div className="text-2xl text-red-500 mb-8 transition-all duration-500 transform hover:scale-110">
            {loveMessages[currentMessage]}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Gift size={32} className="text-red-500 animate-bounce" />
            <Music size={32} className="text-red-500 animate-pulse" />
            <Sparkles size={32} className="text-red-500 animate-spin" />
          </div>
        </div>
      )}

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3,
            }}
          >
            {i % 2 === 0 ? (
              <Heart size={24} className="text-red-300" fill="currentColor" />
            ) : (
              <Stars size={16} className="text-yellow-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValentinePage;
