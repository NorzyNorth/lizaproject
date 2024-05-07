import { Redis } from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined;
};

export const redis =
  globalForRedis.redis ??
  new Redis({
    host: process.env.IOREDIS_HOST,
    password: process.env.IOREDIS_PASSWORD, 
    port: Number(process.env.IOREDIS_PORT),
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
