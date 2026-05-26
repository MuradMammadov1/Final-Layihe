const FAQ = require('../models/FAQ');

exports.getAllFAQs = async (req, res, next) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1 });
        res.status(200).json({ success: true, data: faqs });
    } catch (error) {
        next(error);
    }
};

exports.getFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            res.status(404);
            return next(new Error('FAQ tapılmadı'));
        }
        res.status(200).json({ success: true, data: faq });
    } catch (error) {
        next(error);
    }
};

exports.createFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.create(req.body);
        res.status(201).json({ success: true, data: faq });
    } catch (error) {
        next(error);
    }
};

exports.updateFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!faq) {
            res.status(404);
            return next(new Error('FAQ tapılmadı'));
        }
        res.status(200).json({ success: true, data: faq });
    } catch (error) {
        next(error);
    }
};

exports.deleteFAQ = async (req, res, next) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            res.status(404);
            return next(new Error('FAQ tapılmadı'));
        }
        await faq.deleteOne();
        res.status(200).json({ success: true, message: 'FAQ silindi' });
    } catch (error) {
        next(error);
    }
};
