const { File } = require('../models');
const { resNotFound } = require('../utils/response');
const cloudinary = require('../utils/cloudinary');
const editFile = async (req, res, next) => {
    const id = req.params.id;
    const files = req.files;
    const fileFromDb = await File.findByPk(id);
    if (fileFromDb) {
        if (files && files.length > 0) {
            var file_into_dbs = [];
            for (var file of files) {
                var cloudFiles = {}
                cloudFiles = {
                    product_id: fileFromDb.id,
                    file_name: file.originalname,
                }
                if (file.mimetype.startsWith('video/')) {
                    const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
                    if (result) {
                        cloudFiles.src = result.secure_url;
                        cloudFiles.file_type = result.resource_type;
                    } else {
                        resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary unsuccesful!" })
                    }
                } else if (file.mimetype.startsWith('image/')) {
                    const result = await cloudinary.uploader.upload(file.path);
                    if (result) {
                        cloudFiles.src = result.secure_url;
                        cloudFiles.file_type = result.resource_type;
                    } else {
                        resInternalError(res, error = { serverErr: result, msg: "Upload files to cloudinary unsuccesful!" })
                    }
                }
                file_into_dbs.push(cloudFiles);ttt
            }
            // await File.bulkCreate(file_into_dbs)
            //     .then(result => {
            //         dataRes.files = { result, msg: "files create successful" };
            //     })
            //     .catch(error => dataRes.fileError = { serverErr: error, msg: "File create unsuccessful!" });
        };
    } else {
        resNotFound(res, "File not found")
    }
}

module.exports = {
    editFile
}