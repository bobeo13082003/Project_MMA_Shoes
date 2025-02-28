const Orders = require("../../model/order")


// [POST] api/v1/orders
module.exports.userOrder = async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        const order = new Orders({ ...req.body, userId: token });
        await order.save();
        res.json({
            code: 200,
            data: order,
            message: "Save Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[GET] api/v1/order-history
module.exports.orderHistory = async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        const order = await Orders.find({
            userId: token
        }).sort({ createdAt: -1 })
        res.json({
            code: 200,
            data: order,
            message: "Get Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}