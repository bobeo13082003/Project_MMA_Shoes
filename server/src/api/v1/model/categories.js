const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const categoriesSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    category_id: {
        default: "",
        type: String
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
})

const Categories = mongoose.model('Categories', categoriesSchema, "categories")

module.exports = Categories;