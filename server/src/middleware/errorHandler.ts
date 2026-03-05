import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError, ServerError } from '../utils/errors';

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

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
    let error = err;

    // Handle Prisma errors
    if ((err as any).code === 'P2002') {
        // Unique constraint violation
        const field = (err as any).meta?.target?.[0] || 'field';
        error = new AppError(409, `${field} already exists`, true);
    } else if ((err as any).code === 'P2025') {
        // Record not found
        error = new AppError(404, 'Resource not found', true);
    } else if (!(error instanceof AppError)) {
        // Unexpected error
        error = new ServerError('Internal server error');
    }

    const appError = error as AppError;
    const statusCode = appError.statusCode || 500;

    const response: ErrorResponse = {
        status: 'error',
        statusCode,
        message: appError.message,
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = appError.stack;
    }

    res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error = new NotFoundError(`Route ${req.originalUrl} not found`);
    next(error);
};
export const newErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (process.env.NODE_ENV === 'development') {
        console.error(`[${req.method}] ${req.originalUrl} — ${err.message}`);
    }

    switch ((err as any).code) {
        case '400':
            res.status(400).json({ error: "Bad request", message: err.message });
            break;
        case '401':
            res.status(401).json({ error: "Not authorized", message: err.message });
            break;
        case '403':
            res.status(403).json({ error: "Forbidden", message: err.message });
            break;
        case '404':
            res.status(404).json({ error: "Resource not found", message: err.message });
            break;
        case '409':
            res.status(409).json({ error: "Conflict", message: err.message });
            break;
        default:
            res.status(500).json({ error: "Internal server error", message: err.message });
            break;
    }
};
