import { Response, Request, NextFunction } from "express";

export const logoutUser =  (req: Request, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: false,        // vain HTTPS
        sameSite: "lax",     // suojaa CSRF:ltä
        expires: new Date(0),
        path: "/"
    });
    res.status(200).json({ message: "Logged out" })
}