const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const router = express.Router();

const run = async () => {
    const db = await connectDatabase();
    const controls_collection = db.collection("controls");
    const risks_collection = db.collection("risks");

    router.post("/add-control", async (req, res) => {
        try {
            const { controlRiskData, addControlData } = req.body
            let risk_result;
            if (controlRiskData) {
                risk_result = await risks_collection.insertOne(controlRiskData)
            }
            const result = await controls_collection.insertOne({ ...addControlData, risk_id: risk_result?.insertedId.toString() })
            res.status(200).send(result)
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();
module.exports = router;