const express = require('express');
const routes = express.Router();
const controller = require('../../controller/client/auths.controller')

routes.post('/register', controller.register)
routes.post('/login', controller.login)
routes.post('/vertify-email', controller.vertifyEmail)
routes.post('/forgot-password', controller.forgot)
routes.post('/otp-forgot', controller.otp)
routes.post('/reset', controller.reset)
routes.post('/resend-otp', controller.resendOtp)

module.exports = routes;
