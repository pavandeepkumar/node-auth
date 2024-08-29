// const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
// const redis = new Redis();


// module.exports=redis

// config/redisClient.js
const { createClient } = require('redis');

const client = createClient({
    url: process.env.REDIS_URL || 'redis://default:Yhi600xtoekZC7vJeBk5fdiwZZRCfhFp@redis-13249.c14.us-east-1-3.ec2.redns.redis-cloud.com:13249',

});

client.on('error', (err) => console.log('Redis Client Error', err));

// Connect to the Redis server
client.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;
