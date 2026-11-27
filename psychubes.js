// 《重返未来：1999》全心相图鉴索引（涵盖 1.0 至 4.1 亚特兰蒂斯谋杀案共 122 张可装备心相）
// 资源来源于 UTTU / 灰机 Wiki / Fandom Wiki（含完整英文官方名称、主属性与定位标签）
// 已全部本地化至 ./assets/psychubes/{id}.webp

import { getLang } from './i18n.js';

export const PSYCHUBE_TAGS = ['全部', '攻击', '暴击', '辅助', '生存', '治疗'];

export const PSYCHUBE_TAGS_META = [
  { key: '全部', zh: '全部', en: 'All',      shortEn: 'All' },
  { key: '攻击', zh: '攻击', en: 'ATK',      shortEn: 'ATK',     wikiTagId: '1' },
  { key: '暴击', zh: '暴击', en: 'Critical', shortEn: 'Crit',    wikiTagId: '2' },
  { key: '辅助', zh: '辅助', en: 'Support',  shortEn: 'Support', wikiTagId: '5' },
  { key: '生存', zh: '生存', en: 'Survival', shortEn: 'Survival', wikiTagId: '4' },
  { key: '治疗', zh: '治疗', en: 'Heal',     shortEn: 'Healing', wikiTagId: '3' }
];

const TAG_META_BY_KEY = new Map();
for (const meta of PSYCHUBE_TAGS_META) {
  TAG_META_BY_KEY.set(meta.key, meta);
  TAG_META_BY_KEY.set(meta.en.toLowerCase(), meta);
  TAG_META_BY_KEY.set(meta.shortEn.toLowerCase(), meta);
}

const STAT_EN_MAP = {
  "攻击力": "ATK",
  "生命值": "HP",
  "暴击率": "Critical Rate",
  "暴击创伤": "Critical DMG",
  "创伤加成": "DMG Bonus",
  "受创减免": "DMG Taken Reduction",
  "受创回复": "DMG Heal",
  "术法威力": "Incantation Might",
  "仪式威力": "Ultimate Might",
  "治疗率": "Healing Done",
  "现实防御": "Reality DEF",
  "精神防御": "Mental DEF"
};

export const PSYCHUBES = [
  {
    "id": "1581",
    "name": "可食用谜题",
    "en": "An Edible Puzzle",
    "star": 6,
    "version": "4.1",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Signature 4.1 Shift/Ultimate DPS Psychube: boosts ATK, Critical DMG, and Ultimate burst output when allies trigger Shift mechanics.",
    "passiveZh": "4.1 位移/仪式输出向心相：随友方触发位移机制大幅提升记忆者的攻击力、暴击创伤与至终的仪式爆发伤害。"
  },
  {
    "id": "1580",
    "name": "纯洁的棺床",
    "en": "The Coffin of Purity",
    "star": 6,
    "version": "4.1",
    "stat": "受创回复",
    "statEn": "DMG Heal",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3200,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "DMG Heal +12%",
      "subStatZh": "受创回复 +12%"
    },
    "passiveEn": "Signature 4.1 Pursuit sustain Psychube: boosts Max HP, DMG Heal, and teamwide survivability and healing synergy for Star Pursuit healers.",
    "passiveZh": "4.1 洞知生存辅助心相：提升记忆者最大生命与受创回复，并强化星灵感洞知治疗位的团队承伤与续航能力。"
  },
  {
    "id": "1579",
    "name": "灵知当齐一",
    "en": "Flows in All Things Alike",
    "star": 6,
    "version": "4.0",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "If the carrier is a Star character, gains Critical DMG +12%–24% on entry; Extra Actions grant all allies Pursuit DMG Bonus (+4% per stack, up to 4 stacks for 3 rounds).",
    "passiveZh": "进入战斗时若记忆者为星灵感，暴击创伤提升 12%–24%；记忆者发动额外行动攻击时，使己方全体洞知创伤加成提升（每层 4%，至多 4 层，持续 3 回合）。"
  },
  {
    "id": "1578",
    "name": "宿命之向背",
    "en": "To Choose Against Fate",
    "star": 6,
    "version": "4.0",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical DMG +24%",
      "subStatZh": "暴击创伤 +24%"
    },
    "passiveEn": "Signature 4.0 Lingering Glow Psychube: grants permanent DMG Bonus on entry and amplifies Critical DMG and Lingering Glow team synergy.",
    "passiveZh": "4.0 余辉体系暴击辅助心相：进入战斗即获得常驻创伤加成，并随余辉体系联动提升记忆者与队伍的暴击创伤。"
  },
  {
    "id": "1577",
    "name": "立于风暴脊",
    "en": "Atop the Tempest",
    "star": 6,
    "version": "4.0",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "If the carrier is a Star character, gains DMG Dealt +8%–16% on entry; when allies trigger Pursuit attacks, stacks Pursuit and Critical bonuses for the carrier.",
    "passiveZh": "进入战斗时若记忆者为星灵感，造成伤害提升 8%–16%；己方发动洞知攻击后，为记忆者叠加洞知与暴击输出强化。"
  },
  {
    "id": "1576",
    "name": "拢于心潮间",
    "en": "Tides Held Within",
    "star": 6,
    "version": "3.9",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "治疗",
      "辅助"
    ],
    "tagsEn": [
      "Heal",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Beast carriers gain Healing Done +12%–24% on entry; after casting Ultimate while holding a Force Field, all allies gain Ultimate Might +8%–16% for 3 rounds.",
    "passiveZh": "若记忆者为兽灵感，入场治疗率 +12%–24%；持有力场时释放至终的仪式后，己方全体仪式威力 +8%–16%（持续 3 回合）。"
  },
  {
    "id": "1575",
    "name": "宣告以弦鸣",
    "en": "Arrow of Verdict",
    "star": 6,
    "version": "3.9",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3200,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Conduit carriers gain DMG Dealt +8%–16% on entry; when an ally attacks while the carrier holds a Force Field, all allies gain Critical DMG +1.5%–3% (up to 8 stacks).",
    "passiveZh": "若记忆者为术具角色，入场造成伤害 +8%–16%；持有力场时友方攻击使己方全体暴击创伤 +1.5%–3%（至多 8 层）。"
  },
  {
    "id": "1574",
    "name": "光影的栖所",
    "en": "Where Light and Shadows Rest",
    "star": 6,
    "version": "3.8",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Mineral carriers gain Riposte DMG +8%–16%; after any ally ripostes, the carrier gains Critical DMG +3%–6% for 3 rounds (up to 6 stacks).",
    "passiveZh": "若记忆者为岩灵感，反击伤害 +8%–16%；任意友方反击后，记忆者暴击创伤 +3%–6%（持续 3 回合，至多 6 层）。"
  },
  {
    "id": "1573",
    "name": "光之外的梦",
    "en": "A Dream Beyond Light",
    "star": 6,
    "version": "3.8",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Mineral carriers gain Healing Done +12%–24% on entry; each Conduit Energy consumed by allies grants all allies Critical DMG +0.8%–1.5% for 3 rounds (up to 16 stacks).",
    "passiveZh": "若记忆者为岩灵感，入场治疗率 +12%–24%；友方每消耗 1 点术具能量，己方全体暴击创伤 +0.8%–1.5%（持续 3 回合，至多 16 层）。"
  },
  {
    "id": "1572",
    "name": "科学编舞法",
    "en": "The Dance of Science",
    "star": 6,
    "version": "s02",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 160,
      "mDef": 140,
      "subStatEn": "Critical DMG +24%",
      "subStatZh": "暴击创伤 +24%"
    },
    "passiveEn": "When attacking while also equipped with The Art of Atoms, Critical Rate +12%–24%; Mineral carriers gain DMG Dealt +12%–24%.",
    "passiveZh": "攻击时若同时装备《艺术原子能》，暴击率 +12%–24%；若记忆者为岩灵感，造成伤害 +12%–24%。"
  },
  {
    "id": "1571",
    "name": "艺术原子能",
    "en": "The Art of Atoms",
    "star": 6,
    "version": "s02",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 140,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "When attacking while also equipped with The Dance of Science, Critical DMG +18%–36%; Star carriers gain Conduit Might +8%–16%.",
    "passiveZh": "攻击时若同时装备《科学编舞法》，暴击创伤 +18%–36%；若记忆者为星灵感，术具威力 +8%–16%。"
  },
  {
    "id": "1570",
    "name": "圣歌应缄默",
    "en": "The Silent Anthem",
    "star": 6,
    "version": "3.7",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 160,
      "mDef": 140,
      "subStatEn": "Critical DMG +24%",
      "subStatZh": "暴击创伤 +24%"
    },
    "passiveEn": "Mineral carriers gain DMG Dealt +8%–16% on entry; each Conduit Energy consumed by allies grants all allies Conduit Might +0.6%–1% for 3 rounds (up to 16 stacks).",
    "passiveZh": "若记忆者为岩灵感，入场造成伤害 +8%–16%；友方每消耗 1 点术具能量，己方全体术具威力 +0.6%–1%（持续 3 回合，至多 16 层）。"
  },
  {
    "id": "1569",
    "name": "蜕至我为我",
    "en": "Until I Am Me",
    "star": 6,
    "version": "3.7",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3000,
      "rDef": 140,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Mineral carriers gain Critical DMG +12%–24% on entry; attacking with a Sovereign Incantation grants Ultimate Might +6%–12% and Incantation Might +6%–12%.",
    "passiveZh": "若记忆者为岩灵感，入场暴击创伤 +12%–24%；使用主权咒语攻击时，仪式威力与术法威力各 +6%–12%。"
  },
  {
    "id": "1568",
    "name": "昨日雨声轻",
    "en": "The Soft Rain of Yesterday",
    "star": 6,
    "version": "3.7",
    "stat": "受创减免",
    "statEn": "DMG Taken Reduction",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 390,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "DMG Taken Reduction +12%",
      "subStatZh": "受创减免 +12%"
    },
    "passiveEn": "All-Rounder carriers gain ATK & Max HP +4%–10% on entry; active casts grant all allies DMG Dealt +1.2%–2% (up to 6 stacks), and Beast carriers' Ultimates grant all allies Critical DMG +8%–16% for 3 rounds.",
    "passiveZh": "全能型角色入场攻击与最大生命 +4%–10%；主动出牌使全队造成伤害 +1.2%–2%（至多 6 层），兽灵感释放仪式后全队暴击创伤 +8%–16%（持续 3 回合）。"
  },
  {
    "id": "1567",
    "name": "解答的边界",
    "en": "The Riddle's Limit",
    "star": 6,
    "version": "3.6",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 3200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "At round end, holding Bastion grants DMG Taken -4%–8% for 1 round; if the carrier transferred Dynamo that round, all allies gain DMG Dealt +2%–4% (up to 3 stacks).",
    "passiveZh": "回合末若持有堡垒则受创 -4%–8%（1 回合）；若本回合转移过电能，己方全体造成伤害 +2%–4%（至多 3 层）。"
  },
  {
    "id": "1566",
    "name": "世界多喧闹",
    "en": "Drown Out the Hustle",
    "star": 6,
    "version": "3.5",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 140,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Plant carriers gain Genesis DMG Dealt +2%–4% after Extra Action attacks (up to 3 stacks); ally rewritten incantations inflict Poison DMG Taken +1%–3% on all enemies for 3 rounds (up to 3 stacks).",
    "passiveZh": "木灵感发动额外行动攻击后本源伤害 +2%–4%（至多 3 层）；友方释放改写咒语使敌方全体中毒受创 +1%–3%（持续 3 回合，至多 3 层）。"
  },
  {
    "id": "1565",
    "name": "振翅一瞬间",
    "en": "The Fluttering Moment",
    "star": 6,
    "version": "3.5",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 160,
      "mDef": 140,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "At round end with 120+ Lingering Glow, all allies gain Critical DMG +6%–12% for 2 rounds; ally rewritten incantations grant all allies DMG Dealt +2%–4% for 3 rounds (up to 3 stacks).",
    "passiveZh": "回合末余辉达 120 点时全队暴击创伤 +6%–12%（2 回合）；友方以改写咒语攻击时全队造成伤害 +2%–4%（持续 3 回合，至多 3 层）。"
  },
  {
    "id": "1564",
    "name": "功名尘与土",
    "en": "All Honor is but Dust",
    "star": 6,
    "version": "3.4",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Follow-up attacks gain DMG Dealt +8%–16%; casting a follow-up Ultimate grants all allies Incantation Might +6%–12% for 3 rounds.",
    "passiveZh": "追击攻击造成伤害 +8%–16%；若释放的至终的仪式为追击攻击，使己方全体术法威力 +6%–12%（持续 3 回合）。"
  },
  {
    "id": "1563",
    "name": "天地一悠游",
    "en": "Wayfarer of the Dao",
    "star": 6,
    "version": "3.4",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 390,
      "hp": 2800,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical DMG +24%",
      "subStatZh": "暴击创伤 +24%"
    },
    "passiveEn": "Each Eureka consumed by the team grants all allies DMG Dealt +0.2%–0.4% (up to 30 stacks); Plant carriers' deployed Array additionally grants all allies Incantation Might +6%–12%.",
    "passiveZh": "全队每消耗 1 点灵光，己方全体造成伤害 +0.2%–0.4%（至多 30 层）；木灵感记忆者展开的术阵额外赋予全队术法威力 +6%–12%。"
  },
  {
    "id": "1562",
    "name": "行至阿刻戎",
    "en": "Across the Acheron",
    "star": 6,
    "version": "3.3",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "DMG Bonus +12%",
      "subStatZh": "创伤加成 +12%"
    },
    "passiveEn": "Gains Ultimate Might +4%–8% per Beast ally on entry (up to 4 stacks); at round start, gains DMG Dealt +2%–4% per Bullet type held (up to 6 stacks).",
    "passiveZh": "入场时场上每有 1 名兽灵感友方，记忆者仪式威力 +4%–8%（至多 4 层）；回合初每持有 1 种术弹，本回合造成伤害 +2%–4%（至多 6 层）。"
  },
  {
    "id": "1561",
    "name": "我心如赤焰",
    "en": "Singleness of Heart",
    "star": 6,
    "version": "3.3",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Enemies with Burn deal -2%–4% DMG to allies; after casting Ultimate with 120+ Lingering Glow, all allies gain Critical DMG +12%–24% for 3 rounds.",
    "passiveZh": "处于燃烧状态的敌人攻击我方时造成伤害 -2%–4%；余辉达 120 点以上释放仪式后，己方全体暴击创伤 +12%–24%（持续 3 回合）。"
  },
  {
    "id": "1560",
    "name": "无意识梦魇",
    "en": "Shadows in the Subconscious",
    "star": 6,
    "version": "3.2",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 370,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Attacking enemies with Burn grants DMG Dealt +8%–16%; at round start with 120+ Lingering Glow, all allies gain Critical DMG +12%–24% for 1 round.",
    "passiveZh": "攻击处于燃烧状态的敌人时造成伤害 +8%–16%；回合初若余辉达 120 点以上，己方全体本回合暴击创伤 +12%–24%。"
  },
  {
    "id": "1559",
    "name": "跃过命运线",
    "en": "Her Willful Leap",
    "star": 6,
    "version": "3.2",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Beast carriers' Channel incantations grant all allies DMG Bonus +8%–16% for 1 round; Extra Action attacks grant Ultimate Might +4%–8% for 1 round (up to 3 stacks).",
    "passiveZh": "兽灵感记忆者释放吟诵咒语后全队创伤加成 +8%–16%（1 回合）；额外行动攻击使记忆者仪式威力 +4%–8%（1 回合，至多 3 层）。"
  },
  {
    "id": "1558",
    "name": "千万次应验",
    "en": "The Thousandfold Fate",
    "star": 6,
    "version": "3.2",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 390,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Intellect carriers attacking with 120+ Lingering Glow gain Critical DMG +4%–8% (up to 6 stacks); Extra Action attacks while holding a Force Field gain Incantation Might +6%–12%.",
    "passiveZh": "智灵感记忆者在余辉达 120 点以上攻击时暴击创伤 +4%–8%（至多 6 层）；持有力场时发动额外行动攻击术法威力 +6%–12%。"
  },
  {
    "id": "1557",
    "name": "生者的苦旅",
    "en": "Bitter March of the Living",
    "star": 6,
    "version": "3.1",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Attacking under Pulsing Field Lv.3 grants Ultimate Might +12%–24%; 1-target incantations stack DMG Dealt +1.4%–3% (up to 6 stacks, cleared on mass incantation).",
    "passiveZh": "处于 3 级涌动电场下攻击时仪式威力 +12%–24%；释放单体咒语叠加造成伤害 +1.4%–3%（至多 6 层，释放群攻后清除）。"
  },
  {
    "id": "1556",
    "name": "流浪即兴曲",
    "en": "The Wandering Improviser",
    "star": 6,
    "version": "3.1",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "治疗",
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Heal",
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 320,
      "hp": 3800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Mineral carriers gain Healing Done +12%–24% on entry; whenever an ally takes DMG, they gain Ultimate Might +2%–4% at round end (up to 6 stacks).",
    "passiveZh": "岩灵感记忆者入场治疗率 +12%–24%；友方受到伤害后于回合末获得仪式威力 +2%–4%（至多 6 层）。"
  },
  {
    "id": "1555",
    "name": "汇入涓流中",
    "en": "Into the Gentle Current",
    "star": 6,
    "version": "s01",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "暴击",
      "生存"
    ],
    "tagsEn": [
      "Critical",
      "Survival"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3800,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Mineral carriers gain Ultimate Might +4%–8% at round start (up to 3 stacks); casting Ultimate with 50+ Max Bloodtithe grants Critical DMG +16%–32%.",
    "passiveZh": "岩灵感记忆者回合初仪式威力 +4%–8%（至多 3 层）；当前薪血上限达 50 以上释放仪式时暴击创伤 +16%–32%。"
  },
  {
    "id": "1554",
    "name": "向种子呢喃",
    "en": "Buds Yet to Bloom",
    "star": 6,
    "version": "3.0",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Spirit carriers attacking while in Channel gain DMG Dealt +8%–16%; transferring Dynamo into Pulsing Field grants all allies Critical DMG +4%–8% at round end (up to 3 stacks).",
    "passiveZh": "灵灵感记忆者处于吟诵状态攻击时造成伤害 +8%–16%；回合内向涌动电场转移电能时，回合末全队暴击创伤 +4%–8%（至多 3 层）。"
  },
  {
    "id": "1553",
    "name": "归乡哀悼词",
    "en": "Homecoming Lament",
    "star": 6,
    "version": "3.0",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "暴击",
      "生存"
    ],
    "tagsEn": [
      "Critical",
      "Survival"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3800,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Mineral carriers attacking with 50+ Max Bloodtithe gain DMG Dealt +8%–16%; each time the carrier takes DMG, gains Critical DMG +2%–4% at round end (up to 9 stacks).",
    "passiveZh": "岩灵感记忆者在全队薪血上限达 50 以上攻击时造成伤害 +8%–16%；每次受击于回合末获得暴击创伤 +2%–4%（至多 9 层）。"
  },
  {
    "id": "1552",
    "name": "史诗的终点",
    "en": "An Epic's End",
    "star": 6,
    "version": "s01",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Assassination carriers gain Final DMG Dealt +1%–2% per 100 Critical Technique above the target; when any ally triggers Assassination while holding a Force Field, all allies gain DMG Dealt +1%–2% (up to 6 stacks).",
    "passiveZh": "刺杀角色暴击技巧每高于目标 100 点最终伤害 +1%–2%；持有力场时友方触发刺杀使全队造成伤害 +1%–2%（至多 6 层）。"
  },
  {
    "id": "1551",
    "name": "钟响于暮色",
    "en": "As the Bell Tolls",
    "star": 6,
    "version": "s01",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Assassination carriers gain Final DMG Dealt +1%–2% per 100 Critical Technique above the target; triggering 1-target Assassination grants Critical DMG +6%–12% (up to 3 stacks).",
    "passiveZh": "刺杀角色暴击技巧每高于目标 100 点最终伤害 +1%–2%；触发单体刺杀时记忆者暴击创伤 +6%–12%（至多 3 层）。"
  },
  {
    "id": "1550",
    "name": "思维一激灵",
    "en": "A Tingle of a Thought",
    "star": 6,
    "version": "2.8",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Intellect carriers gain ATK +1%–3% after Channel incantations (up to 3 stacks); each team Dynamo transfer grants the carrier Critical DMG +1.2%–2% at round end (up to 16 stacks).",
    "passiveZh": "智灵感记忆者释放吟诵咒语后攻击力 +1%–3%（至多 3 层）；回合内全队每次转移电能使记忆者回合末暴击创伤 +1.2%–2%（至多 16 层）。"
  },
  {
    "id": "1549",
    "name": "家庭指导员",
    "en": "Family Mentor",
    "star": 6,
    "version": "2.8",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Launching a Riposte grants Ultimate Might +4%–8% (up to 3 stacks); Beast carriers grant all allies Critical DMG +0.4%–0.8% per Moxie consumed by the team (up to 30 stacks).",
    "passiveZh": "发动反击后记忆者仪式威力 +4%–8%（至多 3 层）；兽灵感记忆者在全队每消耗 1 点激情时使全队暴击创伤 +0.4%–0.8%（至多 30 层）。"
  },
  {
    "id": "1548",
    "name": "心音墓志铭",
    "en": "Embrace the Past",
    "star": 6,
    "version": "2.8",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "暴击",
      "生存"
    ],
    "tagsEn": [
      "Critical",
      "Survival"
    ],
    "stats60": {
      "atk": 390,
      "hp": 4300,
      "rDef": 90,
      "mDef": 90,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Spirit carriers gain Max HP +5%–15% on entry and Critical Rate +1%–2% at round end per hit taken (up to 16 stacks); attacking below 80% HP with 50+ Max Bloodtithe grants Critical DMG +24%–48%.",
    "passiveZh": "灵灵感入场最大生命 +5%–15%，受击于回合末叠暴击率 +1%–2%（至多 16 层）；生命低于 80% 且薪血上限达 50 攻击时暴击创伤 +24%–48%。"
  },
  {
    "id": "1547",
    "name": "春日轻步至",
    "en": "Aurora After Winter",
    "star": 6,
    "version": "2.7",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Casting Buff incantations grants ATK +0.4%–0.8% (up to 10 stacks); Star carriers grant all allies Critical DMG +0.4%–0.8% per Eureka consumed by allies (up to 30 stacks).",
    "passiveZh": "释放增益咒语使记忆者攻击力 +0.4%–0.8%（至多 10 层）；星灵感记忆者在友方每消耗 1 点灵光时使全队暴击创伤 +0.4%–0.8%（至多 30 层）。"
  },
  {
    "id": "1546",
    "name": "双焦点问答",
    "en": "Never-Ending Q&A",
    "star": 6,
    "version": "2.7",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Casting a 1-target Ultimate grants Ultimate Might +3%–6% (up to 4 stacks); casting a mass Ultimate grants Critical DMG +6%–12% (up to 3 stacks).",
    "passiveZh": "释放单体至终的仪式后仪式威力 +3%–6%（至多 4 层）；释放群体至终的仪式后暴击创伤 +6%–12%（至多 3 层）。"
  },
  {
    "id": "1545",
    "name": "脑室即囚室",
    "en": "Mental Cage",
    "star": 6,
    "version": "2.6",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击",
      "辅助"
    ],
    "tagsEn": [
      "ATK",
      "Support"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 160,
      "mDef": 150,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "Gains Eureka +2 on entry; beyond 4 team casts per round, each cast grants all allies DMG Dealt +3%–6% for 1 round (up to 3 stacks); Intellect carriers grant all allies Incantation Might +0.2%–0.4% per Eureka consumed (up to 30 stacks).",
    "passiveZh": "入场灵光 +2；单回合全队出牌超 4 次后每次使全队造成伤害 +3%–6%（至多 3 层）；智灵感在友方每消耗 1 点灵光时使全队术法威力 +0.2%–0.4%（至多 30 层）。"
  },
  {
    "id": "1544",
    "name": "最后的投掷",
    "en": "The Final Roll",
    "star": 6,
    "version": "2.6",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 150,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Attacking grants Ultimate Might +1.2%–2.4% per Moxie held; Mineral carriers gain Critical DMG +1%–2% per Moxie consumed (up to 16 stacks).",
    "passiveZh": "攻击时每持有 1 点激情仪式威力 +1.2%–2.4%；岩灵感记忆者每消耗 1 点激情暴击创伤 +1%–2%（至多 16 层）。"
  },
  {
    "id": "1543",
    "name": "造梦的预演",
    "en": "Rehearsal of Dreams",
    "star": 6,
    "version": "2.5",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "Plant carriers gain Ultimate Might +1%–2% per Neg Status actively inflicted (up to 12 stacks); Ultimates gain DMG Dealt +3%–6% per type of Stats Down, Neg Status, or Control on the target (up to 4 types).",
    "passiveZh": "木灵感主动附加状态异常时仪式威力 +1%–2%（至多 12 层）；释放仪式时目标每有 1 种属性削弱/状态异常/控制，造成伤害 +3%–6%（至多计 4 种）。"
  },
  {
    "id": "1542",
    "name": "收到请回答",
    "en": "Ready on Call",
    "star": 6,
    "version": "2.5",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 390,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Extra Actions stack Critical Rate +1%–2% (up to 6) after an active 1-target attack and Critical DMG +2%–4% (up to 6) after an active 1-target buff; both bonuses double at max stacks.",
    "passiveZh": "本回合主动释放单体攻击/增益后，额外行动分别叠暴击率 +1%–2% 与暴击创伤 +2%–4%（各至多 6 层），双满层时加成翻倍。"
  },
  {
    "id": "1541",
    "name": "惶然的贝壳",
    "en": "Cracks in the Shell",
    "star": 6,
    "version": "2.4",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "治疗",
      "辅助"
    ],
    "tagsEn": [
      "Heal",
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Extra Actions grant Healing Done +4%–8% (up to 3 stacks); after being attacked or sharing damage, all allies gain Critical DMG +1.2%–2.4% for 3 rounds (up to 12 stacks).",
    "passiveZh": "发动额外行动后治疗率 +4%–8%（至多 3 层）；记忆者受击或分摊伤害后，己方全体暴击创伤 +1.2%–2.4%（持续 3 回合，至多 12 层）。"
  },
  {
    "id": "1540",
    "name": "离别变奏曲",
    "en": "Addio Coda",
    "star": 6,
    "version": "2.4",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2800,
      "rDef": 140,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Each Eureka consumed by allies accumulates Inspiration and grants all allies DMG Dealt +0.3%–0.6% (up to 20 stacks); Star carriers add +1 attack instance to Impromptu Incantation (1–2 times per round).",
    "passiveZh": "友方每消耗 1 点灵光累积启示并使全队造成伤害 +0.3%–0.6%（至多 20 层）；星灵感行动后本回合即兴咒语攻击次数 +1（每回合至多 1–2 次）。"
  },
  {
    "id": "1539",
    "name": "秒针栖息地",
    "en": "On the Hand of Time",
    "star": 6,
    "version": "2.3",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical DMG +24%",
      "subStatZh": "暴击创伤 +24%"
    },
    "passiveEn": "Attacking while in Channel grants Penetration Rate +14%–28%; Extra Actions grant Critical DMG +6%–12% (up to 3 stacks, -1 stack at round end).",
    "passiveZh": "处于吟诵状态攻击时穿透率 +14%–28%；发动额外行动获得暴击创伤 +6%–12%（至多 3 层，回合末减 1 层）。"
  },
  {
    "id": "1538",
    "name": "无韵律跳步",
    "en": "Offbeat Strides",
    "star": 6,
    "version": "2.3",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "生存"
    ],
    "tagsEn": [
      "ATK",
      "Survival"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Gains +1 Moxie on entry and Genesis DMG +0.4%–0.8% / DMG Taken -0.4%–0.8% per Moxie consumed (up to 25 stacks); ending a round in Channel grants Poison DMG +2%–4% for 3 rounds (up to 5 stacks).",
    "passiveZh": "入场激情 +1，每消耗 1 点激情本源伤 +0.4%–0.8% 且受创 -0.4%–0.8%（至多 25 层）；回合末处于吟诵时中毒伤害 +2%–4%（持续 3 回合，至多 5 层）。"
  },
  {
    "id": "1537",
    "name": "第三次信任",
    "en": "The Third Commitment",
    "star": 6,
    "version": "2.2",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2800,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Triggering a Bullet effect grants Critical DMG +16%–32% for 2 rounds; the carrier's deployed Array additionally grants all allies Incantation Might +6%–12% and Ultimate Might +6%–12%.",
    "passiveZh": "攻击触发术弹效果时暴击创伤 +16%–32%（持续 2 回合）；记忆者展开的术阵额外赋予全队术法威力与仪式威力各 +6%–12%。"
  },
  {
    "id": "1536",
    "name": "非物质真情",
    "en": "Transcendent Love",
    "star": 6,
    "version": "2.2",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 390,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Casting incantations in Channel grants Critical Rate & Critical DMG +2%–4% (up to 4 stacks); while bound to an ally, casts by either unit grant both DMG Bonus +0.8%–1.6% (up to 10 stacks).",
    "passiveZh": "吟诵状态下出牌使双暴各 +2%–4%（至多 4 层）；缔约期间双方每次出牌使双方创伤加成 +0.8%–1.6%（至多 10 层）。"
  },
  {
    "id": "1535",
    "name": "微渺的愿景",
    "en": "Tiny Wish",
    "star": 6,
    "version": "2.3",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 3000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Redirects allied Stress gains to the carrier; on first Focus or Meltdown, triggers Focus Behavior, grants all allies ATK +10%–20% and DMG Taken -6%–12%, and ends Stress transfer.",
    "passiveZh": "将友方承受的压力转移至记忆者；首次触发专注或崩溃时同步触发专注行为，赋予全队攻击 +10%–20%、受创 -6%–12% 并停止转移压力。"
  },
  {
    "id": "1534",
    "name": "寻入夜深处",
    "en": "Stray Off the Path",
    "star": 6,
    "version": "2.1",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Active 1-target casts boost the next Extra Action's Incantation Might by +12%–24% that round and stack Critical DMG +6%–12% (up to 3 stacks, cleared on mass incantation).",
    "passiveZh": "主动释放单体咒语后，本回合下次额外行动术法威力 +12%–24%，并叠加暴击创伤 +6%–12%（至多 3 层，释放群攻后清除）。"
  },
  {
    "id": "1533",
    "name": "女佣看见了",
    "en": "And the Maid Says",
    "star": 6,
    "version": "2.1",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "辅助",
      "暴击"
    ],
    "tagsEn": [
      "Support",
      "Critical"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "The carrier's deployed Array grants all allies Poison DMG Dealt +4%–8% and an additional Poison DMG Dealt +4%–8% to the carrier while active.",
    "passiveZh": "记忆者展开的术阵持续期间，使己方全体中毒伤害 +4%–8%，记忆者自身额外获得中毒伤害 +4%–8%。"
  },
  {
    "id": "1532",
    "name": "漫行如泉流",
    "en": "Starlight Wellspring",
    "star": 6,
    "version": "2.0",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2200,
      "rDef": 150,
      "mDef": 170,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "Holding both Stats Up and Force Field grants Critical Rate +12% when attacking; Primal Afflatus carriers gain Incantation & Ultimate Might +2.5%–4.5% after mass buff incantations (up to 4 stacks).",
    "passiveZh": "同时持有属性提升与力场时攻击暴击率 +12%；原生灵感释放群体增益咒语后术法与仪式威力各 +2.5%–4.5%（至多 4 层）。"
  },
  {
    "id": "1531",
    "name": "不可诉之轻",
    "en": "The Unbearable Lightness",
    "star": 6,
    "version": "2.0",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 370,
      "hp": 2200,
      "rDef": 170,
      "mDef": 160,
      "subStatEn": "DMG Bonus +12%",
      "subStatZh": "创伤加成 +12%"
    },
    "passiveEn": "Attacking while affected by Burn grants Incantation Might +4%–12%; performing a mass Riposte grants ATK +1%–2% (up to 6 stacks).",
    "passiveZh": "自身处于燃烧状态攻击时术法威力 +4%–12%；发动群体反击后记忆者攻击力 +1%–2%（至多 6 层）。"
  },
  {
    "id": "1530",
    "name": "来自最深处",
    "en": "From the Depths",
    "star": 6,
    "version": "2.0",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击",
      "生存"
    ],
    "tagsEn": [
      "ATK",
      "Survival"
    ],
    "stats60": {
      "atk": 380,
      "hp": 1600,
      "rDef": 180,
      "mDef": 190,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "Mineral carriers gain Echoes of Life when allies lose HP 3+ times in a single carrier action, and stack Incantation Might +0.9%–2.1% whenever an ally loses HP during allied actions (up to 10 stacks).",
    "passiveZh": "岩灵感单次行动令友方掉血 3 次以上获生命回响；友方行动致我方掉血时叠加术法威力 +0.9%–2.1%（至多 10 层）。"
  },
  {
    "id": "1529",
    "name": "渐近的雨声",
    "en": "Approaching Rain",
    "star": 6,
    "version": "1.9",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "生存"
    ],
    "tagsEn": [
      "Survival"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2800,
      "rDef": 190,
      "mDef": 150,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "Using a 1-target Counter Ultimate grants DMG Heal +10%–20% for 2 rounds; the carrier's Ripostes gain Genesis DMG +30%–60%.",
    "passiveZh": "释放单体反制至终的仪式后受创回复 +10%–20%（持续 2 回合）；记忆者反击造成的本源创伤 +30%–60%。"
  },
  {
    "id": "1528",
    "name": "勇敢者赠言",
    "en": "The Fighter's Best Wishes",
    "star": 6,
    "version": "1.9",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存"
    ],
    "tagsEn": [
      "Survival"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2800,
      "rDef": 170,
      "mDef": 190,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "At round start below 60%–80% HP, gains DMG Taken -10%; when attacking, gains Genesis DMG Dealt +7%–15%.",
    "passiveZh": "回合初生命低于 60%–80% 时受创 -10%；记忆者攻击时本源创伤 +7%–15%。"
  },
  {
    "id": "1527",
    "name": "行进的步音",
    "en": "Steps Forward",
    "star": 6,
    "version": "1.9",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 390,
      "hp": 2000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "DMG Bonus +12%",
      "subStatZh": "创伤加成 +12%"
    },
    "passiveEn": "Intellect carriers gain Critical Rate +6%; holding 2+ Special effects grants Incantation Might +6%–18% (upgraded to +12%–24% and Critical Rate +3%–9% if also holding a Force Field).",
    "passiveZh": "智灵感暴击率 +6%；持有 2 种以上特殊状态攻击时术法威力 +6%–18%，若同时持有力场则改为术法威力 +12%–24% 且暴击率 +3%–9%。"
  },
  {
    "id": "1526",
    "name": "故尝试证明",
    "en": "For Rehabilitation",
    "star": 6,
    "version": "1.8",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击",
      "攻击"
    ],
    "tagsEn": [
      "Critical",
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2100,
      "rDef": 180,
      "mDef": 180,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Star carriers gain Incantation Might +5%; within the round after casting Ultimate, each 1-target attack incantation permanently grants DMG Dealt +4%–8% (up to 3 stacks).",
    "passiveZh": "星灵感术法威力 +5%；释放至终的仪式当回合内，每次使用单体攻击咒语永久获得造成伤害 +4%–8%（至多 3 层）。"
  },
  {
    "id": "1525",
    "name": "黎明将到来",
    "en": "Dawn Is Coming",
    "star": 6,
    "version": "1.8",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "治疗"
    ],
    "tagsEn": [
      "Heal"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2700,
      "rDef": 150,
      "mDef": 180,
      "subStatEn": "Healing Done +18%",
      "subStatZh": "治疗率 +18%"
    },
    "passiveEn": "After casting a 1-target Buff incantation, heals the lowest-HP% ally for 24%–48% of the carrier's ATK (once per round).",
    "passiveZh": "释放单体增益咒语后，为生命百分比最低的友方回复记忆者攻击力 ×24%–48% 的生命（每回合至多 1 次）。"
  },
  {
    "id": "1524",
    "name": "另一个故事",
    "en": "Another Story",
    "star": 6,
    "version": "1.7",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2200,
      "rDef": 140,
      "mDef": 180,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "Casting Rank 2/3 incantations stacks DMG Dealt +1%–3% / +2%–6% (up to +8%–24%); consuming 2+ Eureka in a round grants Incantation Might +10%–18% until round end.",
    "passiveZh": "释放 2/3 阶咒语叠加造成伤害 +1%–3% / +2%–6%（上限 +8%–24%）；单回合消耗 2 点以上灵光时本回合术法威力 +10%–18%。"
  },
  {
    "id": "1523",
    "name": "敲响这窄门",
    "en": "Knock on the Door",
    "star": 6,
    "version": "1.7",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击"
    ],
    "tagsEn": [
      "Critical"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2400,
      "rDef": 150,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Attacking enemies with Burn grants DMG Dealt +6%; mass Extra Action attacks gain Incantation Might +4%–28%.",
    "passiveZh": "攻击处于燃烧状态的敌人时造成伤害 +6%；群体额外行动攻击术法威力 +4%–28%。"
  },
  {
    "id": "1522",
    "name": "此刻无新事",
    "en": "Same Old Story",
    "star": 6,
    "version": "1.6",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 370,
      "hp": 1900,
      "rDef": 160,
      "mDef": 170,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "Beast carriers gain Penetration Rate +5%; mass attacks while in Channel gain DMG Dealt +12%–28%.",
    "passiveZh": "兽灵感穿透率 +5%；处于吟诵状态时，群体攻击造成伤害 +12%–28%。"
  },
  {
    "id": "1521",
    "name": "在四方城外",
    "en": "Outside the City",
    "star": 6,
    "version": "1.6",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击"
    ],
    "tagsEn": [
      "Critical"
    ],
    "stats60": {
      "atk": 370,
      "hp": 2400,
      "rDef": 170,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "Each 1-target Extra Action attack stacks Critical DMG +2%–5% (up to 10 stacks); at max stacks, gains an extra Critical Rate +8%–12%.",
    "passiveZh": "每次发动单体额外行动攻击叠加暴击创伤 +2%–5%（至多 10 层）；叠满 10 层时额外获得暴击率 +8%–12%。"
  },
  {
    "id": "1515",
    "name": "漫长悄悄话",
    "en": "Long Night Talk",
    "star": 6,
    "version": "1.5",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2000,
      "rDef": 170,
      "mDef": 160,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "Holding 2+ Pos Status buffs grants DMG Dealt +8% when attacking; casting Buff incantations stacks ATK +2%–2.5% (up to 2–5 stacks).",
    "passiveZh": "持有 2 种以上状态增益攻击时造成伤害 +8%；释放增益咒语叠加攻击力 +2%–2.5%（至多 2–5 层）。"
  },
  {
    "id": "1514",
    "name": "请保持平衡",
    "en": "Balance, Please",
    "star": 6,
    "version": "1.4",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2200,
      "rDef": 170,
      "mDef": 170,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "Attacking without Afflatus advantage grants DMG Dealt +6%–12%, increased to +12%–24% for Primal Afflatus carriers.",
    "passiveZh": "攻击非灵感克制目标时造成伤害 +6%–12%；若记忆者为原生灵感（灵/智），该加成提升至 +12%–24%。"
  },
  {
    "id": "1513",
    "name": "沉默与向往",
    "en": "Silent and Adoring",
    "star": 6,
    "version": "1.4",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 350,
      "hp": 2000,
      "rDef": 170,
      "mDef": 170,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "Extra Actions gain DMG Dealt +12%, and Genesis DMG dealt through Extra Actions increases by +10%–50%.",
    "passiveZh": "额外行动造成伤害 +12%，且通过额外行动造成的本源创伤额外提升 +10%–50%。"
  },
  {
    "id": "1512",
    "name": "可度量之心",
    "en": "The Carat of a Heart",
    "star": 6,
    "version": "1.3",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2600,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "At round end, gaining 3+ Moxie grants the next Ultimate Ultimate Might +8%–16% (increased to +12%–24% if 4+ Moxie was gained).",
    "passiveZh": "回合末若本回合获得至少 3 点激情，下次仪式威力 +8%–16%；若获得至少 4 点激情，则提升至 +12%–24%。"
  },
  {
    "id": "1511",
    "name": "在仙境之外",
    "en": "Beyond Wonderland",
    "star": 6,
    "version": "1.2",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "攻击",
      "暴击",
      "治疗"
    ],
    "tagsEn": [
      "ATK",
      "Critical",
      "Heal"
    ],
    "stats60": {
      "atk": 350,
      "hp": 2600,
      "rDef": 150,
      "mDef": 160,
      "subStatEn": "HP +16%",
      "subStatZh": "生命值 +16%"
    },
    "passiveEn": "Increases Critical Rate by +7%–21%; casting Debuff incantations stacks Healing Done +3% (up to 4 stacks).",
    "passiveZh": "记忆者暴击率 +7%–21%；释放减益咒语叠加治疗率 +3%（至多 4 层）。"
  },
  {
    "id": "1510",
    "name": "必要的记录",
    "en": "His Bounden Duty",
    "star": 6,
    "version": "1.0",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击",
      "治疗"
    ],
    "tagsEn": [
      "ATK",
      "Heal"
    ],
    "stats60": {
      "atk": 410,
      "hp": 2000,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "DMG Bonus +12%",
      "subStatZh": "创伤加成 +12%"
    },
    "passiveEn": "For each enemy defeated by the carrier, restores HP equal to 60%–120% of the carrier's ATK.",
    "passiveZh": "记忆者每击败 1 名敌方目标，回复自身攻击力 ×60%–120% 的生命值。"
  },
  {
    "id": "1509",
    "name": "大娱乐至上",
    "en": "Luxurious Leisure",
    "star": 6,
    "version": "1.1",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 380,
      "hp": 2200,
      "rDef": 170,
      "mDef": 170,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "After casting a 1-target Ultimate, gains DMG Dealt +5%–9% (up to 3 stacks).",
    "passiveZh": "释放单体至终的仪式后，记忆者造成伤害 +5%–9%（至多叠加 3 层）。"
  },
  {
    "id": "1508",
    "name": "好奇心宝贝",
    "en": "That Inquisitive Dear",
    "star": 6,
    "version": "1.0",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "治疗"
    ],
    "tagsEn": [
      "Heal"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2600,
      "rDef": 180,
      "mDef": 160,
      "subStatEn": "Healing Done +18%",
      "subStatZh": "治疗率 +18%"
    },
    "passiveEn": "After casting a basic Debuff incantation, heals the lowest-HP% ally for 24%–48% of the carrier's ATK (once per round).",
    "passiveZh": "释放普通减益咒语后，为生命百分比最低的友方回复记忆者攻击力 ×24%–48% 的生命（每回合至多 1 次）。"
  },
  {
    "id": "1507",
    "name": "掌声如雷鸣",
    "en": "Thunderous Applause",
    "star": 6,
    "version": "1.0",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 330,
      "hp": 2200,
      "rDef": 180,
      "mDef": 170,
      "subStatEn": "Critical Rate +16%",
      "subStatZh": "暴击率 +16%"
    },
    "passiveEn": "When the carrier's 1-target attack scores a critical hit, gains Critical DMG +16%–32%.",
    "passiveZh": "记忆者的单体攻击触发暴击时，本次攻击暴击创伤 +16%–32%。"
  },
  {
    "id": "1504",
    "name": "夜色亵渎者",
    "en": "Blasphemer of Night",
    "star": 6,
    "version": "1.0",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 2200,
      "rDef": 180,
      "mDef": 180,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "When attacking a target afflicted with 2 or more Neg Status effects, gains DMG Dealt +12%–24%.",
    "passiveZh": "攻击持有 2 种及以上状态异常的敌方目标时，造成伤害 +12%–24%。"
  },
  {
    "id": "1503",
    "name": "第二次生命",
    "en": "Her Second Life",
    "star": 6,
    "version": "1.0",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "治疗"
    ],
    "tagsEn": [
      "Heal"
    ],
    "stats60": {
      "atk": 350,
      "hp": 2800,
      "rDef": 120,
      "mDef": 220,
      "subStatEn": "ATK +10%",
      "subStatZh": "攻击力 +10%"
    },
    "passiveEn": "After casting a mass Ultimate, heals all allies for 32%–64% of the carrier's ATK.",
    "passiveZh": "释放群体至终的仪式后，使己方全体回复记忆者攻击力 ×32%–64% 的生命值。"
  },
  {
    "id": "1502",
    "name": "跳房子游戏",
    "en": "Hopscotch",
    "star": 6,
    "version": "1.0",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 370,
      "hp": 2200,
      "rDef": 150,
      "mDef": 200,
      "subStatEn": "Incantation Might +18%",
      "subStatZh": "术法威力 +18%"
    },
    "passiveEn": "For each enemy defeated by the carrier, gains Ultimate Might +4%–8% (up to 4 stacks).",
    "passiveZh": "记忆者每击败 1 名敌方目标，仪式威力 +4%–8%（至多叠加 4 层）。"
  },
  {
    "id": "1501",
    "name": "美丽新世界",
    "en": "Brave New World",
    "star": 6,
    "version": "1.0",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 370,
      "hp": 2200,
      "rDef": 200,
      "mDef": 150,
      "subStatEn": "Ultimate Might +18%",
      "subStatZh": "仪式威力 +18%"
    },
    "passiveEn": "After casting an Ultimate, the carrier's next incantation gains Incantation Might +20%–40%.",
    "passiveZh": "释放至终的仪式后，记忆者下一次释放咒语的术法威力 +20%–40%。"
  },
  {
    "id": "4104",
    "name": "笑语欢声",
    "en": "Laughter and Laughter",
    "star": 5,
    "version": "1.0",
    "stat": "受创减免",
    "statEn": "DMG Taken Reduction",
    "tags": [
      "治疗",
      "生存"
    ],
    "tagsEn": [
      "Heal",
      "Survival"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2200,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "DMG Taken Reduction +10%",
      "subStatZh": "受创减免 +10%"
    },
    "passiveEn": "At the start of each round, gains Healing Done +3% (stacks up to 4–8 times).",
    "passiveZh": "每回合开始时，记忆者治疗率 +3%（至多叠加 4–8 层）。"
  },
  {
    "id": "4103",
    "name": "自由的心",
    "en": "A Free Heart",
    "star": 5,
    "version": "1.0",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存"
    ],
    "tagsEn": [
      "Survival"
    ],
    "stats60": {
      "atk": 260,
      "hp": 2200,
      "rDef": 160,
      "mDef": 160,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "When attacked while below 50% HP, gains DMG Taken -10%–20%.",
    "passiveZh": "生命低于 50% 受击时，记忆者受创减免 +10%–20%。"
  },
  {
    "id": "1452",
    "name": "完满之路",
    "en": "The Path to Perfection",
    "star": 5,
    "version": "4.1",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2000,
      "rDef": 130,
      "mDef": 130,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "4.1 Anecdote 5-star support Psychube: enhances team DMG Bonus and offensive consistency in combat.",
    "passiveZh": "4.1 轶事 5 星辅助心相：为队伍提供稳定的创伤加成与输出过渡收益。"
  },
  {
    "id": "1451",
    "name": "当下之喜",
    "en": "Living in the Moment",
    "star": 5,
    "version": "4.0",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击",
      "辅助"
    ],
    "tagsEn": [
      "Critical",
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2000,
      "rDef": 130,
      "mDef": 130,
      "subStatEn": "Critical Rate +13%",
      "subStatZh": "暴击率 +13%"
    },
    "passiveEn": "4.0 Anecdote 5-star critical Psychube: scales DMG Bonus against enemies afflicted with Halo / Lingering Glow statuses.",
    "passiveZh": "4.0 轶事 5 星暴击心相：针对持有光晕/余辉体系状态的敌方提供额外创伤加成。"
  },
  {
    "id": "1450",
    "name": "以饰真相",
    "en": "Dressing Up the Truth",
    "star": 5,
    "version": "3.9",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1800,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Attacking a target below 50% HP grants DMG Dealt +20%–40%, plus another +20%–40% if below 30% HP.",
    "passiveZh": "攻击生命低于 50% 的目标时造成伤害 +20%–40%；目标生命低于 30% 时再额外 +20%–40%。"
  },
  {
    "id": "1449",
    "name": "暂别旧夜",
    "en": "Farewell to the Old Night",
    "star": 5,
    "version": "3.8",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2200,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "Plant carriers grant all allies DMG Dealt +6%–12% and Genesis DMG +6%–12% upon entering battle.",
    "passiveZh": "进入战斗时若记忆者为木灵感，使己方全体造成伤害 +6%–12%、本源创伤 +6%–12%。"
  },
  {
    "id": "1448",
    "name": "成长阵痛",
    "en": "Growing Pains",
    "star": 5,
    "version": "3.7",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1800,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Plant carriers grant all allies Ultimate Might +2%–4% for 3 rounds after attacking (up to 4 stacks).",
    "passiveZh": "木灵感记忆者攻击后，使己方全体仪式威力 +2%–4%（持续 3 回合，至多 4 层）。"
  },
  {
    "id": "1447",
    "name": "天助自助",
    "en": "Luck Be a Lady",
    "star": 5,
    "version": "3.5",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1800,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Attacking with a Rank 1/2/3 incantation grants Ultimate Might +8%–16% / +12%–24% / +18%–36%.",
    "passiveZh": "使用 1/2/3 阶咒语攻击时，记忆者仪式威力分别 +8%–16% / +12%–24% / +18%–36%。"
  },
  {
    "id": "1446",
    "name": "无事听风",
    "en": "The Wind's Listener",
    "star": 5,
    "version": "3.4",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2000,
      "rDef": 130,
      "mDef": 130,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Beast carriers' deployed Array additionally grants all allies Ultimate Might +10%–18% while active.",
    "passiveZh": "兽灵感记忆者展开的术阵持续期间，额外赋予己方全体仪式威力 +10%–18%。"
  },
  {
    "id": "1445",
    "name": "世多别离",
    "en": "Parting's Quiet Lament",
    "star": 5,
    "version": "3.3",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2000,
      "rDef": 130,
      "mDef": 130,
      "subStatEn": "Critical DMG +20%",
      "subStatZh": "暴击创伤 +20%"
    },
    "passiveEn": "Plant carriers' Rank 3 casts grant all allies Incantation Might +6%–12% for 3 rounds; Beast carriers' Ultimates grant all allies Ultimate Might +6%–12% for 3 rounds.",
    "passiveZh": "木灵感释放 3 阶咒语后全队术法威力 +6%–12%（3 回合）；兽灵感释放仪式后全队仪式威力 +6%–12%（3 回合）。"
  },
  {
    "id": "1444",
    "name": "“倒影”所指",
    "en": "In Their Figures",
    "star": 5,
    "version": "3.2",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 340,
      "hp": 2000,
      "rDef": 130,
      "mDef": 130,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "For each Eureka consumed by the team, grants all allies Incantation Might +0.2%–0.6% (up to 30 stacks).",
    "passiveZh": "全队每消耗 1 点灵光，己方全体术法威力 +0.2%–0.6%（至多 30 层）。"
  },
  {
    "id": "1443",
    "name": "碑文已逝",
    "en": "Faded Epitaphs",
    "star": 5,
    "version": "3.1",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "On entry, grants all Mineral allies DMG Dealt +2%–4% per Mineral ally present (up to 4 stacks).",
    "passiveZh": "入场时场上每有 1 名岩灵感友方，使全体岩灵感友方造成伤害 +2%–4%（至多 4 层）。"
  },
  {
    "id": "1442",
    "name": "偷天换日",
    "en": "Substitutes and Simulacra",
    "star": 5,
    "version": "3.0",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 260,
      "hp": 2600,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Grants Critical Rate +8%–16%; triggering a Bullet effect grants Critical DMG +16%–32% for 2 rounds.",
    "passiveZh": "记忆者暴击率 +8%–16%；攻击触发术弹效果后暴击创伤 +16%–32%（持续 2 回合）。"
  },
  {
    "id": "1441",
    "name": "路边尘埃",
    "en": "Dust on the Roadside",
    "star": 5,
    "version": "2.8",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Attacking grants Penetration Rate +2%–4% per Poison instance on the target; Plant carriers gain Critical DMG +12%–24%.",
    "passiveZh": "攻击时目标每有 1 层中毒穿透率 +2%–4%；若记忆者为木灵感，暴击创伤 +12%–24%。"
  },
  {
    "id": "1440",
    "name": "新旧歌谣",
    "en": "Melodies Old and New",
    "star": 5,
    "version": "2.7",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "治疗",
      "辅助"
    ],
    "tagsEn": [
      "Heal",
      "Support"
    ],
    "stats60": {
      "atk": 260,
      "hp": 2600,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "Gains Healing Done +12%–16% on entry; at round start, all allies gain DMG Dealt +1%–3% (up to 3 stacks).",
    "passiveZh": "入场治疗率 +12%–16%；每回合开始时己方全体造成伤害 +1%–3%（至多 3 层）。"
  },
  {
    "id": "1439",
    "name": "镜头注脚",
    "en": "Off the Scene",
    "star": 5,
    "version": "2.6",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 260,
      "hp": 2600,
      "rDef": 200,
      "mDef": 100,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "Casting Buff incantations grants all allies DMG Dealt +1%–2% (up to 5 stacks); Mineral carriers gain Reality DEF +18%–36%.",
    "passiveZh": "释放增益咒语后全队造成伤害 +1%–2%（至多 5 层）；若记忆者为岩灵感，现实防御 +18%–36%。"
  },
  {
    "id": "1438",
    "name": "惊魂拍档",
    "en": "Your Friendly Exorcist",
    "star": 5,
    "version": "2.5",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "On entry, grants all Plant allies DMG Dealt +2%–4% per Plant ally present (up to 4 stacks).",
    "passiveZh": "入场时场上每有 1 名木灵感友方，使全体木灵感友方造成伤害 +2%–4%（至多 4 层）。"
  },
  {
    "id": "1437",
    "name": "纵情一曲",
    "en": "Belt It Out",
    "star": 5,
    "version": "2.4",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "辅助"
    ],
    "tagsEn": [
      "Support"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "On entry, grants all Star allies DMG Dealt +2%–4% per Star ally present (up to 4 stacks).",
    "passiveZh": "入场时场上每有 1 名星灵感友方，使全体星灵感友方造成伤害 +2%–4%（至多 4 层）。"
  },
  {
    "id": "1436",
    "name": "迷途以外",
    "en": "One with the Flow",
    "star": 5,
    "version": "2.3",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "生存",
      "辅助"
    ],
    "tagsEn": [
      "Survival",
      "Support"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2400,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "HP +8%",
      "subStatZh": "生命值 +8%"
    },
    "passiveEn": "Active casts while holding a Force Field have a 24%–48% chance to grant +1 Moxie; for 3 rounds after Ultimate, allies' Rank 2/3 casts gain DMG Dealt +6%–12% / +8%–16%.",
    "passiveZh": "持有力场主动出牌时有 24%–48% 概率激情 +1；释放仪式后 3 回合内，友方 2/3 阶咒语造成伤害 +6%–12% / +8%–16%。"
  },
  {
    "id": "1435",
    "name": "留置心底",
    "en": "The Severed and the Rest",
    "star": 5,
    "version": "2.2",
    "stat": "精神防御",
    "statEn": "Mental DEF",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "Mental DEF +8%",
      "subStatZh": "精神防御 +8%"
    },
    "passiveEn": "Intellect carriers gain Penetration Rate +8%–16%; attacking enemies with Paralyze or Daze grants DMG Bonus +4%–8% (up to 3 stacks).",
    "passiveZh": "智灵感穿透率 +8%–16%；攻击处于麻痹或眩晕状态的敌人时创伤加成 +4%–8%（至多 3 层）。"
  },
  {
    "id": "1434",
    "name": "落于现象",
    "en": "Falling for a Sweet Phenomenon",
    "star": 5,
    "version": "2.2",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1900,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Star carriers gain Critical DMG +10%–20%; taking an Extra Action stacks Genesis DMG Dealt +6%–12% (up to 5 stacks).",
    "passiveZh": "星灵感暴击创伤 +10%–20%；发动额外行动后本源创伤 +6%–12%（至多 5 层）。"
  },
  {
    "id": "1433",
    "name": "无人问津",
    "en": "The Loner",
    "star": 5,
    "version": "2.1",
    "stat": "生命值",
    "statEn": "HP",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2600,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "HP +14%",
      "subStatZh": "生命值 +14%"
    },
    "passiveEn": "Plant carriers gain DMG Dealt +6%; attacking enemies in Nightmare stacks Penetration Rate +4%–14% (up to 3 stacks).",
    "passiveZh": "木灵感造成伤害 +6%；攻击处于噩梦状态的敌人时穿透率 +4%–14%（至多 3 层）。"
  },
  {
    "id": "1432",
    "name": "绘声绘色",
    "en": "Spinning Yarns",
    "star": 5,
    "version": "2.1",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2200,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Star carriers gain Ultimate Might +5%; scoring critical hits on all targets with a mass Ultimate stacks DMG Dealt +4%–12% (up to 3 stacks).",
    "passiveZh": "星灵感仪式威力 +5%；群体至终的仪式全目标暴击时造成伤害 +4%–12%（至多 3 层）。"
  },
  {
    "id": "1431",
    "name": "自食苦果",
    "en": "You Deserve It",
    "star": 5,
    "version": "2.0",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "攻击",
      "治疗"
    ],
    "tagsEn": [
      "ATK",
      "Heal"
    ],
    "stats60": {
      "atk": 330,
      "hp": 1900,
      "rDef": 150,
      "mDef": 130,
      "subStatEn": "Healing Done +15%",
      "subStatZh": "治疗率 +15%"
    },
    "passiveEn": "After casting a mass Heal incantation, gains Incantation Might +1%–3% and Ultimate Might +1%–3% (up to 5 stacks).",
    "passiveZh": "释放群体治疗咒语后，记忆者术法威力与仪式威力各 +1%–3%（至多 5 层）。"
  },
  {
    "id": "1430",
    "name": "黯然失色",
    "en": "Her Mournful Face",
    "star": 5,
    "version": "2.0",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击",
      "治疗"
    ],
    "tagsEn": [
      "ATK",
      "Heal"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1900,
      "rDef": 130,
      "mDef": 120,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Gains Healing Done +8% and DMG Taken Reduction +6% at round start if under Cure; Plant carriers' inflicted Poison gains DMG Dealt +16%–40%.",
    "passiveZh": "治疗率 +8%，回合初持有愈合时受创减免 +6%；木灵感记忆者附加的中毒伤害 +16%–40%。"
  },
  {
    "id": "1429",
    "name": "踽踽独行",
    "en": "Going Along Alone",
    "star": 5,
    "version": "1.9",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "暴击"
    ],
    "tagsEn": [
      "Critical"
    ],
    "stats60": {
      "atk": 320,
      "hp": 2100,
      "rDef": 140,
      "mDef": 130,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Plant carriers gain Critical Rate +6%; casting a 1-target Ultimate grants Critical DMG +14%–30%.",
    "passiveZh": "木灵感暴击率 +6%；使用单体至终的仪式攻击时暴击创伤 +14%–30%。"
  },
  {
    "id": "1428",
    "name": "形影相随",
    "en": "In the Shadow",
    "star": 5,
    "version": "1.9",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 360,
      "hp": 1100,
      "rDef": 150,
      "mDef": 140,
      "subStatEn": "Incantation Might +15%",
      "subStatZh": "术法威力 +15%"
    },
    "passiveEn": "Mineral carriers gain DMG Taken -5%; Buff incantations stack ATK +0.5%–2% (doubled for 1-target buffs, up to 10%), granting DMG Taken Reduction +3%–7% at max.",
    "passiveZh": "岩灵感受创 -5%；释放增益咒语叠攻击 +0.5%–2%（单体增益翻倍，上限 10%），叠满后额外受创减免 +3%–7%。"
  },
  {
    "id": "1427",
    "name": "无声注视",
    "en": "Silent Gaze",
    "star": 5,
    "version": "1.8",
    "stat": "攻击力",
    "statEn": "ATK",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 310,
      "hp": 1800,
      "rDef": 150,
      "mDef": 140,
      "subStatEn": "ATK +8%",
      "subStatZh": "攻击力 +8%"
    },
    "passiveEn": "Gains DMG Taken -5% on entry; at each round start, gains DMG Bonus +3% (stacks up to 4–8 times).",
    "passiveZh": "入场受创 -5%；每回合开始时记忆者创伤加成 +3%（至多叠加 4–8 层）。"
  },
  {
    "id": "1426",
    "name": "夜夜亦然",
    "en": "Night After Night",
    "star": 5,
    "version": "1.8",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 340,
      "hp": 1500,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "Ultimate Might +15%",
      "subStatZh": "仪式威力 +15%"
    },
    "passiveEn": "Gains DMG Dealt +6% while below 80% HP; when not afflicted with Stats Down, gains Incantation Might +8%–20%.",
    "passiveZh": "生命低于 80% 时造成伤害 +6%；未处于属性削弱状态时术法威力 +8%–20%。"
  },
  {
    "id": "1425",
    "name": "齿轮之外",
    "en": "Beyond the Gears",
    "star": 5,
    "version": "1.7",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "暴击"
    ],
    "tagsEn": [
      "Critical"
    ],
    "stats60": {
      "atk": 310,
      "hp": 2000,
      "rDef": 140,
      "mDef": 150,
      "subStatEn": "Ultimate Might +15%",
      "subStatZh": "仪式威力 +15%"
    },
    "passiveEn": "Attacking a target without Pos Status or Stats Up grants Critical Rate +6%–18% and Critical DMG +6%–18%.",
    "passiveZh": "攻击不持有状态增益与属性提升的敌方目标时，暴击率与暴击创伤各 +6%–18%。"
  },
  {
    "id": "1424",
    "name": "昨日往事",
    "en": "His Tail",
    "star": 5,
    "version": "1.7",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 320,
      "hp": 1900,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Primal Afflatus carriers gain Penetration Rate +5%; attacking targets below 75% HP grants Penetration Rate +6%–14%.",
    "passiveZh": "原生灵感穿透率 +5%；攻击生命低于 75% 的目标时穿透率 +6%–14%。"
  },
  {
    "id": "1423",
    "name": "崭新一页",
    "en": "A New Leaf",
    "star": 5,
    "version": "1.6",
    "stat": "受创减免",
    "statEn": "DMG Taken Reduction",
    "tags": [
      "生存"
    ],
    "tagsEn": [
      "Survival"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2200,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "DMG Taken Reduction +10%",
      "subStatZh": "受创减免 +10%"
    },
    "passiveEn": "Plant carriers gain Critical DEF +8%; when attacked below 40%–60% HP, gains Critical Resist Rate +15%–25%.",
    "passiveZh": "木灵感暴击防御 +8%；生命低于 40%–60% 受击时抗暴率 +15%–25%。"
  },
  {
    "id": "1422",
    "name": "茶歇时间",
    "en": "Tea Break",
    "star": 5,
    "version": "1.6",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 320,
      "hp": 1900,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Attacking an enemy afflicted with Disarm or Silence grants DMG Dealt +14%–28%.",
    "passiveZh": "攻击处于缴械或缄默状态的敌方目标时，造成伤害 +14%–28%。"
  },
  {
    "id": "1421",
    "name": "勇往直前",
    "en": "Let's Set Sail",
    "star": 5,
    "version": "1.5",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2000,
      "rDef": 150,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Attacking a target afflicted with Stats Down grants Critical DMG +14%–28%.",
    "passiveZh": "攻击处于属性削弱状态的敌方目标时，暴击创伤 +14%–28%。"
  },
  {
    "id": "1420",
    "name": "步此苦旅",
    "en": "Take the Hard Journey",
    "star": 5,
    "version": "1.5",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "治疗"
    ],
    "tagsEn": [
      "Heal"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2000,
      "rDef": 150,
      "mDef": 160,
      "subStatEn": "Healing Done +15%",
      "subStatZh": "治疗率 +15%"
    },
    "passiveEn": "When the carrier is below 40%–80% HP, gains Healing Done +12%.",
    "passiveZh": "记忆者生命低于 40%–80% 时，治疗率 +12%。"
  },
  {
    "id": "1414",
    "name": "荒唐余生",
    "en": "Remaining Absurdity",
    "star": 5,
    "version": "1.4",
    "stat": "现实防御",
    "statEn": "Reality DEF",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2000,
      "rDef": 190,
      "mDef": 120,
      "subStatEn": "Reality DEF +8%",
      "subStatZh": "现实防御 +8%"
    },
    "passiveEn": "Making a 1-target attack while holding a Shield grants Incantation Might +10%–20%.",
    "passiveZh": "持有护盾发动单体攻击时，术法威力 +10%–20%。"
  },
  {
    "id": "1413",
    "name": "食足餮满",
    "en": "A Satisfied Eater",
    "star": 5,
    "version": "1.4",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 310,
      "hp": 2000,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "Incantation Might +15%",
      "subStatZh": "术法威力 +15%"
    },
    "passiveEn": "Attacking while below 80% HP grants Penetration Rate +8%–16%.",
    "passiveZh": "生命低于 80% 攻击时，穿透率 +8%–16%。"
  },
  {
    "id": "1411",
    "name": "远大前程",
    "en": "Her Bright Future",
    "star": 5,
    "version": "1.0",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 300,
      "hp": 2000,
      "rDef": 150,
      "mDef": 140,
      "subStatEn": "DMG Bonus +10%",
      "subStatZh": "创伤加成 +10%"
    },
    "passiveEn": "Casting an Ultimate while holding Stats Up grants Ultimate Might +10%–20%.",
    "passiveZh": "持有属性提升释放至终的仪式时，仪式威力 +10%–20%。"
  },
  {
    "id": "1407",
    "name": "午后小憩",
    "en": "An Afternoon Nap",
    "star": 5,
    "version": "1.0",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 280,
      "hp": 2000,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "Critical Rate +13%",
      "subStatZh": "暴击率 +13%"
    },
    "passiveEn": "When a 1-target attack scores a critical hit, gains Critical DMG +3% (stacks up to 4–8 times).",
    "passiveZh": "单体攻击触发暴击时，记忆者暴击创伤 +3%（至多叠加 4–8 层）。"
  },
  {
    "id": "1405",
    "name": "示我以真",
    "en": "Decode",
    "star": 5,
    "version": "1.0",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "治疗",
      "生存"
    ],
    "tagsEn": [
      "Heal",
      "Survival"
    ],
    "stats60": {
      "atk": 300,
      "hp": 1800,
      "rDef": 150,
      "mDef": 150,
      "subStatEn": "Healing Done +15%",
      "subStatZh": "治疗率 +15%"
    },
    "passiveEn": "When attacked by an Ultimate, gains DMG Taken -10%–20%.",
    "passiveZh": "受到至终的仪式攻击时，受创减免 +10%–20%。"
  },
  {
    "id": "1404",
    "name": "无束无拘",
    "en": "The Footloose",
    "star": 5,
    "version": "1.0",
    "stat": "仪式威力",
    "statEn": "Ultimate Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 310,
      "hp": 2000,
      "rDef": 140,
      "mDef": 140,
      "subStatEn": "Ultimate Might +15%",
      "subStatZh": "仪式威力 +15%"
    },
    "passiveEn": "Attacking a target above 50% HP grants DMG Dealt +8%–16%.",
    "passiveZh": "攻击生命高于 50% 的目标时，造成伤害 +8%–16%。"
  },
  {
    "id": "1402",
    "name": "明日亦然",
    "en": "Tomorrow Also",
    "star": 5,
    "version": "1.0",
    "stat": "暴击创伤",
    "statEn": "Critical DMG",
    "tags": [
      "攻击",
      "暴击"
    ],
    "tagsEn": [
      "ATK",
      "Critical"
    ],
    "stats60": {
      "atk": 290,
      "hp": 2000,
      "rDef": 140,
      "mDef": 160,
      "subStatEn": "Critical DMG +20%",
      "subStatZh": "暴击创伤 +20%"
    },
    "passiveEn": "When casting an Ultimate, gains Critical Rate +10%–20%.",
    "passiveZh": "释放至终的仪式时，暴击率 +10%–20%。"
  },
  {
    "id": "1401",
    "name": "心驰神往",
    "en": "Yearning Desire",
    "star": 5,
    "version": "1.0",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 300,
      "hp": 1800,
      "rDef": 160,
      "mDef": 140,
      "subStatEn": "Incantation Might +15%",
      "subStatZh": "术法威力 +15%"
    },
    "passiveEn": "Attacking a target afflicted with Stats Down or Neg Status grants DMG Dealt +8%–16%.",
    "passiveZh": "攻击处于属性削弱或状态异常的目标时，造成伤害 +8%–16%。"
  },
  {
    "id": "1310",
    "name": "静谧",
    "en": "Meek",
    "star": 4,
    "version": "1.0",
    "stat": "治疗率",
    "statEn": "Healing Done",
    "tags": [
      "治疗"
    ],
    "tagsEn": [
      "Heal"
    ],
    "stats60": {
      "atk": 210,
      "hp": 1400,
      "rDef": 110,
      "mDef": 110,
      "subStatEn": "Healing Done +9%",
      "subStatZh": "治疗率 +9%"
    },
    "passiveEn": "4-star Psychube with no Amplification passive (grants Lv.60 base stats and Healing Done +9%).",
    "passiveZh": "4 星心相无增幅被动（提供满级基础属性与治疗率 +9%）。"
  },
  {
    "id": "1309",
    "name": "绿毒",
    "en": "Venomous",
    "star": 4,
    "version": "1.0",
    "stat": "创伤加成",
    "statEn": "DMG Bonus",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 220,
      "hp": 1200,
      "rDef": 120,
      "mDef": 110,
      "subStatEn": "DMG Bonus +6%",
      "subStatZh": "创伤加成 +6%"
    },
    "passiveEn": "4-star Psychube with no Amplification passive (grants Lv.60 base stats and DMG Bonus +6%).",
    "passiveZh": "4 星心相无增幅被动（提供满级基础属性与创伤加成 +6%）。"
  },
  {
    "id": "1308",
    "name": "无餍",
    "en": "Covet",
    "star": 4,
    "version": "1.0",
    "stat": "暴击率",
    "statEn": "Critical Rate",
    "tags": [
      "暴击"
    ],
    "tagsEn": [
      "Critical"
    ],
    "stats60": {
      "atk": 200,
      "hp": 1400,
      "rDef": 110,
      "mDef": 110,
      "subStatEn": "Critical Rate +8%",
      "subStatZh": "暴击率 +8%"
    },
    "passiveEn": "4-star Psychube with no Amplification passive (grants Lv.60 base stats and Critical Rate +8%).",
    "passiveZh": "4 星心相无增幅被动（提供满级基础属性与暴击率 +8%）。"
  },
  {
    "id": "1307",
    "name": "崇奉",
    "en": "Bow",
    "star": 4,
    "version": "1.0",
    "stat": "术法威力",
    "statEn": "Incantation Might",
    "tags": [
      "攻击"
    ],
    "tagsEn": [
      "ATK"
    ],
    "stats60": {
      "atk": 220,
      "hp": 1300,
      "rDef": 110,
      "mDef": 110,
      "subStatEn": "Incantation Might +9%",
      "subStatZh": "术法威力 +9%"
    },
    "passiveEn": "4-star Psychube with no Amplification passive (grants Lv.60 base stats and Incantation Might +9%).",
    "passiveZh": "4 星心相无增幅被动（提供满级基础属性与术法威力 +9%）。"
  },
  {
    "id": "1306",
    "name": "领航",
    "en": "Navigating",
    "star": 4,
    "version": "1.0",
    "stat": "受创减免",
    "statEn": "DMG Taken Reduction",
    "tags": [
      "生存"
    ],
    "tagsEn": [
      "Survival"
    ],
    "stats60": {
      "atk": 190,
      "hp": 1400,
      "rDef": 120,
      "mDef": 120,
      "subStatEn": "DMG Taken Reduction +6%",
      "subStatZh": "受创减免 +6%"
    },
    "passiveEn": "4-star Psychube with no Amplification passive (grants Lv.60 base stats and DMG Taken Reduction +6%).",
    "passiveZh": "4 星心相无增幅被动（提供满级基础属性与受创减免 +6%）。"
  }
];

const PSYCHUBE_BY_ID = new Map();
const PSYCHUBE_BY_NAME = new Map();

for (const p of PSYCHUBES) {
  PSYCHUBE_BY_ID.set(String(p.id), p);
  PSYCHUBE_BY_NAME.set(p.name.normalize('NFKC').trim().toLowerCase(), p);
  if (p.en) PSYCHUBE_BY_NAME.set(p.en.normalize('NFKC').trim().toLowerCase(), p);
}

// Legacy pre-release EN aliases
const PSYCHUBE_LEGACY_ALIASES = new Map([
  ['the unknown artist', '1433'],
  ['the carat of a heart', '1512']
]);

for (const [alias, id] of PSYCHUBE_LEGACY_ALIASES.entries()) {
  const hit = PSYCHUBE_BY_ID.get(id);
  if (hit && !PSYCHUBE_BY_NAME.has(alias)) {
    PSYCHUBE_BY_NAME.set(alias, hit);
  }
}

export function psychubeFrameSrc(star) {
  const s = [4, 5, 6].includes(Number(star)) ? Number(star) : 6;
  return `./assets/psychubes/bg_${s}.webp`;
}

export function psychubeIconSrc(id) {
  return `./assets/psychubes/${id}.webp`;
}

export function resolvePsychube(raw) {
  if (raw && typeof raw === 'object' && raw.id) {
    return PSYCHUBE_BY_ID.get(String(raw.id)) || raw;
  }
  const text = String(raw ?? '').normalize('NFKC').trim();
  if (!text) return null;
  if (PSYCHUBE_BY_ID.has(text)) return PSYCHUBE_BY_ID.get(text);
  const low = text.toLowerCase();
  if (PSYCHUBE_BY_NAME.has(low)) return PSYCHUBE_BY_NAME.get(low);
  for (const p of PSYCHUBES) {
    if (p.name.includes(text) || text.includes(p.name)) return p;
    if (p.en && p.en.toLowerCase() === low) return p;
  }
  if (low.length >= 4) {
    for (const p of PSYCHUBES) {
      if (p.en && p.en.toLowerCase().includes(low)) return p;
    }
  }
  return null;
}

export function displayPsychubeName(raw, lang = getLang()) {
  const psy = resolvePsychube(raw);
  if (!psy) return String(raw ?? '').trim();
  return lang === 'zh' ? psy.name : (psy.en || psy.name);
}

export function displayPsychubeStat(psy, lang = getLang()) {
  const obj = typeof psy === 'object' && psy !== null ? psy : resolvePsychube(psy);
  if (!obj) {
    const raw = String(psy ?? '').trim();
    return lang === 'zh' ? raw : (STAT_EN_MAP[raw] || raw);
  }
  return lang === 'zh' ? obj.stat : (obj.statEn || STAT_EN_MAP[obj.stat] || obj.stat);
}

export function displayPsychubeTag(tag, lang = getLang()) {
  const raw = String(tag ?? '').trim();
  const meta = TAG_META_BY_KEY.get(raw) || TAG_META_BY_KEY.get(raw.toLowerCase());
  if (!meta) return raw;
  return lang === 'zh' ? meta.zh : meta.en;
}

export function psychubeMatchesQuery(psy, q) {
  const query = String(q ?? '').normalize('NFKC').trim().toLowerCase();
  if (!query) return true;
  if (!psy) return false;
  if (String(psy.id || '').toLowerCase().includes(query)) return true;
  if (String(psy.name || '').normalize('NFKC').toLowerCase().includes(query)) return true;
  if (String(psy.en || '').normalize('NFKC').toLowerCase().includes(query)) return true;
  if (String(psy.stat || '').normalize('NFKC').toLowerCase().includes(query)) return true;
  if (String(psy.statEn || '').toLowerCase().includes(query)) return true;
  if (String(psy.version || '').toLowerCase().includes(query)) return true;
  if (Array.isArray(psy.tags) && psy.tags.some((t) => String(t).toLowerCase().includes(query))) return true;
  if (Array.isArray(psy.tagsEn) && psy.tagsEn.some((t) => String(t).toLowerCase().includes(query))) return true;
  return false;
}

export function getPsychubeDetail(raw, lang = getLang()) {
  const psy = resolvePsychube(raw);
  if (!psy) return null;
  const displayName = displayPsychubeName(psy, lang);
  const displayStat = displayPsychubeStat(psy, lang);
  const wikiUrl = lang === 'zh'
    ? `https://res1999.huijiwiki.com/wiki/${encodeURIComponent(psy.name)}`
    : `https://reverse1999.fandom.com/wiki/${encodeURIComponent(String(psy.en || psy.name).replace(/ /g, '_'))}`;
  return {
    ...psy,
    displayName,
    displayStat,
    stats60: psy.stats60 || null,
    passiveEn: psy.passiveEn || '',
    passiveZh: psy.passiveZh || '',
    passive: lang === 'zh' ? (psy.passiveZh || '') : (psy.passiveEn || ''),
    wikiUrl
  };
}
