const express = require('express');
const nodemailer = require('nodemailer');
const sendEmail = async (email, subject, html) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 80,
        secure: true,
        auth: {
            user: process.env.NODE_MAILER_EMAIL,
            pass: process.env.NODE_MAILER_PASSCODE
        }
    });
    const response = await transporter.sendMail({
        from: process.env.NODE_MAILER_EMAIL,
        to: email,
        subject: subject,
        html: html,
    });
    if (response.accepted) {
        if (response.accepted.length > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
module.exports = sendEmail