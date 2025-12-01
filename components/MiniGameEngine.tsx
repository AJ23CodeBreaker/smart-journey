import React, { useState } from 'react';
import { GAMES } from '../data/games';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  moduleId: string;
  onClose: () => void;
}

export const MiniGameEngine = ({ moduleId, onClose }: Props) => {
  const { language, t } = useLanguage();
  const { updateXP } = useAuth();
  
  const game = GAMES[moduleId];
  const [currentStepId, setCurrentStepId] = useState('s1');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [stepCount, setStepCount] = useState(1);

  if (!game) return <div className="text-white p-4">Game not found for module {moduleId}</div>;

  const currentStep = game.steps[currentStepId];

  const handleChoice = (nextId: string, feedbackText: string, points: number) => {
    setFeedback(feedbackText);
    setScore(s => s + points);

    // Short delay to show feedback before moving
    setTimeout(() => {
      setFeedback(null);
      if (nextId === 'win' || nextId === 'lose') {
        setGameOver(true);
        setCurrentStepId(nextId);
        if (score + points > 0) updateXP(100); // Higher XP for longer games
      } else {
        setCurrentStepId(nextId);
        setStepCount(prev => prev + 1);
      }
    }, 2000);
  };

  const progressPercent = Math.min(100, (stepCount / game.totalSteps) * 100);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-slate-700 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-brand-600 p-4 flex justify-between items-center text-white shrink-0">
           <h2 className="text-lg font-black flex items-center gap-2">
             <span>🎮</span> {game.title[language]}
           </h2>
           <button onClick={onClose} className="hover:bg-brand-700 p-2 rounded-full transition">✕</button>
        </div>

        {/* Progress Bar */}
        {!gameOver && (
          <div className="bg-slate-200 dark:bg-slate-700 h-2 w-full">
            <div 
              className="bg-green-500 h-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8 text-center flex-1 flex flex-col justify-center overflow-y-auto">
           
           {feedback ? (
             <div className="animate-bounce-slow text-xl md:text-2xl font-bold text-brand-600 dark:text-brand-400 px-4">
               {feedback}
             </div>
           ) : (
             <>
                {currentStepId === 's1' && !gameOver && (
                  <p className="text-slate-500 dark:text-slate-400 mb-6 italic text-sm md:text-base border-b border-slate-100 dark:border-slate-800 pb-4">{game.intro[language]}</p>
                )}

                <div className="text-6xl md:text-7xl mb-6 transform transition hover:scale-110 duration-300">
                  {currentStep?.image || (gameOver ? (score > 0 ? '🏆' : '💀') : '🤔')}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-8 leading-snug">
                  {currentStep?.text[language] || "End of Game"}
                </h3>

                {!gameOver && currentStep && (
                  <div className="grid gap-3 w-full max-w-md mx-auto">
                    {currentStep.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChoice(choice.nextStepId, choice.feedback[language], choice.scoreDelta)}
                        className="bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-900/30 text-slate-800 dark:text-white py-4 px-6 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 transition transform hover:-translate-y-1 shadow-sm text-left flex justify-between items-center group"
                      >
                        <span>{choice.text[language]}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">➜</span>
                      </button>
                    ))}
                  </div>
                )}

                {gameOver && (
                  <div className="space-y-6">
                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Final Score</div>
                      <div className={`text-5xl font-black ${score > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {score}
                      </div>
                      <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {score > 0 ? "Well done! You made profitable decisions." : "Ouch! Your finances took a hit."}
                      </p>
                    </div>
                    
                    <button 
                      onClick={onClose}
                      className="w-full bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition shadow-lg text-lg"
                    >
                      {t('dashboard')}
                    </button>
                  </div>
                )}
             </>
           )}
        </div>
        
        {/* Footer info */}
        {!gameOver && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
            Decision {stepCount} of {game.totalSteps}
          </div>
        )}
      </div>
    </div>
  );
};