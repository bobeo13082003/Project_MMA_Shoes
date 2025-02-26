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
        const menues = await Menues.find({ isAvailable: true }).populate("restaurant")
        res.status(200).json({
            code: 200,
            data: menues,
            message: "Get All Menues Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

//[PUT] api/v1/menue/edit-menues
module.exports.editMenu = async (req, res) => {
    try {
        const id = req.params.id;
        await Menues.updateOne({ _id: id }, req.body)
        res.status(200).json({
            code: 200,
            message: "Update Menues Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
//[DELETE] api/v1/menues/delete-menue
module.exports.deleteMenu = async (req, res) => {
    try {

        await Menues.updateOne({ _id: id }, { isAvailable: false })
        res.status(200).json({
            code: 200,
            message: "Delete Menues Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

