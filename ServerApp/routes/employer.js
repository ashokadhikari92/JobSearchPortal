const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
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

  return res.status(200)
    .json({
      title: "",
      numberOfPotition: "",
      salaryRange: {
        min: "",
        max: ""
      },
      publishedDate: "",
      description: "",
      deadline: "",
      status: "",
      candidates: [{

      }]
    })
})


// Add company profile
router.post('/profile/add', (req, res, nex) => {

  return res.status(201)
    .json({
      message: "Profile added successfully.",
      data: {
        companyName: "",
        website: "",
        contactEmail: "",
        phone: "",
        introduction: "",
        typeOfBusiness: "",
        street: "",
        city: "",
        state: "",
        zipCode: ""
      }
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

  return res.status(201)
    .json({
      message: "Successfully added job.",
      data: {
        title: "",
        numberOfPotition: "",
        salaryRange: {
          min: "",
          max: ""
        },
        description: "",
        deadline: "",
        employeeType: ""
      }
    })
})


// View Candidate detail
router.get('/candidate/detail/:id', (req, res, next) => {

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
    })
})



module.exports = router;
