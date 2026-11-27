// 《重返未来：1999》全角色档案（139 名角色立绘索引、官方灵感、星级、双语术语、首领档案与评级阶梯）
// 立绘文件均已本地化至 ./assets/portraits/{id}.webp，确保离线与全球网络毫秒级稳定加载。

import { getLang } from './i18n.js';

export const AFFLATUS_META = {
  beast:        { label: '兽',   en: 'BEAST',        enLabel: 'Beast',          color: '#e59a8d', ribbon: '#8f3430', border: '#c45c52', icon: './assets/uttu/aff_beast.png' },
  plant:        { label: '木',   en: 'PLANT',        enLabel: 'Plant',          color: '#a9d4b0', ribbon: '#476e50', border: '#6fa07a', icon: './assets/uttu/aff_plant.png' },
  star:         { label: '星',   en: 'STAR',         enLabel: 'Star',           color: '#a3c8e6', ribbon: '#3f5f7c', border: '#6892b8', icon: './assets/uttu/aff_star.png' },
  mineral:      { label: '岩',   en: 'MINERAL',      enLabel: 'Mineral',        color: '#e4c48a', ribbon: '#7f5e35', border: '#b88f54', icon: './assets/uttu/aff_mineral.png' },
  spirit:       { label: '灵',   en: 'SPIRIT',       enLabel: 'Spirit',         color: '#cbb2e8', ribbon: '#61487c', border: '#9474b8', icon: './assets/uttu/aff_spirit.png' },
  intellect:    { label: '智',   en: 'INTELLECT',    enLabel: 'Intellect',      color: '#ebd083', ribbon: '#7b6832', border: '#bfa14b', icon: './assets/uttu/aff_intellect.png' },
  mineral_star: { label: '岩/星', en: 'MINERAL·STAR', enLabel: 'Mineral / Star', color: '#d4c8b8', ribbon: '#5d6370', border: '#9ab0c8', icon: './assets/uttu/aff_mineral_star.png' },
  unknown:      { label: '秘',   en: 'ARCANIST',     enLabel: 'Arcanist',       color: '#d8c5ae', ribbon: '#514136', border: '#8a6f59', icon: '' }
};

// 全角色主索引（涵盖 1.0 至 4.1 亚特兰蒂斯谋杀案全部 139 名神秘学家，官方英文名已按 Global / Fandom Wiki 核验）
const CHARACTER_ROSTER = new Map([
  ["槲寄生", { id: 10001, aff: "plant", star: 6, en: "Druvis III" }],
  ["红弩箭", { id: 10002, aff: "star", star: 6, en: "Lilya" }],
  ["尼克·波顿", { id: 10003, aff: "beast", star: 4, en: "Nick Bottom" }],
  ["小春雀儿", { id: 10004, aff: "plant", star: 4, en: "Eagle" }],
  ["未锈铠", { id: 10005, aff: "spirit", star: 6, en: "A Knight" }],
  ["苏芙比", { id: 10006, aff: "plant", star: 6, en: "Sotheby" }],
  ["X", { id: 10007, aff: "intellect", star: 5, en: "X" }],
  ["玛丽莲", { id: 10008, aff: "beast", star: 5, en: "Sweetheart" }],
  ["弄臣", { id: 10009, aff: "star", star: 3, en: "The Fool" }],
  ["冬", { id: 10010, aff: "plant", star: 4, en: "Зима" }],
  ["芭妮芭妮", { id: 10011, aff: "beast", star: 4, en: "Bunny Bunny" }],
  ["狼群", { id: 10012, aff: "beast", star: 4, en: "Pavia" }],
  ["婴儿蓝", { id: 10013, aff: "star", star: 5, en: "Baby Blue" }],
  ["夏利", { id: 10014, aff: "star", star: 5, en: "Charlie" }],
  ["雾行者", { id: 10015, aff: "star", star: 4, en: "Oliver Fog" }],
  ["柏林以东", { id: 10016, aff: "plant", star: 5, en: "Bkornblume" }],
  ["帕米埃", { id: 10017, aff: "beast", star: 5, en: "Dikke" }],
  ["十四行诗", { id: 10018, aff: "mineral", star: 5, en: "Sonetto" }],
  ["气球派对", { id: 10019, aff: "mineral", star: 5, en: "Balloon Party" }],
  ["星锑", { id: 10020, aff: "star", star: 6, en: "Regulus" }],
  ["红斗篷", { id: 10021, aff: "mineral", star: 4, en: "Mondlicht" }],
  ["无线电小姐", { id: 10022, aff: "spirit", star: 2, en: "Ms. Radio" }],
  ["APPLe", { id: 10023, aff: "star", star: 4, en: "APPLe" }],
  ["拉拉泉", { id: 10025, aff: "plant", star: 3, en: "La Source" }],
  ["铅玻璃", { id: 10026, aff: "mineral", star: 4, en: "Cristallo" }],
  ["百夫长", { id: 10027, aff: "beast", star: 6, en: "Centurion" }],
  ["TTT", { id: 10028, aff: "star", star: 4, en: "TTT" }],
  ["星之眼", { id: 10029, aff: "star", star: 3, en: "aliEn T" }],
  ["莉拉妮", { id: 10030, aff: "beast", star: 3, en: "Leilani" }],
  ["约翰·提托", { id: 10031, aff: "intellect", star: 3, en: "John Titor" }],
  ["讣告人", { id: 10032, aff: "mineral", star: 5, en: "Necrologist" }],
  ["五色月", { id: 10033, aff: "plant", star: 5, en: "Satsuki" }],
  ["泥鯭的士", { id: 10034, aff: "plant", star: 6, en: "An-an Lee" }],
  ["丽莎&路易斯", { id: 10035, aff: "spirit", star: 3, en: "Twins Sleep" }],
  ["玛蒂尔达", { id: 10036, aff: "star", star: 5, en: "Matilda" }],
  ["爱宠", { id: 10037, aff: "plant", star: 4, en: "Rabies" }],
  ["坦南特", { id: 10038, aff: "beast", star: 5, en: "Tennant" }],
  ["莫桑女士", { id: 10039, aff: "mineral", star: 4, en: "Ms. Moissan" }],
  ["贝蒂", { id: 10040, aff: "mineral", star: 3, en: "Bette" }],
  ["吵闹鬼", { id: 10041, aff: "spirit", star: 4, en: "Poltergeist" }],
  ["兔毛手袋", { id: 10042, aff: "beast", star: 6, en: "Medicine Pocket" }],
  ["远旅", { id: 10043, aff: "star", star: 6, en: "Voyager" }],
  ["喀嚓喀嚓", { id: 10044, aff: "spirit", star: 5, en: "Click" }],
  ["哒哒达利", { id: 10045, aff: "beast", star: 3, en: "Darley Clatter" }],
  ["温妮弗雷德", { id: 10046, aff: "mineral", star: 6, en: "Eternity" }],
  ["新巴别塔", { id: 10047, aff: "mineral", star: 6, en: "Ms. NewBabel" }],
  ["牙仙", { id: 10048, aff: "star", star: 6, en: "Tooth Fairy" }],
  ["洋葱头", { id: 10049, aff: "mineral", star: 3, en: "ONiON" }],
  ["斯普特尼克", { id: 10050, aff: "star", star: 3, en: "Sputnik" }],
  ["洁西卡", { id: 10051, aff: "plant", star: 6, en: "Jessica" }],
  ["小梅斯梅尔", { id: 10052, aff: "intellect", star: 4, en: "Mesmer Jr." }],
  ["埃里克", { id: 10053, aff: "star", star: 4, en: "Erick" }],
  ["门", { id: 10054, aff: "intellect", star: 2, en: "Door" }],
  ["金蜜儿", { id: 10055, aff: "star", star: 5, en: "Blonney" }],
  ["恐怖通", { id: 10056, aff: "mineral", star: 5, en: "Horropedia" }],
  ["梅兰妮", { id: 10057, aff: "beast", star: 6, en: "Melania" }],
  ["皮克勒斯", { id: 10058, aff: "mineral", star: 6, en: "Pickles" }],
  ["挖掘艺术", { id: 10059, aff: "plant", star: 5, en: "Diggers" }],
  ["37", { id: 10060, aff: "star", star: 6, en: "37" }],
  ["伽菈波那", { id: 10061, aff: "mineral", star: 6, en: "Kaalaa Baunaa" }],
  ["坎吉拉", { id: 10062, aff: "plant", star: 5, en: "Kanjira" }],
  ["鬃毛沙砾", { id: 10063, aff: "beast", star: 6, en: "Shamane" }],
  ["6", { id: 10064, aff: "intellect", star: 6, en: "6" }],
  ["可燃点", { id: 10065, aff: "beast", star: 6, en: "Spathodea" }],
  ["和平乌鲁", { id: 10066, aff: "mineral", star: 5, en: "Ulu" }],
  ["爱兹拉", { id: 10067, aff: "star", star: 6, en: "Ezra" }],
  ["沙丝绒", { id: 10068, aff: "beast", star: 5, en: "Desert Flannel" }],
  ["曲娘", { id: 10069, aff: "mineral", star: 6, en: "Jiu Niangzi" }],
  ["小叶尼塞", { id: 10070, aff: "star", star: 5, en: "Yenisei" }],
  ["葛天", { id: 10071, aff: "beast", star: 6, en: "Getian" }],
  ["伊索尔德", { id: 10072, aff: "spirit", star: 6, en: "Isolde" }],
  ["马库斯", { id: 10073, aff: "plant", star: 6, en: "Marcus" }],
  ["维拉", { id: 10074, aff: "plant", star: 6, en: "Vila" }],
  ["阿夫西维", { id: 10075, aff: "plant", star: 5, en: "Avgust" }],
  ["北方哨歌", { id: 10076, aff: "star", star: 6, en: "Windsong" }],
  ["塞梅尔维斯", { id: 10077, aff: "mineral", star: 6, en: "Semmelweis" }],
  ["露西", { id: 10078, aff: "intellect", star: 6, en: "Lucy" }],
  ["罗蕾莱", { id: 10079, aff: "star", star: 5, en: "Lorelei" }],
  ["卡卡尼亚", { id: 10080, aff: "plant", star: 6, en: "Kakania" }],
  ["J", { id: 10081, aff: "beast", star: 6, en: "J" }],
  ["先驱者", { id: 10082, aff: "spirit", star: 3, en: "Pioneer" }],
  ["环状水星", { id: 10083, aff: "spirit", star: 6, en: "Mercuria" }],
  ["蓝手帕", { id: 10084, aff: "spirit", star: 6, en: "Tuesday" }],
  ["数羊羔", { id: 10085, aff: "spirit", star: 5, en: "Barbara" }],
  ["阿尔古斯", { id: 10086, aff: "plant", star: 6, en: "Argus" }],
  ["天使娜娜", { id: 10087, aff: "beast", star: 6, en: "Anjo Nala" }],
  ["邓肯先生", { id: 10088, aff: "beast", star: 5, en: "Mr. Duncan" }],
  ["白朗姆", { id: 10089, aff: "intellect", star: 4, en: "White Rum" }],
  ["洛佩拉", { id: 10090, aff: "beast", star: 6, en: "Lopera" }],
  ["笃笃骨", { id: 10091, aff: "plant", star: 6, en: "Willow" }],
  ["纸信圈儿", { id: 10092, aff: "star", star: 6, en: "Flutterpage" }],
  ["宽檐帽", { id: 10093, aff: "mineral", star: 5, en: "Brimley" }],
  ["芭卡洛儿", { id: 10094, aff: "star", star: 6, en: "Barcarola" }],
  ["图图石子", { id: 10095, aff: "mineral", star: 6, en: "Fatutu" }],
  ["梁月", { id: 10096, aff: "star", star: 6, en: "Liang Yue" }],
  ["空脑袋", { id: 10097, aff: "plant", star: 5, en: "Loggerhead" }],
  ["菲林士多", { id: 10098, aff: "plant", star: 6, en: "Noire" }],
  ["虚构集", { id: 10099, aff: "mineral", star: 6, en: "Recoleta" }],
  ["阿莱夫", { id: 10100, aff: "intellect", star: 6, en: "Aleph" }],
  ["冷周六", { id: 10101, aff: "plant", star: 6, en: "Hissabeth" }],
  ["命名日", { id: 10102, aff: "mineral", star: 5, en: "Name Day" }],
  ["库珀花环", { id: 10103, aff: "star", star: 6, en: "Kiperina" }],
  ["诺谛卡", { id: 10104, aff: "spirit", star: 6, en: "Nautika" }],
  ["乌尔里希", { id: 10105, aff: "intellect", star: 6, en: "Ulrich" }],
  ["嚼嚼松果", { id: 10106, aff: "plant", star: 5, en: "Buddy Fairchild" }],
  ["莫莉德尔", { id: 10107, aff: "beast", star: 6, en: "Moldir" }],
  ["玛丽安娜", { id: 10108, aff: "mineral", star: 6, en: "Sentinel" }],
  ["卡戎", { id: 10109, aff: "spirit", star: 6, en: "Charon" }],
  ["艾吉奥·奥迪托雷", { id: 10110, aff: "star", star: 6, en: "Ezio Auditore" }],
  ["卡珊德拉", { id: 10111, aff: "mineral", star: 6, en: "Kassandra" }],
  ["阿利克西欧斯", { id: 10112, aff: "beast", star: 5, en: "Alexios" }],
  ["野树莓", { id: 10113, aff: "mineral", star: 6, en: "Rubuska" }],
  ["告死鸟", { id: 10114, aff: "intellect", star: 6, en: "Corvus" }],
  ["贝丽尔", { id: 10115, aff: "intellect", star: 6, en: "Beryl" }],
  ["灰调蓝", { id: 10116, aff: "beast", star: 6, en: "Brume" }],
  ["玛尔纱", { id: 10117, aff: "beast", star: 6, en: "Marsha" }],
  ["伊戈尔", { id: 10118, aff: "beast", star: 6, en: "Igor" }],
  ["鹭鸶剪", { id: 10119, aff: "plant", star: 6, en: "Paper Heron" }],
  ["芦草结", { id: 10120, aff: "plant", star: 4, en: "Reed" }],
  ["程和光", { id: 10121, aff: "star", star: 6, en: "Cheng Heguang" }],
  ["洛伦兹蝴蝶", { id: 10122, aff: "intellect", star: 6, en: "Lorentz Butterfly" }],
  ["《湖边的女人》", { id: 10123, aff: "plant", star: 4, en: "Lady by the Lake" }],
  ["拉莫纳", { id: 10124, aff: "plant", star: 6, en: "Ramona" }],
  ["哑谜", { id: 10125, aff: "intellect", star: 6, en: "Enigma" }],
  ["小瑞安侬", { id: 10126, aff: "beast", star: 6, en: "Rhiannon" }],
  ["珐琅眼", { id: 10127, aff: "mineral", star: 6, en: "Coppélia" }],
  ["银装小春雀儿", { id: 10128, aff: "plant", star: 5, en: "Silverwing Eagle" }],
  ["无名者", { id: 10129, aff: "mineral", star: 6, en: "Ms. Stranger" }],
  ["回声谣", { id: 10130, aff: "mineral", star: 6, en: "Everecho" }],
  ["奠基石", { id: 10131, aff: "mineral", star: 6, en: "Cornerstone" }],
  ["双生舞伶", { id: 10132, aff: "mineral_star", star: 6, en: "The Twins" }],
  ["诺拉", { id: 10133, aff: "spirit", star: 4, en: "NORA" }],
  ["赫多涅", { id: 10134, aff: "mineral", star: 6, en: "Hedone" }],
  ["纳西索斯", { id: 10135, aff: "beast", star: 6, en: "Narcissus" }],
  ["狩勋女巫红弩箭", { id: 10136, aff: "star", star: 6, en: "Huntsworn Lilya" }],
  ["格林杜尔", { id: 10137, aff: "beast", star: 4, en: "Glyndŵr" }],
  ["德雷克", { id: 10138, aff: "beast", star: 6, en: "Drake" }],
  ["佩施塔", { id: 10139, aff: "star", star: 6, en: "Perchta" }],
  ["伊芙琳", { id: 10140, aff: "beast", star: 6, en: "Evelyn" }]
]);

export const CHARACTER_LIST = [...CHARACTER_ROSTER.entries()]
  .map(([name, meta]) => ({
    name,
    ...meta,
    portrait: `./assets/portraits/${meta.id}.webp`
  }))
  .sort((a, b) => (b.star - a.star) || (b.id - a.id));

// 社区常见中英文简称 / 异体字 / 全部 196 条 Global 英文别名映射
const CHARACTER_ALIASES = new Map([
  ["joe", "J"],
  ["j", "J"],
  ["艾吉奥", "艾吉奥·奥迪托雷"],
  ["ezio", "艾吉奥·奥迪托雷"],
  ["湖边的女人", "《湖边的女人》"],
  ["湖中的女人", "《湖边的女人》"],
  ["库伯花环", "库珀花环"],
  ["银装小春雀", "银装小春雀儿"],
  ["小春雀", "小春雀儿"],
  ["狩红", "狩勋女巫红弩箭"],
  ["施佩塔", "佩施塔"],
  ["莫基石", "奠基石"],
  ["玛尔莎", "玛尔纱"],
  ["瑞安侬", "小瑞安侬"],
  ["瑞", "小瑞安侬"],
  ["洛伦兹", "洛伦兹蝴蝶"],
  ["珐郎眼", "珐琅眼"],
  ["法郎眼", "珐琅眼"],
  ["芭卡洛尔", "芭卡洛儿"],
  ["狗", "皮克勒斯"],
  ["水星", "环状水星"],
  ["娜娜", "天使娜娜"],
  ["泥鯭的士", "泥鯭的士"],
  ["泥猛的士", "泥鯭的士"],
  ["安安", "泥鯭的士"],
  ["槲寄生", "槲寄生"],
  ["新巴别塔", "新巴别塔"],
  ["巴别塔", "新巴别塔"],
  ["兔毛", "兔毛手袋"],
  ["气球", "气球派对"],
  ["哨歌", "北方哨歌"],
  ["纸信", "纸信圈儿"],
  ["圈儿", "纸信圈儿"],
  ["小鹿", "洁西卡"],
  ["百夫", "百夫长"],
  ["未锈铠", "未锈铠"],
  ["远旅", "远旅"],
  ["星锑", "星锑"],
  ["tf", "牙仙"],
  ["tooth", "牙仙"],
  ["bp", "气球派对"],
  ["balloon", "气球派对"],
  ["medpoc", "兔毛手袋"],
  ["med pocket", "兔毛手袋"],
  ["mp", "兔毛手袋"],
  ["aal", "泥鯭的士"],
  ["anan", "泥鯭的士"],
  ["an-an", "泥鯭的士"],
  ["kb", "伽菈波那"],
  ["kaalaa", "伽菈波那"],
  ["kaala", "伽菈波那"],
  ["bd", "伽菈波那"],
  ["black dwarf", "伽菈波那"],
  ["bk", "柏林以东"],
  ["bkorn", "柏林以东"],
  ["fp", "纸信圈儿"],
  ["flutter", "纸信圈儿"],
  ["f22", "图图石子"],
  ["ftt", "图图石子"],
  ["ly", "梁月"],
  ["liang", "梁月"],
  ["ws", "北方哨歌"],
  ["wind", "北方哨歌"],
  ["newbabel", "新巴别塔"],
  ["babel", "新巴别塔"],
  ["ms newbabel", "新巴别塔"],
  ["anjo", "天使娜娜"],
  ["nala", "天使娜娜"],
  ["reco", "虚构集"],
  ["kip", "库珀花环"],
  ["kiper", "库珀花环"],
  ["cass", "卡珊德拉"],
  ["kass", "卡珊德拉"],
  ["alex", "阿利克西欧斯"],
  ["druvis", "槲寄生"],
  ["d3", "槲寄生"],
  ["semmel", "塞梅尔维斯"],
  ["semm", "塞梅尔维斯"],
  ["marcus", "马库斯"],
  ["marc", "马库斯"],
  ["lilya", "红弩箭"],
  ["hlilya", "狩勋女巫红弩箭"],
  ["h-lilya", "狩勋女巫红弩箭"],
  ["sp lilya", "狩勋女巫红弩箭"],
  ["splilya", "狩勋女巫红弩箭"],
  ["huntsworn", "狩勋女巫红弩箭"],
  ["zima", "冬"],
  ["alien t", "星之眼"],
  ["alient", "星之眼"],
  ["onion", "洋葱头"],
  ["apple", "APPLe"],
  ["ezra theodore", "爱兹拉"],
  ["ezra", "爱兹拉"],
  ["theodore", "爱兹拉"],
  ["lady of the lake", "《湖边的女人》"],
  ["lbtl", "《湖边的女人》"],
  ["lake", "《湖边的女人》"],
  ["coppelia", "珐琅眼"],
  ["copp", "珐琅眼"],
  ["glyndwr", "格林杜尔"],
  ["glyn", "格林杜尔"],
  ["peishta", "佩施塔"],
  ["perch", "佩施塔"],
  ["eve", "伊芙琳"],
  ["ev", "伊芙琳"],
  ["soth", "苏芙比"],
  ["spath", "可燃点"],
  ["spatho", "可燃点"],
  ["jiu", "曲娘"],
  ["merc", "环状水星"],
  ["barc", "芭卡洛儿"],
  ["barca", "芭卡洛儿"],
  ["hissa", "冷周六"],
  ["hiss", "冷周六"],
  ["naut", "诺谛卡"],
  ["ulr", "乌尔里希"],
  ["mold", "莫莉德尔"],
  ["sent", "玛丽安娜"],
  ["marianne", "玛丽安娜"],
  ["rubu", "野树莓"],
  ["corv", "告死鸟"],
  ["ph", "鹭鸶剪"],
  ["heron", "鹭鸶剪"],
  ["cheng", "程和光"],
  ["chg", "程和光"],
  ["heguang", "程和光"],
  ["lb", "洛伦兹蝴蝶"],
  ["lorentz", "洛伦兹蝴蝶"],
  ["butterfly", "洛伦兹蝴蝶"],
  ["rhia", "小瑞安侬"],
  ["swe", "银装小春雀儿"],
  ["seagle", "银装小春雀儿"],
  ["silverwing", "银装小春雀儿"],
  ["sp eagle", "银装小春雀儿"],
  ["stranger", "无名者"],
  ["ms stranger", "无名者"],
  ["ee", "回声谣"],
  ["cs", "奠基石"],
  ["corner", "奠基石"],
  ["twins", "双生舞伶"],
  ["the twins", "双生舞伶"],
  ["nora", "诺拉"],
  ["hedo", "赫多涅"],
  ["narc", "纳西索斯"],
  ["kaka", "卡卡尼亚"],
  ["iso", "伊索尔德"],
  ["reg", "星锑"],
  ["cent", "百夫长"],
  ["mel", "梅兰妮"],
  ["necro", "讣告人"],
  ["pick", "皮克勒斯"],
  ["dog", "皮克勒斯"],
  ["puppy", "皮克勒斯"],
  ["sham", "鬃毛沙砾"],
  ["tues", "蓝手帕"],
  ["lop", "洛佩拉"],
  ["will", "笃笃骨"],
  ["voy", "远旅"],
  ["eter", "温妮弗雷德"],
  ["jess", "洁西卡"],
  ["changeling", "洁西卡"],
  ["deer", "洁西卡"],
  ["ak", "未锈铠"],
  ["knight", "未锈铠"],
  ["bf", "嚼嚼松果"],
  ["buddy", "嚼嚼松果"],
  ["fairchild", "嚼嚼松果"],
  ["df", "沙丝绒"],
  ["flannel", "沙丝绒"],
  ["yeni", "小叶尼塞"],
  ["duncan", "邓肯先生"],
  ["mr duncan", "邓肯先生"],
  ["wr", "白朗姆"],
  ["rum", "白朗姆"],
  ["nd", "命名日"],
  ["nameday", "命名日"],
  ["fool", "弄臣"],
  ["radio", "无线电小姐"],
  ["ms radio", "无线电小姐"],
  ["moissan", "莫桑女士"],
  ["ms moissan", "莫桑女士"],
  ["mesmer", "小梅斯梅尔"],
  ["mesmer jr", "小梅斯梅尔"],
  ["darley", "哒哒达利"],
  ["twins sleep", "丽莎&路易斯"],
  ["lisa & louise", "丽莎&路易斯"],
  ["lisa and louise", "丽莎&路易斯"],
  ["oliver", "雾行者"],
  ["fog", "雾行者"],
  ["nick", "尼克·波顿"],
  ["bunny", "芭妮芭妮"],
  ["baby", "婴儿蓝"],
  ["john", "约翰·提托"],
  ["titor", "约翰·提托"],
  ["la source", "拉拉泉"],
  ["lasource", "拉拉泉"],
  ["polter", "吵闹鬼"],
  ["horro", "恐怖通"],
  ["adler", "哑谜"],
  ["enigma", "哑谜"],
  ["ramona", "拉莫纳"],
  ["beryl", "贝丽尔"],
  ["brume", "灰调蓝"],
  ["marsha", "玛尔纱"],
  ["igor", "伊戈尔"],
  ["charon", "卡戎"],
  ["aleph", "阿莱夫"],
  ["noire", "菲林士多"],
  ["logger", "空脑袋"],
  ["brim", "宽檐帽"],
  ["barb", "数羊羔"],
  ["argus", "阿尔古斯"],
  ["lorelei", "罗蕾莱"],
  ["lucy", "露西"],
  ["vila", "维拉"],
  ["avgust", "阿夫西维"],
  ["getian", "葛天"],
  ["gt", "葛天"],
  ["sonetto", "十四行诗"],
  ["dikke", "帕米埃"],
  ["charlie", "夏利"],
  ["matilda", "玛蒂尔达"],
  ["tennant", "坦南特"],
  ["satsuki", "五色月"],
  ["sweetheart", "玛丽莲"],
  ["blonney", "金蜜儿"],
  ["diggers", "挖掘艺术"],
  ["kanjira", "坎吉拉"],
  ["ulu", "和平乌鲁"],
  ["pioneer", "先驱者"],
  ["reed", "芦草结"],
  ["drake", "德雷克"]
]);

// 构建大小写与全半角归一化索引 + 英文名索引 + 别名反向索引
const NORMALIZED_INDEX = new Map();
const CHAR_ID_TO_ALIASES = new Map();

for (const [cn, meta] of CHARACTER_ROSTER.entries()) {
  const entry = { name: cn, ...meta };
  NORMALIZED_INDEX.set(cn.normalize('NFKC').trim().toLowerCase(), entry);
  if (meta.en) {
    NORMALIZED_INDEX.set(meta.en.normalize('NFKC').trim().toLowerCase(), entry);
  }
  CHAR_ID_TO_ALIASES.set(meta.id, []);
}

for (const [alias, targetCn] of CHARACTER_ALIASES.entries()) {
  const normAlias = String(alias).normalize('NFKC').trim().toLowerCase();
  const hit = NORMALIZED_INDEX.get(String(targetCn).normalize('NFKC').trim().toLowerCase());
  if (!hit) continue;
  if (!NORMALIZED_INDEX.has(normAlias)) {
    NORMALIZED_INDEX.set(normAlias, hit);
  }
  const list = CHAR_ID_TO_ALIASES.get(hit.id);
  if (list && !list.includes(normAlias)) {
    list.push(normAlias);
  }
}

// 泛用 / 自由位槽位选项（中英双语规范）
export const WILDCARD_CHOICES = [
  {
    cn: '任意生存',
    en: 'Any Sustain',
    shortEn: 'Sustain',
    aliases: ['任意生存', '生存位', '治疗位', '任意治疗', 'any sustain', 'any healer', 'sustain', 'healer']
  },
  {
    cn: '任意角色',
    en: 'Any Arcanist',
    shortEn: 'Any',
    aliases: ['任意角色', '任意', '自由位', '自由', '随意', '补位', '任意补位', 'any arcanist', 'any', 'flex', 'wildcard']
  },
  {
    cn: '任意拐位',
    en: 'Any Support',
    shortEn: 'Support',
    aliases: ['任意拐位', '拐位', '有拐力', '任意辅助', '有拐力的角色', 'any support', 'support', 'buffer']
  }
];

const WILDCARD_ALIAS_MAP = new Map();
for (const wc of WILDCARD_CHOICES) {
  WILDCARD_ALIAS_MAP.set(wc.cn.toLowerCase(), wc);
  WILDCARD_ALIAS_MAP.set(wc.en.toLowerCase(), wc);
  for (const al of wc.aliases) {
    WILDCARD_ALIAS_MAP.set(al.toLowerCase(), wc);
  }
}

function isWildcardSlotText(text) {
  const s = String(text ?? '').trim();
  if (!s) return false;
  if (WILDCARD_ALIAS_MAP.has(s.toLowerCase())) return true;
  return /^(?:任意|有拐力|自由|随意|补位|拐位|生存位|治疗位|any\b|flex\b|wildcard\b)/i.test(s);
}

export function isWildcardChoice(raw) {
  return isWildcardSlotText(raw);
}

export function canonicalWildcard(raw) {
  const s = String(raw ?? '').normalize('NFKC').trim();
  if (!s) return null;
  const direct = WILDCARD_ALIAS_MAP.get(s.toLowerCase());
  if (direct) return direct.cn;
  if (/生存|治疗|奶|sustain|heal/i.test(s) && isWildcardSlotText(s)) return '任意生存';
  if (/拐|辅助|support|buff/i.test(s) && isWildcardSlotText(s)) return '任意拐位';
  if (isWildcardSlotText(s)) return '任意角色';
  return null;
}

export function displayWildcard(raw, lang = getLang()) {
  const s = String(raw ?? '').normalize('NFKC').trim();
  const canon = canonicalWildcard(s);
  if (canon) {
    const found = WILDCARD_CHOICES.find((w) => w.cn === canon);
    if (found) return lang === 'zh' ? found.cn : found.en;
  }
  if (lang === 'zh') return s || '自由位';
  if (/[\u4e00-\u9fff]/.test(s)) return 'Any Arcanist';
  return s || 'Any Arcanist';
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

// 特殊体系主C/ archetype 标签中英映射（如 Focus Flashback「即兴咒语·星 / 木」）
const SPECIAL_CARRY_LABELS = new Map([
  ['即兴咒语', { cn: '即兴咒语', en: 'Impromptu Incantation', aff: 'unknown', mono: 'IMP' }],
  ['即兴咒语·星', { cn: '即兴咒语·星', en: 'Impromptu · Star', aff: 'star', mono: 'IMP' }],
  ['即兴咒语·木', { cn: '即兴咒语·木', en: 'Impromptu · Plant', aff: 'plant', mono: 'IMP' }],
  ['即兴咒语·兽', { cn: '即兴咒语·兽', en: 'Impromptu · Beast', aff: 'beast', mono: 'IMP' }],
  ['即兴咒语·岩', { cn: '即兴咒语·岩', en: 'Impromptu · Mineral', aff: 'mineral', mono: 'IMP' }],
  ['即兴咒语·灵', { cn: '即兴咒语·灵', en: 'Impromptu · Spirit', aff: 'spirit', mono: 'IMP' }],
  ['即兴咒语·智', { cn: '即兴咒语·智', en: 'Impromptu · Intellect', aff: 'intellect', mono: 'IMP' }]
]);

function resolveSpecialCarry(rawName) {
  const clean = String(rawName ?? '').normalize('NFKC').trim();
  if (!clean) return null;
  if (SPECIAL_CARRY_LABELS.has(clean)) return SPECIAL_CARRY_LABELS.get(clean);
  const lower = clean.toLowerCase();
  for (const item of SPECIAL_CARRY_LABELS.values()) {
    if (item.en.toLowerCase() === lower) return item;
  }
  const m = lower.match(/^impromptu(?:\s*incantation)?(?:\s*[·•:\-]\s*|\s+)(star|plant|beast|mineral|spirit|intellect)$/i);
  if (m) {
    const aff = m[1].toLowerCase();
    for (const item of SPECIAL_CARRY_LABELS.values()) {
      if (item.aff === aff) return item;
    }
  }
  return null;
}

// 统一角色规范 ID 键（彻底消除「银装小春雀」vs「银装小春雀儿」等分裂项）
export function canonicalCharacterKey(rawName) {
  const char = resolveCharacter(rawName);
  if (char) return `char:${char.id}`;
  const special = resolveSpecialCarry(rawName);
  if (special) return `special:${special.cn}`;
  const wc = canonicalWildcard(rawName);
  if (wc) return `wild:${wc}`;
  return String(rawName ?? '').normalize('NFKC').trim().toLowerCase();
}

// 统一灰机 Wiki 标准角色展示名（未收录角色或原表简称保持原样）
export function canonicalDisplayName(rawName) {
  const char = resolveCharacter(rawName);
  if (char) return char.name;
  const special = resolveSpecialCarry(rawName);
  if (special) return special.cn;
  return String(rawName ?? '').trim();
}

// 双语角色展示名（EN 返回官方英文名，ZH 返回规范中文名，兼容泛用位、特殊体系标签与 / 多选位）
export function displayCharacterName(rawName, lang = getLang()) {
  const raw = String(rawName ?? '').trim();
  if (!raw) return '';
  if (isWildcardChoice(raw)) return displayWildcard(raw, lang);

  const special = resolveSpecialCarry(raw);
  if (special) return lang === 'zh' ? special.cn : special.en;

  const direct = resolveCharacter(raw);
  if (direct) return lang === 'zh' ? direct.name : (direct.en || direct.name);

  if (/[/／]/.test(raw)) {
    const parts = raw.split(/[/／]/).map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) {
      return parts.map((p) => displayCharacterName(p, lang)).join(lang === 'zh' ? '/' : ' / ');
    }
  }
  return raw;
}

export function displayCarryNames(carryStr, lang = getLang()) {
  const raw = String(carryStr ?? '').trim();
  if (!raw) return '';
  const parts = raw.split(/[/／+、,，]/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return raw;
  return parts.map((p) => displayCharacterName(p, lang)).join(' / ');
}

// 双向检索匹配：搜索中文名、官方英文名、全部 196 条英文别名或中文简称均命中同一角色
export function characterMatchesQuery(rawName, queryNorm) {
  const q = String(queryNorm ?? '').normalize('NFKC').trim().toLowerCase();
  if (!q) return true;
  const rawNorm = String(rawName ?? '').normalize('NFKC').trim().toLowerCase();
  if (rawNorm.includes(q)) return true;

  if (isWildcardChoice(rawName)) {
    const wcEn = displayWildcard(rawName, 'en').toLowerCase();
    const wcZh = displayWildcard(rawName, 'zh').toLowerCase();
    if (wcEn.includes(q) || wcZh.includes(q)) return true;
  }

  const special = resolveSpecialCarry(rawName);
  if (special) {
    if (special.cn.toLowerCase().includes(q) || special.en.toLowerCase().includes(q) || 'impromptu incantation'.includes(q)) {
      return true;
    }
  }

  const char = resolveCharacter(rawName);
  if (char) {
    if (char.name.normalize('NFKC').toLowerCase().includes(q)) return true;
    if (char.en && char.en.normalize('NFKC').toLowerCase().includes(q)) return true;
    const qChar = resolveCharacter(q);
    if (qChar && qChar.id === char.id) return true;
    const aliases = CHAR_ID_TO_ALIASES.get(char.id) || [];
    for (const al of aliases) {
      if (al === q) return true;
      if (q.length >= 2 && al.length >= 3 && al.includes(q)) return true;
    }
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

  const special = resolveSpecialCarry(raw);
  if (special) return { type: 'archetype', raw, special };

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
      const tag = hasCombo ? '多组合' : `${parts.length}选1`;
      const shortLabel = chars.length <= 2
        ? chars.map((c) => c.name.slice(0, 3)).join('/')
        : `${chars[0].name.slice(0, 3)}等${chars.length}人`;
      return { type: 'flex', raw, chars, optionCount: parts.length, hasCombo, tag, label: shortLabel };
    }
  }

  // 单个未知条目仍尝试单字简称（如极简单字）
  const singleShort = resolveShorthandToken(raw, carryHint);
  if (singleShort) return { type: 'char', raw, char: singleShort };

  return { type: 'unknown', raw };
}

// 格式化多选灵活槽位（确保英文模式零中文残留）
export function formatFlexSlot(slot, lang = getLang()) {
  const chars = Array.isArray(slot?.chars) ? slot.chars : [];
  const optionCount = Number(slot?.optionCount) || chars.length || 2;
  const hasCombo = Boolean(slot?.hasCombo || slot?.tag === '多组合');

  if (lang === 'zh') {
    const tag = hasCombo ? '多组合' : `${optionCount}选1`;
    const names = chars.map((c) => c.name);
    const label = names.length <= 2
      ? names.map((n) => n.slice(0, 3)).join('/')
      : `${names[0].slice(0, 3)}等${names.length}人`;
    const fullList = names.join(' / ');
    return {
      tag,
      label,
      fullList,
      title: `可选替换位（${tag}）：${fullList}`
    };
  }

  const tag = hasCombo ? 'COMBO' : `1 OF ${optionCount}`;
  const names = chars.map((c) => c.en || c.name);
  const clip = (s, max = 9) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);
  const label = names.length <= 2
    ? names.map((n) => clip(n, 8)).join(' / ')
    : `${clip(names[0], 9)} +${names.length - 1}`;
  const fullList = names.join(' / ');
  return {
    tag,
    label,
    fullList,
    title: `Flex (${tag}): ${fullList}`
  };
}

// 格式化自由补位槽位（确保英文模式零中文残留）
export function formatWildSlot(slot, lang = getLang()) {
  const raw = String(slot?.raw || slot?.label || '').trim();
  if (lang === 'zh') {
    const label = slot?.label || displayWildcard(raw, 'zh');
    return {
      sub: '自由位',
      label,
      title: `自由补位：${raw || label}`
    };
  }
  const label = displayWildcard(raw, 'en');
  return {
    sub: 'FLEX',
    label,
    title: `Flex Slot: ${label}`
  };
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

  const plusParts = sole.split(/[+＋]/).map((s) => s.trim()).filter(Boolean);
  const slots = [];
  let parsedOk = true;

  for (let idx = 0; idx < plusParts.length; idx++) {
    const seg = plusParts[idx];
    if (idx === 0) {
      if (/[/／]/.test(seg)) {
        const slashParts = seg.split(/[/／]/).map((s) => s.trim()).filter(Boolean);
        const mapped = slashParts.map((sp) => parseSingleSlot(sp, carryStr));
        const allValid = mapped.length >= 2 && mapped.every((m) => m && m.type !== 'unknown');
        if (allValid) {
          slots.push(...mapped);
          continue;
        }
      }
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

const WIKI_41 = 'https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1';
const WIKI_MAIN = 'https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5';
const WIKI_EN_MAIN = 'https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin';

const BOSS_ASSETS = new Map([
  ["神话的遗闻", {"cn":"神话的遗闻","en":"Eidolon of Avarice","version":"4.1","edition":"Collector's Edition","editionTagEn":"4.1 Collector's Edition","weakness":["star","plant"],"tags":["群体伤害","爆发伤害"],"tagsEn":["Mass DMG","Burst DMG"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v4a1_boss1.webp","hero":"./assets/bosses/v4a1_boss1_wide.webp","pos":"50% 22%"}],
  ["思想的表观", {"cn":"思想的表观","en":"Manifestation of Thought","version":"4.1","edition":"Collector's Edition","editionTagEn":"4.1 Collector's Edition","weakness":["intellect","beast"],"tags":["护盾","额外行动"],"tagsEn":["Shield","Extra Action"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v4a1_boss2.webp","hero":"./assets/bosses/v4a1_boss2_wide.webp","pos":"50% 24%"}],
  ["生命的饥馑", {"cn":"生命的饥馑","en":"Coveter of Eternity","version":"4.1","edition":"Collector's Edition","editionTagEn":"4.1 Collector's Edition","weakness":["mineral","spirit"],"tags":["仪式伤害","即时治疗"],"tagsEn":["Ultimate DMG","Instant Heal"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v4a1_boss3.webp","hero":"./assets/bosses/v4a1_boss3_wide.webp","pos":"50% 18%"}],
  ["生命的饥谨", {"cn":"生命的饥馑","en":"Coveter of Eternity","version":"4.1","edition":"Collector's Edition","editionTagEn":"4.1 Collector's Edition","weakness":["mineral","spirit"],"tags":["仪式伤害","即时治疗"],"tagsEn":["Ultimate DMG","Instant Heal"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v4a1_boss3.webp","hero":"./assets/bosses/v4a1_boss3_wide.webp","pos":"50% 18%"}],
  ["子弹的冬年", {"cn":"子弹的冬年","en":"The Bullet-Torn Winter","version":"4.0","edition":"Witness's Edition","editionTagEn":"v4.0 Anomaly Gallery","weakness":["star","beast"],"tags":["群体伤害","爆发伤害"],"tagsEn":["Mass DMG","Burst DMG"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v4a0_boss1.webp","hero":"./assets/bosses/v4a0_boss1.webp","pos":"50% 22%"}],
  ["急性猩红症·Ⅱ型", {"cn":"急性猩红症·Ⅱ型","en":"Insatiable Bloodsucker Type II","version":"3.9","edition":"Witness's Edition","editionTagEn":"v3.9 Anomaly Gallery","weakness":["beast","plant","star","mineral"],"tags":["自然灵感","仪式解控"],"tagsEn":["Natural Afflatus","Ultimate Cleanse"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v3a9_boss1.webp","hero":"./assets/bosses/v3a9_boss1.webp","pos":"50% 24%"}],
  ["太阳的宠臣", {"cn":"太阳的宠臣","en":"The Sun's Thrall","version":"3.8","edition":"Witness's Edition","editionTagEn":"v3.8 Anomaly Gallery","weakness":["star","mineral"],"tags":["治疗咒语","主动攻击"],"tagsEn":["Heal Incantation","Active Attack"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin","thumb":"./assets/bosses/v3a8_boss1.webp","hero":"./assets/bosses/v3a8_boss1.webp","pos":"50% 28%"}],
  ["旧日的荣耀", {"cn":"旧日的荣耀","en":"Glory Days Manifest","version":"3.7","edition":"Witness's Edition","editionTagEn":"v3.7 Anomaly Gallery","weakness":["mineral","spirit"],"tags":["多增益叠层","爆发伤害"],"tagsEn":["1-target DMG","Burst DMG"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Glory_Days_Manifest_(Enemy)","thumb":"./assets/bosses/v3a7_boss1.webp","hero":"./assets/bosses/v3a7_boss1.webp","dossier":"./assets/bosses/global_glory_days_manifest_dossier.png","pos":"50% 22%"}],
  ["自我同情者", {"cn":"自我同情者","en":"The Self-Pitying Avenger","version":"S02","edition":"Witness's Edition","editionTagEn":"S02 Anomaly Gallery","weakness":["star","mineral"],"tags":["现实创伤","及时治疗"],"tagsEn":["Mass DMG","Instant Heal"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/The_Self-Pitying_Avenger_(Enemy)","thumb":"./assets/bosses/sp02_boss1.webp","hero":"./assets/bosses/sp02_boss1.webp","dossier":"./assets/bosses/global_self_pitying_avenger_dossier.png","pos":"50% 25%"}],
  ["超限的囚徒·Ⅱ型", {"cn":"超限的囚徒·Ⅱ型","en":"Captive of Transcendentality Type II","version":"3.6","edition":"Witness's Edition","editionTagEn":"v3.6 Anomaly Gallery","weakness":["spirit","intellect"],"tags":["术阵仪式","单体爆发"],"tagsEn":["1-target DMG","Burst DMG"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Captive_of_Transcendentality_Type_II_(Enemy)","thumb":"./assets/bosses/v3a6_boss1.webp","hero":"./assets/bosses/v3a6_boss1.webp","dossier":"./assets/bosses/global_captive_t2_dossier.png","pos":"50% 20%"}],
  ["信仰的移位·Ⅱ型", {"cn":"信仰的移位·Ⅱ型","en":"Distortion of Faith Type II","version":"3.5","edition":"Witness's Edition","editionTagEn":"v3.5 Anomaly Gallery","weakness":["intellect","beast"],"tags":["术法输出","增益解崩"],"tagsEn":["Mass DMG","Debuff Incantation"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Distortion_of_Faith_Type_II_(Enemy)","thumb":"./assets/bosses/v3a5_boss1.webp","hero":"./assets/bosses/v3a5_boss1.webp","dossier":"./assets/bosses/global_distortion_of_faith_t2_dossier.png","pos":"50% 24%"}],
  ["毁灭的履带", {"cn":"毁灭的履带","en":"Caterpillar of Destruction","version":"3.4","edition":"Witness's Edition","editionTagEn":"v3.4 Anomaly Gallery","weakness":["plant","star"],"tags":["克制群攻","破甲暴露"],"tagsEn":["Mass DMG","Dispel Buff"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Caterpillar_of_Destruction_(Enemy)","thumb":"./assets/bosses/v3a4_boss1.webp","hero":"./assets/bosses/v3a4_boss1.webp","dossier":"./assets/bosses/global_caterpillar_of_destruction_dossier.png","pos":"50% 35%"}],
  ["急性猩红症", {"cn":"急性猩红症","en":"Insatiable Bloodsucker","version":"3.3","edition":"Witness's Edition","editionTagEn":"v3.3 Anomaly Gallery","weakness":["beast","spirit","intellect"],"tags":["群体伤害","仪式清debuff"],"tagsEn":["Mass DMG","Buff Incantation"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Insatiable_Bloodsucker_(Enemy)","thumb":"./assets/bosses/v3a3_boss1.webp","hero":"./assets/bosses/v3a3_boss1.webp","dossier":"./assets/bosses/global_insatiable_bloodsucker_dossier.png","pos":"50% 28%"}],
  ["超限的囚徒", {"cn":"超限的囚徒","en":"Captive of Transcendentality","version":"3.2","edition":"Witness's Edition","editionTagEn":"v3.2 Anomaly Gallery","weakness":["beast","intellect"],"tags":["单体追击","3回合仪式窗"],"tagsEn":["1-target DMG","Burst DMG"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Captive_of_Transcendentality_(Enemy)","thumb":"./assets/bosses/v3a2_boss2.webp","hero":"./assets/bosses/v3a2_boss2.webp","dossier":"./assets/bosses/global_captive_t1_dossier.png","pos":"50% 20%"}],
  ["蜕化的残响", {"cn":"蜕化的残响","en":"The Cocooned Lament","version":"3.2","edition":"Witness's Edition","editionTagEn":"v3.2 Anomaly Gallery","weakness":["mineral","beast"],"tags":["精神创伤","额外行动"],"tagsEn":["Mass DMG","Extra Action"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/The_Cocooned_Lament_(Enemy)","thumb":"./assets/bosses/v3a2_boss1.webp","hero":"./assets/bosses/v3a2_boss1.webp","dossier":"./assets/bosses/global_cocooned_lament_dossier.png","pos":"50% 30%"}],
  ["信仰的移位", {"cn":"信仰的移位","en":"Distortion of Faith","version":"3.2","edition":"Witness's Edition","editionTagEn":"v3.2 Anomaly Gallery","weakness":["spirit","intellect"],"tags":["群体伤害","主动减益"],"tagsEn":["Mass DMG","Debuff Incantation"],"wiki":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5","wikiEn":"https://reverse1999.fandom.com/wiki/Distortion_of_Faith_(Enemy)","thumb":"./assets/bosses/v3a2_boss3.webp","hero":"./assets/bosses/v3a2_boss3.webp","dossier":"./assets/bosses/global_distortion_of_faith_t1_dossier.png","pos":"50% 24%"}]
]);

const BOSS_EN_TO_CN = new Map();
for (const [cn, asset] of BOSS_ASSETS.entries()) {
  if (asset.en) {
    const low = asset.en.toLowerCase();
    if (!BOSS_EN_TO_CN.has(low)) BOSS_EN_TO_CN.set(low, asset.cn || cn);
  }
}

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
  const mappedCn = BOSS_EN_TO_CN.get(key.toLowerCase());
  if (mappedCn && BOSS_ASSETS.has(mappedCn)) return BOSS_ASSETS.get(mappedCn);
  return {
    cn: key,
    en: section === 'new' ? "Collector's Edition Survey" : 'Anomaly Gallery Specimen',
    version: '',
    edition: section === 'new' ? "Collector's Edition" : "Witness's Edition",
    editionTagEn: section === 'new' ? "Collector's Edition" : 'Anomaly Gallery',
    weakness: [],
    tags: [],
    tagsEn: [],
    wiki: section === 'new' ? WIKI_41 : WIKI_MAIN,
    wikiEn: WIKI_EN_MAIN,
    thumb: '',
    hero: '',
    pos: '50% 25%'
  };
}

export function resolveBossSubtitle(name, section = 'new') {
  return resolveBossAsset(name, section).en;
}

export function displayBossName(cnName, lang = getLang()) {
  const key = String(cnName ?? '').trim();
  const asset = resolveBossAsset(key);
  if (lang === 'zh') return asset.cn || key;
  return asset.en || key;
}

export function displayBossSubtitle(cnName, section = 'new', lang = getLang()) {
  const asset = resolveBossAsset(cnName, section);
  if (lang === 'zh') return asset.en;
  return asset.editionTagEn || (section === 'new' ? "Collector's Edition" : 'Anomaly Gallery');
}

export function displayBossTags(cnName, lang = getLang()) {
  const asset = resolveBossAsset(cnName);
  if (lang === 'zh') return Array.isArray(asset.tags) ? asset.tags : [];
  return Array.isArray(asset.tagsEn) && asset.tagsEn.length ? asset.tagsEn : [];
}

export function resolveBossWikiUrl(cnName, section = 'new', lang = getLang()) {
  const asset = resolveBossAsset(cnName, section);
  if (lang === 'zh') return asset.wiki || (section === 'new' ? WIKI_41 : WIKI_MAIN);
  return asset.wikiEn || WIKI_EN_MAIN;
}

const FLASHBACK_STAGE_ART = [
  {
    stageNo: 1,
    match: ['洞知', '额外行动', 'pursuit', 'extra action', 'charybdis', 'hippocampus', 'pt-i'],
    hero: './assets/bosses/fb_stage1.png',
    thumb: './assets/bosses/fb_stage1.png',
    pos: '50% 22%',
    wikiEn: 'https://reverse1999.fandom.com/wiki/Focused_Flashback',
    wikiZh: 'https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E',
    enemies: [
      { name: '马头鱼尾兽', en: 'Hippocampus', icon: './assets/bosses/fb_hippocampus_icon.png', art: './assets/bosses/fb_hippocampus.png' },
      { name: '卡律布狄斯', en: 'Charybdis',   icon: './assets/bosses/fb_charybdis_icon.png',   art: './assets/bosses/fb_stage1.png' }
    ]
  },
  {
    stageNo: 2,
    match: ['余辉', '斯库拉', 'lingering glow', 'afterglow', 'scylla', 'pt-ii'],
    hero: './assets/bosses/fb_stage2.png',
    thumb: './assets/bosses/fb_stage2.png',
    pos: '50% 24%',
    wikiEn: 'https://reverse1999.fandom.com/wiki/Focused_Flashback',
    wikiZh: 'https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E',
    enemies: [
      { name: '斯库拉',     en: 'Scylla',      icon: './assets/bosses/fb_scylla_icon.png',      art: './assets/bosses/fb_scylla.png' },
      { name: '野生斯库拉', en: 'Wild Scylla', icon: './assets/bosses/fb_wild_scylla_icon.png', art: './assets/bosses/fb_stage2.png' }
    ]
  },
  {
    stageNo: 3,
    match: ['术具', '金毛羊', 'conduit', 'golden', 'ram', 'eclipse', 'pt-iii'],
    hero: './assets/bosses/fb_stage3.png',
    thumb: './assets/bosses/fb_stage3.png',
    pos: '50% 20%',
    wikiEn: 'https://reverse1999.fandom.com/wiki/Focused_Flashback',
    wikiZh: 'https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E',
    enemies: [
      { name: '金毛羊', en: 'Golden-Fleeced Ram', icon: './assets/bosses/fb_golden_fleece_icon.png', art: './assets/bosses/fb_stage3.png' }
    ]
  }
];

export function resolveFlashbackStageArt(stage) {
  if (stage === null || stage === undefined) return FLASHBACK_STAGE_ART[0];
  if (typeof stage === 'number') {
    return FLASHBACK_STAGE_ART.find((s) => s.stageNo === stage) || FLASHBACK_STAGE_ART[0];
  }
  const name = typeof stage === 'string' ? stage : String(stage.name || '');
  const low = name.toLowerCase();
  const byKeyword = FLASHBACK_STAGE_ART.find((item) => item.match.some((kw) => low.includes(kw)));
  if (byKeyword) return byKeyword;
  const stageNo = typeof stage === 'object' ? Number(stage.stage_no || stage.stageNo) : Number(stage);
  return FLASHBACK_STAGE_ART.find((item) => item.stageNo === stageNo) || FLASHBACK_STAGE_ART[0];
}

export function rarityOverlaySrc(star) {
  const s = Math.min(6, Math.max(2, Number(star) || 6));
  return `./assets/uttu/bg_pz00${s}.png`;
}

export const MANE_GRADE_LADDER = [
  { minScore: 50000,     grade: 'C',   subGrade: 'C',       tier: 'c',      tagEn: '',      tagZh: '',     labelEn: 'C',                    labelZh: 'C',           imgEn: './assets/grades/global_c.png',    imgZh: './assets/grades/c4.webp' },
  { minScore: 150000,    grade: 'B',   subGrade: 'B',       tier: 'b',      tagEn: '',      tagZh: '',     labelEn: 'B',                    labelZh: 'B',           imgEn: './assets/grades/global_b.png',    imgZh: './assets/grades/b4.webp' },
  { minScore: 300000,    grade: 'A',   subGrade: 'A',       tier: 'a',      tagEn: '',      tagZh: '',     labelEn: 'A',                    labelZh: 'A',           imgEn: './assets/grades/global_a.png',    imgZh: './assets/grades/a4.webp' },
  { minScore: 500000,    grade: 'S',   subGrade: 'S',       tier: 's',      tagEn: '',      tagZh: '',     labelEn: 'S',                    labelZh: 'S',           imgEn: './assets/grades/global_s.png',    imgZh: './assets/grades/s_v4.webp' },
  { minScore: 800000,    grade: 'SS',  subGrade: 'SS',      tier: 'ss',     tagEn: '',      tagZh: '',     labelEn: 'SS',                   labelZh: 'SS',          imgEn: './assets/grades/global_ss.png',   imgZh: './assets/grades/ss_v4.webp' },
  { minScore: 1250000,   grade: 'SSS', subGrade: 'SSS I',   tier: 'sss',    tagEn: '',      tagZh: '',     labelEn: 'SSS I',                labelZh: 'SSS Ⅰ',       imgEn: './assets/grades/global_sss1.png', imgZh: './assets/grades/sss_prism.webp' },
  { minScore: 2500000,   grade: 'SSS', subGrade: 'SSS II',  tier: 'sss',    tagEn: '',      tagZh: '',     labelEn: 'SSS II',               labelZh: 'SSS Ⅱ',       imgEn: './assets/grades/global_sss2.png', imgZh: './assets/grades/sss_prism.webp' },
  { minScore: 5000000,   grade: 'SSS', subGrade: 'SSS III', tier: 'sss',    tagEn: '',      tagZh: '',     labelEn: 'SSS III',              labelZh: 'SSS Ⅲ',       imgEn: './assets/grades/global_sss3.png', imgZh: './assets/grades/sss_prism.webp' },
  { minScore: 10000000,  grade: 'SSS', subGrade: 'SSS IV',  tier: 'sss',    tagEn: '',      tagZh: '',     labelEn: 'SSS IV',               labelZh: 'SSS Ⅳ',       imgEn: './assets/grades/global_sss4.png', imgZh: './assets/grades/global_sss4.png' },
  { minScore: 100000000, grade: 'SSS', subGrade: 'SSS IV',  tier: 'mythic', tagEn: '100M+', tagZh: '破亿', labelEn: 'SSS IV · 100M+ Mythic', labelZh: 'SSS Ⅳ · 破亿', imgEn: './assets/grades/global_sss4.png', imgZh: './assets/grades/sss_prism.webp' }
];

export function resolveManeGrade(score, lang = getLang()) {
  const n = typeof score === 'bigint' ? score : BigInt(Math.max(0, Math.trunc(Number(String(score || 0).replace(/,/g, '')) || 0)));
  const useEn = lang !== 'zh';
  for (let i = MANE_GRADE_LADDER.length - 1; i >= 0; i--) {
    const step = MANE_GRADE_LADDER[i];
    if (n >= BigInt(step.minScore)) {
      return {
        grade: step.grade,
        subGrade: step.subGrade,
        tier: step.tier,
        tag: useEn ? step.tagEn : step.tagZh,
        img: useEn ? step.imgEn : step.imgZh
      };
    }
  }
  return { grade: '—', subGrade: '—', tier: 'none', tag: '', img: '' };
}

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

export function insightWatermarkSvg() {
  return `<svg class="slot-insight-svg" viewBox="0 0 40 34" aria-hidden="true">
    <polygon points="16,4 28,26 4,26" fill="none" stroke="currentColor" stroke-width="1.4" />
    <polygon points="24,9 35,28 13,28" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.72" />
  </svg>`;
}

export function characterMonogram(name) {
  const clean = String(name ?? '').trim();
  if (!clean) return 'IX';
  if (/^(?:impromptu|即兴咒语)/i.test(clean)) return 'IMP';
  if (/^[A-Za-z0-9]{1,3}$/.test(clean)) return clean.toUpperCase();
  const ascii = clean.match(/^[A-Za-z0-9]+/);
  if (ascii && ascii[0].length <= 3) return ascii[0].toUpperCase();
  return Array.from(clean).slice(0, 2).join('');
}

// 角色定位与核心体系双语标签（对应官方 Global / CN 术语）
export const ARC_ROLE_LABELS = {
  'dps':            { en: 'DPS',                   zh: '主C输出' },
  'sub-dps':        { en: 'Sub-DPS',               zh: '副C输出' },
  'support':        { en: 'Support',               zh: '辅助增伤' },
  'sustain':        { en: 'Sustain',               zh: '生存保障' },
  'shield':         { en: 'Shield',                zh: '护盾' },
  'heal':           { en: 'Heal',                  zh: '治疗' },
  'extra-action':   { en: 'Extra Action',          zh: '额外行动' },
  'pursuit':        { en: 'Pursuit',               zh: '洞知追击' },
  'ultimate':       { en: 'Ultimate',              zh: '至终仪式' },
  'impromptu':      { en: 'Impromptu Incantation', zh: '即兴咒语' },
  'burn':           { en: 'Burn',                  zh: '燃烧' },
  'poison':         { en: 'Poison',                zh: '中毒' },
  'bloodtithe':     { en: 'Bloodtithe',            zh: '薪血' },
  'dynamo':         { en: 'Dynamo',                zh: '电能' },
  'lingering-glow': { en: 'Lingering Glow',        zh: '余辉' },
  'conduit':        { en: 'Conduit',               zh: '术具' },
  'rank-up':        { en: 'Rank Up',               zh: '升阶' },
  'debuff':         { en: 'Debuff',                zh: '减益削弱' },
  'control':        { en: 'Control',               zh: '控制' },
  'counter':        { en: 'Counter / Riposte',     zh: '反制 / 反击' }
};

// 全 139 名角色深度元数据（创伤类型、定位/体系、狂想状态截至 v4.1、实装版本；数据核验自 Fandom Wiki Module:CharacterData/Data1 + Module:CharacterData/Euphoria + Archetype）
export const CHARACTER_METADATA = {
  // 1.0 开服实装
  "槲寄生":         { dmg: "mental",  roles: ["dps", "control", "support", "rank-up"],          euphoria: true,  version: "1.0" },
  "红弩箭":         { dmg: "reality", roles: ["dps", "extra-action", "ultimate"],               euphoria: true,  version: "1.0" },
  "尼克·波顿":      { dmg: "mental",  roles: ["support", "sustain"],                            euphoria: false, version: "1.0" },
  "小春雀儿":       { dmg: "reality", roles: ["dps", "debuff"],                                 euphoria: false, version: "1.0" },
  "未锈铠":         { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: true,  version: "1.0" },
  "苏芙比":         { dmg: "reality", roles: ["heal", "sustain", "poison"],                     euphoria: true,  version: "1.0" },
  "X":              { dmg: "reality", roles: ["sub-dps", "control", "debuff"],                  euphoria: false, version: "1.0" },
  "玛丽莲":         { dmg: "reality", roles: ["dps", "control"],                                euphoria: false, version: "1.0" },
  "弄臣":           { dmg: "mental",  roles: ["sustain", "counter"],                            euphoria: false, version: "1.0" },
  "冬":             { dmg: "mental",  roles: ["support", "control"],                            euphoria: false, version: "1.0" },
  "芭妮芭妮":       { dmg: "reality", roles: ["heal", "sustain"],                               euphoria: false, version: "1.0" },
  "狼群":           { dmg: "mental",  roles: ["dps", "sustain"],                                euphoria: false, version: "1.0" },
  "婴儿蓝":         { dmg: "mental",  roles: ["debuff", "control"],                             euphoria: false, version: "1.0" },
  "夏利":           { dmg: "mental",  roles: ["dps", "sub-dps"],                                euphoria: false, version: "1.0" },
  "雾行者":         { dmg: "reality", roles: ["support", "sustain"],                            euphoria: false, version: "1.0" },
  "柏林以东":       { dmg: "reality", roles: ["debuff", "sub-dps", "control", "ultimate"],      euphoria: true,  version: "1.0" },
  "帕米埃":         { dmg: "mental",  roles: ["sub-dps", "heal"],                               euphoria: false, version: "1.0" },
  "十四行诗":       { dmg: "reality", roles: ["support", "control", "sub-dps"],                 euphoria: false, version: "1.0" },
  "气球派对":       { dmg: "reality", roles: ["heal", "sustain", "counter"],                    euphoria: false, version: "1.0" },
  "星锑":           { dmg: "mental",  roles: ["sub-dps", "support", "impromptu", "conduit"],    euphoria: true,  version: "1.0" },
  "红斗篷":         { dmg: "reality", roles: ["dps"],                                           euphoria: false, version: "1.0" },
  "无线电小姐":     { dmg: "mental",  roles: ["control", "debuff"],                             euphoria: false, version: "1.0" },
  "APPLe":          { dmg: "mental",  roles: ["sub-dps", "heal"],                               euphoria: false, version: "1.0" },
  "拉拉泉":         { dmg: "mental",  roles: ["heal", "sustain"],                               euphoria: false, version: "1.0" },
  "铅玻璃":         { dmg: "reality", roles: ["support", "sustain"],                            euphoria: false, version: "1.0" },
  "百夫长":         { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: true,  version: "1.0" },
  "TTT":            { dmg: "mental",  roles: ["sub-dps", "debuff"],                             euphoria: false, version: "1.0" },
  "星之眼":         { dmg: "reality", roles: ["sub-dps", "control", "counter"],                 euphoria: false, version: "1.0" },
  "莉拉妮":         { dmg: "reality", roles: ["support", "sub-dps"],                            euphoria: false, version: "1.0" },
  "约翰·提托":      { dmg: "reality", roles: ["shield", "support"],                             euphoria: false, version: "1.0" },
  "讣告人":         { dmg: "mental",  roles: ["support", "sustain"],                            euphoria: false, version: "1.0" },
  "五色月":         { dmg: "mental",  roles: ["sub-dps", "control"],                            euphoria: false, version: "1.0" },
  "泥鯭的士":       { dmg: "reality", roles: ["support", "rank-up", "impromptu", "control"],    euphoria: true,  version: "1.0" },
  "丽莎&路易斯":    { dmg: "mental",  roles: ["support", "control"],                            euphoria: false, version: "1.0" },
  "玛蒂尔达":       { dmg: "mental",  roles: ["sub-dps", "impromptu", "lingering-glow"],        euphoria: true,  version: "1.0" },
  "爱宠":           { dmg: "reality", roles: ["sub-dps", "poison"],                             euphoria: false, version: "1.0" },
  "坦南特":         { dmg: "reality", roles: ["shield", "sustain", "debuff"],                   euphoria: true,  version: "1.0" },
  "莫桑女士":       { dmg: "reality", roles: ["shield", "control"],                             euphoria: false, version: "1.0" },
  "贝蒂":           { dmg: "reality", roles: ["shield", "support"],                             euphoria: false, version: "1.0" },
  "吵闹鬼":         { dmg: "mental",  roles: ["sustain", "support"],                            euphoria: false, version: "1.0" },
  "兔毛手袋":       { dmg: "mental",  roles: ["heal", "sustain", "debuff", "control"],          euphoria: true,  version: "1.0" },
  "远旅":           { dmg: "mental",  roles: ["sub-dps", "control", "counter", "impromptu"],    euphoria: true,  version: "1.0" },
  "喀嚓喀嚓":       { dmg: "mental",  roles: ["sub-dps", "debuff"],                             euphoria: false, version: "1.0" },
  "哒哒达利":       { dmg: "mental",  roles: ["support"],                                       euphoria: false, version: "1.0" },
  "温妮弗雷德":     { dmg: "reality", roles: ["dps", "bloodtithe", "ultimate"],                 euphoria: true,  version: "1.0" },
  "新巴别塔":       { dmg: "reality", roles: ["shield", "sustain", "counter"],                  euphoria: true,  version: "1.0" },
  "洋葱头":         { dmg: "reality", roles: ["sub-dps"],                                       euphoria: false, version: "1.0" },
  "斯普特尼克":     { dmg: "mental",  roles: ["sustain", "counter", "control"],                 euphoria: false, version: "1.0" },
  "小梅斯梅尔":     { dmg: "mental",  roles: ["sub-dps", "control"],                            euphoria: false, version: "1.0" },
  "埃里克":         { dmg: "reality", roles: ["sub-dps", "debuff"],                             euphoria: false, version: "1.0" },
  "门":             { dmg: "reality", roles: ["support", "shield"],                             euphoria: false, version: "1.0" },

  // 1.1 – 1.9
  "梅兰妮":         { dmg: "mental",  roles: ["dps", "ultimate"],                               euphoria: true,  version: "1.1" },
  "皮克勒斯":       { dmg: "mental",  roles: ["support", "sub-dps", "extra-action"],            euphoria: true,  version: "1.1" },
  "挖掘艺术":       { dmg: "mental",  roles: ["control", "shield", "debuff"],                   euphoria: false, version: "1.1" },
  "牙仙":           { dmg: "mental",  roles: ["heal", "sustain", "debuff", "impromptu"],        euphoria: true,  version: "1.2" },
  "洁西卡":         { dmg: "reality", roles: ["dps", "poison"],                                 euphoria: true,  version: "1.2" },
  "金蜜儿":         { dmg: "reality", roles: ["dps"],                                           euphoria: false, version: "1.2" },
  "恐怖通":         { dmg: "mental",  roles: ["sub-dps", "debuff"],                             euphoria: false, version: "1.2" },
  "伽菈波那":       { dmg: "mental",  roles: ["dps", "extra-action"],                           euphoria: true,  version: "1.3" },
  "坎吉拉":         { dmg: "mental",  roles: ["sub-dps", "poison", "debuff"],                   euphoria: false, version: "1.3" },
  "鬃毛沙砾":       { dmg: "reality", roles: ["support", "debuff", "ultimate"],                 euphoria: true,  version: "1.3" },
  "37":             { dmg: "mental",  roles: ["sub-dps", "extra-action", "pursuit"],            euphoria: true,  version: "1.4" },
  "6":              { dmg: "mental",  roles: ["support", "debuff", "sustain"],                  euphoria: true,  version: "1.4" },
  "可燃点":         { dmg: "reality", roles: ["dps", "burn", "lingering-glow"],                 euphoria: true,  version: "1.5" },
  "和平乌鲁":       { dmg: "mental",  roles: ["support", "burn"],                               euphoria: false, version: "1.5" },
  "爱兹拉":         { dmg: "mental",  roles: ["shield", "sustain", "bloodtithe", "dynamo"],     euphoria: true,  version: "1.5" },
  "沙丝绒":         { dmg: "reality", roles: ["support", "sub-dps", "counter"],                 euphoria: false, version: "1.5" },
  "曲娘":           { dmg: "reality", roles: ["dps", "extra-action"],                           euphoria: true,  version: "1.6" },
  "小叶尼塞":       { dmg: "mental",  roles: ["heal", "shield", "sustain"],                     euphoria: false, version: "1.6" },
  "葛天":           { dmg: "reality", roles: ["support", "debuff", "ultimate"],                 euphoria: true,  version: "1.6" },
  "伊索尔德":       { dmg: "reality", roles: ["support", "sub-dps", "burn", "lingering-glow"],  euphoria: true,  version: "1.7" },
  "马库斯":         { dmg: "mental",  roles: ["dps", "rank-up"],                                euphoria: true,  version: "1.7" },
  "维拉":           { dmg: "mental",  roles: ["heal", "support", "sustain", "rank-up"],         euphoria: true,  version: "1.8" },
  "阿夫西维":       { dmg: "mental",  roles: ["support", "heal"],                               euphoria: false, version: "1.8" },
  "北方哨歌":       { dmg: "mental",  roles: ["dps", "extra-action"],                           euphoria: true,  version: "1.8" },
  "塞梅尔维斯":     { dmg: "reality", roles: ["support", "sub-dps", "bloodtithe"],              euphoria: true,  version: "1.9" },
  "露西":           { dmg: "reality", roles: ["dps", "extra-action", "dynamo"],                 euphoria: true,  version: "1.9" },
  "罗蕾莱":         { dmg: "mental",  roles: ["support", "sub-dps"],                            euphoria: false, version: "1.9" },
  "卡卡尼亚":       { dmg: "mental",  roles: ["sustain", "support", "sub-dps"],                 euphoria: false, version: "1.9" },

  // 2.0 – 2.8
  "J":              { dmg: "reality", roles: ["shield", "counter", "burn", "sustain"],          euphoria: true,  version: "2.0" },
  "先驱者":         { dmg: "mental",  roles: ["shield", "support"],                             euphoria: false, version: "2.0" },
  "环状水星":       { dmg: "mental",  roles: ["support", "rank-up"],                            euphoria: true,  version: "2.0" },
  "蓝手帕":         { dmg: "mental",  roles: ["support", "debuff", "poison"],                   euphoria: true,  version: "2.1" },
  "数羊羔":         { dmg: "mental",  roles: ["shield", "heal", "sustain"],                     euphoria: false, version: "2.1" },
  "阿尔古斯":       { dmg: "reality", roles: ["sub-dps", "debuff", "rank-up"],                  euphoria: true,  version: "2.1" },
  "天使娜娜":       { dmg: "mental",  roles: ["dps", "extra-action", "ultimate", "control"],    euphoria: true,  version: "2.2" },
  "邓肯先生":       { dmg: "reality", roles: ["sub-dps", "counter"],                            euphoria: false, version: "2.2" },
  "白朗姆":         { dmg: "reality", roles: ["control", "support"],                            euphoria: false, version: "2.2" },
  "洛佩拉":         { dmg: "reality", roles: ["support", "burn", "extra-action", "heal"],       euphoria: true,  version: "2.2" },
  "笃笃骨":         { dmg: "mental",  roles: ["dps", "poison"],                                 euphoria: true,  version: "2.3" },
  "纸信圈儿":       { dmg: "reality", roles: ["support", "sub-dps", "extra-action"],            euphoria: false, version: "2.3" },
  "宽檐帽":         { dmg: "mental",  roles: ["support", "extra-action"],                       euphoria: false, version: "2.3" },
  "芭卡洛儿":       { dmg: "mental",  roles: ["dps", "impromptu", "support"],                   euphoria: false, version: "2.4" },
  "图图石子":       { dmg: "mental",  roles: ["heal", "sustain", "extra-action", "support"],    euphoria: false, version: "2.4" },
  "梁月":           { dmg: "reality", roles: ["dps", "extra-action"],                           euphoria: true,  version: "2.5" },
  "空脑袋":         { dmg: "mental",  roles: ["heal", "sustain", "support"],                    euphoria: false, version: "2.5" },
  "菲林士多":       { dmg: "mental",  roles: ["dps", "ultimate", "extra-action"],               euphoria: true,  version: "2.5" },
  "虚构集":         { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: true,  version: "2.6" },
  "阿莱夫":         { dmg: "mental",  roles: ["support", "impromptu", "sub-dps"],               euphoria: false, version: "2.6" },
  "冷周六":         { dmg: "mental",  roles: ["dps", "ultimate", "control"],                    euphoria: true,  version: "2.7" },
  "命名日":         { dmg: "mental",  roles: ["support", "sub-dps", "ultimate"],                euphoria: false, version: "2.7" },
  "库珀花环":       { dmg: "mental",  roles: ["shield", "sustain", "support", "impromptu"],     euphoria: false, version: "2.7" },
  "诺谛卡":         { dmg: "reality", roles: ["dps", "bloodtithe"],                             euphoria: true,  version: "2.8" },
  "乌尔里希":       { dmg: "reality", roles: ["support", "sub-dps", "dynamo", "extra-action"],  euphoria: true,  version: "2.8" },
  "嚼嚼松果":       { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: false, version: "2.8" },
  "莫莉德尔":       { dmg: "reality", roles: ["support", "ultimate", "counter"],                euphoria: true,  version: "2.8" },

  // 3.0 – 3.9 & S01/S02 联动
  "玛丽安娜":       { dmg: "reality", roles: ["sub-dps", "support", "bloodtithe"],              euphoria: false, version: "3.0" },
  "卡戎":           { dmg: "mental",  roles: ["support", "dynamo", "extra-action"],             euphoria: false, version: "3.0" },
  "艾吉奥·奥迪托雷": { dmg: "reality", roles: ["dps", "extra-action", "poison", "counter"],     euphoria: false, version: "S01" },
  "卡珊德拉":       { dmg: "reality", roles: ["sub-dps", "support", "extra-action", "ultimate"], euphoria: false, version: "S01" },
  "阿利克西欧斯":   { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: false, version: "S01" },
  "野树莓":         { dmg: "reality", roles: ["heal", "sustain", "support", "bloodtithe"],      euphoria: false, version: "3.1" },
  "告死鸟":         { dmg: "mental",  roles: ["dps", "dynamo", "extra-action"],                 euphoria: false, version: "3.1" },
  "贝丽尔":         { dmg: "mental",  roles: ["dps", "lingering-glow", "extra-action", "rank-up"], euphoria: false, version: "3.2" },
  "灰调蓝":         { dmg: "mental",  roles: ["dps", "dynamo", "extra-action"],                 euphoria: false, version: "3.2" },
  "玛尔纱":         { dmg: "reality", roles: ["shield", "sustain", "support", "lingering-glow"], euphoria: false, version: "3.3" },
  "伊戈尔":         { dmg: "reality", roles: ["dps", "ultimate", "extra-action"],               euphoria: false, version: "3.3" },
  "鹭鸶剪":         { dmg: "reality", roles: ["dps", "impromptu"],                              euphoria: false, version: "3.4" },
  "芦草结":         { dmg: "mental",  roles: ["support"],                                       euphoria: false, version: "3.4" },
  "程和光":         { dmg: "reality", roles: ["sub-dps", "support", "extra-action"],            euphoria: false, version: "3.4" },
  "洛伦兹蝴蝶":     { dmg: "mental",  roles: ["support", "sub-dps", "lingering-glow"],          euphoria: false, version: "3.5" },
  "《湖边的女人》": { dmg: "mental",  roles: ["sub-dps", "support"],                            euphoria: false, version: "3.5" },
  "拉莫纳":         { dmg: "mental",  roles: ["dps", "poison"],                                 euphoria: false, version: "3.5" },
  "哑谜":           { dmg: "reality", roles: ["shield", "sustain", "support", "dynamo"],        euphoria: false, version: "3.6" },
  "小瑞安侬":       { dmg: "mental",  roles: ["support", "sustain"],                            euphoria: false, version: "3.7" },
  "珐琅眼":         { dmg: "reality", roles: ["dps", "conduit", "support"],                     euphoria: false, version: "3.7" },
  "银装小春雀儿":   { dmg: "reality", roles: ["sub-dps", "support", "ultimate", "extra-action"], euphoria: false, version: "3.7" },
  "无名者":         { dmg: "mental",  roles: ["dps", "ultimate"],                               euphoria: false, version: "3.7" },
  "回声谣":         { dmg: "reality", roles: ["heal", "sustain", "support", "conduit"],         euphoria: false, version: "3.8" },
  "奠基石":         { dmg: "reality", roles: ["dps", "counter", "shield"],                      euphoria: false, version: "3.8" },
  "双生舞伶":       { dmg: "reality", roles: ["dps", "conduit"],                                euphoria: false, version: "S02" },
  "诺拉":           { dmg: "reality", roles: ["support", "sub-dps"],                            euphoria: false, version: "S02" },
  "赫多涅":         { dmg: "reality", roles: ["support", "sub-dps", "conduit"],                 euphoria: false, version: "3.9" },
  "纳西索斯":       { dmg: "mental",  roles: ["heal", "sustain", "support", "ultimate"],        euphoria: false, version: "3.9" },

  // 4.0 – 4.1
  "狩勋女巫红弩箭": { dmg: "reality", roles: ["dps", "pursuit", "extra-action"],                euphoria: false, version: "4.0" },
  "格林杜尔":       { dmg: "reality", roles: ["sub-dps", "support", "extra-action"],            euphoria: false, version: "4.0" },
  "德雷克":         { dmg: "mental",  roles: ["sub-dps", "support", "lingering-glow"],          euphoria: false, version: "4.0" },
  "佩施塔":         { dmg: "reality", roles: ["heal", "sustain", "support", "pursuit"],         euphoria: false, version: "4.1" },
  "伊芙琳":         { dmg: "reality", roles: ["dps", "ultimate"],                               euphoria: false, version: "4.1" }
};

function formatDmgLabel(dmg, lang) {
  if (dmg === 'mental') return lang === 'zh' ? '精神创伤' : 'Mental DMG';
  return lang === 'zh' ? '现实创伤' : 'Reality DMG';
}

function formatRoleLabels(roles, lang) {
  return (roles || []).map((key) => {
    const label = ARC_ROLE_LABELS[key];
    if (!label) return key;
    return lang === 'zh' ? label.zh : label.en;
  });
}

// 获取角色完整档案详情（含双语名、创伤类型、定位标签、狂想状态、版本与 Wiki / UTTU 外链）
export function getArcanistDetail(rawName, lang = getLang()) {
  const uttuUrl = 'https://uttu.merui.net/profiles';
  const char = resolveCharacter(rawName);
  if (char) {
    const meta = CHARACTER_METADATA[char.name] || { dmg: 'reality', roles: ['dps'], euphoria: false, version: '' };
    const displayName = lang === 'zh' ? char.name : (char.en || char.name);
    const wikiUrl = lang === 'zh'
      ? `https://res1999.huijiwiki.com/wiki/${encodeURIComponent(char.name)}`
      : `https://reverse1999.fandom.com/wiki/${encodeURIComponent(String(char.en || char.name).replace(/ /g, '_'))}`;
    return {
      ...char,
      cn: char.name,
      en: char.en,
      displayName,
      dmg: meta.dmg,
      dmgLabel: formatDmgLabel(meta.dmg, lang),
      roles: [...meta.roles],
      roleLabels: formatRoleLabels(meta.roles, lang),
      euphoria: Boolean(meta.euphoria),
      version: meta.version,
      wikiUrl,
      uttuUrl
    };
  }

  const special = resolveSpecialCarry(rawName);
  if (special) {
    const roles = ['impromptu', 'dps'];
    const displayName = lang === 'zh' ? special.cn : special.en;
    const wikiUrl = lang === 'zh'
      ? 'https://res1999.huijiwiki.com/wiki/%E5%8D%B3%E5%85%B4%E5%92%92%E8%AF%AD'
      : 'https://reverse1999.fandom.com/wiki/Impromptu_Incantation';
    return {
      id: null,
      name: special.cn,
      cn: special.cn,
      en: special.en,
      aff: special.aff || 'unknown',
      star: 6,
      portrait: '',
      displayName,
      dmg: 'mental',
      dmgLabel: formatDmgLabel('mental', lang),
      roles,
      roleLabels: formatRoleLabels(roles, lang),
      euphoria: false,
      version: '2.4',
      wikiUrl,
      uttuUrl
    };
  }

  return null;
}

// 体系识别优先级：专属机制体系优先于泛用角色定位
const SPECIFIC_ARCHETYPE_PRIORITY = [
  'impromptu',
  'bloodtithe',
  'dynamo',
  'lingering-glow',
  'conduit',
  'pursuit',
  'poison',
  'burn',
  'rank-up',
  'extra-action',
  'ultimate',
  'counter',
  'shield'
];

const SPECIFIC_ARCHETYPE_BOOST = new Map([
  ['impromptu', 1.35],
  ['bloodtithe', 1.35],
  ['dynamo', 1.35],
  ['lingering-glow', 1.35],
  ['conduit', 1.35],
  ['pursuit', 1.35],
  ['poison', 1.3],
  ['burn', 1.25],
  ['rank-up', 1.25],
  ['extra-action', 1.0],
  ['ultimate', 1.0],
  ['counter', 1.05],
  ['shield', 0.85]
]);

// 根据队伍槽位与主C标识自动识别主导体系（至多 2 个）及全队灵感分布
export function detectTeamArchetypes(team, carryStr = '', lang = getLang()) {
  const slots = parseLineupSlots(team, carryStr);
  const scores = new Map();
  const affCounts = new Map();

  const addScore = (roleKey, weight) => {
    const mult = SPECIFIC_ARCHETYPE_BOOST.get(roleKey);
    if (!mult) return;
    scores.set(roleKey, (scores.get(roleKey) || 0) + weight * mult);
  };

  const addChar = (char, weight, countAff) => {
    if (!char) return;
    const meta = CHARACTER_METADATA[char.name];
    if (meta?.roles) {
      for (const r of meta.roles) addScore(r, weight);
    }
    if (countAff && char.aff && char.aff !== 'unknown') {
      affCounts.set(char.aff, (affCounts.get(char.aff) || 0) + 1);
    }
  };

  const countedCharIds = new Set();

  for (const slot of slots) {
    if (slot.type === 'char' && slot.char) {
      countedCharIds.add(slot.char.id);
      addChar(slot.char, 1.5, true);
    } else if (slot.type === 'archetype' && slot.special) {
      addScore('impromptu', 3.5);
      if (slot.special.aff && slot.special.aff !== 'unknown') {
        affCounts.set(slot.special.aff, (affCounts.get(slot.special.aff) || 0) + 1);
      }
    } else if (slot.type === 'flex' && Array.isArray(slot.chars) && slot.chars.length) {
      const share = 0.9 / slot.chars.length;
      for (const c of slot.chars) {
        addChar(c, share, false);
      }
      const uniqueAffs = new Set(slot.chars.map((c) => c.aff).filter((a) => a && a !== 'unknown'));
      if (uniqueAffs.size === 1) {
        const onlyAff = [...uniqueAffs][0];
        affCounts.set(onlyAff, (affCounts.get(onlyAff) || 0) + 1);
      }
    }
  }

  // 解析 carryStr 给予主C额外体系权重
  const carryRaw = String(carryStr ?? '').trim();
  if (carryRaw) {
    const parts = carryRaw.split(/[/／+、,，]/).map((s) => s.trim()).filter(Boolean);
    for (const part of parts) {
      const special = resolveSpecialCarry(part);
      if (special) {
        addScore('impromptu', 3.5);
        if (affCounts.size === 0 && special.aff && special.aff !== 'unknown') {
          affCounts.set(special.aff, (affCounts.get(special.aff) || 0) + 1);
        }
        continue;
      }
      const c = resolveCharacter(part);
      if (c) {
        addChar(c, 1.8, !countedCharIds.has(c.id) && affCounts.size === 0);
      }
    }
  }

  const ranked = [...scores.entries()]
    .filter(([, sc]) => sc >= 1.2)
    .sort((a, b) => {
      if (Math.abs(b[1] - a[1]) > 0.05) return b[1] - a[1];
      return SPECIFIC_ARCHETYPE_PRIORITY.indexOf(a[0]) - SPECIFIC_ARCHETYPE_PRIORITY.indexOf(b[0]);
    });

  // 避免「追击/洞知」与泛用「额外行动」过度重复或单护盾噪声，保留最具代表性的前 2 个体系
  const pickedKeys = [];
  for (const [key, sc] of ranked) {
    if (pickedKeys.length >= 2) break;
    if (pickedKeys.length === 1 && sc < ranked[0][1] * 0.45) break;
    if (key === 'shield' && pickedKeys.length >= 1 && !pickedKeys.includes('counter')) continue;
    pickedKeys.push(key);
  }

  const archetypes = pickedKeys.map((key) => {
    const lbl = ARC_ROLE_LABELS[key];
    return {
      key,
      label: lbl ? (lang === 'zh' ? lbl.zh : lbl.en) : key
    };
  });

  const afflatusCounts = [...affCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([aff, count]) => {
      const meta = AFFLATUS_META[aff] || AFFLATUS_META.unknown;
      return {
        aff,
        label: lang === 'zh' ? meta.label : meta.enLabel,
        count
      };
    });

  return { archetypes, afflatusCounts };
}
