export class Button extends createjs.Bitmap {
  constructor(img, callbackDown, callbackUp) {
    super(img)
    this.set({
      cursor: 'pointer',
      regX: img.width / 2,
      regY: img.height / 2
    })

    this.addEventListener('mousedown', (ev) => {
      ev.stopPropagation()
      if (callbackDown) {callbackDown()}
    })

    this.addEventListener('pressup', (ev) => {
      ev.stopPropagation()
      if (callbackUp) {callbackUp()}
    })
  }
}
export class InteractiveButton extends createjs.Container {
  constructor(imgNormal, imgHover, callback, centerMiddle) {
    super()
    this.callback = callback
    this.viewNormal = new createjs.Bitmap(imgNormal)
    this.viewHover = new createjs.Bitmap(imgHover)
    this.viewHover.visible = false
    this.hovering = false
    this.cursor = 'pointer'
    this.addChild(this.viewNormal, this.viewHover)
    this.events()
    if (centerMiddle) {
      this.set({
        regX: imgNormal.width / 2,
        regY: imgNormal.height / 2
      })
    }
  }

  events() {
    this.addEventListener('mouseover', () => {
      this.viewHover.visible = true
      if (this.viewNormal.stage) {this.viewNormal.stage.update()}
    })

    this.addEventListener('mouseout', () => {
      this.viewHover.visible = false
      if (this.viewNormal.stage) {this.viewNormal.stage.update()}
    })

    this.addEventListener('mousedown', (ev) => {
      ev.stopPropagation()
      this.callback()
    })
  }
}

export class Bitmap extends createjs.Bitmap {
  constructor(img) {
    super(img)
    this.regX = img.width / 2
    this.regY = img.height / 2
  }
}

export class Page {
  constructor(config) {
    this.items = config.items
    this.buildView()
  }

  buildView() {
    this.view = new createjs.Container()
    this.items.forEach((item, index) => {
      this.view.addChild(item.content)
      // item.content.set({x: item.x ? item.x : 0, y: item.y ? item.y : 0})
      item.content.set(item)
    })
  }
}
