require("dotenv").config();
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const cors = require("cors");

//DB File Imports
const connectDB = require("./config/dbConfig");

//Route File Imports
const authRoute = require("./routes/authRoute");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoute);

//PORT
const port = process.env.PORT;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is Running on Port ${port}...`);
});
