// Reverse: 1999 Global & CN Bilingual i18n Engine (EN default, instant EN/ZH toggle)
// Pure ESM module with zero internal dependencies to avoid circular imports.

const LANG_STORAGE_KEY = 'r1999-lang';

let currentLang = null;

function normalizeLang(raw) {
  const val = String(raw ?? '').trim().toLowerCase();
  if (!val) return null;
  if (val === 'zh' || val.startsWith('zh-') || val === 'cn' || val === 'zh_cn') return 'zh';
  if (val === 'en' || val.startsWith('en-')) return 'en';
  return null;
}

function applyLangToDom(lang) {
  if (typeof document === 'undefined') return;
  try {
    if (document.documentElement) {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    }
    if (document.body) {
      document.body.dataset.lang = lang;
    }
  } catch {
    // Ignore DOM access issues in restricted contexts
  }
}

function readUrlLang() {
  if (typeof location === 'undefined') return null;
  try {
    const params = new URLSearchParams(location.search || '');
    const fromSearch = normalizeLang(params.get('lang'));
    if (fromSearch) return fromSearch;
  } catch {
    // Ignore URL parsing issues
  }
  return null;
}

function readStoredLang() {
  if (typeof window === 'undefined') return null;
  try {
    return normalizeLang(window.localStorage?.getItem(LANG_STORAGE_KEY));
  } catch {
    return null;
  }
}

function readNavigatorLang() {
  if (typeof navigator === 'undefined') return null;
  const list = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const item of list) {
    const matched = normalizeLang(item);
    if (matched) return matched;
  }
  return null;
}

function resolveDefaultSetting(raw) {
  if (String(raw ?? '').trim().toLowerCase() === 'auto') {
    return readNavigatorLang() || 'en';
  }
  return normalizeLang(raw);
}

export function initLang() {
  const fromUrl = readUrlLang();
  const fromStorage = readStoredLang();
  const fromDom = typeof document !== 'undefined'
    ? resolveDefaultSetting(document.documentElement?.dataset?.defaultLang)
    : null;
  const fromConfig = resolveDefaultSetting(globalThis.LEADERBOARD_CONFIG?.defaultLang);

  const resolved = fromUrl || fromStorage || fromDom || fromConfig || 'en';
  currentLang = resolved;
  applyLangToDom(resolved);
  return resolved;
}

export function getLang() {
  if (!currentLang) return initLang();
  return currentLang;
}

export function setLang(lang) {
  const normalized = normalizeLang(lang) || 'en';
  currentLang = normalized;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage?.setItem(LANG_STORAGE_KEY, normalized);
    } catch {
      // Ignore storage quota / file:// privacy restrictions
    }
  }
  applyLangToDom(normalized);
  return normalized;
}

export function isEn(lang = getLang()) {
  return (normalizeLang(lang) || getLang()) === 'en';
}

export const DICTS = {
  en: {
    // Topbar & Brand
    brandTitleMane: "Mane's Bulletin · Global Archive",
    brandTitleFb: 'Focused Flashback · Speedrun Archive',
    brandSub: 'REVERSE: 1999 · COMMUNITY LEADERBOARD',
    brandGlyphMane: 'MB',
    brandGlyphFb: 'IX',
    brandHomeAria: 'Return to Leaderboard Home',
    modeSwitcherAria: 'Switch Leaderboard Mode',
    subnavAria: 'Leaderboard Views',
    modeMane: "Mane's Bulletin",
    modeFlashback: 'Focused Flashback',
    statusOffline: 'Offline Archive · Local Sandbox',
    statusLive: 'Live Archive · Submissions Open',
    statusSyncing: 'Syncing Archive…',
    statusDisconnected: 'Offline Snapshot',
    btnSyncLive: 'Sync Live',
    btnReconnect: 'Reconnect ↻',
    btnAdmin: 'Admin Panel',
    btnAdminShort: 'Admin',
    btnMySubmissions: 'My Submissions',
    btnMySubmissionsShort: 'Mine',
    btnAdminLogin: 'Admin Sign In',
    btnAdminLoginShort: 'Sign In',
    accountAdmin: 'Admin Account',
    accountAdminShort: 'Admin',
    accountUser: 'Member Account',
    accountUserShort: 'Account',
    btnSubmit: '+ Submit Record',
    btnSubmitShort: '+ Submit',
    ctaSubMane: 'REPORT ▽▽',
    ctaSubFb: 'CLEAR ▽▽',
    langToggleAria: 'Switch language between English and Chinese',
    langLabelEn: 'EN',
    langLabelZh: '中文',
    pageTitleMane: "Reverse: 1999 · Mane's Bulletin & Focused Flashback Leaderboard",
    pageTitleFb: "Reverse: 1999 · Focused Flashback & Mane's Bulletin Leaderboard",

    // Subnav tabs
    navScores: 'High Scores',
    navDaily: 'Daily Scores',
    navTotals: 'Main DPS Totals',
    navPlayers: 'Hall of Fame',
    navRules: 'Rules & Guide',
    navFbLeaderboard: 'Stage Rankings',
    navFbCarries: 'Main DPS Ranks',
    navFbPlayers: 'Hall of Fame',
    navFbRules: 'Rules & Guide',
    subnavMetaMane: "MANE'S BULLETIN · INVESTIGATION SCORE",
    subnavMetaFb: 'FOCUSED FLASHBACK · 0–6 ROUND CLEARS',

    // Masthead
    maneTitle: "Mane's Bulletin",
    maneEnTag: 'Investigation Archive',
    fbTitle: 'Focused Flashback',
    fbEnTag: 'Speedrun Archive',
    maneMotto: 'Investigate rumors of bizarre phenomena and tuck every clue safely away. We offer gold and renown to the sharpest informants.',
    fbMotto: 'Three distinct trials, zero shared arcanists. Push every archetype to its sharpest 0–6 round clear.',
    metricRecords: 'Verified Records',
    metricInvestigators: 'Investigators',
    metricBosses: 'Collector / Gallery',
    metricSitePeak: 'Sitewide Peak Score',
    metricHonoredPlayers: 'Honored Timekeepers',
    metricCycles: 'Archived Cycles',
    metricFastest: 'Fastest Clear',
    jumpTagPeak: 'SITE PEAK',
    jumpTagFastest: 'FASTEST',
    fbRoundCap: 'Round Cap',
    fbRoundLimitTag: '0–6 Rounds Only',
    mastheadMetricsAria: 'Sitewide archive statistics',
    fbMetricsAria: 'Focused Flashback statistics',
    fbCycleFallback: 'Focused Flashback Cycle Board',
    jumpPeakTitle: 'Jump to sitewide peak score: {source}',
    jumpFastestTitle: 'Jump to fastest clear: {source}',
    sitePeakFallback: 'Highest Investigation Score',
    fbRoundWindowFallback: '0–6 Round Speedrun Window',

    // Sidebar & Filters
    headingSurvey: 'Targets',
    headingSurveyEn: 'TARGET DOSSIER',
    headingStageSelect: 'Flashback Stages',
    headingStageSelectEn: 'TRIAL SELECTION',
    headingPortrayal: 'Portray Division',
    headingPortrayalEn: 'PORTRAY',
    headingLineupFilter: 'Lineup Filter',
    headingLineupFilterEn: 'FILTER',
    headingTopCarries: 'Top Main DPS',
    headingTopCarriesEn: 'META CARRIES',
    topCarriesEmpty: 'No Main DPS data yet for this board.',
    roleCarryOnly: 'Main DPS Only',
    roleAnyMember: 'Any Team Member',
    allCarriesOption: 'All Main DPS',
    allMembersOption: 'All Arcanists',
    searchPlaceholderMane: 'Search Timekeeper, Arcanist, alias (e.g. TF, MedPoc)…',
    searchPlaceholderFb: 'Search Timekeeper, Arcanist, or lineup…',
    resetFilter: 'Reset',
    clearFilter: 'Clear Filters',
    mobileFilterBtn: 'Filters & Target',
    filterClose: 'Done',
    afflatusAll: 'All',
    afflatusFilterAria: 'Filter by Afflatus',
    afflatusOnlyTitle: '{aff} Afflatus only',
    versionSelectLabel: 'Cycle / Version',
    sectionLabel: 'Edition',
    countUnit: '{n} entries',
    sidebarNoteMane: "Collector's Edition features the 3 current v4.1 bosses with dynamic score-threshold evolutions up to 100M+.",
    sidebarNoteRerun: "Anomaly Gallery archives rerun Witness's Edition bosses from v3.2–v4.0 with 20-round limits.",
    sidebarNoteFb: 'Focused Flashback records verified 0–6 round clears across 3 stages per cycle. Identical team compositions share one fastest record.',
    btnRefresh: 'Refresh Data ↻',
    btnExportExcel: 'Export Excel (.xlsx)',
    carryMetricAppearances: 'Appearances',
    carryMetricFirsts: '#1 Finishes',
    carryScopePeriod: 'This Cycle',
    carryScopeAll: 'All Cycles',
    carriesPageTitle: 'Main DPS Performance',
    carriesPageSub: 'Ranked by verified appearances and top clears across stages.',

    // Boss Hero & Mechanics
    tipsLabel: 'Investigation Tips',
    weaknessLabel: 'Weakness',
    favoredLabel: 'Favored Afflatus',
    appraisalHeading: 'In-Depth Appraisal · Score Thresholds',
    appraisalSub: 'Collector’s Edition boss evolutions triggered at score milestones.',
    btnExpandMech: 'Boss Mechanics ▾',
    btnCollapseMech: 'Hide Mechanics ▴',
    btnExpandStageMech: 'Stage Mechanics ▾',
    btnCollapseStageMech: 'Hide Mechanics ▴',
    mechEnvLabel: 'ENVIRONMENT RULES',
    mechPassivesLabel: 'BOSS PASSIVES & SKILLS',
    mechThresholdsLabel: 'IN-DEPTH APPRAISAL · SCORE THRESHOLDS',
    mechFbEnvLabel: 'STAGE ENVIRONMENT & RECOMMENDED BUFFS',
    mechFbPassivesLabel: 'ENEMY MECHANICS',
    mechEnemiesLabel: 'Enemy Wave',
    mechAriaMane: 'Boss core mechanics',
    mechAriaFb: 'Focused Flashback stage mechanics',
    turnsUnit: '{n} Rounds',
    roundsUnit: '{n}R',
    roundsFull: '{n} Rounds',
    opensAt: 'Opens {time}',
    bossNotOpenYet: 'Not Open Yet',
    bossPeakLabel: 'Board Peak',
    submitThisBoss: 'Submit for This Boss',
    submitThisStage: 'Submit for This Stage',
    bossWikiLink: 'Fandom Wiki ↗',
    stageWikiLink: 'Flashback Wiki ↗',
    bossDossierBadge: 'OFFICIAL DOSSIER',

    // Rank List & Cards
    colRank: 'Rank',
    colInvestigator: 'Investigator',
    colPlayerTime: 'Timekeeper / Date',
    colLineup: 'Lineup',
    colScoreGrade: 'Score / Rating',
    colRounds: 'Rounds',
    mainDpsLabel: 'Main DPS',
    scoreLabel: 'Score',
    viewCardBtn: 'Record Card',
    videoGuideLink: 'Video / Guide ↗',
    relatedLink: 'Reference ↗',
    res10Badge: 'R10',
    res10FullBadge: 'All P0 · R10',
    res10Filter: 'Resonance Lv. 10 Only',
    buildTagPsy: 'Psychube',
    buildTagRes: 'Resonance',
    legacyTeamLabel: 'Legacy Entry',
    localRecordTag: 'Local Sandbox',
    emptyTitleLoading: 'Loading Archive…',
    emptyTitleFiltered: 'No Matching Records',
    emptyTitleEmpty: 'No Records Yet',
    emptyDescFiltered: 'Try clearing the search query, Afflatus filter, or Arcanist filter.',
    emptyDescMane: 'Be the first Timekeeper to submit a verified Investigation Score for this boss and division.',
    emptyDescFb: 'Be the first Timekeeper to submit a verified 0–6 round clear for this stage and division.',
    emptyActionSubmit: 'Submit First Record',
    boardFootMane: 'Identical team compositions retain only the highest score; ties favor the earliest submission.',
    boardFootFb: 'Identical team compositions retain only the fewest rounds (0–6); ties favor the earliest submission.',
    fbRuleCard1Title: 'Current Cycle Holdings',
    fbRuleCard1Desc: 'Counts active records currently held by each Timekeeper in the selected cycle.',
    fbRuleCard2Title: 'All-Time Holdings',
    fbRuleCard2Desc: 'Totals held records across all cycles, deduplicating identical division and lineup on repeated stages.',
    editRecordBtn: 'Edit',
    rankAria: 'Rank #{rank}',

    // Daily Scores, Totals, Players, Rules, Commission Rating Ladder
    dailyTitle: 'Daily New Scores',
    dailySubtitle: "Approved Mane's Bulletin submissions by Beijing date (UTC+8).",
    dailyToday: 'Today',
    dailyYesterday: 'Yesterday',
    dailyDateLabel: 'Date (UTC+8)',
    dailyAllDivisions: 'All Divisions',
    dailyAllMaps: 'All Bosses',
    dailyCountFoot: '{n} approved records on {date}',
    dailyEmpty: 'No approved scores recorded for this date and filter.',
    dailyLoading: 'Loading daily scores…',
    dailyOfflineHint: 'Showing local offline snapshot records for this date.',
    dailyJumpBtn: 'View on Board ↗',
    totalsEyebrow: 'MAIN DPS AGGREGATE',
    totalsTitle: 'Main DPS Total Score Ranking',
    totalsMethodScope: 'Aggregates each Main DPS’s highest single-boss score across all bosses in the selected edition and division.',
    totalsMethodZero: 'All P0 and Max Portray (P5) divisions are tallied independently.',
    totalsMethodMerge: 'Shared / dual-carry lineups credit each designated Main DPS with that run’s score.',
    totalsBreakdownSummary: '{count} bosses tallied',
    totalsWatchMap: 'Jump ↗',
    totalsEmpty: 'No Main DPS totals available for this edition and division.',
    playersManeTitle: "Mane's Bulletin · Hall of Fame",
    playersFbTitle: 'Focused Flashback · Hall of Fame',
    playersScopeAll: 'All Editions',
    playersScopeNew: "Collector's Edition",
    playersScopeRerun: 'Anomaly Gallery',
    playersDivAll: 'All Divisions',
    playersFirstChip: '#1 × {n}',
    playersPodiumChip: 'Top 3 × {n}',
    playersBestScore: 'Best Score',
    playersHoldings: 'Active Holdings',
    playersExpandRecords: 'View {n} held records ▾',
    playersCollapseRecords: 'Hide records ▴',
    playersPeriodHoldings: 'Cycle Holdings',
    playersAllTimeHoldings: 'All-Time Holdings',
    playersEmpty: 'No honored Timekeepers match this filter.',
    playersManeFoot: "Aggregated live from all currently approved Mane's Bulletin records.",
    playersFbFoot: 'Cycle holdings deduct overtaken runs; all-time totals deduplicate identical lineups on repeated stages.',
    ratingLadderTitle: 'Commission Rating Ladder',
    ratingLadderSub: "Official Mane's Bulletin evaluation milestones (50K C to 100M+ Mythic SSS IV).",
    ratingLadderScoreCol: 'Min Score',
    ratingLadderGradeCol: 'Rating',
    rulesManeItems: [
      ['01', 'Two Editions', "Collector's Edition features the 3 current version bosses with dynamic score-threshold evolutions; Anomaly Gallery archives rerun Witness's Edition bosses."],
      ['02', 'Portray Divisions', 'All P0 and Max Portray (P5) are ranked separately. Every deployed arcanist in the squad must satisfy the chosen division.'],
      ['03', 'Main DPS & Full Lineup', 'Enter 1–4 unique deployed arcanists. Dual/shared Main DPS is supported, and every designated Main DPS must be part of the deployed squad.'],
      ['04', 'Best Score Per Lineup', 'For the same boss, division, and exact team composition, only the highest Investigation Score is retained; ties go to the earliest submission.'],
      ['05', 'Proof Verification & Privacy', 'Upload a clear battle result screenshot (PNG/JPG/WebP; files over 5 MB are automatically compressed). Verification screenshots are visible only to the submitter and moderators.'],
      ['06', 'Main DPS Totals', 'Main DPS Total Score sums each arcanist’s best individual score across every boss in the selected edition and division.']
    ],
    rulesFbItems: [
      ['01', 'Three Stages Per Cycle', 'Each game version features 3 distinct Focused Flashback stages; records are ranked independently per version and stage.'],
      ['02', 'Two Portray Divisions', 'All P0 and Max Portray (P5) compete in separate divisions, with an optional Resonance Lv. 10 (R10) tag for All P0 clears.'],
      ['03', '0–6 Round Window', 'Only verified clears between 0 and 6 rounds are eligible. A clear result screenshot is required for moderator review.'],
      ['04', 'Lineup Deduplication', 'Submit the Main DPS and complete deployed lineup. Team order does not create separate entries, and Main DPS designation does not split the board.'],
      ['05', 'Sole Record Holder', 'Only the fewest-round clear for a given lineup stays on the board; ties are decided by earliest server submission timestamp.'],
      ['06', 'Holdings Count', 'Cycle holdings count currently retained records; all-time holdings deduplicate identical division + lineup clears on returning stages.']
    ],
    rulesFbNote: 'Reference: Focused Flashback is a recurring challenge mode introduced in Reverse: 1999 v3.6. The 0–6 round cap, portray divisions, and per-lineup sole-holder rules are community leaderboard standards.',

    // Poster Modal & Canvas PNG
    posterEyebrow: 'ARCHIVE RECORD CARD',
    posterTitle: 'Record Archive Card',
    posterSubtitle: 'Inspect Psychube & Resonance builds, jump to video guides, or export a shareable PNG card.',
    posterKickerMane: "MANE'S BULLETIN · GLOBAL ARCHIVE",
    posterKickerFb: 'FOCUSED FLASHBACK · SPEEDRUN ARCHIVE',
    posterRankLabel: 'RANK',
    posterDailyLabel: 'DAILY',
    posterInvestigator: 'INVESTIGATOR',
    posterBuildsHeading: 'PSYCHUBES & RESONANCE BUILDS',
    posterCopyAllRes: 'Copy All Resonance Codes ({n})',
    posterCopyRes: 'Copy Code',
    posterNoPsy: 'No Psychube attached',
    posterNoRes: 'No Resonance Code attached',
    posterNoBuilds: 'No Psychube or Resonance Code attached to this record yet.',
    posterEvidenceHasLink: 'Public Video / Guide Attached',
    posterEvidenceDomain: 'Source: {host} · Verification screenshot stays private to submitter & moderators',
    posterEvidenceOpen: '▶ Open Video / Guide ↗',
    posterEvidenceNoLink: 'No public video or guide link attached. Verification screenshot stays private under community privacy rules.',
    posterBtnSavePng: 'Save Card (PNG)',
    posterBtnCopyLink: 'Copy Direct Link',
    posterBtnCopyText: 'Copy Summary',
    posterBtnClose: 'Close',
    posterGenerating: 'Rendering PNG…',
    posterSavedToast: 'Record card PNG saved.',
    posterFileProtocolHint: 'Tip: PNG export works best over http://localhost or HTTPS; opened preview image in a new tab if canvas download is restricted.',
    posterRecordedAt: 'RECORDED {date}',
    posterCommunityFooter: 'REVERSE: 1999 COMMUNITY ARCHIVE',
    posterRes10Badge: '✦ All P0 · R10',
    posterCopiedLink: 'Direct record link copied.',
    posterCopiedText: 'Record summary copied.',
    posterCopiedRes: 'Resonance Code copied.',
    posterCopiedAllRes: 'Copied {n} Resonance Codes.',
    posterExportFailed: 'Failed to export PNG card.',

    // Submit / Edit Modals, Pickers, Offline Sandbox, Account & Admin
    offlineSubmitNote: 'Offline Sandbox Mode: submissions are saved to this browser only and will not affect the live server.',
    offlineSubmitSuccess: 'Saved to your local Offline Sandbox leaderboard!',
    offlineClearLocal: 'Clear Local Sandbox',
    offlineClearedToast: 'Local sandbox records cleared.',
    offlineSyncOk: 'Connected to live archive and synced latest records.',
    offlineSyncFail: 'Could not reach live server; staying on offline snapshot.',
    draftRestored: 'Restored your unfinished submission draft.',
    clearDraft: 'Discard Draft',
    slotLabel: 'Slot {n}',
    slotPickChar: 'Select Arcanist',
    slotPickPsy: 'Select Psychube',
    slotPendingChar: 'Choose Arcanist',
    slotOptional: 'Optional',
    slotMainDps: 'Main DPS',
    slotMainDpsTitle: 'Toggle Main DPS (multiple carries supported)',
    slotMainDpsDisabled: 'Main DPS requires a single specific arcanist',
    slotResPlaceholder: 'Paste Slot {n} Resonance Code (optional)',
    slotClearChar: 'Clear Slot {n} Arcanist',
    slotClearPsy: 'Clear Slot {n} Psychube',
    teamBuilderLabel: 'Deployed Squad, Main DPS & Builds * (1–4 Arcanists)',
    teamBuilderEmptyHint: 'Supports 1–4 arcanists (leave unused slots blank). Pick arcanists and mark at least one Main DPS.',
    teamBuilderSummary: '{n} selected (1–4) · Main DPS: {carries}',
    teamBuilderNoCarry: 'None selected (toggle "Main DPS" above)',
    charPickerTitle: 'Select Arcanist · Slot {n}',
    charPickerSub: 'Search by English name, alias (TF, MedPoc, F22, H-Lilya), or Chinese name. Multi-select creates a flex slot.',
    charPickerSearchPlaceholder: 'Search Arcanist name or alias…',
    charPickerAllStars: 'All Rarities',
    charPickerWildcardHeading: 'Flex / Wildcard Slot',
    charPickerMultiHint: '{n} selected (Flex slot)',
    charPickerConfirm: 'Confirm Selection',
    charPickerClear: 'Clear Slot',
    charPickerEmpty: 'No arcanists match your search.',
    psyPickerTitle: 'Select Psychube · Slot {n}',
    psyPickerSub: 'All 122 equippable Psychubes (v1.0–v4.1). Filter by rarity, role tag, or stat.',
    psyPickerSearchPlaceholder: 'Search Psychube name, stat, or version…',
    psyPickerEmpty: 'No Psychubes match your filter.',
    psyPickerClear: 'Clear Psychube',
    submitManeTitle: "Submit Mane's Bulletin Score",
    submitManeSub: 'Submit a verified Investigation Score with lineup and optional Psychube / Resonance builds.',
    submitFbTitle: 'Submit Focused Flashback Clear',
    submitFbSub: 'Submit a verified 0–6 round clear for the current cycle.',
    editRecordTitle: 'Edit Record',
    fieldBoss: 'Boss',
    fieldStage: 'Stage',
    fieldVersion: 'Cycle',
    fieldDivision: 'Portray Division',
    fieldScore: 'Investigation Score',
    fieldRounds: 'Clear Rounds (0–6)',
    fieldPlayerName: 'Timekeeper Name',
    fieldRelatedUrl: 'Video / Guide URL (optional)',
    fieldContact: 'Contact / Discord / UID (optional)',
    fieldProof: 'Result Screenshot (PNG/JPG/WebP, ≤ 5 MB · larger images auto-compressed)',
    fieldProofHint: 'Used strictly for moderator verification; never published publicly.',
    fieldRes10Check: 'All squad members are Resonance Lv. 10 (R10)',
    submitPortrayLimitNote: 'Note: Due to limited moderator capacity and the high verification difficulty of free portrayals, only "All P0" and "Max Portray (P5)" submissions are currently supported. Thank you for your understanding.',
    globalFbNoticeTag: 'GLOBAL SERVER NOTICE',
    globalFbBoardNotice: "Focused Flashback follows the CN server's active cycle (v4.1) and enemy tuning changes every patch, so Global server clears cannot currently be verified or accepted here. Browse CN clears freely for future reference — Global players can submit scores in Mane's Bulletin!",
    globalFbBoardCta: "Go to Mane's Bulletin →",
    globalFbSubmitNotice: "CN Server Only (Focused Flashback): Global is ~2–3 patches behind CN and Focused Flashback stages & enemy tuning change each cycle, so moderators can only verify CN server clears for this mode. Global players are welcome to submit Mane's Bulletin scores instead.",
    globalFbSubmitCta: "Submit Mane's Bulletin Instead →",
    globalManeNoticeTag: 'GLOBAL SERVER WELCOME',
    globalManeSubmitNotice: "Global server (~2–3 patches behind CN) players are welcome to submit Mane's Bulletin scores for any matching boss already live on Global! Check Anomaly Gallery for earlier bosses; Collector's Edition lists the latest CN v4.1 bosses.",
    btnSubmitNow: 'Submit Record',
    btnSubmitting: 'Submitting…',
    btnSaveChanges: 'Save Changes',
    btnCancel: 'Cancel',
    btnClose: 'Close',

    // Validation Errors
    errSlotMissingChar: 'Slot {n} has no arcanist selected. Pick an arcanist or clear its Psychube and Resonance Code.',
    errSlotNameTooLong: 'Each slot name must be 40 characters or fewer.',
    errDuplicateMember: 'Duplicate arcanist "{name}" in lineup. Please remove duplicates.',
    errResTooLong: 'A Resonance Code cannot exceed 160 characters.',
    errTeamCount: 'Please select between 1 and 4 deployed arcanists.',
    errCarryRequired: 'Please mark at least 1 arcanist as Main DPS.',
    errScoreInvalid: 'Please enter a valid positive Investigation Score.',
    errRoundsInvalid: 'Clear rounds must be an integer between 0 and 6.',
    errPlayerRequired: 'Please enter your Timekeeper display name.',
    errUrlInvalid: 'Related link must start with http:// or https://.',
    errProofRequired: 'Please attach a battle result screenshot.',
    errProofType: 'Unsupported image format. Use PNG, JPG, or WebP.',
    errProofSize: 'Screenshot still exceeds 5 MB even after auto-compression. Please crop or resize it below 5 MB.',

    // My Submissions, Account, Admin
    mySubTitle: 'My Submissions',
    mySubEmpty: 'You have no submitted records yet.',
    mySubOffline: 'Showing records saved in your local Offline Sandbox.',
    loginTitle: 'Admin Sign In',
    loginSub: 'Sign in with a moderator account to review submissions and manage boards.',
    loginEmail: 'Email',
    loginPassword: 'Password',
    loginBtn: 'Sign In',
    logoutBtn: 'Sign Out',
    profileTitle: 'Timekeeper Profile',
    profileDisplayName: 'Display Name',
    profileSave: 'Save Profile',
    adminTitle: 'Moderation & Archive Console',
    adminTabPending: 'Pending',
    adminTabApproved: 'Approved',
    adminTabRejected: 'Rejected',
    adminTabRemoved: 'Removed',
    adminTabHistorical: 'Historical',
    adminApprove: 'Approve',
    adminReject: 'Reject',
    adminDelete: 'Remove',
    adminEdit: 'Edit',
    adminMapsManage: 'Manage Bosses',
    adminVersionsManage: 'Manage Cycles',
    adminExportExcel: 'Export Workbook',

    // Toasts & Footer
    toastRefreshed: 'Leaderboard data refreshed.',
    toastCopied: 'Copied to clipboard.',
    toastCopyFailed: 'Copy failed. Please copy manually.',
    toastSaved: 'Saved successfully.',
    toastSubmitted: 'Submission received and queued for review.',
    toastOfflineNotice: 'Running on bundled offline snapshot. Click "Sync Live" to fetch real-time server updates.',
    footerBrandTitle: 'REVERSE: 1999 · GLOBAL COMMUNITY LEADERBOARD',
    footerBrandSub: "Mane's Bulletin High Scores × Focused Flashback Speedruns",
    footerCredits: 'Maintained by the Reverse: 1999 community leaderboard curators & moderators.',
    footerWikiMane: "Fandom Wiki · Mane's Bulletin ↗",
    footerWikiFb: 'Fandom Wiki · Focused Flashback ↗',
    footerDisclaimer: 'Unofficial fan-run community archive, not affiliated with Bluepoch. Please avoid exposing private account credentials in screenshots.',

    // V2 Column Header & Board Intelligence / Meta Analytics Strip
    colTactical: 'ARCHETYPE · PEAK',
    colArchetype: 'ARCHETYPE',
    intelTitle: 'Board Intelligence',
    intelSubtitle: 'Live meta snapshot of carries, supports, Psychubes, and score distribution on this board.',
    intelCollapse: 'Hide Intel ▴',
    intelExpand: 'Show Intel ▾',
    intelTopCarries: 'Top Main DPS',
    intelTopSupports: 'Top Supports',
    intelTopPsychubes: 'Top Psychubes',
    intelScoreDist: 'Score Distribution',
    intelRoundDist: 'Clear Round Breakdown',
    intelPeakCompare: 'P0 vs P5 Peak',
    intelMedianScore: 'Median Score',
    intelAvgRounds: 'Avg. Rounds',
    intelUsageRate: 'Usage Rate',
    intelPeakP0: 'All P0 Peak',
    intelPeakP5: 'Max P5 Peak',
    intelNoData: 'Not enough records on this board for analytics yet.',

    // V2 Rich Rank Row Tactical Column
    rowPeakRecord: 'BOARD PEAK',
    rowVsPeak: '{pct}% of peak',
    rowAppraisalStage: 'Stage {roman}',
    rowAppraisalNone: 'Pre-Appraisal',
    rowResCodesCount: '{n} Res Codes',
    rowWatchGuide: 'Watch Guide ↗',
    rowCompare: 'Compare',
    rowComparing: 'Comparing ✓',

    // V2 Appraisal & Status Keyword Glossary
    appraisalActiveLabel: 'Active Appraisal',
    appraisalClearedBadge: 'Reached',
    appraisalClickHint: 'Click a threshold to inspect boss evolution details',
    counterTipsHeading: 'TACTICAL COUNTERPLAY',
    glossaryHint: 'Click any [Keyword] to view official effect',
    glossaryTitle: 'Combat Status & Mechanic Glossary',
    glossaryClose: 'Close Glossary',
    glossaryCatPos: 'Pos Status',
    glossaryCatNeg: 'Neg Status',
    glossaryCatControl: 'Control',
    glossaryCatStats: 'Stats Buff / Debuff',
    glossaryCatSpecial: 'Special / Archetype',
    glossaryCatBoss: 'Boss Mechanic',

    // V2 Arcanist / Psychube / Investigator Dossier Modals
    dossierCharEyebrow: 'ARCANIST DOSSIER',
    dossierPsyEyebrow: 'PSYCHUBE DOSSIER',
    dossierPlayerEyebrow: 'INVESTIGATOR DOSSIER',
    dossierDmgReality: 'Reality DMG',
    dossierDmgMental: 'Mental DMG',
    dossierEuphoria: 'Euphoria Available',
    dossierVersion: 'Debut {ver}',
    dossierArchiveStats: 'Archive Performance',
    dossierManeAppearances: "Mane's Bulletin Runs",
    dossierFbAppearances: 'Flashback Runs',
    dossierMainDpsRate: 'Main DPS Rate',
    dossierPeakScore: 'Peak Mane Score',
    dossierFastestClear: 'Fastest Flashback',
    dossierTopTeammates: 'Most Frequent Teammates',
    dossierTopPsychubes: 'Most Equipped Psychubes',
    dossierFilterBoard: 'Filter Current Board',
    dossierOpenUttu: 'UTTU / Huiji Wiki ↗',
    dossierOpenWiki: 'Fandom Wiki ↗',
    dossierPsyStats60: 'Lv. 60 Base Stats',
    dossierPsyAtk: 'ATK',
    dossierPsyHp: 'HP',
    dossierPsyRDef: 'Reality DEF',
    dossierPsyMDef: 'Mental DEF',
    dossierPsySubStat: 'Secondary Stat',
    dossierPsyPassive: 'Amplification Passive',
    dossierPsyUsage: 'Archive Equips',
    dossierPsyTopCarriers: 'Top Carriers',
    dossierPlayerCrowns: '#1 Crowns',
    dossierPlayerPodiums: 'Top 3 Podiums',
    dossierPlayerRuns: 'Held Records',
    dossierPlayerBestMane: 'Best Mane Score',
    dossierPlayerBestFb: 'Fastest Flashback',
    dossierPlayerFavCarries: 'Signature Main DPS',
    dossierPlayerHistory: 'Verified Archive Records',
    dossierPlayerSuperseded: 'Superseded History (Unranked · Not Held)',
    dossierSupersededTag: 'Superseded',
    dossierSupersededNote: 'Replaced by a higher score or faster clear with the same lineup; preserved in personal history only and excluded from leaderboards and Hall of Fame.',
    dossierJumpToBoard: 'Jump to Board ↗',
    dossierNoData: 'No archive appearances recorded yet.',
    dossierClickTip: 'Click any Arcanist, Psychube, or Timekeeper name to open their dossier.',

    // V2 Side-by-Side Run Comparison
    compareDockTitle: 'Run Comparison',
    compareBtnOpen: 'Compare Runs',
    compareBtnClear: 'Clear',
    compareSelectSecond: 'Select 1 more record to compare side-by-side',
    compareModalEyebrow: 'SIDE-BY-SIDE ANALYSIS',
    compareModalTitle: 'Record Comparison',
    compareDeltaScore: 'Score Delta',
    compareDeltaRounds: 'Round Delta',
    compareTieResult: 'Tied Result',
    compareSlotHeader: 'Slot / Arcanist',
    comparePsychubeHeader: 'Psychube',
    compareResonanceHeader: 'Resonance Code',
    compareRemove: 'Remove',
    compareMaxReached: 'Comparison dock holds up to 2 records. Remove one to swap.',

    // V2 Daily Active Dates, Rating Simulator & Record Card Theme
    dailyActiveDates: 'Recent Active Dates',
    simTitle: 'Commission Rating Simulator',
    simSubtitle: 'Enter any Investigation Score to preview its official rating, next tier gap, and Collector’s Edition appraisal stage.',
    simPlaceholder: 'Enter score (e.g. 52,000,000)…',
    simYourRating: 'Projected Rating',
    simNextTier: 'Next Tier',
    simNextGap: '{gap} to next tier',
    simMaxTier: 'Maximum Mythic Tier Reached',
    simAppraisalStage: 'Appraisal Stage',
    posterThemeParchment: 'Parchment',
    posterThemeObsidian: 'Obsidian',
    hofCrownsLabel: 'Crowns',
    hofPodiumsLabel: 'Podiums'
  },

  zh: {
    // 顶部栏与品牌
    brandTitleMane: '鬃毛邮报 · 调查总榜',
    brandTitleFb: '焦点闪回 · 纪录档案',
    brandSub: 'REVERSE: 1999 · COMMUNITY ARCHIVE',
    brandGlyphMane: '邮',
    brandGlyphFb: 'Ⅸ',
    brandHomeAria: '返回榜单首页',
    modeSwitcherAria: '榜单模式切换',
    subnavAria: '榜单视图导航',
    modeMane: '鬃毛邮报',
    modeFlashback: '焦点闪回',
    statusOffline: '离线档案 · 本地沙盒',
    statusLive: '实时档案 · 投稿开放',
    statusSyncing: '同步档案库…',
    statusDisconnected: '离线快照',
    btnSyncLive: '同步在线库',
    btnReconnect: '重新连接 ↻',
    btnAdmin: '管理后台',
    btnAdminShort: '后台',
    btnMySubmissions: '我的投稿',
    btnMySubmissionsShort: '进度',
    btnAdminLogin: '管理员登录',
    btnAdminLoginShort: '登录',
    accountAdmin: '管理员账号',
    accountAdminShort: '管理',
    accountUser: '站内账号',
    accountUserShort: '账号',
    btnSubmit: '＋ 投稿成绩',
    btnSubmitShort: '＋ 投稿',
    ctaSubMane: 'SUBMIT ▽▽',
    ctaSubFb: 'CLEAR ▽▽',
    langToggleAria: '切换中英文界面',
    langLabelEn: 'EN',
    langLabelZh: '中文',
    pageTitleMane: '重返未来：1999 · 鬃毛邮报 & 焦点闪回 玩家榜单',
    pageTitleFb: '重返未来：1999 · 焦点闪回 & 鬃毛邮报 玩家榜单',

    // 次级导航
    navScores: '调查积分榜',
    navDaily: '每日新分',
    navTotals: '主 C 总分榜',
    navPlayers: '玩家荣誉殿堂',
    navRules: '投稿与规则',
    navFbLeaderboard: '关卡排行榜',
    navFbCarries: '主 C 排行榜',
    navFbPlayers: '玩家荣誉殿堂',
    navFbRules: '榜单规则',
    subnavMetaMane: 'MANE’S BULLETIN · HIGH SCORE',
    subnavMetaFb: 'FLASHBACK ARCHIVE · MIN ROUNDS',

    // 刊头 Masthead
    maneTitle: '鬃毛邮报',
    maneEnTag: "Mane's Bulletin",
    fbTitle: '焦点闪回',
    fbEnTag: 'Focused Flashback',
    maneMotto: '调查传闻中的离奇事迹，将线索揣进不漏风的兜里。我们为最灵通的消息奉上黄金与盛誉。',
    fbMotto: '三道独立试炼，阵容互不复用。在 0–6 回合极限窗口内打磨各体系的最速解法。',
    metricRecords: '全站有效纪录',
    metricInvestigators: '上榜调查员',
    metricBosses: '鉴藏 / 怪相首领',
    metricSitePeak: '全站最高积分',
    metricHonoredPlayers: '荣耀玩家',
    metricCycles: '收录版本期次',
    metricFastest: '全站最快通关',
    jumpTagPeak: '全站最高',
    jumpTagFastest: '全站最快',
    fbRoundCap: '限定回合上限',
    fbRoundLimitTag: '0–6 回合限定',
    mastheadMetricsAria: '全站档案实时统计',
    fbMetricsAria: '焦点闪回全站统计',
    fbCycleFallback: '焦点闪回周期榜',
    jumpPeakTitle: '点击直达全站最高分所属榜单：{source}',
    jumpFastestTitle: '点击直达最短回合纪录：{source}',
    sitePeakFallback: '全站最高调查积分',
    fbRoundWindowFallback: '限定 0–6 回合',

    // 侧边栏与筛选
    headingSurvey: '调查目标',
    headingSurveyEn: 'SURVEY TARGET',
    headingStageSelect: '试炼关卡',
    headingStageSelectEn: 'STAGE SELECT',
    headingPortrayal: '塑造分组',
    headingPortrayalEn: 'PORTRAY',
    headingLineupFilter: '阵容筛选',
    headingLineupFilterEn: 'LINEUP FILTER',
    headingTopCarries: '热门主 C',
    headingTopCarriesEn: 'TOP CARRIES',
    topCarriesEmpty: '当前分榜暂无主 C 统计。',
    roleCarryOnly: '仅看主 C',
    roleAnyMember: '阵容含该角色',
    allCarriesOption: '全部主 C',
    allMembersOption: '全部角色',
    searchPlaceholderMane: '搜索调查员、角色名或别名…',
    searchPlaceholderFb: '搜索玩家名、角色名或配队…',
    resetFilter: '重置',
    clearFilter: '清空筛选',
    mobileFilterBtn: '筛选与选图',
    filterClose: '完成',
    afflatusAll: '全部',
    afflatusFilterAria: '按灵感快速筛选',
    afflatusOnlyTitle: '仅看{aff}灵感',
    versionSelectLabel: '版本期次',
    sectionLabel: '榜单分区',
    countUnit: '{n} 条',
    sidebarNoteMane: '「鉴藏者特版」收录当期 4.1 版本 3 位首领，支持 500 万至 1 亿分阶梯机制强化。',
    sidebarNoteRerun: '「怪相档案」收录 3.2–4.0 往期目击者特版复刻首领（20 回合制）。',
    sidebarNoteFb: '焦点闪回收录 0–6 回合极限通关纪录；同关卡同塑造同阵容仅保留回合数最少者。',
    btnRefresh: '刷新数据 ↻',
    btnExportExcel: '导出 Excel 表格',
    carryMetricAppearances: '上榜次数',
    carryMetricFirsts: '第一名次数',
    carryScopePeriod: '当期统计',
    carryScopeAll: '历期合计',
    carriesPageTitle: '主 C 排行榜',
    carriesPageSub: '按关卡有效持榜次数与榜首次数综合统计。',

    // 首领头图与机制
    tipsLabel: '调查建议',
    weaknessLabel: '薄弱灵感',
    favoredLabel: '优势灵感',
    appraisalHeading: '沉浸式鉴赏 · 分数阶梯强化',
    appraisalSub: '鉴藏者特版达到指定积分档位时触发的首领强化。',
    btnExpandMech: '展开首领机制 ▾',
    btnCollapseMech: '收起机制 ▴',
    btnExpandStageMech: '展开关卡机制 ▾',
    btnCollapseStageMech: '收起机制 ▴',
    mechEnvLabel: '场地规则 · ENVIRONMENT',
    mechPassivesLabel: '首领核心机制 · BOSS PASSIVES',
    mechThresholdsLabel: '沉浸式鉴赏 · 分数阶梯强化',
    mechFbEnvLabel: '场地条件与可用增幅 · ENVIRONMENT & BUFFS',
    mechFbPassivesLabel: '敌方核心机制 · ENEMY MECHANICS',
    mechEnemiesLabel: '敌方阵容',
    mechAriaMane: '首领核心机制',
    mechAriaFb: '焦点闪回关卡机制',
    turnsUnit: '{n} 回合',
    roundsUnit: '{n} 回合',
    roundsFull: '{n} 回合',
    opensAt: '{time} 开放',
    bossNotOpenYet: '尚未开放',
    bossPeakLabel: '本图最高',
    submitThisBoss: '投稿本图成绩',
    submitThisStage: '投稿本关成绩',
    bossWikiLink: '灰机 Wiki ↗',
    stageWikiLink: '闪回 Wiki ↗',
    bossDossierBadge: '官方怪相档案',

    // 榜单列表与卡片
    colRank: '排名',
    colInvestigator: '调查员',
    colPlayerTime: '玩家 / 时间',
    colLineup: '上阵配队',
    colScoreGrade: '调查积分 / 评级',
    colRounds: '回合数',
    mainDpsLabel: '主 C',
    scoreLabel: '积分',
    viewCardBtn: '纪录卡',
    videoGuideLink: '视频 / 攻略 ↗',
    relatedLink: '相关链接 ↗',
    res10Badge: '共鸣10',
    res10FullBadge: '全0塑 · 共鸣10',
    res10Filter: '仅看共鸣 10',
    buildTagPsy: '心相',
    buildTagRes: '共鸣',
    legacyTeamLabel: '原表配队',
    localRecordTag: '本地沙盒',
    emptyTitleLoading: '正在同步档案库…',
    emptyTitleFiltered: '没有符合筛选条件的纪录',
    emptyTitleEmpty: '当前分榜暂无纪录',
    emptyDescFiltered: '尝试清空搜索关键词、灵感或角色筛选后再查看。',
    emptyDescMane: '欢迎成为本首领与塑造分组的首位投稿调查员。',
    emptyDescFb: '欢迎成为本关卡与塑造分组的首位 0–6 回合速通纪录保持者。',
    emptyActionSubmit: '立即投稿首条纪录',
    boardFootMane: '同地图、同塑造组、同完整角色组合仅保留最高调查积分；同分按提交时间先者居前。',
    boardFootFb: '同关卡、同塑造组、同阵容仅保留最少回合纪录（0–6 回合）；同回合按提交时间先者居前。',
    fbRuleCard1Title: '当期持榜数',
    fbRuleCard1Desc: '统计所选版本期次内各玩家当前仍在榜的有效纪录数。',
    fbRuleCard2Title: '历期持榜总数',
    fbRuleCard2Desc: '汇总各期榜单保留的成绩，同一玩家在重复关卡里的同塑造、同阵容只算一次。',
    editRecordBtn: '编辑',
    rankAria: '第 {rank} 名',

    // 每日新分、主 C 总分、荣誉殿堂、规则与评级阶梯
    dailyTitle: '每日新分',
    dailySubtitle: '按北京时间（UTC+8）汇总当日审核通过的鬃毛邮报新分纪录。',
    dailyToday: '今天',
    dailyYesterday: '昨天',
    dailyDateLabel: '日期（北京时间）',
    dailyAllDivisions: '全部塑造',
    dailyAllMaps: '全部首领',
    dailyCountFoot: '{date} 共收录 {n} 条过审新分',
    dailyEmpty: '当日该筛选条件下暂无新过审纪录。',
    dailyLoading: '正在查询每日新分…',
    dailyOfflineHint: '当前显示本地离线快照中该日期的纪录。',
    dailyJumpBtn: '定位榜单 ↗',
    totalsEyebrow: 'MAIN DPS AGGREGATE',
    totalsTitle: '主 C 总分榜',
    totalsMethodScope: '按所选分区与塑造分组，汇总该主 C 在全部地图中的单图最高纪录之和。',
    totalsMethodZero: '全 0 塑造与全满塑造独立统计，不混算。',
    totalsMethodMerge: '多核心共同主 C 阵容会分别计入每位标注主 C 的对应地图最高分。',
    totalsBreakdownSummary: '计入 {count} 张地图',
    totalsWatchMap: '查看榜单 ↗',
    totalsEmpty: '当前分区与塑造分组暂无主 C 总分统计。',
    playersManeTitle: '鬃毛邮报 · 玩家荣誉殿堂',
    playersFbTitle: '焦点闪回 · 玩家荣誉殿堂',
    playersScopeAll: '全部分区',
    playersScopeNew: '鉴藏者特版',
    playersScopeRerun: '怪相档案',
    playersDivAll: '全部塑造',
    playersFirstChip: '榜首 × {n}',
    playersPodiumChip: '前三 × {n}',
    playersBestScore: '最高单图积分',
    playersHoldings: '当前持榜',
    playersExpandRecords: '展开 {n} 条持榜纪录 ▾',
    playersCollapseRecords: '收起持榜纪录 ▴',
    playersPeriodHoldings: '当期持榜',
    playersAllTimeHoldings: '历期总持榜',
    playersEmpty: '当前筛选条件下暂无上榜玩家。',
    playersManeFoot: '数据实时汇总自当前全部已审核通过的鬃毛邮报持榜纪录。',
    playersFbFoot: '每期按该期榜单保留的成绩计数；历期合计对重复关卡的同塑造同阵容去重。',
    ratingLadderTitle: '最佳委托评级阶梯',
    ratingLadderSub: '鬃毛邮报官方调查积分评级档位（5 万 C 至 1 亿破亿 SSS Ⅳ）。',
    ratingLadderScoreCol: '积分门槛',
    ratingLadderGradeCol: '委托评级',
    rulesManeItems: [
      ['01', '两大分区', '「鉴藏者特版」收录当期版本开放的 3 位首领；「怪相档案」收录往期目击者特版复刻首领。'],
      ['02', '全 0 / 全满塑造分榜', '全 0 塑造与全满塑造独立计分与排名，队伍内所有实际出战角色均需符合所选塑造分组要求。'],
      ['03', '主 C 与完整阵容', '填写 1–4 名不重复的上阵角色；支持共同主 C（用 / 分隔），且所有主 C 必须包含在所填上阵配队内。'],
      ['04', '同队取最高分', '同一地图、同一塑造组、同一完整角色组合仅保留最高调查积分；同分时按服务器提交时间先者居前。'],
      ['05', '截图核验与隐私', '须上传清晰结算截图（支持 PNG/JPG/WebP；超过 5 MB 将自动压缩上传），截图仅本人与审核管理员通过临时签名查看，不对外公开。'],
      ['06', '主 C 总分统计', '主 C 总分榜按分区与塑造分组，汇总该角色在所有地图中的个人最高单图纪录之和，便于横向评估版本表现。']
    ],
    rulesFbItems: [
      ['01', '三个关卡', '每个游戏版本独立设置三个关卡，纪录不会跨版本或关卡比较。'],
      ['02', '两种塑造', '全 0 塑造与全满塑造分榜比较。队伍内所有参战角色必须符合所选塑造组规则。'],
      ['03', '零至六回合', '只能提交 0、1、2、3、4、5、6 回合的有效成绩，须上传通关截图供管理员核验。'],
      ['04', '阵容识别', '提交主 C 与实际上场的完整队伍。相同角色组合视为同队，与角色填写顺序无关；主 C 并不拆分榜单。'],
      ['05', '唯一保持者', '同队仅有回合最少者上榜；同回合数先提交者获胜。以数据库记录的提交时间为准，不受审核顺序影响。'],
      ['06', '上榜次数', '每期按该期榜单保留的成绩计数。同一期内掉榜的成绩从次数中扣除，历期合计对重复关卡的同塑造同阵容去重。']
    ],
    rulesFbNote: '玩法参考：「焦点闪回」是《重返未来：1999》自 3.6 版本推出的周期挑战玩法，具体机制以游戏及 Wiki 对应期次为准；0–6 回合上限、塑造分组与唯一纪录为社区排行榜自定义规则。',

    // 战报分享卡与 PNG 导出
    posterEyebrow: 'ARCHIVE RECORD CARD · 纪录留档',
    posterTitle: '纪录留档卡',
    posterSubtitle: '支持直达原攻略链接、查看心相与一键复制共鸣码，或导出 PNG 纪录图。',
    posterKickerMane: 'MANE’S BULLETIN · 鬃毛邮报',
    posterKickerFb: 'FLASHBACK ARCHIVE · 焦点闪回',
    posterRankLabel: 'RANK',
    posterDailyLabel: '每日',
    posterInvestigator: 'INVESTIGATOR · 调查员',
    posterBuildsHeading: 'PSYCHUBES & RESONANCE · 心相与共鸣配置',
    posterCopyAllRes: '一键复制全队共鸣码（{n}条）',
    posterCopyRes: '复制共鸣码',
    posterNoPsy: '未附带心相',
    posterNoRes: '未附带共鸣码',
    posterNoBuilds: '本条纪录暂未附带心相与共鸣码配置（支持新投稿或管理员编辑补充）。',
    posterEvidenceHasLink: '已附公开通关视频 / 攻略参考',
    posterEvidenceDomain: '来源域名：{host} · 核验结算截图仅本人及管理员可见',
    posterEvidenceOpen: '▶ 打开视频 / 攻略 ↗',
    posterEvidenceNoLink: '本条投稿未附公开视频或攻略链接；核验结算截图按隐私规则仅本人与审核管理员可见。',
    posterBtnSavePng: '保存纪录图 (PNG)',
    posterBtnCopyLink: '复制直达链接',
    posterBtnCopyText: '复制纪录文字',
    posterBtnClose: '关闭',
    posterGenerating: '正在生成纪录图…',
    posterSavedToast: '纪录图 PNG 已保存。',
    posterFileProtocolHint: '提示：本地 file:// 打开时部分浏览器限制画布导出，已尝试新标签页打开或请通过本地预览服务导出。',
    posterRecordedAt: 'RECORDED {date}',
    posterCommunityFooter: 'REVERSE: 1999 COMMUNITY',
    posterRes10Badge: '✦ 全0塑 · 共鸣10',
    posterCopiedLink: '已复制纪录直达链接。',
    posterCopiedText: '已复制纪录文字摘要。',
    posterCopiedRes: '已复制共鸣码。',
    posterCopiedAllRes: '已复制全队 {n} 条共鸣码。',
    posterExportFailed: '纪录图导出失败。',

    // 投稿、选人、选心相、离线沙盒与管理后台
    offlineSubmitNote: '当前为离线沙盒模式：投稿将仅保存在本机浏览器中，不会上传至线上服务器。',
    offlineSubmitSuccess: '已保存至本机离线沙盒榜单！',
    offlineClearLocal: '清空本地沙盒',
    offlineClearedToast: '已清空本机离线沙盒纪录。',
    offlineSyncOk: '已连接实时档案库并同步最新数据。',
    offlineSyncFail: '无法连接线上服务器，已继续使用离线快照。',
    draftRestored: '已为你恢复上次未提交的草稿。',
    clearDraft: '清空草稿',
    slotLabel: '{n}号位',
    slotPickChar: '选角色',
    slotPickPsy: '选心相',
    slotPendingChar: '待选择角色',
    slotOptional: '可留空',
    slotMainDps: '主 C',
    slotMainDpsTitle: '勾选或取消主 C（支持共同主 C）',
    slotMainDpsDisabled: '主 C 需选明确的单名角色',
    slotResPlaceholder: '粘贴 {n} 号位共鸣码（选填）',
    slotClearChar: '清除 {n} 号位角色',
    slotClearPsy: '清除 {n} 号位心相',
    teamBuilderLabel: '上阵角色、主 C 与配装 *（1–4 人，少人解可留空）',
    teamBuilderEmptyHint: '支持 1–4 人（少人解空位留空即可），点选角色并勾选主 C',
    teamBuilderSummary: '已选 {n} 人（支持 1–4 人）· 主 C：{carries}',
    teamBuilderNoCarry: '未勾选（请点击右上角「主 C」）',
    charPickerTitle: '选择 {n} 号位角色',
    charPickerSub: '支持中文名、英文名及常见别名检索；多选可组成灵活替换位。',
    charPickerSearchPlaceholder: '搜索角色中文名、英文名或别名…',
    charPickerAllStars: '全部星级',
    charPickerWildcardHeading: '自由 / 泛用位',
    charPickerMultiHint: '已选 {n} 名（灵活替换位）',
    charPickerConfirm: '确认选择',
    charPickerClear: '清空该位',
    charPickerEmpty: '未找到匹配角色。',
    psyPickerTitle: '选择 {n} 号位心相',
    psyPickerSub: '收录 1.0–4.1 全部 122 张可装备心相，支持按星级、定位标签或词条筛选。',
    psyPickerSearchPlaceholder: '搜索心相名称、英文名或主属性…',
    psyPickerEmpty: '未找到匹配心相。',
    psyPickerClear: '清除心相',
    submitManeTitle: '投稿鬃毛邮报成绩',
    submitManeSub: '提交有效调查积分与配队，支持附带心相与共鸣码。',
    submitFbTitle: '投稿焦点闪回成绩',
    submitFbSub: '提交当前期次 0–6 回合有效通关纪录。',
    editRecordTitle: '编辑纪录',
    fieldBoss: '调查首领',
    fieldStage: '试炼关卡',
    fieldVersion: '版本期次',
    fieldDivision: '塑造分组',
    fieldScore: '调查积分',
    fieldRounds: '通关回合数（0–6）',
    fieldPlayerName: '调查员昵称',
    fieldRelatedUrl: '攻略 / 视频链接（选填）',
    fieldContact: '联系方式（选填）',
    fieldProof: '结算截图（PNG/JPG/WebP，≤ 5 MB · 超大图片自动压缩）',
    fieldProofHint: '仅本人与审核管理员可见，不对外公开。',
    fieldRes10Check: '全队共鸣等级均为共鸣 10',
    submitPortrayLimitNote: '提示：因自由塑造核验难度较高、审核人力有限，目前仅支持「全 0 塑造」与「全满塑造」的成绩投稿，敬请谅解。',
    globalFbNoticeTag: 'GLOBAL SERVER NOTICE',
    globalFbBoardNotice: 'Focused Flashback follows CN server cycles.',
    globalFbBoardCta: "Go to Mane's Bulletin →",
    globalFbSubmitNotice: 'CN Server Only (Focused Flashback).',
    globalFbSubmitCta: "Submit Mane's Bulletin Instead →",
    globalManeNoticeTag: 'GLOBAL SERVER WELCOME',
    globalManeSubmitNotice: "Global server players can submit Mane's Bulletin scores.",
    btnSubmitNow: '提交成绩',
    btnSubmitting: '提交中…',
    btnSaveChanges: '保存修改',
    btnCancel: '取消',
    btnClose: '关闭',

    // 校验错误
    errSlotMissingChar: '第 {n} 号位尚未选择角色，请先点击选择角色，或清空该号位的心相与共鸣码。',
    errSlotNameTooLong: '每个位置的角色名称合计最多 40 字。',
    errDuplicateMember: '上阵阵容中包含重复项「{name}」，请移除重复项。',
    errResTooLong: '单个角色的共鸣码长度不能超过 160 个字符。',
    errTeamCount: '请至少点击选框填入 1 名（最多 4 名）上阵角色。',
    errCarryRequired: '请勾选至少 1 名角色作为「主 C」（多核心可同时勾选多位）。',
    errScoreInvalid: '请输入有效的正整数调查积分。',
    errRoundsInvalid: '回合数必须为 0 至 6 之间的整数。',
    errPlayerRequired: '请填写调查员昵称。',
    errUrlInvalid: '相关链接需以 http:// 或 https:// 开头。',
    errProofRequired: '请上传通关结算截图。',
    errProofType: '仅支持 PNG、JPG 或 WebP 格式截图。',
    errProofSize: '截图自动压缩后仍超过 5 MB，请先适当裁剪分辨率后再上传。',

    // 我的投稿、登录与后台
    mySubTitle: '我的投稿进度',
    mySubEmpty: '暂无投稿记录。',
    mySubOffline: '当前展示本机离线沙盒中的投稿记录。',
    loginTitle: '管理员登录',
    loginSub: '登录管理员账号以审核投稿并管理榜单数据。',
    loginEmail: '邮箱',
    loginPassword: '密码',
    loginBtn: '登录',
    logoutBtn: '退出登录',
    profileTitle: '个人资料',
    profileDisplayName: '展示昵称',
    profileSave: '保存资料',
    adminTitle: '审核与榜单管理后台',
    adminTabPending: '待审核',
    adminTabApproved: '已通过',
    adminTabRejected: '已拒绝',
    adminTabRemoved: '已移除',
    adminTabHistorical: '历史档案',
    adminApprove: '通过',
    adminReject: '拒绝',
    adminDelete: '移除',
    adminEdit: '编辑',
    adminMapsManage: '地图管理',
    adminVersionsManage: '期次管理',
    adminExportExcel: '导出表格',

    // 提示与页脚
    toastRefreshed: '榜单数据已刷新。',
    toastCopied: '已复制到剪贴板。',
    toastCopyFailed: '复制失败，请手动复制。',
    toastSaved: '保存成功。',
    toastSubmitted: '投稿已提交，等待审核。',
    toastOfflineNotice: '当前正在浏览内置离线档案快照，点击「同步在线库」可拉取实时线上数据。',
    footerBrandTitle: 'REVERSE: 1999 · 玩家社区榜单',
    footerBrandSub: '鬃毛邮报调查积分榜 × 焦点闪回最短回合榜',
    footerCredits: '社区榜单由重返未来：1999 玩家社区站长与审核管理员共同维护。',
    footerWikiMane: '灰机 Wiki · 鬃毛邮报 ↗',
    footerWikiFb: '灰机 Wiki · 焦点闪回 ↗',
    footerDisclaimer: '本网站为非官方玩家共建社区项目，与游戏发行方无隶属关系。请勿在成绩截图中暴露个人敏感信息。',

    // V2 列头与榜单情报分析条
    colTactical: '流派 · 峰值',
    colArchetype: '流派',
    intelTitle: '榜单情报分析',
    intelSubtitle: '当前分榜热门主 C、高频辅助、心相分布与成绩区间实时洞察。',
    intelCollapse: '收起情报 ▴',
    intelExpand: '展开情报 ▾',
    intelTopCarries: '热门主 C',
    intelTopSupports: '高频辅助位',
    intelTopPsychubes: '热门心相',
    intelScoreDist: '积分区间分布',
    intelRoundDist: '通关回合分布',
    intelPeakCompare: '0 塑 / 满塑峰值对比',
    intelMedianScore: '中位积分',
    intelAvgRounds: '平均回合',
    intelUsageRate: '出场率',
    intelPeakP0: '全 0 塑最高',
    intelPeakP5: '全满塑最高',
    intelNoData: '当前分榜纪录不足，暂无情报统计。',

    // V2 榜单行战术情报列
    rowPeakRecord: '本榜最高',
    rowVsPeak: '峰值 {pct}%',
    rowAppraisalStage: '鉴赏 {roman} 阶',
    rowAppraisalNone: '未达鉴赏阶梯',
    rowResCodesCount: '{n} 条共鸣码',
    rowWatchGuide: '看攻略 ↗',
    rowCompare: '对比',
    rowComparing: '已选对比 ✓',

    // V2 鉴赏阶梯与状态词典
    appraisalActiveLabel: '当前触发档位',
    appraisalClearedBadge: '已达成',
    appraisalClickHint: '点击档位查看对应首领强化详情',
    counterTipsHeading: '配队与对策要点',
    glossaryHint: '点击任意 [机制词条] 查看官方效果',
    glossaryTitle: '战斗状态与机制词典',
    glossaryClose: '关闭词典',
    glossaryCatPos: '状态增益',
    glossaryCatNeg: '状态异常',
    glossaryCatControl: '控制效果',
    glossaryCatStats: '属性增减',
    glossaryCatSpecial: '特殊 / 体系机制',
    glossaryCatBoss: '首领专属机制',

    // V2 角色 / 心相 / 调查员档案弹窗
    dossierCharEyebrow: '神秘学家档案',
    dossierPsyEyebrow: '心相档案',
    dossierPlayerEyebrow: '调查员履历',
    dossierDmgReality: '现实创伤',
    dossierDmgMental: '精神创伤',
    dossierEuphoria: '已开放狂想',
    dossierVersion: '{ver} 版本实装',
    dossierArchiveStats: '榜单档案数据',
    dossierManeAppearances: '鬃毛邮报上榜',
    dossierFbAppearances: '焦点闪回上榜',
    dossierMainDpsRate: '主 C 占比',
    dossierPeakScore: '鬃毛最高积分',
    dossierFastestClear: '闪回最快通关',
    dossierTopTeammates: '高频搭档队友',
    dossierTopPsychubes: '常用心相配置',
    dossierFilterBoard: '在当前榜单筛选',
    dossierOpenUttu: '灰机 Wiki ↗',
    dossierOpenWiki: '灰机 Wiki ↗',
    dossierPsyStats60: '60 级基础面板',
    dossierPsyAtk: '攻击',
    dossierPsyHp: '生命',
    dossierPsyRDef: '现实防御',
    dossierPsyMDef: '精神防御',
    dossierPsySubStat: '副属性词条',
    dossierPsyPassive: '心相增幅效果',
    dossierPsyUsage: '全站装备次数',
    dossierPsyTopCarriers: '高频适配角色',
    dossierPlayerCrowns: '榜首次数',
    dossierPlayerPodiums: '前三次数',
    dossierPlayerRuns: '有效持榜数',
    dossierPlayerBestMane: '鬃毛最高分',
    dossierPlayerBestFb: '闪回最快回合',
    dossierPlayerFavCarries: '招牌常用主 C',
    dossierPlayerHistory: '全部持榜纪录',
    dossierPlayerSuperseded: '历史被顶替纪录（未上榜 · 不计持榜）',
    dossierSupersededTag: '已被顶替',
    dossierSupersededNote: '以下成绩已被同阵容更高分或更快回合顶替，仅保留在个人档案留念，不在主榜展示，也不计入荣誉殿堂持榜与排名统计。',
    dossierJumpToBoard: '直达所属榜单 ↗',
    dossierNoData: '暂无榜单出场数据。',
    dossierClickTip: '点击任意角色、心相或调查员名称即可查看详情档案。',

    // V2 纪录并排对比
    compareDockTitle: '阵容对比栏',
    compareBtnOpen: '开始对比',
    compareBtnClear: '清空',
    compareSelectSecond: '再选 1 条纪录即可开启并排对比',
    compareModalEyebrow: '并排实战对比',
    compareModalTitle: '纪录阵容对比',
    compareDeltaScore: '分差对比',
    compareDeltaRounds: '回合差',
    compareTieResult: '成绩持平',
    compareSlotHeader: '站位 / 角色',
    comparePsychubeHeader: '装备心相',
    compareResonanceHeader: '共鸣码',
    compareRemove: '移除',
    compareMaxReached: '对比栏最多支持 2 条纪录，请先移除一条再替换。',

    // V2 每日活跃日期、评级试算器与纪录卡主题
    dailyActiveDates: '近期活跃日期',
    simTitle: '委托评级试算器',
    simSubtitle: '输入任意调查积分，实时预览对应官方评级、下一档位分差及鉴藏者特版强化阶段。',
    simPlaceholder: '输入调查积分（如 52000000）…',
    simYourRating: '对应评级',
    simNextTier: '下一评级',
    simNextGap: '距下一档还差 {gap}',
    simMaxTier: '已达最高破亿评级',
    simAppraisalStage: '鉴藏强化档位',
    posterThemeParchment: '羊皮纸典藏',
    posterThemeObsidian: '黑曜夜幕',
    hofCrownsLabel: '榜首',
    hofPodiumsLabel: '前三'
  }
};

export function t(key, vars = {}, lang = getLang()) {
  const active = normalizeLang(lang) || getLang();
  if (active === 'en' && vars && typeof vars === 'object') {
    if ((key === 'roundsFull' || key === 'turnsUnit') && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 Round';
    }
    if (key === 'countUnit' && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 entry';
    }
    if (key === 'rowResCodesCount' && vars.n !== undefined && Number(vars.n) === 1) {
      return '1 Res Code';
    }
    if (key === 'totalsBreakdownSummary' && vars.count !== undefined && Number(vars.count) === 1) {
      return '1 boss tallied';
    }
    if (key === 'dailyCountFoot' && vars.n !== undefined && Number(vars.n) === 1) {
      return `1 approved record on ${vars.date ?? '{date}'}`;
    }
    if (key === 'playersExpandRecords' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'View 1 held record ▾';
    }
    if (key === 'posterCopyAllRes' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'Copy Resonance Code (1)';
    }
    if (key === 'posterCopiedAllRes' && vars.n !== undefined && Number(vars.n) === 1) {
      return 'Copied 1 Resonance Code.';
    }
  }
  const val = DICTS[active]?.[key] ?? DICTS.en[key] ?? key;
  if (typeof val !== 'string') return val;
  if (!vars || typeof vars !== 'object') return val;
  return val.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, name) => (
    vars[name] !== undefined && vars[name] !== null ? String(vars[name]) : match
  ));
}

// ==================== Plural-Aware Count Formatters ====================

export function formatRounds(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 Round' : `${n} Rounds`;
  }
  return `${n} 回合`;
}

export function formatEntries(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 entry' : `${n} entries`;
  }
  return `${n} 条`;
}

export function formatBossCount(n, lang = getLang()) {
  if (isEn(lang)) {
    return Number(n) === 1 ? '1 boss' : `${n} bosses`;
  }
  return `${n} 图`;
}

// ==================== Locale Formatters ====================

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function toValidDate(time) {
  if (!time) return null;
  const d = time instanceof Date ? time : new Date(time);
  return Number.isNaN(d.getTime()) ? null : d;
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

export function formatScore(score, lang = getLang()) {
  if (score === null || score === undefined || score === '') return '—';
  const locale = isEn(lang) ? 'en-US' : 'zh-CN';
  if (typeof score === 'bigint') return score.toLocaleString(locale);
  const str = String(score).replace(/,/g, '').trim();
  if (!str) return '—';
  if (/^-?\d+$/.test(str)) {
    try {
      return BigInt(str).toLocaleString(locale);
    } catch {
      return Number(str).toLocaleString(locale);
    }
  }
  const num = Number(str);
  return Number.isFinite(num) ? num.toLocaleString(locale) : str;
}

export function formatCompactScore(score, lang = getLang()) {
  if (score === null || score === undefined || score === '') return '—';
  const num = typeof score === 'bigint' ? Number(score) : Number(String(score).replace(/,/g, '').trim());
  if (!Number.isFinite(num)) return '—';
  const abs = Math.abs(num);
  const trimZero = (val, digits) => val.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');

  if (isEn(lang)) {
    if (abs >= 1e9) return `${trimZero(num / 1e9, 2)}B`;
    if (abs >= 1e6) return `${trimZero(num / 1e6, abs >= 1e7 ? 1 : 2)}M`;
    if (abs >= 1e3) return `${trimZero(num / 1e3, abs >= 1e5 ? 0 : 1)}K`;
    return formatScore(num, 'en');
  }
  if (abs >= 1e8) return `${trimZero(num / 1e8, 2)}亿`;
  if (abs >= 1e4) return `${trimZero(num / 1e4, abs >= 1e6 ? 0 : 1)}万`;
  return formatScore(num, 'zh');
}

export function formatDateTime(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const y = d.getFullYear();
  const m = d.getMonth();
  const day = d.getDate();
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}, ${y}, ${hh}:${mm}`;
  }
  return `${y}-${pad2(m + 1)}-${pad2(day)} ${hh}:${mm}`;
}

export function formatMonthDay(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const m = d.getMonth();
  const day = d.getDate();
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}`;
  }
  return `${pad2(m + 1)}/${pad2(day)}`;
}

export function formatMonthDayTime(time, lang = getLang()) {
  const d = toValidDate(time);
  if (!d) return '—';
  const m = d.getMonth();
  const day = d.getDate();
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  if (isEn(lang)) {
    return `${EN_MONTHS[m]} ${day}, ${hh}:${mm}`;
  }
  return `${m + 1}月${day}日 ${hh}:${mm}`;
}

export function localizeDivision(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'zero' || k === 'p0') return 'All P0';
    if (k === 'max' || k === 'p5') return 'Max Portray (P5)';
    if (k === 'all' || k === '') return 'All Divisions';
    return String(code ?? '');
  }
  if (k === 'zero' || k === 'p0') return '全 0 塑造';
  if (k === 'max' || k === 'p5') return '全满塑造';
  if (k === 'all' || k === '') return '全部塑造';
  return String(code ?? '');
}

export function localizeDivisionShort(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'zero' || k === 'p0') return 'P0';
    if (k === 'max' || k === 'p5') return 'P5';
    if (k === 'all' || k === '') return 'All';
    return String(code ?? '');
  }
  if (k === 'zero' || k === 'p0') return '全0塑';
  if (k === 'max' || k === 'p5') return '满塑';
  if (k === 'all' || k === '') return '全部';
  return String(code ?? '');
}

export function localizeSection(section, lang = getLang()) {
  const k = String(section ?? '').trim().toLowerCase();
  if (isEn(lang)) {
    if (k === 'new' || k === 'collector') return "Collector's Edition";
    if (k === 'rerun' || k === 'gallery') return 'Anomaly Gallery';
    if (k === 'all' || k === '') return 'All Editions';
    return String(section ?? '');
  }
  if (k === 'new' || k === 'collector') return '鉴藏者特版';
  if (k === 'rerun' || k === 'gallery') return '怪相档案';
  if (k === 'all' || k === '') return '全部分区';
  return String(section ?? '');
}

export function localizeAfflatus(code, lang = getLang()) {
  const k = String(code ?? '').trim().toLowerCase();
  const map = {
    beast:        { en: 'Beast',          zh: '兽' },
    plant:        { en: 'Plant',          zh: '木' },
    star:         { en: 'Star',           zh: '星' },
    mineral:      { en: 'Mineral',        zh: '岩' },
    spirit:       { en: 'Spirit',         zh: '灵' },
    intellect:    { en: 'Intellect',      zh: '智' },
    mineral_star: { en: 'Mineral / Star', zh: '岩/星' },
    unknown:      { en: 'Arcanist',       zh: '秘' }
  };
  const hit = map[k] || map.unknown;
  return isEn(lang) ? hit.en : hit.zh;
}

export function localizeStatus(status, lang = getLang()) {
  const k = String(status ?? '').trim().toLowerCase();
  const map = {
    pending:    { en: 'Pending',    zh: '待审核' },
    approved:   { en: 'Approved',   zh: '已通过' },
    rejected:   { en: 'Rejected',   zh: '已拒绝' },
    removed:    { en: 'Removed',    zh: '已移除' },
    historical: { en: 'Historical', zh: '历史档案' }
  };
  const hit = map[k];
  if (!hit) return String(status ?? '');
  return isEn(lang) ? hit.en : hit.zh;
}

function formatNumericRangeToEn(rangeStr) {
  return String(rangeStr ?? '').replace(/(\d{1,2})\/(\d{1,2})/g, (_, mm, dd) => {
    const idx = Number(mm) - 1;
    const day = Number(dd);
    if (idx >= 0 && idx < 12 && day >= 1 && day <= 31) {
      return `${EN_MONTHS[idx]} ${day}`;
    }
    return `${mm}/${dd}`;
  }).replace(/[–—-]/g, ' – ').replace(/\s{2,}/g, ' ').trim();
}

export function localizeVersionLabel(ver, lang = getLang()) {
  if (!ver) return isEn(lang) ? 'Focused Flashback' : '焦点闪回';
  const rawLabel = typeof ver === 'string' ? ver : String(ver.label || ver.code || '');
  const code = typeof ver === 'object' ? String(ver.code || '') : '';
  if (!isEn(lang)) return rawLabel || code;

  // Example input: "4.1 · 第 7 期（11/07–12/10）"
  const m = rawLabel.match(/([0-9]+\.[0-9]+|S\d+)?\s*[·.\-]?\s*第\s*(\d+)\s*期\s*(?:[（(]([^）)]+)[）)])?/i);
  if (m) {
    const vNum = m[1] || code;
    const cycle = m[2];
    const dates = m[3] ? ` (${formatNumericRangeToEn(m[3])})` : '';
    const vPrefix = vNum ? `v${vNum.replace(/^v/i, '')} · ` : '';
    return `${vPrefix}Cycle ${cycle}${dates}`;
  }

  // Generic cleanup if label contains any Chinese cycle tokens
  let out = rawLabel
    .replace(/第\s*(\d+)\s*期/g, 'Cycle $1')
    .replace(/焦点闪回/g, 'Focused Flashback')
    .replace(/（/g, ' (')
    .replace(/）/g, ')')
    .replace(/(\d{1,2}\/\d{1,2}\s*[–—-]\s*\d{1,2}\/\d{1,2})/g, (seg) => formatNumericRangeToEn(seg))
    .replace(/\s+/g, ' ')
    .trim();

  if (/[\u4e00-\u9fff]/.test(out)) {
    return code ? `v${code.replace(/^v/i, '')} · Focused Flashback` : 'Focused Flashback';
  }
  return out || (code ? `v${code.replace(/^v/i, '')}` : 'Focused Flashback');
}

const STAGE_TERM_MAP = [
  ['额外行动', 'Extra Action'],
  ['马头鱼尾兽', 'Hippocampus'],
  ['卡律布狄斯', 'Charybdis'],
  ['野生斯库拉', 'Wild Scylla'],
  ['斯库拉', 'Scylla'],
  ['金毛羊', 'Golden-Fleeced Ram'],
  ['日熄蝙蝠', 'Eclipse Bat'],
  ['洞知', 'Pursuit'],
  ['余辉', 'Lingering Glow'],
  ['术具', 'Conduit'],
  ['仪式', 'Ultimate'],
  ['电能', 'Dynamo'],
  ['薪血', 'Bloodtithe'],
  ['启示', 'Inspiration'],
  ['升阶', 'Rank Up'],
  ['位移', 'Shift'],
  ['燃烧', 'Burn'],
  ['中毒', 'Poison'],
  ['石化', 'Petrify'],
  ['第一关', 'Stage 1'],
  ['第二关', 'Stage 2'],
  ['第三关', 'Stage 3'],
  ['第1关', 'Stage 1'],
  ['第2关', 'Stage 2'],
  ['第3关', 'Stage 3']
];

const ROMAN_ASCII = { 'Ⅰ': 'I', 'Ⅱ': 'II', 'Ⅲ': 'III', 'Ⅳ': 'IV', 'Ⅴ': 'V', 'Ⅵ': 'VI' };

export function cleanStageDisplayName(name, lang = getLang()) {
  const raw = String(name ?? '').trim();
  const stripped = raw.replace(/^(?:Stage\s*\d+|第[一二三四五六\d]+关|[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ]+|\d+)\s*[·．.\-]\s*/i, '').trim() || raw;
  if (!isEn(lang)) return stripped;
  return localizeStageName(stripped, 'en').replace(/^(?:Stage\s*\d+|[IVX]+)\s*·\s*/i, '').trim();
}

export function localizeStageName(stageOrName, lang = getLang()) {
  const rawName = typeof stageOrName === 'string'
    ? stageOrName
    : String(stageOrName?.name ?? '');
  const stageNo = typeof stageOrName === 'object' && stageOrName !== null
    ? Number(stageOrName.stage_no || stageOrName.stageNo || 0)
    : 0;

  if (!isEn(lang)) return rawName || (stageNo ? `第 ${stageNo} 关` : '');

  let text = rawName.normalize('NFKC').trim();
  if (!text) return stageNo ? `Stage ${stageNo}` : '';

  // Replace full-width Roman numerals and slashes
  text = text.replace(/[ⅠⅡⅢⅣⅤⅥ]/g, (ch) => ROMAN_ASCII[ch] || ch);
  text = text.replace(/[／/]/g, ' / ');
  for (const [cn, en] of STAGE_TERM_MAP) {
    if (text.includes(cn)) {
      text = text.split(cn).join(en);
    }
  }
  text = text.replace(/\s*\/\s*/g, ' / ').replace(/\s*·\s*/g, ' · ').replace(/\s{2,}/g, ' ').trim();

  // Safety fallback if any untranslated CJK remains
  if (/[\u4e00-\u9fff]/.test(text)) {
    if (stageNo === 1) return 'I · Pursuit / Extra Action';
    if (stageNo === 2) return 'II · Lingering Glow / Ultimate';
    if (stageNo === 3) return 'III · Conduit / Ultimate';
    return stageNo ? `Stage ${stageNo}` : text.replace(/[\u4e00-\u9fff]+/g, '').trim() || 'Flashback Stage';
  }
  return text;
}

export function localizeIssueMeta(meta = globalThis.LEADERBOARD_CONFIG?.issueMeta, lang = getLang()) {
  const src = meta || {
    version: '4.1',
    title: '亚特兰蒂斯谋杀案',
    titleEn: 'Murder on Atlantis',
    period: '11/05 – 12/10',
    periodEn: 'Nov 5 – Dec 10'
  };
  const version = String(src.version || '4.1');
  if (isEn(lang)) {
    const title = src.titleEn || 'Murder on Atlantis';
    const period = src.periodEn || formatNumericRangeToEn(src.period || '11/05 – 12/10');
    return {
      version,
      title,
      period,
      fullLabel: `v${version.replace(/^v/i, '')} · ${title} (${period})`
    };
  }
  const title = src.title || '亚特兰蒂斯谋杀案';
  const period = src.period || '11/05 – 12/10';
  return {
    version,
    title,
    period,
    fullLabel: `${version} · ${title}（${period}）`
  };
}
