import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import "dotenv/config";

const SECRET = process.env.JWT_SECRET

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({ message: "Token is missing"});
    }

    try {
        const payload = jwt.verify(token, "kosodpskop") as JwtPayload;
        req.user = payload;
        next();
    } catch(error) {
        return res.status(401).json({ message: "Token is expired" });
    }
}
