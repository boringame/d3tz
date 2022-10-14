import { Plane, planeDimLen } from "./plane.js";
import { pointD3RotateZ, pointD3RotateY, pointD3RotateX } from "./point.js";

/**
 * 立方体6个面
 */
export const cubeFaceLen = 6;

/**
 * 立方体的尺寸
 */
export const cubeSize = 1.0;

/**
 * 立方体位置信息
 */
export const cubePlanes: [Plane, Plane, Plane, Plane, Plane, Plane] = [
  [[-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [0.0, 0.0, 1.0]],
  [[-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [-0.5, 0.5, 0.5], [-1.0, 0.0, 0.0]],
  [[-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [0.0, -1.0, 0.0]],
  [[-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [0.0, 1.0, 0.0]],
  [[0.5, -0.5, 0.5], [0.5, -0.5, -0.5], [0.5, 0.5, 0.5], [1.0, 0.0, 0.0]],
  [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.0, 0.0, -1.0]],
];

//旋转立方体角度
{
  for (let faceKey = 0; faceKey < cubeFaceLen; faceKey++) {
    const plane = cubePlanes[faceKey];
    for (let dimPlane = 0; dimPlane < planeDimLen; dimPlane++) {
      let point = plane[dimPlane];
      point = pointD3RotateZ(point, 45);
      point = pointD3RotateY(point, 45);
      point = pointD3RotateX(point, 45);
      plane[dimPlane] = point;
    }
  }
}


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

