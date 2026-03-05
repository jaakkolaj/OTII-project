import { Request, Response, NextFunction} from "express";
import prisma from "../prisma";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });
    

    const passwordCorrect = user ? await bcrypt.compare(password, user.password) : false;


    if(!user || !passwordCorrect) {
        const err: any = new Error('Invalid email or password');
        err.code = '401';
        next(err);
        return;
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
        maxAge: 60 * 60 * 1000
    });

    res.status(200).json({ email: user.email, id: user.id, token: token })
};