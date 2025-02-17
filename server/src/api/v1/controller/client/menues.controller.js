const Menues = require("../../model/menu");
const Restaurants = require("../../model/restaurant");

//[GET] api/v1/menues/menues-restaurant
module.exports.menuWithRestaurant = async (req, res) => {
    try {
        const { idRestaurant } = req.query;
        const menues = await Menues.find({
            restaurant: idRestaurant
        })
        for (const menu of menues) {
            const restau = await Restaurants.findOne({
                _id: menu.restaurant
            })
            menu.restaurant = restau;
        }
        res.status(200).json({
            code: 200,
            data: menues,
            message: "Get Menues Restaurant Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[GET] api/v1/menues/detail-product
module.exports.detailProduct = async (req, res) => {
    try {
        const { idProduct } = req.query;
        const product = await Menues.findOne({
            _id: idProduct
        })
        res.status(200).json({
            code: 200,
            data: product,
            message: "Get Product Restaurant Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}