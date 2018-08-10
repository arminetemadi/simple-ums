/**
 * a MOCK service for testing,
 * to handle requests when testing.
 */

import axios from 'axios'

// groups mock data
const mockData = {
    group: [
        {
            id: 1,
            name: 'Group 1'
        },
        {
            id: 2,
            name: 'Group 2'
        },
    ],
    user: [
        {
            id: 1,
            name: 'User 1'
        },
        {
            id: 2,
            name: 'User 2'
        },
    ]
}

/**
 * get select options from the mockData array,
 * in order to load them in forms when testing,
 * i.e. users, groups, etc.
 * 
 * @param string modelName
 */
export const loadSelectOptions = async modelName => {
    return await new Promise(resolve => {
        resolve({
            success: true, 
            result: mockData[modelName]
        });
    })
}

/**
 * send the given data to the url route at server,
 * in order to save them.
 * 
 * @param string url where the data should be sent
 * @param object data to be saved in the db
 */
export const saveData = async (url, data) => {
    return await new Promise(resolve => {
        resolve({
            success: true, 
        });
    })
}