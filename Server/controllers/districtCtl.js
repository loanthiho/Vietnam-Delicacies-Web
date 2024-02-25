const { createDistrict } = require('../services/districtServices')

const create = (req, res, next) => createDistrict(req, res, next);


module.exports = {
    create
}