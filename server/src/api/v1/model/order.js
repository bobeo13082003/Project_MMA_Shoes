const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: String,
    restaurantId: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    orderItems: [
        {
            title: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ["PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"], default: "PENDING" },
    payment: String
}, {
    timestamps: true
})

const Orders = mongoose.model("Orders", orderSchema, 'orders')

module.exports = Orders;