import { Request, Response, NextFunction } from "express";
import { uploadLimiter, loginLimiter, aiLimiter } from "../utils/rateLimiter";

export const uploadRateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // avain: käyttäjä jos kirjautunut, muuten ip
  const key = (req as any).user?.id || req.ip;

  try {
    await uploadLimiter.consume(key);
    return next();
  } catch (rejRes: any) {
    const retryAfterSeconds = Math.ceil(rejRes.msBeforeNext / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      error: "RATE_LIMITED",
      retryAfterSeconds,
    });
  }
};

export const loginRateLimitMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const key = req.user?.id || req.ip;

    try {
        await loginLimiter.consume(key);
        return next();
    } catch (rejRes: any) {
    const retryAfterSeconds = Math.ceil(rejRes.msBeforeNext / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      error: "RATE_LIMITED",
      retryAfterSeconds,
    });
  }
};

export const AiAnalysisRateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.user?.id || req.ip;

  try {
    await aiLimiter.consume(key);
    return next();
  } catch(rejRes: any) {
    const retryAfterSeconds = Math.ceil(rejRes.msBeforeNext / 1000);
    res.set("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      error: "RATE_LIMITED",
      retryAfterSeconds,
    });
  }
};