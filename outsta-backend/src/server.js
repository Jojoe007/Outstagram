require("dotenv").config();
require("./utils/db")();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server start at port ${PORT}`)
);