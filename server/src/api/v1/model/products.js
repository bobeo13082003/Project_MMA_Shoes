const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    category_id: {
        default: "",
        type: String
    },
    slug: {
        type: String,
        slug: ["title", "subtitle"], unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)

const Products = mongoose.model('Products', productSchema, 'products');

export default Products;