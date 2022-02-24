import express from 'express'
const router = express.Router()
import { createInbound, getInbound } from '../controllers/inboundController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(protect, createInbound).get(protect, getInbound)


export default router