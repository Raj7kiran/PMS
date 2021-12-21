import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { authUser, addUser, getUsers, getUserById, getUserProfile, deleteUser, updateUser, updateUserProfile } from '../controllers/userController.js'


router.route('/login').post(authUser)
router.route('/').post(protect, addUser).get(protect, getUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').get(protect, getUserById).delete(protect, deleteUser).put(protect, updateUser)


export default router