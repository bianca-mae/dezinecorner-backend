const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('./../utils')

// schema
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true    
  },
  image: {
    type: String,
    required: true    
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true })


// model
const eventModel = mongoose.model('Event', eventSchema)

// export
module.exports = eventModel
