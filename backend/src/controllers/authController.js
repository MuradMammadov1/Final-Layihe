const Hotel = require('../models/Hotel');

exports.getHotels = async (req, res, next) => {
    try {
        const { city, minPrice, maxPrice, search, sort } = req.query;
        let query = {};

        // Search və Filtering [cite: 9, 10]
        if (search) query.name = { $regex: search, $options: 'i' };
        if (city) query.city = city;
        if (minPrice || maxPrice) {
            query.price = { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || Infinity };
        }

        // Pagination [cite: 9]
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Sorting [cite: 9]
        let sortBy = sort ? sort.split(',').join(' ') : '-createdAt';

        const hotels = await Hotel.find(query).sort(sortBy).limit(limit).skip(skip);
        res.json({ count: hotels.length, page, data: hotels });
    } catch (error) { next(error); }
};