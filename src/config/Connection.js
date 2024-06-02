const { default: mongoose } = require("mongoose")

async function MongoDBConnection() {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@pavandeepcluster.ogug7qv.mongodb.net/auth')
        if (res) {
            console.log("mongodb connection is established")
        }

    } catch (error) {
        console.log("Error is in while connecting mongoDB", error)
    }
}

module.exports = {
    MongoDBConnection
}