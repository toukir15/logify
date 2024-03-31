const express = require("express")
const path = require('path')
console.log(path.resolve)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.PORT || 5000
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

app.use(cors({
    origin: `${process.env.VITE_CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))

const projects_api = require("./src/routes/projects_api")
const users_api = require("./src/routes/users_api")

app.use(express.json())
app.use('/api/v1/projects_api', projects_api)
app.use('/api/v1/users_api', users_api)

app.get('/', (req, res) => {
    console.log('logify server is running')
    res.send('logify Server running')
})

app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
