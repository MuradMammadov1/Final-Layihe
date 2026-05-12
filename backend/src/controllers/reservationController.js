const Reservation = require('../models/Reservation');

// @desc    Rezervasiya et
exports.makeReservation = async (req, res, next) => {
    try {
        const { hotelId, checkIn, checkOut, totalPrice } = req.body;
        const reservation = await Reservation.create({
            user: req.user._id || req.user.id,
            hotel: hotelId,
            checkIn,
            checkOut,
            totalPrice
        });
        res.status(201).json({ success: true, data: reservation });
    } catch (error) { next(error); }
};

// @desc    İstifadəçinin öz rezervasiyalarını gətir
exports.getMyReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ 
            user: req.user._id || req.user.id 
        }).populate('hotel');
        res.status(200).json({ success: true, data: reservations });
    } catch (error) { next(error); }
};

// @desc    Rezervasiyanı ləğv et
exports.cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false, message: "Rezervasiya tapılmadı" });

        // Təhlükəsizlik yoxlanışı
        if (reservation.user.toString() !== (req.user._id || req.user.id).toString()) {
            return res.status(401).json({ success: false, message: "Bu rezervasiyanı silməyə ixtiyarınız yoxdur" });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, message: "Rezervasiya ləğv edildi" });
    } catch (error) { next(error); }
};