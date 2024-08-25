const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis();

// const redisConnection=async()=>{
//     let redisClient=redis.createClient()

//     redisClient.on("error",(err)=>{
//         console.log("Error: ", err)
       
//     })
//     await redisClient.connect()
//     console.log("redis connection established")
// }

module.exports=redis