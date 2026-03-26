import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from "../utils/errors";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

    if(!(user && passwordCorrect)) {
        return next(new AuthenticationError("Invalid email or password"));
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

    } catch(error) {
        next(error)
    }
}
