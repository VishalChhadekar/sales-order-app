const redis = require('redis');
require('dotenv').config();  

// Use the Redis URL from .env
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
