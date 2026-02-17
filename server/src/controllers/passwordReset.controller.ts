import { Request, Response } from "express";
import { transport } from "../config/mail";
import prisma from "../prisma";
import jwt, {JwtPayload} from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const MAIL_USER = process.env.MAIL_USER;
const JWT_SECRET = process.env.JWT_SECRET || "kosodpskop";

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
                <a href="http://localhost:3000/reset-password/${token}">Reset your password</a>
            </td>
        </tr>
    </table>`;

    const mailOptions = {
        from: MAIL_USER,
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

export const passwordResetToken = async(req: Request, res: Response) => {
    const tokenParam = req.params.token ?? req.query.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    if (typeof token !== "string" || token.trim() === "") {
        return res.status(400).json({ error: "Invalid token" });
    }

    const { password } = req.body;
    if (typeof password !== "string" || password.length < 5) {
        return res.status(400).json({ error: "Password must be at least 5 characters" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const userId = decoded.id;
        if (!userId) {
            return res.status(400).json({ error: "Token payload is invalid" });
        }

        const user = prisma.user.findUnique({ where: { id: decoded.user_id } });
        if (!user) {
            return res.status(404).json({ error: "User with token was not found" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: passwordHash },
        });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};