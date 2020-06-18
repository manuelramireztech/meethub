const db = require("../../models");
const User = db.user;


 const checkDuplicateEmail = (req, res, next) => {
    User.findone({
        email: req.body.email
    }).exec((err,user) => {
        if(err) {
            res.status(500).send({message: err});
            return;
        }
        if(user) {
            res.status(400).send({message: "Failed! Username is already in use!"});
            return;
        }
    })
};


  const verifySignUp = {
    checkDuplicateEmail,
};


 

  module.exports = verifySignUp;
