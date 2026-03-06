import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError, ServerError } from '../utils/errors';
import { Prisma } from '@prisma/client';


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

    // Tuntematon virhe → 500
    console.error("Unhandled error:", err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};