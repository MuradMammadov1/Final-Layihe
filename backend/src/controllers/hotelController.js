const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const cloudinary = require('../config/cloudinary');

exports.getHotels = async (req, res, next) => {
    try {
        let query = {};

        // Filtrlər
        const { city, minPrice, maxPrice, rating } = req.query;
        if (city) query.city = { $regex: city, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (rating) query.rating = { $gte: Number(rating) };

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;

        const hotels = await Hotel.find(query).skip(startIndex).limit(limit).populate('reviews');
        const total = await Hotel.countDocuments(query);

        res.status(200).json({ 
            success: true, 
            count: hotels.length, 
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: hotels 
        });
    } catch (error) { next(error); }
};

exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('reviews');
        if (!hotel) return res.status(404).json({ success: false, message: "Otel tapılmadı" });
        res.status(200).json({ success: true, data: hotel });
    } catch (error) { next(error); }
};

exports.createHotel = async (req, res, next) => {
    try {
        const hotelData = { ...req.body };

        // Şəkilləri yüklə
        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }
            hotelData.images = imageUrls;
        }

        const hotel = await Hotel.create(hotelData);
        res.status(201).json({ success: true, data: hotel });
    } catch (error) { next(error); }
};

exports.updateHotel = async (req, res, next) => {
    try {
        const hotelData = { ...req.body };

        // Yeni şəkilləri yüklə
        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }
            // Mövcud şəkillərə əlavə et və ya əvəz et
            const existingHotel = await Hotel.findById(req.params.id);
            hotelData.images = existingHotel.images.concat(imageUrls);
        }

        const hotel = await Hotel.findByIdAndUpdate(req.params.id, hotelData, {
            new: true,
            runValidators: true
        });
        if (!hotel) return res.status(404).json({ success: false, message: "Otel tapılmadı" });
        res.status(200).json({ success: true, data: hotel });
    } catch (error) { next(error); }
};

exports.deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ success: false, message: "Otel tapılmadı" });
        res.status(200).json({ success: true, message: "Otel silindi" });
    } catch (error) { next(error); }
};

// GET - Admin statistikaları
exports.getStats = async (req, res, next) => {
    try {
        const totalHotels = await Hotel.countDocuments();
        const totalReservations = await Reservation.countDocuments();
        const confirmedReservations = await Reservation.countDocuments({ status: 'confirmed' });
        const popularHotels = await Hotel.find().sort({ rating: -1 }).limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalHotels,
                totalReservations,
                confirmedReservations,
                popularHotels
            }
        });
    } catch (error) { next(error); }
};