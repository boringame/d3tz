
const { trunc, min, max, } = Math;


export const colorDimR = 0;
export const colorDimG = 1;
export const colorDimB = 2;
export const colorDimA = 3;
export const colorDimLen = 4;

export type ColorCell = number;
export const colorCellMin = 0;
export const colorCellMax = 255;
export const colorCellTrunc = (cell: ColorCell) => {
  return max(colorCellMin, min(trunc(cell), colorCellMax));
};

export type ColorRgb = [r: ColorCell, g: ColorCell, b: ColorCell, a: ColorCell];

export const colorEmpty: ColorRgb = [0, 0, 0, 0];


const colorLightCell = (c: ColorCell, nvz: number) => {
  const b = 255 / 3 * 2;
  const o = colorCellTrunc(c - b + b * nvz);
  return o;
};

/**
 * 光照
 */
export const colorLight = (color: ColorRgb, nvz: number) => {

  const r = color[colorDimR];
  const g = color[colorDimG];
  const b = color[colorDimB];
  const a = color[colorDimA];



  const oR = colorLightCell(r, nvz);
  const oG = colorLightCell(g, nvz);
  const oB = colorLightCell(b, nvz);
  const oA = colorCellTrunc(a);

  const oColor: ColorRgb = [oR, oG, oB, oA];
  return oColor;
};


const colorOverCellBlend = (
  c1: number, c2: number,
  a1: number, a2: number
) => {
  const o = (c1 * a1 * (1.0 - a2) + c2 * a2) /
    (a1 + a2 - a1 * a2);
  return o;
};

/**
 * 遮挡
 */
export const colorOver = (bottom: ColorRgb, top: ColorRgb) => {


  const tR = top[colorDimR];
  const tG = top[colorDimG];
  const tB = top[colorDimB];
  const tA = top[colorDimA];

  if (tA >= colorCellMax) {
    return top;
  }

  const bR = bottom[colorDimR];
  const bG = bottom[colorDimG];
  const bB = bottom[colorDimB];
  const bA = bottom[colorDimA];

  if (bA <= colorCellMin) {
    return top;
  }

  const oR = colorCellTrunc(colorOverCellBlend(bR / 255, tR / 255, bA / 255, tA / 255) * 255);
  const oG = colorCellTrunc(colorOverCellBlend(bG / 255, tG / 255, bA / 255, tA / 255) * 255);
  const oB = colorCellTrunc(colorOverCellBlend(bB / 255, tB / 255, bA / 255, tA / 255) * 255);
  const oA = colorCellTrunc((bA / 255 + tA / 255 - (bA / 255) * (tA / 255)) * 255);

  const oColor: ColorRgb = [oR, oG, oB, oA];
  return oColor;
};

