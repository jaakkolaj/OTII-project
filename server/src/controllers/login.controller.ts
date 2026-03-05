import { Request, Response, NextFunction} from "express";
import prisma from "../prisma";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('1. Controller reached, body:', req.body); // 🧪
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });
    console.log('2. User found:', user ? 'yes' : 'no'); // 🧪

    const passwordCorrect = user ? await bcrypt.compare(password, user.password) : false;

    console.log('3. Password correct:', passwordCorrect);

    if(!user || !passwordCorrect) {
        console.log('4. Sending 401 error');
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