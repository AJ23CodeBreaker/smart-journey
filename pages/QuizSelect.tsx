import React from 'react';
import { Link } from 'react-router-dom';
import { Level } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const QuizSelect = () => {
  const { t } = useLanguage();

  const AssessmentCard = ({ level, borderColor, iconColor, title, desc }: { level: Level, borderColor: string, iconColor: string, title: string, desc: string }) => (
    <Link to={`/quiz/${level}`} className={`group bg-white dark:bg-slate-900 p-8 rounded-xl shadow-soft border-2 ${borderColor} hover:shadow-lg transition-all duration-300`}>
      <div className={`w-14 h-14 rounded-lg ${iconColor} bg-opacity-10 flex items-center justify-center mb-6`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-8 h-8 ${iconColor.replace('bg-', 'text-')}`}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      </div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title} Level</div>
      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-700 transition-colors">
        {t(level.toLowerCase() as any)} Assessment
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{desc}</p>
      
      <div className="w-full py-3 text-center rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-white group-hover:bg-brand-700 group-hover:text-white group-hover:border-brand-700 transition-colors">
        Begin Exam
      </div>
    </Link>
  );

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-12 mt-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Certification Centre</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Validate your financial knowledge. Pass an exam with a score of 75% or higher to earn a verifiable certificate.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <AssessmentCard 
          level={Level.BRONZE} 
          borderColor="border-amber-200 dark:border-amber-900/30" 
          iconColor="bg-amber-600" 
          title="Associate"
          desc="Fundamental concepts of budgeting and saving." 
        />
        <AssessmentCard 
          level={Level.SILVER} 
          borderColor="border-slate-300 dark:border-slate-700" 
          iconColor="bg-slate-500" 
          title="Professional"
          desc="Intermediate knowledge of debt, MPF, and credit." 
        />
        <AssessmentCard 
          level={Level.GOLD} 
          borderColor="border-yellow-200 dark:border-yellow-900/30" 
          iconColor="bg-yellow-500" 
          title="Master"
          desc="Advanced strategies in investing and risk management." 
        />
      </div>
    </div>
  );
};