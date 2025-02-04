const Menues = require("../../model/menu");
const Restaurants = require("../../model/restaurant");

//[GET] api/v1/menues/menues-restaurant
module.exports.menuWithRestaurant = async (req, res) => {
    try {
        const { idRestaurant } = req.query;
        const menues = await Menues.find({
            restaurant: idRestaurant
        })
        res.status(200).json({
            code: 200,
            data: menues,
            message: "Get Menues Restaurant Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}