const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const Job = require("./../models/job");
const checkAuth = require("./../middleware/check-authentication");


// Route to fetch all the jobs
router.get('/jobs', (req, res, next) => {

  Job.find({}).then(jobs => {
    //console.log("job " + jobId);
    //console.log(job);
    return res.status(200).json({
      data : jobs
     });
  });
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

  const profile = req.body;
  const skillSets = profile.skillSet.map((value) => {
    return {name: value};
  });

  profile.skillSet = skillSets;
  console.log(profile);

  User.update({_id: userId}, {$set: { 'profile.user': profile }},function(err){console.log(err)});
  // //User.findOne({_id: userId}).then(user => {console.log(user)});
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
    console.log(user)
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
router.get('/job/apply/:jobId', (req, res, next) => {
  console.log("reached");
  let candidate;
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({_id: userId}).then(user => {
    const skillSets = user.profile.user.skillSet.map((skill) => {
      return { name: skill.name}
    });

     candidate = {
      candidateId: user._id,
      firstName : user.firstName,
      lastName : user.lastName,
      phone : user.email,
      country : user.country,
      location: { 
        street: user.location,
        city: "default",
        state: "default",
        zipCode: 23214
     },
    educationLevel: user.educationLevel,
    latestJobLevel: user.latestJobLevel,
    workExperience: user.workExperience,
    linkedinProfile: user.linkedinProfile,
    skillSet: skillSets
    };
    // Job.findOne({candidates: { "$in" : [user.]} }).then(job => {
    //   console.log("Hello");
    //   console.log(user)
    //   return res.status(200).json({
    //     data : user
    //    });
    // });
    Job.update({_id: jobId}, {$push: { 'candidates': candidate }},function(err){console.log(err)});
    
  });
  
  let jobId = req.params.jobId;
  //console.log(candidate);
  return res.status(201)
  .json({
    message: "Applied succcessfully!"
  
  })
  
});

module.exports = router;
