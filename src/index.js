import autobind from 'core-decorators/lib/autobind'
import {applyInjectProps as injectProps} from './injectProps'
import renderWhen from './renderWhen'
import injectPropsClass from './injectPropsClass'
import shouldUpdateFor from './shouldUpdateFor'
import validateOn from './validateOn'
import validateSetState from './validateSetState'

export default {
  autobind,
  injectProps,
  // applyInjectProps,
  renderWhen,
  injectPropsClass,
  shouldUpdateFor,
  validateOn,
  validateSetState,
}
