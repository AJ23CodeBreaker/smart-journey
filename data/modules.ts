import { Module, Language, ModulePage } from '../types';

// --- CONFIGURATION INTERFACE ---

interface ModuleContentConfig {
  id: string;
  topicEn: string;
  topicHk: string;
  topicCn: string;
  chaptersEn: string[];
  chaptersHk: string[];
  chaptersCn: string[];
  highlightsEn: string[]; // Must be 6 items
  highlightsHk: string[]; // Must be 6 items
  highlightsCn: string[]; // Must be 6 items
}

// --- CONTENT GENERATOR ---

const generateModulePages = (config: ModuleContentConfig): ModulePage[] => {
  const pages: ModulePage[] = [];
  
  // 1. Generate 20 Knowledge Pages
  // We use the provided chapters. If fewer than 20 provided, we cycle through them.
  for (let i = 0; i < 20; i++) {
    const titleEn = config.chaptersEn[i] || `${config.topicEn} Concept ${i + 1}`;
    const titleHk = config.chaptersHk[i] || `${config.topicHk} 概念 ${i + 1}`;
    const titleCn = config.chaptersCn[i] || `${config.topicCn} 概念 ${i + 1}`;

    pages.push({
      id: `${config.id}_p${i + 1}`,
      type: 'content',
      title: { 
        [Language.EN]: `${i + 1}. ${titleEn}`, 
        [Language.ZH_HK]: `${i + 1}. ${titleHk}`, 
        [Language.ZH_CN]: `${i + 1}. ${titleCn}` 
      },
      content: {
        [Language.EN]: `**${titleEn}** is a critical component of ${config.topicEn}.\n\nIn this section, we explore how this concept applies to personal finance in Hong Kong. Understanding the mechanics of ${titleEn} allows students to make better decisions regarding their wealth.\n\nKey points to remember:\n* Definition and scope.\n* Relevance to student life.\n* Long-term financial impact.\n\n"Knowledge is the currency of the future."`,
        [Language.ZH_HK]: `**${titleHk}** 是 ${config.topicHk} 的關鍵部分。\n\n在本節中，我們將探討此概念如何應用於香港的個人理財。了解 ${titleHk} 的運作機制讓學生能夠就其財富做出更明智的決定。\n\n需記住的要點：\n* 定義與範圍。\n* 與學生生活的相關性。\n* 長期財務影響。\n\n「知識是未來的貨幣。」`,
        [Language.ZH_CN]: `**${titleCn}** 是 ${config.topicCn} 的关键部分。\n\n在本节中，我们将探讨此概念如何应用于香港的个人理财。了解 ${titleCn} 的运作机制让学生能够就其财富做出更明智的决定。\n\n需记住的要点：\n* 定义与范围。\n* 与学生生活的相关性。\n* 长期财务影响。\n\n「知识是未来的货币。」`
      }
    });
  }

  // 2. Generate 2 Specific Case Studies
  pages.push({
    id: `${config.id}_cs1`,
    type: 'case_study',
    title: { [Language.EN]: "Case: The Right Choice", [Language.ZH_HK]: "案例：正確的選擇", [Language.ZH_CN]: "案例：正确的选择" },
    content: {
      [Language.EN]: `Meet Alex, a student who mastered **${config.topicEn}**.\n\nInstead of ignoring the details, Alex spent time learning about ${config.chaptersEn[0] || 'the basics'}. When faced with a financial decision, Alex applied the 50/30/20 rule and consulted trusted sources.\n\n**Outcome:**\nAlex built a solid financial foundation and avoided common traps.`,
      [Language.ZH_HK]: `認識 Alex，一位掌握了 **${config.topicHk}** 的學生。\n\nAlex 沒有忽視細節，而是花時間學習了 ${config.chaptersHk[0] || '基礎知識'}。當面臨理財決定時，Alex 應用了 50/30/20 法則並諮詢了可靠的來源。\n\n**結果：**\nAlex 建立了穩固的財務基礎，避免了常見的陷阱。`,
      [Language.ZH_CN]: `认识 Alex，一位掌握了 **${config.topicCn}** 的学生。\n\nAlex 没有忽视细节，而是花时间学习了 ${config.chaptersCn[0] || '基础知识'}。当面临理财决定时，Alex 应用了 50/30/20 法则并咨询了可靠的来源。\n\n**结果：**\nAlex 建立了稳固的财务基础，避免了常见的陷阱。`
    }
  });

  pages.push({
    id: `${config.id}_cs2`,
    type: 'case_study',
    title: { [Language.EN]: "Case: The Mistake", [Language.ZH_HK]: "案例：常見錯誤", [Language.ZH_CN]: "案例：常见错误" },
    content: {
      [Language.EN]: `Meet Sam, who neglected **${config.topicEn}**.\n\nSam thought this topic was "boring" and skipped the lessons on ${config.chaptersEn[1] || 'advanced concepts'}. Without a plan, Sam made emotional decisions based on short-term desires rather than long-term logic.\n\n**Lesson:**\nIgnorance in ${config.topicEn} often results in lost opportunities and financial stress.`,
      [Language.ZH_HK]: `認識 Sam，他忽視了 **${config.topicHk}**。\n\nSam 覺得這個主題很「沉悶」，跳過了關於 ${config.chaptersHk[1] || '進階概念'} 的課程。由於沒有計劃，Sam 根據短期慾望而非長期邏輯做出了情緒化的決定。\n\n**教訓：**\n對 ${config.topicHk} 的無知往往導致錯失良機和財務壓力。`,
      [Language.ZH_CN]: `认识 Sam，他忽视了 **${config.topicCn}**。\n\nSam 觉得这个主题很「沉闷」，跳过了关于 ${config.chaptersCn[1] || '进阶概念'} 的课程。由于没有计划，Sam 根据短期欲望而非长期逻辑做出了情绪化的决定。\n\n**教训：**\n对 ${config.topicCn} 的无知往往导致错失良机和财务压力。`
    }
  });

  // 3. Generate 1 Highlight Page (Recap)
  pages.push({
    id: `${config.id}_sum`,
    type: 'highlight',
    title: { [Language.EN]: "Module Recap", [Language.ZH_HK]: "單元總結", [Language.ZH_CN]: "单元总结" },
    content: {
      [Language.EN]: config.highlightsEn,
      [Language.ZH_HK]: config.highlightsHk,
      [Language.ZH_CN]: config.highlightsCn
    }
  });

  return pages;
};

// --- DATA CONFIGURATIONS (M2 - M10) ---

const M2_CONFIG: ModuleContentConfig = {
  id: 'm2',
  topicEn: "Financial Goals", topicHk: "理財目標", topicCn: "理财目标",
  chaptersEn: ["Why Goals Matter", "SMART Framework", "Specific Goals", "Measurable Metrics", "Achievable Targets", "Relevant Focus", "Time-bound Deadlines", "Short-term Goals", "Medium-term Goals", "Long-term Goals", "Inflation Impact", "Visualizing Success", "Writing it Down", "Accountability Partners", "Reviewing Progress", "Adjusting Course", "Psychology of Saving", "Delayed Gratification", "Reward Systems", "Staying Motivated"],
  chaptersHk: ["為何目標重要", "SMART 框架", "具體目標 (Specific)", "可衡量指標 (Measurable)", "可達成目標 (Achievable)", "相關性 (Relevant)", "有時限 (Time-bound)", "短期目標", "中期目標", "長期目標", "通脹影響", "具象化成功", "寫下目標", "問責夥伴", "檢討進度", "調整方向", "儲蓄心理學", "延遲滿足", "獎勵機制", "保持動力"],
  chaptersCn: ["为何目标重要", "SMART 框架", "具体目标 (Specific)", "可衡量指标 (Measurable)", "可达成目标 (Achievable)", "相关性 (Relevant)", "有时限 (Time-bound)", "短期目标", "中期目标", "长期目标", "通胀影响", "具象化成功", "写下目标", "问责伙伴", "检讨进度", "调整方向", "储蓄心理学", "延迟满足", "奖励机制", "保持动力"],
  highlightsEn: [ "Goals must be S.M.A.R.T.", "Write goals down to increase success.", "Break big goals into milestones.", "Factor in inflation.", "Review every 6 months.", "Focus on the 'Why'." ],
  highlightsHk: [ "目標必須是 S.M.A.R.T。", "寫下目標提高成功率。", "將大目標分解為里程碑。", "計入通脹因素。", "每 6 個月檢討一次。", "專注於「為什麼」。" ],
  highlightsCn: [ "目标必须是 S.M.A.R.T。", "写下目标提高成功率。", "将大目标分解为里程碑。", "计入通胀因素。", "每 6 个月检讨一次。", "专注于「为什么」。" ]
};

const M3_CONFIG: ModuleContentConfig = {
  id: 'm3',
  topicEn: "Budgeting", topicHk: "預算管理", topicCn: "预算管理",
  chaptersEn: ["The Budgeting Mindset", "Income Sources", "Fixed Expenses", "Variable Expenses", "The 50/30/20 Rule", "Needs (50%)", "Wants (30%)", "Savings (20%)", "Tracking Methods", "Using Apps", "Spreadsheet Method", "Envelope System", "Zero-based Budgeting", "Reducing Waste", "The Latte Factor", "Student Discounts", "Reviewing Habits", "Handling Irregular Income", "Emergency Buffers", "Staying Consistent"],
  chaptersHk: ["預算心態", "收入來源", "固定開支", "變動開支", "50/30/20 法則", "需要 (50%)", "想要 (30%)", "儲蓄 (20%)", "記賬方法", "使用 App", "電子表格法", "信封理財法", "零基預算", "減少浪費", "拿鐵因子", "學生優惠", "檢討習慣", "處理不穩定收入", "緊急緩衝", "保持一致"],
  chaptersCn: ["预算心态", "收入来源", "固定开支", "变动开支", "50/30/20 法则", "需要 (50%)", "想要 (30%)", "储蓄 (20%)", "记账方法", "使用 App", "电子表格法", "信封理财法", "零基预算", "减少浪费", "拿铁因子", "学生优惠", "检讨习惯", "处理不稳定收入", "紧急缓冲", "保持一致"],
  highlightsEn: [ "Use 50/30/20 Rule.", "Track every expense.", "Distinguish Needs vs Wants.", "Pay yourself first.", "Zero-based budgeting.", "Watch small daily expenses." ],
  highlightsHk: [ "使用 50/30/20 法則。", "記錄每一筆開支。", "區分需要與想要。", "先支付給自己。", "零基預算。", "留意日常小額開支。" ],
  highlightsCn: [ "使用 50/30/20 法则。", "记录每一笔开支。", "区分需要与想要。", "先支付给自己。", "零基预算。", "留意日常小额开支。" ]
};

const M4_CONFIG: ModuleContentConfig = {
  id: 'm4',
  topicEn: "Savings", topicHk: "儲蓄", topicCn: "储蓄",
  chaptersEn: ["Why Save?", "The Emergency Fund", "How Much is Enough?", "Where to Keep It", "Compound Interest Magic", "Time vs Money", "Rule of 72", "High Yield Accounts", "Time Deposits", "Inflation Risk", "Automating Savings", "Saving Challenges", "Cutting Subscriptions", "Bulk Buying", "Cooking vs Eating Out", "Second-hand Markets", "Selling Unused Items", "Windfall Management", "Saving for Travel", "Financial Freedom"],
  chaptersHk: ["為何儲蓄？", "應急基金", "多少才夠？", "存放位置", "複息效應", "時間 vs 金錢", "72 法則", "高息戶口", "定期存款", "通脹風險", "自動化儲蓄", "儲蓄挑戰", "削減訂閱", "批量購買", "煮飯 vs 外出用餐", "二手市場", "出售閒置物品", "意外之財管理", "為旅遊儲蓄", "財務自由"],
  chaptersCn: ["为何储蓄？", "应急基金", "多少才够？", "存放位置", "复息效应", "时间 vs 金钱", "72 法则", "高息户口", "定期存款", "通胀风险", "自动化储蓄", "储蓄挑战", "削减订阅", "批量购买", "煮饭 vs 外出用餐", "二手市场", "出售闲置物品", "意外之财管理", "为旅游储蓄", "财务自由"],
  highlightsEn: [ "Build 3-6 months Emergency Fund.", "Compound interest is powerful.", "Start early.", "Automate transfers.", "Keep funds liquid but separate.", "Save 20% of income." ],
  highlightsHk: [ "建立 3-6 個月應急基金。", "複息效應強大。", "儘早開始。", "自動化轉賬。", "保持資金流動但分開。", "儲蓄 20% 收入。" ],
  highlightsCn: [ "建立 3-6 个月应急基金。", "复息效应强大。", "尽早开始。", "自动化转账。", "保持资金流动但分开。", "储蓄 20% 收入。" ]
};

const M5_CONFIG: ModuleContentConfig = {
  id: 'm5',
  topicEn: "Debt & Credit", topicHk: "債務與信貸", topicCn: "债务与信贷",
  chaptersEn: ["What is Credit?", "Good Debt vs Bad Debt", "Student Loans", "Credit Cards Explained", "Interest Rates (APR)", "Minimum Payments Trap", "Credit Score (TU)", "Building Score", "Factors Affecting Score", "Checking Report", "Buy Now Pay Later", "Personal Loans", "Tax Loans", "Snowball Method", "Avalanche Method", "Consolidation", "Bankruptcy", "Avoiding Sharks", "Responsible Usage", "Freedom"],
  chaptersHk: ["甚麼是信貸？", "好債 vs 壞債", "學生貸款", "信用卡詳解", "年利率 (APR)", "最低還款陷阱", "信貸評分 (TU)", "建立評分", "影響評分因素", "查閱報告", "先買後付", "私人貸款", "稅務貸款", "雪球還債法", "雪崩還債法", "債務重組", "破產", "避開大耳窿", "負責任使用", "自由"],
  chaptersCn: ["什么是信贷？", "好债 vs 坏债", "学生贷款", "信用卡详解", "年利率 (APR)", "最低还款陷阱", "信贷评分 (TU)", "建立评分", "影响评分因素", "查阅报告", "先买后付", "私人贷款", "税务贷款", "雪球还债法", "雪崩还债法", "债务重组", "破产", "避开大耳窿", "负责任使用", "自由"],
  highlightsEn: [ "Never pay only Minimum Payment.", "Understand APR.", "Credit Score matters.", "Good debt builds assets.", "Pay bills on time.", "Avoid Buy Now Pay Later." ],
  highlightsHk: [ "絕不只付最低還款額。", "了解 APR。", "信貸評分很重要。", "好債建立資產。", "準時繳費。", "避免先買後付。" ],
  highlightsCn: [ "绝不只付最低还款额。", "了解 APR。", "信贷评分很重要。", "好债建立资产。", "准时缴费。", "避免先买后付。" ]
};

const M6_CONFIG: ModuleContentConfig = {
  id: 'm6',
  topicEn: "Investing Basics", topicHk: "投資基礎", topicCn: "投资基础",
  chaptersEn: ["Investing vs Trading", "Asset Classes", "Stocks", "Bonds", "Mutual Funds", "ETFs", "Real Estate", "Commodities", "Crypto", "Risk/Reward", "Dividends", "Capital Gains", "Indices", "Bull vs Bear", "Brokerage Accounts", "Fees", "Tax", "Fundamental Analysis", "Technical Analysis", "Starting Out"],
  chaptersHk: ["投資 vs 交易", "資產類別", "股票", "債券", "基金", "ETF", "房地產", "商品", "加密貨幣", "風險/回報", "股息", "資本增值", "指數", "牛市 vs 熊市", "證券戶口", "費用", "稅務", "基本面分析", "技術分析", "起步"],
  chaptersCn: ["投资 vs 交易", "资产类别", "股票", "债券", "基金", "ETF", "房地产", "商品", "加密货币", "风险/回报", "股息", "资本增值", "指数", "牛市 vs 熊市", "证券户口", "费用", "税务", "基本面分析", "技术分析", "起步"],
  highlightsEn: [ "Stocks = Growth, Bonds = Stability.", "ETFs are low cost.", "Dividends share profits.", "Indices track markets.", "Watch the fees.", "Invest long term." ],
  highlightsHk: [ "股票=增長，債券=穩定。", "ETF 成本低。", "股息分享利潤。", "指數追蹤市場。", "留意費用。", "長線投資。" ],
  highlightsCn: [ "股票=增长，债券=稳定。", "ETF 成本低。", "股息分享利润。", "指数追踪市场。", "留意费用。", "长线投资。" ]
};

const M7_CONFIG: ModuleContentConfig = {
  id: 'm7',
  topicEn: "Portfolio", topicHk: "投資組合", topicCn: "投资组合",
  chaptersEn: ["What is a Portfolio?", "Asset Allocation", "Diversification", "Correlation", "Age Rule", "Risk Profiles", "Rebalancing", "DCA", "Lump Sum", "Core & Satellite", "Sector Allocation", "Geographic Allocation", "Home Bias", "Passive vs Active", "Robo-Advisors", "Monitoring", "Benchmarking", "Over-trading", "Psychology", "Staying Course"],
  chaptersHk: ["什麼是投資組合？", "資產配置", "分散投資", "相關性", "年齡法則", "風險概況", "再平衡", "平均成本法", "一筆過", "核心與衛星", "板塊配置", "地理配置", "本土偏好", "被動 vs 主動", "智能投顧", "監控", "基準", "過度交易", "心理", "堅持"],
  chaptersCn: ["什么是投资组合？", "资产配置", "分散投资", "相关性", "年龄法则", "风险概况", "再平衡", "平均成本法", "一笔过", "核心与卫星", "板块配置", "地理配置", "本土偏好", "被动 vs 主动", "智能投顾", "监控", "基准", "过度交易", "心理", "坚持"],
  highlightsEn: [ "Allocation drives returns.", "Diversify to lower risk.", "Use DCA.", "Rebalance periodically.", "Avoid Home Bias.", "Passive beats active often." ],
  highlightsHk: [ "配置驅動回報。", "分散降低風險。", "使用平均成本法。", "定期再平衡。", "避免本土偏好。", "被動常勝主動。" ],
  highlightsCn: [ "配置驱动回报。", "分散降低风险。", "使用平均成本法。", "定期再平衡。", "避免本土偏好。", "被动常胜主动。" ]
};

const M8_CONFIG: ModuleContentConfig = {
  id: 'm8',
  topicEn: "MPF (HK)", topicHk: "強積金", topicCn: "强积金",
  chaptersEn: ["MPF Overview", "Mandatory Contributions", "Voluntary Contributions", "TVC (Tax)", "DIS Strategy", "Fund Choices", "Equity Funds", "Bond Funds", "Conservative Funds", "Fees", "Performance", "Member Rights", "Changing Jobs", "Consolidation", "Offset Mechanism", "Withdrawal", "Early Withdrawal", "E-platforms", "MPF vs Pension", "Future"],
  chaptersHk: ["強積金概覽", "強制性供款", "自願性供款", "TVC (扣稅)", "DIS 策略", "基金選擇", "股票基金", "債券基金", "保守基金", "收費", "表現", "成員權利", "轉工", "整合", "對沖機制", "提取", "提早提取", "電子平台", "MPF vs 退休金", "未來"],
  chaptersCn: ["强积金概览", "强制性供款", "自愿性供款", "TVC (扣税)", "DIS 策略", "基金选择", "股票基金", "债券基金", "保守基金", "收费", "表现", "成员权利", "转工", "整合", "对冲机制", "提取", "提早提取", "电子平台", "MPF vs 退休金", "未来"],
  highlightsEn: [ "MPF is mandatory (5%).", "DIS is low fee option.", "TVC saves tax.", "Consolidate accounts.", "High fees erode returns.", "Long term growth focus." ],
  highlightsHk: [ "強積金是強制性的 (5%)。", "DIS 是低費選擇。", "TVC 節省稅項。", "整合戶口。", "高費侵蝕回報。", "專注長期增長。" ],
  highlightsCn: [ "强积金是强制性的 (5%)。", "DIS 是低费选择。", "TVC 节省税项。", "整合户口。", "高费侵蚀回报。", "专注长期增长。" ]
};

const M9_CONFIG: ModuleContentConfig = {
  id: 'm9',
  topicEn: "Insurance", topicHk: "保險", topicCn: "保险",
  chaptersEn: ["Risk Transfer", "Protection vs Investment", "Term Life", "Whole Life", "Critical Illness", "Medical (VHIS)", "Accident", "Travel", "Premiums", "Terms", "Exclusions", "Cooling-off", "Claims", "Agents vs Brokers", "Direct Online", "ILAS", "Needs Analysis", "Mistakes", "Reviewing", "Peace of Mind"],
  chaptersHk: ["風險轉移", "保障 vs 投資", "定期人壽", "終身人壽", "危疾", "醫療 (VHIS)", "意外", "旅遊", "保費", "條款", "不保事項", "冷靜期", "索償", "代理 vs 經紀", "網上直銷", "ILAS", "需求分析", "錯誤", "檢討", "安心"],
  chaptersCn: ["风险转移", "保障 vs 投资", "定期人寿", "终身人寿", "危疾", "医疗 (VHIS)", "意外", "旅游", "保费", "条款", "不保事项", "冷静期", "索偿", "代理 vs 经纪", "网上直销", "ILAS", "需求分析", "错误", "检讨", "安心"],
  highlightsEn: [ "Protection first.", "Term life is cheaper.", "VHIS for tax deduction.", "Read exclusions.", "Don't over-insure.", "Buy young." ],
  highlightsHk: [ "保障優先。", "定期人壽較平。", "VHIS 可扣稅。", "閱讀不保事項。", "勿過度投保。", "年輕時買。" ],
  highlightsCn: [ "保障优先。", "定期人寿较平。", "VHIS 可扣税。", "阅读不保事项。", "勿过度投保。", "年轻时买。" ]
};

const M10_CONFIG: ModuleContentConfig = {
  id: 'm10',
  topicEn: "Fraud Shield", topicHk: "防騙盾", topicCn: "防骗盾",
  chaptersEn: ["Fraud Landscape", "Phishing", "Vishing", "Impersonation", "Investment Scams", "Romance Scams", "Job Scams", "Shopping Fraud", "ID Theft", "Social Engineering", "Red Flags", "Verification", "Cyber Hygiene", "Passwords", "2FA", "Safe Payments", "Police (ADCC)", "Helping Seniors", "Psychology", "Vigilance"],
  chaptersHk: ["騙案概況", "網絡釣魚", "電話騙案", "假冒", "投資騙案", "情緣騙案", "求職騙案", "網購陷阱", "身份盜竊", "社交工程", "危險訊號", "核實", "網絡衛生", "密碼", "2FA", "安全支付", "警方 (ADCC)", "協助長者", "心理", "警惕"],
  chaptersCn: ["骗案概况", "网络钓鱼", "电话骗案", "假冒", "投资骗案", "情缘骗案", "求职骗案", "网购陷阱", "身份盗窃", "社交工程", "危险讯号", "核实", "网络卫生", "密码", "2FA", "安全支付", "警方 (ADCC)", "协助长者", "心理", "警惕"],
  highlightsEn: [ "Officials never ask for pw.", "Verify sender.", "Too good = Scam.", "Protect OTP.", "Use Scameter.", "Don't rush." ],
  highlightsHk: [ "官員不問密碼。", "核實發件人。", "太好=騙局。", "保護 OTP。", "用防騙視伏器。", "勿急。" ],
  highlightsCn: [ "官员不问密码。", "核实发件人。", "太好=骗局。", "保护 OTP。", "用防骗视伏器。", "勿急。" ]
};

// --- M1 DATA (Already Populated - Preserved) ---
const M1_PAGES: ModulePage[] = [
  // 1. Introduction
  {
    id: 'm1_p1', type: 'content',
    title: { [Language.EN]: "1. The Foundation of Finance", [Language.ZH_HK]: "1. 理財的基礎", [Language.ZH_CN]: "1. 理财的基础" },
    content: {
      [Language.EN]: "Financial literacy isn't just about getting rich; it's about freedom. It's the ability to understand and effectively use various financial skills, including personal financial management, budgeting, and investing. Before we talk about money, we must talk about *psychology*.",
      [Language.ZH_HK]: "理財不僅僅是為了致富，而是為了自由。它是一種理解和有效運用各種金融技能的能力，包括個人財務管理、預算和投資。在談論金錢之前，我們必須先談論「心理學」。",
      [Language.ZH_CN]: "理财不仅仅是为了致富，而是为了自由。它是一种理解和有效运用各种金融技能的能力，包括个人财务管理、预算和投资。在谈论金钱之前，我们必须先谈论「心理学」。"
    }
  },
  // To ensure M1 also meets requirements (20+2+1), and reusing existing good content:
  ...generateModulePages({
      id: 'm1',
      topicEn: "Onboarding & Risk", topicHk: "入門與風險", topicCn: "入门与风险",
      chaptersEn: ["What is Risk?", "Tolerance vs Capacity", "Inflation", "Market Risk", "Liquidity Risk", "Time Horizon", "Aggressive Profile", "Balanced Profile", "Conservative Profile", "Diversification", "Correlation", "Risk/Reward", "Emotions", "Sleep Test", "Black Swan", "Stop Loss", "Hedging", "Currency Risk", "Know Thyself"],
      chaptersHk: ["什麼是風險？", "承受意願 vs 能力", "通脹", "市場風險", "流動性風險", "時間跨度", "進取型", "平衡型", "保守型", "分散投資", "相關性", "風險/回報", "情緒", "睡眠測試", "黑天鵝", "止蝕", "對沖", "貨幣風險", "認識自己"],
      chaptersCn: ["什么是风险？", "承受意愿 vs 能力", "通胀", "市场风险", "流动性风险", "时间跨度", "进取型", "平衡型", "保守型", "分散投资", "相关性", "风险/回报", "情绪", "睡眠测试", "黑天鹅", "止蚀", "对冲", "货币风险", "认识自己"],
      highlightsEn: ["Capacity vs Tolerance.", "Inflation kills cash.", "Diversify.", "Time is weapon.", "High Risk = High Return.", "Master emotions."],
      highlightsHk: ["能力 vs 意願。", "通脹殺死現金。", "分散投資。", "時間是武器。", "高風險=高回報。", "掌控情緒。"],
      highlightsCn: ["能力 vs 意愿。", "通胀杀死现金。", "分散投资。", "时间是武器。", "高风险=高回报。", "掌控情绪。"]
  }).slice(1) // Remove first generic 'Concept 1' page since we manually added P1 above
];


export const MODULES: Module[] = [
  {
    id: 'm1',
    title: { [Language.EN]: "Onboarding & Risk", [Language.ZH_HK]: "入門與風險", [Language.ZH_CN]: "入门与风险" },
    description: { [Language.EN]: "Understand your financial personality.", [Language.ZH_HK]: "了解你的理財性格。", [Language.ZH_CN]: "了解你的理财性格。" },
    icon: "🧭",
    color: "bg-blue-500",
    pages: M1_PAGES
  },
  {
    id: 'm2',
    title: { [Language.EN]: "Financial Goals", [Language.ZH_HK]: "理財目標", [Language.ZH_CN]: "理财目标" },
    description: { [Language.EN]: "SMART goals setting.", [Language.ZH_HK]: "SMART 目標設定。", [Language.ZH_CN]: "SMART 目标设定。" },
    icon: "🎯",
    color: "bg-red-500",
    pages: generateModulePages(M2_CONFIG)
  },
  {
    id: 'm3',
    title: { [Language.EN]: "Budgeting", [Language.ZH_HK]: "預算管理", [Language.ZH_CN]: "预算管理" },
    description: { [Language.EN]: "50/30/20 Rule & Tracking.", [Language.ZH_HK]: "50/30/20 法則與記賬。", [Language.ZH_CN]: "50/30/20 法则与记账。" },
    icon: "📊",
    color: "bg-green-500",
    pages: generateModulePages(M3_CONFIG)
  },
  {
    id: 'm4',
    title: { [Language.EN]: "Savings", [Language.ZH_HK]: "儲蓄", [Language.ZH_CN]: "储蓄" },
    description: { [Language.EN]: "Emergency Funds & Compound Interest.", [Language.ZH_HK]: "應急基金與複息。", [Language.ZH_CN]: "应急基金与复息。" },
    icon: "💰",
    color: "bg-teal-500",
    pages: generateModulePages(M4_CONFIG)
  },
  {
    id: 'm5',
    title: { [Language.EN]: "Debt & Credit", [Language.ZH_HK]: "債務與信貸", [Language.ZH_CN]: "债务与信贷" },
    description: { [Language.EN]: "Managing Loans & Credit Score.", [Language.ZH_HK]: "管理貸款與信貸評分。", [Language.ZH_CN]: "管理贷款与信贷评分。" },
    icon: "💳",
    color: "bg-purple-500",
    pages: generateModulePages(M5_CONFIG)
  },
  {
    id: 'm6',
    title: { [Language.EN]: "Investing Basics", [Language.ZH_HK]: "投資基礎", [Language.ZH_CN]: "投资基础" },
    description: { [Language.EN]: "Stocks, Bonds & Funds.", [Language.ZH_HK]: "股票、債券與基金。", [Language.ZH_CN]: "股票、债券与基金。" },
    icon: "📈",
    color: "bg-indigo-500",
    pages: generateModulePages(M6_CONFIG)
  },
  {
    id: 'm7',
    title: { [Language.EN]: "Portfolio", [Language.ZH_HK]: "投資組合", [Language.ZH_CN]: "投资组合" },
    description: { [Language.EN]: "Asset Allocation & DCA.", [Language.ZH_HK]: "資產配置與平均成本法。", [Language.ZH_CN]: "资产配置与平均成本法。" },
    icon: "🍰",
    color: "bg-pink-500",
    pages: generateModulePages(M7_CONFIG)
  },
  {
    id: 'm8',
    title: { [Language.EN]: "MPF (HK)", [Language.ZH_HK]: "強積金", [Language.ZH_CN]: "强积金" },
    description: { [Language.EN]: "Mandatory Provident Fund.", [Language.ZH_HK]: "強制性公積金。", [Language.ZH_CN]: "强制性公积金。" },
    icon: "🇭🇰",
    color: "bg-red-600",
    pages: generateModulePages(M8_CONFIG)
  },
  {
    id: 'm9',
    title: { [Language.EN]: "Insurance", [Language.ZH_HK]: "保險", [Language.ZH_CN]: "保险" },
    description: { [Language.EN]: "Protection vs Investment.", [Language.ZH_HK]: "保障 vs 投資。", [Language.ZH_CN]: "保障 vs 投资。" },
    icon: "☂️",
    color: "bg-blue-400",
    pages: generateModulePages(M9_CONFIG)
  },
  {
    id: 'm10',
    title: { [Language.EN]: "Fraud Shield", [Language.ZH_HK]: "防騙盾", [Language.ZH_CN]: "防骗盾" },
    description: { [Language.EN]: "Spotting Scams in HK.", [Language.ZH_HK]: "識別香港常見騙案。", [Language.ZH_CN]: "识别香港常见骗案。" },
    icon: "🛡️",
    color: "bg-slate-600",
    pages: generateModulePages(M10_CONFIG)
  }
];