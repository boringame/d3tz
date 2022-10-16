import { shoot } from "./screen.js";
import { draw } from "./draw.js";
import { cubeScan } from "./cube.js";
const { trunc, } = Math;
/**
 * 帧循环
 */
const main = async () => {
    const frameUnit = 1000 / 60;
    const frameDeg = 45 / frameUnit;
    const timeBegin = Date.now();
    let timeLast = timeBegin;
    let countDeg = 0;
    const timeDegEnable = true;
    const scans = [cubeScan(), cubeScan()];
    for (const [scan, i] of scans.map((scan, i) => [scan, i])) {
        scan.x = -0.5 + i * 2;
        scan.z = -3 * i;
    }
    for (;;) {
        const now = Date.now();
        const timeDeg = (now - timeBegin) / frameUnit * frameDeg;
        const timeSub = now - timeLast;
        timeLast = now;
        const fps = trunc(1000 / timeSub);
        countDeg += frameDeg;
        for (const scan of scans) {
            scan.rotateY = timeDegEnable ? timeDeg : countDeg;
        }
        const screenBuf = shoot(scans);
        draw(screenBuf, fps);
        await new Promise(requestAnimationFrame);
        // break;
    }
};
main();
