import autobind from 'core-decorators/lib/autobind'
import shallowEqual from 'fbjs/lib/shallowEqual'

/**
 * @TODO:
 * - [ ] method decorator
 * - [ ] optimize loops
 *
 * {
 *   state: ['eh']
 *   props: {
 *     eh: cb,
 *     ha: undefined,
 *   }
 * }
 */
function shouldUpdateFor(options) {
  var conditions = options
  if (Array.isArray(options)) {
    conditions = {
      props: options,
    }
  }
  var properties = Object.keys(conditions)
  var keys = Object.values(conditions)

  // set up our initial values
  var previousValueFor = {}
  properties.forEach(prop => {
    previousValueFor[prop] = {}
    keys.forEach(key => {
      previousValueFor[prop][key] = undefined
    })
  })

  // class decorator
  function extendTarget(target) {
    return class ShouldUpdateFor extends target {
      previousValueFor = previousValueFor

      @autobind
      shouldComponentUpdate(nextProps) {
        var eq = false

        properties.forEach(prop => keys.forEach(key => {
          // variables
          var prev, current
          if (prop === 'props') {
            prev = this.props[key]
            current = nextProps[key]
          } else {
            prev = this.previousValueFor[prop][key]
          }

          // comparisons
          if (prev === this[prop][key]) {
            eq = true
          } else if (shallowEqual(prev, current)) {
            eq = true
          } else {
            eq = false
          }
        }))

        return eq
      }
    }
  }

  return extendTarget
}

export default shouldUpdateFor
export {
  shallowEqual,
  shouldUpdateFor,
}
