import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ChatMessage, Language } from '../types';
import { getAiAdvisorResponse } from '../services/geminiService';

export const Advisor = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synth = window.speechSynthesis;

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: t('advisorIntro'),
        timestamp: new Date()
      }
    ]);
  }, [language, t]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Text-to-Speech
  const speak = (text: string) => {
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    let voice = null;
    if (language === Language.EN) {
      voice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
    } else {
      voice = voices.find(v => v.lang.includes('zh-HK')) || voices.find(v => v.lang.includes('zh'));
    }
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    if (synth.speaking) synth.cancel();

    try {
      const updatedHistory = [...messages, userMsg];
      const aiText = await getAiAdvisorResponse(updatedHistory, language);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: aiText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      speak(aiText);

    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: language === Language.EN ? "Connection error. Please check your API Key." : "連線錯誤，請檢查您的 API 金鑰。",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-10rem)] flex flex-col animate-fade-in relative bg-white dark:bg-slate-900 rounded-3xl border-4 border-slate-800 overflow-hidden shadow-2xl">
      
      {/* Header - Phone Style */}
      <div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center gap-4">
         <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow border-2 border-white">
            🤖
         </div>
         <div>
            <div className="font-bold text-slate-800 dark:text-white">Dr. $mart</div>
            <div className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
            </div>
         </div>
         {isSpeaking && <div className="ml-auto text-2xl animate-bounce">🔊</div>}
      </div>

      {/* Chat Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/skulls.png')]"></div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 bg-slate-50 dark:bg-slate-950/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm relative ${
                isUser 
                  ? 'bg-brand-500 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                
                {/* Tail */}
                <div className={`absolute top-0 w-0 h-0 border-8 border-transparent ${
                    isUser 
                    ? 'right-[-8px] border-t-brand-500 border-r-0' 
                    : 'left-[-8px] border-t-white dark:border-t-slate-800 border-l-0'
                }`}></div>
              </div>
            </div>
          );
        })}
        
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex gap-1 items-center w-12 justify-center h-10">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white dark:bg-slate-800 p-3 border-t border-slate-200 dark:border-slate-700 z-20">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeMessage')}
            className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-full px-5 py-3 focus:ring-2 focus:ring-brand-300 outline-none dark:text-white transition"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="bg-brand-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-brand-600 hover:scale-105 transition disabled:opacity-50 disabled:scale-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5 -translate-y-0.5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};