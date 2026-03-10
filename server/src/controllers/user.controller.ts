import { Request, Response, NextFunction } from "express"
import prisma from "../prisma"
import bcrypt from 'bcrypt'
import { validateEmail } from "../utils/validation";
import { ValidationError } from "../utils/errors";

export const passwordChange = async (req: Request, res: Response) => {
    // Autentikointi
    if(!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { currentPassword, newPassword } = req.body;

    // Haetaan käyttäjä
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if(!user) {
        return res.status(404).json({ error: "No user found" });
    }


    // Varmistetaan että currentPassword matchaa
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user?.password)
    if(!isPasswordCorrect) {
        return res.status(400).json({ error: "Current password is not correct." });
    }


    try {
        // Päivitetään käyttäjän salasana
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: passwordHash },
        });
        return res.status(200).json({ message: "Password updated successfully." });
    } catch(error) {
        return res.status(500).json({ error: "Internal server errro" });
    }
};

export const changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    // Autentikointi
    if(!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { email } = req.body;

    // Haetaan käyttäjä
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if(!user) {
        return res.status(404).json({ error: "No user found" });
    }


    // Varmistetaan että currentPassword matchaa
    const isEmailCorrect = validateEmail(email);
    if (!isEmailCorrect) {
        return next(new ValidationError("Invalid email format"));
    }


    try {
        // Päivitetään käyttäjän sähköposti
        await prisma.user.update({
            where: { id: req.user.id },
            data: { email: email },
        });
        return res.status(200).json({ message: "Email updated successfully." });
    } catch(error) {
        return res.status(500).json({ error: "Internal server errro" });
    }
};
