const express = require("express");
const multer = require('multer');
const connectDatabase = require('../config/connectDatabase');
const { ObjectId } = require("mongodb");

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
                risk_consequences: JSON.parse(risk_consequences),
                risk_consequences_impact: JSON.parse(risk_consequences_impact),
                risk_categories: JSON.parse(risk_categories),
                likelihood: JSON.parse(likelihood),
                risk_ratting: JSON.parse(risk_ratting),
                project_value,
                project_owner: JSON.parse(project_owner),
                start_date,
                end_date,
                timestamp: new Date()
            };
            await projects_collection.insertOne(project_data);
            res.status(200).send('File uploaded successfully');
        } catch (error) {
            res.status(500).send(error, 'Internal server error');
        }
    });

    router.get("/get_projects", async (req, res) => {
        try {
            const result = await projects_collection.find().sort({ timestamp: -1 }).toArray();
            res.send(result);
        } catch (error) {
            res.status(500).send("Error fetching projects");
        }
    });

    router.delete("/delete_projects", async (req, res) => {
        try {
            const id = req.query.id;
            const result = await projects_collection.deleteOne({ _id: new ObjectId(id) });
            res.status(200).send({ status: "Project deleted successfully", result });
        } catch (error) {
            res.status(500).send("Error deleting project");
        }
    });

    router.post("/update_project", upload.array('file', 2), async (req, res) => {

        const { project_name, client, ID_number, project_description, risk_consequences, risk_consequences_impact, risk_categories, likelihood, risk_ratting, project_value, project_owner, start_date, end_date
        } = req.body;
        console.log({ upload_file_one: req?.files[0]?.filename, upload_file_two: req?.files[1]?.filename })
        // console.log({ default_one: req?.body?.file[0], default_two: req?.body?.file[1] })
        // const project_data = {
        //     add_image: req.files[0]?.filename ? req.files[0]?.filename : req.body.file[0],
        //     risk_metrix_template: req.files[1]?.filename ? req.files[0]?.filename : req.body.file[1],
        // };
        // console.log(risk_consequences)
        const result = await projects_collection.updateOne(
            { _id: new ObjectId(req.query.id) },
            [
                {
                    $set: { add_image: req?.files[0]?.filename && req?.files[0]?.filename }
                },
                {
                    $set: { risk_metrix_template: req?.files[1]?.filename && req?.files[1]?.filename }
                },
                {
                    $set: { project_name: project_name }
                },
                {
                    $set: { client: client }
                },
                {
                    $set: { ID_number: ID_number }
                },
                {
                    $set: { project_description: project_description }
                },
                {
                    $set: { project_value: project_value }
                },
                {
                    $set: { start_date: start_date }
                },
                {
                    $set: { end_date: end_date }
                },
                {
                    $set: { risk_consequences: JSON.parse(risk_consequences) }
                },
                {
                    $set: { risk_consequences_impact: JSON.parse(risk_consequences_impact) }
                },
                {
                    $set: { risk_categories: JSON.parse(risk_categories) }
                },
                {
                    $set: { likelihood: JSON.parse(likelihood) }
                },
                {
                    $set: { risk_ratting: JSON.parse(risk_ratting) }
                },
                {
                    $set: { project_owner: JSON.parse(project_owner) }
                },
            ]
        );
        console.log(result)
    })



};

run(); // Call run function to execute the code inside it

module.exports = router;