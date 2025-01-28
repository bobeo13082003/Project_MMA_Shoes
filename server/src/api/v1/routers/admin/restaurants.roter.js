const express = require('express');
const routes = express.Router();
const controller = require('../../controller/admin/restaurants.controller')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadCloud = require('../../../../middleware/uploadCloud');
const Authorization = require('../../../../middleware/authorization.middleware')
routes.post('/new-restaurant',
    Authorization.AuthorizationAdmin,
    upload.single('image'),
    uploadCloud.uploadCloud,
    controller.createRestaurant)

routes.get('/all-restaurant',
    Authorization.AuthorizationAdmin,
    controller.getAllRestaurant
)


module.exports = routes;
