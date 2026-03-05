import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "../config/redis";

// Upload: 10 pyyntöä / 60s
export const uploadLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "upload_limit",
  points: 10,
  duration: 60,
});

// Login:
export const loginLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "login",
    points: 10,
    duration: 60
});

// AI: 5 pyyntöä / 60s
export const aiLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "ai_limit",
  points: 5,
  duration: 60,
});