import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../utils/validation";
import prisma from "../prisma";
import bcrypt from 'bcrypt';
import "dotenv/config";
import { ValidationError, ConflictError } from "../utils/errors";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // Password must be greater than 5 characters
        if (password.length < 5) {
            throw new ValidationError("Password must be greater than 5 characters");
        }
        const isEmailCorrect = validateEmail(email);
        if (!isEmailCorrect) {
            throw new ValidationError("Email is invalid!");
        }

        const user = await prisma.user.findUnique({
            where: { 
                email: email
            }
        });

        if (user) {
            throw new ConflictError("This email is already in use");
        }

        // Tässä pitäisi hashata salasana ennen kuin tallennetaan tietokantaan!!!!!

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const data = {
            email: email,
            password: passwordHash
        }

            await prisma.user.create({ data })
            res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};