import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './Redux/index'
import {composeWithDevTools} from 'redux-devtools-extension'

export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware()
))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
