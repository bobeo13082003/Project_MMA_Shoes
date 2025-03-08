const Orders = require("../../model/order")
const Users = require("../../model/user")


// api/v1/admin/order
module.exports.allOrder = async (req, res) => {
    try {
        const order = await Orders.find({}).sort({ createAt: -1 })
        const orderData = order.map(o => {
            // const user = await Users.findById(order.userId).select("email")

        })
        res.json({
            code: 200,
            data: orderData,
            message: "Get All Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// api/v1/admin/order/pending-order
module.exports.pendingOrder = async (req, res) => {
    try {
        const order = await Orders.find({
            status: "PENDING"
        }).sort({ createAt: -1 })
        res.json({
            code: 200,
            data: order,
            message: "Get PENDING Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// api/v1/admin/order/confirm-order
module.exports.confirmOrder = async (req, res) => {
    try {
        const order = await Orders.find({
            status: "CONFIRMED"
        }).sort({ createAt: -1 })
        res.json({
            code: 200,
            data: order,
            message: "Get CONFIRMED Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
// api/v1/admin/order/cancel-order
module.exports.cancelOrder = async (req, res) => {
    try {
        const order = await Orders.find({
            status: "CANCELLED"
        }).sort({ createAt: -1 })
        res.json({
            code: 200,
            data: order,
            message: "Get CANCELLED Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}