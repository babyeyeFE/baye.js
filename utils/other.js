export let anTarget = (bg, lazy, glasses) => (bg ^ lazy) ^ glasses

export let steInOut = (bg, target, glasses) => (bg ^ target) ^ glasses


export let redFilter = new createjs.ColorFilter(1, 0, 0, 1, 255, 0, 0, 0)
export let blueFilter = new createjs.ColorFilter(0, 0, 1, 1, 0, 0, 255, 0)


export let setWrapText = (textInstance, text) => {
  let initWidth = textInstance.lineWidth
  let textArray = text.split('')
  let i = -1
  let prevText = ''
  let lines = []

  textInstance.text = ''

  while (textArray[++i]) {
    textInstance.text += textArray[i]

    if (textInstance.getMeasuredWidth() > initWidth) {
      lines.push(prevText)
      textInstance.text = textArray[i]
    }
    prevText = textInstance.text
  }
  lines.push(prevText)

  textInstance.text = lines.join('\n')
}


export let getParam = (url, name) => {
  if (url.indexOf('?') === -1) {return null}
  let value = null
  url.split('?')[1].split('&').forEach((param) => {
    if (param.split('=')[0] === name) {
      value = param.split('=')[1]
    }
  })
  return value
}

export let average = (arr) => {
  let l = arr.length
  let sum = arr.reduce((x, y) => (x + y), 0)
  return sum / l
}

export let distance = (x1, y1, x2, y2) => {
  let dx = Math.abs(x1 - x2)
  let dy = Math.abs(y1 - y2)
  return Math.sqrt(dx * dx + dy * dy)
}

export let randomRange = (low, high) => Math.floor(low + Math.random() * (high - low))

export let randomExcept = (low, high, except) => {
  let result = other.randomRange(low, high)
  return result == except ? other.randomExcept(low, high, except) : result
}

export let shuffle = (arr) => {
  let i = 0
  while (i < arr.length) {
    let j = randomRange(0, i)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i++
  }
}
// ([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]];
export let bundle = (arr, n) => {
  let result = []
  for (let i = 0; i < arr.length; i = i + n) {
    result.push(arr.slice(i, i + n))
  }
  return result
}

export let reversed = (arr) => {
  let result = []
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i])
  }
  return result
}

export let rangeArr = (min, max, step = 1) => {
  let arr = []
  for (let i = min; i < max; i += step) {
    arr.push(i)
  }
  return arr
}

export let constrain = (value, min, max) => {
  if (value > max) {
    return max
  } else if (value < min) {
    return min
  } else {
    return value
  }
}

export let map = (value, minSource, maxSource, minTarget, maxTarget) => {
  let deltaResource = maxSource - minSource
  let deltaTarget = maxTarget - minTarget
  let result = minTarget + (value / deltaResource) * deltaTarget
  return constrain(result, minTarget, maxTarget)
}

export let selectFrom = (arr, num = 1) => {
  if (arr.length < num) {throw new Error('the array is too small')}
  let copy = [], result = []
  Object.assign(copy, arr)
  while (result.length < num) {
    let index = randomRange(0, copy.length)
    let selected = copy.splice(index, 1)[0]
    result.push(selected)
  }
  return result
}


export let getImagePoints = (image,resolution=30,regular=false) => {
  let target = new createjs.Bitmap(image)
  let points = []
  if(regular){
      for(let i = 0; i < target.image.width; i+=resolution){
          for(let j = 0; j < target.image.height; j+=resolution){
              if(target.hitTest(i,j)){
                  points.push({x:i,y:j})
              }
          }
      }
  }else {
      let px, py
      for(let i = 0; i < target.image.width; i+=resolution){
          for(let j = 0; j < target.image.height; j+=resolution){
              px = babyEye.randomRange(0, target.image.width)
              py = babyEye.randomRange(0, target.image.height)
              if(target.hitTest(px,py)){
                  points.push({x:px,y:py})
              }
          }
      }
  }
  return points
}

export let randomChoice = (arr) => arr[babyEye.randomRange(0, arr.length)]

export let swap = (arr, i,j) => {
  [arr[i], arr[j]] = [arr[j],arr[i]] 
}
