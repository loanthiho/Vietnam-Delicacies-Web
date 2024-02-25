const { resInternalError, resCreated, resSuccessData, resNotFound } = require('../utils/response');
const { Domain } = require('../models');
const { Op } = require("sequelize");

const createDomain = async (req, res, next) => {
    const domain = { name: req.body.name }
    if (domain.name !== '' && domain.name !== undefined && domain.name !== null) {
        const iDomain = await Domain.create(domain);
        resCreated(res, iDomain);
    } else {
        resInternalError(res, "domain.name Can not be null!");
    }
}

const getAllDomain = async (req, res, next) => {
    const keySearch = req.query.searchByName;
    var q = {};
    if (keySearch) {
        q.name = { [Op.like]: `%${keySearch}%` }
    }
    const domain = await Domain.findAll({ where: { ...q } });
    resSuccessData(res, domain);
}

const removeDomain = async (req, res, next) => {
    const id = req.params.id;
    if (id && id !== null && id !== '' && id !== undefined) {
        try {
            const domain = await Domain.findOne({ where: { id: id } });
            if (!domain) {
                return resNotFound(res, "Domain not found");
            }
            Domain.destroy({ where: { id: id } });
            return resSuccessData(res, domain, "Delete successfully")

        } catch (error) {
            resInternalError(res, error)
        }
    } else {
        return resNotFound(res, "Not found id requested!");
    }
}


module.exports = {
    createDomain,
    getAllDomain,
    removeDomain
}