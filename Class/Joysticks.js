class Joystick {
  constructor(index) {
    this.index = index
    this.pressedMap = {}
    this.oldPressedMap = {}
    this.deadZone = 0.1
    this.setMap()
  }

  update() {
    this.oldPressedMap = this.pressedMap
    this.pressedMap = {}

    let pad = navigator.getGamepads()[this.index]
    if (!pad) return
    //buttons
    pad.buttons.forEach((button, index) => {
      let key = this.defaultMap.buttons[index]
      this.pressedMap[key] = button.pressed
    })

    //axies
    pad.axes.forEach((value, index) => {
      let key = this.defaultMap.axes[index]
      if (Math.abs(value) < this.deadZone) {
        value = 0
      }
      this.pressedMap[key] = value
    })
  }

  justPressed(key) {
    return this.pressedMap[key] && !this.oldPressedMap[key]
  }

  pressed(key) {
    return this.pressedMap[key]
  }

  justRelesed(key) {
    return !this.pressedMap[key] && this.oldPressedMap[key]
  }

  setMap() {
    this.defaultMap = {
      buttons: {
        0: 'A',
        1: 'B',
        2: 'X',
        3: 'Y',
        4: 'LB',
        5: 'RB',
        6: 'LT',
        7: 'RT',
        8: 'BACK',
        9: 'START',
        10: 'LSTICK',
        11: 'RSTICK',
        12: 'UP',
        13: 'DOWN',
        14: 'LEFT',
        15: 'RIGHT',
        16: 'SWITCH'
      },
      axes: {
        0: 'ALX',
        1: 'ALY',
        2: 'ARX',
        3: 'ARY'
      }
    }
  }
}

class Joysticks {
  constructor() {
    this.controllers = []
    for (let i = 0; i < 4; i++) {
      let controller = new Joystick(i)
      this.controllers.push(controller)
    }
  }

  currentNum() {
    //当前连接手柄数
    let gamepads = navigator.getGamepads()
    let result = 0
    for (let i = 0; i < 4; i++) {
      if (gamepads[i]) {
        result += 1
      }
    }
    return result
  }

  checkValid(id) {
    let gamepads = navigator.getGamepads()
    return gamepads[id]
  }

  update() {
    this.controllers.forEach(controller => {
      controller.update()
    })
  }

  justPressed(key, index = 0) {
    return this.controllers[index].justPressed(key)
  }

  pressed(key, index = 0) {
    return this.controllers[index].pressed(key)
  }

  justRelesed(key, index = 0) {
    return this.controllers[index].justPressed(key)
  }
}

export { Joysticks }

// 用法
// let joysticks = new Joysticks()
// 在主循环每一帧调用joysitcks.update()
// joysticks.pressed('A',index=0) 表示该键是否处于按下的状态
// joysticks.justPressed('A',index=0)表示该键是否刚被按下
// joysticks.justReleased('A',index=0)表示该键是否刚被抬起
// 以上三个方法支持的第二参数，index是手柄的编号，从0开始，默认值0. 指的是获取第index个手柄的状态

// joysticks.checkValid(id)表示该编号的手柄是否存在
// joysticks.currentNum()返回链接的手柄数量
