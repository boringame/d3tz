import { ColorRgb, colorLight, colorEmpty, colorOver, colorDimA, colorCellMax, colorDimR, colorDimG, colorDimB, colorCellTrunc } from "./color.js";
import { vectorRotateY, vectorDimZ, vectorDimX, vectorDimY, vectorMin } from "./vector.js";
import { Scan, scanWidth, scanFaceBoth, scanColorOver, scanHeight } from "./scan.js";

const { trunc, min, max, } = Math;

const stageWh = 3;
export const stageWidth = stageWh;
export const stangeHeight = stageWh;

/**
 * 摄像头位置
 */
export const cameraZ = 3;


/**
 * 屏幕绘制尺寸
 */
const screenWh = 256;
export const screenWidth = screenWh;
export const screenHeight = screenWh;

const screenXRate = screenWidth / stageWidth;
const screenXT = screenWidth / 2;
const screenYRate = screenHeight / stangeHeight;
const screenYT = screenHeight / 2;
const gapYRate = screenYRate / scanHeight;
const gapXRate = screenXRate / scanWidth;

/**
 * 屏幕上的点集合
 */

export interface ScreenCell {
  color: ColorRgb;
  z: number;
  on: boolean;
}

export const screenCellEmpty: ScreenCell = {
  color: colorEmpty,
  z: vectorMin,
  on: false,
};

export type ScreenBuf = ScreenCell[][];

/**
 * 将图形转换为屏幕点阵
 */
export const shoot = (
  scans: Scan[],
): ScreenBuf => {

  const screenBuf: ScreenBuf = Array.from({ length: screenHeight },
    () => Array.from({ length: screenWidth, }, () => screenCellEmpty)
  );

  for (const scan of scans) {

    const rotateY = scan.rotateY;

    for (const face of scan.faces) {

      //面的法向量
      let normalVector = face.normalVector;

      normalVector = vectorRotateY(normalVector, rotateY);
      const normalVectorZ = normalVector[vectorDimZ];

      //反面不显示
      if (!scanFaceBoth && normalVectorZ < 0) {
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
        if (
          screenY < 0 || screenY >= screenHeight ||
          screenX < 0 || screenX >= screenWidth
        ) {
          continue;
        }

        //计算亮度
        let color = cell.color;
        color = colorLight(color, normalVectorZ);


        //层级
        let overZ = scanZ;
        let overColor = color;
        const screenBufLast = screenBuf[screenY][screenX];
        if (screenBufLast.on) {
          if (scanZ < screenBufLast.z) {
            if (scanColorOver) {
              continue;
            }
            overZ = screenBufLast.z;
            overColor = screenBufLast.color;
            if (scanColorOver) {
              overColor = colorOver(color, screenBufLast.color);
            }
          } else {
            if (scanColorOver) {
              overColor = colorOver(screenBufLast.color, color);
            }
          }
        }


        screenBuf[screenY][screenX] = {
          on: true,
          color: overColor,
          z: overZ,
        };

        //填充放大的间隙空白
        const gapRow = min(screenY + shootRate * gapYRate, screenHeight);
        const gapCol = min(screenX + shootRate * gapXRate, screenWidth);
        const gapColor = color;
        for (let gapY = screenY + 1; gapY < gapRow; gapY++) {
          for (let gapX = screenX + 1; gapX < gapCol; gapX++) {
            const lastGap = screenBuf[gapY][gapX];
            if (lastGap.on) {
              continue;
            }
            if (overZ < lastGap.z) {
              continue;
            }
            screenBuf[gapY][gapX] = {
              on: false,
              color: gapColor,
              z: overZ,
            };
          }
        }

      }
    }

  }

  return screenBuf;
};
