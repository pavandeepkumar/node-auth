const express = require('express');
const { MongoDBConnection } = require('./src/config/Connection');
const userRouter = require('./src/auth/AuthRoutes');
const app = express();
app.use(express.json());

PORT = 8080;
MongoDBConnection()
app.use('/api/v1/user',userRouter)
app.listen(PORT, () => console.log(`Port is running at ${PORT}`))