const { Product, ProductCart, Province, User, Category, File, Review } = require("../models")
const { resSuccessData, resInternalError, resCreated, resNotFound } = require("../utils/response")
const cloudinary = require('../utils/cloudinary');
const { Op } = require("sequelize");
const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const files = req.files;
        if (product) {
            const productCreated = await Product.create(product);
            var dataRes = {};
            if (productCreated) {
                dataRes.product = { msg: "Create product successful", data: productCreated }
                if (files && files.length > 0) {
                    var file_into_dbs = [];
                    for (var file of files) {
                        var cloudFiles = {}
                        cloudFiles = {
                            product_id: productCreated.id,
                            file_name: file.originalname,
                        }
                        if (file.mimetype.startsWith('video/')) {
                            const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
                            if (result) {
                                cloudFiles.src = result.secure_url;
                                cloudFiles.file_type = result.resource_type;
                            } else {
                                resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary unsuccesful!" })
                            }
                        } else if (file.mimetype.startsWith('image/')) {
                            const result = await cloudinary.uploader.upload(file.path);
                            if (result) {
                                cloudFiles.src = result.secure_url;
                                cloudFiles.file_type = result.resource_type;
                            } else {
                                resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary unsuccesful!" })
                            }
                        }
                        file_into_dbs.push(cloudFiles);
                    }
                    await File.bulkCreate(file_into_dbs)
                        .then(result => {
                            dataRes.files = { result, msg: "files create successful" };
                        })
                        .catch(error => dataRes.fileError = { serverErr: error, msg: "File create unsuccessful!" });
                };
                resSuccessData(res, dataRes, "Create product successfully!");
            } else {
                resInternalError(res, "Product create Unsuccessful!");
            }
        }

    } catch (error) {
        resInternalError(res, error);
        console.log(error);
    }
};

const updateProduct = async (req, res, next) => {
    /**
     * Check isHasProduct
     * @id Is id product
     * @isHasProduct to check, is there product?
     * @user_id To check role seller
     * 
     * @files To check does files exist!
     * @product_data_update This is the body data used to update product
     */
    const user_id = req.userData.id;
    const id = req.params.id;
    const product_data_update = req.body;
    const files = req.files;

    const isHasProduct = await Product.findOne({ where: { user_id: user_id, id: id } });
    if (isHasProduct) {


        /**
         * @updated The response after update product.
         */
        const updated = await Product.update(req.body, { where: { id: id } });
        if (updated) {
            /**
             * @product_updated
             * - Get the product has been updated!
             */
            const product_updated = await Product.findByPk(id);
            if (product_updated) {
                /**
                 * @files
                 * - Check does files exist
                 * - will push files into cloudinary
                 */
                if (files && files.length > 0) {
                    var file_into_dbs = [];
                    for (var file of files) {
                        var cloudFiles = {}
                        cloudFiles = {
                            product_id: product_updated.id,
                            file_name: file.originalname,
                        }
                        if (file.mimetype.startsWith('video/')) {
                            const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
                            if (result) {
                                cloudFiles.src = result.secure_url;
                                cloudFiles.file_type = result.resource_type;
                            } else {
                                return resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary failed!" })
                            }
                        } else if (file.mimetype.startsWith('image/')) {
                            const result = await cloudinary.uploader.upload(file.path);
                            if (result) {
                                cloudFiles.src = result.secure_url;
                                cloudFiles.file_type = result.resource_type;
                            } else {
                                return resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary failed!" })
                            }
                        }
                        file_into_dbs.push(cloudFiles);
                    }

                }
                return resSuccessData(res, product_updated, "Create product successfully")
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
    const { filterByDomainId, searchByProductName } = req.query;
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
    const products = await Product.findAll({
        where: { ...q },
        include: [
            { model: User, attributes: { exclude: [['password']] } },
            { model: Category },
            { model: File },
        ],
        order: [
            ["createdAt", "DESC"]
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
            { model: Province },
            {
                model: User,
                attributes: { exclude: ['password'] }
            },
            { model: Category },
            { model: File }
        ],
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
