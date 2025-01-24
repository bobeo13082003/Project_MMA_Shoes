const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const restaurantsSchema = new mongoose.Schema({
    title: String,
    image: String,
    phone: String,
    address: String,
    email: String,
    rating: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "active"
    },
    slug: {
        type: String,
        slug: ["title", "subtitle"], unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
})

const Restaurants = mongoose.model('Restaurants', restaurantsSchema, "restaurants")

module.exports = Restaurants;