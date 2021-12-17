import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { authUser, addUser, getUsers } from '../controllers/userController.js'


router.route('/login').post(authUser)
router.route('/').post(protect, addUser).get(protect, getUsers)


export default router