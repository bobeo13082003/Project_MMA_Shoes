const authRoute = require('./auths.router')
module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + '/auth', authRoute)
}