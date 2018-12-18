const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const checkAuth = require("./../middleware/check-authentication");

// user signup
router.post("/signup", function(req, res, next) {
  bcrypt.hash(req.body.password, 10).then(password => {
    const profile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      role: "seeker",
      profile: {
        user: profile
      }
    });

    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

// user signup
router.post("/employer/signup", function(req, res, next) {
  bcrypt.hash(req.body.password, 10).then(password => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: password,
      role: "employer"
    });

    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

// user login
router.post("/login", function(req, res, next) {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        res.status(401).json({
          message: "Worng password"
        });
      }

      console.log("I am here");
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          role: fetchedUser.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      let profile;
      if (fetchedUser.role === "seeker") {
        profile = fetchedUser.profile.user;
      } else {
        profile = {
          ...fetchedUser.profile.company,
          fullName: fetchedUser.firstName + " " + fetchedUser.lastName
        };
      }

      return res.status(200).json({
        _token: token,
        _expiresIn: 7200,
        _role: fetchedUser.role,
        _profile: profile,
        message: "Login Successfull."
      });
    })
    .catch(error => {
      return res.status(401).json({
        message: "Auth Failed",
        error: error
      });
    });
});

// Checking if user is authenticated or not
router.get("/users", checkAuth, function(req, res, next) {
  User.find({})
    .then(result => {
      return res.status(200).json({
        data: result
      });
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      });
    });
});

module.exports = router;
