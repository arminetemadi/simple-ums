/**
 * user reducer,
 * responsible for updating the state properties related to user.
 */

import {
    USER_LIST_SUCCESS, USER_LIST_FAILURE, USER_DELETE_SUCCESS
} from '../actions/UserActions'

export function users(state = {usersList: []}, action) {
    switch (action.type) {
        // an action when users list loaded successfully.
        case USER_LIST_SUCCESS:
            return {
                ...state,
                usersList: action.payload,
            }
        // an action when users list loading, an error occured.
        case USER_LIST_FAILURE:
            return {
                ...state,
                usersList: [],
            }
        // an action when deleting a user done successfully.
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                // removing the element in usersList at the index position.
                usersList: [...state.usersList.slice(0, action.payload), ...state.usersList.slice(action.payload + 1 )]
            }
        default:
            return state
    }
}