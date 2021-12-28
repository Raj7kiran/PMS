import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getManufacturer, addManufacturer, deleteManufacturer, updateManufacturer,
		 getSupplier, addSupplier, deleteSupplier, updateSupplier
		} from '../controller/cotherControllers.js'


router.route('/manufacturer').get(protect, getManufacturer).post(protect, addManufacturer)
router.route('/manufacturer/:id').delete(protect, deleteManufacturer).put(protect, updateManufacturer)
router.route('/supplier').get(protect, getSupplier).post(protect, addSupplier)
router.route('/supplier/:id').delete(protect, deleteSupplier).put(protect, updateSupplier)



export default router