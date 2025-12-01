import React, { useState } from 'react';
import { MODULES } from '../data/modules';
import { useLanguage } from '../contexts/LanguageContext';
import { MiniGameEngine } from '../components/MiniGameEngine';

export const Arcade = () => {
  const { language } = useLanguage();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-hand font-bold text-slate-900 dark:text-white mb-2">Simulation Arcade</h1>
        <p className="text-slate-500 dark:text-slate-400">Test your skills in real-world scenarios</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MODULES.map((m, idx) => (
          <button 
            key={m.id}
            onClick={() => setActiveGame(m.id)}
            className="group relative bg-slate-800 dark:bg-slate-900 rounded-t-2xl rounded-b-md p-1 pt-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
             {/* Cartridge Shape Detail */}
             <div className="absolute top-0 left-0 right-0 h-6 bg-slate-700 rounded-t-2xl border-b-2 border-slate-900"></div>
             <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-slate-600 rounded-full"></div>

             {/* Label Area */}
             <div className="bg-white dark:bg-slate-800 h-40 rounded-md m-2 p-4 flex flex-col justify-between items-center text-center border-2 border-slate-200 dark:border-slate-700 group-hover:border-brand-400 transition-colors relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] bg-brand-500 w-16 h-16 rotate-45 z-0 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="text-4xl z-10 group-hover:scale-110 transition-transform duration-300">{m.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight z-10">{m.title[language]}</h3>
                <div className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-1 rounded uppercase z-10">Start Game</div>
             </div>
             
             {/* Cartridge Bottom Grips */}
             <div className="h-4 flex justify-center gap-1 mt-1 opacity-50">
                <div className="w-1 h-full bg-slate-600 rounded-full"></div>
                <div className="w-1 h-full bg-slate-600 rounded-full"></div>
                <div className="w-1 h-full bg-slate-600 rounded-full"></div>
             </div>
          </button>
        ))}
      </div>

      {activeGame && <MiniGameEngine moduleId={activeGame} onClose={() => setActiveGame(null)} />}
    </div>
  );
};