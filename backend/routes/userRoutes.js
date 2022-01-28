import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { authUser, addUser, getUsers, getUserById, getUserProfile, deleteUser,
		 updateUser, updateUserProfile, getDoctor
 } from '../controllers/userController.js'


router.route('/login').post(authUser)
router.route('/').post(protect, addUser).get(protect, getUsers)
// router.route('/manufacturer').get(protect, getManufacturer).post(protect, addManufacturer)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/doctor').get(protect, getDoctor)
// router.route('/supplier').get(protect, getSupplier).post(protect, addSupplier)


// router.route('/manufacturer/:id').get(protect, getManufacturerById).delete(protect, deleteManufacturer).put(protect, updateManufacturer)
// router.route('/supplier/:id').get(protect, getSupplierById).delete(protect, deleteSupplier).put(protect, updateSupplier)
router.route('/:id').get(protect, getUserById).delete(protect, deleteUser).put(protect, updateUser)



export default router