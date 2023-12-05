const Userdb = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.UserLogin = (req, res, next) => {
    Userdb.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};