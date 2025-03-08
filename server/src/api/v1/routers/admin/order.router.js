const express = require('express');
const routes = express.Router();
const controller = require('../../controller/admin/order.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.get('/', Authorization.AuthorizationAdmin, controller.allOrder)
routes.get('/pending', Authorization.AuthorizationAdmin, controller.pendingOrder)
routes.get('/confirm', Authorization.AuthorizationAdmin, controller.confirmOrder)
routes.get('/cancel', Authorization.AuthorizationAdmin, controller.cancelOrder)

module.exports = routes;