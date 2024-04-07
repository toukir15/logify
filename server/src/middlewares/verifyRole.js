const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")

const decrypt = (tokenEncrypted) => {
    try {
        const bytes = CryptoJS.AES.decrypt(tokenEncrypted, process.env.ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch {
        return false;
    }
}

const verifyJWT = (req, res, next) => {
    try {
        const tokenEncrypted = req?.cookies?.access_token
        const token = decrypt(tokenEncrypted);
        if (!token) {
            return res.clearCookie("access_token").status(403).send({ status: 'failed', message: "Unauthorized access" })
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
                if (err) {
                    return res.clearCookie("access_token").status(403).send({ status: 'failed', message: "Unauthorized access" });
                }
                const { email, id } = decode
                req.email = email
                req.id = id
                next()
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = verifyJWT;