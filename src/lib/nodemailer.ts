import nodemailer from 'nodemailer';

export const NodeMailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_API,
    },
});