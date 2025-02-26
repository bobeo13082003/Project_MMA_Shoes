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

// [PUT] api/v1/restaurant/edit-restaurant
module.exports.editRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        await Restaurants.updateOne({
            _id: id
        }, req.body);
        res.status(200).json({
            code: 200,
            message: "Update Restaurants Successfully",
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [DELETE] api/v1/restaurant/delete-restaurant
module.exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        await Restaurants
            .updateOne({
                _id: id
            }, { deleted: true });
        res.status(200).json({
            code: 200,
            message: "Delete Restaurants Successfully",
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

