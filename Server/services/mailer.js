const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const { resSuccess, resSuccessData, resInternalError } = require('../utils/response');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.USER,  // sender gmail address. 
        pass: process.env.APP_PASSWORD,
    },
});

const mailOptions = {
    from: {
        name: "VnD App",
        address: process.env.USER
    }, // sender address
    to: ["thi.a24technology@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body,
    // attachments: [
    //     {
    //         filename: '',
    //         path:path.join(__dirname,''),
    //         contentType:'application/pdf'
    //     }
    // ]
}

const sendMail = async (resHttp, mailOptions) => {
    try {
        const res = await transporter.sendMail(mailOptions);
        if (res) {
            return resSuccessData(resHttp, res.response);
        }
        return resInternalError(res, "Send email unsuccessfull!")
    } catch (error) {
        return resInternalError(resHttp, error);
    }
}
module.exports = { sendMail, mailOptions };