import { Router, Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

    if(!(user && passwordCorrect)) {
        return res.status(400).json({ error: "Invalid email or password!" });
    }

    const userForToken = {
        email: user.email,
        id: user.id
    }

    const token = jwt.sign(userForToken, "SECRET");
    res.status(200).json({ token, email: user.email, id: user.id })
})

export default loginRouter;