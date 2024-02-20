const { Province, District } = require('../models')

const getAllProvince = async (req, res, next) => {
    await Province.findAll()
        .then(result => {
            res.status(200).json({
                data: result,
                message: "Get Successfully!"
            })
        })
        .catch(error => {
            res.status(500).json({
                data: error,
                message: "Error!"
            })
        })
}

const createProvince = async (req, res, next) => {
    await Province.create([
        { name: 'An Giang', type: 'Tỉnh', latitude: 10.5426, longitude: 105.0867 }
    ]).then(result => {
        res.status(201).json({
            data: result,
            message: "create successfully!"
        })
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
}

module.exports = { getAllProvince, createProvince }