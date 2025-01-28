const Users = require('../api/v1/model/user')

module.exports.Authorization = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                code: 401,
                message: "Not found token"
            });
        }
        next();
    } catch (error) {
        res.sendStatus(403);
    }
};
module.exports.AuthorizationAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                code: 401,
                message: "Not found token"
            });
        }
        const admin = await Users.findOne({
            token: token,
            role: "admin"
        })
        if (!admin) {
            return res.json({
                code: 400,
                message: "Not found admin"
            })
        }
        next();
    } catch (error) {
        res.sendStatus(403);
    }
};




