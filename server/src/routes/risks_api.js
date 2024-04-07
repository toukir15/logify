const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const router = express.Router();

const run = async () => {
    const db = await connectDatabase();
    const risks_collection = db.collection("risks");

    router.post("/add-risk", async (req, res) => {
        try {
            const result = await risks_collection.insertOne(req.body)
            console.log(result)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();
module.exports = router;