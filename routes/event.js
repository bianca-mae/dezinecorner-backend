const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Event = require('./../models/Event')
const path = require('path')

// GET - get all events ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Event.find().populate('user', '_id firstName lastName')
    .then(event => {
      if(event == null){
        return res.status(404).json({
          message: "No events found"
        })
      }
      res.json(event)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting events"
      })
    })  
})

// POST - create new event --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "event content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new haircut
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new haircut
    let newEvent = new Event({
      eventName: req.body.eventName,
      eventType: req.body.eventType,
      price: req.body.price,
      host: req.body.host,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      image: uniqueFilename,
      user: req.body.user,
    })
  
    newEvent.save()
    .then(haircut => {        
      // success!  
      // return 201 status with haircut object
      return res.status(201).json(haircut)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating event",
        error: err
      })
    })
  })
})

// export
module.exports = router
