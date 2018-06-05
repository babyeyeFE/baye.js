export function rotateTrain(stage) {
  let width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight
  if (width >= height) { // 横屏
    $('#loading').css({'transform': 'rotate(0deg)'})
    if (!stage) {return}
    stage.rotation = 0
    stage.x = 0
    if (stage.canvas.width < stage.canvas.height) {
      [stage.canvas.width, stage.canvas.height] = [stage.canvas.height, stage.canvas.width]
    }
  } else { // 竖屏
    $('#loading').css({'transform': 'rotate(90deg)'})
    $('.auto-scale').css({
      'width': 'auto',
      'height': 'auto'
    })
    if (!stage) {return}
    stage.x = 720 // 注意：x偏移相当于旋转中点处理，更简单
    stage.rotation = 90
    if (stage.canvas.width > stage.canvas.height) {
      [stage.canvas.width, stage.canvas.height] = [stage.canvas.height, stage.canvas.width]
    }
  }

  stage.update()
}

export let detectOrient = () => {
  if (window.game) {rotateTrain(window.game.stage)}
  if (window.instructionStage) {rotateTrain(window.instructionStage)}
  rotateTrain()
}

export let handleResize = () => {
  if (window.innerWidth < window.innerHeight * 1280 / 720) {// portrait
    $('.auto-scale').css({
      'height': 'auto',
      'width': '100vw'
    })
  } else {
    $('.auto-scale').css({
      'height': '100vh',
      'width': 'auto'
    })
  }
  detectOrient()
}