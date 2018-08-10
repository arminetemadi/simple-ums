const express = require('express')
    , router = express.Router()
    , groupModel = require('../models/groupModel')
    , userModel = require('../models/userModel')
    , userGroupLinkModel = require('../models/userGroupLinkModel')

// main route,
// load the list of item, maybe with given params.
router.get("/", (req, res) => {
    const groupId = (req.query.groupId) ? req.query.groupId : 0
    // get all group items with given id of search form.
    groupModel.getAll(groupId).then(groupResult => {
        let tempResult = []
            , i = -1
        // iterating over fetched group items,
        // in order to find out the number of links to users.
        let resultPromise = groupResult.map(item => {
            userGroupLinkModel.getAll(null, item.id).then(linkResult => {
                tempResult[++i] = item
                tempResult[i].linkCount = linkResult.length
            })
        })
        Promise.all(resultPromise).then(result => {
            return res.json({
                success: true,
                result: tempResult
            })
        })


    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// retrieving all the group options.
router.get("/options/", (req, res) => {
    groupModel.getAll().then(result => {
        return res.json({
            success: true,
            result: result
        })
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for saving the new group by given data.
router.post('/add/', (req, res) => {
    // need sanitizing and more cleaning,
    // but because we have no DB, I skip that part.
    const name = req.body.name.trim()
    const links = req.body.links
    groupModel.save(name).then(groupResult => {
        // check if any links to user set,
        // then save them as well,
        // and if not skip it, new group can survive without any links.
        if (links.length > 0) {
            links.map(link => {
                userGroupLinkModel.save(link, groupResult.id).then(linkResult => {
                    return res.json({
                        success: true,
                    })
                }).catch(reason => {
                    return res.json({
                        success: false,
                        message: reason
                    })
                })
            })
        } else {
            return res.json({
                success: true,
            })
        }
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for deleting a group item.
router.post('/delete/', (req, res) => {
    const id = parseInt(req.body.id)
    groupModel.delete(id).then(groupResult => {
        return res.json({
            success: true,
        })
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for retrieving the detail data of a group.
router.get("/detail", (req, res) => {
    const id = parseInt(req.query.id)
    groupModel.getAll(id).then(groupResult => {
        // check if the url is valid and the group do exist.
        if (groupResult.length === 0) {
            return res.json({
                success: false,
                message: "No group found!"
            })
        } else {
            // retrieve all links of the group
            userGroupLinkModel.getAll(null, id).then(linkResult => {
                groupResult[0].links = linkResult
                // no links still.
                if (groupResult[0].links.length === 0) {
                    return res.json({
                        success: true,
                        result: groupResult[0]
                    })
                } else {
                    // building the data for group links.
                    let tempResult = []
                        , i = -1
                    let resultPromise = groupResult[0].links.map(item => {
                        userModel.getAll(item.userId).then(userResult => {
                            tempResult[++i] = item
                            groupResult[0].links[i].userName = userResult[0].name
                        })
                    })
                    Promise.all(resultPromise).then(result => {
                        return res.json({
                            success: true,
                            result: groupResult[0]
                        })
                    })
                }
            })
        }
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

module.exports = router
