import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import hrmsApp from '../reducers/index'
import thunkMiddleware from 'redux-thunk'
import { mount } from 'enzyme'
import App from '../App'

// test if the application run without any errors.
it('application renders without crashing', () => {
    let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
    let store = createStoreWithMiddleware(hrmsApp)

    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
})