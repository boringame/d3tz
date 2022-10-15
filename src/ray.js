import { cubeSize, cubePlanes, } from "./cube.js";
import { cubeFaces, cubeFaceColLen, cubeFaceRowLen, cubeFaceColorW, cubeFaceColorB } from "./face.js";
import { planeDimNormalVector, planeDimO, planeDimM, planeDimN } from "./plane.js";
import { pointDimX, pointDimY, pointDimZ } from "./point.js";
import { screenScaleX, cameraZ, screenScaleY } from "./screen.js";
const { trunc, pow, } = Math;
/**
 * 渲染时的位置
 */
export const rayTZ = 0;
/**
 * 控制扫描的精细度
 * shotX = rX / (1 - rZ / cameraZ)
 * scaleX = shotX * screenScaleX
 */
const rayWidth = (cubeSize * screenScaleX) / ((1 - (cubeSize + rayTZ) / cameraZ) * 0.74);
const rayHeight = (cubeSize * screenScaleY) / ((1 - (cubeSize + rayTZ) / cameraZ) * 0.74);
// const rayWidth = screenWidth;
// const rayHeight = screenHeight;
export const rayCube = cubePlanes.map((plane, faceKey) => {
    //面的法向量
    const normalVector = plane[planeDimNormalVector];
    const planeO = plane[planeDimO];
    const planeM = plane[planeDimM];
    const planeN = plane[planeDimN];
    const planeOX = planeO[pointDimX];
    const planeOY = planeO[pointDimY];
    const planeOZ = planeO[pointDimZ];
    const planeMX = planeM[pointDimX];
    const planeMY = planeM[pointDimY];
    const planeMZ = planeM[pointDimZ];
    const planeNX = planeN[pointDimX];
    const planeNY = planeN[pointDimY];
    const planeNZ = planeN[pointDimZ];
    const mX = planeMX - planeOX;
    const mY = planeMY - planeOY;
    const mZ = planeMZ - planeOZ;
    const nX = planeNX - planeOX;
    const nY = planeNY - planeOY;
    const nZ = planeNZ - planeOZ;
    const face = cubeFaces[faceKey];
    const faceHalf = cubeSize / cubeFaceColLen / 2;
    const faceR = faceHalf * 0.6;
    const faceRPow = pow(faceR, 2);
    const rayYList = Array.from((function* () {
        for (let rayY = 0; rayY < rayHeight; rayY++) {
            yield rayY;
        }
    })());
    const rayXList = Array.from((function* () {
        for (let rayX = 0; rayX < rayWidth; rayX++) {
            yield rayX;
        }
    })());
    return {
        faceKey,
        plane,
        face,
        normalVector,
        rows: rayYList.map((rayY) => {
            const faceY = cubeSize * (rayY / rayHeight);
            const faceRowIndex = trunc(cubeFaceRowLen * faceY);
            const faceOB = cubeSize * (faceRowIndex / cubeFaceRowLen) + faceHalf;
            const faceYBPow = pow(faceY - faceOB, 2);
            return {
                cols: rayXList.map((rayX) => {
                    const faceX = cubeSize * (rayX / rayWidth);
                    //变化前的位置
                    const x = mX * faceX + nX * faceY + planeOX;
                    const y = mY * faceX + nY * faceY + planeOY;
                    const z = mZ * faceX + nZ * faceY + planeOZ;
                    let point = [x, y, z];
                    const faceColIndex = trunc(cubeFaceColLen * faceX);
                    let faceCell = face[faceRowIndex][faceColIndex];
                    if (faceCell == 1) {
                        const faceOA = cubeSize * (faceColIndex / cubeFaceColLen) + faceHalf;
                        const faceOXAPow = pow(faceX - faceOA, 2);
                        //圆方程判断是否在圆圈外 pow(x - a, 2) + pow(y - b, 2) == pow(r, 2)
                        if (faceOXAPow + faceYBPow > faceRPow) {
                            faceCell = 0;
                        }
                    }
                    const color = faceCell == 0 ?
                        cubeFaceColorW :
                        cubeFaceColorB;
                    return {
                        point,
                        normalVector,
                        faceCell,
                        color,
                    };
                }),
            };
        }),
    };
});
