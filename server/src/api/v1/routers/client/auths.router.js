const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/auths.controller')

routes.post('/register', controller.register)

module.exports = routes;
