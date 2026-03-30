import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import "dotenv/config";

const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({ message: "Token is missing"});
    }

    try {
        const payload = jwt.verify(token, SECRET) as JwtPayload;
        req.user = payload;
        next();
    } catch(error) {
        return res.status(401).json({ message: "Token is expired" });
    }
}
