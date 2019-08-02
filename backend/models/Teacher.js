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
    type: Number,
    required: true,
    unique: true
  },
  birthday: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Male",
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
