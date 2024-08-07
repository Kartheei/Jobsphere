import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

export default transporter;