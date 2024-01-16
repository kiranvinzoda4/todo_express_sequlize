const { transporter } = require('../config/mailConfig.js');

const sendEmail = async (to, subject, html) => {

    const mailOptions = {
        from: 'kiranvinzoda5@gmail.com',
        to: to,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return 0;
        }
        return 1;
    });
}

module.exports = {
    sendEmail,
};


