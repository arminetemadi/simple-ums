/**
 * user actions
 * i.e. list load success/failure, delete user successfully, etc.
 */
// an action when users list loaded successfully.
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
// an action when users list loading, an error occured.
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'
export function userListSuccess(users) {
    return {
        type: USER_LIST_SUCCESS,
        payload: users
    }
}
export function userListFailure() {
    return {
        type: USER_LIST_FAILURE,
    }
}

// an action when deleting a user done successfully.
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export function userDeleteSuccess(index) {
    return {
        type: USER_DELETE_SUCCESS,
        payload: index
    }
}