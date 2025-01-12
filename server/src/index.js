const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT

app.use(bodyParser.json())

// database
const database = require('./config/database')
database.connect()

const routerClient = require('./api/v1/routers/client/index')

routerClient(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})