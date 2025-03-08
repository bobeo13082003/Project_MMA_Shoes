const restaurantRoute = require('./restaurants.roter')
const menuRoute = require('./menues.roter')
const authRoute = require('./auths.router')
const orderRoute = require('./order.router')
module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + '/admin', authRoute)
    app.use(api + '/admin/restaurant', restaurantRoute)
    app.use(api + '/menues', menuRoute)
    app.use(api + '/admin/order', orderRoute)
}