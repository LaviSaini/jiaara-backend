const express = require("express");
const path = require("path");
const http = require('http');
const cors = require("cors");
require("dotenv").config();
const response = require('./responses/index')
const v1 = require('./v1/routes')
var app = express();
const config = require('./config');
const dbService = require("./v1/service/db.service")
app.use('/apidoc', express.static(path.join(__dirname, '../apidoc/doc')));
const DB = dbService('development', config.migrate).start();
require('./connection/connect')
let server = http.createServer(app, function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
})
    .listen(process.env.SERVER, (err) => {
        if (err) {
            return console.log("something went wrongG!", err)
        }
        console.log(`server is runnig at ${process.env.SERVER}`)
    })

app.use(function (req, res, next) {
    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader(
        "Access-Control-Allow-Methods",
        "HEAD, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization, authorization,appstats"
    );
    next();
});
const allowedOrigins = ["https://jiaara-backend-dmq2.vercel.app/"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(response.success, response.reject);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: false }));
app.use('/api/v1', v1)
