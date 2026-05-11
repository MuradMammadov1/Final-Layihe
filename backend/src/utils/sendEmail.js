const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
        from: '"Aura Grand" <noreply@auragrand.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    });
};
module.exports = sendEmail;