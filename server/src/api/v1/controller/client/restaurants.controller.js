const Restaurants = require("../../model/restaurant");
const paginationHelper = require("../../../../helper/pagination")
// [GET] api/v1/restaurant/top-5
module.exports.getTop5Restaurant = async (req, res) => {
    try {
        let finalRestaurants;
        const restaurants = await Restaurants.find({
            deleted: false,
            rating: 5
        }).limit(5)
        if (restaurants.length < 5) {
            const remainingCount = 5 - restaurants.length; // Số lượng còn thiếu
            const newRestaurants = await Restaurants.find({
                deleted: false,
                rating: 0
            }).limit(remainingCount);
            finalRestaurants = [...restaurants, ...newRestaurants];
        }
        res.status(200).json({
            code: 200,
            message: "Get Top 5 Restaurants Successfully",
            data: finalRestaurants
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/v1/restaurant/new
module.exports.getNewRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurants.find({
            deleted: false,
        }).sort({ createdAt: -1 }).limit(5)
        res.status(200).json({
            code: 200,
            message: "Get new Restaurants Successfully",
            data: restaurants
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/v1/restaurant/free-ship
module.exports.getFreeShipRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurants.find({
            deleted: false,
        }).sort({ createdAt: -1 }).limit(5)
        res.status(200).json({
            code: 200,
            message: "Get free ship Restaurants Successfully",
            data: restaurants
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// [GET] api/v1/restaurant/detail-restaurant
module.exports.detailRestaurant = async (req, res) => {
    try {
        const { id } = req.query;
        const reataurant = await Restaurants.findOne({
            _id: id,
            deleted: false
        })
        res.status(200).json({
            code: 200,
            message: "Get detail restaurant successfully",
            data: reataurant
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// api/v1/search-restaurant
module.exports.searchRestaurant = async (req, res) => {
    try {
        const regex = new RegExp(req.query.title, "i");
        const restaurant = await Restaurants.find({
            deleted: false,
            status: "active",
            title: regex
        })
            .select("image title")
            .limit(5)
        res.json({
            code: 200,
            data: restaurant
        })
    } catch (error) {
        res.json(error)
    }
}

// [GET] api/v1/restaurant/all-restaurant
module.exports.allRestaurants = async (req, res) => {
    try {
        const allRestaurants = await Restaurants.countDocuments({
            deleted: false,
            status: "active"
        })
        const objectPagination = paginationHelper(
            {
                currentPage: 1,
                limit: 4
            },
            allRestaurants,
            req.query
        )
        const restaurants = await Restaurants.find({
            deleted: false,
            status: "active"
        })
            .limit(objectPagination.limit)
            .skip(objectPagination.skip)
            .sort({ createdAt: -1 })
            .select("image title")

        res.json({
            code: 200,
            data: restaurants,
            totalPage: objectPagination.totalPage,
            message: "Get all restaurant successfully"
        })
    } catch (error) {
        res.json(error)
    }
}
