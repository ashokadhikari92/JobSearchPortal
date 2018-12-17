const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const checkAuth = require("./../middleware/check-authentication");


// Route to fetch all the jobs
router.get('/jobs', (req, res, next) => {

  return res.status(200)
  .json({
    data: [
      {
        title: "",
        company: "",
        location: {
          city: "",
          state: ""
        },
        numberOfPotition: "",
        salaryRange: {
          min: "",
          max: ""
        },
        publishedDate: ""
      },
      {
        title: "",
        company: "",
        location: {
          city: "",
          state: ""
        },
        numberOfPotition: "",
        salaryRange: {
          min: "",
          max: ""
        },
        publishedDate: ""
      }
    ]
  })
});


// Route to fetch job detail
router.get('/job/detail/:id', (req, res, next ) => {

  return res.status(200)
  .json({
    data: {
      title: "",
      company: "",
      location: {
        city: "",
        state: ""
      },
      numberOfPotition: "",
      salaryRange: {
        min: "",
        max: ""
      },
      publishedDate: "",
      description: "",
      companyWebsite: "",
      applied: "true/false",
      deadline: ""
    }
  })
})

// Route to add profile
router.post('/profile/add', (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;

  User.update({_id: userId}, {$set: { 'profile.user': req.body }},function(err){console.log(err)});
  User.findOne({_id: userId}).then(user => {console.log(user)});
  return res.status(201)
  .json({
    message: "Profile added successfully."});
  
  //User.findOne({_id: userId}).then(user => {console.log(user)});
  //console.log(tokenPayload);
  /* return res.status(201)
  .json({
    message: "Profile added successfully.",
    data: {
      firstName: "",
      lastName: "",
      country: "",
      location: {
        street: "",
        city: "",
        state: "",
        zipCode: ""
      },
      educationLevel: "",
      email: "",
      phone: "",
      currentJobTitle: "",
      workExperience: "",
      skillSets: [
        { name: ""}, { name: ""}
      ],
      linkedinProfile: "",
      resume: ""
    }
  })
  */
  
})

// Route to view profile
router.get('/profile/detail', (req, res, next) => {
  let fetchedProfile;
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({_id: userId}).then(user => {
    console.log("Hello");
    console.log(user);
    return res.status(200).json({
      data : user
     });
  });
  
  
/*
  return res.status(200)
  .json({
    data: {
      firstName: "",
      lastName: "",
      country: "",
      location: {
        street: "",
        city: "",
        state: "",
        zipCode: ""
      },
      educationLevel: "",
      email: "",
      phone: "",
      currentJobTitle: "",
      workExperience: "",
      skillSets: [
        { name: ""}, { name: ""}
      ],
      linkedinProfile: "",
      resume: ""
    }
  })*/
})

// Route to apply to the job
router.post('/job/apply/:jobId', (req, res, next) => {

  return res.status(202)
    .json({
      message: "Successfully Applied to the Job",
      })
})

module.exports = router;
