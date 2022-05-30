const nodemailer = require('nodemailer');
require("dotenv").config({ path: './auth.env' });



const Mail = nodemailer.createTransport({

    // pool: true,
    // maxConnections: 1,
    // logger: true,
    // debug: true,
    secure: false,
    // host: 'smtp-mail.outlook.com',
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
    tls: { rejectUnauthorized: false }

})


// https://accounts.google.com/DisplayUnlockCaptcha

// const Mail = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     pool: true,
//     // Sets the number of max connections per transport. Microsoft accepts up to 1 parallel connection for the same client.
//     maxConnections: 1,
//     logger: true,
//     debug: true,
//     // service: "hotmail",
//     secure: true, // upgrades later with STARTTLS -- change this based on the PORT
//     tls: { rejectUnauthorized: false },
//     auth: {
//         user: process.env.email,
//         pass: process.env.password,
//     },
// })

module.exports = Mail;
