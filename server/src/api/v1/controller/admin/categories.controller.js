const Categories = require("../../model/categories");

module.exports.createCategory = async (req, res) => {
    try {
        const title = req.body.title;
        const titleExits = await Categories.findOne({
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
        const category = new Categories({ ...req.body, slug: slug })
        await category.save();
        res.status(201).json({
            code: 201,
            message: "Create Category Successfully"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}