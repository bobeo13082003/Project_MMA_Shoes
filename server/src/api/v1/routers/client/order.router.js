const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/order.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.post('/',
    Authorization.Authorization,
    controller.userOrder)


module.exports = routes;