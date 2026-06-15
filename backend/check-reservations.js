const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ReservationSchema = new mongoose.Schema({
    room: mongoose.Schema.Types.ObjectId,
    hotel: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    endDate: Date,
    status: String
}, { collection: 'reservations' });

const RoomSchema = new mongoose.Schema({
    title: String,
    count: Number
}, { collection: 'rooms' });

const Reservation = mongoose.model('Reservation', ReservationSchema);
const Room = mongoose.model('Room', RoomSchema);

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const reservations = await Reservation.find({});
        console.log('Total Reservations:', reservations.length);
        for (const res of reservations) {
            console.log(`Reservation: ${res._id}, Room: ${res.room}, Hotel: ${res.hotel}, Dates: ${res.startDate} to ${res.endDate}, Status: ${res.status}`);
        }
        
        const rooms = await Room.find({});
        for (const room of rooms) {
            console.log(`Room: ${room._id}, Title: ${room.title}, Count: ${room.count}`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
