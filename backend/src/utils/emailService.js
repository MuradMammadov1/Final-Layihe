const nodemailer = require('nodemailer');

// Email konfiqurasiyası
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Rezervasiya təsdiq email-i
exports.sendReservationConfirmation = async (email, reservationDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Rezervasiya Təsdiqləndi - Aura Grand Hotel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Rezervasiya Təsdiqləndi</h2>
          <p>Salam,</p>
          <p>Sizin rezervasiyanız təsdiqləndi. Detallar aşağıdadır:</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Otel:</strong> ${reservationDetails.hotelName}</p>
            <p><strong>Otaq:</strong> ${reservationDetails.roomTitle}</p>
            <p><strong>Giriş tarixi:</strong> ${reservationDetails.startDate}</p>
            <p><strong>Çıxış tarixi:</strong> ${reservationDetails.endDate}</p>
            <p><strong>Qiymət:</strong> ${reservationDetails.price} AZN</p>
            <p><strong>Status:</strong> ${reservationDetails.status}</p>
          </div>
          <p>Hər hansı sualınız varsa, bizimlə əlaqə saxlayın.</p>
          <p>Hörmətlə,<br>Aura Grand Hotel</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email göndərilmədi:', error);
    return false;
  }
};

// Rezervasiya status dəyişikliyi email-i
exports.sendReservationStatusUpdate = async (email, reservationDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Rezervasiya Statusu: ${reservationDetails.status} - Aura Grand Hotel`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Rezervasiya Statusu Dəyişdirildi</h2>
          <p>Salam,</p>
          <p>Sizin rezervasiyanızın statusu dəyişdirildi. Yeni status: <strong>${reservationDetails.status}</strong></p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Otel:</strong> ${reservationDetails.hotelName}</p>
            <p><strong>Otaq:</strong> ${reservationDetails.roomTitle}</p>
            <p><strong>Giriş tarixi:</strong> ${reservationDetails.startDate}</p>
            <p><strong>Çıxış tarixi:</strong> ${reservationDetails.endDate}</p>
            <p><strong>Yeni Status:</strong> ${reservationDetails.status}</p>
          </div>
          <p>Hörmətlə,<br>Aura Grand Hotel</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email göndərilmədi:', error);
    return false;
  }
};

// Qeydiyyat email-i
exports.sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Xoş gəldiniz - Aura Grand Hotel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Xoş gəldiniz, ${name}!</h2>
          <p>Aura Grand Hotel-ə qoşulduğunuz üçün təşəkkür edirik.</p>
          <p>İndi siz otelləri axtara, rezervasiya edə və favorit otellər əlavə edə bilərsiniz.</p>
          <p>Hörmətlə,<br>Aura Grand Hotel</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email göndərilmədi:', error);
    return false;
  }
};
