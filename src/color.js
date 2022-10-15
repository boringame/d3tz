const { sqrt, trunc, min, max, } = Math;
export const colorDimR = 0;
export const colorDimG = 1;
export const colorDimB = 2;
export const colorDimA = 3;
export const colorDimLen = 4;
export const colorCellMin = 0;
export const colorCellMax = 255;
const colorCellTrunc = (cell) => {
    return max(colorCellMin, min(trunc(cell), colorCellMax));
};
export const colorEmpty = [0, 0, 0, 0];
const colorLightCell = (c, nvz) => {
    const b = 255 / 3 * 2;
    const o = colorCellTrunc(c - b + b * nvz);
    return o;
};
/**
 * 光照
 * Brightness = 0.3 * R + 0.6 * G + 0.1 * B
 */
export const colorLight = (color, nvz) => {
    const r = color[colorDimR];
    const g = color[colorDimG];
    const b = color[colorDimB];
    const a = color[colorDimA];
    const oR = colorLightCell(r, nvz);
    const oG = colorLightCell(g, nvz);
    const oB = colorLightCell(b, nvz);
    const oA = colorCellTrunc(a);
    const oColor = [oR, oG, oB, oA];
    return oColor;
};
const colorOverCellBlend = (c1, c2, a1, a2) => {
    const o = (c1 * a1 * (1.0 - a2) + c2 * a2) /
        (a1 + a2 - a1 * a2);
    return o;
};
/**
 * 遮挡
 */
export const colorOver = (bottom, top) => {
    const bR = bottom[colorDimR];
    const bG = bottom[colorDimG];
    const bB = bottom[colorDimB];
    const bA = bottom[colorDimA];
    const tR = top[colorDimR];
    const tG = top[colorDimG];
    const tB = top[colorDimB];
    const tA = top[colorDimA];
    const oR = colorCellTrunc(colorOverCellBlend(bR / 255, tR / 255, bA / 255, tA / 255) * 255);
    const oG = colorCellTrunc(colorOverCellBlend(bG / 255, tG / 255, bA / 255, tA / 255) * 255);
    const oB = colorCellTrunc(colorOverCellBlend(bB / 255, tB / 255, bA / 255, tA / 255) * 255);
    const oA = colorCellTrunc((bA / 255 + tA / 255 - (bA / 255) * (tA / 255)) * 255);
    const oColor = [oR, oG, oB, oA];
    return oColor;
};
