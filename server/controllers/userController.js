const express = require('express')
    , router = express.Router()
    , userModel = require('../models/userModel')
    , userGroupLinkModel = require('../models/userGroupLinkModel')
    , groupModel = require('../models/groupModel')

// main route for user,
// retrieving the list data of the user with search params.
router.get("/", (req, res) => {
    const userId = (req.query.userId) ? req.query.userId : 0
    // retrieving all the list items
    userModel.getAll(userId).then(userResult => {
        let tempResult = []
            , i = -1
        // iterating over list items,
        // to find the group links.
        let resultPromise = userResult.map(item => {
            userGroupLinkModel.getAll(item.id).then(linkResult => {
                tempResult[++i] = item
                tempResult[i].linkCount = linkResult.length
            })
        })
        Promise.all(resultPromise).then(function(result) {
            return res.json({
                success: true,
                result: tempResult
            })
        })
    }).catch((reason) => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for adding a new user.
router.post('/add/', (req, res) => {
    // need sanitizing and more cleaning,
    // but because we have no DB, I skip that part.
    const name = req.body.name.trim()
    const links = req.body.links
    userModel.save(name).then(userResult => {
        links.map(link => {
            // saving all the links sent by.
            userGroupLinkModel.save(userResult.id, link).then(linkResult => {
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
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for deleting a user.
router.post('/delete/', (req, res) => {
    const id = parseInt(req.body.id)
    // delete the user.
    userModel.delete(id).then(userResult => {
        // delete all the links of user after deleting the user.
        userGroupLinkModel.deleteByUser(id).then(linkResult => {
            return res.json({
                success: true,
            })
        }).catch(reason => {
            return res.json({
                success: false,
                message: reason
            })
        })
    }).catch(reason => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

// route for retrieving the user detail.
router.get("/detail", (req, res) => {
    const id = parseInt(req.query.id)
    userModel.getAll(id).then(userResult => {
        // check if the url is valid and the user do exist.
        if (userResult.length === 0) {
            return res.json({
                success: false,
                message: "No user found!"
            })
        } else {
            userGroupLinkModel.getAll(id).then((linkResult) => {
                userResult[0].links = linkResult
                // no links found for the user.
                if (userResult[0].links.length === 0) {
                    return res.json({
                        success: true,
                        result: userResult[0]
                    })
                } else {
                    // building the links of the user to show them.
                    let tempResult = []
                        , i = -1
                    let resultPromise = userResult[0].links.map(item => {
                        groupModel.getAll(item.groupId).then(groupResult => {
                            tempResult[++i] = item
                            userResult[0].links[i].groupName = groupResult[0].name
                        })
                    })
                    Promise.all(resultPromise).then(result => {
                        return res.json({
                            success: true,
                            result: userResult[0]
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

// route for retrieving the users options.
router.get("/options/", (req, res) => {
    userModel.getAll().then(result => {
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

module.exports = router