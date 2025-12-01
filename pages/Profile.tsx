import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { APP_VERSION } from '../constants';
import { User } from '../types';

export const Profile = () => {
  const { user, changePassword, getAllUsers } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPass.length < 4) {
      setError("Password too short");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    changePassword(newPass);
    setMessage(t('passwordChanged'));
    setNewPass('');
    setConfirmPass('');
  };

  const handleDownloadUsers = () => {
    const users = getAllUsers();
    // Create a text format string
    const header = "Email, Password, Name, Level, XP, Streak\n";
    const rows = users.map(u => `${u.email}, ${u.passwordHash}, ${u.name}, ${u.level}, ${u.xp}, ${u.streak}`).join('\n');
    const content = header + rows;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart_journey_users_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAdmin = user.email === 'admin@smart.hk';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">{t('profile')}</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Col: User Card */}
        <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{user.email}</p>
                <div className="inline-block bg-brand-50 dark:bg-brand-900/30 px-4 py-1 rounded-full text-brand-600 dark:text-brand-400 font-bold text-sm border border-brand-100 dark:border-brand-800">
                    {t(user.level.toLowerCase() as any)}
                </div>
            </div>

            {/* Appearance Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <span>🎨</span> Appearance
                </h3>
                <div className="flex gap-2">
                   <button 
                     onClick={toggleTheme}
                     className={`flex-1 py-2 rounded-lg font-bold text-sm border-2 transition ${theme === 'light' ? 'bg-brand-100 border-brand-200 text-brand-700' : 'bg-slate-100 border-transparent text-slate-500 hover:border-slate-300'}`}
                   >
                     Light
                   </button>
                   <button 
                     onClick={toggleTheme}
                     className={`flex-1 py-2 rounded-lg font-bold text-sm border-2 transition ${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-100 border-transparent text-slate-500 hover:border-slate-300'}`}
                   >
                     Dark
                   </button>
                </div>
            </div>
        </div>

        {/* Right Col: Settings */}
        <div className="md:col-span-2 space-y-6">
            
            {/* Password Change */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('changePassword')}</h3>
               
               {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm font-bold">{message}</div>}
               {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm font-bold">{error}</div>}

               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('newPassword')}</label>
                    <input 
                      type="password" 
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-brand-500 outline-none transition dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('confirmPassword')}</label>
                    <input 
                      type="password" 
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-brand-500 outline-none transition dark:text-white"
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition shadow-lg">
                      {t('submit')}
                    </button>
                  </div>
               </form>
            </div>

            {/* Admin Panel */}
            {isAdmin && (
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg border border-slate-700 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🛡️</div>
                 <h3 className="text-xl font-bold mb-2">Admin Database</h3>
                 <p className="text-slate-400 text-sm mb-6">Download user records including passwords.</p>
                 <button 
                   onClick={handleDownloadUsers}
                   className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold border border-slate-600 transition flex items-center justify-center gap-2"
                 >
                   <span>⬇️</span> Download User Data (.txt)
                 </button>
              </div>
            )}

        </div>
      </div>
    </div>
  );
};