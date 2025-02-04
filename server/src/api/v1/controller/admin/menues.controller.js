const Menues = require("../../model/menu");
const Restaurants = require("../../model/restaurant");


//[POST] api/v1/menues/new-menues
module.exports.createMenu = async (req, res) => {
    try {
        const menues = new Menues(req.body)
        await menues.save();
        res.status(201).json({
            code: 201,
            message: "Create Menues Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[GET] api/v1/menues/all-menues
module.exports.allMenu = async (req, res) => {
    try {
        const menues = await Menues.find({}).populate("restaurant")
        res.status(200).json({
            code: 200,
            data: menues,
            message: "Get All Menues Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

