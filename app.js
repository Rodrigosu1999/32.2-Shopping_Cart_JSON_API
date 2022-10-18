const express = require("express");
const app = express();
const ExpressError = require('./expressError');
const itemRoutes = require("./itemRoutes");

app.use(express.json());

app.use("/items", itemRoutes);



// 404 Error
app.use((req, res, next) => {
    return new ExpressError("Not found", 404);
});

// General Error Handler
app.use((err, req, res, next) => {
    res. status(err.status || 500);

    return res.json({
        error: err.message
    });
});

//Exports
module.exports = app;