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

// GET - Rezervasiyalarım (YENİLƏNDİ)
exports.getMyReservations = async (req, res, next) => {
    try {
        // .populate hissəsinə diqqət: otelin adını, şəhərini və qiymətini çəkirik
        const reservations = await Reservation.find({ user: req.user._id || req.user.id })
            .populate({
                path: 'hotel',
                select: 'name city price images' // Frontend-də şəklini də göstərə biləsən deyə
            });
            
        res.status(200).json({ success: true, data: reservations });
    } catch (error) { next(error); }
};

// DELETE - Rezervasiyanı ləğv et
exports.cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ success: false, message: "Tapılmadı" });

        // Təhlükəsizlik yoxlaması
        const userId = req.user._id || req.user.id;
        if (reservation.user.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: "Bu rezervasiyanı silməyə icazəniz yoxdur" });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, message: "Rezervasiya uğurla ləğv edildi" });
    } catch (error) { next(error); }
};