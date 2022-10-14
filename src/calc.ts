import { ColorRgb, colorLight } from "./color.js";
import { NormalVector, pointD3RotateY, pointDimZ, PointD3, pointDimX, pointDimY } from "./point.js";
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
    () => Array.from({ length: screenWidth, }, () => [0, 0, 0, 0] as ColorRgb)
  );

  const zBuf = Array.from({ length: screenHeight },
    () => Array.from({ length: screenWidth, }, () => Number.MIN_SAFE_INTEGER)
  );

  for (const face of rayCube) {

    //面的法向量
    let normalVector: NormalVector = face.normalVector;

    normalVector = pointD3RotateY(normalVector, deg);
    const normalVectorZ = normalVector[pointDimZ];

    //反面不显示
    if (normalVectorZ < 0) {
      continue;
    }

    for (const row of face.rows) {
      for (const col of row.cols) {
        let point: PointD3 = col.point;

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

        const drawZ = point[pointDimZ];
        //被遮盖
        if (drawZ <= zBuf[screenY][screenX]) {
          continue;
        }
        //记录最上方的点层级
        zBuf[screenY][screenX] = drawZ;

        //反面不显示
        if (normalVectorZ < 0) {
          continue;
        }

        let color = col.color;

        //计算亮度
        color = colorLight(color, normalVectorZ);

        screenBuf[screenY][screenX] = color;
      }

    }
  }

  return screenBuf;
};
