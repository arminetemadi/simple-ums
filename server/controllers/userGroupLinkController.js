const express = require('express')
    , router = express.Router()
    , userGroupLinkModel = require('../models/userGroupLinkModel')

// route for adding new link between user and group.
router.post('/add/', (req, res) => {
    const userId = parseInt(req.body.userId)
    const groupId = parseInt(req.body.groupId)
    userGroupLinkModel.save(userId, groupId).then(linkResult => {
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

// route for deleting a link between user and group.
router.post('/delete/', (req, res) => {
    const id = parseInt(req.body.id)
    userGroupLinkModel.delete(id).then((linkResult) => {
        return res.json({
            success: true,
        })
    }).catch((reason) => {
        return res.json({
            success: false,
            message: reason
        })
    })
})

module.exports = router
