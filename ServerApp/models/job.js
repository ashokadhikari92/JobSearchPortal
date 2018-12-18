const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const seekerProfile = {
  candidateId: { type: mongoose.Schema.Types.ObjectId},
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  country: { type: String },
  location: { 
      street: { type: String},
      city: { type: String},
      state: { type: String},
      zipCode: { type: Number}
   },
  educationLevel: { type: String },
  latestJobLevel: { type: String },
  workExperience: { type: Number },
  linkedinProfile: { type: String },
  skillSet: [{
    name: {type: String}
  }]
}

const jobSchema = mongoose.Schema({
  title: {type: String},
  description: {type: String},
  company: {type: String},
  numberOfPosition: {type: String},
  deadline: {type: String},
  location: {
    city: { type: String},
    state: { type: String},
  },
  salaryRange:{
    min: { type: String },
    max: { type: String }
  },
  employeeType: { type:String },
  candidates: [
    seekerProfile
  ],
  status: { type: Boolean},
  publishedDate: { type: Date},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref:'User'}
});


module.exports = mongoose.model("Job", jobSchema);
