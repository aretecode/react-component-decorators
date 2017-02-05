/* eslint 'no-for-each/no-for-each': 2 */

/**
 * @return {boolean}
 */
export default function validateOn(conditions, state, options = {}) {
  const defaultOptions = {
    satisfied: true,
    debug: false,
    exists: true,
    thisArg: false,

    // example conditions: {
    //  state: (val) => true,
    //  props: {
    //    eh: false,
    //  }
    // }
    conditions,
  }
  options = Object.assign(defaultOptions, options)

  let satisfied = options.satisfied
  let conds = options.conditions

  if (!conds) {
    console.error({conditions, state, options})
    throw new Error('@validate on requires .conditions')
  }

  if (options.exists && !state) {
    return false
  }

  // loop our condition
  for (let ii = 0, condsLen = conds.length; ii < condsLen; ii++) {
    var conditionProperty = conds[ii]

    // -----
    // loop the values, for the condition at the current condition property
    // @example: {
    //   state: {
    //     loading: (loading) => loading === false,
    //   }
    // }
    let isObj = false
    let keys = state
    // if (Array.isArray(state)) keys = state

    // checks if it exists above ^
    if (typeof state === 'object') {
      keys = Object.keys(state)
      isObj = true
    }
    for (let i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      var val = key

      // so we can loop through objects or array
      if (isObj) val = state[key]

      var condition = conditionProperty[key]

      if (!condition) {
        if (options.debug) {
          console.debug('@validateOn had no condition fn for ', condition)
        }
      }
      else if (typeof condition == 'boolean') {
        // if (val === condition)
        if (val) {
          satisfied = true
        }
      }
      else if (typeof condition === 'function') {
        if (options.thisArg) {
          if (!condition.call(this, val)) {
            satisfied = false
          }
        }
        else if (!condition(val)) {
          satisfied = false
        }
      }
    }
  }

  return satisfied
}
