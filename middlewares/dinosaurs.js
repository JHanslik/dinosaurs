const { Dinosaur } = require("../models/index");

const checkIfDinosaurExists = async (req, res, next) => {
    const { id } = req.params;

    const dinosaur = await Dinosaur.findOne({
        where: { id },
    });

    if (dinosaur) {
        req.dinosaur = dinosaur;
        next();
    } else {
        res.status(404).json("Dinosaur not found");
    }
};

const checkIfNameExists = async (req, res, next) => {
    const nameExists = await Dinosaur.findOne({
        where: {
            name: req.body.name,
        },
    });

    if (!nameExists) {
        next();
    } else {
        res.status(409).json(
            `Dinosaur already created with id: ${nameExists.id}`
        );
    }
};

module.exports = { checkIfDinosaurExists, checkIfNameExists };
