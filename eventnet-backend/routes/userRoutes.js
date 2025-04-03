import express from 'express'
import { getDashboardData, getUserProfile, updateProfile } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.put('/profile', authMiddleware, updateProfile)
router.get('/dashboard', authMiddleware, getDashboardData)
// userRoutes.js
router.get('/me', authMiddleware, getUserProfile)


export default router
