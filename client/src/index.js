import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import umsApp from './js/reducers/index'
import App from './js/App'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
let store = createStoreWithMiddleware(umsApp)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
