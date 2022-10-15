import { cubeSize } from "./cube.js";
/**
 * 控制屏幕的尺寸
 */
export const screenWh = 240;
export const screenWidth = screenWh;
export const screenHeight = screenWh;
export const screenScaleX = screenWidth / 2 / cubeSize;
export const screenScaleY = screenHeight / 2 / cubeSize;
export const screenTX = screenWidth / 2;
export const screenTY = screenHeight / 2;
/**
 * 摄像头位置
 */
export const cameraZ = 3;
