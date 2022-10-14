import { colorDimR, colorDimG, colorDimB, colorDimA, colorDimLen } from "./color.js";
import { screenWidth, screenHeight } from "./screen.js";
/**
 * 绘制到这个元素中
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const drawWh = 1;
const drawWidth = drawWh;
const drawHeight = drawWh;
canvas.width = screenWidth * drawWidth;
canvas.height = screenHeight * drawHeight;
// canvas.style.transform = `scale(${1 / window.devicePixelRatio}) translateZ(0)`;\
// canvas.style.filter = `blur(1px)`;
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';
/**
 * 绘制
 */
export const draw = (screenBuf, fps) => {
    ctx.clearRect(0, 0, screenWidth * drawWidth, screenHeight * drawHeight);
    const imgData = ctx.createImageData(drawWidth * screenWidth, drawHeight * screenHeight);
    for (let rowIndex = 0; rowIndex < screenBuf.length; rowIndex++) {
        const row = screenBuf[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const color = row[colIndex];
            const colorR = color[colorDimR];
            const colorG = color[colorDimG];
            const colorB = color[colorDimB];
            const colorA = color[colorDimA];
            for (let drawY = 0; drawY < drawHeight; drawY++) {
                for (let drawX = 0; drawX < drawWidth; drawX++) {
                    const p = rowIndex * drawHeight * drawWidth * screenWidth * colorDimLen +
                        drawY * drawWidth * screenWidth * colorDimLen +
                        colIndex * drawWidth * colorDimLen +
                        drawX * colorDimLen;
                    imgData.data[p + colorDimR] = colorR;
                    imgData.data[p + colorDimG] = colorG;
                    imgData.data[p + colorDimB] = colorB;
                    imgData.data[p + colorDimA] = colorA;
                }
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
    ctx.fillStyle = '#aaaaaa';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = `16px serif`;
    ctx.fillText(`${fps}fps`, 0, 0);
};
