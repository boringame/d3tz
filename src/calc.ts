import { colorLight, colorEmpty, colorOver, colorCellMax } from "./color.js";
import { cubeFaceColorWA } from "./face.js";
import { pointD3RotateY, pointDimZ, pointDimX, pointDimY, pointMin } from "./point.js";
import { rayCube, rayTZ } from "./ray.js";
import { ScreenBuf, screenHeight, screenWidth, cameraZ, screenScaleX, screenScaleY, screenTX, screenTY } from "./screen.js";

const { trunc, } = Math;

/**
 * 根据时间计算出图形
 */
export const calc = (
  deg: number
) => {

  const screenBuf: ScreenBuf = Array.from({ length: screenHeight },
    () => Array.from({ length: screenWidth, }, () => colorEmpty)
  );

  const zBuf = Array.from({ length: screenHeight },
    () => Array.from({ length: screenWidth, }, () => pointMin)
  );

  for (const face of rayCube) {

    //面的法向量
    let normalVector = face.normalVector;

    normalVector = pointD3RotateY(normalVector, deg);
    const normalVectorZ = normalVector[pointDimZ];

    //反面不显示
    if (normalVectorZ < 0 && cubeFaceColorWA >= colorCellMax) {
      continue;
    }

    for (const row of face.rows) {
      for (const col of row.cols) {
        let point = col.point;

        //旋转
        point = pointD3RotateY(point, deg);

        //映射到屏幕中
        // x2 = x / (1 - z / c)
        const rayZ = point[pointDimZ] + rayTZ;
        const shotX = point[pointDimX] / (1 - rayZ / cameraZ);
        const shotY = point[pointDimY] / (1 - rayZ / cameraZ);

        //缩放到合适的比例显示
        const scaleX = shotX * screenScaleX;
        const scaleY = shotY * screenScaleY;

        //放在屏幕上
        const screenX = trunc(scaleX + screenTX);
        const screenY = trunc(scaleY + screenTY);

        //点超出屏幕范围
        if (
          screenY < 0 || screenY >= screenHeight ||
          screenX < 0 || screenX >= screenWidth
        ) {
          continue;
        }

        let color = col.color;

        //层级
        const overZ = point[pointDimZ];
        const overZLast = zBuf[screenY][screenX];
        if (overZ < overZLast && cubeFaceColorWA >= colorCellMax) {
          continue;
        }

        //计算亮度
        color = colorLight(color, normalVectorZ);

        if (overZ > overZLast) {
          zBuf[screenY][screenX] = overZ;

          if (cubeFaceColorWA < colorCellMax) {
            const lastColor = screenBuf[screenY][screenX];
            if (!!lastColor) {
              color = colorOver(lastColor, color);
            }
          }
        } else {

          if (cubeFaceColorWA < colorCellMax) {
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
