const {
    createUser,
    getAllUser,
    userSignUp,
    userSignIn
    // getOneUser,
    // updateUser,
    // removeUser 
} = require('../services/userServices');


const signUp = (req, res, next) => userSignUp(req, res, next);
const signIn = (req, res, next) => userSignIn(req, res, next);

const create = (req, res, next) => createUser(req, res, next);
const getAll = (req, res, next) => getAllUser(req, res, next);
// const getOne = (req, res, next) => getOneUser(req, res, next);
// const update = (req, res, next) => updateUser(req, res, next);
// const remove = (req, res, next) => removeUser(req, res, next);

module.exports = {
    create,
    getAll,
    signUp,
    signIn
    // getOne,
    // update,
    // remove
}