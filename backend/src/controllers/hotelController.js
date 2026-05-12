const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res, next) => {
    try {
        const { city, minPrice, maxPrice, search } = req.query;
        let query = {};
        if (city) query.city = city;
        if (search) query.name = { $regex: search, $options: 'i' };
        if (minPrice || maxPrice) {
            query.price = { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity };
        }

        const hotels = await Hotel.find(query);
        res.json(hotels);
    } catch (error) { next(error); }
};

exports.createHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) { next(error); }
};