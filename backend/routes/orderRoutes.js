import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, getMyOrders, deleteOrderById } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById).delete(protect, deleteOrderById)

export default router