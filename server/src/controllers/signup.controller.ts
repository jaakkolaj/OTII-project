import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../utils/validation";
import prisma from "../prisma";
import bcrypt from 'bcrypt';
import "dotenv/config";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Password must be greater than 5 characters
    if(password.length < 5) {
        return res.status(400).json({ error: "Password must be greater than 5 character" })
    }
    const isEmailCorrect = validateEmail(email);
    if(!isEmailCorrect) {
        return res.status(400).json({error: "Email is invalid!"});
    }

    const user = await prisma.user.findUnique({
        where: { 
            email: email
        }
    });

    if(user) {
        return res.status(400).json({ error: "This email is already in use" })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const data = {
        email: email,
        password: passwordHash
    }

    try {
        await prisma.user.create({ data })
        res.status(200).json(data);
    } catch(error) {
        next(error)
    }
};