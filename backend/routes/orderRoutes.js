import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, getMyOrders, deleteOrderById, getOrders, approveOrder, 
    financeApproveOrder, finalApproveOrder, rejectOrder, getFinalOrders, getOrderByVendor
 } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, getOrders)
router.route('/approved/final').get(protect, getFinalOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/vendor/:id').get(protect, getOrderByVendor)
router.route('/:id').get(protect, getOrderById).delete(protect, deleteOrderById)
router.route('/:id/approve').put(protect, approveOrder)
router.route('/:id/financeapprove').put(protect, financeApproveOrder)
router.route('/:id/finalapprove').put(protect, finalApproveOrder)
router.route('/:id/reject').put(protect, rejectOrder)

export default router