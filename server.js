const express = require("express");
const cors = require("cors");
const { join } = require("path");
const fs = require("fs");

const PORT = 9000;

const path = (...args) => join(__dirname, ...args);
const read = (...args) => fs.readFileSync(path(...args), "utf-8");
const write = (file, object) =>
    fs.writeFileSync(path(file), JSON.stringify(object));

express()
    .use(cors())
    .use(express.json())
    .use(express.static(path("client", "dist")))
    .use("/", (req, res, next) => {
        //  Load all the drinks from the database before rendering anything
        req.drinks = JSON.parse(read("drinks.json"));
        next();
    })
    .get("/", (req, res) => {
        //  Render the frontend
        res.sendFile(path("client", "dist", "index.html"));
    })
    .get("/api/drinks", (req, res) => {
        //  Send all the dirnks data
        res.json(req.drinks);
    })
    .put("/api/drinks/:id", (req, res, next) => {
        //  Update server state
        req.drinks = req.drinks.map((drink) =>
            drink.id === req.params.id ? req.body : drink
        );
        //  Update database
        write("drinks.json", req.drinks);
        next();
        //  Return saved data
        res.json(req.body);
        console.log(req.body);
    })
    .listen(PORT, () => console.log(`http://localhost:${PORT}/`));
