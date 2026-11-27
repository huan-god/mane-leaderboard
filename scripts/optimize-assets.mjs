import http from 'node:http';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';

const ROOT_DIR = 'C:\\Users\\Lenovo\\.t3\\scratch\\2026-11-25-870d565e\\reverse1999-global-leaderboard';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const JOBS = [];

function addJob(srcRel, dstRel, maxDim, quality, onlyIfLargerThan = 0) {
  const full = path.join(ROOT_DIR, srcRel);
  if (!fsSync.existsSync(full)) return;
  const size = fsSync.statSync(full).size;
  if (onlyIfLargerThan && size <= onlyIfLargerThan) return;
  JOBS.push({ srcRel, dstRel, maxDim, quality, origBytes: size });
}

for (const name of ['global_c', 'global_b', 'global_a', 'global_s', 'global_ss', 'global_sss1', 'global_sss2', 'global_sss3', 'global_sss4']) {
  addJob(`assets/grades/${name}.png`, `assets/grades/${name}.webp`, 128, 0.84);
}
for (const name of ['fb_stage1', 'fb_stage2', 'fb_stage3', 'fb_scylla', 'fb_hippocampus']) {
  addJob(`assets/bosses/${name}.png`, `assets/bosses/${name}.webp`, 840, 0.80);
}
for (const f of fsSync.readdirSync(path.join(ROOT_DIR, 'assets/bosses'))) {
  if (/^global_.*_dossier\.png$/i.test(f)) {
    addJob(`assets/bosses/${f}`, `assets/bosses/${f.replace(/\.png$/i, '.webp')}`, 640, 0.80);
  }
}
for (const s of [2, 3, 4, 5, 6]) {
  addJob(`assets/uttu/bg_pz00${s}.png`, `assets/uttu/bg_pz00${s}.webp`, 160, 0.84);
}
addJob('assets/official/rank-row-bg.png', 'assets/official/rank-row-bg.webp', 760, 0.82);
addJob('assets/official/ranking-bg.png', 'assets/official/ranking-bg.webp', 760, 0.82);
addJob('assets/official/pop-light.png', 'assets/official/pop-light.webp', 320, 0.82);
addJob('assets/official/btn-bg.png', 'assets/official/btn-bg.webp', 320, 0.82);
addJob('assets/official/content-bg.png', 'assets/official/content-bg.webp', 960, 0.82);
addJob('assets/official/share-card-frame.png', 'assets/official/share-card-frame.webp', 960, 0.82);

for (const s of [4, 5, 6]) {
  addJob(`assets/psychubes/bg_${s}.webp`, `assets/psychubes/bg_${s}.webp`, 128, 0.84, 8 * 1024);
}
for (const i of [1, 2, 3]) {
  addJob(`assets/bosses/v4a1_boss${i}_wide.webp`, `assets/bosses/v4a1_boss${i}_wide.webp`, 720, 0.78, 50 * 1024);
}
for (const f of fsSync.readdirSync(path.join(ROOT_DIR, 'assets/portraits'))) {
  if (f.endsWith('.webp')) {
    addJob(`assets/portraits/${f}`, `assets/portraits/${f}`, 220, 0.80, 30 * 1024);
  }
}

console.log(`[opt] Queued ${JOBS.length} images for WebP optimization...`);

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://127.0.0.1');
  if (u.pathname === '/__worker.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><html><body></body></html>');
    return;
  }
  const rel = decodeURIComponent(u.pathname).replace(/^\/+/, '');
  const full = path.join(ROOT_DIR, rel);
  if (!full.startsWith(ROOT_DIR)) { res.writeHead(403); return res.end(); }
  try {
    const data = await fs.readFile(full);
    const mime = full.endsWith('.png') ? 'image/png' : 'image/webp';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end();
  }
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
const userDataDir = path.join(os.tmpdir(), `r1999-imgopt-${Date.now()}`);
await fs.mkdir(userDataDir, { recursive: true });

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', `--user-data-dir=${userDataDir}`, `${baseUrl}/__worker.html`
], { stdio: ['ignore', 'pipe', 'pipe'] });

let wsBrowserUrl = '';
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Chrome timeout')), 15000);
  const onData = (d) => {
    const m = d.toString().match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (m) { wsBrowserUrl = m[1]; clearTimeout(timer); resolve(); }
  };
  chrome.stderr.on('data', onData);
  chrome.stdout.on('data', onData);
});

const targets = await (await fetch(wsBrowserUrl.replace('ws://', 'http://').replace(/\/devtools\/browser\/.*/, '/json/list'))).json();
const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let msgId = 1;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
  }
});
const cdp = (method, params = {}) => new Promise((resolve, reject) => {
  const id = msgId++;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evalJs = async (expression) => {
  const res = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (res.exceptionDetails) throw new Error(res.exceptionDetails.exception?.description || 'Eval error');
  return res.result?.value;
};

let totalBefore = 0;
let totalAfter = 0;

try {
  await cdp('Runtime.enable');
  for (const job of JOBS) {
    const encoded = await evalJs(`(async () => {
      const img = new Image();
      img.src = ${JSON.stringify(`${baseUrl}/${job.srcRel}`)};
      await img.decode();
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      const maxDim = ${job.maxDim};
      const scale = Math.min(1, maxDim / Math.max(nw, nh));
      const w = Math.max(1, Math.round(nw * scale));
      const h = Math.max(1, Math.round(nh * scale));
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = c.toDataURL('image/webp', ${job.quality});
      return { w, h, nw, nh, b64: dataUrl.split(',')[1] };
    })()`);

    const buf = Buffer.from(encoded.b64, 'base64');
    const dstFull = path.join(ROOT_DIR, job.dstRel);
    const srcFull = path.join(ROOT_DIR, job.srcRel);

    if (job.srcRel === job.dstRel && buf.length >= job.origBytes) {
      totalBefore += job.origBytes;
      totalAfter += job.origBytes;
      console.log(`  [keep] ${job.srcRel}: kept original ${(job.origBytes / 1024).toFixed(1)} KB`);
      continue;
    }

    await fs.writeFile(dstFull, buf);
    if (job.srcRel !== job.dstRel) {
      await fs.rm(srcFull, { force: true });
    }
    totalBefore += job.origBytes;
    totalAfter += buf.length;
    console.log(`  [opt]  ${job.srcRel} (${encoded.nw}x${encoded.nh} ${(job.origBytes/1024).toFixed(1)}KB) -> ${job.dstRel} (${encoded.w}x${encoded.h} ${(buf.length/1024).toFixed(1)}KB)`);
  }
  console.log(`\n[opt] DONE: ${(totalBefore/1024).toFixed(1)} KB -> ${(totalAfter/1024).toFixed(1)} KB (-${(((totalBefore - totalAfter)/totalBefore)*100).toFixed(1)}%)`);
} finally {
  try { ws.close(); } catch {}
  try { chrome.kill(); } catch {}
  server.close();
  await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
}
