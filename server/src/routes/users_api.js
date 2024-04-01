const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const jwt = require('jsonwebtoken');
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();
const run = async () => {
    const db = await connectDatabase();
    const users_collection = db.collection("users");

    router.get("/get_user", verifyJWT, async (req, res) => {
        console.log(req.email)
        const result = await users_collection.findOne({ email: req.email })
        res.status(200).send(result)
    })

    // router.post("/add_user", async (req, res) => {
    //     const find_user = await users_collection.findOne({ email: req.body.email })
    //     await transporter.sendMail({
    //         from: 'toukir486@gmail.com', // sender address
    //         to: "toukir486@gmail.com", // list of receivers
    //         subject: "Hello ✔", // Subject line
    //         text: "Hello world?", // plain text body
    //         html: "<b>Hello world?</b>", // html body
    //     });
    //     if (!find_user.is_verified && !find_user.email) {
    //         const userData = {
    //             email: req.body.email,
    //             is_verified: false,
    //         }
    //         const result = await users_collection.insertOne(userData)
    //         console.log(result)
    //     }
    //     else {
    //         console.log('user already exist ')
    //     }

    // })

};

run();

module.exports = router;