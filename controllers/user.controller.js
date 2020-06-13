// const db = require("../models/user.model");

// module.exports = {
//   create: function(req, res) {
//     db.User
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
// }







// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
//   };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  // exports.adminBoard = (req, res) => {
  //   res.status(200).send("Admin Content.");
  // };
  
  // exports.moderatorBoard = (req, res) => {
  //   res.status(200).send("Moderator Content.");
  // };