require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
    }
);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to db");
    } catch (e) {
        console.log(e);
    }
};

connectDb();

const Dinosaur = require("./dinosaurs")(sequelize);

sequelize.sync({ alter: true });

const db = {
    sequelize,
    Dinosaur,
};

module.exports = db;
