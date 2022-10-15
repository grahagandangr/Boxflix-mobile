const Redis = require("ioredis");
const redis = new Redis({
  port: 16476, // Redis port
  host: "redis-16476.c302.asia-northeast1-1.gce.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_SECRET_KEY,
});

module.exports = redis;
