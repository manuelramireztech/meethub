const express = require("express");
// const path = require("path");
const db = require("../models/user.model");

module.exports = function (app) {

    app.post("/api/Registration", function (req, res) {

        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password

        })
            .then(function () {
                res.redirect(307, "/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });













}