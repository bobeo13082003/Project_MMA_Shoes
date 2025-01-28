const restaurantRoute = require('./restaurants.roter')
const authRoute = require('./auths.router')
module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + '/admin', authRoute)
    app.use(api + '/restaurant', restaurantRoute)
}