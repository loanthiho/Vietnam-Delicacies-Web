const { User, Province, District } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const createUser = async (req, res, next) => {
    await User.create(req.body)
        .then(result => {
            res.status(201).json({
                message: "User create successfully",
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: "Server error!"
            })
        })
};
const getAllUser = async (req, res, next) => {
    await User.findAll({
        include: {
            model: Province,
            include: District
        }
    })
        .then(result => {
            res.status(200).json({
                message: "Get all users successfully!",
                data: result,
            })
        })
        .catch(error => {
            res.status(500).json({
                error,
                message: "Server error!"
            })
        })
};


const userSignUp = async (req, res, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: await bcryptjs.hash(req.body.password, 10),
        role: req.body.role
    };
    await User.findOne({
        where: { email: req.body.email }
    })
        .then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email already exists!"
                })
            } else {
                User.create(user)
                    .then(result => {
                        res.status(201).json({
                            message: "SignUp successfully!",
                            data: result,
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Somethings went wrong!",
                            error: error
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Somethings went wrong!",
                error: error
            });
        });



};

const userSignIn = async (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    await User.findOne({ where: { email: user.email }, include: { model: Province } })
        .then(user => {
            const useRes = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "age": user.age,
                "detail_address": user.detail_address,
                "phone_number": user.phone_number,
                "avatar": user.avatar,
                "total_order": user.total_order,
                "createdAt": user.createdAt,
                "updatedAt": user.updatedAt,
                "Province": user.Province,
            }
            if (user === null) {
                res.status(401).json({
                    message: "Invalid credentials!"
                });
            } else {
                bcryptjs.compare(req.body.password, user.password, (err, success) => {
                    if (success) {
                        const token = jwt.sign({
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            name: user.name
                        }, process.env.JWT_KEY, (err, token) => {
                            res.status(200).json({
                                message: "Authentication successful!",
                                token: token,
                                user: useRes,
                            })
                        });
                    }
                    else {
                        res.status(500).json({
                            message: "Invalid credentials!",
                            error: err
                        })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong!"
            });
        })

}




module.exports = {
    createUser,
    getAllUser,
    userSignUp,
    userSignIn
};