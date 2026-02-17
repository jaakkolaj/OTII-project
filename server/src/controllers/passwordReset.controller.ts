import { Request, Response } from "express";
import { transport } from "../config/mail";
import prisma from "../prisma";
import jwt, {JwtPayload} from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const MAIL_USER = process.env.MAIL_USER;
const JWT_SECRET = "kosodpskop";

// Routti lähettää sähköposti viestin ja linkin salasanan palautusta varten.
export const sendPasswordResetEmail = async(req: Request, res: Response) => {
    const { email } = req.body;

    // Etsii käyttäjän emailin perusteella
    const user = await prisma.user.findUnique({ where: { email: email } });
    if(!user) {
        // Jos käyttäjää ei löydy 404
        return res.status(404).json({ error: "No user found with this email" });
    }

    // Luo tokenin payload käyttäjän tunnuksilla
    const userForToken = {
        email: user.email,
        id: user.id
    }

    // JWT token salasanan palautusta varten
    const token = jwt.sign(userForToken, "kosodpskop");

    // HTML-sähköpostiviesti palautusta varten
    const emailBody = `
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="text-align: center;">
        <tr>
            <td>
                <p>Here is your password reset link:</p>
                <a href="http://localhost:3000/reset-password/${token}">Reset your password</a>
            </td>
        </tr>
    </table>`;

    // Sähköpostin asetukset
    const mailOptions = {
        from: MAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: emailBody
    }

    // Lähetetään sähköposti
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        } else {
            res.status(200).send('Email sent successfully!');
        }
    });
};

// Routti resetoi salasanan tokenin avulla
export const resetPasswordWithToken = async(req: Request, res: Response) => {
    const tokenParam = req.params.token ?? req.query.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    // Tarkistetaan, että token on kelvollinen
    if (typeof token !== "string" || token.trim() === "") {
        return res.status(400).json({ error: "Invalid token" });
    }

    // Salasanan validointi
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

        // Etsii käyttäjän tokenin perusteella
        const user = prisma.user.findUnique({ where: { id: decoded.user_id } });
        if (!user) {
            return res.status(404).json({ error: "User with token was not found" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        // Päivitetään käyttäjän salasana
        await prisma.user.update({
            where: { id: userId },
            data: { password: passwordHash },
        });
        return res.status(200).json({ message: "Password Updated successfully" });
    } catch (error) {
        // Muut errorit
        return res.status(400).json({ message: error });
    }
};