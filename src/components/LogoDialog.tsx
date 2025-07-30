import React, { useEffect, useState } from 'react';
import { X, Star } from 'lucide-react';

interface LogoDialogProps {
  onClose: () => void;
}

export default function LogoDialog({ onClose }: LogoDialogProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg mx-4 text-center transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Animated Stars */}
        <div className="relative mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 text-yellow-400 fill-current animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl mx-auto animate-bounce">
            ME
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Welcome to My World! 🌟
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Thank you for visiting my portfolio! I'm Mohamed Emad, a passionate 15-year-old 
            frontend developer from Egypt. Every click, every interaction means the world to me 
            as I work towards my dream of becoming a professional engineer.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Fun Fact:</strong> Just like FC Barcelona's beautiful tiki-taka style, 
              I believe in creating elegant, flowing code that works seamlessly together! ⚽
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>🎯 Passionate Developer</span>
            <span>•</span>
            <span>⚽ Barça Fan</span>
            <span>•</span>
            <span>🚀 Big Dreams</span>
          </div>
        </div>

        {/* Auto-close timer */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-600 to-red-600 h-1 rounded-full transition-all duration-[5000ms] ease-linear"
              style={{ width: isVisible ? '0%' : '100%' }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This message will close automatically
          </p>
        </div>
      </div>
    </div>
  );
}