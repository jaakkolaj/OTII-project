import bcrypt from 'bcrypt';
import {Router, Request, Response, NextFunction } from 'express';
import "dotenv/config";
import prisma from "../prisma";

const signupRouter = Router();

signupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Password must be greater than 5 characters
    if(password.length < 5) {
        res.status(400).json({ error: "Passowrd must be greater than 5 character" })
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
})

export default signupRouter;