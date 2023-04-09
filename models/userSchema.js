const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  gsm: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  lga: {
    type: String,
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: false
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('usersSchema', usersSchema)