const Userdb = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 */

exports.CreateUser = async (req, res) => {
  try {
    const data = req.body;
    res.send("Record saved successfuly");

    console.log(req.body);
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new Userdb({
          FirstName: req.body.firstName,
          LastName: req.body.lastName,
          Email: req.body.email,
          Password: hash,
        });
        user.save();
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(400).send(error.message);
  }
};
