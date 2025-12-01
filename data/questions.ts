
import { Level, Language, QuizQuestion } from '../types';

// Helper to create questions
const createQ = (
  id: string,
  moduleId: string,
  difficulty: Level,
  correctIndex: number,
  imgId: string,
  content: {
    en: [string, string, string[], string],
    hk: [string, string, string[], string],
    cn: [string, string, string[], string]
  }
): QuizQuestion => ({
  id,
  moduleId,
  difficulty,
  correctIndex,
  imageUrl: `https://images.unsplash.com/${imgId}?auto=format&fit=crop&w=800&q=80`,
  content: {
    [Language.EN]: { category: content.en[0], question: content.en[1], options: content.en[2], explanation: content.en[3] },
    [Language.ZH_HK]: { category: content.hk[0], question: content.hk[1], options: content.hk[2], explanation: content.hk[3] },
    [Language.ZH_CN]: { category: content.cn[0], question: content.cn[1], options: content.cn[2], explanation: content.cn[3] }
  }
});

// A Sample of the 150 questions structure (Due to output limits, implementing representative subset)
export const QUESTIONS: QuizQuestion[] = [
  // --- MODULE 1: ONBOARDING & RISK ---
  createQ('m1_b1', 'm1', Level.BRONZE, 0, 'photo-1579621970563-ebec7560ff3e', {
    en: ['Risk', 'Low risk tolerance means you prefer:', ['Stability over high returns', 'Losing money', 'Crypto', 'Gambling'], 'Low risk tolerance investors prioritize protecting their capital.'],
    hk: ['風險', '低風險承受能力意味著你偏好：', ['穩定多於高回報', '輸錢', '加密貨幣', '賭博'], '低風險承受能力的投資者優先考慮保本。'],
    cn: ['风险', '低风险承受能力意味着你偏好：', ['稳定多于高回报', '输钱', '加密货币', '赌博'], '低风险承受能力的投资者优先考虑保本。']
  }),
  createQ('m1_s1', 'm1', Level.SILVER, 1, 'photo-1590283603385-17ffb3a7f29f', {
    en: ['Profile', 'A 20-year-old usually has a ____ time horizon than a 60-year-old.', ['Shorter', 'Longer', 'Same', 'None'], 'Younger people have more time to recover from market dips, allowing for higher risk.'],
    hk: ['概況', '20歲人士的時間跨度通常比60歲人士____。', ['更短', '更長', '一樣', '沒有'], '年輕人有更多時間從市場下跌中恢復，因此可承受較高風險。'],
    cn: ['概况', '20岁人士的时间跨度通常比60岁人士____。', ['更短', '更长', '一样', '没有'], '年轻人有更多时间从市场下跌中恢复，因此可承受较高风险。']
  }),

  // --- MODULE 3: BUDGETING ---
  createQ('m3_b1', 'm3', Level.BRONZE, 1, 'photo-1554224155-984063584d45', {
    en: ['Rule', 'In 50/30/20, what is the 50% for?', ['Fun', 'Needs', 'Savings', 'Charity'], '50% covers essentials like rent, food, and transport.'],
    hk: ['法則', '在 50/30/20 中，50% 用於什麼？', ['娛樂', '需要', '儲蓄', '慈善'], '50% 用於生活必需，如租金、食物和交通。'],
    cn: ['法则', '在 50/30/20 中，50% 用于什么？', ['娱乐', '需要', '储蓄', '慈善'], '50% 用于生活必需，如租金、食物和交通。']
  }),
  createQ('m3_g1', 'm3', Level.GOLD, 2, 'photo-1551288049-bebda4e38f71', {
    en: ['Tracking', 'Zero-based budgeting means:', ['Spending zero money', 'Having zero savings', 'Assigning every dollar a job so income minus expenses equals zero', 'Being broke'], 'It ensures total awareness of where every cent goes.'],
    hk: ['記賬', '零基預算法 (Zero-based budgeting) 意思是：', ['不花錢', '零儲蓄', '為每一元分配用途，使收入減去開支等於零', '破產'], '它確保你完全清楚每一分錢的去向。'],
    cn: ['记账', '零基预算法 (Zero-based budgeting) 意思是：', ['不花钱', '零储蓄', '为每一元分配用途，使收入减去开支等于零', '破产'], '它确保你完全清楚每一分钱的去向。']
  }),

  // --- MODULE 8: MPF ---
  createQ('m8_b1', 'm8', Level.BRONZE, 1, 'photo-1565514020176-db716679b0cc', {
    en: ['MPF', 'What is the mandatory contribution rate for employees in HK?', ['2%', '5%', '10%', '0%'], 'Employees contribute 5% of relevant income, subject to min/max levels.'],
    hk: ['強積金', '香港僱員的強制性供款率是多少？', ['2%', '5%', '10%', '0%'], '僱員需供款有關入息的 5%，受最低/最高水平限制。'],
    cn: ['强积金', '香港雇员的强制性供款率是多少？', ['2%', '5%', '10%', '0%'], '雇员需供款有关入息的 5%，受最低/最高水平限制。']
  }),
  createQ('m8_g1', 'm8', Level.GOLD, 0, 'photo-1611974765270-ca1258634369', {
    en: ['MPF', 'Tax Deductible Voluntary Contributions (TVC) can save you up to how much tax per year (max limit)?', ['Use calculator (Max deduction ~$60k)', 'Zero', 'Unlimited', '1 Million'], 'TVC allows you to deduct up to HK$60,000 (shared with QDAP) from taxable income.'],
    hk: ['強積金', '可扣稅自願性供款 (TVC) 最多可扣除多少稅項（上限）？', ['使用計算機（扣除上限約6萬）', '零', '無限', '一百萬'], 'TVC 容許你從應課稅入息中扣除最多 HK$60,000（與合資格延期年金共用）。'],
    cn: ['强积金', '可扣税自愿性供款 (TVC) 最多可扣除多少税项（上限）？', ['使用计算机（扣除上限约6万）', '零', '无限', '一百万'], 'TVC 容许你从应课税入息中扣除最多 HK$60,000（与合资格延期年金共用）。']
  }),

  // --- MODULE 10: FRAUD ---
  createQ('m10_b1', 'm10', Level.BRONZE, 2, 'photo-1563013544-824ae1b704d3', {
    en: ['Scam', 'A stranger calls claiming to be Mainland Official accusing you of a crime. They ask for money to prove innocence. You:', ['Pay immediately', 'Argue', 'Hang up', 'Cry'], 'Mainland officials will NEVER call you to ask for money or passwords.'],
    hk: ['騙案', '陌生人來電自稱內地官員指控你犯罪，要求匯款證清白。你：', ['立即付款', '爭論', '掛斷', '哭'], '內地官員絕不會致電要求你匯款或提供密碼。'],
    cn: ['骗案', '陌生人来电自称内地官员指控你犯罪，要求汇款证清白。你：', ['立即付款', '争论', '挂断', '哭'], '内地官员绝不会致电要求你汇款或提供密码。']
  })
];
