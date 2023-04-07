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
  password: {
    type: String,
    required: true
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
  logo: {
    type: String,
    required: true
  },
  emailStatus: {
    type: String,
    required: true
  },
  gsmStatus: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('usersSchema', usersSchema)