const express = require('express')
const router = express.Router()
const usersSchema = require('../models/userSchema')
var crypto = require('crypto')

// Getting users
router.get('/getusers', async (req, res) => {
  try {
    const users = await usersSchema.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One User
router.get('/single/:id', getUser, (req, res) => {
  res.status(200).json(res.user)
})

// Creating account
router.post('/register', async (req, res) => {
  var email = req.body.email
  var gsm = req.body.gsm
  const user = new usersSchema({
    name: req.body.name,
    email: req.body.email,
    link: link,
    address: req.body.address,
    gsm: req.body.gsm,
    state: req.body.state,
    lga: req.body.lga,
    skill: req.body.skill,
    businessName: req.body.businessName,
    status: 'FALSE',
    images: 'FALSE',
    emailStatus: 'FALSE',
    gsmStatus: 'FALSE',
  })
  try {
    const emailAuth = await usersSchema.findOne({email}).lean()
    const gsmAuth = await usersSchema.findOne({gsm}).lean()
    if(emailAuth){
        res.status(409).json({message: "Email already exists"})
    }else if(gsmAuth){
        res.status(409).json({message: "Phone number already exists"})
    }else{
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
  } catch (err) {
    res.status(400).json({ message:err.message })
  }
})

// // Login into account
// router.post('/login', async (req, res) => {
//   var password = crypto.createHash('md5').update(req.body.password).digest('hex');
//   var email = req.body.email
//   try {
//     const loginAuth = await usersSchema.find({email, password}).lean()
//       if(loginAuth.length>0){
//         usersSchema.findOne({ email, password }).lean()
//         .then((result) =>{ 
//             if(result.emailStatus=="FALSE"){
//               res.status(409).json({message:"Please verify your email address"})
//             }else{
//               res.status(200).json(result)
//             } 
//         })
//         .catch((err) => {
//           console.log(err)
//         }) 
//       }else{
//         res.status(404).json({message:"Wrong login credentials"})
//       }
//     } catch (err) {
//       res.status(400).json({ message:err.message })
//     }
// })

// Updating user
router.patch('/update/:id', getUser, async (req, res) => {
  if (req.body.address != null) {
    res.user.address = req.body.address
  }
  if (req.body.gsm != null) {
    res.user.gsm = req.body.gsm
  }
  if (req.body.state != null) {
    res.user.state = req.body.state
  }
  if (req.body.lga != null) {
    res.user.lga = req.body.lga
  }
  if (req.body.link != null) {
    res.user.link = req.body.link
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating payment
router.patch('/status/:id', getUser, async (req, res) => {
    res.user.status = 'PAID'
    try {
      const updatedUser = await res.user.save()
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

// Deleting user
router.delete('/delete/:id', getUser, async (req, res) => {
  try {
    await usersSchema.findByIdAndDelete(res.user)
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await usersSchema.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    }else{
      return res.status(404).json({ message: 'Invalid User ID' })
    }
    
    
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}

module.exports = router