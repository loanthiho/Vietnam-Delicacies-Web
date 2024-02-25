const { createDomain, getAllDomain, removeDomain } = require('../services/domainServices');

const create = (req, res, next) => createDomain(req, res, next);
const getAll = (req, res, next) => getAllDomain(req, res, next);
const remove = (req, res, next) => removeDomain(req, res, next);

module.exports = {
    create,
    getAll,
    remove
}