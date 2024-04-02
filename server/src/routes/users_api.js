const express = require("express");
const connectDatabase = require('../config/connectDatabase');
const transporter = require('../utils/send_mail')
const verifyJWT = require("../middlewares/verifyJWT");
const jwt = require('jsonwebtoken');
const generateToken = (data) => jwt.sign(data, process.env.SECRET_KEY);
const multer = require('multer');
const bcrypt = require('bcryptjs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    }
});
const upload = multer({
    storage, limits: { fileSize: 10000000 }
});

const router = express.Router();
const run = async () => {
    const db = await connectDatabase();
    const users_collection = db.collection("users");

    router.get("/get_user", verifyJWT, async (req, res) => {
        const result = await users_collection.findOne({ email: req.email })
        res.status(200).send(result)
    })

    router.post("/add_user", verifyJWT, async (req, res) => {
        const find_user = await users_collection.findOne({ email: req.body.email })
        if (find_user && !find_user?.is_verified) {
            await transporter.sendMail({
                from: 'toukir486@gmail.com',
                to: `${req.body.email}`,
                subject: "Send mail for create an account",
                text: "Hello dear, hope that you are well.",
                html: `
                    <div style='padding-bottom: 8px'>
                      <h1 style='color: #40444E; margin: 0px'>Hi, To create an account.</h1> <br/>
                     <a style='color:white; text-decoration:none; padding:8px 10px; background:#40444E; border-radius: 4px' href="${process.env.VITE_CLIENT_URL}/sign-up?invited_email=${req.body.email}&id=${generateToken({ admin_id: req.id })}">Click here</a>
                    </div>
                  `
            });
        }

        if (!find_user?.is_verified && !find_user?.email) {
            await transporter.sendMail({
                from: 'toukir486@gmail.com',
                to: `${req.body.email}`,
                subject: "Send mail for create an account",
                text: "Hello dear, hope that you are well.",
                html: `
                    <div style='padding-bottom: 8px'>
                      <h1 style='color: #40444E; margin: 0px'>Hi, To create an account.</h1> <br/>
                     <a style='color:white; text-decoration:none; padding:8px 10px; background:#40444E; border-radius: 4px' href="${process.env.VITE_CLIENT_URL}/sign-up?invited_email=${req.body.email}&id=${generateToken({ admin_id: req.id })}">Click here</a>
                    </div>
                  `
            });
            const userData = {
                first_name: "",
                last_name: "",
                email: req.body.email,
                password: "",
                is_verified: false,
                role: "user",
            }
            const result = await users_collection.insertOne(userData)
            res.status(200).send(result)
        }
    })

    router.post("/update_user", verifyJWT, upload.array('file', 1), async (req, res) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            let update_field = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: hash,
            }
            if (req.files[0]?.filename) {
                update_field.profile_image = req.files[0].filename
            }
            const result = await users_collection.updateOne({ email: req.email }, { $set: update_field })
            res.status(200).send({ result: result, message: "Update profile data successfully." })
        } catch (error) {
            res.status(500).send(error, 'Internal server error');
        }
    })

};

run();

module.exports = router;