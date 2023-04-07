const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
})

module.exports = mongoose.model('skillsSchema', skillsSchema)