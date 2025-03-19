const Orders = require("../../model/order")
const Users = require("../../model/user")


// api/v1/admin/order
module.exports.allOrder = async (req, res) => {
    try {
        const orders = await Orders.find().sort({ createAt: -1 })
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                const userId = orders[i].userId;
                const user = await Users.findOne({ token: userId }).select("email userName");

                if (user) {
                    orders[i] = { ...orders[i].toObject(), user };
                }
            }
        }

        res.json({
            code: 200,
            data: orders,
            message: "Get All Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// api/v1/admin/order/pending-order
module.exports.pendingOrder = async (req, res) => {
    try {
        const orders = await Orders.find({
            status: "PENDING"
        }).sort({ createAt: -1 })
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                const userId = orders[i].userId;
                const user = await Users.findOne({ token: userId }).select("email userName");

                if (user) {
                    orders[i] = { ...orders[i].toObject(), user };
                }
            }
        }
        res.json({
            code: 200,
            data: orders,
            message: "Get PENDING Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// api/v1/admin/order/confirm-order
module.exports.confirmOrder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.orderId);
        if (!order) {
            return res.json("Not Found Order");
        }
        if (order.status === "CONFIRMED") {
            return res.json("Order is Confirmed")
        }
        await Orders.findByIdAndUpdate(req.params.orderId, { status: "CONFIRMED" })
        res.json({
            code: 200,
            message: "CONFIRMED Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
// api/v1/admin/order/cancel-order
module.exports.cancelOrder = async (req, res) => {
    try {
        const orders = await Orders.find({
            status: "CANCELLED"
        }).sort({ createAt: -1 })
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                const userId = orders[i].userId;
                const user = await Users.findOne({ token: userId }).select("email userName");

                if (user) {
                    orders[i] = { ...orders[i].toObject(), user };
                }
            }
        }
        res.json({
            code: 200,
            data: orders,
            message: "Get CANCELLED Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}