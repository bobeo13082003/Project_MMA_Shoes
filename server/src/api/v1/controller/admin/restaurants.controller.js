const Restaurants = require("../../model/restaurant");

// [POST] api/v1/restaurant/new-restaurant
module.exports.createRestaurant = async (req, res) => {
    try {
        const title = req.body.title;
        const titleExits = await Restaurants.findOne({
            title: title,
            status: "active",
            deleted: false
        })
        let slug;
        if (titleExits) {
            slug = JSON.stringify({
                title: title,
                subtitle: titleExits._id
            });
        }
        const category = new Restaurants({ ...req.body, slug: slug })
        await category.save();
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