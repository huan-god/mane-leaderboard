import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { DICTS } from '../src-data/i18n-dicts.js';
import {
  MANE_BOSS_MECHANICS,
  MANE_BOSS_EN_TO_CN,
  FLASHBACK_STAGE_MECHANICS
} from '../src-data/boss-mechanics-data.js';
import { STATUS_GLOSSARY } from '../src-data/status-glossary-data.js';
import { PSYCHUBE_LORE } from '../src-data/psychube-lore-data.js';
import { OFFLINE_SNAPSHOT } from '../data/offline-snapshot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function findCachedEsbuildMain() {
  const candidates = [];
  if (process.env.LOCALAPPDATA) {
    candidates.push(path.join(process.env.LOCALAPPDATA, 'npm-cache', '_npx'));
  }
  candidates.push(path.join(os.homedir(), '.npm', '_npx'));

  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const esbuildMain = path.join(dir, ent.name, 'node_modules', 'esbuild', 'lib', 'main.js');
      if (fs.existsSync(esbuildMain)) return esbuildMain;
    }
  }
  return null;
}

async function loadEsbuild() {
  try {
    return await import('esbuild');
  } catch {
    // Not in local node_modules; check npx cache next
  }

  const cached = findCachedEsbuildMain();
  if (cached) {
    return await import(pathToFileURL(cached).href);
  }

  const npxCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
  if (!fs.existsSync(npxCli)) {
    throw new Error(`Could not locate npx-cli.js at ${npxCli}`);
  }

  console.log('[build] Bootstrapping esbuild into npx cache...');
  execFileSync(
    process.execPath,
    [npxCli, '--yes', 'esbuild', '--version'],
    {
      cwd: ROOT_DIR,
      stdio: 'inherit'
    }
  );

  const afterCache = findCachedEsbuildMain();
  if (afterCache) {
    return await import(pathToFileURL(afterCache).href);
  }
  throw new Error('esbuild was downloaded via npx-cli.js, but its cache directory could not be located.');
}

const stripQueryStringsPlugin = {
  name: 'strip-relative-query-strings',
  setup(build) {
    build.onResolve({ filter: /^\.\.?\/.*\?/ }, (args) => {
      const cleanRel = args.path.split('?')[0];
      const resolved = path.resolve(args.resolveDir, cleanRel);
      return { path: resolved };
    });
  }
};

function buildLangPack(lang) {
  const isEn = lang === 'en';
  const maneMechanics = {};
  for (const [bossKey, entry] of MANE_BOSS_MECHANICS.entries()) {
    if (!entry || typeof entry !== 'object') continue;
    maneMechanics[bossKey] = isEn
      ? {
          turns: entry.turns,
          nameEn: entry.nameEn,
          modeTag: entry.modeTagEn || '',
          battlefield: entry.battlefieldEn || '',
          favoredText: entry.favoredTextEn || '',
          envRules: entry.envRulesEn || [],
          passives: entry.passivesEn || [],
          counterTips: entry.counterTipsEn || [],
          thresholds: entry.thresholdsEn || []
        }
      : {
          turns: entry.turns,
          nameEn: entry.nameEn,
          modeTag: entry.modeTag || '',
          battlefield: entry.battlefield || '',
          favoredText: entry.favoredText || '',
          envRules: entry.envRules || [],
          passives: entry.passives || [],
          counterTips: entry.counterTips || [],
          thresholds: entry.thresholds || []
        };
  }

  const fbMechanics = FLASHBACK_STAGE_MECHANICS.map((item) => (
    isEn
      ? {
          match: item.match,
          stageNo: item.stageNo,
          code: item.code,
          name: item.nameEn || '',
          modeTag: item.modeTagEn || '',
          enemies: item.enemiesEn || '',
          envRules: item.envRulesEn || [],
          passives: item.passivesEn || [],
          counterTips: item.counterTipsEn || []
        }
      : {
          match: item.match,
          stageNo: item.stageNo,
          code: item.code,
          name: item.nameCn || '',
          modeTag: item.modeTag || '',
          enemies: item.enemies || '',
          envRules: item.envRules || [],
          passives: item.passives || [],
          counterTips: item.counterTips || []
        }
  ));

  const glossary = STATUS_GLOSSARY.map((entry) => ({
    key: entry.key,
    en: entry.en,
    zh: entry.zh,
    aliases: entry.aliases || [],
    category: entry.category,
    desc: isEn ? (entry.descEn || '') : (entry.descZh || '')
  }));

  const psychubeLore = {};
  for (const [id, lore] of Object.entries(PSYCHUBE_LORE)) {
    psychubeLore[id] = {
      passive: isEn ? (lore.passiveEn || '') : (lore.passiveZh || ''),
      subStat: isEn ? (lore.subStatEn || '') : (lore.subStatZh || '')
    };
  }

  return {
    lang,
    dict: DICTS[lang] || {},
    maneMechanics,
    maneEnToCn: Object.fromEntries(MANE_BOSS_EN_TO_CN.entries()),
    fbMechanics,
    glossary,
    psychubeLore
  };
}

function reportArtifact(relPath) {
  const full = path.join(ROOT_DIR, relPath);
  const buf = fs.readFileSync(full);
  const gz = zlib.gzipSync(buf, { level: 9 });
  console.log(
    `[build] ${relPath.padEnd(28)} ${(buf.length / 1024).toFixed(1).padStart(7)} KB  (gzip ${(gz.length / 1024).toFixed(1).padStart(6)} KB)`
  );
}

async function main() {
  const t0 = Date.now();
  const esbuild = await loadEsbuild();
  const dataDir = path.join(ROOT_DIR, 'data');
  fs.mkdirSync(dataDir, { recursive: true });

  // 1. Emit compact split language JSON packs + detached offline snapshot JSON
  for (const lang of ['zh', 'en']) {
    const outJson = path.join(dataDir, `lang-${lang}.json`);
    fs.writeFileSync(outJson, JSON.stringify(buildLangPack(lang)), 'utf8');
  }
  fs.writeFileSync(path.join(dataDir, 'offline-snapshot.json'), JSON.stringify(OFFLINE_SNAPSHOT), 'utf8');

  // 2. Minified core bundle + lazy OCR bundle
  const jsOpts = {
    bundle: true,
    minify: true,
    treeShaking: true,
    format: 'iife',
    target: ['es2022'],
    platform: 'browser',
    charset: 'utf8',
    legalComments: 'none',
    logLevel: 'warning',
    plugins: [stripQueryStringsPlugin]
  };

  await esbuild.build({
    ...jsOpts,
    entryPoints: [path.join(ROOT_DIR, 'app.js')],
    outfile: path.join(ROOT_DIR, 'app.bundle.js')
  });

  await esbuild.build({
    ...jsOpts,
    entryPoints: [path.join(ROOT_DIR, 'ocr-entry.js')],
    outfile: path.join(ROOT_DIR, 'ocr.bundle.js')
  });

  await esbuild.build({
    ...jsOpts,
    entryPoints: [path.join(ROOT_DIR, 'supabase-entry.js')],
    outfile: path.join(ROOT_DIR, 'supabase.bundle.js')
  });

  // 3. Concatenated & minified CSS bundle
  const stylesSrc = fs.readFileSync(path.join(ROOT_DIR, 'styles.css'), 'utf8');
  const progressSrc = fs.readFileSync(path.join(ROOT_DIR, 'submission-progress.css'), 'utf8');
  const cssOut = await esbuild.transform(`${stylesSrc}\n${progressSrc}`, {
    loader: 'css',
    minify: true,
    charset: 'utf8',
    legalComments: 'none'
  });
  fs.writeFileSync(path.join(ROOT_DIR, 'styles.bundle.css'), cssOut.code, 'utf8');

  console.log(`[build] Completed all artifacts in ${Date.now() - t0}ms:`);
  reportArtifact('app.bundle.js');
  reportArtifact('ocr.bundle.js');
  reportArtifact('supabase.bundle.js');
  reportArtifact('styles.bundle.css');
  reportArtifact('data/lang-zh.json');
  reportArtifact('data/lang-en.json');
  reportArtifact('data/offline-snapshot.json');
}

main().catch((err) => {
  console.error('[build] Failed:', err);
  process.exit(1);
});
