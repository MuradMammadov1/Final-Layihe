const About = require('../models/About');

exports.getAbout = async (req, res, next) => {
    try {
        const about = await About.findOne();
        if (!about) {
            res.status(404);
            return next(new Error('Haqqımızda məlumatı tapılmadı'));
        }
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        next(error);
    }
};

exports.createAbout = async (req, res, next) => {
    try {
        const about = await About.create(req.body);
        res.status(201).json({ success: true, data: about });
    } catch (error) {
        next(error);
    }
};

exports.updateAbout = async (req, res, next) => {
    try {
        const about = await About.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
            upsert: true
        });
        res.status(200).json({ success: true, data: about });
    } catch (error) {
        next(error);
    }
};
