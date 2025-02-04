const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/menues.controller')
const Authorization = require('../../../../middleware/authorization.middleware')


routes.get('/menues-restaurant',
    Authorization.Authorization,
    controller.menuWithRestaurant)


module.exports = routes;
