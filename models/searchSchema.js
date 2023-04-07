const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  dateSearch: {
    type: Date,
    required: true,
    default: Date.now
  },
})

module.exports = mongoose.model('searchSchema', searchSchema)