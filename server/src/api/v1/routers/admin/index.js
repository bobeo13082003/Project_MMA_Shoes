const restaurantRoute = require('./restaurants.roter')
module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + '/restaurant', restaurantRoute)
}