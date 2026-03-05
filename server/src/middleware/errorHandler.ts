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

export const errorHandler = (
    err: Error | AppError, 
    req: Request, 
    res: Response, 
    next: NextFunction):
     void => {

        if ((err as any).statusCode) {
        switch ((err as any).code) {

            case 'P2002':
                err = new AppError(409, "Unique constraint violation");
                break;

            case 'P2025':
                err = new NotFoundError("Resource not found");
                break;
        }


    const statuscode = err instanceof AppError ? err.statusCode : 500 ;

    switch (statuscode) {
        case 400:
            res.status(400).json({
                 error: "Bad request",
                  message: err.message 
                });
            break;
        case 401:
            res.status(401).json({
                error: "Not authorized",
                message: err.message 
            });
            break;
        case 403:
            res.status(403).json({
                error: "Forbidden",
                message: err.message 
            });
            break;
        case 404:
            res.status(404).json({
                error: "Resource not found",
                message: err.message
            });
            break;
        case 409:   
            res.status(409).json({
                error: "Conflict",
                message: err.message
            });
            break;
        default:
            res.status(500).json({
                error: "Internal server error",
                message: err.message
            });
            break;
    }
}

   
    const statusCode = err instanceof AppError ? err.statusCode : 500;

    const response: ErrorResponse = {
        status: 'error',
        statusCode,
        message: err.message,
    };

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

export const notFoundHandler = (
    req: Request, 
    res: Response, 
    next: NextFunction): 
void => {
    next(new NotFoundError(`Route ${req.originalUrl} not found`));

};
export const newErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
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
}

