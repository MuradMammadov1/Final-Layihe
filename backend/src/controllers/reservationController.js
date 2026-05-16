const Reservation = require('../models/Reservation');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const sendEmail = require('../utils/sendEmail');

const buildDateOverlap = (startDate, endDate) => ({
    $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
});

const checkRoomAvailability = async (roomId, startDate, endDate, quantity = 1) => {
    const reservations = await Reservation.find({
        room: roomId,
        status: { $ne: 'cancelled' },
        ...buildDateOverlap(startDate, endDate)
    });
    return reservations.length < quantity;
};

const checkHotelAvailability = async (hotel, startDate, endDate) => {
    const hotelRooms = await Room.find({ hotel: hotel._id });
    if (!hotelRooms.length) return true;

    const totalRoomCount = hotelRooms.reduce((sum, room) => sum + (room.count || 1), 0);
    const reserved = await Reservation.countDocuments({
        hotel: hotel._id,
        status: { $ne: 'cancelled' },
        ...buildDateOverlap(startDate, endDate)
    });
    return reserved < totalRoomCount;
};

exports.makeReservation = async (req, res, next) => {
    try {
        const { hotel, room, startDate, endDate } = req.body;

        if (!hotel || !startDate || !endDate) {
            res.status(400);
            return next(new Error('Otel və tarix məlumatları tələb olunur'));
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start) || isNaN(end) || start >= end) {
            res.status(400);
            return next(new Error('Tarix düzgün daxil edilməyib'));
        }

        const hotelDoc = await Hotel.findById(hotel).populate('rooms');
        if (!hotelDoc) {
            res.status(404);
            return next(new Error('Otel tapılmadı'));
        }

        let price = hotelDoc.price;
        let reservedRoom = null;

        if (room) {
            reservedRoom = await Room.findById(room);
            if (!reservedRoom || reservedRoom.hotel.toString() !== hotelDoc._id.toString()) {
                res.status(400);
                return next(new Error('Seçilən otaq bu otelə aid deyil'));
            }
            const available = await checkRoomAvailability(reservedRoom._id, start, end, reservedRoom.count || 1);
            if (!available) {
                res.status(400);
                return next(new Error('Bu otaq tarixlər üçün doludur'));
            }
            price = reservedRoom.price;
        } else if (!await checkHotelAvailability(hotelDoc, start, end)) {
            res.status(400);
            return next(new Error('Bu tarixlər üçün oteldə boş otaq yoxdur'));
        }

        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = price * nights;

        const reservation = await Reservation.create({
            hotel,
            room: reservedRoom ? reservedRoom._id : undefined,
            startDate: start,
            endDate: end,
            totalPrice,
            user: req.user._id || req.user.id
        });

        const message = `Salam, ${req.user.name}. Rezervasiyanız təsdiq edildi. Rezervasiya ID: ${reservation._id}`;
        await sendEmail({
            email: req.user.email,
            subject: 'Rezervasiya Təsdiqi',
            message
        });

        res.status(201).json({ success: true, data: reservation });
    } catch (error) { next(error); }
};

exports.getMyReservations = async (req, res, next) => {
    try {
        const query = req.user.role === 'admin' ? {} : { user: req.user._id || req.user.id };
        const reservations = await Reservation.find(query)
            .populate({ path: 'hotel', select: 'name city price images' })
            .populate({ path: 'room', select: 'title price type capacity' });

        res.status(200).json({ success: true, data: reservations });
    } catch (error) { next(error); }
};

exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate({ path: 'hotel', select: 'name city price images' })
            .populate({ path: 'room', select: 'title price type capacity' })
            .populate({ path: 'user', select: 'name email' });

        if (!reservation) {
            res.status(404);
            return next(new Error('Rezervasiya tapılmadı'));
        }

        const userId = req.user._id || req.user.id;
        if (req.user.role !== 'admin' && reservation.user._id.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: 'Bu rezervasiyaya baxmağa icazəniz yoxdur' });
        }

        res.status(200).json({ success: true, data: reservation });
    } catch (error) { next(error); }
};

exports.cancelReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            res.status(404);
            return next(new Error('Rezervasiya tapılmadı'));
        }

        const userId = req.user._id || req.user.id;
        if (req.user.role !== 'admin' && reservation.user.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: 'Bu rezervasiyanı silməyə icazəniz yoxdur' });
        }

        await reservation.deleteOne();
        res.status(200).json({ success: true, message: 'Rezervasiya uğurla ləğv edildi' });
    } catch (error) { next(error); }
};

exports.updateReservationStatus = async (req, res, next) => {
    try {
        const { status, id } = req.body;
        const reservationId = req.params.id || id;

        if (!reservationId) {
            res.status(400);
            return next(new Error('Rezervasiya ID-si tələb olunur'));
        }

        const reservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { status },
            { new: true, runValidators: true }
        )
            .populate('user', 'name email')
            .populate('hotel', 'name');

        if (!reservation) {
            res.status(404);
            return next(new Error('Rezervasiya tapılmadı'));
        }

        res.status(200).json({ success: true, data: reservation });
    } catch (error) { next(error); }
};
