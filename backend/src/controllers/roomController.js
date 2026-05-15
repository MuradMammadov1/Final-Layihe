const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

exports.createRoom = async (req, res, next) => {
    try {
        const { hotel, title, price, capacity, count, type, description, amenities } = req.body;

        const hotelDoc = await Hotel.findById(hotel);
        if (!hotelDoc) {
            res.status(404);
            return next(new Error('Otel tapılmadı')); 
        }

        const room = await Room.create({ hotel, title, price, capacity, count, type, description, amenities });
        hotelDoc.rooms.push(room._id);
        await hotelDoc.save();

        res.status(201).json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
};

exports.getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel', 'name city');
        if (!room) {
            res.status(404);
            return next(new Error('Otaq tapılmadı'));
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
};

exports.updateRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!room) {
            res.status(404);
            return next(new Error('Otaq tapılmadı'));
        }

        res.status(200).json({ success: true, data: room });
    } catch (error) {
        next(error);
    }
};

exports.deleteRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            res.status(404);
            return next(new Error('Otaq tapılmadı'));
        }

        // delete reservations associated with this room
        const Reservation = require('../models/Reservation');
        await Reservation.deleteMany({ room: room._id });

        // remove room reference from hotel
        await Hotel.findByIdAndUpdate(room.hotel, { $pull: { rooms: room._id } });

        // delete the room
        await room.deleteOne();

        res.status(200).json({ success: true, message: 'Otaq silindi və bağlı rezervasiyalar silindi' });
    } catch (error) {
        next(error);
    }
};

exports.getHotelRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({ hotel: req.params.hotelId });
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        next(error);
    }
};
