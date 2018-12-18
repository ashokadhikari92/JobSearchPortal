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

router.get('/jobs/applied', (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({_id: userId}).then(user => {
      Job.find({"candidates.candidateId": user._id}).then(jobs => {
        return res.status(200).json({
          data : jobs
         });
      });
    });
  
});


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

})

// Route to apply to the job
router.get('/job/apply/:jobId', (req, res, next) => {
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
    Job.findOne({"candidates.candidateId": user._id}).then(job => {
      if(job){
        return res.status(403).json({
          message : "You already applied to this job!"
         });
      }else{
        Job.update({_id: jobId}, {$push: { 'candidates': candidate }}).then(
          (result) =>{
            return res.status(201)
            .json({
              message: "Applied succcessfully!"
            
            })
          }
        ).catch(
          (error) =>{
            return res.status(500)
  .json({
    message: "Error!"
  
  })
          }
        );

      }
    });
    
  });
  
  
  
  
});

module.exports = router;
