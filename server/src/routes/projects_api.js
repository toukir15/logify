const express = require("express");
const multer = require('multer');
const connectDatabase = require('../config/connectDatabase');
const { ObjectId } = require("mongodb");
const verifyJWT = require("../middlewares/verifyJWT")

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
const upload = multer({
    storage, limits: { fileSize: 10000000 }
});
const run = async () => {
    const db = await connectDatabase();
    const projects_collection = db.collection("projects");

    router.post("/add_project", upload.array('file', 2), async (req, res) => {
        try {
            const { project_name, client, ID_number, project_description, risk_consequences, risk_consequences_impact, risk_categories, likelihood, risk_ratting, project_value, project_owner, start_date, end_date
            } = req.body;
            const project_data = {
                add_image: req.files[0].filename,
                risk_matrix_template: req.files[1].filename,
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
            res.status(500).send({ message: 'Internal server error', error });
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

    router.post("/update_project", upload.fields([
        { name: 'add_image', maxCount: 1 },
        { name: 'risk_matrix_template', maxCount: 1 }]),
        async (req, res) => {
            try {
                let updateFields = {
                    project_name: req.body.project_name,
                    client: req.body.client,
                    ID_number: req.body.ID_number,
                    project_description: req.body.project_description,
                    project_value: req.body.project_value,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    risk_consequences: JSON.parse(req.body.risk_consequences),
                    risk_consequences_impact: JSON.parse(req.body.risk_consequences_impact),
                    risk_categories: JSON.parse(req.body.risk_categories),
                    likelihood: JSON.parse(req.body.likelihood),
                    risk_ratting: JSON.parse(req.body.risk_ratting),
                    project_owner: JSON.parse(req.body.project_owner)
                };
                if (req.files.add_image) {
                    updateFields.add_image = req.files.add_image[0].filename;
                }
                if (req.files.risk_matrix_template) {
                    updateFields.risk_matrix_template = req.files.risk_matrix_template[0].filename;
                }
                const result = await projects_collection.updateOne({ _id: new ObjectId(req.query.id) }, { $set: updateFields });
                res.status(200).send("Project updated successfully.");
            } catch (error) {
                res.status(500).send("An error occurred while updating the project.");
            }
        });
};
run();

module.exports = router;