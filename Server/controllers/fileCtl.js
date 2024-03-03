const { editFile } = require('../services/fileServices');
const edit = (req, res, next) => editFile(req, res, next);

module.exports = {
    edit
}