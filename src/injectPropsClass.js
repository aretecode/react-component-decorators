import {applyInjectProps} from './injectProps'

function renderArgsClass(options = ['props', 'state']) {
  var propsToInject = ['props', 'state']
  if (!Array.isArray(options)) {
    var decoratorArgsBecauseNoOptions = options
    return decorate(decoratorArgsBecauseNoOptions)
  } else {
    propsToInject = options
  }

  function decorate(target) {
    return class InjectPropsClass extends target {
      @applyInjectProps(propsToInject)
      render() {
        // console.debug('------ rendering with args', {props: this.props, state: this.state})
        return super.render(this.props, this.state)
      }
    }
  }
  return decorate
}

export default renderArgsClass
export {
  applyInjectProps,
  renderArgsClass,
}
