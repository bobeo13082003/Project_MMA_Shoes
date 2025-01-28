const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT

app.use(bodyParser.json())

app.use(cors())

// database
const database = require('./config/database')
database.connect()

const routerClient = require('./api/v1/routers/client/index')
const routerAdmin = require('./api/v1/routers/admin/index')

routerClient(app);
routerAdmin(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})