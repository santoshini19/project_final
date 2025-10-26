const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  startDate: String,
  endDate: String,
  description: String
}, { _id: false });

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  location: String,
  summary: String,
  education: [{ degree: String, institute: String, year: String }],
  skills: [String],
  experience: [ExperienceSchema],
  projects: [{ name: String, description: String, link: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);