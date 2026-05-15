const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('name').isLength({ min: 2 }).withMessage('Ad minimum 2 simvol olmalıdır'),
  body('email').isEmail().withMessage('Düzgün email daxil edin'),
  body('password').isLength({ min: 6 }).withMessage('Şifrə minimum 6 simvol olmalıdır'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Düzgün email daxil edin'),
  body('password').exists().withMessage('Şifrə tələb olunur'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

exports.validateReservation = [
  body('hotel').notEmpty().withMessage('Otel ID tələb olunur'),
  body('startDate').isISO8601().withMessage('Başlanğıc tarixi düzgün formatda olmalıdır'),
  body('endDate').isISO8601().withMessage('Bitmə tarixi düzgün formatda olmalıdır'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
