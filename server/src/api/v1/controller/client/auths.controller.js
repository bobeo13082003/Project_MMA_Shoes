const md5 = require('md5');
const Users = require('../../model/user');


// [POST] api/v1/auth/register
module.exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const emailExits = await Users.findOne({
            email: email,
            deleted: false
        })

        if (emailExits) {
            res.status(409).json({ message: "Email is Exits" })
        } else {
            req.body.password = md5(req.body.password)
            const user = new Users(req.body)
            await user.save();
            res.status(201).json({
                message: "Register successfully",
                userId: user.id
            })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}