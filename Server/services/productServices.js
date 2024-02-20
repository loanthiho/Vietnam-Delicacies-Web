const { Product, Province, District, User, Category } = require("../models")
const { resSuccessData, resInternalError, resCreated } = require("../utils/response")

const createProduct = async (req, res, next) => {
    const product = {
        province_id: req.body.province_id,
        category_id: req.body.category_id,
        seller_id: req.body.seller_id,
        name: req.body.name,
        price: req.body.price,
        new_price: req.body.new_price,
        inventory: req.body.inventory,
        description: req.body.description,
        food_safety_certification: req.body.food_safety_certification,
        weight: req.body.weight,
    }
    await Product.create(product)
        .then(result => resCreated(res, result))
        .catch(error => resInternalError(res, error));
}

const updateProduct = async (req, res, next) => {
    
}

const getAllProduct = async (req, res, next) => {
    await Product.findAll({
        include: [
            { model: Province, include: { model: District } },
            { model: User },
            { model: Category }
        ]
    })
        .then(result => resSuccessData(res, result))
        .catch(error => resInternalError(res, error))
}
module.exports = {
    createProduct,
    getAllProduct
}