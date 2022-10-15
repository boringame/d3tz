import { colorDimA, ColorRgb } from "./color.js";

/**
 * 立方体面上的形状，0标识空白区域，1标识点数区域
 */
export type CubeFaceCell = 0 | 1;

export const cubeFaceRowLen = 3;

export const cubeFaceColLen = 3;

/**
 * 立方体面上的形状每行
 */
export type CubeFaceRow = [col0: CubeFaceCell, col1: CubeFaceCell, col2: CubeFaceCell];
/**
 * 立方体纹理面
 */
export type CubeFace = [row0: CubeFaceRow, row1: CubeFaceRow, row2: CubeFaceRow];

/**
 * 立方体的纹理
 */
export const cubeFaces: [CubeFace, CubeFace, CubeFace, CubeFace, CubeFace, CubeFace] = [
  [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
  [[0, 0, 1], [0, 0, 0], [1, 0, 0]],
  [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
  [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
  [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
  [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
];

export const cubeFaceColorW: ColorRgb = [255, 255, 255, 255];
export const cubeFaceColorB: ColorRgb = [255, 0, 0, 255];

export const cubeFaceColorWA = cubeFaceColorW[colorDimA];

