const express = require('express');
const routes = express.Router();
const controller = require('../../controller/admin/order.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.get('/', Authorization.AuthorizationAdmin, controller.allOrder)
routes.put('/confirm/:orderId', Authorization.AuthorizationAdmin, controller.confirmOrder)

module.exports = routes;