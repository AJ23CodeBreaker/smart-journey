import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { EMAILJS_CONFIG } from '../constants';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tempPassDebug, setTempPassDebug] = useState<string | null>(null);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const pass = await register(email, name);
      setSuccess(true);
      // Only show password if EmailJS is NOT configured (Dev mode fallback)
      if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
        setTempPassDebug(pass);
      }
    } catch (err: any) {
      console.error(err);
      // Handle the error object properly
      if (err.message === "User already exists") {
         setError(t('error') + ": " + err.message);
      } else {
         // Fallback for objects to avoid [object Object]
         const msg = err.message || (typeof err === 'string' ? err : "Connection failed. Please check your internet.");
         setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-paper border-2 border-green-400 border-dashed animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-hand font-bold text-slate-900 dark:text-white mb-2">Check Your Inbox!</h2>
          
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            We have sent a temporary password to <span className="font-bold">{email}</span>.
          </p>

          {/* FALLBACK FOR DEV MODE ONLY: If user hasn't set keys, show password here so they aren't locked out */}
          {tempPassDebug && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl mb-6 border border-yellow-200 dark:border-yellow-800 text-sm">
               <p className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">DEV MODE (EmailJS Not Configured):</p>
               <p className="font-mono text-xl select-all">{tempPassDebug}</p>
            </div>
          )}
          
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-slate-800 dark:bg-slate-700 text-white py-3.5 rounded-xl font-bold hover:bg-slate-900 transition shadow-sticker"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-paper border-2 border-slate-200 dark:border-slate-700 animate-fade-in">
      <div className="text-center mb-8">
         <h2 className="text-3xl font-hand font-bold text-slate-900 dark:text-white mb-2">{t('register')}</h2>
         <p className="text-slate-500 dark:text-slate-400">Create your student profile</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-bold border-2 border-red-100 dark:border-red-800">
          {error}
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
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('name')}</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-0 focus:border-brand-500 outline-none transition dark:text-white font-medium"
            placeholder="Chan Tai Man"
            disabled={loading}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-bold hover:bg-brand-700 transition shadow-sticker border-b-4 border-brand-800 active:border-b-0 active:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Start Journey'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an ID? <Link to="/login" className="text-brand-600 font-bold hover:underline">Login</Link>
      </div>
    </div>
  );
};