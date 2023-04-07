const express = require('express')
const router = express.Router()
const adminSchema = require('../models/adminSchema')
const skillsSchema = require('../models/skillsSchema')
var crypto = require('crypto')
const userSchema = require('../models/userSchema')
const searchSchema = require('../models/searchSchema')

// Create admin
router.post('/create', async (req, res) => {
  var passwordhash = crypto.createHash('md5').update(req.body.password).digest('hex');
  var usernamehash = crypto.createHash('md5').update(req.body.username).digest('hex');
  const admin = new adminSchema({
    username: usernamehash,
    password: passwordhash,
  })
  try {
    const newAdmin = await admin.save()
    res.status(201).json(newAdmin)
  } catch (err) {
    res.status(400).json({ message:err.message })
  }
})

//Admin Login
router.post('/login', async (req, res) => {
    var password = crypto.createHash('md5').update(req.body.password).digest('hex');
    var email = req.body.email
    try {
      const loginAuth = await adminSchema.find({email,password}).lean()
        if(loginAuth.length>0){
          res.status(200).json({message:"Login successful"})
        }else{
            res.status(404).json({message:"Wrong login credentials"})
        }
    } catch (err) {
      res.status(400).json({ message:err.message })
    }
})

// Create skills
router.post('/create-skills', async (req, res) => {
  const skills = new skillsSchema({
    name: req.body.name,
  })
  try {
    const newSKills = await skills.save()
      res.status(201).json(newSKills)
    } catch (err) {
      res.status(400).json({ message:err.message })
    }
})

// Display all skills
router.get('/getskills', async (req, res) => {
    try {
      const skills = await skillsSchema.find()
      res.status(200).json(skills)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Updating skills
router.patch('/updateskill/:id', getID, async (req, res) => {
  if (req.body.name != null) {
    res.id.name = req.body.name
  }
  try {
    const updatedSkill = await res.id.save()
    res.status(200).json(updatedSkill)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting Skills
router.delete('/deleteskill/:id', getID, async (req, res) => {
  try {
    await res.id.remove()
    res.status(200).json({ message: 'Skill deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Search skills
router.post('/search', async (req, res) => {
    var skill = req.body.skill
    var state = req.body.state
    try {
      const users = await userSchema.find({skill, state})
      const search = new searchSchema({
        skill: skill,
        state: state,
      })
      await search.save()
      if(users.length>0){
        res.status(200).json(users)
      }else{
        res.status(404).json({ message: "No artisan found, try other states" })
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

// Display all search
router.get('/getsearch', async (req, res) => {
  try {
    const search = await searchSchema.find()
    res.status(200).json(search)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getID(req, res, next) {
  let id
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      id = await skillsSchema.findById(req.params.id)
        if (id == null) {
          return res.status(404).json({ message: 'Cannot find record' })
        }
    }else{
      return res.status(404).json({ message: 'Invalid User ID' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  
  res.id = id
  next()
}

module.exports = router