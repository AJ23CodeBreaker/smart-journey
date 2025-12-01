import { GameScenario, Language } from '../types';

// Helper to reduce verbosity in this massive file
const en = (t: string) => ({ [Language.EN]: t, [Language.ZH_HK]: t + " (HK)", [Language.ZH_CN]: t + " (CN)" }); 

export const GAMES: { [moduleId: string]: GameScenario } = {
  // --- M1: RISK (8 Steps) ---
  'm1': {
    id: 'm1',
    title: { [Language.EN]: "The Market Rollercoaster", [Language.ZH_HK]: "股市過山車", [Language.ZH_CN]: "股市过山车" },
    intro: { [Language.EN]: "Navigate 8 years of market volatility. Goal: Maximize wealth without panic selling.", [Language.ZH_HK]: "經歷8年的市場波動。目標：在不恐慌拋售的情況下最大化財富。", [Language.ZH_CN]: "经历8年的市场波动。目标：在不恐慌抛售的情况下最大化财富。" },
    totalSteps: 8,
    steps: {
      's1': {
        id: 's1',
        text: { [Language.EN]: "Year 1: You have $100k. How do you start?", [Language.ZH_HK]: "第一年：你有 $100k。你會點開始？", [Language.ZH_CN]: "第一年：你有 $100k。你会怎么开始？" },
        image: "🌱",
        choices: [
          { text: { [Language.EN]: "All in Tech Stocks (High Risk)", [Language.ZH_HK]: "全買科技股 (高風險)", [Language.ZH_CN]: "全买科技股 (高风险)" }, nextStepId: 's2', feedback: { [Language.EN]: "Bold start. High volatility ahead.", [Language.ZH_HK]: "大膽的開始。前面波動很大。", [Language.ZH_CN]: "大胆的开始。前面波动很大。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "60% Stocks / 40% Bonds (Balanced)", [Language.ZH_HK]: "60% 股票 / 40% 債券 (平衡)", [Language.ZH_CN]: "60% 股票 / 40% 债券 (平衡)" }, nextStepId: 's2', feedback: { [Language.EN]: "Solid foundation.", [Language.ZH_HK]: "穩固的基礎。", [Language.ZH_CN]: "稳固的基础。" }, scoreDelta: 10 }
        ]
      },
      's2': {
        id: 's2',
        text: { [Language.EN]: "Year 2: Market crashes 20%! Your portfolio is down.", [Language.ZH_HK]: "第二年：市場暴跌 20%！你的組合下跌。", [Language.ZH_CN]: "第二年：市场暴跌 20%！你的组合下跌。" },
        image: "📉",
        choices: [
          { text: { [Language.EN]: "Panic Sell Everything!", [Language.ZH_HK]: "恐慌拋售！", [Language.ZH_CN]: "恐慌抛售！" }, nextStepId: 's3', feedback: { [Language.EN]: "You locked in losses.", [Language.ZH_HK]: "你鎖定了虧損。", [Language.ZH_CN]: "你锁定了亏损。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Hold & Buy Dip", [Language.ZH_HK]: "持有並趁低吸納", [Language.ZH_CN]: "持有并趁低吸纳" }, nextStepId: 's3', feedback: { [Language.EN]: "Buying cheap assets.", [Language.ZH_HK]: "買入便宜資產。", [Language.ZH_CN]: "买入便宜资产。" }, scoreDelta: 20 }
        ]
      },
      's3': { id: 's3', text: { [Language.EN]: "Year 3: Inflation hits 8%. Cash is losing value.", [Language.ZH_HK]: "第三年：通脹 8%。現金貶值。", [Language.ZH_CN]: "第三年：通胀 8%。现金贬值。" }, image: "💸", choices: [
          { text: { [Language.EN]: "Keep Cash under mattress", [Language.ZH_HK]: "現金放床下底", [Language.ZH_CN]: "现金放床下底" }, nextStepId: 's4', feedback: { [Language.EN]: "Inflation eats your wealth.", [Language.ZH_HK]: "通脹侵蝕你的財富。", [Language.ZH_CN]: "通胀侵蚀你的财富。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Invest in Commodities/Assets", [Language.ZH_HK]: "投資商品/資產", [Language.ZH_CN]: "投资商品/资产" }, nextStepId: 's4', feedback: { [Language.EN]: "Hedge against inflation.", [Language.ZH_HK]: "對沖通脹。", [Language.ZH_CN]: "对冲通胀。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Year 4: A friend tips you a 'Hot Crypto'.", [Language.ZH_HK]: "第四年：朋友推介「熱門加密幣」。", [Language.ZH_CN]: "第四年：朋友推介「热门加密币」。" }, image: "🚀", choices: [
          { text: { [Language.EN]: "Invest 50% of portfolio", [Language.ZH_HK]: "投入 50% 資產", [Language.ZH_CN]: "投入 50% 资产" }, nextStepId: 's5', feedback: { [Language.EN]: "Too risky!", [Language.ZH_HK]: "太冒險！", [Language.ZH_CN]: "太冒险！" }, scoreDelta: -30 },
          { text: { [Language.EN]: "Ignore or put 1%", [Language.ZH_HK]: "忽略或只投 1%", [Language.ZH_CN]: "忽略或只投 1%" }, nextStepId: 's5', feedback: { [Language.EN]: "Safe play.", [Language.ZH_HK]: "安全。", [Language.ZH_CN]: "安全。" }, scoreDelta: 10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Year 5: You get a promotion! Extra $5k/month.", [Language.ZH_HK]: "第五年：升職！每月多 $5k。", [Language.ZH_CN]: "第五年：升职！每月多 $5k。" }, image: "💼", choices: [
          { text: { [Language.EN]: "Lifestyle creep (Spend it)", [Language.ZH_HK]: "生活膨脹 (花掉)", [Language.ZH_CN]: "生活膨胀 (花掉)" }, nextStepId: 's6', feedback: { [Language.EN]: "Zero net worth growth.", [Language.ZH_HK]: "淨資產零增長。", [Language.ZH_CN]: "净资产零增长。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Increase Investment contribution", [Language.ZH_HK]: "增加投資供款", [Language.ZH_CN]: "增加投资供款" }, nextStepId: 's6', feedback: { [Language.EN]: "Accelerating wealth.", [Language.ZH_HK]: "加速財富積累。", [Language.ZH_CN]: "加速财富积累。" }, scoreDelta: 20 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Year 6: Global Recession fears.", [Language.ZH_HK]: "第六年：全球衰退恐慌。", [Language.ZH_CN]: "第六年：全球衰退恐慌。" }, image: "📉", choices: [
          { text: { [Language.EN]: "Stop investing", [Language.ZH_HK]: "停止投資", [Language.ZH_CN]: "停止投资" }, nextStepId: 's7', feedback: { [Language.EN]: "Missing the recovery.", [Language.ZH_HK]: "錯過復甦。", [Language.ZH_CN]: "错过复苏。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "DCA (Keep buying)", [Language.ZH_HK]: "平均成本法 (繼續買)", [Language.ZH_CN]: "平均成本法 (继续买)" }, nextStepId: 's7', feedback: { [Language.EN]: "Discipline wins.", [Language.ZH_HK]: "紀律致勝。", [Language.ZH_CN]: "纪律致胜。" }, scoreDelta: 20 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Year 7: You want to buy a house soon.", [Language.ZH_HK]: "第七年：你想買樓。", [Language.ZH_CN]: "第七年：你想买楼。" }, image: "🏠", choices: [
          { text: { [Language.EN]: "Keep 100% in Stocks", [Language.ZH_HK]: "100% 股票", [Language.ZH_CN]: "100% 股票" }, nextStepId: 's8', feedback: { [Language.EN]: "Risky if market drops before purchase.", [Language.ZH_HK]: "如果買前大跌就危險。", [Language.ZH_CN]: "如果买前大跌就危险。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Shift downpayment to Cash/Bonds", [Language.ZH_HK]: "首期轉現金/債券", [Language.ZH_CN]: "首期转现金/债券" }, nextStepId: 's8', feedback: { [Language.EN]: "Smart duration matching.", [Language.ZH_HK]: "聰明的期限配對。", [Language.ZH_CN]: "聪明的期限配对。" }, scoreDelta: 20 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Year 8: Final Review.", [Language.ZH_HK]: "第八年：最終檢討。", [Language.ZH_CN]: "第八年：最终检讨。" }, image: "🏁", choices: [
          { text: { [Language.EN]: "Finish", [Language.ZH_HK]: "完成", [Language.ZH_CN]: "完成" }, nextStepId: 'win', feedback: { [Language.EN]: "Let's see your score.", [Language.ZH_HK]: "看看分數。", [Language.ZH_CN]: "看看分数。" }, scoreDelta: 0 },
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Journey Complete!", [Language.ZH_HK]: "旅程完成！", [Language.ZH_CN]: "旅程完成！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Busted.", [Language.ZH_HK]: "破產。", [Language.ZH_CN]: "破产。" }, choices: [] }
    }
  },

  // --- M2: GOALS (8 Steps) ---
  'm2': {
    id: 'm2',
    title: { [Language.EN]: "Exchange Trip Mission", [Language.ZH_HK]: "交流團任務", [Language.ZH_CN]: "交流团任务" },
    intro: { [Language.EN]: "Save $20,000 in 8 months for Europe.", [Language.ZH_HK]: "8個月內儲 $20,000 去歐洲。", [Language.ZH_CN]: "8个月内存 $20,000 去欧洲。" },
    totalSteps: 8,
    steps: {
      's1': { id: 's1', text: { [Language.EN]: "Month 1: Set a target.", [Language.ZH_HK]: "第一個月：設定目標。", [Language.ZH_CN]: "第一个月：设定目标。" }, image: "🎯", choices: [
          { text: { [Language.EN]: "Vague 'Save Money'", [Language.ZH_HK]: "模糊的「儲錢」", [Language.ZH_CN]: "模糊的「存钱」" }, nextStepId: 's2', feedback: { [Language.EN]: "Not SMART.", [Language.ZH_HK]: "不 SMART。", [Language.ZH_CN]: "不 SMART。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Specific '$2500/mo'", [Language.ZH_HK]: "具體「每月$2500」", [Language.ZH_CN]: "具体「每月$2500」" }, nextStepId: 's2', feedback: { [Language.EN]: "Good plan.", [Language.ZH_HK]: "好計劃。", [Language.ZH_CN]: "好计划。" }, scoreDelta: 10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Month 2: Part-time job offer. $60/hr.", [Language.ZH_HK]: "第二個月：兼職 $60/hr。", [Language.ZH_CN]: "第二个月：兼职 $60/hr。" }, image: "🔨", choices: [
          { text: { [Language.EN]: "Take it (Weekends)", [Language.ZH_HK]: "做 (週末)", [Language.ZH_CN]: "做 (周末)" }, nextStepId: 's3', feedback: { [Language.EN]: "Income boost.", [Language.ZH_HK]: "增加收入。", [Language.ZH_CN]: "增加收入。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Too tired, reject", [Language.ZH_HK]: "太累，不做", [Language.ZH_CN]: "太累，不做" }, nextStepId: 's3', feedback: { [Language.EN]: "Harder to reach goal.", [Language.ZH_HK]: "難達標。", [Language.ZH_CN]: "难达标。" }, scoreDelta: -10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Month 3: Friends going to expensive K-BBQ ($400).", [Language.ZH_HK]: "第三個月：朋友食韓燒 ($400)。", [Language.ZH_CN]: "第三个月：朋友吃韩烧 ($400)。" }, image: "🍖", choices: [
          { text: { [Language.EN]: "Go (FOMO)", [Language.ZH_HK]: "去 (怕蝕底)", [Language.ZH_CN]: "去 (怕吃亏)" }, nextStepId: 's4', feedback: { [Language.EN]: "Setback.", [Language.ZH_HK]: "退步。", [Language.ZH_CN]: "退步。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Suggest cheap noodles", [Language.ZH_HK]: "提議食米線", [Language.ZH_CN]: "提议吃米线" }, nextStepId: 's4', feedback: { [Language.EN]: "Saved $350.", [Language.ZH_HK]: "慳了 $350。", [Language.ZH_CN]: "省了 $350。" }, scoreDelta: 20 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Month 4: New iPhone released.", [Language.ZH_HK]: "第四個月：新 iPhone 出左。", [Language.ZH_CN]: "第四个月：新 iPhone 出了。" }, image: "📱", choices: [
          { text: { [Language.EN]: "Buy it ($8000)", [Language.ZH_HK]: "買 ($8000)", [Language.ZH_CN]: "买 ($8000)" }, nextStepId: 's5', feedback: { [Language.EN]: "Goal destroyed.", [Language.ZH_HK]: "目標破滅。", [Language.ZH_CN]: "目标破灭。" }, scoreDelta: -50 },
          { text: { [Language.EN]: "Keep old phone", [Language.ZH_HK]: "用舊機", [Language.ZH_CN]: "用旧机" }, nextStepId: 's5', feedback: { [Language.EN]: "Delayed gratification.", [Language.ZH_HK]: "延遲滿足。", [Language.ZH_CN]: "延迟满足。" }, scoreDelta: 20 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Month 5: Halfway check. You are behind.", [Language.ZH_HK]: "第五個月：中期檢查。落後了。", [Language.ZH_CN]: "第五个月：中期检查。落后了。" }, image: "🧐", choices: [
          { text: { [Language.EN]: "Give up", [Language.ZH_HK]: "放棄", [Language.ZH_CN]: "放弃" }, nextStepId: 's6', feedback: { [Language.EN]: "Never give up.", [Language.ZH_HK]: "永不放棄。", [Language.ZH_CN]: "永不放弃。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Adjust budget stricter", [Language.ZH_HK]: "收緊預算", [Language.ZH_CN]: "收紧预算" }, nextStepId: 's6', feedback: { [Language.EN]: "Back on track.", [Language.ZH_HK]: "重回正軌。", [Language.ZH_CN]: "重回正轨。" }, scoreDelta: 20 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Month 6: Textbooks cost $1000.", [Language.ZH_HK]: "第六個月：書費 $1000。", [Language.ZH_CN]: "第六个月：书费 $1000。" }, image: "📚", choices: [
          { text: { [Language.EN]: "Buy new", [Language.ZH_HK]: "買新書", [Language.ZH_CN]: "买新书" }, nextStepId: 's7', feedback: { [Language.EN]: "Expensive.", [Language.ZH_HK]: "貴。", [Language.ZH_CN]: "贵。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Buy second hand", [Language.ZH_HK]: "買二手", [Language.ZH_CN]: "买二手" }, nextStepId: 's7', feedback: { [Language.EN]: "Resourceful.", [Language.ZH_HK]: "精明。", [Language.ZH_CN]: "精明。" }, scoreDelta: 20 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Month 7: Birthday Gift for Mom.", [Language.ZH_HK]: "第七個月：媽媽生日。", [Language.ZH_CN]: "第七个月：妈妈生日。" }, image: "🎂", choices: [
          { text: { [Language.EN]: "DIY Gift (Meaningful)", [Language.ZH_HK]: "DIY 禮物 (有心意)", [Language.ZH_CN]: "DIY 礼物 (有心意)" }, nextStepId: 's8', feedback: { [Language.EN]: "Saves money.", [Language.ZH_HK]: "慳錢。", [Language.ZH_CN]: "省钱。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Expensive Jewelry", [Language.ZH_HK]: "貴重首飾", [Language.ZH_CN]: "贵重首饰" }, nextStepId: 's8', feedback: { [Language.EN]: "Nice but costly.", [Language.ZH_HK]: "好但貴。", [Language.ZH_CN]: "好但贵。" }, scoreDelta: -10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Month 8: Final Count.", [Language.ZH_HK]: "第八個月：最終點算。", [Language.ZH_CN]: "第八个月：最终点算。" }, image: "🏁", choices: [
          { text: { [Language.EN]: "Check Bank", [Language.ZH_HK]: "查戶口", [Language.ZH_CN]: "查户口" }, nextStepId: 'win', feedback: { [Language.EN]: "Results...", [Language.ZH_HK]: "結果...", [Language.ZH_CN]: "结果..." }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Trip Secured!", [Language.ZH_HK]: "旅程確保！", [Language.ZH_CN]: "旅程确保！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Stay Home.", [Language.ZH_HK]: "留在家。", [Language.ZH_CN]: "留在家。" }, choices: [] }
    }
  },

  // --- M3: BUDGET (8 Steps) ---
  'm3': {
    id: 'm3',
    title: { [Language.EN]: "The 8-Day Survival", [Language.ZH_HK]: "8天求生記", [Language.ZH_CN]: "8天求生记" },
    intro: { [Language.EN]: "End of month. $500 HKD left. 8 Days. Can you make it?", [Language.ZH_HK]: "月底。剩 $500。8日。你能撐過去嗎？", [Language.ZH_CN]: "月底。剩 $500。8日。你能撑过去吗？" },
    totalSteps: 8,
    steps: {
      's1': { id: 's1', text: { [Language.EN]: "Day 1: Breakfast.", [Language.ZH_HK]: "Day 1: 早餐。", [Language.ZH_CN]: "Day 1: 早餐。" }, image: "🍳", choices: [
          { text: { [Language.EN]: "Starbucks ($40)", [Language.ZH_HK]: "Starbucks ($40)", [Language.ZH_CN]: "Starbucks ($40)" }, nextStepId: 's2', feedback: { [Language.EN]: "High burn rate.", [Language.ZH_HK]: "高消耗。", [Language.ZH_CN]: "高消耗。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Bread at home ($5)", [Language.ZH_HK]: "家裡吃麵包 ($5)", [Language.ZH_CN]: "家里吃面包 ($5)" }, nextStepId: 's2', feedback: { [Language.EN]: "Good start.", [Language.ZH_HK]: "好開始。", [Language.ZH_CN]: "好开始。" }, scoreDelta: 10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Day 2: Transport. You overslept.", [Language.ZH_HK]: "Day 2: 交通。睡過頭。", [Language.ZH_CN]: "Day 2: 交通。睡过头。" }, image: "🚌", choices: [
          { text: { [Language.EN]: "Taxi ($80)", [Language.ZH_HK]: "的士 ($80)", [Language.ZH_CN]: "的士 ($80)" }, nextStepId: 's3', feedback: { [Language.EN]: "Ouch.", [Language.ZH_HK]: "痛。", [Language.ZH_CN]: "痛。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Late MTR ($10)", [Language.ZH_HK]: "遲到 MTR ($10)", [Language.ZH_CN]: "迟到 MTR ($10)" }, nextStepId: 's3', feedback: { [Language.EN]: "Cheap but boss angry.", [Language.ZH_HK]: "平但老闆嬲。", [Language.ZH_CN]: "平但老板怒。" }, scoreDelta: 5 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Day 3: Lunch with colleagues.", [Language.ZH_HK]: "Day 3: 同事午餐。", [Language.ZH_CN]: "Day 3: 同事午餐。" }, image: "🍜", choices: [
          { text: { [Language.EN]: "Restaurant Set ($70)", [Language.ZH_HK]: "餐廳套餐 ($70)", [Language.ZH_CN]: "餐厅套餐 ($70)" }, nextStepId: 's4', feedback: { [Language.EN]: "Standard.", [Language.ZH_HK]: "標準。", [Language.ZH_CN]: "标准。" }, scoreDelta: -5 },
          { text: { [Language.EN]: "Takeaway Box ($30)", [Language.ZH_HK]: "兩餸飯 ($30)", [Language.ZH_CN]: "两菜饭 ($30)" }, nextStepId: 's4', feedback: { [Language.EN]: "Value choice.", [Language.ZH_HK]: "抵食。", [Language.ZH_CN]: "抵食。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Day 4: Laundry detergent runs out.", [Language.ZH_HK]: "Day 4: 洗衣液用完。", [Language.ZH_CN]: "Day 4: 洗衣液用完。" }, image: "🧺", choices: [
          { text: { [Language.EN]: "Buy Bulk ($60)", [Language.ZH_HK]: "買大枝裝 ($60)", [Language.ZH_CN]: "买大瓶装 ($60)" }, nextStepId: 's5', feedback: { [Language.EN]: "Investment.", [Language.ZH_HK]: "投資。", [Language.ZH_CN]: "投资。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "Borrow Housemate's", [Language.ZH_HK]: "問室友借", [Language.ZH_CN]: "问室友借" }, nextStepId: 's5', feedback: { [Language.EN]: "Free.", [Language.ZH_HK]: "免費。", [Language.ZH_CN]: "免费。" }, scoreDelta: 10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Day 5: Friday Night Drinks.", [Language.ZH_HK]: "Day 5: Happy Hour.", [Language.ZH_CN]: "Day 5: Happy Hour。" }, image: "🍻", choices: [
          { text: { [Language.EN]: "Cocktails ($100+)", [Language.ZH_HK]: "雞尾酒 ($100+)", [Language.ZH_CN]: "鸡尾酒 ($100+)" }, nextStepId: 's6', feedback: { [Language.EN]: "Budget blown.", [Language.ZH_HK]: "預算爆左。", [Language.ZH_CN]: "预算爆了。" }, scoreDelta: -30 },
          { text: { [Language.EN]: "7-11 Drink ($10)", [Language.ZH_HK]: "7仔飲 ($10)", [Language.ZH_CN]: "7-11 喝 ($10)" }, nextStepId: 's6', feedback: { [Language.EN]: "Budget fun.", [Language.ZH_HK]: "平價快樂。", [Language.ZH_CN]: "平价快乐。" }, scoreDelta: 10 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Day 6: Grocery Run.", [Language.ZH_HK]: "Day 6: 買餸。", [Language.ZH_CN]: "Day 6: 买菜。" }, image: "🥦", choices: [
          { text: { [Language.EN]: "Instant Noodles ($20)", [Language.ZH_HK]: "公仔麵 ($20)", [Language.ZH_CN]: "方便面 ($20)" }, nextStepId: 's7', feedback: { [Language.EN]: "Unhealthy but cheap.", [Language.ZH_HK]: "唔健康但平。", [Language.ZH_CN]: "不健康但平。" }, scoreDelta: 5 },
          { text: { [Language.EN]: "Vegetables & Eggs ($50)", [Language.ZH_HK]: "菜同蛋 ($50)", [Language.ZH_CN]: "菜和蛋 ($50)" }, nextStepId: 's7', feedback: { [Language.EN]: "Balanced.", [Language.ZH_HK]: "平衡。", [Language.ZH_CN]: "平衡。" }, scoreDelta: 10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Day 7: Octopus Card negative.", [Language.ZH_HK]: "Day 7: 八達通負錢。", [Language.ZH_CN]: "Day 7: 八达通负钱。" }, image: "💳", choices: [
          { text: { [Language.EN]: "Top up $100", [Language.ZH_HK]: "增值 $100", [Language.ZH_CN]: "增值 $100" }, nextStepId: 's8', feedback: { [Language.EN]: "Necessary.", [Language.ZH_HK]: "必須。", [Language.ZH_CN]: "必须。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "Walk everywhere", [Language.ZH_HK]: "行路", [Language.ZH_CN]: "走路" }, nextStepId: 's8', feedback: { [Language.EN]: "Leg day.", [Language.ZH_HK]: "練腳。", [Language.ZH_CN]: "练脚。" }, scoreDelta: 10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Day 8: Final Balance.", [Language.ZH_HK]: "Day 8: 最終結餘。", [Language.ZH_CN]: "Day 8: 最终结余。" }, image: "🏁", choices: [
          { text: { [Language.EN]: "Check Wallet", [Language.ZH_HK]: "檢查銀包", [Language.ZH_CN]: "检查钱包" }, nextStepId: 'win', feedback: { [Language.EN]: "Did you survive?", [Language.ZH_HK]: "生存到嗎？", [Language.ZH_CN]: "生存到吗？" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Success! You lived.", [Language.ZH_HK]: "成功！你活下來了。", [Language.ZH_CN]: "成功！你活下来了。" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Broke before day 8.", [Language.ZH_HK]: "第8日前破產。", [Language.ZH_CN]: "第8日前破产。" }, choices: [] }
    }
  },

  // --- M4: SAVINGS (8 Steps) ---
  'm4': {
    id: 'm4',
    title: { [Language.EN]: "Murphy's Law", [Language.ZH_HK]: "墨菲定律", [Language.ZH_CN]: "墨菲定律" },
    intro: { [Language.EN]: "Whatever can go wrong, will go wrong. Do you have enough Emergency Fund?", [Language.ZH_HK]: "凡是可能出錯的事，必定會出錯。你有足夠應急錢嗎？", [Language.ZH_CN]: "凡是可能出错的事，必定会出错。你有足够应急钱吗？" },
    totalSteps: 8,
    steps: {
      's1': { id: 's1', text: { [Language.EN]: "Month 1: Toothache. Root canal needed ($4000).", [Language.ZH_HK]: "第一個月：牙痛。杜牙根 ($4000)。", [Language.ZH_CN]: "第一个月：牙痛。根管治疗 ($4000)。" }, image: "🦷", choices: [
          { text: { [Language.EN]: "Use Emergency Fund", [Language.ZH_HK]: "用應急錢", [Language.ZH_CN]: "用应急钱" }, nextStepId: 's2', feedback: { [Language.EN]: "Painful but paid.", [Language.ZH_HK]: "痛但解決了。", [Language.ZH_CN]: "痛但解决了。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Put on Credit Card", [Language.ZH_HK]: "碌卡", [Language.ZH_CN]: "刷卡" }, nextStepId: 's2', feedback: { [Language.EN]: "Debt starts.", [Language.ZH_HK]: "債務開始。", [Language.ZH_CN]: "债务开始。" }, scoreDelta: -10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Month 2: Phone screen smashed.", [Language.ZH_HK]: "第二個月：爆芒。", [Language.ZH_CN]: "第二个月：爆屏。" }, image: "📱", choices: [
          { text: { [Language.EN]: "Fix it ($800)", [Language.ZH_HK]: "維修 ($800)", [Language.ZH_CN]: "维修 ($800)" }, nextStepId: 's3', feedback: { [Language.EN]: "Necessary cost.", [Language.ZH_HK]: "必要開支。", [Language.ZH_CN]: "必要开支。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "Buy new ($8000)", [Language.ZH_HK]: "買新機 ($8000)", [Language.ZH_CN]: "买新机 ($8000)" }, nextStepId: 's3', feedback: { [Language.EN]: "Unnecessary.", [Language.ZH_HK]: "非必要。", [Language.ZH_CN]: "非必要。" }, scoreDelta: -20 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Month 3: Best friend's wedding gift.", [Language.ZH_HK]: "第三個月：死黨結婚人情。", [Language.ZH_CN]: "第三个月：死党结婚人情。" }, image: "👰", choices: [
          { text: { [Language.EN]: "Give $1000", [Language.ZH_HK]: "做 $1000", [Language.ZH_CN]: "做 $1000" }, nextStepId: 's4', feedback: { [Language.EN]: "Standard.", [Language.ZH_HK]: "公價。", [Language.ZH_CN]: "公价。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "Give IOU", [Language.ZH_HK]: "寫欠單", [Language.ZH_CN]: "写欠单" }, nextStepId: 's4', feedback: { [Language.EN]: "Social suicide.", [Language.ZH_HK]: "絕交。", [Language.ZH_CN]: "绝交。" }, scoreDelta: -10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Month 4: Laptop dies.", [Language.ZH_HK]: "第四個月：電腦壞。", [Language.ZH_CN]: "第四个月：电脑坏。" }, image: "💻", choices: [
          { text: { [Language.EN]: "Buy Refurbished ($4000)", [Language.ZH_HK]: "買翻新機 ($4000)", [Language.ZH_CN]: "买翻新机 ($4000)" }, nextStepId: 's5', feedback: { [Language.EN]: "Smart savings.", [Language.ZH_HK]: "聰明慳錢。", [Language.ZH_CN]: "聪明省钱。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Buy Latest Pro ($15000)", [Language.ZH_HK]: "買最新 Pro ($15000)", [Language.ZH_CN]: "买最新 Pro ($15000)" }, nextStepId: 's5', feedback: { [Language.EN]: "Overkill.", [Language.ZH_HK]: "太誇張。", [Language.ZH_CN]: "太夸张。" }, scoreDelta: -30 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Month 5: Lost Octopus Card.", [Language.ZH_HK]: "第五個月：唔見八達通。", [Language.ZH_CN]: "第五个月：不见八达通。" }, image: "💳", choices: [
          { text: { [Language.EN]: "Lost $500", [Language.ZH_HK]: "唔見 $500", [Language.ZH_CN]: "不见 $500" }, nextStepId: 's6', feedback: { [Language.EN]: "Sad.", [Language.ZH_HK]: "慘。", [Language.ZH_CN]: "惨。" }, scoreDelta: -5 },
          { text: { [Language.EN]: "Had Auto-Add Value (Report Loss)", [Language.ZH_HK]: "有自動增值 (報失)", [Language.ZH_CN]: "有自动增值 (报失)" }, nextStepId: 's6', feedback: { [Language.EN]: "Recovered balance.", [Language.ZH_HK]: "取回餘額。", [Language.ZH_CN]: "取回余额。" }, scoreDelta: 20 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Month 6: Bonus Income!", [Language.ZH_HK]: "第六個月：有花紅！", [Language.ZH_CN]: "第六个月：有花红！" }, image: "💵", choices: [
          { text: { [Language.EN]: "Replenish Emergency Fund", [Language.ZH_HK]: "填補應急錢", [Language.ZH_CN]: "填补应急钱" }, nextStepId: 's7', feedback: { [Language.EN]: "Responsible.", [Language.ZH_HK]: "負責任。", [Language.ZH_CN]: "负责任。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Party time", [Language.ZH_HK]: "去玩", [Language.ZH_CN]: "去玩" }, nextStepId: 's7', feedback: { [Language.EN]: "Fund remains empty.", [Language.ZH_HK]: "基金仍然空。", [Language.ZH_CN]: "基金仍然空。" }, scoreDelta: -10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Month 7: Rent Increase.", [Language.ZH_HK]: "第七個月：加租。", [Language.ZH_CN]: "第七个月：加租。" }, image: "🏠", choices: [
          { text: { [Language.EN]: "Cut other expenses", [Language.ZH_HK]: "削減其他開支", [Language.ZH_CN]: "削减其他开支" }, nextStepId: 's8', feedback: { [Language.EN]: "Adapt.", [Language.ZH_HK]: "適應。", [Language.ZH_CN]: "适应。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Move to luxury flat", [Language.ZH_HK]: "搬去豪宅", [Language.ZH_CN]: "搬去豪宅" }, nextStepId: 's8', feedback: { [Language.EN]: "Why?", [Language.ZH_HK]: "點解？", [Language.ZH_CN]: "为什么？" }, scoreDelta: -20 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Month 8: Check Fund Health.", [Language.ZH_HK]: "第八個月：檢查基金健康。", [Language.ZH_CN]: "第八个月：检查基金健康。" }, image: "🌡️", choices: [
          { text: { [Language.EN]: "Review", [Language.ZH_HK]: "檢討", [Language.ZH_CN]: "检讨" }, nextStepId: 'win', feedback: { [Language.EN]: "Did you stay afloat?", [Language.ZH_HK]: "撐得住嗎？", [Language.ZH_CN]: "撑得住吗？" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "You survived the chaos.", [Language.ZH_HK]: "你在混亂中生存了。", [Language.ZH_CN]: "你在混乱中生存了。" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Drowned in unexpected costs.", [Language.ZH_HK]: "淹沒在意外開支中。", [Language.ZH_CN]: "淹没在意外开支中。" }, choices: [] }
    }
  },

  // --- M5: DEBT (8 Steps) ---
  'm5': {
    id: 'm5',
    title: { [Language.EN]: "Escape the Debt Trap", [Language.ZH_HK]: "逃離債務陷阱", [Language.ZH_CN]: "逃离债务陷阱" },
    intro: { [Language.EN]: "You owe $20,000 on Credit Cards (30% APR). Pay it off.", [Language.ZH_HK]: "你欠卡數 $20,000 (年息30%)。還清它。", [Language.ZH_CN]: "你欠卡数 $20,000 (年息30%)。还清它。" },
    totalSteps: 8,
    steps: {
      's1': { id: 's1', text: { [Language.EN]: "Month 1: The strategy.", [Language.ZH_HK]: "第一個月：策略。", [Language.ZH_CN]: "第一个月：策略。" }, image: "📝", choices: [
          { text: { [Language.EN]: "Pay Minimum ($500)", [Language.ZH_HK]: "還 Min Pay ($500)", [Language.ZH_CN]: "还 Min Pay ($500)" }, nextStepId: 's2', feedback: { [Language.EN]: "Interest grows.", [Language.ZH_HK]: "利息增加。", [Language.ZH_CN]: "利息增加。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Pay Aggressively ($2000)", [Language.ZH_HK]: "進取還款 ($2000)", [Language.ZH_CN]: "进取还款 ($2000)" }, nextStepId: 's2', feedback: { [Language.EN]: "Debt shrinking.", [Language.ZH_HK]: "債務減少。", [Language.ZH_CN]: "债务减少。" }, scoreDelta: 20 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Month 2: Sale at favourite store.", [Language.ZH_HK]: "第二個月：愛牌大減價。", [Language.ZH_CN]: "第二个月：爱牌大减价。" }, image: "🛍️", choices: [
          { text: { [Language.EN]: "Buy more on credit", [Language.ZH_HK]: "碌卡買", [Language.ZH_CN]: "刷卡买" }, nextStepId: 's3', feedback: { [Language.EN]: "Digging deeper.", [Language.ZH_HK]: "越陷越深。", [Language.ZH_CN]: "越陷越深。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Ignore sale", [Language.ZH_HK]: "無視", [Language.ZH_CN]: "无视" }, nextStepId: 's3', feedback: { [Language.EN]: "Discipline.", [Language.ZH_HK]: "紀律。", [Language.ZH_CN]: "纪律。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Month 3: Cash advance offer.", [Language.ZH_HK]: "第三個月：現金透支優惠。", [Language.ZH_CN]: "第三个月：现金透支优惠。" }, image: "🏧", choices: [
          { text: { [Language.EN]: "Take cash", [Language.ZH_HK]: "透支", [Language.ZH_CN]: "透支" }, nextStepId: 's4', feedback: { [Language.EN]: "High fees!", [Language.ZH_HK]: "手續費高！", [Language.ZH_CN]: "手续费高！" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Reject", [Language.ZH_HK]: "拒絕", [Language.ZH_CN]: "拒绝" }, nextStepId: 's4', feedback: { [Language.EN]: "Smart.", [Language.ZH_HK]: "聰明。", [Language.ZH_CN]: "聪明。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Month 4: Tax Loan AD ($0 interest*).", [Language.ZH_HK]: "第四個月：稅務貸款廣告 ($0 利息*)。", [Language.ZH_CN]: "第四个月：税务贷款广告 ($0 利息*)。" }, image: "🎣", choices: [
          { text: { [Language.EN]: "Read fine print", [Language.ZH_HK]: "讀細則", [Language.ZH_CN]: "读细则" }, nextStepId: 's5', feedback: { [Language.EN]: "Hidden fees found.", [Language.ZH_HK]: "發現隱藏費用。", [Language.ZH_CN]: "发现隐藏费用。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Apply blindly", [Language.ZH_HK]: "盲目申請", [Language.ZH_CN]: "盲目申请" }, nextStepId: 's5', feedback: { [Language.EN]: "Trapped.", [Language.ZH_HK]: "被困。", [Language.ZH_CN]: "被困。" }, scoreDelta: -10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Month 5: Side hustle opportunity.", [Language.ZH_HK]: "第五個月：副業機會。", [Language.ZH_CN]: "第五个月：副业机会。" }, image: "🛵", choices: [
          { text: { [Language.EN]: "Deliver food", [Language.ZH_HK]: "送外賣", [Language.ZH_CN]: "送外卖" }, nextStepId: 's6', feedback: { [Language.EN]: "Extra cash for debt.", [Language.ZH_HK]: "多賺錢還債。", [Language.ZH_CN]: "多赚钱还债。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Watch Netflix", [Language.ZH_HK]: "睇劇", [Language.ZH_CN]: "看剧" }, nextStepId: 's6', feedback: { [Language.EN]: "No progress.", [Language.ZH_HK]: "無進展。", [Language.ZH_CN]: "无进展。" }, scoreDelta: 0 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Month 6: BNPL (Buy Now Pay Later).", [Language.ZH_HK]: "第六個月：先買後付。", [Language.ZH_CN]: "第六个月：先买后付。" }, image: "⏳", choices: [
          { text: { [Language.EN]: "Use it for luxury", [Language.ZH_HK]: "用來買奢侈品", [Language.ZH_CN]: "用来买奢侈品" }, nextStepId: 's7', feedback: { [Language.EN]: "More debt.", [Language.ZH_HK]: "更多債。", [Language.ZH_CN]: "更多债。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Avoid", [Language.ZH_HK]: "避開", [Language.ZH_CN]: "避开" }, nextStepId: 's7', feedback: { [Language.EN]: "Safe.", [Language.ZH_HK]: "安全。", [Language.ZH_CN]: "安全。" }, scoreDelta: 10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Month 7: Lump sum money from Grandma.", [Language.ZH_HK]: "第七個月：阿婆比零用錢。", [Language.ZH_CN]: "第七个月：阿婆给零用钱。" }, image: "👵", choices: [
          { text: { [Language.EN]: "Pay off debt chunk", [Language.ZH_HK]: "還一大筆債", [Language.ZH_CN]: "还一大笔债" }, nextStepId: 's8', feedback: { [Language.EN]: "Freedom close.", [Language.ZH_HK]: "接近自由。", [Language.ZH_CN]: "接近自由。" }, scoreDelta: 30 },
          { text: { [Language.EN]: "Buy console", [Language.ZH_HK]: "買遊戲機", [Language.ZH_CN]: "买游戏机" }, nextStepId: 's8', feedback: { [Language.EN]: "Priorities wrong.", [Language.ZH_HK]: "搞錯優先次序。", [Language.ZH_CN]: "搞错优先次序。" }, scoreDelta: -20 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Month 8: Final Statement.", [Language.ZH_HK]: "第八個月：最終月結單。", [Language.ZH_CN]: "第八个月：最终月结单。" }, image: "🏁", choices: [
          { text: { [Language.EN]: "Open Envelope", [Language.ZH_HK]: "打開信封", [Language.ZH_CN]: "打开信封" }, nextStepId: 'win', feedback: { [Language.EN]: "Is it $0?", [Language.ZH_HK]: "係咪 $0？", [Language.ZH_CN]: "是不是 $0？" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Debt Free!", [Language.ZH_HK]: "無債一身輕！", [Language.ZH_CN]: "无债一身轻！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Still drowning.", [Language.ZH_HK]: "仍然沉淪。", [Language.ZH_CN]: "仍然沉沦。" }, choices: [] }
    }
  },

  // --- M6: INVESTING BASICS (8 Steps) ---
  'm6': { 
    id: 'm6', 
    title: { [Language.EN]: "Bull vs Bear", [Language.ZH_HK]: "牛市 vs 熊市", [Language.ZH_CN]: "牛市 vs 熊市" }, 
    intro: { [Language.EN]: "Ride the market cycle. Don't let emotions drive you.", [Language.ZH_HK]: "駕馭市場週期。別讓情緒主導。", [Language.ZH_CN]: "驾驭市场周期。别让情绪主导。" }, 
    totalSteps: 8, 
    steps: { 
      's1': { id: 's1', text: { [Language.EN]: "Year 1: Market is flat.", [Language.ZH_HK]: "第一年：市場平淡。", [Language.ZH_CN]: "第一年：市场平淡。" }, image: "😐", choices: [
          { text: { [Language.EN]: "Start Investing", [Language.ZH_HK]: "開始投資", [Language.ZH_CN]: "开始投资" }, nextStepId: 's2', feedback: { [Language.EN]: "Time in market > Timing.", [Language.ZH_HK]: "市場時間 > 捕捉時機。", [Language.ZH_CN]: "市场时间 > 捕捉时机。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Wait for clear signal", [Language.ZH_HK]: "等待明確信號", [Language.ZH_CN]: "等待明确信号" }, nextStepId: 's2', feedback: { [Language.EN]: "Time lost.", [Language.ZH_HK]: "浪費時間。", [Language.ZH_CN]: "浪费时间。" }, scoreDelta: -5 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Year 2: Small gains (5%).", [Language.ZH_HK]: "第二年：小幅上漲 (5%)。", [Language.ZH_CN]: "第二年：小幅上涨 (5%)。" }, image: "📈", choices: [
          { text: { [Language.EN]: "Sell for profit", [Language.ZH_HK]: "獲利離場", [Language.ZH_CN]: "获利离场" }, nextStepId: 's3', feedback: { [Language.EN]: "Too early.", [Language.ZH_HK]: "太早了。", [Language.ZH_CN]: "太早了。" }, scoreDelta: 0 },
          { text: { [Language.EN]: "Reinvest dividends", [Language.ZH_HK]: "股息再投資", [Language.ZH_CN]: "股息再投资" }, nextStepId: 's3', feedback: { [Language.EN]: "Compounding starts.", [Language.ZH_HK]: "複息開始。", [Language.ZH_CN]: "复息开始。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Year 3: Market RALLY! Up 20%.", [Language.ZH_HK]: "第三年：大牛市！升 20%。", [Language.ZH_CN]: "第三年：大牛市！升 20%。" }, image: "🚀", choices: [
          { text: { [Language.EN]: "Borrow money to invest more", [Language.ZH_HK]: "借錢加倉", [Language.ZH_CN]: "借钱加仓" }, nextStepId: 's4', feedback: { [Language.EN]: "Leverage is dangerous.", [Language.ZH_HK]: "槓桿很危險。", [Language.ZH_CN]: "杠杆很危险。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Stick to plan", [Language.ZH_HK]: "按計劃行事", [Language.ZH_CN]: "按计划行事" }, nextStepId: 's4', feedback: { [Language.EN]: "Disciplined.", [Language.ZH_HK]: "有紀律。", [Language.ZH_CN]: "有纪律。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Year 4: Correction. Down 10%.", [Language.ZH_HK]: "第四年：回調。跌 10%。", [Language.ZH_CN]: "第四年：回调。跌 10%。" }, image: "📉", choices: [
          { text: { [Language.EN]: "Sell in fear", [Language.ZH_HK]: "恐慌拋售", [Language.ZH_CN]: "恐慌抛售" }, nextStepId: 's5', feedback: { [Language.EN]: "Buy high sell low.", [Language.ZH_HK]: "高買低賣。", [Language.ZH_CN]: "高买低卖。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Hold", [Language.ZH_HK]: "持有", [Language.ZH_CN]: "持有" }, nextStepId: 's5', feedback: { [Language.EN]: "It's just a correction.", [Language.ZH_HK]: "只是回調。", [Language.ZH_CN]: "只是回调。" }, scoreDelta: 10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Year 5: Boring market.", [Language.ZH_HK]: "第五年：悶市。", [Language.ZH_CN]: "第五年：闷市。" }, image: "💤", choices: [
          { text: { [Language.EN]: "Trade daily for excitement", [Language.ZH_HK]: "頻繁交易尋求刺激", [Language.ZH_CN]: "频繁交易寻求刺激" }, nextStepId: 's6', feedback: { [Language.EN]: "Fees eat profits.", [Language.ZH_HK]: "手續費侵蝕利潤。", [Language.ZH_CN]: "手续费侵蚀利润。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Automate monthly buy", [Language.ZH_HK]: "自動月供", [Language.ZH_CN]: "自动月供" }, nextStepId: 's6', feedback: { [Language.EN]: "Smart.", [Language.ZH_HK]: "聰明。", [Language.ZH_CN]: "聪明。" }, scoreDelta: 10 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Year 6: Bear Market! Crash 40%!", [Language.ZH_HK]: "第六年：熊市！暴跌 40%！", [Language.ZH_CN]: "第六年：熊市！暴跌 40%！" }, image: "🐻", choices: [
          { text: { [Language.EN]: "Sell all to save remaining", [Language.ZH_HK]: "全清倉保本", [Language.ZH_CN]: "全清仓保本" }, nextStepId: 's7', feedback: { [Language.EN]: "Realized huge loss.", [Language.ZH_HK]: "實現巨額虧損。", [Language.ZH_CN]: "实现巨额亏损。" }, scoreDelta: -30 },
          { text: { [Language.EN]: "Buy more (Discount)", [Language.ZH_HK]: "加倉 (大特價)", [Language.ZH_CN]: "加仓 (大特价)" }, nextStepId: 's7', feedback: { [Language.EN]: "Be greedy when others fearful.", [Language.ZH_HK]: "別人恐懼時貪婪。", [Language.ZH_CN]: "别人恐惧时贪婪。" }, scoreDelta: 30 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Year 7: Recovery begins.", [Language.ZH_HK]: "第七年：開始復甦。", [Language.ZH_CN]: "第七年：开始复苏。" }, image: "🌤️", choices: [
          { text: { [Language.EN]: "Wait to break even", [Language.ZH_HK]: "等回本", [Language.ZH_CN]: "等回本" }, nextStepId: 's8', feedback: { [Language.EN]: "Passive.", [Language.ZH_HK]: "被動。", [Language.ZH_CN]: "被动。" }, scoreDelta: 5 },
          { text: { [Language.EN]: "Check asset allocation", [Language.ZH_HK]: "檢查資產配置", [Language.ZH_CN]: "检查资产配置" }, nextStepId: 's8', feedback: { [Language.EN]: "Active management.", [Language.ZH_HK]: "主動管理。", [Language.ZH_CN]: "主动管理。" }, scoreDelta: 10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Year 8: New All Time High.", [Language.ZH_HK]: "第八年：創新高。", [Language.ZH_CN]: "第八年：创新高。" }, image: "🏆", choices: [
          { text: { [Language.EN]: "Check Portfolio", [Language.ZH_HK]: "檢查組合", [Language.ZH_CN]: "检查组合" }, nextStepId: 'win', feedback: { [Language.EN]: "Did you panic?", [Language.ZH_HK]: "你有恐慌嗎？", [Language.ZH_CN]: "你有恐慌吗？" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Investor Mindset!", [Language.ZH_HK]: "投資者思維！", [Language.ZH_CN]: "投资者思维！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Market ate you.", [Language.ZH_HK]: "被市場吞噬。", [Language.ZH_CN]: "被市场吞噬。" }, choices: [] }
    } 
  },

  // --- M7: PORTFOLIO (8 Steps) ---
  'm7': { 
    id: 'm7', 
    title: { [Language.EN]: "The Pizza Portfolio", [Language.ZH_HK]: "薄餅投資組合", [Language.ZH_CN]: "薄饼投资组合" }, 
    intro: { [Language.EN]: "Slice your assets correctly. Don't put all eggs in one basket.", [Language.ZH_HK]: "正確切分資產。別把雞蛋放在同一個籃子裡。", [Language.ZH_CN]: "正确切分资产。别把鸡蛋放在同一个篮子里。" }, 
    totalSteps: 8, 
    steps: { 
      's1': { id: 's1', text: { [Language.EN]: "Step 1: Slice the pie. You are young.", [Language.ZH_HK]: "Step 1: 分餅。你還年輕。", [Language.ZH_CN]: "Step 1: 分饼。你还年轻。" }, image: "🍕", choices: [
          { text: { [Language.EN]: "100% Bonds (Safe)", [Language.ZH_HK]: "100% 債券 (安全)", [Language.ZH_CN]: "100% 债券 (安全)" }, nextStepId: 's2', feedback: { [Language.EN]: "Too conservative.", [Language.ZH_HK]: "太保守。", [Language.ZH_CN]: "太保守。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "80% Stocks / 20% Bonds", [Language.ZH_HK]: "80% 股票 / 20% 債券", [Language.ZH_CN]: "80% 股票 / 20% 债券" }, nextStepId: 's2', feedback: { [Language.EN]: "Good growth potential.", [Language.ZH_HK]: "增長潛力好。", [Language.ZH_CN]: "增长潜力好。" }, scoreDelta: 10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Step 2: Geographic diversification.", [Language.ZH_HK]: "Step 2: 地理分散。", [Language.ZH_CN]: "Step 2: 地理分散。" }, image: "🌏", choices: [
          { text: { [Language.EN]: "Only HK Stocks (Home Bias)", [Language.ZH_HK]: "只買港股 (本土偏好)", [Language.ZH_CN]: "只买港股 (本土偏好)" }, nextStepId: 's3', feedback: { [Language.EN]: "Concentrated risk.", [Language.ZH_HK]: "風險集中。", [Language.ZH_CN]: "风险集中。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Global ETF (US/EU/Asia)", [Language.ZH_HK]: "環球 ETF (美/歐/亞)", [Language.ZH_CN]: "环球 ETF (美/欧/亚)" }, nextStepId: 's3', feedback: { [Language.EN]: "Capture world growth.", [Language.ZH_HK]: "捕捉全球增長。", [Language.ZH_CN]: "捕捉全球增长。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Step 3: Tech sector booms!", [Language.ZH_HK]: "Step 3: 科技板塊大升！", [Language.ZH_CN]: "Step 3: 科技板块大升！" }, image: "💻", choices: [
          { text: { [Language.EN]: "Chase it (Buy more Tech)", [Language.ZH_HK]: "追貨 (加注科技)", [Language.ZH_CN]: "追货 (加注科技)" }, nextStepId: 's4', feedback: { [Language.EN]: "Overweighted.", [Language.ZH_HK]: "比重過高。", [Language.ZH_CN]: "比重过高。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Rebalance (Sell high)", [Language.ZH_HK]: "再平衡 (高位減持)", [Language.ZH_CN]: "再平衡 (高位减持)" }, nextStepId: 's4', feedback: { [Language.EN]: "Buy low sell high.", [Language.ZH_HK]: "高賣低買。", [Language.ZH_CN]: "高卖低买。" }, scoreDelta: 20 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Step 4: Crypto hype.", [Language.ZH_HK]: "Step 4: 加密幣熱潮。", [Language.ZH_CN]: "Step 4: 加密币热潮。" }, image: "🪙", choices: [
          { text: { [Language.EN]: "Add 5% as 'Satellite'", [Language.ZH_HK]: "加 5% 做「衛星」", [Language.ZH_CN]: "加 5% 做「卫星」" }, nextStepId: 's5', feedback: { [Language.EN]: "Core-Satellite strategy.", [Language.ZH_HK]: "核心衛星策略。", [Language.ZH_CN]: "核心卫星策略。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Replace Bonds with Crypto", [Language.ZH_HK]: "用加密幣取代債券", [Language.ZH_CN]: "用加密币取代债券" }, nextStepId: 's5', feedback: { [Language.EN]: "Risk profile broken.", [Language.ZH_HK]: "風險失控。", [Language.ZH_CN]: "风险失控。" }, scoreDelta: -20 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Step 5: Interest rates rise. Bonds fall.", [Language.ZH_HK]: "Step 5: 加息。債券跌。", [Language.ZH_CN]: "Step 5: 加息。债券跌。" }, image: "📉", choices: [
          { text: { [Language.EN]: "Sell Bonds", [Language.ZH_HK]: "賣債券", [Language.ZH_CN]: "卖债券" }, nextStepId: 's6', feedback: { [Language.EN]: "Selling at bottom.", [Language.ZH_HK]: "低位賣出。", [Language.ZH_CN]: "低位卖出。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Hold/Buy more", [Language.ZH_HK]: "持有/加倉", [Language.ZH_CN]: "持有/加仓" }, nextStepId: 's6', feedback: { [Language.EN]: "Yields are higher now.", [Language.ZH_HK]: "現在孳息率更高。", [Language.ZH_CN]: "现在孳息率更高。" }, scoreDelta: 10 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Step 6: You get older (Age 45).", [Language.ZH_HK]: "Step 6: 你老了 (45歲)。", [Language.ZH_CN]: "Step 6: 你老了 (45岁)。" }, image: "👴", choices: [
          { text: { [Language.EN]: "Keep 90% Stocks", [Language.ZH_HK]: "維持 90% 股票", [Language.ZH_CN]: "维持 90% 股票" }, nextStepId: 's7', feedback: { [Language.EN]: "Too risky for age.", [Language.ZH_HK]: "年紀大太搏。", [Language.ZH_CN]: "年纪大太搏。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Increase Bonds %", [Language.ZH_HK]: "增加債券比例", [Language.ZH_CN]: "增加债券比例" }, nextStepId: 's7', feedback: { [Language.EN]: "Glide path.", [Language.ZH_HK]: "下滑軌道。", [Language.ZH_CN]: "下滑轨道。" }, scoreDelta: 10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Step 7: Sudden expense.", [Language.ZH_HK]: "Step 7: 突發開支。", [Language.ZH_CN]: "Step 7: 突发开支。" }, image: "💸", choices: [
          { text: { [Language.EN]: "Sell long-term stocks", [Language.ZH_HK]: "賣長線股票", [Language.ZH_CN]: "卖长线股票" }, nextStepId: 's8', feedback: { [Language.EN]: "Interrupted compounding.", [Language.ZH_HK]: "打斷複息。", [Language.ZH_CN]: "打断复息。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Use Cash Buffer", [Language.ZH_HK]: "用現金緩衝", [Language.ZH_CN]: "用现金缓冲" }, nextStepId: 's8', feedback: { [Language.EN]: "Portfolio intact.", [Language.ZH_HK]: "組合完整。", [Language.ZH_CN]: "组合完整。" }, scoreDelta: 10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Step 8: Final Balance.", [Language.ZH_HK]: "Step 8: 最終結餘。", [Language.ZH_CN]: "Step 8: 最终结余。" }, image: "⚖️", choices: [
          { text: { [Language.EN]: "Check", [Language.ZH_HK]: "檢查", [Language.ZH_CN]: "检查" }, nextStepId: 'win', feedback: { [Language.EN]: "Balanced?", [Language.ZH_HK]: "平衡嗎？", [Language.ZH_CN]: "平衡吗？" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Perfectly Balanced!", [Language.ZH_HK]: "完美平衡！", [Language.ZH_CN]: "完美平衡！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Unbalanced Mess.", [Language.ZH_HK]: "亂七八糟。", [Language.ZH_CN]: "乱七八糟。" }, choices: [] }
    } 
  },

  // --- M8: MPF (8 Steps) ---
  'm8': { 
    id: 'm8', 
    title: { [Language.EN]: "MPF Master", [Language.ZH_HK]: "強積金大師", [Language.ZH_CN]: "强积金大师" }, 
    intro: { [Language.EN]: "Manage your MPF over 40 years. Don't let fees eat your retirement.", [Language.ZH_HK]: "管理強積金40年。別讓收費吃掉退休金。", [Language.ZH_CN]: "管理强积金40年。别让收费吃掉退休金。" }, 
    totalSteps: 8, 
    steps: { 
      's1': { id: 's1', text: { [Language.EN]: "Age 22: First Job. Fill MPF form.", [Language.ZH_HK]: "22歲：第一份工。填 MPF 表。", [Language.ZH_CN]: "22岁：第一份工。填 MPF 表。" }, image: "📝", choices: [
          { text: { [Language.EN]: "Conservative Fund (Low Risk)", [Language.ZH_HK]: "保守基金 (低風險)", [Language.ZH_CN]: "保守基金 (低风险)" }, nextStepId: 's2', feedback: { [Language.EN]: "Growth too slow.", [Language.ZH_HK]: "增長太慢。", [Language.ZH_CN]: "增长太慢。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Equity Fund (High Risk)", [Language.ZH_HK]: "股票基金 (高風險)", [Language.ZH_CN]: "股票基金 (高风险)" }, nextStepId: 's2', feedback: { [Language.EN]: "Capture growth young.", [Language.ZH_HK]: "年輕捕捉增長。", [Language.ZH_CN]: "年轻捕捉增长。" }, scoreDelta: 10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Age 25: Change Job.", [Language.ZH_HK]: "25歲：轉工。", [Language.ZH_CN]: "25岁：转工。" }, image: "💼", choices: [
          { text: { [Language.EN]: "Do nothing (Leave account)", [Language.ZH_HK]: "唔理 (由得個戶口)", [Language.ZH_CN]: "不理 (由得个户口)" }, nextStepId: 's3', feedback: { [Language.EN]: "Too many accounts later.", [Language.ZH_HK]: "遲啲太多戶口。", [Language.ZH_CN]: "迟些太多户口。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Consolidate to Personal Account", [Language.ZH_HK]: "整合至個人戶口", [Language.ZH_CN]: "整合至个人户口" }, nextStepId: 's3', feedback: { [Language.EN]: "Easy management.", [Language.ZH_HK]: "易於管理。", [Language.ZH_CN]: "易于管理。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Age 30: Market Drop.", [Language.ZH_HK]: "30歲：市場下跌。", [Language.ZH_CN]: "30岁：市场下跌。" }, image: "📉", choices: [
          { text: { [Language.EN]: "Switch to Conservative", [Language.ZH_HK]: "轉去保守基金", [Language.ZH_CN]: "转去保守基金" }, nextStepId: 's4', feedback: { [Language.EN]: "Locked in loss.", [Language.ZH_HK]: "鎖定虧損。", [Language.ZH_CN]: "锁定亏损。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Stay in Equity", [Language.ZH_HK]: "留在股票基金", [Language.ZH_CN]: "留在股票基金" }, nextStepId: 's4', feedback: { [Language.EN]: "Ride the wave.", [Language.ZH_HK]: "乘風破浪。", [Language.ZH_CN]: "乘风破浪。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Age 35: High Fees Notice.", [Language.ZH_HK]: "35歲：發現收費高。", [Language.ZH_CN]: "35岁：发现收费高。" }, image: "💸", choices: [
          { text: { [Language.EN]: "Ignore it", [Language.ZH_HK]: "無視", [Language.ZH_CN]: "无视" }, nextStepId: 's5', feedback: { [Language.EN]: "Fees eat 30% of final sum.", [Language.ZH_HK]: "收費吃掉 30%。", [Language.ZH_CN]: "收费吃掉 30%。" }, scoreDelta: -20 },
          { text: { [Language.EN]: "Switch to Low Fee Fund / DIS", [Language.ZH_HK]: "轉低費基金 / DIS", [Language.ZH_CN]: "转低费基金 / DIS" }, nextStepId: 's5', feedback: { [Language.EN]: "Fees matter.", [Language.ZH_HK]: "收費緊要。", [Language.ZH_CN]: "收费紧要。" }, scoreDelta: 20 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Age 45: Tax Season. TVC?", [Language.ZH_HK]: "45歲：稅季。TVC？", [Language.ZH_CN]: "45岁：税季。TVC？" }, image: "🏛️", choices: [
          { text: { [Language.EN]: "Make TVC Contribution", [Language.ZH_HK]: "做 TVC 供款", [Language.ZH_CN]: "做 TVC 供款" }, nextStepId: 's6', feedback: { [Language.EN]: "Save Tax + Save Money.", [Language.ZH_HK]: "慳稅+儲錢。", [Language.ZH_CN]: "省税+存钱。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Spend bonus", [Language.ZH_HK]: "花掉花紅", [Language.ZH_CN]: "花掉花红" }, nextStepId: 's6', feedback: { [Language.EN]: "Missed tax break.", [Language.ZH_HK]: "錯失扣稅。", [Language.ZH_CN]: "错失扣税。" }, scoreDelta: 0 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Age 55: Pre-retirement.", [Language.ZH_HK]: "55歲：準退休。", [Language.ZH_CN]: "55岁：准退休。" }, image: "👓", choices: [
          { text: { [Language.EN]: "100% Equity", [Language.ZH_HK]: "100% 股票", [Language.ZH_CN]: "100% 股票" }, nextStepId: 's7', feedback: { [Language.EN]: "Too risky near end.", [Language.ZH_HK]: "臨尾太博。", [Language.ZH_CN]: "临尾太博。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Start de-risking (Bonds)", [Language.ZH_HK]: "開始減險 (債券)", [Language.ZH_CN]: "开始减险 (债券)" }, nextStepId: 's7', feedback: { [Language.EN]: "Protect capital.", [Language.ZH_HK]: "保護本金。", [Language.ZH_CN]: "保护本金。" }, scoreDelta: 10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Age 60: Early Withdrawal?", [Language.ZH_HK]: "60歲：提早提取？", [Language.ZH_CN]: "60岁：提早提取？" }, image: "🤔", choices: [
          { text: { [Language.EN]: "Withdraw for vacation", [Language.ZH_HK]: "拎去旅行", [Language.ZH_CN]: "拿去旅行" }, nextStepId: 's8', feedback: { [Language.EN]: "Only allowed if leaving HK/Illness.", [Language.ZH_HK]: "除非離港/病，否則唔得。", [Language.ZH_CN]: "除非离港/病，否则不行。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Wait for 65", [Language.ZH_HK]: "等到 65", [Language.ZH_CN]: "等到 65" }, nextStepId: 's8', feedback: { [Language.EN]: "Standard rule.", [Language.ZH_HK]: "標準規則。", [Language.ZH_CN]: "标准规则。" }, scoreDelta: 10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Age 65: Retirement.", [Language.ZH_HK]: "65歲：退休。", [Language.ZH_CN]: "65岁：退休。" }, image: "👴", choices: [
          { text: { [Language.EN]: "Check Balance", [Language.ZH_HK]: "查餘額", [Language.ZH_CN]: "查余额" }, nextStepId: 'win', feedback: { [Language.EN]: "Enjoy retirement.", [Language.ZH_HK]: "享受退休。", [Language.ZH_CN]: "享受退休。" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Golden Nest Egg!", [Language.ZH_HK]: "金蛋！", [Language.ZH_CN]: "金蛋！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Worked til 80.", [Language.ZH_HK]: "做到 80 歲。", [Language.ZH_CN]: "做到 80 岁。" }, choices: [] }
    } 
  },

  // --- M9: INSURANCE (8 Steps) ---
  'm9': { 
    id: 'm9', 
    title: { [Language.EN]: "The Shield", [Language.ZH_HK]: "護身盾", [Language.ZH_CN]: "护身盾" }, 
    intro: { [Language.EN]: "Life is unpredictable. Protect yourself without going broke.", [Language.ZH_HK]: "人生無常。在不破產的情況下保護自己。", [Language.ZH_CN]: "人生无常。在不破产的情况下保护自己。" }, 
    totalSteps: 8, 
    steps: { 
      's1': { id: 's1', text: { [Language.EN]: "Graduate. Agent sells 'Savings Plan'.", [Language.ZH_HK]: "畢業。代理推銷「儲蓄保」。", [Language.ZH_CN]: "毕业。代理推销「储蓄保」。" }, image: "👔", choices: [
          { text: { [Language.EN]: "Buy it ($2000/mo)", [Language.ZH_HK]: "買 ($2000/月)", [Language.ZH_CN]: "买 ($2000/月)" }, nextStepId: 's2', feedback: { [Language.EN]: "Low protection, high cost.", [Language.ZH_HK]: "低保障，高成本。", [Language.ZH_CN]: "低保障，高成本。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Reject, Buy Term Life", [Language.ZH_HK]: "拒絕，買定期人壽", [Language.ZH_CN]: "拒绝，买定期人寿" }, nextStepId: 's2', feedback: { [Language.EN]: "High protection, low cost.", [Language.ZH_HK]: "高保障，低成本。", [Language.ZH_CN]: "高保障，低成本。" }, scoreDelta: 20 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "Planning Trip to Japan.", [Language.ZH_HK]: "去日本旅行。", [Language.ZH_CN]: "去日本旅行。" }, image: "✈️", choices: [
          { text: { [Language.EN]: "Skip Insurance", [Language.ZH_HK]: "唔買保險", [Language.ZH_CN]: "不买保险" }, nextStepId: 's3', feedback: { [Language.EN]: "Risky.", [Language.ZH_HK]: "博。", [Language.ZH_CN]: "博。" }, scoreDelta: -10 },
          { text: { [Language.EN]: "Buy Travel Ins ($200)", [Language.ZH_HK]: "買旅遊保 ($200)", [Language.ZH_CN]: "买旅游保 ($200)" }, nextStepId: 's3', feedback: { [Language.EN]: "Peace of mind.", [Language.ZH_HK]: "安心。", [Language.ZH_CN]: "安心。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "Accident in Japan! Hospital bill $50k.", [Language.ZH_HK]: "日本出意外！醫藥費 $5萬。", [Language.ZH_CN]: "日本出意外！医药费 $5万。" }, image: "🚑", choices: [
          { text: { [Language.EN]: "Claim Insurance", [Language.ZH_HK]: "索償", [Language.ZH_CN]: "索偿" }, nextStepId: 's4', feedback: { [Language.EN]: "Saved $49,800.", [Language.ZH_HK]: "慳返 $49,800。", [Language.ZH_CN]: "省回 $49,800。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Pay from pocket", [Language.ZH_HK]: "自己比", [Language.ZH_CN]: "自己付" }, nextStepId: 's4', feedback: { [Language.EN]: "Savings wiped.", [Language.ZH_HK]: "儲蓄清零。", [Language.ZH_CN]: "储蓄清零。" }, scoreDelta: -30 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "Age 30: Start family.", [Language.ZH_HK]: "30歲：組織家庭。", [Language.ZH_CN]: "30岁：组织家庭。" }, image: "👪", choices: [
          { text: { [Language.EN]: "Increase Life Cover", [Language.ZH_HK]: "增加人壽保額", [Language.ZH_CN]: "增加人寿保额" }, nextStepId: 's5', feedback: { [Language.EN]: "Protect dependents.", [Language.ZH_HK]: "保護家人。", [Language.ZH_CN]: "保护家人。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Keep same", [Language.ZH_HK]: "維持不變", [Language.ZH_CN]: "维持不变" }, nextStepId: 's5', feedback: { [Language.EN]: "Under-insured.", [Language.ZH_HK]: "保障不足。", [Language.ZH_CN]: "保障不足。" }, scoreDelta: -10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "Age 35: Medical Insurance (VHIS).", [Language.ZH_HK]: "35歲：自願醫保 (VHIS)。", [Language.ZH_CN]: "35岁：自愿医保 (VHIS)。" }, image: "🏥", choices: [
          { text: { [Language.EN]: "Buy VHIS with Deductible", [Language.ZH_HK]: "買有墊底費 VHIS", [Language.ZH_CN]: "买有垫底费 VHIS" }, nextStepId: 's6', feedback: { [Language.EN]: "Lower premium.", [Language.ZH_HK]: "保費較低。", [Language.ZH_CN]: "保费较低。" }, scoreDelta: 20 },
          { text: { [Language.EN]: "Buy Top Plan ($0 Deductible)", [Language.ZH_HK]: "買頂級 ($0 墊底)", [Language.ZH_CN]: "买顶级 ($0 垫底)" }, nextStepId: 's6', feedback: { [Language.EN]: "Expensive premium.", [Language.ZH_HK]: "保費貴。", [Language.ZH_CN]: "保费贵。" }, scoreDelta: 0 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "Age 40: Critical Illness Check.", [Language.ZH_HK]: "40歲：危疾檢查。", [Language.ZH_CN]: "40岁：危疾检查。" }, image: "🩺", choices: [
          { text: { [Language.EN]: "Declare 'Smoking' honestly", [Language.ZH_HK]: "誠實申報吸煙", [Language.ZH_CN]: "诚实申报吸烟" }, nextStepId: 's7', feedback: { [Language.EN]: "Policy valid.", [Language.ZH_HK]: "保單有效。", [Language.ZH_CN]: "保单有效。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Hide smoking habit", [Language.ZH_HK]: "隱瞞吸煙", [Language.ZH_CN]: "隐瞒吸烟" }, nextStepId: 's7', feedback: { [Language.EN]: "Fraud. Claim will fail.", [Language.ZH_HK]: "欺詐。索償會失敗。", [Language.ZH_CN]: "欺诈。索偿会失败。" }, scoreDelta: -50 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "Age 50: Review Policies.", [Language.ZH_HK]: "50歲：檢討保單。", [Language.ZH_CN]: "50岁：检讨保单。" }, image: "🧐", choices: [
          { text: { [Language.EN]: "Cancel expired Term Life", [Language.ZH_HK]: "取消過期定期人壽", [Language.ZH_CN]: "取消过期定期人寿" }, nextStepId: 's8', feedback: { [Language.EN]: "Kids grown up, less need.", [Language.ZH_HK]: "仔女大，需求減。", [Language.ZH_CN]: "子女大，需求减。" }, scoreDelta: 10 },
          { text: { [Language.EN]: "Keep paying everything", [Language.ZH_HK]: "繼續供所有", [Language.ZH_CN]: "继续供所有" }, nextStepId: 's8', feedback: { [Language.EN]: "Waste money.", [Language.ZH_HK]: "浪費錢。", [Language.ZH_CN]: "浪费钱。" }, scoreDelta: -5 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "Age 60: Safe & Sound.", [Language.ZH_HK]: "60歲：安然無恙。", [Language.ZH_CN]: "60岁：安然无恙。" }, image: "🛡️", choices: [
          { text: { [Language.EN]: "Relax", [Language.ZH_HK]: "放鬆", [Language.ZH_CN]: "放松" }, nextStepId: 'win', feedback: { [Language.EN]: "Protected.", [Language.ZH_HK]: "受保護。", [Language.ZH_CN]: "受保护。" }, scoreDelta: 0 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "Fully Covered!", [Language.ZH_HK]: "保障全面！", [Language.ZH_CN]: "保障全面！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Financial Ruin.", [Language.ZH_HK]: "財務崩潰。", [Language.ZH_CN]: "财务崩溃。" }, choices: [] }
    } 
  },

  // --- M10: FRAUD (8 Steps) ---
  'm10': {
    id: 'm10',
    title: { [Language.EN]: "Scam City: The Gauntlet", [Language.ZH_HK]: "騙局之城", [Language.ZH_CN]: "骗局之城" },
    intro: { [Language.EN]: "Face 8 different scam attempts. One mistake and you lose.", [Language.ZH_HK]: "面對 8 種不同騙局。錯一次就輸。", [Language.ZH_CN]: "面对 8 种不同骗局。错一次就输。" },
    totalSteps: 8,
    steps: {
      's1': { id: 's1', text: { [Language.EN]: "1. SMS: 'Package delivery failed. Click link.'", [Language.ZH_HK]: "1. SMS:「包裹派送失敗。點擊連結。」", [Language.ZH_CN]: "1. SMS:「包裹派送失败。点击链接。」" }, image: "📦", choices: [
          { text: { [Language.EN]: "Click Link", [Language.ZH_HK]: "點擊", [Language.ZH_CN]: "点击" }, nextStepId: 'lose', feedback: { [Language.EN]: "Phishing! Data stolen.", [Language.ZH_HK]: "釣魚！資料被盜。", [Language.ZH_CN]: "钓鱼！资料被盗。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Delete Message", [Language.ZH_HK]: "刪除訊息", [Language.ZH_CN]: "删除讯息" }, nextStepId: 's2', feedback: { [Language.EN]: "Safe.", [Language.ZH_HK]: "安全。", [Language.ZH_CN]: "安全。" }, scoreDelta: 10 }
      ]},
      's2': { id: 's2', text: { [Language.EN]: "2. Call: '+852 1234'. Voice: 'Immigration Bureau'.", [Language.ZH_HK]: "2. 來電: '+852 1234'。聲稱:「入境處」。", [Language.ZH_CN]: "2. 来电: '+852 1234'。声称:「入境处」。" }, image: "📞", choices: [
          { text: { [Language.EN]: "Press 1 to talk", [Language.ZH_HK]: "按 1 字接聽", [Language.ZH_CN]: "按 1 字接听" }, nextStepId: 'lose', feedback: { [Language.EN]: "Fake official scam.", [Language.ZH_HK]: "假官員騙案。", [Language.ZH_CN]: "假官员骗案。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Hang up", [Language.ZH_HK]: "掛斷", [Language.ZH_CN]: "挂断" }, nextStepId: 's3', feedback: { [Language.EN]: "+852 prefix is fake.", [Language.ZH_HK]: "+852 字頭係假。", [Language.ZH_CN]: "+852 字头是假。" }, scoreDelta: 10 }
      ]},
      's3': { id: 's3', text: { [Language.EN]: "3. WhatsApp: 'Hi, I'm Recruiter. Like videos for cash.'", [Language.ZH_HK]: "3. WhatsApp:「你好，招聘員。讚好影片賺錢。」", [Language.ZH_CN]: "3. WhatsApp:「你好，招聘员。赞好影片赚钱。」" }, image: "👍", choices: [
          { text: { [Language.EN]: "Ask for details", [Language.ZH_HK]: "問詳情", [Language.ZH_CN]: "问详情" }, nextStepId: 'lose', feedback: { [Language.EN]: "Job scam trap.", [Language.ZH_HK]: "求職陷阱。", [Language.ZH_CN]: "求职陷阱。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Block number", [Language.ZH_HK]: "封鎖號碼", [Language.ZH_CN]: "封锁号码" }, nextStepId: 's4', feedback: { [Language.EN]: "Correct.", [Language.ZH_HK]: "正確。", [Language.ZH_CN]: "正确。" }, scoreDelta: 10 }
      ]},
      's4': { id: 's4', text: { [Language.EN]: "4. Dating App: 'Baby, I need money for surgery.'", [Language.ZH_HK]: "4. 交友App:「Baby，我需要錢做手術。」", [Language.ZH_CN]: "4. 交友App:「Baby，我需要钱做手术。」" }, image: "💔", choices: [
          { text: { [Language.EN]: "Send money", [Language.ZH_HK]: "匯錢", [Language.ZH_CN]: "汇钱" }, nextStepId: 'lose', feedback: { [Language.EN]: "Romance scam.", [Language.ZH_HK]: "網上情緣騙案。", [Language.ZH_CN]: "网上情缘骗案。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Report profile", [Language.ZH_HK]: "舉報帳號", [Language.ZH_CN]: "举报账号" }, nextStepId: 's5', feedback: { [Language.EN]: "Heartless but smart.", [Language.ZH_HK]: "無情但聰明。", [Language.ZH_CN]: "无情但聪明。" }, scoreDelta: 10 }
      ]},
      's5': { id: 's5', text: { [Language.EN]: "5. Email: 'Your Netflix payment failed.'", [Language.ZH_HK]: "5. 電郵:「你的 Netflix 付款失敗。」", [Language.ZH_CN]: "5. 电邮:「你的 Netflix 付款失败。」" }, image: "📧", choices: [
          { text: { [Language.EN]: "Click to update card", [Language.ZH_HK]: "點擊更新信用卡", [Language.ZH_CN]: "点击更新信用卡" }, nextStepId: 'lose', feedback: { [Language.EN]: "Credential harvesting.", [Language.ZH_HK]: "盜取資料。", [Language.ZH_CN]: "盗取资料。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Check app directly", [Language.ZH_HK]: "直接開 App 檢查", [Language.ZH_CN]: "直接开 App 检查" }, nextStepId: 's6', feedback: { [Language.EN]: "Verified safely.", [Language.ZH_HK]: "安全核實。", [Language.ZH_CN]: "安全核实。" }, scoreDelta: 10 }
      ]},
      's6': { id: 's6', text: { [Language.EN]: "6. Investment Group: 'Insider tips, 20% weekly return.'", [Language.ZH_HK]: "6. 投資群組:「內幕消息，每週回報 20%。」", [Language.ZH_CN]: "6. 投资群组:「内幕消息，每周回报 20%。」" }, image: "📈", choices: [
          { text: { [Language.EN]: "Join group", [Language.ZH_HK]: "加入群組", [Language.ZH_CN]: "加入群组" }, nextStepId: 'lose', feedback: { [Language.EN]: "Pump and dump.", [Language.ZH_HK]: "唱高散貨。", [Language.ZH_CN]: "唱高散货。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Exit group", [Language.ZH_HK]: "退出群組", [Language.ZH_CN]: "退出群组" }, nextStepId: 's7', feedback: { [Language.EN]: "No such thing as easy money.", [Language.ZH_HK]: "無咁大隻蛤乸隨街跳。", [Language.ZH_CN]: "无咁大只蛤乸随街跳。" }, scoreDelta: 10 }
      ]},
      's7': { id: 's7', text: { [Language.EN]: "7. Second Hand: 'I paid via FPS, check email for proof.'", [Language.ZH_HK]: "7. 二手買賣:「我轉左數，查電郵睇證明。」", [Language.ZH_CN]: "7. 二手买卖:「我转左数，查电邮睇证明。」" }, image: "🧾", choices: [
          { text: { [Language.EN]: "Mail item", [Language.ZH_HK]: "寄貨", [Language.ZH_CN]: "寄货" }, nextStepId: 'lose', feedback: { [Language.EN]: "Fake payment proof.", [Language.ZH_HK]: "假入數紙。", [Language.ZH_CN]: "假入数纸。" }, scoreDelta: -100 },
          { text: { [Language.EN]: "Check bank app balance", [Language.ZH_HK]: "查銀行 App 餘額", [Language.ZH_CN]: "查银行 App 余额" }, nextStepId: 's8', feedback: { [Language.EN]: "Always verify receipt.", [Language.ZH_HK]: "必查收款。", [Language.ZH_CN]: "必查收款。" }, scoreDelta: 10 }
      ]},
      's8': { id: 's8', text: { [Language.EN]: "8. Face-to-Face: 'I lost wallet, give $500 for taxi.'", [Language.ZH_HK]: "8. 街頭:「唔見銀包，借 $500 搭的士。」", [Language.ZH_CN]: "8. 街头:「不见钱包，借 $500 搭的士。」" }, image: "🤥", choices: [
          { text: { [Language.EN]: "Give cash", [Language.ZH_HK]: "比錢", [Language.ZH_CN]: "给钱" }, nextStepId: 'lose', feedback: { [Language.EN]: "Street scam.", [Language.ZH_HK]: "街頭騙案。", [Language.ZH_CN]: "街头骗案。" }, scoreDelta: -50 },
          { text: { [Language.EN]: "Offer to call police", [Language.ZH_HK]: "話幫佢報警", [Language.ZH_CN]: "话帮佢报警" }, nextStepId: 'win', feedback: { [Language.EN]: "Scammer runs away.", [Language.ZH_HK]: "騙徒即走。", [Language.ZH_CN]: "骗徒即走。" }, scoreDelta: 10 }
      ]},
      'win': { id: 'win', text: { [Language.EN]: "You are Scam Proof!", [Language.ZH_HK]: "你百毒不侵！", [Language.ZH_CN]: "你百毒不侵！" }, choices: [] },
      'lose': { id: 'lose', text: { [Language.EN]: "Scammed.", [Language.ZH_HK]: "被騙。", [Language.ZH_CN]: "被骗。" }, choices: [] }
    }
  },
};