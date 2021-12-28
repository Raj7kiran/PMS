import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { getPackage, addPackage, addClient, getClient, deletePackage,updatePackage,deleteClient } from '../controllers/adminController.js'


router.route('/packages').get(protect, admin,getPackage).post(protect, admin, addPackage)
router.route('/packages/:id').delete(protect, admin, deletePackage).put(protect, admin, updatePackage)
// router.route('/company').post(protect, admin, addCompany)
router.route('/client').post(protect,addClient).get(protect,admin,getClient)
router.route('/client/:id').delete(protect,admin,deleteClient)


export default router
