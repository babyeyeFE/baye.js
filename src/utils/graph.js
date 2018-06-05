// 缓慢画线
// let config = {
//     shape: target,
//     points: [new c.Point(0,0), new c.Point(400,300), new c.Point(-50,300), new c.Point(0,0)],
//     color: "red",
//     strokeStyle: [10, "round"],
//     speed: 0.8,
//     finalFill: true,//  可选
//     fillColor: "blue",// 可选
//     onComplete: ()=>{console.log("complete!")},//可选
//     onChange: (ltCmd)=>{console.log(ltCmd)}, //可选
// }
// babyEye.animateDraw(config);
export function animateDraw(config, hidden = []){
    let { shape, points, color, strokeStyle, speed } = config
    let g = shape.graphics.s(color).ss(...strokeStyle)
      .mt(points[0].x, points[0].y)
    let cmd = g.lt(points[0].x, points[0].y).command
    let time = babyEye.distance(points[0], points[1]) * (1 / speed)
    let tween = createjs.Tween.get(cmd).to({ x: points[1].x, y: points[1].y }, time)
  
    if (config.onChange) {tween.on('change', () => {config.onChange(cmd)})}
    tween.call(() => {
      if (points.length < 3) {
        if (!config.finalFill) {return}
        points = hidden.concat(points)
        points.forEach((point, index) => {
          if (index == 0) {
            let fc = config.fillColor ? config.fillColor : color
            g.f(fc).mt(point.x, point.y)
          } else {
            g.lt(point.x, point.y)
          }
        })
        if (config.onComplete) {config.onComplete()}
        return
      }
      hidden.push(points.shift())
      animateDraw(config, hidden)
    })
}

