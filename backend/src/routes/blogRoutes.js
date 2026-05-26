const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getAllBlogs,
    getBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

router.route('/')
    .get(getAllBlogs)
    .post(protect, authorize('admin'), createBlog);

router.route('/:id')
    .get(getBlogById)
    .put(protect, authorize('admin'), updateBlog)
    .delete(protect, authorize('admin'), deleteBlog);

router.get('/slug/:slug', getBlog);

module.exports = router;
