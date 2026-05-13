const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [String], 
    rating: { type: Number, default: 0 },
    amenities: [String]
}, { 
    timestamps: true,
    toJSON: { virtuals: true }, // Rəyləri JSON-da göstərmək üçün
    toObject: { virtuals: true }
});

// Otelə aid rəyləri virtual olaraq bağlayırıq
hotelSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

module.exports = mongoose.model('Hotel', hotelSchema);