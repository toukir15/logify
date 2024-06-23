
const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const bcrypt = require('bcryptjs');
const transporter = require('../utils/send_mail')
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const generateToken = (data) => jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
const router = express.Router()
const run = async () => {
    const db = await connectDatabase();
    const users_collection = db.collection("users");

    router.post("/sign_up", async (req, res) => {
        try {
            const find_user = await users_collection.findOne({ email: req.body.email_address })
            if (find_user?.is_verified) {
                return res.status(200).send({ is_already_crated: true })
            }
            else {
                await transporter.sendMail({
                    from: 'toukir486@gmail.com',
                    to: `${req.body.email_address}`,
                    subject: "Email varification email",
                    text: "Hello world?",
                    html: `
            <div style='padding-bottom: 8px'>
            <h1 style='color: #40444E; margin: 0px'>Hi, To verify your email.</h1> <br/>
            <a style='color:white; text-decoration:none; padding:8px 10px; background:#40444E; border-radius: 4px' href="http://localhost:5173/verify?token=${generateToken(req.body)}">Click here</a>
            </div>
            `
                });

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                if (find_user && !find_user.is_verified) {
                    await users_collection.updateOne({ email: req.body.email_address }, { $set: { password: hash } })
                }
                else {
                    const userData = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email_address,
                        password: hash,
                        is_verified: false,
                        role: 'admin'
                    }
                    await users_collection.insertOne(userData)
                }
                res.status(200).send({ message: "User created successfully" })
            }
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body
            const findUser = await users_collection.findOne({ email: email })
            if (findUser) {
                if (findUser.is_verified) {
                    const match = await bcrypt.compare(password, findUser.password);
                    if (match) {
                        const token = jwt.sign({ email: req.body.email, id: findUser._id, role: findUser.role }, process.env.SECRET_KEY, { expiresIn: '15d' });
                        const cryptoEncrypt = CryptoJS.AES.encrypt(token, process.env.ENCRYPTION_KEY).toString();
                        res.cookie("access_token", cryptoEncrypt, {
                            httpOnly: true,
                            secure: true,
                        }).status(200).send({ message: "Login successful" });
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
        }
        catch (error) {
            console.log(error)
        }
    })

    router.post("/sign_out", async (req, res) => {
        try {
            return res
                .clearCookie("access_token")
                .status(200)
                .send({ message: "Successfully logged out" });
        } catch (error) {
            res.status(500).send({ message: "Internal server error" })
        }
    })

    router.patch("/verify_email", async (req, res) => {
        try {
            const token = req.body.token;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded) {
                const result = await users_collection.updateOne(
                    { email: decoded?.email_address },
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

    router.put("/invited_user", async (req, res) => {
        try {
            const find_user = await users_collection.findOne({ email: req.body.email_address })
            if (find_user.is_verified) {
                return res.status(200).send({ is_already_crated: true })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const decodedId = jwt.verify(req.body.admin_id, process.env.SECRET_KEY).admin_id
                await transporter.sendMail({
                    from: 'toukir486@gmail.com',
                    to: `${req.body.email_address}`,
                    subject: "Email varification email",
                    text: "Hello world?",
                    html: `
                    <div style='padding-bottom: 8px'>
                      <h1 style='color: #40444E; margin: 0px'>Hi, To verify your email.</h1> <br/>
                     <a style='color:white; text-decoration:none; padding:8px 10px; background:#40444E; border-radius: 4px' href="http://localhost:5173/verify?token=${generateToken(req.body)}">Click here</a>
                    </div>
                  `
                });

                const result = await users_collection.updateOne(
                    { email: req.body.email_address },
                    {
                        $set: {
                            admin_id: decodedId,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            password: hash
                        }
                    },
                )
                return res.status(200).send(result)
            }
        }
        catch (error) {
            res.status(500).send({ message: "Internal server error." })
        }
    })

};

run();

module.exports = router;