const { District } = require('../models');
const createDistrict = async (req, res, next) => {
    try {
        const result = await District.bulkCreate(req.body);
        res.status(201).json({
            message: "District create successfully!",
            data: result
        })
    } catch (error) {
        res.status(201).json({
            error: error
        })
    }
}

module.exports = {
    createDistrict
}