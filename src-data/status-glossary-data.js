// Canonical bilingual status glossary (source for build-time lang-zh.json & lang-en.json split)
export const STATUS_GLOSSARY = [
  // =========================================================================
  // 1. Pos Status / 属性增益与防护
  // =========================================================================
  {
    key: 'pos-status',
    en: 'Pos Status',
    zh: '状态增益',
    aliases: ['positive status', 'buff', '属性提升/状态增益'],
    category: 'pos',
    descEn: 'Beneficial non-stat statuses (such as Immunity, Sturdiness, Rousing Morale, and Cure) counted by buff-scaling mechanics and dispellable unless marked undispellable.',
    descZh: '除纯面板数值提升外的正面状态类别（如免疫、坚固、激昂、愈合等），参与多增益计数且通常可被敌方驱散。'
  },
  {
    key: 'immunity',
    en: 'Immunity',
    zh: '免疫',
    aliases: ['status immunity'],
    category: 'pos',
    descEn: 'Immune to [Stats Down], [Neg Status], and [Control] statuses while active.',
    descZh: '持续期间免疫全部[属性削弱]、[状态异常]与[控制]效果。'
  },
  {
    key: 'control-immunity',
    en: 'Control Immunity',
    zh: '控制免疫',
    aliases: ['免疫控制'],
    category: 'pos',
    descEn: 'Prevents all [Control] statuses (Daze, Petrify, Nightmare, Freeze, Disarm, Silence, Seal) from taking effect.',
    descZh: '免疫所有限制行动的[控制]类状态（眩晕、石化、噩梦、冰冻、缴械、缄默、封印）。'
  },
  {
    key: 'sturdiness',
    en: 'Sturdiness',
    zh: '坚固',
    aliases: [],
    category: 'pos',
    descEn: 'When attacked, DMG Taken Reduction +25%; consumes 1 stack after triggering.',
    descZh: '受到攻击时受创减免 +25%，生效后消耗 1 层。'
  },
  {
    key: 'shield',
    en: 'Shield',
    zh: '护盾',
    aliases: ['护盾值'],
    category: 'pos',
    descEn: 'Absorbs incoming damage up to its shield value for its duration; normally does not block Genesis DMG unless specified.',
    descZh: '在持续期间吸收一定数值的伤害；除特殊说明外，常规护盾优先抵挡现实/精神创伤。'
  },
  {
    key: 'taunt',
    en: 'Taunt',
    zh: '嘲讽',
    aliases: [],
    category: 'pos',
    descEn: 'Draws enemy targeting priority so eligible single-target attacks lock onto the Taunting unit first.',
    descZh: '吸引敌方仇恨，使可锁定目标的单体攻击优先以持有者为目标。'
  },
  {
    key: 'counter',
    en: 'Counter',
    zh: '反制',
    aliases: ['counter stance', '反制状态'],
    category: 'pos',
    descEn: 'Grants a continuous Counter stance whose effect triggers automatically when the holder is attacked.',
    descZh: '进入持续反制状态，持有者受到敌方攻击时自动触发对应效果（如反击、反弹、护盾或激情回复）。'
  },
  {
    key: 'riposte',
    en: 'Riposte',
    zh: '反击',
    aliases: ['counterattack'],
    category: 'pos',
    descEn: 'Immediately counterattacks enemies after being attacked; most modern Ripostes count as an Extra Action.',
    descZh: '受到敌方攻击后立即发动反击，多数体系角色的反击计入一次[额外行动]。'
  },
  {
    key: 'rousing-morale',
    en: 'Rousing Morale',
    zh: '激昂',
    aliases: [],
    category: 'pos',
    descEn: 'DMG Bonus +50% on the holder\'s next attack (-1 stack after triggering).',
    descZh: '攻击时创伤加成 +50%，生效后消耗 1 层。'
  },
  {
    key: 'ceremonious',
    en: 'Ceremonious',
    zh: '礼仪',
    aliases: [],
    category: 'pos',
    descEn: 'Ultimate Might +3% per stack (up to 100 stacks, undispellable); all stacks are consumed after casting an Ultimate.',
    descZh: '每层使仪式威力 +3%（至多 100 层，不可驱散），释放至终的仪式后全部消耗。'
  },
  {
    key: 'power-burst',
    en: 'Power Burst',
    zh: '爆发力',
    aliases: [],
    category: 'pos',
    descEn: 'DMG Bonus +25% when attacking; consumes 1 stack after triggering.',
    descZh: '攻击时创伤加成 +25%，生效后消耗 1 层。'
  },
  {
    key: 'stabilize',
    en: 'Stabilize',
    zh: '安定',
    aliases: [],
    category: 'pos',
    descEn: 'When attacked by Mental DMG, DMG Taken Reduction +30% (-1 stack after triggering).',
    descZh: '受到精神创伤攻击时受创减免 +30%，生效后消耗 1 层。'
  },
  {
    key: 'cure',
    en: 'Cure',
    zh: '愈合',
    aliases: ['continuous healing'],
    category: 'pos',
    descEn: 'At the start of the round, restores HP to the holder based on the caster\'s ATK.',
    descZh: '每回合开始时按施术者攻击力比例回复生命值。'
  },

  // =========================================================================
  // 2. Neg Status / 负面状态异常
  // =========================================================================
  {
    key: 'neg-status',
    en: 'Neg Status',
    zh: '状态异常',
    aliases: ['negative status', 'debuff status', '负面状态'],
    category: 'neg',
    descEn: 'Harmful non-stat statuses (such as Burn, Poison, Bleed, Scorch, Chaos, and Weakness) tracked by debuff-scaling effects and cleansable unless undispellable.',
    descZh: '除纯数值削弱外的负面效果类别（如燃烧、中毒、流血、灼烧、混乱、虚弱等），可触发异常增伤且大多可被净化。'
  },
  {
    key: 'burn',
    en: 'Burn',
    zh: '燃烧',
    aliases: [],
    category: 'neg',
    descEn: 'Healing Taken -15% (unstackable). At round end, deals Genesis DMG equal to 4% of the holder\'s ATK per stack (up to 30 stacks; halves stacks on trigger; fuels [Lingering Glow]).',
    descZh: '受治疗率 -15%；回合末每层受到持有者攻击力 ×4% 的本源创伤（至多 30 层，触发后层数减半），并为[余辉]体系充能。'
  },
  {
    key: 'scorch',
    en: 'Scorch',
    zh: '灼烧',
    aliases: [],
    category: 'neg',
    descEn: 'Healing Taken -20%. At round end, deals Genesis DMG equal to 10% of the holder\'s ATK per stack (up to 10 stacks); targeted by a Heal, Buff, or Counter incantation dispels 1 stack.',
    descZh: '受治疗率 -20%，回合末每层受到持有者攻击力 ×10% 的本源创伤（至多 10 层）；成为治疗/增益/反制咒语目标可驱散 1 层。'
  },
  {
    key: 'poison',
    en: 'Poison',
    zh: '中毒',
    aliases: [],
    category: 'neg',
    descEn: 'At the end of the round, takes Genesis DMG scaling with the caster\'s ATK; multiple independent instances can stack.',
    descZh: '回合结束时受到基于施术者攻击力的本源创伤，可多层独立叠加。'
  },
  {
    key: 'bleed',
    en: 'Bleed',
    zh: '流血',
    aliases: [],
    category: 'neg',
    descEn: 'After the afflicted unit acts, takes Genesis DMG equal to 100% of the caster\'s ATK.',
    descZh: '持有者行动后受到施术者攻击力 ×100% 的本源创伤。'
  },
  {
    key: 'chaos',
    en: 'Chaos',
    zh: '混乱',
    aliases: ['confusion', 'confuse'],
    category: 'neg',
    descEn: 'Official Global Neg Status (community: Confusion). At 3 stacks, inflicts DMG Bonus Down I for 2 rounds; some bosses combo [Chaos] into [Disarm].',
    descZh: '负面状态异常（Global 官方译名 Chaos / 社区常称混乱）；叠满 3 层转化为 2 回合创伤加成降低，且易触发部分首领的追加缴械。'
  },
  {
    key: 'weakness',
    en: 'Weakness',
    zh: '虚弱',
    aliases: [],
    category: 'neg',
    descEn: 'DMG Dealt -25% on the holder\'s next attack (-1 stack after triggering).',
    descZh: '持有者下次攻击造成伤害 -25%，生效后消耗 1 层。'
  },
  {
    key: 'nasty-wound',
    en: 'Nasty Wound',
    zh: '重伤',
    aliases: [],
    category: 'neg',
    descEn: 'Reduces Healing Taken by 50% for the duration of the effect.',
    descZh: '持续期间持有者受治疗率降低 50%。'
  },
  {
    key: 'pollution',
    en: 'Pollution',
    zh: '污染',
    aliases: [],
    category: 'neg',
    descEn: 'At the end of the round, takes Genesis DMG based on the caster\'s ATK (stackable).',
    descZh: '回合末受到基于施术者攻击力的本源创伤，可叠加。'
  },
  {
    key: 'corrode',
    en: 'Corrode',
    zh: '腐蚀',
    aliases: [],
    category: 'neg',
    descEn: 'At the end of the round, loses HP proportional to Current HP (capped by the caster\'s ATK).',
    descZh: '回合末按目标当前生命比例扣除生命值（受施术者攻击力上限约束）。'
  },

  // =========================================================================
  // 3. Control / 控制状态
  // =========================================================================
  {
    key: 'control',
    en: 'Control',
    zh: '控制',
    aliases: ['cc', 'crowd control'],
    category: 'control',
    descEn: 'Action-restricting statuses: [Daze], [Petrify], [Nightmare], [Freeze], [Disarm], [Silence], and [Seal]. Witness\'s Edition bosses convert Control immunity into Obscurity -10.',
    descZh: '限制单位行动的 7 类异常总称：眩晕、石化、噩梦、冰冻、缴械、缄默、封印；目击者特版首领免疫控制时会转化为隐匿度 -10。'
  },
  {
    key: 'daze',
    en: 'Daze',
    zh: '眩晕',
    aliases: ['stun'],
    category: 'control',
    descEn: 'Hard [Control] status (community: Stun). The afflicted unit cannot take any action while active.',
    descZh: '强控制状态（Global 官方译名 Daze）：持续期间无法进行任何行动。'
  },
  {
    key: 'petrify',
    en: 'Petrify',
    zh: '石化',
    aliases: [],
    category: 'control',
    descEn: 'Cannot act; dispelled immediately after taking a Reality DMG attack.',
    descZh: '无法行动；受到现实创伤攻击后解除。'
  },
  {
    key: 'freeze',
    en: 'Freeze',
    zh: '冰冻',
    aliases: [],
    category: 'control',
    descEn: 'Cannot act; dispelled immediately after taking a Mental DMG attack.',
    descZh: '无法行动；受到精神创伤攻击后解除。'
  },
  {
    key: 'nightmare',
    en: 'Nightmare',
    zh: '噩梦',
    aliases: [],
    category: 'control',
    descEn: 'Cannot act; dispelled immediately after taking any attack.',
    descZh: '无法行动；受到任意攻击后解除。'
  },
  {
    key: 'disarm',
    en: 'Disarm',
    zh: '缴械',
    aliases: [],
    category: 'control',
    descEn: 'Cannot cast Attack-type incantations while active.',
    descZh: '持续期间无法使用攻击类普通咒语。'
  },
  {
    key: 'silence',
    en: 'Silence',
    zh: '缄默',
    aliases: ['silent'],
    category: 'control',
    descEn: 'Cannot cast Buff, Debuff, Heal, or Counter-type incantations while active.',
    descZh: '持续期间无法使用增益、减益、治疗与反制类咒语。'
  },
  {
    key: 'seal',
    en: 'Seal',
    zh: '封印',
    aliases: [],
    category: 'control',
    descEn: 'Cannot cast Ultimates while active.',
    descZh: '持续期间无法释放至终的仪式。'
  },
  {
    key: 'paralyze',
    en: 'Paralyze',
    zh: '麻痹',
    aliases: [],
    category: 'control',
    descEn: 'At 2 stacks, converts into [Daze] (or extends an existing [Daze] duration by 1 round).',
    descZh: '叠满 2 层时转化为[眩晕]状态，或使已有的[眩晕]持续时间延长 1 回合。'
  },

  // =========================================================================
  // 4. Stats Up / Down & Combat Attributes / 数值增减与核心面板
  // =========================================================================
  {
    key: 'stats-up',
    en: 'Stats Up',
    zh: '属性提升',
    aliases: ['stat up', 'attribute bonus'],
    category: 'stats',
    descEn: 'Direct positive stat modifiers (ATK, DEF, Critical Rate/DMG, Incantation/Ultimate Might, DMG Bonus, etc.).',
    descZh: '直接作用于面板数值的增益类别（如攻击、双防、双暴、术法/仪式威力、创伤加成提升等）。'
  },
  {
    key: 'stats-down',
    en: 'Stats Down',
    zh: '属性削弱',
    aliases: ['stat down'],
    category: 'stats',
    descEn: 'Direct negative stat modifiers (DEF Down, Critical DEF Down, DMG Taken Reduction Down, etc.).',
    descZh: '直接降低面板数值的削弱类别（如双防降低、暴防降低、受创减免降低等）。'
  },
  {
    key: 'reality-dmg',
    en: 'Reality DMG',
    zh: '现实创伤',
    aliases: ['real dmg', 'reality damage'],
    category: 'stats',
    descEn: 'Physical damage mitigated by the target\'s Reality DEF and boosted by Reality DMG modifiers.',
    descZh: '受目标现实防御减免的物理系创伤类型。'
  },
  {
    key: 'mental-dmg',
    en: 'Mental DMG',
    zh: '精神创伤',
    aliases: ['mental damage'],
    category: 'stats',
    descEn: 'Psychic damage mitigated by the target\'s Mental DEF and boosted by Mental DMG modifiers.',
    descZh: '受目标精神防御减免的精神系创伤类型。'
  },
  {
    key: 'genesis-dmg',
    en: 'Genesis DMG',
    zh: '本源创伤',
    aliases: ['genesis damage', '本源伤害'],
    category: 'stats',
    descEn: 'True damage that ignores Reality DEF, Mental DEF, and most standard shields; cannot critically hit unless explicitly enabled by a skill.',
    descZh: '无视现实防御、精神防御及常规护盾的真实伤害；除非技能特别说明，否则默认无法暴击。'
  },
  {
    key: 'incantation-might',
    en: 'Incantation Might',
    zh: '术法威力',
    aliases: ['imight'],
    category: 'stats',
    descEn: 'Multiplies the damage dealt by non-Ultimate incantations (including Extra Action attacks classified as basic incantations).',
    descZh: '提升普通咒语（及归类为普通咒语的额外行动攻击）伤害的独立乘区属性。'
  },
  {
    key: 'ultimate-might',
    en: 'Ultimate Might',
    zh: '仪式威力',
    aliases: ['umight'],
    category: 'stats',
    descEn: 'Multiplies the damage dealt by Ultimates and follow-up attacks classified as Ultimate DMG.',
    descZh: '提升至终的仪式（及归类为仪式伤害的追击攻击）伤害的独立乘区属性。'
  },
  {
    key: 'critical-def',
    en: 'Critical DEF',
    zh: '暴击防御',
    aliases: ['crit def', '暴防'],
    category: 'stats',
    descEn: 'Reduces incoming Critical DMG multiplier. In Collector\'s Edition Mane\'s Bulletin, bosses gain +30% / +100% Critical DEF at 4M / 10M score unless broken into [Afflatus Vulnerable].',
    descZh: '降低受到暴击时的暴击创伤倍率；4.1 鉴藏者特版中首领达 400 万/1000 万分获 +30%/+100% 暴防，克制破防进入[灵感脆弱]后可无视。'
  },
  {
    key: 'critical-resist-rate',
    en: 'Critical Resist Rate',
    zh: '抗暴率',
    aliases: ['crit resist'],
    category: 'stats',
    descEn: 'Directly subtracts from the attacker\'s Critical Rate when calculating whether an attack critically hits.',
    descZh: '受击时直接抵扣攻击方的暴击率，降低被暴击的概率。'
  },
  {
    key: 'penetration-rate',
    en: 'Penetration Rate',
    zh: '穿透率',
    aliases: ['pen rate'],
    category: 'stats',
    descEn: 'Ignores the corresponding percentage of the target\'s Reality DEF or Mental DEF when dealing damage.',
    descZh: '造成伤害时无视目标对应百分比的现实防御或精神防御。'
  },
  {
    key: 'dmg-bonus',
    en: 'DMG Bonus',
    zh: '创伤加成',
    aliases: ['dmg dealt', '造成伤害'],
    category: 'stats',
    descEn: 'Additive damage increase bucket offset directly against the target\'s DMG Taken Reduction.',
    descZh: '与目标的[受创减免]直接加减抵消的基础增伤乘区。'
  },
  {
    key: 'dmg-taken-reduction',
    en: 'DMG Taken Reduction',
    zh: '受创减免',
    aliases: ['dmg taken'],
    category: 'stats',
    descEn: 'Reduces incoming Reality and Mental damage by subtracting from the attacker\'s DMG Bonus.',
    descZh: '抵消攻击方的[创伤加成]，从而降低所受现实与精神创伤。'
  },

  // =========================================================================
  // 5. Special / Archetypes / Force Fields / 特殊体系、资源与术阵
  // =========================================================================
  {
    key: 'array',
    en: 'Array',
    zh: '术阵',
    aliases: ['阵法'],
    category: 'special',
    descEn: 'Battlefield-wide field effect continuously affecting units on the field; only one [Array] can exist at a time across both allies and enemies (deploying a new one replaces the old).',
    descZh: '持续影响全场的场地效果；敌我双方同场至多存在 1 个[术阵]，新展开的术阵会顶替旧术阵。'
  },
  {
    key: 'force-field',
    en: 'Force Field',
    zh: '力场',
    aliases: [],
    category: 'special',
    descEn: 'Personal or team aura effect (such as Pulsing Field or character-specific fields) that persists independently of [Array] and enables Force Field Psychubes.',
    descZh: '独立于[术阵]存在的角色或全队光环领域（如涌动电场等），可触发各类力场条件心相与被动。'
  },
  {
    key: 'ally',
    en: 'Ally',
    zh: '我方',
    aliases: ['allies', '己方'],
    category: 'special',
    descEn: 'Denotes environmental rules and battlefield buffs/penalties that apply specifically to your playable arcanist squad.',
    descZh: '标注该场地规则或增益/惩罚效果仅作用于我方出战的神秘学家编队。'
  },
  {
    key: 'moxie',
    en: 'Moxie',
    zh: '激情',
    aliases: ['passion', '激情点'],
    category: 'special',
    descEn: 'Ultimate energy resource (standard cap: 5). Reaching max Moxie generates the character\'s Ultimate card on the next round.',
    descZh: '释放至终的仪式所需的能量资源（常规上限 5 点），满激情后下回合自动生成至终的仪式卡牌。'
  },
  {
    key: 'eureka',
    en: 'Eureka',
    zh: '灵光',
    aliases: [],
    category: 'special',
    descEn: 'Special secondary resource bar used by select arcanists (e.g., 37, 6, Marcus, Barcarola, Aleph) to trigger follow-ups, rank-ups, or [Impromptu Incantation] Inspiration.',
    descZh: '部分角色专属的特殊充能资源（如 37、6、马库斯、芭卡洛儿、阿莱夫等），用于触发追击、升阶或为[即兴咒语]累积启示。'
  },
  {
    key: 'dynamo',
    en: 'Dynamo',
    zh: '电能',
    aliases: ['pulsing field', '涌动电场'],
    category: 'special',
    descEn: 'Core resource of the Dynamo archetype (Lucy, Ulrich, Charon, Corvus, Brume, Enigma, Ezra): transferring Dynamo upgrades the [Pulsing Field] (Lv.1–Lv.3) for massive teamwide buffs and bursts.',
    descZh: '电能体系核心资源（露西、乌尔里希、卡戎、告死鸟、灰调蓝、哑谜、爱兹拉）：注入与转移电能可升级[涌动电场]（1–3 级）触发全队高额增伤与爆发。'
  },
  {
    key: 'bloodtithe',
    en: 'Bloodtithe',
    zh: '薪血',
    aliases: ['hp sacrifice', '烧血'],
    category: 'special',
    descEn: 'Team resource accumulated by HP loss and sacrifice (Nautika, Semmelweis, Sentinel, Rubuska, Eternity, Ezra); higher Max Bloodtithe unlocks huge Ultimate and Critical DMG multipliers.',
    descZh: '薪血体系团队资源（诺谛卡、塞梅尔维斯、玛丽安娜、野树莓、温妮弗雷德、爱兹拉）：通过己方生命消耗累积，拉高薪血上限可大幅放大爆发倍率。'
  },
  {
    key: 'impromptu-incantation',
    en: 'Impromptu Incantation',
    zh: '即兴咒语',
    aliases: ['impromptu', 'inspiration', '启示'],
    category: 'special',
    descEn: 'Teamwide bonus incantation fueled by [Inspiration] (generated via Eureka consumption by Barcarola, Aleph, Kiperina, Paper Heron, Voyager, Regulus, Tooth Fairy, Matilda) that fires automatically at action end.',
    descZh: '启示/即兴体系核心机制（芭卡洛儿、阿莱夫、库珀花环、鹭鸶剪、远旅、星锑等）：通过消耗灵光累积启示，在回合行动结束时自动追加高倍率即兴咒语打击。'
  },
  {
    key: 'euphoria',
    en: 'Euphoria',
    zh: '狂想',
    aliases: ['狂想增幅'],
    category: 'special',
    descEn: 'Endgame character upgrade system (unlocked at Insight III Lv.30 for 6-stars / Lv.1 for 5-stars) adding new Epiphany passives and modernizing older arcanists into top meta archetypes.',
    descZh: '角色深度强化系统（6 星洞三 30 级 / 5 星洞三 1 级解锁），通过点亮全新闪念被动重塑老角色机制并融入主流体系。'
  },
  {
    key: 'lingering-glow',
    en: 'Lingering Glow',
    zh: '余辉',
    aliases: ['afterglow', 'halo', '光晕'],
    category: 'special',
    descEn: 'Accumulates whenever enemies are inflicted with [Burn] or [Halo] (fewer enemies yield faster buildup); powers Lingering Glow teams (Beryl, Marsha, Lorentz Butterfly, Drake, Isolde, Spathodea).',
    descZh: '敌方被施加[燃烧]或[光晕]时累积的体系资源（场上敌人越少累积越快），驱动余辉体系（贝丽尔、玛尔纱、洛伦兹蝴蝶、德雷克、伊索尔德、可燃点）的高额暴伤与爆发。'
  },
  {
    key: 'conduit',
    en: 'Conduit',
    zh: '术具',
    aliases: ['conduit energy', '术具能量'],
    category: 'special',
    descEn: 'Autonomous magical devices powered by Conduit Energy (Coppélia, Everecho, The Twins, Hedone, Regulus) that activate at the end of the AP Area and repeatedly cast incantations.',
    descZh: '消耗术具能量驱动的特殊装置体系（珐琅眼、回声谣、双生舞伶、赫多涅、星锑），在行动区结束时自动连续释放术具咒语。'
  },
  {
    key: 'pursuit',
    en: 'Pursuit',
    zh: '洞知',
    aliases: ['洞知追击', 'full pursuit', 'star pursuit points', '星系洞知点'],
    category: 'special',
    descEn: 'Star-focused follow-up archetype introduced in v4.0 (Huntsworn Lilya, Perchta, Euphoria 37): accumulates [Star Pursuit Points] to unleash high-multiplier Pursuit extra actions.',
    descZh: '4.0 版本登场的星系追击机制（狩勋女巫红弩箭、佩施塔、狂想 37）：通过累积[星系洞知点]触发高频高倍率的洞知追加打击。'
  },
  {
    key: 'extra-action',
    en: 'Extra Action',
    zh: '额外行动',
    aliases: ['follow-up attack', 'follow-up', '追击'],
    category: 'special',
    descEn: 'Any action triggered outside normal AP card casts (such as follow-up attacks, Ripostes, Pursuit hits, and Impromptu casts); bypasses active-cast penalties on bosses like Manifestation of Thought.',
    descZh: '不消耗行动点、在常规主动出牌外自动触发的行动（如追击、反击、洞知、即兴咒语），可绕过部分针对主动出牌的首领惩罚。'
  },
  {
    key: 'afflatus-guard',
    en: 'Afflatus Guard',
    zh: '灵感耐受度',
    aliases: ['耐受度'],
    category: 'special',
    descEn: 'Resilience gauge on Collector\'s Edition & Focused Flashback bosses depleted by Stronger Afflatus attacks; breaking it triggers [Afflatus Vulnerable] and heavy percentage HP loss.',
    descZh: '4.1 鉴藏者特版及焦点闪回首领的韧性条，受克制灵感攻击时削减，归零后触发大额百分比扣血并进入[灵感脆弱]爆发窗。'
  },
  {
    key: 'afflatus-vulnerable',
    en: 'Afflatus Vulnerable',
    zh: '灵感脆弱',
    aliases: [],
    category: 'special',
    descEn: 'Exposed state entered after breaking [Afflatus Guard]; in Collector\'s Edition, Stronger Afflatus attacks ignore the boss\'s 4M/10M Critical DEF bonus and gain Stronger Afflatus DMG Multiplier +15%.',
    descZh: '击破[灵感耐受度]后首领进入的破防状态；期间克制攻击可无视鉴藏者特版 400 万/1000 万分的暴防加成且克制系数额外 +15%。'
  },
  {
    key: 'witness-round',
    en: 'Witness Round',
    zh: '目击回合',
    aliases: ['obscurity', '隐匿度'],
    category: 'special',
    descEn: 'Bonus round triggered when a Witness\'s Edition boss\'s Obscurity drops to 0 (up to 4 times): enemies cannot take active actions, total round limit increases, and bonus score is awarded.',
    descZh: '目击者特版首领隐匿度归零时触发的奖励回合（至多 4 次）：期间敌方无法主动行动，延长战斗回合上限并获得额外积分。'
  },

  // =========================================================================
  // 6. Boss Mechanics, Passives, Summons & Flashback Buffs / 首领与闪回专属词条
  // =========================================================================
  {
    key: 'lingering-dust',
    en: 'Lingering Dust',
    zh: '尘烟弥漫',
    aliases: [],
    category: 'boss',
    descEn: 'Eidolon of Avarice stackable buff (up to 2): Genesis DMG Taken -15%, DMG Taken Reduction +25% (at 100M score, also reduces attacker DMG Multiplier by 500%).',
    descZh: '「神话的遗闻」专属状态（至多 2 层）：本源受创 -15%、受创减免 +25%（1 亿分强化后受击使对方创伤倍率 -500%）。'
  },
  {
    key: 'source-of-gold',
    en: 'Source of Gold',
    zh: '黄金源流',
    aliases: [],
    category: 'boss',
    descEn: 'Eidolon of Avarice passive: grants 1 stack of [Stabilize] after being attacked (2 stacks at 5M+ score) and clears all [Stabilize] at round end.',
    descZh: '「神话的遗闻」被动：受击后赋予自身 1 层[安定]（500 万分起改为 2 层），回合末清空全场[安定]。'
  },
  {
    key: 'guide',
    en: 'Guide',
    zh: '指引者',
    aliases: [],
    category: 'boss',
    descEn: 'Summoned add of Eidolon of Avarice: reduces Reality DEF and Mental DEF of all units on the field by 15% upon entry.',
    descZh: '「神话的遗闻」召唤物：入场时使场上双方全员现实防御与精神防御 -15%。'
  },
  {
    key: 'herald',
    en: 'Herald',
    zh: '传颂者',
    aliases: [],
    category: 'boss',
    descEn: 'Summoned add of Eidolon of Avarice after Ultimate: shares damage taken by boss allies; breaking its [Afflatus Guard] deducts 20% HP.',
    descZh: '「神话的遗闻」开大后召唤的友方：分摊敌方所受伤害，清空其灵感耐受度时扣除 20% 生命。'
  },
  {
    key: 'whispers-in-the-woods',
    en: 'Whispers in the Woods',
    zh: '林中密语',
    aliases: [],
    category: 'boss',
    descEn: 'Eidolon of Avarice 1-target attack incantation that inflicts [Disarm] for 2 rounds.',
    descZh: '「神话的遗闻」单体攻击技能，命中后附加 2 回合[缴械]。'
  },
  {
    key: 'slumber-beneath-the-golden-lake',
    en: 'Slumber Beneath the Golden Lake',
    zh: '安睡于黄金湖底',
    aliases: [],
    category: 'boss',
    descEn: 'Eidolon of Avarice Ultimate: deals mass damage and triggers an extra Skill 1 cast (+600% follow-up multiplier at 50M+ score).',
    descZh: '「神话的遗闻」至终的仪式：群体攻击并追加释放技能 1（5000 万分起追加倍率 +600%）。'
  },
  {
    key: 'voice-of-reflection',
    en: 'Voice of Reflection',
    zh: '倒影之声',
    aliases: [],
    category: 'boss',
    descEn: 'Eidolon of Avarice attack skill that at 30M+ score inflicts [Daze] on a random target for 2 rounds.',
    descZh: '「神话的遗闻」攻击技能，3000 万分强化后攻击结束使随机我方陷入 2 回合[眩晕]。'
  },
  {
    key: 'fragmented-phrases',
    en: 'Fragmented Phrases',
    zh: '碎片化词组',
    aliases: ['fragmented phrase'],
    category: 'boss',
    descEn: 'Summoned adds of Manifestation of Thought: taking mass attacks grants allies Penetration Rate +20%; upon defeat, inflict 10 [Burn] and apply [Linguistic Critique] to the boss.',
    descZh: '「思想的表观」召唤物：受群攻时我方穿透率 +20%；退场时附加 10 层[燃烧]并对首领挂[语言批判]。'
  },
  {
    key: 'transmission-of-thought',
    en: 'Transmission of Thought',
    zh: '思想传递',
    aliases: [],
    category: 'boss',
    descEn: 'Beneficial 3-round buff (+30% Critical DMG) granted to all allies when Manifestation of Thought casts Ultimate with no Fragmented Phrases present.',
    descZh: '「思想的表观」在场上无词组时释放仪式赋予我方全体的 3 回合增益（暴击创伤 +30%）。'
  },
  {
    key: 'linguistic-critique',
    en: 'Linguistic Critique',
    zh: '语言批判',
    aliases: [],
    category: 'boss',
    descEn: 'Debuff applied to Manifestation of Thought when Fragmented Phrases are defeated, dealing heavy Genesis DMG at round end (200% base, 50% at 70M+ score).',
    descZh: '「碎片化词组」退场时施加给「思想的表观」的减益，回合末结算大额本源伤害（7000 万分后由 200% 降至 50%）。'
  },
  {
    key: 'on-final-right-of-interpretation',
    en: 'On "Final Right of Interpretation"',
    zh: '关于“最终解释权”',
    aliases: ['on final right of interpretation', '关于"最终解释权"'],
    category: 'boss',
    descEn: 'Manifestation of Thought Ultimate (+400% DMG Multiplier at 50M+ score); heals your team for 60% HP if no boss allies are present.',
    descZh: '「思想的表观」至终的仪式（5000 万分起倍率 +400%）；若敌方无其他友方在场则为我方回复 60% 生命。'
  },
  {
    key: 'cloud-veil',
    en: 'Cloud Veil',
    zh: '云翳',
    aliases: [],
    category: 'boss',
    descEn: 'Coveter of Eternity stackable mitigation (up to 5 stacks; DMG Taken Reduction +10% per stack, +30% at 70M+ score); taking 2 Ultimates in 1 round removes 3 stacks (3 Ultimates at 100M).',
    descZh: '「生命的饥馑」核心减伤层数（至多 5 层，每层受创减免 +10%，7000 万分涨至 +30%）；单回合受 2 次（1 亿分需 3 次）仪式攻击可削去 3 层。'
  },
  {
    key: 'feed-on-wind-and-dew',
    en: 'Feed on Wind and Dew',
    zh: '吸风饮露',
    aliases: [],
    category: 'boss',
    descEn: 'Coveter of Eternity core passive governing [Cloud Veil] accumulation and Ultimate-based stack removal.',
    descZh: '「生命的饥馑」核心被动，控制回合初[云翳]叠层以及通过多次释放至终的仪式破除[云翳]的机制。'
  },
  {
    key: 'immortality-devotees',
    en: 'Immortality Devotees',
    zh: '长生信徒',
    aliases: [],
    category: 'boss',
    descEn: 'Summoned adds of Coveter of Eternity (up to 2): take +80% Ultimate DMG and rewrite 1 player card per round into [Restlessness].',
    descZh: '「生命的饥馑」召唤物（至多 2 名）：受到至终的仪式伤害 +80%，每回合改写我方 1 张手牌为[躁动]。'
  },
  {
    key: 'restlessness',
    en: 'Restlessness',
    zh: '躁动',
    aliases: [],
    category: 'boss',
    descEn: 'Corrupted card rewritten into your Spelldock by Immortality Devotees; keeping it in hand deducts 10% Current HP.',
    descZh: '「长生信徒」塞入我方手牌区的异常改写牌，留手未出时会扣除 10% 当前生命值。'
  },
  {
    key: 'subtle-qi',
    en: 'Subtle Qi',
    zh: '妙气',
    aliases: [],
    category: 'boss',
    descEn: 'Stackable charge accumulated by Coveter of Eternity\'s Skill 2; scales the number of extra mass follow-up attacks unleashed during its Ultimate.',
    descZh: '「生命的饥馑」2 技能叠加的蓄能层数，决定至终的仪式期间追加全屏追击的次数。'
  },
  {
    key: 'shared-hatred',
    en: 'Shared Hatred',
    zh: '同仇敌忾',
    aliases: [],
    category: 'boss',
    descEn: 'The Bullet-Torn Winter stackable buff: Critical Resist Rate +10% and transfers damage taken to allied hounds.',
    descZh: '「子弹的冬年」专属状态：抗暴率 +10%，并由敌方友方分摊所受伤害。'
  },
  {
    key: 'final-loyalty',
    en: 'Final Loyalty',
    zh: '最后的忠诚',
    aliases: [],
    category: 'boss',
    descEn: 'Buff granted to The Bullet-Torn Winter when a Loyal Hound retreats (DMG Taken Reduction +20%, Critical DEF +20%); cleared at round end.',
    descZh: '「凛冬的忠犬」退场时赋予「子弹的冬年」的防御强化（受创减免与暴击防御各 +20%），回合末移除。'
  },
  {
    key: 'loyal-hounds-of-bitter-winter',
    en: 'Loyal Hounds of Bitter Winter',
    zh: '凛冬的忠犬',
    aliases: ['loyal hound of bitter winter'],
    category: 'boss',
    descEn: 'Summoned adds of The Bullet-Torn Winter (2 per round) that share boss damage and grant [Final Loyalty] when defeated.',
    descZh: '「子弹的冬年」回合末召唤的 2 只护卫忠犬，负责分摊伤害并在退场时提供[最后的忠诚]。'
  },
  {
    key: 'frontline',
    en: 'Frontline',
    zh: '阵线',
    aliases: [],
    category: 'boss',
    descEn: 'Progress gauge of The Bullet-Torn Winter: when full, clears existing adds and summons an enhanced [Winter Vanguard] that immediately casts its Ultimate.',
    descZh: '「子弹的冬年」专属进度条：叠满后清空友方并召唤强化[隆冬的戎卒]开场立刻释放大招。'
  },
  {
    key: 'winter-vanguard',
    en: 'Winter Vanguard',
    zh: '隆冬的戎卒',
    aliases: [],
    category: 'boss',
    descEn: 'Enhanced elite summon deployed when [Frontline] fills, immediately unleashing a high-threat Ultimate.',
    descZh: '「阵线」蓄满后登场的强化精英召唤物，入场直接发动高威胁冲锋仪式。'
  },
  {
    key: 'crimson-protection',
    en: 'Crimson Protection',
    zh: '猩红卫护',
    aliases: [],
    category: 'boss',
    descEn: 'Insatiable Bloodsucker Type II stackable shell (+10% Critical Resist Rate & +10% DMG Taken Reduction vs. basic incantations per stack, -1 stack when hit; leftover stacks convert to mass [Poison] next round).',
    descZh: '「急性猩红症·Ⅱ型」护壳层数（受普通咒语抗暴/减伤 +10%，受击剥 1 层；回合初残留层数会转化为全体[中毒]）。'
  },
  {
    key: 'hemolysis',
    en: 'Hemolysis',
    zh: '溶血',
    aliases: [],
    category: 'boss',
    descEn: 'Stackable debuff (up to 10 stacks): DMG Bonus -20%, DMG Taken Reduction -10%, Genesis DMG Dealt -20%. Cleanse by casting an Ultimate.',
    descZh: '「急性猩红症·Ⅱ型」可叠加减益（至多 10 层）：创伤加成 -20%、受创减免 -10%、本源伤害 -20%，可通过释放至终的仪式驱散。'
  },
  {
    key: 'crimson-seep',
    en: 'Crimson Seep',
    zh: '猩红渗流',
    aliases: [],
    category: 'boss',
    descEn: 'Insatiable Bloodsucker Type II skill that inflicts stacks of [Hemolysis] on player arcanists.',
    descZh: '「急性猩红症·Ⅱ型」常规攻击技能，命中后叠加[溶血]减益。'
  },
  {
    key: 'vampiric-embrace',
    en: 'Vampiric Embrace',
    zh: '嗜血拥抱',
    aliases: [],
    category: 'boss',
    descEn: 'Insatiable Bloodsucker Type II skill that inflicts [Hemolysis] and sustains the boss.',
    descZh: '「急性猩红症·Ⅱ型」常规技能，附加[溶血]并压低我方输出与生存。'
  },
  {
    key: 'the-banquet-commences',
    en: 'The Banquet Commences',
    zh: '盛宴开席',
    aliases: [],
    category: 'boss',
    descEn: 'Insatiable Bloodsucker Type II Ultimate: inflicts Reality DEF -40% and Mental DEF -40% on the boss itself for 1 round, opening the primary burst window.',
    descZh: '「急性猩红症·Ⅱ型」至终的仪式：释放后使首领自身双防 -40%（持续 1 回合），是核心爆发窗口。'
  },
  {
    key: 'bloodthirsty-thralls',
    en: 'Bloodthirsty Thralls',
    zh: '渴血患者',
    aliases: ['bloodthirsty thralls type ii', '渴血患者·Ⅱ型'],
    category: 'boss',
    descEn: 'Summoned adds of Insatiable Bloodsucker I/II that feed [Blood Drinking] or grant the boss [Stabilize] stacks.',
    descZh: '「急性猩红症」系列召唤物，用于叠加[渴血]或为首领提供回合初[安定]层数。'
  },
  {
    key: 'blood-drinking',
    en: 'Blood Drinking',
    zh: '渴血',
    aliases: [],
    category: 'boss',
    descEn: 'Undispellable counter on Insatiable Bloodsucker: reaching 6 stacks (5 when strengthened twice) deploys the [Vampiric Plague] [Array].',
    descZh: '「急性猩红症」不可驱散计数层数，回合初叠满 6 层（2 次强化后 5 层）时展开术阵[血食瘟疫]。'
  },
  {
    key: 'vampiric-plague',
    en: 'Vampiric Plague',
    zh: '血食瘟疫',
    aliases: [],
    category: 'boss',
    descEn: 'Enemy [Array] deployed by Insatiable Bloodsucker that boosts Reality DEF and deals 30% Max HP Genesis DMG / Encroaching Blood to all enemies.',
    descZh: '「急性猩红症」展开的敌方[术阵]：提升首领现实防御并对我方全体造成 30% 最大生命本源伤害。'
  },
  {
    key: 'enervate',
    en: 'Enervate',
    zh: '涣散',
    aliases: [],
    category: 'boss',
    descEn: 'Stackable debuff (Incantation Might -10% per stack) applied after 1-target attacks on Insatiable Bloodsucker; cleared after casting an Ultimate.',
    descZh: '「急性猩红症」环境减益：单体攻击后叠加（每层术法威力 -10%），释放至终的仪式后清零。'
  },
  {
    key: 'skyward-gaze',
    en: 'Skyward Gaze',
    zh: '仰望',
    aliases: [],
    category: 'boss',
    descEn: 'Undispellable debuff from The Sun\'s Thrall (up to 5 stacks): Incantation Might -15%, Ultimate Might -15%, Genesis DMG Dealt -15%; attacking while afflicted spreads 1 stack before removing 2 from self.',
    descZh: '「太阳的宠臣」不可驱散减益（至多 5 层）：术法/仪式/本源伤害均 -15%，顶着该状态攻击会扩散并调整层数。'
  },
  {
    key: 'indignation',
    en: 'Indignation',
    zh: '郁愤',
    aliases: [],
    category: 'boss',
    descEn: 'Glory Days Manifest self-debuff (up to 5 stacks): Reality DEF -5%, Mental DEF -5%, Critical Resist Rate -5% gained at round end if the boss did not act.',
    descZh: '「旧日的荣耀」自叠易伤状态（至多 5 层）：若回合内未行动则双防与抗暴率各 -5%。'
  },
  {
    key: 'entrenched',
    en: 'Entrenched',
    zh: '据守',
    aliases: [],
    category: 'boss',
    descEn: 'Glory Days Manifest stackable buff (up to 10 stacks): Critical DEF +3% gained whenever a boss ally dies.',
    descZh: '「旧日的荣耀」防御叠层（至多 10 层）：每有 1 名敌方小怪退场，首领暴击防御 +3%。'
  },
  {
    key: 'shaken-resolve',
    en: 'Shaken Resolve',
    zh: '心念动摇',
    aliases: [],
    category: 'boss',
    descEn: 'Undispellable debuff from The Self-Pitying Avenger (up to 5 stacks): deducts 10% Max HP at round end; healed by a Heal incantation reduces duration by 1 round (once per round).',
    descZh: '「自我同情者」不可驱散流血减益：回合末扣除 10% 最大生命，受到治疗咒语影响可缩短 1 回合（每回合限 1 次）。'
  },
  {
    key: 'limbo-form',
    en: 'Limbo Form',
    zh: '灵薄体',
    aliases: [],
    category: 'boss',
    descEn: 'The Self-Pitying Avenger undispellable armor (up to 2 stacks): Critical Resist Rate +40%, Critical DEF +40%, Genesis DMG Taken -40%; clearing all adds strips 1 stack.',
    descZh: '「自我同情者」高额防御壳（至多 2 层）：抗暴/暴防 +40%、本源受创 -40%，清光敌方小怪可迫使首领失去 1 层。'
  },
  {
    key: 'resonant-proclamation',
    en: 'Resonant Proclamation',
    zh: '振声宣告',
    aliases: [],
    category: 'boss',
    descEn: 'Stackable charge gained per [Limbo Form] stack at round start; at 5 stacks, The Self-Pitying Avenger consumes all stacks to perform an additional attack.',
    descZh: '「自我同情者」按[灵薄体]层数每回合累积的计数，叠满 5 层立刻追加一次额外攻击。'
  },
  {
    key: 'answer',
    en: 'Answer',
    zh: '回答',
    aliases: [],
    category: 'boss',
    descEn: 'Captive of Transcendentality stackable debuff (up to 20 stacks): Incantation Might -5% and Ultimate Might -5% per stack; 1-target attacks remove 2 stacks, mass attacks remove 1 stack.',
    descZh: '「超限的囚徒」可叠加减益（至多 20 层）：每层术法/仪式威力 -5%；攻击首领时单攻移除 2 层、群攻移除 1 层。'
  },
  {
    key: 'brainwash',
    en: 'Brainwash',
    zh: '洗脑',
    aliases: [],
    category: 'boss',
    descEn: 'Captive of Transcendentality Type II debuff: Max HP -20% (up to 4 independently timed stacks), applied per 25% Max HP lost to boss attacks.',
    descZh: '「超限的囚徒·Ⅱ型」减益：最大生命 -20%（至多 4 层独立计时），我方单次掉血每满 25% 叠加 1 层。'
  },
  {
    key: 'speculate',
    en: 'Speculate',
    zh: '思辨',
    aliases: [],
    category: 'boss',
    descEn: '1-round effect from Self-Referential Paradox: DMG Bonus -200%, but actively casting an incantation grants Moxie +1.',
    descZh: '「超限的囚徒·Ⅱ型」大招附加的 1 回合状态：创伤加成 -200%，但主动出牌时激情 +1。'
  },
  {
    key: 'self-referential-paradox',
    en: 'Self-Referential Paradox',
    zh: '自指悖论',
    aliases: [],
    category: 'boss',
    descEn: 'Captive of Transcendentality Type II Ultimate that inflicts [Speculate] for 1 round.',
    descZh: '「超限的囚徒·Ⅱ型」至终的仪式，命中后附加 1 回合[思辨]。'
  },
  {
    key: 'collapse',
    en: 'Collapse',
    zh: '崩溃',
    aliases: [],
    category: 'boss',
    descEn: 'Distortion of Faith stackable debuff: Critical Rate -30%, Critical DMG -30%, DMG Taken Reduction -15%; -1 stack when targeted by a Buff incantation, -3 stacks after casting one.',
    descZh: '「信仰的移位」高危减益：双暴 -30%、受创减免 -15%；成为增益目标消 1 层，主动释放增益咒语消 3 层。'
  },
  {
    key: 'bafflement',
    en: 'Bafflement',
    zh: '迷乱',
    aliases: [],
    category: 'boss',
    descEn: 'Distortion of Faith Type II status: generates a [Be Silent] card at round start; leaving it in the Spelldock at round end Icebounds/rewrites 2 cards.',
    descZh: '「信仰的移位·Ⅱ型」状态：回合初塞入[应当无言]废牌，若留手至回合末会冻结改写 2 张手牌。'
  },
  {
    key: 'be-silent',
    en: 'Be Silent',
    zh: '应当无言',
    aliases: [],
    category: 'boss',
    descEn: 'Special nuisance incantation generated by [Bafflement]; inflicts [Disarm] or disrupts Spelldock cards if mismanaged.',
    descZh: '由[迷乱]生成的干扰废牌，处理不当将触发缴械或冻结手牌区卡牌。'
  },
  {
    key: 'blind-devotion',
    en: 'Blind Devotion',
    zh: '虔信',
    aliases: [],
    category: 'boss',
    descEn: 'Stacking gauge on Distortion of Faith Type II (+8 to +10 per round); reaching 40 stacks clears all stacks and immediately casts [Chaos and Turmoil].',
    descZh: '「信仰的移位·Ⅱ型」蓄能层数（每回合 +8~10 层），叠满 40 层清零并立刻释放全屏高伤[迷乱扰动]。'
  },
  {
    key: 'chaos-and-turmoil',
    en: 'Chaos and Turmoil',
    zh: '迷乱扰动',
    aliases: [],
    category: 'boss',
    descEn: 'Heavy mass Mental attack (300%–500% multiplier) unleashed at 40 stacks of [Blind Devotion]; weakened by [Resounding Prayer] stacks.',
    descZh: '「虔信」满 40 层触发的全体精神群攻（300%–500% 倍率），受首领身上[祷言回响]层数削弱。'
  },
  {
    key: 'resounding-prayer',
    en: 'Resounding Prayer',
    zh: '祷言回响',
    aliases: [],
    category: 'boss',
    descEn: 'Stackable debuff (up to 10 stacks, 3 rounds) applied to Distortion of Faith Type II when casting Debuff incantations: DMG Taken Reduction -2% per stack and reduces [Chaos and Turmoil] DMG.',
    descZh: '我方释放减益咒语时叠加给首领的易伤层数（至多 10 层，3 回合）：每层受创减免 -2% 且大幅削弱[迷乱扰动]伤害。'
  },
  {
    key: 'annihilation-of-free-will',
    en: 'Annihilation of Free Will',
    zh: '自由意志湮灭',
    aliases: [],
    category: 'boss',
    descEn: 'Distortion of Faith Ultimate: deals heavy Mental DMG scaling with surviving boss allies and inflicts [Collapse].',
    descZh: '「信仰的移位」至终的仪式：按场上敌方小怪数量大幅提高倍率并附加[崩溃]。'
  },
  {
    key: 'deceptive-facade',
    en: 'Deceptive Facade',
    zh: '掩护',
    aliases: [],
    category: 'boss',
    descEn: 'Caterpillar of Destruction stackable mitigation (up to 3 stacks): DMG Taken Reduction +30% per stack (-1 stack when attacked); dispels [Revealed] when acquired.',
    descZh: '「毁灭的履带」战壕减伤层数（至多 3 层）：每层受创减免 +30%，受击扣除 1 层，获得时驱散[暴露]。'
  },
  {
    key: 'revealed',
    en: 'Revealed',
    zh: '暴露',
    aliases: [],
    category: 'boss',
    descEn: 'Major vulnerability debuff (DMG Taken Reduction -70%) that dispels [Deceptive Facade]; triggered on Caterpillar of Destruction at 8 stacks of [Resentful Roar].',
    descZh: '「毁灭的履带」破甲易伤状态（受创减免 -70% 并驱散[掩护]），通过清怪叠满 8 层[不甘咆哮]触发。'
  },
  {
    key: 'resentful-roar',
    en: 'Resentful Roar',
    zh: '不甘咆哮',
    aliases: [],
    category: 'boss',
    descEn: 'Counter gained by Caterpillar of Destruction when adds die; at 8 stacks, inflicts [Revealed] on self and strips the highest level of [Enhanced Rounds].',
    descZh: '敌方小怪退场时为「毁灭的履带」叠加的层数，叠满 8 层使首领陷入[暴露]并卸除最高级[强化弹头]。'
  },
  {
    key: 'enhanced-rounds',
    en: 'Enhanced Rounds',
    zh: '强化弹头',
    aliases: [],
    category: 'boss',
    descEn: 'Tiered boss ammunition (Levels I–IV) empowering Caterpillar of Destruction\'s attacks; highest-tier rounds are stripped first upon triggering [Revealed].',
    descZh: '「毁灭的履带」分级弹药强化（Ⅰ–Ⅳ 级），触发[暴露]时优先卸除最高等级弹头。'
  },
  {
    key: 'breaking-cocoon',
    en: 'Breaking Cocoon',
    zh: '破茧',
    aliases: [],
    category: 'boss',
    descEn: 'Undispellable stacking buff on The Cocooned Lament (+2.5% DMG Bonus and +2.5% DMG Taken Reduction per stack whenever enemies act); cleared on Ultimate.',
    descZh: '「蜕化的残响」不可驱散叠加状态（敌方每次行动增伤/减伤 +2.5%），释放大招时清空。'
  },
  {
    key: 'bewilderment',
    en: 'Bewilderment',
    zh: '迷惘',
    aliases: [],
    category: 'boss',
    descEn: 'The Cocooned Lament Skill 1: inflicts [Disarm] for 2 rounds on targets currently afflicted with [Chaos].',
    descZh: '「蜕化的残响」技能 1，攻击处于[混乱]状态的目标时会追加 2 回合[缴械]。'
  },
  {
    key: 'high-tide',
    en: 'High Tide',
    zh: '涨潮',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback tidal state (alternates with [Low Tide]): DMG Bonus +30%, casts Rank 1 Skill 1 at round end, and unlocks enhanced High Tide Ultimates.',
    descZh: '焦点闪回潮汐状态（与[退潮]交替）：创伤加成 +30%，回合末追加释放 1 阶技能 1 并强化首领大招控制/伤害。'
  },
  {
    key: 'low-tide',
    en: 'Low Tide',
    zh: '退潮',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback tidal state (alternates with [High Tide]): DMG Taken Reduction +20% and casts Rank 1 Skill 2 at round end.',
    descZh: '焦点闪回潮汐状态（与[涨潮]交替）：受创减免 +20%，回合末追加释放 1 阶技能 2。'
  },
  {
    key: 'pursuit-surge',
    en: 'Pursuit Surge',
    zh: '洞知递生',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 1 buff: grants 2 [Star Pursuit Points] every 2 rounds starting from Round 2.',
    descZh: '焦点闪回 4.1 第一关推荐增幅：第 2 回合起每 2 回合获得 2 点[星系洞知点]。'
  },
  {
    key: 'keen-edge',
    en: 'Keen Edge',
    zh: '新锐如锋',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 1 buff: stacks [Lingering Edge] on attack, transforming into [Razor Sharp] at 10 stacks.',
    descZh: '焦点闪回 4.1 第一关推荐增幅：攻击叠加[余锐]，叠满 10 层转化为[锋锐]。'
  },
  {
    key: 'lingering-edge',
    en: 'Lingering Edge',
    zh: '余锐',
    aliases: [],
    category: 'boss',
    descEn: 'Stacking charge granted by [Keen Edge] on attack; transforms into [Razor Sharp] upon reaching 10 stacks.',
    descZh: '【新锐如锋】攻击时累积的层数，叠满 10 层进阶为[锋锐]。'
  },
  {
    key: 'razor-sharp',
    en: 'Razor Sharp',
    zh: '锋锐',
    aliases: [],
    category: 'boss',
    descEn: 'Transformed burst buff from 10 stacks of [Lingering Edge]: grants Incantation Might +60% and Penetration Rate +20%.',
    descZh: '由 10 层[余锐]转化而来的强力增益：术法威力 +60%、穿透率 +20%。'
  },
  {
    key: 'guard-break-boost',
    en: 'Guard Break Boost',
    zh: '破势增幅',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 universal buff: grants DMG Bonus +30% after breaking an enemy\'s [Afflatus Guard].',
    descZh: '焦点闪回 4.1 通用推荐增幅：击破敌方[灵感耐受度]后全队创伤加成 +30%。'
  },
  {
    key: 'lingering-glow-might',
    en: 'Lingering Glow Might',
    zh: '余辉威力',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 2 buff: starts battle with 300 [Lingering Glow] and grants all allies Incantation Might +10%–45% across 100/200/300/600 thresholds.',
    descZh: '焦点闪回 4.1 第二关推荐增幅：开局自带 300 点[余辉]，按 100/200/300/600 档位赋予全队术法威力 +10%~45%。'
  },
  {
    key: 'ultimate-feedback',
    en: 'Ultimate Feedback',
    zh: '仪式回馈',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 2 buff: each Ultimate cast stacks +10% DMG Bonus on Slot 1 (up to +60%).',
    descZh: '焦点闪回 4.1 第二关推荐增幅：每次释放至终的仪式为 1 号位叠加 +10% 创伤加成（上限 +60%）。'
  },
  {
    key: 'sympathetic-resonance',
    en: 'Sympathetic Resonance',
    zh: '交感递升',
    aliases: [],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 3 buff: grants all allies ATK +10% if Slot 4 is Mineral, or Spelldock limit +1 if Slot 4 is Star.',
    descZh: '焦点闪回 4.1 第三关推荐增幅：4 号位为岩灵感时全队攻击 +10%，为星灵感时手牌上限 +1。'
  },
  {
    key: 'might-unleashed-mineral',
    en: 'Might Unleashed - Mineral',
    zh: '威力解放-岩',
    aliases: ['might unleashed mineral'],
    category: 'boss',
    descEn: 'Focused Flashback 4.1 Stage 3 buff: grants Slot 1 Incantation Might +10% and Ultimate Might +10% if Slot 1 is Mineral.',
    descZh: '焦点闪回 4.1 第三关推荐增幅：1 号位为岩灵感时获得术法威力 +10% 与仪式威力 +10%。'
  },
  {
    key: 'thumping-fins',
    en: 'Thumping Fins',
    zh: '拍鳍挑衅',
    aliases: [],
    category: 'boss',
    descEn: 'Hippocampus skill in Focused Flashback Stage 1 that grants itself [Taunt] for 2 rounds.',
    descZh: '焦点闪回第一关「马头鱼尾兽」技能，赋予自身 2 回合[嘲讽]。'
  },
  {
    key: 'sea-beasts-philosophy',
    en: "Sea Beast's Philosophy",
    zh: '海兽哲学',
    aliases: [],
    category: 'boss',
    descEn: 'Hippocampus Ultimate: heals the lowest-HP ally for 25% Max HP and grants 1 stack of [Sturdiness].',
    descZh: '「马头鱼尾兽」至终的仪式：治疗血量最低的友方 25% 最大生命并附加 1 层[坚固]。'
  },
  {
    key: 'all-consuming-maw',
    en: 'All-Consuming Maw',
    zh: '吞海巨口',
    aliases: [],
    category: 'boss',
    descEn: 'Charybdis [High Tide] Ultimate: deals heavy bonus Reality DMG to targets below 50% HP and inflicts [Bleed] for 2 rounds.',
    descZh: '「卡律布狄斯」涨潮至终的仪式：对半血以下目标造成高额额外现实创伤并附加 2 回合[流血]。'
  },
  {
    key: 'choking-coil',
    en: 'Choking Coil',
    zh: '窒息绞缠',
    aliases: [],
    category: 'boss',
    descEn: 'Scylla [High Tide] Ultimate in Focused Flashback Stage 2 that inflicts [Disarm] for 1 round.',
    descZh: '「斯库拉」涨潮至终的仪式，命中后附加 1 回合控制效果（缴械/缄默）。'
  },
  {
    key: 'abyssal-slither',
    en: 'Abyssal Slither',
    zh: '深渊游曳',
    aliases: [],
    category: 'boss',
    descEn: 'Scylla Skill 2 in Focused Flashback Stage 2 that dispels 1 [Pos Status] from the target.',
    descZh: '「斯库拉」2 技能，命中后会驱散我方 1 种[状态增益]。'
  },
  {
    key: 'strangling-coil',
    en: 'Strangling Coil',
    zh: '绞杀缠绕',
    aliases: [],
    category: 'boss',
    descEn: 'Wild Scylla [High Tide] Ultimate in Focused Flashback Stage 2 that inflicts [Silence] for 1 round.',
    descZh: '「野生斯库拉」涨潮至终的仪式，命中后附加 1 回合控制效果（缄默/缴械）。'
  },
  {
    key: 'guttural-screech',
    en: 'Guttural Screech',
    zh: '喉音尖啸',
    aliases: [],
    category: 'boss',
    descEn: 'Wild Scylla 1-target attack in Focused Flashback Stage 2 that prioritizes the leftmost ally (Slot 1).',
    descZh: '「野生斯库拉」单体锁定技能，优先攻击我方最左侧 1 号位角色。'
  },
  {
    key: 'untouchable-golden-fleece',
    en: 'Untouchable Golden Fleece',
    zh: '别薅金羊毛',
    aliases: [],
    category: 'boss',
    descEn: 'Golden-Fleeced Ram Ultimate in Focused Flashback Stage 3 that inflicts 2 stacks of [Scorch].',
    descZh: '焦点闪回第三关「金毛羊」至终的仪式，附加 2 层[灼烧]。'
  },
  {
    key: 'glittering-temper',
    en: 'Glittering Temper',
    zh: '烁金脾气',
    aliases: [],
    category: 'boss',
    descEn: 'Golden-Fleeced Ram Skill 1 that inflicts [Paralyze] (converts to [Daze] at 2 stacks).',
    descZh: '「金毛羊」1 技能，命中后附加[麻痹]（叠满 2 层转化为[眩晕]）。'
  },
  {
    key: 'fluffy-comfort',
    en: 'Fluffy Comfort',
    zh: '蓬松安抚',
    aliases: [],
    category: 'boss',
    descEn: 'Golden-Fleeced Ram Skill 2 that grants DMG Taken Reduction +30%.',
    descZh: '「金毛羊」2 技能，赋予自身受创减免 +30%。'
  },
  {
    key: 'ambush-in-endless-night',
    en: 'Ambush in Endless Night',
    zh: '永夜伏击',
    aliases: [],
    category: 'boss',
    descEn: 'Eclipse Bat Ultimate in Focused Flashback Stage 3 that deals +100% bonus Reality DMG to targets afflicted with [Poison].',
    descZh: '「日熄蝙蝠」至终的仪式，对处于[中毒]状态的目标额外造成 +100% 现实创伤。'
  }
];
