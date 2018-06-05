import 'latest-createjs'

import * as clazz from './src/class/'
import * as utils from './src/utils'

if (!window.babyEye) {
  window.babyEye = {}
  Object.assign(window.babyEye, clazz, utils)
}

export * from './src/class/'
export * from './src/utils'
export default babyEye

