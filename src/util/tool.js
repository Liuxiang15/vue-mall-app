/**
 * start：起始位置
 * targetDis: 目标移动的距离
 */
/* eslint-disable */

export const moveTo = (start, targetDis, dom, prop) => {
  let dis = 0;
  let speed = 5;
  if (targetDis < start) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;
    if (Math.abs(dis) > Math.abs(targetDis)) {
      dom[prop] = start + targetDis;
      clearInterval(t);
    }
  }, 2);
};
// export default { moveTo };
