import { calc } from "./calc.js";
import { draw } from "./draw.js";
const { trunc, } = Math;
/**
 * 帧循环
 */
const main = async () => {
    const frameUnit = 1000 / 60;
    const frameDeg = -45 / frameUnit;
    const timeBegin = Date.now();
    let timeLast = timeBegin;
    let countDeg = 0;
    const timeDegEnable = true;
    for (;;) {
        const now = Date.now();
        const timeDeg = (now - timeBegin) / frameUnit * frameDeg;
        const timeSub = now - timeLast;
        timeLast = now;
        const fps = trunc(1000 / timeSub);
        countDeg += frameDeg;
        const screenBuf = calc(timeDegEnable ? timeDeg : countDeg);
        draw(screenBuf, fps);
        await new Promise(requestAnimationFrame);
        // break;
    }
};
main();
