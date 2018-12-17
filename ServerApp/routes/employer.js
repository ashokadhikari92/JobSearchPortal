const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const Job = require("./../models/job");
const checkAuth = require("./../middleware/check-authentication");



// List of job published by the employer
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
          publishedDate: "",
          status: 'true/false',
          deadline: ""
        }
      ]
    })
});


// Job detail
router.get('/job/:id', (req, res, next) => {

  let jobId = req.params.id;

  Job.findOne({_id: jobId}).then(job => {
    console.log("job " + jobId);
    console.log(job);
    return res.status(200).json({
      data : job
     });
  });

})


// Add company profile
router.post('/profile/add', (req, res, nex) => {


  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  let fetchedUser;

  const companyProfile = {
    name: req.body.companyName,
    website: req.body.website,
    contactEmail: req.body.email,
    contactPhone: req.body.contactNo,
    introduction: req.body.introduction,
    address: {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zip
    }
  };

  console.log(companyProfile.name);

  User.update({ _id: userId }, { $set: { 'profile.company': companyProfile } }, function (err, doc) {
    //console.log(doc);
    return res.status(201)
      .json({
        message: "Profile added successfully.",
        data: doc
       /* data: {
          companyName: req.body.companyName,
          website: req.body.website,
          contactEmail: req.body.email,
          phone: req.body.contactNo,
          introduction: req.body.introduction,
          typeOfBusiness: req.body.typeOfBusiness,
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode
        }
        */
      })
  })
})


// View Company profile
router.get('/profile/detail', (req, res, next) => {

  return res.status(200)
    .json({
      data: {
        companyName: "",
        website: "",
        contactEmail: "",
        phone: "",
        introduction: "",
        typeOfBusiness: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: ""
        }
      }
    })
})


// Add new Job
router.post('/job/add', (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({ _id: userId })
    .then(user => {
      console.log("User ", user);
      const newJob = {
        title: req.body.jobTitle,
        description: req.body.jobDescription,
        company: user.profile.company.name,
        numberOfPosition: req.body.noOfPosition,
        deadline: req.body.deadline,
        location: {
          city: user.profile.company.address.city,
          state: user.profile.company.address.state,
        },
        salaryRange: {
          min: req.body.minSalary,
          max: req.body.maxSalary
        },
        publishedDate: Date.now(),
        employeeType: req.body.employeeType
      };

      const job = new Job(newJob);

      job.save()
        .then((result) => {
          return res.status(201)
            .json({
              message: "Successfully added job.",
              data: result
            })
        })
        .catch((error) => {
          return res.status(500)
            .json({
              error: error
            })
        });

    })




})


// View Candidate detail
router.get('/candidate/detail/:id', (req, res, next) => {

  const userId = req.params.id;
  User.findOne({_id: userId}).then(user => {   
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
          { name: "" }, { name: "" }
        ],
        linkedinProfile: "",
        resume: ""
      }
    })
    */
})



module.exports = router;
