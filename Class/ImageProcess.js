import createjs from 'createjs'

export class ImageSTE {
  constructor(config) {
    if (config.colors.indexOf('r') === -1) {
      throw Error('参数错了')
      return
    }
    let img = config.image
    let colors = config.colors
    let delta = config.delta
    let canvas = document.getElementById('img-canvas')
    canvas.width = img.width + delta
    canvas.height = img.height

    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, colors[0] === 'r' ? 0 : delta, 0)
    let imageDataLeft = ctx.getImageData(0, 0, img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, colors[0] === 'r' ? delta : 0, 0)
    let imageDataRight = ctx.getImageData(0, 0, img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let result = ctx.createImageData(img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let dataLength = imageDataRight.data.length

    if (config.type === 2) {
      for (let i = 0; i < dataLength; i += 4) {
        imageDataRight.data[i] = 0
        imageDataLeft.data[i + 1] = 0
      }
    } else {
      for (let i = 0; i < dataLength; i += 4) {
        imageDataRight.data[i] = 0
      }
    }

    for (let i = 0; i < dataLength; i += 4) {
      imageDataLeft.data[i + 1] = 0
      imageDataLeft.data[i + 2] = 0
    }

    for (let i = 0; i < dataLength; i += 4) {
      result.data[i] = imageDataLeft.data[i]
      result.data[i + 1] = imageDataRight.data[i + 1]
      result.data[i + 2] = imageDataRight.data[i + 2]
      result.data[i + 3] = imageDataRight.data[i + 3] + imageDataLeft.data[i + 3]
    }
    ctx.putImageData(result, 0, 0)

    let imgDom = document.createElement('img')
    imgDom.src = canvas.toDataURL('image/png')
    imgDom.width = img.width + delta
    imgDom.height = img.height
    return imgDom
  }
}

export class ImageSTE2 {
  constructor(config) {
    config.type = 2
    return new ImageSTE(config)
  }
}

export class ImageMidSTE {
  constructor(config) {
    if (config.colors.indexOf('r') === -1) {
      console.log('参数错了')
      return
    }
    let img = config.image
    let colors = config.colors
    let delta = config.delta
    let canvas = document.getElementById('img-canvas')
    canvas.width = img.width + delta
    canvas.height = img.height

    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, colors[0] === 'r' ? 0 : delta, 0)
    let imageDataLeft = ctx.getImageData(0, 0, img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, colors[0] === 'r' ? delta : 0, 0)
    let imageDataRight = ctx.getImageData(0, 0, img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let result = ctx.createImageData(img.width + delta, img.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let dataLength = imageDataRight.data.length
    for (let i = 0; i < dataLength; i += 4) {
      imageDataRight.data[i] = 0
    }

    for (let i = 0; i < dataLength; i += 4) {
      imageDataLeft.data[i + 1] = 0
      imageDataLeft.data[i + 2] = 0
    }

    for (let i = 0; i < dataLength; i += 4) {
      result.data[i] = imageDataLeft.data[i]
      result.data[i + 1] = imageDataRight.data[i + 1]
      result.data[i + 2] = imageDataRight.data[i + 2]
      result.data[i + 3] = imageDataRight.data[i + 3] && imageDataLeft.data[i + 3]
    }
    ctx.putImageData(result, 0, 0)

    let imgDom = document.createElement('img')
    imgDom.src = canvas.toDataURL('image/png')
    imgDom.width = img.width + delta
    imgDom.height = img.height
    return imgDom
  }
}

export class FilteredImg {
  constructor(originalImg, filters) {
    this.canvas = document.getElementById('img-canvas')
    this.canvas.width = originalImg.width
    this.canvas.height = originalImg.height

    this.stage = new createjs.Stage('img-canvas')
    this.stage.update()

    this.bitmap = new createjs.Bitmap(originalImg)
    this.bitmap.filters = filters
    this.bitmap.cache(0, 0, originalImg.width, originalImg.height)
    this.stage.addChild(this.bitmap)
    this.stage.update()

    let result = document.createElement('img') // Create an <img> element
    result.src = this.canvas.toDataURL() // Set its src attribute
    result.width = originalImg.width
    result.height = originalImg.height
    return result
  }
}
