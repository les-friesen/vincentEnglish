const { cloudinary } = require('./utils/cloudinary')

const uploadImage = async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'vincent_english',
        });
        console.log(uploadResponse);
        res.status(201).json({ status: 201, data: uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body.data, message: err.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const fileStr = req.params.id;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.destroy(fileStr);
        console.log(uploadResponse);
        res.status(200).json({ status: 200, data: uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body.data, message: err.message });
    }
};

module.exports = {
    uploadImage,
    deleteImage
};