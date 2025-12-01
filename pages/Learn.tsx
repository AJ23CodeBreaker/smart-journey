import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { MODULES } from '../data/modules';
import { Link } from 'react-router-dom';

export const Learn = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-hand font-bold text-slate-900 dark:text-white mb-2">Study Modules</h1>
        <div className="inline-block bg-brand-100 dark:bg-brand-900 px-4 py-1 rounded-full text-brand-700 dark:text-brand-300 font-bold text-sm">
          {user.completedModules.length} of 10 Completed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((module) => {
          const isCompleted = user.completedModules.includes(module.id);
          return (
            <Link 
              to={`/lesson/${module.id}`} 
              key={module.id}
              className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 transition-all duration-300 ${
                isCompleted 
                  ? "border-green-200 dark:border-green-900" 
                  : "border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:shadow-paper hover:-translate-y-1"
              }`}
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 text-green-500 text-2xl">✓</div>
              )}
              
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {module.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {module.title[language]}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {module.description[language]}
              </p>
              
              <div className={`h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden`}>
                 <div className={`h-full ${isCompleted ? 'bg-green-500 w-full' : 'bg-brand-400 w-0 group-hover:w-1/4'} transition-all duration-500`}></div>
              </div>
              
              <div className="mt-4 text-xs font-bold text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {isCompleted ? 'Review Lesson' : 'Start Lesson'} ➜
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};