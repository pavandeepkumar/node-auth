const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoDBConnection } = require('./src/config/Connection');
const userRouter = require('./src/auth/AuthRoutes');
const productRouter = require('./src/product/ProductRoute');
const app = express();
app.use(express.json());
app.use(cors());
PORT = process.env.PORT || 8050;
MongoDBConnection()
app.get('/', (req, res) => {
  return res.json({
    success: true,
    data: "success"
  })
})
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.listen(PORT, () => console.log(`Port is running at ${PORT}`))

module.exports = app
