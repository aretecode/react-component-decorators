function injectProps(propertyNames, target, name, descriptor) {
  const originalFunction = descriptor.value

  if (typeof originalFunction !== 'function') {
    throw new SyntaxError(`@injectProps can only be used on functions, not: ${originalFunction}`)
  }

  return {
    ...descriptor,
    value: function propsInjectorWrapper(...args) {
      let toInject = []
      for (let i = 0; i < propertyNames.length; i++)
        toInject.push(this[propertyNames[i]])

      return originalFunction.apply(this, toInject.concat(args))
    },
  }
}

/**
 * @params: ''
 */
function applyInjectProps(...args) {
  var [first] = args

  // if it is an object, apply as arguments
  if (typeof first === 'object' && !Array.isArray(first)) {
    return injectProps(['props'], ...args)
  }

  // then bind to null
  // then bind args (an array, or string) as the first argument
  // so we can use it as a decorator with options
  //
  // if it is an array, use that
  else if (Array.isArray(first)) {
    return injectProps.bind(null, first)
  }

  // otherwise args is an array so it goes in
  else {
    return injectProps.bind(null, args)
  }
}

export default applyInjectProps
export {injectProps, applyInjectProps}
