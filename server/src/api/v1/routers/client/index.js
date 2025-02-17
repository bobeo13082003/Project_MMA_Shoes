const authRoute = require('./auths.router')
const restaurantRoute = require('./restaurants.router')
const menuRoute = require('./menues.roter')
const orderRoute = require('./order.router')

module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + '/auth', authRoute)
    app.use(api + '/restaurant', restaurantRoute)
    app.use(api + '/menues', menuRoute)
    app.use(api + '/orders', orderRoute)

}