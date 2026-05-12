const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({ success: true, count: hotels.length, data: hotels });
    } catch (error) { next(error); }
};

exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ success: false, message: "Otel tapılmadı" });
        res.status(200).json({ success: true, data: hotel });
    } catch (error) { next(error); }
};

exports.createHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json({ success: true, data: hotel });
    } catch (error) { next(error); }
};

// BU ƏSKİK İDİ:
exports.updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
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
        res.status(200).json({ success: true, message: "Otel uğurla silindi" });
    } catch (error) { next(error); }
};