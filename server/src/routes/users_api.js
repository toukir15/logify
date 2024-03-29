const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/send_mail')
const jwt = require('jsonwebtoken');

const generateToken = (data) => jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });


const router = express.Router();
const run = async () => {
    const db = await connectDatabase();
    const users_collection = db.collection("users");

    router.post("/sign_up", async (req, res) => {
        const find_user = await users_collection.findOne({ email: req.body.email_address })
        await transporter.sendMail({
            from: 'toukir486@gmail.com',
            to: "toukir.developer.bd@gmail.com",
            subject: "Email varification email",
            text: "Hello world?",
            html: `
                    <div style='padding-bottom: 8px'>
                      <h1 style='color: #40444E; margin: 0px'>Hi, To verify your email.</h1> <br/>
                     <a style='color:white; text-decoration:none; padding:8px 10px; background:#40444E; border-radius: 4px' href="http://localhost:5173/verify?token=${generateToken(req.body)}">Click here</a>
                    </div>
                  `
        });
        if (!find_user.is_verified && !find_user.email) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const userData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email_address,
                password: hash,
                is_verified: false,
            }
            const result = await users_collection.insertOne(userData)
            console.log(result)
        }
    })



    router.post("/login", async (req, res) => {
        const { email, password } = req.body
        const findUser = await users_collection.findOne({ email: email })
        if (findUser) {
            if (findUser.is_verified) {
                const match = await bcrypt.compare(password, findUser.password);
                if (match) {
                    const token = jwt.sign(req.body, process.env.SECRET_KEY, { expiresIn: '7d' });
                    res.cookie("access_token", token, {
                        httpOnly: true,
                    }).status(200).send({ token: token, message: "Login successful" })
                }
                else {
                    res.status(203).send("Password does not match.")
                }
            }
            else {
                res.status(203).send("Email does not verified.")
            }


        }
        else {
            res.status(203).send("User not found")
        }
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
    router.patch("/verify_email", async (req, res) => {
        try {
            const token = req.body.token;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded) {
                const result = await users_collection.updateOne(
                    { email: decoded.email_address },
                    { $set: { is_verified: true } }
                );
                if (result.modifiedCount === 1) {
                    res.status(200).json({ success: true, message: "Email verified successfully" });
                } else {
                    res.status(404).json({ success: false, message: "User not found or email is already verified" });
                }
            } else {
                res.status(400).json({ success: false, message: "Invalid token" });
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });


};

run();

module.exports = router;