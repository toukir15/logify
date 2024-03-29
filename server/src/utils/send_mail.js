const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "toukir486@gmail.com",
        pass: "txufituxdxphwvnq",
    },
});
module.exports = transporter