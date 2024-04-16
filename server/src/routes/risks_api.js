const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const router = express.Router();
const { ObjectId } = require("mongodb")

const run = async () => {
    const db = await connectDatabase();
    const risks_collection = db.collection("risks");

    router.post("/add-risk", async (req, res) => {
        try {
            const result = await risks_collection.insertOne({ ...req.body, timestamp: new Date() })
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

    router.get("/get-risks", async (req, res) => {
        try {
            const result = await risks_collection.find().sort({ timestamp: -1 }).toArray()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

    router.patch("/update_risk", async (req, res) => {
        try {
            const result = await risks_collection.updateOne({ _id: new ObjectId(req.query.risk_id) }, { $set: req.body })
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();
module.exports = router;