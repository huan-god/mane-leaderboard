// 公开配置：仅使用 Supabase publishable key（与旧版鬃毛邮报榜 / 焦点闪回榜共用同一后端，管理密钥必须留在服务端）
window.LEADERBOARD_CONFIG = {
  supabaseUrl: 'https://bnkqttkytjggtrnpjssn.supabase.co',
  supabaseAnonKey: 'sb_publishable_b3t-M_Vci6qbEgWOQW9B6g_WsCl_yPG',
  defaultLang: 'zh',
  offlineFirst: false,
  assetVersion: '20261127-mobile-perf1',
  issueMeta: {
    version: '4.1',
    title: '亚特兰蒂斯谋杀案',
    titleEn: 'Murder on Atlantis',
    period: '11/05 – 12/10',
    periodEn: 'Nov 5 – Dec 10'
  }
};

// 兼容旧版变量名
window.MANE_CONFIG = window.LEADERBOARD_CONFIG;
window.FLASHBACK_CONFIG = window.LEADERBOARD_CONFIG;
