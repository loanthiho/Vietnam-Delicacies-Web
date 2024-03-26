const { User, Cart, Province } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { resSuccessData, resBadRequest, resInternalError, resNotFound } = require('../utils/response');
const { where } = require('sequelize');
const { sendMail, mailOptions } = require('./mailer');

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
        return resSuccessData(res, result, "Get usser by email successfully")
    }
    return resNotFound(res, "User not found");
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
        resBadRequest(res, "Thông tin không chính xác")
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
            resInternalError(res, "Đăng ký không thành công")
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
    await User.findOne({ where: { email: user.email } })
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
                            name: user.name,
                            role: user.role
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

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const rUser = await User.findByPk(id);
            if (rUser) {
                resSuccessData(res, rUser, "Get user successfully!");
            } else {
                resNotFound(res, "User can not be found!")
            }
        }
    } catch (error) {
        resInternalError(res, error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone_number, detail_address } = req.body
        if (id) {
            const rUser = await User.findByPk(id);
            if (rUser) {
                if (name && detail_address && phone_number) {
                    try {
                        const rUserU = await User.update({ ...req.body }, { where: { id: id } });
                        if (rUserU) {
                            const rUpdate = await User.findByPk(id);
                            resSuccessData(res, rUpdate, "Update user successfully!")
                        } else {
                            resInternalError(res, "User update Failed")
                        }
                    } catch (error) {
                        resInternalError(res, err = { err: error, message: "User update failed" })
                    }
                } else {
                    resBadRequest(res, "You are missing field!")
                }
            } else {
                resNotFound(res, "User can not be found!")
            }
        }
    } catch (error) {
        resInternalError(res, error)
    }

}

const userForgotPassword = async (req, res, next) => {
    const receiverEmail = req.body.email;
    try {
        const mailOptions = {
            from: {
                name: "VnD App",
                address: process.env.USER
            }, // sender address
            to: [receiverEmail], // list of receivers
            subject: "Your password", // Subject line
            text: "Hello world?", // plain text body
            html: "<p>This is your password</p>", // html body,
        }
        await sendMail(res, mailOptions);
    } catch (error) {
        return resInternalError(res, error);
    }
}

const changePassword = async (req, res, next) => {
    const receiverEmail = req.body.email;
    const newPassword = req.body.newPassword;
    const mailOptions = {
        from: {
            name: "VnD",
            address: process.env.USER
        }, // sender address
        to: [receiverEmail], // list of receivers
        subject: "Ứng dụng Vnd", // Subject line
        // text: "Hello world?", // plain text body
        html: `<p>Đây là mật khẩu mới của bạn không chia sẽ cho bất kỳ ai</p> <br/> ${receiverEmail} <br/> ${newPassword} `, // html body,
    }
    if (receiverEmail && receiverEmail !== null && receiverEmail !== "") {
        const user = await User.findOne({ where: { email: receiverEmail } });
        if (user && user.id) {
            if (newPassword) {
                try {
                    const newPasswordUpdateHash = await bcryptjs.hash(newPassword, 10);
                    if (newPasswordUpdateHash) {
                        const userUpdate = await User.update({ password: newPasswordUpdateHash }, { where: { id: user.id } });
                        if (userUpdate) {
                            return await sendMail(res, mailOptions);
                        }
                        return resInternalError(res, "Cập nhật mật khẩu mới bị lỗi!");
                    }
                } catch (error) {
                    return resInternalError(res, "Băm mật khẩu lỗi!");
                }
            }
            return resBadRequest(res, "Vui lòng không thiếu mật khẩu mới!");
        }
        return resNotFound(res, "Không thể tìm thấy người dùng!")
    }
    return resNotFound(res, "Vui lòng điền email để xác nhận thông tin!")
}
module.exports = {
    getAllUser,
    userSignUp,
    userSignIn,
    getUserByEmail,
    getUserById,
    updateUser,
    userForgotPassword,
    changePassword
};