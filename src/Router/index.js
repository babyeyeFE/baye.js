export default class Router {
  constructor() {
    this.routes = {}
    window.addEventListener('load', this.resolve.bind(this), false)
    window.addEventListener('hashchange', this.resolve.bind(this), false)
  }

  route(path, callback) {
    this.routes[path] = callback || function() { }
  }

  resolve() {
    this.curHash = location.hash.slice(1) || '/'
    typeof this.routes[this.curHash] === 'function' && this.routes[this.curHash]()
  }
}
