const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const router = express.Router();

const run = async () => {
    const db = await connectDatabase();
    const risks_collection = db.collection("risks");

    router.post("/add-risk", async (req, res) => {
        try {
            const result = await risks_collection.insertOne(req.body)
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

    router.get("/get-risks", async (req, res) => {
        try {
            const result = await risks_collection.find({ project_id: req.query.project_id }).toArray()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();
module.exports = router;