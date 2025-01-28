const Users = require("../../model/user");
const md5 = require('md5');
// [POST] api/v1/auth/login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            email,
            role: "admin",
            deleted: false
        })
        if (!user) {
            return res.json({ code: 400, message: "Email Not Correct" })
        }
        if (md5(password) !== user.password) {
            return res.json({ code: 401, message: "Password Not Correct" })
        }
        if (user.status === "inactive") return res.status(402).json({ code: 402, message: "Account Need Vertify Email" })

        res.status(200).json({
            token: user.token,
            code: 200,
            message: "Login Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [POST] api/v1/admin/register
module.exports.register = async (req, res) => {
    try {

        const { email } = req.body;
        const emailExits = await Users.findOne({
            email: email,
            deleted: false
        })

        if (emailExits) {
            res.status(409).json({ message: "Email is Exits", code: 401 })
        } else {
            req.body.password = md5(req.body.password)
            const user = new Users({ ...req.body, role: "admin", status: "active" })
            await user.save();
            res.status(201).json({
                message: "Register successfully",
                code: 201
            })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}