export function isMobile() {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var bIsIpad = sUserAgent.match(/ipad/i)
  var bIsIphoneOs = sUserAgent.match(/iphone os/i)
  var bIsMidp = sUserAgent.match(/midp/i)
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)
  var bIsUc = sUserAgent.match(/ucweb/i)
  var bIsAndroid = sUserAgent.match(/android/i)
  var bIsCE = sUserAgent.match(/windows ce/i)
  var bIsWM = sUserAgent.match(/windows mobile/i) 
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true
  } else {
    return false
  }
}

export function getCookie(name) {
  var value = '; ' + document.cookie
  var parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';')
      .shift()
  }
}

export function getParam(url, name) {
  if (url.indexOf('?') === -1) {return null}
  let value = null
  url.split('?')[1].split('&').forEach((param) => {
    if (param.split('=')[0] === name) {
      value = param.split('=')[1]
    }
  })
  return value
}

export function is360() {
  // 检测是否是谷歌内核(可排除360及谷歌以外的浏览器)
  function isChrome() {
    var ua = navigator.userAgent.toLowerCase()

    return ua.indexOf('chrome') > 1
  }
  // 测试mime
  function _mime(option, value) {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] == value) {
        return true
      }
    }
    return false
  }

  // application/vnd.chromium.remoting-viewer 可能为360特有
  var is360Value = _mime('type', 'application/vnd.chromium.remoting-viewer')

  return (isChrome() && is360Value)
}
