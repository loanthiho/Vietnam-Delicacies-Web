const { getAllProvince, createProvince } = require('../services/provinceServices');

const create = async (req, res, next) => createProvince(req, res, next);
const getAll = async (req, res, next) => getAllProvince(req, res, next);


module.exports = { create, getAll }