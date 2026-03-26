import { Request, Response, NextFunction } from "express";
import { uploadLimiter, standardLimiter, aiLimiter } from "../utils/rateLimiter";
import { redis } from "../config/redis";

// Tiedostojen uploadaus rate limit middleware. Hyödyntää uploadLimiteriä, jossa asetetaan pyyntöjen määrä/aika.
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

// Standardisoitu ratelimiter middleware, jota käytetään suurimmassa osassa routeista
// keyPrefix annetaan argumentteina ja erotellaan bucketti mihin ratelimiting kohdistetaan.
export const standardRateLimiter = (keyPrefix: string) => {
  const limiter = standardLimiter(keyPrefix);
  return async (req: Request, res: Response, next: NextFunction) => {
    // avain: käyttäjä jos kirjautunut, muuten ip
    const key = req.user?.id || req.ip;
    try {
      await limiter.consume(key);
      return next();
    } catch (rejRes: any) {
      const retryAfterSeconds = Math.ceil((rejRes.msBeforeNext ?? 1000) / 1000);
      res.set("Retry-After", String(retryAfterSeconds));
      return res.status(429).json({
        error: "RATE_LIMITED",
        retryAfterSeconds,
      });
    }
  }
}

// AI analyysien POST routin rate limit middleware. Hyödyntää aiLimiter, jossa asetetaan pyyntöjen määrä/aika.
export const AiAnalysisRateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // avain: käyttäjä jos kirjautunut, muuten ip
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

// Concurrency middleware, jota käytetään yhdessä AiAnalysisRateLimitMiddlewaren kanssa.
// Concurrency middleware estää saman käyttäjän kaksi samaa pyyntöä ai analysointiin.
export const aiConcurrencyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "UNAUTHORIZED" });
  }

  const key = `ai_lock:${userId}`;
  const ttlSeconds = 300;

  const lock = await redis.set(key, "1", "EX", ttlSeconds, "NX");

  if (!lock) {
    return res.status(409).json({
      error: "ANALYSIS_ALREADY_RUNNING",
    });
  }

  res.on("finish", async () => {
    await redis.del(key);
  });

  return next();
};