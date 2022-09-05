const express = require("express");
const app = express();
const { Dinosaur } = require("../models/index");
const {
    checkIfDinosaurExists,
    checkIfNameExists,
} = require("../middlewares/dinosaurs");

app.post("/", checkIfNameExists, async (req, res) => {
    try {
        const dinosaur = await Dinosaur.create(req.body);
        res.json(dinosaur);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/", async (req, res) => {
    try {
        if (req.query.order === "ASC") {
            const dinosaurs = await Dinosaur.findAll({
                order: [["birthYear", "ASC"]],
            });

            res.json(dinosaurs);
        } else if (req.query.order === "DESC") {
            const dinosaurs = await Dinosaur.findAll({
                order: [["birthYear", "DESC"]],
            });

            res.json(dinosaurs);
        } else {
            const dinosaurs = await Dinosaur.findAll({});

            res.json(dinosaurs);
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.get("/:id", checkIfDinosaurExists, async (req, res) => {
    const { id } = req.params;

    try {
        const dinosaur = req.dinosaur;

        if (dinosaur) {
            res.json(dinosaur);
        } else {
            res.status(404).json("Dinosaur not found");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.put("/:id", checkIfDinosaurExists, checkIfNameExists, async (req, res) => {
    const { id } = req.params;

    try {
        const dinosaur = await Dinosaur.update(req.body, {
            where: {
                id,
            },
        });
        const response = await Dinosaur.findOne({
            where: {
                id,
            },
        });

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

app.delete("/:id", checkIfDinosaurExists, async (req, res) => {
    const { id } = req.params;

    try {
        await Dinosaur.destroy({
            where: { id },
        });

        res.status(200).json("Meteorite launched");
    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

module.exports = app;
