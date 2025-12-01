import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-paper border-2 border-slate-200 dark:border-slate-700 animate-fade-in relative">
      {/* Decorative spiral binding look could go here, simplified for now */}
      <div className="text-center mb-8">
         <div className="w-16 h-16 bg-brand-500 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-sticker rotate-3">🎓</div>
         <h2 className="text-3xl font-hand font-bold text-slate-900 dark:text-white mb-2">{t('login')}</h2>
         <p className="text-slate-500 dark:text-slate-400">Access your student portal</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-bold border-2 border-red-100 dark:border-red-800 flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('email')}</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-0 focus:border-brand-500 outline-none transition dark:text-white font-medium"
            placeholder="student@uni.hk"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('password')}</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-0 focus:border-brand-500 outline-none transition dark:text-white font-medium"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-sticker border-b-4 border-brand-800 active:border-b-0 active:translate-y-1"
        >
          Enter Class
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm text-slate-500">
        New here? <Link to="/register" className="text-brand-600 font-bold hover:underline">Enroll Now</Link>
      </div>
    </div>
  );
};