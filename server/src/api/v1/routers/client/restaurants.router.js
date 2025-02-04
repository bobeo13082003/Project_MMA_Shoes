const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/restaurants.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.get('/top-5', Authorization.Authorization, controller.getTop5Restaurant)
routes.get('/new', Authorization.Authorization, controller.getNewRestaurant)
routes.get('/free-ship', Authorization.Authorization, controller.getFreeShipRestaurant)
routes.get('/detail-restaurant', Authorization.Authorization, controller.detailRestaurant)

module.exports = routes;
