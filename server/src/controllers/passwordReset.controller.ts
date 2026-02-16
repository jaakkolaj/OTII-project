import { Request, Response } from "express";
import { transport } from "../config/mail";
import prisma from "../prisma";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const EMAIL = process.env.EMAIL;

// Routti lähettää sähköposti viestin ja linkin salasanan palautusta varten.
export const resetPassword = async(req: Request, res: Response) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if(!user) {
        return res.status(404).json({ error: "No user found with this email" });
    }

    const userForToken = {
        email: user.email,
        id: user.id
    }

    // JWT token salasanan palautusta varten
    const token = jwt.sign(userForToken, "kosodpskop");

    const emailBody = `
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align: center;">
        <tr>
            <td>
                <p>Here is your password reset link:</p>
                <a href="https://chat-app-kufo.onrender.com/reset-password/${token}">Reset your password</a>
            </td>
        </tr>
    </table>`;

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset',
        html: emailBody
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        } else {
            res.send('Email sent successfully!');
        }
    });
};
