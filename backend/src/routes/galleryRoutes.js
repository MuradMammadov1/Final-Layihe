const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
    getAllGallery,
    getGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    uploadGalleryImage
} = require('../controllers/galleryController');

router.route('/upload')
    .post(protect, authorize('admin'), upload.single('image'), uploadGalleryImage);

router.route('/')
    .get(getAllGallery)
    .post(protect, authorize('admin'), upload.single('image'), createGalleryItem);

router.route('/:id')
    .get(getGalleryItem)
    .put(protect, authorize('admin'), upload.single('image'), updateGalleryItem)
    .delete(protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
