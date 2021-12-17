import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { getPackage, addPackage, addClient, getClient } from '../controllers/adminController.js'


router.route('/packages').get(getPackage).post(protect, admin, addPackage)
// router.route('/company').post(protect, admin, addCompany)
router.route('/client').post(protect,addClient).get(protect,admin,getClient)


export default router
