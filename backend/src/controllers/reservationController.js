const Reservation = require('../models/Reservation');

// POST - Rezervasiya et
exports.makeReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.create({
            ...req.body,
            user: req.user._id || req.user.id
        });
        res.status(201).json({ success: true, data: reservation });
    } catch (error) { next(error); }
};

// GET - Rezervasiyalarım
exports.getMyReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id || req.user.id }).populate('hotel');
        res.status(200).json({ success: true, data: reservations });
    } catch (error) { next(error); }
};

// DELETE - Rezervasiyanı ləğv et
exports.cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false, message: "Tapılmadı" });

        if (reservation.user.toString() !== (req.user._id || req.user.id).toString()) {
            return res.status(401).json({ success: false, message: "İcazəniz yoxdur" });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, message: "Ləğv edildi" });
    } catch (error) { next(error); }
};