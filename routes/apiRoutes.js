const express = require("express");
const db = require("../models");
const authController = require("../controllers/auth.controller");
// const verifySignUp = require("../config/middleware/verifySignUp");

module.exports = function (app) {

    app.post("/api/register", authController.signup);

    app.post("/api/login", authController.signin);

};