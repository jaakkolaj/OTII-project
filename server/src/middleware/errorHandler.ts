import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError, ServerError, AuthenticationError, AuthorizationError } from '../utils/errors';
import { Prisma } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';


export const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res)).catch(next);
    };
};

interface ErrorResponse {
    status: 'error';
    statusCode: number;
    message: string;
    stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
// Prisma unique constraint -virhe → 409
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return res.status(409).json({
            status: "error",
            message: "Resource already exists",
        });
    }

    // Prisma not found → 404
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        return res.status(404).json({
            status: "error",
            message: "Resource not found",
        });
    }


    // JWT-virheet → 400
    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
    return res.status(400).json({
        status: "error",
        message: "Invalid or expired token"
    });
}

    // Tuntematon virhe → 500
    console.error("Unhandled error:", err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
};