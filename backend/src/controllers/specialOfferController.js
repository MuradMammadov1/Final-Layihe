const SpecialOffer = require('../models/SpecialOffer');

exports.getAllSpecialOffers = async (req, res, next) => {
    try {
        const offers = await SpecialOffer.find({ active: true }).sort({ order: 1 }).populate('room', 'title type');
        res.status(200).json({ success: true, data: offers });
    } catch (error) {
        next(error);
    }
};

exports.getAllSpecialOffersAdmin = async (req, res, next) => {
    try {
        const offers = await SpecialOffer.find().sort({ order: 1 }).populate('room', 'title type');
        res.status(200).json({ success: true, data: offers });
    } catch (error) {
        next(error);
    }
};

exports.getSpecialOffer = async (req, res, next) => {
    try {
        const offer = await SpecialOffer.findById(req.params.id).populate('room', 'title type');
        if (!offer) {
            res.status(404);
            return next(new Error('Təklif tapılmadı'));
        }
        res.status(200).json({ success: true, data: offer });
    } catch (error) {
        next(error);
    }
};

exports.createSpecialOffer = async (req, res, next) => {
    try {
        const offer = await SpecialOffer.create(req.body);
        res.status(201).json({ success: true, data: offer });
    } catch (error) {
        next(error);
    }
};

exports.updateSpecialOffer = async (req, res, next) => {
    try {
        const offer = await SpecialOffer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('room', 'title type');
        if (!offer) {
            res.status(404);
            return next(new Error('Təklif tapılmadı'));
        }
        res.status(200).json({ success: true, data: offer });
    } catch (error) {
        next(error);
    }
};

exports.deleteSpecialOffer = async (req, res, next) => {
    try {
        const offer = await SpecialOffer.findById(req.params.id);
        if (!offer) {
            res.status(404);
            return next(new Error('Təklif tapılmadı'));
        }
        await offer.deleteOne();
        res.status(200).json({ success: true, message: 'Təklif silindi' });
    } catch (error) {
        next(error);
    }
};
