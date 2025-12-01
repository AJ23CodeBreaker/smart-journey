import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { QUESTIONS } from '../data/questions';
import { Level, QuizQuestion } from '../types';

export const Quiz = () => {
  const { level } = useParams<{ level: string }>();
  const { user, addCertificate } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const targetLevel = (level as Level) || Level.BRONZE;
    // Filter questions by level and randomize
    const pool = QUESTIONS.filter(q => q.difficulty === targetLevel);
    // Shuffle
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 20); // 20 Questions
    setQuestions(shuffled);
  }, [level]);

  const handleAnswer = (optionIdx: number) => {
    if (questions[currentIdx].correctIndex === optionIdx) {
      setScore(s => s + 1);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      finishQuiz(score + (questions[currentIdx].correctIndex === optionIdx ? 1 : 0));
    }
  };

  const finishQuiz = (finalScore: number) => {
    setFinished(true);
    const isPassed = finalScore >= 15; // 75% pass mark
    setPassed(isPassed);
    if (isPassed && level) {
      addCertificate({
        id: Date.now().toString(),
        level: level as Level,
        dateEarned: new Date().toLocaleDateString()
      });
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (finished) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl animate-fade-in border-2 border-slate-100 dark:border-slate-700">
        <div className="text-6xl mb-4">{passed ? '🎓' : '📚'}</div>
        <h1 className="text-3xl font-black mb-2 dark:text-white">{passed ? 'Certified!' : 'Keep Studying'}</h1>
        <p className="text-slate-500 mb-6">You scored {score} / 20</p>
        
        {passed ? (
           <button onClick={() => navigate('/profile')} className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold mb-4 hover:bg-brand-700 transition">View Certificate</button>
        ) : (
           <button onClick={() => window.location.reload()} className="w-full bg-slate-200 text-slate-800 py-3 rounded-xl font-bold mb-4 hover:bg-slate-300 transition">Try Again</button>
        )}
        <button onClick={() => navigate('/dashboard')} className="text-slate-500 hover:text-brand-500">Back to Dashboard</button>
      </div>
    );
  }

  const q = questions[currentIdx];
  const content = q.content[language];

  // Helper to determine graphic style based on difficulty
  const getLevelGraphic = (lvl: Level) => {
    switch (lvl) {
      case Level.BRONZE:
        return {
          bg: "bg-gradient-to-br from-amber-600 via-amber-700 to-orange-900",
          icon: "🥉",
          border: "border-amber-500"
        };
      case Level.SILVER:
        return {
          bg: "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-700",
          icon: "🥈",
          border: "border-slate-400"
        };
      case Level.GOLD:
        return {
          bg: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-700",
          icon: "🥇",
          border: "border-yellow-400"
        };
      default:
        return {
          bg: "bg-slate-500",
          icon: "❓",
          border: "border-slate-500"
        };
    }
  };

  const graphicStyle = getLevelGraphic(q.difficulty);

  return (
    <div className="max-w-3xl mx-auto mt-10 animate-fade-in px-4">
       <div className="mb-6 flex justify-between text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">
          <span>Question {currentIdx + 1} / 20</span>
          <span>{level} Assessment</span>
       </div>

       <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          
          {/* Unique Graphic Header */}
          <div className={`w-full h-56 ${graphicStyle.bg} relative flex items-center justify-center overflow-hidden border-b-4 ${graphicStyle.border}`}>
             {/* Pattern Overlay */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
             
             {/* Shine Effect */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-white/10 pointer-events-none"></div>

             {/* Large Icon */}
             <div className="text-9xl filter drop-shadow-2xl transform hover:scale-110 transition-transform duration-700 cursor-default select-none relative z-10">
                {graphicStyle.icon}
             </div>

             {/* Category Tag */}
             <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                <span className="text-xs font-bold text-white uppercase tracking-widest">{content.category}</span>
             </div>
          </div>

          <div className="p-8">
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
               {content.question}
             </h2>
             <div className="grid gap-4">
                {content.options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className="text-left p-4 md:p-5 rounded-xl border-2 border-slate-100 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-slate-700/50 transition-all duration-200 font-medium text-slate-700 dark:text-slate-200 group flex items-start gap-4"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-colors text-sm">
                      {String.fromCharCode(65+i)}
                    </span>
                    <span className="mt-1 leading-snug">{opt}</span>
                  </button>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};