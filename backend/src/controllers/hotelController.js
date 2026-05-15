const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const Room = require('../models/Room');
const Review = require('../models/Review');
const cloudinary = require('../config/cloudinary');

const buildDateOverlap = (startDate, endDate) => ({
    $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
});

const getAvailability = async (hotel, startDate, endDate) => {
    if (!startDate || !endDate) {
        return { available: true, availableRooms: hotel.rooms?.length ?? 0 };
    }

    const hotelRooms = await Room.find({ hotel: hotel._id });
    if (!hotelRooms.length) {
        return { available: true, availableRooms: 0 };
    }

    const totalRoomCount = hotelRooms.reduce((sum, room) => sum + (room.count || 1), 0);
    const reserved = await Reservation.countDocuments({
        hotel: hotel._id,
        status: { $ne: 'cancelled' },
        ...buildDateOverlap(startDate, endDate)
    });

    return {
        available: reserved < totalRoomCount,
        availableRooms: Math.max(0, totalRoomCount - reserved)
    };
};

exports.getHotels = async (req, res, next) => {
    try {
        let query = {};
        const { city, minPrice, maxPrice, rating, startDate, endDate } = req.query;

        if (city) query.city = { $regex: city, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (rating) query.rating = { $gte: Number(rating) };

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;

        const hotels = await Hotel.find(query)
            .skip(startIndex)
            .limit(limit)
            .populate('reviews')
            .populate('rooms');

        const total = await Hotel.countDocuments(query);
        let hotelsWithAvailability = await Promise.all(hotels.map(async hotel => {
            const availability = await getAvailability(
                hotel,
                startDate ? new Date(startDate) : null,
                endDate ? new Date(endDate) : null
            );
            return { ...hotel.toObject(), availability };
        }));

        if (startDate && endDate) {
            hotelsWithAvailability = hotelsWithAvailability.filter(hotel => hotel.availability.available);
        }

        res.status(200).json({
            success: true,
            count: hotelsWithAvailability.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(hotelsWithAvailability.length / limit)
            },
            data: hotelsWithAvailability
        });
    } catch (error) { next(error); }
};

exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
            .populate('reviews')
            .populate('rooms');

        if (!hotel) {
            res.status(404);
            return next(new Error('Otel tapılmadı'));
        }

        const { startDate, endDate } = req.query;
        const availability = await getAvailability(
            hotel,
            startDate ? new Date(startDate) : null,
            endDate ? new Date(endDate) : null
        );

        res.status(200).json({ success: true, data: { ...hotel.toObject(), availability } });
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