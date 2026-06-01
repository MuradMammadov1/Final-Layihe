const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    title: { type: String, required: true },
    type: { type: String, default: 'standard' },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'Qiymət mənfi ola bilməz']
    },
    capacity: { type: Number, default: 2 },
    count: { type: Number, default: 1 },
    description: { type: String },
    amenities: [String]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
