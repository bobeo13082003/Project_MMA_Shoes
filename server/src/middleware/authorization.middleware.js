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
