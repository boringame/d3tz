import { planeDimLen } from "./plane.js";
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
export const cubePlanes = [
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
