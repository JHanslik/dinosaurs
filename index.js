require("dotenv").config();
require("./models/index");
const express = require("express");
const cors = require("cors");
const app = express();
const dinosaursRoutes = require("./routes/dinosaurs");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/dinosaurs", dinosaursRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
