const sendEmail = require('../utils/email');

exports.sendContactMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400);
            return next(new Error('Bütün xanalar tələb olunur'));
        }

        // Email göndər (əgər email konfiqurasiyası varsa)
        try {
            await sendEmail({
                to: process.env.EMAIL_USER || 'info@auragrand.az',
                subject: `Əlaqə Formu: ${subject}`,
                html: `
                    <h2>Yeni əlaqə mesajı</h2>
                    <p><strong>Ad:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mövzu:</strong> ${subject}</p>
                    <p><strong>Mesaj:</strong></p>
                    <p>${message}</p>
                `
            });
        } catch (emailError) {
            console.warn('Email göndərilmədi:', emailError.message);
            // Email göndərilməsə də, mesajı qəbul edirik
        }

        res.status(200).json({
            success: true,
            message: 'Mesajınız qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.'
        });
    } catch (error) {
        next(error);
    }
};
