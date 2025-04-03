import express from 'express'
import { getEventAttendees, getEventDetails, joinEvent } from '../controllers/eventController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/join', authMiddleware, joinEvent)
router.get('/:id/attendees', authMiddleware, getEventAttendees)
router.get('/:id', authMiddleware, getEventDetails)

export default router
