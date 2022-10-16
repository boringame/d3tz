import { colorLight, colorEmpty, colorOver } from "./color.js";
import { vectorRotateY, vectorDimZ, vectorDimX, vectorDimY, vectorMin } from "./vector.js";
const { trunc, } = Math;
const stageWh = 3;
export const stageWidth = stageWh;
export const stangeHeight = stageWh;
/**
 * 摄像头位置
 */
export const cameraZ = 3;
/**
 * 控制屏幕的尺寸
 */
const screenWh = 256;
export const screenWidth = screenWh;
export const screenHeight = screenWh;
const screenXRate = screenWidth / stageWidth;
const screenXT = screenWidth / 2;
const screenYRate = screenHeight / stangeHeight;
const screenYT = screenHeight / 2;
/**
 * 不使用遮盖
 */
const shootOver = true;
/**
 * 显示两面
 */
const shootBoth = true;
/**
 * 将图形转换为屏幕点阵
 */
export const shoot = (scans) => {
    const screenBuf = Array.from({ length: screenHeight }, () => Array.from({ length: screenWidth, }, () => colorEmpty));
    const zBuf = Array.from({ length: screenHeight }, () => Array.from({ length: screenWidth, }, () => vectorMin));
    for (const scan of scans) {
        const rotateY = scan.rotateY;
        for (const face of scan.faces) {
            //面的法向量
            let normalVector = face.normalVector;
            normalVector = vectorRotateY(normalVector, rotateY);
            const normalVectorZ = normalVector[vectorDimZ];
            //反面不显示
            if (!shootBoth && normalVectorZ < 0) {
                continue;
            }
            for (const cell of face.cells) {
                let vector = cell.vector;
                //旋转
                vector = vectorRotateY(vector, rotateY);
                //位移
                const scanX = vector[vectorDimX] + scan.x;
                const scanY = vector[vectorDimY] + scan.y;
                const scanZ = vector[vectorDimZ] + scan.z;
                //映射到屏幕中
                // x2 = x / (1 - z / c)
                const shootRate = 1 + scanZ / (cameraZ - scanZ);
                const shootX = scanX * shootRate;
                const shootY = scanY * shootRate;
                const screenX = trunc(shootX * screenXRate + screenXT);
                const screenY = trunc(shootY * screenYRate + screenYT);
                //点超出屏幕范围
                if (screenY < 0 || screenY >= screenHeight ||
                    screenX < 0 || screenX >= screenWidth) {
                    continue;
                }
                //层级
                const overZ = scanZ;
                const overZLast = zBuf[screenY][screenX];
                if (overZ < overZLast && !shootOver) {
                    continue;
                }
                //计算亮度
                let color = cell.color;
                color = colorLight(color, normalVectorZ);
                if (overZ > overZLast) {
                    zBuf[screenY][screenX] = overZ;
                    if (shootOver) {
                        const lastColor = screenBuf[screenY][screenX];
                        if (!!lastColor) {
                            color = colorOver(lastColor, color);
                        }
                    }
                }
                else {
                    if (shootOver) {
                        const lastColor = screenBuf[screenY][screenX];
                        if (!!lastColor) {
                            color = colorOver(color, lastColor);
                        }
                    }
                }
                screenBuf[screenY][screenX] = color;
            }
        }
    }
    return screenBuf;
};
