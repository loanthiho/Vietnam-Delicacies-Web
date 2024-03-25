const {
    getAllUser,
    userSignUp,
    userSignIn,
    getUserByEmail,
    getUserById,
    updateUser,
    userForgotPassword,
    changePassword
    // getOneUser,
    // updateUser,
    // removeUser 
} = require('../services/userServices');


const signUp = (req, res, next) => userSignUp(req, res, next);
const signIn = (req, res, next) => userSignIn(req, res, next);

// const create = (req, res, next) => createUser(req, res, next);
const getAll = (req, res, next) => getAllUser(req, res, next);
// const getOne = (req, res, next) => getOneUser(req, res, next);
// const update = (req, res, next) => updateUser(req, res, next);
// const remove = (req, res, next) => removeUser(req, res, next);
const getOneByEmail = (req, res, next) => getUserByEmail(req, res, next);
const getOneById = (req, res, next) => getUserById(req, res, next);
const update = (req, res, next) => updateUser(req, res, next);
const fogotPassword = (req, res, next) => userForgotPassword(req, res, next);
const changePass = (req, res, next) => changePassword(req, res, next);






module.exports = {
    getAll,
    signUp,
    signIn,
    getOneByEmail,
    getOneById,
    update,
    fogotPassword,
    changePass
    // getOne,
    // update,
    // remove
}