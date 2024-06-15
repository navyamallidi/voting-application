import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: process.env.URL,
    token:process.env.UPSTASH_REDIS_REST_TOKEN,
})