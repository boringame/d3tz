import { colorDimA } from "./color.js";
export const cubeFaceRowLen = 3;
export const cubeFaceColLen = 3;
/**
 * 立方体的纹理
 */
export const cubeFaces = [
    [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    [[0, 0, 1], [0, 0, 0], [1, 0, 0]],
    [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
    [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
    [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
    [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
];
export const cubeFaceColorW = [255, 255, 255, 255];
export const cubeFaceColorB = [255, 0, 0, 255];
export const cubeFaceColorWA = cubeFaceColorW[colorDimA];
