const multer = require('multer');

const storage = multer.diskStorage({});
const upload = multer({
    storage,
    limits: { fileSize: 2000000 }, // 2MB limit
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Zəhmət olmasa şəkil yükləyin!'));
        }
        cb(undefined, true);
    }
});

module.exports = upload;