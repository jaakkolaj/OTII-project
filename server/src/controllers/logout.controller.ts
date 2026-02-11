import { Response, Request } from "express";

export const logoutUser =  (req: Request, res: Response) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: false,        // vain HTTPS
        sameSite: "lax",     // suojaa CSRF:ltä
        expires: new Date(0),
        path: "/"
    });
    res.status(200).json({ message: "Logged out" })
}