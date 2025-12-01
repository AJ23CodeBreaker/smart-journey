import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const CertificateView = () => {
  const { user } = useAuth();
  if (!user || user.certificates.length === 0) return <div className="text-center mt-20">No certificates yet. Go take a Quiz!</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 animate-fade-in space-y-8">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">My Credentials</h1>
      
      <div className="grid gap-6">
        {user.certificates.map(cert => (
          <div key={cert.id} className="bg-white text-slate-900 p-10 rounded-xl shadow-2xl border-4 border-double border-brand-200 relative overflow-hidden">
             {/* Watermark */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none">🏆</div>
             
             <div className="text-center border-b-2 border-slate-100 pb-6 mb-6">
               <h2 className="text-4xl font-serif font-bold text-brand-800 uppercase tracking-widest mb-2">Certificate of Achievement</h2>
               <p className="text-slate-500 italic">This certifies that</p>
             </div>
             
             <div className="text-center mb-8">
               <div className="text-5xl font-script text-slate-900 mb-4 font-bold">{user.name}</div>
               <p className="text-slate-600">has successfully passed the examination for</p>
               <div className="text-2xl font-bold text-brand-600 mt-2 uppercase">{cert.level} Financial Literacy</div>
             </div>

             <div className="flex justify-between items-end text-sm text-slate-500 font-serif">
                <div className="text-center">
                  <div className="w-32 border-b border-slate-400 mb-1"></div>
                  Date: {cert.dateEarned}
                </div>
                <div className="text-center">
                   <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg mb-2 mx-auto">
                     VERIFIED
                   </div>
                   $mart Journey
                </div>
                <div className="text-center">
                   <div className="w-32 border-b border-slate-400 mb-1"></div>
                   Signature
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};