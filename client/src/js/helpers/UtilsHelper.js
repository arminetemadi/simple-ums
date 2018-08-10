/**
 * helper function,
 * utils for different usages,
 * i.e. handling the query string parameters
 *
 * @param queryString query string given from url
 * @param params an array of needles trying to find in queryString
 * @returns false/integer
 */
export function GetQueryStringParams(queryString, params) {
    let qsVariables = queryString.substring(1).split('&');
    let result = {}
    qsVariables.forEach(qsVariable => {
        let pair = qsVariable.split('=');
        if (params.indexOf(pair[0]) >= 0) {
            result[pair[0]] = pair[1]
        }
    })
    return result
}