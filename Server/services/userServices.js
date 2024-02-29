const { User, Cart, Province } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { resSuccessData, resBadRequest, resInternalError } = require('../utils/response');

// const createUser = async (req, res, next) => {
//     await User.create(req.body)
//         .then(result => {
//             res.status(201).json({
//                 message: "User create successfully",
//                 data: result
//             })
//         })
//         .catch(error => {
//             res.status(500).json({
//                 error: error,
//                 message: "Server error!"
//             })
//         })
// };
const getAllUser = async (req, res, next) => {
    await User.findAll({
        include: {
            model: Province,
        }
    })
        .then(result => resSuccessData(res, result))
        .catch(error => resInternalError(res, err = { error, msg: "Server Error!" }));
};

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
        password: await bcryptjs.hash(req.body.password, 10),
        role: req.body.role
    };
    const userDb = await User.findOne({ where: { email: req.body.email } });
    if (!userDb) {
        const dataRes = {};
        await User.create(user)
            .then(result => {
                const { id, role } = result;
                dataRes.user = result;
                if (role === "customer") {
                    createCart(res, id, dataRes);
                } else {
                    resSuccessData(res, result, "Sigup successfully")
                }
            })
    }
    else {
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
    userSignIn
};