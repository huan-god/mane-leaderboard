import {mapSamples, digitSamples, portraitSamples, psychubeSamples} from './mane-screenshot-signatures.js?v=20261123-readout';

const frameWidth = 1600;
const frameHeight = 900;
const targetAspectRatio = frameWidth / frameHeight;
const titleRegion = [1172, 73, 314, 62];
const scoreRegion = [175, 407, 611, 87];
const cardCenters = [266, 426, 586, 746];
const portraitRegion = (x) => [x - 45, 559, 90, 146];
const psychubeRegion = (x) => [x - 13, 801, 26, 25];

function clampRegion([left, top, width, height]) {
  const x0 = Math.max(0, Math.round(left));
  const y0 = Math.max(0, Math.round(top));
  const x1 = Math.min(frameWidth, Math.round(left + width));
  const y1 = Math.min(frameHeight, Math.round(top + height));
  const w = x1 - x0;
  const h = y1 - y0;
  return w > 0 && h > 0 ? [x0, y0, w, h] : null;
}

function pixelsOf(context, region) {
  const box = clampRegion(region);
  if (!box) return null;
  return context.getImageData(...box);
}

// Keep only a small grid of color or foreground measurements from each crop.
function signature(context, region, columns, rows, threshold = null) {
  const imgData = pixelsOf(context, region);
  if (!imgData) return null;
  const {data, width, height} = imgData;
  const channels = threshold === null ? 3 : 1;
  const values = [];
  for (let row = 0; row < rows; row++) {
    const y0 = Math.floor(row * height / rows);
    const y1 = Math.max(y0 + 1, Math.floor((row + 1) * height / rows));
    for (let column = 0; column < columns; column++) {
      const x0 = Math.floor(column * width / columns);
      const x1 = Math.max(x0 + 1, Math.floor((column + 1) * width / columns));
      const sums = [0, 0, 0];
      const size = (x1 - x0) * (y1 - y0);
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const p = (y * width + x) * 4;
          if (channels === 1) {
            sums[0] += Math.min(data[p], data[p + 1], data[p + 2]) >= threshold ? 255 : 0;
          } else {
            for (let channel = 0; channel < channels; channel++) sums[channel] += data[p + channel];
          }
        }
      }
      for (let channel = 0; channel < channels; channel++) {
        values.push(Math.round(sums[channel] / size / 17));
      }
    }
  }
  return values;
}

function sampleDistance(values, sample) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) sum += Math.abs(values[i] - Number.parseInt(sample[i], 16));
  return sum / values.length;
}

function bestMatchWithScore(bestByLabel, maximumError, minimumGap) {
  const [best, second] = [...bestByLabel.entries()].sort((a, b) => a[1] - b[1]);
  if (!best || best[1] > maximumError) return null;
  if (second && second[1] - best[1] < minimumGap) return null;
  return {label: best[0], error: best[1]};
}

function bestMatch(bestByLabel, maximumError, minimumGap) {
  return bestMatchWithScore(bestByLabel, maximumError, minimumGap)?.label ?? '';
}

function closestWithError(values, samples, maximumError, minimumGap) {
  if (!values) return null;
  const bestByLabel = new Map();
  for (const [label, sample] of samples) {
    const error = sampleDistance(values, sample);
    bestByLabel.set(label, Math.min(error, bestByLabel.get(label) ?? Infinity));
  }
  return bestMatchWithScore(bestByLabel, maximumError, minimumGap);
}

function closest(values, samples, maximumError, minimumGap) {
  return closestWithError(values, samples, maximumError, minimumGap)?.label ?? '';
}

function foregroundRatio(context, region, threshold) {
  const imgData = pixelsOf(context, region);
  if (!imgData) return 0;
  const {data} = imgData;
  let count = 0;
  const total = data.length / 4;
  for (let p = 0; p < data.length; p += 4) {
    if (Math.min(data[p], data[p + 1], data[p + 2]) >= threshold) count++;
  }
  return total ? count / total : 0;
}

function readPortrait(context, center, shiftX = 0, shiftY = 0) {
  const [rawLeft, rawTop, width, height] = portraitRegion(center);
  const left = rawLeft + shiftX;
  const top = rawTop + shiftY;
  const centered = closest(signature(context, [left, top, width, height], 6, 9), portraitSamples, 1.25, 1.35);
  if (centered) return centered;

  const bestByLabel = new Map();
  const offsets = [-12, -6, 0, 6, 12];
  for (const dx of offsets) {
    for (const dy of offsets) {
      const values = signature(context, [left + dx, top + dy, width, height], 6, 9);
      if (!values) continue;
      for (const [label, sample] of portraitSamples) {
        const error = sampleDistance(values, sample);
        bestByLabel.set(label, Math.min(error, bestByLabel.get(label) ?? Infinity));
      }
    }
  }
  return bestMatch(bestByLabel, 2.25, 0.5);
}

function readPsychube(context, center, shiftX = 0, shiftY = 0) {
  const [rawLeft, rawTop, width, height] = psychubeRegion(center);
  const left = rawLeft + shiftX;
  const top = rawTop + shiftY;
  const centered = closest(signature(context, [left, top, width, height], 6, 6), psychubeSamples, 1.35, 1.1);
  if (centered) return centered;

  const bestByLabel = new Map();
  for (const dx of [-6, -3, 0, 3, 6]) {
    for (const dy of [-6, -3, 0, 3, 6]) {
      if (dx === 0 && dy === 0) continue;
      const values = signature(context, [left + dx, top + dy, width, height], 6, 6);
      if (!values) continue;
      for (const [label, sample] of psychubeSamples) {
        const error = sampleDistance(values, sample);
        bestByLabel.set(label, Math.min(error, bestByLabel.get(label) ?? Infinity));
      }
    }
  }
  return bestMatch(bestByLabel, 1.45, 0.9);
}

function digitRegions(context, threshold) {
  const [left, top, width, height] = scoreRegion;
  const imgData = pixelsOf(context, scoreRegion);
  if (!imgData) return [];
  const {data} = imgData;
  const bounds = Array.from({length: width}, (_, x) => {
    let count = 0;
    let first = height;
    let last = 0;
    for (let y = 0; y < height; y++) {
      const p = (y * width + x) * 4;
      if (Math.min(data[p], data[p + 1], data[p + 2]) < threshold) continue;
      count++;
      first = Math.min(first, y);
      last = Math.max(last, y);
    }
    return {count, first, last};
  });

  const regions = [];
  let start = -1;
  for (let x = 0; x <= width; x++) {
    if ((bounds[x]?.count ?? 0) > 1) {
      if (start < 0) start = x;
      continue;
    }
    if (start < 0) continue;
    const run = bounds.slice(start, x);
    const first = Math.min(...run.map((column) => column.first));
    const last = Math.max(...run.map((column) => column.last));
    const glyphWidth = x - start;
    const glyphHeight = last - first + 1;
    if (glyphWidth >= 7 && first <= 22 && glyphHeight >= 56) {
      regions.push([left + start, top + first, glyphWidth, glyphHeight]);
    }
    start = -1;
  }
  return regions;
}

function alignedDigitRegions(length) {
  const pitch = 52.4;
  const comma = 26.2;
  const commas = Math.floor((length - 1) / 3);
  const span = (length - 1) * pitch + commas * comma;
  return Array.from({length}, (_, i) => {
    const precedingCommas = commas - Math.floor((length - 1 - i) / 3);
    const center = 504 - span / 2 + i * pitch + precedingCommas * comma;
    return [Math.round(center - 26), 416, 52, 76];
  });
}

function readScoreExact(context, threshold) {
  const visible = digitRegions(context, threshold);
  if (!visible.length) return '';
  const first = visible[0][0];
  const last = visible.at(-1)[0] + visible.at(-1)[2];
  const candidates = [];
  for (let length = 1; length <= 10; length++) {
    const regions = alignedDigitRegions(length);
    const left = regions[0][0];
    const right = regions.at(-1)[0] + regions.at(-1)[2];
    if (first < left - 6 || last > right + 6 || first - left > 23 || right - last > 23) continue;

    const score = regions.map((region) =>
      closest(signature(context, region, 13, 18, threshold), digitSamples, 2.2, 0.48) || '?'
    ).join('');
    if (/^[1-9]\d*$/.test(score)) candidates.push(score);
  }
  return candidates.length === 1 ? candidates[0] : '';
}

function alignedDigitRegionsScaled(length, centerX, topY, scale) {
  const pitch = 52.4 * scale;
  const comma = 26.2 * scale;
  const boxW = Math.max(12, Math.round(52 * scale));
  const boxH = Math.max(24, Math.round(76 * scale));
  const commas = Math.floor((length - 1) / 3);
  const span = (length - 1) * pitch + commas * comma;
  const y = Math.round(topY);
  return Array.from({length}, (_, i) => {
    const precedingCommas = commas - Math.floor((length - 1 - i) / 3);
    const center = centerX - span / 2 + i * pitch + precedingCommas * comma;
    return [Math.round(center - boxW / 2), y, boxW, boxH];
  });
}

function readScoreAdaptive(context, threshold) {
  const searchRegion = [110, 350, 760, 190];
  const [sLeft, sTop, sWidth, sHeight] = searchRegion;
  const searchImg = pixelsOf(context, searchRegion);
  if (!searchImg) return null;
  const {data} = searchImg;

  // Locate the strongest horizontal text band corresponding to score digits.
  const rowCounts = new Int32Array(sHeight);
  for (let y = 0; y < sHeight; y++) {
    let rowCount = 0;
    const rowBase = y * sWidth * 4;
    for (let x = 0; x < sWidth; x++) {
      const p = rowBase + x * 4;
      if (Math.min(data[p], data[p + 1], data[p + 2]) >= threshold) rowCount++;
    }
    rowCounts[y] = rowCount;
  }

  let bestBand = null;
  let y = 0;
  while (y < sHeight) {
    if (rowCounts[y] < 8) { y++; continue; }
    const startY = y;
    let totalInk = 0;
    while (y < sHeight && rowCounts[y] >= 8) {
      totalInk += rowCounts[y];
      y++;
    }
    const bandH = y - startY;
    if (bandH >= 40 && bandH <= 98 && (!bestBand || totalInk > bestBand.totalInk)) {
      bestBand = {startY, endY: y - 1, bandH, totalInk};
    }
  }
  if (!bestBand) return null;

  const bandY0 = Math.max(0, bestBand.startY - 3);
  const bandY1 = Math.min(sHeight, bestBand.endY + 4);
  const bandSpanH = bandY1 - bandY0;

  const colStats = Array.from({length: sWidth}, (_, x) => {
    let count = 0;
    let first = bandSpanH;
    let last = 0;
    for (let yy = bandY0; yy < bandY1; yy++) {
      const p = (yy * sWidth + x) * 4;
      if (Math.min(data[p], data[p + 1], data[p + 2]) < threshold) continue;
      count++;
      const relY = yy - bandY0;
      first = Math.min(first, relY);
      last = Math.max(last, relY);
    }
    return {count, first, last};
  });

  const components = [];
  let start = -1;
  for (let x = 0; x <= sWidth; x++) {
    if ((colStats[x]?.count ?? 0) > 1) {
      if (start < 0) start = x;
      continue;
    }
    if (start < 0) continue;
    const run = colStats.slice(start, x);
    const first = Math.min(...run.map((c) => c.first));
    const last = Math.max(...run.map((c) => c.last));
    const w = x - start;
    const h = last - first + 1;
    if (h >= Math.max(36, bestBand.bandH * 0.62) && w >= 5 && w <= bestBand.bandH * 1.15) {
      components.push({
        left: sLeft + start,
        right: sLeft + x,
        top: sTop + bandY0 + first,
        height: h
      });
    }
    start = -1;
  }

  if (components.length < 4 || components.length > 10) return null;

  const heights = components.map((c) => c.height).sort((a, b) => a - b);
  const medH = heights[Math.floor(heights.length / 2)];
  if (medH < 36 || medH > 96) return null;

  const estScale = Math.max(0.55, Math.min(1.25, (medH / 0.90) / 76));
  const candidateScales = Math.abs(estScale - 1.0) <= 0.05 ? [1.0] : [estScale, 1.0];
  const firstX = components[0].left;
  const lastX = components.at(-1).right;
  const rawSpan = lastX - firstX;
  const centerX = (firstX + lastX) / 2;
  const tops = components.map((c) => c.top).sort((a, b) => a - b);
  const medTop = tops[Math.floor(tops.length / 2)];

  const lengthSet = new Set();
  for (const cand of [components.length - 1, components.length, components.length + 1]) {
    if (cand >= 4 && cand <= 10) lengthSet.add(cand);
  }

  let best = null;
  for (const scale of candidateScales) {
    const baseTop = medTop - Math.round(4 * scale);
    for (const length of lengthSet) {
      const baseRegions = alignedDigitRegionsScaled(length, centerX, baseTop, scale);
      const predSpan = (baseRegions.at(-1)[0] + baseRegions.at(-1)[2]) - baseRegions[0][0];
      if (Math.abs(predSpan - rawSpan) > 64 * scale) continue;

      for (const dx of [-16, -8, -4, 0, 4, 8, 16]) {
        for (const dy of [-5, 0, 5]) {
          const regions = alignedDigitRegionsScaled(length, centerX + dx, baseTop + dy, scale);
          let totalErr = 0;
          let digits = '';
          let ok = true;
          for (const region of regions) {
            const match = closestWithError(
              signature(context, region, 13, 18, threshold),
              digitSamples,
              2.25,
              0.44
            );
            if (!match) {
              ok = false;
              break;
            }
            digits += match.label;
            totalErr += match.error;
          }
          if (!ok || !/^[1-9]\d{3,9}$/.test(digits)) continue;
          const meanErr = totalErr / length;
          if (!best || meanErr < best.meanErr) {
            best = {score: digits, cx: centerX + dx, topY: baseTop + dy, meanErr, length, scale, dx, dy};
          }
        }
      }
    }
  }
  return best;
}

function readScoreCandidate(context) {
  const exactA = readScoreExact(context, 125);
  const exactB = readScoreExact(context, 135);
  if (exactA && exactA === exactB) {
    return {score: exactA, shiftX: 0, shiftY: 0, exact: true, meanErr: 0};
  }

  for (const [t1, t2] of [[125, 135], [112, 124]]) {
    const a = readScoreAdaptive(context, t1);
    if (!a) continue;
    const b = readScoreAdaptive(context, t2);
    if (b && a.score === b.score) {
      return {
        score: a.score,
        shiftX: Math.round(a.cx - 504),
        shiftY: Math.round(a.topY - 416),
        exact: false,
        meanErr: (a.meanErr + b.meanErr) / 2
      };
    }
  }
  return null;
}

function readMapNameCandidate(context, allowShifted = true) {
  if (!context.allowTitle) return null;
  const exact = closestWithError(signature(context.ctx, titleRegion, 28, 8, 140), mapSamples, 1.65, 1.0);
  if (exact) {
    return {mapName: exact.label, error: exact.error, dx: 0, dy: 0, exact: true};
  }
  if (!allowShifted) return null;

  const coarseSpots = [];
  for (const thresh of [140, 120, 160]) {
    for (const dy of [-20, -10, 0, 10, 20]) {
      for (const dx of [-48, -32, -16, 0, 16, 32, 48, 64]) {
        const box = [titleRegion[0] + dx, titleRegion[1] + dy, titleRegion[2], titleRegion[3]];
        const density = foregroundRatio(context.ctx, box, thresh);
        if (density < 0.04 || density > 0.65) continue;
        const values = signature(context.ctx, box, 28, 8, thresh);
        if (!values) continue;
        // Do not enforce minimumGap during coarse grid step; refine top spots first.
        const rawMatch = closestWithError(values, mapSamples, 2.35, 0);
        if (rawMatch) {
          coarseSpots.push({error: rawMatch.error, dx, dy, thresh});
        }
      }
    }
  }
  if (!coarseSpots.length) return null;
  coarseSpots.sort((a, b) => a.error - b.error);

  let best = null;
  for (const spot of coarseSpots.slice(0, 3)) {
    for (let dy = spot.dy - 6; dy <= spot.dy + 6; dy += 3) {
      for (let dx = spot.dx - 6; dx <= spot.dx + 6; dx += 3) {
        const box = [titleRegion[0] + dx, titleRegion[1] + dy, titleRegion[2], titleRegion[3]];
        const values = signature(context.ctx, box, 28, 8, spot.thresh);
        if (!values) continue;
        const match = closestWithError(values, mapSamples, 1.80, 0.70);
        if (match && (!best || match.error < best.error)) {
          best = {mapName: match.label, error: match.error, dx, dy, exact: false};
        }
      }
    }
  }
  return best;
}

function detectContentBounds(image) {
  const natW = image.naturalWidth;
  const natH = image.naturalHeight;
  const probeW = Math.min(400, natW);
  const probeH = Math.max(1, Math.round(natH * probeW / natW));
  const canvas = document.createElement('canvas');
  canvas.width = probeW;
  canvas.height = probeH;
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  ctx.drawImage(image, 0, 0, natW, natH, 0, 0, probeW, probeH);
  const {data} = ctx.getImageData(0, 0, probeW, probeH);

  const isBlackRow = (y) => {
    let black = 0;
    const base = y * probeW * 4;
    for (let x = 0; x < probeW; x++) {
      const p = base + x * 4;
      if (Math.max(data[p], data[p + 1], data[p + 2]) <= 8) black++;
    }
    return black / probeW >= 0.98;
  };

  let top = 0;
  let bottom = probeH - 1;
  const maxVTrim = Math.floor(probeH * 0.25);
  while (top < maxVTrim && isBlackRow(top)) top++;
  while (bottom > probeH - 1 - maxVTrim && bottom > top + 80 && isBlackRow(bottom)) bottom--;

  const isBlackCol = (x) => {
    let black = 0;
    const rows = bottom - top + 1;
    for (let y = top; y <= bottom; y++) {
      const p = (y * probeW + x) * 4;
      if (Math.max(data[p], data[p + 1], data[p + 2]) <= 8) black++;
    }
    return black / rows >= 0.98;
  };

  let left = 0;
  let right = probeW - 1;
  const maxHTrim = Math.floor(probeW * 0.25);
  while (left < maxHTrim && isBlackCol(left)) left++;
  while (right > probeW - 1 - maxHTrim && right > left + 120 && isBlackCol(right)) right--;

  // Trim thin uniform PC/tablet window titlebars or white/gray chrome at the very top edge.
  const spanW = right - left + 1;
  const rowStats = (y) => {
    let sum = 0;
    let sumSq = 0;
    for (let x = left; x <= right; x++) {
      const p = (y * probeW + x) * 4;
      const lum = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
      sum += lum;
      sumSq += lum * lum;
    }
    const mean = sum / spanW;
    const variance = Math.max(0, sumSq / spanW - mean * mean);
    return {mean, std: Math.sqrt(variance)};
  };

  const maxTitlebar = Math.min(24, Math.floor((bottom - top + 1) * 0.065));
  let barEnd = top;
  while (barEnd < top + maxTitlebar) {
    const st = rowStats(barEnd);
    if (st.mean < 42 || st.std > 13) break;
    barEnd++;
  }
  if (barEnd > top) {
    const below = rowStats(Math.min(bottom, barEnd + 2));
    const barAvg = rowStats(top);
    if (below.std >= 16 || Math.abs(barAvg.mean - below.mean) >= 24) {
      top = barEnd;
    }
  }

  const sx = Math.round(left * natW / probeW);
  const sy = Math.round(top * natH / probeH);
  const sw = Math.round((right + 1) * natW / probeW) - sx;
  const sh = Math.round((bottom + 1) * natH / probeH) - sy;
  if (sw < 400 || sh < 240) {
    return {x: 0, y: 0, w: natW, h: natH};
  }
  return {x: sx, y: sy, w: sw, h: sh};
}

function drawCropToFrame(image, sx, sy, sw, sh) {
  const canvas = document.createElement('canvas');
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  const clampedX = Math.max(0, Math.min(image.naturalWidth - 1, sx));
  const clampedY = Math.max(0, Math.min(image.naturalHeight - 1, sy));
  const clampedW = Math.max(1, Math.min(image.naturalWidth - clampedX, sw));
  const clampedH = Math.max(1, Math.min(image.naturalHeight - clampedY, sh));
  ctx.drawImage(image, clampedX, clampedY, clampedW, clampedH, 0, 0, frameWidth, frameHeight);
  return ctx;
}

function buildCandidateFramings(image, rect) {
  const ratio = rect.w / rect.h;
  const specs = [];
  const allowTitle = rect.h >= 340;
  const add = (tag, sx, sy, sw, sh) => {
    specs.push({tag, sx, sy, sw, sh, allowTitle});
  };

  if (ratio >= 1.755 && ratio <= 1.805) {
    add('full', rect.x, rect.y, rect.w, rect.h);
    if (ratio > targetAspectRatio + 0.01) {
      const cropW = rect.h * targetAspectRatio;
      add('center-hcrop', rect.x + (rect.w - cropW) / 2, rect.y, cropW, rect.h);
    } else if (ratio < targetAspectRatio - 0.01) {
      const cropH = rect.w / targetAspectRatio;
      add('center-vcrop', rect.x, rect.y + (rect.h - cropH) / 2, rect.w, cropH);
      add('bottom-vcrop', rect.x, rect.y + (rect.h - cropH), rect.w, cropH);
      add('top-vcrop', rect.x, rect.y, rect.w, cropH);
    }
  } else if (ratio < 1.755) {
    // Narrower screens (16:10, 3:2, 4:3 iPad, windowed): preserve UI aspect ratio with match-width 16:9 crops first.
    const cropH = Math.min(rect.h, rect.w / targetAspectRatio);
    add('narrow-center', rect.x, rect.y + (rect.h - cropH) / 2, rect.w, cropH);
    add('narrow-bottom', rect.x, rect.y + (rect.h - cropH), rect.w, cropH);
    add('narrow-top', rect.x, rect.y, rect.w, cropH);
    add('narrow-fit', rect.x, rect.y, rect.w, rect.h);
  } else {
    // Wider screens (19.5:9, 20:9, 21:9 phones): try centered 16:9 AND safe-area / edge-aligned left & right crops.
    const cropW = Math.min(rect.w, rect.h * targetAspectRatio);
    const safeOffset = Math.min(Math.round(rect.w * 0.03), Math.max(0, rect.w - cropW));
    add('wide-center', rect.x + (rect.w - cropW) / 2, rect.y, cropW, rect.h);
    add('wide-left', rect.x, rect.y, cropW, rect.h);
    if (safeOffset > 4) add('wide-left-safe', rect.x + safeOffset, rect.y, cropW, rect.h);
    add('wide-right', rect.x + rect.w - cropW, rect.y, cropW, rect.h);
    if (safeOffset > 4) add('wide-right-safe', rect.x + rect.w - cropW - safeOffset, rect.y, cropW, rect.h);
  }

  const cache = new Map();
  return specs.map((spec) => ({
    ...spec,
    get ctx() {
      if (!cache.has(spec.tag)) {
        cache.set(spec.tag, drawCropToFrame(image, spec.sx, spec.sy, spec.sw, spec.sh));
      }
      return cache.get(spec.tag);
    }
  }));
}

async function openImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function recognizeManeScreenshot(file) {
  const image = await openImage(file);
  if (image.naturalWidth < 400 || image.naturalHeight < 240) return null;

  const rect = detectContentBounds(image);
  const ratio = rect.w / rect.h;
  if (ratio < 1.15 || ratio > 3.1) return null;

  const framings = buildCandidateFramings(image, rect);

  // Order framings for map title (prefers full, center, right-aligned for wide screens).
  const mapOrder = framings.filter((f) => !f.tag.startsWith('wide-left'));
  let bestMap = null;
  let mapFraming = null;
  for (const framing of mapOrder) {
    const hit = readMapNameCandidate(framing, true);
    if (!hit) continue;
    if (!bestMap || hit.error < bestMap.error) {
      bestMap = hit;
      mapFraming = framing;
    }
    if (hit.exact && hit.error <= 1.15) break;
  }

  // Order framings for score & squad (prefers full, center, left-aligned for wide screens).
  const scoreOrder = framings.filter((f) => !f.tag.startsWith('wide-right'));
  let bestScore = null;
  let scoreFraming = null;
  const shiftMag = (hit) => Math.abs(hit.shiftX) + Math.abs(hit.shiftY);
  for (const framing of scoreOrder) {
    const hit = readScoreCandidate(framing.ctx);
    if (!hit) continue;
    const isBetter = !bestScore ||
      (hit.exact && !bestScore.exact) ||
      (!bestScore.exact && (shiftMag(hit) < shiftMag(bestScore) - 6 ||
        (Math.abs(shiftMag(hit) - shiftMag(bestScore)) <= 6 && hit.meanErr < bestScore.meanErr)));
    if (isBetter) {
      bestScore = hit;
      scoreFraming = framing;
    }
    if (hit.exact) break;
  }

  // Pick left/center framing for squad cards (never a right-anchored wide crop).
  const safeMapFraming = mapFraming && !mapFraming.tag.startsWith('wide-right') ? mapFraming : null;
  const cardFraming = scoreFraming || safeMapFraming || framings[0];
  const shiftX = bestScore ? Math.max(-140, Math.min(140, bestScore.shiftX)) : 0;
  const shiftY = bestScore ? Math.max(-50, Math.min(50, bestScore.shiftY)) : 0;

  let slots = cardCenters.map((x) => {
    const character = readPortrait(cardFraming.ctx, x, shiftX, shiftY);
    const psychube = character ? readPsychube(cardFraming.ctx, x, shiftX, shiftY) : '';
    return {character, psychube};
  });

  if ((shiftX || shiftY) && !slots.some((s) => s.character)) {
    const zeroSlots = cardCenters.map((x) => {
      const character = readPortrait(cardFraming.ctx, x, 0, 0);
      const psychube = character ? readPsychube(cardFraming.ctx, x, 0, 0) : '';
      return {character, psychube};
    });
    if (zeroSlots.some((s) => s.character)) slots = zeroSlots;
  }

  // If score wasn't located or squad yielded few cards, scan other left/center framings for best squad match.
  const currentChars = slots.filter((s) => s.character).length;
  if ((!bestScore && currentChars < 4) || currentChars === 0) {
    let bestCount = currentChars;
    for (const framing of scoreOrder) {
      if (framing === cardFraming) continue;
      const altSlots = cardCenters.map((x) => {
        const character = readPortrait(framing.ctx, x, 0, 0);
        const psychube = character ? readPsychube(framing.ctx, x, 0, 0) : '';
        return {character, psychube};
      });
      const count = altSlots.filter((s) => s.character).length;
      if (count > bestCount) {
        bestCount = count;
        slots = altSlots;
      }
      if (bestCount === 4) break;
    }
  }

  const mapName = bestMap?.mapName || '';
  const score = bestScore?.score || '';
  if (!mapName && !score && !slots.some((s) => s.character)) return null;
  return {mapName, score, slots};
}
