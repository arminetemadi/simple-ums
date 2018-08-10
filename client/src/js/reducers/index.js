import { combineReducers } from 'redux'
import { users } from './UserReducer'
import { groups } from './GroupReducer'

// We combine the reducers here so that they
// can be left split apart above.
const umsApp = combineReducers({
    users,
    groups,
})

export default umsApp
