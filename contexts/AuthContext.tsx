import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Level, Certificate } from '../types';
import { LEVEL_THRESHOLDS, EMAILJS_CONFIG } from '../constants';
import emailjs from '@emailjs/browser';

interface AuthContextType {
  user: User | null;
  login: (email: string, passwordHash: string) => boolean;
  register: (email: string, name: string) => Promise<string>;
  logout: () => void;
  changePassword: (newPassword: string) => void;
  updateXP: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  addCertificate: (cert: Certificate) => void;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize DB with Admin User and Test User if not exists
  useEffect(() => {
    const dbStr = localStorage.getItem('hk_finquest_users_db');
    let usersDb = dbStr ? JSON.parse(dbStr) : {};
    let dbChanged = false;
    
    // 1. Setup Admin
    if (!usersDb['admin@smart.hk']) {
      usersDb['admin@smart.hk'] = {
        email: 'admin@smart.hk',
        passwordHash: 'admin123',
        name: 'Developer Admin',
        xp: 1500,
        level: Level.GOLD,
        streak: 10,
        completedModules: ['m1', 'm2', 'm3'],
        certificates: []
      };
      dbChanged = true;
    }

    // 2. Setup Test User
    if (!usersDb['abc@abc.com']) {
      usersDb['abc@abc.com'] = {
        email: 'abc@abc.com',
        passwordHash: '123',
        name: 'Test Student',
        xp: 100,
        level: Level.BRONZE,
        streak: 2,
        completedModules: [],
        certificates: []
      };
      dbChanged = true;
    }

    if (dbChanged) {
      localStorage.setItem('hk_finquest_users_db', JSON.stringify(usersDb));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('hk_finquest_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hk_finquest_current_user', JSON.stringify(user));
      const usersDb = JSON.parse(localStorage.getItem('hk_finquest_users_db') || '{}');
      usersDb[user.email] = user;
      localStorage.setItem('hk_finquest_users_db', JSON.stringify(usersDb));
    } else {
      localStorage.removeItem('hk_finquest_current_user');
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const usersDb = JSON.parse(localStorage.getItem('hk_finquest_users_db') || '{}');
    const storedUser = usersDb[email];
    if (storedUser && storedUser.passwordHash === password) {
      // Migrate old users who lack new fields
      if (!storedUser.completedModules) storedUser.completedModules = [];
      if (!storedUser.certificates) storedUser.certificates = [];
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const register = async (email: string, name: string): Promise<string> => {
    const usersDb = JSON.parse(localStorage.getItem('hk_finquest_users_db') || '{}');
    if (usersDb[email]) throw new Error("User already exists");

    const tempPassword = Math.random().toString(36).slice(-8);

    // Send Email via EmailJS BEFORE creating the user
    // This prevents "Zombie Accounts" where email fails but user is created
    if (EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID') {
       try {
         await emailjs.send(
           EMAILJS_CONFIG.SERVICE_ID,
           EMAILJS_CONFIG.TEMPLATE_ID,
           {
             to_name: name,
             // We send multiple variations to match whatever variable name you set in EmailJS template
             to_email: email, 
             user_email: email,
             recipient: email,
             email: email,
             reply_to: email,
             password: tempPassword
           },
           EMAILJS_CONFIG.PUBLIC_KEY
         );
       } catch (error: any) {
         console.error("Failed to send email:", error);
         // Extract the readable error text from EmailJS object to avoid [object Object]
         const errorText = error?.text || error?.message || JSON.stringify(error);
         throw new Error(`Email send failed: ${errorText}`);
       }
    } else {
       console.warn("EmailJS not configured. Skipping email send.");
       await new Promise(r => setTimeout(r, 1000));
    }

    // Only create user if email (or dev mock) succeeded
    const newUser: User = {
      email,
      passwordHash: tempPassword,
      name,
      xp: 0,
      level: Level.BRONZE,
      streak: 0,
      completedModules: [],
      certificates: []
    };

    usersDb[email] = newUser;
    localStorage.setItem('hk_finquest_users_db', JSON.stringify(usersDb));

    return tempPassword;
  };

  const logout = () => setUser(null);
  
  const changePassword = (newPassword: string) => {
    if (user) setUser({ ...user, passwordHash: newPassword });
  };

  const updateXP = (amount: number) => {
    if (!user) return;
    let newXP = user.xp + amount;
    let newLevel = user.level;
    if (newLevel === Level.BRONZE && newXP >= LEVEL_THRESHOLDS[Level.SILVER]) newLevel = Level.SILVER;
    else if (newLevel === Level.SILVER && newXP >= LEVEL_THRESHOLDS[Level.GOLD]) newLevel = Level.GOLD;
    setUser({ ...user, xp: newXP, level: newLevel });
  };

  const completeModule = (moduleId: string) => {
    if (user && !user.completedModules.includes(moduleId)) {
      setUser({ ...user, completedModules: [...user.completedModules, moduleId], xp: user.xp + 50 });
    }
  };

  const addCertificate = (cert: Certificate) => {
    if (user) {
      setUser({ ...user, certificates: [...user.certificates, cert] });
    }
  };

  const getAllUsers = (): User[] => {
    const usersDb = JSON.parse(localStorage.getItem('hk_finquest_users_db') || '{}');
    return Object.values(usersDb);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, changePassword, updateXP, completeModule, addCertificate, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};