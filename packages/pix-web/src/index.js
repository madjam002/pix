/* eslint-env browser */

import 'whatwg-fetch'
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {GraphQLProvider} from 'react-graphql'

import Router from './routes'
import graphContext from 'core/api'

import store from './store'

import './index.css'
import '@blueprintjs/core/dist/blueprint.css'

ReactDOM.render(
  <Provider store={store}>
    <GraphQLProvider context={graphContext}>
      <Router />
    </GraphQLProvider>
  </Provider>,
  document.getElementById('root'),
)
