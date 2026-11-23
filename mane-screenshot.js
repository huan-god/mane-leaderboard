import {mapSamples, digitSamples, portraitSamples, psychubeSamples} from './mane-screenshot-signatures.js?v=20261123-readout';

const frameWidth = 1600;
const frameHeight = 900;
const titleRegion = [1172, 73, 314, 62];
const scoreRegion = [175, 407, 611, 87];
const cardCenters = [266, 426, 586, 746];
const portraitRegion = (x) => [x - 45, 559, 90, 146];
const psychubeRegion = (x) => [x - 13, 801, 26, 25];

function pixelsOf(context, region) {
  return context.getImageData(...region);
}

// Keep only a small grid of color or foreground measurements from each crop.
function signature(context, region, columns, rows, threshold = null) {
  const {data, width, height} = pixelsOf(context, region);
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

function closest(values, samples, maximumError, minimumGap) {
  const bestByLabel = new Map();
  for (const [label, hex] of samples) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) sum += Math.abs(values[i] - Number.parseInt(hex[i], 16));
    const error = sum / values.length;
    bestByLabel.set(label, Math.min(error, bestByLabel.get(label) ?? Infinity));
  }
  const [best, second] = [...bestByLabel.entries()].sort((a, b) => a[1] - b[1]);
  return best && best[1] <= maximumError && (!second || second[1] - best[1] >= minimumGap)
    ? best[0]
    : '';
}

function digitRegions(context, threshold) {
  const [left, top, width, height] = scoreRegion;
  const {data} = pixelsOf(context, scoreRegion);
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

function readScore(context, threshold) {
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

function createContext(image) {
  const canvas = document.createElement('canvas');
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const context = canvas.getContext('2d', {willReadFrequently: true});
  const cropWidth = Math.min(image.naturalWidth, image.naturalHeight * frameWidth / frameHeight);
  const left = (image.naturalWidth - cropWidth) / 2;
  context.drawImage(image, left, 0, cropWidth, image.naturalHeight, 0, 0, frameWidth, frameHeight);
  return context;
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
  if (image.naturalHeight < 500 || image.naturalWidth / image.naturalHeight < 1.76) return null;
  const context = createContext(image);
  const mapName = closest(signature(context, titleRegion, 28, 8, 140), mapSamples, 1.65, 1.0);
  if (!mapName) return null;

  const scoreA = readScore(context, 125);
  const scoreB = readScore(context, 135);
  const slots = cardCenters.map((x) => {
    const character = closest(signature(context, portraitRegion(x), 6, 9), portraitSamples, 1.25, 1.35);
    const psychube = character
      ? closest(signature(context, psychubeRegion(x), 6, 6), psychubeSamples, 1.35, 1.1)
      : '';
    return {character, psychube};
  });
  return {mapName, score: scoreA === scoreB ? scoreA : '', slots};
}
