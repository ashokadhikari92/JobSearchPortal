const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const seekerProfile = {
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
  resume: { type: String },
  skillSet: [{
    name: {type: String}
  }]
}

const companyProfile = {
  name: {type: String},
  website: {type: String},
  contactEmail: {type: String},
  contactPhone: {type: String},
  introduction: {type: String},
  address: {
    street: { type: String},
    city: { type: String},
    state: { type: String},
    zipCode: { type: Number}
  }
}


const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, requied: true},
  profile:{
    user: seekerProfile,
    company: companyProfile
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
