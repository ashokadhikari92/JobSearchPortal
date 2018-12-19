const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("./../models/user");
const Job = require("./../models/job");
const checkAuth = require("./../middleware/check-authentication");
const checkSeeker = require("./../middleware/check-seeker");

// Route to fetch all the jobs
router.get("/jobs", (req, res, next) => {
  Job.find({})
    .then(jobs => {
      return res.status(200).json({
        data: jobs
      });
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      });
    });
});

router.get("/jobs/filter", (req, res, next) => {
  console.log("I am here;");
  const title = req.query.title;
  const location = req.query.location.split(",");
  let condition = {};
  if (title) {
    condition = { title: { $regex: title, $options: "i" } };

    if (location.length == 1) {
      condition = {
        title: { $regex: title, $options: "i" },
        "location.city": { $regex: location[0], $options: "i" }
      };
    }
    if (location.length == 2) {
      condition = {
        title: { $regex: title, $options: "i" },
        "location.city": { $regex: location[0], $options: "i" },
        "location.state": { $regex: location[1], $options: "i" }
      };
    }
  }

  if (!title) {
    if (location.length == 1) {
      condition = { "location.city": { $regex: location[0], $options: "i" } };
    }
    if (location.length == 2) {
      condition = {
        "location.city": { $regex: location[0], $options: "i" },
        "location.state": { $regex: location[1], $options: "i" }
      };
    }
  }

  console.log(condition);
  Job.find(condition)
    .then(jobs => {
      return res.status(200).json({
        data: jobs
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

router.get("/jobs/applied", checkAuth, checkSeeker,(req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({ _id: userId }).then(user => {
    Job.find({ "candidates.candidateId": user._id }).then(jobs => {
      return res.status(200).json({
        data: jobs
      });
    });
  });
});


// Job detail
router.get("/job/:id", (req, res, next) => {
  let jobId = req.params.id;

  Job.findOne({ _id: jobId }).then(job => {
    return res.status(200).json({
      data: job
    });
  });
});


// Route to add profile
router.post("/profile/add",checkAuth , checkSeeker, (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;

  const profile = req.body;
  const skillSets = profile.skillSet.map(value => {
    return { name: value };
  });

  profile.skillSet = skillSets;
  console.log(profile);

  User.update({ _id: userId }, { $set: { "profile.user": profile } }, function(
    err
  ) {
    console.log(err);
  });
  // //User.findOne({_id: userId}).then(user => {console.log(user)});
  return res.status(201).json({
    message: "Profile added successfully."
  });
});

// Route to view profile
router.get("/profile/detail",checkAuth, checkSeeker,(req, res, next) => {
  let fetchedProfile;
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({ _id: userId }).then(user => {
    console.log("Hello");
    console.log(user);
    return res.status(200).json({
      data: user
    });
  });
});

// Route to apply to the job
router.get("/job/apply/:jobId",checkAuth, checkSeeker, (req, res, next) => {
  let candidate;
  const token = req.headers.authorization.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.userId;
  User.findOne({ _id: userId }).then(user => {
    const skillSets = user.profile.user.skillSet.map(skill => {
      return { name: skill.name };
    });

    candidate = {
      candidateId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.email,
      country: user.profile.user.country,
      location: {
        street: user.profile.user.ocation,
        city: "Fairfield",
        state: "IA",
        zipCode: 52557
      },
      educationLevel: user.profile.user.educationLevel,
      latestJobLevel: user.profile.user.latestJobLevel,
      workExperience: user.profile.user.workExperience,
      linkedinProfile: user.profile.user.linkedinProfile,
      skillSet: skillSets,
      resume: user.profile.user.resume
    };
    console.log(candidate);
    Job.findOne({ _id: req.params.jobId, "candidates.candidateId": user._id }).then(job => {
      if (job) {
        return res.status(403).json({
          message: "You already applied to this job!"
        });
      } else {
        Job.update({ _id: req.params.jobId }, { $push: { candidates: candidate } })
          .then(result => {
            return res.status(201).json({
              message: "Applied succcessfully!"
            });
          })
          .catch(error => {
            return res.status(500).json({
              message: "Error!"
            });
          });
      }
    });
  });
});

module.exports = router;
