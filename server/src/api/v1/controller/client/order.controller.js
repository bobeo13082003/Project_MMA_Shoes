const Orders = require("../../model/order")

module.exports.userOrder = async (req, res) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        res.json({
            code: 200,
            message: "Save Order Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}