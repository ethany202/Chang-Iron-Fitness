const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT,
    service: 'gmail',
    auth: {
        user: process.env.CLUB_EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

async function sendContactUsEmail(userFirstName, userLastName, message) {
    const mailOptions = {
        from: process.env.CLUB_EMAIL,
        to: process.env.CLUB_EMAIL,
        subject: '[Chang Iron Fitness] Contact-Us Message',
        html: `
            <h2>New Message from Chang Iron Fitness</h2>
            <p> From ${userFirstName} ${userLastName}</p>
            <p>${message}</p>
        `
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error)
            }
            else {
                resolve(info)
            }
        })
    })
}

module.exports = sendContactUsEmail