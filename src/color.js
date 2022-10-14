const { sqrt, trunc, min, max, } = Math;
export const colorDimR = 0;
export const colorDimG = 1;
export const colorDimB = 2;
export const colorDimA = 3;
export const colorDimLen = 4;
export const colorLight = (color, nvz) => {
    const r = color[colorDimR];
    const g = color[colorDimG];
    const b = color[colorDimB];
    const a = color[colorDimA];
    const n = (nvz + 0.1) * sqrt(2) * 8;
    const rsR = max(0, min(trunc(r / 11 * n), 255));
    const rsG = max(0, min(trunc(g / 11 * n), 255));
    const rsB = max(0, min(trunc(b / 11 * n), 255));
    const rsA = a;
    const rsColor = [rsR, rsG, rsB, rsA];
    return rsColor;
};
