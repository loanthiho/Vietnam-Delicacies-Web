const { User, Cart, Province } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { resSuccessData, resBadRequest, resInternalError, resNotFound } = require('../utils/response');

const getAllUser = async (req, res, next) => {
    const rUser = await User.findAll();
    if (rUser) {
        return resSuccessData(res, rUser)
    } else {
        resInternalError(res, err = { error: "error", msg: "Server Error!" })
    }
};

const getUserByEmail = async (req, res, next) => {
    const { email } = req.params;
    const result = await User.findOne({ where: { email: email } });
    if (result) {
        console.log(result);
        return resSuccessData(res, result, "Get usser by email successfully")
    }
    resNotFound(res, "Email haven't use yet!")
}
const createCart = async (res, user_id, dataRes) => {
    const newCart = await Cart.create({ user_id });
    if (newCart) {
        resSuccessData(res, dataRes = { dataRes, newCart }, "SignUp successfully!")
    } else {
        resInternalError(res, "Create cart error!")
    }
}
const userSignUp = async (req, res, next) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    if (user && user.password && user.name && user.email) {
        user.password = await bcryptjs.hash(req.body.password, 10)
    } else {
        resBadRequest(res, "Invalid user credentials")
    }

    const userDb = await User.findOne({ where: { email: req.body.email } });
    if (!userDb) {
        const dataRes = {};
        const resultCreateUser = await User.create(user);
        if (resultCreateUser) {
            const { id } = resultCreateUser;
            createCart(res, id, resultCreateUser);
        }
        else {
            resInternalError(res, "Failed create user")
        }
    } else {
        resBadRequest(res, "This email ready exists!");
    }
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
                message: "User not found!",
                error
            });
        })

}




module.exports = {
    getAllUser,
    userSignUp,
    userSignIn,
    getUserByEmail
};