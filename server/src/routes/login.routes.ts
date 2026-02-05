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

    const token = jwt.sign(userForToken, "kosodpskop");

    res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,        // vain HTTPS
        sameSite: "lax",     // suojaa CSRF:ltä
        maxAge: 15 * 60 * 1000
    });

    console.log("Generated JWT token:", token);

    res.status(200).json({ email: user.email, id: user.id, token: token })
});

export default loginRouter;