const { Category } = require('../models');


const getAllCategory = async (req, res, next) => {
    await Category.findAll()
        .then(result => {
            res.status(200).json({
                message: "Get list of category successfully",
                data: result
            })
        })
        .catch(error => {
            res.status(200).json({
                message: "Something went wrong!",
                error: error
            })
        })
}


module.exports = {
    getAllCategory
}