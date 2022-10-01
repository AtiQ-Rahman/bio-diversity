const express = require("express");
const app = express(); 
const errorMiddleware = require("./middleware/error");
const logger = require("./middleware/logger");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path")
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:10000000}))
// app.use(bodyParser.json());
// app.use(express.json({limit: '100mb'})); 
app.use(logger);
// import routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// route 
app.use("/api/v1", adminRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware for error

app.use(errorMiddleware);

module.exports = app;