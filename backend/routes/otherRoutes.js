import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getManufacturer, addManufacturer, deleteManufacturer, updateManufacturer, getManufacturerById,
		 getSupplier, addSupplier, deleteSupplier, updateSupplier, getSupplierById
		} from '../controllers/otherControllers.js'

router.route('/manufacturer').get(protect, getManufacturer).post(protect, addManufacturer)
router.route('/supplier').get(protect, getSupplier).post(protect, addSupplier)
router.route('/manufacturer/:id').get(protect, getManufacturerById).delete(protect, deleteManufacturer).put(protect, updateManufacturer)
router.route('/supplier/:id').get(protect, getSupplierById).delete(protect, deleteSupplier).put(protect, updateSupplier)

export default router