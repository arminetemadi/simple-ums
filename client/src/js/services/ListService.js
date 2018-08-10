/**
 * a service which is responsible for handling the requests,
 * for preparing the lists, detail of user/group, and also deleting functionality.
 */

import axios from 'axios'

/**
 * get detail of the user/group from the server.
 * 
 * @param string modelName 'user' or 'group'
 * @param integer id
 */
export const getDetail = async (modelName, id) => {
    const result = await axios({
        method: 'get',
        url: '/' + modelName + 's/detail/',
        params: {
            id: id
        },
    })

    return result.data
}

/**
 * delete (a link between user and group)/user/group.
 * 
 * @param integer id of the link/user/group
 */
export const deleteItem = async (modelName, id) => {
    const result = await axios({
        method: 'post',
        url: '/' + modelName + 's/delete/',
        data: {
            id: id,
        }
    })

    return result.data
}

/**
 * load users/groups from the server.
 * 
 * @param string modelName 'user' or 'group'
 * @param objecr data search datas
 */
export const loadList = async (modelName, data) => {
    const result = await axios({
        method: 'get',
        url: '/' + modelName + 's/',
        params: data,
    })

    return result.data
}
