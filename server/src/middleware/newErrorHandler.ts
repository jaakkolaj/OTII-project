import { Request, Response, NextFunction } from 'express';
import { AppError, NotFoundError } from '../utils/errors';

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
    if (process.env.NODE_ENV === 'development') {
        console.error(`[${req.method}] ${req.originalUrl} — ${err.message}`);
    }

    // Prisma unique constraint
    if ((err as any).code === 'P2002') {
        const field = (err as any).meta?.target?.[0] || 'field';
        res.status(409).json({ error: 'Conflict', message: `${field} already exists` });
        return;
    }

    // Prisma record not found
    if ((err as any).code === 'P2025') {
        res.status(404).json({ error: 'Not found', message: 'Resource not found' });
        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.name, message: err.message });
        return;
    }

    // Odottamaton virhe
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));
};