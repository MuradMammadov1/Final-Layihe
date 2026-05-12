const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // 5 saniyə ərzində qoşulmasa dayansın
        });
        console.log(`✅ MongoDB Qoşuldu: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Xəta: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;