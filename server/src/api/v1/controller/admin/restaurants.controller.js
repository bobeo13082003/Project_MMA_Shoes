const Restaurants = require("../../model/restaurant");

// [POST] api/v1/restaurant/new-restaurant
module.exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurants(req.body)
        await restaurant.save();
        res.status(201).json({
            code: 201,
            message: "Create Restaurants Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/v1/restaurant/all-restaurant
module.exports.getAllRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurants.find({
            deleted: false
        })
        res.status(200).json({
            code: 200,
            message: "Get All Restaurants Successfully",
            data: restaurants
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

