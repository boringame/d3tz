import { ColorRgb } from "./color";
import { NormalVector, Vector } from "./vector";


export const planeDimO = 0;
export const planeDimM = 1;
export const planeDimN = 2;
export const planeDimNormalVector = 3;
export const planeDimLen = 4;

/**
 * 平面
 */
export type Plane = [o: Vector, m: Vector, n: Vector, normalVector: NormalVector];


/**
 * 点阵单元
 */
export interface ScanCell {
  vector: Vector;
  color: ColorRgb;
}

/**
 * 点阵平面
 */
export interface ScanFace {

  normalVector: NormalVector;

  cells: ScanCell[];

}


/**
 * 点阵图形
 */
export interface Scan {

  faces: ScanFace[];

  x: number;

  y: number;

  z: number;

  rotateY: number;


}

/**
 * 控制扫描的精细度
 */
const scanWh = 128;
export const scanWidth = scanWh;
export const scanHeight = scanWh;



/**
 * 允许透明遮盖
 */
export const scanColorOver = false;

/**
 * 显示两面
 */
export const scanFaceBoth = false;


