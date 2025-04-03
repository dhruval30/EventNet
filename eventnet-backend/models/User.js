import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String },
  domain: { type: String },
  bio: { type: String },
  linkedInUrl: { type: String },
  profileComplete: { type: Boolean, default: false },
  eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]

})


export default mongoose.model('User', userSchema)
