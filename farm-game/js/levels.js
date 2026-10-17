/*
 * Thiết kế các màn chơi. Mỗi màn là một dòng cấu hình — sửa số ở đây để cân bằng độ khó.
 *   time      : số giây của màn
 *   goal      : số đơn phải giao để thắng
 *   crops     : cây được trồng ở màn này
 *   cust      : khách — first (giây khách đầu tiên đến), every (giây giữa các khách),
 *               max (số khách cùng lúc), patience (giây kiên nhẫn, 0 = vô hạn),
 *               units [ít nhất, nhiều nhất] (số món mỗi đơn)
 *   stars     : điểm cần để được 2 sao và 3 sao
 *   reward    : tiền thưởng khi thắng lần đầu
 */
window.LEVELS = [
  {
    id: 1, time: 60, goal: 4, plots: 6, crops: ["carrot"], tutorial: true,
    cust: { first: 1.2, every: 8, max: 2, patience: 0, units: [1, 2] },
    stars: [110, 150], reward: 20
  },
  {
    id: 2, time: 60, goal: 5, plots: 6, crops: ["carrot", "tomato"],
    cust: { first: 1.5, every: 7, max: 3, patience: 35, units: [1, 3] },
    stars: [140, 200], reward: 30
  }
];
