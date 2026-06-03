const Reservation = require('../models/Reservation');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');

exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalReservations = await Reservation.countDocuments();
        const totalHotels = await Hotel.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalUsers = await User.countDocuments();

        const pendingReservations = await Reservation.countDocuments({ status: 'pending' });
        const confirmedReservations = await Reservation.countDocuments({ status: 'confirmed' });
        const cancelledReservations = await Reservation.countDocuments({ status: 'cancelled' });

        const totalRevenue = await Reservation.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const popularHotels = await Reservation.aggregate([
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: '$hotel', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'hotels', localField: '_id', foreignField: '_id', as: 'hotel' } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalReservations,
                totalHotels,
                totalRooms,
                totalUsers,
                pendingReservations,
                confirmedReservations,
                cancelledReservations,
                totalRevenue: totalRevenue[0]?.total || 0,
                popularHotels: popularHotels.map(h => ({
                    hotel: h.hotel[0],
                    count: h.count
                }))
            }
        });
    } catch (error) { next(error); }
};
