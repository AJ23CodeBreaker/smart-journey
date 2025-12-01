export enum Language {
  EN = 'en',
  ZH_HK = 'zh-hk',
  ZH_CN = 'zh-cn',
}

export enum Level {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

export type Theme = 'light' | 'dark';

export interface User {
  email: string;
  passwordHash: string;
  name: string;
  xp: number;
  level: Level;
  streak: number;
  completedModules: string[]; // IDs of completed modules
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  level: Level;
  dateEarned: string;
}

// --- NEW MODULE TYPES ---

export type PageType = 'content' | 'case_study' | 'highlight';

export interface ModulePage {
  id: string;
  type: PageType;
  title: { [key in Language]: string };
  content: { [key in Language]: string | string[] }; // String for text, Array for bullet points
}

export interface Module {
  id: string;
  title: { [key in Language]: string };
  description: { [key in Language]: string };
  icon: string; // Emoji or visual icon
  color: string; // Tailwind color class
  pages: ModulePage[]; // New array-based structure
}

export interface QuestionContent {
  question: string;
  options: string[];
  explanation: string;
  category: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string; // Links to a module
  correctIndex: number;
  imageUrl?: string;
  difficulty: Level; // Bronze (Low), Silver (Mid), Gold (High)
  content: {
    [key in Language]: QuestionContent;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface GameChoice {
  text: { [key in Language]: string };
  nextStepId: string; // 'win', 'lose', or specific step ID
  feedback: { [key in Language]: string };
  scoreDelta: number;
}

export interface GameStep {
  id: string;
  text: { [key in Language]: string };
  image?: string; // Icon or Image URL
  choices: GameChoice[];
}

export interface GameScenario {
  id: string; // Matches Module ID
  title: { [key in Language]: string };
  intro: { [key in Language]: string };
  totalSteps: number; // For progress bar
  steps: { [stepId: string]: GameStep }; // Dictionary of steps
}