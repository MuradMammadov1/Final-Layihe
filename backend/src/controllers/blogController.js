const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        next(error);
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            res.status(404);
            return next(new Error('Bloq tapılmadı'));
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            return next(new Error('Bloq tapılmadı'));
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!blog) {
            res.status(404);
            return next(new Error('Bloq tapılmadı'));
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            return next(new Error('Bloq tapılmadı'));
        }
        await blog.deleteOne();
        res.status(200).json({ success: true, message: 'Bloq silindi' });
    } catch (error) {
        next(error);
    }
};
