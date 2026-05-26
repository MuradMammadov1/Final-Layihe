const Service = require('../models/Service');

exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ order: 1 });
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        next(error);
    }
};

exports.getService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404);
            return next(new Error('Xidmət tapılmadı'));
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        next(error);
    }
};

exports.createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        next(error);
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!service) {
            res.status(404);
            return next(new Error('Xidmət tapılmadı'));
        }
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        next(error);
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404);
            return next(new Error('Xidmət tapılmadı'));
        }
        await service.deleteOne();
        res.status(200).json({ success: true, message: 'Xidmət silindi' });
    } catch (error) {
        next(error);
    }
};
