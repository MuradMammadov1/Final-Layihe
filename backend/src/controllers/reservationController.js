const Reservation = require('../models/Reservation');

exports.makeReservation = async (req, res, next) => {
    try {
        const { hotelId, checkIn, checkOut, totalPrice } = req.body;
        
        // req.user-in mövcudluğunu yoxlayırıq (Middleware-dən gəlir)
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