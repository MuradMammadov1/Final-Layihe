const sendEmail = require('../utils/email');
const Contact = require('../models/Contact');

exports.sendContactMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            res.status(400);
            return next(new Error('Bütün xanalar tələb olunur'));
        }

        // Database-ə yığ
        const contact = new Contact({
            name,
            email,
            subject,
            message,
            status: 'new'
        });
        await contact.save();

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

exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

exports.updateContactStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        
        if (!contact) {
            res.status(404);
            return next(new Error('Əlaqə tapılmadı'));
        }

        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            res.status(404);
            return next(new Error('Əlaqə tapılmadı'));
        }

        res.status(200).json({
            success: true,
            message: 'Əlaqə silindi'
        });
    } catch (error) {
        next(error);
    }
};
