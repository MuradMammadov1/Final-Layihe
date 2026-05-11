const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res, next) => {
    try {
        const { city, minPrice, maxPrice, search } = req.query;
        let query = {};

        if (city) query.city = city;
        if (minPrice || maxPrice) {
            query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
        }
        if (search) query.name = { $regex: search, $options: 'i' };

        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const hotels = await Hotel.find(query).limit(limit).skip(skip);
        res.json(hotels);
    } catch (error) { next(error); }
};

exports.createHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) { next(error); }
};