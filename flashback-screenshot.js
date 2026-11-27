import {victoryTitles, roundDigits, knownCards, stageTitles, knownPsychubes} from './flashback-screenshot-signatures.js?v=20261123-flash-proof';

const titleColumns = 24;
const titleRows = 8;

function detectContentBounds(image) {
  const natW = image.naturalWidth;
  const natH = image.naturalHeight;
  const probeW = Math.min(400, natW);
  const probeH = Math.max(1, Math.round(natH * probeW / natW));
  const probe = document.createElement('canvas');
  probe.width = probeW;
  probe.height = probeH;
  const pCtx = probe.getContext('2d', {willReadFrequently: true});
  pCtx.drawImage(image, 0, 0, natW, natH, 0, 0, probeW, probeH);
  const {data} = pCtx.getImageData(0, 0, probeW, probeH);

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
  const maxV = Math.floor(probeH * 0.25);
  while (top < maxV && isBlackRow(top)) top++;
  while (bottom > probeH - 1 - maxV && bottom > top + 80 && isBlackRow(bottom)) bottom--;

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
  const maxH = Math.floor(probeW * 0.25);
  while (left < maxH && isBlackCol(left)) left++;
  while (right > probeW - 1 - maxH && right > left + 120 && isBlackCol(right)) right--;

  const sx = Math.round(left * natW / probeW);
  const sy = Math.round(top * natH / probeH);
  const sw = Math.round((right + 1) * natW / probeW) - sx;
  const sh = Math.round((bottom + 1) * natH / probeH) - sy;
  if (sw < 480 || sh < 260) return {x: 0, y: 0, w: natW, h: natH};
  return {x: sx, y: sy, w: sw, h: sh};
}

function pixelsFor(image, rect) {
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, Math.min(960 / rect.w, Math.max(720 / rect.w, 405 / rect.h)));
  canvas.width = Math.round(rect.w * scale);
  canvas.height = Math.round(rect.h * scale);
  const context = canvas.getContext('2d', {willReadFrequently: true});
  context.drawImage(image, rect.x, rect.y, rect.w, rect.h, 0, 0, canvas.width, canvas.height);
  const {width, height, data} = context.getImageData(0, 0, canvas.width, canvas.height);
  const stride = width + 1;
  const bright = new Uint32Array(stride * (height + 1));
  const shade = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const p = i * 4;
      shade[i] = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
      sum += shade[i] >= 166 ? 1 : 0;
      const j = (y + 1) * stride + x + 1;
      bright[j] = sum + bright[j - stride];
    }
  }
  return {width, height, data, shade, bright, stride, scale};
}

function brightCount(pixels, left, top, right, bottom) {
  const {bright, stride} = pixels;
  return bright[bottom * stride + right] - bright[top * stride + right] -
    bright[bottom * stride + left] + bright[top * stride + left];
}

function titleInkError(pixels, box, template, limit = Infinity, measured = null) {
  const {x,y,w,h} = box;
  let error = 0;
  let i = 0;
  for (let row = 0; row < titleRows; row++) {
    const top = y + Math.floor(row * h / titleRows);
    const bottom = y + Math.floor((row + 1) * h / titleRows);
    for (let col = 0; col < titleColumns; col++) {
      const left = x + Math.floor(col * w / titleColumns);
      const right = x + Math.floor((col + 1) * w / titleColumns);
      const count = brightCount(pixels, left, top, right, bottom);
      const actual = Math.round(15 * count / ((right - left) * (bottom - top)));
      if (measured) measured.push(actual);
      else {
        error += Math.abs(actual - template[i++]);
        if (error > limit) return error;
      }
    }
  }
  return error;
}

const titleTemplates = victoryTitles.map((row) => Array.from(row, (v) => Number.parseInt(v, 16)));
function findVictoryTitle(pixels) {
  const {width, height} = pixels;
  let best = null;
  let bestError = titleColumns * titleRows * 3.4;
  function compare(box) {
    const {x,y,w,h} = box;
    if (x < 0 || y < 0 || x + w >= width || y + h >= height) return;
    const density = brightCount(pixels, x, y, x + w, y + h) / (w * h);
    if (density < 0.14 || density > 0.62) return;
    for (const template of titleTemplates) {
      const error = titleInkError(pixels, box, template, bestError);
      if (error < bestError) {
        bestError = error;
        best = box;
      }
    }
  }
  const minW = Math.max(48, Math.round(Math.min(width * 0.09, height * 0.22)));
  const maxW = Math.min(width * 0.42, height * 0.65);
  for (let w = minW; w <= maxW; w += 5) {
    const h = Math.round(w * 0.246);
    for (let y = 1; y < height * 0.55; y += 4) {
      for (let x = 0; x < width * 0.54 && x + w < width; x += 4) compare({x,y,w,h});
    }
  }
  if (!best) return null;
  const coarse = best;
  for (let dy = -4; dy <= 4; dy++) {
    for (let dx = -4; dx <= 4; dx++) {
      for (let dw = -5; dw <= 5; dw += 2) {
        for (let dh = -3; dh <= 3; dh += 2) {
          compare({x:coarse.x+dx,y:coarse.y+dy,w:coarse.w+dw,h:coarse.h+dh});
        }
      }
    }
  }
  return bestError <= titleColumns * titleRows * 1.85 ? best : null;
}

function relativeBox(anchor, x, y, w, h) {
  return {
    x: Math.round(anchor.x + anchor.w * x), y: Math.round(anchor.y + anchor.w * y),
    w: Math.round(anchor.w * w), h: Math.round(anchor.w * h)
  };
}

function boxFits(pixels, {x,y,w,h}) {
  return x >= 0 && y >= 0 && w > 0 && h > 0 && x+w <= pixels.width && y+h <= pixels.height;
}

function stageTitleSignature(pixels, box, threshold) {
  const values=[];
  for(let row=0;row<7;row++) {
    const y0=box.y+Math.floor(row*box.h/7), y1=box.y+Math.floor((row+1)*box.h/7);
    for(let col=0;col<24;col++) {
      const x0=box.x+Math.floor(col*box.w/24), x1=box.x+Math.floor((col+1)*box.w/24);
      let ink=0;
      for(let y=y0;y<y1;y++) for(let x=x0;x<x1;x++) if(pixels.shade[y*pixels.width+x]>=threshold)ink++;
      values.push(Math.round(15*ink/((y1-y0)*(x1-x0))));
    }
  }
  return values;
}

function hasStageTitle(pixels, title) {
  for (const dx of [-0.105,-0.09,-0.075]) {
    const region=relativeBox(title,dx,0.603,0.375,0.147);
    if (!boxFits(pixels,region)) continue;
    for (const threshold of [112,127]) {
      const signature = stageTitleSignature(pixels, region, threshold);
      const ink = signature.reduce((total, value) => total + value, 0);
      if (ink >= signature.length && findClosest(signature, stageTitles, 2.5, 0)) return true;
    }
  }
  return false;
}

function stageNumber(pixels, anchor, threshold) {
  const box = relativeBox(anchor, 0.39, 0.632, 0.218, 0.119);
  if (!boxFits(pixels, box)) return null;
  const strokes = [];
  let previous = false;
  for (let x = box.x; x < box.x + box.w; x++) {
    let ink = 0;
    for (let y = box.y; y < box.y + box.h; y++) if (pixels.shade[y*pixels.width+x] >= threshold) ink++;
    const drawn = ink >= box.h * 0.52;
    if (drawn && !previous) strokes.push(x);
    previous = drawn;
  }
  if (strokes.length < 1 || strokes.length > 3) return null;
  const gaps = strokes.slice(1).map((x,i)=>x-strokes[i]);
  if (gaps.some((gap) => gap < anchor.w * 0.028 || gap > anchor.w * 0.066)) return null;
  return strokes.length;
}

function binaryGlyph(pixels, box, threshold) {
  let left=box.x+box.w, top=box.y+box.h, right=box.x-1, bottom=box.y-1;
  for (let y=box.y;y<box.y+box.h;y++) {
    for (let x=box.x;x<box.x+box.w;x++) {
      if (pixels.shade[y*pixels.width+x] < threshold) continue;
      left=Math.min(left,x); right=Math.max(right,x); top=Math.min(top,y); bottom=Math.max(bottom,y);
    }
  }
  const width=right-left+1, height=bottom-top+1;
  if (height < 6 || width < 3 || width > height) return null;
  const result=[];
  for (let row=0;row<12;row++) {
    const y0=top+Math.floor(row*height/12), y1=Math.max(y0+1,top+Math.floor((row+1)*height/12));
    for (let col=0;col<8;col++) {
      const x0=left+Math.floor(col*width/8), x1=Math.max(x0+1,left+Math.floor((col+1)*width/8));
      let sum=0;
      for (let y=y0;y<y1;y++) for(let x=x0;x<x1;x++) if (pixels.shade[y*pixels.width+x] >= threshold) sum++;
      result.push(Math.round(15*sum/((x1-x0)*(y1-y0))));
    }
  }
  return result;
}

function findClosest(input, references, maximumError, minimumGap) {
  const errorByValue = new Map();
  for (const [value, reference] of references) {
    let difference=0;
    for (let i=0;i<input.length;i++) difference += Math.abs(input[i]-Number.parseInt(reference[i],16));
    const mean=difference/input.length;
    errorByValue.set(value,Math.min(errorByValue.get(value)??Infinity,mean));
  }
  const [best,next]=[...errorByValue.entries()].sort((a,b)=>a[1]-b[1]);
  return best && best[1]<=maximumError && (!next || next[1]-best[1]>=minimumGap) ? best : null;
}

function roundMatches(pixels, anchor) {
  const matches=[];
  for (const dx of [0.208,0.22,0.23]) {
    const box=relativeBox(anchor,dx,0.267,0.096,0.137);
    if (!boxFits(pixels,box)) continue;
    for (const threshold of [152,170,187]) {
      const glyph=binaryGlyph(pixels,box,threshold);
      const best=glyph&&findClosest(glyph,roundDigits,1.75,0.26);
      if (best) matches.push(best);
    }
  }
  matches.sort((a,b)=>a[1]-b[1]);
  return matches;
}

function roundNumber(pixels, anchor) {
  const matches=roundMatches(pixels,anchor);
  return matches.length && !matches.some(([value,error])=>value!==matches[0][0] && error<=matches[0][1]+0.28)
    ? Number(matches[0][0]) : null;
}

function colorGrid(pixels, {x,y,w,h}) {
  const values=[];
  for (let row=0;row<9;row++) {
    const top=y+Math.floor(row*h/9), bottom=y+Math.floor((row+1)*h/9);
    for (let col=0;col<6;col++) {
      const left=x+Math.floor(col*w/6), right=x+Math.floor((col+1)*w/6);
      const totals=[0,0,0];
      for (let yy=top;yy<bottom;yy++) for(let xx=left;xx<right;xx++) {
        const start=(yy*pixels.width+xx)*4;
        for(let channel=0;channel<3;channel++)totals[channel]+=pixels.data[start+channel];
      }
      const count=(bottom-top)*(right-left);
      for(const total of totals)values.push(Math.round(total/count/17));
    }
  }
  return values;
}

function identifyCards(pixels, anchor) {
  const rows = [0,0.211,0.107,0];
  const choices = [];
  for (let i=0;i<4;i++) {
    let best = null;
    let spot = 0;
    for (const placement of [1.41,1.78]) {
      const box=relativeBox(anchor,placement+i*0.6+0.10,0.185+rows[i],0.34,0.56);
      if (!boxFits(pixels,box)) continue;
      const match=findClosest(colorGrid(pixels,box),knownCards,1.25,0.8);
      if (match && (!best || match[1]<best[1])) {
        best=match;
        spot=placement;
      }
    }
    const character=best?.[0] || '';
    const art = knownPsychubes.filter(([label]) => label.startsWith(character+'::'));
    let psychube = '';
    if (character && art.length) {
      const centerX=spot+i*0.6+0.27;
      const centerY=1.125+rows[i];
      const matches=[];
      for (const dx of [-0.019,0,0.019]) for (const dy of [-0.019,0,0.019]) {
        const box=relativeBox(anchor,centerX+dx-0.057,centerY+dy-0.052,0.114,0.104);
        if (box.w<6 || box.h<9 || !boxFits(pixels,box)) continue;
        const match=findClosest(colorGrid(pixels,box),art,0.54,0.55);
        if(match)matches.push(match);
      }
      matches.sort((a,b)=>a[1]-b[1]);
      if (matches.length) psychube=matches[0][0].split('::')[1];
    }
    choices.push({character,psychube});
  }
  return choices;
}

async function decode(file) {
  const url=URL.createObjectURL(file);
  try {
    const image=new Image();
    image.src=url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function recognizeFlashbackScreenshot(file) {
  const image=await decode(file);
  if (image.naturalWidth<480 || image.naturalHeight<260) return null;
  const rect=detectContentBounds(image);
  const aspectRatio = rect.w / rect.h;
  if (aspectRatio < 1.15 || aspectRatio > 3.1) return null;
  const pixels=pixelsFor(image, rect);
  const title=findVictoryTitle(pixels);
  if (!title || !hasStageTitle(pixels,title)) return null;
  const stageA=stageNumber(pixels,title,107);
  const stageB=stageNumber(pixels,title,114);
  return {
    stage:stageA===stageB?stageA:null,
    rounds:roundNumber(pixels,title),
    slots:identifyCards(pixels,title)
  };
}
