import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js'; // include `.js` in path
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


app.use('/api', adminRoutes)
app.use('/api/events', eventRoutes)


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(' Connected to MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(` Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.error(' Mongo Error:', err))
