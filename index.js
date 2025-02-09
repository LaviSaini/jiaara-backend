const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const response = require("./server/responses/index");
const v1 = require("./server/v1/routes");
const config = require("./server/config");
const dbService = require("./server/v1/service/db.service");

// Initialize Express App
const app = express();

// Start Database Service
const DB = dbService("development", config.migrate).start();
require("./server/connection/connect");

// Middleware: CORS
const corsOptions = {
    origin: "*", // Allow all origins
    credentials: true,
    methods: ["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "X-API-KEY",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
        "Authorization",
        "authorization",
        "appstats",
    ],
};
app.use(cors(corsOptions));

// Middleware: JSON and URL Encoded Parsing
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: false }));

// Middleware: Custom Response Handlers
app.use(response.success, response.reject);

// Routes
app.use("/api/v1", v1);

// Server Listener
const PORT = process.env.SERVER || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
