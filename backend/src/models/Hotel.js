const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [String], // Cloudinary-dən gələn linklər
    rating: { type: Number, default: 0 },
    amenities: [String]
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);