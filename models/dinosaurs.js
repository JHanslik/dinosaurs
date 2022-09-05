const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Dinosaur = sequelize.define("Dinosaur", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scientificName: {
            type: DataTypes.STRING,
        },
        birthYear: {
            type: DataTypes.INTEGER,
        },
        extinctionYear: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        color: {
            type: DataTypes.TEXT,
        },
    });

    return Dinosaur;
};
