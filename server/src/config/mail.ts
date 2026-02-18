import nodemailer from 'nodemailer';
import "dotenv/config";

const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

export const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});