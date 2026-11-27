(()=>{var mn="r1999-lang",$a=null;function Xe(e){let t=String(e??"").trim().toLowerCase();return t?t==="zh"||t.startsWith("zh-")||t==="cn"||t==="zh_cn"?"zh":t==="en"||t.startsWith("en-")?"en":null:null}function fn(e){if(!(typeof document>"u"))try{document.documentElement&&(document.documentElement.lang=e==="zh"?"zh-CN":"en"),document.body&&(document.body.dataset.lang=e)}catch{}}function nr(){if(typeof location>"u")return null;try{let e=new URLSearchParams(location.search||""),t=Xe(e.get("lang"));if(t)return t}catch{}return null}function ir(){if(typeof window>"u")return null;try{return Xe(window.localStorage?.getItem(mn))}catch{return null}}function rr(){if(typeof navigator>"u")return null;let e=Array.isArray(navigator.languages)&&navigator.languages.length?navigator.languages:[navigator.language];for(let t of e){let a=Xe(t);if(a)return a}return null}function un(e){return String(e??"").trim().toLowerCase()==="auto"?rr()||"zh":Xe(e)}function cs(){let e=nr(),t=ir(),a=typeof document<"u"?un(document.documentElement?.dataset?.defaultLang):null,n=un(globalThis.LEADERBOARD_CONFIG?.defaultLang),o=e||t||a||n||"zh";return $a=o,fn(o),o}function E(){return $a||cs()}function bn(e){let t=Xe(e)||"zh";if($a=t,typeof window<"u")try{window.localStorage?.setItem(mn,t)}catch{}return fn(t),t}function N(e=E()){return(Xe(e)||E())==="en"}var os={en:{brandTitleMane:"Mane's Bulletin · Global Archive",brandTitleFb:"Focused Flashback · Speedrun Archive",brandSub:"REVERSE: 1999 · COMMUNITY LEADERBOARD",statusSyncing:"Syncing Archive…",emptyTitleLoading:"Syncing live leaderboard…",offlineSyncFail:"Unable to reach live archive. Check network or retry.",btnSyncLive:"Sync Live",langToggleAria:"Switch language between English and Chinese"},zh:{brandTitleMane:"鬃毛邮报 · 调查总榜",brandTitleFb:"焦点闪回 · 纪录档案",brandSub:"REVERSE: 1999 · COMMUNITY ARCHIVE",statusSyncing:"同步档案库…",emptyTitleLoading:"正在同步最新榜单数据…",offlineSyncFail:"实时数据库暂时无法连接，请检查网络或点击同步。",btnSyncLive:"同步在线库",langToggleAria:"切换中英文界面"}},va={en:{...os.en},zh:{...os.zh}};function gn(e,t){let a=Xe(e);!a||!t||typeof t!="object"||Object.assign(va[a],t)}function r(e,t={},a=E()){let n=Xe(a)||E();if(n==="en"&&t&&typeof t=="object"){if((e==="roundsFull"||e==="turnsUnit")&&t.n!==void 0&&Number(t.n)===1)return"1 Round";if(e==="countUnit"&&t.n!==void 0&&Number(t.n)===1)return"1 entry";if(e==="rowResCodesCount"&&t.n!==void 0&&Number(t.n)===1)return"1 Res Code";if(e==="totalsBreakdownSummary"&&t.count!==void 0&&Number(t.count)===1)return"1 boss tallied";if(e==="dailyCountFoot"&&t.n!==void 0&&Number(t.n)===1)return`1 approved record on ${t.date??"{date}"}`;if(e==="playersExpandRecords"&&t.n!==void 0&&Number(t.n)===1)return"View 1 held record ▾";if(e==="posterCopyAllRes"&&t.n!==void 0&&Number(t.n)===1)return"Copy Resonance Code (1)";if(e==="posterCopiedAllRes"&&t.n!==void 0&&Number(t.n)===1)return"Copied 1 Resonance Code."}let o=va[n]?.[e]??os[n]?.[e]??va.zh?.[e]??va.en?.[e]??e;return typeof o!="string"||!t||typeof t!="object"?o:o.replace(/\{([a-zA-Z0-9_]+)\}/g,(c,l)=>t[l]!==void 0&&t[l]!==null?String(t[l]):c)}function $e(e,t=E()){return N(t)?Number(e)===1?"1 Round":`${e} Rounds`:`${e} 回合`}function ie(e,t=E()){return N(t)?Number(e)===1?"1 entry":`${e} entries`:`${e} 条`}function hn(e,t=E()){return N(t)?Number(e)===1?"1 boss":`${e} bosses`:`${e} 图`}var Sa=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function ds(e){if(!e)return null;let t=e instanceof Date?e:new Date(e);return Number.isNaN(t.getTime())?null:t}function Je(e){return String(e).padStart(2,"0")}function de(e,t=E()){if(e==null||e==="")return"—";let a=N(t)?"en-US":"zh-CN";if(typeof e=="bigint")return e.toLocaleString(a);let n=String(e).replace(/,/g,"").trim();if(!n)return"—";if(/^-?\d+$/.test(n))try{return BigInt(n).toLocaleString(a)}catch{return Number(n).toLocaleString(a)}let o=Number(n);return Number.isFinite(o)?o.toLocaleString(a):n}function lt(e,t=E()){if(e==null||e==="")return"—";let a=Number(typeof e=="bigint"?e:String(e).replace(/,/g,"").trim());if(!Number.isFinite(a))return"—";let n=Math.abs(a),o=(c,l)=>c.toFixed(l).replace(/\.0+$/,"").replace(/(\.\d*[1-9])0+$/,"$1");return N(t)?n>=1e9?`${o(a/1e9,2)}B`:n>=1e6?`${o(a/1e6,n>=1e7?1:2)}M`:n>=1e3?`${o(a/1e3,n>=1e5?0:1)}K`:de(a,"en"):n>=1e8?`${o(a/1e8,2)}亿`:n>=1e4?`${o(a/1e4,n>=1e6?0:1)}万`:de(a,"zh")}function ct(e,t=E()){let a=ds(e);if(!a)return"—";let n=a.getFullYear(),o=a.getMonth(),c=a.getDate(),l=Je(a.getHours()),u=Je(a.getMinutes());return N(t)?`${Sa[o]} ${c}, ${n}, ${l}:${u}`:`${n}-${Je(o+1)}-${Je(c)} ${l}:${u}`}function ps(e,t=E()){let a=ds(e);if(!a)return"—";let n=a.getMonth(),o=a.getDate();return N(t)?`${Sa[n]} ${o}`:`${Je(n+1)}/${Je(o)}`}function us(e,t=E()){let a=ds(e);if(!a)return"—";let n=a.getMonth(),o=a.getDate(),c=Je(a.getHours()),l=Je(a.getMinutes());return N(t)?`${Sa[n]} ${o}, ${c}:${l}`:`${n+1}月${o}日 ${c}:${l}`}function ae(e,t=E()){let a=String(e??"").trim().toLowerCase();return N(t)?a==="zero"||a==="p0"?"All P0":a==="max"||a==="p5"?"Max Portray (P5)":a==="all"||a===""?"All Divisions":String(e??""):a==="zero"||a==="p0"?"全 0 塑造":a==="max"||a==="p5"?"全满塑造":a==="all"||a===""?"全部塑造":String(e??"")}function Ce(e,t=E()){let a=String(e??"").trim().toLowerCase();return N(t)?a==="zero"||a==="p0"?"P0":a==="max"||a==="p5"?"P5":a==="all"||a===""?"All":String(e??""):a==="zero"||a==="p0"?"全0塑":a==="max"||a==="p5"?"满塑":a==="all"||a===""?"全部":String(e??"")}function be(e,t=E()){let a=String(e??"").trim().toLowerCase();return N(t)?a==="new"||a==="collector"?"Collector's Edition":a==="rerun"||a==="gallery"?"Anomaly Gallery":a==="all"||a===""?"All Editions":String(e??""):a==="new"||a==="collector"?"鉴藏者特版":a==="rerun"||a==="gallery"?"怪相档案":a==="all"||a===""?"全部分区":String(e??"")}function Te(e,t=E()){let a=String(e??"").trim().toLowerCase(),n={beast:{en:"Beast",zh:"兽"},plant:{en:"Plant",zh:"木"},star:{en:"Star",zh:"星"},mineral:{en:"Mineral",zh:"岩"},spirit:{en:"Spirit",zh:"灵"},intellect:{en:"Intellect",zh:"智"},mineral_star:{en:"Mineral / Star",zh:"岩/星"},unknown:{en:"Arcanist",zh:"秘"}},o=n[a]||n.unknown;return N(t)?o.en:o.zh}function ms(e,t=E()){let a=String(e??"").trim().toLowerCase(),o={pending:{en:"Pending",zh:"待审核"},approved:{en:"Approved",zh:"已通过"},rejected:{en:"Rejected",zh:"已拒绝"},removed:{en:"Removed",zh:"已移除"},historical:{en:"Historical",zh:"历史档案"}}[a];return o?N(t)?o.en:o.zh:String(e??"")}function ls(e){return String(e??"").replace(/(\d{1,2})\/(\d{1,2})/g,(t,a,n)=>{let o=Number(a)-1,c=Number(n);return o>=0&&o<12&&c>=1&&c<=31?`${Sa[o]} ${c}`:`${a}/${n}`}).replace(/[–—-]/g," – ").replace(/\s{2,}/g," ").trim()}function xe(e,t=E()){if(!e)return N(t)?"Focused Flashback":"焦点闪回";let a=typeof e=="string"?e:String(e.label||e.code||""),n=typeof e=="object"?String(e.code||""):"";if(!N(t))return a||n;let o=a.match(/([0-9]+\.[0-9]+|S\d+)?\s*[·.\-]?\s*第\s*(\d+)\s*期\s*(?:[（(]([^）)]+)[）)])?/i);if(o){let l=o[1]||n,u=o[2],m=o[3]?` (${ls(o[3])})`:"";return`${l?`v${l.replace(/^v/i,"")} · `:""}Cycle ${u}${m}`}let c=a.replace(/第\s*(\d+)\s*期/g,"Cycle $1").replace(/焦点闪回/g,"Focused Flashback").replace(/（/g," (").replace(/）/g,")").replace(/(\d{1,2}\/\d{1,2}\s*[–—-]\s*\d{1,2}\/\d{1,2})/g,l=>ls(l)).replace(/\s+/g," ").trim();return/[\u4e00-\u9fff]/.test(c)?n?`v${n.replace(/^v/i,"")} · Focused Flashback`:"Focused Flashback":c||(n?`v${n.replace(/^v/i,"")}`:"Focused Flashback")}var or=[["额外行动","Extra Action"],["马头鱼尾兽","Hippocampus"],["卡律布狄斯","Charybdis"],["野生斯库拉","Wild Scylla"],["斯库拉","Scylla"],["金毛羊","Golden-Fleeced Ram"],["日熄蝙蝠","Eclipse Bat"],["洞知","Pursuit"],["余辉","Lingering Glow"],["术具","Conduit"],["仪式","Ultimate"],["电能","Dynamo"],["薪血","Bloodtithe"],["启示","Inspiration"],["升阶","Rank Up"],["位移","Shift"],["燃烧","Burn"],["中毒","Poison"],["石化","Petrify"],["第一关","Stage 1"],["第二关","Stage 2"],["第三关","Stage 3"],["第1关","Stage 1"],["第2关","Stage 2"],["第3关","Stage 3"]],lr={"Ⅰ":"I","Ⅱ":"II","Ⅲ":"III","Ⅳ":"IV","Ⅴ":"V","Ⅵ":"VI"};function $t(e,t=E()){let a=String(e??"").trim(),n=a.replace(/^(?:Stage\s*\d+|第[一二三四五六\d]+关|[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+|\d+)\s*[·．.\-]\s*/i,"").trim()||a;return N(t)?Le(n,"en").replace(/^(?:Stage\s*\d+|[IVX]+)\s*·\s*/i,"").trim():n}function Le(e,t=E()){let a=typeof e=="string"?e:String(e?.name??""),n=typeof e=="object"&&e!==null?Number(e.stage_no||e.stageNo||0):0;if(!N(t))return a||(n?`第 ${n} 关`:"");let o=a.normalize("NFKC").trim();if(!o)return n?`Stage ${n}`:"";o=o.replace(/[ⅠⅡⅢⅣⅤⅥ]/g,c=>lr[c]||c),o=o.replace(/[／/]/g," / ");for(let[c,l]of or)o.includes(c)&&(o=o.split(c).join(l));return o=o.replace(/\s*\/\s*/g," / ").replace(/\s*·\s*/g," · ").replace(/\s{2,}/g," ").trim(),/[\u4e00-\u9fff]/.test(o)?n===1?"I · Pursuit / Extra Action":n===2?"II · Lingering Glow / Ultimate":n===3?"III · Conduit / Ultimate":n?`Stage ${n}`:o.replace(/[\u4e00-\u9fff]+/g,"").trim()||"Flashback Stage":o}function fs(e=globalThis.LEADERBOARD_CONFIG?.issueMeta,t=E()){let a=e||{version:"4.1",title:"亚特兰蒂斯谋杀案",titleEn:"Murder on Atlantis",period:"11/05 – 12/10",periodEn:"Nov 5 – Dec 10"},n=String(a.version||"4.1");if(N(t)){let l=a.titleEn||"Murder on Atlantis",u=a.periodEn||ls(a.period||"11/05 – 12/10");return{version:n,title:l,period:u,fullLabel:`v${n.replace(/^v/i,"")} · ${l} (${u})`}}let o=a.title||"亚特兰蒂斯谋杀案",c=a.period||"11/05 – 12/10";return{version:n,title:o,period:c,fullLabel:`${n} · ${o}（${c}）`}}var ge={beast:{label:"兽",en:"BEAST",enLabel:"Beast",color:"#e59a8d",ribbon:"#8f3430",border:"#c45c52",icon:"./assets/uttu/aff_beast.png"},plant:{label:"木",en:"PLANT",enLabel:"Plant",color:"#a9d4b0",ribbon:"#476e50",border:"#6fa07a",icon:"./assets/uttu/aff_plant.png"},star:{label:"星",en:"STAR",enLabel:"Star",color:"#a3c8e6",ribbon:"#3f5f7c",border:"#6892b8",icon:"./assets/uttu/aff_star.png"},mineral:{label:"岩",en:"MINERAL",enLabel:"Mineral",color:"#e4c48a",ribbon:"#7f5e35",border:"#b88f54",icon:"./assets/uttu/aff_mineral.png"},spirit:{label:"灵",en:"SPIRIT",enLabel:"Spirit",color:"#cbb2e8",ribbon:"#61487c",border:"#9474b8",icon:"./assets/uttu/aff_spirit.png"},intellect:{label:"智",en:"INTELLECT",enLabel:"Intellect",color:"#ebd083",ribbon:"#7b6832",border:"#bfa14b",icon:"./assets/uttu/aff_intellect.png"},mineral_star:{label:"岩/星",en:"MINERAL·STAR",enLabel:"Mineral / Star",color:"#d4c8b8",ribbon:"#5d6370",border:"#9ab0c8",icon:"./assets/uttu/aff_mineral_star.png"},unknown:{label:"秘",en:"ARCANIST",enLabel:"Arcanist",color:"#d8c5ae",ribbon:"#514136",border:"#8a6f59",icon:""}},ys=new Map([["槲寄生",{id:10001,aff:"plant",star:6,en:"Druvis III"}],["红弩箭",{id:10002,aff:"star",star:6,en:"Lilya"}],["尼克·波顿",{id:10003,aff:"beast",star:4,en:"Nick Bottom"}],["小春雀儿",{id:10004,aff:"plant",star:4,en:"Eagle"}],["未锈铠",{id:10005,aff:"spirit",star:6,en:"A Knight"}],["苏芙比",{id:10006,aff:"plant",star:6,en:"Sotheby"}],["X",{id:10007,aff:"intellect",star:5,en:"X"}],["玛丽莲",{id:10008,aff:"beast",star:5,en:"Sweetheart"}],["弄臣",{id:10009,aff:"star",star:3,en:"The Fool"}],["冬",{id:10010,aff:"plant",star:4,en:"Зима"}],["芭妮芭妮",{id:10011,aff:"beast",star:4,en:"Bunny Bunny"}],["狼群",{id:10012,aff:"beast",star:4,en:"Pavia"}],["婴儿蓝",{id:10013,aff:"star",star:5,en:"Baby Blue"}],["夏利",{id:10014,aff:"star",star:5,en:"Charlie"}],["雾行者",{id:10015,aff:"star",star:4,en:"Oliver Fog"}],["柏林以东",{id:10016,aff:"plant",star:5,en:"Bkornblume"}],["帕米埃",{id:10017,aff:"beast",star:5,en:"Dikke"}],["十四行诗",{id:10018,aff:"mineral",star:5,en:"Sonetto"}],["气球派对",{id:10019,aff:"mineral",star:5,en:"Balloon Party"}],["星锑",{id:10020,aff:"star",star:6,en:"Regulus"}],["红斗篷",{id:10021,aff:"mineral",star:4,en:"Mondlicht"}],["无线电小姐",{id:10022,aff:"spirit",star:2,en:"Ms. Radio"}],["APPLe",{id:10023,aff:"star",star:4,en:"APPLe"}],["拉拉泉",{id:10025,aff:"plant",star:3,en:"La Source"}],["铅玻璃",{id:10026,aff:"mineral",star:4,en:"Cristallo"}],["百夫长",{id:10027,aff:"beast",star:6,en:"Centurion"}],["TTT",{id:10028,aff:"star",star:4,en:"TTT"}],["星之眼",{id:10029,aff:"star",star:3,en:"aliEn T"}],["莉拉妮",{id:10030,aff:"beast",star:3,en:"Leilani"}],["约翰·提托",{id:10031,aff:"intellect",star:3,en:"John Titor"}],["讣告人",{id:10032,aff:"mineral",star:5,en:"Necrologist"}],["五色月",{id:10033,aff:"plant",star:5,en:"Satsuki"}],["泥鯭的士",{id:10034,aff:"plant",star:6,en:"An-an Lee"}],["丽莎&路易斯",{id:10035,aff:"spirit",star:3,en:"Twins Sleep"}],["玛蒂尔达",{id:10036,aff:"star",star:5,en:"Matilda"}],["爱宠",{id:10037,aff:"plant",star:4,en:"Rabies"}],["坦南特",{id:10038,aff:"beast",star:5,en:"Tennant"}],["莫桑女士",{id:10039,aff:"mineral",star:4,en:"Ms. Moissan"}],["贝蒂",{id:10040,aff:"mineral",star:3,en:"Bette"}],["吵闹鬼",{id:10041,aff:"spirit",star:4,en:"Poltergeist"}],["兔毛手袋",{id:10042,aff:"beast",star:6,en:"Medicine Pocket"}],["远旅",{id:10043,aff:"star",star:6,en:"Voyager"}],["喀嚓喀嚓",{id:10044,aff:"spirit",star:5,en:"Click"}],["哒哒达利",{id:10045,aff:"beast",star:3,en:"Darley Clatter"}],["温妮弗雷德",{id:10046,aff:"mineral",star:6,en:"Eternity"}],["新巴别塔",{id:10047,aff:"mineral",star:6,en:"Ms. NewBabel"}],["牙仙",{id:10048,aff:"star",star:6,en:"Tooth Fairy"}],["洋葱头",{id:10049,aff:"mineral",star:3,en:"ONiON"}],["斯普特尼克",{id:10050,aff:"star",star:3,en:"Sputnik"}],["洁西卡",{id:10051,aff:"plant",star:6,en:"Jessica"}],["小梅斯梅尔",{id:10052,aff:"intellect",star:4,en:"Mesmer Jr."}],["埃里克",{id:10053,aff:"star",star:4,en:"Erick"}],["门",{id:10054,aff:"intellect",star:2,en:"Door"}],["金蜜儿",{id:10055,aff:"star",star:5,en:"Blonney"}],["恐怖通",{id:10056,aff:"mineral",star:5,en:"Horropedia"}],["梅兰妮",{id:10057,aff:"beast",star:6,en:"Melania"}],["皮克勒斯",{id:10058,aff:"mineral",star:6,en:"Pickles"}],["挖掘艺术",{id:10059,aff:"plant",star:5,en:"Diggers"}],["37",{id:10060,aff:"star",star:6,en:"37"}],["伽菈波那",{id:10061,aff:"mineral",star:6,en:"Kaalaa Baunaa"}],["坎吉拉",{id:10062,aff:"plant",star:5,en:"Kanjira"}],["鬃毛沙砾",{id:10063,aff:"beast",star:6,en:"Shamane"}],["6",{id:10064,aff:"intellect",star:6,en:"6"}],["可燃点",{id:10065,aff:"beast",star:6,en:"Spathodea"}],["和平乌鲁",{id:10066,aff:"mineral",star:5,en:"Ulu"}],["爱兹拉",{id:10067,aff:"star",star:6,en:"Ezra"}],["沙丝绒",{id:10068,aff:"beast",star:5,en:"Desert Flannel"}],["曲娘",{id:10069,aff:"mineral",star:6,en:"Jiu Niangzi"}],["小叶尼塞",{id:10070,aff:"star",star:5,en:"Yenisei"}],["葛天",{id:10071,aff:"beast",star:6,en:"Getian"}],["伊索尔德",{id:10072,aff:"spirit",star:6,en:"Isolde"}],["马库斯",{id:10073,aff:"plant",star:6,en:"Marcus"}],["维拉",{id:10074,aff:"plant",star:6,en:"Vila"}],["阿夫西维",{id:10075,aff:"plant",star:5,en:"Avgust"}],["北方哨歌",{id:10076,aff:"star",star:6,en:"Windsong"}],["塞梅尔维斯",{id:10077,aff:"mineral",star:6,en:"Semmelweis"}],["露西",{id:10078,aff:"intellect",star:6,en:"Lucy"}],["罗蕾莱",{id:10079,aff:"star",star:5,en:"Lorelei"}],["卡卡尼亚",{id:10080,aff:"plant",star:6,en:"Kakania"}],["J",{id:10081,aff:"beast",star:6,en:"J"}],["先驱者",{id:10082,aff:"spirit",star:3,en:"Pioneer"}],["环状水星",{id:10083,aff:"spirit",star:6,en:"Mercuria"}],["蓝手帕",{id:10084,aff:"spirit",star:6,en:"Tuesday"}],["数羊羔",{id:10085,aff:"spirit",star:5,en:"Barbara"}],["阿尔古斯",{id:10086,aff:"plant",star:6,en:"Argus"}],["天使娜娜",{id:10087,aff:"beast",star:6,en:"Anjo Nala"}],["邓肯先生",{id:10088,aff:"beast",star:5,en:"Mr. Duncan"}],["白朗姆",{id:10089,aff:"intellect",star:4,en:"White Rum"}],["洛佩拉",{id:10090,aff:"beast",star:6,en:"Lopera"}],["笃笃骨",{id:10091,aff:"plant",star:6,en:"Willow"}],["纸信圈儿",{id:10092,aff:"star",star:6,en:"Flutterpage"}],["宽檐帽",{id:10093,aff:"mineral",star:5,en:"Brimley"}],["芭卡洛儿",{id:10094,aff:"star",star:6,en:"Barcarola"}],["图图石子",{id:10095,aff:"mineral",star:6,en:"Fatutu"}],["梁月",{id:10096,aff:"star",star:6,en:"Liang Yue"}],["空脑袋",{id:10097,aff:"plant",star:5,en:"Loggerhead"}],["菲林士多",{id:10098,aff:"plant",star:6,en:"Noire"}],["虚构集",{id:10099,aff:"mineral",star:6,en:"Recoleta"}],["阿莱夫",{id:10100,aff:"intellect",star:6,en:"Aleph"}],["冷周六",{id:10101,aff:"plant",star:6,en:"Hissabeth"}],["命名日",{id:10102,aff:"mineral",star:5,en:"Name Day"}],["库珀花环",{id:10103,aff:"star",star:6,en:"Kiperina"}],["诺谛卡",{id:10104,aff:"spirit",star:6,en:"Nautika"}],["乌尔里希",{id:10105,aff:"intellect",star:6,en:"Ulrich"}],["嚼嚼松果",{id:10106,aff:"plant",star:5,en:"Buddy Fairchild"}],["莫莉德尔",{id:10107,aff:"beast",star:6,en:"Moldir"}],["玛丽安娜",{id:10108,aff:"mineral",star:6,en:"Sentinel"}],["卡戎",{id:10109,aff:"spirit",star:6,en:"Charon"}],["艾吉奥·奥迪托雷",{id:10110,aff:"star",star:6,en:"Ezio Auditore"}],["卡珊德拉",{id:10111,aff:"mineral",star:6,en:"Kassandra"}],["阿利克西欧斯",{id:10112,aff:"beast",star:5,en:"Alexios"}],["野树莓",{id:10113,aff:"mineral",star:6,en:"Rubuska"}],["告死鸟",{id:10114,aff:"intellect",star:6,en:"Corvus"}],["贝丽尔",{id:10115,aff:"intellect",star:6,en:"Beryl"}],["灰调蓝",{id:10116,aff:"beast",star:6,en:"Brume"}],["玛尔纱",{id:10117,aff:"beast",star:6,en:"Marsha"}],["伊戈尔",{id:10118,aff:"beast",star:6,en:"Igor"}],["鹭鸶剪",{id:10119,aff:"plant",star:6,en:"Paper Heron"}],["芦草结",{id:10120,aff:"plant",star:4,en:"Reed"}],["程和光",{id:10121,aff:"star",star:6,en:"Cheng Heguang"}],["洛伦兹蝴蝶",{id:10122,aff:"intellect",star:6,en:"Lorentz Butterfly"}],["《湖边的女人》",{id:10123,aff:"plant",star:4,en:"Lady by the Lake"}],["拉莫纳",{id:10124,aff:"plant",star:6,en:"Ramona"}],["哑谜",{id:10125,aff:"intellect",star:6,en:"Enigma"}],["小瑞安侬",{id:10126,aff:"beast",star:6,en:"Rhiannon"}],["珐琅眼",{id:10127,aff:"mineral",star:6,en:"Coppélia"}],["银装小春雀儿",{id:10128,aff:"plant",star:5,en:"Silverwing Eagle"}],["无名者",{id:10129,aff:"mineral",star:6,en:"Ms. Stranger"}],["回声谣",{id:10130,aff:"mineral",star:6,en:"Everecho"}],["奠基石",{id:10131,aff:"mineral",star:6,en:"Cornerstone"}],["双生舞伶",{id:10132,aff:"mineral_star",star:6,en:"The Twins"}],["诺拉",{id:10133,aff:"spirit",star:4,en:"NORA"}],["赫多涅",{id:10134,aff:"mineral",star:6,en:"Hedone"}],["纳西索斯",{id:10135,aff:"beast",star:6,en:"Narcissus"}],["狩勋女巫红弩箭",{id:10136,aff:"star",star:6,en:"Huntsworn Lilya"}],["格林杜尔",{id:10137,aff:"beast",star:4,en:"Glyndŵr"}],["德雷克",{id:10138,aff:"beast",star:6,en:"Drake"}],["佩施塔",{id:10139,aff:"star",star:6,en:"Perchta"}],["伊芙琳",{id:10140,aff:"beast",star:6,en:"Evelyn"}]]),ka=[...ys.entries()].map(([e,t])=>({name:e,...t,portrait:`./assets/portraits/${t.id}.webp`})).sort((e,t)=>t.star-e.star||t.id-e.id),bs=new Map([["joe","J"],["j","J"],["艾吉奥","艾吉奥·奥迪托雷"],["ezio","艾吉奥·奥迪托雷"],["湖边的女人","《湖边的女人》"],["湖中的女人","《湖边的女人》"],["库伯花环","库珀花环"],["银装小春雀","银装小春雀儿"],["小春雀","小春雀儿"],["狩红","狩勋女巫红弩箭"],["施佩塔","佩施塔"],["莫基石","奠基石"],["玛尔莎","玛尔纱"],["瑞安侬","小瑞安侬"],["瑞","小瑞安侬"],["洛伦兹","洛伦兹蝴蝶"],["珐郎眼","珐琅眼"],["法郎眼","珐琅眼"],["芭卡洛尔","芭卡洛儿"],["狗","皮克勒斯"],["水星","环状水星"],["娜娜","天使娜娜"],["泥鯭的士","泥鯭的士"],["泥猛的士","泥鯭的士"],["安安","泥鯭的士"],["槲寄生","槲寄生"],["新巴别塔","新巴别塔"],["巴别塔","新巴别塔"],["兔毛","兔毛手袋"],["气球","气球派对"],["哨歌","北方哨歌"],["纸信","纸信圈儿"],["圈儿","纸信圈儿"],["小鹿","洁西卡"],["百夫","百夫长"],["未锈铠","未锈铠"],["远旅","远旅"],["星锑","星锑"],["tf","牙仙"],["tooth","牙仙"],["bp","气球派对"],["balloon","气球派对"],["medpoc","兔毛手袋"],["med pocket","兔毛手袋"],["mp","兔毛手袋"],["aal","泥鯭的士"],["anan","泥鯭的士"],["an-an","泥鯭的士"],["kb","伽菈波那"],["kaalaa","伽菈波那"],["kaala","伽菈波那"],["bd","伽菈波那"],["black dwarf","伽菈波那"],["bk","柏林以东"],["bkorn","柏林以东"],["fp","纸信圈儿"],["flutter","纸信圈儿"],["f22","图图石子"],["ftt","图图石子"],["ly","梁月"],["liang","梁月"],["ws","北方哨歌"],["wind","北方哨歌"],["newbabel","新巴别塔"],["babel","新巴别塔"],["ms newbabel","新巴别塔"],["anjo","天使娜娜"],["nala","天使娜娜"],["reco","虚构集"],["kip","库珀花环"],["kiper","库珀花环"],["cass","卡珊德拉"],["kass","卡珊德拉"],["alex","阿利克西欧斯"],["druvis","槲寄生"],["d3","槲寄生"],["semmel","塞梅尔维斯"],["semm","塞梅尔维斯"],["marcus","马库斯"],["marc","马库斯"],["lilya","红弩箭"],["hlilya","狩勋女巫红弩箭"],["h-lilya","狩勋女巫红弩箭"],["sp lilya","狩勋女巫红弩箭"],["splilya","狩勋女巫红弩箭"],["huntsworn","狩勋女巫红弩箭"],["zima","冬"],["alien t","星之眼"],["alient","星之眼"],["onion","洋葱头"],["apple","APPLe"],["ezra theodore","爱兹拉"],["ezra","爱兹拉"],["theodore","爱兹拉"],["lady of the lake","《湖边的女人》"],["lbtl","《湖边的女人》"],["lake","《湖边的女人》"],["coppelia","珐琅眼"],["copp","珐琅眼"],["glyndwr","格林杜尔"],["glyn","格林杜尔"],["peishta","佩施塔"],["perch","佩施塔"],["eve","伊芙琳"],["ev","伊芙琳"],["soth","苏芙比"],["spath","可燃点"],["spatho","可燃点"],["jiu","曲娘"],["merc","环状水星"],["barc","芭卡洛儿"],["barca","芭卡洛儿"],["hissa","冷周六"],["hiss","冷周六"],["naut","诺谛卡"],["ulr","乌尔里希"],["mold","莫莉德尔"],["sent","玛丽安娜"],["marianne","玛丽安娜"],["rubu","野树莓"],["corv","告死鸟"],["ph","鹭鸶剪"],["heron","鹭鸶剪"],["cheng","程和光"],["chg","程和光"],["heguang","程和光"],["lb","洛伦兹蝴蝶"],["lorentz","洛伦兹蝴蝶"],["butterfly","洛伦兹蝴蝶"],["rhia","小瑞安侬"],["swe","银装小春雀儿"],["seagle","银装小春雀儿"],["silverwing","银装小春雀儿"],["sp eagle","银装小春雀儿"],["stranger","无名者"],["ms stranger","无名者"],["ee","回声谣"],["cs","奠基石"],["corner","奠基石"],["twins","双生舞伶"],["the twins","双生舞伶"],["nora","诺拉"],["hedo","赫多涅"],["narc","纳西索斯"],["kaka","卡卡尼亚"],["iso","伊索尔德"],["reg","星锑"],["cent","百夫长"],["mel","梅兰妮"],["necro","讣告人"],["pick","皮克勒斯"],["dog","皮克勒斯"],["puppy","皮克勒斯"],["sham","鬃毛沙砾"],["tues","蓝手帕"],["lop","洛佩拉"],["will","笃笃骨"],["voy","远旅"],["eter","温妮弗雷德"],["jess","洁西卡"],["changeling","洁西卡"],["deer","洁西卡"],["ak","未锈铠"],["knight","未锈铠"],["bf","嚼嚼松果"],["buddy","嚼嚼松果"],["fairchild","嚼嚼松果"],["df","沙丝绒"],["flannel","沙丝绒"],["yeni","小叶尼塞"],["duncan","邓肯先生"],["mr duncan","邓肯先生"],["wr","白朗姆"],["rum","白朗姆"],["nd","命名日"],["nameday","命名日"],["fool","弄臣"],["radio","无线电小姐"],["ms radio","无线电小姐"],["moissan","莫桑女士"],["ms moissan","莫桑女士"],["mesmer","小梅斯梅尔"],["mesmer jr","小梅斯梅尔"],["darley","哒哒达利"],["twins sleep","丽莎&路易斯"],["lisa & louise","丽莎&路易斯"],["lisa and louise","丽莎&路易斯"],["oliver","雾行者"],["fog","雾行者"],["nick","尼克·波顿"],["bunny","芭妮芭妮"],["baby","婴儿蓝"],["john","约翰·提托"],["titor","约翰·提托"],["la source","拉拉泉"],["lasource","拉拉泉"],["polter","吵闹鬼"],["horro","恐怖通"],["adler","哑谜"],["enigma","哑谜"],["ramona","拉莫纳"],["beryl","贝丽尔"],["brume","灰调蓝"],["marsha","玛尔纱"],["igor","伊戈尔"],["charon","卡戎"],["aleph","阿莱夫"],["noire","菲林士多"],["logger","空脑袋"],["brim","宽檐帽"],["barb","数羊羔"],["argus","阿尔古斯"],["lorelei","罗蕾莱"],["lucy","露西"],["vila","维拉"],["avgust","阿夫西维"],["getian","葛天"],["gt","葛天"],["sonetto","十四行诗"],["dikke","帕米埃"],["charlie","夏利"],["matilda","玛蒂尔达"],["tennant","坦南特"],["satsuki","五色月"],["sweetheart","玛丽莲"],["blonney","金蜜儿"],["diggers","挖掘艺术"],["kanjira","坎吉拉"],["ulu","和平乌鲁"],["pioneer","先驱者"],["reed","芦草结"],["drake","德雷克"]]),dt=new Map,vs=new Map;for(let[e,t]of ys.entries()){let a={name:e,...t};dt.set(e.normalize("NFKC").trim().toLowerCase(),a),t.en&&dt.set(t.en.normalize("NFKC").trim().toLowerCase(),a),vs.set(t.id,[])}for(let[e,t]of bs.entries()){let a=String(e).normalize("NFKC").trim().toLowerCase(),n=dt.get(String(t).normalize("NFKC").trim().toLowerCase());if(!n)continue;dt.has(a)||dt.set(a,n);let o=vs.get(n.id);o&&!o.includes(a)&&o.push(a)}var Ca=[{cn:"任意生存",en:"Any Sustain",shortEn:"Sustain",aliases:["任意生存","生存位","治疗位","任意治疗","any sustain","any healer","sustain","healer"]},{cn:"任意角色",en:"Any Arcanist",shortEn:"Any",aliases:["任意角色","任意","自由位","自由","随意","补位","任意补位","any arcanist","any","flex","wildcard"]},{cn:"任意拐位",en:"Any Support",shortEn:"Support",aliases:["任意拐位","拐位","有拐力","任意辅助","有拐力的角色","any support","support","buffer"]}],Kt=new Map;for(let e of Ca){Kt.set(e.cn.toLowerCase(),e),Kt.set(e.en.toLowerCase(),e);for(let t of e.aliases)Kt.set(t.toLowerCase(),e)}function Ut(e){let t=String(e??"").trim();return t?Kt.has(t.toLowerCase())?!0:/^(?:任意|有拐力|自由|随意|补位|拐位|生存位|治疗位|any\b|flex\b|wildcard\b)/i.test(t):!1}function Ea(e){return Ut(e)}function Aa(e){let t=String(e??"").normalize("NFKC").trim();if(!t)return null;let a=Kt.get(t.toLowerCase());return a?a.cn:/生存|治疗|奶|sustain|heal/i.test(t)&&Ut(t)?"任意生存":/拐|辅助|support|buff/i.test(t)&&Ut(t)?"任意拐位":Ut(t)?"任意角色":null}function Vt(e,t=E()){let a=String(e??"").normalize("NFKC").trim(),n=Aa(a);if(n){let o=Ca.find(c=>c.cn===n);if(o)return t==="zh"?o.cn:o.en}return t==="zh"?a||"自由位":/[\u4e00-\u9fff]/.test(a)?"Any Arcanist":a||"Any Arcanist"}function cr(e){return String(e??"").normalize("NFKC").replace(/[（(][^）)]*[）)]/g,"").replace(/^(?:[12一二]?狂想|[12]狂|[0-5]塑|满塑)\s*/u,"").trim()}function te(e){let t=cr(e);if(!t)return null;let a=t.toLowerCase(),n=bs.get(t)||bs.get(a);if(n){let c=dt.get(n.normalize("NFKC").trim().toLowerCase());if(c)return{...c,portrait:`./assets/portraits/${c.id}.webp`}}let o=dt.get(a);if(o)return{...o,portrait:`./assets/portraits/${o.id}.webp`};if(!/[+/／]|或者|或则/.test(t)&&t.length<=14){let c=null;for(let[l,u]of ys.entries())l.length>=2&&!/^\d+$/.test(l)&&t.includes(l)&&(!c||l.length>c.name.length)&&(c={name:l,...u});if(c)return{...c,portrait:`./assets/portraits/${c.id}.webp`}}return null}var wa=new Map([["即兴咒语",{cn:"即兴咒语",en:"Impromptu Incantation",aff:"unknown",mono:"IMP"}],["即兴咒语·星",{cn:"即兴咒语·星",en:"Impromptu · Star",aff:"star",mono:"IMP"}],["即兴咒语·木",{cn:"即兴咒语·木",en:"Impromptu · Plant",aff:"plant",mono:"IMP"}],["即兴咒语·兽",{cn:"即兴咒语·兽",en:"Impromptu · Beast",aff:"beast",mono:"IMP"}],["即兴咒语·岩",{cn:"即兴咒语·岩",en:"Impromptu · Mineral",aff:"mineral",mono:"IMP"}],["即兴咒语·灵",{cn:"即兴咒语·灵",en:"Impromptu · Spirit",aff:"spirit",mono:"IMP"}],["即兴咒语·智",{cn:"即兴咒语·智",en:"Impromptu · Intellect",aff:"intellect",mono:"IMP"}]]);function pt(e){let t=String(e??"").normalize("NFKC").trim();if(!t)return null;if(wa.has(t))return wa.get(t);let a=t.toLowerCase();for(let o of wa.values())if(o.en.toLowerCase()===a)return o;let n=a.match(/^impromptu(?:\s*incantation)?(?:\s*[·•:\-]\s*|\s+)(star|plant|beast|mineral|spirit|intellect)$/i);if(n){let o=n[1].toLowerCase();for(let c of wa.values())if(c.aff===o)return c}return null}function q(e){let t=te(e);if(t)return`char:${t.id}`;let a=pt(e);if(a)return`special:${a.cn}`;let n=Aa(e);return n?`wild:${n}`:String(e??"").normalize("NFKC").trim().toLowerCase()}function Ne(e){let t=te(e);if(t)return t.name;let a=pt(e);return a?a.cn:String(e??"").trim()}function V(e,t=E()){let a=String(e??"").trim();if(!a)return"";if(Ea(a))return Vt(a,t);let n=pt(a);if(n)return t==="zh"?n.cn:n.en;let o=te(a);if(o)return t==="zh"?o.name:o.en||o.name;if(/[/／]/.test(a)){let c=a.split(/[/／]/).map(l=>l.trim()).filter(Boolean);if(c.length>1)return c.map(l=>V(l,t)).join(t==="zh"?"/":" / ")}return a}function ve(e,t=E()){let a=String(e??"").trim();if(!a)return"";let n=a.split(/[/／+、,，]/).map(o=>o.trim()).filter(Boolean);return n.length?n.map(o=>V(o,t)).join(" / "):a}function wt(e,t){let a=String(t??"").normalize("NFKC").trim().toLowerCase();if(!a||String(e??"").normalize("NFKC").trim().toLowerCase().includes(a))return!0;if(Ea(e)){let l=Vt(e,"en").toLowerCase(),u=Vt(e,"zh").toLowerCase();if(l.includes(a)||u.includes(a))return!0}let o=pt(e);if(o&&(o.cn.toLowerCase().includes(a)||o.en.toLowerCase().includes(a)||"impromptu incantation".includes(a)))return!0;let c=te(e);if(c){if(c.name.normalize("NFKC").toLowerCase().includes(a)||c.en&&c.en.normalize("NFKC").toLowerCase().includes(a))return!0;let l=te(a);if(l&&l.id===c.id)return!0;let u=vs.get(c.id)||[];for(let m of u)if(m===a||a.length>=2&&m.length>=3&&m.includes(a))return!0}return!1}var vn=new Map([["37","37"],["6","6"],["joe","J"],["j","J"],["瑞","小瑞安侬"],["纸","纸信圈儿"],["圈","纸信圈儿"],["佩","佩施塔"],["德","德雷克"],["鬃","鬃毛沙砾"],["伊","伊索尔德"],["燃","可燃点"],["莫","莫莉德尔"],["纳","纳西索斯"],["程","程和光"],["梅","梅兰妮"],["乌","乌尔里希"],["戈","伊戈尔"],["哑","哑谜"],["哨","北方哨歌"],["蝶","洛伦兹蝴蝶"],["洛","洛佩拉"],["卡","卡卡尼亚"],["戎","卡戎"],["鹭","鹭鸶剪"],["灰","灰调蓝"],["维","维拉"],["水","环状水星"],["环","环状水星"],["娜","天使娜娜"],["草","芦草结"],["纱","玛尔纱"],["拉","拉莫纳"],["蓝","蓝手帕"],["月","梁月"],["莱","阿莱夫"],["花","库珀花环"],["珐","珐琅眼"],["赫","赫多涅"],["回","回声谣"],["舞","双生舞伶"],["百","百夫长"],["红","狩勋女巫红弩箭"],["珊","卡珊德拉"],["菲","菲林士多"],["冷","冷周六"],["虚","虚构集"],["葛","葛天"],["蛾","无名者"],["诺","诺谛卡"],["塞","塞梅尔维斯"],["莓","野树莓"],["贝","贝丽尔"],["鸭","牙仙"],["牙","牙仙"],["露","露西"],["芭","芭卡洛儿"],["狗","皮克勒斯"],["图","图图石子"],["兔","兔毛手袋"],["鹿","洁西卡"],["曲","曲娘"],["阿","阿尔古斯"],["苏","苏芙比"],["柏","柏林以东"],["泥","泥鯭的士"],["安","泥鯭的士"],["温","温妮弗雷德"],["塔","新巴别塔"],["星","星锑"],["远","远旅"],["铠","未锈铠"],["槲","槲寄生"],["笃","笃笃骨"]]);function gs(e,t=""){let a=String(e??"").trim();if(!a)return null;if(a==="红"&&t.includes("红弩箭")&&!t.includes("狩"))return te("红弩箭");let n=te(a);if(n)return n;let o=vn.get(a)||vn.get(a.toLowerCase());return o?te(o):null}function Cn(e,t=""){let a=String(e??"").normalize("NFKC").trim(),n=[],o=0;for(;o<a.length;){if(/\s/.test(a[o])){o+=1;continue}if(a.slice(o,o+3).toLowerCase()==="joe"){let m=te("J");m&&n.push(m),o+=3;continue}if(a.slice(o,o+2)==="37"){let m=te("37");m&&n.push(m),o+=2;continue}let u=gs(a[o],t);if(!u)return null;n.push(u),o+=1}return n.length?n:null}function _a(e,t=""){let a=String(e??"").trim();if(!a)return null;let n=te(a);if(n)return{type:"char",raw:a,char:n};let o=pt(a);if(o)return{type:"archetype",raw:a,special:o};if(Ut(a))return{type:"wild",raw:a,label:a.length>6?a.slice(0,6):a};if(/[/／]|或者|或则|或/.test(a)){let l=a.split(/[/／]|或者|或则|或/).map(f=>f.trim()).filter(Boolean),u=[],m=new Set,p=!1;for(let f of l){let d=gs(f,t);if(d){m.has(d.id)||(m.add(d.id),u.push(d));continue}let b=Cn(f,t);if(b){b.length>1&&(p=!0);for(let g of b)m.has(g.id)||(m.add(g.id),u.push(g))}}if(u.length===1&&l.length===1)return{type:"char",raw:a,char:u[0]};if(u.length>=1){let f=p?"多组合":`${l.length}选1`,d=u.length<=2?u.map(b=>b.name.slice(0,3)).join("/"):`${u[0].name.slice(0,3)}等${u.length}人`;return{type:"flex",raw:a,chars:u,optionCount:l.length,hasCombo:p,tag:f,label:d}}}let c=gs(a,t);return c?{type:"char",raw:a,char:c}:{type:"unknown",raw:a}}function Ma(e,t=E()){let a=Array.isArray(e?.chars)?e.chars:[],n=Number(e?.optionCount)||a.length||2,o=!!(e?.hasCombo||e?.tag==="多组合");if(t==="zh"){let f=o?"多组合":`${n}选1`,d=a.map(y=>y.name),b=d.length<=2?d.map(y=>y.slice(0,3)).join("/"):`${d[0].slice(0,3)}等${d.length}人`,g=d.join(" / ");return{tag:f,label:b,fullList:g,title:`可选替换位（${f}）：${g}`}}let c=o?"COMBO":`1 OF ${n}`,l=a.map(f=>f.en||f.name),u=(f,d=9)=>f.length>d?`${f.slice(0,d-1)}…`:f,m=l.length<=2?l.map(f=>u(f,8)).join(" / "):`${u(l[0],9)} +${l.length-1}`,p=l.join(" / ");return{tag:c,label:m,fullList:p,title:`Flex (${c}): ${p}`}}function xa(e,t=E()){let a=String(e?.raw||e?.label||"").trim();if(t==="zh"){let o=e?.label||Vt(a,"zh");return{sub:"自由位",label:o,title:`自由补位：${a||o}`}}let n=Vt(a,"en");return{sub:"FLEX",label:n,title:`Flex Slot: ${n}`}}function Ue(e,t=""){let a=Array.isArray(e)?e.map(m=>String(m??"").trim()).filter(Boolean):[];if(!a.length)return[];if(a.length>1)return a.map(m=>_a(m,t)).filter(Boolean);let n=a[0],o=te(n);if(o)return[{type:"char",raw:n,char:o}];let c=n.split(/[+＋]/).map(m=>m.trim()).filter(Boolean),l=[],u=!0;for(let m=0;m<c.length;m++){let p=c[m];if(m===0){if(/[/／]/.test(p)){let g=p.split(/[/／]/).map(h=>h.trim()).filter(Boolean).map(h=>_a(h,t));if(g.length>=2&&g.every(h=>h&&h.type!=="unknown")){l.push(...g);continue}}let f=Cn(p,t);if(f){for(let b of f)l.push({type:"char",raw:b.name,char:b});continue}let d=_a(p,t);if(d&&d.type!=="unknown")l.push(d);else{u=!1;break}}else{let f=_a(p,t);if(f&&f.type!=="unknown")l.push(f);else{u=!1;break}}}return u&&l.length?l:[{type:"legacy",raw:n}]}function _t(e,t=""){let a=Ue(e,t),n=[];for(let o of a)if(o.type==="char"&&o.char)n.push(o.char.name);else if(o.type==="flex"&&o.chars?.length)for(let c of o.chars)n.push(c.name);else o.raw&&n.push(o.raw);return n}function Wt(e){let t=te(e);if(t?.aff)return t.aff;let a=String(e??"");return a.includes("·木")?"plant":a.includes("·星")?"star":a.includes("·岩")?"mineral":a.includes("·兽")?"beast":a.includes("·灵")?"spirit":a.includes("·智")?"intellect":"unknown"}var En="https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1",An="https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",Mn="https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",Gt=new Map([["神话的遗闻",{cn:"神话的遗闻",en:"Eidolon of Avarice",version:"4.1",edition:"Collector's Edition",editionTagEn:"4.1 Collector's Edition",weakness:["star","plant"],tags:["群体伤害","爆发伤害"],tagsEn:["Mass DMG","Burst DMG"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v4a1_boss1.webp",hero:"./assets/bosses/v4a1_boss1_wide.webp",pos:"50% 22%"}],["思想的表观",{cn:"思想的表观",en:"Manifestation of Thought",version:"4.1",edition:"Collector's Edition",editionTagEn:"4.1 Collector's Edition",weakness:["intellect","beast"],tags:["护盾","额外行动"],tagsEn:["Shield","Extra Action"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v4a1_boss2.webp",hero:"./assets/bosses/v4a1_boss2_wide.webp",pos:"50% 24%"}],["生命的饥馑",{cn:"生命的饥馑",en:"Coveter of Eternity",version:"4.1",edition:"Collector's Edition",editionTagEn:"4.1 Collector's Edition",weakness:["mineral","spirit"],tags:["仪式伤害","即时治疗"],tagsEn:["Ultimate DMG","Instant Heal"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v4a1_boss3.webp",hero:"./assets/bosses/v4a1_boss3_wide.webp",pos:"50% 18%"}],["生命的饥谨",{cn:"生命的饥馑",en:"Coveter of Eternity",version:"4.1",edition:"Collector's Edition",editionTagEn:"4.1 Collector's Edition",weakness:["mineral","spirit"],tags:["仪式伤害","即时治疗"],tagsEn:["Ultimate DMG","Instant Heal"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A54.1",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v4a1_boss3.webp",hero:"./assets/bosses/v4a1_boss3_wide.webp",pos:"50% 18%"}],["子弹的冬年",{cn:"子弹的冬年",en:"The Bullet-Torn Winter",version:"4.0",edition:"Witness's Edition",editionTagEn:"v4.0 Anomaly Gallery",weakness:["star","beast"],tags:["群体伤害","爆发伤害"],tagsEn:["Mass DMG","Burst DMG"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v4a0_boss1.webp",hero:"./assets/bosses/v4a0_boss1.webp",pos:"50% 22%"}],["急性猩红症·Ⅱ型",{cn:"急性猩红症·Ⅱ型",en:"Insatiable Bloodsucker Type II",version:"3.9",edition:"Witness's Edition",editionTagEn:"v3.9 Anomaly Gallery",weakness:["beast","plant","star","mineral"],tags:["自然灵感","仪式解控"],tagsEn:["Natural Afflatus","Ultimate Cleanse"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v3a9_boss1.webp",hero:"./assets/bosses/v3a9_boss1.webp",pos:"50% 24%"}],["太阳的宠臣",{cn:"太阳的宠臣",en:"The Sun's Thrall",version:"3.8",edition:"Witness's Edition",editionTagEn:"v3.8 Anomaly Gallery",weakness:["star","mineral"],tags:["治疗咒语","主动攻击"],tagsEn:["Heal Incantation","Active Attack"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin",thumb:"./assets/bosses/v3a8_boss1.webp",hero:"./assets/bosses/v3a8_boss1.webp",pos:"50% 28%"}],["旧日的荣耀",{cn:"旧日的荣耀",en:"Glory Days Manifest",version:"3.7",edition:"Witness's Edition",editionTagEn:"v3.7 Anomaly Gallery",weakness:["mineral","spirit"],tags:["多增益叠层","爆发伤害"],tagsEn:["1-target DMG","Burst DMG"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Glory_Days_Manifest_(Enemy)",thumb:"./assets/bosses/v3a7_boss1.webp",hero:"./assets/bosses/v3a7_boss1.webp",dossier:"./assets/bosses/global_glory_days_manifest_dossier.webp",pos:"50% 22%"}],["自我同情者",{cn:"自我同情者",en:"The Self-Pitying Avenger",version:"S02",edition:"Witness's Edition",editionTagEn:"S02 Anomaly Gallery",weakness:["star","mineral"],tags:["现实创伤","及时治疗"],tagsEn:["Mass DMG","Instant Heal"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/The_Self-Pitying_Avenger_(Enemy)",thumb:"./assets/bosses/sp02_boss1.webp",hero:"./assets/bosses/sp02_boss1.webp",dossier:"./assets/bosses/global_self_pitying_avenger_dossier.webp",pos:"50% 25%"}],["超限的囚徒·Ⅱ型",{cn:"超限的囚徒·Ⅱ型",en:"Captive of Transcendentality Type II",version:"3.6",edition:"Witness's Edition",editionTagEn:"v3.6 Anomaly Gallery",weakness:["spirit","intellect"],tags:["术阵仪式","单体爆发"],tagsEn:["1-target DMG","Burst DMG"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Captive_of_Transcendentality_Type_II_(Enemy)",thumb:"./assets/bosses/v3a6_boss1.webp",hero:"./assets/bosses/v3a6_boss1.webp",dossier:"./assets/bosses/global_captive_t2_dossier.webp",pos:"50% 20%"}],["信仰的移位·Ⅱ型",{cn:"信仰的移位·Ⅱ型",en:"Distortion of Faith Type II",version:"3.5",edition:"Witness's Edition",editionTagEn:"v3.5 Anomaly Gallery",weakness:["intellect","beast"],tags:["术法输出","增益解崩"],tagsEn:["Mass DMG","Debuff Incantation"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Distortion_of_Faith_Type_II_(Enemy)",thumb:"./assets/bosses/v3a5_boss1.webp",hero:"./assets/bosses/v3a5_boss1.webp",dossier:"./assets/bosses/global_distortion_of_faith_t2_dossier.webp",pos:"50% 24%"}],["毁灭的履带",{cn:"毁灭的履带",en:"Caterpillar of Destruction",version:"3.4",edition:"Witness's Edition",editionTagEn:"v3.4 Anomaly Gallery",weakness:["plant","star"],tags:["克制群攻","破甲暴露"],tagsEn:["Mass DMG","Dispel Buff"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Caterpillar_of_Destruction_(Enemy)",thumb:"./assets/bosses/v3a4_boss1.webp",hero:"./assets/bosses/v3a4_boss1.webp",dossier:"./assets/bosses/global_caterpillar_of_destruction_dossier.webp",pos:"50% 35%"}],["急性猩红症",{cn:"急性猩红症",en:"Insatiable Bloodsucker",version:"3.3",edition:"Witness's Edition",editionTagEn:"v3.3 Anomaly Gallery",weakness:["beast","spirit","intellect"],tags:["群体伤害","仪式清debuff"],tagsEn:["Mass DMG","Buff Incantation"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Insatiable_Bloodsucker_(Enemy)",thumb:"./assets/bosses/v3a3_boss1.webp",hero:"./assets/bosses/v3a3_boss1.webp",dossier:"./assets/bosses/global_insatiable_bloodsucker_dossier.webp",pos:"50% 28%"}],["超限的囚徒",{cn:"超限的囚徒",en:"Captive of Transcendentality",version:"3.2",edition:"Witness's Edition",editionTagEn:"v3.2 Anomaly Gallery",weakness:["beast","intellect"],tags:["单体追击","3回合仪式窗"],tagsEn:["1-target DMG","Burst DMG"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Captive_of_Transcendentality_(Enemy)",thumb:"./assets/bosses/v3a2_boss2.webp",hero:"./assets/bosses/v3a2_boss2.webp",dossier:"./assets/bosses/global_captive_t1_dossier.webp",pos:"50% 20%"}],["蜕化的残响",{cn:"蜕化的残响",en:"The Cocooned Lament",version:"3.2",edition:"Witness's Edition",editionTagEn:"v3.2 Anomaly Gallery",weakness:["mineral","beast"],tags:["精神创伤","额外行动"],tagsEn:["Mass DMG","Extra Action"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/The_Cocooned_Lament_(Enemy)",thumb:"./assets/bosses/v3a2_boss1.webp",hero:"./assets/bosses/v3a2_boss1.webp",dossier:"./assets/bosses/global_cocooned_lament_dossier.webp",pos:"50% 30%"}],["信仰的移位",{cn:"信仰的移位",en:"Distortion of Faith",version:"3.2",edition:"Witness's Edition",editionTagEn:"v3.2 Anomaly Gallery",weakness:["spirit","intellect"],tags:["群体伤害","主动减益"],tagsEn:["Mass DMG","Debuff Incantation"],wiki:"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",wikiEn:"https://reverse1999.fandom.com/wiki/Distortion_of_Faith_(Enemy)",thumb:"./assets/bosses/v3a2_boss3.webp",hero:"./assets/bosses/v3a2_boss3.webp",dossier:"./assets/bosses/global_distortion_of_faith_t1_dossier.webp",pos:"50% 24%"}]]),hs=new Map;for(let[e,t]of Gt.entries())if(t.en){let a=t.en.toLowerCase();hs.has(a)||hs.set(a,t.cn||e)}var $n=["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ","ⅩⅢ","ⅩⅣ","ⅩⅤ","ⅩⅥ","ⅩⅦ","ⅩⅧ","ⅩⅨ","ⅩⅩ"];function qt(e){let t=Number(e)-1;return t>=0&&t<$n.length?$n[t]:String(e??"")}function Pe(e,t="new"){let a=String(e??"").trim();if(Gt.has(a))return Gt.get(a);let n=hs.get(a.toLowerCase());return n&&Gt.has(n)?Gt.get(n):{cn:a,en:t==="new"?"Collector's Edition Survey":"Anomaly Gallery Specimen",version:"",edition:t==="new"?"Collector's Edition":"Witness's Edition",editionTagEn:t==="new"?"Collector's Edition":"Anomaly Gallery",weakness:[],tags:[],tagsEn:[],wiki:t==="new"?En:An,wikiEn:Mn,thumb:"",hero:"",pos:"50% 25%"}}function $s(e,t="new"){return Pe(e,t).en}function fe(e,t=E()){let a=String(e??"").trim(),n=Pe(a);return t==="zh"?n.cn||a:n.en||a}function Ss(e,t="new",a=E()){let n=Pe(e,t);return a==="zh"?n.en:n.editionTagEn||(t==="new"?"Collector's Edition":"Anomaly Gallery")}function xn(e,t=E()){let a=Pe(e);return t==="zh"?Array.isArray(a.tags)?a.tags:[]:Array.isArray(a.tagsEn)&&a.tagsEn.length?a.tagsEn:[]}function Dn(e,t="new",a=E()){let n=Pe(e,t);return a==="zh"?n.wiki||(t==="new"?En:An):n.wikiEn||Mn}var St=[{stageNo:1,match:["洞知","额外行动","pursuit","extra action","charybdis","hippocampus","pt-i"],hero:"./assets/bosses/fb_stage1.webp",thumb:"./assets/bosses/fb_stage1.webp",pos:"50% 22%",wikiEn:"https://reverse1999.fandom.com/wiki/Focused_Flashback",wikiZh:"https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E",enemies:[{name:"马头鱼尾兽",en:"Hippocampus",icon:"./assets/bosses/fb_hippocampus_icon.png",art:"./assets/bosses/fb_hippocampus.webp"},{name:"卡律布狄斯",en:"Charybdis",icon:"./assets/bosses/fb_charybdis_icon.png",art:"./assets/bosses/fb_stage1.webp"}]},{stageNo:2,match:["余辉","斯库拉","lingering glow","afterglow","scylla","pt-ii"],hero:"./assets/bosses/fb_stage2.webp",thumb:"./assets/bosses/fb_stage2.webp",pos:"50% 24%",wikiEn:"https://reverse1999.fandom.com/wiki/Focused_Flashback",wikiZh:"https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E",enemies:[{name:"斯库拉",en:"Scylla",icon:"./assets/bosses/fb_scylla_icon.png",art:"./assets/bosses/fb_scylla.webp"},{name:"野生斯库拉",en:"Wild Scylla",icon:"./assets/bosses/fb_wild_scylla_icon.png",art:"./assets/bosses/fb_stage2.webp"}]},{stageNo:3,match:["术具","金毛羊","conduit","golden","ram","eclipse","pt-iii"],hero:"./assets/bosses/fb_stage3.webp",thumb:"./assets/bosses/fb_stage3.webp",pos:"50% 20%",wikiEn:"https://reverse1999.fandom.com/wiki/Focused_Flashback",wikiZh:"https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E",enemies:[{name:"金毛羊",en:"Golden-Fleeced Ram",icon:"./assets/bosses/fb_golden_fleece_icon.png",art:"./assets/bosses/fb_stage3.webp"}]}];function Da(e){if(e==null)return St[0];if(typeof e=="number")return St.find(c=>c.stageNo===e)||St[0];let a=(typeof e=="string"?e:String(e.name||"")).toLowerCase(),n=St.find(c=>c.match.some(l=>a.includes(l)));if(n)return n;let o=Number(typeof e=="object"?e.stage_no||e.stageNo:e);return St.find(c=>c.stageNo===o)||St[0]}function kt(e){return`./assets/uttu/bg_pz00${Math.min(6,Math.max(2,Number(e)||6))}.webp`}var Sn=[{minScore:5e4,grade:"C",subGrade:"C",tier:"c",tagEn:"",tagZh:"",labelEn:"C",labelZh:"C",imgEn:"./assets/grades/global_c.webp",imgZh:"./assets/grades/c4.webp"},{minScore:15e4,grade:"B",subGrade:"B",tier:"b",tagEn:"",tagZh:"",labelEn:"B",labelZh:"B",imgEn:"./assets/grades/global_b.webp",imgZh:"./assets/grades/b4.webp"},{minScore:3e5,grade:"A",subGrade:"A",tier:"a",tagEn:"",tagZh:"",labelEn:"A",labelZh:"A",imgEn:"./assets/grades/global_a.webp",imgZh:"./assets/grades/a4.webp"},{minScore:5e5,grade:"S",subGrade:"S",tier:"s",tagEn:"",tagZh:"",labelEn:"S",labelZh:"S",imgEn:"./assets/grades/global_s.webp",imgZh:"./assets/grades/s_v4.webp"},{minScore:8e5,grade:"SS",subGrade:"SS",tier:"ss",tagEn:"",tagZh:"",labelEn:"SS",labelZh:"SS",imgEn:"./assets/grades/global_ss.webp",imgZh:"./assets/grades/ss_v4.webp"},{minScore:125e4,grade:"SSS",subGrade:"SSS I",tier:"sss",tagEn:"",tagZh:"",labelEn:"SSS I",labelZh:"SSS Ⅰ",imgEn:"./assets/grades/global_sss1.webp",imgZh:"./assets/grades/sss_prism.webp"},{minScore:25e5,grade:"SSS",subGrade:"SSS II",tier:"sss",tagEn:"",tagZh:"",labelEn:"SSS II",labelZh:"SSS Ⅱ",imgEn:"./assets/grades/global_sss2.webp",imgZh:"./assets/grades/sss_prism.webp"},{minScore:5e6,grade:"SSS",subGrade:"SSS III",tier:"sss",tagEn:"",tagZh:"",labelEn:"SSS III",labelZh:"SSS Ⅲ",imgEn:"./assets/grades/global_sss3.webp",imgZh:"./assets/grades/sss_prism.webp"},{minScore:1e7,grade:"SSS",subGrade:"SSS IV",tier:"sss",tagEn:"",tagZh:"",labelEn:"SSS IV",labelZh:"SSS Ⅳ",imgEn:"./assets/grades/global_sss4.webp",imgZh:"./assets/grades/global_sss4.webp"},{minScore:1e8,grade:"SSS",subGrade:"SSS IV",tier:"mythic",tagEn:"100M+",tagZh:"破亿",labelEn:"SSS IV · 100M+ Mythic",labelZh:"SSS Ⅳ · 破亿",imgEn:"./assets/grades/global_sss4.webp",imgZh:"./assets/grades/sss_prism.webp"}];function Ta(e,t=E()){let a=typeof e=="bigint"?e:BigInt(Math.max(0,Math.trunc(Number(String(e||0).replace(/,/g,""))||0))),n=t!=="zh";for(let o=Sn.length-1;o>=0;o--){let c=Sn[o];if(a>=BigInt(c.minScore))return{grade:c.grade,subGrade:c.subGrade,tier:c.tier,tag:n?c.tagEn:c.tagZh,img:n?c.imgEn:c.imgZh}}return{grade:"—",subGrade:"—",tier:"none",tag:"",img:""}}function La(e){switch(e){case"beast":return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17L9 6l3 5 3-5 4 11-7 3-7-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="14" r="1.6" fill="currentColor"/></svg>';case"plant":return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V8m0 0C12 5 15.5 4 18 5c0 3.5-2.5 6-6 6m0-3C12 5 8.5 4 6 5c0 3.5 2.5 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';case"star":return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.1 6.4L20.5 12l-6.4 2.1L12 20.5l-2.1-6.4L3.5 12l6.4-2.1L12 3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';case"mineral":return'<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 19.5,9.5 16.5,20 7.5,20 4.5,9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 3v17M4.5 9.5h15" fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.65"/></svg>';case"spirit":return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 4.5a7.5 7.5 0 1 0 4 13.8A6.2 6.2 0 0 1 15.5 4.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="16.5" cy="9" r="1.4" fill="currentColor"/></svg>';case"intellect":return'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="12,6 17,15 7,15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>';default:return'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'}}function Tn(){return`<svg class="slot-insight-svg" viewBox="0 0 40 34" aria-hidden="true">
    <polygon points="16,4 28,26 4,26" fill="none" stroke="currentColor" stroke-width="1.4" />
    <polygon points="24,9 35,28 13,28" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.72" />
  </svg>`}function Qe(e){let t=String(e??"").trim();if(!t)return"IX";if(/^(?:impromptu|即兴咒语)/i.test(t))return"IMP";if(/^[A-Za-z0-9]{1,3}$/.test(t))return t.toUpperCase();let a=t.match(/^[A-Za-z0-9]+/);return a&&a[0].length<=3?a[0].toUpperCase():Array.from(t).slice(0,2).join("")}var Ra={dps:{en:"DPS",zh:"主C输出"},"sub-dps":{en:"Sub-DPS",zh:"副C输出"},support:{en:"Support",zh:"辅助增伤"},sustain:{en:"Sustain",zh:"生存保障"},shield:{en:"Shield",zh:"护盾"},heal:{en:"Heal",zh:"治疗"},"extra-action":{en:"Extra Action",zh:"额外行动"},pursuit:{en:"Pursuit",zh:"洞知追击"},ultimate:{en:"Ultimate",zh:"至终仪式"},impromptu:{en:"Impromptu Incantation",zh:"即兴咒语"},burn:{en:"Burn",zh:"燃烧"},poison:{en:"Poison",zh:"中毒"},bloodtithe:{en:"Bloodtithe",zh:"薪血"},dynamo:{en:"Dynamo",zh:"电能"},"lingering-glow":{en:"Lingering Glow",zh:"余辉"},conduit:{en:"Conduit",zh:"术具"},"rank-up":{en:"Rank Up",zh:"升阶"},debuff:{en:"Debuff",zh:"减益削弱"},control:{en:"Control",zh:"控制"},counter:{en:"Counter / Riposte",zh:"反制 / 反击"}},Ln={槲寄生:{dmg:"mental",roles:["dps","control","support","rank-up"],euphoria:!0,version:"1.0"},红弩箭:{dmg:"reality",roles:["dps","extra-action","ultimate"],euphoria:!0,version:"1.0"},"尼克·波顿":{dmg:"mental",roles:["support","sustain"],euphoria:!1,version:"1.0"},小春雀儿:{dmg:"reality",roles:["dps","debuff"],euphoria:!1,version:"1.0"},未锈铠:{dmg:"reality",roles:["dps","ultimate"],euphoria:!0,version:"1.0"},苏芙比:{dmg:"reality",roles:["heal","sustain","poison"],euphoria:!0,version:"1.0"},X:{dmg:"reality",roles:["sub-dps","control","debuff"],euphoria:!1,version:"1.0"},玛丽莲:{dmg:"reality",roles:["dps","control"],euphoria:!1,version:"1.0"},弄臣:{dmg:"mental",roles:["sustain","counter"],euphoria:!1,version:"1.0"},冬:{dmg:"mental",roles:["support","control"],euphoria:!1,version:"1.0"},芭妮芭妮:{dmg:"reality",roles:["heal","sustain"],euphoria:!1,version:"1.0"},狼群:{dmg:"mental",roles:["dps","sustain"],euphoria:!1,version:"1.0"},婴儿蓝:{dmg:"mental",roles:["debuff","control"],euphoria:!1,version:"1.0"},夏利:{dmg:"mental",roles:["dps","sub-dps"],euphoria:!1,version:"1.0"},雾行者:{dmg:"reality",roles:["support","sustain"],euphoria:!1,version:"1.0"},柏林以东:{dmg:"reality",roles:["debuff","sub-dps","control","ultimate"],euphoria:!0,version:"1.0"},帕米埃:{dmg:"mental",roles:["sub-dps","heal"],euphoria:!1,version:"1.0"},十四行诗:{dmg:"reality",roles:["support","control","sub-dps"],euphoria:!1,version:"1.0"},气球派对:{dmg:"reality",roles:["heal","sustain","counter"],euphoria:!1,version:"1.0"},星锑:{dmg:"mental",roles:["sub-dps","support","impromptu","conduit"],euphoria:!0,version:"1.0"},红斗篷:{dmg:"reality",roles:["dps"],euphoria:!1,version:"1.0"},无线电小姐:{dmg:"mental",roles:["control","debuff"],euphoria:!1,version:"1.0"},APPLe:{dmg:"mental",roles:["sub-dps","heal"],euphoria:!1,version:"1.0"},拉拉泉:{dmg:"mental",roles:["heal","sustain"],euphoria:!1,version:"1.0"},铅玻璃:{dmg:"reality",roles:["support","sustain"],euphoria:!1,version:"1.0"},百夫长:{dmg:"reality",roles:["dps","ultimate"],euphoria:!0,version:"1.0"},TTT:{dmg:"mental",roles:["sub-dps","debuff"],euphoria:!1,version:"1.0"},星之眼:{dmg:"reality",roles:["sub-dps","control","counter"],euphoria:!1,version:"1.0"},莉拉妮:{dmg:"reality",roles:["support","sub-dps"],euphoria:!1,version:"1.0"},"约翰·提托":{dmg:"reality",roles:["shield","support"],euphoria:!1,version:"1.0"},讣告人:{dmg:"mental",roles:["support","sustain"],euphoria:!1,version:"1.0"},五色月:{dmg:"mental",roles:["sub-dps","control"],euphoria:!1,version:"1.0"},泥鯭的士:{dmg:"reality",roles:["support","rank-up","impromptu","control"],euphoria:!0,version:"1.0"},"丽莎&路易斯":{dmg:"mental",roles:["support","control"],euphoria:!1,version:"1.0"},玛蒂尔达:{dmg:"mental",roles:["sub-dps","impromptu","lingering-glow"],euphoria:!0,version:"1.0"},爱宠:{dmg:"reality",roles:["sub-dps","poison"],euphoria:!1,version:"1.0"},坦南特:{dmg:"reality",roles:["shield","sustain","debuff"],euphoria:!0,version:"1.0"},莫桑女士:{dmg:"reality",roles:["shield","control"],euphoria:!1,version:"1.0"},贝蒂:{dmg:"reality",roles:["shield","support"],euphoria:!1,version:"1.0"},吵闹鬼:{dmg:"mental",roles:["sustain","support"],euphoria:!1,version:"1.0"},兔毛手袋:{dmg:"mental",roles:["heal","sustain","debuff","control"],euphoria:!0,version:"1.0"},远旅:{dmg:"mental",roles:["sub-dps","control","counter","impromptu"],euphoria:!0,version:"1.0"},喀嚓喀嚓:{dmg:"mental",roles:["sub-dps","debuff"],euphoria:!1,version:"1.0"},哒哒达利:{dmg:"mental",roles:["support"],euphoria:!1,version:"1.0"},温妮弗雷德:{dmg:"reality",roles:["dps","bloodtithe","ultimate"],euphoria:!0,version:"1.0"},新巴别塔:{dmg:"reality",roles:["shield","sustain","counter"],euphoria:!0,version:"1.0"},洋葱头:{dmg:"reality",roles:["sub-dps"],euphoria:!1,version:"1.0"},斯普特尼克:{dmg:"mental",roles:["sustain","counter","control"],euphoria:!1,version:"1.0"},小梅斯梅尔:{dmg:"mental",roles:["sub-dps","control"],euphoria:!1,version:"1.0"},埃里克:{dmg:"reality",roles:["sub-dps","debuff"],euphoria:!1,version:"1.0"},门:{dmg:"reality",roles:["support","shield"],euphoria:!1,version:"1.0"},梅兰妮:{dmg:"mental",roles:["dps","ultimate"],euphoria:!0,version:"1.1"},皮克勒斯:{dmg:"mental",roles:["support","sub-dps","extra-action"],euphoria:!0,version:"1.1"},挖掘艺术:{dmg:"mental",roles:["control","shield","debuff"],euphoria:!1,version:"1.1"},牙仙:{dmg:"mental",roles:["heal","sustain","debuff","impromptu"],euphoria:!0,version:"1.2"},洁西卡:{dmg:"reality",roles:["dps","poison"],euphoria:!0,version:"1.2"},金蜜儿:{dmg:"reality",roles:["dps"],euphoria:!1,version:"1.2"},恐怖通:{dmg:"mental",roles:["sub-dps","debuff"],euphoria:!1,version:"1.2"},伽菈波那:{dmg:"mental",roles:["dps","extra-action"],euphoria:!0,version:"1.3"},坎吉拉:{dmg:"mental",roles:["sub-dps","poison","debuff"],euphoria:!1,version:"1.3"},鬃毛沙砾:{dmg:"reality",roles:["support","debuff","ultimate"],euphoria:!0,version:"1.3"},37:{dmg:"mental",roles:["sub-dps","extra-action","pursuit"],euphoria:!0,version:"1.4"},6:{dmg:"mental",roles:["support","debuff","sustain"],euphoria:!0,version:"1.4"},可燃点:{dmg:"reality",roles:["dps","burn","lingering-glow"],euphoria:!0,version:"1.5"},和平乌鲁:{dmg:"mental",roles:["support","burn"],euphoria:!1,version:"1.5"},爱兹拉:{dmg:"mental",roles:["shield","sustain","bloodtithe","dynamo"],euphoria:!0,version:"1.5"},沙丝绒:{dmg:"reality",roles:["support","sub-dps","counter"],euphoria:!1,version:"1.5"},曲娘:{dmg:"reality",roles:["dps","extra-action"],euphoria:!0,version:"1.6"},小叶尼塞:{dmg:"mental",roles:["heal","shield","sustain"],euphoria:!1,version:"1.6"},葛天:{dmg:"reality",roles:["support","debuff","ultimate"],euphoria:!0,version:"1.6"},伊索尔德:{dmg:"reality",roles:["support","sub-dps","burn","lingering-glow"],euphoria:!0,version:"1.7"},马库斯:{dmg:"mental",roles:["dps","rank-up"],euphoria:!0,version:"1.7"},维拉:{dmg:"mental",roles:["heal","support","sustain","rank-up"],euphoria:!0,version:"1.8"},阿夫西维:{dmg:"mental",roles:["support","heal"],euphoria:!1,version:"1.8"},北方哨歌:{dmg:"mental",roles:["dps","extra-action"],euphoria:!0,version:"1.8"},塞梅尔维斯:{dmg:"reality",roles:["support","sub-dps","bloodtithe"],euphoria:!0,version:"1.9"},露西:{dmg:"reality",roles:["dps","extra-action","dynamo"],euphoria:!0,version:"1.9"},罗蕾莱:{dmg:"mental",roles:["support","sub-dps"],euphoria:!1,version:"1.9"},卡卡尼亚:{dmg:"mental",roles:["sustain","support","sub-dps"],euphoria:!1,version:"1.9"},J:{dmg:"reality",roles:["shield","counter","burn","sustain"],euphoria:!0,version:"2.0"},先驱者:{dmg:"mental",roles:["shield","support"],euphoria:!1,version:"2.0"},环状水星:{dmg:"mental",roles:["support","rank-up"],euphoria:!0,version:"2.0"},蓝手帕:{dmg:"mental",roles:["support","debuff","poison"],euphoria:!0,version:"2.1"},数羊羔:{dmg:"mental",roles:["shield","heal","sustain"],euphoria:!1,version:"2.1"},阿尔古斯:{dmg:"reality",roles:["sub-dps","debuff","rank-up"],euphoria:!0,version:"2.1"},天使娜娜:{dmg:"mental",roles:["dps","extra-action","ultimate","control"],euphoria:!0,version:"2.2"},邓肯先生:{dmg:"reality",roles:["sub-dps","counter"],euphoria:!1,version:"2.2"},白朗姆:{dmg:"reality",roles:["control","support"],euphoria:!1,version:"2.2"},洛佩拉:{dmg:"reality",roles:["support","burn","extra-action","heal"],euphoria:!0,version:"2.2"},笃笃骨:{dmg:"mental",roles:["dps","poison"],euphoria:!0,version:"2.3"},纸信圈儿:{dmg:"reality",roles:["support","sub-dps","extra-action"],euphoria:!1,version:"2.3"},宽檐帽:{dmg:"mental",roles:["support","extra-action"],euphoria:!1,version:"2.3"},芭卡洛儿:{dmg:"mental",roles:["dps","impromptu","support"],euphoria:!1,version:"2.4"},图图石子:{dmg:"mental",roles:["heal","sustain","extra-action","support"],euphoria:!1,version:"2.4"},梁月:{dmg:"reality",roles:["dps","extra-action"],euphoria:!0,version:"2.5"},空脑袋:{dmg:"mental",roles:["heal","sustain","support"],euphoria:!1,version:"2.5"},菲林士多:{dmg:"mental",roles:["dps","ultimate","extra-action"],euphoria:!0,version:"2.5"},虚构集:{dmg:"reality",roles:["dps","ultimate"],euphoria:!0,version:"2.6"},阿莱夫:{dmg:"mental",roles:["support","impromptu","sub-dps"],euphoria:!1,version:"2.6"},冷周六:{dmg:"mental",roles:["dps","ultimate","control"],euphoria:!0,version:"2.7"},命名日:{dmg:"mental",roles:["support","sub-dps","ultimate"],euphoria:!1,version:"2.7"},库珀花环:{dmg:"mental",roles:["shield","sustain","support","impromptu"],euphoria:!1,version:"2.7"},诺谛卡:{dmg:"reality",roles:["dps","bloodtithe"],euphoria:!0,version:"2.8"},乌尔里希:{dmg:"reality",roles:["support","sub-dps","dynamo","extra-action"],euphoria:!0,version:"2.8"},嚼嚼松果:{dmg:"reality",roles:["dps","ultimate"],euphoria:!1,version:"2.8"},莫莉德尔:{dmg:"reality",roles:["support","ultimate","counter"],euphoria:!0,version:"2.8"},玛丽安娜:{dmg:"reality",roles:["sub-dps","support","bloodtithe"],euphoria:!1,version:"3.0"},卡戎:{dmg:"mental",roles:["support","dynamo","extra-action"],euphoria:!1,version:"3.0"},"艾吉奥·奥迪托雷":{dmg:"reality",roles:["dps","extra-action","poison","counter"],euphoria:!1,version:"S01"},卡珊德拉:{dmg:"reality",roles:["sub-dps","support","extra-action","ultimate"],euphoria:!1,version:"S01"},阿利克西欧斯:{dmg:"reality",roles:["dps","ultimate"],euphoria:!1,version:"S01"},野树莓:{dmg:"reality",roles:["heal","sustain","support","bloodtithe"],euphoria:!1,version:"3.1"},告死鸟:{dmg:"mental",roles:["dps","dynamo","extra-action"],euphoria:!1,version:"3.1"},贝丽尔:{dmg:"mental",roles:["dps","lingering-glow","extra-action","rank-up"],euphoria:!1,version:"3.2"},灰调蓝:{dmg:"mental",roles:["dps","dynamo","extra-action"],euphoria:!1,version:"3.2"},玛尔纱:{dmg:"reality",roles:["shield","sustain","support","lingering-glow"],euphoria:!1,version:"3.3"},伊戈尔:{dmg:"reality",roles:["dps","ultimate","extra-action"],euphoria:!1,version:"3.3"},鹭鸶剪:{dmg:"reality",roles:["dps","impromptu"],euphoria:!1,version:"3.4"},芦草结:{dmg:"mental",roles:["support"],euphoria:!1,version:"3.4"},程和光:{dmg:"reality",roles:["sub-dps","support","extra-action"],euphoria:!1,version:"3.4"},洛伦兹蝴蝶:{dmg:"mental",roles:["support","sub-dps","lingering-glow"],euphoria:!1,version:"3.5"},"《湖边的女人》":{dmg:"mental",roles:["sub-dps","support"],euphoria:!1,version:"3.5"},拉莫纳:{dmg:"mental",roles:["dps","poison"],euphoria:!1,version:"3.5"},哑谜:{dmg:"reality",roles:["shield","sustain","support","dynamo"],euphoria:!1,version:"3.6"},小瑞安侬:{dmg:"mental",roles:["support","sustain"],euphoria:!1,version:"3.7"},珐琅眼:{dmg:"reality",roles:["dps","conduit","support"],euphoria:!1,version:"3.7"},银装小春雀儿:{dmg:"reality",roles:["sub-dps","support","ultimate","extra-action"],euphoria:!1,version:"3.7"},无名者:{dmg:"mental",roles:["dps","ultimate"],euphoria:!1,version:"3.7"},回声谣:{dmg:"reality",roles:["heal","sustain","support","conduit"],euphoria:!1,version:"3.8"},奠基石:{dmg:"reality",roles:["dps","counter","shield"],euphoria:!1,version:"3.8"},双生舞伶:{dmg:"reality",roles:["dps","conduit"],euphoria:!1,version:"S02"},诺拉:{dmg:"reality",roles:["support","sub-dps"],euphoria:!1,version:"S02"},赫多涅:{dmg:"reality",roles:["support","sub-dps","conduit"],euphoria:!1,version:"3.9"},纳西索斯:{dmg:"mental",roles:["heal","sustain","support","ultimate"],euphoria:!1,version:"3.9"},狩勋女巫红弩箭:{dmg:"reality",roles:["dps","pursuit","extra-action"],euphoria:!1,version:"4.0"},格林杜尔:{dmg:"reality",roles:["sub-dps","support","extra-action"],euphoria:!1,version:"4.0"},德雷克:{dmg:"mental",roles:["sub-dps","support","lingering-glow"],euphoria:!1,version:"4.0"},佩施塔:{dmg:"reality",roles:["heal","sustain","support","pursuit"],euphoria:!1,version:"4.1"},伊芙琳:{dmg:"reality",roles:["dps","ultimate"],euphoria:!1,version:"4.1"}};function wn(e,t){return e==="mental"?t==="zh"?"精神创伤":"Mental DMG":t==="zh"?"现实创伤":"Reality DMG"}function _n(e,t){return(e||[]).map(a=>{let n=Ra[a];return n?t==="zh"?n.zh:n.en:a})}function Rn(e,t=E()){let a="https://uttu.merui.net/profiles",n=te(e);if(n){let c=Ln[n.name]||{dmg:"reality",roles:["dps"],euphoria:!1,version:""},l=t==="zh"?n.name:n.en||n.name,u=t==="zh"?`https://res1999.huijiwiki.com/wiki/${encodeURIComponent(n.name)}`:`https://reverse1999.fandom.com/wiki/${encodeURIComponent(String(n.en||n.name).replace(/ /g,"_"))}`;return{...n,cn:n.name,en:n.en,displayName:l,dmg:c.dmg,dmgLabel:wn(c.dmg,t),roles:[...c.roles],roleLabels:_n(c.roles,t),euphoria:!!c.euphoria,version:c.version,wikiUrl:u,uttuUrl:a}}let o=pt(e);if(o){let c=["impromptu","dps"],l=t==="zh"?o.cn:o.en,u=t==="zh"?"https://res1999.huijiwiki.com/wiki/%E5%8D%B3%E5%85%B4%E5%92%92%E8%AF%AD":"https://reverse1999.fandom.com/wiki/Impromptu_Incantation";return{id:null,name:o.cn,cn:o.cn,en:o.en,aff:o.aff||"unknown",star:6,portrait:"",displayName:l,dmg:"mental",dmgLabel:wn("mental",t),roles:c,roleLabels:_n(c,t),euphoria:!1,version:"2.4",wikiUrl:u,uttuUrl:a}}return null}var kn=["impromptu","bloodtithe","dynamo","lingering-glow","conduit","pursuit","poison","burn","rank-up","extra-action","ultimate","counter","shield"],dr=new Map([["impromptu",1.35],["bloodtithe",1.35],["dynamo",1.35],["lingering-glow",1.35],["conduit",1.35],["pursuit",1.35],["poison",1.3],["burn",1.25],["rank-up",1.25],["extra-action",1],["ultimate",1],["counter",1.05],["shield",.85]]);function Pn(e,t="",a=E()){let n=Ue(e,t),o=new Map,c=new Map,l=(y,h)=>{let v=dr.get(y);v&&o.set(y,(o.get(y)||0)+h*v)},u=(y,h,v)=>{if(!y)return;let S=Ln[y.name];if(S?.roles)for(let A of S.roles)l(A,h);v&&y.aff&&y.aff!=="unknown"&&c.set(y.aff,(c.get(y.aff)||0)+1)},m=new Set;for(let y of n)if(y.type==="char"&&y.char)m.add(y.char.id),u(y.char,1.5,!0);else if(y.type==="archetype"&&y.special)l("impromptu",3.5),y.special.aff&&y.special.aff!=="unknown"&&c.set(y.special.aff,(c.get(y.special.aff)||0)+1);else if(y.type==="flex"&&Array.isArray(y.chars)&&y.chars.length){let h=.9/y.chars.length;for(let S of y.chars)u(S,h,!1);let v=new Set(y.chars.map(S=>S.aff).filter(S=>S&&S!=="unknown"));if(v.size===1){let S=[...v][0];c.set(S,(c.get(S)||0)+1)}}let p=String(t??"").trim();if(p){let y=p.split(/[/／+、,，]/).map(h=>h.trim()).filter(Boolean);for(let h of y){let v=pt(h);if(v){l("impromptu",3.5),c.size===0&&v.aff&&v.aff!=="unknown"&&c.set(v.aff,(c.get(v.aff)||0)+1);continue}let S=te(h);S&&u(S,1.8,!m.has(S.id)&&c.size===0)}}let f=[...o.entries()].filter(([,y])=>y>=1.2).sort((y,h)=>Math.abs(h[1]-y[1])>.05?h[1]-y[1]:kn.indexOf(y[0])-kn.indexOf(h[0])),d=[];for(let[y,h]of f){if(d.length>=2||d.length===1&&h<f[0][1]*.45)break;y==="shield"&&d.length>=1&&!d.includes("counter")||d.push(y)}let b=d.map(y=>{let h=Ra[y];return{key:y,label:h?a==="zh"?h.zh:h.en:y}}),g=[...c.entries()].sort((y,h)=>h[1]-y[1]).map(([y,h])=>{let v=ge[y]||ge.unknown;return{aff:y,label:a==="zh"?v.label:v.enLabel,count:h}});return{archetypes:b,afflatusCounts:g}}var Yt={en:new Map,zh:new Map},Bn=new Map,Zt={en:[],zh:[]},_s=new Map,ks=[];function Pa(e){return String(e||E()).trim().toLowerCase().startsWith("en")?"en":"zh"}function Fn(e,t,a,n){let o=Pa(e);if(t&&typeof t=="object"){let c=Yt[o];c.clear();for(let[l,u]of Object.entries(t))c.set(l,u),_s.set(l,u);if(c.has("生命的饥馑")&&!c.has("生命的饥谨")){let l=c.get("生命的饥馑");c.set("生命的饥谨",l),_s.set("生命的饥谨",l)}}if(a&&typeof a=="object")for(let[c,l]of Object.entries(a))Bn.set(String(c).toLowerCase(),l);Array.isArray(n)&&(Zt[o]=n,ks.length=0,ks.push(...n))}function pr(e){if(Yt[e].size)return Yt[e];let t=e==="en"?"zh":"en";return Yt[t].size?Yt[t]:_s}function ur(e){if(Zt[e].length)return Zt[e];let t=e==="en"?"zh":"en";return Zt[t].length?Zt[t]:ks}function Nn(e,t){let a=String(e??"").trim();if(!a)return null;let n=pr(t),o=n.get(a);if(!o){let c=Bn.get(a.toLowerCase());c&&(o=n.get(c))}return o||null}function zn(e,t=E()){let a=Pa(t),n=Nn(e,a);return n?{turns:n.turns,nameEn:n.nameEn,modeTag:n.modeTag||"",battlefield:n.battlefield||"",favoredText:n.favoredText||"",envRules:n.envRules||[],passives:n.passives||[],counterTips:n.counterTips||[],thresholds:n.thresholds||[]}:null}function Cs(e,t,a=E()){let n=Pa(a),c=Nn(e,n)?.thresholds||null;if(!Array.isArray(c)||c.length===0)return{currentStage:0,roman:"",scoreLabel:"",desc:"",nextStage:null,thresholds:[]};let l=Number(typeof t=="string"?t.replace(/,/g,"").trim():t),u=Number.isFinite(l)?l:0,m=0,p=c.map((b,g)=>{let y=Number(b.minScore)||0,h=u>=y;return h&&(m=g+1),{stage:g+1,roman:b.roman||"",minScore:y,score:b.score,scoreLabel:b.score,desc:b.desc,reached:h}}),f=m>0?p[m-1]:null,d=m<p.length?p[m]:null;return{currentStage:m,roman:f?f.roman:"",scoreLabel:f?f.scoreLabel:"",desc:f?f.desc:"",nextStage:d?{roman:d.roman,minScore:d.minScore,scoreLabel:d.scoreLabel,desc:d.desc}:null,thresholds:p}}function ws(e){return e?{stageNo:e.stageNo,code:e.code,name:e.name||e.nameCn||e.nameEn||"",modeTag:e.modeTag||"",enemies:e.enemies||"",envRules:e.envRules||[],passives:e.passives||[],counterTips:e.counterTips||[]}:null}function jn(e,t=E()){if(e==null)return null;let a=Pa(t),n=ur(a);if(typeof e=="number"){let p=n.find(f=>f.stageNo===e)||null;return ws(p)}let c=(typeof e=="string"?e:String(e.name||"")).toLowerCase(),l=n.find(p=>(p.match||[]).some(f=>c.includes(String(f).toLowerCase())));if(l)return ws(l);let u=Number(typeof e=="object"?e.stage_no||e.stageNo:e),m=n.find(p=>p.stageNo===u)||null;return ws(m)}var Es=[{key:"全部",zh:"全部",en:"All",shortEn:"All"},{key:"攻击",zh:"攻击",en:"ATK",shortEn:"ATK",wikiTagId:"1"},{key:"暴击",zh:"暴击",en:"Critical",shortEn:"Crit",wikiTagId:"2"},{key:"辅助",zh:"辅助",en:"Support",shortEn:"Support",wikiTagId:"5"},{key:"生存",zh:"生存",en:"Survival",shortEn:"Survival",wikiTagId:"4"},{key:"治疗",zh:"治疗",en:"Heal",shortEn:"Healing",wikiTagId:"3"}],Jt=new Map;for(let e of Es)Jt.set(e.key,e),Jt.set(e.en.toLowerCase(),e),Jt.set(e.shortEn.toLowerCase(),e);var On={攻击力:"ATK",生命值:"HP",暴击率:"Critical Rate",暴击创伤:"Critical DMG",创伤加成:"DMG Bonus",受创减免:"DMG Taken Reduction",受创回复:"DMG Heal",术法威力:"Incantation Might",仪式威力:"Ultimate Might",治疗率:"Healing Done",现实防御:"Reality DEF",精神防御:"Mental DEF"},ut=[{id:"1581",name:"可食用谜题",en:"An Edible Puzzle",star:6,version:"4.1",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:3e3,rDef:150,mDef:150}},{id:"1580",name:"纯洁的棺床",en:"The Coffin of Purity",star:6,version:"4.1",stat:"受创回复",statEn:"DMG Heal",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:360,hp:3200,rDef:160,mDef:160}},{id:"1579",name:"灵知当齐一",en:"Flows in All Things Alike",star:6,version:"4.0",stat:"攻击力",statEn:"ATK",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:380,hp:3e3,rDef:150,mDef:150}},{id:"1578",name:"宿命之向背",en:"To Choose Against Fate",star:6,version:"4.0",stat:"暴击创伤",statEn:"Critical DMG",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:380,hp:3e3,rDef:150,mDef:150}},{id:"1577",name:"立于风暴脊",en:"Atop the Tempest",star:6,version:"4.0",stat:"攻击力",statEn:"ATK",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:3e3,rDef:150,mDef:150}},{id:"1576",name:"拢于心潮间",en:"Tides Held Within",star:6,version:"3.9",stat:"攻击力",statEn:"ATK",tags:["治疗","辅助"],tagsEn:["Heal","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1575",name:"宣告以弦鸣",en:"Arrow of Verdict",star:6,version:"3.9",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:3200,rDef:150,mDef:150}},{id:"1574",name:"光影的栖所",en:"Where Light and Shadows Rest",star:6,version:"3.8",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2800,rDef:160,mDef:160}},{id:"1573",name:"光之外的梦",en:"A Dream Beyond Light",star:6,version:"3.8",stat:"攻击力",statEn:"ATK",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1572",name:"科学编舞法",en:"The Dance of Science",star:6,version:"s02",stat:"暴击创伤",statEn:"Critical DMG",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:3e3,rDef:160,mDef:140}},{id:"1571",name:"艺术原子能",en:"The Art of Atoms",star:6,version:"s02",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:3e3,rDef:140,mDef:160}},{id:"1570",name:"圣歌应缄默",en:"The Silent Anthem",star:6,version:"3.7",stat:"暴击创伤",statEn:"Critical DMG",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:380,hp:3e3,rDef:160,mDef:140}},{id:"1569",name:"蜕至我为我",en:"Until I Am Me",star:6,version:"3.7",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:3e3,rDef:140,mDef:160}},{id:"1568",name:"昨日雨声轻",en:"The Soft Rain of Yesterday",star:6,version:"3.7",stat:"受创减免",statEn:"DMG Taken Reduction",tags:["辅助"],tagsEn:["Support"],stats60:{atk:390,hp:3e3,rDef:160,mDef:160}},{id:"1567",name:"解答的边界",en:"The Riddle's Limit",star:6,version:"3.6",stat:"攻击力",statEn:"ATK",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:3200,rDef:140,mDef:140}},{id:"1566",name:"世界多喧闹",en:"Drown Out the Hustle",star:6,version:"3.5",stat:"攻击力",statEn:"ATK",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:2800,rDef:140,mDef:160}},{id:"1565",name:"振翅一瞬间",en:"The Fluttering Moment",star:6,version:"3.5",stat:"暴击率",statEn:"Critical Rate",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:380,hp:2800,rDef:160,mDef:140}},{id:"1564",name:"功名尘与土",en:"All Honor is but Dust",star:6,version:"3.4",stat:"攻击力",statEn:"ATK",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:2600,rDef:150,mDef:150}},{id:"1563",name:"天地一悠游",en:"Wayfarer of the Dao",star:6,version:"3.4",stat:"暴击创伤",statEn:"Critical DMG",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:390,hp:2800,rDef:150,mDef:150}},{id:"1562",name:"行至阿刻戎",en:"Across the Acheron",star:6,version:"3.3",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:2800,rDef:150,mDef:150}},{id:"1561",name:"我心如赤焰",en:"Singleness of Heart",star:6,version:"3.3",stat:"暴击率",statEn:"Critical Rate",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1560",name:"无意识梦魇",en:"Shadows in the Subconscious",star:6,version:"3.2",stat:"攻击力",statEn:"ATK",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:370,hp:2600,rDef:160,mDef:160}},{id:"1559",name:"跃过命运线",en:"Her Willful Leap",star:6,version:"3.2",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1558",name:"千万次应验",en:"The Thousandfold Fate",star:6,version:"3.2",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:390,hp:2600,rDef:150,mDef:150}},{id:"1557",name:"生者的苦旅",en:"Bitter March of the Living",star:6,version:"3.1",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1556",name:"流浪即兴曲",en:"The Wandering Improviser",star:6,version:"3.1",stat:"生命值",statEn:"HP",tags:["治疗","生存","辅助"],tagsEn:["Heal","Survival","Support"],stats60:{atk:320,hp:3800,rDef:160,mDef:160}},{id:"1555",name:"汇入涓流中",en:"Into the Gentle Current",star:6,version:"s01",stat:"生命值",statEn:"HP",tags:["暴击","生存"],tagsEn:["Critical","Survival"],stats60:{atk:360,hp:3800,rDef:140,mDef:140}},{id:"1554",name:"向种子呢喃",en:"Buds Yet to Bloom",star:6,version:"3.0",stat:"暴击率",statEn:"Critical Rate",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1553",name:"归乡哀悼词",en:"Homecoming Lament",star:6,version:"3.0",stat:"生命值",statEn:"HP",tags:["暴击","生存"],tagsEn:["Critical","Survival"],stats60:{atk:360,hp:3800,rDef:140,mDef:140}},{id:"1552",name:"史诗的终点",en:"An Epic's End",star:6,version:"s01",stat:"攻击力",statEn:"ATK",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1551",name:"钟响于暮色",en:"As the Bell Tolls",star:6,version:"s01",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1550",name:"思维一激灵",en:"A Tingle of a Thought",star:6,version:"2.8",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1549",name:"家庭指导员",en:"Family Mentor",star:6,version:"2.8",stat:"生命值",statEn:"HP",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1548",name:"心音墓志铭",en:"Embrace the Past",star:6,version:"2.8",stat:"生命值",statEn:"HP",tags:["暴击","生存"],tagsEn:["Critical","Survival"],stats60:{atk:390,hp:4300,rDef:90,mDef:90}},{id:"1547",name:"春日轻步至",en:"Aurora After Winter",star:6,version:"2.7",stat:"生命值",statEn:"HP",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:360,hp:3e3,rDef:160,mDef:160}},{id:"1546",name:"双焦点问答",en:"Never-Ending Q&A",star:6,version:"2.7",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2800,rDef:150,mDef:150}},{id:"1545",name:"脑室即囚室",en:"Mental Cage",star:6,version:"2.6",stat:"术法威力",statEn:"Incantation Might",tags:["攻击","辅助"],tagsEn:["ATK","Support"],stats60:{atk:380,hp:2800,rDef:160,mDef:150}},{id:"1544",name:"最后的投掷",en:"The Final Roll",star:6,version:"2.6",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2800,rDef:150,mDef:160}},{id:"1543",name:"造梦的预演",en:"Rehearsal of Dreams",star:6,version:"2.5",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:360,hp:2800,rDef:160,mDef:160}},{id:"1542",name:"收到请回答",en:"Ready on Call",star:6,version:"2.5",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:390,hp:2600,rDef:150,mDef:150}},{id:"1541",name:"惶然的贝壳",en:"Cracks in the Shell",star:6,version:"2.4",stat:"攻击力",statEn:"ATK",tags:["治疗","辅助"],tagsEn:["Heal","Support"],stats60:{atk:360,hp:2800,rDef:160,mDef:160}},{id:"1540",name:"离别变奏曲",en:"Addio Coda",star:6,version:"2.4",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2800,rDef:140,mDef:160}},{id:"1539",name:"秒针栖息地",en:"On the Hand of Time",star:6,version:"2.3",stat:"暴击创伤",statEn:"Critical DMG",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2600,rDef:160,mDef:160}},{id:"1538",name:"无韵律跳步",en:"Offbeat Strides",star:6,version:"2.3",stat:"攻击力",statEn:"ATK",tags:["攻击","生存"],tagsEn:["ATK","Survival"],stats60:{atk:360,hp:2800,rDef:160,mDef:160}},{id:"1537",name:"第三次信任",en:"The Third Commitment",star:6,version:"2.2",stat:"生命值",statEn:"HP",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:340,hp:2800,rDef:160,mDef:160}},{id:"1536",name:"非物质真情",en:"Transcendent Love",star:6,version:"2.2",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:390,hp:2600,rDef:150,mDef:150}},{id:"1535",name:"微渺的愿景",en:"Tiny Wish",star:6,version:"2.3",stat:"生命值",statEn:"HP",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:340,hp:3e3,rDef:160,mDef:160}},{id:"1534",name:"寻入夜深处",en:"Stray Off the Path",star:6,version:"2.1",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2600,rDef:150,mDef:150}},{id:"1533",name:"女佣看见了",en:"And the Maid Says",star:6,version:"2.1",stat:"暴击率",statEn:"Critical Rate",tags:["辅助","暴击"],tagsEn:["Support","Critical"],stats60:{atk:360,hp:2600,rDef:160,mDef:160}},{id:"1532",name:"漫行如泉流",en:"Starlight Wellspring",star:6,version:"2.0",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:380,hp:2200,rDef:150,mDef:170}},{id:"1531",name:"不可诉之轻",en:"The Unbearable Lightness",star:6,version:"2.0",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:370,hp:2200,rDef:170,mDef:160}},{id:"1530",name:"来自最深处",en:"From the Depths",star:6,version:"2.0",stat:"术法威力",statEn:"Incantation Might",tags:["攻击","生存"],tagsEn:["ATK","Survival"],stats60:{atk:380,hp:1600,rDef:180,mDef:190}},{id:"1529",name:"渐近的雨声",en:"Approaching Rain",star:6,version:"1.9",stat:"术法威力",statEn:"Incantation Might",tags:["生存"],tagsEn:["Survival"],stats60:{atk:340,hp:2800,rDef:190,mDef:150}},{id:"1528",name:"勇敢者赠言",en:"The Fighter's Best Wishes",star:6,version:"1.9",stat:"生命值",statEn:"HP",tags:["生存"],tagsEn:["Survival"],stats60:{atk:300,hp:2800,rDef:170,mDef:190}},{id:"1527",name:"行进的步音",en:"Steps Forward",star:6,version:"1.9",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:390,hp:2e3,rDef:160,mDef:160}},{id:"1526",name:"故尝试证明",en:"For Rehabilitation",star:6,version:"1.8",stat:"暴击率",statEn:"Critical Rate",tags:["暴击","攻击"],tagsEn:["Critical","ATK"],stats60:{atk:360,hp:2100,rDef:180,mDef:180}},{id:"1525",name:"黎明将到来",en:"Dawn Is Coming",star:6,version:"1.8",stat:"治疗率",statEn:"Healing Done",tags:["治疗"],tagsEn:["Heal"],stats60:{atk:360,hp:2700,rDef:150,mDef:180}},{id:"1524",name:"另一个故事",en:"Another Story",star:6,version:"1.7",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:2200,rDef:140,mDef:180}},{id:"1523",name:"敲响这窄门",en:"Knock on the Door",star:6,version:"1.7",stat:"暴击率",statEn:"Critical Rate",tags:["暴击"],tagsEn:["Critical"],stats60:{atk:380,hp:2400,rDef:150,mDef:160}},{id:"1522",name:"此刻无新事",en:"Same Old Story",star:6,version:"1.6",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:370,hp:1900,rDef:160,mDef:170}},{id:"1521",name:"在四方城外",en:"Outside the City",star:6,version:"1.6",stat:"暴击率",statEn:"Critical Rate",tags:["暴击"],tagsEn:["Critical"],stats60:{atk:370,hp:2400,rDef:170,mDef:160}},{id:"1515",name:"漫长悄悄话",en:"Long Night Talk",star:6,version:"1.5",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:2e3,rDef:170,mDef:160}},{id:"1514",name:"请保持平衡",en:"Balance, Please",star:6,version:"1.4",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:2200,rDef:170,mDef:170}},{id:"1513",name:"沉默与向往",en:"Silent and Adoring",star:6,version:"1.4",stat:"攻击力",statEn:"ATK",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:350,hp:2e3,rDef:170,mDef:170}},{id:"1512",name:"可度量之心",en:"The Carat of a Heart",star:6,version:"1.3",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:340,hp:2600,rDef:160,mDef:160}},{id:"1511",name:"在仙境之外",en:"Beyond Wonderland",star:6,version:"1.2",stat:"生命值",statEn:"HP",tags:["攻击","暴击","治疗"],tagsEn:["ATK","Critical","Heal"],stats60:{atk:350,hp:2600,rDef:150,mDef:160}},{id:"1510",name:"必要的记录",en:"His Bounden Duty",star:6,version:"1.0",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击","治疗"],tagsEn:["ATK","Heal"],stats60:{atk:410,hp:2e3,rDef:160,mDef:160}},{id:"1509",name:"大娱乐至上",en:"Luxurious Leisure",star:6,version:"1.1",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:380,hp:2200,rDef:170,mDef:170}},{id:"1508",name:"好奇心宝贝",en:"That Inquisitive Dear",star:6,version:"1.0",stat:"治疗率",statEn:"Healing Done",tags:["治疗"],tagsEn:["Heal"],stats60:{atk:360,hp:2600,rDef:180,mDef:160}},{id:"1507",name:"掌声如雷鸣",en:"Thunderous Applause",star:6,version:"1.0",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:330,hp:2200,rDef:180,mDef:170}},{id:"1504",name:"夜色亵渎者",en:"Blasphemer of Night",star:6,version:"1.0",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:360,hp:2200,rDef:180,mDef:180}},{id:"1503",name:"第二次生命",en:"Her Second Life",star:6,version:"1.0",stat:"攻击力",statEn:"ATK",tags:["治疗"],tagsEn:["Heal"],stats60:{atk:350,hp:2800,rDef:120,mDef:220}},{id:"1502",name:"跳房子游戏",en:"Hopscotch",star:6,version:"1.0",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:370,hp:2200,rDef:150,mDef:200}},{id:"1501",name:"美丽新世界",en:"Brave New World",star:6,version:"1.0",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:370,hp:2200,rDef:200,mDef:150}},{id:"4104",name:"笑语欢声",en:"Laughter and Laughter",star:5,version:"1.0",stat:"受创减免",statEn:"DMG Taken Reduction",tags:["治疗","生存"],tagsEn:["Heal","Survival"],stats60:{atk:280,hp:2200,rDef:150,mDef:150}},{id:"4103",name:"自由的心",en:"A Free Heart",star:5,version:"1.0",stat:"生命值",statEn:"HP",tags:["生存"],tagsEn:["Survival"],stats60:{atk:260,hp:2200,rDef:160,mDef:160}},{id:"1452",name:"完满之路",en:"The Path to Perfection",star:5,version:"4.1",stat:"创伤加成",statEn:"DMG Bonus",tags:["辅助"],tagsEn:["Support"],stats60:{atk:340,hp:2e3,rDef:130,mDef:130}},{id:"1451",name:"当下之喜",en:"Living in the Moment",star:5,version:"4.0",stat:"暴击率",statEn:"Critical Rate",tags:["暴击","辅助"],tagsEn:["Critical","Support"],stats60:{atk:340,hp:2e3,rDef:130,mDef:130}},{id:"1450",name:"以饰真相",en:"Dressing Up the Truth",star:5,version:"3.9",stat:"攻击力",statEn:"ATK",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:360,hp:1800,rDef:120,mDef:120}},{id:"1449",name:"暂别旧夜",en:"Farewell to the Old Night",star:5,version:"3.8",stat:"生命值",statEn:"HP",tags:["辅助"],tagsEn:["Support"],stats60:{atk:340,hp:2200,rDef:120,mDef:120}},{id:"1448",name:"成长阵痛",en:"Growing Pains",star:5,version:"3.7",stat:"攻击力",statEn:"ATK",tags:["辅助"],tagsEn:["Support"],stats60:{atk:360,hp:1800,rDef:120,mDef:120}},{id:"1447",name:"天助自助",en:"Luck Be a Lady",star:5,version:"3.5",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:360,hp:1800,rDef:120,mDef:120}},{id:"1446",name:"无事听风",en:"The Wind's Listener",star:5,version:"3.4",stat:"创伤加成",statEn:"DMG Bonus",tags:["辅助"],tagsEn:["Support"],stats60:{atk:340,hp:2e3,rDef:130,mDef:130}},{id:"1445",name:"世多别离",en:"Parting's Quiet Lament",star:5,version:"3.3",stat:"暴击创伤",statEn:"Critical DMG",tags:["辅助"],tagsEn:["Support"],stats60:{atk:340,hp:2e3,rDef:130,mDef:130}},{id:"1444",name:"“倒影”所指",en:"In Their Figures",star:5,version:"3.2",stat:"创伤加成",statEn:"DMG Bonus",tags:["辅助"],tagsEn:["Support"],stats60:{atk:340,hp:2e3,rDef:130,mDef:130}},{id:"1443",name:"碑文已逝",en:"Faded Epitaphs",star:5,version:"3.1",stat:"生命值",statEn:"HP",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1442",name:"偷天换日",en:"Substitutes and Simulacra",star:5,version:"3.0",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:260,hp:2600,rDef:140,mDef:140}},{id:"1441",name:"路边尘埃",en:"Dust on the Roadside",star:5,version:"2.8",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1440",name:"新旧歌谣",en:"Melodies Old and New",star:5,version:"2.7",stat:"生命值",statEn:"HP",tags:["治疗","辅助"],tagsEn:["Heal","Support"],stats60:{atk:260,hp:2600,rDef:150,mDef:150}},{id:"1439",name:"镜头注脚",en:"Off the Scene",star:5,version:"2.6",stat:"生命值",statEn:"HP",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:260,hp:2600,rDef:200,mDef:100}},{id:"1438",name:"惊魂拍档",en:"Your Friendly Exorcist",star:5,version:"2.5",stat:"攻击力",statEn:"ATK",tags:["辅助"],tagsEn:["Support"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1437",name:"纵情一曲",en:"Belt It Out",star:5,version:"2.4",stat:"攻击力",statEn:"ATK",tags:["辅助"],tagsEn:["Support"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1436",name:"迷途以外",en:"One with the Flow",star:5,version:"2.3",stat:"生命值",statEn:"HP",tags:["生存","辅助"],tagsEn:["Survival","Support"],stats60:{atk:280,hp:2400,rDef:150,mDef:150}},{id:"1435",name:"留置心底",en:"The Severed and the Rest",star:5,version:"2.2",stat:"精神防御",statEn:"Mental DEF",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1434",name:"落于现象",en:"Falling for a Sweet Phenomenon",star:5,version:"2.2",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:360,hp:1900,rDef:120,mDef:120}},{id:"1433",name:"无人问津",en:"The Loner",star:5,version:"2.1",stat:"生命值",statEn:"HP",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:280,hp:2600,rDef:140,mDef:140}},{id:"1432",name:"绘声绘色",en:"Spinning Yarns",star:5,version:"2.1",stat:"攻击力",statEn:"ATK",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:300,hp:2200,rDef:140,mDef:140}},{id:"1431",name:"自食苦果",en:"You Deserve It",star:5,version:"2.0",stat:"治疗率",statEn:"Healing Done",tags:["攻击","治疗"],tagsEn:["ATK","Heal"],stats60:{atk:330,hp:1900,rDef:150,mDef:130}},{id:"1430",name:"黯然失色",en:"Her Mournful Face",star:5,version:"2.0",stat:"攻击力",statEn:"ATK",tags:["攻击","治疗"],tagsEn:["ATK","Heal"],stats60:{atk:360,hp:1900,rDef:130,mDef:120}},{id:"1429",name:"踽踽独行",en:"Going Along Alone",star:5,version:"1.9",stat:"攻击力",statEn:"ATK",tags:["暴击"],tagsEn:["Critical"],stats60:{atk:320,hp:2100,rDef:140,mDef:130}},{id:"1428",name:"形影相随",en:"In the Shadow",star:5,version:"1.9",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:360,hp:1100,rDef:150,mDef:140}},{id:"1427",name:"无声注视",en:"Silent Gaze",star:5,version:"1.8",stat:"攻击力",statEn:"ATK",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:310,hp:1800,rDef:150,mDef:140}},{id:"1426",name:"夜夜亦然",en:"Night After Night",star:5,version:"1.8",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:340,hp:1500,rDef:140,mDef:140}},{id:"1425",name:"齿轮之外",en:"Beyond the Gears",star:5,version:"1.7",stat:"仪式威力",statEn:"Ultimate Might",tags:["暴击"],tagsEn:["Critical"],stats60:{atk:310,hp:2e3,rDef:140,mDef:150}},{id:"1424",name:"昨日往事",en:"His Tail",star:5,version:"1.7",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:320,hp:1900,rDef:140,mDef:140}},{id:"1423",name:"崭新一页",en:"A New Leaf",star:5,version:"1.6",stat:"受创减免",statEn:"DMG Taken Reduction",tags:["生存"],tagsEn:["Survival"],stats60:{atk:280,hp:2200,rDef:150,mDef:150}},{id:"1422",name:"茶歇时间",en:"Tea Break",star:5,version:"1.6",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:320,hp:1900,rDef:140,mDef:140}},{id:"1421",name:"勇往直前",en:"Let's Set Sail",star:5,version:"1.5",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:300,hp:2e3,rDef:150,mDef:140}},{id:"1420",name:"步此苦旅",en:"Take the Hard Journey",star:5,version:"1.5",stat:"治疗率",statEn:"Healing Done",tags:["治疗"],tagsEn:["Heal"],stats60:{atk:280,hp:2e3,rDef:150,mDef:160}},{id:"1414",name:"荒唐余生",en:"Remaining Absurdity",star:5,version:"1.4",stat:"现实防御",statEn:"Reality DEF",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:280,hp:2e3,rDef:190,mDef:120}},{id:"1413",name:"食足餮满",en:"A Satisfied Eater",star:5,version:"1.4",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:310,hp:2e3,rDef:140,mDef:140}},{id:"1411",name:"远大前程",en:"Her Bright Future",star:5,version:"1.0",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:300,hp:2e3,rDef:150,mDef:140}},{id:"1407",name:"午后小憩",en:"An Afternoon Nap",star:5,version:"1.0",stat:"暴击率",statEn:"Critical Rate",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:280,hp:2e3,rDef:140,mDef:140}},{id:"1405",name:"示我以真",en:"Decode",star:5,version:"1.0",stat:"治疗率",statEn:"Healing Done",tags:["治疗","生存"],tagsEn:["Heal","Survival"],stats60:{atk:300,hp:1800,rDef:150,mDef:150}},{id:"1404",name:"无束无拘",en:"The Footloose",star:5,version:"1.0",stat:"仪式威力",statEn:"Ultimate Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:310,hp:2e3,rDef:140,mDef:140}},{id:"1402",name:"明日亦然",en:"Tomorrow Also",star:5,version:"1.0",stat:"暴击创伤",statEn:"Critical DMG",tags:["攻击","暴击"],tagsEn:["ATK","Critical"],stats60:{atk:290,hp:2e3,rDef:140,mDef:160}},{id:"1401",name:"心驰神往",en:"Yearning Desire",star:5,version:"1.0",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:300,hp:1800,rDef:160,mDef:140}},{id:"1310",name:"静谧",en:"Meek",star:4,version:"1.0",stat:"治疗率",statEn:"Healing Done",tags:["治疗"],tagsEn:["Heal"],stats60:{atk:210,hp:1400,rDef:110,mDef:110}},{id:"1309",name:"绿毒",en:"Venomous",star:4,version:"1.0",stat:"创伤加成",statEn:"DMG Bonus",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:220,hp:1200,rDef:120,mDef:110}},{id:"1308",name:"无餍",en:"Covet",star:4,version:"1.0",stat:"暴击率",statEn:"Critical Rate",tags:["暴击"],tagsEn:["Critical"],stats60:{atk:200,hp:1400,rDef:110,mDef:110}},{id:"1307",name:"崇奉",en:"Bow",star:4,version:"1.0",stat:"术法威力",statEn:"Incantation Might",tags:["攻击"],tagsEn:["ATK"],stats60:{atk:220,hp:1300,rDef:110,mDef:110}},{id:"1306",name:"领航",en:"Navigating",star:4,version:"1.0",stat:"受创减免",statEn:"DMG Taken Reduction",tags:["生存"],tagsEn:["Survival"],stats60:{atk:190,hp:1400,rDef:120,mDef:120}}],Ia={en:new Map,zh:new Map};function Hn(e,t){let a=String(e||"").trim().toLowerCase().startsWith("en")?"en":"zh";if(!t||typeof t!="object")return;let n=Ia[a];n.clear();for(let[o,c]of Object.entries(t))n.set(String(o),c)}var Xt=new Map,Ct=new Map;for(let e of ut)Xt.set(String(e.id),e),Ct.set(e.name.normalize("NFKC").trim().toLowerCase(),e),e.en&&Ct.set(e.en.normalize("NFKC").trim().toLowerCase(),e);var mr=new Map([["the unknown artist","1433"],["the carat of a heart","1512"]]);for(let[e,t]of mr.entries()){let a=Xt.get(t);a&&!Ct.has(e)&&Ct.set(e,a)}function Qt(e){return`./assets/psychubes/bg_${[4,5,6].includes(Number(e))?Number(e):6}.webp`}function mt(e){return`./assets/psychubes/${e}.webp`}function Re(e){if(e&&typeof e=="object"&&e.id)return Xt.get(String(e.id))||e;let t=String(e??"").normalize("NFKC").trim();if(!t)return null;if(Xt.has(t))return Xt.get(t);let a=t.toLowerCase();if(Ct.has(a))return Ct.get(a);for(let n of ut)if(n.name.includes(t)||t.includes(n.name)||n.en&&n.en.toLowerCase()===a)return n;if(a.length>=4){for(let n of ut)if(n.en&&n.en.toLowerCase().includes(a))return n}return null}function Se(e,t=E()){let a=Re(e);return a?t==="zh"?a.name:a.en||a.name:String(e??"").trim()}function ft(e,t=E()){let a=typeof e=="object"&&e!==null?e:Re(e);if(!a){let n=String(e??"").trim();return t==="zh"?n:On[n]||n}return t==="zh"?a.stat:a.statEn||On[a.stat]||a.stat}function As(e,t=E()){let a=String(e??"").trim(),n=Jt.get(a)||Jt.get(a.toLowerCase());return n?t==="zh"?n.zh:n.en:a}function Gn(e,t){let a=String(t??"").normalize("NFKC").trim().toLowerCase();return a?e?!!(String(e.id||"").toLowerCase().includes(a)||String(e.name||"").normalize("NFKC").toLowerCase().includes(a)||String(e.en||"").normalize("NFKC").toLowerCase().includes(a)||String(e.stat||"").normalize("NFKC").toLowerCase().includes(a)||String(e.statEn||"").toLowerCase().includes(a)||String(e.version||"").toLowerCase().includes(a)||Array.isArray(e.tags)&&e.tags.some(n=>String(n).toLowerCase().includes(a))||Array.isArray(e.tagsEn)&&e.tagsEn.some(n=>String(n).toLowerCase().includes(a))):!1:!0}function Ms(e,t=E()){let a=Re(e);if(!a)return null;let n=String(t||E()).trim().toLowerCase().startsWith("en")?"en":"zh",o=Ia[n]?.get(String(a.id))||Ia.zh.get(String(a.id))||Ia.en.get(String(a.id))||null,c=Se(a,n),l=ft(a,n),u=n==="zh"?`https://res1999.huijiwiki.com/wiki/${encodeURIComponent(a.name)}`:`https://reverse1999.fandom.com/wiki/${encodeURIComponent(String(a.en||a.name).replace(/ /g,"_"))}`,m=o?.passive||"",p=o?.subStat||"";return{...a,displayName:c,displayStat:l,stats60:a.stats60?{...a.stats60,subStat:p,subStatEn:n==="en"?p:"",subStatZh:n==="zh"?p:""}:null,passiveEn:n==="en"?m:"",passiveZh:n==="zh"?m:"",passive:m,wikiUrl:u}}var ea={pos:{labelEn:"Pos Status",labelZh:"属性增益",badgeClass:"is-pos"},neg:{labelEn:"Neg Status",labelZh:"负面状态",badgeClass:"is-neg"},control:{labelEn:"Control",labelZh:"控制状态",badgeClass:"is-control"},stats:{labelEn:"Stats Down / Up",labelZh:"数值增减",badgeClass:"is-stats"},special:{labelEn:"Special / Force Field",labelZh:"特殊 / 术阵",badgeClass:"is-special"},boss:{labelEn:"Boss Mechanic",labelZh:"首领专属词条",badgeClass:"is-boss"}};function Kn(e){return String(e??"").normalize("NFKC").trim().replace(/^[\[\]【】「」『』]+|[\[\]【】「」『』]+$/g,"").replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/\s+/g," ").trim().toLowerCase()}var xs={en:new Map,zh:new Map};function Un(e){return String(e||E()).trim().toLowerCase().startsWith("en")?"en":"zh"}function Vn(e,t){let a=Un(e);if(!Array.isArray(t))return;let n=xs[a];n.clear();for(let o of t){let c=[o.key,o.en,o.zh,...o.aliases||[]];for(let l of c){let u=Kn(l);u&&!n.has(u)&&n.set(u,o)}}}function Ds(e,t=E()){let a=Kn(e);if(!a)return null;let n=Un(t),o=xs[n],c=xs[n==="en"?"zh":"en"],l=o.get(a)||c.get(a);if(!l)return null;let u=ea[l.category]||ea.special;return{...l,name:n==="zh"?l.zh:l.en,categoryLabel:n==="zh"?u.labelZh:u.labelEn,badgeClass:u.badgeClass,desc:l.desc??(n==="zh"?l.descZh:l.descEn)??""}}var Wn={en:{all:"All",pending:"Pending",approved:"Approved",rejected:"Rejected",removed:"Removed",local:"Local Archive"},zh:{all:"全部",pending:"待审核",approved:"已通过",rejected:"已拒绝",removed:"已移除",local:"本地存档"}},fr=["all","pending","approved","rejected"],et=20,U=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),br=new Intl.DateTimeFormat("en-US",{dateStyle:"short",timeStyle:"short",timeZone:"Asia/Shanghai"}),gr=new Intl.DateTimeFormat("zh-CN",{dateStyle:"short",timeStyle:"short",timeZone:"Asia/Shanghai"});function ze(e){return e==="en"||e==="zh"?e:typeof e=="string"&&e.trim()?e.trim().toLowerCase().startsWith("zh")?"zh":"en":typeof E=="function"?E():typeof document<"u"&&document.body?.dataset?.lang==="zh"?"zh":"en"}function tt(e){let t=ze(e);return typeof N=="function"?N(t):t!=="zh"}function hr(e){return tt(e)?Wn.en:Wn.zh}function yr(e,t){return typeof V=="function"?V(e,t):typeof Ne=="function"?Ne(e):String(e??"").trim()}function qn(e,t){let a=ze(t);if(typeof ae=="function"){let n=ae(e,a);if(n)return n}if(tt(a)){if(e==="zero")return"All P0";if(e==="max")return"Max Portray"}else{if(e==="zero")return"全 0 塑造";if(e==="max")return"全满塑造"}return String(e??"")}function vr(e,t){if(!e)return"";let a=e instanceof Date?e:new Date(e);return Number.isFinite(a.getTime())?(t?br:gr).format(a):String(e)}function $r(e,t){let a=Date.parse(e?.created_at||""),n=Date.parse(t?.created_at||""),o=Number.isFinite(a),c=Number.isFinite(n);return o&&c&&n!==a?n-a:o!==c?c?1:-1:String(t?.id??"").localeCompare(String(e?.id??""))}function Ba(e=ze()){let t=tt(e),a=t?"Email (Optional)":"联系方式（选填）",n=t?"e.g. yourname@example.com":"例如：QQ 123456789 或邮箱",o=t?"Used by moderators to contact you via email if clarification is needed. Never shown publicly.":"若成绩有疑问，方便管理员联系你。联系方式仅审核管理员可见。";return`<div class="field">
  <label for="submissionContact">${U(a)}</label>
  <input id="submissionContact" name="contact" maxlength="120" inputmode="${t?"email":"text"}"
    placeholder="${U(n)}" aria-describedby="submissionContactHint">
  <span class="field-hint" id="submissionContactHint">${U(o)}</span>
</div>`}var Yo=Ba();function Ts(e,t=ze()){let a=typeof e=="string"?e:(Array.isArray(e)?e[0]:e)?.contact;return a?`<p class="review-contact">${tt(t)?"Contact: ":"联系方式："}${U(a)}</p>`:""}function Ls(e,t,a=ze()){let n=tt(a),o=e.closest(".review-actions"),c=o.parentElement.querySelector(".rejection-form");if(c){c.elements.namedItem("reason").focus();return}let l=n?{ariaLabel:"Reject Submission",reasonLabel:"Rejection Reason",placeholder:"Enter 2–200 characters",hint:'The submitter can view this reason under "My Submissions".',cancel:"Cancel",confirm:"Confirm Reject",submitting:"Submitting…",lengthError:"Rejection reason must be 2–200 characters.",fallbackError:"Submission failed. Please try again."}:{ariaLabel:"拒绝成绩",reasonLabel:"拒绝理由",placeholder:"请填写 2–200 字",hint:"投稿者可以在「我的投稿」查看这条理由。",cancel:"取消",confirm:"确认拒绝",submitting:"正在提交…",lengthError:"拒绝理由需要 2–200 个字符。",fallbackError:"提交失败，请重试。"},u=document.createElement("form");u.className="rejection-form",u.noValidate=!0,u.setAttribute("aria-label",l.ariaLabel),u.innerHTML=`<label class="field">${U(l.reasonLabel)}
    <textarea name="reason" rows="3" maxlength="200" required placeholder="${U(l.placeholder)}"></textarea>
    <span class="field-hint">${U(l.hint)}</span>
  </label><p class="rejection-error" role="alert"></p>
  <div class="form-actions"><button type="button" class="outline-btn">${U(l.cancel)}</button>
    <button type="submit" class="danger-btn">${U(l.confirm)}</button></div>`;let m=u.elements.namedItem("reason"),p=u.querySelector('button[type="button"]'),f=u.querySelector('button[type="submit"]'),d=u.querySelector('[role="alert"]');function b(){u.remove(),e.isConnected&&e.focus()}p.addEventListener("click",b),u.addEventListener("keydown",g=>{g.key==="Escape"&&(g.preventDefault(),g.stopPropagation(),f.disabled||b())}),u.addEventListener("submit",async g=>{if(g.preventDefault(),g.stopPropagation(),f.disabled)return;let y=m.value.trim(),h=Array.from(y).length;if(h<2||h>200){d.textContent=l.lengthError,m.focus();return}d.textContent="",f.disabled=p.disabled=m.disabled=!0,f.textContent=l.submitting;try{await t(y),u.remove()}catch(v){d.textContent=v?.message||l.fallbackError,f.disabled=p.disabled=m.disabled=!1,f.textContent=l.confirm,m.focus()}}),o.after(u),m.focus()}function Yn(e,{client:t,ownerId:a,table:n,columns:o,describe:c,offlineRows:l=null,onClearOffline:u=null,lang:m=ze()}={}){let p=ze(m),f=tt(p),d=hr(p),b=Array.isArray(l),g=b?l:null,y=f?{heading:"My Submissions",subtitleOnline:"Track moderation progress for your current submitter identity. Guest submissions are stored per browser.",subtitleOffline:"Offline preview mode — showing submissions archived locally in this browser.",noIdentityTitle:"No submissions available to view",noIdentityBody:"Submit a score first, then return here to track review status and moderator notes.",filterAriaLabel:"Filter by review status",refresh:"Refresh ↻",clearOffline:"Clear Local Submissions",loading:"Loading submissions…",loadError:"Unable to load submission progress right now. Click Refresh to try again.",emptyOfflineTitle:"No local submissions yet",emptyOfflineBody:"Submit a run in offline preview mode to archive it locally in this browser.",emptyStatusTitle:"No submissions with this status",lineupPrefix:"Lineup · ",submittedPrefix:"Submitted ",rejectedLabel:"Rejection Reason: ",rejectedFallback:"No reason provided by moderator.",removedLabel:"Removal Reason: ",prevPage:"Previous",nextPage:"Next"}:{heading:"我的投稿",subtitleOnline:"查看当前投稿身份的审核进度。使用昵称投稿后，请在原浏览器查看。",subtitleOffline:"当前为离线预览模式，正在展示本浏览器中保存的本地存档投稿。",noIdentityTitle:"当前没有可查询的投稿",noIdentityBody:"提交成绩后，可以回到这里查看审核进度与管理员回复。",filterAriaLabel:"筛选审核状态",refresh:"刷新 ↻",clearOffline:"清空本地测试投稿",loading:"正在读取投稿…",loadError:"审核进度暂时无法读取，请点击刷新重试。",emptyOfflineTitle:"暂无本地测试投稿",emptyOfflineBody:"在离线预览模式下提交成绩后，会保存在本浏览器中并显示在这里。",emptyStatusTitle:"暂无此状态的投稿",lineupPrefix:"配队 · ",submittedPrefix:"投稿于 ",rejectedLabel:"拒绝理由：",rejectedFallback:"管理员未填写理由。",removedLabel:"移除原因：",prevPage:"上一页",nextPage:"下一页"};if(e.innerHTML=`<div class="section-header"><div><h2>${U(y.heading)}</h2>
    <p class="section-subtitle">${U(b?y.subtitleOffline:y.subtitleOnline)}</p>
    </div></div>`,!b&&(!t||!a)){e.insertAdjacentHTML("beforeend",`<div class="empty-state"><h3>${U(y.noIdentityTitle)}</h3><p>${U(y.noIdentityBody)}</p></div>`);return}let h=b&&g.length>0&&typeof u=="function";e.insertAdjacentHTML("beforeend",`<div class="moderation-tabs" role="group" aria-label="${U(y.filterAriaLabel)}">
    ${fr.map(B=>`<button class="outline-btn" type="button" data-status-filter="${B}" aria-pressed="false">${U(d[B])}</button>`).join("")}
    <button class="text-link-btn" type="button" data-progress-refresh>${U(y.refresh)}</button>
    ${h?`<button class="text-link-btn" type="button" data-progress-clear-offline>${U(y.clearOffline)}</button>`:""}
  </div><div data-progress-list aria-live="polite"></div>`);let v="all",S=0,A=0,_=e.querySelector("[data-progress-list]"),M=[...e.querySelectorAll("[data-status-filter]")],$=e.querySelector("[data-progress-clear-offline]");function k(B,R){let G=f?", ":"、";if(!B.length){b&&(!g||g.length===0)?_.innerHTML=`<div class="empty-state"><h3>${U(y.emptyOfflineTitle)}</h3><p>${U(y.emptyOfflineBody)}</p></div>`:_.innerHTML=`<div class="empty-state"><h3>${U(y.emptyStatusTitle)}</h3></div>`;return}_.innerHTML=B.map(T=>{let D=typeof c=="function"?c(T):{title:T?.id||"",summary:""},w=T?.status||(b?"approved":"pending"),I=b||!!(T?.isLocal||T?.offline||T?._local),F=d[w]||w,W=(Array.isArray(T?.team)?T.team:[]).map(x=>yr(x,p)).filter(Boolean).join(G),ne=vr(T?.created_at,f),re=w==="rejected"?`<p class="submission-reason"><strong>${U(y.rejectedLabel)}</strong>${U(T.review_note||y.rejectedFallback)}</p>`:w==="removed"&&T?.review_note?`<p class="submission-reason"><strong>${U(y.removedLabel)}</strong>${U(T.review_note)}</p>`:"",se=I?`<span class="submission-status status-local" style="color:var(--gold,#e0b86a);border-color:currentColor">${U(d.local)}</span>`:"";return`<article class="review-card"><div class="review-top">
        <strong>${U(D?.title)}</strong>
        <span class="submission-badges" style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:flex-end">${se}<span class="submission-status status-${U(w)}">${U(F)}</span></span></div>
        <div class="review-meta">${U(D?.summary)}<br>${U(y.lineupPrefix)}${U(W)}${ne?`<br>${U(y.submittedPrefix)}${U(ne)}`:""}</div>${re}</article>`}).join(""),(S>0||R)&&_.insertAdjacentHTML("beforeend",`<div class="form-actions">
        <button class="outline-btn" type="button" data-progress-page="-1" ${S===0?"disabled":""}>${U(y.prevPage)}</button>
        <button class="outline-btn" type="button" data-progress-page="1" ${R?"":"disabled"}>${U(y.nextPage)}</button></div>`)}async function L(){let B=++A;for(let R of M){let G=R.dataset.statusFilter===v;R.setAttribute("aria-pressed",String(G)),R.classList.toggle("selected",G)}if(b){let R=[...g||[]].filter(D=>{let w=D?.status||"approved";return v==="all"?!0:w===v}).sort($r),G=S*et,T=R.slice(G,G+et+1);if(T.length===0&&S>0){S-=1,await L();return}k(T.slice(0,et),T.length>et);return}_.textContent=y.loading;try{let R=t.from(n).select(`id,status,review_note,created_at,${o}`).eq("player_id",a).order("created_at",{ascending:!1}).order("id",{ascending:!1});v!=="all"&&(R=R.eq("status",v));let{data:G,error:T}=await R.range(S*et,(S+1)*et);if(!e.isConnected||B!==A)return;if(T)throw T;if(G.length===0&&S>0){S-=1,await L();return}k(G.slice(0,et),G.length>et)}catch{e.isConnected&&B===A&&(_.textContent=y.loadError)}}for(let B of M)B.addEventListener("click",()=>{v=B.dataset.statusFilter,S=0,L()});e.querySelector("[data-progress-refresh]").addEventListener("click",()=>{L()}),$&&$.addEventListener("click",async()=>{if(!$.disabled){$.disabled=!0;try{let B=await u();if(!$.isConnected||!e.isConnected)return;g=Array.isArray(B)?B:[],g.length===0&&$.remove(),S=0,await L()}finally{$.isConnected&&($.disabled=!1)}}}),_.addEventListener("click",B=>{let R=B.target.closest("[data-progress-page]");!R||R.disabled||(S+=Number(R.dataset.progressPage),L())}),L()}var Et=40;function Zn(e,t,a,n=ze()){let o=ze(n),c=tt(o),l=(p,f)=>p.map(([d,b])=>`<option value="${U(d)}"${d===f?" selected":""}>${U(b)}</option>`).join(""),u=c?{nicknameLabel:"Timekeeper",nicknamePlaceholder:"Search nickname",allLocation:`All ${t}`,divisionLabel:"Portray Tier",allDivision:"All Portray Tiers",search:"Search",reset:"Clear"}:{nicknameLabel:"玩家昵称",nicknamePlaceholder:"搜昵称的一部分",allLocation:`全部${t}`,divisionLabel:"塑造分组",allDivision:"全部塑造",search:"搜索",reset:"清空"},m=[["zero",qn("zero",o)],["max",qn("max",o)]];return`<form class="moderation-filter">
    <div class="field"><label for="moderationNickname">${U(u.nicknameLabel)}</label>
      <input id="moderationNickname" name="name" type="search" maxlength="80" value="${U(e?.name)}" placeholder="${U(u.nicknamePlaceholder)}"></div>
    <div class="field"><label for="moderationLocation">${U(t)}</label>
      <select id="moderationLocation" name="location"><option value="">${U(u.allLocation)}</option>
        ${(a||[]).map(([p,f])=>`<optgroup label="${U(p)}">${l(f,e?.location)}</optgroup>`).join("")}
      </select></div>
    <div class="field"><label for="moderationDivision">${U(u.divisionLabel)}</label>
      <select id="moderationDivision" name="division"><option value="">${U(u.allDivision)}</option>
        ${l(m,e?.division)}
      </select></div>
    <div class="moderation-filter-actions"><button type="submit" class="outline-btn">${U(u.search)}</button>
      <button type="button" class="text-link-btn" data-moderation-reset>${U(u.reset)}</button></div>
  </form>`}function Jn(e,t,a,n){e.addEventListener("submit",o=>{o.preventDefault(),o.stopPropagation();let c=new FormData(e);Object.assign(a,{name:String(c.get("name")??"").trim(),location:String(c.get("location")??""),division:String(c.get("division")??""),page:0}),n()}),e.addEventListener("change",o=>{o.target.matches("select")&&e.requestSubmit()}),e.querySelector("[data-moderation-reset]").addEventListener("click",()=>{for(let o of["name","location","division"]){let c=e.elements.namedItem(o);c&&(c.value="")}e.requestSubmit()}),t.addEventListener("click",o=>{let c=o.target.closest("[data-moderation-page]");!c||c.disabled||(a.page+=Number(c.dataset.moderationPage),n())})}function Rs(e,t,a,n){t.name&&(e=e.ilike("display_name",`%${t.name.replace(/[\\%_]/g,"\\$&")}%`)),t.location&&(e=e.eq(a,t.location)),t.division&&(e=e.eq(n,t.division));let o=t.page*Et;return e.order("created_at",{ascending:!1}).order("id",{ascending:!1}).range(o,o+Et)}function Xn(e,t,a=ze()){if(e===0&&!t)return"";let n=tt(a),o=n?"Previous":"上一页",c=n?`Page ${e+1}`:`第 ${e+1} 页`,l=n?"Next":"下一页";return`<div class="form-actions moderation-pagination">
    <button type="button" class="outline-btn" data-moderation-page="-1" ${e===0?"disabled":""}>${U(o)}</button>
    <span>${U(c)}</span>
    <button type="button" class="outline-btn" data-moderation-page="1" ${t?"":"disabled"}>${U(l)}</button>
  </div>`}var ei=e=>String(e??"").normalize("NFKC").trim().toLowerCase(),Sr=e=>e.map(t=>String(t??"").split(/[/／]/).map(a=>a.trim()));function wr(e){return e==="zh"||e==="en"?e:typeof e=="string"&&e.trim()?e.trim().toLowerCase().startsWith("zh")?"zh":"en":typeof document<"u"&&document.body?.dataset?.lang==="zh"?"zh":"en"}var Qn={en:{slotCount:"Please enter 1–4 deployed arcanist slots.",slotLength:"Each lineup slot may contain at most 40 characters.",multiFlex:'Please place "/" flex alternatives in only one lineup slot.',emptyChoice:'Please enter an arcanist name on both sides of "/".',duplicate:"Duplicate arcanists are not allowed in the lineup or flex alternatives."},zh:{slotCount:"请填写 1—4 个出战位置。",slotLength:"每个出战位置最多填写 40 个字符。",multiFlex:"请将 / 备选填写在同一个出战位置。",emptyChoice:"请填写 / 两侧的角色名。",duplicate:"配队和备选里不能重复填写同一角色。"}};function Ps(e,t){let a=Qn[wr(t)]||Qn.en;if(!Array.isArray(e)||e.length<1||e.length>4)throw new Error(a.slotCount);if(e.some(c=>Array.from(String(c??"")).length>40))throw new Error(a.slotLength);let n=Sr(e);if(n.filter(c=>c.length>1).length>1)throw new Error(a.multiFlex);let o=n.flat().map(ei);if(o.some(c=>!c))throw new Error(a.emptyChoice);if(new Set(o).size!==o.length)throw new Error(a.duplicate)}function At(e){return Array.isArray(e)?e.map(ei).sort().join("|"):""}var Fs={},ta=new Intl.DateTimeFormat("sv-SE",{timeZone:"Asia/Shanghai",dateStyle:"short"}),_r=new Intl.DateTimeFormat("sv-SE",{timeZone:"Asia/Shanghai",dateStyle:"short",timeStyle:"medium"});function Ie(e){return e==="en"||e==="zh"?e:typeof e=="string"&&e.trim()?e.trim().toLowerCase().startsWith("zh")?"zh":"en":typeof E=="function"?E():typeof document<"u"&&document.body?.dataset?.lang==="zh"?"zh":"en"}function at(e){let t=Ie(e);return typeof N=="function"?N(t):t!=="zh"}function kr(e){return typeof q=="function"?q(e):String(e??"").normalize("NFKC").trim().toLowerCase()}function ti(e){return typeof Ne=="function"?Ne(e):String(e??"").trim()}function Ns(e,t){return typeof V=="function"?V(e,t):ti(e)}function Cr(e,t){if(typeof ve=="function")return ve(e,t);let a=String(e??"").trim();if(!a)return"";let n=at(t)?" / ":"/";return a.split(/[/／、,+＋]+/).map(o=>Ns(o,t)).filter(Boolean).join(n)}function za(e,t){if(typeof fe=="function")return fe(e,t);let a=String(e??"").trim();return a?at(t)&&typeof $s=="function"&&$s(a)||a:""}function Is(e,t,a){let n=Ie(a);if(at(n)){if(typeof ae=="function"){let o=ae(e,n);if(o)return o}return e==="zero"?"All P0":e==="max"?"Max Portray":t?.[e]||String(e??"")}if(t?.[e])return t[e];if(typeof ae=="function"){let o=ae(e,n);if(o)return o}return e==="zero"?"全 0 塑造":e==="max"?"全满塑造":String(e??"")}function Bs(e,t,a){let n=Ie(a);if(at(n)){if(typeof be=="function"){let o=be(e,n);if(o)return o}return e==="new"?"Collector's Edition":e==="rerun"?"Anomaly Gallery":t?.[e]||String(e??"")}if(t?.[e])return t[e];if(typeof be=="function"){let o=be(e,n);if(o)return o}return e==="new"?"鉴藏者特版":e==="rerun"?"怪相档案":String(e??"")}function ai(e){return new Error(at(e)?"Please select a valid date.":"请选择有效日期。")}function Mt(){return ta.format(new Date)}function si(e,t,a=Ie()){let n=new Date(`${e}T12:00:00+08:00`);if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!Number.isFinite(n.getTime())||ta.format(n)!==e)throw ai(a);return ta.format(new Date(n.getTime()+t*24*60*60*1e3))}function xt(e){if(!e)return"";let t=e instanceof Date?e:new Date(e);return Number.isFinite(t.getTime())?_r.format(t):""}function ni(e,t=Ie(),a={}){let n=xt(e);return n?a===!0||!!a?.full?n:n.split(" ")[1]||n:""}function zs(e,t=Ie()){let a=new Date(`${e}T00:00:00+08:00`);if(!/^\d{4}-\d{2}-\d{2}$/.test(e)||!Number.isFinite(a.getTime())||ta.format(a)!==e)throw ai(t);let n=new Date(a.getTime()+1440*60*1e3);return[a.toISOString(),n.toISOString()]}function js(e){if(!Array.isArray(e)||e.length===0)return Mt();let t="";for(let a of e){if(!a?.approved_at)continue;let n=new Date(a.approved_at);if(!Number.isFinite(n.getTime()))continue;let o=ta.format(n);(!t||o>t)&&(t=o)}return t||Mt()}function Os(e,{date:t,division:a="",mapIds:n=[]}={}){if(!Array.isArray(e))return[];let o=t||js(e),[c,l]=zs(o),u=Date.parse(c),m=Date.parse(l),p=n instanceof Set?n:Array.isArray(n)?new Set(n.filter(Boolean)):null,f=!!(p&&p.size>0),d=String(a??"").trim();return e.filter(b=>{if(!b?.approved_at)return!1;let g=Date.parse(b.approved_at);return!(!Number.isFinite(g)||g<u||g>=m||d&&b.division!==d||f&&!p.has(b.map_id))}).sort((b,g)=>{let y=Date.parse(g.approved_at)-Date.parse(b.approved_at);return y!==0?y:String(b.id??"").localeCompare(String(g.id??""))})}function Hs(e,t,a,n,o,c=Ie()){let l=Ie(c),u=at(l)?"en":"zh-CN",m=o instanceof Set?o:Array.isArray(o)?new Set(o):null,p=new Map;for(let f of e||[]){if(f.section!==t||f.edition!==a||f.division!==n)continue;let d=kr(f.carry_name),b=p.get(d);b||(b={key:d,carry_name:Ns(f.carry_name,l),carry_cn:ti(f.carry_name),rawNames:new Set,mapBest:new Map},p.set(d,b)),b.rawNames.add(f.carry_name);for(let g of f.map_scores||[]){if(m&&!m.has(g.map_id))continue;let y=g.map_id||g.name,h=b.mapBest.get(y);(!h||BigInt(g.score||0)>BigInt(h.score||0))&&b.mapBest.set(y,g)}}return[...p.values()].filter(f=>f.mapBest.size).map(f=>{let d=[...f.mapBest.values()].sort((b,g)=>{let y=BigInt(g.score||0)-BigInt(b.score||0);if(y!==0n)return y>0n?1:-1;let h=za(b.name,l),v=za(g.name,l);return String(h).localeCompare(String(v),u)});return{carry_key:f.key,carry_name:f.carry_name,carry_cn:f.carry_cn,mergedAliases:f.rawNames.size>1?[...f.rawNames]:[],map_count:d.length,map_scores:d,total:d.reduce((b,g)=>b+BigInt(g.score||0),0n)}}).sort((f,d)=>f.total!==d.total?f.total>d.total?-1:1:d.map_count-f.map_count||String(f.carry_name).localeCompare(String(d.carry_name),u)||String(f.carry_key).localeCompare(String(d.carry_key)))}function Fa(e){let t=BigInt(e);return t<=999999999999999n?Number(t):t.toString()}function oe(e){let t=String(e??"");return/^[\s]*[=+\-@\t\r]/.test(t)?`'${t}`:t}function Er(){try{if(typeof Fs<"u"&&Fs.url)return new URL("./xlsx-0.20.3.min.js",Fs.url).href}catch{}return"./xlsx-0.20.3.min.js"}var Na;function Ar(e=Ie()){if(typeof window<"u"&&window.XLSX?.writeFileXLSX)return Promise.resolve(window.XLSX);let t=at(e);return Na||(Na=new Promise((a,n)=>{let o=document.createElement("script");o.src=Er(),o.onload=()=>{window.XLSX?.writeFileXLSX?a(window.XLSX):n(new Error(t?"Unable to initialize the Excel export component. Please try again.":"Excel 导出组件无法启动，请重试。"))},o.onerror=()=>{o.remove(),n(new Error(t?"Unable to load the Excel export component right now. Please try again.":"Excel 导出组件暂时无法加载，请重试。"))},document.head.append(o)}).catch(a=>{throw Na=void 0,a})),Na}async function Gs({date:e,divisions:t,maps:a,dailyRows:n,totals:o,divisionLabels:c={},sectionLabels:l={},canDownload:u,lang:m=Ie()}){let p=Ie(m),f=at(p),d=await Ar(p),b=d.utils.book_new(),g=new Map((a||[]).map(v=>[v.id,v])),y=(v,S,A,_)=>{let M=d.utils.aoa_to_sheet([S,...A]);M["!cols"]=_.map($=>({wch:$})),M["!autofilter"]={ref:M["!ref"]},d.utils.book_append_sheet(b,M,v)};if(n!==null)if(f){let v=["Approved (UTC+8)","Version","Edition","Boss","Portray","Timekeeper","Main DPS","Lineup","Score","Link"],S=n.map(A=>{let _=g.get(A.map_id),M=(A.team||[]).map($=>Ns($,"en")).join(", ");return[xt(A.approved_at),oe(_?.edition),oe(Bs(_?.section,l,"en")),oe(za(_?.name,"en")),oe(Is(A.division,c,"en")),oe(A.display_name),oe(Cr(A.carry,"en")),oe(M),Fa(A.score),oe(A.related_url||"")]});y("Daily Scores",v,S,[24,12,20,30,14,22,26,52,18,40])}else{let v=["通过时间（北京时间）","版本","分区","关卡","塑造","玩家昵称","主 C","阵容","积分","相关链接"],S=n.map(A=>{let _=g.get(A.map_id);return[xt(A.approved_at),oe(_?.edition),oe(Bs(_?.section,l,"zh")),oe(_?.name),oe(Is(A.division,c,"zh")),oe(A.display_name),oe(A.carry),oe((A.team||[]).join("、")),Fa(A.score),oe(A.related_url||"")]});y("每日新分",v,S,[24,12,16,22,14,22,26,48,18,40])}if(o!==null){let v=new Set((a||[]).map(_=>_.id)),S=new Map;for(let _ of a||[]){let M=_.section==="new"?_.edition:"";S.set(`${_.section}/${M}`,{section:_.section,edition:M})}let A=[];for(let{section:_,edition:M}of S.values())for(let $ of t||[]){let k=Hs(o,_,M,$,v,p);for(let[L,B]of k.entries()){let R=new Map(B.map_scores.map(G=>[G.map_id,Fa(G.score)]));A.push([L+1,oe(Bs(_,l,p)),oe(M),oe(Is($,c,p)),oe(B.carry_name),Fa(B.total),B.map_count,...(a||[]).map(G=>R.get(G.id)??null)])}}f?y("Carry Totals",["Rank","Edition","Version","Portray","Main DPS","Total Score","Bosses",...(a||[]).map(_=>oe(`${_.edition} · ${za(_.name,"en")}`))],A,[10,20,12,14,26,18,10,...(a||[]).map(()=>28)]):y("主 C 总计",["排名","分区","版本","塑造","主 C","总积分","关卡数",...(a||[]).map(_=>oe(`${_.edition} · ${_.name}`))],A,[10,16,12,14,26,18,10,...(a||[]).map(()=>25)])}let h=f?`Manes-Bulletin-${e}.xlsx`:`鬃毛邮报-${e}.xlsx`;(typeof u!="function"||u())&&d.writeFileXLSX(b,h,{compression:!0})}var ii=new Set,ja=new Map;function Mr(e){return String(e??"").trim().toLowerCase().startsWith("en")?"en":"zh"}function xr(){return String(globalThis.LEADERBOARD_CONFIG?.assetVersion||globalThis.__R1999_ASSET_VER__||"").trim()}function Dr(e){let t=xr();return t?`${e}?v=${encodeURIComponent(t)}`:e}function Tr(e,t){if(!t||typeof t!="object")throw new Error(`Invalid language pack payload for ${e}`);t.dict&&gn(e,t.dict),(t.maneMechanics||t.fbMechanics)&&Fn(e,t.maneMechanics,t.maneEnToCn,t.fbMechanics),Array.isArray(t.glossary)&&Vn(e,t.glossary),t.psychubeLore&&Hn(e,t.psychubeLore),ii.add(e)}async function Ks(e){let t=Mr(e);if(ii.has(t))return;if(ja.has(t))return ja.get(t);let a=(async()=>{let n=null;if(globalThis.__R1999_BOOT_LANG__===t&&globalThis.__R1999_LANG_PROMISE__)try{n=await globalThis.__R1999_LANG_PROMISE__}catch{n=null}if(!n){let o=await fetch(Dr(`./data/lang-${t}.json`),{cache:"default"});if(!o.ok)throw new Error(`HTTP ${o.status} loading lang-${t}.json`);n=await o.json()}Tr(t,n)})().finally(()=>{ja.delete(t)});return ja.set(t,a),a}var bt=null,Us=null;async function It(){if(bt)return bt;if(!Us){let e=String(globalThis.LEADERBOARD_CONFIG?.assetVersion||globalThis.__R1999_ASSET_VER__||"").trim(),t=e?`./data/offline-snapshot.json?v=${encodeURIComponent(e)}`:"./data/offline-snapshot.json";Us=fetch(t,{cache:"default"}).then(a=>a.ok?a.json():{}).then(a=>(bt=a&&typeof a=="object"?a:{},bt)).catch(a=>(console.warn("Offline snapshot load failed:",a),bt={},bt))}return Us}var aa=new Map;function bi(e,t){let a=t();if(a)return Promise.resolve(a);if(aa.has(e))return aa.get(e);let n=new Promise((o,c)=>{let l=String(globalThis.LEADERBOARD_CONFIG?.assetVersion||globalThis.__R1999_ASSET_VER__||"").trim(),u=document.createElement("script");u.src=l?`${e}?v=${encodeURIComponent(l)}`:e,u.async=!0,u.onload=()=>{let m=t();m?o(m):(aa.delete(e),c(new Error(`Bundle did not initialize: ${e}`)))},u.onerror=()=>{aa.delete(e),c(new Error(`Failed to load bundle: ${e}`))},document.head.appendChild(u)});return aa.set(e,n),n}var gi=()=>bi("./ocr.bundle.js",()=>globalThis.__R1999_OCR__),Lr=()=>bi("./supabase.bundle.js",()=>globalThis.__R1999_SUPABASE__),O=e=>document.querySelector(e),s=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),C=(e,t,a=E())=>N(a)?e:t,hi=["beast","plant","star","mineral","spirit","intellect"],Bt=["zero","max"],Rr=["new","rerun"],Pr=["pending","approved","rejected","removed"],ri=["pending","approved","rejected","removed","historical"],Ir={"fb-archive-record":{en:"this record",zh:"这条成绩",rpc:"archive_submission",arg:"p_submission_id"},"fb-archive-history":{en:"this archive entry",zh:"这条档案",rpc:"archive_historical_record",arg:"p_record_id"},"fb-archive-version":{en:"this cycle and its boards",zh:"这个版本及其榜单",rpc:"archive_version",arg:"p_version_id"}},ra={"image/png":"png","image/jpeg":"jpg","image/webp":"webp"},Js=5*1024*1024,Br=Math.floor(4.75*1024*1024),es=30*1024*1024;function ts(e){if(!e)return"";let t=String(e.type||"").toLowerCase().trim();if(t==="image/jpg"&&(t="image/jpeg"),ra[t])return t;let a=String(e.name||"").toLowerCase();return a.endsWith(".png")?"image/png":a.endsWith(".jpg")||a.endsWith(".jpeg")?"image/jpeg":a.endsWith(".webp")?"image/webp":""}function Ve(e){return e>=1024*1024?`${(e/(1024*1024)).toFixed(2)} MB`:`${Math.max(1,Math.round(e/1024))} KB`}function Fr(e,t,a){return new Promise(n=>e.toBlob(n,t,a))}async function as(e,t=E()){if(!e||!e.size)throw new Error(r("errProofRequired",{},t));let a=ts(e);if(!a)throw new Error(r("errProofType",{},t));if(e.size>es)throw new Error(C("Screenshot file exceeds 30 MB limit. Please trim or resize it first.","截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。",t));let n=await Mi(e);if(e.size<=Js)return{uploadFile:e,mime:a,originalSize:e.size,finalSize:e.size,width:n.naturalWidth,height:n.naturalHeight,compressed:!1};let o=String(e.name||"proof").replace(/\.[^.]+$/,"")||"proof",c=[2560,1920,1600,1280],l=[["image/webp",.9],["image/webp",.82],["image/webp",.72],["image/jpeg",.9],["image/jpeg",.82],["image/jpeg",.72],["image/jpeg",.6]],u=n.naturalWidth,m=n.naturalHeight,p=document.createElement("canvas"),f=p.getContext("2d");if(!f)throw new Error(r("errProofSize",{},t));for(let d of c){let b=Math.min(1,d/Math.max(u,m));p.width=Math.max(1,Math.round(u*b)),p.height=Math.max(1,Math.round(m*b)),f.drawImage(n,0,0,p.width,p.height);for(let[g,y]of l){let h=await Fr(p,g,y);if(h&&h.size>0&&h.size<=Br&&ra[h.type])return{uploadFile:new File([h],`${o}.${ra[h.type]}`,{type:h.type}),mime:h.type,originalSize:e.size,finalSize:h.size,width:u,height:m,compressed:!0}}}throw new Error(r("errProofSize",{},t))}var yi="r1999-offline-submissions-v1",Nr=location.pathname.toLowerCase().includes("flashback")?"flashback":"mane";function pe(){return window.LEADERBOARD_CONFIG?.offlineFirst!==!1}var i={mode:Nr,manePage:"scores",maneDaily:{date:"",division:"",map:""},fbPage:"leaderboard",dataSource:"offline",connected:!0,loading:!1,syncingLive:!1,errorNotice:"",session:null,user:null,profile:null,isAdmin:!1,maneSection:"new",maneDivision:"zero",maneMapId:"",maneRoleMode:"carry",maneCarry:"",maneAfflatus:"",maneQuery:"",manePlayerScope:"all",manePlayerDiv:"all",maneMaps:[],maneScores:[],maneTotals:[],maneDailyScores:[],fbVersionId:"",fbStageId:"",fbGroup:"zero",fbResonanceOnly:!1,fbRoleMode:"carry",fbCarry:"",fbAfflatus:"",fbQuery:"",fbCarryScope:"period",fbCarryMetric:"appearance_count",fbVersions:[],fbStages:[],fbRecords:[],fbApprovedRecords:[],fbPlayers:[],fbArchives:[],fbCarries:[],highlightRecordId:"",maneMechOpen:!1,fbMechOpen:!1,mobileFilterOpen:!1,intelCollapsed:typeof window<"u"&&window.innerWidth<=680,maneSelectedAppraisal:-1,psyAmpLevel:5,activePsyDossierId:"",posterTheme:"parchment",glossaryOpen:null,activeDossierModal:null},H=null,oi=null,li=!1,Ga=!1,qe="",He=new Map,P={chars:["","","",""],carries:[!1,!1,!1,!1],psychubes:["","","",""],resonanceCodes:["","","",""]},Y={open:!1,slotIndex:0,aff:"all",star:"all",query:"",choices:[]},ee={open:!1,slotIndex:0,charName:"",star:"all",tag:"全部",query:""},oa=e=>Ea(e),yt=e=>String(e||"").split(/[/／]/).map(t=>t.trim()).filter(Boolean),Ot=e=>!!e&&!oa(e)&&yt(e).length===1;function vt(e=E()){return{zero:ae("zero",e),max:ae("max",e)}}function Xs(e=E()){return{new:be("new",e),rerun:be("rerun",e)}}function vi(e=E()){return`<span class="resonance-tag">✦ ${s(r("res10FullBadge",{},e))}</span>`}function Ua(e){if(!e)return[];if(Array.isArray(e))return e.map(t=>String(t??"").trim());if(typeof e=="string")try{let t=JSON.parse(e);if(Array.isArray(t))return t.map(a=>String(a??"").trim())}catch{}return[]}function Ke(e){let t=Ua(e?.team_psychubes),a=Ua(e?.team_resonance_codes);return!t.length&&!a.length&&Array.isArray(e?.team_builds)&&(t=e.team_builds.map(n=>String(n?.psychube??"").trim()),a=e.team_builds.map(n=>String(n?.resonance_code??n?.resonanceCode??"").trim())),{psychubes:t,resonanceCodes:a}}function Qs(e,t=E()){return e?.isLocal?`<span class="local-record-tag">✦ ${s(r("localRecordTag",{},t))}</span>`:""}function en(e){let t=String(e??"").trim();if(!t)return"";let a=Aa(t);if(a)return a;let n=te(t);return n?n.name:t}function la(e=[],t="",a=[],n=[]){let o=Array.isArray(e)?e:Vr(e),c=new Set(ue(t).map(q)),l=Ua(a),u=Ua(n);for(let m=0;m<4;m++){let p=String(o[m]??"").trim(),d=yt(p).map(en).filter(Boolean).join("/");P.chars[m]=d,P.carries[m]=Ot(d)&&c.has(q(d)),P.psychubes[m]=l[m]||"",P.resonanceCodes[m]=u[m]||""}}function tn(){let e=E(),t=[],a=[],n=[],o=[],c=new Set;for(let m=0;m<4;m++){let p=String(P.chars[m]||"").trim(),f=String(P.psychubes[m]||"").trim(),d=String(P.resonanceCodes[m]||"").trim();if(!p){if(f||d)throw new Error(r("errSlotMissingChar",{n:m+1},e));continue}if(Array.from(p).length>40)throw new Error(r("errSlotNameTooLong",{},e));for(let b of yt(p)){let g=q(b);if(c.has(g))throw new Error(r("errDuplicateMember",{name:V(b,e)},e));c.add(g)}if(d.length>160)throw new Error(r("errResTooLong",{},e));t.push(p),P.carries[m]&&Ot(p)&&a.push(p),n.push(f),o.push(d)}if(t.length<1||t.length>4)throw new Error(r("errTeamCount",{},e));if(!a.length)throw new Error(r("errCarryRequired",{},e));let l=n.some(Boolean),u=o.some(Boolean);return{team:t,carries:a,carry:a.join("/"),psychubes:n,resonanceCodes:o,hasPsychubes:l,hasResonance:u,hasAny:l||u}}function Va(e){let t=`${e?.code||""} ${e?.message||""} ${e?.details||""}`;return/team_psychubes|team_resonance_codes|42703|PGRST204|schema cache/i.test(t)}function fa(){try{let e=localStorage.getItem(yi);if(!e)return{mane:[],flashback:[]};let t=JSON.parse(e);return{mane:Array.isArray(t?.mane)?t.mane:[],flashback:Array.isArray(t?.flashback)?t.flashback:[]}}catch{return{mane:[],flashback:[]}}}function an(e){try{localStorage.setItem(yi,JSON.stringify({mane:Array.isArray(e?.mane)?e.mane:[],flashback:Array.isArray(e?.flashback)?e.flashback:[]}))}catch{}}function zr(e="all"){let t=fa();e==="mane"?t.mane=[]:e==="flashback"?t.flashback=[]:(t.mane=[],t.flashback=[]),an(t)}function je(e){return Array.isArray(e)?e.map(t=>({...t})):[]}function jr(e,t,a){let n=(e||[]).map(o=>({...o,map_scores:Array.isArray(o.map_scores)?o.map_scores.map(c=>({...c})):[]}));if(!t.length)return n;for(let o of t){let c=a.get(o.map_id);if(!c)continue;let l=c.section||"new",u=l==="new"&&c.edition||"",m=o.division,p=BigInt(o.score||0);for(let f of ue(o.carry)){let d=q(f),b=Ne(f),g=n.find(v=>v.section===l&&v.edition===u&&v.division===m&&q(v.carry_name)===d);g||(g={section:l,edition:u,division:m,carry_key:b,carry_name:b,total_score:"0",map_count:0,map_scores:[]},n.push(g));let y=g.map_scores.findIndex(v=>v.map_id===c.id),h={name:c.name,team:[...o.team||[]],score:String(p),map_id:c.id,player:o.display_name};y>=0?p>BigInt(g.map_scores[y].score||0)&&(g.map_scores[y]=h):g.map_scores.push(h),g.map_count=g.map_scores.length,g.total_score=String(g.map_scores.reduce((v,S)=>v+BigInt(S.score||0),0n))}}return n}function Ye(){let e=bt||{},t=fa(),a=t.mane.map(_=>({..._,isLocal:!0})),n=t.flashback.map(_=>({..._,isLocal:!0})),o=je(e.maneMaps).sort((_,M)=>String(M.edition).localeCompare(String(_.edition),"en",{numeric:!0})||_.position-M.position||String(_.name).localeCompare(String(M.name),"zh-CN")),c=new Map(o.map(_=>[_.id,_])),l=new Map,u=[...je(e.maneScores),...a];for(let _ of u){let M=At((_.team||[]).map(q)),$=`${_.map_id}::${_.division}::${M}`,k=l.get($);(!k||Ze(_,k)<0)&&l.set($,_)}let m=[...l.values()],p=[...a.map(_=>({..._,approved_at:_.approved_at||_.created_at})),...je(e.maneDailyScores)],f=jr(e.maneTotals,a,c),d=je(e.fbVersions).sort((_,M)=>String(M.code).localeCompare(String(_.code),"en",{numeric:!0})||Date.parse(M.created_at)-Date.parse(_.created_at)),b=je(e.fbStages),g=new Map(b.map(_=>[_.id,_])),y=new Map,h=[...je(e.fbRecords),...n];for(let _ of h){let M=_.team_key||At(_.team||[]),$=`${_.stage_id}::${_.group_code}::${M}`,k=y.get($);(!k||rt(_,k)<0)&&y.set($,_)}let v=[...y.values()],S=je(e.fbPlayers),A=je(e.fbCarries);if(n.length){let _=v.filter(M=>M.isLocal);for(let M of _){let $=M.version_id||g.get(M.stage_id)?.version_id||null,k=M.player_id||`local-player:${le(M.display_name)}`;for(let L of[null,$]){let B=S.find(R=>R.version_id===L&&(R.player_id===k||le(R.display_name)===le(M.display_name)));B?B.appearance_count=Number(B.appearance_count||0)+1:S.push({version_id:L,player_id:k,display_name:M.display_name,appearance_count:1})}for(let L of ue(M.carry_name)){let B=q(L),R=Ne(L);for(let G of[null,$]){let T=A.find(D=>D.version_id===G&&q(D.carry_name)===B);if(!T)A.push({version_id:G,carry_name:R,challenge_count:1});else{let D=new Set(v.filter(w=>(!G||w.version_id===G)&&ue(w.carry_name).some(I=>q(I)===B)).map(w=>g.get(w.stage_id)?.challenge_id||w.stage_id));T.challenge_count=Math.max(Number(T.challenge_count||0),D.size)}}}}}i.maneMaps=o,i.maneScores=m,i.maneTotals=f,i.maneDailyScores=p,i.fbVersions=d,i.fbStages=b,i.fbRecords=v,i.fbApprovedRecords=[...je(e.fbApprovedRecords||e.fbRecords),...n],i.fbPlayers=S,i.fbCarries=A,i.fbArchives=je(e.fbArchives),Wa(),i.dataSource=pe()?"offline":"disconnected",i.connected=pe(),i.loading=!1,i.errorNotice=""}function Wa(){if(i.maneMapId){let a=i.maneMaps.find(n=>n.id===i.maneMapId);a&&a.section!==i.maneSection&&(i.maneSection=a.section)}let e=Be();if(e.some(a=>a.id===i.maneMapId)||(i.maneMapId=e[0]?.id||""),i.fbStageId){let a=i.fbStages.find(n=>n.id===i.fbStageId);a&&a.version_id!==i.fbVersionId&&(i.fbVersionId=a.version_id)}i.fbVersions.some(a=>a.id===i.fbVersionId)||(i.fbVersionId=i.fbVersions[0]?.id||"");let t=Me(i.fbVersionId);t.some(a=>a.id===i.fbStageId)||(i.fbStageId=t[0]?.id||"")}function sn(e,t="",a=E()){let n=Re(e);if(!n)return`<span class="psy-thumb is-fallback ${t}"><span>✦</span></span>`;let o=Se(n,a),c=ft(n,a);return`
    <span class="psy-thumb ${t}" title="${s(o)} (${n.star}★ · ${s(c)})">
      <img class="psy-thumb-bg" src="${s(Qt(n.star))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img class="psy-thumb-icon" src="${s(mt(n.id))}" alt="${s(o)}" loading="lazy" decoding="async" />
    </span>`}function Or(e,t=E()){let a=e.aff||"unknown",n=ge[a]||ge.unknown,o=V(e.name,t),c=Te(a,t);return`
    <span class="char-picker-card-art">
      <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      ${e.portrait?`<img class="slot-portrait" src="${s(e.portrait)}" alt="${s(o)}" loading="lazy" decoding="async" />`:""}
      <img class="slot-rarity-layer" src="${s(kt(e.star||6))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div class="slot-vignette" aria-hidden="true"></div>
      ${n.icon?`<img class="slot-aff-img" src="${s(n.icon)}" alt="${s(c)}" loading="lazy" decoding="async" />`:""}
    </span>`}function $i(e,t=E()){let a=String(P.chars[e]||"").trim(),n=Ot(a),o=n?te(a):null,c=a?V(a,t):"",l=n&&P.carries[e],u=P.psychubes[e]||"",m=u?Se(u,t):"",p=P.resonanceCodes[e]||"",f=ge[o?.aff||"unknown"]||ge.unknown,d=e+1;return`
    <div class="build-slot-card ${a?"has-char":"is-unfilled"} ${l?"is-carry-slot":""}" data-build-slot="${e}">
      <div class="build-slot-head">
        <div class="build-slot-head-left">
          <span class="build-slot-index">${s(r("slotLabel",{n:d},t))}</span>
          <span class="build-slot-char">${s(c||(e===0?r("slotPendingChar",{},t):r("slotOptional",{},t)))}</span>
        </div>
        <button type="button" class="carry-check-btn ${l?"checked":""}" data-toggle-carry="${e}" role="checkbox" aria-checked="${l}" ${n?"":"disabled"} title="${s(n?r("slotMainDpsTitle",{},t):r("slotMainDpsDisabled",{},t))}">
          <span class="carry-check-box" aria-hidden="true">${l?"✓":""}</span>
          <span>${s(r("slotMainDps",{},t))}</span>
        </button>
      </div>
      <div class="build-slot-squares">
        <div class="picker-slot-wrap">
          <button type="button" class="picker-slot-box char-picker-trigger ${a?"is-selected":""} ${l?"is-carry":""}" data-pick-char="${e}" title="${s(a?`${r("slotPickChar",{},t)} · ${c}`:r("slotPickChar",{},t))}">
            ${a?`<span class="char-slot-thumb">
                   <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" />
                   ${o?.portrait?`<img class="slot-portrait" src="${s(o.portrait)}" alt="" aria-hidden="true" />`:`<span class="char-slot-mono">${s(Qe(c))}</span>`}
                   <img class="slot-rarity-layer" src="${s(kt(o?.star||6))}" alt="" aria-hidden="true" />
                   ${f.icon?`<img class="char-slot-aff" src="${s(f.icon)}" alt="" aria-hidden="true" />`:""}
                 </span>
                 <span class="picker-slot-name">${s(c)}</span>`:`<span class="picker-slot-plus" aria-hidden="true">＋</span>
                 <span class="picker-slot-label">${s(r("slotPickChar",{},t))}</span>`}
          </button>
          ${a?`<button type="button" class="psy-slot-clear" data-clear-char="${e}" aria-label="${s(r("slotClearChar",{n:d},t))}" title="${s(r("slotClearChar",{n:d},t))}">×</button>`:""}
        </div>

        <div class="picker-slot-wrap">
          <button type="button" class="picker-slot-box ${m?"is-selected":""}" data-pick-psy="${e}" title="${s(m?`${r("slotPickPsy",{},t)} · ${m}`:r("slotPickPsy",{},t))}">
            ${m?`${sn(u,"in-slot",t)}
                 <span class="picker-slot-name">${s(m)}</span>`:`<span class="picker-slot-plus" aria-hidden="true">＋</span>
                 <span class="picker-slot-label">${s(r("slotPickPsy",{},t))}</span>`}
          </button>
          ${m?`<button type="button" class="psy-slot-clear" data-clear-psy="${e}" aria-label="${s(r("slotClearPsy",{n:d},t))}" title="${s(r("slotClearPsy",{n:d},t))}">×</button>`:""}
        </div>
      </div>
      <div class="res-slot-wrap">
        <input type="text" class="res-code-input" data-res-slot="${e}" maxlength="160" autocomplete="off" spellcheck="false" placeholder="${s(r("slotResPlaceholder",{n:d},t))}" value="${s(p)}" aria-label="${s(r("slotResPlaceholder",{n:d},t))}" />
      </div>
    </div>`}function Si(e=E()){let t=P.chars.map((n,o)=>({c:n,i:o})).filter(n=>n.c),a=t.filter(n=>P.carries[n.i]).map(n=>V(n.c,e));return t.length?r("teamBuilderSummary",{n:t.length,carries:a.length?a.join(" / "):r("teamBuilderNoCarry",{},e)},e):r("teamBuilderEmptyHint",{},e)}function nn(e=E()){return`
    <div class="field build-slots-field">
      <div class="build-slots-label-row">
        <label>${s(r("teamBuilderLabel",{},e))}</label>
        <span class="build-slots-hint" id="teamBuilderSummary">${s(Si(e))}</span>
      </div>
      <div class="build-slots-grid" id="buildSlotsGrid">
        ${[0,1,2,3].map(t=>$i(t,e)).join("")}
      </div>
    </div>`}function We(){let e=E(),t=O("#buildSlotsGrid");t&&(t.innerHTML=[0,1,2,3].map(o=>$i(o,e)).join(""));let a=O("#teamBuilderSummary");a&&(a.textContent=Si(e));let n=O("#maneSubmitForm, #fbSubmitForm");n&&da(n)}var qa={mane:"r1999-mane-submit-draft-v1",flashback:"r1999-fb-submit-draft-v1"},Hr=10080*60*1e3;function wi(e,t){return!t||typeof t!="object"?!1:Array.isArray(t.chars)&&t.chars.some(Boolean)||Array.isArray(t.psychubes)&&t.psychubes.some(Boolean)||Array.isArray(t.resonanceCodes)&&t.resonanceCodes.some(Boolean)?!0:e==="mane"?!!(String(t.display_name||"").trim()||String(t.score||"").trim()||String(t.related_url||"").trim()||String(t.contact||"").trim()):!!(String(t.rounds??"").trim()!==""||t.resonanceTen||String(t.relatedUrl||"").trim()||String(t.contact||"").trim())}function _i(e){let t=qa[e];if(!t)return null;try{let a=localStorage.getItem(t);if(!a)return null;let n=JSON.parse(a);return!n||typeof n!="object"?null:n.updatedAt&&Date.now()-Number(n.updatedAt)>Hr?(localStorage.removeItem(t),null):wi(e,n)?n:null}catch{return null}}function ca(e){let t=qa[e];if(t)try{localStorage.removeItem(t)}catch{}}function ki(e){if(la(),!(!e||typeof e!="object"))for(let t=0;t<4;t++){let a=String(e.chars?.[t]??"").trim();P.chars[t]=a,P.carries[t]=!!(Ot(a)&&e.carries?.[t]),P.psychubes[t]=String(e.psychubes?.[t]??"").trim(),P.resonanceCodes[t]=String(e.resonanceCodes?.[t]??"").trim()}}function da(e){if(!e||!e.isConnected)return;let t=e.id==="maneSubmitForm"?"mane":e.id==="fbSubmitForm"?"flashback":"";if(!t)return;let a=new FormData(e),n=t==="mane"?{map_id:String(a.get("map_id")??""),division:String(a.get("division")??""),display_name:String(a.get("display_name")??""),score:String(a.get("score")??""),related_url:String(a.get("related_url")??""),contact:String(a.get("contact")??""),chars:[...P.chars],carries:[...P.carries],psychubes:[...P.psychubes],resonanceCodes:[...P.resonanceCodes],updatedAt:Date.now()}:{nickname:String(a.get("nickname")??""),version:String(a.get("version")??""),stage:String(a.get("stage")??""),group:String(a.get("group")??""),rounds:String(a.get("rounds")??""),resonanceTen:a.has("resonanceTen"),relatedUrl:String(a.get("relatedUrl")??""),contact:String(a.get("contact")??""),chars:[...P.chars],carries:[...P.carries],psychubes:[...P.psychubes],resonanceCodes:[...P.resonanceCodes],updatedAt:Date.now()},o=wi(t,n);try{o?localStorage.setItem(qa[t],JSON.stringify(n)):localStorage.removeItem(qa[t])}catch{}let c=e.querySelector("#clearDraftBtn");c&&(c.hidden=!o)}function Ci(){let e=new Map;for(let t=0;t<4;t++)if(t!==Y.slotIndex)for(let a of yt(P.chars[t]))e.set(q(a),t+1);return e}function Ei(){let e=E(),t=O("#charPickerOverlay");if(!t)return;let a=Y.choices,n=new Set(a.map(q));t.querySelectorAll("[data-choose-char]").forEach(l=>{let u=n.has(q(l.dataset.chooseChar));l.classList.toggle("is-selected",u&&l.classList.contains("char-card-option")),l.classList.toggle("active",u&&l.classList.contains("psy-chip")),l.setAttribute("aria-pressed",String(u))});let o=O("#charPickerSelection");if(o)if(!a.length)o.textContent=C("Select an arcanist or flex wildcard","请选择角色或任意位",e);else{let l=a.map(u=>V(u,e)).join(" / ");o.textContent=a.length>1?`${r("charPickerMultiHint",{n:a.length},e)}: ${l}`:l}let c=O("#confirmCharSelection");c&&(c.disabled=a.length===0)}function pa(){let e=E(),t=O("#charPickerGrid");if(!t)return;let a=le(Y.query),n=Ci(),o=ka.filter(c=>Y.aff!=="all"&&!(c.aff===Y.aff||c.aff==="mineral_star"&&(Y.aff==="mineral"||Y.aff==="star"))||Y.star==="6"&&c.star!==6||Y.star==="5"&&c.star!==5||Y.star==="low"&&c.star>4?!1:a?wt(c.name,a):!0);t.innerHTML=o.length?o.map(c=>{let l=n.get(`char:${c.id}`),u=V(c.name,e),m=Te(c.aff,e),p=l?C(`In Slot ${l}`,`已在 ${l} 号位`,e):`${c.star}★ · ${m}`;return`
          <button type="button" class="char-card-option ${l?"is-used":""}" data-choose-char="${s(c.name)}" ${l?"disabled":""} title="${s(u)} (${c.star}★${l?` · ${p}`:""})">
            ${Or(c,e)}
            <span class="char-opt-name">${s(u)}</span>
            <span class="char-opt-meta">${s(p)}</span>
          </button>`}).join(""):`<div class="empty-state" style="grid-column:1/-1;padding:12px"><p>${s(r("charPickerEmpty",{},e))}</p></div>`,t.scrollTop=0,O("#charPickerOverlay")?.querySelectorAll("[data-char-aff], [data-char-star]").forEach(c=>{let l=c.dataset.charAff===Y.aff||c.dataset.charStar===Y.star;c.classList.toggle("active",l),c.setAttribute("aria-pressed",String(l))}),Ei()}function rn(){let e=E(),t=O("#charPickerRoot");if(!t)return;if(!Y.open){t.innerHTML="";return}let a=P.chars[Y.slotIndex]||"",n=yt(a).some(c=>!oa(c)&&!te(c))?a:"",o=Y.slotIndex+1;t.innerHTML=`
    <div class="psy-picker-overlay" id="charPickerOverlay">
      <section class="psy-picker-box" role="dialog" aria-modal="true" aria-label="${s(r("charPickerTitle",{n:o},e))}">
        <button type="button" class="modal-close" data-action="close-char-picker" aria-label="${s(r("btnClose",{},e))}">×</button>
        <div class="modal-eyebrow">${s(C(`ARCANIST CODEX · ${ka.length} ARCANISTS`,`ARCANIST CODEX · 全角色图鉴（共 ${ka.length} 名）`,e))}</div>
        <h3>${s(r("charPickerTitle",{n:o},e))}</h3>
        <div class="psy-picker-toolbar">
          <div class="psy-picker-filters">
            <div class="psy-chip-group" role="group" aria-label="${s(r("afflatusFilterAria",{},e))}">
              <button type="button" class="psy-chip ${Y.aff==="all"?"active":""}" data-char-aff="all">${s(r("afflatusAll",{},e))}</button>
              ${hi.map(c=>{let l=ge[c];return`
                  <button type="button" class="psy-chip has-aff-icon ${Y.aff===c?"active":""}" data-char-aff="${c}">
                    <img src="${s(l.icon)}" alt="" aria-hidden="true" />
                    <span>${s(Te(c,e))}</span>
                  </button>`}).join("")}
            </div>
            <div class="psy-chip-group" role="group" aria-label="${s(r("charPickerAllStars",{},e))}">
              ${[["all",r("charPickerAllStars",{},e)],["6","6★"],["5","5★"],["low",C("≤4★","4★及以下",e)]].map(([c,l])=>`<button type="button" class="psy-chip ${Y.star===c?"active":""}" data-char-star="${c}">${s(l)}</button>`).join("")}
            </div>
          </div>
          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="charPickerSearch" class="filter-input has-icon" type="search" aria-label="${s(r("charPickerSearchPlaceholder",{},e))}" placeholder="${s(r("charPickerSearchPlaceholder",{},e))}" value="${s(Y.query)}" />
          </div>
        </div>
        <div class="psy-chip-group" role="group" aria-label="${s(r("charPickerWildcardHeading",{},e))}">
          ${Ca.map(c=>`
            <button type="button" class="psy-chip" data-choose-char="${s(c.cn)}">${s(N(e)?c.en:c.cn)}</button>
          `).join("")}
        </div>
        <div id="charPickerGrid" class="char-picker-grid" style="min-height:0;flex:1 1 auto"></div>
        <div class="char-custom-row" style="align-items:center">
          <small id="charPickerSelection" class="field-hint" role="status" style="flex:1;min-width:0;overflow-wrap:anywhere"></small>
          <button id="confirmCharSelection" type="button" class="copper-btn" data-action="confirm-char-selection">${s(r("charPickerConfirm",{},e))}</button>
        </div>
        <small class="field-hint">${s(r("charPickerSub",{},e))}</small>
        <div class="char-custom-row">
          <input id="charCustomInput" type="text" maxlength="40" aria-label="${s(C("Custom arcanist input","手动填写角色",e))}" placeholder="${s(C("Custom name or flex options separated by /","手动填入角色，备选用 / 隔开",e))}" value="${s(n)}" />
          <button type="button" class="outline-btn" data-action="apply-custom-char">${s(C("Apply","手动填入",e))}</button>
        </div>
      </section>
    </div>`,pa()}function Gr(e){Y.open=!0,Y.slotIndex=e,Y.aff="all",Y.star="all",Y.query="",Y.choices=yt(P.chars[e]),rn(),requestAnimationFrame(()=>O("#charPickerSearch")?.focus())}function ba(){Y.open=!1,rn()}function Kr(e){let t=en(e),a=q(t),n=Y.choices;n.some(o=>q(o)===a)?Y.choices=n.filter(o=>q(o)!==a):oa(t)?Y.choices=[t]:Y.choices=[...n.filter(o=>!oa(o)),t],Ei()}function ci(e){let t=E(),a=e.map(en),n=a.join("/");if(!a.length||a.some(m=>!m)||Array.from(n).length>40)throw new Error(r("errSlotNameTooLong",{},t));if(a.length>1&&a.some(oa))throw new Error(C("Wildcard slots must be selected alone.","任意位需单独选择。",t));let o=a.map(q);if(new Set(o).size!==o.length)throw new Error(C("Please pick distinct flex alternatives.","请选择不同的备选角色。",t));let c=Ci();for(let m of o)if(c.has(m)){let p=V(a[o.indexOf(m)],t);throw new Error(C(`"${p}" is already in Slot ${c.get(m)}.`,`「${p}」已在 ${c.get(m)} 号位。`,t))}let l=Y.slotIndex;if(O("#fbSubmitForm, #fbEditForm")){let m=P.chars.map((p,f)=>f===l?n:p).filter(Boolean);Ps(m,t)}P.chars[l]=n,Ot(n)||(P.carries[l]=!1),We(),ba()}function ua(){let e=E(),t=O("#psyPickerGrid");if(!t)return;let a=ee.query,n=ut.filter(o=>ee.star!=="all"&&String(o.star)!==ee.star||ee.tag!=="全部"&&!o.tags.includes(ee.tag)?!1:Gn(o,a));t.innerHTML=n.length?n.map(o=>{let l=Re(P.psychubes[ee.slotIndex])?.id===o.id||P.psychubes[ee.slotIndex]===o.name,u=Se(o,e),m=ft(o,e);return`
          <button type="button" class="psy-card-option ${l?"is-selected":""}" data-choose-psy="${s(o.name)}" title="${s(u)} (${o.star}★ · ${s(m)} · v${s(o.version)})">
            ${sn(o.id,"in-picker",e)}
            <span class="psy-opt-name">${s(u)}</span>
            <span class="psy-opt-meta">${o.star}★ · ${s(m)}</span>
          </button>`}).join(""):`<div class="empty-state" style="grid-column:1/-1;padding:28px 12px"><p>${s(r("psyPickerEmpty",{},e))}</p></div>`,t.scrollTop=0,O("#psyPickerOverlay")?.querySelectorAll("[data-psy-star], [data-psy-tag]").forEach(o=>{let c=o.dataset.psyStar===ee.star||o.dataset.psyTag===ee.tag;o.classList.toggle("active",c),o.setAttribute("aria-pressed",String(c))})}function on(){let e=E(),t=O("#psyPickerRoot");if(!t)return;if(!ee.open){t.innerHTML="";return}let a=ee.slotIndex+1,n=ee.charName?V(ee.charName,e):"",o=n?`${r("psyPickerTitle",{n:a},e)} · ${n}`:r("psyPickerTitle",{n:a},e);t.innerHTML=`
    <div class="psy-picker-overlay" id="psyPickerOverlay">
      <section class="psy-picker-box" role="dialog" aria-modal="true" aria-label="${s(o)}">
        <button type="button" class="modal-close" data-action="close-psy-picker" aria-label="${s(r("btnClose",{},e))}">×</button>
        <div class="modal-eyebrow">${s(C(`PSYCHUBE CODEX · ${ut.length} PSYCHUBES`,`PSYCHUBE CODEX · 官方心相图鉴（共 ${ut.length} 张）`,e))}</div>
        <h3>${s(o)}</h3>
        <div class="psy-picker-toolbar">
          <div class="psy-picker-filters">
            <div class="psy-chip-group" role="group" aria-label="${s(r("charPickerAllStars",{},e))}">
              ${[["all",r("charPickerAllStars",{},e)],["6","6★"],["5","5★"],["4","4★"]].map(([c,l])=>`<button type="button" class="psy-chip ${ee.star===c?"active":""}" data-psy-star="${c}">${s(l)}</button>`).join("")}
            </div>
            <div class="psy-chip-group" role="group" aria-label="${s(C("Filter by Psychube tag","按定位系别筛选心相",e))}">
              ${Es.map(c=>`<button type="button" class="psy-chip ${ee.tag===c.key?"active":""}" data-psy-tag="${s(c.key)}">${s(As(c.key,e))}</button>`).join("")}
            </div>
          </div>
          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="psyPickerSearch" class="filter-input has-icon" type="search" aria-label="${s(r("psyPickerSearchPlaceholder",{},e))}" placeholder="${s(r("psyPickerSearchPlaceholder",{},e))}" value="${s(ee.query)}" />
          </div>
        </div>
        <div id="psyPickerGrid" class="psy-picker-grid"></div>
      </section>
    </div>`,ua()}function Ur(e){ee.open=!0,ee.slotIndex=e,ee.charName=String(P.chars[e]||"").trim(),ee.star="all",ee.tag="全部",ee.query="",on(),requestAnimationFrame(()=>O("#psyPickerSearch")?.focus())}function ma(){ee.open=!1,on()}function Ya(){return globalThis.crypto?.randomUUID?crypto.randomUUID():`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function le(e){return String(e??"").normalize("NFKC").trim().toLowerCase()}function ue(e){return String(e??"").split(/[/／、]/).map(t=>t.trim()).filter(Boolean)}function Vr(e){return String(e??"").split(/[、，,;；\n]+/).map(t=>t.trim()).filter(Boolean)}function ga(e){let t=String(e??"").trim();if(!t)return"";let a;try{a=new URL(t)}catch{throw new Error(r("errUrlInvalid"))}if(!["http:","https:"].includes(a.protocol)||a.username||a.password||/[\s\\]/u.test(t)||a.href.length>2048)throw new Error(r("errUrlInvalid"));return a.href}function ha(e,t=r("relatedLink")){try{let a=ga(e);return a?`<a class="text-link-btn" href="${s(a)}" target="_blank" rel="noopener noreferrer ugc">${s(t)}</a>`:""}catch{return""}}function Ae(e,t){return e.map(([a,n])=>`<option value="${s(a)}"${a===t?" selected":""}>${s(n)}</option>`).join("")}function X(e){clearTimeout(oi);let t=O("#toast");t&&(t.textContent=e,t.classList.add("visible"),oi=setTimeout(()=>t.classList.remove("visible"),3800))}async function Oa(e){let t=String(e??"");if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(t);return}catch{}let a=document.createElement("textarea");a.value=t,a.setAttribute("readonly",""),a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();let n=document.execCommand("copy");if(a.remove(),!n)throw new Error(r("toastCopyFailed"))}function ye(e,t=!1){O("#modalRoot").innerHTML=`
    <div class="modal-overlay" id="modalOverlay">
      <section class="modal-box ${t?"wide":""}" role="dialog" aria-modal="true">
        <button type="button" class="modal-close" data-action="close-modal" aria-label="${s(r("btnClose"))}">×</button>
        ${e}
      </section>
    </div>`}var ia="";function ya(e,t=E()){return N(t)?e==="fb-board"?`
      <div class="global-server-notice is-warning" role="note">
        <div class="global-server-notice-body">
          <span class="global-server-notice-tag">${s(r("globalFbNoticeTag",{},t))}</span>
          <p>${s(r("globalFbBoardNotice",{},t))}</p>
        </div>
        <button type="button" class="outline-btn global-server-notice-cta" data-action="switch-to-mane">${s(r("globalFbBoardCta",{},t))}</button>
      </div>`:e==="fb-submit"?`
      <div class="global-server-notice is-warning in-modal" role="note">
        <div class="global-server-notice-body">
          <span class="global-server-notice-tag">${s(r("globalFbNoticeTag",{},t))}</span>
          <p>${s(r("globalFbSubmitNotice",{},t))}</p>
        </div>
        <button type="button" class="outline-btn global-server-notice-cta" data-action="switch-to-mane-submit">${s(r("globalFbSubmitCta",{},t))}</button>
      </div>`:`
    <div class="global-server-notice is-welcome${e==="mane-welcome"?" in-modal":""}" role="note">
      <div class="global-server-notice-body">
        <span class="global-server-notice-tag">${s(r("globalManeNoticeTag",{},t))}</span>
        <p>${s(r("globalManeSubmitNotice",{},t))}</p>
      </div>
    </div>`:""}function Ft(e){ia&&(URL.revokeObjectURL(ia),ia=""),e&&(e.innerHTML="",e.hidden=!0)}function ln(e,t,a=""){if(!e||!t)return;let n=e.querySelector(".proof-upload-meta");if(!n)return;let o=C("Click image to zoom","点击图片可放大"),c=Ve(t.size);n.textContent=`${t.name} · ${c}${a?` · ${a}`:""} (${o})`}function Ai(e,t,a=""){Ft(e);let n=ts(t);if(!e||!t||!n||t.size>es)return;ia=URL.createObjectURL(t);let o=C("Click image to zoom","点击图片可放大");e.innerHTML=`<img src="${s(ia)}" alt="${s(C("Screenshot preview","已选截图预览"))}" title="${s(o)}" /><span class="proof-upload-meta"></span>`,ln(e,t,a),e.hidden=!1}function Wr(e,t=C("Screenshot zoom preview","截图放大预览")){if(!e)return;Za();let a=document.createElement("div");a.id="proofLightboxOverlay",a.className="proof-lightbox-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.innerHTML=`<button type="button" class="proof-lightbox-close" data-action="close-lightbox" aria-label="${s(r("btnClose"))}">×</button><img src="${s(e)}" alt="${s(t)}" />`,a.addEventListener("click",n=>{(n.target===a||n.target.closest('[data-action="close-lightbox"]'))&&Za()}),document.body.append(a)}function Za(){O("#proofLightboxOverlay")?.remove()}function Ee(){i.activeDossierModal=null,Za(),Ft(),ba(),ma(),O("#modalRoot").innerHTML="",ss()}function Mi(e){return new Promise((t,a)=>{if(!e?.size){a(new Error(C("Screenshot file is empty.","截图文件为空。")));return}let n=new FileReader;n.onerror=()=>a(new Error(C("Failed to read screenshot file.","截图读取失败。"))),n.onload=()=>{let o=new Image;o.onload=()=>t(o),o.onerror=()=>a(new Error(C("Screenshot could not be decoded. Please check the image file.","截图无法解码，请检查图片是否损坏。"))),o.src=n.result},n.readAsDataURL(e)})}async function Z(e){let t=await e,{data:a,error:n,status:o}=t||{};if(n){if(o&&!n.status)try{n.status=o}catch{}throw n}return a}function qr(e){let t=Number(e?.status??e?.statusCode??0);if(t>=400&&t<500&&t!==429&&t!==408)return!1;let a=String(e?.code||"");if(a&&(/^(22|23|42)/.test(a)||a==="PGRST116"||a==="PGRST301"))return!1;if(t>=500||t===429||t===408||t===0)return!0;let n=String(e?.message||"");return/fetch|network|timeout|500|502|503|504|temporarily|gateway/i.test(n)}async function Rt(e,t=2,a=450){let n;for(let o=0;o<=t;o++)try{return await e()}catch(c){if(n=c,o>=t||!qr(c))throw c;await new Promise(l=>setTimeout(l,a*(o+1)))}throw n}async function Yr(e,t,a="*",n=null){let o=[];for(let c=0;;c+=500){let l=await Rt(()=>{let u=H.from(e).select(a);n&&(u=n(u));for(let m of t)u=u.order(m);return Z(u.range(c,c+499))});if(o.push(...l||[]),!l||l.length<500)return o}}function Ze(e,t){let a=BigInt(e.score||0),n=BigInt(t.score||0);return a!==n?n>a?1:-1:Date.parse(e.created_at)-Date.parse(t.created_at)||String(e.id).localeCompare(String(t.id))}function rt(e,t){return Number(e.rounds)-Number(t.rounds)||Date.parse(e.created_at)-Date.parse(t.created_at)||String(e.id).localeCompare(String(t.id))}var xi="r1999-live-swr-v1",Zr=1440*60*1e3,we={maneCore:!1,maneTotals:!1,maneDaily:!1,fbCore:!1,fbCarries:!1,fbPlayers:!1},nt=new Map;function Jr(){try{return Object.keys(localStorage).some(e=>e.startsWith("sb-")&&e.endsWith("-auth-token")&&!!localStorage.getItem(e))}catch{return!1}}function Xr(){try{let e=String(location.hash||""),t=String(location.search||"");return/(?:access_token=|refresh_token=|code=|type=magiclink|type=recovery)/i.test(`${e}&${t}`)}catch{return!1}}async function Pt(e){let t=window.LEADERBOARD_CONFIG;if(!t?.supabaseUrl||!t?.supabaseAnonKey)throw new Error(C("Missing Supabase configuration in config.js.","缺少 config.js 后端配置。"));let a=t.supabaseUrl.replace(/\/+$/,""),n=await fetch(`${a}/rest/v1/${e}`,{headers:{apikey:t.supabaseAnonKey,Authorization:`Bearer ${t.supabaseAnonKey}`,Accept:"application/json"}}),o=await n.text(),c=null;if(o)try{c=JSON.parse(o)}catch{c=null}if(!n.ok){let l=c&&(c.message||c.error_description||c.error)||`HTTP ${n.status}`,u=new Error(l);throw u.status=n.status,c?.code&&(u.code=c.code),u}return Array.isArray(c)||c&&typeof c=="object"?c:[]}async function Tt(e,t,a="*",n=""){let o=(t||[]).map(m=>m.includes(".")?m:`${m}.asc`).join(","),c=[`select=${encodeURIComponent(a)}`];n&&c.push(n),o&&c.push(`order=${encodeURIComponent(o)}`);let l=c.join("&"),u=[];for(let m=0;;m+=500){let p=await Rt(()=>Pt(`${e}?${l}&offset=${m}&limit=500`));if(u.push(...p||[]),!p||p.length<500)return u}}function Qr(e){let t=Array.isArray(e?.team)?e.team:[];if(!t.length)return[];if(!!e.source_history_id&&t.length<=1)return[{chars:null,displayTeam:t}];let n=t.map(l=>String(l??"").split(/[\/／]/).map(u=>u.trim()).filter(Boolean)),o=[];return n.forEach((l,u)=>{l.length>1&&o.push(u)}),o.length>1||n.some(l=>l.length===0)?[{chars:null,displayTeam:t}]:(o.length===1?n[o[0]].map(l=>n.map((u,m)=>m===o[0]?l:u[0])):[n.map(l=>l[0])]).map(l=>({chars:l.map(u=>u.normalize("NFKC").trim().toLowerCase()).sort(),displayTeam:l}))}function eo(e,t,a,n){let o=new Map((t||[]).map(d=>[d.id,d.display_name])),c=new Map((a||[]).map(d=>[d.id,d])),l=new Map((n||[]).filter(d=>!d.archived_at).map(d=>[d.id,d])),u=new Map;for(let d of e||[]){let b=c.get(d.stage_id);if(!b)continue;let g=l.get(b.version_id);if(g)for(let y of Qr(d)){let h=y.chars?`${d.stage_id}::${d.group_code}::C::${JSON.stringify(y.chars)}`:`${d.stage_id}::${d.group_code}::L::${d.team_key||""}`,v={row:d,stage:b,version:g,chars:y.chars,charSet:y.chars?new Set(y.chars):null,displayTeam:y.displayTeam},S=u.get(h);(!S||rt(v.row,S.row)<0)&&u.set(h,v)}}let m=new Map;for(let d of u.values()){let b=`${d.row.stage_id}::${d.row.group_code}`;m.has(b)||m.set(b,[]),m.get(b).push(d)}let p=new Map;for(let d of m.values())for(let b of d){if(b.chars&&d.some(h=>h.chars&&h.chars.length<b.chars.length&&h.chars.every(v=>b.charSet.has(v))))continue;let g=p.get(b.row.id);g?b.displayTeam.forEach((y,h)=>{g.slotSets[h]&&g.slotSets[h].add(y)}):(g={row:b.row,stage:b.stage,version:b.version,slotSets:b.displayTeam.map(y=>new Set([y]))},p.set(b.row.id,g))}let f=[];for(let d of p.values()){let b=d.row;f.push({id:b.id,player_id:b.player_id,stage_id:b.stage_id,group_code:b.group_code,team:d.slotSets.map(g=>[...g].sort().join("/")),team_key:b.team_key,carry_name:b.carry_name,rounds:b.rounds,created_at:b.created_at,display_name:b.credited_player||o.get(b.player_id)||"",stage_no:d.stage.stage_no,stage_name:d.stage.name,version_id:d.stage.version_id,version_name:d.version.label||d.version.code||"",related_url:b.related_url||null,resonance_ten:b.resonance_ten,team_psychubes:b.team_psychubes||null,team_resonance_codes:b.team_resonance_codes||null})}return f}function Di(e,t){let a=new Map((t||[]).map(o=>[o.id,o])),n=new Map;for(let o of e||[]){let c=a.get(o.stage_id)?.challenge_id||o.stage_id,l=o.version_id||a.get(o.stage_id)?.version_id||null;for(let u of ue(o.carry_name)){let m=l?[l,null]:[null];for(let p of m){let f=`${p||"ALL"}\0${u}`,d=n.get(f);d||(d={version_id:p,carry_name:u,challenges:new Set},n.set(f,d)),d.challenges.add(c)}}}return[...n.values()].map(({version_id:o,carry_name:c,challenges:l})=>({version_id:o,carry_name:c,challenge_count:l.size}))}function to(){try{let e=localStorage.getItem(xi);if(!e)return!1;let t=JSON.parse(e);return!t||!Number.isFinite(t.ts)||Date.now()-t.ts>Zr?!1:(Array.isArray(t.maneMaps)&&t.maneMaps.length&&(i.maneMaps=t.maneMaps),Array.isArray(t.maneScores)&&t.maneScores.length&&(i.maneScores=t.maneScores),Array.isArray(t.fbVersions)&&t.fbVersions.length&&(i.fbVersions=t.fbVersions),Array.isArray(t.fbStages)&&t.fbStages.length&&(i.fbStages=t.fbStages),Array.isArray(t.fbRecords)&&t.fbRecords.length&&(i.fbRecords=t.fbRecords,i.fbCarries=Di(i.fbRecords,i.fbStages),i.fbPlayers=[]),Array.isArray(t.fbArchives)&&(i.fbArchives=t.fbArchives),Wa(),i.mode==="flashback"?i.fbRecords.length>0:i.maneScores.length>0)}catch{return!1}}function di(){try{let e={ts:Date.now(),maneMaps:i.maneMaps,maneScores:i.maneScores,fbVersions:i.fbVersions,fbStages:i.fbStages,fbRecords:i.fbRecords,fbArchives:i.fbArchives};localStorage.setItem(xi,JSON.stringify(e))}catch{}}function Be(e=i.maneSection){let t=i.maneMaps.filter(a=>a.section===e);if(e==="new"){let a=t[0]?.edition;return a?t.filter(n=>n.edition===a):t}return t}function Ja(e){return!!e&&(!e.opens_at||Date.parse(e.opens_at)<=Date.now())}function Me(e){return i.fbStages.filter(t=>t.version_id===e).sort((t,a)=>t.stage_no-a.stage_no)}function ao(e){return i.fbStages.filter(t=>t.challenge_id===e.challenge_id).length}function Ti(){let e=(location.hash||"").replace(/^#/,"");if(!e)return;let[t,a=""]=e.split("?"),[n,o]=t.split("/"),c=new URLSearchParams(a),l=c.get("rec");if(n==="mane"){if(i.mode="mane",["scores","totals","daily","players","rules"].includes(o)&&(i.manePage=o),i.manePage==="daily"){let u=c.get("date");i.maneDaily.date=u&&/^\d{4}-\d{2}-\d{2}$/.test(u)?u:"";let m=c.get("div");i.maneDaily.division=m==="zero"||m==="max"?m:"",i.maneDaily.map=c.get("map")||""}else if(i.manePage==="players"){let u=c.get("scope");["all","new","rerun"].includes(u)&&(i.manePlayerScope=u);let m=c.get("div");["all","zero","max"].includes(m)&&(i.manePlayerDiv=m)}else{let u=c.get("sec");(u==="new"||u==="rerun")&&(i.maneSection=u);let m=c.get("div");(m==="zero"||m==="max")&&(i.maneDivision=m);let p=c.get("map");p&&(i.maneMapId=p)}i.maneMechOpen=c.get("mech")==="1",l?(i.highlightRecordId=`mane-${l}`,qe=`mane-${l}`):i.highlightRecordId=""}else if(n==="flashback"){i.mode="flashback",["leaderboard","carries","players","rules"].includes(o)&&(i.fbPage=o);let u=c.get("ver");u&&(i.fbVersionId=u);let m=c.get("stage");m&&(i.fbStageId=m);let p=c.get("grp");(p==="zero"||p==="max")&&(i.fbGroup=p);let f=c.get("scope");(f==="period"||f==="all")&&(i.fbCarryScope=f);let d=c.get("metric");(d==="appearance_count"||d==="challenge_count")&&(i.fbCarryMetric=d),i.fbResonanceOnly=!l&&i.fbGroup==="zero"&&c.get("res10")==="1",i.fbMechOpen=c.get("mech")==="1",l?(i.highlightRecordId=`fb-${l}`,qe=`fb-${l}`):i.highlightRecordId=""}}function so(){if(i.loading&&!i.maneMaps.length&&!i.fbVersions.length)return;let e=i.mode==="mane"?i.manePage:i.fbPage,t=new URLSearchParams;i.mode==="mane"?e==="scores"?(t.set("sec",i.maneSection),i.maneMapId&&t.set("map",i.maneMapId),t.set("div",i.maneDivision),i.maneMechOpen&&t.set("mech","1"),i.highlightRecordId.startsWith("mane-")&&t.set("rec",i.highlightRecordId.slice(5))):e==="totals"?(t.set("sec",i.maneSection),t.set("div",i.maneDivision)):e==="daily"?(i.maneDaily.date&&t.set("date",i.maneDaily.date),i.maneDaily.division&&t.set("div",i.maneDaily.division),i.maneDaily.map&&t.set("map",i.maneDaily.map)):e==="players"&&(i.manePlayerScope!=="all"&&t.set("scope",i.manePlayerScope),i.manePlayerDiv!=="all"&&t.set("div",i.manePlayerDiv)):e==="leaderboard"?(i.fbVersionId&&t.set("ver",i.fbVersionId),i.fbStageId&&t.set("stage",i.fbStageId),t.set("grp",i.fbGroup),i.fbGroup==="zero"&&i.fbResonanceOnly&&t.set("res10","1"),i.fbMechOpen&&t.set("mech","1"),i.highlightRecordId.startsWith("fb-")&&t.set("rec",i.highlightRecordId.slice(3))):e==="carries"?(i.fbCarryScope!=="period"&&t.set("scope",i.fbCarryScope),i.fbCarryScope==="period"&&i.fbVersionId&&t.set("ver",i.fbVersionId),i.fbCarryMetric!=="appearance_count"&&t.set("metric",i.fbCarryMetric)):e==="players"&&i.fbVersionId&&t.set("ver",i.fbVersionId);let a=t.toString(),n=`#${i.mode}/${e}${a?`?${a}`:""}`;if(location.hash!==n)try{history.replaceState(null,"",`${location.search||""}${n}`)}catch{}}function no(e){try{let t=new URL(location.href);t.searchParams.set("lang",e),history.replaceState(null,"",`${t.pathname}${t.search}${t.hash}`)}catch{}}function pi(e){let t=E(),n=`${location.origin&&location.origin!=="null"?location.origin:""}${location.pathname}?lang=${encodeURIComponent(t)}`;if(e.mode==="mane"){if(!e.rank&&e.dailyDate){let l=new URLSearchParams({date:e.dailyDate});return e.division&&l.set("div",e.division),e.mapId&&l.set("map",e.mapId),`${n}#mane/daily?${l.toString()}`}let c=new URLSearchParams({sec:e.section||i.maneSection,map:e.mapId||i.maneMapId,div:e.division||i.maneDivision,rec:String(e.recordId||"")});return`${n}#mane/scores?${c.toString()}`}let o=new URLSearchParams({ver:e.versionId||i.fbVersionId,stage:e.stageId||i.fbStageId,grp:e.group||i.fbGroup,rec:String(e.recordId||"")});return`${n}#flashback/leaderboard?${o.toString()}`}async function Nt(){if(H)return H;let e=window.LEADERBOARD_CONFIG;if(!e?.supabaseUrl||!e?.supabaseAnonKey)throw new Error(C("Missing Supabase configuration in config.js.","缺少 config.js 后端配置。"));let t=await Lr().catch(()=>null),a=t?.createClient||t?.default?.createClient||globalThis.supabase?.createClient;if(typeof a!="function"){let n=["https://fastly.jsdelivr.net/npm/@supabase/supabase-js@2/+esm","https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm","https://esm.sh/@supabase/supabase-js@2"],o=new Function("u","return import(u)"),c;for(let l of n)try{let u=await o(l);if(typeof u?.createClient=="function"){a=u.createClient;break}}catch(u){c=u}if(typeof a!="function")throw c||new Error(C("Failed to initialize Supabase client.","初始化数据库连接失败。"))}return H=a(e.supabaseUrl,e.supabaseAnonKey),li||(li=!0,H.auth.onAuthStateChange((n,o)=>{setTimeout(()=>zt(o).catch(()=>{}),0)})),H}async function ht(e,{force:t=!1,silentRender:a=!1}={}){if(!t&&we[e])return;if(nt.has(e))return nt.get(e);let n=(async()=>{if(e==="maneCore"){let[o,c]=await Promise.all([Rt(()=>Pt("mane_maps?select=id%2Cname%2Csection%2Cedition%2Cposition%2Copens_at%2Cactive&active=eq.true")),Tt("mane_leaderboard",["id"])]);i.maneMaps=(o||[]).sort((l,u)=>String(u.edition).localeCompare(String(l.edition),"en",{numeric:!0})||l.position-u.position||String(l.name).localeCompare(String(u.name),"zh-CN")),i.maneScores=c||[],we.maneCore=!0,Wa(),di(),i.dataSource="live",i.connected=!0,i.errorNotice="",i.loading=!1}else if(e==="maneTotals")i.maneTotals=await Tt("mane_carry_total_leaderboard",["section","edition","division","carry_key"]),we.maneTotals=!0;else if(e==="maneDaily")i.maneDailyScores=await Tt("mane_daily_scores",["id"],"id,map_id,division,display_name,carry,team,score,approved_at,related_url"),we.maneDaily=!0;else if(e==="fbCore"){let[o,c,l,u,m]=await Promise.all([Rt(()=>Pt("versions?select=id%2Ccode%2Clabel%2Ccreated_at%2Carchived_at")),Rt(()=>Pt("stages?select=id%2Cversion_id%2Cstage_no%2Cname%2Cchallenge_id")),Rt(()=>Pt("historical_records?select=id%2Cstage_id%2Cgroup_code%2Cdisplay_order%2Ccarry_names%2Clineup_label%2Ccredited_player")),Tt("submissions",["id"],"id,player_id,credited_profile_id,credited_player,source_history_id,stage_id,group_code,team,team_key,carry_name,rounds,created_at,related_url,resonance_ten,team_psychubes,team_resonance_codes","status=eq.approved&archived_at=is.null"),Tt("profiles",["id"],"id,display_name")]),p=(o||[]).filter(d=>!d.archived_at);i.fbVersions=p.sort((d,b)=>String(b.code).localeCompare(String(d.code),"en",{numeric:!0})||Date.parse(b.created_at)-Date.parse(d.created_at)),i.fbStages=c||[],i.fbArchives=l||[];let f=new Map((m||[]).map(d=>[d.id,d.display_name]));i.fbApprovedRecords=(u||[]).map(d=>({...d,display_name:d.credited_player||f.get(d.credited_profile_id||d.player_id)||""})),i.fbRecords=eo(u,m,i.fbStages,o),i.fbCarries=Di(i.fbRecords,i.fbStages),i.fbPlayers=[],we.fbCore=!0,we.fbCarries=!0,we.fbPlayers=!0,Wa(),di(),i.dataSource="live",i.connected=!0,i.errorNotice="",i.loading=!1}})().finally(()=>{nt.delete(e)});nt.set(e,n),await n,a||K()}function Li(){if(i.mode==="flashback")return["fbCore"];let e=["maneCore"];return i.manePage==="totals"?e.push("maneTotals"):i.manePage==="daily"&&e.push("maneDaily"),e}async function sa({force:e=!1}={}){let t=window.LEADERBOARD_CONFIG;if(!t?.supabaseUrl||!t?.supabaseAnonKey||pe()&&i.dataSource==="offline")return;let a=Li().filter(n=>e||!we[n]&&!nt.has(n));if(a.length)try{await Promise.all(a.map(n=>ht(n,{force:e})))}catch(n){console.warn("View slice load failed:",n)}}async function Ri({silent:e=!1,force:t=!0}={}){if(!i.syncingLive){i.syncingLive=!0,is();try{await gt({keepOfflineOnFail:!0,force:t}),i.dataSource==="live"&&!e&&X(r("offlineSyncOk"))}catch(a){console.warn("Live sync failed:",a),!i.maneMaps.length&&!i.fbStages.length&&(await It(),Ye()),pe()?(i.dataSource="offline",i.connected=!0,i.errorNotice=""):!i.maneScores.length&&!i.fbRecords.length&&(i.dataSource="disconnected",i.connected=!1,i.errorNotice=r("offlineSyncFail")),i.loading=!1,e||X(r("offlineSyncFail"))}finally{i.syncingLive=!1,K()}}}async function gt({keepOfflineOnFail:e=!1,force:t=!0}={}){if(pe()&&i.dataSource==="offline"&&!H){await It(),Ye(),K();return}await Ka;let a=[...it];it.clear();let n=i.mode==="flashback"?i.fbRecords.length>0:i.maneScores.length>0;n||(i.loading=!0),is();try{let o=Li();await Promise.all(o.map(c=>ht(c,{force:t,silentRender:!0}))),i.dataSource="live",i.connected=!0,i.errorNotice="",i.loading=!1,K()}catch(o){if(a.forEach(c=>{it.add(c)}),console.error(o),!i.maneMaps.length&&!i.fbStages.length&&(await It(),Ye()),pe()&&e)throw i.dataSource="offline",i.connected=!0,i.errorNotice="",o;if(n||(i.dataSource="disconnected",i.connected=!1,i.errorNotice=r("offlineSyncFail")),e)throw o}finally{i.loading=!1,K(),i.connected&&i.dataSource==="live"&&ss()}}var it=new Set,Ka=null;function ss(){if(i.dataSource!=="live"||Ka||!it.size||i.loading||O("#modalOverlay"))return;let e=[...it];it.clear();let t=e.map(async a=>{if(a==="mane"){we.maneCore=!1;let n=["maneCore"];(we.maneTotals||i.manePage==="totals")&&n.push("maneTotals"),(we.maneDaily||i.manePage==="daily")&&n.push("maneDaily"),await Promise.all(n.map(o=>ht(o,{force:!0,silentRender:!0})))}else we.fbCore=!1,we.fbCarries=!1,we.fbPlayers=!1,await ht("fbCore",{force:!0,silentRender:!0})});Ka=Promise.allSettled(t).then(a=>{let n=!1;for(let[o,c]of a.entries())c.status!=="fulfilled"&&(it.add(e[o]),n=!0,console.error(c.reason));Ka=null,a.some(o=>o.status==="fulfilled")&&K(),n||ss()})}async function zt(e){if(H){try{let t=e;if(t===void 0&&(t=(await Z(H.auth.getSession())).session),i.session=t||null,i.user=t?.user||null,i.profile=null,i.isAdmin=!1,i.user){let[a,n]=await Promise.all([H.from("profiles").select("id,display_name").eq("id",i.user.id).maybeSingle(),H.rpc("is_admin")]);a.error||(i.profile=a.data||null),n.error||(i.isAdmin=!!n.data)}}catch(t){console.error(t)}is()}}function jt(e,t,a=""){return`
    <div class="ig-heading">
      <span class="ig-heading-left">
        <span class="ig-tri" aria-hidden="true">▶</span>
        <span class="ig-cn">${s(e)}</span>
        <span class="ig-bar" aria-hidden="true"></span>
        <span class="ig-en">${s(t)}</span>
      </span>
      ${a?`<span class="ig-right">${s(a)}</span>`:""}
    </div>`}function cn(e){return Array.isArray(e)&&e.length===1&&!te(e[0])&&(/[+/／]/.test(e[0])||e[0].length>=4)}function Pi(e,t){if(!t)return!0;let a=Wt(e);return a===t||a==="mineral_star"&&(t==="mineral"||t==="star")}function ns(e,t,a,n=E()){let o=N(n)?"en":"zh-CN",c=new Map;for(let l of e){let u=t==="member"?_t(l.team,a(l)):ue(a(l)),m=new Set;for(let p of u){if(!te(p)&&t==="member")continue;let f=q(p);if(!f||m.has(f))continue;m.add(f);let d=V(p,n),b=te(p),g=c.get(f);g?g.count+=1:c.set(f,{label:d,count:1,portrait:b?.portrait||"",char:b})}}return[...c.entries()].sort((l,u)=>u[1].count-l[1].count||l[1].label.localeCompare(u[1].label,o))}function Ii(e,t,a,n,o=E()){let c=ns(e,"carry",t,o).slice(0,4);return c.length?`
    <div class="sidebar-meta-widget">
      ${jt(r("headingTopCarries",{},o),r("headingTopCarriesEn",{},o),C("RUNS","出场次数",o))}
      <div class="meta-carry-list">
        ${c.map(([l,u])=>{let m=a===l,p=N(o)?u.count===1?"1 run":`${u.count} runs`:`${u.count} 次`;return`
            <button type="button" class="meta-carry-row ${m?"active":""}" data-meta-carry="${s(l)}" data-meta-mode="${s(n)}" title="${s(u.label)} · ${s(ie(u.count,o))}">
              <span class="meta-carry-avatar">
                ${u.portrait?`<img src="${s(u.portrait)}" alt="${s(u.label)}" loading="lazy" decoding="async" />`:`<span class="char-slot-mono">${s(Qe(u.label))}</span>`}
              </span>
              <span class="meta-carry-info">
                <span class="meta-carry-top">
                  <span class="meta-carry-name">${s(u.label)}</span>
                  <span class="meta-carry-count">${s(p)}</span>
                </span>
              </span>
            </button>`}).join("")}
      </div>
    </div>`:`
      <div class="sidebar-meta-widget">
        ${jt(r("headingTopCarries",{},o),r("headingTopCarriesEn",{},o),C("RUNS","出场次数",o))}
        <p class="sidebar-note" style="margin:0">${s(r("topCarriesEmpty",{},o))}</p>
      </div>`}function Bi(e,t,a=E()){return`
    <div class="aff-filter-row" role="group" aria-label="${s(r("afflatusFilterAria",{},a))}">
      ${hi.map(n=>{let o=ge[n],c=Te(n,a),l=e===n;return`
          <button type="button" class="aff-filter-btn ${l?"active":""}" ${t}="${n}" aria-pressed="${l}" title="${s(r("afflatusOnlyTitle",{aff:c},a))}">
            <img src="${s(o.icon)}" alt="" aria-hidden="true" />
            <span>${s(c)}</span>
          </button>`}).join("")}
    </div>`}function io(e,t=E()){let a=String(e??"").trim();if(!a)return"";let n=Re(a),o=Se(n||a,t),c=`data-open-psy="${s(n?n.id:a)}" role="button" tabindex="0"`;if(!n)return`
      <div class="slot-psy-dock is-clickable" ${c} aria-label="${s(o)}">
        <span class="slot-psy-frame"><span>✦</span></span>
        <span class="slot-psy-tooltip">${s(o)}</span>
      </div>`;let l=ft(n,t);return`
    <div class="slot-psy-dock is-clickable" ${c} aria-label="${s(o)}">
      <span class="slot-psy-frame">
        <img class="slot-psy-bg" src="${s(Qt(n.star))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <img class="slot-psy-icon" src="${s(mt(n.id))}" alt="${s(o)}" loading="lazy" decoding="async" />
      </span>
      <span class="slot-psy-tooltip">${s(o)} · ${n.star}★ ${s(l)}</span>
    </div>`}function dn(e,t,a=[],n=E()){let o=Ue(e,t);if(!o.length)return"";if(o.length===1&&o[0].type==="legacy")return`<div class="legacy-team-ribbon"><small>${s(r("legacyTeamLabel",{},n))}</small><span>${s(o[0].raw)}</span></div>`;let c=new Set(ue(t).map(q)),l=Array.isArray(a)?a:[],u=N(n)?"MAIN":"主C";return`<div class="formation-strip">${o.map((m,p)=>{let f=io(l[p],n);if(m.type==="flex"){let L=m.chars.slice(0,4),B=L.length<=2?"cols-2":L.length===3?"cols-3":"cols-4",R=Ma(m,n);return`
        <div class="formation-unit">
          <div class="formation-slot is-flex has-portrait" title="${s(R.title)}">
            <div class="slot-flex-collage ${B}">
              ${L.map(G=>`<img src="${s(G.portrait)}" alt="${s(V(G.name,n))}" loading="lazy" decoding="async" />`).join("")}
            </div>
            <div class="slot-vignette" aria-hidden="true"></div>
            <span class="slot-flex-tag">${s(R.tag)}</span>
            <div class="slot-namebar">${s(R.label)}</div>
          </div>
          ${f}
        </div>`}if(m.type==="wild"){let L=xa(m,n);return`
        <div class="formation-unit">
          <div class="formation-slot is-wild" title="${s(L.title)}">
            <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div class="slot-wild-body" aria-hidden="true">
              <span class="slot-wild-glyph">✦</span>
              <span class="slot-wild-sub">${s(L.sub)}</span>
            </div>
            <div class="slot-namebar">${s(L.label)}</div>
          </div>
          ${f}
        </div>`}let d=m.raw||"",b=m.char||te(d),g=b?V(b.name,n):V(d,n),y=b?.aff||Wt(d),h=ge[y]||ge.unknown,v=Te(y,n),S=c.has(b?`char:${b.id}`:q(d)),A=Qe(g),_=!!b?.portrait,M=kt(b?.star||6),$=h.icon?`<img class="slot-aff-img" src="${s(h.icon)}" alt="${s(v)}" loading="lazy" decoding="async" />`:`<span class="slot-ribbon" style="background:${h.ribbon}" aria-label="${s(v)}">${La(y)}</span>`,k=[g,y!=="unknown"?v:"",b?.star?`${b.star}★`:"",S?r("mainDpsLabel",{},n):""].filter(Boolean).join(" · ");return`
      <div class="formation-unit">
        <div class="formation-slot is-clickable ${S?"is-carry":""} ${_?"has-portrait":""}" data-open-char="${s(b?b.name:d)}" role="button" tabindex="0" title="${s(k)}">
          <img class="slot-card-bg" src="./assets/uttu/bg_kapaidi.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="slot-center" aria-hidden="true">
            ${Tn()}
            <span class="slot-monogram">${s(A)}</span>
          </div>
          ${_?`<img class="slot-portrait" src="${s(b.portrait)}" alt="${s(g)}" loading="lazy" decoding="async" onerror="this.closest('.formation-slot')?.classList.remove('has-portrait');this.remove()" />`:""}
          <img class="slot-rarity-layer" src="${s(M)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div class="slot-vignette" aria-hidden="true"></div>
          ${$}
          ${S?`<span class="slot-carry-tag">${s(u)}</span>`:""}
          <div class="slot-namebar">${s(g)}</div>
        </div>
        ${f}
      </div>`}).join("")}</div>`}function Fi(e,t=E()){let a=te(e),n=V(e,t),o=a?.aff||Wt(e),c=ge[o]||ge.unknown,l=Te(o,t);return a?.portrait?`
      <span class="carry-avatar" title="${s(n)} · ${s(l)}">
        <img class="carry-avatar-pic" src="${s(a.portrait)}" alt="${s(n)}" loading="lazy" decoding="async" onerror="this.remove()" />
        <img class="carry-avatar-rar" src="${s(kt(a.star||6))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        ${c.icon?`<img class="carry-avatar-aff-img" src="${s(c.icon)}" alt="${s(l)}" loading="lazy" decoding="async" />`:`<span class="carry-avatar-aff" style="background:${c.ribbon}">${La(o)}</span>`}
      </span>`:`<span class="inline-aff-dot" style="background:${c.ribbon}">${La(o)}</span>`}function Ht(e,t=E()){let a=r("rankAria",{rank:e},t);return e===1||e===2||e===3?`<span class="rank-badge medal r${e} has-official-badge" aria-label="${s(a)}"><img class="rank-badge-img" src="./assets/official/ranking-${e}.png" alt="#${e}" loading="lazy" decoding="async" /></span>`:`<span class="rank-badge" aria-label="${s(a)}">${String(e).padStart(2,"0")}</span>`}function qs(e,t=E()){let a=Ta(e,t),n=`${a.subGrade||a.grade}${a.tag?` · ${a.tag}`:""}`;return a.img?`
      <span class="grade-badge-wrap ${a.tier}" title="${s(n)}">
        <img class="grade-badge-img" src="${s(a.img)}" alt="${s(a.subGrade||a.grade)}" loading="lazy" decoding="async" />
        ${a.tag?`<span class="grade-mythic-pill">${s(a.tag)}</span>`:""}
      </span>`:`<span class="grade-crest ${a.tier}" title="${s(n)}"><span>${s(a.grade)}</span></span>`}function ro(){let e=new Map(i.maneMaps.map(n=>[n.id,n])),t=null,a=-1n;for(let n of i.maneScores){let o=e.get(n.map_id);if(!o)continue;let c=BigInt(n.score||0);(c>a||c===a&&t&&Ze(n,t.rec)<0)&&(a=c,t={rec:n,map:o,score:c})}return t}function oo(){let e=new Map(i.fbStages.map(a=>[a.id,a])),t=null;for(let a of i.fbRecords){let n=e.get(a.stage_id);n&&(!t||rt(a,t.rec)<0)&&(t={rec:a,stage:n})}return t}function is(){let e=E(),t=N(e),a=fs(window.LEADERBOARD_CONFIG?.issueMeta,e);document.body.dataset.mode=i.mode,document.body.dataset.lang=e,document.documentElement.lang=t?"en":"zh-CN",document.title=i.mode==="mane"?r("pageTitleMane",{},e):r("pageTitleFb",{},e);let n=O("#brandHomeLink");n&&n.setAttribute("aria-label",r("brandHomeAria",{},e));let o=O("#brandGlyph");o&&(o.textContent=i.mode==="mane"?r("brandGlyphMane",{},e):r("brandGlyphFb",{},e));let c=O("#brandTitle");c&&(c.textContent=i.mode==="mane"?r("brandTitleMane",{},e):r("brandTitleFb",{},e));let l=O("#brandSub");l&&(l.textContent=r("brandSub",{},e));let u=O("#modeSwitcher");u&&u.setAttribute("aria-label",r("modeSwitcherAria",{},e));let m=O("#modeManeLabel");m&&(m.textContent=r("modeMane",{},e));let p=O("#modeFbLabel");p&&(p.textContent=r("modeFlashback",{},e)),document.querySelectorAll("[data-mode-switch]").forEach(I=>{let F=I.dataset.modeSwitch===i.mode;I.classList.toggle("active",F),I.setAttribute("aria-selected",String(F))}),document.querySelectorAll("[data-set-lang]").forEach(I=>{let F=I.dataset.setLang===e;I.classList.toggle("active",F),I.setAttribute("aria-pressed",String(F))});let f=O("#connectionBadge"),d=O("#connectionText"),b=pe()&&i.dataSource==="offline",g=!b&&!i.connected&&!i.syncingLive&&!i.loading;f&&d&&(f.classList.toggle("is-offline-archive",b&&!i.syncingLive),f.classList.toggle("online",!b&&i.connected&&!i.syncingLive),f.classList.toggle("offline",g),i.syncingLive||i.loading?d.textContent=r("statusSyncing",{},e):b?d.textContent=C(`Offline Archive · v${a.version}`,`离线档案 · v${a.version}`,e):i.connected?d.textContent=r("statusLive",{},e):d.textContent=C("Connection Lost · Retry","实时连接中断 · 请重试",e));let y=O("#syncLiveBtn");y&&(y.hidden=!(b||g),y.disabled=i.syncingLive,y.textContent=i.syncingLive?r("statusSyncing",{},e):`${r("btnSyncLive",{},e)} ↻`);let h=i.connected&&i.maneMaps.some(Ja),v=i.connected&&i.fbStages.length>0,S=O("#submitBtn");if(S){S.disabled=i.mode==="mane"?!h:!v;let I=O("#submitBtnMain"),F=O("#submitBtnSub");I&&(I.innerHTML=t?'+ Submit<span class="cta-ext"> Record</span>':'＋ 投稿<span class="cta-ext">成绩</span>'),F&&(F.textContent=i.mode==="mane"?r("ctaSubMane",{},e):r("ctaSubFb",{},e))}let A=O("#adminCenterBtn");A&&(A.hidden=!i.isAdmin,A.innerHTML=`<span class="acc-full">${s(r("btnAdmin",{},e))}</span><span class="acc-short">${s(r("btnAdminShort",{},e))}</span>`);let _=O("#mySubmissionsBtn");_&&(_.innerHTML=`<span class="acc-full">${s(r("btnMySubmissions",{},e))}</span><span class="acc-short">${s(r("btnMySubmissionsShort",{},e))}</span>`);let M=O("#accountBtn");if(M){let I=r("btnAdminLogin",{},e),F=r("btnAdminLoginShort",{},e);i.isAdmin?(I=r("accountAdmin",{},e),F=r("accountAdminShort",{},e)):i.profile?.display_name?(I=i.profile.display_name,F=i.profile.display_name.slice(0,6)):i.user&&!i.user.is_anonymous&&(I=r("accountUser",{},e),F=r("accountUserShort",{},e)),M.innerHTML=`<span class="acc-full">${s(I)}</span><span class="acc-short">${s(F)}</span>`}let $=O("#subnavBar");$&&$.setAttribute("aria-label",r("subnavAria",{},e));let k=i.mode==="mane"?[["scores",r("navScores",{},e)],["daily",r("navDaily",{},e)],["totals",r("navTotals",{},e)],["players",r("navPlayers",{},e)],["rules",r("navRules",{},e)]]:[["leaderboard",r("navFbLeaderboard",{},e)],["carries",r("navFbCarries",{},e)],["players",r("navFbPlayers",{},e)],["rules",r("navFbRules",{},e)]],L=i.mode==="mane"?i.manePage:i.fbPage,B=k.map(([I,F])=>`<button type="button" class="subnav-tab ${I===L?"active":""}" data-subpage="${I}">${s(F)}</button>`).join(""),R=i.mode==="mane"?r("subnavMetaMane",{},e):r("subnavMetaFb",{},e),G=O("#subnavTabs"),T=O("#subnavMeta");G?(G.innerHTML=B,T&&(T.textContent=R)):O("#subnav").innerHTML=`
      <div class="subnav-tabs" id="subnavTabs">${B}</div>
      <div class="subnav-right" id="subnavRight"><span class="subnav-meta" id="subnavMeta">${s(R)}</span></div>`;let D=O("#globalNotice");D&&(i.errorNotice?(D.hidden=!1,D.classList.add("is-error"),D.innerHTML=`<span>${s(i.errorNotice)}</span><button type="button" class="outline-btn" data-action="sync-live">${s(r("btnReconnect",{},e))}</button>`):(D.hidden=!0,D.classList.remove("is-error"),D.innerHTML=""));let w=O("#siteFooter");if(w){let I=t?"https://reverse1999.fandom.com/wiki/Mane%27s_Bulletin":"https://res1999.huijiwiki.com/wiki/%E9%AC%83%E6%AF%9B%E9%82%AE%E6%8A%A5",F=t?"https://reverse1999.fandom.com/wiki/Focused_Flashback":"https://res1999.huijiwiki.com/wiki/%E7%84%A6%E7%82%B9%E9%97%AA%E5%9B%9E",W=t?"Reverse: 1999 Wiki · Mane's Bulletin ↗":r("footerWikiMane",{},e),ne=t?"Reverse: 1999 Wiki · Focused Flashback ↗":r("footerWikiFb",{},e),re=t?'Curator: <span class="is-player-name">幻化凌风</span> (<a href="https://space.bilibili.com/266889606" target="_blank" rel="noopener noreferrer">Bilibili ↗</a>) · Moderators: <span class="is-player-name">寻屿</span>, <span class="is-player-name">莳雨枫椛</span>, <span class="is-player-name">偶尔出现的神秘猫猫头</span>, <span class="is-player-name">椋-喵</span>':'社区榜单站长：幻化凌风（<a href="https://space.bilibili.com/266889606" target="_blank" rel="noopener noreferrer">哔哩哔哩主页 ↗</a>）· 管理员：寻屿、莳雨枫椛、偶尔出现的神秘猫猫头、椋-喵';w.innerHTML=`
      <div class="footer-inner">
        <div class="footer-col">
          <div class="footer-brand">
            <strong>${s(r("footerBrandTitle",{},e))}</strong>
            <span>${s(r("footerBrandSub",{},e))}</span>
          </div>
          <p class="footer-credits">${re}</p>
        </div>
        <div class="footer-col footer-links">
          <div class="footer-ref-links">
            <a href="${s(I)}" target="_blank" rel="noopener noreferrer">${s(W)}</a>
            <a href="${s(F)}" target="_blank" rel="noopener noreferrer">${s(ne)}</a>
          </div>
          <p class="footer-disclaimer">${s(r("footerDisclaimer",{},e))}</p>
        </div>
      </div>`}}function lo(){let e=E(),t=fs(window.LEADERBOARD_CONFIG?.issueMeta,e);if(i.mode==="mane"){let a=Be("new"),n=Be("rerun"),o=new Set(i.maneScores.map(p=>le(p.display_name)).filter(Boolean)).size,c=ro(),l=c?Pe(c.map.name,c.map.section):null,u=c?Ta(c.score,e):null,m=c?`${fe(c.map.name,e)} · ${Ce(c.rec.division,e)}`:r("sitePeakFallback",{},e);O("#masthead").innerHTML=`
      <span class="masthead-stencil" aria-hidden="true">MANE’S BULLETIN</span>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>${s(r("maneTitle",{},e))}</h1>
          <span class="masthead-en">${s(r("maneEnTag",{},e))}</span>
        </div>
        <span class="masthead-edition-ribbon">
          <span class="edition-hourglass" aria-hidden="true">⧗</span>
          <span>${s(t.fullLabel)}</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">${s(be(i.maneSection,e))}</span>
        </span>
        <p class="masthead-motto">${s(r("maneMotto",{},e))}</p>
      </div>
      <div class="masthead-metrics" aria-label="${s(r("mastheadMetricsAria",{},e))}">
        <div class="mstat-cell">
          <strong>${i.maneScores.length||"—"}</strong>
          <small>${s(r("metricRecords",{},e))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${o||"—"}</strong>
          <small>${s(r("metricInvestigators",{},e))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${a.length} / ${n.length}</strong>
          <small>${s(r("metricBosses",{},e))}</small>
        </div>
        ${c?`<button type="button" class="mstat-cell mstat-jump is-peak-card" data-jump-mane-record="${s(c.rec.id)}" data-jump-section="${s(c.map.section)}" data-jump-map="${s(c.map.id)}" data-jump-div="${s(c.rec.division)}" title="${s(r("jumpPeakTitle",{source:m},e))}">
               ${l?.thumb?`<span class="peak-card-art" style="background-image:url('${s(l.thumb)}')" aria-hidden="true"></span>`:""}
               <div class="peak-card-top">
                 ${u?.img?`<img class="peak-mini-grade" src="${s(u.img)}" alt="" aria-hidden="true" />`:""}
                 <strong>${de(c.score,e)}</strong>
               </div>
               <small><span class="jump-tag">${s(r("jumpTagPeak",{},e))}</span><span class="jump-desc">${s(m)} ↗</span></small>
             </button>`:`<div class="mstat-cell"><strong>—</strong><small>${s(r("metricSitePeak",{},e))}</small></div>`}
      </div>`}else{let a=i.fbVersions.find(u=>u.id===i.fbVersionId)||i.fbVersions[0],n=Wi(i.fbVersionId).length,o=oo(),c=o?Da(o.stage):null,l=o?`${$t(o.stage.name,e)} · ${Ce(o.rec.group_code,e)}`:r("fbRoundWindowFallback",{},e);O("#masthead").innerHTML=`
      <span class="masthead-stencil" aria-hidden="true">FLASHBACK</span>
      <div class="astrolabe-ornament" aria-hidden="true"></div>
      <div class="masthead-identity">
        <div class="masthead-title-row">
          <span class="title-seal-orb" aria-hidden="true"></span>
          <h1>${s(r("fbTitle",{},e))}</h1>
          <span class="masthead-en">${s(r("fbEnTag",{},e))}</span>
        </div>
        <span class="masthead-edition-ribbon">
          <span class="edition-hourglass" aria-hidden="true">⧗</span>
          <span>${s(a?xe(a,e):r("fbCycleFallback",{},e))}</span>
          <span class="edition-sep" aria-hidden="true"></span>
          <span class="edition-badge-text">${s(r("fbRoundLimitTag",{},e))}</span>
        </span>
        <p class="masthead-motto">${s(r("fbMotto",{},e))}</p>
      </div>
      <div class="masthead-metrics" aria-label="${s(r("fbMetricsAria",{},e))}">
        <div class="mstat-cell">
          <strong>${i.fbRecords.length||"—"}</strong>
          <small>${s(r("metricRecords",{},e))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${n||"—"}</strong>
          <small>${s(r("metricHonoredPlayers",{},e))}</small>
        </div>
        <div class="mstat-cell">
          <strong>${i.fbVersions.length||"—"}</strong>
          <small>${s(r("metricCycles",{},e))}</small>
        </div>
        ${o?`<button type="button" class="mstat-cell mstat-jump is-peak-card" data-jump-fb-record="${s(o.rec.id)}" data-jump-ver="${s(o.stage.version_id)}" data-jump-stage="${s(o.stage.id)}" data-jump-grp="${s(o.rec.group_code)}" title="${s(r("jumpFastestTitle",{source:l},e))}">
               ${c?.thumb?`<span class="peak-card-art" style="background-image:url('${s(c.thumb)}')" aria-hidden="true"></span>`:""}
               <div class="peak-card-top">
                 <strong>${s($e(o.rec.rounds,e))}</strong>
               </div>
               <small><span class="jump-tag">${s(r("jumpTagFastest",{},e))}</span><span class="jump-desc">${s(l)} ↗</span></small>
             </button>`:`<div class="mstat-cell"><strong>06</strong><small>${s(r("fbRoundCap",{},e))}</small></div>`}
      </div>`}}function Ge(e,t=E()){return s(e).replace(/\[([^\]]+)\]/g,(a,n)=>{let o=Ds(n,t);return o?`<button type="button" class="mech-keyword-btn ${s(o.badgeClass)}" data-glossary-term="${s(o.key)}">[${n}]</button>`:`<span class="mech-kw">[${n}]</span>`}).replace(/【([^】]+)】/g,'<strong class="mech-em">【$1】</strong>')}function ot(){i.glossaryOpen=null;let e=O("#glossaryPopoverRoot");e&&(e.innerHTML="")}function co(e,t){let a=E(),n=Ds(e,a),o=O("#glossaryPopoverRoot");if(!n||!o)return;let c=ea[n.category]||ea.special,l=n.categoryLabel||(N(a)?c.labelEn:c.labelZh),u="";if(N(a)){let S=(n.aliases||[]).filter(A=>A&&!/[\u4e00-\u9fff]/.test(A));S.length&&(u=S.slice(0,3).join(" · "))}else n.en&&n.en!==n.zh&&(u=n.en);i.glossaryOpen={key:n.key},o.innerHTML=`
    <div class="glossary-popover" id="glossaryPopover" role="dialog" aria-label="${s(r("glossaryTitle",{},a))}" style="visibility:hidden;left:12px;top:12px">
      <div class="glossary-pop-head">
        <div>
          <strong>${s(n.name)}</strong>
          <div><span class="glossary-pop-cat">${s(l)}</span></div>
          ${u?`<div class="glossary-pop-sub">${s(u)}</div>`:""}
        </div>
        <button type="button" class="glossary-pop-close" data-action="close-glossary" aria-label="${s(r("glossaryClose",{},a))}">×</button>
      </div>
      <div class="glossary-pop-body">
        <p>${Ge(n.desc,a)}</p>
      </div>
    </div>`;let m=O("#glossaryPopover");if(!m)return;let p=t?.getBoundingClientRect?t.getBoundingClientRect():null,f=window.innerWidth||1024,d=window.innerHeight||768,b=m.getBoundingClientRect(),g=b.width||320,y=b.height||160,h=p?p.left+p.width/2-g/2:(f-g)/2,v=p?p.bottom+8:(d-y)/2;h=Math.max(10,Math.min(h,f-g-10)),p&&v+y>d-12&&p.top-y-8>=10?v=p.top-y-8:v=Math.max(10,Math.min(v,d-y-10)),m.style.left=`${Math.round(h)}px`,m.style.top=`${Math.round(v)}px`,m.style.visibility="visible"}function Ni(e,t=E()){let a=Array.isArray(e?.counterTips)?e.counterTips.filter(Boolean):[];return a.length?`
    <div class="mech-tips-card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <strong>✦ ${s(r("counterTipsHeading",{},t))}</strong>
        <small style="font-size:10.5px;color:var(--brass)">${s(r("glossaryHint",{},t))}</small>
      </div>
      <ul>
        ${a.map(n=>`<li>${Ge(n,t)}</li>`).join("")}
      </ul>
    </div>`:""}function po(e,t=E()){return!e||!i.maneMechOpen?"":`
    <div class="boss-mech-drawer" role="region" aria-label="${s(r("mechAriaMane",{},t))}">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${s(e.modeTag)}</span>
          <span class="mech-field-tag">${s(e.battlefield)}</span>
          <span class="mech-favored">${s(e.favoredText)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-mane-mech">${s(r("btnCollapseMech",{},t))}</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">${s(r("mechEnvLabel",{},t))}</div>
        <ul class="mech-env-list">
          ${(e.envRules||[]).map(a=>`<li>${Ge(a,t)}</li>`).join("")}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">${s(r("mechPassivesLabel",{},t))}</div>
        <div class="mech-passives-grid">
          ${(e.passives||[]).map(a=>`
            <div class="mech-passive-card">
              <strong>${s(a.name)}</strong>
              <p>${Ge(a.desc,t)}</p>
            </div>`).join("")}
        </div>
      </div>

      ${Ni(e,t)}

      ${e.thresholds?.length?`
        <div class="mech-thresholds-block">
          <div class="mech-section-label">${s(r("mechThresholdsLabel",{},t))}</div>
          <div class="mech-threshold-grid">
            ${e.thresholds.map(a=>`
              <div class="mech-threshold-item">
                <span class="mech-score-pill">${s(a.score)}</span>
                <p>${Ge(a.desc,t)}</p>
              </div>`).join("")}
          </div>
        </div>`:""}
    </div>`}function uo(e,t=E()){return!e||!i.fbMechOpen?"":`
    <div class="boss-mech-drawer" role="region" aria-label="${s(r("mechAriaFb",{},t))}">
      <div class="mech-drawer-top">
        <div class="mech-top-meta">
          <span class="mech-badge">${s(e.modeTag)}</span>
          <span class="mech-favored">${s(r("mechEnemiesLabel",{},t))}: ${s(e.enemies)}</span>
        </div>
        <button type="button" class="mech-close-btn" data-action="toggle-fb-mech">${s(r("btnCollapseStageMech",{},t))}</button>
      </div>

      <div class="mech-env-block">
        <div class="mech-section-label">${s(r("mechFbEnvLabel",{},t))}</div>
        <ul class="mech-env-list">
          ${(e.envRules||[]).map(a=>`<li>${Ge(a,t)}</li>`).join("")}
        </ul>
      </div>

      <div class="mech-passives-block">
        <div class="mech-section-label">${s(r("mechFbPassivesLabel",{},t))}</div>
        <div class="mech-passives-grid">
          ${(e.passives||[]).map(a=>`
            <div class="mech-passive-card">
              <strong>${s(a.name)}</strong>
              <p>${Ge(a.desc,t)}</p>
            </div>`).join("")}
        </div>
      </div>

      ${Ni(e,t)}
    </div>`}function zi(e,t,a,n=E()){let o=e==="mane",c=m=>o?m.carry:m.carry_name,l=t.length,u="";if(!i.intelCollapsed)if(!l)u=`<div style="font-size:12px;color:var(--ink-muted);padding:4px 2px">${s(r("intelNoData",{},n))}</div>`;else{let m=ns(t,"carry",c,n).slice(0,4),p=N(n)?"en":"zh-CN",f=new Map;for(let h of t){let v=new Set(ue(c(h)).map(q)),S=new Set;for(let A of _t(h.team,c(h))){let _=te(A);if(!_)continue;let M=`char:${_.id}`;if(v.has(M)||S.has(M))continue;S.add(M);let $=f.get(M);$?$.count+=1:f.set(M,{label:V(_.name,n),count:1,portrait:_.portrait||""})}}let d=[...f.entries()].sort((h,v)=>v[1].count-h[1].count||h[1].label.localeCompare(v[1].label,p)).slice(0,4),b=new Map;for(let h of t){let{psychubes:v}=Ke(h);for(let S of v){if(!S)continue;let A=Re(S);if(!A)continue;let _=b.get(A.id);_?_.count+=1:b.set(A.id,{psy:A,count:1})}}let g=[...b.values()].sort((h,v)=>v.count-h.count||Se(h.psy,n).localeCompare(Se(v.psy,n),p)).slice(0,6),y="";if(o){let h=t.map(k=>Number(k.score||0)).filter(k=>Number.isFinite(k)).sort((k,L)=>k-L),v=Math.floor(h.length/2),S=h.length?h.length%2===1?h[v]:Math.round((h[v-1]+h[v])/2):0,A=[{label:N(n)?"<10M":"<1千万",min:0,max:1e7,count:0},{label:N(n)?"10M+":"1千万+",min:1e7,max:3e7,count:0},{label:N(n)?"30M+":"3千万+",min:3e7,max:5e7,count:0},{label:N(n)?"50M+":"5千万+",min:5e7,max:1e8,count:0},{label:N(n)?"100M+":"1亿+",min:1e8,max:1/0,count:0}];for(let k of h){let L=A.find(B=>k>=B.min&&k<B.max);L&&(L.count+=1)}let _=Math.max(1,...A.map(k=>k.count)),M=a.filter(k=>k.division==="zero").sort(Ze)[0],$=a.filter(k=>k.division==="max").sort(Ze)[0];y=`
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${s(r("intelScoreDist",{},n))}</span>
              <small>${s(r("intelMedianScore",{},n))}: ${s(lt(S,n))}</small>
            </div>
            <div class="intel-dist-chart">
              ${A.map(k=>{let L=k.count?Math.max(6,Math.round(k.count/_*44)):4;return`
                  <div class="intel-dist-col" title="${s(k.label)}: ${s(ie(k.count,n))}">
                    <span>${k.count}</span>
                    <span class="intel-dist-bar" style="height:${L}px;opacity:${k.count?1:.28}"></span>
                    <span>${s(k.label)}</span>
                  </div>`}).join("")}
            </div>
            <div class="intel-peak-diff" title="${s(r("intelPeakCompare",{},n))}">
              <span>${s(r("intelPeakP0",{},n))}: <strong>${M?s(lt(M.score,n)):"—"}</strong></span>
              <span>${s(r("intelPeakP5",{},n))}: <strong>${$?s(lt($.score,n)):"—"}</strong></span>
            </div>
          </div>`}else{let h=t.map($=>Number($.rounds)).filter($=>Number.isFinite($)),v=h.length?(h.reduce(($,k)=>$+k,0)/h.length).toFixed(1):"—",S=[0,1,2,3,4,5,6].map($=>({r:$,label:`${$}R`,count:h.filter(k=>k===$).length})),A=Math.max(1,...S.map($=>$.count)),_=a.filter($=>$.group_code==="zero").sort(rt)[0],M=a.filter($=>$.group_code==="max").sort(rt)[0];y=`
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${s(r("intelRoundDist",{},n))}</span>
              <small>${s(r("intelAvgRounds",{},n))}: ${s(v==="—"?"—":`${v}R`)}</small>
            </div>
            <div class="intel-dist-chart">
              ${S.map($=>{let k=$.count?Math.max(6,Math.round($.count/A*44)):4;return`
                  <div class="intel-dist-col" title="${s($e($.r,n))}: ${s(ie($.count,n))}">
                    <span>${$.count}</span>
                    <span class="intel-dist-bar" style="height:${k}px;opacity:${$.count?1:.28}"></span>
                    <span>${s($.label)}</span>
                  </div>`}).join("")}
            </div>
            <div class="intel-peak-diff" title="${s(r("intelPeakCompare",{},n))}">
              <span>${s(r("intelPeakP0",{},n))}: <strong>${_?s($e(_.rounds,n)):"—"}</strong></span>
              <span>${s(r("intelPeakP5",{},n))}: <strong>${M?s($e(M.rounds,n)):"—"}</strong></span>
            </div>
          </div>`}u=`
        <div class="intel-grid" style="grid-template-columns:repeat(auto-fit,minmax(215px,1fr))">
          <div class="intel-card">
            <div class="intel-card-head">
              <span>${s(r("intelTopCarries",{},n))}</span>
              <small>${s(r("intelUsageRate",{},n))}</small>
            </div>
            <div class="intel-bar-list">
              ${m.map(([h,v])=>{let S=Math.round(v.count/l*100),A=S>0?Math.max(4,Math.min(100,S)):0;return`
                  <button type="button" class="intel-bar-row" data-meta-carry="${s(h)}" data-meta-mode="${s(e)}" title="${s(v.label)} · ${s(ie(v.count,n))} (${S}%)">
                    <span class="intel-bar-avatar">
                      ${v.portrait?`<img src="${s(v.portrait)}" alt="${s(v.label)}" loading="lazy" decoding="async" />`:`<span class="char-slot-mono">${s(Qe(v.label))}</span>`}
                    </span>
                    <span class="intel-bar-main">
                      <span class="intel-bar-top">
                        <span>${s(v.label)}</span>
                        <strong>${S}%</strong>
                      </span>
                      <span class="intel-bar-track"><span class="intel-bar-fill" style="width:${A}%"></span></span>
                    </span>
                  </button>`}).join("")}
            </div>
          </div>

          <div class="intel-card">
            <div class="intel-card-head">
              <span>${s(r("intelTopSupports",{},n))}</span>
              <small>${s(r("intelUsageRate",{},n))}</small>
            </div>
            <div class="intel-bar-list">
              ${d.length?d.map(([h,v])=>{let S=Math.round(v.count/l*100),A=S>0?Math.max(4,Math.min(100,S)):0;return`
                      <button type="button" class="intel-bar-row" data-meta-member="${s(h)}" data-meta-mode="${s(e)}" title="${s(v.label)} · ${s(ie(v.count,n))} (${S}%)">
                        <span class="intel-bar-avatar">
                          ${v.portrait?`<img src="${s(v.portrait)}" alt="${s(v.label)}" loading="lazy" decoding="async" />`:`<span class="char-slot-mono">${s(Qe(v.label))}</span>`}
                        </span>
                        <span class="intel-bar-main">
                          <span class="intel-bar-top">
                            <span>${s(v.label)}</span>
                            <strong>${S}%</strong>
                          </span>
                          <span class="intel-bar-track"><span class="intel-bar-fill" style="width:${A}%"></span></span>
                        </span>
                      </button>`}).join(""):`<div style="font-size:11.5px;color:var(--ink-muted)">${s(r("intelNoData",{},n))}</div>`}
            </div>
          </div>

          <div class="intel-card">
            <div class="intel-card-head">
              <span>${s(r("intelTopPsychubes",{},n))}</span>
              <small>${s(ie(g.reduce((h,v)=>h+v.count,0),n))}</small>
            </div>
            ${g.length?`<div class="intel-psy-chips">
                  ${g.map(({psy:h,count:v})=>{let S=Se(h,n);return`
                      <button type="button" class="intel-psy-chip" data-open-psy="${s(h.id)}" title="${s(S)} ×${v}">
                        <img src="${s(mt(h.id))}" alt="" aria-hidden="true" loading="lazy" decoding="async" />
                        <span>${s(S)}</span>
                        <strong style="color:var(--gold);font-size:10px">×${v}</strong>
                      </button>`}).join("")}
                </div>`:`<div style="font-size:11.5px;color:var(--ink-muted)">${s(r("intelNoData",{},n))}</div>`}
          </div>

          ${y}
        </div>`}return`
    <section class="board-intel-bar ${i.intelCollapsed?"is-collapsed":""}" aria-label="${s(r("intelTitle",{},n))}">
      <div class="intel-header">
        <div class="intel-title-group">
          <strong>◈ ${s(r("intelTitle",{},n))}</strong>
          <span>${s(r("intelSubtitle",{},n))}</span>
        </div>
        <button type="button" class="intel-collapse-btn" data-action="toggle-intel-bar" aria-expanded="${!i.intelCollapsed}">
          ${s(i.intelCollapsed?r("intelExpand",{},n):r("intelCollapse",{},n))}
        </button>
      </div>
      ${u}
    </section>`}function ji({mode:e,record:t,rank:a,resonanceCodes:n,boardPeak:o,mapName:c="",stageFastest:l,lang:u=E()}){let m=e==="mane",p=m?t.carry:t.carry_name,{archetypes:f}=Pn(t.team,p,u),d=f.map(h=>`<span class="row-archetype-chip">${s(h.label)}</span>`).join(""),b=n.filter(Boolean).length,g=b>0?`<span class="row-res-badge">${s(r("rowResCodesCount",{n:b},u))}</span>`:"",y="";if(m){let v=(c?Cs(c,t.score,u):null)?.thresholds||[];if(v.length){let S=v.map((A,_)=>{let M=A.roman||qt(_+1),$=v[_+1],k=`<span class="row-appraisal-node ${A.reached?"is-cleared":""}" title="${s(M)} · ${s(A.scoreLabel)}">${s(M)}</span>`,L=$?`<span class="row-appraisal-link ${A.reached&&$.reached?"is-cleared":""}" aria-hidden="true"></span>`:"";return k+L}).join("");y=`
        <div class="row-peak-meter has-appraisal-rail">
          <div class="row-appraisal-rail" aria-label="${s(r("appraisalActiveLabel",{},u))}">${S}</div>
        </div>`}}return`
    <div class="row-intel-col">
      ${d||g?`<div class="row-archetype-strip">${d}${g}</div>`:""}
      ${y}
    </div>`}function pn(e,t,a){if(i.dataSource!=="live")return;let n=["maneCore","fbCore"];e==="player"&&n.push("maneDaily");let o=n.filter(c=>!we[c]);o.length&&Promise.allSettled(o.map(c=>ht(c,{silentRender:!0}))).then(()=>{i.activeDossierModal?.type===e&&i.activeDossierModal?.key===t&&O("#modalOverlay")&&a()})}function Oi(e){let t=E(),a=Rn(e,t);if(!a)return;ot(),i.activeDossierModal={type:"arcanist",key:String(e)};let n=a.id?`char:${a.id}`:q(a.cn||e),o=ge[a.aff]||ge.unknown,c=Te(a.aff,t),l=a.dmg==="mental"?r("dossierDmgMental",{},t):r("dossierDmgReality",{},t),u=a.roleLabels&&a.roleLabels.length?a.roleLabels:(a.roles||[]).map($=>{let k=Ra[$];return k?N(t)?k.en:k.zh:$}),m=0,p=0,f=0,d=0n,b=null,g=new Map,y=new Map,h=($,k,L,B,R)=>{let G=_t($,k),T=ue(k);if(!(G.some(F=>q(F)===n)||T.some(F=>q(F)===n)))return;if(B){m+=1;let F=BigInt(R||0);F>d&&(d=F)}else{p+=1;let F=Number(R);Number.isFinite(F)&&(b===null||F<b)&&(b=F)}T.some(F=>q(F)===n)&&(f+=1);let w=new Set;for(let F of G){let W=te(F);if(!W)continue;let ne=`char:${W.id}`;if(ne===n||w.has(ne))continue;w.add(ne);let re=g.get(ne);re?re.count+=1:g.set(ne,{char:W,count:1})}let I=Ue($,k);for(let F=0;F<I.length;F++){let W=I[F];if((W?.char?`char:${W.char.id}`:q(W?.raw||""))===n&&L[F]){let re=Re(L[F]);if(re){let se=y.get(re.id);se?se.count+=1:y.set(re.id,{psy:re,count:1})}}}};for(let $ of i.maneScores){let{psychubes:k}=Ke($);h($.team,$.carry,k,!0,$.score)}for(let $ of i.fbRecords){let{psychubes:k}=Ke($);h($.team,$.carry_name,k,!1,$.rounds)}let v=m+p,S=v>0?`${Math.round(f/v*100)}%`:"—",A=[...g.values()].sort(($,k)=>k.count-$.count).slice(0,6),_=[...y.values()].sort(($,k)=>k.count-$.count).slice(0,6),M=!N(t)&&a.en&&a.en!==a.displayName?a.en:"";ye(`
    <div class="dossier-modal-head">
      <div class="dossier-portrait-frame">
        ${a.portrait?`<img src="${s(a.portrait)}" alt="${s(a.displayName)}" />`:`<div style="width:100%;height:100%;display:grid;place-items:center;font-family:var(--font-serif);font-size:24px;color:var(--brass)">${s(Qe(a.displayName))}</div>`}
      </div>
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${s(r("dossierCharEyebrow",{},t))}</div>
        <h2 style="margin-bottom:2px">${s(a.displayName)}</h2>
        ${M?`<div style="font-size:12.5px;color:var(--brass);margin-bottom:4px">${s(M)}</div>`:""}
        <div class="dossier-badges-row">
          <span class="dossier-pill">
            ${o.icon?`<img src="${s(o.icon)}" alt="" aria-hidden="true" />`:""}
            ${s(c)}
          </span>
          <span class="dossier-pill">${a.star}★</span>
          <span class="dossier-pill">${s(l)}</span>
          ${a.euphoria?`<span class="dossier-pill" style="border-color:var(--gold);color:#fbe3a6">✦ ${s(r("dossierEuphoria",{},t))}</span>`:""}
          ${a.version?`<span class="dossier-pill">${s(r("dossierVersion",{ver:`v${a.version}`},t))}</span>`:""}
          ${u.map($=>`<span class="dossier-pill">${s($)}</span>`).join("")}
        </div>
      </div>
    </div>

    <div class="dossier-section-title"><span>${s(r("dossierArchiveStats",{},t))}</span></div>
    <div class="dossier-stat-grid">
      <div class="dossier-stat-box">
        <strong>${m}</strong>
        <small>${s(r("dossierManeAppearances",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${p}</strong>
        <small>${s(r("dossierFbAppearances",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${s(S)}</strong>
        <small>${s(r("dossierMainDpsRate",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${d>0n?s(lt(d,t)):b!==null?s($e(b,t)):"—"}</strong>
        <small>${s(d>0n?r("dossierPeakScore",{},t):r("dossierFastestClear",{},t))}</small>
      </div>
    </div>

    <div class="dossier-section-title"><span>${s(r("dossierTopTeammates",{},t))}</span></div>
    ${A.length?`<div class="dossier-chip-list">
          ${A.map(({char:$,count:k})=>{let L=V($.name,t);return`
              <button type="button" class="dossier-chip" data-open-char="${s($.name)}">
                ${$.portrait?`<img src="${s($.portrait)}" alt="" aria-hidden="true" />`:""}
                <span>${s(L)}</span>
                <small style="color:var(--gold)">×${k}</small>
              </button>`}).join("")}
        </div>`:`<p class="field-hint">${s(r("dossierNoData",{},t))}</p>`}

    <div class="dossier-section-title"><span>${s(r("dossierTopPsychubes",{},t))}</span></div>
    ${_.length?`<div class="dossier-chip-list">
          ${_.map(({psy:$,count:k})=>{let L=Se($,t);return`
              <button type="button" class="dossier-chip" data-open-psy="${s($.id)}">
                <img src="${s(mt($.id))}" alt="" aria-hidden="true" style="width:20px;height:20px;object-fit:contain" />
                <span>${s(L)}</span>
                <small style="color:var(--gold)">×${k}</small>
              </button>`}).join("")}
        </div>`:`<p class="field-hint">${s(r("dossierNoData",{},t))}</p>`}

    <div class="dossier-actions-row">
      <button type="button" class="copper-btn" data-filter-dossier-char="${s(n)}">${s(r("dossierFilterBoard",{},t))}</button>
      ${a.wikiUrl?`<a class="outline-btn" href="${s(a.wikiUrl)}" target="_blank" rel="noopener noreferrer">${s(r("dossierOpenWiki",{},t))}</a>`:""}
      <button type="button" class="ghost-btn" data-action="close-modal">${s(r("btnClose",{},t))}</button>
    </div>`,!0),pn("arcanist",String(e),()=>Oi(e))}var ui=["①","②","③","④","⑤","⑥","⑦","⑧"];function mo(e){let t=String(e||""),a=/(\d+(?:\.\d+)?)(%?)\s*[–—\-~至]\s*(\d+(?:\.\d+)?)(%?)/g,n=new Map,o=[],c=0;return{templateText:t.replace(a,(u,m,p,f,d)=>{let b=Number(m),g=Number(f);if(!Number.isFinite(b)||!Number.isFinite(g)||g<=b||p==="%"&&!d||!p&&d==="%"&&b>=100)return u;let y=p==="%"||d==="%",h=y?"%":"",v=`${b}|${g}|${h}`,S=n.get(v);if(!S){let A=[0,1,2,3,4].map(_=>{if(y){let $=b+(g-b)*_/4;return`${Number($.toFixed(2))}%`}let M=_===0?b:_===4?g:Math.floor(b+(g-b)*_/4);return String(M)});S={idx:o.length+1,a:b,b:g,unit:h,levels:A},n.set(v,S),o.push(S)}return c+=1,`@@PSYAMP_${S.idx}_${c}@@`}),uniqueGroups:o}}function Hi(e,t=5,a=E()){if(!e)return"";let{templateText:n,uniqueGroups:o}=mo(e);if(!o.length)return`<div class="psy-passive-box">${Ge(e,a)}</div>`;let c=Math.min(5,Math.max(1,Number(t)||5)),l=c-1,u=o.length>1,m=N(a)?"Amplification":"增幅等级",p=Ge(n,a).replace(/@@PSYAMP_(\d+)_(\d+)@@/g,(f,d)=>{let b=o[Number(d)-1];if(!b)return"";let g=ui[b.idx-1]||`(${b.idx})`;return`<span class="psy-amp-val">${s(b.levels[l])}${u?`<sup>${g}</sup>`:""}</span>`});return`
    <div class="psy-amp-bar">
      <span style="font-size:11.5px;color:var(--brass);font-family:var(--font-serif);font-weight:600">${s(m)}</span>
      <div class="psy-amp-pills" role="group" aria-label="${s(m)}">
        ${[1,2,3,4,5].map(f=>`
          <button type="button" class="psy-amp-btn ${f===c?"active":""}" data-psy-amp-level="${f}" aria-pressed="${f===c}">Lv.${f}</button>`).join("")}
      </div>
    </div>
    <div class="psy-passive-box">${p}</div>
    <div class="psy-amp-grid" aria-label="${s(m)}">
      <div class="psy-amp-row is-head ${u?"has-label":""}">
        ${u?'<span class="psy-amp-idx">#</span>':""}
        ${[1,2,3,4,5].map(f=>`
          <button type="button" class="psy-amp-cell ${f===c?"is-active":""}" data-psy-amp-level="${f}">Lv.${f}</button>`).join("")}
      </div>
      ${o.map(f=>`
        <div class="psy-amp-row ${u?"has-label":""}">
          ${u?`<span class="psy-amp-idx">${ui[f.idx-1]||f.idx}</span>`:""}
          ${f.levels.map((d,b)=>`
            <button type="button" class="psy-amp-cell ${b+1===c?"is-active":""}" data-psy-amp-level="${b+1}">${s(d)}</button>`).join("")}
        </div>`).join("")}
    </div>`}function Gi(e){let t=E(),a=Ms(e,t);if(!a)return;ot();let n=i.activeDossierModal?.type==="psychube"&&i.activePsyDossierId===a.id;i.activePsyDossierId=a.id,n||(i.psyAmpLevel=5),i.activeDossierModal={type:"psychube",key:String(a.id)};let o=0,c=new Map,l=(b,g)=>{for(let y of b){let{psychubes:h}=Ke(y),v=Ue(y.team,g(y));for(let S=0;S<h.length;S++){let A=h[S]?Re(h[S]):null;if(!A||A.id!==a.id)continue;o+=1;let _=v[S]?.char||null;if(_){let M=c.get(_.id);M?M.count+=1:c.set(_.id,{char:_,count:1})}}}};l(i.maneScores,b=>b.carry),l(i.fbRecords,b=>b.carry_name);let u=[...c.values()].sort((b,g)=>g.count-b.count).slice(0,6),m=!N(t)&&a.en&&a.en!==a.displayName?a.en:"",p=a.stats60,f=p?N(t)?p.subStatEn:p.subStatZh:a.displayStat,d=N(t)?a.tagsEn||(a.tags||[]).map(b=>As(b,"en")):a.tags||[];ye(`
    <div class="dossier-modal-head">
      <div class="dossier-psy-frame">
        <img src="${s(Qt(a.star))}" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transform:scale(1.16)" />
        <img src="${s(mt(a.id))}" alt="${s(a.displayName)}" style="position:relative;z-index:1;width:100%;height:100%;object-fit:contain;transform:scale(1.16)" />
      </div>
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${s(r("dossierPsyEyebrow",{},t))}</div>
        <h2 style="margin-bottom:2px">${s(a.displayName)}</h2>
        ${m?`<div style="font-size:12.5px;color:var(--brass);margin-bottom:4px">${s(m)}</div>`:""}
        <div class="dossier-badges-row">
          <span class="dossier-pill">${a.star}★</span>
          <span class="dossier-pill">${s(a.displayStat)}</span>
          ${a.version?`<span class="dossier-pill">${s(r("dossierVersion",{ver:`v${a.version}`},t))}</span>`:""}
          ${d.map(b=>`<span class="dossier-pill">${s(b)}</span>`).join("")}
        </div>
      </div>
    </div>

    ${p?`
      <div class="dossier-section-title">
        <span>${s(r("dossierPsyStats60",{},t))}</span>
        ${f?`<span class="dossier-pill">${s(r("dossierPsySubStat",{},t))}: ${s(f)}</span>`:""}
      </div>
      <div class="psy-stat60-grid">
        <div class="psy-stat60-item"><span>${s(r("dossierPsyAtk",{},t))}</span><strong>${p.atk}</strong></div>
        <div class="psy-stat60-item"><span>${s(r("dossierPsyHp",{},t))}</span><strong>${p.hp}</strong></div>
        <div class="psy-stat60-item"><span>${s(r("dossierPsyRDef",{},t))}</span><strong>${p.rDef}</strong></div>
        <div class="psy-stat60-item"><span>${s(r("dossierPsyMDef",{},t))}</span><strong>${p.mDef}</strong></div>
      </div>`:""}

    ${a.passive?`
      <div class="dossier-section-title">
        <span>${s(r("dossierPsyPassive",{},t))}</span>
        <small style="font-family:var(--font-sans);text-transform:none;letter-spacing:0;color:var(--ink-muted)">${s(r("glossaryHint",{},t))}</small>
      </div>
      <div id="psyPassiveHost" data-psy-id="${s(a.id)}">${Hi(a.passive,i.psyAmpLevel,t)}</div>`:""}

    <div class="dossier-section-title">
      <span>${s(r("dossierPsyTopCarriers",{},t))}</span>
      <span>${s(r("dossierPsyUsage",{},t))}: ${o}</span>
    </div>
    ${u.length?`<div class="dossier-chip-list">
          ${u.map(({char:b,count:g})=>{let y=V(b.name,t);return`
              <button type="button" class="dossier-chip" data-open-char="${s(b.name)}">
                ${b.portrait?`<img src="${s(b.portrait)}" alt="" aria-hidden="true" />`:""}
                <span>${s(y)}</span>
                <small style="color:var(--gold)">×${g}</small>
              </button>`}).join("")}
        </div>`:`<p class="field-hint">${s(r("dossierNoData",{},t))}</p>`}

    <div class="dossier-actions-row">
      ${a.wikiUrl?`<a class="outline-btn" href="${s(a.wikiUrl)}" target="_blank" rel="noopener noreferrer">${s(r("dossierOpenWiki",{},t))}</a>`:""}
      <button type="button" class="ghost-btn" data-action="close-modal">${s(r("btnClose",{},t))}</button>
    </div>`,!0),pn("psychube",String(a.id),()=>Gi(e))}function mi(e,t,a=E()){let n=Ue(e,t);if(!n.length)return"";if(n.length===1&&n[0].type==="legacy")return r("legacyTeamLabel",{},a);let o=N(a)?" / ":" · ";return n.map(c=>{if(c.type==="flex")return Ma(c,a).label;if(c.type==="wild")return xa(c,a).label;let l=c.raw||"",u=c.char||te(l);return u?V(u.name,a):V(l,a)}).filter(Boolean).join(o)}function Ki(e){let t=E(),a=le(e);if(!a)return;ot(),i.activeDossierModal={type:"player",key:a};let n=new Map(i.maneMaps.map($=>[$.id,$])),o=new Map(i.fbStages.map($=>[$.id,$])),c=new Map(i.fbVersions.map($=>[$.id,$])),l=new Map;for(let $ of i.maneScores){let k=`${$.map_id}::${$.division}`;l.has(k)||l.set(k,[]),l.get(k).push($)}let u=[],m=0,p=0,f=0n,d=null,b=e,g=new Map,y=$=>{for(let k of ue($)){let L=te(k);if(!L)continue;let B=g.get(L.id);B?B.count+=1:g.set(L.id,{char:L,count:1})}};for(let $ of l.values())$.sort(Ze),$.forEach((k,L)=>{if(le(k.display_name)!==a)return;b=k.display_name||b;let B=L+1;B===1&&(m+=1),B<=3&&(p+=1);let R=BigInt(k.score||0);R>f&&(f=R),y(k.carry);let G=n.get(k.map_id);u.push({mode:"mane",id:k.id,rank:B,title:G?fe(G.name,t):r("modeMane",{},t),division:Ce(k.division,t),metricText:de(k.score,t),carry:ve(k.carry,t),section:G?.section||"new",mapId:k.map_id,rawDiv:k.division,sortVal:Number(k.score||0)})});let h=new Map;for(let $ of i.fbRecords){let k=`${$.stage_id}::${$.group_code}`;h.has(k)||h.set(k,[]),h.get(k).push($)}for(let $ of h.values())$.sort(rt),$.forEach((k,L)=>{if(le(k.display_name)!==a)return;b=k.display_name||b;let B=L+1;B===1&&(m+=1),B<=3&&(p+=1);let R=Number(k.rounds);Number.isFinite(R)&&(d===null||R<d)&&(d=R),y(k.carry_name);let G=o.get(k.stage_id),T=G?c.get(G.version_id):null;u.push({mode:"flashback",id:k.id,rank:B,title:`${T?`${T.code} · `:""}${G?$t(G.name,t):r("modeFlashback",{},t)}`,division:Ce(k.group_code,t),metricText:$e(k.rounds,t),carry:ve(k.carry_name,t),verId:G?.version_id||k.version_id||"",stageId:k.stage_id,rawDiv:k.group_code,sortVal:0})});u.sort(($,k)=>$.rank-k.rank||k.sortVal-$.sortVal);let v=[...g.values()].sort(($,k)=>k.count-$.count).slice(0,6),S=new Set(i.maneScores.map($=>$.id)),A=new Set(i.fbRecords.map($=>$.id)),_=new Map;for(let $ of i.maneDailyScores||[]){if(!$?.id||S.has($.id)||le($.display_name)!==a)continue;let k=`mane:${$.id}`;if(_.has(k))continue;let L=n.get($.map_id);_.set(k,{mode:"mane",id:$.id,title:L?fe(L.name,t):r("modeMane",{},t),division:Ce($.division,t),metricText:de($.score,t),carry:ve($.carry,t),teamText:mi($.team,$.carry,t),dateMs:Date.parse($.approved_at||$.created_at||"")||0,scoreVal:Number($.score||0)})}for(let $ of i.fbApprovedRecords||[]){if(!$?.id||A.has($.id)||le($.display_name)!==a)continue;let k=`flashback:${$.id}`;if(_.has(k))continue;let L=o.get($.stage_id),B=L?c.get(L.version_id):null;_.set(k,{mode:"flashback",id:$.id,title:`${B?`${B.code} · `:""}${L?$t(L.name,t):r("modeFlashback",{},t)}`,division:Ce($.group_code,t),metricText:$e($.rounds,t),carry:ve($.carry_name,t),teamText:mi($.team,$.carry_name,t),dateMs:Date.parse($.created_at||"")||0,scoreVal:0})}let M=[..._.values()].sort(($,k)=>k.dateMs-$.dateMs||k.scoreVal-$.scoreVal);ye(`
    <div class="dossier-modal-head">
      <div style="min-width:0;flex:1">
        <div class="modal-eyebrow">${s(r("dossierPlayerEyebrow",{},t))}</div>
        <h2 class="is-player-name" style="margin-bottom:4px">${s(b)}</h2>
        <div class="dossier-badges-row">
          ${m>0?`<span class="hof-crown-pill">♛ ${s(r("hofCrownsLabel",{},t))} ×${m}</span>`:""}
          ${p>0?`<span class="dossier-pill">✦ ${s(r("hofPodiumsLabel",{},t))} ×${p}</span>`:""}
          <span class="dossier-pill">${s(ie(u.length,t))}</span>
        </div>
      </div>
    </div>

    <div class="dossier-stat-grid">
      <div class="dossier-stat-box">
        <strong>${m}</strong>
        <small>${s(r("dossierPlayerCrowns",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${p}</strong>
        <small>${s(r("dossierPlayerPodiums",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${u.length}</strong>
        <small>${s(r("dossierPlayerRuns",{},t))}</small>
      </div>
      <div class="dossier-stat-box">
        <strong>${f>0n?s(lt(f,t)):d!==null?s($e(d,t)):"—"}</strong>
        <small>${s(f>0n?r("dossierPlayerBestMane",{},t):r("dossierPlayerBestFb",{},t))}</small>
      </div>
    </div>

    <div class="dossier-section-title"><span>${s(r("dossierPlayerFavCarries",{},t))}</span></div>
    ${v.length?`<div class="dossier-chip-list">
          ${v.map(({char:$,count:k})=>{let L=V($.name,t);return`
              <button type="button" class="dossier-chip" data-open-char="${s($.name)}">
                ${$.portrait?`<img src="${s($.portrait)}" alt="" aria-hidden="true" />`:""}
                <span>${s(L)}</span>
                <small style="color:var(--gold)">×${k}</small>
              </button>`}).join("")}
        </div>`:`<p class="field-hint">${s(r("dossierNoData",{},t))}</p>`}

    <div class="dossier-section-title">
      <span>${s(r("dossierPlayerHistory",{},t))}</span>
      <span>${s(ie(u.length,t))}</span>
    </div>
    ${u.length?`<div class="dossier-run-list">
          ${u.map($=>{let k=$.mode==="mane"?`data-jump-mane-record="${s($.id)}" data-jump-section="${s($.section)}" data-jump-map="${s($.mapId)}" data-jump-div="${s($.rawDiv)}"`:`data-jump-fb-record="${s($.id)}" data-jump-ver="${s($.verId)}" data-jump-stage="${s($.stageId)}" data-jump-grp="${s($.rawDiv)}"`;return`
              <div class="dossier-run-row">
                <div style="min-width:0;flex:1">
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                    <span class="dossier-pill">${s($.mode==="mane"?r("modeMane",{},t):r("modeFlashback",{},t))}</span>
                    <strong style="color:var(--gold)">#${$.rank}</strong>
                    <strong>${s($.title)}</strong>
                    <span style="color:var(--ink-muted)">(${s($.division)})</span>
                  </div>
                  <div style="font-size:11px;color:var(--ink-muted);margin-top:3px">
                    ${s(r("mainDpsLabel",{},t))}: ${s($.carry)}
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                  <strong style="font-family:var(--font-display);color:var(--copper-bright)">${s($.metricText)}</strong>
                  <button type="button" class="text-link-btn" ${k}>${s(r("dossierJumpToBoard",{},t))}</button>
                </div>
              </div>`}).join("")}
        </div>`:`<p class="field-hint">${s(r("dossierNoData",{},t))}</p>`}

    ${M.length?`<div class="dossier-section-title">
           <span>${s(r("dossierPlayerSuperseded",{},t))}</span>
           <span>${s(ie(M.length,t))}</span>
         </div>
         <p class="dossier-superseded-note">${s(r("dossierSupersededNote",{},t))}</p>
         <div class="dossier-run-list">
           ${M.map($=>`
             <div class="dossier-run-row is-superseded">
               <div style="min-width:0;flex:1">
                 <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                   <span class="dossier-pill">${s($.mode==="mane"?r("modeMane",{},t):r("modeFlashback",{},t))}</span>
                   <span class="dossier-superseded-pill">${s(r("dossierSupersededTag",{},t))}</span>
                   <strong>${s($.title)}</strong>
                   <span style="color:var(--ink-muted)">(${s($.division)})</span>
                 </div>
                 <div style="font-size:11px;color:var(--ink-muted);margin-top:3px">
                   ${s(r("mainDpsLabel",{},t))}: ${s($.carry)}${$.teamText?` · ${s($.teamText)}`:""}
                 </div>
               </div>
               <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                 <strong style="font-family:var(--font-display);color:var(--ink-muted)">${s($.metricText)}</strong>
               </div>
             </div>`).join("")}
         </div>`:""}

    <div class="dossier-actions-row">
      <button type="button" class="ghost-btn" data-action="close-modal">${s(r("btnClose",{},t))}</button>
    </div>`,!0),pn("player",a,()=>Ki(e))}var Ha=0;async function Ui({date:e,division:t,mapIds:a}){if(pe()&&i.dataSource==="offline")return Os(i.maneDailyScores,{date:e,division:t,mapIds:a});let[n,o]=zs(e,E()),c=[`approved_at=gte.${encodeURIComponent(n)}`,`approved_at=lt.${encodeURIComponent(o)}`];return t&&c.push(`division=eq.${encodeURIComponent(t)}`),a.length&&c.push(`map_id=in.(${a.map(l=>encodeURIComponent(l)).join(",")})`),Tt("mane_daily_scores",["approved_at.desc","id.asc"],"id,map_id,division,display_name,carry,team,score,approved_at,related_url",c.join("&"))}function Vi(){let{date:e}=i.maneDaily;return e&&/^\d{4}-\d{2}-\d{2}$/.test(e)?e:pe()&&i.dataSource==="offline"?js(i.maneDailyScores):Mt()}function fo(){let e=E(),{division:t,map:a}=i.maneDaily,n=Mt(),o=si(n,-1,e),c=Vi(),l=vt(e),u=i.maneMaps.map(b=>[b.id,`${b.edition} · ${fe(b.name,e)}`]),m=pe()&&i.dataSource==="offline"?`<button type="button" class="paper-btn btn-export-offline" data-action="export-offline-excel">${s(r("btnExportExcel",{},e))}</button>`:"",p=new Map;for(let b of i.maneDailyScores||[]){let g=xt(b?.approved_at),y=g?g.slice(0,10):"";y&&p.set(y,(p.get(y)||0)+1)}let f=[...p.entries()].sort((b,g)=>g[0].localeCompare(b[0])).slice(0,8),d=f.length?`<div class="daily-dates-bar" role="group" aria-label="${s(r("dailyActiveDates",{},e))}">
         <span style="font-family:var(--font-display);font-size:10px;letter-spacing:0.12em;color:var(--brass);text-transform:uppercase;flex-shrink:0">${s(r("dailyActiveDates",{},e))}</span>
         ${f.map(([b,g])=>`
           <button type="button" class="daily-date-chip ${b===c?"active":""}" data-mane-daily-date="${s(b)}">
             <span>${s(b)}</span>
             <small style="opacity:0.78">(${g})</small>
           </button>`).join("")}
       </div>`:"";return`<section class="board-panel">
    <div class="board-header">
      <div class="board-title-stack">
        <h2>${s(r("dailyTitle",{},e))}</h2>
        <p class="board-subtitle">${s(r("dailySubtitle",{},e))}${pe()&&i.dataSource==="offline"?` · ${s(r("dailyOfflineHint",{},e))}`:""}</p>
      </div>
      <div class="board-header-right">
        ${m}
        <button type="button" class="outline-btn" data-action="refresh-mane-daily">${s(r("btnRefresh",{},e))}</button>
      </div>
    </div>
    <div class="daily-filter-grid">
      <div class="field"><label for="maneDailyDate">${s(r("dailyDateLabel",{},e))}</label>
        <div class="daily-date-controls">
          <button type="button" class="daily-quick-btn ${c===n?"active":""}" data-mane-daily-date="${n}">${s(r("dailyToday",{},e))}</button>
          <button type="button" class="daily-quick-btn ${c===o?"active":""}" data-mane-daily-date="${o}">${s(r("dailyYesterday",{},e))}</button>
          <input id="maneDailyDate" type="date" data-mane-daily="date" value="${c}" max="${n}" aria-label="${s(r("dailyDateLabel",{},e))}" />
        </div>
      </div>
      <div class="field"><label for="maneDailyDivision">${s(r("fieldDivision",{},e))}</label>
        <select id="maneDailyDivision" data-mane-daily="division">${Ae([["",r("dailyAllDivisions",{},e)],...Object.entries(l)],t)}</select>
      </div>
      <div class="field"><label for="maneDailyMap">${s(r("fieldBoss",{},e))}</label>
        <select id="maneDailyMap" data-mane-daily="map">${Ae([["",r("dailyAllMaps",{},e)],...u],a)}</select>
      </div>
    </div>
    ${d}
    <div id="maneDailyResults" data-date="${c}" aria-live="polite"><p class="board-foot">${s(i.loading?r("emptyTitleLoading",{},e):r("dailyLoading",{},e))}</p></div>
  </section>`}async function bo(e){let t=E();if(!i.connected){i.loading||(e.textContent=r("offlineSyncFail",{},t));return}let a=++Ha,n=e.dataset.date,{division:o,map:c}=i.maneDaily;try{let l=await Ui({date:n,division:o,mapIds:c?[c]:[]});if(!e.isConnected||a!==Ha)return;if(!l.length){e.innerHTML=`<div class="empty-state"><h3>${s(r("dailyEmpty",{},t))}</h3></div>`;return}let u=new Map,m=new Map,p=new Map;for(let h of i.maneScores){u.set(h.id,h);let v=`${h.map_id}::${h.division}`;p.has(v)||p.set(v,[]),p.get(v).push(h)}for(let h of p.values())h.sort(Ze),h.forEach((v,S)=>m.set(v.id,S+1));let f=new Map,d=l.filter(h=>!u.has(h.id)).map(h=>h.id);if(d.length&&i.dataSource==="live"){try{for(let h=0;h<d.length;h+=200){let S=d.slice(h,h+200).map(_=>encodeURIComponent(_)).join(","),A=await Pt(`mane_entries?select=id%2Cteam_psychubes%2Cteam_resonance_codes&id=in.(${S})`);for(let _ of A||[])f.set(_.id,_)}}catch(h){console.warn("Could not load extra daily builds:",h)}if(!e.isConnected||a!==Ha)return}let b=new Map(i.maneMaps.map(h=>[h.id,h])),g=N(t)?", ":"、",y=l.map(h=>{let v=b.get(h.map_id),S=v?.section||"new",A=Pe(v?.name||"",S),_=v?fe(v.name,t):r("modeMane",{},t),M=v?Ss(v.name,S,t):"",$=u.get(h.id),k=m.get(h.id)||0,{psychubes:L,resonanceCodes:B}=Ke($||f.get(h.id)||h),R=ve(h.carry,t),G=(h.team||[]).map(j=>V(j,t)),T=`mane-daily-${h.id}`;He.set(T,{mode:"mane",recordId:h.id,dailyDate:n,section:S,mapId:h.map_id,division:h.division,rank:k,title:_,bossEn:M,bossThumb:A.thumb,subtitle:`${be(S,t)} · ${ae(h.division,t)}`,player:h.display_name,carry:R,rawCarry:h.carry,team:h.team,displayTeam:G,psychubes:L,resonanceCodes:B,score:h.score,date:xt(h.approved_at),related_url:h.related_url});let D=C("Time","时间",t),w=r("fieldBoss",{},t),I=r("fieldDivision",{},t),F=r("colInvestigator",{},t),W=r("colLineup",{},t),ne=r("scoreLabel",{},t),re=C("Actions","操作",t),se=new Set(ue(h.carry).map(q)),x=Ue(h.team,h.carry),z=x.some(j=>j.type==="char"&&j.char?.portrait)?`<div class="daily-mini-lineup" style="margin-top:4px">${x.slice(0,4).map(j=>{if(j.type==="char"&&j.char?.portrait){let ce=V(j.char.name,t);return`<span class="daily-mini-card${se.has(j.char?`char:${j.char.id}`:q(j.raw))?" is-carry":""}" data-open-char="${s(j.char.name)}" role="button" tabindex="0" style="cursor:pointer" title="${s(ce)}"><img src="${s(j.char.portrait)}" alt="${s(ce)}" loading="lazy" decoding="async" /></span>`}return""}).join("")}</div>`:"";return`<tr>
        <td class="cell-daily-time" data-label="${s(D)}">${s(ni(h.approved_at,t))}</td>
        <td class="cell-daily-map" data-label="${s(w)}">${s(_)}</td>
        <td class="cell-daily-div" data-label="${s(I)}">${s(Ce(h.division,t))}</td>
        <td class="cell-daily-player" data-label="${s(F)}"><span class="player-name is-clickable is-player-name" data-open-player="${s(h.display_name)}" role="button" tabindex="0">${s(h.display_name)}</span> ${Qs(h,t)}</td>
        <td class="cell-daily-lineup" data-label="${s(W)}"><div class="carry-line daily-carry-line"><span class="carry-label">${s(r("mainDpsLabel",{},t))}</span><strong>${s(R)}</strong></div><div class="daily-team-text">${s(G.join(g))} ${ha(h.related_url,r("relatedLink",{},t))}</div>${z}</td>
        <td class="num-col cell-daily-score" data-label="${s(ne)}"><span class="score-value">${de(h.score,t)}</span></td>
        <td class="cell-daily-actions" data-label="${s(re)}"><span class="daily-actions-wrap"><button type="button" class="card-trigger daily-action-btn" data-poster="${s(T)}">${s(r("viewCardBtn",{},t))}</button>${$?`<button type="button" class="text-link-btn" data-jump-mane-record="${s(h.id)}" data-jump-section="${s(S)}" data-jump-map="${s(h.map_id)}" data-jump-div="${s(h.division)}">${s(r("dailyJumpBtn",{},t))}</button>`:""}</span></td>
      </tr>`}).join("");e.innerHTML=`<p class="board-foot">${s(r("dailyCountFoot",{n:l.length,date:n},t))}</p>
      <div class="table-scroll"><table class="archive-table table-mane-daily">
        <thead><tr><th>${s(C("Time","时间",t))}</th><th>${s(r("fieldBoss",{},t))}</th><th>${s(r("fieldDivision",{},t))}</th><th>${s(r("colInvestigator",{},t))}</th><th>${s(r("mainDpsLabel",{},t))} / ${s(r("colLineup",{},t))}</th><th class="num-col">${s(r("scoreLabel",{},t))}</th><th style="text-align:right">${s(C("Actions","操作",t))}</th></tr></thead>
        <tbody>${y}</tbody>
      </table></div>`}catch{e.isConnected&&a===Ha&&(e.textContent=C("Unable to load daily scores right now. Click Refresh to try again.","成绩暂时无法读取，请点击刷新。",t))}}function go(){let e=E();if(i.manePage==="daily")return fo();let t=Be("new"),a=Be("rerun"),n=Be(i.maneSection);i.maneMaps.length&&!n.some(x=>x.id===i.maneMapId)&&(i.maneMapId=n[0]?.id||"");let o=`
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="${s(r("sectionLabel",{},e))}">
        <button type="button" class="section-tab-btn ${i.maneSection==="new"?"active":""}" data-mane-section="new">
          <span>${s(be("new",e))}</span>
          <span class="tab-count">${t.length}</span>
        </button>
        <button type="button" class="section-tab-btn ${i.maneSection==="rerun"?"active":""}" data-mane-section="rerun">
          <span>${s(be("rerun",e))}</span>
          <span class="tab-count">${a.length}</span>
        </button>
      </div>
      <button type="button" class="ghost-btn icon-btn section-refresh-btn" data-action="refresh" title="${s(r("btnRefresh",{},e))}" aria-label="${s(r("btnRefresh",{},e))}"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span class="btn-label">${s(r("btnRefresh",{},e))}</span></button>
    </div>`;if(i.manePage==="rules")return vo();if(i.manePage==="players")return yo();if(i.manePage==="totals")return o+ho(n[0]?.edition||"",n);let c=n.find(x=>x.id===i.maneMapId),l=Pe(c?.name||"",i.maneSection),u=zn(c?.name||"",e),m=c?fe(c.name,e):r("navScores",{},e),p=c?Ss(c.name,i.maneSection,e):"",f=c?xn(c.name,e):[],d=c?Dn(c.name,i.maneSection,e):"",b=l.hero&&l.hero!==l.thumb,g=new Map,y=new Map;for(let x of i.maneScores)if(x.division===i.maneDivision){g.set(x.map_id,(g.get(x.map_id)||0)+1);let z=y.get(x.map_id);(!z||Ze(x,z)<0)&&y.set(x.map_id,x)}let h=i.maneScores.filter(x=>x.map_id===i.maneMapId&&x.division==="zero").length,v=i.maneScores.filter(x=>x.map_id===i.maneMapId&&x.division==="max").length,S=i.maneScores.filter(x=>x.map_id===i.maneMapId&&x.division===i.maneDivision).sort(Ze),A=S[0]||null,_=ns(S,i.maneRoleMode,x=>x.carry,e),M=new Map(_.map(([x,z])=>[x,z.label]));i.maneCarry&&!M.has(i.maneCarry)&&(i.maneCarry="");let $=le(i.maneQuery),k=!!(i.maneCarry||i.maneAfflatus||$),L=S.map((x,z)=>({record:x,rank:z+1})).filter(({record:x})=>{let z=i.maneRoleMode==="member"?_t(x.team,x.carry):ue(x.carry);return i.maneCarry&&!z.some(j=>q(j)===i.maneCarry)||i.maneAfflatus&&!z.some(j=>Pi(j,i.maneAfflatus))?!1:$?le(x.display_name).includes($)||ue(x.carry).some(j=>wt(j,$))||(x.team||[]).some(j=>wt(j,$)):!0}),B=L.map(({record:x,rank:z})=>{let j=`mane-${x.id}`,ce=ve(x.carry,e),J=(x.team||[]).map(De=>V(De,e)),{psychubes:Q,resonanceCodes:_e}=Ke(x);He.set(j,{mode:"mane",recordId:x.id,section:i.maneSection,mapId:c?.id||i.maneMapId,division:i.maneDivision,rank:z,title:m,bossEn:p,bossThumb:l.thumb,subtitle:`${be(i.maneSection,e)} · ${ae(i.maneDivision,e)}`,player:x.display_name,carry:ce,rawCarry:x.carry,team:x.team,displayTeam:J,psychubes:Q,resonanceCodes:_e,score:x.score,date:ct(x.created_at,e),related_url:x.related_url});let ke=z<=3?`top-${z} is-podium`:"is-regular",he=i.highlightRecordId===j?"is-highlighted":"",me=Qs(x,e);return`
      <article class="rank-row ${ke} ${he}" data-record-row="${s(j)}">
        <div>${Ht(z,e)}</div>
        <div class="player-cell">
          <span class="player-name is-clickable is-player-name" data-open-player="${s(x.display_name)}" role="button" tabindex="0">${s(x.display_name)}</span>
          <div class="player-meta">
            <span title="${s(ct(x.created_at,e))}">${s(us(x.created_at,e))}</span>
            ${ha(x.related_url,r("videoGuideLink",{},e))}
            ${me}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line">
            <span class="carry-label">${s(r("mainDpsLabel",{},e))}</span>
            <span>${s(ce)}</span>
          </div>
          ${dn(x.team,x.carry,Q,e)}
        </div>
        ${ji({mode:"mane",record:x,rank:z,pid:j,psychubes:Q,resonanceCodes:_e,boardPeak:A,mapName:c?.name||"",stageFastest:null,lang:e})}
        <div class="result-cell">
          <div class="peak-score-ticket">
            <div class="peak-score-text">
              <span class="peak-label">${s(r("scoreLabel",{},e))}</span>
              <span class="score-value">${de(x.score,e)}</span>
            </div>
            ${qs(x.score,e)}
          </div>
          <div class="row-actions">
            <button type="button" class="card-trigger" data-poster="${s(j)}">${s(r("viewCardBtn",{},e))}</button>
          </div>
        </div>
      </article>`}).join(""),R=k?`${L.length} / ${S.length}`:`${Ce(i.maneDivision,e)} · ${ie(S.length,e)}`,G=i.maneSection==="new"?r("weaknessLabel",{},e):r("favoredLabel",{},e),T=(l.weakness||[]).length?`<span class="glance-weakness"><span class="glance-label">${s(G)}</span>${l.weakness.map(x=>{let z=ge[x];return z?`<span class="glance-aff-chip"><img src="${s(z.icon)}" alt="" aria-hidden="true" />${s(Te(x,e))}</span>`:""}).join("")}</span>`:"",D=c?Cs(c.name,A?.score||0,e):null,w=D?.thresholds?.length?D.thresholds:[],I=i.maneSelectedAppraisal>=0&&i.maneSelectedAppraisal<w.length?i.maneSelectedAppraisal:-1,F=I>=0?w[I]:null,W=w.length?`<div class="boss-appraisal-strip" title="${s(r("appraisalClickHint",{},e))}">
         <div class="appraisal-rail">
           ${w.map((x,z)=>`
             <button type="button" class="appraisal-step ${x.reached?"is-cleared":""} ${I===z?"is-selected":""}" data-select-appraisal="${z}" aria-pressed="${I===z}" title="${s(x.scoreLabel)} · ${s(r("appraisalClickHint",{},e))}">
               <span class="appraisal-roman">${s(x.roman||qt(z+1))}</span>
               <span class="appraisal-val">${s(x.scoreLabel)}</span>
             </button>`).join("")}
         </div>
       </div>
       ${F?`
         <div class="appraisal-callout" role="region" aria-label="${s(r("appraisalActiveLabel",{},e))}">
           <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
             <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
               <strong>${s(r("rowAppraisalStage",{roman:F.roman||qt(I+1)},e))} · ${s(F.scoreLabel)}</strong>
               ${F.reached?`<span class="dossier-pill" style="border-color:rgba(130,196,136,0.52);color:#b5ebb9;background:rgba(84,152,92,0.2)">✓ ${s(r("appraisalClearedBadge",{},e))}</span>`:""}
             </div>
             <button type="button" class="text-link-btn" data-action="toggle-mane-mech">${s(i.maneMechOpen?r("btnCollapseMech",{},e):r("btnExpandMech",{},e))}</button>
           </div>
           <p>${Ge(F.desc,e)}</p>
         </div>`:""}`:"",ne=i.maneScores.filter(x=>x.map_id===i.maneMapId),re=!!(k||i.maneRoleMode!=="carry"),se=(i.maneCarry?1:0)+(i.maneAfflatus?1:0)+($?1:0)+(i.maneRoleMode==="member"?1:0);return`
    ${o}
    <div class="board-grid">
      <aside class="sidebar-panel ${i.mobileFilterOpen?"is-filter-open":""}" aria-label="${s(r("headingLineupFilter",{},e))}">
        <div class="sidebar-dossier-block">
          ${jt(r("headingSurvey",{},e),r("headingSurveyEn",{},e),Ce(i.maneDivision,e))}
          <div class="dossier-list" role="listbox" aria-label="${s(r("headingSurvey",{},e))}">
            ${n.map((x,z)=>{let j=g.get(x.id)||0,ce=y.get(x.id),J=Pe(x.name,i.maneSection),Q=fe(x.name,e),_e=(J.weakness||[]).length?`<span class="dossier-aff-icons">${J.weakness.map(he=>{let me=ge[he];return me?.icon?`<img src="${s(me.icon)}" alt="${s(Te(he,e))}" loading="lazy" decoding="async" />`:""}).join("")}</span>`:"",ke=x.opens_at?r("opensAt",{time:ps(x.opens_at,e)},e):J.version?`v${J.version}`:be("rerun",e);return`
                <button type="button" class="dossier-item ${x.id===i.maneMapId?"active":""} ${J.thumb?"has-boss-bg":""}" data-mane-map="${s(x.id)}" title="${s(Q)} (${s(ie(j,e))})">
                  ${J.thumb?`<span class="dossier-boss-art" style="background-image:url('${s(J.thumb)}');background-position:${s(J.pos)}" aria-hidden="true"></span>`:""}
                  <span class="survey-num-box" aria-hidden="true">${z+1}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${s(Q)}</span>
                    <span class="dossier-meta-line">
                      ${_e}
                      <span class="dossier-sub">${s(ke)}</span>
                    </span>
                  </span>
                  <span class="dossier-right-col">
                    ${ce?`<span class="dossier-peak-preview">${s(lt(ce.score,e))}</span>`:""}
                    <span class="dossier-badge">${s(ie(j,e))}</span>
                  </span>
                </button>`}).join("")||`<p class="sidebar-note">${s(r("emptyTitleLoading",{},e))}</p>`}
          </div>
        </div>

        <div class="sidebar-portrayal-block">
          ${jt(r("headingPortrayal",{},e),r("headingPortrayalEn",{},e))}
          <div class="portrayal-control-row">
            <div class="segmented-toggle">
              <button type="button" class="seg-btn ${i.maneDivision==="zero"?"active":""}" data-mane-div="zero">
                <span>${s(ae("zero",e))}</span><small>${s(ie(h,e))}</small>
              </button>
              <button type="button" class="seg-btn ${i.maneDivision==="max"?"active":""}" data-mane-div="max">
                <span>${s(ae("max",e))}</span><small>${s(ie(v,e))}</small>
              </button>
            </div>
            <button type="button" class="mobile-filter-toggle ${i.mobileFilterOpen?"open":""} ${se?"has-active":""}" data-action="toggle-mobile-filter" aria-expanded="${i.mobileFilterOpen}">
              <img class="uttu-micro-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
              <span>${s(r("mobileFilterBtn",{},e))}${se?` (${se})`:""}</span>
              <span class="filter-caret" aria-hidden="true">${i.mobileFilterOpen?"▴":"▾"}</span>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">${s(r("headingLineupFilter",{},e))}</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">${s(r("headingLineupFilterEn",{},e))}</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-mane-filter" ${re?"":"disabled"} title="${s(r("clearFilter",{},e))}">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>${s(r("resetFilter",{},e))}</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="${s(r("headingLineupFilter",{},e))}">
            <button type="button" class="role-pill ${i.maneRoleMode==="carry"?"active":""}" data-mane-role="carry">${s(r("roleCarryOnly",{},e))}</button>
            <button type="button" class="role-pill ${i.maneRoleMode==="member"?"active":""}" data-mane-role="member">${s(r("roleAnyMember",{},e))}</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="maneCarrySelect" class="filter-select" aria-label="${s(i.maneRoleMode==="carry"?r("allCarriesOption",{},e):r("allMembersOption",{},e))}">
              <option value="">${s(i.maneRoleMode==="carry"?`${r("allCarriesOption",{},e)} (${_.length})`:`${r("allMembersOption",{},e)} (${_.length})`)}</option>
              ${Ae(_.map(([x,z])=>[x,`${z.label} (${z.count})`]),i.maneCarry)}
            </select>
          </div>

          ${Bi(i.maneAfflatus,"data-mane-aff",e)}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="maneSearchInput" class="filter-input has-icon" type="search" placeholder="${s(r("searchPlaceholderMane",{},e))}" value="${s(i.maneQuery)}" aria-label="${s(r("searchPlaceholderMane",{},e))}" />
          </div>
        </div>

        ${Ii(S,x=>x.carry,i.maneCarry,"mane",e)}

        <div class="sidebar-note">
          ${s(i.maneSection==="rerun"?r("sidebarNoteRerun",{},e):r("sidebarNoteMane",{},e))}
        </div>
      </aside>

      <section class="board-panel" aria-label="${s(r("maneTitle",{},e))}">
        <div class="board-header ${l.thumb?"has-boss-art":""}">
          <span class="boss-stamp-edge" aria-hidden="true"></span>
          ${l.thumb?`<div class="boss-header-backdrop" style="background-image:url('${s(l.thumb)}');background-position:${s(l.pos)}" aria-hidden="true"></div>`:""}
          <span class="boss-wanted-wm" aria-hidden="true">WANTED</span>
          ${b?`<img class="boss-header-cutout" src="${s(l.hero)}" alt="" aria-hidden="true" loading="eager" fetchpriority="high" decoding="async" />`:""}
          <div class="boss-header-scrim" aria-hidden="true"></div>
          <div class="board-title-stack">
            <div class="boss-tips-row">
              <span class="boss-tips-label">${s(r("tipsLabel",{},e))}</span>
              ${T}
              ${f.map(x=>`<span class="tip-paper-tag">${s(x)}</span>`).join("")}
            </div>
            <div class="boss-headline-wrap">
              <h2>${s(m)}</h2>
              ${p?`<span class="boss-en-sub">${s(p)}</span>`:""}
            </div>
            <div class="boss-quick-glance">
              <span class="glance-meta">${u?.turns?s($e(u.turns,e)):""}${c?.opens_at?` · ${s(r("opensAt",{time:ps(c.opens_at,e)},e))}`:""}</span>
              ${u?`<button type="button" class="mech-toggle-btn ${i.maneMechOpen?"active":""}" data-action="toggle-mane-mech" aria-expanded="${i.maneMechOpen}">${s(i.maneMechOpen?r("btnCollapseMech",{},e):r("btnExpandMech",{},e))}</button>`:""}
              ${d?`<a class="text-link-btn" href="${s(d)}" target="_blank" rel="noopener noreferrer">${s(r("bossWikiLink",{},e))}</a>`:""}
              ${i.maneCarry?`<span class="glance-active-chip">${s(i.maneRoleMode==="carry"?r("mainDpsLabel",{},e):r("roleAnyMember",{},e))}: ${s(M.get(i.maneCarry)||"")}</span>`:""}
              ${i.maneAfflatus?`<span class="glance-active-chip">${s(Te(i.maneAfflatus,e))}</span>`:""}
              ${k?`<button type="button" class="glance-clear-btn" data-action="reset-mane-filter">✕ ${s(r("clearFilter",{},e))}</button>`:""}
            </div>
            ${W}
          </div>
          <div class="boss-peak-widget">
            <div class="boss-peak-eyebrow">
              <span>${s(r("bossPeakLabel",{},e))}</span>
              <span class="boss-peak-count">${s(R)}</span>
            </div>
            ${A?`<div class="peak-score-ticket">
                   <div class="peak-score-text">
                     <span class="peak-label is-player-name">${s(A.display_name)}</span>
                     <span class="score-value">${de(A.score,e)}</span>
                   </div>
                   ${qs(A.score,e)}
                 </div>`:`<div class="peak-score-ticket"><div class="peak-score-text"><span class="peak-label">${s(r("emptyTitleEmpty",{},e))}</span><span class="score-value">—</span></div></div>`}
            <div class="boss-peak-actions">
              ${i.connected&&Ja(c)?`<button type="button" class="paper-btn boss-submit-btn" data-action="open-submit">${s(r("submitThisBoss",{},e))}</button>`:""}
            </div>
          </div>
        </div>

        ${po(u,e)}

        ${zi("mane",S,ne,e)}

        ${L.length?`<div class="rank-list">
               <div class="rank-list-head">
                 <span>${s(r("colRank",{},e))}</span><span>${s(r("colInvestigator",{},e))}</span><span>${s(r("colLineup",{},e))}</span><span>${s(r("colTactical",{},e))}</span><span class="col-right">${s(r("colScoreGrade",{},e))}</span>
               </div>
               ${B}
             </div>`:`<div class="empty-state">
               <span class="empty-glyph">✦</span>
               <h3>${s(i.loading?r("emptyTitleLoading",{},e):S.length?r("emptyTitleFiltered",{},e):r("emptyTitleEmpty",{},e))}</h3>
               <p>${s(i.loading?r("statusSyncing",{},e):S.length?r("emptyDescFiltered",{},e):r("emptyDescMane",{},e))}</p>
               ${S.length?`<button type="button" class="outline-btn" data-action="reset-mane-filter">${s(r("clearFilter",{},e))}</button>`:i.connected&&Ja(c)?`<button type="button" class="copper-btn" data-action="open-submit">${s(r("emptyActionSubmit",{},e))}</button>`:""}
             </div>`}
        <div class="board-foot">
          <span>${s(r("boardFootMane",{},e))}</span>
        </div>
      </section>
    </div>`}function ho(e,t=[]){let a=E(),n=i.maneSection==="new"?e:"",o=t.length,c=Hs(i.maneTotals,i.maneSection,n,i.maneDivision,null,a),l=N(a)?", ":"、",u=pe()&&i.dataSource==="offline"?`<button type="button" class="paper-btn btn-export-offline" data-action="export-offline-excel">${s(r("btnExportExcel",{},a))}</button>`:"",m=c.length?Math.max(1,Number(c[0].total||1n)):1;return`
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>${s(r("totalsEyebrow",{},a))}</span></div>
          <div class="boss-headline-wrap">
            <h2>${s(r("totalsTitle",{},a))}</h2>
            <span class="boss-en-sub">${s(be(i.maneSection,a))}</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${s(ae(i.maneDivision,a))}</span>
            <span class="paper-tag dark">${s(hn(o,a))}</span>
          </div>
        </div>
        <div class="board-header-right">
          ${u}
          <div class="segmented-toggle" style="min-width:210px">
            <button type="button" class="seg-btn ${i.maneDivision==="zero"?"active":""}" data-mane-div="zero"><span>${s(ae("zero",a))}</span></button>
            <button type="button" class="seg-btn ${i.maneDivision==="max"?"active":""}" data-mane-div="max"><span>${s(ae("max",a))}</span></button>
          </div>
        </div>
      </div>

      <div class="totals-methodology">
        <div class="method-item">${s(r("totalsMethodScope",{},a))}</div>
        <div class="method-item">${s(r("totalsMethodZero",{},a))}</div>
        <div class="method-item">${s(r("totalsMethodMerge",{},a))}</div>
      </div>

      ${c.length?`<div class="table-scroll">
            <table class="archive-table table-mane-totals">
              <thead><tr><th style="width:76px">${s(r("colRank",{},a))}</th><th>${s(r("mainDpsLabel",{},a))}</th><th>${s(C("Per-Boss Best Breakdown","各图最高分明细",a))}</th><th class="num-col">${s(C("Total Score","调查总分",a))}</th></tr></thead>
              <tbody>
                ${c.map((p,f)=>{let d=Math.min(100,Math.max(4,Math.round(Number(p.total||0n)/m*100)));return`
                    <tr>
                      <td class="cell-rank">${Ht(f+1,a)}</td>
                      <td class="cell-entity">
                        <div style="display:flex;align-items:center;gap:6px">
                          <span data-open-char="${s(p.carry_cn||p.carry_name)}" role="button" tabindex="0" style="cursor:pointer;display:inline-flex" title="${s(p.carry_name)}">${Fi(p.carry_cn||p.carry_name,a)}</span>
                          <button type="button" class="entity-jump-btn" data-jump-mane-carry="${s(p.carry_key)}" data-jump-carry-name="${s(p.carry_name)}" data-jump-map="${s(p.map_scores?.[0]?.map_id||"")}" title="${s(p.carry_name)}">
                            <span style="min-width:0">
                              <strong style="font-family:var(--font-serif);font-size:15px">${s(p.carry_name)}</strong>
                            </span>
                            <span class="entity-jump-arrow" aria-hidden="true">↗</span>
                          </button>
                        </div>
                      </td>
                      <td class="cell-detail">
                        <details class="map-breakdown">
                          <summary>${s(r("totalsBreakdownSummary",{count:p.map_count},a))}${o?` / ${o}`:""}</summary>
                          <ul>
                            ${(p.map_scores||[]).map(b=>{let g=Pe(b.name,i.maneSection);return`
                              <li>
                                ${g?.thumb?`<img class="breakdown-boss-thumb" src="${s(g.thumb)}" alt="" aria-hidden="true" loading="lazy" decoding="async" />`:""}
                                <strong>${s(fe(b.name,a))}</strong> · <span style="display:inline;color:var(--copper-bright)">${de(b.score,a)}</span>
                                <button type="button" class="text-link-btn" style="margin-left:8px" data-jump-mane-carry="${s(p.carry_key)}" data-jump-carry-name="${s(p.carry_name)}" data-jump-map="${s(b.map_id)}">${s(r("totalsWatchMap",{},a))}</button>
                                <span>${s(r("colInvestigator",{},a))}: <em class="is-player-name" style="font-style:normal">${s(b.player)}</em> · ${s((b.team||[]).map(y=>V(y,a)).join(l))}</span>
                              </li>`}).join("")}
                          </ul>
                        </details>
                      </td>
                      <td class="num-col cell-primary" data-label="${s(C("Total Score","调查总分",a))}">
                        <span class="score-value">${de(p.total,a)}</span>
                        <div class="totals-bar-track"><div class="totals-bar-fill" style="width:${d}%"></div></div>
                      </td>
                    </tr>`}).join("")}
              </tbody>
            </table>
          </div>`:`<div class="empty-state"><span class="empty-glyph">✦</span><h3>${s(nt.has("maneTotals")||i.loading?r("emptyTitleLoading",{},a):r("totalsEmpty",{},a))}</h3></div>`}
      <div class="board-foot">
        <span>${s(ae(i.maneDivision,a))} · ${s(ie(c.length,a))}</span>
      </div>
    </div>`}function yo(){let e=E(),t=N(e)?"en":"zh-CN",a={all:r("playersScopeAll",{},e),new:r("playersScopeNew",{},e),rerun:r("playersScopeRerun",{},e)},n={all:r("playersDivAll",{},e),zero:ae("zero",e),max:ae("max",e)},o=Be("new"),c=Be("rerun"),l=i.manePlayerScope==="new"?o:i.manePlayerScope==="rerun"?c:[...o,...c],u=new Map(l.map(d=>[d.id,d])),m=new Map;for(let d of i.maneScores){if(!u.has(d.map_id)||i.manePlayerDiv!=="all"&&d.division!==i.manePlayerDiv)continue;let b=`${d.map_id}::${d.division}`;m.has(b)||m.set(b,[]),m.get(b).push(d)}let p=new Map;for(let d of m.values())d.sort(Ze),d.forEach((b,g)=>{let y=g+1,h=le(b.display_name);if(!h)return;let v=p.get(h);v||(v={name:b.display_name,recordCount:0,firstCount:0,podiumCount:0,bestScore:0n,bestLabel:"",carryCounts:new Map,entries:[]},p.set(h,v));let S=u.get(b.map_id),A=S?fe(S.name,e):r("modeMane",{},e),_=BigInt(b.score||0);v.recordCount+=1,y===1&&(v.firstCount+=1),y<=3&&(v.podiumCount+=1);for(let M of ue(b.carry)){let $=te(M);if(!$)continue;let k=v.carryCounts.get($.id);k?k.count+=1:v.carryCounts.set($.id,{char:$,count:1})}_>v.bestScore&&(v.bestScore=_,v.bestLabel=`${A} · ${Ce(b.division,e)}`),v.entries.push({id:b.id,section:S?.section||"new",mapId:b.map_id,mapName:A,division:b.division,rank:y,score:_,carry:ve(b.carry,e)})});let f=[...p.values()].map(d=>(d.entries.sort((b,g)=>b.rank-g.rank||(g.score>b.score?1:g.score<b.score?-1:0)),d.favChars=[...d.carryCounts.values()].sort((b,g)=>g.count-b.count).slice(0,3),d)).sort((d,b)=>b.recordCount-d.recordCount||b.firstCount-d.firstCount||b.podiumCount-d.podiumCount||(b.bestScore>d.bestScore?1:b.bestScore<d.bestScore?-1:0)||String(d.name).localeCompare(String(b.name),t));return`
    <div class="section-bar">
      <div class="section-tabs" role="group" aria-label="${s(r("sectionLabel",{},e))}">
        ${Object.entries(a).map(([d,b])=>`<button type="button" class="section-tab-btn ${d===i.manePlayerScope?"active":""}" data-mane-player-scope="${d}">${s(b)}</button>`).join("")}
      </div>
      <div class="section-tabs" role="group" aria-label="${s(r("fieldDivision",{},e))}">
        ${Object.entries(n).map(([d,b])=>`<button type="button" class="outline-btn ${d===i.manePlayerDiv?"selected":""}" data-mane-player-div="${d}">${s(b)}</button>`).join("")}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="boss-headline-wrap">
            <h2>${s(r("playersManeTitle",{},e))}</h2>
            <span class="boss-en-sub">Hall of Fame</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag">${s(a[i.manePlayerScope])}</span>
            <span class="paper-tag dark">${s(n[i.manePlayerDiv])}</span>
          </div>
        </div>
        <span class="count-tag">${s(ie(f.length,e))}</span>
      </div>

      ${f.length?`<div class="table-scroll">
            <table class="archive-table table-mane-players">
              <thead>
                <tr>
                  <th style="width:70px">${s(r("colRank",{},e))}</th>
                  <th>${s(C("Timekeeper","调查员",e))}</th>
                  <th>${s(C("Honors & Active Rankings","荣誉分布与持榜明细",e))}</th>
                  <th class="num-col">${s(r("playersBestScore",{},e))}</th>
                  <th class="num-col" style="width:128px">${s(r("playersHoldings",{},e))}</th>
                </tr>
              </thead>
              <tbody>
                ${f.map((d,b)=>`
                  <tr>
                    <td class="cell-rank">${Ht(b+1,e)}</td>
                    <td class="cell-entity">
                      <div style="display:flex;flex-direction:column;gap:4px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <span class="player-name is-clickable is-player-name" data-open-player="${s(d.name)}" role="button" tabindex="0">${s(d.name)}</span>
                          <button type="button" class="text-link-btn" data-jump-mane-player="${s(d.name)}" data-jump-section="${s(d.entries[0]?.section||"new")}" data-jump-map="${s(d.entries[0]?.mapId||"")}" data-jump-div="${s(d.entries[0]?.division||"zero")}">${s(r("totalsWatchMap",{},e))}</button>
                        </div>
                        ${d.favChars.length?`
                          <div class="hof-fav-chars">
                            ${d.favChars.map(({char:g})=>{let y=V(g.name,e);return g.portrait?`<img src="${s(g.portrait)}" alt="${s(y)}" title="${s(y)}" data-open-char="${s(g.name)}" role="button" tabindex="0" style="cursor:pointer" loading="lazy" decoding="async" />`:""}).join("")}
                          </div>`:""}
                      </div>
                    </td>
                    <td class="cell-detail">
                      <div class="honor-badges-row hof-medals">
                        ${d.firstCount?`<span class="hof-crown-pill">♛ ${s(r("hofCrownsLabel",{},e))} ×${d.firstCount}</span>`:""}
                        ${d.podiumCount?`<span class="honor-chip bronze">${s(r("hofPodiumsLabel",{},e))} ×${d.podiumCount}</span>`:""}
                      </div>
                      <details class="map-breakdown">
                        <summary>${s(r("playersExpandRecords",{n:d.recordCount},e))}</summary>
                        <ul>
                          ${d.entries.map(g=>`
                            <li>
                              <strong>#${g.rank} ${s(g.mapName)}</strong> (${s(Ce(g.division,e))}) ·
                              <span style="display:inline;color:var(--copper-bright)">${de(g.score,e)}</span>
                              <button type="button" class="text-link-btn" style="margin-left:8px" data-jump-mane-record="${s(g.id)}" data-jump-section="${s(g.section)}" data-jump-map="${s(g.mapId)}" data-jump-div="${s(g.division)}">${s(r("totalsWatchMap",{},e))}</button>
                              <span>${s(r("mainDpsLabel",{},e))}: ${s(g.carry)}</span>
                            </li>`).join("")}
                        </ul>
                      </details>
                    </td>
                    <td class="num-col cell-secondary" data-label="${s(r("playersBestScore",{},e))}">
                      <div class="cell-metric-val">
                        <span class="score-value" style="font-size:15.5px">${de(d.bestScore,e)}</span>
                        <div class="cell-metric-sub">${s(d.bestLabel)}</div>
                      </div>
                    </td>
                    <td class="num-col cell-primary" data-label="${s(r("playersHoldings",{},e))}"><span class="score-value">${d.recordCount}</span></td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>`:`<div class="empty-state"><span class="empty-glyph">♙</span><h3>${s(r("playersEmpty",{},e))}</h3></div>`}
      <div class="board-foot">
        <span>${s(r("playersManeFoot",{},e))}</span>
      </div>
    </div>`}function vo(){let e=E(),t=r("rulesManeItems",{},e)||[];return`
    ${ya("mane-rules",e)}
    <div class="rules-grid">
      ${t.map(([a,n,o])=>`
        <article class="rule-card">
          <span class="rule-num">${s(a)}</span>
          <h3>${s(n)}</h3>
          <p>${s(o)}</p>
        </article>`).join("")}
    </div>`}function $o(e,t,a=E()){let n=e?.enemies||[];if(!n.length)return[];let c=String(t?.enemies||"").split("+").map(l=>l.trim()).filter(Boolean);return n.map((l,u)=>{let m=c[u]||"",p=m.match(/[（(]([^）)]+)[）)]/),f=m.match(/×\s*(\d+)/),d=p?`${p[1]}${f?` ×${f[1]}`:""}`:"";return{name:N(a)?l.en:l.name,icon:l.icon,hp:d}})}function So(){let e=E();if(i.fbPage==="rules")return ko();if(i.fbPage==="carries")return wo();if(i.fbPage==="players")return _o();let t=i.fbVersions.find(w=>w.id===i.fbVersionId),a=Me(i.fbVersionId);i.fbVersions.length&&!a.some(w=>w.id===i.fbStageId)&&(i.fbStageId=a[0]?.id||"");let n=a.find(w=>w.id===i.fbStageId),o=jn(n,e),c=Da(n),l=n?$t(n.name,e):r("fbTitle",{},e),u=l.split(/\s*[\/／]\s*/).map(w=>w.trim()).filter(Boolean),m=$o(c,o,e),p=N(e)?c?.wikiEn:c?.wikiZh,f=new Map,d=new Map;for(let w of i.fbRecords)if(w.group_code===i.fbGroup){f.set(w.stage_id,(f.get(w.stage_id)||0)+1);let I=d.get(w.stage_id);(I===void 0||Number(w.rounds)<I)&&d.set(w.stage_id,Number(w.rounds))}let b=i.fbRecords.filter(w=>w.stage_id===i.fbStageId&&w.group_code==="zero").length,g=i.fbRecords.filter(w=>w.stage_id===i.fbStageId&&w.group_code==="max").length,y=i.fbRecords.filter(w=>w.stage_id===i.fbStageId&&w.group_code===i.fbGroup).sort(rt),h=y[0]||null,v=ns(y,i.fbRoleMode,w=>w.carry_name,e),S=new Map(v.map(([w,I])=>[w,I.label]));i.fbCarry&&!S.has(i.fbCarry)&&(i.fbCarry="");let A=le(i.fbQuery),_=i.fbGroup==="zero"&&i.fbResonanceOnly,M=!!(i.fbCarry||i.fbAfflatus||A||_),$=y.map((w,I)=>({record:w,rank:I+1})).filter(({record:w})=>{if(_&&!w.resonance_ten)return!1;let I=_t(w.team,w.carry_name),F=i.fbRoleMode==="member"?I:ue(w.carry_name);return i.fbCarry&&!F.some(W=>q(W)===i.fbCarry)||i.fbAfflatus&&!F.some(W=>Pi(W,i.fbAfflatus))?!1:A?le(w.display_name).includes(A)||ue(w.carry_name).some(W=>wt(W,A))||I.some(W=>wt(W,A))||(w.team||[]).some(W=>le(W).includes(A)):!0}),k=i.fbArchives.filter(w=>!_&&w.stage_id===i.fbStageId&&w.group_code===i.fbGroup).sort((w,I)=>w.display_order-I.display_order),L=$.map(({record:w,rank:I})=>{let F=`fb-${w.id}`,W=ve(w.carry_name,e),ne=cn(w.team)?w.team:(w.team||[]).map(J=>V(J,e)),{psychubes:re,resonanceCodes:se}=Ke(w);He.set(F,{mode:"flashback",recordId:w.id,versionId:t?.id||i.fbVersionId,stageId:n?.id||i.fbStageId,group:i.fbGroup,rank:I,title:l,bossEn:o?.code||"",bossThumb:c?.hero||"",subtitle:`${t?xe(t,e):""} · ${ae(i.fbGroup,e)}`,player:w.display_name,carry:W,rawCarry:w.carry_name,team:w.team,displayTeam:ne,psychubes:re,resonanceCodes:se,resonanceTen:!!(w.group_code==="zero"&&w.resonance_ten),rounds:w.rounds,date:ct(w.created_at,e),related_url:w.related_url});let x=I<=3?`top-${I} is-podium`:"is-regular",z=i.highlightRecordId===F?"is-highlighted":"",j=Qs(w,e),ce=Number(w.rounds)<=2;return`
      <article class="rank-row ${x} ${z}" data-record-row="${s(F)}">
        <div>${Ht(I,e)}</div>
        <div class="player-cell">
          <span class="player-name is-clickable is-player-name" data-open-player="${s(w.display_name)}" role="button" tabindex="0">${s(w.display_name)}</span>
          <div class="player-meta">
            <span title="${s(ct(w.created_at,e))}">${s(us(w.created_at,e))}</span>
            ${ha(w.related_url,r("videoGuideLink",{},e))}
            ${w.group_code==="zero"&&w.resonance_ten?vi(e):""}
            ${j}
          </div>
        </div>
        <div class="lineup-cell">
          <div class="carry-line">
            <span class="carry-label">${s(r("mainDpsLabel",{},e))}</span>
            <span>${s(W)}</span>
          </div>
          ${dn(w.team,w.carry_name,re,e)}
        </div>
        ${ji({mode:"flashback",record:w,rank:I,pid:F,psychubes:re,resonanceCodes:se,boardPeak:null,mapName:"",stageFastest:h,lang:e})}
        <div class="result-cell">
          <span class="round-badge ${ce?"is-fast":""}">${w.rounds}<small>${s(N(e)?Number(w.rounds)===1?"Round":"Rounds":"回合")}</small></span>
          <div class="row-actions">
            <button type="button" class="card-trigger" data-poster="${s(F)}">${s(r("viewCardBtn",{},e))}</button>
          </div>
        </div>
      </article>`}).join(""),B=k.length?`
    <div class="board-foot"><span>${s(r("adminTabHistorical",{},e))} · ${s(ae(i.fbGroup,e))}</span></div>
    <div class="table-scroll">
      <table class="archive-table table-fb-archives">
        <thead><tr><th>${s(r("mainDpsLabel",{},e))}</th><th>${s(r("legacyTeamLabel",{},e))}</th><th>${s(r("colInvestigator",{},e))}</th><th class="num-col">${s(r("colRounds",{},e))}</th></tr></thead>
        <tbody>
          ${k.map(w=>`
            <tr>
              <td class="cell-entity" data-label="${s(r("mainDpsLabel",{},e))}">${(w.carry_names||[]).map(I=>s(V(I,e))).join(" / ")}</td>
              <td class="cell-detail" data-label="${s(r("legacyTeamLabel",{},e))}">${s(w.lineup_label)}</td>
              <td class="cell-secondary is-player-name" data-label="${s(r("colInvestigator",{},e))}">${s(w.credited_player)}</td>
              <td class="num-col cell-primary" data-label="${s(r("colRounds",{},e))}">≤ 6R</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>`:"",R=M?`${$.length} / ${y.length}`:`${Ce(i.fbGroup,e)} · ${ie(y.length,e)}`,G=i.fbRecords.filter(w=>w.stage_id===i.fbStageId),T=!!(M||i.fbRoleMode!=="carry"),D=[i.fbCarry,i.fbAfflatus,A,i.fbRoleMode==="member",_].filter(Boolean).length;return`
    <div class="section-bar fb-section-bar">
      <div class="fb-version-picker">
        <label for="fbVersionSelect" class="fb-version-label">${s(r("versionSelectLabel",{},e))}</label>
        <select id="fbVersionSelect" class="filter-select fb-version-select">
          ${Ae(i.fbVersions.map(w=>[w.id,xe(w,e)]),i.fbVersionId)}
        </select>
      </div>
      <button type="button" class="ghost-btn icon-btn section-refresh-btn" data-action="refresh" title="${s(r("btnRefresh",{},e))}" aria-label="${s(r("btnRefresh",{},e))}"><img class="uttu-micro-icon" src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" /><span class="btn-label">${s(r("btnRefresh",{},e))}</span></button>
    </div>

    ${ya("fb-board",e)}

    <div class="board-grid">
      <aside class="sidebar-panel ${i.mobileFilterOpen?"is-filter-open":""}" aria-label="${s(r("headingLineupFilter",{},e))}">
        <div class="sidebar-dossier-block">
          ${jt(r("headingStageSelect",{},e),r("headingStageSelectEn",{},e),Ce(i.fbGroup,e))}
          <div class="dossier-list">
            ${a.map(w=>{let I=f.get(w.id)||0,F=d.get(w.id),W=Da(w),ne=$t(w.name,e),re=(W?.enemies||[]).map(se=>N(e)?se.en:se.name).join(" · ")||`Stage ${w.stage_no}`;return`
                <button type="button" class="dossier-item ${w.id===i.fbStageId?"active":""} ${W?.thumb?"has-boss-bg":""}" data-fb-stage="${s(w.id)}" title="${s(ne)} (${s(ie(I,e))})">
                  ${W?.thumb?`<span class="dossier-boss-art" style="background-image:url('${s(W.thumb)}');background-position:${s(W.pos)}" aria-hidden="true"></span>`:""}
                  <span class="survey-num-box" aria-hidden="true">${qt(w.stage_no)}</span>
                  <span class="dossier-main">
                    <span class="dossier-name">${s(ne)}</span>
                    <span class="dossier-sub">${s(re)}</span>
                  </span>
                  <span class="dossier-right-col">
                    ${F!==void 0?`<span class="dossier-peak-preview">${s(r("roundsUnit",{n:F},e))}</span>`:""}
                    <span class="dossier-badge">${s(ie(I,e))}</span>
                  </span>
                </button>`}).join("")||`<p class="sidebar-note">${s(i.loading?r("emptyTitleLoading",{},e):r("emptyTitleEmpty",{},e))}</p>`}
          </div>
        </div>

        <div class="sidebar-portrayal-block">
          ${jt(r("headingPortrayal",{},e),r("headingPortrayalEn",{},e))}
          <div class="portrayal-control-row">
            <div class="segmented-toggle">
              <button type="button" class="seg-btn ${i.fbGroup==="zero"?"active":""}" data-fb-group="zero">
                <span>${s(ae("zero",e))}</span><small>${s(ie(b,e))}</small>
              </button>
              <button type="button" class="seg-btn ${i.fbGroup==="max"?"active":""}" data-fb-group="max">
                <span>${s(ae("max",e))}</span><small>${s(ie(g,e))}</small>
              </button>
            </div>
            <button type="button" class="mobile-filter-toggle ${i.mobileFilterOpen?"open":""} ${D?"has-active":""}" data-action="toggle-mobile-filter" aria-expanded="${i.mobileFilterOpen}">
              <img class="uttu-micro-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
              <span>${s(r("mobileFilterBtn",{},e))}${D?` (${D})`:""}</span>
              <span class="filter-caret" aria-hidden="true">${i.mobileFilterOpen?"▴":"▾"}</span>
            </button>
          </div>
        </div>

        <div class="lineup-filter-box">
          <div class="ig-heading">
            <span class="ig-heading-left">
              <span class="ig-tri" aria-hidden="true">▶</span>
              <span class="ig-cn">${s(r("headingLineupFilter",{},e))}</span>
              <span class="ig-bar" aria-hidden="true"></span>
              <span class="ig-en">${s(r("headingLineupFilterEn",{},e))}</span>
            </span>
            <button type="button" class="filter-reset-btn" data-action="reset-fb-filter" ${T?"":"disabled"} title="${s(r("clearFilter",{},e))}">
              <img src="./assets/uttu/btn_reset.webp" alt="" aria-hidden="true" />
              <span>${s(r("resetFilter",{},e))}</span>
            </button>
          </div>

          <div class="role-mode-toggle" role="group" aria-label="${s(r("headingLineupFilter",{},e))}">
            <button type="button" class="role-pill ${i.fbRoleMode==="carry"?"active":""}" data-fb-role="carry">${s(r("roleCarryOnly",{},e))}</button>
            <button type="button" class="role-pill ${i.fbRoleMode==="member"?"active":""}" data-fb-role="member">${s(r("roleAnyMember",{},e))}</button>
          </div>

          <div class="field" style="margin-bottom:8px">
            <select id="fbCarrySelect" class="filter-select" aria-label="${s(i.fbRoleMode==="carry"?r("allCarriesOption",{},e):r("allMembersOption",{},e))}">
              <option value="">${s(i.fbRoleMode==="carry"?`${r("allCarriesOption",{},e)} (${v.length})`:`${r("allMembersOption",{},e)} (${v.length})`)}</option>
              ${Ae(v.map(([w,I])=>[w,`${I.label} (${I.count})`]),i.fbCarry)}
            </select>
          </div>

          ${Bi(i.fbAfflatus,"data-fb-aff",e)}

          <div class="search-input-wrap">
            <img class="search-input-icon" src="./assets/uttu/btn_search.webp" alt="" aria-hidden="true" />
            <input id="fbSearchInput" class="filter-input has-icon" type="search" placeholder="${s(r("searchPlaceholderFb",{},e))}" value="${s(i.fbQuery)}" aria-label="${s(r("searchPlaceholderFb",{},e))}" />
          </div>
        </div>

        ${Ii(y,w=>w.carry_name,i.fbCarry,"flashback",e)}

        <div class="sidebar-note">
          ${s(r("sidebarNoteFb",{},e))}
        </div>
      </aside>

      <div>
        <section class="board-panel">
          <div class="board-header ${c?.hero?"has-fb-art":""}">
            <span class="boss-stamp-edge" aria-hidden="true"></span>
            ${c?.hero?`<div class="boss-header-backdrop" style="background-image:url('${s(c.hero)}');background-position:${s(c.pos)}" aria-hidden="true"></div>`:""}
            <div class="boss-header-scrim" aria-hidden="true"></div>
            <div class="board-title-stack">
              <div class="boss-headline-wrap">
                <h2>${s(l)}</h2>
                <span class="boss-en-sub">${s(o?.code||`STAGE ${n?.stage_no||""}`)}</span>
              </div>
              ${u.length?`
                <div class="fb-archetype-row">
                  ${u.map(w=>`<span class="fb-archetype-tag">✦ ${s(w)}</span>`).join("")}
                </div>`:""}
              ${m.length?`
                <div class="fb-enemy-strip">
                  ${m.map(w=>`
                    <div class="fb-enemy-chip">
                      <img class="fb-enemy-avatar" src="${s(w.icon)}" alt="${s(w.name)}" loading="eager" decoding="async" />
                      <div class="fb-enemy-meta">
                        <span class="fb-enemy-name">${s(w.name)}</span>
                        ${w.hp?`<span class="fb-enemy-hp">${s(w.hp)}</span>`:""}
                      </div>
                    </div>`).join("")}
                </div>`:""}
              <div class="boss-quick-glance">
                ${i.fbGroup==="zero"?`<button type="button" class="resonance-tag" data-action="fb-resonance" aria-pressed="${_}">✦ ${s(r("res10Filter",{},e))}</button>`:""}
                ${o?`<button type="button" class="mech-toggle-btn ${i.fbMechOpen?"active":""}" data-action="toggle-fb-mech" aria-expanded="${i.fbMechOpen}">${s(i.fbMechOpen?r("btnCollapseStageMech",{},e):r("btnExpandStageMech",{},e))}</button>`:""}
                ${p?`<a class="text-link-btn" href="${s(p)}" target="_blank" rel="noopener noreferrer">${s(r("stageWikiLink",{},e))}</a>`:""}
                ${i.fbCarry?`<span class="glance-active-chip">${s(i.fbRoleMode==="carry"?r("mainDpsLabel",{},e):r("roleAnyMember",{},e))}: ${s(S.get(i.fbCarry)||"")}</span>`:""}
                ${i.fbAfflatus?`<span class="glance-active-chip">${s(Te(i.fbAfflatus,e))}</span>`:""}
                ${M?`<button type="button" class="glance-clear-btn" data-action="reset-fb-filter">✕ ${s(r("clearFilter",{},e))}</button>`:""}
              </div>
            </div>
            <div class="boss-peak-widget">
              <div class="boss-peak-eyebrow">
                <span>${s(r("metricFastest",{},e))}</span>
                <span class="boss-peak-count">${s(R)}</span>
              </div>
              ${h?`<div class="peak-score-ticket">
                     <div class="peak-score-text">
                       <span class="peak-label is-player-name">${s(h.display_name)}</span>
                       <span class="score-value">${s($e(h.rounds,e))}</span>
                     </div>
                   </div>`:`<div class="peak-score-ticket"><div class="peak-score-text"><span class="peak-label">${s(r("emptyTitleEmpty",{},e))}</span><span class="score-value">—</span></div></div>`}
              <div class="boss-peak-actions">
                ${i.connected&&n?`<button type="button" class="paper-btn boss-submit-btn" data-action="open-submit">${s(r("submitThisStage",{},e))}</button>`:""}
              </div>
            </div>
          </div>

          ${uo(o,e)}

          ${zi("flashback",y,G,e)}

          ${$.length?`<div class="rank-list">
                 <div class="rank-list-head">
                   <span>${s(r("colRank",{},e))}</span><span>${s(r("colPlayerTime",{},e))}</span><span>${s(r("colLineup",{},e))}</span><span>${s(r("colArchetype",{},e))}</span><span class="col-right">${s(r("colRounds",{},e))}</span>
                 </div>
                 ${L}
               </div>`:k.length?"":`<div class="empty-state">
                 <span class="empty-glyph">✧</span>
                 <h3>${s(i.loading?r("emptyTitleLoading",{},e):M?r("emptyTitleFiltered",{},e):r("emptyTitleEmpty",{},e))}</h3>
                 <p>${s(i.loading?r("statusSyncing",{},e):M?r("emptyDescFiltered",{},e):r("emptyDescFb",{},e))}</p>
                 ${M?`<button type="button" class="outline-btn" data-action="reset-fb-filter">${s(r("clearFilter",{},e))}</button>`:i.connected?`<button type="button" class="copper-btn" data-action="open-submit">${s(r("emptyActionSubmit",{},e))}</button>`:""}
               </div>`}
          ${B}
          <div class="board-foot">
            <span>${s(r("boardFootFb",{},e))}</span>
            <button type="button" class="text-link-btn" data-action="refresh">${s(r("btnRefresh",{},e))}</button>
          </div>
        </section>

        <div class="two-cards">
          <article class="rule-card">
            <span class="rule-num">01</span>
            <h3>${s(r("fbRuleCard1Title",{},e))}</h3>
            <p>${s(r("fbRuleCard1Desc",{},e))}</p>
          </article>
          <article class="rule-card">
            <span class="rule-num">02</span>
            <h3>${s(r("fbRuleCard2Title",{},e))}</h3>
            <p>${s(r("fbRuleCard2Desc",{},e))}</p>
          </article>
        </div>
      </div>
    </div>`}function wo(){let e=E(),t=N(e)?"en":"zh-CN",a={period:r("carryScopePeriod",{},e),all:r("carryScopeAll",{},e)},n={appearance_count:r("carryMetricAppearances",{},e),challenge_count:C("Stages Cleared","通关关卡数",e)},o=i.fbCarryScope==="period"?i.fbVersionId:null,c=i.fbVersions.find(g=>g.id===o),l=i.fbCarryMetric,u=l==="appearance_count"?"challenge_count":"appearance_count",m=o?Me(o).length:new Set(i.fbStages.map(g=>g.challenge_id)).size,p=new Map(i.fbStages.map(g=>[g.id,g])),f=new Map;for(let g of i.fbRecords){if(o&&g.version_id!==o)continue;let y=p.get(g.stage_id)?.challenge_id||g.stage_id,h=JSON.stringify([y,g.group_code,g.team_key||At(g.team)]);for(let v of ue(g.carry_name)){let S=q(v);f.has(S)||f.set(S,new Set),f.get(S).add(h)}}let d=new Map;for(let g of i.fbCarries){if(g.version_id!==o)continue;let y=q(g.carry_name),h=V(g.carry_name,e),v=Ne(g.carry_name),S=d.get(y);S?S.challenge_count=Math.min(m||999,Math.max(S.challenge_count,Number(g.challenge_count||0))):d.set(y,{carry_key:y,carry_name:h,carry_cn:v,appearance_count:f.get(y)?.size||0,challenge_count:Number(g.challenge_count||0)})}let b=[...d.values()].filter(g=>g[l]>0).sort((g,y)=>y[l]-g[l]||y[u]-g[u]||String(g.carry_name).localeCompare(String(y.carry_name),t));return`
    <div class="section-bar">
      <div class="section-tabs">
        ${Object.entries(a).map(([g,y])=>`<button type="button" class="section-tab-btn ${g===i.fbCarryScope?"active":""}" data-fb-carry-scope="${g}">${s(y)}</button>`).join("")}
      </div>
      <div class="section-tabs">
        ${Object.entries(n).map(([g,y])=>`<button type="button" class="outline-btn ${g===l?"selected":""}" data-fb-carry-metric="${g}">${s(y)}</button>`).join("")}
      </div>
    </div>

    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>${s(C("CARRY RANKING · MAIN DPS METRICS","CARRY RANKING · 主 C 登场统计",e))}</span></div>
          <div class="boss-headline-wrap">
            <h2>${s(r("carriesPageTitle",{},e))}</h2>
            <span class="boss-en-sub">Top Arcanist Carries</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">${s(i.fbCarryScope==="all"?r("carryScopeAll",{},e):c?xe(c,e):r("carryScopePeriod",{},e))}</span>
          </div>
        </div>
        <span class="count-tag">${s(ie(b.length,e))}</span>
      </div>
      ${b.length?`<div class="table-scroll">
            <table class="archive-table table-fb-carries">
              <thead><tr><th style="width:76px">${s(r("colRank",{},e))}</th><th>${s(r("mainDpsLabel",{},e))}</th><th class="num-col">${s(n[l])}</th><th class="num-col">${s(n[u])}</th></tr></thead>
              <tbody>
                ${b.map((g,y)=>`
                    <tr>
                      <td class="cell-rank">${Ht(y+1,e)}</td>
                      <td class="cell-entity">
                        <div style="display:flex;align-items:center;gap:6px">
                          <span data-open-char="${s(g.carry_cn)}" role="button" tabindex="0" style="cursor:pointer;display:inline-flex" title="${s(g.carry_name)}">${Fi(g.carry_cn,e)}</span>
                          <button type="button" class="entity-jump-btn" data-jump-fb-carry="${s(g.carry_key)}" data-jump-carry-name="${s(g.carry_name)}" title="${s(g.carry_name)}">
                            <span style="min-width:0">
                              <strong style="font-family:var(--font-serif);font-size:15px">${s(g.carry_name)}</strong>
                            </span>
                            <span class="entity-jump-arrow" aria-hidden="true">↗</span>
                          </button>
                        </div>
                      </td>
                      <td class="num-col cell-primary" data-label="${s(n[l])}"><span class="score-value">${g[l]}</span></td>
                      <td class="num-col cell-secondary" data-label="${s(n[u])}" style="color:var(--linen)">${g[u]}</td>
                    </tr>`).join("")}
              </tbody>
            </table>
          </div>`:`<div class="empty-state"><span class="empty-glyph">◇</span><h3>${s(nt.has("fbCarries")||i.loading?r("emptyTitleLoading",{},e):r("emptyTitleEmpty",{},e))}</h3></div>`}
      <div class="board-foot"><span>${s(r("carriesPageSub",{},e))}</span></div>
    </div>`}function Wi(e=i.fbVersionId){let t=new Map(i.fbStages.map(o=>[o.id,o])),a=new Map;for(let o of i.fbRecords){let c=String(o.display_name||"").trim(),l=le(c);if(!l)continue;let u=a.get(l);u?o.created_at&&(!u.latestAt||String(o.created_at)>String(u.latestAt))&&(u.display_name=c,u.latestAt=o.created_at):(u={key:l,display_name:c,latestAt:o.created_at||"",periodKeys:new Set,allTimeKeys:new Set},a.set(l,u));let m=t.get(o.stage_id),p=o.version_id||m?.version_id||null,f=m?.challenge_id||o.stage_id,d=o.team_key||At(o.team||[]);u.allTimeKeys.add(JSON.stringify([f,o.group_code,d])),e&&p===e&&u.periodKeys.add(JSON.stringify([o.stage_id,o.group_code,d]))}let n=new Map;for(let o of i.fbPlayers){let c=String(o.display_name||"").trim(),l=le(c);if(!l||a.has(l))continue;let u=n.get(l);u||(u={key:l,display_name:c,periodCount:0,appearance_count:0},n.set(l,u));let m=Number(o.appearance_count||0);o.version_id===null?u.appearance_count+=m:e&&o.version_id===e&&(u.periodCount+=m)}return[...[...a.values()].map(o=>({key:o.key,display_name:o.display_name,periodCount:o.periodKeys.size,appearance_count:o.allTimeKeys.size})),...[...n.values()].filter(o=>o.appearance_count>0||o.periodCount>0)]}function _o(){let e=E(),t=N(e)?"en":"zh-CN",a=i.fbVersions.find(l=>l.id===i.fbVersionId),n=new Map,o=new Map;for(let l of i.fbRecords){let u=`${l.stage_id}::${l.group_code}`;o.has(u)||o.set(u,[]),o.get(u).push(l)}for(let l of o.values())l.sort(rt),l.forEach((u,m)=>{let p=le(u.display_name);if(!p)return;let f=n.get(p);f||(f={crowns:0,podiums:0,carries:new Map},n.set(p,f)),m===0&&(f.crowns+=1),m<3&&(f.podiums+=1);for(let d of ue(u.carry_name)){let b=te(d);if(!b)continue;let g=f.carries.get(b.id);g?g.count+=1:f.carries.set(b.id,{char:b,count:1})}});let c=Wi(i.fbVersionId).map(l=>{let u=n.get(l.key);return{...l,crowns:u?.crowns||0,podiums:u?.podiums||0,favChars:u?[...u.carries.values()].sort((m,p)=>p.count-m.count).slice(0,3):[]}}).sort((l,u)=>u.periodCount-l.periodCount||u.appearance_count-l.appearance_count||String(l.display_name).localeCompare(String(u.display_name),t));return`
    <div class="section-bar">
      <div class="fb-version-picker">
        <label for="fbVersionSelect" class="fb-version-label">${s(r("versionSelectLabel",{},e))}</label>
        <select id="fbVersionSelect" class="filter-select fb-version-select">
          ${Ae(i.fbVersions.map(l=>[l.id,xe(l,e)]),i.fbVersionId)}
        </select>
      </div>
    </div>
    <div class="board-panel">
      <div class="board-header">
        <div class="board-title-stack">
          <div class="board-survey-tag"><span>HALL OF FAME</span></div>
          <div class="boss-headline-wrap">
            <h2>${s(r("playersFbTitle",{},e))}</h2>
            <span class="boss-en-sub">All-Time Honors</span>
          </div>
          <div class="paper-tag-row">
            <span class="paper-tag dark">${s(a?xe(a,e):r("fbCycleFallback",{},e))}</span>
          </div>
        </div>
        <span class="count-tag">${s(ie(c.length,e))}</span>
      </div>
      ${c.length?`<div class="table-scroll">
            <table class="archive-table table-fb-players">
              <thead><tr><th style="width:76px">${s(r("colRank",{},e))}</th><th>${s(C("Timekeeper","玩家昵称",e))}</th><th class="num-col">${s(r("playersPeriodHoldings",{},e))}</th><th class="num-col">${s(r("playersAllTimeHoldings",{},e))}</th></tr></thead>
              <tbody>
                ${c.map((l,u)=>`
                  <tr>
                    <td class="cell-rank">${Ht(u+1,e)}</td>
                    <td class="cell-entity">
                      <div style="display:flex;flex-direction:column;gap:4px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                          <span class="player-name is-clickable is-player-name" data-open-player="${s(l.display_name)}" role="button" tabindex="0">${s(l.display_name)}</span>
                          <button type="button" class="text-link-btn" data-jump-fb-player="${s(l.display_name)}">${s(r("totalsWatchMap",{},e))}</button>
                        </div>
                        ${l.crowns||l.podiums?`
                          <div class="hof-medals">
                            ${l.crowns?`<span class="hof-crown-pill">♛ ${s(r("hofCrownsLabel",{},e))} ×${l.crowns}</span>`:""}
                            ${l.podiums?`<span class="honor-chip bronze">${s(r("hofPodiumsLabel",{},e))} ×${l.podiums}</span>`:""}
                          </div>`:""}
                        ${l.favChars.length?`
                          <div class="hof-fav-chars">
                            ${l.favChars.map(({char:m})=>{let p=V(m.name,e);return m.portrait?`<img src="${s(m.portrait)}" alt="${s(p)}" title="${s(p)}" data-open-char="${s(m.name)}" role="button" tabindex="0" style="cursor:pointer" loading="lazy" decoding="async" />`:""}).join("")}
                          </div>`:""}
                      </div>
                    </td>
                    <td class="num-col cell-primary" data-label="${s(r("playersPeriodHoldings",{},e))}"><span class="score-value">${l.periodCount}</span></td>
                    <td class="num-col cell-secondary" data-label="${s(r("playersAllTimeHoldings",{},e))}" style="color:var(--linen)">${l.appearance_count}</td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>`:`<div class="empty-state"><span class="empty-glyph">♙</span><h3>${s(nt.has("fbPlayers")||i.loading?r("emptyTitleLoading",{},e):r("playersEmpty",{},e))}</h3></div>`}
      <div class="board-foot"><span>${s(r("playersFbFoot",{},e))}</span></div>
    </div>
    <div class="two-cards">
      <article class="rule-card">
        <span class="rule-num">∞</span>
        <h3>${s(r("fbRuleCard1Title",{},e))}</h3>
        <p>${s(r("fbRuleCard1Desc",{},e))}</p>
      </article>
      <article class="rule-card">
        <span class="rule-num">✦</span>
        <h3>${s(r("fbRuleCard2Title",{},e))}</h3>
        <p>${s(r("fbRuleCard2Desc",{},e))}</p>
      </article>
    </div>`}function ko(){let e=E(),t=r("rulesFbItems",{},e)||[];return`
    ${ya("fb-board",e)}
    <div class="rules-grid">
      ${t.map(([a,n,o])=>`
        <article class="rule-card">
          <span class="rule-num">${s(a)}</span>
          <h3>${s(n)}</h3>
          <p>${s(o)}</p>
        </article>`).join("")}
    </div>
    <div class="sidebar-note" style="margin-top:16px">
      ${s(r("rulesFbNote",{},e))}
    </div>`}function Oe(e){return e?new Promise(t=>{let a=new Image;a.onload=()=>t(a),a.onerror=()=>t(null),a.src=e}):Promise.resolve(null)}function Dt(e,t,a,n,o,c,l=.08){let u=t.naturalWidth/t.naturalHeight,m=o/c,p=0,f=0,d=t.naturalWidth,b=t.naturalHeight;u>m?(d=t.naturalHeight*m,p=(t.naturalWidth-d)*.5):(b=t.naturalWidth/m,f=(t.naturalHeight-b)*l),e.drawImage(t,p,f,d,b,a,n,o,c)}function Vs(e,t,a,n,o,c,l){let u=n;for(;u>o&&(e.font=`${c} ${u}px ${l}`,!(e.measureText(t).width<=a));)u-=2;return e.font=`${c} ${u}px ${l}`,u}async function Co(e){let t=E(),a=N(t),n=i.posterTheme==="obsidian";try{document.fonts?.ready&&await document.fonts.ready}catch{}let o=e.psychubes||[],c=e.resonanceCodes||[],l=o.some(Boolean),u=c.some(Boolean),m=1200,p=l?u?806:770:u?726:684,f=document.createElement("canvas");f.width=m,f.height=p;let d=f.getContext("2d"),b=e.mode==="mane",g=a?'"UTTU Regular", "Playfair Display", Georgia, serif':'"Noto Serif SC", "UTTU Regular", "Songti SC", "Microsoft YaHei", serif',y=a?'"Cinzel Decorative", "UTTU Regular", Georgia, serif':'"Cinzel Decorative", "Noto Serif SC", Georgia, serif',h='"UTTU Typewriter", "Courier New", monospace',v=n?{bg0:"#211914",bg1:"#15100d",bg2:"#0e0b09",fadeSolid:"#1b1410",fadeMid:"rgba(27,20,16,0.35)",fadeEnd:"rgba(27,20,16,0)",wmAlpha:.2,frameOuter:"#c89b54",frameInner:"rgba(229, 186, 115, 0.34)",stripe:b?"#df6931":"#e5ba73",kicker:"#e5ba73",title:"#fbf4e8",bossSub:"#d8a66a",sub:"#c5b7a3",rankNum:b?"#f4b068":"#f6cc78",rankLabel:"#bfa98a",divider:"rgba(229, 186, 115, 0.32)",labelMuted:"#b9a68c",player:"#faf2e4",carry:"#d2c2ac",score:b?"#f4b068":"#f6cc78",psyTitle:"#f5ebdc",psySub:"#b8a892",resBg:"rgba(255, 245, 228, 0.08)",resBorder:"rgba(229, 186, 115, 0.34)",resText:"#f3dfba",cardBorder:"#9b7b4c",cardCarryBorder:"#f0a056",legacyBorder:"rgba(229, 186, 115, 0.5)",legacyText:"#efe2ce",footLine:"rgba(229, 186, 115, 0.28)",footText:"#bda98e"}:{bg0:"#f3eadb",bg1:"#e2d4be",bg2:"#d3c0a6",fadeSolid:"#efe5d6",fadeMid:"rgba(239,229,214,0.2)",fadeEnd:"rgba(239,229,214,0)",wmAlpha:.14,frameOuter:"#8a5636",frameInner:"rgba(138, 86, 54, 0.35)",stripe:b?"#a83328":"#b2863e",kicker:b?"#8c3426":"#7b5b25",title:"#1b120d",bossSub:"#9c4e2e",sub:"#5c4738",rankNum:b?"#b93a2b":"#8d6423",rankLabel:"#6b5241",divider:"rgba(90, 56, 36, 0.32)",labelMuted:"#6b5241",player:"#1c120d",carry:"#5a4334",score:b?"#9c3d22":"#8b5e1d",psyTitle:"#2a1d15",psySub:"#6b5241",resBg:"rgba(255, 252, 245, 0.65)",resBorder:"rgba(112, 74, 46, 0.38)",resText:"#2f2017",cardBorder:"#7c5238",cardCarryBorder:"#df6931",legacyBorder:"rgba(138, 86, 54, 0.55)",legacyText:"#3c2b21",footLine:"rgba(90, 56, 36, 0.3)",footText:"#6b5241"},S=d.createLinearGradient(0,0,m,p);if(S.addColorStop(0,v.bg0),S.addColorStop(.55,v.bg1),S.addColorStop(1,v.bg2),d.fillStyle=S,d.fillRect(0,0,m,p),e.bossThumb){let T=await Oe(e.bossThumb);if(T){d.save(),d.globalAlpha=v.wmAlpha,Dt(d,T,m*.44,0,m*.56,280,.22);let D=d.createLinearGradient(m*.44,0,m,0);D.addColorStop(0,v.fadeSolid),D.addColorStop(.45,v.fadeMid),D.addColorStop(1,v.fadeEnd),d.globalAlpha=1,d.fillStyle=D,d.fillRect(m*.44,0,m*.56,280),d.restore()}}d.strokeStyle=v.frameOuter,d.lineWidth=4,d.strokeRect(16,16,m-32,p-32),d.strokeStyle=v.frameInner,d.lineWidth=1.5,d.strokeRect(26,26,m-52,p-52),d.fillStyle=v.stripe,d.fillRect(16,16,10,p-32),d.fillStyle=v.kicker,d.font=`600 15px ${y}`,d.fillText(b?r("posterKickerMane",{},t):r("posterKickerFb",{},t),58,70);let A=e.title||"",_=m-270;if(d.fillStyle=v.title,Vs(d,A,_,40,24,"700",g),d.fillText(A,58,122,_),e.bossEn&&!a){let D=58+Math.min(d.measureText(A).width,_)+16,w=m-210-D;w>120&&(d.fillStyle=v.bossSub,d.font=`italic 500 20px ${g}`,d.fillText(e.bossEn,D,120,w))}d.fillStyle=v.sub,d.font=`500 16px ${g}`;let M=e.subtitle||"";if(d.fillText(M,58,156,m-260),!b&&e.resonanceTen){let T=Math.min(d.measureText(M).width,m-460),D=r("posterRes10Badge",{},t);d.font=`700 12px ${g}`;let w=d.measureText(D).width+18,I=58+T+14,F=138;d.fillStyle="#3d2c1b",d.fillRect(I,F,w,24),d.strokeStyle="#8d6423",d.lineWidth=1,d.strokeRect(I,F,w,24),d.fillStyle="#f8db9e",d.fillText(D,I+9,155)}if(d.textAlign="right",d.fillStyle=v.rankNum,d.font=`700 52px ${y}`,d.fillText(e.rank>0?`#${String(e.rank).padStart(2,"0")}`:r("posterDailyLabel",{},t),m-58,122),d.fillStyle=v.rankLabel,d.font=`600 13px ${y}`,d.fillText(e.rank>0?r("posterRankLabel",{},t):r("posterDailyLabel",{},t),m-58,150),d.textAlign="left",d.strokeStyle=v.divider,d.lineWidth=1.5,d.beginPath(),d.moveTo(58,180),d.lineTo(m-58,180),d.stroke(),d.fillStyle=v.labelMuted,d.font=`600 13px ${y}`,d.fillText(r("posterInvestigator",{},t),58,216),d.fillStyle=v.player,Vs(d,e.player||"",560,30,20,"700",g),d.fillText(e.player||"",58,256,560),d.fillStyle=v.carry,d.font=`500 17px ${g}`,d.fillText(`${r("mainDpsLabel",{},t)}: ${e.carry||""}`,58,288,600),b){let T=Ta(e.score,t),D=T.img?await Oe(T.img):null,w=D?m-144:m-58;d.textAlign="right",d.fillStyle=v.labelMuted,d.font=`600 13px ${g}`,d.fillText(r("scoreLabel",{},t),w,216),d.fillStyle=v.score,d.font=`700 42px ${y}`,d.fillText(de(e.score,t),w,266),d.textAlign="left",D&&d.drawImage(D,m-130,202,72,72)}else d.textAlign="right",d.fillStyle=v.labelMuted,d.font=`600 13px ${g}`,d.fillText(r("colRounds",{},t),m-58,216),d.fillStyle=v.score,d.font=`700 42px ${g}`,d.fillText($e(e.rounds,t),m-58,266),d.textAlign="left";let $=Ue(e.team,e.rawCarry||e.carry);if($.length===1&&$[0].type==="legacy")d.save(),d.strokeStyle=v.legacyBorder,d.setLineDash([6,4]),d.strokeRect(58,342,m-116,110),d.fillStyle=v.legacyText,d.font=`600 22px ${g}`,d.fillText(`${r("legacyTeamLabel",{},t)}: ${$[0].raw}`,82,406,m-160),d.restore();else if($.length){let T=new Set(ue(e.rawCarry||e.carry).map(q)),D=248,w=262,I=30,F=58,W=320,ne=await Oe("./assets/uttu/bg_kapaidi.png"),re=a?"MAIN":"主C";for(let se=0;se<Math.min(4,$.length);se++){let x=$[se],z=F+se*(D+I),j=W;if(d.save(),d.fillStyle="#1b1614",d.fillRect(z,j,D,w),x.type==="flex"){let J=Ma(x,t),Q=x.chars.slice(0,4);if(Q.length<=2){let ke=D/Q.length;for(let he=0;he<Q.length;he++){let me=await Oe(Q[he].portrait);me&&Dt(d,me,z+he*ke,j,ke,w,.08)}}else{let ke=D/2,he=w/2;for(let me=0;me<Q.length;me++){let De=await Oe(Q[me].portrait);De&&Dt(d,De,z+me%2*ke,j+Math.floor(me/2)*he,ke,he,.08)}}let _e=d.createLinearGradient(0,j+w-86,0,j+w);_e.addColorStop(0,"rgba(10,8,7,0)"),_e.addColorStop(1,"rgba(10,8,7,0.9)"),d.fillStyle=_e,d.fillRect(z,j+w-86,D,86),d.fillStyle="rgba(28, 22, 18, 0.88)",d.fillRect(z+D-72,j+8,64,22),d.fillStyle="#f3d191",d.font=`700 11px ${g}`,d.textAlign="center",d.fillText(J.tag,z+D-40,j+23,60),d.fillStyle="#fffdf9",d.font=`600 16px ${g}`,d.fillText(J.label,z+D/2,j+w-14,D-14),d.textAlign="left",d.strokeStyle=v.cardBorder,d.lineWidth=1.5,d.strokeRect(z,j,D,w)}else if(x.type==="wild"){let J=xa(x,t);ne&&(d.globalAlpha=.55,Dt(d,ne,z,j,D,w,.5),d.globalAlpha=1),d.fillStyle="#d9b086",d.font=`700 34px ${g}`,d.textAlign="center",d.fillText("✦",z+D/2,j+w/2-6),d.fillStyle="#b9a693",d.font=`600 14px ${g}`,d.fillText(J.sub,z+D/2,j+w/2+24),d.fillStyle="#fffdf9",d.font=`600 16px ${g}`,d.fillText(J.label,z+D/2,j+w-14,D-14),d.textAlign="left",d.strokeStyle=v.cardBorder,d.setLineDash([5,4]),d.lineWidth=1.5,d.strokeRect(z,j,D,w),d.setLineDash([])}else{let J=x.raw||"",Q=x.char||te(J),_e=Q?V(Q.name,t):V(J,t),ke=Q?.aff||Wt(J),he=ge[ke]||ge.unknown,me=T.has(Q?`char:${Q.id}`:q(J));if(ne&&(d.globalAlpha=.72,Dt(d,ne,z,j,D,w,.5),d.globalAlpha=1),Q?.portrait){let Fe=await Oe(Q.portrait);Fe&&Dt(d,Fe,z,j,D,w,.06)}else d.fillStyle="rgba(237,228,215,0.45)",d.font=`700 32px ${g}`,d.textAlign="center",d.fillText(Qe(_e),z+D/2,j+w/2),d.textAlign="left";let De=await Oe(kt(Q?.star||6));if(De){let Fe=D*(De.naturalHeight/De.naturalWidth);d.drawImage(De,z-4,j+w-Fe+4,D+8,Fe)}let rs=d.createLinearGradient(0,j+w-86,0,j+w);if(rs.addColorStop(0,"rgba(10,8,7,0)"),rs.addColorStop(1,"rgba(10,8,7,0.9)"),d.fillStyle=rs,d.fillRect(z,j+w-86,D,86),he.icon){let Fe=await Oe(he.icon);if(Fe){let sr=30*(Fe.naturalHeight/Fe.naturalWidth);d.drawImage(Fe,z+8,j,30,sr)}}me&&(d.fillStyle=b?"#a83328":"#d4a85a",d.fillRect(z+D-56,j+8,48,22),d.fillStyle=b?"#fff6ee":"#18130d",d.font=`700 12px ${y}`,d.textAlign="center",d.fillText(re,z+D-32,j+23),d.textAlign="left"),d.fillStyle="#fffdf9",Vs(d,_e,D-18,17,13,"600",g),d.textAlign="center",d.fillText(_e,z+D/2,j+w-14,D-16),d.textAlign="left",d.strokeStyle=me?v.cardCarryBorder:v.cardBorder,d.lineWidth=me?3:1.5,d.strokeRect(z,j,D,w)}let ce=j+w+12;if(l&&o[se]){let J=Re(o[se]),Q=50;if(J){let me=await Oe(Qt(J.star)),De=await Oe(mt(J.id));me&&d.drawImage(me,z,ce,Q,Q),De&&d.drawImage(De,z,ce,Q,Q),d.strokeStyle=v.frameOuter,d.lineWidth=1,d.strokeRect(z,ce,Q,Q)}let _e=Se(J||o[se],t),ke=J?z+Q+10:z,he=J?D-Q-10:D;d.fillStyle=v.psyTitle,d.font=`600 14px ${g}`,d.fillText(_e,ke,ce+21,he),J&&(d.fillStyle=v.psySub,d.font=`500 12px ${g}`,d.fillText(`${J.star}★ · ${ft(J,t)}`,ke,ce+41,he)),ce+=Q+8}else l&&(ce+=58);if(u&&c[se]){let J=String(c[se]).trim();J&&(d.fillStyle=v.resBg,d.fillRect(z,ce,D,26),d.strokeStyle=v.resBorder,d.lineWidth=1,d.strokeRect(z,ce,D,26),d.fillStyle=v.resText,d.font=`600 11px ${h}`,d.fillText(J,z+7,ce+17,D-14))}d.restore()}}let k=p-64;d.strokeStyle=v.footLine,d.lineWidth=1,d.setLineDash([6,4]),d.beginPath(),d.moveTo(58,k),d.lineTo(m-58,k),d.stroke(),d.setLineDash([]),d.fillStyle=v.footText,d.font=`500 13px ${h}`,d.fillText(r("posterRecordedAt",{date:e.date||""},t),58,k+28),d.textAlign="right",d.fillText(r("posterCommunityFooter",{},t),m-58,k+28),d.textAlign="left";let L=String(e.title||"record").replace(/[\\/:*?"<>|\s]+/g,"-"),B=e.rank>0?`rank${e.rank}`:"daily",R=n?"-obsidian":"",G=`r1999-${e.mode}-${L}-${B}${R}.png`;try{let T=await new Promise((I,F)=>{try{f.toBlob(W=>I(W),"image/png")}catch(W){F(W)}});if(!T)throw new Error("SecurityError");let D=URL.createObjectURL(T),w=document.createElement("a");w.href=D,w.download=G,document.body.appendChild(w),w.click(),w.remove(),setTimeout(()=>URL.revokeObjectURL(D),4e3)}catch(T){throw T?.name==="SecurityError"||/tainted|SecurityError/i.test(String(T?.message||""))?new Error(C("Browser security blocks PNG export on file://. Double-click Start-Offline-Preview.bat to run via local http://localhost and export PNGs.","本地 file:// 协议下浏览器限制画布导出 PNG，请双击 Start-Offline-Preview.bat 通过本地服务打开即可一键保存。",t)):T}}function Eo(e){let t=E(),a=He.get(e);if(!a)return;ot();let n=a.mode==="mane",o=n?`<div style="display:flex;align-items:center;gap:10px">
         <span class="poster-score">${de(a.score,t)}</span>
         ${qs(a.score,t)}
       </div>`:`<span class="poster-score">${s($e(a.rounds,t))}</span>`,c="",l="";try{c=ga(a.related_url),c&&(l=new URL(c).hostname.replace(/^www\./,""))}catch{c=""}let u=c?`<div class="poster-evidence-bar has-link">
         <div>
           <strong>${s(r("posterEvidenceHasLink",{},t))}</strong>
           <span>${s(r("posterEvidenceDomain",{host:l},t))}</span>
         </div>
         <a class="copper-btn" href="${s(c)}" target="_blank" rel="noopener noreferrer ugc">${s(r("posterEvidenceOpen",{},t))}</a>
       </div>`:`<div class="poster-evidence-bar">
         <span>${s(r("posterEvidenceNoLink",{},t))}</span>
       </div>`,m=a.psychubes||[],p=a.resonanceCodes||[],f=a.displayTeam&&a.displayTeam.length&&!cn(a.team)?a.displayTeam:(a.team||[]).map(v=>V(v,t)),d=m.some(Boolean)||p.some(Boolean),b=Math.max(f.length,m.length,p.length),g=Array.from({length:Math.min(4,b)},(v,S)=>({idx:S,code:p[S]||"",name:f[S]||r("slotLabel",{n:S+1},t)})).filter(v=>v.code),y=d?`<div class="poster-builds-section">
         <div class="poster-builds-header">
           <div class="poster-builds-heading">${s(r("posterBuildsHeading",{},t))}</div>
           ${g.length>=2?`<button type="button" class="poster-res-copy-all" data-copy-all-res="${s(e)}">${s(r("posterCopyAllRes",{n:g.length},t))}</button>`:""}
         </div>
         <div class="poster-builds-grid">
           ${Array.from({length:Math.min(4,b)},(v,S)=>{let A=m[S]||"",_=p[S]||"";if(!A&&!_)return"";let M=A?Re(A):null,$=Se(M||A,t),k=f[S]||r("slotLabel",{n:S+1},t);return`
               <div class="poster-build-card">
                 <div class="poster-build-top">
                   <span class="poster-build-slot">${S+1}</span>
                   <strong class="poster-build-char">${s(k)}</strong>
                 </div>
                 <div class="poster-build-main">
                   ${A?`<div class="poster-build-psy" data-open-psy="${s(M?M.id:A)}" role="button" tabindex="0" style="cursor:pointer">
                          ${sn(A,"in-poster",t)}
                          <div class="poster-psy-info">
                            <strong>${s($)}</strong>
                            ${M?`<span>${M.star}★ · ${s(ft(M,t))}</span>`:""}
                          </div>
                        </div>`:`<div class="poster-build-psy-empty">${s(r("posterNoPsy",{},t))}</div>`}
                   ${_?`<div class="poster-res-row">
                          <code class="poster-res-code" title="${s(_)}">${s(_)}</code>
                          <button type="button" class="poster-res-copy" data-copy-res-id="${s(e)}" data-copy-res-idx="${S}">${s(r("posterCopyRes",{},t))}</button>
                        </div>`:""}
                 </div>
               </div>`}).join("")}
         </div>
       </div>`:`<div class="poster-builds-empty">${s(r("posterNoBuilds",{},t))}</div>`,h=i.posterTheme==="obsidian";ye(`
    <div class="modal-eyebrow">${s(r("posterEyebrow",{},t))}</div>
    <h2>${s(r("posterTitle",{},t))}</h2>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px">
      <p class="modal-subtitle" style="margin:0">${s(r("posterSubtitle",{},t))}</p>
      <div class="poster-theme-toggle" role="group" aria-label="${s(r("posterTitle",{},t))}" style="margin-bottom:0">
        <button type="button" class="${h?"":"active"}" data-poster-theme="parchment" aria-pressed="${!h}">${s(r("posterThemeParchment",{},t))}</button>
        <button type="button" class="${h?"active":""}" data-poster-theme="obsidian" aria-pressed="${h}">${s(r("posterThemeObsidian",{},t))}</button>
      </div>
    </div>
    <div class="poster-card ${a.bossThumb?"has-boss-watermark":""} ${h?"is-obsidian":""}" id="activePosterCard">
      ${a.bossThumb?`<div class="poster-boss-wm" style="background-image:url('${s(a.bossThumb)}')" aria-hidden="true"></div>`:""}
      <div class="poster-head">
        <div>
          <div class="poster-kicker">${s(n?r("posterKickerMane",{},t):r("posterKickerFb",{},t))}</div>
          <h3>${s(a.title)}</h3>
          <div class="poster-sub-row">
            <div class="poster-sub">${s(a.subtitle)}</div>
            ${!n&&a.resonanceTen?`<span class="poster-res10-badge">${s(r("posterRes10Badge",{},t))}</span>`:""}
          </div>
        </div>
        <div class="poster-rank-box">
          <div class="poster-rank-num">${a.rank>0?`#${String(a.rank).padStart(2,"0")}`:s(r("posterDailyLabel",{},t))}</div>
          <div class="poster-rank-label">${s(a.rank>0?r("posterRankLabel",{},t):r("posterDailyLabel",{},t))}</div>
        </div>
      </div>

      <div class="poster-body">
        <div>
          <div style="font-size:11px;opacity:0.72;letter-spacing:0.1em">${s(r("posterInvestigator",{},t))}</div>
          <div class="poster-player is-player-name">${s(a.player)}</div>
          <div style="font-size:12px;opacity:0.82;margin-top:3px">${s(r("mainDpsLabel",{},t))}: ${s(a.carry)}</div>
        </div>
        <div>${o}</div>
      </div>

      ${dn(a.team,a.rawCarry||a.carry,m,t)}
      ${y}

      <div class="poster-foot">
        <span>${s(r("posterRecordedAt",{date:a.date},t))}</span>
        <span>${s(r("posterCommunityFooter",{},t))}</span>
      </div>
    </div>
    ${u}
    <div class="form-actions">
      <button type="button" class="paper-btn" data-export-poster="${s(e)}">${s(r("posterBtnSavePng",{},t))}</button>
      <button type="button" class="outline-btn" data-copy-link="${s(e)}">${s(r("posterBtnCopyLink",{},t))}</button>
      <button type="button" class="outline-btn" data-copy-poster="${s(e)}">${s(r("posterBtnCopyText",{},t))}</button>
      <button type="button" class="ghost-btn" data-action="close-modal">${s(r("posterBtnClose",{},t))}</button>
    </div>`,!0)}function Ao(e,t,a=E()){return Rr.map(n=>{let o=e.filter(c=>c.section===n);return o.length?`<optgroup label="${s(be(n,a))}">${Ae(o.map(c=>[c.id,`${c.edition} · ${fe(c.name,a)}`]),t)}</optgroup>`:""}).join("")}function qi(e,t,a=E()){let n=vt(a);return`
    <div class="form-grid">
      <div class="field"><label for="mMap">${s(r("fieldBoss",{},a))} *</label><select id="mMap" name="map_id" required>${Ao(t,e.map_id,a)}</select></div>
      <div class="field"><label for="mDiv">${s(r("fieldDivision",{},a))} *</label><select id="mDiv" name="division">${Ae(Object.entries(n),e.division||"zero")}</select></div>
    </div>
    <div class="form-grid">
      <div class="field"><label for="mName">${s(r("fieldPlayerName",{},a))} *</label><input id="mName" name="display_name" required minlength="2" maxlength="32" value="${s(e.display_name||"")}" /></div>
      <div class="field"><label for="mScore">${s(r("fieldScore",{},a))} *</label><input id="mScore" name="score" required inputmode="numeric" placeholder="${s(C("e.g. 30635308","例如 30635308",a))}" value="${s(e.score??"")}" /></div>
    </div>
    ${nn(a)}
    <div class="field"><label for="mLink">${s(r("fieldRelatedUrl",{},a))}</label><input id="mLink" name="related_url" type="url" maxlength="2048" placeholder="${s(r("fieldRelatedUrlPlaceholder",{},a))}" value="${s(e.related_url||"")}" /></div>`}function Yi(e,{forEdit:t=!1}={}){let a=E(),n=String(e.get("score")??"").trim().replace(/[,，]/g,""),o=Number(n),c=String(e.get("display_name")??"").trim(),l=String(e.get("division")??"");if(!Bt.includes(l))throw new Error(C("Please choose All P0 or Max Portray.","请选择全 0 塑造或全满塑造。",a));if(c.length<2||c.length>32)throw new Error(r("errPlayerRequired",{},a));if(!/^\d+$/.test(n)||!Number.isSafeInteger(o)||o<1)throw new Error(r("errScoreInvalid",{},a));let u=tn(),m={map_id:String(e.get("map_id")),division:l,display_name:c,team:u.team,carry:u.carry,score:o,related_url:ga(e.get("related_url"))||null};return t?(m.team_psychubes=u.hasPsychubes?u.psychubes:null,m.team_resonance_codes=u.hasResonance?u.resonanceCodes:null):(u.hasPsychubes&&(m.team_psychubes=u.psychubes),u.hasResonance&&(m.team_resonance_codes=u.resonanceCodes)),m}function Mo(e,t){let a=e.querySelector("#mProof"),n=e.querySelector("#mScreenshotStatus"),o=e.querySelector("#mProofPreview"),c=e.elements.namedItem("map_id"),l=e.elements.namedItem("score"),u=!1,m=0,p=[];c.addEventListener("change",()=>{u=!0}),a.addEventListener("change",async()=>{let f=E(),d=++m;e._preparedProof=null,e._preparedProofPromise=null,p.reverse().forEach(R=>R()),p=[],We();let b=a.files[0];if(Ft(o),!b||!b.size){n.textContent="";return}if(!ts(b)){n.textContent=r("errProofType",{},f);return}if(b.size>es){n.textContent=C("Screenshot file exceeds 30 MB limit. Please trim or resize it first.","截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。",f);return}Ai(o,b),n.textContent=b.size>Js?C("Screenshot > 5 MB: compressing for upload and analyzing…","截图超过 5 MB，正在自动压缩并识别结算截图…",f):C("Analyzing result screenshot…","正在识别结算截图…",f);let y=as(b,f);e._preparedProofPromise={sourceFile:b,promise:y};let[h,v]=await Promise.allSettled([y,gi().then(R=>R.recognizeManeScreenshot(b))]);if(!e.isConnected||m!==d)return;if(h.status==="fulfilled")e._preparedProof={sourceFile:b,...h.value},h.value.compressed&&ln(o,b,C(`Auto-compressed to ${Ve(h.value.finalSize)}`,`已自动压缩至 ${Ve(h.value.finalSize)}`,f));else{Ft(o),n.textContent=h.reason?.message||r("errProofSize",{},f);return}let S=e._preparedProof?.compressed?C(` · Auto-compressed to ${Ve(e._preparedProof.finalSize)}`,` · 已自动压缩至 ${Ve(e._preparedProof.finalSize)}`,f):"";if(v.status==="rejected"){n.textContent=C("Unable to parse this screenshot; please fill in manually.","暂时无法识别这张截图，请手动填写。",f)+S;return}let A=v.value;if(!A){n.textContent=C("Could not auto-detect this layout. Please fill in fields manually.","这张图的结算版式或关卡未识别，请手动填写。",f)+S;return}let _=A.mapName?t.find(R=>R.name.replace("饥谨","饥馑")===A.mapName):null;if(_&&!u){let R=c.value;c.value=_.id,p.push(()=>{!u&&c.value===_.id&&(c.value=R)})}A.score&&!l.value&&(l.value=A.score,p.push(()=>{l.value===A.score&&(l.value="")}));for(let[R,{character:G,psychube:T}]of A.slots.entries())G&&(!P.chars[R]&&!P.chars.includes(G)&&(P.chars[R]=G,p.push(()=>{P.chars[R]===G&&!P.carries[R]&&!P.psychubes[R]&&!P.resonanceCodes[R]&&(P.chars[R]="")})),T&&P.chars[R]===G&&!P.psychubes[R]&&(P.psychubes[R]=T,p.push(()=>{P.chars[R]===G&&P.psychubes[R]===T&&(P.psychubes[R]="")})));We();let M=A.slots.filter(R=>R.character).length,$=A.slots.filter(R=>R.psychube).length,k=A.mapName?fe(A.mapName,f):C("Boss TBD (select manually)","首领待手选",f),L=M===1?"arcanist":"arcanists",B=$===1?"psychube":"psychubes";n.textContent=C(`Detected: ${k} · ${A.score?de(A.score,f):"Score TBD"} · ${M} ${L} / ${$} ${B}. Verify and mark Main DPS.`,`识别结果：${k} · ${A.score?de(A.score,f)+" 分":"积分待确认"} · ${M} 个角色 / ${$} 个心相。请核对表单，补填其余信息后提交。`,f)+S})}function Ws(){let e=E(),t=i.maneMaps.filter(Ja);if(!i.connected||!t.length)return X(r("bossNotOpenYet",{},e));let a=i.profile?.display_name||"";try{a=a||localStorage.getItem("mane-nickname")||""}catch{}let n=_i("mane");n?ki(n):la();let o=pe()&&i.dataSource==="offline",c=n?.map_id&&t.some(b=>b.id===n.map_id)?n.map_id:i.maneMapId,l=n?.division&&Bt.includes(n.division)?n.division:i.maneDivision,u=n?.display_name||a,m=n?`<div class="draft-restore-bar" id="submitDraftBar"><span>✦ ${s(r("draftRestored",{},e))}</span><button type="button" class="text-link-btn" data-clear-draft="mane">${s(r("clearDraft",{},e))}</button></div>`:"",p=o?`<div class="draft-restore-bar" style="border-left-color:var(--local-teal);border-color:rgba(140,211,200,0.45);background:rgba(68,148,138,0.16)"><span>✦ ${s(r("offlineSubmitNote",{},e))}</span></div>`:"",f=ya("mane-welcome",e);ye(`
    <div class="modal-eyebrow">MANE’S BULLETIN · SUBMIT</div>
    <h2>${s(r("submitManeTitle",{},e))}</h2>
    <div class="modal-subtitle">
      <span class="resonance-tag">✦ ${s(C("Screenshot OCR Ready","已支持图像识别",e))}</span>
      <small class="field-hint" style="display:block;margin-top:6px">${s(r("submitManeSub",{},e))}</small>
    </div>
    ${f}
    ${p}
    ${m}
    <form id="maneSubmitForm">
      <div class="field">
        <label for="mProof">${s(r("fieldProof",{},e))}${o?` (${s(r("slotOptional",{},e))})`:" *"}</label>
        <input id="mProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" ${o?"":"required"} />
        <span class="field-hint">${s(o?C("Offline Sandbox Mode: screenshot optional; saved locally in your browser. Uploading one still runs OCR preview.","离线沙盒模式：截图选填，投稿保存在本机浏览器中；上传截图仍可体验自动识别。",e):r("fieldProofHint",{},e))}</span>
        <span class="field-hint" id="mScreenshotStatus" role="status"></span>
        <div id="mProofPreview" class="proof-upload-preview" hidden></div>
      </div>
      ${qi({map_id:c,division:l,display_name:u,score:n?.score||"",related_url:n?.related_url||""},t,e)}
      ${Ba(e)}
      <p class="submit-portray-note">✦ ${s(r("submitPortrayLimitNote",{},e))}</p>
      <div class="form-actions">
        <button type="button" class="ghost-btn" id="clearDraftBtn" data-clear-draft="mane" ${n?"":"hidden"}>${s(r("clearDraft",{},e))}</button>
        <button type="button" class="outline-btn" data-action="close-modal">${s(r("btnCancel",{},e))}</button>
        <button type="submit" class="copper-btn">${s(r("btnSubmitNow",{},e))} →</button>
      </div>
    </form>`,!0);let d=O("#maneSubmitForm");n?.contact&&d?.elements?.namedItem("contact")&&(d.elements.namedItem("contact").value=n.contact),Mo(d,t)}async function xo(e){let t=E(),a=new FormData(e),n=Yi(a),o=a.get("proof"),c=!!(o&&o.size>0),l=null;if(c&&(e._preparedProof?.sourceFile===o?l=e._preparedProof:e._preparedProofPromise?.sourceFile===o?(l={sourceFile:o,...await e._preparedProofPromise.promise},e._preparedProof=l):(l={sourceFile:o,...await as(o,t)},e._preparedProof=l)),pe()&&i.dataSource==="offline"){let d=new Date().toISOString(),b=`local-${Ya()}`,g={id:b,player_id:"local-sandbox",map_id:n.map_id,division:n.division,display_name:n.display_name,team:n.team,carry:n.carry,score:n.score,related_url:n.related_url,team_psychubes:n.team_psychubes||null,team_resonance_codes:n.team_resonance_codes||null,status:"approved",isLocal:!0,created_at:d,approved_at:d},y=fa();y.mane.unshift(g),an(y);try{localStorage.setItem("mane-nickname",n.display_name)}catch{}ca("mane"),Ye();let h=i.maneMaps.find(S=>S.id===n.map_id);i.mode="mane",i.manePage="scores",h&&(i.maneSection=h.section),i.maneMapId=n.map_id,i.maneDivision=n.division,i.maneCarry="",i.maneAfflatus="",i.maneQuery="";let v=`mane-${b}`;i.highlightRecordId=v,qe=v,Ee(),K(),X(r("offlineSubmitSuccess",{},t));return}if(!c||!l)throw new Error(r("errProofRequired",{},t));await Nt();let u=i.session||(await Z(H.auth.signInAnonymously())).session;if(!u)throw new Error(C("Could not start submission session. Please retry.","建立投稿会话失败，请重试。",t));let p=`${u.user.id}/${Ya()}.${ra[l.mime]}`,f=H.storage.from("mane-proofs");await Z(f.upload(p,l.uploadFile,{contentType:l.mime}));try{await Z(H.rpc("submit_mane_result",{p_record:{...n,evidence_path:p},p_contact:String(a.get("contact")??"").trim()||null}))}catch(d){throw await f.remove([p]),Va(d)?new Error(C("Live database has not enabled Psychube/Resonance columns yet. Clear builds or ask an admin to run the migration.","线上数据库尚未添加心相/共鸣码存储列：请联系站长运行配套迁移 SQL，或暂时清空心相与共鸣码后再提交。",t)):d}i.session=u,i.user=u.user;try{localStorage.setItem("mane-nickname",n.display_name)}catch{}ca("mane"),Ee(),X(r("toastSubmitted",{},t))}function Zi(e,t=!1,a=E()){return`<label class="resonance-choice"${e==="zero"?"":" hidden"}>
    <input name="resonanceTen" type="checkbox"${e==="zero"?"":" disabled"}${t&&e==="zero"?" checked":""}>
    ${s(r("fieldRes10Check",{},a))}</label>`}function Do(e,t=E()){return Me(e).map(a=>`<option value="${s(a.id)}"${a.id===i.fbStageId?" selected":""}>${s(Le(a,t))}</option>`).join("")}function To(e){let t=e.elements.namedItem("proof"),a=e.elements.namedItem("stage"),n=e.elements.namedItem("rounds"),o=e.elements.namedItem("version"),c=e.querySelector("#fbScreenshotStatus"),l=e.querySelector("#fbProofPreview"),u=0,m=!1,p=!1,f=[];a.addEventListener("change",()=>{m=!0,delete e.dataset.ocrStageNumber}),n.addEventListener("change",()=>{p=!0}),t.addEventListener("change",async()=>{let d=E(),b=++u;e._preparedProof=null,e._preparedProofPromise=null,f.reverse().forEach(T=>T()),f=[],We();let g=t.files[0];if(Ft(l),!g?.size){c.textContent="";return}if(!ts(g)){c.textContent=r("errProofType",{},d);return}if(g.size>es){c.textContent=C("Screenshot file exceeds 30 MB limit. Please trim or resize it first.","截图文件超过 30 MB 上限，请先裁剪或压缩后再上传。",d);return}Ai(l,g),c.textContent=g.size>Js?C("Screenshot > 5 MB: compressing for upload and analyzing…","截图超过 5 MB，正在自动压缩并识别通关截图…",d):C("Analyzing clear screenshot…","正在识别通关截图…",d);let h=as(g,d);e._preparedProofPromise={sourceFile:g,promise:h};let[v,S]=await Promise.allSettled([h,gi().then(T=>T.recognizeFlashbackScreenshot(g))]);if(!e.isConnected||b!==u)return;if(v.status==="fulfilled")e._preparedProof={sourceFile:g,...v.value},v.value.compressed&&ln(l,g,C(`Auto-compressed to ${Ve(v.value.finalSize)}`,`已自动压缩至 ${Ve(v.value.finalSize)}`,d));else{Ft(l),c.textContent=v.reason?.message||r("errProofSize",{},d);return}let A=e._preparedProof?.compressed?C(` · Auto-compressed to ${Ve(e._preparedProof.finalSize)}`,` · 已自动压缩至 ${Ve(e._preparedProof.finalSize)}`,d):"";if(S.status==="rejected"){c.textContent=C("Unable to parse this screenshot; please fill in manually.","暂时无法识别这张截图，请手动填写。",d)+A;return}let _=S.value;if(!_){c.textContent=C("Could not auto-detect this clear screen. Please fill in manually.","暂未识别这张图的通关画面，请手动填写。",d)+A;return}let M=Me(o.value).find(T=>T.stage_no===_.stage);if(M&&!m){let T=a.value;a.value=M.id,e.dataset.ocrStageNumber=String(M.stage_no),f.push(()=>{m||(delete e.dataset.ocrStageNumber,[...a.options].some(D=>D.value===T)?a.value=T:a.selectedIndex=0)})}_.rounds!==null&&!p&&(n.value=String(_.rounds),f.push(()=>{p||(n.value="")}));let $=0,k=0;for(let[T,{character:D,psychube:w}]of _.slots.entries()){if(!D)continue;let I=P.chars.some(F=>yt(F).some(W=>q(W)===q(D)));!P.chars[T]&&!I&&(P.chars[T]=D,$++,f.push(()=>{P.chars[T]===D&&!P.carries[T]&&!P.psychubes[T]&&!P.resonanceCodes[T]&&(P.chars[T]="")})),w&&P.chars[T]===D&&!P.psychubes[T]&&(P.psychubes[T]=w,k++,f.push(()=>{P.chars[T]===D&&P.psychubes[T]===w&&(P.psychubes[T]="")}))}$||k?We():da(e);let L=M?Le(M,d):C("Stage TBD","关卡待确认",d),B=_.rounds===null?C("Rounds TBD","回合待确认",d):$e(_.rounds,d),R=$===1?"arcanist":"arcanists",G=k===1?"psychube":"psychubes";c.textContent=C(`Detected: ${L} · ${B} · ${$} ${R} / ${k} ${G}.`,`识别结果：${L} · ${B}。已预填 ${$} 个角色、${k} 个心相，请核对并补填其余信息。`,d)+A})}function Xa(){let e=E();if(!i.connected||!i.fbStages.length||Ga)return;let t=pe()&&i.dataSource==="offline";if(!t&&!i.user){ye(`
      <div class="modal-eyebrow">GUEST PROFILE</div>
      <h2>${s(C("Set Public Timekeeper Name","设置公开展示昵称",e))}</h2>
      <p class="modal-subtitle">${s(C("Your name will appear publicly on Focused Flashback boards and Hall of Fame.","昵称将公开显示于焦点闪回榜单与荣誉殿堂，同一浏览器会保留您的投稿身份。",e))}</p>
      <form id="fbGuestForm">
        <div class="field">
          <label for="fbGuestName">${s(r("fieldPlayerName",{},e))} *</label>
          <input id="fbGuestName" name="name" required minlength="2" maxlength="24" autocomplete="nickname" />
        </div>
        <div class="form-actions">
          <button type="button" class="outline-btn" data-action="close-modal">${s(r("btnCancel",{},e))}</button>
          <button type="submit" class="copper-btn">${s(C("Continue →","继续投稿 →",e))}</button>
        </div>
      </form>`);return}if(!t&&!i.profile){Ji(!0);return}let a=_i("flashback");a?ki(a):la();let n=i.profile?.display_name||"";try{n=n||localStorage.getItem("mane-nickname")||""}catch{}let o=a?.nickname||n,c=a?.version&&i.fbVersions.some(h=>h.id===a.version)?a.version:i.fbVersionId,l=Me(c),u=a?.stage&&l.some(h=>h.id===a.stage)?a.stage:l.some(h=>h.id===i.fbStageId)?i.fbStageId:l[0]?.id||"",m=a?.group&&Bt.includes(a.group)?a.group:i.fbGroup,p=a&&/^[0-6]$/.test(String(a.rounds??""))?String(a.rounds):"",f=vt(e),d=a?`<div class="draft-restore-bar" id="submitDraftBar"><span>✦ ${s(r("draftRestored",{},e))}</span><button type="button" class="text-link-btn" data-clear-draft="flashback">${s(r("clearDraft",{},e))}</button></div>`:"",b=t?`<div class="draft-restore-bar" style="border-left-color:var(--local-teal);border-color:rgba(140,211,200,0.45);background:rgba(68,148,138,0.16)"><span>✦ ${s(r("offlineSubmitNote",{},e))}</span></div>`:"",g=ya("fb-submit",e);ye(`
    <div class="modal-eyebrow">FLASHBACK ARCHIVE · SUBMIT</div>
    <h2>${s(r("submitFbTitle",{},e))}</h2>
    <div class="modal-subtitle">
      <span class="resonance-tag">✦ ${s(C("Screenshot OCR Ready","已支持图像识别",e))}</span>
      <small class="field-hint" style="display:block;margin-top:6px">${s(r("submitFbSub",{},e))}</small>
    </div>
    ${g}
    ${b}
    ${d}
    <form id="fbSubmitForm">
      <div class="field">
        <label for="fbFormProof">${s(r("fieldProof",{},e))}${t?` (${s(r("slotOptional",{},e))})`:" *"}</label>
        <input id="fbFormProof" name="proof" type="file" accept="image/png,image/jpeg,image/webp" ${t?"":"required"} />
        <span class="field-hint">${s(t?C("Offline Sandbox Mode: screenshot optional; saved locally in your browser. Uploading one still runs OCR preview.","离线沙盒模式：截图选填，投稿保存在本机浏览器中；上传截图仍可体验自动识别。",e):r("fieldProofHint",{},e))}</span>
        <span class="field-hint" id="fbScreenshotStatus" role="status"></span>
        <div id="fbProofPreview" class="proof-upload-preview" hidden></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbNick">${s(r("fieldPlayerName",{},e))} *</label><input id="fbNick" name="nickname" ${t?'required minlength="2" maxlength="24"':"readonly"} value="${s(o)}" /></div>
        <div class="field"><label for="fbFormVersion">${s(r("fieldVersion",{},e))} *</label><select id="fbFormVersion" name="version">${Ae(i.fbVersions.map(h=>[h.id,xe(h,e)]),c)}</select></div>
      </div>
      <div class="form-grid">
        <div class="field"><label for="fbFormStage">${s(r("fieldStage",{},e))} *</label><select id="fbFormStage" name="stage">${Ae(l.map(h=>[h.id,Le(h,e)]),u)}</select></div>
        <div class="field"><label for="fbFormGroup">${s(r("fieldDivision",{},e))} *</label><select id="fbFormGroup" name="group">${Ae(Object.entries(f),m)}</select></div>
      </div>
      <div class="field"><label for="fbFormRounds">${s(r("fieldRounds",{},e))} *</label><select id="fbFormRounds" name="rounds" required><option value="">${s(C("Select rounds (0–6)","请选择回合数",e))}</option>${Array.from({length:7},(h,v)=>`<option value="${v}"${p===String(v)?" selected":""}>${s(r("roundsFull",{n:v},e))}</option>`).join("")}</select></div>
      ${Zi(m,!!a?.resonanceTen,e)}
      ${nn(e)}
      <div class="field">
        <label for="fbFormLink">${s(r("fieldRelatedUrl",{},e))}</label>
        <input id="fbFormLink" name="relatedUrl" type="url" maxlength="2048" placeholder="${s(r("fieldRelatedUrlPlaceholder",{},e))}" value="${s(a?.relatedUrl||"")}" />
      </div>
      ${Ba(e)}
      <p class="submit-portray-note">✦ ${s(r("submitPortrayLimitNote",{},e))}</p>
      <div class="form-actions">
        <button type="button" class="ghost-btn" id="clearDraftBtn" data-clear-draft="flashback" ${a?"":"hidden"}>${s(r("clearDraft",{},e))}</button>
        <button type="button" class="outline-btn" data-action="close-modal">${s(r("btnCancel",{},e))}</button>
        <button type="submit" class="copper-btn">${s(r("btnSubmitNow",{},e))} →</button>
      </div>
    </form>`,!0);let y=O("#fbSubmitForm");a?.contact&&y?.elements?.namedItem("contact")&&(y.elements.namedItem("contact").value=a.contact),To(y)}async function Lo(e){let t=E(),a=new FormData(e),n=String(a.get("nickname")??"").trim(),o=String(a.get("rounds")??""),c=Number(o),l=a.get("proof"),u=!!(l&&l.size>0),m=String(a.get("version")),p=String(a.get("stage")),f=String(a.get("group"));if(n.length<2||n.length>24)throw new Error(r("errPlayerRequired",{},t));if(!/^[0-6]$/.test(o))throw new Error(r("errRoundsInvalid",{},t));if(!i.fbStages.some(S=>S.id===p&&S.version_id===m))throw new Error(C("Selected cycle and stage do not match.","所选版本与关卡不匹配。",t));let d=tn();Ps(d.team,t);let b=ga(a.get("relatedUrl"))||null,g=null;if(u&&(e._preparedProof?.sourceFile===l?g=e._preparedProof:e._preparedProofPromise?.sourceFile===l?(g={sourceFile:l,...await e._preparedProofPromise.promise},e._preparedProof=g):(g={sourceFile:l,...await as(l,t)},e._preparedProof=g)),pe()&&i.dataSource==="offline"){let S=new Date().toISOString(),A=`local-${Ya()}`,_=i.fbStages.find(B=>B.id===p),M=i.fbVersions.find(B=>B.id===m),$={id:A,player_id:`local-player:${le(n)}`,stage_id:p,group_code:f,team:d.team,team_key:At(d.team),carry_name:d.carry,rounds:c,created_at:S,display_name:n,stage_no:_?.stage_no||1,stage_name:_?.name||"",version_id:m,version_name:M?.label||"",related_url:b,resonance_ten:f==="zero"&&a.has("resonanceTen"),team_psychubes:d.hasPsychubes?d.psychubes:null,team_resonance_codes:d.hasResonance?d.resonanceCodes:null,status:"approved",isLocal:!0},k=fa();k.flashback.unshift($),an(k);try{localStorage.setItem("mane-nickname",n)}catch{}ca("flashback"),Ye(),i.mode="flashback",i.fbPage="leaderboard",i.fbVersionId=m,i.fbStageId=p,i.fbGroup=f,i.fbResonanceOnly=!1,i.fbCarry="",i.fbAfflatus="",i.fbQuery="";let L=`fb-${A}`;i.highlightRecordId=L,qe=L,Ee(),K(),X(r("offlineSubmitSuccess",{},t));return}if(!u||!g)throw new Error(r("errProofRequired",{},t));await Nt();let y=await Z(H.rpc("flashback_existing_lineup",{p_stage_id:p,p_group_code:f,p_team:d.team,p_rounds:c}));if(y?.length){let{matched_team:S,incumbent_rounds:A}=y[0],_=(S||[]).map(M=>V(M,t)).join(N(t)?", ":"、");throw new Error(C(`This lineup already exists: ${_} (${A}R). Submit fewer rounds or adjust the lineup.`,`已有该队伍：${_}（${A} 回合）。请减少回合，或调整阵容。`,t))}let h=`${i.user.id}/${Ya()}.${ra[g.mime]}`;await Z(H.storage.from("proofs").upload(h,g.uploadFile,{contentType:g.mime,upsert:!1}));let v={stage_id:p,group_code:f,team:d.team,carry_name:d.carry,rounds:c,evidence_path:h,related_url:b,resonance_ten:f==="zero"&&a.has("resonanceTen")};d.hasPsychubes&&(v.team_psychubes=d.psychubes),d.hasResonance&&(v.team_resonance_codes=d.resonanceCodes);try{await Z(H.rpc("submit_flashback_result",{p_record:v,p_contact:String(a.get("contact")??"").trim()||null}))}catch(S){throw await H.storage.from("proofs").remove([h]),Va(S)?new Error(C("Live database has not enabled Psychube/Resonance columns yet. Clear builds or ask an admin to run the migration.","线上数据库尚未添加心相/共鸣码存储列：请联系站长运行配套迁移 SQL，或暂时清空心相与共鸣码后再提交。",t)):S}ca("flashback"),Ee(),await gt(),X(r("toastSubmitted",{},t))}async function Ro(){let e=E(),t=Vi(),{division:a,map:n}=i.maneDaily,o=n?i.maneMaps.filter(l=>l.id===n):i.maneMaps,c=Os(i.maneDailyScores,{date:t,division:a,mapIds:n?[n]:[]});await Gs({date:t,divisions:a?[a]:Bt,maps:o.length?o:i.maneMaps,dailyRows:c,totals:i.maneTotals,divisionLabels:vt(e),sectionLabels:Xs(e),lang:e}),X(C("Excel workbook exported.","Excel 表格已导出。",e))}async function Po(e=i.mode){let t=E(),a=e==="flashback",n=pe()&&i.dataSource==="offline",o=n?fa():null,c=n?a?o.flashback:o.mane:null,l=n?r("mySubOffline",{},t):C("Guest submissions are linked to this browser session — check back here for review status and moderator notes.","使用昵称投稿后，请在原浏览器查看审核进度与管理员回复。",t);ye(`<div class="moderation-tabs modal-top-tabs" role="group" aria-label="${s(r("modeSwitcherAria",{},t))}">
    <button class="outline-btn ${a?"":"selected"}" type="button" data-progress-board="mane">${s(r("modeMane",{},t))}</button>
    <button class="outline-btn ${a?"selected":""}" type="button" data-progress-board="flashback">${s(r("modeFlashback",{},t))}</button>
  </div><section id="progressPanel"></section><p class="field-hint">${s(l)}</p>`,!0);let u=O("#progressPanel");if(!u)return;let m=n?null:H;if(!n&&!m){u.innerHTML=`<div class="section-header"><div><h2>${s(r("mySubTitle",{},t))}</h2><p class="section-subtitle">${s(r("statusSyncing",{},t))}</p></div></div><p class="empty-note">${s(r("emptyTitleLoading",{},t))}</p>`;try{m=await Nt(),await zt()}catch(p){if(!u.isConnected)return;u.innerHTML=`<div class="section-header"><div><h2>${s(r("mySubTitle",{},t))}</h2></div></div><div class="empty-state"><h3>${s(C("Unable to reach live server","暂时无法连接实时服务器",t))}</h3><p>${s(p?.message||r("offlineSyncFail",{},t))}</p><div class="form-actions"><button type="button" class="outline-btn" data-progress-board="${s(e)}">${s(C("Retry ↻","重试 ↻",t))}</button></div></div>`;return}if(!u.isConnected)return}Yn(u,{client:m,ownerId:n?null:i.user?.id,table:a?"submissions":"mane_entries",columns:a?"stage_id,group_code,carry_name,rounds,team,resonance_ten":"map_id,division,carry,score,team",offlineRows:c,onClearOffline:n?()=>(zr(a?"flashback":"mane"),Ye(),K(),X(r("offlineClearedToast",{},t)),[]):null,lang:t,describe(p){let f=p.display_name?`${p.display_name} · `:"";if(!a){let g=i.maneMaps.find(h=>h.id===p.map_id);return{title:g?fe(g.name,t):C("Hidden Boss","已隐藏地图",t),summary:`${f}${ae(p.division,t)} · ${r("mainDpsLabel",{},t)}: ${ve(p.carry,t)} · ${de(p.score,t)}`}}let d=i.fbStages.find(g=>g.id===p.stage_id);return{title:d?Le(d,t):C("Hidden Stage","已隐藏关卡",t),summary:`${f}${ae(p.group_code,t)}${p.resonance_ten?` · ${r("res10Badge",{},t)}`:""} · ${r("mainDpsLabel",{},t)}: ${ve(p.carry_name,t)} · ${r("roundsFull",{n:p.rounds},t)}`}}})}function fi(){let e=E();ye(`
    <div class="modal-eyebrow">ADMIN AUTHENTICATION</div>
    <h2>${s(r("loginTitle",{},e))}</h2>
    <p class="modal-subtitle">${s(r("loginSub",{},e))}</p>
    <form id="adminLoginForm">
      <div class="field">
        <label for="adminEmail">${s(r("loginEmail",{},e))} *</label>
        <input id="adminEmail" name="email" type="email" required autocomplete="email" />
      </div>
      <span class="field-hint">${s(C("A one-time magic sign-in link will be sent to your authorized moderator email.","收到邮件后，请在同一浏览器内打开一次性登录链接并返回本页。",e))}</span>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="close-modal">${s(r("btnCancel",{},e))}</button>
        <button type="submit" class="copper-btn">${s(r("loginBtn",{},e))}</button>
      </div>
    </form>`)}function Ji(e=!1){let t=E();ye(`
    <div class="modal-eyebrow">ACCOUNT &amp; PROFILE</div>
    <h2>${s(r("profileTitle",{},t))}</h2>
    <form id="profileForm" data-for-fb="${e}">
      <div class="field">
        <label for="profileNick">${s(r("profileDisplayName",{},t))}</label>
        <input id="profileNick" name="name" required minlength="2" maxlength="24" value="${s(i.profile?.display_name||"")}" />
      </div>
      <div class="form-actions">
        ${i.user?.is_anonymous?`<button type="button" class="outline-btn" data-action="open-login">${s(r("btnAdminLogin",{},t))}</button>`:`<button type="button" class="outline-btn" data-action="logout">${s(r("logoutBtn",{},t))}</button>`}
        ${i.isAdmin?`<button type="button" class="outline-btn" data-action="open-admin">${s(r("btnAdmin",{},t))}</button>`:""}
        <button type="submit" class="copper-btn">${s(r("profileSave",{},t))}</button>
      </div>
    </form>`)}function Xi(e,t=E()){let{psychubes:a,resonanceCodes:n}=Ke(e);if(!a.some(Boolean)&&!n.some(Boolean))return"";let o=(e.team||[]).map((c,l)=>{let u=a[l]||"",m=n[l]||"";if(!u&&!m)return"";let p=V(c,t),f=u?Se(u,t):"";return`${s(p)}: ${f?`${s(r("buildTagPsy",{},t))} [${s(f)}]`:""}${f&&m?" · ":""}${m?`${s(r("buildTagRes",{},t))} ${s(m)}`:""}`}).filter(Boolean);return o.length?`<br/>${s(C("Builds","配装",t))}: ${o.join(" | ")}`:""}var Io={mane:{tab:"",name:"",location:"",division:"",page:0},flashback:{tab:"",name:"",location:"",division:"",page:0}},Qi=new WeakMap;async function er(e,t,a,n,o,c,l){let u=E();if(!e?.isConnected)return;let m=Io[t];m.tab!==a&&(m.tab=a,m.page=0),o.some(([,d])=>d.some(([b])=>b===m.location))||(m.location=""),e.insertAdjacentHTML("beforebegin",Zn(m,n,o,u));let p=0;async function f(d=!1){let b=++p;d||(e.textContent=r("emptyTitleLoading",{},u));try{let g=await c(m);if(!e.isConnected||b!==p)return;if(!g.length&&m.page>0)return m.page--,f(d);e.innerHTML=l(g.slice(0,Et))+Xn(m.page,g.length>Et,u)}catch(g){e.isConnected&&b===p&&(e.textContent=`${C("Load failed","读取失败",u)}: ${g.message}`)}}Qi.set(e,{tab:a,load:f}),Jn(e.previousElementSibling,e,m,f),await f()}async function st(e,t,a,n,{changedRankings:o=!1,card:c=null}={}){if(o&&it.add(t),X(n),!e?.isConnected){ss();return}let l=Qi.get(e.querySelector("#adminList"));l?.tab===a?(c?.remove(),await l.load(!0)):t==="mane"?await na(a):await Lt(a)}async function Bo(e){let t=E(),a=e.closest(".review-card"),n=a?.querySelector(".review-proof");if(!n)return;let o=n.querySelector(".review-proof-status"),c=e.dataset.proofSize==="original",l=c?"original":"preview";if(n.dataset.proofSize===l)return;let u=e.dataset.maneProof?"mane":"flashback",m=e.dataset.maneProof||e.dataset.fbProof,p=a.querySelectorAll("[data-mane-proof], [data-fb-proof]");if(![...p].some(f=>f.disabled)){p.forEach(f=>{f.disabled=!0}),o.textContent=c?C("Loading original image…","正在读取原图…",t):C("Generating preview…","正在生成截图预览…",t);try{let f;if(c){let b=u==="mane"?"mane_entries":"submissions",g=u==="mane"?"mane-proofs":"proofs",y=await Z(H.from(b).select("evidence_path").eq("id",m).single());f=await Z(H.storage.from(g).download(y.evidence_path))}else f=await Z(H.functions.invoke("moderation-proof-preview",{body:{board:u,id:m},region:"ap-northeast-1",timeout:15e3})),f instanceof Blob&&(f=new Blob([f],{type:"image/jpeg"}));let d=await Mi(f);if(!n.isConnected)return;d.alt=c?C("Original proof screenshot","审核截图原图",t):C("Proof preview","审核截图预览",t),d.className="proof-img",n.querySelector(".review-proof-image").replaceChildren(d),n.dataset.proofSize=l,o.textContent=c?C("Showing original image.","正在显示原图。",t):C("Showing compressed preview.","正在显示压缩预览。",t)}catch{n.isConnected&&(o.textContent=c?C("Failed to load original screenshot.","原图读取失败，截图可能已过期。",t):C("Preview unavailable; try View Original.","预览暂不可用，可选择「查看原图」。",t))}finally{p.forEach(f=>{f.disabled=!1})}}}function tr(e,t,a,n=E()){if(!a)return"";let o=e==="mane"?"data-mane-proof":"data-fb-proof";return`
    <div class="review-proof">
      <span class="review-proof-status" role="status"></span>
      <div class="review-proof-image"></div>
    </div>
    <div class="review-actions">
      <button type="button" class="outline-btn" ${o}="${s(t)}">${s(C("Preview Proof","查看截图预览",n))}</button>
      <button type="button" class="text-link-btn" ${o}="${s(t)}" data-proof-size="original">${s(C("View Original","查看原图",n))}</button>
    </div>`}function Fo(e){let t=E();if(!i.isAdmin)return X(C("Admin access required.","仅管理员可导出成绩。",t));let a=new Map;for(let n of i.maneMaps){let o=`${n.edition} · ${be(n.section,t)}`;a.has(o)||a.set(o,[]),a.get(o).push(n)}ye(`
    <div class="modal-eyebrow">MANE’S BULLETIN · EXPORT</div>
    <h2>${s(r("adminExportExcel",{},t))}</h2>
    <form id="maneExportForm">
      <fieldset style="border:1px solid var(--line-hair);margin:0 0 12px;min-width:0">
        <legend>${s(C("Sheets","导出内容",t))}</legend>
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          <label><input type="checkbox" name="sheet" value="daily" checked> ${s(r("navDaily",{},t))}</label>
          <label><input type="checkbox" name="sheet" value="totals" checked> ${s(r("navTotals",{},t))}</label>
        </div>
      </fieldset>
      <div class="form-grid">
        <div class="field"><label for="maneExportDivision">${s(r("fieldDivision",{},t))}</label>
          <select id="maneExportDivision" name="division">${Ae([["",r("dailyAllDivisions",{},t)],...Object.entries(vt(t))],"")}</select>
        </div>
      </div>
      <fieldset style="border:1px solid var(--line-hair);margin:0 0 12px;min-width:0">
        <legend>${s(r("fieldBoss",{},t))}</legend>
        <div class="form-actions" style="justify-content:flex-start;margin:6px 0">
          <button type="button" class="outline-btn" data-mane-export-maps="all">${s(r("afflatusAll",{},t))}</button>
          <button type="button" class="outline-btn" data-mane-export-maps="none">${s(r("resetFilter",{},t))}</button>
        </div>
        <div style="max-height:190px;overflow:auto">
          ${[...a].map(([n,o])=>`<div>
            <strong class="field-hint">${s(n)}</strong>
            ${o.map(c=>`<label style="display:flex;align-items:center;gap:8px">
              <input type="checkbox" name="map" value="${s(c.id)}" checked> ${s(fe(c.name,t))}
            </label>`).join("")}
          </div>`).join("")}
        </div>
      </fieldset>
      <div class="form-actions">
        <button type="button" class="outline-btn" data-mane-admin="${s(e)}">${s(r("btnCancel",{},t))}</button>
        <button type="submit" class="copper-btn">${s(r("btnExportExcel",{},t))}</button>
      </div>
    </form>`,!0)}async function No(e){let t=E();if(!i.isAdmin)throw new Error(C("Admin access required.","仅管理员可导出成绩。",t));let a=new FormData(e),n=new Set(a.getAll("sheet")),o=new Set(a.getAll("map")),c=i.maneMaps.filter(f=>o.has(f.id));if(!n.size)throw new Error(C("Select at least one sheet.","请至少选择一种导出内容。",t));if(!c.length)throw new Error(C("Select at least one boss.","请至少选择一个关卡。",t));let l=a.get("division");if(l&&!Bt.includes(l))throw new Error(C("Invalid division.","筛选条件无效。",t));let u=Mt(),[m,p]=await Promise.all([n.has("daily")?Ui({date:u,division:l,mapIds:c.map(f=>f.id)}):null,n.has("totals")?Yr("mane_carry_total_leaderboard",["section","edition","division","carry_key"]):null]);!e.isConnected||!i.isAdmin||await Gs({date:u,divisions:l?[l]:Bt,maps:c,dailyRows:m,totals:p,divisionLabels:vt(t),sectionLabels:Xs(t),lang:t,canDownload:()=>e.isConnected&&i.isAdmin})}async function na(e="pending"){let t=E();if(!i.isAdmin||!H)return X(C("Admin access required.","仅管理员可访问审核后台。",t));ye(`
    <div class="modal-eyebrow">MODERATION · ${s(r("modeMane",{},t))}</div>
    <h2>${s(r("adminTitle",{},t))}</h2>
    <div class="moderation-tabs">
      ${Pr.map(n=>`<button type="button" class="outline-btn ${n===e?"selected":""}" data-mane-admin="${n}">${s(ms(n,t))}</button>`).join("")}
      <button type="button" class="outline-btn" data-mane-export="${s(e)}">${s(r("adminExportExcel",{},t))}</button>
      <button type="button" class="outline-btn" data-action="mane-maps-admin">${s(r("adminMapsManage",{},t))}</button>
      <button type="button" class="ghost-btn" data-action="fb-admin-open">${s(r("modeFlashback",{},t))} ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">${s(r("emptyTitleLoading",{},t))}</p></div>`,!0);let a=O("#adminList");try{let n=await Z(H.from("mane_maps").select("id,name,section,edition,active").order("edition",{ascending:!1}).order("position")),o=new Map;for(let u of n){let m=`${u.edition} · ${be(u.section,t)}`;o.has(m)||o.set(m,[]);let p=fe(u.name,t);o.get(m).push([u.id,u.active?p:`${p} (${C("Hidden","隐藏",t)})`])}let c=u=>Z(Rs(H.from("mane_entries").select("*,submission_contacts(contact)").eq("status",e).is("archived_at",null),u,"map_id","division")),l=N(t)?", ":"、";await er(a,"mane",e,r("fieldBoss",{},t),[...o],c,u=>u.length?u.map(m=>{let p=n.find(f=>f.id===m.map_id);return`
            <article class="review-card" data-entry="${s(m.id)}" data-revision="${s(m.updated_at)}" data-status="${s(e)}">
              <div class="review-top">
                <strong>${s(m.display_name)}</strong>
                <span class="score-value" style="font-size:16px">${de(m.score,t)}</span>
              </div>
              <div class="review-meta">
                ${s(p?fe(p.name,t):C("Hidden Boss","已隐藏地图",t))} · ${s(ae(m.division,t))} · ${s(ct(m.created_at,t))}<br/>
                ${s(r("mainDpsLabel",{},t))}: ${s(ve(m.carry,t))} | ${s(r("colLineup",{},t))}: ${s((m.team||[]).map(f=>V(f,t)).join(l))}
                ${Xi(m,t)}
                ${m.review_note?`<br/>${s(C("Note","备注",t))}: ${s(m.review_note)}`:""}
              </div>
              ${Ts(m.submission_contacts,t)}${ha(m.related_url,r("relatedLink",{},t))}
              ${tr("mane",m.id,m.evidence_path,t)}
              <div class="review-actions">
                <button type="button" class="outline-btn" data-mane-edit="${s(m.id)}">${s(r("adminEdit",{},t))}</button>
                ${e==="pending"?`<button type="button" class="approve-btn" data-mane-decision="approved">✓ ${s(r("adminApprove",{},t))}</button><button type="button" class="danger-btn" data-mane-decision="rejected">× ${s(r("adminReject",{},t))}</button>`:""}
                ${e==="approved"?`<button type="button" class="danger-btn" data-mane-decision="removed">${s(r("adminDelete",{},t))}</button>`:""}
                ${e==="rejected"?`<button type="button" class="approve-btn" data-action="mane-reopen">${s(C("Reopen","退回待审核",t))}</button><button type="button" class="danger-btn" data-action="mane-delete-rejected">${s(r("adminDelete",{},t))}</button>`:""}
              </div>
            </article>`}).join(""):`<div class="empty-state"><h3>${s(r("emptyTitleEmpty",{},t))}</h3></div>`)}catch(n){a?.isConnected&&(a.innerHTML=`<p class="modal-subtitle">${s(n.message)}</p>`)}}async function Ys(){let e=E();if(!i.isAdmin||!H)return;let t=await Z(H.from("mane_maps").select("*").order("edition",{ascending:!1}).order("position"));ye(`
    <div class="modal-eyebrow">MANE MAPS</div>
    <h2>${s(r("adminMapsManage",{},e))}</h2>
    <div class="moderation-tabs"><button type="button" class="outline-btn" data-mane-admin="pending">← ${s(r("btnCancel",{},e))}</button></div>
    <form id="maneMapForm" style="margin-bottom:18px">
      <div class="form-grid">
        <div class="field"><label for="mmName">${s(r("fieldBoss",{},e))} *</label><input id="mmName" name="name" required maxlength="60" /></div>
        <div class="field"><label for="mmEd">${s(r("fieldVersion",{},e))} *</label><input id="mmEd" name="edition" required maxlength="30" value="${s(t[0]?.edition||"4.1")}" /></div>
        <div class="field"><label for="mmSec">${s(r("sectionLabel",{},e))}</label><select id="mmSec" name="section">${Ae(Object.entries(Xs(e)),"new")}</select></div>
        <div class="field"><label for="mmPos">${s(C("Order","排序值",e))}</label><input id="mmPos" name="position" type="number" min="1" value="100" required /></div>
      </div>
      <div class="form-actions"><button type="submit" class="copper-btn">${s(C("Add Boss","新增首领地图",e))}</button></div>
    </form>
    ${t.map(a=>`
      <article class="review-card" style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div>
          <strong>${s(fe(a.name,e))}</strong>
          <div class="review-meta" style="margin:2px 0 0">${s(a.edition)} · ${s(be(a.section,e))} · ${s(a.active?C("Visible","显示中",e):C("Hidden","已隐藏",e))}</div>
        </div>
        <button type="button" class="outline-btn" data-toggle-mane-map="${s(a.id)}" data-active="${a.active}">${s(a.active?C("Hide","隐藏地图",e):C("Restore","恢复显示",e))}</button>
      </article>`).join("")}`,!0)}async function Lt(e="pending",t=""){let a=E();if(!i.isAdmin||!H)return X(C("Admin access required.","仅管理员可访问审核后台。",a));ri.includes(e)||(e="pending"),ye(`
    <div class="modal-eyebrow">MODERATION · ${s(r("modeFlashback",{},a))}</div>
    <h2>${s(r("adminTitle",{},a))}</h2>
    <div class="moderation-tabs">
      ${ri.filter(o=>o!=="historical"||i.fbArchives.length).map(o=>`<button type="button" class="outline-btn ${o===e?"selected":""}" data-fb-admin="${o}">${s(ms(o,a))}</button>`).join("")}
      <button type="button" class="outline-btn" data-action="fb-versions-admin">${s(r("adminVersionsManage",{},a))}</button>
      <button type="button" class="ghost-btn" data-mane-admin="pending">${s(r("modeMane",{},a))} ⇄</button>
    </div>
    <div id="adminList"><p class="modal-subtitle">${s(r("emptyTitleLoading",{},a))}</p></div>`,!0);let n=O("#adminList");if(e==="historical"){n.innerHTML=i.fbVersions.flatMap(o=>Me(o.id).map(c=>{let l=i.fbArchives.filter(u=>u.stage_id===c.id).sort((u,m)=>u.display_order-m.display_order);return l.length?`<details class="review-card" ${t===c.id?"open":""}>
        <summary>${s(xe(o,a))} · ${s(Le(c,a))} · ${l.length}</summary>
        ${l.map(u=>`<div class="review-card" style="margin-top:8px">
          <strong>${s(u.credited_player)}</strong>
          <div class="review-meta">${s(r("mainDpsLabel",{},a))}: ${(u.carry_names||[]).map(m=>s(V(m,a))).join(" / ")} · ${s(u.lineup_label)}</div>
          <button type="button" class="danger-btn" data-fb-archive="fb-archive-history" data-id="${s(u.id)}" data-stage="${s(c.id)}">${s(r("adminDelete",{},a))}</button>
        </div>`).join("")}
      </details>`:""})).join("")||`<p class="modal-subtitle">${s(r("emptyTitleEmpty",{},a))}</p>`;return}try{let o=i.fbVersions.map(u=>[xe(u,a),Me(u.id).map(m=>[m.id,Le(m,a)])]),c=async u=>{let m=await Z(Rs(H.from("flashback_moderation_list").select("*").eq("status",e),u,"stage_id","group_code"));if(!m.length)return m;let p=await Z(H.from("submissions").select("id,team_psychubes,team_resonance_codes").in("id",m.slice(0,Et).map(d=>d.id))),f=new Map(p.map(d=>[d.id,d]));return m.map(d=>({...d,...f.get(d.id)}))},l=(N(a)," / ");await er(n,"flashback",e,r("fieldStage",{},a),o,c,u=>u.length?u.map(m=>{let p=i.fbStages.find(d=>d.id===m.stage_id),f=i.fbVersions.find(d=>d.id===p?.version_id);return`
            <article class="review-card">
              <div class="review-top">
                <strong>${s(m.display_name)} <span class="division-chip">${s(r("roundsFull",{n:m.rounds},a))}</span></strong>
                <span style="font-size:12px;color:var(--ink-muted)">${s(ct(m.created_at,a))}</span>
              </div>
              <div class="review-meta">
                ${s(f?xe(f,a):"")} · ${s(p?Le(p,a):"")} · ${s(ae(m.group_code,a))}<br/>
                ${s(r("mainDpsLabel",{},a))}: ${s(ve(m.carry_name,a))} | ${s(r("colLineup",{},a))}: ${(m.team||[]).map(d=>s(V(d,a))).join(l)}
                ${Xi(m,a)}
                ${m.review_note?`<br/>${s(C("Note","备注",a))}: ${s(m.review_note)}`:""}
              </div>
              ${m.resonance_ten?vi(a):""}${Ts(m.contact,a)}${ha(m.related_url,r("relatedLink",{},a))}
              ${tr("flashback",m.id,m.evidence_path,a)}
              <div class="review-actions">
                ${e==="pending"?`<button type="button" class="approve-btn" data-fb-review="approved" data-id="${s(m.id)}">✓ ${s(r("adminApprove",{},a))}</button><button type="button" class="danger-btn" data-fb-review="rejected" data-id="${s(m.id)}">× ${s(r("adminReject",{},a))}</button>`:""}
                ${e==="approved"?`<button type="button" class="danger-btn" data-fb-remove="${s(m.id)}">${s(r("adminDelete",{},a))}</button>`:""}
                ${e==="rejected"?`<button type="button" class="approve-btn" data-fb-reopen="${s(m.id)}">${s(C("Reopen","退回待审核",a))}</button>`:""}
                <button type="button" class="outline-btn" data-fb-edit="${s(m.id)}" data-tab="${s(e)}">${s(r("adminEdit",{},a))}</button>
                <button type="button" class="danger-btn" data-fb-archive="fb-archive-record" data-id="${s(m.id)}" data-tab="${s(e)}">${s(C("Archive","删除成绩",a))}</button>
              </div>
            </article>`}).join(""):`<div class="empty-state"><h3>${s(r("emptyTitleEmpty",{},a))}</h3></div>`)}catch(o){n?.isConnected&&(n.innerHTML=`<p class="modal-subtitle">${s(o.message)}</p>`)}}function Zs(){let e=E();i.isAdmin&&ye(`
    <div class="modal-eyebrow">FLASHBACK CYCLES</div>
    <h2>${s(r("adminVersionsManage",{},e))}</h2>
    <div class="moderation-tabs">
      <button type="button" class="outline-btn" data-fb-admin="pending">← ${s(r("btnCancel",{},e))}</button>
      <button type="button" class="copper-btn" data-fb-edit-version="">+ ${s(C("New Cycle","新建版本",e))}</button>
    </div>
    ${i.fbVersions.map(t=>`
      <article class="review-card">
        <strong>${s(xe(t,e))}</strong>
        <ul class="review-meta" style="margin:6px 0">
          ${Me(t.id).map(a=>`<li>${s(Le(a,e))}${ao(a)>1?` · ${s(C("Linked recurring stage","关联重复关卡",e))}`:""}</li>`).join("")}
        </ul>
        <div class="review-actions">
          <button type="button" class="outline-btn" data-fb-edit-version="${s(t.id)}">${s(r("adminEdit",{},e))}</button>
          <button type="button" class="danger-btn" data-fb-archive="fb-archive-version" data-id="${s(t.id)}">${s(r("adminDelete",{},e))}</button>
        </div>
      </article>`).join("")||`<p class="modal-subtitle">${s(r("emptyTitleEmpty",{},e))}</p>`}`,!0)}function zo(e=""){let t=E(),a=i.fbVersions.find(c=>c.id===e),n=Me(e),o=c=>{let l=new Map;for(let u of i.fbVersions)for(let m of Me(u.id))m.id===c?.id||l.has(m.challenge_id)||l.set(m.challenge_id,`${u.code} · ${Le(m,t)}`);return c&&!l.has(c.challenge_id)&&l.set(c.challenge_id,C("Keep current link","保留此关当前归属",t)),`<option value="">${s(c?C("Unlink as standalone stage","取消关联，作为新独立关卡",t):C("Standalone stage","作为独立关卡",t))}</option>`+[...l.entries()].map(([u,m])=>`<option value="${s(u)}"${u===c?.challenge_id?" selected":""}>${s(m)}</option>`).join("")};ye(`
    <h2>${s(a?C("Edit Cycle","编辑版本",t):C("New Cycle","新建版本",t))}</h2>
    <form id="fbVersionForm" data-id="${s(e)}">
      <div class="form-grid">
        <div class="field"><label for="fvCode">${s(C("Version Code *","版本代号 *",t))}</label><input id="fvCode" name="code" required maxlength="30" value="${s(a?.code||"")}" /></div>
        <div class="field"><label for="fvLabel">${s(C("Display Label *","展示名称 *",t))}</label><input id="fvLabel" name="label" required maxlength="80" value="${s(a?.label||"")}" /></div>
      </div>
      ${[1,2,3].map(c=>{let l=n.find(u=>u.stage_no===c);return`<div class="form-grid">
          <div class="field"><label for="fvSt${c}">${s(C(`Stage ${c} Name *`,`第 ${c} 关名称 *`,t))}</label><input id="fvSt${c}" name="stage${c}" required maxlength="80" value="${s(l?.name||"")}" /></div>
          <div class="field"><label for="fvRep${c}">${s(C(`Stage ${c} · Recurring Link`,`第 ${c} 关 · 关联重复关卡`,t))}</label><select id="fvRep${c}" name="repeat${c}">${o(l)}</select></div>
        </div>`}).join("")}
      <div class="form-actions">
        <button type="button" class="outline-btn" data-action="fb-versions-admin">${s(r("btnCancel",{},t))}</button>
        <button type="submit" class="copper-btn">${s(r("btnSaveChanges",{},t))}</button>
      </div>
    </form>`,!0)}function K(){ot(),He.clear(),is(),lo(),O("#workspace").innerHTML=i.mode==="mane"?go():So(),so();let e=O("#maneDailyResults");e&&bo(e);let t=document.querySelector(".dossier-list"),a=t?.querySelector(".dossier-item.active");if(t&&a&&t.scrollWidth>t.clientWidth+4){let n=a.offsetLeft-(t.clientWidth-a.offsetWidth)/2;t.scrollLeft=Math.max(0,n)}if(qe){let n=document.querySelector(`[data-record-row="${CSS.escape(qe)}"]`);n&&(qe="",requestAnimationFrame(()=>{n.scrollIntoView({behavior:"smooth",block:"center"})}))}}document.addEventListener("click",async e=>{i.glossaryOpen&&!e.target.closest("#glossaryPopoverRoot")&&!e.target.closest("[data-glossary-term]")&&ot();let t=e.target.closest(".proof-img, .proof-upload-preview img");if(t?.src){Wr(t.src,t.alt||C("Screenshot zoom preview","截图放大预览"));return}let a=e.target.closest("[data-glossary-term]");if(a){co(a.dataset.glossaryTerm,a);return}if(e.target.closest('[data-action="close-glossary"]')){ot();return}let n=e.target.closest("[data-open-psy]");if(n){Gi(n.dataset.openPsy);return}let o=e.target.closest("[data-open-char]");if(o){Oi(o.dataset.openChar);return}let c=e.target.closest("[data-open-player]");if(c){Ki(c.dataset.openPlayer);return}let l=e.target.closest("button, a[data-switch-mode]");if(!l)return;let u=l.closest(".modal-box");try{if(l.dataset.setLang){let p=bn(l.dataset.setLang);no(p);try{await Ks(p)}catch(f){console.warn("Language pack load failed:",f)}K(),Y.open&&rn(),ee.open&&on();return}if(l.dataset.modeSwitch){i.mode=l.dataset.modeSwitch,i.maneSelectedAppraisal=-1,i.highlightRecordId="",i.mobileFilterOpen=!1,K(),sa();return}if(l.dataset.switchMode){e.preventDefault(),i.mode=l.dataset.switchMode,i.manePage="scores",i.maneSelectedAppraisal=-1,i.highlightRecordId="",i.mobileFilterOpen=!1,K(),sa();return}if(l.dataset.subpage){i.mode==="mane"?i.manePage=l.dataset.subpage:i.fbPage=l.dataset.subpage,i.highlightRecordId="",i.mobileFilterOpen=!1,K(),sa();return}if(l.dataset.metaCarry){let p=l.dataset.metaCarry;(l.dataset.metaMode||i.mode)==="mane"?(i.maneRoleMode="carry",i.maneCarry=i.maneCarry===p?"":p):(i.fbRoleMode="carry",i.fbCarry=i.fbCarry===p?"":p),K();return}if(l.dataset.metaMember){let p=l.dataset.metaMember;(l.dataset.metaMode||i.mode)==="mane"?(i.maneRoleMode="member",i.maneCarry=i.maneCarry===p?"":p):(i.fbRoleMode="member",i.fbCarry=i.fbCarry===p?"":p),K();return}if(l.dataset.psyAmpLevel!==void 0){let p=Math.min(5,Math.max(1,Number(l.dataset.psyAmpLevel)||5));i.psyAmpLevel=p;let f=O("#psyPassiveHost");if(f){let d=E(),b=Ms(f.dataset.psyId||i.activePsyDossierId,d);b?.passive&&(f.innerHTML=Hi(b.passive,p,d))}return}if(l.dataset.selectAppraisal!==void 0){let p=Number(l.dataset.selectAppraisal);i.maneSelectedAppraisal=i.maneSelectedAppraisal===p?-1:p,K();return}if(l.dataset.filterDossierChar){let p=l.dataset.filterDossierChar;i.mode==="mane"?(i.manePage="scores",i.maneRoleMode="member",i.maneCarry=p,i.maneAfflatus="",i.maneQuery=""):(i.fbPage="leaderboard",i.fbRoleMode="member",i.fbCarry=p,i.fbAfflatus="",i.fbQuery=""),Ee(),K();return}if(l.dataset.posterTheme){let p=l.dataset.posterTheme==="obsidian"?"obsidian":"parchment";i.posterTheme=p;let f=O("#activePosterCard");f&&f.classList.toggle("is-obsidian",p==="obsidian"),document.querySelectorAll("[data-poster-theme]").forEach(d=>{let b=d.dataset.posterTheme===p;d.classList.toggle("active",b),d.setAttribute("aria-pressed",String(b))});return}if(l.dataset.jumpManeRecord){u&&Ee(),i.mode="mane",i.manePage="scores",i.maneSection=l.dataset.jumpSection||"new",i.maneMapId=l.dataset.jumpMap||"",i.maneDivision=l.dataset.jumpDiv||"max",i.maneRoleMode="carry",i.maneCarry="",i.maneAfflatus="",i.maneQuery="",i.maneSelectedAppraisal=-1;let p=`mane-${l.dataset.jumpManeRecord}`;i.highlightRecordId=p,qe=p,K();return}if(l.dataset.jumpFbRecord){u&&Ee(),i.mode="flashback",i.fbPage="leaderboard",i.fbVersionId=l.dataset.jumpVer||"",i.fbStageId=l.dataset.jumpStage||"",i.fbGroup=l.dataset.jumpGrp||"zero",i.fbResonanceOnly=!1,i.fbRoleMode="carry",i.fbCarry="",i.fbAfflatus="",i.fbQuery="";let p=`fb-${l.dataset.jumpFbRecord}`;i.highlightRecordId=p,qe=p,K();return}if(l.dataset.maneDailyDate){i.maneDaily.date=l.dataset.maneDailyDate,K();return}if(l.dataset.jumpManeCarry){let p=l.dataset.jumpManeCarry,f=l.dataset.jumpMap||"",d=Be(i.maneSection),b=y=>i.maneScores.some(h=>h.map_id===y&&h.division===i.maneDivision&&ue(h.carry).some(v=>q(v)===p)),g=f&&d.some(y=>y.id===f)&&b(f)?f:"";g||(g=d.find(h=>b(h.id))?.id||(d.some(h=>h.id===f)?f:i.maneMapId)),i.mode="mane",i.manePage="scores",g&&(i.maneMapId=g),i.maneRoleMode="carry",i.maneCarry=p,i.maneAfflatus="",i.maneQuery="",i.highlightRecordId="",K();return}if(l.dataset.jumpManePlayer){let p=l.dataset.jumpManePlayer;i.mode="mane",i.manePage="scores",i.maneSection=l.dataset.jumpSection||"new",l.dataset.jumpMap&&(i.maneMapId=l.dataset.jumpMap),i.maneDivision=l.dataset.jumpDiv||"zero",i.maneRoleMode="carry",i.maneCarry="",i.maneAfflatus="",i.maneQuery=p,i.highlightRecordId="",K();return}if(l.dataset.jumpFbCarry){let p=l.dataset.jumpFbCarry,f=i.fbRecords.filter(b=>ue(b.carry_name).some(g=>q(g)===p)),d=i.fbCarryScope==="period"&&f.find(b=>b.version_id===i.fbVersionId&&b.stage_id===i.fbStageId&&b.group_code===i.fbGroup)||i.fbCarryScope==="period"&&f.find(b=>b.version_id===i.fbVersionId&&b.stage_id===i.fbStageId)||i.fbCarryScope==="period"&&f.find(b=>b.version_id===i.fbVersionId)||f.find(b=>b.stage_id===i.fbStageId&&b.group_code===i.fbGroup)||f[0];i.mode="flashback",i.fbPage="leaderboard",d&&(i.fbVersionId=d.version_id||i.fbStages.find(b=>b.id===d.stage_id)?.version_id||i.fbVersionId,i.fbStageId=d.stage_id,i.fbGroup=d.group_code),i.fbResonanceOnly=!1,i.fbRoleMode="carry",i.fbCarry=p,i.fbAfflatus="",i.fbQuery="",i.highlightRecordId="",K();return}if(l.dataset.jumpFbPlayer){let p=l.dataset.jumpFbPlayer,f=le(p),d=i.fbRecords.filter(g=>le(g.display_name)===f),b=d.find(g=>g.version_id===i.fbVersionId&&g.stage_id===i.fbStageId&&g.group_code===i.fbGroup)||d.find(g=>g.version_id===i.fbVersionId)||d[0];i.mode="flashback",i.fbPage="leaderboard",b&&(i.fbVersionId=b.version_id||i.fbStages.find(g=>g.id===b.stage_id)?.version_id||i.fbVersionId,i.fbStageId=b.stage_id,i.fbGroup=b.group_code),i.fbResonanceOnly=!1,i.fbRoleMode="carry",i.fbCarry="",i.fbAfflatus="",i.fbQuery=p,i.highlightRecordId="",K();return}if(l.dataset.maneSection){i.maneSection=l.dataset.maneSection,i.maneCarry="",i.maneAfflatus="",i.maneQuery="",i.maneSelectedAppraisal=-1,i.highlightRecordId="",K();return}if(l.dataset.maneMap){i.maneMapId=l.dataset.maneMap,i.maneCarry="",i.maneSelectedAppraisal=-1,i.highlightRecordId="",i.manePage!=="scores"&&(i.manePage="scores"),K();return}if(l.dataset.maneDiv){i.maneDivision=l.dataset.maneDiv,i.maneCarry="",i.maneSelectedAppraisal=-1,i.highlightRecordId="",K();return}if(l.dataset.maneRole){i.maneRoleMode=l.dataset.maneRole,K();return}if(l.dataset.maneAff){i.maneAfflatus=i.maneAfflatus===l.dataset.maneAff?"":l.dataset.maneAff,K();return}if(l.dataset.manePlayerScope){i.manePlayerScope=l.dataset.manePlayerScope,K();return}if(l.dataset.manePlayerDiv){i.manePlayerDiv=l.dataset.manePlayerDiv,K();return}if(l.dataset.fbStage){i.fbStageId=l.dataset.fbStage,i.fbCarry="",i.highlightRecordId="",i.fbPage!=="leaderboard"&&(i.fbPage="leaderboard"),K();return}if(l.dataset.fbGroup){i.fbGroup=l.dataset.fbGroup,i.fbGroup!=="zero"&&(i.fbResonanceOnly=!1),i.fbCarry="",i.highlightRecordId="",K();return}if(l.dataset.fbRole){i.fbRoleMode=l.dataset.fbRole,K();return}if(l.dataset.fbAff){i.fbAfflatus=i.fbAfflatus===l.dataset.fbAff?"":l.dataset.fbAff,K();return}if(l.dataset.fbCarryScope){i.fbCarryScope=l.dataset.fbCarryScope,K();return}if(l.dataset.fbCarryMetric){i.fbCarryMetric=l.dataset.fbCarryMetric,K();return}if(l.dataset.poster){Eo(l.dataset.poster);return}if(l.dataset.exportPoster){let p=He.get(l.dataset.exportPoster);if(p){l.disabled=!0;let f=l.textContent;l.textContent=r("posterGenerating");try{await Co(p),X(r("posterSavedToast"))}finally{l.isConnected&&(l.disabled=!1,l.textContent=f)}}return}if(l.dataset.copyLink){let p=He.get(l.dataset.copyLink);p&&(await Oa(pi(p)),X(r("posterCopiedLink")));return}if(l.dataset.copyPoster){let p=E(),f=He.get(l.dataset.copyPoster);if(f){let d=(f.displayTeam||(f.team||[]).map(S=>V(S,p))).join(N(p)?", ":"、"),b=(f.psychubes||[]).some(Boolean)?N(p)?` | Psychubes: ${(f.psychubes||[]).map(S=>S?Se(S,p):"—").join(" / ")}`:`｜心相：${(f.psychubes||[]).map(S=>S?Se(S,p):"—").join("/")}`:"",g=(f.resonanceCodes||[]).some(Boolean)?N(p)?` | Resonance: ${(f.resonanceCodes||[]).map(S=>S||"—").join(" / ")}`:`｜共鸣码：${(f.resonanceCodes||[]).map(S=>S||"—").join(" / ")}`:"",y=pi(f),h=f.rank>0?`#${f.rank}`:r("posterDailyLabel",{},p),v;if(N(p)){let S=f.mode==="flashback"&&f.resonanceTen?" | All P0 R10":"";v=f.mode==="mane"?`[Reverse: 1999 · Mane's Bulletin] ${h} ${f.title} (${f.subtitle}) | Timekeeper: ${f.player} | Main DPS: ${f.carry} | Lineup: ${d}${b}${g} | Score: ${de(f.score,p)} | ${y}`:`[Reverse: 1999 · Focused Flashback] ${h} ${f.title} (${f.subtitle}${S}) | Timekeeper: ${f.player} | Main DPS: ${f.carry} | Lineup: ${d}${b}${g} | Clear: ${$e(f.rounds,p)} | ${y}`}else{let S=f.mode==="flashback"&&f.resonanceTen?"｜全0塑·共鸣10":"";v=f.mode==="mane"?`【重返未来：1999 鬃毛邮报】${h} ${f.title}（${f.subtitle}）｜调查员：${f.player}｜主C：${f.carry}｜阵容：${d}${b}${g}｜积分：${de(f.score,p)}｜${y}`:`【重返未来：1999 焦点闪回】${h} ${f.title}（${f.subtitle}${S}）｜玩家：${f.player}｜主C：${f.carry}｜阵容：${d}${b}${g}｜成绩：${f.rounds} 回合｜${y}`}await Oa(v),X(r("posterCopiedText"))}return}if(l.dataset.copyAllRes){let p=E(),f=He.get(l.dataset.copyAllRes);if(f){let d=f.displayTeam&&f.displayTeam.length&&!cn(f.team)?f.displayTeam:(f.team||[]).map(g=>V(g,p)),b=(f.resonanceCodes||[]).map((g,y)=>({code:String(g||"").trim(),name:d[y]||r("slotLabel",{n:y+1},p)})).filter(g=>g.code);b.length&&(await Oa(b.map(g=>`${g.name}: ${g.code}`).join(`
`)),X(r("posterCopiedAllRes",{n:b.length},p)))}return}if(l.dataset.copyResId){let p=He.get(l.dataset.copyResId),f=Number(l.dataset.copyResIdx),d=p?.resonanceCodes?.[f];d&&(await Oa(d),X(r("posterCopiedRes")));return}if(l.dataset.toggleCarry!==void 0){let p=Number(l.dataset.toggleCarry);Ot(P.chars[p])&&(P.carries[p]=!P.carries[p],We());return}if(l.dataset.pickChar!==void 0){Gr(Number(l.dataset.pickChar));return}if(l.dataset.clearChar!==void 0){let p=Number(l.dataset.clearChar);P.chars[p]="",P.carries[p]=!1,P.psychubes[p]="",P.resonanceCodes[p]="",We();return}if(l.dataset.charAff!==void 0){Y.aff=l.dataset.charAff,pa();return}if(l.dataset.charStar!==void 0){Y.star=l.dataset.charStar,pa();return}if(l.dataset.chooseChar!==void 0){Y.open&&Kr(l.dataset.chooseChar);return}if(l.dataset.pickPsy!==void 0){Ur(Number(l.dataset.pickPsy));return}if(l.dataset.clearPsy!==void 0){let p=Number(l.dataset.clearPsy);P.psychubes[p]="",We();return}if(l.dataset.psyStar!==void 0){ee.star=l.dataset.psyStar,ua();return}if(l.dataset.psyTag!==void 0){ee.tag=l.dataset.psyTag,ua();return}if(l.dataset.choosePsy!==void 0){P.psychubes[ee.slotIndex]=l.dataset.choosePsy,We(),ma();return}let m=l.dataset.action;if(m==="toggle-intel-bar"){i.intelCollapsed=!i.intelCollapsed,K();return}if(m==="sync-live"){await Ri();return}if(m==="export-offline-excel"){await Ro();return}if(m==="toggle-mobile-filter"){i.mobileFilterOpen=!i.mobileFilterOpen,K();return}if(m==="toggle-mane-mech"){i.maneMechOpen=!i.maneMechOpen,K();return}if(m==="toggle-fb-mech"){i.fbMechOpen=!i.fbMechOpen,K();return}if(m==="reset-mane-filter"){i.maneRoleMode="carry",i.maneCarry="",i.maneAfflatus="",i.maneQuery="",K();return}if(m==="reset-fb-filter"){i.fbResonanceOnly=!1,i.fbRoleMode="carry",i.fbCarry="",i.fbAfflatus="",i.fbQuery="",K();return}if(m==="fb-resonance"&&i.fbGroup==="zero"){i.fbResonanceOnly=!i.fbResonanceOnly,K();return}if(m==="apply-custom-char"){let p=O("#charCustomInput").value.split(/[/／]/).map(f=>f.trim());ci(p);return}if(m==="confirm-char-selection"){ci(Y.choices);return}if(m==="close-char-picker"){ba();return}if(m==="close-psy-picker"){ma();return}if(m==="close-modal"){Ee();return}if(l.dataset.clearDraft){let p=l.dataset.clearDraft;ca(p),p==="mane"?Ws():p==="flashback"&&Xa(),X(C("Draft cleared.","已清空未提交草稿。"));return}if(m==="my-submissions"||l.dataset.progressBoard){await Po(l.dataset.progressBoard||i.mode);return}if(m==="refresh"){pe()&&i.dataSource==="offline"?(await It(),Ye(),K(),X(r("toastRefreshed"))):(await gt({keepOfflineOnFail:pe(),force:!0}),i.connected&&X(r("toastRefreshed")));return}if(m==="refresh-mane-daily"){pe()&&i.dataSource==="offline"?(await It(),Ye()):await Promise.all([ht("maneCore",{force:!0,silentRender:!0}),ht("maneDaily",{force:!0,silentRender:!0})]),K(),X(r("toastRefreshed"));return}if(m==="switch-to-mane"||m==="switch-to-mane-submit"){Ee(),i.mode="mane",i.manePage="scores";let p=Be("rerun");i.maneSection=p.length?"rerun":"new";let f=Be(i.maneSection);f.some(d=>d.id===i.maneMapId)||(i.maneMapId=f[0]?.id||""),K(),await sa(),m==="switch-to-mane-submit"&&Ws();return}if(m==="open-submit"||l.id==="submitBtn"){i.mode==="mane"?Ws():Xa();return}if(l.id==="accountBtn"){i.user?Ji(!1):fi();return}if(m==="open-login"){fi();return}if(m==="logout"){H&&await Z(H.auth.signOut()),Ee(),await zt(null),X(C("Signed out.","已退出登录。"));return}if(l.id==="adminCenterBtn"||m==="open-admin"){i.mode==="mane"?await na("pending"):await Lt("pending");return}if(!i.isAdmin||!H)return;if(l.dataset.maneAdmin){await na(l.dataset.maneAdmin);return}if(l.dataset.maneExport){Fo(l.dataset.maneExport);return}if(l.dataset.maneExportMaps){for(let p of l.closest("form").querySelectorAll('input[name="map"]'))p.checked=l.dataset.maneExportMaps==="all";return}if(m==="mane-maps-admin"){await Ys();return}if(l.dataset.maneProof||l.dataset.fbProof){await Bo(l);return}if(l.dataset.maneEdit){let p=E(),f=await Z(H.from("mane_entries").select("*").eq("id",l.dataset.maneEdit).single()),d=await Z(H.from("mane_maps").select("*").order("position")),b=Ke(f);la(f.team,f.carry,b.psychubes,b.resonanceCodes),ye(`
        <h2>${s(r("editRecordTitle",{},p))}</h2>
        <form id="maneEditForm" data-id="${s(f.id)}" data-revision="${s(f.updated_at)}" data-status="${s(f.status)}">
          ${qi(f,d,p)}
          <div class="form-actions">
            <button type="button" class="outline-btn" data-mane-admin="${s(f.status)}">${s(r("btnCancel",{},p))}</button>
            <button type="submit" class="copper-btn">${s(r("btnSaveChanges",{},p))}</button>
          </div>
        </form>`,!0);return}if(l.dataset.maneDecision){let p=E(),f=l.closest(".review-card"),{entry:d,revision:b,status:g}=f.dataset,y=l.dataset.maneDecision;if(y==="rejected"){Ls(l,async h=>{if(!(await Z(H.from("mane_entries").update({status:"rejected",review_note:h}).eq("id",d).eq("updated_at",b).select("id"))).length)throw new Error(C("Record was modified by another moderator. Refresh and retry.","该成绩已被其他管理员修改，请重新打开。",p));await st(u,"mane",g,C("Submission rejected.","投稿已拒绝。",p),{card:f})},p);return}if(y==="removed"&&!window.confirm(C("Remove this approved record?","确定撤下这条鬃毛成绩？",p)))return;l.disabled=!0;try{if(!(await Z(H.from("mane_entries").update({status:y}).eq("id",d).eq("updated_at",b).select("id"))).length)throw new Error(C("Record was modified by another moderator.","该成绩已被其他管理员修改，请重新打开。",p));await st(u,"mane",g,r("toastSaved",{},p),{card:f,changedRankings:!0})}finally{l.disabled=!1}return}if(m==="mane-reopen"){let{entry:p,revision:f}=l.closest(".review-card").dataset;await Z(H.rpc("reopen_rejected_result",{p_board:"mane",p_id:p,p_updated_at:f})),await na("pending"),X(C("Reopened to pending queue.","已退回待审核。"));return}if(m==="mane-delete-rejected"){let p=l.closest(".review-card");if(!window.confirm(C("Delete this rejected record?","确定删除这条已拒绝的成绩？")))return;await Z(H.rpc("mane_archive_rejected",{p_id:p.dataset.entry,p_updated_at:p.dataset.revision})),await na("rejected"),X(C("Rejected record deleted.","已删除该条拒绝记录。"));return}if(l.dataset.toggleManeMap){let p=l.dataset.active==="true";if(p&&!window.confirm(C("Hide this boss and its public board?","隐藏此地图及其公开榜单？")))return;await Z(H.from("mane_maps").update({active:!p}).eq("id",l.dataset.toggleManeMap)),await gt(),await Ys(),X(r("toastSaved"));return}if(m==="fb-admin-open"){await Lt("pending");return}if(l.dataset.fbAdmin){await Lt(l.dataset.fbAdmin);return}if(m==="fb-versions-admin"){Zs();return}if(l.dataset.fbEditVersion!==void 0){zo(l.dataset.fbEditVersion);return}if(l.dataset.fbReview){let p=E(),f=l.dataset.fbReview==="approved",d=l.closest(".review-card");if(!f){Ls(l,async b=>{await Z(H.rpc("review_submission",{p_submission_id:l.dataset.id,p_decision:"rejected",p_note:b})),await st(u,"flashback","pending",C("Submission rejected.","投稿已拒绝。",p),{card:d})},p);return}l.disabled=!0;try{await Z(H.rpc("review_submission",{p_submission_id:l.dataset.id,p_decision:l.dataset.fbReview,p_note:""})),await st(u,"flashback","pending",C("Submission approved.","审核通过。",p),{card:d,changedRankings:!0})}finally{l.disabled=!1}return}if(l.dataset.fbReopen){await Z(H.rpc("reopen_rejected_result",{p_board:"flashback",p_id:l.dataset.fbReopen})),await Lt("pending"),X(C("Reopened to pending queue.","已退回待审核。"));return}if(l.dataset.fbRemove){let p=window.prompt(C("Enter removal reason (2–200 chars):","请输入移除原因（2–200 字）："));if(p===null)return;let f=p.trim();if(f.length<2||f.length>200)return X(C("Reason must be 2–200 characters.","移除原因须为 2–200 字。"));if(!window.confirm(C("Remove this approved record and recalculate honors?","确认移除这条已通过成绩并重算荣誉？")))return;await Z(H.rpc("remove_submission",{p_submission_id:l.dataset.fbRemove,p_reason:f})),await st(u,"flashback","approved",C("Record removed.","成绩已移除。"),{card:l.closest(".review-card"),changedRankings:!0});return}if(l.dataset.fbEdit){let p=E(),f=l.dataset.fbEdit,d=l.dataset.tab||"pending",b=await Z(H.from("submissions").select("*,profiles(display_name)").eq("id",f).single()),g=Ke(b);la(b.team,b.carry_name,g.psychubes,g.resonanceCodes);let y=i.fbVersions.map(h=>`<optgroup label="${s(xe(h,p))}">${Me(h.id).map(v=>`<option value="${s(v.id)}"${v.id===b.stage_id?" selected":""}>${s(Le(v,p))}</option>`).join("")}</optgroup>`).join("");ye(`
        <h2>${s(r("editRecordTitle",{},p))}</h2>
        <form id="fbEditForm" data-id="${s(f)}" data-tab="${s(d)}">
          <div class="form-grid">
            <div class="field"><label for="feStage">${s(r("fieldStage",{},p))}</label><select id="feStage" name="stage" required>${y}</select></div>
            <div class="field"><label for="feGroup">${s(r("fieldDivision",{},p))}</label><select id="feGroup" name="group">${Ae(Object.entries(vt(p)),b.group_code)}</select></div>
          </div>
          <div class="form-grid">
            <div class="field"><label for="feName">${s(r("fieldPlayerName",{},p))}</label><input id="feName" name="name" value="${s(b.credited_player||"")}" placeholder="${s(b.profiles?.display_name||"")}" minlength="2" maxlength="80" ${b.source_history_id?"required":""} /></div>
            <div class="field"><label for="feRounds">${s(r("fieldRounds",{},p))}</label><select id="feRounds" name="rounds">${Array.from({length:7},(h,v)=>`<option value="${v}"${b.rounds===v?" selected":""}>${s(r("roundsFull",{n:v},p))}</option>`).join("")}</select></div>
          </div>
          ${Zi(b.group_code,b.resonance_ten,p)}
          ${nn(p)}
          <div class="field"><label for="feUrl">${s(r("fieldRelatedUrl",{},p))}</label><input id="feUrl" name="url" type="url" maxlength="2048" placeholder="${s(r("fieldRelatedUrlPlaceholder",{},p))}" value="${s(b.related_url||"")}" /></div>
          <div class="form-actions">
            <button type="button" class="outline-btn" data-fb-admin="${s(d)}">${s(r("btnCancel",{},p))}</button>
            <button type="submit" class="copper-btn">${s(r("btnSaveChanges",{},p))}</button>
          </div>
        </form>`,!0);return}if(l.dataset.fbArchive){let p=E(),f=Ir[l.dataset.fbArchive];if(!f)return;let d=N(p)?f.en:f.zh;if(!window.confirm(C(`Delete ${d}? This removes it from public boards and stats.`,`删除${d}？删除后会从列表与统计中撤下。`,p)))return;if(await Z(H.rpc(f.rpc,{[f.arg]:l.dataset.id})),l.dataset.fbArchive==="fb-archive-record"){await st(u,"flashback",l.dataset.tab||"pending",C("Deleted.","已删除。",p),{card:l.closest(".review-card"),changedRankings:l.dataset.tab==="approved"});return}await gt(),l.dataset.fbArchive==="fb-archive-version"?Zs():await Lt(l.dataset.fbArchive==="fb-archive-history"?"historical":l.dataset.tab||"pending",l.dataset.stage||""),X(C("Deleted.","已删除。",p))}}catch(m){X(m.message||C("Operation failed. Please try again.","操作未完成，请重试。"))}});document.addEventListener("change",e=>{let t=e.target;if(t.dataset.maneDaily)i.maneDaily[t.dataset.maneDaily]=t.value,K();else if(t.id==="maneCarrySelect")i.maneCarry=t.value,K();else if(t.id==="fbVersionSelect")i.fbVersionId=t.value,i.fbStageId=Me(i.fbVersionId)[0]?.id||"",i.fbCarry="",K();else if(t.id==="fbCarrySelect")i.fbCarry=t.value,K();else if(t.id==="fbFormVersion"){let n=O("#fbFormStage");if(n){n.innerHTML=Do(t.value);let o=Number(t.form?.dataset.ocrStageNumber),c=Me(t.value).find(l=>l.stage_no===o);c&&(n.value=c.id)}}else if(t.id==="fbFormGroup"||t.id==="feGroup"){let n=t.form?.querySelector(".resonance-choice"),o=n?.querySelector('input[name="resonanceTen"]'),c=t.value==="zero";n&&(n.hidden=!c),o&&(o.disabled=!c,c||(o.checked=!1))}let a=t.closest?.("#maneSubmitForm, #fbSubmitForm");a&&t.type!=="file"&&da(a)});function Qa(e,t,a){let n=window.scrollX,o=window.scrollY;e==="maneSearchInput"?i.maneQuery=t:i.fbQuery=t,K();let c=document.getElementById(e);if(c){try{c.focus({preventScroll:!0})}catch{c.focus()}try{c.setSelectionRange(a,a)}catch{}}(window.scrollX!==n||window.scrollY!==o)&&window.scrollTo(n,o)}document.addEventListener("input",e=>{let t=e.target;if(t.id==="maneSearchInput"){if(e.isComposing||i.maneQuery===t.value)return;Qa("maneSearchInput",t.value,t.selectionStart)}else if(t.id==="fbSearchInput"){if(e.isComposing||i.fbQuery===t.value)return;Qa("fbSearchInput",t.value,t.selectionStart)}else if(t.dataset?.resSlot!==void 0){P.resonanceCodes[Number(t.dataset.resSlot)]=t.value;let a=t.closest?.("#maneSubmitForm, #fbSubmitForm");a&&da(a)}else if(t.id==="charPickerSearch")!e.isComposing&&Y.query!==t.value&&(Y.query=t.value,pa());else if(t.id==="psyPickerSearch")!e.isComposing&&ee.query!==t.value&&(ee.query=t.value,ua());else{let a=t.closest?.("#maneSubmitForm, #fbSubmitForm");a&&t.type!=="file"&&da(a)}});document.addEventListener("compositionend",e=>{let t=e.target;t.id==="charPickerSearch"&&Y.query!==t.value?(Y.query=t.value,pa()):t.id==="psyPickerSearch"&&ee.query!==t.value?(ee.query=t.value,ua()):t.id==="maneSearchInput"&&i.maneQuery!==t.value?Qa("maneSearchInput",t.value,t.selectionStart):t.id==="fbSearchInput"&&i.fbQuery!==t.value&&Qa("fbSearchInput",t.value,t.selectionStart)});document.addEventListener("submit",async e=>{let t=e.target,a=t.closest(".modal-box");if(!t.id)return;e.preventDefault();let n=t.querySelector('[type="submit"]');if(!n?.disabled){n&&(n.disabled=!0);try{if(t.id==="maneSubmitForm")await xo(t);else if(t.id==="maneExportForm")await No(t);else if(t.id==="maneEditForm"&&i.isAdmin&&H){let o=Yi(new FormData(t),{forEdit:!0}),c;try{c=await Z(H.from("mane_entries").update(o).eq("id",t.dataset.id).eq("updated_at",t.dataset.revision).select("id"))}catch(l){throw Va(l)?new Error(C("Database has not enabled Psychube/Resonance columns yet.","线上数据库尚未添加心相/共鸣码存储列，请先运行配套迁移 SQL。")):l}if(!c.length)throw new Error(C("Record was updated by another moderator.","成绩已被其他管理员更新，请重新打开。"));await st(a,"mane",t.dataset.status,r("toastSaved"),{changedRankings:t.dataset.status==="approved"})}else if(t.id==="maneMapForm"&&i.isAdmin&&H){let o=new FormData(t);await Z(H.from("mane_maps").insert({name:String(o.get("name")).trim(),edition:String(o.get("edition")).trim(),section:String(o.get("section")),position:Number(o.get("position"))})),await gt(),await Ys(),X(r("toastSaved"))}else if(t.id==="fbGuestForm"){let o=String(new FormData(t).get("name")||"").trim();if(o.length<2||o.length>24)throw new Error(r("errPlayerRequired"));Ga=!0,await Nt();let c=i.user;c||(c=(await Z(H.auth.signInAnonymously())).user),await Z(H.from("profiles").upsert({id:c.id,display_name:o},{onConflict:"id"})),await zt(),Ga=!1,Xa()}else if(t.id==="profileForm"){let o=String(new FormData(t).get("name")||"").trim();if(!i.user||o.length<2||o.length>24)throw new Error(r("errPlayerRequired"));await Z(H.from("profiles").upsert({id:i.user.id,display_name:o},{onConflict:"id"})),await zt(),Ee(),t.dataset.forFb==="true"?Xa():X(r("toastSaved"))}else if(t.id==="fbSubmitForm")await Lo(t);else if(t.id==="fbEditForm"&&i.isAdmin&&H){let o=new FormData(t),c=tn(),l=ga(o.get("url"))||null;await Z(H.rpc("edit_submission",{p_id:t.dataset.id,p_stage_id:o.get("stage"),p_group:o.get("group"),p_team:c.team,p_carry:c.carry,p_rounds:Number(o.get("rounds")),p_credited_player:o.get("name"),p_related_url:l,p_resonance_ten:o.get("group")==="zero"&&o.has("resonanceTen")}));try{await Z(H.rpc("update_submission_builds",{p_id:t.dataset.id,p_team_psychubes:c.hasPsychubes?c.psychubes:null,p_team_resonance_codes:c.hasResonance?c.resonanceCodes:null}))}catch(u){if(Va(u)||/update_submission_builds|PGRST202/i.test(`${u?.code||""} ${u?.message||""}`)){if(c.hasAny)throw new Error(C("Core record saved, but Psychube/Resonance DB migration is not installed yet.","基础成绩已保存，但线上数据库尚未运行心相迁移 SQL。"))}else throw u}await st(a,"flashback",t.dataset.tab,r("toastSaved"),{changedRankings:t.dataset.tab==="approved"})}else if(t.id==="fbVersionForm"&&i.isAdmin&&H){let o=new FormData(t),c=String(o.get("code")||"").trim(),l=String(o.get("label")||"").trim(),u=[1,2,3].map(p=>String(o.get(`stage${p}`)||"").trim());if(!c||!l||u.some(p=>!p))throw new Error(C("Please fill in cycle code, label, and all 3 stages.","请填写完整版本与三个关卡名称。"));let m=await Z(H.rpc("save_version",{p_version_id:t.dataset.id||null,p_code:c,p_label:l,p_stage_names:u,p_challenges:[1,2,3].map(p=>o.get(`repeat${p}`)||null)}));i.fbVersionId=m,i.fbStageId="",await gt(),Zs(),X(r("toastSaved"))}else if(t.id==="adminLoginForm"){let o=String(new FormData(t).get("email")||"").trim();await Nt(),await Z(H.auth.signInWithOtp({email:o,options:{emailRedirectTo:new URL("./",location.href).href}})),Ee(),X(C("Magic sign-in link sent. Open it in this browser to sign in.","登录邮件已发送，请在同一浏览器查收并打开链接。"))}}catch(o){X(o.message||C("Operation failed. Please try again.","操作失败，请重试。"))}finally{Ga=!1,n?.isConnected&&(n.disabled=!1)}}});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!e.isComposing){i.glossaryOpen?ot():O("#proofLightboxOverlay")?Za():Y.open?ba():ee.open?ma():Ee();return}if((e.key==="Enter"||e.key===" ")&&!e.isComposing){let t=e.target?.closest?.('[role="button"][data-open-char], [role="button"][data-open-psy], [role="button"][data-open-player]');t&&(e.preventDefault(),t.click())}});var ar="";document.addEventListener("pointerdown",e=>{ar=e.target?.id||""});document.addEventListener("click",e=>{let t=e.target?.id;if(!(!t||t!==ar)){if(t==="charPickerOverlay")ba();else if(t==="psyPickerOverlay")ma();else if(t==="modalOverlay"){if(O("#modalOverlay form"))return;Ee()}}});window.addEventListener("hashchange",()=>{Ti(),K(),sa()});async function jo(){let e=cs();Ti();try{await Ks(e)}catch(n){console.warn("Language pack load failed:",n)}let t=window.LEADERBOARD_CONFIG;if(!pe()&&!!(t?.supabaseUrl&&t?.supabaseAnonKey)){i.dataSource="live";let n=to();i.loading=!n,K(),await Ri({silent:!0,force:!0}),(Jr()||Xr())&&Nt().then(()=>zt()).catch(()=>{})}else await It(),Ye(),K()}jo();})();
