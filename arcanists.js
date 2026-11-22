// 《重返未来：1999》全角色档案（139 名角色立绘索引、官方灵感、星级、调查编号与评级）
// 立绘文件均已本地化至 ./assets/portraits/{id}.webp，确保离线与国内网络毫秒级稳定加载。

export const AFFLATUS_META = {
  beast:        { label: '兽',   en: 'BEAST',        color: '#e59a8d', ribbon: '#8f3430', border: '#c45c52', icon: './assets/uttu/aff_beast.png' },
  plant:        { label: '木',   en: 'PLANT',        color: '#a9d4b0', ribbon: '#476e50', border: '#6fa07a', icon: './assets/uttu/aff_plant.png' },
  star:         { label: '星',   en: 'STAR',         color: '#a3c8e6', ribbon: '#3f5f7c', border: '#6892b8', icon: './assets/uttu/aff_star.png' },
  mineral:      { label: '岩',   en: 'MINERAL',      color: '#e4c48a', ribbon: '#7f5e35', border: '#b88f54', icon: './assets/uttu/aff_mineral.png' },
  spirit:       { label: '灵',   en: 'SPIRIT',       color: '#cbb2e8', ribbon: '#61487c', border: '#9474b8', icon: './assets/uttu/aff_spirit.png' },
  intellect:    { label: '智',   en: 'INTELLECT',    color: '#ebd083', ribbon: '#7b6832', border: '#bfa14b', icon: './assets/uttu/aff_intellect.png' },
  mineral_star: { label: '岩/星', en: 'MINERAL·STAR', color: '#d4c8b8', ribbon: '#5d6370', border: '#9ab0c8', icon: './assets/uttu/aff_mineral_star.png' },
  unknown:      { label: '秘',   en: 'ARCANIST',     color: '#d8c5ae', ribbon: '#514136', border: '#8a6f59', icon: '' }
};

// 全角色主索引（涵盖 1.0 至 4.1 亚特兰蒂斯谋杀案全部 139 名神秘学家）
const CHARACTER_ROSTER = new Map([
  ["槲寄生", { id: 10001, aff: 'plant', star: 6, en: "Druvis III" }],
  ["红弩箭", { id: 10002, aff: 'star', star: 6, en: "Lilya" }],
  ["尼克·波顿", { id: 10003, aff: 'beast', star: 4, en: "Nick Bottom" }],
  ["小春雀儿", { id: 10004, aff: 'plant', star: 4, en: "Eagle" }],
  ["未锈铠", { id: 10005, aff: 'spirit', star: 6, en: "A Knight" }],
  ["苏芙比", { id: 10006, aff: 'plant', star: 6, en: "Sotheby" }],
  ["X", { id: 10007, aff: 'intellect', star: 5, en: "X" }],
  ["玛丽莲", { id: 10008, aff: 'beast', star: 5, en: "Sweetheart" }],
  ["弄臣", { id: 10009, aff: 'star', star: 3, en: "The Fool" }],
  ["冬", { id: 10010, aff: 'plant', star: 4, en: "Зима" }],
  ["芭妮芭妮", { id: 10011, aff: 'beast', star: 4, en: "Bunny Bunny" }],
  ["狼群", { id: 10012, aff: 'beast', star: 4, en: "Pavia" }],
  ["婴儿蓝", { id: 10013, aff: 'star', star: 5, en: "Baby Blue" }],
  ["夏利", { id: 10014, aff: 'star', star: 5, en: "Charlie" }],
  ["雾行者", { id: 10015, aff: 'star', star: 4, en: "Oliver Fog" }],
  ["柏林以东", { id: 10016, aff: 'plant', star: 5, en: "Bkornblume" }],
  ["帕米埃", { id: 10017, aff: 'beast', star: 5, en: "Dikke" }],
  ["十四行诗", { id: 10018, aff: 'mineral', star: 5, en: "Sonetto" }],
  ["气球派对", { id: 10019, aff: 'mineral', star: 5, en: "Balloon Party" }],
  ["星锑", { id: 10020, aff: 'star', star: 6, en: "Regulus" }],
  ["红斗篷", { id: 10021, aff: 'mineral', star: 4, en: "Mondlicht" }],
  ["无线电小姐", { id: 10022, aff: 'spirit', star: 2, en: "Ms. Radio" }],
  ["APPLe", { id: 10023, aff: 'star', star: 4, en: "APPLe" }],
  ["拉拉泉", { id: 10025, aff: 'plant', star: 3, en: "La Source" }],
  ["铅玻璃", { id: 10026, aff: 'mineral', star: 4, en: "Cristallo" }],
  ["百夫长", { id: 10027, aff: 'beast', star: 6, en: "Centurion" }],
  ["TTT", { id: 10028, aff: 'star', star: 4, en: "TTT" }],
  ["星之眼", { id: 10029, aff: 'star', star: 3, en: "aliEn T" }],
  ["莉拉妮", { id: 10030, aff: 'beast', star: 3, en: "Leilani" }],
  ["约翰·提托", { id: 10031, aff: 'intellect', star: 3, en: "John Titor" }],
  ["讣告人", { id: 10032, aff: 'mineral', star: 5, en: "Necrologist" }],
  ["五色月", { id: 10033, aff: 'plant', star: 5, en: "Satsuki" }],
  ["泥鯭的士", { id: 10034, aff: 'plant', star: 6, en: "An-an Lee" }],
  ["丽莎&路易斯", { id: 10035, aff: 'spirit', star: 3, en: "Twins Sleep" }],
  ["玛蒂尔达", { id: 10036, aff: 'star', star: 5, en: "Matilda" }],
  ["爱宠", { id: 10037, aff: 'plant', star: 4, en: "Rabies" }],
  ["坦南特", { id: 10038, aff: 'beast', star: 5, en: "Tennant" }],
  ["莫桑女士", { id: 10039, aff: 'mineral', star: 4, en: "Ms. Moissan" }],
  ["贝蒂", { id: 10040, aff: 'mineral', star: 3, en: "Bette" }],
  ["吵闹鬼", { id: 10041, aff: 'spirit', star: 4, en: "Poltergeist" }],
  ["兔毛手袋", { id: 10042, aff: 'beast', star: 6, en: "Medicine Pocket" }],
  ["远旅", { id: 10043, aff: 'star', star: 6, en: "Voyager" }],
  ["喀嚓喀嚓", { id: 10044, aff: 'spirit', star: 5, en: "Click" }],
  ["哒哒达利", { id: 10045, aff: 'beast', star: 3, en: "Darley Clatter" }],
  ["温妮弗雷德", { id: 10046, aff: 'mineral', star: 6, en: "Eternity" }],
  ["新巴别塔", { id: 10047, aff: 'mineral', star: 6, en: "Ms. NewBabel" }],
  ["牙仙", { id: 10048, aff: 'star', star: 6, en: "Tooth Fairy" }],
  ["洋葱头", { id: 10049, aff: 'mineral', star: 3, en: "ONiON" }],
  ["斯普特尼克", { id: 10050, aff: 'star', star: 3, en: "Sputnik" }],
  ["洁西卡", { id: 10051, aff: 'plant', star: 6, en: "Jessica" }],
  ["小梅斯梅尔", { id: 10052, aff: 'intellect', star: 4, en: "Mesmer Jr." }],
  ["埃里克", { id: 10053, aff: 'star', star: 4, en: "Erick" }],
  ["门", { id: 10054, aff: 'intellect', star: 2, en: "Door" }],
  ["金蜜儿", { id: 10055, aff: 'star', star: 5, en: "Blonney" }],
  ["恐怖通", { id: 10056, aff: 'mineral', star: 5, en: "Horropedia" }],
  ["梅兰妮", { id: 10057, aff: 'beast', star: 6, en: "Melania" }],
  ["皮克勒斯", { id: 10058, aff: 'mineral', star: 6, en: "Pickles" }],
  ["挖掘艺术", { id: 10059, aff: 'plant', star: 5, en: "Diggers" }],
  ["37", { id: 10060, aff: 'star', star: 6, en: "37" }],
  ["伽菈波那", { id: 10061, aff: 'mineral', star: 6, en: "Kaalaa Baunaa" }],
  ["坎吉拉", { id: 10062, aff: 'plant', star: 5, en: "Kanjira" }],
  ["鬃毛沙砾", { id: 10063, aff: 'beast', star: 6, en: "Shamane" }],
  ["6", { id: 10064, aff: 'intellect', star: 6, en: "6" }],
  ["可燃点", { id: 10065, aff: 'beast', star: 6, en: "Spathodea" }],
  ["和平乌鲁", { id: 10066, aff: 'mineral', star: 5, en: "Ulu" }],
  ["爱兹拉", { id: 10067, aff: 'star', star: 6, en: "Ezra Theodore" }],
  ["沙丝绒", { id: 10068, aff: 'beast', star: 5, en: "Desert Flannel" }],
  ["曲娘", { id: 10069, aff: 'mineral', star: 6, en: "Jiu Niangzi" }],
  ["小叶尼塞", { id: 10070, aff: 'star', star: 5, en: "Yenisei" }],
  ["葛天", { id: 10071, aff: 'beast', star: 6, en: "Getian" }],
  ["伊索尔德", { id: 10072, aff: 'spirit', star: 6, en: "Isolde" }],
  ["马库斯", { id: 10073, aff: 'plant', star: 6, en: "Marcus" }],
  ["维拉", { id: 10074, aff: 'plant', star: 6, en: "Vila" }],
  ["阿夫西维", { id: 10075, aff: 'plant', star: 5, en: "Avgust" }],
  ["北方哨歌", { id: 10076, aff: 'star', star: 6, en: "Windsong" }],
  ["塞梅尔维斯", { id: 10077, aff: 'mineral', star: 6, en: "Semmelweis" }],
  ["露西", { id: 10078, aff: 'intellect', star: 6, en: "Lucy" }],
  ["罗蕾莱", { id: 10079, aff: 'star', star: 5, en: "Lorelei" }],
  ["卡卡尼亚", { id: 10080, aff: 'plant', star: 6, en: "Kakania" }],
  ["J", { id: 10081, aff: 'beast', star: 6, en: "J" }],
  ["先驱者", { id: 10082, aff: 'spirit', star: 3, en: "Pioneer" }],
  ["环状水星", { id: 10083, aff: 'spirit', star: 6, en: "Mercuria" }],
  ["蓝手帕", { id: 10084, aff: 'spirit', star: 6, en: "Tuesday" }],
  ["数羊羔", { id: 10085, aff: 'spirit', star: 5, en: "Barbara" }],
  ["阿尔古斯", { id: 10086, aff: 'plant', star: 6, en: "Argus" }],
  ["天使娜娜", { id: 10087, aff: 'beast', star: 6, en: "Anjo Nala" }],
  ["邓肯先生", { id: 10088, aff: 'beast', star: 5, en: "Mr. Duncan" }],
  ["白朗姆", { id: 10089, aff: 'intellect', star: 4, en: "White Rum" }],
  ["洛佩拉", { id: 10090, aff: 'beast', star: 6, en: "Lopera" }],
  ["笃笃骨", { id: 10091, aff: 'plant', star: 6, en: "Willow" }],
  ["纸信圈儿", { id: 10092, aff: 'star', star: 6, en: "Flutterpage" }],
  ["宽檐帽", { id: 10093, aff: 'mineral', star: 5, en: "Brimley" }],
  ["芭卡洛儿", { id: 10094, aff: 'star', star: 6, en: "Barcarola" }],
  ["图图石子", { id: 10095, aff: 'mineral', star: 6, en: "Fatutu" }],
  ["梁月", { id: 10096, aff: 'star', star: 6, en: "Liang Yue" }],
  ["空脑袋", { id: 10097, aff: 'plant', star: 5, en: "Loggerhead" }],
  ["菲林士多", { id: 10098, aff: 'plant', star: 6, en: "Noire" }],
  ["虚构集", { id: 10099, aff: 'mineral', star: 6, en: "Recoleta" }],
  ["阿莱夫", { id: 10100, aff: 'intellect', star: 6, en: "Aleph" }],
  ["冷周六", { id: 10101, aff: 'plant', star: 6, en: "Hissabeth" }],
  ["命名日", { id: 10102, aff: 'mineral', star: 5, en: "Name Day" }],
  ["库珀花环", { id: 10103, aff: 'star', star: 6, en: "Kiperina" }],
  ["诺谛卡", { id: 10104, aff: 'spirit', star: 6, en: "Nautika" }],
  ["乌尔里希", { id: 10105, aff: 'intellect', star: 6, en: "Ulrich" }],
  ["嚼嚼松果", { id: 10106, aff: 'plant', star: 5, en: "Buddy Fairchild" }],
  ["莫莉德尔", { id: 10107, aff: 'beast', star: 6, en: "Moldir" }],
  ["玛丽安娜", { id: 10108, aff: 'mineral', star: 6, en: "Sentinel" }],
  ["卡戎", { id: 10109, aff: 'spirit', star: 6, en: "Charon" }],
  ["艾吉奥·奥迪托雷", { id: 10110, aff: 'star', star: 6, en: "Ezio Auditore" }],
  ["卡珊德拉", { id: 10111, aff: 'mineral', star: 6, en: "Kassandra" }],
  ["阿利克西欧斯", { id: 10112, aff: 'beast', star: 5, en: "Alexios" }],
  ["野树莓", { id: 10113, aff: 'mineral', star: 6, en: "Rubuska" }],
  ["告死鸟", { id: 10114, aff: 'intellect', star: 6, en: "Corvus" }],
  ["贝丽尔", { id: 10115, aff: 'intellect', star: 6, en: "Beryl" }],
  ["灰调蓝", { id: 10116, aff: 'beast', star: 6, en: "Brume" }],
  ["玛尔纱", { id: 10117, aff: 'beast', star: 6, en: "Marsha" }],
  ["伊戈尔", { id: 10118, aff: 'beast', star: 6, en: "Igor" }],
  ["鹭鸶剪", { id: 10119, aff: 'plant', star: 6, en: "Paper Heron" }],
  ["芦草结", { id: 10120, aff: 'plant', star: 4, en: "Reed" }],
  ["程和光", { id: 10121, aff: 'star', star: 6, en: "Cheng Heguang" }],
  ["洛伦兹蝴蝶", { id: 10122, aff: 'intellect', star: 6, en: "Lorentz Butterfly" }],
  ["《湖边的女人》", { id: 10123, aff: 'plant', star: 4, en: "Lady by the Lake" }],
  ["拉莫纳", { id: 10124, aff: 'plant', star: 6, en: "Ramona" }],
  ["哑谜", { id: 10125, aff: 'intellect', star: 6, en: "Enigma" }],
  ["小瑞安侬", { id: 10126, aff: 'beast', star: 6, en: "Rhiannon" }],
  ["珐琅眼", { id: 10127, aff: 'mineral', star: 6, en: "Coppélia" }],
  ["银装小春雀儿", { id: 10128, aff: 'plant', star: 5, en: "Silverwing Eagle" }],
  ["无名者", { id: 10129, aff: 'mineral', star: 6, en: "Ms. Stranger" }],
  ["回声谣", { id: 10130, aff: 'mineral', star: 6, en: "Everecho" }],
  ["奠基石", { id: 10131, aff: 'mineral', star: 6, en: "Cornerstone" }],
  ["双生舞伶", { id: 10132, aff: 'mineral_star', star: 6, en: "The Twins" }],
  ["诺拉", { id: 10133, aff: 'spirit', star: 4, en: "NORA" }],
  ["赫多涅", { id: 10134, aff: 'mineral', star: 6, en: "Hedone" }],
  ["纳西索斯", { id: 10135, aff: 'beast', star: 6, en: "Narcissus" }],
  ["狩勋女巫红弩箭", { id: 10136, aff: 'star', star: 6, en: "Huntsworn Lilya" }],
  ["格林杜尔", { id: 10137, aff: 'beast', star: 4, en: "Glyndŵr" }],
  ["德雷克", { id: 10138, aff: 'beast', star: 6, en: "Drake" }],
  ["佩施塔", { id: 10139, aff: 'star', star: 6, en: "Perchta" }],
  ["伊芙琳", { id: 10140, aff: 'beast', star: 6, en: "Evelyn" }]
]);

export const CHARACTER_LIST = [...CHARACTER_ROSTER.entries()]
  .map(([name, meta]) => ({
    name,
    ...meta,
    portrait: `./assets/portraits/${meta.id}.webp`
  }))
  .sort((a, b) => (b.star - a.star) || (b.id - a.id));

// 社区常见简称 / 异体字 / 英文别名映射
const CHARACTER_ALIASES = new Map([
  ['joe', 'J'],
  ['j', 'J'],
  ['艾吉奥', '艾吉奥·奥迪托雷'],
  ['ezio', '艾吉奥·奥迪托雷'],
  ['湖边的女人', '《湖边的女人》'],
  ['湖中的女人', '《湖边的女人》'],
  ['库伯花环', '库珀花环'],
  ['银装小春雀', '银装小春雀儿'],
  ['小春雀', '小春雀儿'],
  ['狩红', '狩勋女巫红弩箭'],
  ['施佩塔', '佩施塔'],
  ['莫基石', '奠基石'],
  ['玛尔莎', '玛尔纱'],
  ['瑞安侬', '小瑞安侬'],
  ['瑞', '小瑞安侬'],
  ['洛伦兹', '洛伦兹蝴蝶'],
  ['珐郎眼', '珐琅眼'],
  ['法郎眼', '珐琅眼'],
  ['芭卡洛尔', '芭卡洛儿'],
  ['狗', '皮克勒斯'],
  ['水星', '环状水星'],
  ['娜娜', '天使娜娜'],
  ['泥鯭的士', '泥鯭的士'],
  ['泥猛的士', '泥鯭的士'],
  ['安安', '泥鯭的士'],
  ['槲寄生', '槲寄生'],
  ['新巴别塔', '新巴别塔'],
  ['巴别塔', '新巴别塔'],
  ['兔毛', '兔毛手袋'],
  ['气球', '气球派对'],
  ['哨歌', '北方哨歌'],
  ['纸信', '纸信圈儿'],
  ['圈儿', '纸信圈儿'],
  ['小鹿', '洁西卡'],
  ['百夫', '百夫长'],
  ['未锈铠', '未锈铠'],
  ['远旅', '远旅'],
  ['星锑', '星锑']
]);

// 构建大小写与全半角归一化索引 + 英文名索引
const NORMALIZED_INDEX = new Map();
for (const [cn, meta] of CHARACTER_ROSTER.entries()) {
  const entry = { name: cn, ...meta };
  NORMALIZED_INDEX.set(cn.normalize('NFKC').trim().toLowerCase(), entry);
  if (meta.en) {
    NORMALIZED_INDEX.set(meta.en.normalize('NFKC').trim().toLowerCase(), entry);
  }
}

function cleanCharacterInput(raw) {
  return String(raw ?? '')
    .normalize('NFKC')
    .replace(/[（(][^）)]*[）)]/g, '')
    .replace(/^(?:[12一二]?狂想|[12]狂|[0-5]塑|满塑)\s*/u, '')
    .trim();
}

export function resolveCharacter(rawName) {
  const cleaned = cleanCharacterInput(rawName);
  if (!cleaned) return null;
  const lower = cleaned.toLowerCase();

  const aliasTarget = CHARACTER_ALIASES.get(cleaned) || CHARACTER_ALIASES.get(lower);
  if (aliasTarget) {
    const hit = NORMALIZED_INDEX.get(aliasTarget.normalize('NFKC').trim().toLowerCase());
    if (hit) return { ...hit, portrait: `./assets/portraits/${hit.id}.webp` };
  }

  const exact = NORMALIZED_INDEX.get(lower);
  if (exact) return { ...exact, portrait: `./assets/portraits/${exact.id}.webp` };

  // 若名称带有角色全名（排除多选连接词与纯数字代号如 37 误撞原表 4 角色简称串）则兜底匹配最长中文名
  if (!/[+/／]|或者|或则/.test(cleaned) && cleaned.length <= 14) {
    let best = null;
    for (const [cn, meta] of CHARACTER_ROSTER.entries()) {
      if (cn.length >= 2 && !/^\d+$/.test(cn) && cleaned.includes(cn) && (!best || cn.length > best.name.length)) {
        best = { name: cn, ...meta };
      }
    }
    if (best) return { ...best, portrait: `./assets/portraits/${best.id}.webp` };
  }
  return null;
}

// 统一角色规范 ID 键（彻底消除「银装小春雀」vs「银装小春雀儿」等分裂项）
export function canonicalCharacterKey(rawName) {
  const char = resolveCharacter(rawName);
  if (char) return `char:${char.id}`;
  return String(rawName ?? '').normalize('NFKC').trim().toLowerCase();
}

// 统一灰机 Wiki 标准角色展示名（未收录角色或原表简称保持原样）
export function canonicalDisplayName(rawName) {
  const char = resolveCharacter(rawName);
  if (char) return char.name;
  return String(rawName ?? '').trim();
}

// 双向检索匹配：搜索「银装小春雀」或「银装小春雀儿」或英文名均命中同一角色
export function characterMatchesQuery(rawName, queryNorm) {
  if (!queryNorm) return true;
  const rawNorm = String(rawName ?? '').normalize('NFKC').trim().toLowerCase();
  if (rawNorm.includes(queryNorm)) return true;
  const char = resolveCharacter(rawName);
  if (char) {
    if (char.name.normalize('NFKC').toLowerCase().includes(queryNorm)) return true;
    if (char.en && char.en.toLowerCase().includes(queryNorm)) return true;
    // 若搜索词本身也能解析到同一个角色 ID（例如搜索别名「银装小春雀」命中「银装小春雀儿」）
    const qChar = resolveCharacter(queryNorm);
    if (qChar && qChar.id === char.id) return true;
  }
  return false;
}

// 焦点闪回原表社区单字简称对照表（用于将「37纸J瑞」「红37佩+瑞/德/鬃」「娜J纸瑞」等精准还原为官方立绘编队）
const SHORTHAND_CHAR_MAP = new Map([
  ['37', '37'],
  ['6', '6'],
  ['joe', 'J'],
  ['j', 'J'],
  ['瑞', '小瑞安侬'],
  ['纸', '纸信圈儿'],
  ['圈', '纸信圈儿'],
  ['佩', '佩施塔'],
  ['德', '德雷克'],
  ['鬃', '鬃毛沙砾'],
  ['伊', '伊索尔德'],
  ['燃', '可燃点'],
  ['莫', '莫莉德尔'],
  ['纳', '纳西索斯'],
  ['程', '程和光'],
  ['梅', '梅兰妮'],
  ['乌', '乌尔里希'],
  ['戈', '伊戈尔'],
  ['哑', '哑谜'],
  ['哨', '北方哨歌'],
  ['蝶', '洛伦兹蝴蝶'],
  ['洛', '洛佩拉'],
  ['卡', '卡卡尼亚'],
  ['戎', '卡戎'],
  ['鹭', '鹭鸶剪'],
  ['灰', '灰调蓝'],
  ['维', '维拉'],
  ['水', '环状水星'],
  ['环', '环状水星'],
  ['娜', '天使娜娜'],
  ['草', '芦草结'],
  ['纱', '玛尔纱'],
  ['拉', '拉莫纳'],
  ['蓝', '蓝手帕'],
  ['月', '梁月'],
  ['莱', '阿莱夫'],
  ['花', '库珀花环'],
  ['珐', '珐琅眼'],
  ['赫', '赫多涅'],
  ['回', '回声谣'],
  ['舞', '双生舞伶'],
  ['百', '百夫长'],
  ['红', '狩勋女巫红弩箭'],
  ['珊', '卡珊德拉'],
  ['菲', '菲林士多'],
  ['冷', '冷周六'],
  ['虚', '虚构集'],
  ['葛', '葛天'],
  ['蛾', '无名者'],
  ['诺', '诺谛卡'],
  ['塞', '塞梅尔维斯'],
  ['莓', '野树莓'],
  ['贝', '贝丽尔'],
  ['鸭', '牙仙'],
  ['牙', '牙仙'],
  ['露', '露西'],
  ['芭', '芭卡洛儿'],
  ['狗', '皮克勒斯'],
  ['图', '图图石子'],
  ['兔', '兔毛手袋'],
  ['鹿', '洁西卡'],
  ['曲', '曲娘'],
  ['阿', '阿尔古斯'],
  ['苏', '苏芙比'],
  ['柏', '柏林以东'],
  ['泥', '泥鯭的士'],
  ['安', '泥鯭的士'],
  ['温', '温妮弗雷德'],
  ['塔', '新巴别塔'],
  ['星', '星锑'],
  ['远', '远旅'],
  ['铠', '未锈铠'],
  ['槲', '槲寄生'],
  ['笃', '笃笃骨']
]);

function isWildcardSlotText(text) {
  return /^(?:任意|有拐力|自由|随意|补位|拐位|生存位|治疗位)/.test(String(text ?? '').trim());
}

function resolveShorthandToken(token, carryHint = '') {
  const t = String(token ?? '').trim();
  if (!t) return null;
  if (t === '红' && carryHint.includes('红弩箭') && !carryHint.includes('狩')) {
    return resolveCharacter('红弩箭');
  }
  const direct = resolveCharacter(t);
  if (direct) return direct;
  const mapped = SHORTHAND_CHAR_MAP.get(t) || SHORTHAND_CHAR_MAP.get(t.toLowerCase());
  return mapped ? resolveCharacter(mapped) : null;
}

function tokenizeCompactShorthand(text, carryHint = '') {
  const s = String(text ?? '').normalize('NFKC').trim();
  const out = [];
  let i = 0;
  while (i < s.length) {
    if (/\s/.test(s[i])) { i += 1; continue; }
    // 优先匹配多字符代号（JOE / 37）
    const three = s.slice(i, i + 3).toLowerCase();
    if (three === 'joe') {
      const ch = resolveCharacter('J');
      if (ch) out.push(ch);
      i += 3;
      continue;
    }
    const two = s.slice(i, i + 2);
    if (two === '37') {
      const ch = resolveCharacter('37');
      if (ch) out.push(ch);
      i += 2;
      continue;
    }
    const ch = resolveShorthandToken(s[i], carryHint);
    if (!ch) return null; // 遇到无法识别的字符则放弃纯单字拆解
    out.push(ch);
    i += 1;
  }
  return out.length ? out : null;
}

function parseSingleSlot(rawToken, carryHint = '') {
  const raw = String(rawToken ?? '').trim();
  if (!raw) return null;

  const direct = resolveCharacter(raw);
  if (direct) return { type: 'char', raw, char: direct };

  if (isWildcardSlotText(raw)) {
    return { type: 'wild', raw, label: raw.length > 6 ? raw.slice(0, 6) : raw };
  }

  // 处理多选灵活位（如「6/卡珊德拉/葛天/阿尔古斯/鹭鸶剪」「JOE/哑谜/库珀花环」「瑞/德/鬃」「鬃毛沙砾或者狗」「洛纳/瑞J/瑞纳」）
  if (/[/／]|或者|或则|或/.test(raw)) {
    const parts = raw.split(/[/／]|或者|或则|或/).map((s) => s.trim()).filter(Boolean);
    const chars = [];
    const seen = new Set();
    let hasCombo = false;
    for (const p of parts) {
      const c = resolveShorthandToken(p, carryHint);
      if (c) {
        if (!seen.has(c.id)) { seen.add(c.id); chars.push(c); }
        continue;
      }
      const combo = tokenizeCompactShorthand(p, carryHint);
      if (combo) {
        if (combo.length > 1) hasCombo = true;
        for (const cc of combo) {
          if (!seen.has(cc.id)) { seen.add(cc.id); chars.push(cc); }
        }
      }
    }
    if (chars.length === 1 && parts.length === 1) {
      return { type: 'char', raw, char: chars[0] };
    }
    if (chars.length >= 1) {
      const tag = hasCombo ? `多组合` : `${parts.length}选1`;
      const shortLabel = chars.length <= 2
        ? chars.map((c) => c.name.slice(0, 3)).join('/')
        : `${chars[0].name.slice(0, 3)}等${chars.length}人`;
      return { type: 'flex', raw, chars, optionCount: parts.length, tag, label: shortLabel };
    }
  }

  // 单个未知条目仍尝试单字简称（如极简单字）
  const singleShort = resolveShorthandToken(raw, carryHint);
  if (singleShort) return { type: 'char', raw, char: singleShort };

  return { type: 'unknown', raw };
}

// 将完整配队数组（含单元素原表简写串与多选灵活位）统一解析为可渲染立绘的槽位列表
export function parseLineupSlots(team, carryStr = '') {
  const list = Array.isArray(team) ? team.map((s) => String(s ?? '').trim()).filter(Boolean) : [];
  if (!list.length) return [];

  if (list.length > 1) {
    return list.map((item) => parseSingleSlot(item, carryStr)).filter(Boolean);
  }

  const sole = list[0];
  const direct = resolveCharacter(sole);
  if (direct) return [{ type: 'char', raw: sole, char: direct }];

  // 单元素复合字符串解析（例：「37/JOE/小瑞安侬/芭卡洛尔」「红37佩+瑞/德/鬃」「北方哨歌/纸信圈儿/J+瑞或者蝶或则37或者程」「戈莫+洛纳/瑞J/瑞纳」）
  const plusParts = sole.split(/[+＋]/).map((s) => s.trim()).filter(Boolean);
  const slots = [];
  let parsedOk = true;

  for (let idx = 0; idx < plusParts.length; idx++) {
    const seg = plusParts[idx];
    if (idx === 0) {
      // 若首段含 / 且每一项都能单独解析为完整角色/灵活位（如「37/JOE/小瑞安侬/芭卡洛尔」「双生舞伶/珐郎眼/赫多涅/鬃毛沙砾或者狗」）
      if (/[/／]/.test(seg)) {
        const slashParts = seg.split(/[/／]/).map((s) => s.trim()).filter(Boolean);
        const mapped = slashParts.map((sp) => parseSingleSlot(sp, carryStr));
        const allValid = mapped.length >= 2 && mapped.every((m) => m && m.type !== 'unknown');
        if (allValid) {
          slots.push(...mapped);
          continue;
        }
      }
      // 否则尝试纯紧凑单字简写串（如「37纸J瑞」「红37佩」「娜J纸瑞」「戈」「贝J伊」）
      const compact = tokenizeCompactShorthand(seg, carryStr);
      if (compact) {
        for (const ch of compact) slots.push({ type: 'char', raw: ch.name, char: ch });
        continue;
      }
      const single = parseSingleSlot(seg, carryStr);
      if (single && single.type !== 'unknown') {
        slots.push(single);
      } else {
        parsedOk = false;
        break;
      }
    } else {
      const flexSlot = parseSingleSlot(seg, carryStr);
      if (flexSlot && flexSlot.type !== 'unknown') {
        slots.push(flexSlot);
      } else {
        parsedOk = false;
        break;
      }
    }
  }

  if (parsedOk && slots.length) return slots;
  return [{ type: 'legacy', raw: sole }];
}

// 从任意配队中提取全部已解析的角色名（供「阵容含该角色」、灵感快筛与搜索复用）
export function extractLineupCharacterNames(team, carryStr = '') {
  const slots = parseLineupSlots(team, carryStr);
  const names = [];
  for (const s of slots) {
    if (s.type === 'char' && s.char) names.push(s.char.name);
    else if (s.type === 'flex' && s.chars?.length) {
      for (const c of s.chars) names.push(c.name);
    } else if (s.raw) {
      names.push(s.raw);
    }
  }
  return names;
}

export function resolveAfflatus(name) {
  const char = resolveCharacter(name);
  if (char?.aff) return char.aff;
  const text = String(name ?? '');
  if (text.includes('·木')) return 'plant';
  if (text.includes('·星')) return 'star';
  if (text.includes('·岩')) return 'mineral';
  if (text.includes('·兽')) return 'beast';
  if (text.includes('·灵')) return 'spirit';
  if (text.includes('·智')) return 'intellect';
  return 'unknown';
}

// 实机首领官方立绘、英文副题、弱点灵感、调查建议标签与 Wiki 链接映射
// 英文副题：神话的遗闻采用灰机 Wiki 鬃毛总页正确拼写 Eidolon of Avarice（对应「黄金源流」机制）
const WIKI_41 = 'https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1';
const WIKI_MAIN = 'https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5';

const BOSS_ASSETS = new Map([
  // 4.1 亚特兰蒂斯谋杀案 · 鉴藏者特版（本期新三图，薄弱点核对自灰机 Wiki 鬃毛邮报 4.1 及实机截图）
  ['神话的遗闻',     { en: 'Eidolon of Avarice',                   weakness: ['star', 'plant'],      tags: ['群体伤害', '爆发伤害'], wiki: WIKI_41,   thumb: './assets/bosses/v4a1_boss1.png', hero: './assets/bosses/v4a1_boss1_wide.png', pos: '50% 22%' }],
  ['思想的表观',     { en: 'Manifestation of Thought',             weakness: ['intellect', 'beast'], tags: ['护盾', '额外行动'],     wiki: WIKI_41,   thumb: './assets/bosses/v4a1_boss2.png', hero: './assets/bosses/v4a1_boss2_wide.png', pos: '50% 24%' }],
  ['生命的饥馑',     { en: 'Coveter of Eternity',                  weakness: ['mineral', 'spirit'],  tags: ['仪式伤害', '即时治疗'], wiki: WIKI_41,   thumb: './assets/bosses/v4a1_boss3.png', hero: './assets/bosses/v4a1_boss3_wide.png', pos: '50% 18%' }],
  ['生命的饥谨',     { en: 'Coveter of Eternity',                  weakness: ['mineral', 'spirit'],  tags: ['仪式伤害', '即时治疗'], wiki: WIKI_41,   thumb: './assets/bosses/v4a1_boss3.png', hero: './assets/bosses/v4a1_boss3_wide.png', pos: '50% 18%' }],
  // 目击者特版 · 往期复刻首领（12 图全覆盖，优势灵感均核对自灰机 Wiki 对应条目）
  ['子弹的冬年',     { en: 'The Bullet-Torn Winter',               weakness: ['star', 'beast'],                     tags: ['群体伤害', '爆发伤害'], wiki: WIKI_MAIN, thumb: './assets/bosses/v4a0_boss1.png', hero: './assets/bosses/v4a0_boss1.png', pos: '50% 22%' }],
  ['急性猩红症·Ⅱ型', { en: 'Insatiable Bloodsucker Type II',       weakness: ['beast', 'plant', 'star', 'mineral'], tags: ['自然灵感', '仪式解控'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a9_boss1.png', hero: './assets/bosses/v3a9_boss1.png', pos: '50% 24%' }],
  ['太阳的宠臣',     { en: 'The Sun’s Thrall',                     weakness: ['star', 'mineral'],                   tags: ['治疗咒语', '主动攻击'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a8_boss1.png', hero: './assets/bosses/v3a8_boss1.png', pos: '50% 28%' }],
  ['旧日的荣耀',     { en: 'Glory Days Manifest',                  weakness: ['mineral', 'spirit'],                 tags: ['多增益叠层', '爆发伤害'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a7_boss1.png', hero: './assets/bosses/v3a7_boss1.png', pos: '50% 22%' }],
  ['自我同情者',     { en: 'The Self-Pitying Avenger',             weakness: ['star', 'mineral'],                   tags: ['现实创伤', '及时治疗'], wiki: WIKI_MAIN, thumb: './assets/bosses/sp02_boss1.png', hero: './assets/bosses/sp02_boss1.png', pos: '50% 25%' }],
  ['超限的囚徒·Ⅱ型', { en: 'Captive of Transcendentality Type II', weakness: ['spirit', 'intellect'],               tags: ['术阵仪式', '单体爆发'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a6_boss1.png', hero: './assets/bosses/v3a6_boss1.png', pos: '50% 20%' }],
  ['信仰的移位·Ⅱ型', { en: 'Distortion of Faith Type II',          weakness: ['intellect', 'beast'],                tags: ['术法输出', '增益解崩'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a5_boss1.png', hero: './assets/bosses/v3a5_boss1.png', pos: '50% 24%' }],
  ['毁灭的履带',     { en: 'Caterpillar of Destruction',           weakness: ['plant', 'star'],                     tags: ['克制群攻', '破甲暴露'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a4_boss1.png', hero: './assets/bosses/v3a4_boss1.png', pos: '50% 35%' }],
  ['急性猩红症',     { en: 'Insatiable Bloodsucker',               weakness: ['beast', 'spirit', 'intellect'],      tags: ['群体伤害', '仪式清debuff'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a3_boss1.png', hero: './assets/bosses/v3a3_boss1.png', pos: '50% 28%' }],
  ['超限的囚徒',     { en: 'Captive of Transcendentality',         weakness: ['beast', 'intellect'],                tags: ['单体追击', '3回合仪式窗'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a2_boss2.png', hero: './assets/bosses/v3a2_boss2.png', pos: '50% 20%' }],
  ['蜕化的残响',     { en: 'The Cocooned Lament',                  weakness: ['mineral', 'beast'],                  tags: ['精神创伤', '额外行动'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a2_boss1.png', hero: './assets/bosses/v3a2_boss1.png', pos: '50% 30%' }],
  ['信仰的移位',     { en: 'Distortion of Faith',                  weakness: ['spirit', 'intellect'],               tags: ['群体伤害', '主动减益'], wiki: WIKI_MAIN, thumb: './assets/bosses/v3a2_boss3.png', hero: './assets/bosses/v3a2_boss3.png', pos: '50% 24%' }]
]);

const ROMAN_NUMERALS = [
  'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ',
  'Ⅺ', 'Ⅻ', 'ⅩⅢ', 'ⅩⅣ', 'ⅩⅤ', 'ⅩⅥ', 'ⅩⅦ', 'ⅩⅧ', 'ⅩⅨ', 'ⅩⅩ'
];

export function toRoman(num) {
  const idx = Number(num) - 1;
  if (idx >= 0 && idx < ROMAN_NUMERALS.length) return ROMAN_NUMERALS[idx];
  return String(num ?? '');
}

export function resolveBossAsset(name, section = 'new') {
  const key = String(name ?? '').trim();
  if (BOSS_ASSETS.has(key)) return BOSS_ASSETS.get(key);
  return {
    en: section === 'new' ? 'Collector’s Edition Survey' : 'Witness Archive Specimen',
    weakness: [],
    tags: [],
    wiki: section === 'new' ? WIKI_41 : WIKI_MAIN,
    thumb: '',
    hero: '',
    pos: '50% 25%'
  };
}

export function resolveBossSubtitle(name, section = 'new') {
  return resolveBossAsset(name, section).en;
}

// 官方稀有度辉光遮罩（来自 UTTU / 游戏内实机卡面 bg_pz002..006.png）
export function rarityOverlaySrc(star) {
  const s = Math.min(6, Math.max(2, Number(star) || 6));
  return `./assets/uttu/bg_pz00${s}.png`;
}

// 鬃毛邮报调查积分评级（严格对齐实机 4.1 鉴藏者特版评估档位与官方评级徽章 PNG）
export function resolveManeGrade(score) {
  const n = typeof score === 'bigint' ? score : BigInt(score || 0);
  if (n >= 100000000n) return { grade: 'SSS', tier: 'mythic', tag: '破亿', img: './assets/grades/sss_prism.png' };
  if (n >= 1200000n)   return { grade: 'SSS', tier: 'sss',    tag: '',     img: './assets/grades/sss_prism.png' };
  if (n >= 800000n)    return { grade: 'SS',  tier: 'ss',     tag: '',     img: './assets/grades/ss_v4.png' };
  if (n >= 500000n)    return { grade: 'S',   tier: 's',      tag: '',     img: './assets/grades/s_v4.png' };
  if (n >= 300000n)    return { grade: 'A',   tier: 'a',      tag: '',     img: './assets/grades/a4.png' };
  if (n >= 150000n)    return { grade: 'B',   tier: 'b',      tag: '',     img: './assets/grades/b4.png' };
  if (n >= 50000n)     return { grade: 'C',   tier: 'c',      tag: '',     img: './assets/grades/c4.png' };
  return { grade: '—', tier: 'none', tag: '', img: '' };
}

// 简洁矢量灵感 SVG 徽记（嵌入实机风燕尾角标飘带）
export function afflatusSvg(type) {
  switch (type) {
    case 'beast':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17L9 6l3 5 3-5 4 11-7 3-7-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="14" r="1.6" fill="currentColor"/></svg>`;
    case 'plant':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V8m0 0C12 5 15.5 4 18 5c0 3.5-2.5 6-6 6m0-3C12 5 8.5 4 6 5c0 3.5 2.5 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    case 'star':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.1 6.4L20.5 12l-6.4 2.1L12 20.5l-2.1-6.4L3.5 12l6.4-2.1L12 3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;
    case 'mineral':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 19.5,9.5 16.5,20 7.5,20 4.5,9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 3v17M4.5 9.5h15" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.65"/></svg>`;
    case 'spirit':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4.5a7.5 7.5 0 1 0 4 13.8A6.2 6.2 0 0 1 15.5 4.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="16.5" cy="9" r="1.4" fill="currentColor"/></svg>`;
    case 'intellect':
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="12,6 17,15 7,15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>`;
    default:
      return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  }
}

// 兜底无图槽位洞悉双三角底纹
export function insightWatermarkSvg() {
  return `<svg class="slot-insight-svg" viewBox="0 0 40 34" aria-hidden="true">
    <polygon points="16,4 28,26 4,26" fill="none" stroke="currentColor" stroke-width="1.4" />
    <polygon points="24,9 35,28 13,28" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.72" />
  </svg>`;
}

export function characterMonogram(name) {
  const clean = String(name ?? '').trim();
  if (!clean) return 'IX';
  if (/^[A-Za-z0-9]{1,3}$/.test(clean)) return clean.toUpperCase();
  const ascii = clean.match(/^[A-Za-z0-9]+/);
  if (ascii && ascii[0].length <= 3) return ascii[0].toUpperCase();
  return Array.from(clean).slice(0, 2).join('');
}
