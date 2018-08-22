import 'latest-createjs'

import * as clazz from './Class/'
import * as utils from './utils'

if (!window.babyEye) {
  window.babyEye = {}
  Object.assign(window.babyEye, clazz, utils)
}

export * from './Class/'
export * from './utils'
export default babyEye

