const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Bu email artıq qeydiyyatdan keçib' });
        }
        
        const subscription = await Newsletter.create({ email });
        res.status(201).json({ success: true, message: 'Uğurla abunə oldunuz', data: subscription });
    } catch (error) {
        next(error);
    }
};

exports.unsubscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        
        const subscription = await Newsletter.findOne({ email });
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Abunəlik tapılmadı' });
        }
        
        await subscription.deleteOne();
        res.status(200).json({ success: true, message: 'Abunəlik ləğv edildi' });
    } catch (error) {
        next(error);
    }
};

exports.getAllSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Newsletter.find({ active: true }).sort({ subscribedAt: -1 });
        res.status(200).json({ success: true, data: subscribers });
    } catch (error) {
        next(error);
    }
};
