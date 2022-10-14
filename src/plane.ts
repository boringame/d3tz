import { PointD3, NormalVector } from "./point.js";

export const planeDimO = 0;
export const planeDimM = 1;
export const planeDimN = 2;
export const planeDimNormalVector = 3;
export const planeDimLen = 4;

/**
 * 平面
 */
export type Plane = [o: PointD3, m: PointD3, n: PointD3, normalVector: NormalVector];
