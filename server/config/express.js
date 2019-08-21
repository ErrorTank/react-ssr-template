const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const configExpressServer = ({useCors = false, nextHandler}) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({
        limit: '2mb'
    }));
    if (useCors) {
        app.use(cors());
    }
    app.use(helmet());
    app.use(compression());
    app.get("/_next/*", (req, res) => {
        nextHandler(req, res);
    });

    app.get("/static/*", (req, res) => {
        nextHandler(req, res);
    });
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });

    app.use("*", (req, res, next) => {
        if (/^\/api\//.test(req.originalUrl)) {
            next();
        } else {
            nextHandler(req, res);
        }
    });
    return app;
};


module.exports = configExpressServer;
