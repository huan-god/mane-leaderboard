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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 90
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 170
    }
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
      "mDef": 160
    }
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
      "mDef": 190
    }
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
      "mDef": 150
    }
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
      "mDef": 190
    }
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
      "mDef": 160
    }
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
      "mDef": 180
    }
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
      "mDef": 180
    }
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
      "mDef": 180
    }
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
      "mDef": 160
    }
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
      "mDef": 170
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 170
    }
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
      "mDef": 170
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 160
    }
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
      "mDef": 170
    }
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
      "mDef": 160
    }
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
      "mDef": 170
    }
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
      "mDef": 180
    }
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
      "mDef": 220
    }
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
      "mDef": 200
    }
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
      "mDef": 150
    }
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
      "mDef": 150
    }
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
      "mDef": 160
    }
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
      "mDef": 130
    }
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
      "mDef": 130
    }
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
      "mDef": 120
    }
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
      "mDef": 120
    }
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
      "mDef": 120
    }
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
      "mDef": 120
    }
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
      "mDef": 130
    }
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
      "mDef": 130
    }
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
      "mDef": 130
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 100
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 140
    }
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
      "mDef": 120
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 130
    }
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
      "mDef": 120
    }
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
      "mDef": 130
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 120
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 140
    }
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
      "mDef": 150
    }
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
      "mDef": 140
    }
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
      "mDef": 160
    }
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
      "mDef": 140
    }
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
      "mDef": 110
    }
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
      "mDef": 110
    }
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
      "mDef": 110
    }
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
      "mDef": 110
    }
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
      "mDef": 120
    }
  }
];

const PSYCHUBE_LORE_BY_LANG = {
  en: new Map(),
  zh: new Map()
};

export function registerPsychubeLore(lang, loreObj) {
  const norm = String(lang || '').trim().toLowerCase().startsWith('en') ? 'en' : 'zh';
  if (!loreObj || typeof loreObj !== 'object') return;
  const target = PSYCHUBE_LORE_BY_LANG[norm];
  target.clear();
  for (const [id, entry] of Object.entries(loreObj)) {
    target.set(String(id), entry);
  }
}

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
  const norm = String(lang || getLang()).trim().toLowerCase().startsWith('en') ? 'en' : 'zh';
  const lore = PSYCHUBE_LORE_BY_LANG[norm]?.get(String(psy.id))
    || PSYCHUBE_LORE_BY_LANG.zh.get(String(psy.id))
    || PSYCHUBE_LORE_BY_LANG.en.get(String(psy.id))
    || null;
  const displayName = displayPsychubeName(psy, norm);
  const displayStat = displayPsychubeStat(psy, norm);
  const wikiUrl = norm === 'zh'
    ? `https://res1999.huijiwiki.com/wiki/${encodeURIComponent(psy.name)}`
    : `https://reverse1999.fandom.com/wiki/${encodeURIComponent(String(psy.en || psy.name).replace(/ /g, '_'))}`;
  const passiveText = lore?.passive || '';
  const subStatText = lore?.subStat || '';
  return {
    ...psy,
    displayName,
    displayStat,
    stats60: psy.stats60 ? {
      ...psy.stats60,
      subStat: subStatText,
      subStatEn: norm === 'en' ? subStatText : '',
      subStatZh: norm === 'zh' ? subStatText : ''
    } : null,
    passiveEn: norm === 'en' ? passiveText : '',
    passiveZh: norm === 'zh' ? passiveText : '',
    passive: passiveText,
    wikiUrl
  };
}

