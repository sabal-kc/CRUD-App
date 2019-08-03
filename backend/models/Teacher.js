const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
