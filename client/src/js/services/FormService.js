/**
 * a service which is responsible for handling the requests,
 * for preparing the forms fields.
 */

import axios from 'axios'

/**
 * get select options from the server,
 * in order to load them in forms,
 * i.e. users, groups, etc.
 * 
 * @param string modelName
 */
export const loadSelectOptions = async modelName => {
    const result = await axios({
        method: 'get',
        url: '/' + modelName + 's/options/',
    })

    return result.data
}

/**
 * send the given data to the url route at server,
 * in order to save them.
 * 
 * @param string url where the data should be sent
 * @param object data to be saved in the db
 */
export const saveData = async (url, data) => {
    const result = await axios({
        method: 'post',
        url: url,
        data: data
    })

    return result.data
}