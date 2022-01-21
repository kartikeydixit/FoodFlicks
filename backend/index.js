const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const canteenRoute = require("./routes/canteenRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
//Connecting to DB
mongoose
  .connect("mongodb://localhost:27017/canteenProj")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/v1", canteenRoute);
app.use("/api/v2", userRoute);
app.use("/api/v3", orderRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
