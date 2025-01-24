const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const menueschema = new mongoose.Schema({
    restaurant: String,
    name: String,
    description: String,
    price: String,
    image: String,
    slug: {
        type: String,
        slug: ["title", "subtitle"], unique: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    },

},
    {
        timestamps: true
    }
)

const Menues = mongoose.model('Menues', menueschema, 'menues');

export default Menues;