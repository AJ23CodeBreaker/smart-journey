import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getGameSessionQuestions } from '../services/geminiService';
import { QuizQuestion, Level } from '../types';
import { useNavigate } from 'react-router-dom';

const QUESTIONS_PER_SESSION = 10;

export const Game = () => {
  const { user, updateXP } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Game Session State
  const [sessionStatus, setSessionStatus] = useState<'intro' | 'playing' | 'summary'>('intro');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);

  // Question State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!user) return <div className="text-center mt-10 dark:text-white">Please login to play.</div>;

  const startSession = () => {
    // Fetch 10 random questions from static pool
    const qs = getGameSessionQuestions(user.level, QUESTIONS_PER_SESSION);
    setQuestions(qs);
    setSessionStatus('playing');
    setCurrentQuestionIndex(0);
    setSessionScore(0);
    setSessionXP(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentQuestionIndex];
    if (index === currentQ.correctIndex) {
      // Award XP
      const xpPerQuestion = user.level === Level.BRONZE ? 10 : user.level === Level.SILVER ? 20 : 30;
      setSessionScore(prev => prev + 1);
      setSessionXP(prev => prev + xpPerQuestion);
      updateXP(xpPerQuestion);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setSessionStatus('summary');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  // Helper for graphics
  const getLevelGraphic = (lvl: Level) => {
    switch (lvl) {
      case Level.BRONZE:
        return {
          bg: "bg-gradient-to-br from-amber-600 via-amber-700 to-orange-900",
          icon: "🥉",
        };
      case Level.SILVER:
        return {
          bg: "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700",
          icon: "🥈",
        };
      case Level.GOLD:
        return {
          bg: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-700",
          icon: "🥇",
        };
      default:
        return {
          bg: "bg-slate-700",
          icon: "❓",
        };
    }
  };

  // --- RENDER: INTRO SCREEN ---
  if (sessionStatus === 'intro') {
    return (
      <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden text-center border border-slate-200 dark:border-slate-700">
          <div className="bg-gradient-to-r from-brand-600 to-brand-800 p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h1 className="text-5xl font-black text-white mb-4 relative z-10 tracking-tight">{t('play')}</h1>
            <p className="text-brand-100 text-xl font-light relative z-10">{t('tagline')}</p>
          </div>
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">{t(user.level.toLowerCase() as any)}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Difficulty</div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">{QUESTIONS_PER_SESSION}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Questions</div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">XP</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest">Reward</div>
              </div>
            </div>
            
            <button 
              onClick={startSession}
              className="w-full max-w-sm mx-auto bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold py-4 rounded-full shadow-lg shadow-brand-500/30 transform transition-all hover:scale-105 active:scale-95"
            >
              {t('generateQuestion')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: SUMMARY SCREEN ---
  if (sessionStatus === 'summary') {
    return (
      <div className="max-w-xl mx-auto mt-12 animate-fade-in">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 text-center space-y-8 border border-slate-200 dark:border-slate-700">
          <div className="text-8xl animate-bounce-slow">
            {sessionScore >= 8 ? '🏆' : sessionScore >= 5 ? '👍' : '📚'}
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">Session Complete!</h2>
          
          <div className="flex flex-col gap-2 text-slate-600 dark:text-slate-400 text-lg">
            <span>You correctly answered</span>
            <span className="text-4xl font-black text-brand-600 dark:text-brand-400">{sessionScore} <span className="text-xl text-slate-400">/ {QUESTIONS_PER_SESSION}</span></span>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 p-6 rounded-2xl">
            <div className="text-sm text-yellow-800 dark:text-yellow-400 uppercase font-bold tracking-widest mb-2">Total XP Earned</div>
            <div className="text-5xl font-black text-yellow-600 dark:text-yellow-400">+{sessionXP}</div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition"
            >
              {t('dashboard')}
            </button>
            <button 
              onClick={startSession}
              className="flex-1 bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  // Get localized content based on current language
  const localizedContent = currentQ.content[language];
  const graphicStyle = getLevelGraphic(currentQ.difficulty);

  // --- RENDER: PLAYING SCREEN ---
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      
      {/* Top Info Bar */}
      <div className="flex justify-between items-center mb-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-4 w-1/2">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-500 transition-all duration-500 ease-out" 
              style={{ width: `${((currentQuestionIndex) / QUESTIONS_PER_SESSION) * 100}%` }}
            ></div>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-slate-500 dark:text-slate-400">
            {currentQuestionIndex + 1} / {QUESTIONS_PER_SESSION}
          </span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</span>
           <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{sessionScore}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
        
        {/* Left Column: Unique Graphics */}
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl group ${graphicStyle.bg}`}>
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            
            {/* Main Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-[12rem] filter drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700 select-none cursor-default">
                    {graphicStyle.icon}
                 </div>
            </div>

            {/* Category Label */}
            <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm">
                {localizedContent.category}
                </span>
            </div>
            
            {/* Overlay Feedback on Image (Desktop) */}
            {isAnswered && (
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-20 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${selectedOption === currentQ.correctIndex ? 'bg-green-500' : 'bg-red-500'}`}>
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {selectedOption === currentQ.correctIndex 
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                            }
                        </svg>
                    </div>
                    <h4 className="font-bold text-xl">
                        {selectedOption === currentQ.correctIndex ? t('correct') : t('incorrect')}
                    </h4>
                </div>
                <p className="text-slate-200 leading-relaxed font-light text-lg">
                    {localizedContent.explanation}
                </p>
                </div>
            )}
        </div>

        {/* Right Column: Question & Interaction */}
        <div className="flex flex-col h-full">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 flex flex-col h-full justify-between">
            <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 leading-snug">
                {localizedContent.question}
                </h3>

                <div className="space-y-4">
                {localizedContent.options.map((option, idx) => {
                    let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ";
                    
                    if (!isAnswered) {
                        btnClass += "border-slate-100 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-md cursor-pointer bg-white dark:bg-slate-800 dark:hover:bg-slate-750";
                    } else {
                        if (idx === currentQ.correctIndex) {
                            btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
                        } else if (idx === selectedOption) {
                            btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
                        } else {
                            btnClass += "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 opacity-50";
                        }
                    }

                    return (
                    <button 
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        className={btnClass}
                        disabled={isAnswered}
                    >
                        <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                        isAnswered && idx === currentQ.correctIndex ? 'bg-green-500 text-white' : 
                        isAnswered && idx === selectedOption ? 'bg-red-500 text-white' : 
                        'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 group-hover:bg-brand-500 group-hover:text-white'
                        }`}>
                        {String.fromCharCode(65 + idx)}
                        </span>
                        <span className={`font-medium ${!isAnswered ? 'text-slate-700 dark:text-slate-200' : ''}`}>{option}</span>
                    </button>
                    );
                })}
                </div>
            </div>

            {isAnswered && (
                <button 
                onClick={handleNext}
                className="mt-6 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-lg"
                >
                {currentQuestionIndex + 1 === QUESTIONS_PER_SESSION ? t('dashboard') : t('next')}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};