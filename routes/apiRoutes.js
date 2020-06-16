const express = require("express");
const db = require("../models");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {

    app.post("/api/register", authController.signup);

};