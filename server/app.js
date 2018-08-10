// prepare the process.env constants
require('dotenv').config()

const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')

// setting for response data format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// load all the controllers (routes)
app.use(require('./controllers'))

app.set("port", process.env.PORT || 3001)

// starting the server
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
})
