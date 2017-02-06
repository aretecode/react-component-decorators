import validateOn from './validateOn'

// @TODO:
// - [ ] add a class builder to have those presets available

// state, props
// fn callback, or exists
//
// can extend with options or just class
export default function(conditions = {}, options = {}) {
  const defaultOptions = {
    conditions,

    // passes in apply to validators
    thisArg: false,

    // used when rendering non valid
    displayLoading: null,

    // will not even try to validate unless the value
    // exists
    exists: true,

    // if this is false,
    // it will validate on every render
    ready: true,
  }
  options = Object.assign(defaultOptions, options)
  let displayed = options.displayLoading
  if (typeof displayed === 'function') displayed = displayed()

  return function extendTarget(target) {
    class RenderWhenReady extends target {
      readyToRender = false

      // @autobind
      render() {
        if (options.ready && this.readyToRender) {
          return super.render(this.props, this.state)
        }

        // if not valid
        if (validateOn(options, this)) {
          this.readyToRender = true
          return super.render(this.props, this.state)
        } else {
          return displayed
        }
      }
    }

    return RenderWhenReady
  }
  // return extendTarget
}
