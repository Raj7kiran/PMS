import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getSales, addSale, getSaleById, getMySales, deleteSaleById, updateToSubmit  } from '../controllers/saleController.js'


router.route('/').get(protect, getSales).post(protect, addSale)
router.route('/mysales').get(protect, getMySales)
router.route('/:id').get(protect, getSaleById).delete(protect, deleteSaleById)
router.route('/:id/submit').put(protect, updateToSubmit)

export default router