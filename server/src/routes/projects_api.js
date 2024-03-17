const express = require("express");
const multer = require('multer');
const connectDatabase = require('../config/connectDatabase');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    }
});
const upload = multer({ storage, limits: { fileSize: 10000000 } });

const run = async () => {
    const db = await connectDatabase();
    const projects_collection = db.collection("projects");

    const validateAndParseArray = (input) => {
        if (!input) return [];
        return input.split(",");
    };
    router.post("/add_projects", upload.array('file', 2), async (req, res) => {
        try {
            const { project_name, client, ID_number, project_description, risk_consequences, risk_consequences_impact, risk_categories, likelihood, risk_ratting, project_value, project_owner, start_date, end_date
            } = req.body;
            const project_data = {
                add_image: req.files[0].filename,
                risk_metrix_template: req.files[1].filename,
                project_name,
                client,
                ID_number,
                project_description,
                risk_consequences: validateAndParseArray(risk_consequences),
                risk_consequences_impact: validateAndParseArray(risk_consequences_impact),
                risk_categories: validateAndParseArray(risk_categories),
                likelihood: validateAndParseArray(likelihood),
                risk_ratting: validateAndParseArray(risk_ratting),
                project_value,
                project_owner: validateAndParseArray(project_owner),
                start_date,
                end_date,
                timestamp: new Date()
            };
            await projects_collection.insertOne(project_data);
            res.status(200).send('File uploaded successfully');
        } catch (error) {
            res.status(500).send('Internal server error');
        }
    });

    router.get("/get_projects", async (req, res) => {
        const result = await projects_collection.find().sort({ timestamp: -1 }).toArray()
        console.log(result)
        res.send(result)
    })
};

run(); // Call run function to execute the code inside it

module.exports = router;