const Restaurants = require("../../model/restaurant");

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
            slug = {
                title: title,
                subtitle: titleExits._id
            }
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