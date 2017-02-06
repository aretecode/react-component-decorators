/* eslint 'no-for-each/no-for-each': 2 */

/**
 * @return {boolean}
 */
export default function validateOn(conditions, valuesToCheck, options = {}) {
  const defaultOptions = {
    satisfied: false,
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

  if (conds.conditions) conds = conds.conditions
  if (conds.conditions) conds = conds.conditions

  if (!conds) {
    console.error({conditions, valuesToCheck, options})
    throw new Error('@validate on requires .conditions')
  }

  if (options.exists && !valuesToCheck) {
    return false
  }

  let condIsObj = false
  let condKeys = conds
  if (typeof conds === 'object') {
    condKeys = Object.keys(conds)
    condIsObj = true
  }


  // loop our condition
  for (let ii = 0, condsLen = condKeys.length; ii < condsLen; ii++) {
    var condProp = condKeys[ii]
    // if (condIsObj)

    // -----
    // loop the values, for the condition at the current condition property
    // @example: {
    //   state: {
    //     loading: (loading) => loading === false,
    //   }
    // }
    let isObj = false
    let keys = Object.keys(conds[condProp])
    let condsForProp = conds[condProp]

    // @example:
    // `state`
    var vals = valuesToCheck[condProp]

    // loop through each property of the condition
    // would be `.loading` from ^
    for (let i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]

      // @example:
      // this.state.loading
      var val = vals[key]

      // so we can loop through objects or array
      // if (isObj) val = state[key]

      var condition = condsForProp[key]

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
