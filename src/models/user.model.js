const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

   
    firstName: {
        type: String,
        trim: true,
        requried: "Please enter your first name "
    },

    lastName: {
        type: String,
        trim: true,
        requried: "Please enter your last name "
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "please enter a valid email"],
        unique: true

    },
    password: {
        type: String,
        trim: true,
        required: "password is required",
        validate: [({ length }) => length >=6, "password must be at least 6 Characters."]
    },
    
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;


