const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Aura Grand üçün hazırdır!");
    } catch (err) {
        console.error("DB Xətası:", err.message);
        process.exit(1);
    }
};
module.exports = connectDB;