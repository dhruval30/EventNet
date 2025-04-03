// models/Event.js
import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  code: String, // <- NEW
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})


export default mongoose.model('Event', eventSchema)
