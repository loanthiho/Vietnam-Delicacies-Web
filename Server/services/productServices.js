const { Product, ProductCart, Province, User, Category, File, Review } = require("../models")
const { resSuccessData, resInternalError, resCreated, resNotFound, resBadRequest, resUnauthorized } = require("../utils/response")
const cloudinary = require('../utils/cloudinary');
const { Op } = require("sequelize");

const addFilesToProduct = async (res, product, files, dataRes) => {
    if (!files || files.length === 0) {
        return;
    }
    var file_into_dbs = [];
    for (var file of files) {
        var cloudFiles = {}
        cloudFiles = {
            product_id: product.id,
            file_name: file.originalname,
        }
        if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
            const uploadOptions = file.mimetype.startsWith('video/') ? { resource_type: 'video' } : undefined;
            const result = await cloudinary.uploader.upload(file.path, uploadOptions);
            if (result) {
                cloudFiles.src = result.secure_url;
                cloudFiles.file_type = result.resource_type;
            } else {
                return resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary failed!" })
            }
        }
        file_into_dbs.push(cloudFiles);
    }
    // TODO: Updaste product with the file
    const resInsertFile = await File.bulkCreate(file_into_dbs);
    if (resInsertFile) {
        dataRes.files = { resInsertFile, msg: "files create successful" };
    }
    else {
        dataRes.fileError = { msg: "File create unsuccessful!" }
    }
};

const validateData = (res, product) => {
    if (typeof product.inventory !== 'number' || isNaN(product.inventory)) {
        return resBadRequest(res, `Error: Field product.inventory ${product.inventory} is invalid data!`);
    }

    if (typeof product.price !== 'number' || isNaN(product.price)) {
        return resBadRequest(res, `Error: Field product.price ${product.price} is invalid data!`);
    }

    if (product.weight && (typeof product.weight !== 'number' || isNaN(product.weight))) {
        return resBadRequest(res, `Error: Field product.weight ${product.weight} is invalid data!`);
    }
    if (product.inventory < 1) {
        return resBadRequest(res, `Error: Field product.inventory ${product.inventory} must larger than 0!`);
    }
    if (product.price < 1) {
        return resBadRequest(res, `Error: Field product.price ${product.price} must larger than 0!`);
    }

    if (product.weight < 1) {
        return resBadRequest(res, `Error: Field product.weight ${product.weight} must larger than 0!`);
    }
}


const createProduct = async (req, res, next) => {
    try {
        if (req.body.seller_id !== req.userData.id) {
            return resUnauthorized(res)
        }
        const product = {
            ...req.body,
            inventory: parseInt(req.body.inventory),
            price: parseInt(req.body.price),
            weight: parseInt(req.body.weight),
            seller_id: req.userData.id
        };
        validateData(res, product);
        const files = req.files;
        if (product) {
            const productCreated = await Product.create(product);
            var dataRes = {};
            if (productCreated) {
                dataRes.product = { msg: "Create product successful", data: productCreated }
                await addFilesToProduct(res, productCreated, files, dataRes);
                return resSuccessData(res, dataRes, "Create product successfully!");
            } else {
                return resInternalError(res, "Product create Unsuccessful!");
            }
        }
    } catch (error) {
        return resInternalError(res, error.response);
    }
};

const updateProduct = async (req, res, next) => {
    const user_id = req.userData.id;
    const id = req.params.id;
    if (req.body.seller_id !== req.userData.id) {
        return resUnauthorized(res);
    }
    const product = {
        ...req.body,
        inventory: parseInt(req.body.inventory),
        price: parseInt(req.body.price),
        weight: parseInt(req.body.weight),
    };
    validateData(res, product);
    const files = req.files;
    const isHasProduct = await Product.findOne({ where: { seller_id: user_id, id: id } });
    if (isHasProduct) {
        const updated = await Product.update(product, { where: { id: id } });
        if (updated) {
            const product_updated = await Product.findByPk(id);
            var dataRes = { data: product_updated }
            if (product_updated) {
                await addFilesToProduct(res, product_updated, files, dataRes);
                return resSuccessData(res, dataRes, "Update product successfully")
            }
            else {
                return resNotFound(res, "product not found!")
            }
        }
        else {
            resInternalError(res, "Update Unsuccessful");
        }
    } else {
        resNotFound(res, "Product not found or not exist!")
    }
}


const getAllProduct = async (req, res, next) => {
    var q = {};
    const { filterByDomainId, searchByProductName, seller_id } = req.query;
    if (req.query) {
        if (searchByProductName) {
            q.name = { [Op.like]: `%${searchByProductName}%` };
        }
    }
    if (filterByDomainId) {
        if (filterByDomainId != 'all') {
            q.domain_id = filterByDomainId
        }
    }
    if (seller_id) {
        q.seller_id = seller_id;
    }
    const products = await Product.findAll({
        where: { ...q },
        include: [
            { model: User, attributes: { exclude: [['password']] } },
            { model: Category },
            {
                model: File,
            },
        ],
        order: [
            ["createdAt", "DESC"],
            [File, "createdAt", "DESC"]
        ]
    });
    if (products) {
        return resSuccessData(res, products, "search successful")
    }
    else if (!products) {
        return resInternalError(res, "Can not get the product")
    }
}

const getDetailProduct = async (req, res, next) => {
    const id = req.params.id
    await Product.findOne({
        where: { id: id },
        include: [
            {
                model: User,
                attributes: { exclude: ['password'] }
            },
            { model: Category },
            {
                model: File,
            },
        ],
        order: [[File, 'createdAt', 'DESC']]
    })
        .then(result => resSuccessData(res, result, "Get details product successfully!"))
        .catch(error => resNotFound(res, error));
}

const removeProduct = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return resNotFound(res, "Product not found!");
            }
            await Product.destroy({ where: { id: id } });
            const file = await File.findAll({ where: { product_id: id } });
            if (file) {
                await File.destroy({ where: { product_id: id } });
            }
            const review = await Review.findAll({ where: { product_id: id } });
            if (review) {
                await Review.destroy({ where: { product_id: id } });
            }
            resSuccessData(res, product, "Product delete successfully!");
        } catch (error) {
            resNotFound(res, "Not Found Product");
        }
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getDetailProduct,
    removeProduct
}
