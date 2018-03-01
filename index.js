import * as clazz from './class/'
import * as utils from './utils'

if (!window.babyEye) {
  window.babyEye = {}
  Object.assign(window.babyEye, clazz, utils)
}

export * from './class/'
export * from './utils'
export default babyEye

