const express = require("express");
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const checkAuth = require("./../middleware/check-authentication");

const multer = require('multer');


const DIR = './uploads/';
storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
    });

  }
})

const upload = multer({ storage: storage }).single('resume');


router.post("/api/upload/resume", function(req, res, next) {
  let path = "";
  upload(req, res, function(err) {

    if (err) {
      console.log(err);
      return res.status(422).send({
        error: err
      });
    }
    resumeFile = req.file.filename;

    return res.status(201).json({
      message: "Resume uploaded.",
      resume: resumeFile,
      path: req.file.path
    });
  });
});


router.get("/candidate/resume/:resume", (req, res) => {
  const resumePath = req.params.resume;
  res.sendFile(path.join(__dirname, "./../uploads/"+resumePath));
});

module.exports = router;
