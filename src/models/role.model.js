const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: String
})

const userRole = mongoose.model("Role", RoleSchema)

module.exports = userRole