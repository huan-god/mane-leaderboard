import { registerDict } from './i18n.js';
import { registerBossMechanics } from './boss-mechanics.js';
import { registerStatusGlossary } from './data/status-glossary.js';
import { registerPsychubeLore } from './psychubes.js';

const loadedLangs = new Set();
const inflightByLang = new Map();

function normalizePackLang(raw) {
  const val = String(raw ?? '').trim().toLowerCase();
  return val.startsWith('en') ? 'en' : 'zh';
}

function getAssetVersion() {
  return String(
    globalThis.LEADERBOARD_CONFIG?.assetVersion ||
    globalThis.__R1999_ASSET_VER__ ||
    ''
  ).trim();
}

function withVersion(relPath) {
  const ver = getAssetVersion();
  return ver ? `${relPath}?v=${encodeURIComponent(ver)}` : relPath;
}

export function isLangPackLoaded(lang) {
  return loadedLangs.has(normalizePackLang(lang));
}

function applyLangPackData(lang, data) {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid language pack payload for ${lang}`);
  }
  if (data.dict) registerDict(lang, data.dict);
  if (data.maneMechanics || data.fbMechanics) {
    registerBossMechanics(lang, data.maneMechanics, data.maneEnToCn, data.fbMechanics);
  }
  if (Array.isArray(data.glossary)) {
    registerStatusGlossary(lang, data.glossary);
  }
  if (data.psychubeLore) {
    registerPsychubeLore(lang, data.psychubeLore);
  }
  loadedLangs.add(lang);
}

export async function ensureLangPack(rawLang) {
  const lang = normalizePackLang(rawLang);
  if (loadedLangs.has(lang)) return;
  if (inflightByLang.has(lang)) return inflightByLang.get(lang);

  const promise = (async () => {
    let data = null;
    if (globalThis.__R1999_BOOT_LANG__ === lang && globalThis.__R1999_LANG_PROMISE__) {
      try {
        data = await globalThis.__R1999_LANG_PROMISE__;
      } catch {
        data = null;
      }
    }
    if (!data) {
      const resp = await fetch(withVersion(`./data/lang-${lang}.json`), { cache: 'default' });
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} loading lang-${lang}.json`);
      }
      data = await resp.json();
    }
    applyLangPackData(lang, data);
  })().finally(() => {
    inflightByLang.delete(lang);
  });

  inflightByLang.set(lang, promise);
  return promise;
}
