const Reservation = require('../models/Reservation');

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

exports.getMyReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ 
            user: req.user._id || req.user.id 
        }).populate('hotel');
        res.status(200).json({ success: true, data: reservations });
    } catch (error) { next(error); }
};

// BU ƏSKİK İDİ:
exports.cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false, message: "Rezervasiya tapılmadı" });

        // Yalnız rezervasiya edən şəxs silə bilsin
        if (reservation.user.toString() !== (req.user._id || req.user.id).toString()) {
            return res.status(401).json({ success: false, message: "Buna icazəniz yoxdur" });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, message: "Rezervasiya ləğv edildi" });
    } catch (error) { next(error); }
};