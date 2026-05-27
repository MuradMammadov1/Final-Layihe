const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ active: true }).sort({ order: 1 });
        res.status(200).json({ success: true, data: testimonials });
    } catch (error) {
        next(error);
    }
};

exports.getTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            res.status(404);
            return next(new Error('Testimonial tapılmadı'));
        }
        res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
        next(error);
    }
};

exports.createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ success: true, data: testimonial });
    } catch (error) {
        next(error);
    }
};

exports.updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!testimonial) {
            res.status(404);
            return next(new Error('Testimonial tapılmadı'));
        }
        res.status(200).json({ success: true, data: testimonial });
    } catch (error) {
        next(error);
    }
};

exports.deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            res.status(404);
            return next(new Error('Testimonial tapılmadı'));
        }
        await testimonial.deleteOne();
        res.status(200).json({ success: true, message: 'Testimonial silindi' });
    } catch (error) {
        next(error);
    }
};
