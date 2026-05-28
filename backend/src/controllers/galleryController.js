const Gallery = require('../models/Gallery');

exports.getAllGallery = async (req, res, next) => {
    try {
        const { category } = req.query;
        const query = { active: true };
        if (category) query.category = category;
        
        const galleryItems = await Gallery.find(query).sort({ order: 1 });
        res.status(200).json({ success: true, data: galleryItems });
    } catch (error) {
        next(error);
    }
};

exports.getGalleryItem = async (req, res, next) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            res.status(404);
            return next(new Error('Gallery item tapılmadı'));
        }
        res.status(200).json({ success: true, data: galleryItem });
    } catch (error) {
        next(error);
    }
};

exports.createGalleryItem = async (req, res, next) => {
    try {
        const galleryItem = await Gallery.create(req.body);
        res.status(201).json({ success: true, data: galleryItem });
    } catch (error) {
        next(error);
    }
};

exports.updateGalleryItem = async (req, res, next) => {
    try {
        const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!galleryItem) {
            res.status(404);
            return next(new Error('Gallery item tapılmadı'));
        }
        res.status(200).json({ success: true, data: galleryItem });
    } catch (error) {
        next(error);
    }
};

exports.deleteGalleryItem = async (req, res, next) => {
    try {
        const galleryItem = await Gallery.findById(req.params.id);
        if (!galleryItem) {
            res.status(404);
            return next(new Error('Gallery item tapılmadı'));
        }
        await galleryItem.deleteOne();
        res.status(200).json({ success: true, message: 'Gallery item silindi' });
    } catch (error) {
        next(error);
    }
};
