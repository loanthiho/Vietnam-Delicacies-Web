const multer = require('multer');
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        req.fileError = ["Only images and videos are allowed!"]
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
module.exports = upload;