import express from 'express'
import { createEvent } from '../controllers/adminController.js'
import adminAuth from '../middleware/adminAuth.js'

const router = express.Router()

router.post('/admin/create-event', adminAuth, createEvent)

export default router
