"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = "d:\\ItsTimetoGo\\MyProject\\code\\javascript\\my-portfolio";
const images = path.join(root, "assets", "images");
const currentPath = path.join(images, "signature-me.png");
const sourcePath = path.join(images, "signature-me-original.png");

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function decodePng(buf) {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIG)) {
    throw new Error("File is not a PNG");
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idat = [];
  let plte = null;
  let trns = null;

  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const start = offset + 8;
    const end = start + length;
    if (end + 4 > buf.length) throw new Error("Truncated PNG chunk " + type);
    const data = buf.subarray(start, end);
    offset = end + 4;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "PLTE") {
      plte = data;
    } else if (type === "tRNS") {
      trns = data;
    } else if (type === "IEND") {
      break;
    }
  }

  if (!width || !height) throw new Error("PNG is missing IHDR");
  if (interlace !== 0) throw new Error("Interlaced PNG is not supported");

  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error("Unsupported color type " + colorType);

  const compressed = Buffer.concat(idat);
  const raw = zlib.inflateSync(compressed);
  const rowBytes = Math.ceil((width * bitDepth * channels) / 8);
  const expected = height * (rowBytes + 1);
  if (raw.length < expected) {
    throw new Error("Inflated PNG is short: " + raw.length + " < " + expected);
  }

  const bpp = Math.max(1, (channels * bitDepth) / 8);
  const samples = Buffer.alloc(height * rowBytes);
  let i = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[i++];
    const row = y * rowBytes;
    for (let x = 0; x < rowBytes; x++) {
      const value = raw[i++];
      const left = x >= bpp ? samples[row + x - bpp] : 0;
      const up = y > 0 ? samples[row - rowBytes + x] : 0;
      const upLeft = y > 0 && x >= bpp ? samples[row - rowBytes + x - bpp] : 0;
      let recon = value;
      if (filter === 1) recon = (value + left) & 255;
      else if (filter === 2) recon = (value + up) & 255;
      else if (filter === 3) recon = (value + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) recon = (value + paeth(left, up, upLeft)) & 255;
      else if (filter !== 0) throw new Error("Unknown PNG filter " + filter);
      samples[row + x] = recon;
    }
  }

  const rgba = samplesToRgba(samples, width, height, bitDepth, colorType, plte, trns);
  return { width, height, data: rgba, bitDepth, colorType };
}

function samplesToRgba(samples, width, height, bitDepth, colorType, plte, trns) {
  const count = width * height;
  const rgba = Buffer.alloc(count * 4, 255);
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];

  if (bitDepth === 8) {
    if (colorType === 6) {
      samples.copy(rgba, 0, 0, count * 4);
      return rgba;
    }
    for (let p = 0; p < count; p++) {
      const s = p * channels;
      writePixel(rgba, p, colorType, samples, s, plte, trns, 1);
    }
    return rgba;
  }

  if (bitDepth === 16) {
    for (let p = 0; p < count; p++) {
      const s = p * channels * 2;
      writePixel(rgba, p, colorType, samples, s, plte, trns, 2);
    }
    return rgba;
  }

  if (bitDepth !== 1 && bitDepth !== 2 && bitDepth !== 4) {
    throw new Error("Unsupported bit depth " + bitDepth);
  }

  const mask = (1 << bitDepth) - 1;
  let bit = 0;
  let byteIndex = 0;
  for (let y = 0; y < height; y++) {
    byteIndex = y * Math.ceil((width * bitDepth * channels) / 8);
    bit = 0;
    for (let x = 0; x < width; x++) {
      let sample = 0;
      for (let c = 0; c < channels; c++) {
        if (bit === 0) bit = 8;
        bit -= bitDepth;
        const value = (samples[byteIndex] >> bit) & mask;
        if (bit === 0) byteIndex++;
        sample = value;
      }
      const scaled = Math.round((sample * 255) / mask);
      const p = y * width + x;
      if (colorType === 3) {
        writeIndexed(rgba, p, sample, plte, trns);
      } else {
        rgba[p * 4] = scaled;
        rgba[p * 4 + 1] = scaled;
        rgba[p * 4 + 2] = scaled;
        rgba[p * 4 + 3] = 255;
      }
    }
  }
  return rgba;
}

function writePixel(rgba, p, colorType, samples, s, plte, trns, step) {
  const o = p * 4;
  const at = (index) => samples[s + index * step];
  if (colorType === 0) {
    const g = at(0);
    rgba[o] = g;
    rgba[o + 1] = g;
    rgba[o + 2] = g;
    rgba[o + 3] = 255;
  } else if (colorType === 2) {
    rgba[o] = at(0);
    rgba[o + 1] = at(1);
    rgba[o + 2] = at(2);
    rgba[o + 3] = 255;
    if (trns && trns.length >= 6) {
      if (at(0) === trns.readUInt16BE(0) && at(1) === trns.readUInt16BE(2) && at(2) === trns.readUInt16BE(4) && step === 1) {
        rgba[o + 3] = 0;
      }
    }
  } else if (colorType === 3) {
    writeIndexed(rgba, p, at(0), plte, trns);
  } else if (colorType === 4) {
    const g = at(0);
    rgba[o] = g;
    rgba[o + 1] = g;
    rgba[o + 2] = g;
    rgba[o + 3] = at(1);
  } else if (colorType === 6) {
    rgba[o] = at(0);
    rgba[o + 1] = at(1);
    rgba[o + 2] = at(2);
    rgba[o + 3] = at(3);
  }
}

function writeIndexed(rgba, p, index, plte, trns) {
  const o = p * 4;
  const src = index * 3;
  rgba[o] = plte ? plte[src] : index;
  rgba[o + 1] = plte ? plte[src + 1] : index;
  rgba[o + 2] = plte ? plte[src + 2] : index;
  rgba[o + 3] = trns && index < trns.length ? trns[index] : 255;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const head = Buffer.alloc(4);
  head.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([head, body, crc]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function median(values) {
  if (values.length === 0) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function percentile(values, p) {
  if (values.length === 0) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * p)));
  return sorted[index];
}

function sampleGrid(grid, gw, gh, cell, x, y) {
  const gx = (x + 0.5) / cell - 0.5;
  const gy = (y + 0.5) / cell - 0.5;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const tx = gx - x0;
  const ty = gy - y0;
  const at = (cx, cy) => {
    const xx = Math.max(0, Math.min(gw - 1, cx));
    const yy = Math.max(0, Math.min(gh - 1, cy));
    return grid[yy * gw + xx];
  };
  const a = at(x0, y0) * (1 - tx) + at(x0 + 1, y0) * tx;
  const b = at(x0, y0 + 1) * (1 - tx) + at(x0 + 1, y0 + 1) * tx;
  return a * (1 - ty) + b * ty;
}

function removeSmallComponents(alpha, width, height, minSize) {
  const seen = new Uint8Array(alpha.length);
  const stack = [];
  for (let start = 0; start < alpha.length; start++) {
    if (seen[start] || alpha[start] < 18) continue;
    stack.length = 0;
    const comp = [];
    stack.push(start);
    seen[start] = 1;
    while (stack.length) {
      const p = stack.pop();
      comp.push(p);
      const x = p % width;
      const y = (p - x) / width;
      const next = [];
      if (x > 0) next.push(p - 1);
      if (x + 1 < width) next.push(p + 1);
      if (y > 0) next.push(p - width);
      if (y + 1 < height) next.push(p + width);
      for (const n of next) {
        if (!seen[n] && alpha[n] >= 18) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
    if (comp.length < minSize) {
      for (const p of comp) alpha[p] = 0;
    }
  }
}

function cleanSignature(width, height, rgba) {
  const count = width * height;
  const lum = new Float32Array(count);
  let minLum = 255;
  let maxLum = 0;
  for (let p = 0; p < count; p++) {
    const o = p * 4;
    const value = luminance(rgba[o], rgba[o + 1], rgba[o + 2]);
    lum[p] = value;
    if (value < minLum) minLum = value;
    if (value > maxLum) maxLum = value;
  }

  const border = [];
  const inset = Math.max(1, Math.floor(Math.min(width, height) * 0.01));
  for (let x = 0; x < width; x++) {
    border.push(lum[inset * width + x]);
    border.push(lum[(height - 1 - inset) * width + x]);
  }
  for (let y = 0; y < height; y++) {
    border.push(lum[y * width + inset]);
    border.push(lum[y * width + (width - 1 - inset)]);
  }
  const paper = median(border);

  const cell = Math.max(36, Math.round(Math.min(width, height) / 8));
  const gw = Math.ceil(width / cell);
  const gh = Math.ceil(height / cell);
  const grid = new Float32Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      const x0 = gx * cell;
      const y0 = gy * cell;
      const x1 = Math.min(width, x0 + cell);
      const y1 = Math.min(height, y0 + cell);
      const paperPixels = [];
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const value = lum[y * width + x];
          if (value >= paper - 28) paperPixels.push(value);
        }
      }
      grid[gy * gw + gx] = paperPixels.length >= 12 ? percentile(paperPixels, 0.72) : paper;
    }
  }

  const smooth = new Float32Array(grid.length);
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      let sum = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const xx = gx + dx;
          const yy = gy + dy;
          if (xx >= 0 && yy >= 0 && xx < gw && yy < gh) {
            sum += grid[yy * gw + xx];
            n++;
          }
        }
      }
      smooth[gy * gw + gx] = sum / n;
    }
  }

  const alpha = new Uint8Array(count);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const bg = Math.max(paper - 18, sampleGrid(smooth, gw, gh, cell, x, y));
      const delta = bg - lum[p];
      let a = 0;
      if (delta <= 16) a = 0;
      else if (delta >= 58) a = 255;
      else a = Math.round(((delta - 16) / (58 - 16)) * 255);
      alpha[p] = a;
    }
  }

  const minSpec = Math.max(12, Math.round(Math.min(width, height) * 0.012));
  removeSmallComponents(alpha, width, height, minSpec);

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  let ink = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > 20) {
        ink++;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0 || ink < 80) {
    throw new Error("Ink not found. paper=" + paper.toFixed(1) + " ink=" + ink);
  }

  const pad = Math.max(24, Math.round(Math.min(width, height) * 0.03));
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  const outW = maxX - minX + 1;
  const outH = maxY - minY + 1;
  const out = Buffer.alloc(outW * outH * 4);
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      const a = alpha[(y + minY) * width + (x + minX)];
      const o = (y * outW + x) * 4;
      out[o] = 24;
      out[o + 1] = 24;
      out[o + 2] = 26;
      out[o + 3] = a;
    }
  }

  return {
    width: outW,
    height: outH,
    data: out,
    info: {
      inWidth: width,
      inHeight: height,
      paper: Number(paper.toFixed(1)),
      minLum: Number(minLum.toFixed(1)),
      maxLum: Number(maxLum.toFixed(1)),
      ink,
      outWidth: outW,
      outHeight: outH
    }
  };
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    fs.copyFileSync(currentPath, sourcePath);
  }
  const decoded = decodePng(fs.readFileSync(sourcePath));
  const cleaned = cleanSignature(decoded.width, decoded.height, decoded.data);
  const tempPath = path.join(images, "signature-me.clean.png");
  fs.writeFileSync(tempPath, encodePng(cleaned.width, cleaned.height, cleaned.data));
  fs.copyFileSync(tempPath, currentPath);
  fs.unlinkSync(tempPath);
  console.log(JSON.stringify(cleaned.info));
}

main();
