const express = require('express');
require('dotenv').config()
const cors = require('cors');
const { MongoDBConnection } = require('./src/config/Connection');
const { initialize } = require('./src/routes/index.js');

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
initialize(app);
PORT = process.env.PORT || 8050;
console.log("fgfgf dfsdfsd")
MongoDBConnection()
app.listen(PORT, () => console.log(`Port is running at ${PORT}`))
module.exports = app
