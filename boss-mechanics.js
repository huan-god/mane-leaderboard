// 《重返未来：1999》鬃毛邮报全 15 首领 & 焦点闪回 4.1 关卡机制档案（中英双语官方术语）
// 数据核对自灰机 Wiki 与 Fandom Wiki 官方英文条目，提炼场地条件、首领专属被动、配队对策与鉴藏者特版分数阶梯强化。

import { getLang } from './i18n.js';

export const MANE_BOSS_MECHANICS = new Map([
  [
    "神话的遗闻",
    {
      "turns": 15,
      "nameEn": "Eidolon of Avarice",
      "modeTag": "4.1 鉴藏者特版 · 15 回合",
      "modeTagEn": "4.1 Collector's Edition · 15 Rounds",
      "battlefield": "黄金国遗址（3v4）",
      "battlefieldEn": "El Dorado Ruins (3v4)",
      "favoredText": "星 / 木 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Star and Plant Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方群体攻击后获得 1 层[爆发力]（攻击时创伤加成 +25%，生效后消耗 1 层）；攻击时攻击力 -5%。",
        "通用机制：达到 400 万 / 1000 万分时首领获 30% / 100% 暴击防御，[灵感脆弱]期间受克制攻击可取消该暴防并使克制倍率 +15%。"
      ],
      "envRulesEn": [
        "[Ally]: After casting a mass attack, gains 1 stack of [Power Burst] (DMG Bonus +25% when attacking, -1 stack after trigger); ATK -5% when attacking.",
        "Collector's Edition Rule: Reaching 4M / 10M score grants the boss Critical DEF +30% / +100%. While the boss is in [Afflatus Vulnerable], Stronger Afflatus attacks ignore this Critical DEF bonus and gain Stronger Afflatus DMG Multiplier +15%."
      ],
      "passives": [
        {
          "name": "祈愿的残存",
          "desc": "入场及每 3 回合末获得 2 层[尘烟弥漫]（本源受创 -15%、受创减免 +25%，至多 2 层），其余回合末失去 1 层。"
        },
        {
          "name": "黄金源流",
          "desc": "受击后赋予自身 1 层[安定]（受精神创伤减免 +30%，生效后减 1 层），回合末清空全场[安定]。"
        },
        {
          "name": "祝祷的回响",
          "desc": "回合末场上无[指引者]则召唤指引者（入场使双方双防 -15%）；大招后无[传颂者]则召唤传颂者（分摊己方伤害，清空[灵感耐受度]扣 20% 血）。"
        },
        {
          "name": "仪式与控制威胁",
          "desc": "单攻[林中密语]附加 2 回合[缴械]；至终的仪式[安睡于黄金湖底]群攻并追加技能 1。"
        }
      ],
      "passivesEn": [
        {
          "name": "Remnants of Prayer",
          "desc": "When entering battle and at the end of every 3 rounds, gains 2 stacks of [Lingering Dust] (Genesis DMG Taken -15%, DMG Taken Reduction +25%, up to 2 stacks); loses 1 stack at the end of other rounds."
        },
        {
          "name": "Source of Gold",
          "desc": "After being attacked, gains 1 stack of [Stabilize] (when attacked by Mental DMG, DMG Taken Reduction +30%, -1 stack after trigger). Clears all [Stabilize] stacks on the field at the end of the round."
        },
        {
          "name": "Echo of Benediction",
          "desc": "At the end of the round, if no [Guide] is present, summons a [Guide] (reduces Reality DEF and Mental DEF of all units by 15% on entry). After casting Ultimate, if no [Herald] is present, summons a [Herald] (shares damage taken by allies; breaking [Afflatus Guard] deducts 20% HP)."
        },
        {
          "name": "Ultimate & Control Threats",
          "desc": "1-target attack [Whispers in the Woods] inflicts [Disarm] for 2 rounds; Ultimate [Slumber Beneath the Golden Lake] deals mass DMG and triggers an extra Skill 1 cast."
        }
      ],
      "counterTips": [
        "优先选用星 / 木灵感群体攻击主 C 叠满[爆发力]，并用高频多段攻击清理[安定]与快速击破[灵感耐受度]，在[灵感脆弱]窗口内无视暴防爆发。",
        "3000 万分以上务必配备净化或[免疫]辅助应对[缴械]与[眩晕]，破亿档避免在首领持有[尘烟弥漫]时倾泻核心倍率。"
      ],
      "counterTipsEn": [
        "Favor Star or Plant mass-attack carries to stack [Power Burst], strip [Stabilize] stacks with multi-hit attacks, and break [Afflatus Guard] early to burst inside [Afflatus Vulnerable].",
        "At 30M+ thresholds, bring cleanse or [Immunity] support for [Disarm] and [Daze], and avoid unloading peak multipliers while the boss holds [Lingering Dust] at 100M+."
      ],
      "thresholds": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "500万",
          "desc": "[黄金源流]改为每次受击获得 2 层[安定]"
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "1000万",
          "desc": "回合末额外 +1 观测点（加速开大）"
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "3000万",
          "desc": "[倒影之声]攻击后使随机我方[眩晕] 2 回合"
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "5000万",
          "desc": "仪式追加攻击倍率 +600%"
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "7000万",
          "desc": "释放仪式后获得 1 回合[免疫]"
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "1亿",
          "desc": "持有[尘烟弥漫]时受击使对方创伤倍率 -500%"
        }
      ],
      "thresholdsEn": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "5M",
          "desc": "[Source of Gold] now grants 2 stacks of [Stabilize] each time the boss is attacked."
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "10M",
          "desc": "At the end of the round, gains an additional Observation Point +1 (accelerating Ultimate cycles)."
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "30M",
          "desc": "After [Voice of Reflection] attacks, inflicts [Daze] on a random enemy for 2 rounds."
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "50M",
          "desc": "Ultimate follow-up attack DMG Multiplier +600%."
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "70M",
          "desc": "After casting Ultimate, gains [Immunity] for 1 round."
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "100M",
          "desc": "When attacked while holding [Lingering Dust], the attacker's DMG Multiplier -500%."
        }
      ]
    }
  ],
  [
    "思想的表观",
    {
      "turns": 15,
      "nameEn": "Manifestation of Thought",
      "modeTag": "4.1 鉴藏者特版 · 15 回合",
      "modeTagEn": "4.1 Collector's Edition · 15 Rounds",
      "battlefield": "玩具箱·高塔（3v4）",
      "battlefieldEn": "Toybox · The Tower (3v4)",
      "favoredText": "智 / 兽 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Intellect and Beast Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方攻击时仪式威力 -20%；释放至终的仪式后，自身本回合内术法威力 +30%。",
        "通用机制：400 万 / 1000 万分起获 30% / 100% 暴防，打破[灵感耐受度]进入[灵感脆弱]状态后克制攻击可无视该暴防且克制倍率 +15%。"
      ],
      "envRulesEn": [
        "[Ally]: Ultimate Might -20% when attacking; after casting an Ultimate, gains Incantation Might +30% for the current round.",
        "Collector's Edition Rule: Reaching 4M / 10M score grants the boss Critical DEF +30% / +100%. Breaking [Afflatus Guard] into [Afflatus Vulnerable] allows Stronger Afflatus attacks to ignore this Critical DEF bonus and gain Stronger Afflatus DMG Multiplier +15%."
      ],
      "passives": [
        {
          "name": "语义澄清",
          "desc": "受到主动攻击时，攻击方术法威力降低 40%（额外行动 / 非主动追击不受此惩罚）。"
        },
        {
          "name": "言语的边界",
          "desc": "释放仪式后召唤 2 名[碎片化词组]；若此前无词组，赋予我方全体 3 回合[思想传递]（暴击创伤 +30%）。"
        },
        {
          "name": "碎片化词组·求证",
          "desc": "词组受群攻时我方穿透率 +20%；退场时给敌方挂 10 层[燃烧]并给首领挂[语言批判]（回合末扣大额本源伤害）。"
        },
        {
          "name": "隐喻解读 & 护盾",
          "desc": "攻击附带目标已损生命 30% 本源伤；技能 2 给友方套 20% 生命[护盾]；场上无友方时仪式会帮我方回血 60%。"
        }
      ],
      "passivesEn": [
        {
          "name": "Semantic Clarification",
          "desc": "When attacked by an actively cast attack, the attacker's Incantation Might -40% (Extra Actions and non-active follow-ups bypass this penalty)."
        },
        {
          "name": "Boundaries of Language",
          "desc": "After casting Ultimate, summons 2 [Fragmented Phrases]; if none were present beforehand, grants all allies [Transmission of Thought] (Critical DMG +30%) for 3 rounds."
        },
        {
          "name": "Fragmented Phrases · Verification",
          "desc": "When [Fragmented Phrases] are hit by a mass attack, allies gain Penetration Rate +20%. Upon defeat, inflicts 10 stacks of [Burn] on enemies and applies [Linguistic Critique] to the boss (deals heavy Genesis DMG at the end of the round)."
        },
        {
          "name": "Metaphorical Reading & Shields",
          "desc": "Attacks deal additional Genesis DMG equal to 30% of the target's Missing HP; Skill 2 grants allies a [Shield] equal to 20% Max HP; if no boss allies are present, the Ultimate heals your team for 60% HP."
        }
      ],
      "counterTips": [
        "优先选用智 / 兽灵感额外行动与追击主 C 规避[语义澄清]的 40% 主动术法减益，并通过群攻速清[碎片化词组]触发[语言批判]与穿透加成。",
        "高分档须持续清场剥离[护盾]并抑制 3000 万档抗暴叠加，同时紧抓 3 回合[思想传递]暴伤窗口集中输出。"
      ],
      "counterTipsEn": [
        "Prioritize Intellect or Beast Extra Action and follow-up carries to bypass [Semantic Clarification]'s -40% active Incantation Might penalty, sweeping [Fragmented Phrases] to trigger [Linguistic Critique].",
        "Keep clearing summoned phrases after 5M/30M/100M to peel [Shield] layers, suppress Critical Resist stacking, and burst inside the 3-round [Transmission of Thought] window."
      ],
      "thresholds": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "500万",
          "desc": "释放仪式后追加赋予友方 20% 最大生命[护盾]"
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "1000万",
          "desc": "[碎片化词组]离场使首领 +1 观测点"
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "3000万",
          "desc": "场上每有 1 名友方，首领抗暴率 +20%"
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "5000万",
          "desc": "至终的仪式[关于“最终解释权”]倍率 +400%"
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "7000万",
          "desc": "[语言批判]回合末本源伤由 200% 降至 50%"
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "1亿",
          "desc": "1/2 技能均追加召唤 1 名[碎片化词组]并附 20% [护盾]"
        }
      ],
      "thresholdsEn": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "5M",
          "desc": "After casting Ultimate, additionally grants boss allies a 20% Max HP [Shield]."
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "10M",
          "desc": "Each time a [Fragmented Phrase] leaves the field, the boss gains Observation Point +1."
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "30M",
          "desc": "For each ally on the boss's side, the boss gains Critical Resist Rate +20%."
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "50M",
          "desc": "Ultimate [On \"Final Right of Interpretation\"] DMG Multiplier +400%."
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "70M",
          "desc": "[Linguistic Critique] end-of-round Genesis DMG reduced from 200% to 50%."
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "100M",
          "desc": "Both Skill 1 and Skill 2 additionally summon 1 [Fragmented Phrase] and grant a 20% Max HP [Shield]."
        }
      ]
    }
  ],
  [
    "生命的饥馑",
    {
      "turns": 15,
      "nameEn": "Coveter of Eternity",
      "modeTag": "4.1 鉴藏者特版 · 15 回合",
      "modeTagEn": "4.1 Collector's Edition · 15 Rounds",
      "battlefield": "古祝县·梅花树下（3v4）",
      "battlefieldEn": "Guzhu County · Beneath the Plum Tree (3v4)",
      "favoredText": "岩 / 灵 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Mineral and Spirit Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方每拥有 1 点激情，攻击时创伤加成降低 5%（鼓励频繁倾泻至终的仪式，减少憋激情）。",
        "通用机制：400 万 / 1000 万分起获 30% / 100% 暴防，克制打破[灵感耐受度]进入[灵感脆弱]后可无视该暴防且克制倍率 +15%。"
      ],
      "envRulesEn": [
        "[Ally]: For each point of Moxie held, DMG Bonus -5% when attacking (encouraging frequent Ultimate casts rather than hoarding Moxie).",
        "Collector's Edition Rule: Reaching 4M / 10M score grants the boss Critical DEF +30% / +100%. Breaking [Afflatus Guard] into [Afflatus Vulnerable] with Stronger Afflatus attacks ignores this Critical DEF bonus and grants Stronger Afflatus DMG Multiplier +15%."
      ],
      "passives": [
        {
          "name": "吸风饮露（核心破盾）",
          "desc": "回合开始若有友方则全员 +1 层[云翳]（每层受创减免 +10%，至多 5 层）；单回合受 2 次至终的仪式攻击可移除 3 层[云翳]。"
        },
        {
          "name": "野火不尽",
          "desc": "受击时若攻击方持有[护盾]，首领受创减免 +20%；首领开大前会强行给我方套 300% 攻击[护盾] 1 回合。"
        },
        {
          "name": "春风又生 & 长生信徒",
          "desc": "回合末补满 2 名[长生信徒]；信徒受至终的仪式伤害 +80%，每回合改写我方 1 张手牌为[躁动]（留手扣 10% 当前血）。"
        },
        {
          "name": "仪式多段爆发",
          "desc": "技能 2 叠[妙气]，大招按[妙气]层数追加全屏追击，对半血以下角色增伤 +60%，需及时治疗保线。"
        }
      ],
      "passivesEn": [
        {
          "name": "Feed on Wind and Dew",
          "desc": "At the start of the round, if allies are present, all enemy units gain 1 stack of [Cloud Veil] (DMG Taken Reduction +10% per stack, up to 5 stacks). Taking 2 Ultimate attacks in a single round removes 3 stacks of [Cloud Veil]."
        },
        {
          "name": "Unquenchable Wildfire",
          "desc": "When attacked by a target holding a [Shield], the boss gains DMG Taken Reduction +20%. Before casting Ultimate, the boss forces a 1-round [Shield] (300% ATK) onto your team."
        },
        {
          "name": "Spring Breeze Returns & Immortality Devotees",
          "desc": "At the end of the round, replenishes up to 2 [Immortality Devotees]. Devotees take +80% Ultimate DMG and rewrite 1 card in your Spelldock each round into [Restlessness] (holding it deducts 10% Current HP)."
        },
        {
          "name": "Multi-Hit Ultimate Burst",
          "desc": "Skill 2 stacks [Subtle Qi]; the Ultimate triggers extra mass follow-up attacks scaling with [Subtle Qi] stacks and deals +60% DMG to targets below 50% HP, requiring timely healing."
        }
      ],
      "counterTips": [
        "选用岩 / 灵高频仪式队及时倾泻激情以规避憋激情减伤，并确保单回合至少打出 2 次（破亿后 3 次）至终的仪式剥离[云翳]。",
        "避免依赖常驻[护盾]辅助以防触发[野火不尽] 20% 减伤，及时打出被改写的[躁动]废牌并用即时治疗维持半血以上血线。"
      ],
      "counterTipsEn": [
        "Run Mineral or Spirit rapid-Ultimate squads to spend Moxie early and land 2 Ultimates in one round (3 at 100M+) to strip [Cloud Veil] stacks.",
        "Avoid shield-reliant supports that trigger [Unquenchable Wildfire]'s +20% DMG Taken Reduction, play rewritten [Restlessness] cards promptly, and keep HP above 50% with instant heals."
      ],
      "thresholds": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "500万",
          "desc": "受到额外行动普通攻击时抗暴率 +30%、暴防 +30%"
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "1000万",
          "desc": "回合末额外 +1 观测点，2 技能额外 +2 层[妙气]"
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "3000万",
          "desc": "仪式追加攻击额外附带当前生命 15% 本源创伤"
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "5000万",
          "desc": "至终的仪式额外再追加 3 次群体攻击"
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "7000万",
          "desc": "[云翳]减伤效果由每层 +10% 暴涨至 +30%"
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "1亿",
          "desc": "[吸风饮露]改为单回合需 3 次至终的仪式才移除[云翳]"
        }
      ],
      "thresholdsEn": [
        {
          "roman": "I",
          "minScore": 5000000,
          "score": "5M",
          "desc": "When attacked by an Extra Action basic attack, gains Critical Resist Rate +30% and Critical DEF +30%."
        },
        {
          "roman": "II",
          "minScore": 10000000,
          "score": "10M",
          "desc": "At the end of the round, gains Observation Point +1, and Skill 2 grants +2 extra stacks of [Subtle Qi]."
        },
        {
          "roman": "III",
          "minScore": 30000000,
          "score": "30M",
          "desc": "Ultimate follow-up attacks deal additional Genesis DMG equal to 15% of the target's Current HP."
        },
        {
          "roman": "IV",
          "minScore": 50000000,
          "score": "50M",
          "desc": "Ultimate triggers 3 additional mass attacks."
        },
        {
          "roman": "V",
          "minScore": 70000000,
          "score": "70M",
          "desc": "[Cloud Veil] DMG Taken Reduction rises from +10% to +30% per stack."
        },
        {
          "roman": "VI",
          "minScore": 100000000,
          "score": "100M",
          "desc": "[Feed on Wind and Dew] now requires 3 Ultimate attacks in a single round to remove [Cloud Veil]."
        }
      ]
    }
  ],
  [
    "子弹的冬年",
    {
      "turns": 20,
      "nameEn": "The Bullet-Torn Winter",
      "modeTag": "4.0 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "4.0 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "红柳树村·战场（3v4）",
      "battlefieldEn": "Red Willow Village · Battlefield (3v4)",
      "favoredText": "星 / 兽 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Star and Beast Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方攻击时攻击力 +5%，术法威力 -15%，仪式威力 -15%。",
        "非克制攻击会触发首领 100% 暴击防御；每轮隐匿度清空可触发[目击回合]（敌方无法主动行动、延长回合上限并获额外积分，至多 4 次）。"
      ],
      "envRulesEn": [
        "[Ally]: When attacking, ATK +5%, Incantation Might -15%, and Ultimate Might -15%.",
        "When attacked by a non-Stronger Afflatus, the boss gains Critical DEF +100%. Reducing Obscurity to 0 grants the allied side [Witness Round] (enemies cannot take active actions, battle round limit increases, and additional points are scored, up to 4 times)."
      ],
      "passives": [
        {
          "name": "败露（目击条件）",
          "desc": "受击隐匿度 -2（限 5 次），克制 -3（限 2 次），群攻 -4（限 4 次），免疫[控制]转为隐匿度 -10；优先高频群攻快速破隐。"
        },
        {
          "name": "增援与同仇敌忾",
          "desc": "回合末获得 3 层[同仇敌忾]（抗暴 +10%、由友方分摊伤害），移除[最后的忠诚]并召唤 2 只[凛冬的忠犬]。"
        },
        {
          "name": "会师·阵线进度",
          "desc": "忠犬退场赋予首领[最后的忠诚]（减伤 / 暴防 +20%）；[阵线]满时清空友方并召出强化[隆冬的戎卒]开场直接冲锋大招。"
        }
      ],
      "passivesEn": [
        {
          "name": "Exposed",
          "desc": "After being attacked, Obscurity -2 (up to 5 times per round); Stronger Afflatus attack -3 (up to 2 times); mass attack -4 (up to 4 times); immune to [Control] effects, which decrease Obscurity by 10 instead. High-frequency mass attacks rapidly trigger [Witness Round]."
        },
        {
          "name": "Reinforcements & Shared Hatred",
          "desc": "At the end of the round, gains 3 stacks of [Shared Hatred] (Critical Resist Rate +10%, damage shared by allies), removes [Final Loyalty], and summons 2 [Loyal Hounds of Bitter Winter]."
        },
        {
          "name": "Rendezvous · Frontline Progress",
          "desc": "When a [Loyal Hound of Bitter Winter] retreats, grants the boss [Final Loyalty] (DMG Taken Reduction +20%, Critical DEF +20%). When [Frontline] fills, clears allies and summons an enhanced [Winter Vanguard] that immediately unleashes its Ultimate."
        }
      ],
      "counterTips": [
        "配置星 / 兽高频群体攻击阵容快速削减隐匿度，尽早打满 4 次[目击回合]延长战局并绕开 100% 非克制暴防。",
        "控制[凛冬的忠犬]击杀节奏以压缩[最后的忠诚]覆盖率，并在[阵线]蓄满召出[隆冬的戎卒]前预留治疗或减伤稳住血线。"
      ],
      "counterTipsEn": [
        "Deploy Star or Beast high-frequency mass attackers to shred Obscurity rapidly, unlocking all 4 [Witness Round] extensions while bypassing non-Stronger Critical DEF.",
        "Time defeats of [Loyal Hounds of Bitter Winter] to minimize [Final Loyalty] uptime, and hold healing or mitigation before [Frontline] fills and summons [Winter Vanguard]."
      ]
    }
  ],
  [
    "急性猩红症·Ⅱ型",
    {
      "turns": 20,
      "nameEn": "Insatiable Bloodsucker Type II",
      "modeTag": "3.9 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.9 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "自然灵感（兽/木/星/岩）角色攻击、双防、生命 +20%",
      "favoredTextEn": "Natural Afflatus (Beast / Plant / Star / Mineral) characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "全体单位释放至终的仪式后，驱散自身[状态异常]（可用开大及时清掉[溶血]与[中毒]）。",
        "本首领采用[灵感耐受度]击破机制，单次受伤害上限为 60 段生命。"
      ],
      "envRulesEn": [
        "After any unit casts an Ultimate, dispels [Neg Status] from self (use Ultimates promptly to cleanse [Hemolysis] and [Poison]).",
        "Uses [Afflatus Guard] break mechanics; any single instance of damage taken is capped at 60 HP segments."
      ],
      "passives": [
        {
          "name": "满席夜宴·猩红卫护",
          "desc": "回合初清零剩余[猩红卫护]并按层数给我方挂全体[中毒]，随后重获 3~6 层[猩红卫护]（受普通咒语抗暴 / 减伤 +10%）；每次受击剥 1 层。"
        },
        {
          "name": "无尽子嗣",
          "desc": "开大后召唤 2 名[渴血患者·Ⅱ型]；回合初每有 1 名友方获得 1 层[安定]（受精神创伤减免 +30%）。"
        },
        {
          "name": "溶血与破防窗口",
          "desc": "小技能叠加[溶血]（创伤加成 -20%、受创减免 -10%，至多 10 层）；首领释放大招后自身双防 -40% 持续 1 回合，是爆发窗口。"
        }
      ],
      "passivesEn": [
        {
          "name": "Midnight Banquet",
          "desc": "At the start of the round, removes all [Crimson Protection] held and inflicts an equivalent number of [Poison] instances on all enemies for 2 rounds. Afterward, gains 3 stacks of [Crimson Protection] (+1/+3 stacks when strengthened 1/2 times; +10% Critical Resist Rate and +10% DMG Taken Reduction vs. basic incantations). After being attacked, removes 1 stack of [Crimson Protection]."
        },
        {
          "name": "Endless Thralls",
          "desc": "After casting an Ultimate, summons 2 [Bloodthirsty Thralls Type II] (up to 2). At the start of the round, for each other allied unit present, gains 1 stack of [Stabilize] (when attacked by Mental DMG, DMG Taken Reduction +30%, -1 stack after trigger)."
        },
        {
          "name": "Hemolysis & Defense Break Window",
          "desc": "Skills [Crimson Seep] and [Vampiric Embrace] inflict [Hemolysis] (DMG Bonus -20%, DMG Taken Reduction -10%, Genesis DMG Dealt -20%, up to 10 stacks). Casting Ultimate [The Banquet Commences] inflicts Reality DEF -40% and Mental DEF -40% on self for 1 round, opening the burst window."
        }
      ],
      "counterTips": [
        "利用自然灵感多段攻击在回合内打空[猩红卫护]以压低[中毒]层数，并错峰释放至终的仪式借助场地规则自动净化[溶血]与[中毒]。",
        "优先清理[渴血患者·Ⅱ型]减少[安定]层数，将核心输出集中倾泻在首领开大后自身双防 -40% 的 1 回合破防窗口。"
      ],
      "counterTipsEn": [
        "Use Natural Afflatus multi-hit attacks to strip [Crimson Protection] before round end to curb [Poison], and stagger Ultimates to auto-cleanse [Hemolysis] and [Poison].",
        "Clear [Bloodthirsty Thralls Type II] to cut [Stabilize] stacks, and align main burst turns with the 1-round -40% Reality/Mental DEF window after the boss's Ultimate."
      ]
    }
  ],
  [
    "太阳的宠臣",
    {
      "turns": 20,
      "nameEn": "The Sun's Thrall",
      "modeTag": "3.8 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.8 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "星 / 岩 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Star and Mineral Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方术法威力 -40%；释放治疗咒语后，使己方全体术法威力 +50%、仪式威力 +30%，持续 2 回合（高频治疗不断档是核心）。"
      ],
      "envRulesEn": [
        "[Ally]: Incantation Might -40%. After casting a Heal incantation, grants all allies Incantation Might +50% and Ultimate Might +30% for 2 rounds (maintaining frequent healing uptime is critical)."
      ],
      "passives": [
        {
          "name": "未褪色的（目击条件）",
          "desc": "受击隐匿度 -2，克制 -3，免疫[控制]转 -10，受[术具]攻击隐匿度 -5（每回合限 3 次），清空隐匿度进[目击回合]。"
        },
        {
          "name": "将归来的",
          "desc": "首领受到主动行动攻击时视为被克制（可触发克制增伤与破暴防）；1 次提升后回合末额外 +1 观测点。"
        },
        {
          "name": "尚闪耀的·仰望",
          "desc": "回合初给我方全体挂 1~3 层[仰望]（术法 / 仪式 / 本源均 -15%，至多 5 层，不可驱散），顶着[仰望]攻击还会向队友扩散 1 层并削减自身 2 层。"
        }
      ],
      "passivesEn": [
        {
          "name": "What Hasn't Faded",
          "desc": "After being attacked, Obscurity -2 (up to 5 times per round); Stronger Afflatus attack -3 (up to 2 times); immune to [Control] effects (-10 Obscurity instead); when attacked by a [Conduit], Obscurity -5 (up to 3 times per round). When Obscurity reaches 0, grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "What Will Resurface",
          "desc": "When being actively attacked, the attack counts as a Stronger Afflatus attack (triggering Stronger Afflatus bonus and bypassing non-Stronger Critical DEF). When abilities have been strengthened 1 time, gains Observation Point +1 at the end of the round."
        },
        {
          "name": "What Still Glitters",
          "desc": "At the start of the round, removes and inflicts 1/2/3 stacks of [Skyward Gaze] (Incantation Might -15%, Ultimate Might -15%, Genesis DMG Dealt -15%, up to 5 stacks, undispellable) on all enemies. Attacking while afflicted with [Skyward Gaze] spreads 1 stack to all allies before removing 2 stacks from the attacker."
        }
      ],
      "counterTips": [
        "绑定星 / 岩高频治疗位每 2 回合内必出治疗咒语覆盖全队术法 +50% / 仪式 +30% 增益，优先搭配[术具]体系加速破隐进入[目击回合]。",
        "多以主动攻击触发[将归来的]强制克制判定，并合理安排出手顺序剥离[仰望]层数，防止主 C 输出被大幅稀释。"
      ],
      "counterTipsEn": [
        "Pair Star or Mineral carries with a frequent healer to maintain the 2-round +50% Incantation / +30% Ultimate Might buff, and leverage [Conduit] attacks to accelerate [Witness Round].",
        "Use active attacks to trigger [What Will Resurface]'s forced Stronger Afflatus bonus, and sequence turns carefully so [Skyward Gaze] stacks do not cripple your Main DPS."
      ]
    }
  ],
  [
    "旧日的荣耀",
    {
      "turns": 20,
      "nameEn": "Glory Days Manifest",
      "modeTag": "3.7 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.7 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "岩 / 灵 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Mineral and Spirit Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方攻击前若持有 5 种[属性提升]或[状态增益]，本次攻击视为克制；持有 8 种及以上时，克制系数额外 +10%（多 Buff 堆叠收益极高）。"
      ],
      "envRulesEn": [
        "[Ally]: Before attacking, if holding 5 types of [Stats Up] or [Pos Status], this attack is considered to be of a Stronger Afflatus. Before attacking, if holding 8 types of [Stats Up] or [Pos Status], Stronger Afflatus DMG Multiplier +10%."
      ],
      "passives": [
        {
          "name": "不屈者反击（目击条件）",
          "desc": "受持有 6 / 8 种以上[属性提升]或[状态增益]单位攻击时隐匿度额外 -3 / -6（每回合限 6 次），配合免疫[控制]（-10）可快速打入[目击回合]。"
        },
        {
          "name": "重义者偏执",
          "desc": "攻击增益少于 8 / 6 种的目标时穿透率 +10% / 20%；首领若本回合未行动会叠[郁愤]（双防与抗暴率 -5%，至多 5 层）。"
        },
        {
          "name": "殉道者矢志",
          "desc": "友方退场时首领获得[据守]（暴击防御 +3%，至多 10 层），需兼顾单体集火与增益覆盖。"
        }
      ],
      "passivesEn": [
        {
          "name": "Counterattack of the Unyielding",
          "desc": "After being attacked, Obscurity -2 (up to 5/round); Stronger Afflatus -3 (up to 2/round); [Control] effects -10. When attacked by a unit with more than 6/8 types of [Stats Up] or [Pos Status], Obscurity -3/-6 (up to 6 times per round). Reaching 0 Obscurity triggers [Witness Round] (up to 4 times)."
        },
        {
          "name": "Persistence of the Righteous",
          "desc": "When attacking a target with fewer than 6/8 [Stats Up] or [Pos Status] effects, Penetration Rate +10%/+20%. At the end of the round, if this unit has not acted, gains 1 stack of [Indignation] (Mental DEF -5%, Reality DEF -5%, Critical Resist Rate -5%, up to 5 stacks)."
        },
        {
          "name": "Vow of the Martyrs",
          "desc": "When an ally dies, gains 1 stack of [Entrenched] (Critical DEF +3%, up to 10 stacks)."
        }
      ],
      "counterTips": [
        "围绕岩 / 灵主 C 搭配多增益拐常驻 8 种以上[属性提升]与[状态增益]，同时吃满克制系数 +10%、极速削隐进[目击回合]并压低首领穿透率。",
        "优先采用单体集火直击首领本体而非反复击杀小怪，避免叠满[据守]导致暴击防御持续攀升。"
      ],
      "counterTipsEn": [
        "Build Mineral or Spirit squads around multi-buff supports to maintain 8+ distinct [Stats Up] / [Pos Status] effects, maximizing Stronger Afflatus DMG, Obscurity shred, and defense.",
        "Focus 1-target damage on the boss instead of farming adds so [Vow of the Martyrs] does not stack [Entrenched] Critical DEF."
      ]
    }
  ],
  [
    "自我同情者",
    {
      "turns": 20,
      "nameEn": "The Self-Pitying Avenger",
      "modeTag": "S02 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "S02 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "星 / 岩 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Star and Mineral Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方现实创伤角色创伤加成 +50%，精神创伤角色创伤加成 -50%（强推现实创伤主 C）。",
        "受到治疗咒语影响后减少 1 回合[心念动摇]（回合末扣 10% 最大生命，不可驱散，每回合至多触发 1 次）。"
      ],
      "envRulesEn": [
        "[Ally]: Reality DMG characters gain DMG Bonus +50%; Mental DMG characters gain DMG Bonus -50%.",
        "[Ally]: After being healed by a Heal incantation, reduces the duration of [Shaken Resolve] by 1 round (triggers once per round; [Shaken Resolve] deducts 10% Max HP at end of round and is undispellable)."
      ],
      "passives": [
        {
          "name": "声势浩大·灵薄体",
          "desc": "入场获 1 层[灵薄体]（抗暴 / 暴防 +40%、本源受创 -40%，至多 2 层），每回合按层数叠[振声宣告]，满 5 层追加额外攻击。"
        },
        {
          "name": "捏造助理",
          "desc": "回合末轮流召唤小怪；若场上无小怪则同时召出 2 只并使首领失去 1 层[灵薄体]（清小怪可有效剥壳）。"
        },
        {
          "name": "失声（弱点切换）",
          "desc": "打破[灵感耐受度]进入[灵感脆弱]时损失生命并缩短我方[心念动摇] 1 回合；2 回合恢复后在星 / 岩薄弱点间切换。"
        }
      ],
      "passivesEn": [
        {
          "name": "Overwhelming Momentum",
          "desc": "When entering battle, gains 1 stack of [Limbo Form] (Critical Resist Rate +40%, Critical DEF +40%, Genesis DMG Taken -40%, up to 2 stacks). At the start of each round, gains 1 stack of [Resonant Proclamation] per [Limbo Form] stack; at 5 stacks, consumes 5 stacks to perform an additional attack."
        },
        {
          "name": "Manufactured Assistant",
          "desc": "At the end of the round, alternates between summoning Distorted Perspectives and Agitated Emotions. If no allies remain, summons both instead and loses 1 stack of [Limbo Form]."
        },
        {
          "name": "Voiceless",
          "desc": "When breaking [Afflatus Guard] into [Afflatus Vulnerable], loses HP, reduces the duration of [Shaken Resolve] on enemies by 1 round, and recovers after 2 rounds, switching Afflatus Weakness between Star and Mineral."
        }
      ],
      "counterTips": [
        "严格选用星 / 岩现实创伤主 C 吃满场地 +50% 现实创伤加成，并每回合穿插治疗咒语缩短不可驱散的[心念动摇]。",
        "先用群攻清空小怪触发[捏造助理]剥离[灵薄体]高额抗暴 / 暴防，再击破[灵感耐受度]在[灵感脆弱]窗口全力爆发。"
      ],
      "counterTipsEn": [
        "Field Star or Mineral Reality DMG carries to claim the +50% DMG Bonus, and weave Heal incantations each round to shave down [Shaken Resolve] duration.",
        "Sweep summoned adds to force [Manufactured Assistant] to strip [Limbo Form], then break [Afflatus Guard] to burst during [Afflatus Vulnerable]."
      ]
    }
  ],
  [
    "超限的囚徒·Ⅱ型",
    {
      "turns": 20,
      "nameEn": "Captive of Transcendentality Type II",
      "modeTag": "3.6 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.6 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "灵 / 智 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Spirit and Intellect Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方回合开始若处于[术阵]中，获得 10 层[礼仪]（每层仪式威力 +3%，至多 100 层，释放至终的仪式后消耗）。"
      ],
      "envRulesEn": [
        "[Ally]: At the start of the round, if under an [Array], gains 10 stacks of [Ceremonious] (Ultimate Might +3% per stack, up to 100 stacks, disappears after casting an Ultimate)."
      ],
      "passives": [
        {
          "name": "有问无答",
          "desc": "回合末给我方挂 3 层[回答]（术法 / 仪式威力 -5%，至多 20 层）；受群攻移除攻击者 1 层，受单攻移除 2 层。"
        },
        {
          "name": "多重顾问的桎梏",
          "desc": "首领每回合末自叠 5~15 层[礼仪]强化大招；受到单体至终的仪式攻击后失去 5 层[礼仪]。"
        },
        {
          "name": "意识干涉 & 控场",
          "desc": "我方单次掉血每满 25% 叠[麻痹] / [洗脑]（最大生命 -20%）；大招附[思辨]（创伤加成 -200% 但主动出牌激情 +1）。"
        }
      ],
      "passivesEn": [
        {
          "name": "Answer No Questions",
          "desc": "At the end of the round, inflicts 3 stacks of [Answer] (Incantation Might -5%, Ultimate Might -5%, up to 20 stacks) on all enemies. After being attacked by a mass / 1-target attack, removes 1 / 2 stacks of [Answer] from the attacker."
        },
        {
          "name": "Shackles of Multiple Advisors",
          "desc": "At the end of the round, gains 5 stacks of [Ceremonious] (+5/+10 additional stacks when strengthened 1/2 times). After being attacked by a 1-target Ultimate, loses 5 stacks of [Ceremonious]."
        },
        {
          "name": "Consciousness Interference",
          "desc": "When attacking, for every 25% Max HP lost to the attack, inflicts 1 stack of [Paralyze] and [Brainwash] (Max HP -20%). Ultimate [Self-Referential Paradox] inflicts [Speculate] (DMG Bonus -200%; after actively casting an incantation, Moxie +1) for 1 round."
        }
      ],
      "counterTips": [
        "围绕灵 / 智灵感搭建常驻[术阵]仪式队每回合稳定叠 10 层[礼仪]，多用单体攻击与单体至终的仪式同步清理[回答]并削减首领[礼仪]。",
        "保持高血线或[护盾]防单次掉血达 25% 触发[麻痹]与[洗脑]，中[思辨]回合改出辅助牌快速攒激情。"
      ],
      "counterTipsEn": [
        "Anchor Spirit or Intellect Ultimate teams around permanent [Array] uptime for free [Ceremonious] stacks, using 1-target attacks and 1-target Ultimates to clear [Answer] and strip boss [Ceremonious].",
        "Keep HP topped off or shielded to prevent 25% HP chunk triggers of [Paralyze] and [Brainwash], and use [Speculate] turns to cast utility cards for bonus Moxie."
      ]
    }
  ],
  [
    "信仰的移位·Ⅱ型",
    {
      "turns": 20,
      "nameEn": "Distortion of Faith Type II",
      "modeTag": "3.5 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.5 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "智 / 兽 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Intellect and Beast Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方攻击时术法威力 +20%，仪式威力 -40%；释放增益咒语后移除自身 3 层[崩溃]。"
      ],
      "envRulesEn": [
        "[Ally]: When attacking, Incantation Might +20% and Ultimate Might -40%. After casting a Buff incantation, removes 3 stacks of [Collapse] from self."
      ],
      "passives": [
        {
          "name": "众目所归",
          "desc": "回合初给随机我方挂[迷乱]并塞入[应当无言]废牌（留手会随机[缴械]并冻结 2 张手牌）；清空首领[灵感耐受度]扣 2 段生命。"
        },
        {
          "name": "盲目虔诚",
          "desc": "每回合初首领叠 8~10 层[虔信]，满 40 层立刻清零并释放全体高额精神群攻[迷乱扰动]。"
        },
        {
          "name": "祷言回响减伤",
          "desc": "我方释放减益咒语可给首领叠加[祷言回响]（至多 10 层，每层受创减免 -2% 并削弱[迷乱扰动]伤害）；单回合释放 5 张及以上减益咒语使首领受创减免 -50%（1 回合）。"
        }
      ],
      "passivesEn": [
        {
          "name": "Gaze Upon Me",
          "desc": "At the start of the round, inflicts [Bafflement] on a random enemy (generates a [Be Silent] incantation; leaving it in the Spelldock inflicts [Disarm] / rewrites 2 cards). After [Afflatus Guard] is broken, loses 2 HP segments and recovers all [Afflatus Guard] after 1 round."
        },
        {
          "name": "Blind Devotion",
          "desc": "At the start of the round, gains 8 stacks of [Blind Devotion] (+2 stacks when strengthened twice). At 40 stacks, clears all stacks and immediately casts [Chaos and Turmoil] (heavy mass Mental DMG)."
        },
        {
          "name": "Fervent Invocation",
          "desc": "Whenever enemies cast a Debuff incantation, inflicts 1 stack of [Resounding Prayer] on the boss for 3 rounds (DMG Taken Reduction -2% per stack, up to 10 stacks, and reduces [Chaos and Turmoil]'s DMG). Casting 5+ Debuff incantations in a round inflicts DMG Taken Reduction -50% on the boss for 1 round."
        }
      ],
      "counterTips": [
        "选用智 / 兽术法主 C 搭配高频减益手叠加[祷言回响]（单回合 5 张减益可令首领受创减免 -50%），并保留增益咒语及时清除[崩溃]。",
        "抽到[应当无言]废牌务必当回合打出以防手牌被[缴械]冻结，并优先击破[灵感耐受度]直接扣除 2 段生命。"
      ],
      "counterTipsEn": [
        "Bring Intellect or Beast incantation carries alongside frequent Debuff casters to stack [Resounding Prayer] (5 Debuffs in one round inflicts -50% DMG Taken Reduction) and Buff casters to clear [Collapse].",
        "Always play [Be Silent] cards immediately to prevent Spelldock [Disarm] lockouts, and break [Afflatus Guard] repeatedly for direct 2-segment HP chunks."
      ]
    }
  ],
  [
    "毁灭的履带",
    {
      "turns": 20,
      "nameEn": "Caterpillar of Destruction",
      "modeTag": "3.4 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.4 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "无人区“HELL”（3v4）",
      "battlefieldEn": "No Man's Land \"HELL\" (3v4)",
      "favoredText": "木 / 星 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Plant and Star Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方回合初若不处于[暴露]（受创减免 -70%）则获 1 层[掩护]（受创减免 +30%，至多 3 层）；全体受击均扣 1 层[掩护]。"
      ],
      "envRulesEn": [
        "[Ally]: At the start of the round, if not afflicted with [Revealed] (DMG Taken Reduction -70%), gains 1 stack of [Deceptive Facade] (DMG Taken Reduction +30% per stack, up to 3 stacks; removes 1 stack after being attacked)."
      ],
      "passives": [
        {
          "name": "硝烟雨（目击条件）",
          "desc": "受击隐匿度 -2，克制 -3，克制群攻额外 -2（每回合限 6 次），免疫[控制]转 -10；清空隐匿度进入[目击回合]。"
        },
        {
          "name": "增援与破甲暴露",
          "desc": "每回合召出小怪，小怪退场给首领叠[不甘咆哮]；叠满 8 层使首领陷入[暴露]（受创减免 -70%）并卸除最高级[强化弹头]。"
        },
        {
          "name": "战壕掩护",
          "desc": "首领受非克制单体攻击受创减免 +25%，且回合初自叠 1~2 层[掩护]，需优先用克制群攻清怪叠[暴露]。"
        }
      ],
      "passivesEn": [
        {
          "name": "Gunpowder Rain",
          "desc": "After being attacked, Obscurity -2 (up to 5/round); Stronger Afflatus -3 (up to 2/round); Stronger Afflatus mass attack -2 (up to 6/round); immune to [Control] (-10 Obscurity instead). Reaching 0 Obscurity grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "Reinforcement",
          "desc": "At the start of the round, summons 2 Believers of Destruction (or 1 Believer + 1 Hound after strengthening). When an ally dies, gains [Resentful Roar]; at 8 stacks, inflicts [Revealed] (DMG Taken Reduction -70%) on self and removes the highest level of [Enhanced Rounds]."
        },
        {
          "name": "Trench Cover",
          "desc": "When attacked by a non-Stronger Afflatus 1-target attack, DMG Taken Reduction +25%. At the start of the round, gains 1 stack of [Deceptive Facade] (+1 stack when strengthened twice)."
        }
      ],
      "counterTips": [
        "优先选用木 / 星克制群体攻击阵容，边削隐进[目击回合]边高效收割小怪叠满 8 层[不甘咆哮]，迫使首领陷入[暴露]并卸除[强化弹头]。",
        "避免使用非克制单体攻击，爆发前先用垫刀剥掉首领身上的[掩护]层数以放大斩杀收益。"
      ],
      "counterTipsEn": [
        "Deploy Plant or Star mass attackers to shred Obscurity into [Witness Round] while clearing adds fast enough to stack 8 [Resentful Roar], forcing [Revealed] (-70% DMG Taken Reduction) and stripping [Enhanced Rounds].",
        "Avoid non-Stronger 1-target hits and peel off [Deceptive Facade] stacks before unloading major burst skills."
      ]
    }
  ],
  [
    "急性猩红症",
    {
      "turns": 20,
      "nameEn": "Insatiable Bloodsucker",
      "modeTag": "3.3 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.3 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "兽 / 灵 / 智 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Beast, Spirit, and Intellect Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方单体攻击后获得 1 层[涣散]（术法威力 -10%，可叠加，释放至终的仪式后清零，每回合至多 4 次），利好群体攻击与仪式输出。"
      ],
      "envRulesEn": [
        "[Ally]: After performing a 1-target attack, gains 1 stack of [Enervate] (Incantation Might -10%, stackable, removed after casting an Ultimate; up to 4 times per round)."
      ],
      "passives": [
        {
          "name": "夜翼之下（目击条件）",
          "desc": "受击隐匿度 -2，克制 -3，群攻额外 -2（每回合限 8 次），免疫[控制]转 -10；清空隐匿度进入[目击回合]。"
        },
        {
          "name": "血裔传播·血食瘟疫",
          "desc": "回合初补满 2 名[渴血患者]；[渴血]叠满 6 层（2 次提升后 5 层）展开[术阵][血食瘟疫]，使首领物防 +30% 并对我方全体造成 30% 最大生命本源伤。"
        }
      ],
      "passivesEn": [
        {
          "name": "Beneath the Wings of Night",
          "desc": "After being attacked, Obscurity -2 (up to 5/round); Stronger Afflatus -3 (up to 2/round); mass attack -2 (up to 8/round); immune to [Control] (-10 Obscurity instead). Reaching 0 Obscurity grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "Blood-Borne Transmission",
          "desc": "At the start of the round, summons 2 [Bloodthirsty Thralls]. If there are at least 6 stacks of [Blood Drinking] at the start of the round (reduced to 5 stacks when strengthened twice), deploys the [Vampiric Plague] [Array] (boosts Reality DEF and deals 30% Max HP Genesis DMG to all enemies)."
        }
      ],
      "counterTips": [
        "主打兽 / 灵 / 智群体攻击与仪式体系，减少单体出牌以规避[涣散]叠层，并用高频群攻迅速进入[目击回合]。",
        "持续清理[渴血患者]压制[渴血]层数，防止首领展开[血食瘟疫][术阵]造成物防暴涨与全队 30% 最大生命本源伤。"
      ],
      "counterTipsEn": [
        "Favor Beast, Spirit, or Intellect mass attacks and Ultimates to avoid stacking [Enervate] from 1-target casts while accelerating [Witness Round].",
        "Keep [Bloodthirsty Thralls] controlled so [Blood Drinking] stays below threshold and never deploys the [Vampiric Plague] [Array]."
      ]
    }
  ],
  [
    "超限的囚徒",
    {
      "turns": 20,
      "nameEn": "Captive of Transcendentality",
      "modeTag": "3.2 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.2 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "兽 / 智 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Beast and Intellect Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方每 3 回合获得仪式威力 +40%，持续 1 回合（对准周期窗口集中倾泻大招爆发）。"
      ],
      "envRulesEn": [
        "[Ally]: Every 3 rounds, gains Ultimate Might +40% for 1 round (align Ultimate burst windows with this cycle)."
      ],
      "passives": [
        {
          "name": "文学交流（目击条件）",
          "desc": "成为主动释放的单体非仪式咒语目标时隐匿度 -5，克制 -3，免疫[控制]转 -10；清空隐匿度进入[目击回合]。"
        },
        {
          "name": "有问必答",
          "desc": "受击使攻击方术法威力 -30%，但受单体额外行动攻击时攻击方仪式威力 +30%；回合末给我方挂 3 层[回答]（单攻清 2 层、群攻清 1 层）。"
        },
        {
          "name": "多重顾问的局限",
          "desc": "首领每回合末自叠 5~20 层[礼仪]强化大招；受到单体至终的仪式攻击后失去 5 层[礼仪]。"
        }
      ],
      "passivesEn": [
        {
          "name": "Literary Exchange",
          "desc": "After being targeted by an actively cast 1-target non-Ultimate incantation, Obscurity -5; Stronger Afflatus -3; immune to [Control] (-10 Obscurity instead). Reaching 0 Obscurity grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "Answer Every Question",
          "desc": "When being attacked, the attacker's Incantation Might -30%; when attacked by a 1-target Extra Action, the attacker's Ultimate Might +30%. At the end of the round, inflicts 3 stacks of [Answer] on all enemies (1-target attacks remove 2 stacks; mass attacks remove 1 stack)."
        },
        {
          "name": "Limits of Multiple Advisors",
          "desc": "At the end of the round, if not in [Witness Round], gains 5 stacks of [Ceremonious] (10/20 stacks when strengthened 1/2 times). After being attacked by a 1-target Ultimate, loses 5 stacks of [Ceremonious]."
        }
      ],
      "counterTips": [
        "选用兽 / 智单体额外行动与单体仪式队：主动单体非仪式咒语加速进[目击回合]，单体追击白嫖仪式威力 +30%，并卡准每 3 回合的 +40% 仪式窗口集中爆发。",
        "多用单体攻击清理自身[回答]并用单体至终的仪式削减首领[礼仪]，防止敌方大招倍率失控。"
      ],
      "counterTipsEn": [
        "Run Beast or Intellect 1-target Extra Action and 1-target Ultimate squads: cast active 1-target non-Ultimates for [Witness Round], gain +30% Ultimate Might from 1-target Extra Actions, and align bursts with the every-3-round +40% window.",
        "Clear [Answer] with 1-target hits and spend 1-target Ultimates to trim boss [Ceremonious] stacks."
      ]
    }
  ],
  [
    "蜕化的残响",
    {
      "turns": 20,
      "nameEn": "The Cocooned Lament",
      "modeTag": "3.2 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.2 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "岩 / 兽 灵感角色攻击、双防、生命 +20%",
      "favoredTextEn": "Mineral and Beast Afflatus characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方精神创伤角色伤害 +20%，现实创伤角色伤害 -60%（强推精神创伤输出）。"
      ],
      "envRulesEn": [
        "[Ally]: Mental DMG characters gain DMG Bonus +20%. Reality DMG characters gain DMG Bonus -60%."
      ],
      "passives": [
        {
          "name": "僵滞（目击条件）",
          "desc": "受到额外行动攻击时隐匿度额外 -3（每回合限 6 次），克制 -3，免疫[控制]转 -10；清空隐匿度进入[目击回合]。"
        },
        {
          "name": "茧衣（核心克制）",
          "desc": "受到非额外行动攻击时首领抗暴率 +50%、暴击防御 +50%（强烈需要额外行动体系）；开大后清旧友方并召新小怪。"
        },
        {
          "name": "蜕变与混乱",
          "desc": "敌方每次行动叠加[破茧]（增伤 / 减伤 +2.5%），开大时清空并给我方附加 2 回合[混乱]，被[混乱]目标吃技能 1 会被[缴械]。"
        }
      ],
      "passivesEn": [
        {
          "name": "Engulfing Terror",
          "desc": "After being attacked, Obscurity -2 (up to 5/round); Stronger Afflatus -3 (up to 2/round); Extra Action attack -3 (up to 6/round); immune to [Control] (-10 Obscurity instead). Reaching 0 Obscurity grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "Silken Cocoon",
          "desc": "When attacked by a non-Extra Action, Critical Resist Rate +50% and Critical DEF +50%. After casting Ultimate, eliminates existing allies and summons new ones."
        },
        {
          "name": "Metamorphosis",
          "desc": "After any ally acts, gains 1 stack of [Breaking Cocoon] (DMG Bonus +2.5%, DMG Taken Reduction +2.5%; 2/3 stacks when strengthened 1/2 times). Ultimate clears all stacks and inflicts [Chaos] for 2 rounds; Skill 1 [Bewilderment] inflicts [Disarm] for 2 rounds on targets afflicted with [Chaos]."
        }
      ],
      "counterTips": [
        "严格选用岩 / 兽精神创伤＋额外行动主 C，同时吃满场地精神 +20% 增伤、无视[茧衣] 50% 抗暴 / 暴防并迅速破隐进[目击回合]。",
        "首领开大施加 2 回合[混乱]后及时净化或覆盖[免疫]，避免吃技能 1 被追加 2 回合[缴械]打断输出轴。"
      ],
      "counterTipsEn": [
        "Commit to Mineral or Beast Mental DMG Extra Action carries to claim +20% Mental DMG, bypass [Silken Cocoon]'s +50% Critical Resist/DEF, and trigger [Witness Round] quickly.",
        "Cleanse or block [Chaos] with [Immunity] right after the boss's Ultimate so Skill 1 [Bewilderment] cannot chain into 2-round [Disarm]."
      ]
    }
  ],
  [
    "信仰的移位",
    {
      "turns": 20,
      "nameEn": "Distortion of Faith",
      "modeTag": "3.2 复刻 · 目击者特版 · 20 回合",
      "modeTagEn": "3.2 Rerun · Witness's Edition · 20 Rounds",
      "battlefield": "怪相档案（3v4）",
      "battlefieldEn": "Anomaly Gallery · Dossier (3v4)",
      "favoredText": "原生灵感（灵 / 智）角色攻击、双防、生命 +20%",
      "favoredTextEn": "Primal Afflatus (Spirit / Intellect) characters' ATK, Reality DEF, Mental DEF, and Max HP +20%",
      "envRules": [
        "我方群体攻击伤害 +20%，单体攻击伤害 -60%（强推群攻清场）。"
      ],
      "envRulesEn": [
        "[Ally]: Mass attack DMG Bonus +20%; 1-target attack DMG Bonus -60%."
      ],
      "passives": [
        {
          "name": "信仰解离（目击条件）",
          "desc": "成为主动减益咒语目标时隐匿度 -5，克制 -3，免疫[控制]转 -10；清空隐匿度进入[目击回合]。"
        },
        {
          "name": "意识侵染",
          "desc": "场上每有 1 名敌方小怪，首领减伤 / 抗暴 / 暴防均 +30%（必须优先清光小怪）；场上无小怪时攻击者术法威力 -20%。"
        },
        {
          "name": "异端审判与崩溃",
          "desc": "首领大招按友方数量大幅加倍率并给我方挂[崩溃]（双暴 -30%、受创减免 -15%）；成为增益咒语目标消 1 层、主动放增益消 3 层。"
        }
      ],
      "passivesEn": [
        {
          "name": "Faith Dissociation",
          "desc": "After being attacked, Obscurity -2 (up to 5/round); Stronger Afflatus -3 (up to 2/round); actively cast Debuff incantation -5; immune to [Control] (-10 Obscurity instead). Reaching 0 Obscurity grants [Witness Round] (up to 4 times)."
        },
        {
          "name": "Consciousness Infection",
          "desc": "When being attacked, for each ally present, gains DMG Taken Reduction +30%, Critical Resist Rate +30%, and Critical DEF +30%. When no allies are present, attackers suffer Incantation Might -20%."
        },
        {
          "name": "Heresy Inquisition",
          "desc": "Ultimate [Annihilation of Free Will] deals extra Mental DMG per ally present and inflicts [Collapse] (Critical Rate -30%, Critical DMG -30%, DMG Taken Reduction -15%; -1 stack when targeted by a Buff incantation, -3 stacks after casting a Buff incantation)."
        }
      ],
      "counterTips": [
        "选用灵 / 智群体攻击主 C 配合主动减益手，既能吃满群攻 +20% 与快速进[目击回合]，又能第一时间清光小怪剥离每只 +30% 的减伤与双暴抗。",
        "首领大招叠加[崩溃]后立刻施放增益咒语（主动放增益清 3 层），迅速恢复双暴面板继续压制。"
      ],
      "counterTipsEn": [
        "Pair Spirit or Intellect mass attackers with active Debuff casters to sweep adds immediately (removing +30% DMG Reduction and Critical Resist/DEF per add) while rushing [Witness Round].",
        "Cast Buff incantations right after [Annihilation of Free Will] (-3 stacks of [Collapse] on self) to restore Critical stats immediately."
      ]
    }
  ]
]);

// 别名同步（兼容旧数据异体字）
MANE_BOSS_MECHANICS.set('生命的饥谨', MANE_BOSS_MECHANICS.get('生命的饥馑'));

const MANE_BOSS_EN_TO_CN = new Map([
  ["eidolon of avarice", "神话的遗闻"],
  ["whisper of myth", "神话的遗闻"],
  ["manifestation of thought", "思想的表观"],
  ["surface of thought", "思想的表观"],
  ["coveter of eternity", "生命的饥馑"],
  ["famine of life", "生命的饥馑"],
  ["the bullet-torn winter", "子弹的冬年"],
  ["insatiable bloodsucker type ii", "急性猩红症·Ⅱ型"],
  ["the sun's thrall", "太阳的宠臣"],
  ["glory days manifest", "旧日的荣耀"],
  ["the self-pitying avenger", "自我同情者"],
  ["captive of transcendentality type ii", "超限的囚徒·Ⅱ型"],
  ["distortion of faith type ii", "信仰的移位·Ⅱ型"],
  ["caterpillar of destruction", "毁灭的履带"],
  ["insatiable bloodsucker", "急性猩红症"],
  ["captive of transcendentality", "超限的囚徒"],
  ["the cocooned lament", "蜕化的残响"],
  ["distortion of faith", "信仰的移位"]
]);

// 焦点闪回 4.1（第 7 期）关卡机制（按 stage_no 或中英文名称匹配）
export const FLASHBACK_STAGE_MECHANICS = [
  {
    "match": [
      "洞知",
      "额外行动",
      "pursuit",
      "extra action",
      "charybdis",
      "hippocampus",
      "pt-i"
    ],
    "stageNo": 1,
    "code": "PT-I",
    "nameCn": "第一关 · 洞知 / 额外行动",
    "nameEn": "Stage 1 · Pursuit / Extra Action",
    "modeTag": "4.1 第 7 期 · 0–6 回合社区速通",
    "modeTagEn": "4.1 Cycle 7 · 0–6 Round Community Speedrun",
    "enemies": "马头鱼尾兽（1411 万）+ 卡律布狄斯（1611 万）",
    "enemiesEn": "Hippocampus (14.11M) + Charybdis (16.11M)",
    "envRules": [
      "敌方前 4 回合最终受创 -30%；受到克制攻击降低[灵感耐受度]，耐受度归零失去大量生命后立即恢复。",
      "推荐增幅：【洞知递生】第 2 回合起每 2 回合获 2 点[星系洞知点]；【新锐如锋】攻击叠[余锐]（满 10 层变[锋锐]术法 +60%、穿透 +20%）；【破势增幅】清[灵感耐受度]后增伤 +30%。"
    ],
    "envRulesEn": [
      "Enemies take Final DMG Taken -30% for the first 4 rounds. Stronger Afflatus attacks reduce [Afflatus Guard]; breaking it deducts a large chunk of HP before [Afflatus Guard] immediately recovers.",
      "Recommended Buffs: [Pursuit Surge] grants 2 [Star Pursuit Points] every 2 rounds starting from Round 2; [Keen Edge] stacks [Lingering Edge] on attack (at 10 stacks transforms into [Razor Sharp]: Incantation Might +60%, Penetration Rate +20%); [Guard Break Boost] grants DMG Bonus +30% after breaking [Afflatus Guard]."
    ],
    "passives": [
      {
        "name": "潮汐加护（双怪共有）",
        "desc": "受到群体攻击时本次受到伤害降低 50%，强推单体爆发与额外行动点杀。"
      },
      {
        "name": "潮汐节律",
        "desc": "每回合在[涨潮]（增伤 +30%，回合末放技能 1）与[退潮]（减伤 +20%，回合末放技能 2）间切换。"
      },
      {
        "name": "嘲讽与回复威胁",
        "desc": "马头鱼尾兽技能带 2 回合[嘲讽]与 25% 血单体治疗 +[坚固]；卡律布狄斯[涨潮]大招对半血以下高额增伤并挂[流血]。"
      }
    ],
    "passivesEn": [
      {
        "name": "Tidal Protection (Shared)",
        "desc": "Takes 50% less damage from mass attacks, strongly favoring 1-target burst and Extra Action / Pursuit focus fire."
      },
      {
        "name": "Rhythm of the Tides",
        "desc": "Switches between [High Tide] (DMG Bonus +30%; casts Rank 1 Skill 1 at end of round) and [Low Tide] (DMG Taken Reduction +20%; casts Rank 1 Skill 2 at end of round) each round."
      },
      {
        "name": "Taunt & Sustain Threats",
        "desc": "Hippocampus's [Thumping Fins] grants [Taunt] for 2 rounds and Ultimate [Sea Beast's Philosophy] heals the lowest-HP ally for 25% Max HP plus 1 stack of [Sturdiness]. Charybdis's [High Tide] Ultimate [All-Consuming Maw] deals bonus Reality DMG to targets below 50% HP and inflicts [Bleed] for 2 rounds."
      }
    ],
    "counterTips": [
      "双怪均带[潮汐加护]群攻减伤 50%，务必选用洞知或高频单体额外行动队点杀，优先用克制单攻打破[灵感耐受度]吃满【破势增幅】与【新锐如锋】。",
      "优先集火马头鱼尾兽规避[嘲讽]与 25% 血治疗 +[坚固]，并在卡律布狄斯[涨潮]大招前稳住半血以上防斩杀与[流血]。"
    ],
    "counterTipsEn": [
      "Both enemies take 50% less damage from mass attacks via [Tidal Protection] — deploy Pursuit or high-frequency 1-target Extra Action teams to break [Afflatus Guard] early and stack [Keen Edge].",
      "Focus down Hippocampus first to prevent [Taunt] and its 25% HP heal + [Sturdiness], and stay above 50% HP before Charybdis's [High Tide] Ultimate."
    ]
  },
  {
    "match": [
      "余辉",
      "斯库拉",
      "lingering glow",
      "afterglow",
      "scylla",
      "wild scylla",
      "pt-ii"
    ],
    "stageNo": 2,
    "code": "PT-II",
    "nameCn": "第二关 · 余辉 / 斯库拉",
    "nameEn": "Stage 2 · Lingering Glow / Scylla",
    "modeTag": "4.1 第 7 期 · 0–6 回合社区速通",
    "modeTagEn": "4.1 Cycle 7 · 0–6 Round Community Speedrun",
    "enemies": "斯库拉（142 万）× 2 + 野生斯库拉（1602 万）",
    "enemiesEn": "Scylla (1.42M) × 2 + Wild Scylla (16.02M)",
    "envRules": [
      "敌方前 4 回合最终受创 -30%；受到克制攻击降低[灵感耐受度]，归零触发大额百分比扣血。",
      "推荐增幅：【余辉威力】开局 300 点[余辉]，按 100/200/300/600 档位提供全体术法威力 +10%~45%；【仪式回馈】释放仪式为 1 号位叠 +10% 增伤（至多 +60%）；【破势增幅】破[灵感耐受度]增伤 +30%。"
    ],
    "envRulesEn": [
      "Enemies take Final DMG Taken -30% for the first 4 rounds. Stronger Afflatus attacks reduce [Afflatus Guard], triggering heavy percentage HP loss upon break.",
      "Recommended Buffs: [Lingering Glow Might] starts with 300 [Lingering Glow] and grants all allies Incantation Might +10%–45% at 100/200/300/600 thresholds; [Ultimate Feedback] stacks +10% DMG Bonus on Slot 1 per Ultimate cast (up to +60%); [Guard Break Boost] grants DMG Bonus +30% on breaking [Afflatus Guard]."
    ],
    "passives": [
      {
        "name": "潮汐节律",
        "desc": "每回合在[涨潮]（增伤 +30%）与[退潮]（减伤 +20%）之间切换，[涨潮]期需注意生存与解控。"
      },
      {
        "name": "涨潮双控场",
        "desc": "[涨潮]期间斯库拉大招附 1 回合[缴械]且 2 技能驱散我方 1 种[状态增益]；野生斯库拉大招附 1 回合[缄默]。"
      },
      {
        "name": "点位压制",
        "desc": "野生斯库拉单体技能优先锁定我方最左侧 1 号位，配队站位需兼顾 1 号位承伤。"
      }
    ],
    "passivesEn": [
      {
        "name": "Rhythm of the Tides",
        "desc": "Switches between [High Tide] (DMG Bonus +30%) and [Low Tide] (DMG Taken Reduction +20%) each round; prepare sustain and cleanse or [Immunity] during [High Tide]."
      },
      {
        "name": "High Tide Dual Control",
        "desc": "During [High Tide], Scylla's Ultimate [Choking Coil] inflicts [Disarm] for 1 round and Skill 2 [Abyssal Slither] dispels 1 [Pos Status]; Wild Scylla's Ultimate [Strangling Coil] inflicts [Silence] for 1 round."
      },
      {
        "name": "Frontline Targeting",
        "desc": "[Guttural Screech] prioritizes the leftmost ally (Slot 1), requiring durable Slot 1 positioning or protective mitigation."
      }
    ],
    "counterTips": [
      "优先选用余辉或高频仪式体系搭配【余辉威力】与【仪式回馈】，将核心主 C 置于 1 号位吃满增伤并做好 1 号位保护。",
      "[涨潮]回合前备好净化或[免疫]防[缴械] / [缄默]双控与增益驱散，尽早击破[灵感耐受度]压缩 0–6 回合通关轴。"
    ],
    "counterTipsEn": [
      "Run Lingering Glow or rapid-Ultimate squads with [Lingering Glow Might] and [Ultimate Feedback], placing a protected carry in Slot 1 to absorb [Guttural Screech] while stacking Slot 1 DMG Bonus.",
      "Prepare cleanse or [Immunity] for [High Tide] [Disarm] / [Silence] and buff dispels, and break [Afflatus Guard] early to secure 0–6 round clears."
    ]
  },
  {
    "match": [
      "术具",
      "金毛羊",
      "conduit",
      "golden-fleeced",
      "golden fleece",
      "ram",
      "eclipse bat",
      "pt-iii"
    ],
    "stageNo": 3,
    "code": "PT-III",
    "nameCn": "第三关 · 术具 / 金毛羊",
    "nameEn": "Stage 3 · Conduit / Golden-Fleeced Ram",
    "modeTag": "4.1 第 7 期 · 0–6 回合社区速通",
    "modeTagEn": "4.1 Cycle 7 · 0–6 Round Community Speedrun",
    "enemies": "日熄蝙蝠（563 万）× 2 + 金毛羊（2047 万）",
    "enemiesEn": "Eclipse Bat (5.63M) × 2 + Golden-Fleeced Ram (20.47M)",
    "envRules": [
      "敌方前 4 回合最终受创 -30%；受到克制攻击降低[灵感耐受度]，归零触发大额百分比扣血。",
      "推荐增幅：【交感递升】4 号位为岩全队攻 +10%、为星手牌上限 +1；【威力解放-岩】1 号位为岩获术法 / 仪式威力 +10%；【破势增幅】破[灵感耐受度]增伤 +30%。"
    ],
    "envRulesEn": [
      "Enemies take Final DMG Taken -30% for the first 4 rounds. Stronger Afflatus attacks reduce [Afflatus Guard], triggering heavy percentage HP loss upon break.",
      "Recommended Buffs: [Sympathetic Resonance] grants all allies ATK +10% if Slot 4 is Mineral, or Spelldock limit +1 if Slot 4 is Star; [Might Unleashed - Mineral] grants Slot 1 Incantation Might +10% and Ultimate Might +10% if Mineral; [Guard Break Boost] grants DMG Bonus +30% on breaking [Afflatus Guard]."
    ],
    "passives": [
      {
        "name": "羊肩重任",
        "desc": "每有 1 名友方蝙蝠退场，金毛羊激情 +1 且暴击率、暴击创伤提升 15%（1 回合）。"
      },
      {
        "name": "别薅金羊毛·灼烧",
        "desc": "金毛羊大招附 2 层[灼烧]（受治疗率 -20%、回合末本源伤，至多 10 层），需用治疗 / 增益 / 反制咒语逐层驱散；小技能带[麻痹]（2 层变[眩晕]）及 30% 减伤。"
      },
      {
        "name": "日熄蝙蝠吸血",
        "desc": "蝙蝠半血以下吸血率 +30%，大招对[中毒]目标额外增伤 +100%，需控血或同步清场。"
      }
    ],
    "passivesEn": [
      {
        "name": "A Fleece's Duty",
        "desc": "Whenever an allied Eclipse Bat retreats, Golden-Fleeced Ram gains Moxie +1 and Critical Rate +15% / Critical DMG +15% for 1 round."
      },
      {
        "name": "Untouchable Golden Fleece & Scorch",
        "desc": "Golden-Fleeced Ram's Ultimate [Untouchable Golden Fleece] inflicts 2 stacks of [Scorch] (Healing Taken -20%, end-of-round Genesis DMG, up to 10 stacks; dispel 1 stack when targeted by a Heal, Buff, or Counter incantation). Skill 1 [Glittering Temper] inflicts [Paralyze] (converts to [Daze] at 2 stacks) and Skill 2 [Fluffy Comfort] grants DMG Taken Reduction +30%."
      },
      {
        "name": "Bloodthirsty Nature (Eclipse Bat)",
        "desc": "Eclipse Bats gain Leech Rate +30% when attacking below 50% HP, and their Ultimate [Ambush in Endless Night] deals +100% additional Reality DMG to targets afflicted with [Poison]."
      }
    ],
    "counterTips": [
      "优先选用岩 / 星术具或仪式队，按【威力解放-岩】与【交感递升】把岩主 C 放 1 号位、岩 / 星辅助放 4 号位，并尽量同步收割日熄蝙蝠限制[羊肩重任]激情暴涨。",
      "用治疗、增益或反制咒语逐层驱散[灼烧]，及时清理[麻痹]防叠 2 层转[眩晕]，避免携带[中毒]硬吃蝙蝠大招。"
    ],
    "counterTipsEn": [
      "Run Mineral or Star Conduit / Ultimate teams with a Mineral carry in Slot 1 and a Mineral/Star support in Slot 4 for [Might Unleashed - Mineral] and [Sympathetic Resonance], clearing Eclipse Bats together to limit [A Fleece's Duty] Moxie spikes.",
      "Weave Heal, Buff, or Counter incantations to dispel [Scorch], cleanse [Paralyze] before 2 stacks convert into [Daze], and avoid taking Eclipse Bat Ultimates while afflicted with [Poison]."
    ]
  }
];

export const FLASHBACK_STAGES_MECHANICS = FLASHBACK_STAGE_MECHANICS;

function lookupManeRawEntry(bossName) {
  const key = String(bossName ?? '').trim();
  if (!key) return null;
  let entry = MANE_BOSS_MECHANICS.get(key);
  if (!entry) {
    const mappedCn = MANE_BOSS_EN_TO_CN.get(key.toLowerCase());
    if (mappedCn) entry = MANE_BOSS_MECHANICS.get(mappedCn);
  }
  return entry || null;
}

function isZhLang(lang) {
  return String(lang || getLang()).trim().toLowerCase().startsWith('zh');
}

function localizeManeEntry(entry, lang) {
  if (!entry) return null;
  if (isZhLang(lang)) {
    return {
      turns: entry.turns,
      nameEn: entry.nameEn,
      modeTag: entry.modeTag,
      battlefield: entry.battlefield,
      favoredText: entry.favoredText,
      envRules: entry.envRules,
      passives: entry.passives,
      counterTips: entry.counterTips,
      thresholds: entry.thresholds
    };
  }
  return {
    turns: entry.turns,
    nameEn: entry.nameEn,
    modeTag: entry.modeTagEn,
    battlefield: entry.battlefieldEn,
    favoredText: entry.favoredTextEn,
    envRules: entry.envRulesEn,
    passives: entry.passivesEn,
    counterTips: entry.counterTipsEn,
    thresholds: entry.thresholdsEn
  };
}

export function resolveManeBossMechanics(bossName, lang = getLang()) {
  return localizeManeEntry(lookupManeRawEntry(bossName), lang);
}

export function getBossThresholdProgress(bossName, score, lang = getLang()) {
  const entry = lookupManeRawEntry(bossName);
  const zh = isZhLang(lang);
  const rawList = entry ? (zh ? entry.thresholds : entry.thresholdsEn) : null;
  if (!Array.isArray(rawList) || rawList.length === 0) {
    return {
      currentStage: 0,
      roman: '',
      scoreLabel: '',
      desc: '',
      nextStage: null,
      thresholds: []
    };
  }

  const parsedScore = typeof score === 'string'
    ? Number(score.replace(/,/g, '').trim())
    : Number(score);
  const numericScore = Number.isFinite(parsedScore) ? parsedScore : 0;

  let currentStage = 0;
  const thresholds = rawList.map((step, idx) => {
    const minScore = Number(step.minScore) || 0;
    const reached = numericScore >= minScore;
    if (reached) currentStage = idx + 1;
    return {
      stage: idx + 1,
      roman: step.roman || '',
      minScore,
      score: step.score,
      scoreLabel: step.score,
      desc: step.desc,
      reached
    };
  });

  const activeStep = currentStage > 0 ? thresholds[currentStage - 1] : null;
  const upcomingStep = currentStage < thresholds.length ? thresholds[currentStage] : null;

  return {
    currentStage,
    roman: activeStep ? activeStep.roman : '',
    scoreLabel: activeStep ? activeStep.scoreLabel : '',
    desc: activeStep ? activeStep.desc : '',
    nextStage: upcomingStep
      ? {
          roman: upcomingStep.roman,
          minScore: upcomingStep.minScore,
          scoreLabel: upcomingStep.scoreLabel,
          desc: upcomingStep.desc
        }
      : null,
    thresholds
  };
}

function localizeFlashbackEntry(item, lang) {
  if (!item) return null;
  if (isZhLang(lang)) {
    return {
      stageNo: item.stageNo,
      code: item.code,
      name: item.nameCn,
      modeTag: item.modeTag,
      enemies: item.enemies,
      envRules: item.envRules,
      passives: item.passives,
      counterTips: item.counterTips
    };
  }
  return {
    stageNo: item.stageNo,
    code: item.code,
    name: item.nameEn,
    modeTag: item.modeTagEn,
    enemies: item.enemiesEn,
    envRules: item.envRulesEn,
    passives: item.passivesEn,
    counterTips: item.counterTipsEn
  };
}

export function resolveFlashbackStageMechanics(stage, lang = getLang()) {
  if (stage === null || stage === undefined) return null;
  if (typeof stage === 'number') {
    const byNum = FLASHBACK_STAGE_MECHANICS.find((item) => item.stageNo === stage) || null;
    return localizeFlashbackEntry(byNum, lang);
  }
  const name = typeof stage === 'string' ? stage : String(stage.name || '');
  const lowName = name.toLowerCase();
  const byName = FLASHBACK_STAGE_MECHANICS.find((item) =>
    item.match.some((kw) => lowName.includes(String(kw).toLowerCase()))
  );
  if (byName) return localizeFlashbackEntry(byName, lang);
  const stageNo = typeof stage === 'object' ? Number(stage.stage_no || stage.stageNo) : Number(stage);
  const byNo = FLASHBACK_STAGE_MECHANICS.find((item) => item.stageNo === stageNo) || null;
  return localizeFlashbackEntry(byNo, lang);
}
