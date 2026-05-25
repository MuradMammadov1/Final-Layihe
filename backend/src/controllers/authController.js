const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Token yaratmaq üçün köməkçi funksiya
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token 30 gün aktiv qalsın
    });
};

// @desc    Yeni istifadəçi qeydiyyatı
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        // 1. Email-in olub-olmadığını yoxla
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            res.status(400);
            throw new Error('Bu email ilə artıq qeydiyyatdan keçilib');
        }

        // 2. Yeni istifadəçi yarat
        const user = await User.create({
            name,
            email: normalizedEmail,
            password, // Qeyd: User modelində şifrəni hash-ləyən middleware olmalıdır
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id), // Real token göndəririk
            });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    İstifadəçi girişi (Login)
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        // İstifadəçini tap
        const user = await User.findOne({ email: normalizedEmail });

        // Şifrəni yoxla (User modelində matchPassword funksiyası olmalıdır)
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Email və ya şifrə yanlışdır');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Cari istifadəçinin profilini al
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id || req.user.id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// @desc    Cari istifadəçinin profilini yenilə
// @route   PUT /api/auth/me
exports.updateMe = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (email) {
            const exists = await User.findOne({ email, _id: { $ne: req.user._id || req.user.id } });
            if (exists) {
                res.status(400);
                return next(new Error('Bu email artıq istifadə olunur'));
            }
            updates.email = email;
        }

        const user = await User.findByIdAndUpdate(req.user._id || req.user.id, updates, {
            new: true,
            runValidators: true
        }).select('-password');

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// @desc    Bütün istifadəçiləri al (admin üçün)
// @route   GET /api/auth/users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

// @desc    İstifadəçi rolunu dəyiş (admin üçün)
// @route   PUT /api/auth/users/:id
exports.updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!user) {
            res.status(404);
            return next(new Error('İstifadəçi tapılmadı'));
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

// @desc    İstifadəçini sil (admin üçün)
// @route   DELETE /api/auth/users/:id
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            return next(new Error('İstifadəçi tapılmadı'));
        }

        // İstifadəçinin rezervasiyalarını sil
        const Reservation = require('../models/Reservation');
        await Reservation.deleteMany({ user: user._id });

        // İstifadəçinin rəylərini sil
        const Review = require('../models/Review');
        await Review.deleteMany({ user: user._id });

        // İstifadəçini sil
        await user.deleteOne();

        res.status(200).json({ success: true, message: 'İstifadəçi silindi' });
    } catch (error) {
        next(error);
    }
};