const express = require('express')
  , router = express.Router()

// combining all the routes, to require them in the main app.
router.use('/users/', require('./userController'))
router.use('/groups/', require('./groupController'))
router.use('/userGroupLinks/', require('./userGroupLinkController'))

module.exports = router
