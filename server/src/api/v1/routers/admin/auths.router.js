const express = require('express');
const routes = express.Router();
const controller = require('../../controller/admin/auths.controller')
const Authorization = require('../../../../middleware/authorization.middleware')

routes.post('/login', controller.login)
routes.post('/register', controller.register)


module.exports = routes;
