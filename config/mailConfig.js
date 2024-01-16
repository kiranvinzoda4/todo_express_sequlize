const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587, // Replace with your SMTP server port (usually 587 for TLS/STARTTLS)
    secure: false, // Set to true if using TLS
    auth: {
        user: 'kiranvinzoda5@gmail.com',
        pass: 'onbc lqsm fhox yotr',
    },
});

module.exports = {
    transporter,
};