import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getSales, addSale, getSaleById, getMySales, deleteSaleById, updateToSubmit,
		 updateToPaid, updateToBilled, updateToCollect, updateToDelivered, updateToSendback,
		 getSubmittedSales, getBilledSales, getCollectedSales, getDeliveredSales, updateToReject, getPaidSales
  } from '../controllers/saleController.js'


router.route('/').get(protect, getSales).post(protect, addSale)
router.route('/mysales').get(protect, getMySales)
router.route('/submitted').get(protect, getSubmittedSales)
router.route('/billed').get(protect, getBilledSales)
router.route('/collected').get(protect, getCollectedSales)
router.route('/delivered').get(protect, getDeliveredSales)
router.route('/paid').put(protect, getPaidSales)
router.route('/:id').get(protect, getSaleById).delete(protect, deleteSaleById)
router.route('/:id/submit').put(protect, updateToSubmit)
router.route('/:id/pay').put(protect, updateToPaid)
router.route('/:id/bill').put(protect, updateToBilled)
router.route('/:id/reject').put(protect, updateToReject)
router.route('/:id/collect').put(protect, updateToCollect)
router.route('/:id/delivered').put(protect, updateToDelivered)
router.route('/:id/sendback').put(protect, updateToSendback)



export default router