const models = require('../models');
const { getAllCategory } = require('../services/categoryServices')
function save(req, res) {
    const category = {
        name: req.body.name
    };
    models.Category.create(category)
        .then(result => {
            res.status(201).json({
                message: "Category create successfully",
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "Fails to create a new category!",
                error: error
            })
        })
}

const getAll = (req, res, next) => getAllCategory(req, res, next);

module.exports = {
    save,
    getAll
}

