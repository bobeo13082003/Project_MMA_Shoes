const express = require('express');
const routes = express.Router();
const controller = require('../../controller/admin/menues.controller')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadCloud = require('../../../../middleware/uploadCloud');
const Authorization = require('../../../../middleware/authorization.middleware')
routes.post('/new-menues',
    Authorization.AuthorizationAdmin,
    upload.single('image'),
    uploadCloud.uploadCloud,
    controller.createMenu)
routes.get('/all-menues',
    Authorization.AuthorizationAdmin,
    controller.allMenu)



module.exports = routes;
