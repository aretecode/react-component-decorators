import autobind from 'core-decorators/lib/autobind'
import {applyInjectProps as injectProps} from './injectProps'
import renderWhen from './renderWhen'
import injectPropsClass from './injectPropsClass'
import {shouldUpdateFor, shallowEqual} from './shouldUpdateFor'
import validateOn from './validateOn'
import validateSetState from './validateSetState'

export default {
  autobind,

  injectProps,
  injectPropsClass,
  // applyInjectProps,

  renderWhen,
  validateOn,
  validateSetState,

  shouldUpdateFor,
  shallowEqual,
}
