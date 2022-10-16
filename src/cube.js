import { vectorRotateZ, vectorRotateY, vectorRotateX, } from "./vector.js";
import { vectorDimX, vectorDimY, vectorDimZ } from "./vector.js";
import { screenHeight, screenWidth, } from "./screen.js";
import { planeDimLen, planeDimNormalVector, planeDimO, planeDimM, planeDimN } from "./scan.js";
const { trunc, pow, } = Math;
/**
 * 立方体6个面
 */
const cubeFaceLen = 6;
/**
 * 立方体的尺寸
 */
const cubeSize = 1.0;
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
            point = vectorRotateZ(point, 45);
            point = vectorRotateY(point, 45);
            point = vectorRotateX(point, 45);
            plane[dimPlane] = point;
        }
    }
}
const cubeFaceRowLen = 3;
const cubeFaceColLen = 3;
/**
 * 立方体的纹理
 */
const cubeFaces = [
    [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
    [[0, 0, 1], [0, 0, 0], [1, 0, 0]],
    [[0, 0, 1], [0, 1, 0], [1, 0, 0]],
    [[1, 0, 1], [0, 0, 0], [1, 0, 1]],
    [[1, 0, 1], [0, 1, 0], [1, 0, 1]],
    [[1, 0, 1], [1, 0, 1], [1, 0, 1]],
];
const cubeFaceColorW = [255, 255, 255, 155];
const cubeFaceColorB = [255, 0, 0, 255];
/**
 * 控制扫描的精细度
 */
const scanWidth = screenWidth;
const scanHeight = screenHeight;
const cubeScanFaces = cubePlanes.map((plane, faceKey) => {
    //面的法向量
    const normalVector = plane[planeDimNormalVector];
    const planeO = plane[planeDimO];
    const planeM = plane[planeDimM];
    const planeN = plane[planeDimN];
    const planeOX = planeO[vectorDimX];
    const planeOY = planeO[vectorDimY];
    const planeOZ = planeO[vectorDimZ];
    const planeMX = planeM[vectorDimX];
    const planeMY = planeM[vectorDimY];
    const planeMZ = planeM[vectorDimZ];
    const planeNX = planeN[vectorDimX];
    const planeNY = planeN[vectorDimY];
    const planeNZ = planeN[vectorDimZ];
    const mX = planeMX - planeOX;
    const mY = planeMY - planeOY;
    const mZ = planeMZ - planeOZ;
    const nX = planeNX - planeOX;
    const nY = planeNY - planeOY;
    const nZ = planeNZ - planeOZ;
    const face = cubeFaces[faceKey];
    const faceCellHalf = cubeSize / cubeFaceColLen / 2;
    const faceCellR = faceCellHalf * 0.6;
    const faceCellRPow = pow(faceCellR, 2);
    const scanYList = Array.from((function* () {
        for (let scanY = 0; scanY < scanHeight; scanY++) {
            yield scanY;
        }
    })());
    const scanXList = Array.from((function* () {
        for (let scanX = 0; scanX < scanWidth; scanX++) {
            yield scanX;
        }
    })());
    return {
        normalVector,
        cells: scanYList.flatMap((scanY) => {
            const faceY = cubeSize * (scanY / scanHeight);
            const faceRowIndex = trunc(cubeFaceRowLen * faceY);
            const faceOB = cubeSize * (faceRowIndex / cubeFaceRowLen) + faceCellHalf;
            const faceYBPow = pow(faceY - faceOB, 2);
            const cells = scanXList.map((scanX) => {
                const faceX = cubeSize * (scanX / scanWidth);
                //位置
                const x = mX * faceX + nX * faceY + planeOX;
                const y = mY * faceX + nY * faceY + planeOY;
                const z = mZ * faceX + nZ * faceY + planeOZ;
                let vector = [x, y, z];
                //颜色
                let color = cubeFaceColorW;
                const faceColIndex = trunc(cubeFaceColLen * faceX);
                const faceCell = face[faceRowIndex][faceColIndex];
                if (faceCell == 1) {
                    const faceOA = cubeSize * (faceColIndex / cubeFaceColLen) + faceCellHalf;
                    const faceOXAPow = pow(faceX - faceOA, 2);
                    //圆方程判断是否在圆圈外 pow(x - a, 2) + pow(y - b, 2) == pow(r, 2)
                    if (faceOXAPow + faceYBPow <= faceCellRPow) {
                        color = cubeFaceColorB;
                    }
                }
                const cell = {
                    vector,
                    color,
                };
                return cell;
            });
            return cells;
        }),
    };
});
export const cubeScan = () => {
    return {
        faces: cubeScanFaces,
        x: 0,
        y: 0,
        z: 0,
        rotateY: 0,
    };
};
