const cloudinary = require('../utils/cloudinary');
const { resInternalError, resSuccessData, resBadRequest } = require('../utils/response');

const uploadFiles = async (req, res, next) => {
    if (req.fileError) {
        return resBadRequest(res, req.fileError);
    }
    if (req.files.length > 0) {
        const uploads = [];
        for (let file of req.files) {
            if (file.mimetype.startsWith('video/')) {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
                if (!result) {
                    return resInternalError(res, "Server is launching!")
                }
                uploads.push(result);
            } else if (file.mimetype.startsWith('image/')) {
                const result = await cloudinary.uploader.upload(file.path);
                if (!result) {
                    return resInternalError(res, "Server is launching!")
                }
                uploads.push(result);
            }
        }
        resSuccessData(res, uploads, "Upload file successfully!");
    } else {
        resBadRequest(res, "Have no file there!");
    }
}


module.exports = { uploadFiles };