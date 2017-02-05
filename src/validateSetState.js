import validateOn from './validateOn'

// @TODO:
// - [ ] with a queue

// can extend with options or just class
export default function(conditions = {}, options = {}) {
  const defaults = {debug: true}
  options = Object.assign(defaults, options)

  function extendTarget(target) {
    return class ValidateWhenUpdating extends target {
      constructor(...args) {
        super(...args)
        let setState = this.setState
        this.setState = (...args) => {
          var [newState] = args
          if (validateOn(conditions, newState, options))
            return setState.apply(this, args)
          else if (options.debug)
            console.debug('new state did not match conditions', newState)
        }
      }
    }
  }
  return extendTarget
}
