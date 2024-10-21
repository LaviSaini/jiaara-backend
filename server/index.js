const express = require("express");
const path = require("path");
const http = require('http');
require("dotenv").config();
// const CONFIG = require('./config/appConfig');
const response = require('./responses/index')
const passport = require('passport');
const session = require("express-session");
const v1 = require('./v1/routes')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var app = express();
require('./utils/passport')
const config = require('./config');

const dbService = require("./v1/service/db.service")

const DB = dbService('development', config.migrate).start();
// Middleware
app.use(session({
    secret: 'ddd$%^(()8&&jdfFFKk7689)Fg', // Replace with a strong secret
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


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

app.use(response.success, response.reject);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: false }));
app.use('/api/v1', v1)
