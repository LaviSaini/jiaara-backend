const express = require("express");
const path = require("path");
const http = require('http');
require("dotenv").config();
const CONFIG = require('./config/appConfig');
const response = require('./responses/index')
require('./connection/connect')
var app = express();
let server = http.createServer(app, function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end();
})
    .listen(CONFIG.PORT, (err) => {
        if (err) {
            return console.log("something went wrongG!", err)
        }
        console.log(`server is runnig at ${CONFIG.PORT}`)
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

app.use(response.success, response.reject);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: false }));