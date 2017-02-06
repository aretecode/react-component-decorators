## react-component-decorators
- helpful react decorators


## example

```js
const loader = <h1>loading eh</h1>
const validateConditions = {
  props: {
    magic: true,
  }
  state: {
    canadians: length => Number.isInteger(length),
  },
}
const validateOpts = {
  // default satisfied false
  satisfied: false,

  // validate not just when ready,
  // but validate every time we render
  //
  // true makes it only render when validated once
  ready: false,

  // displayed until valid
  displayLoading: loader,
}
@renderWhen(validateConditions, validateOpts)
@injectPropsClass(['props', 'state'])
class Eh extends React.Component {
  static propTypes = {
    magic: React.PropTypes.string,
  }
  state = {
    canadians: undefined,
  }

  componentWillReceiveProps = ({magic}) => magic ? this.setState({magic}) : 0
  render({magic}, {canadians}) {
    console.debug({magic, canadians})
  }
}

const loadingEh = <Eh magic={false} />
const validEh = <Eh magic={true} />

```

## importing
```js
import {
  injectProps,
  injectPropsClass,
  renderWhen,
  shouldUpdateFor,
  validateOn,
  validateSetState,

  // also exports autobind & shallowEqual
  // as they are deps anyway
  autobind,
  shallowEqual,
} from 'react-component-decorators'
```


## package size
```js
import injectProps from 'react-component-decorators/lib/injectProps'
import injectPropsClass from 'react-component-decorators/lib/injectPropsClass'
import renderWhen from 'react-component-decorators/lib/renderWhen'
import validateOn from 'react-component-decorators/lib/validateOn'
import validateSetState from 'react-component-decorators/lib/validateSetState'

// also export {shouldUpdateFor, shallowEqual, autobind}
import shouldUpdateFor from 'react-component-decorators/lib/shouldUpdateFor'

// you can also import from
// 'react-component-decorators/src/*'
// if you want to load it yourself
```


## resources
- https://medium.com/@goncalvesjoao/react-es7-decorators-how-to-inject-props-to-your-render-method-27a0a7973106#.w6jwiq6o1
- https://github.com/goncalvesjoao/relpers
- https://github.com/acdlite/recompose
- https://github.com/gooy/js-deco
- https://github.com/wycats/javascript-decorators/issues/23
