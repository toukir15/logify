const mongodb = require("mongodb");

const uri = `${process.env.MONGO_URI}`
const mongoClient = mongodb.MongoClient

async function connectDatabase() {
    try {
        const client = await mongoClient.connect(uri)
        return client.db("logify");
    }
    catch (error) {
        console.log(error)
    }
}
connectDatabase()

module.exports = connectDatabase
