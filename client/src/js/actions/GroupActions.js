/**
 * group actions
 * i.e. list load success/failure, delete group successfully, etc.
 */
// an action when groups list loaded successfully.
export const GROUP_LIST_SUCCESS = 'GROUP_LIST_SUCCESS'
// an action when groups list loading, an error occured.
export const GROUP_LIST_FAILURE = 'GROUP_LIST_FAILURE'
export function groupListSuccess(groups) {
    return {
        type: GROUP_LIST_SUCCESS,
        payload: groups
    }
}
export function groupListFailure() {
    return {
        type: GROUP_LIST_FAILURE,
    }
}

// an action when deleting a group done successfully.
export const GROUP_DELETE_SUCCESS = 'GROUP_DELETE_SUCCESS'
export function groupDeleteSuccess(index) {
    return {
        type: GROUP_DELETE_SUCCESS,
        payload: index
    }
}