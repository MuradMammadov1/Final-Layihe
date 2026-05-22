const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // Email transporter konfiqurasiyası
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email seçimləri
        const mailOptions = {
            from: `"Aura Grand Hotel" <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html
        };

        // Email göndər
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email xətası:', error.message);
        throw error;
    }
};

module.exports = sendEmail;
