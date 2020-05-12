const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../../config");

/* GET users listing. */
router.post("/login", function (req, res, next) {
  //   res.json({users: [{name: 'Timmy'}]});
  console.log("inside", req.body.username);
  User.find({ username: req.body.username })
    .select("+password")
    .exec()
    .then((user) => {
      if (user[0] && user[0].password === req.body.password) {
        const token = jwt.sign(
          {
            email: user[0].email,
            id: user[0]._id,
          },
          config.getJWTToken(),
          {
            expiresIn: "1000h",
          }
        );
        res.status(200).json({
          message: "Auth Successful",
          status: 200,
          token,
        });
      } else {
        res.status(401).json({
          message: "Auth failed",
        });
      }
    });
});

module.exports = router;
