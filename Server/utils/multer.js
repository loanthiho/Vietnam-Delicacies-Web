const Image = require('../models/imageModels.js')
const { cloudinary } = require('../ultils/multer.js')
const User = require('../Models/userModels.js')
const ShareImage = require('../Models/shareImage.js')
const axios = require('axios');
const stream = require('stream');

const fs = require('fs');
exports.downloadImage = async (req, res) => {
    const { user_id } = req;
    const { imageId } = req.body;
    const image = await Image.findOne({ _id: imageId, user_id: user_id });
    if (!image) {
        return res.status(404).send('Image not found');
    }

    const imageUrl = image.imageURL;
    const userDirectory = `path/to/save/${user_id}`;
    if (!fs.existsSync(userDirectory)) {
        try {
            fs.mkdirSync(userDirectory, { recursive: true });
        } catch (error) {
            console.error('Error occurred while creating the directory:', error);
            res.status(500).send('Error occurred while creating the directory');
            return;
        }
    }
    const destinationPath = `${userDirectory}/image.jpg`;
    axios({
        url: imageUrl,
        responseType: 'stream',
    })
        .then(response => {
            response.data.pipe(fs.createWriteStream(destinationPath))
                .on('finish', () => {
                    res.download(destinationPath, 'image.jpg', (err) => {
                        if (err) {
                            console.error('Error occurred while downloading the image:', err);
                            res.status(500).send('Error occurred while downloading the image');
                        } else {
                            fs.unlinkSync(destinationPath);
                        }
                    });
                });
        })
        .catch(error => {
            console.error('Error occurred while downloading the image:', error);
            res.status(500).send('Error occurred while downloading the image');
        });
};

exports.postImageFavorite = async (req, res) => {
    try {
        const { user_id } = req;
        const { imageId } = req.body;
        const image = await Image.findOne({ _id: imageId, user_id: user_id });
        if (!image) {
            return res.status(404).json({ code: 404, message: 'Image not found' });
        }
        image.favorite_image = true;
        await image.save();
        return res.json({
            code: 200,
            message: "success",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Something went wrong' });
    }
};

exports.getImageFavorite = async (req, res) => {
    try {
        const { user_id } = req;
        const favoriteImages = await Image.find({ user_id: user_id, favorite_image: true });


        const imageList = favoriteImages.map((image) => ({
            _id: image._id,
            imageName: image.image_name,
            public_id: image.public_id,
            imageURL: image.imageURL,
            status: image.status,
            favorite_image: image.favorite_image,
        }));

        return res.json({
            code: 200,
            message: "success",
            data: imageList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Something went wrong' });
    }
};
exports.removeImageFavorite = async (req, res) => {
    try {
        const { user_id } = req;

        const { imageId } = req.body;

        const favoriteImage = await Image.findOne({ user_id: user_id, _id: imageId, favorite_image: true });

        if (!favoriteImage) {
            throw new Error("Delete image failed!");
        }

        await Image.updateOne({ _id: imageId }, { favorite_image: false });

        return res.status(200).json({
            message: "Delete image successfully!",
        });
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            message: error.message,
        });
    }
};
exports.getImagesByUserId = async (req, res) => {
    try {
        const { user_id } = req;
        const images = await Image.find({ user_id: user_id });

        if (images.length === 0) {
            return res.status(204).json({ code: 204, message: "No content ." });
        }

        const imageList = images.map((image) => ({
            _id: image._id,
            image_name: image.image_name,
            imageURL: image.imageURL,
            public_id: image.public_id,
            status: image.status,
            favorite_image: image.favorite_image,
        }));


        res.status(200).json({
            code: 200,
            message: "success",
            data: imageList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Something went wrong' });
    }
};
exports.uploadImage = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ code: 400, message: 'No files uploaded' });
        }
        const uploadPromises = req.files.map(async (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: 'uploads', resource_type: 'auto' },
                    (error, result) => {
                        if (error || !result) {
                            reject(new Error('Error uploading files to Cloudinary'));
                        } else {
                            resolve({ imageUrl: result.secure_url, public_id: result.public_id, image_name: file.originalname });
                        }
                    }
                );
                const bufferStream = stream.Readable.from(file.buffer);
                bufferStream.pipe(uploadStream);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        const imagePromises = uploadedImages.map(async (uploadedImage) => {
            const newImage = new Image({
                image_name: uploadedImage.image_name,
                imageURL: uploadedImage.imageUrl,
                user_id: req.user_id,
                public_id: uploadedImage.public_id // Use the specified public_id from the request body
            });
            return newImage.save();
        });



        await Promise.all(imagePromises);

        return res.status(200).json({ code: 200, message: 'Files uploaded successfully', urls: uploadedImages });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Error uploading files to Cloudinary' });

    }
};
exports.removeImages = async (req, res) => {
    try {
        const { public_id } = req.params;
        const { user_id } = req;

        const result = await cloudinary.uploader.destroy(public_id);
        if (result.result !== 'ok') {
            throw new Error('Delete image failed!');
        }

        const deletedImage = await Image.findOneAndDelete({ public_id: public_id, user_id: user_id });
        if (!deletedImage) {
            throw new Error('Image not found in the database!');
        }

        return res.json({
            code: 200,
            message: 'success',
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            name: error.name,
            message: error.message,
        });
    }
};

exports.shareImage = async (req, res) => {
    try {
        const { imageId } = req.body;

        const { user_id } = req;

        const image = await Image.findOne({ _id: imageId, user_id: user_id });
        if (!image) {
            return res.status(404).json({ code: 404, message: 'Image does not exist.' });
        }


        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 15);

        const sharedImage = new ShareImage({
            sharedBy: "65a015503176507a2df77282",
            image_name: "image.image_name",
            imageURL: `http://localhost:3000/images/${image._id}`,
            expirationDate: expirationDate
        });

        await sharedImage.save();
        return res.json({
            code: 200,
            message: 'Success',
            imageURL: sharedImage.imageURL
        });
    } catch (error) {
        console.error('Error sharing image:', error);
        res.status(500).json({ code: 500, message: 'Internal Server Error.' });
    }
};
exports.getSharedImages = async (req, res) => {
    try {
        const currentDate = new Date();
        const sharedImages = await ShareImage.find({
            expirationDate: { $gte: currentDate },
        });

        if (!sharedImages) {
            return res.status(404).json({ code: 404, message: 'Shared image not found or expired' });
        }

        const imageUrl = sharedImages[0].imageURL;

        const response = await axios.get(imageUrl, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        console.error('Error streaming shared images:', error);
        res.status(500).send('Failed to stream images');
    }
};