const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Ad mütləqdir'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email mütləqdir'], 
        unique: true,
        lowercase: true, // Mailləri avtomatik kiçik hərflə saxlayır
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, 'Şifrə mütləqdir'],
        minlength: 6 // Təhlükəsizlik üçün minimum uzunluq
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

// Şifrəni hash-ləmək (pre-save middleware)
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Şifrəni yoxlamaq metodu
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);