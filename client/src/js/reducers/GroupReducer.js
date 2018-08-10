/**
 * group reducer,
 * responsible for updating the state properties related to group.
 */

import {
    GROUP_LIST_SUCCESS, GROUP_LIST_FAILURE, GROUP_DELETE_SUCCESS
} from '../actions/GroupActions'

export function groups(state = {groupsList: []}, action) {
    switch (action.type) {
        // an action when groups list loaded successfully.
        case GROUP_LIST_SUCCESS:
            return {
                ...state,
                groupsList: action.payload,
            }
        // an action when groups list loading, an error occured.
        case GROUP_LIST_FAILURE:
            return {
                ...state,
                groupsList: [],
            }
        // an action when deleting a group done successfully.
        case GROUP_DELETE_SUCCESS:
            return {
                ...state,
                // removing the element in groupsList at the index position.
                groupsList: [...state.groupsList.slice(0, action.payload), ...state.groupsList.slice(action.payload + 1 )]
            }
        default:
            return state
    }
}