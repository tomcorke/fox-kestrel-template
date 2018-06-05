import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './redux/store'

import Site from './components/site'

import './reset.scss'
import './base.scss'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Site />
  </Provider>,
  document.getElementById('app')
)
