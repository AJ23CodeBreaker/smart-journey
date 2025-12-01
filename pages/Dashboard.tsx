import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Level } from '../types';
import { LEVEL_THRESHOLDS, DAILY_TIPS } from '../constants';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    const tips = DAILY_TIPS[language];
    const todayIndex = new Date().getDate() % tips.length;
    setDailyTip(tips[todayIndex]);
  }, [language]);

  if (!user) return null;

  const getNextLevelXP = () => {
    if (user.level === Level.BRONZE) return LEVEL_THRESHOLDS[Level.SILVER];
    if (user.level === Level.SILVER) return LEVEL_THRESHOLDS[Level.GOLD];
    return "MAX";
  };

  const progressPercent = () => {
    const next = getNextLevelXP();
    if (next === "MAX") return 100;
    const currentBase = user.level === Level.BRONZE ? 0 : LEVEL_THRESHOLDS[user.level];
    const targetBase = next as number;
    const progress = user.xp - currentBase;
    const range = targetBase - currentBase;
    return Math.min(100, Math.max(0, (progress / range) * 100));
  };

  const Badge = ({ level, active }: { level: Level, active: boolean }) => {
    const isPast = (user.level === Level.SILVER && level === Level.BRONZE) || (user.level === Level.GOLD && level !== Level.GOLD);
    
    let containerClass = "relative rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 h-36 ";
    
    if (active) {
       containerClass += "bg-white dark:bg-slate-800 border-brand-500 shadow-paper scale-105 z-10 ring-2 ring-brand-200 dark:ring-brand-900";
    } else if (isPast) {
       containerClass += "bg-slate-50 dark:bg-slate-900 border-green-200 dark:border-green-900 opacity-80";
    } else {
       containerClass += "bg-slate-50 dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-700 opacity-50 grayscale";
    }

    return (
      <div className={containerClass}>
        {active && <div className="absolute -top-3 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t('current')}</div>}
        {isPast && <div className="absolute top-2 right-2 text-green-500">✓</div>}
        
        <div className={`text-4xl ${active ? 'animate-bounce-slow' : ''}`}>
           {level === Level.BRONZE ? '🥉' : level === Level.SILVER ? '🥈' : '🥇'}
        </div>
        <div className="text-center">
           <div className="font-hand font-bold text-xl text-slate-800 dark:text-white">{t(level.toLowerCase() as any)}</div>
           <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('rank')}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Student ID Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-6 shadow-paper relative overflow-hidden">
           {/* Tape effect */}
           <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-yellow-100/80 dark:bg-yellow-900/30 rotate-1"></div>

           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 flex items-center justify-center text-4xl font-black border-2 border-brand-200 dark:border-brand-700 shadow-inner transform -rotate-2">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                 <div className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t('studentId')}: {user.email.split('@')[0]}</div>
                 <h1 className="text-3xl font-hand font-bold text-slate-900 dark:text-white mb-1">
                    {t('hi')}, {user.name}!
                 </h1>
                 <p className="text-slate-500 font-medium">{t('welcomeMessage')}</p>
              </div>
              <div className="text-right bg-brand-50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-800">
                 <div className="text-xs font-bold text-brand-400 uppercase tracking-widest">{t('totalXp')}</div>
                 <div className="text-4xl font-black text-brand-600 dark:text-brand-400 font-sans">{user.xp}</div>
              </div>
           </div>

           <div className="mt-8 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <span>{t('levelProgress')}</span>
                <span>{Math.round(progressPercent())}%</span>
              </div>
              <div className="h-4 w-full bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden p-0.5">
                <div 
                  style={{ width: `${progressPercent()}%` }} 
                  className="h-full bg-brand-400 rounded-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"
                ></div>
              </div>
           </div>
        </div>

        {/* Daily Cheat Sheet */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-3xl border-2 border-yellow-200 dark:border-yellow-700/30 p-6 shadow-paper rotate-1 flex flex-col justify-center relative">
            <div className="absolute -top-3 right-10 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 shadow-sm border border-slate-300"></div>
            <h3 className="font-hand text-2xl font-bold text-yellow-700 dark:text-yellow-500 mb-3">💡 {t('cheatSheet')}</h3>
            <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "{dailyTip}"
            </p>
            <div className="mt-4 text-xs font-bold text-yellow-600/50 uppercase tracking-widest text-right">{t('dailyTipLabel')}</div>
        </div>

      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🎖</span> {t('myRank')}
        </h2>
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <Badge level={Level.BRONZE} active={user.level === Level.BRONZE} />
          <Badge level={Level.SILVER} active={user.level === Level.SILVER} />
          <Badge level={Level.GOLD} active={user.level === Level.GOLD} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/learn" className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-blue-400 transition-all hover:-translate-y-1">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-xl flex items-center justify-center text-2xl">📚</div>
              <div>
                 <h3 className="font-bold text-lg dark:text-white">{t('continueLearning')}</h3>
                 <p className="text-slate-500 text-sm">{t('continueLearningDesc')}</p>
              </div>
              <div className="ml-auto text-slate-300 group-hover:text-blue-500">➜</div>
           </div>
        </Link>
        <Link to="/arcade" className="group bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-purple-400 transition-all hover:-translate-y-1">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-500 rounded-xl flex items-center justify-center text-2xl">🎮</div>
              <div>
                 <h3 className="font-bold text-lg dark:text-white">{t('playSimulations')}</h3>
                 <p className="text-slate-500 text-sm">{t('playSimulationsDesc')}</p>
              </div>
              <div className="ml-auto text-slate-300 group-hover:text-purple-500">➜</div>
           </div>
        </Link>
      </div>

    </div>
  );
};