const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const router = express.Router();
const { ObjectId } = require("mongodb");

const run = async () => {
    const db = await connectDatabase();
    const controls_collection = db.collection("controls");

    router.post("/add_control", async (req, res) => {
        try {
            const result = await controls_collection.insertOne({ ...req.body, timestamp: new Date() })
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })
    router.get("/get_controls", async (req, res) => {
        try {
            const result = await controls_collection.find().sort({ timestamp: -1 }).toArray()
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })
    router.patch("/update_control", async (req, res) => {
        try {
            const result = await controls_collection.updateOne({ _id: new ObjectId(req.query.control_id) }, { $set: req.body })
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();
module.exports = router;