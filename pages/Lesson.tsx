import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { PageType, ModulePage } from '../types';

export const Lesson = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { completeModule } = useAuth();
  const navigate = useNavigate();
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [showNav, setShowNav] = useState(false); // Mobile nav toggle

  const module = MODULES.find(m => m.id === id);
  if (!module) return <div>Module not found</div>;

  const pages = module.pages;
  const currentPage = pages[activePageIndex];

  // Auto-scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowNav(false);
  }, [activePageIndex]);

  const handleNext = () => {
    if (activePageIndex < pages.length - 1) {
      setActivePageIndex(p => p + 1);
    } else {
      completeModule(module.id);
      navigate('/learn');
    }
  };

  const handlePrev = () => {
    if (activePageIndex > 0) {
      setActivePageIndex(p => p - 1);
    }
  };

  // Render content based on type
  const renderContent = (page: ModulePage) => {
    const content = page.content[language];

    if (page.type === 'highlight') {
      return (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-2xl p-6 md:p-8 shadow-sm">
           <h3 className="font-hand text-2xl font-bold text-yellow-800 dark:text-yellow-400 mb-6 flex items-center gap-2">
             <span>🔑</span> {t('keyTakeaways')}
           </h3>
           <ul className="space-y-4">
             {Array.isArray(content) && content.map((item, i) => (
               <li key={i} className="flex items-start gap-4">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold text-xs mt-1">
                   {i + 1}
                 </div>
                 <span className="text-lg text-slate-700 dark:text-slate-200 font-medium">{item}</span>
               </li>
             ))}
           </ul>
        </div>
      );
    }

    if (page.type === 'case_study') {
       return (
         <div className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-paper border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* "Sticky Note" decoration */}
            <div className="absolute top-0 right-0 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest">
               {t('realLifeScenario')}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-loose whitespace-pre-line text-slate-700 dark:text-slate-300 font-serif">
                {content as string}
              </p>
            </div>
         </div>
       );
    }

    // Default Content
    return (
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-xl leading-8 text-slate-700 dark:text-slate-300 whitespace-pre-line">
          {content as string}
        </p>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6 animate-fade-in max-w-7xl mx-auto">
      
      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-2">
        <span className="font-bold text-slate-700 dark:text-white truncate pr-2">
          {activePageIndex + 1}. {currentPage.title[language]}
        </span>
        <button 
          onClick={() => setShowNav(!showNav)}
          className="bg-brand-100 text-brand-700 px-3 py-1 rounded-lg text-sm font-bold"
        >
          {showNav ? t('close') : t('index')}
        </button>
      </div>

      {/* Sidebar Navigation (Table of Contents) */}
      <aside className={`
        fixed inset-0 z-40 bg-white dark:bg-slate-900 md:static md:w-80 md:bg-transparent md:block flex flex-col
        transition-transform duration-300 transform 
        ${showNav ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full md:h-[calc(100vh-8rem)] bg-white dark:bg-slate-800 md:rounded-3xl border-r md:border-2 border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden shadow-xl md:shadow-none">
           <div className={`p-6 ${module.color} text-white`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{module.icon}</span>
                <span className="font-hand font-bold text-xl opacity-80">{t('module')} {module.id.replace('m','')}</span>
              </div>
              <h2 className="font-bold text-2xl leading-tight">{module.title[language]}</h2>
              
              {/* Mobile Close Button */}
              <button 
                onClick={() => setShowNav(false)} 
                className="md:hidden absolute top-4 right-4 text-white/80 hover:text-white"
              >
                ✕
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePageIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                    activePageIndex === idx
                      ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700/50 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750"
                  }`}
                >
                  <span className={`
                    w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0
                    ${activePageIndex === idx ? 'bg-brand-200 text-brand-800' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}
                  `}>
                    {idx + 1}
                  </span>
                  <span className="truncate">{p.title[language]}</span>
                  {p.type === 'case_study' && <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Case</span>}
                  {p.type === 'highlight' && <span className="ml-auto text-xs bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded">★</span>}
                </button>
              ))}
           </div>
           
           <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <button onClick={() => navigate('/learn')} className="text-sm font-bold text-slate-500 hover:text-brand-600 flex items-center gap-2">
                 <span>←</span> {t('backToModules')}
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white dark:bg-slate-800 md:rounded-3xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col shadow-sm relative">
         
         {/* Page Header */}
         <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                 {t('page')} {activePageIndex + 1} {t('of')} {pages.length}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{currentPage.title[language]}</h1>
            </div>
            
            <div className="hidden md:flex gap-2">
              <button 
                onClick={handlePrev} 
                disabled={activePageIndex === 0}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                ←
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-md hover:bg-brand-700 transition"
              >
                →
              </button>
            </div>
         </div>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            {/* Background Pattern for 'Notebook' feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[length:100%_2rem] mt-10"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              {renderContent(currentPage)}
            </div>
         </div>

         {/* Mobile Bottom Nav */}
         <div className="md:hidden p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between gap-4">
             <button 
                onClick={handlePrev} 
                disabled={activePageIndex === 0}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 disabled:opacity-50"
              >
                {t('previous')}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 rounded-xl bg-brand-600 text-white font-bold shadow-lg"
              >
                {activePageIndex === pages.length - 1 ? t('finish') : t('next')}
              </button>
         </div>

      </main>
    </div>
  );
};