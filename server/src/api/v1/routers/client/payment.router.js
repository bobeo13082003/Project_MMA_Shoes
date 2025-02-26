const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/vnpay.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.post('/create_payment_url', Authorization.Authorization, controller.createPayment)

module.exports = routes;
