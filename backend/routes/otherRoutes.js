import express from 'express'
const router = express.Router()
import Joi from 'joi'
import { protect } from '../middleware/authMiddleware.js'
import { getManufacturer, addManufacturer, deleteManufacturer, updateManufacturer, getManufacturerById,
		 getSupplier, addSupplier, deleteSupplier, updateSupplier, getSupplierById,
		 getProduct, addProduct, getProductById, deleteProduct, updateProduct
		} from '../controllers/otherControllers.js'


const validateManufacturer = (req, res, next) => {
	const packageValSchema = Joi.object({
		name: Joi.string().required(),
		shortName: Joi.string().required(),
		country: Joi.string().required()
	})

	const { error } = packageValSchema.validate(req.body)

	if(error){
		console.log(error)
		const msg = error.details.map(el=> el.message).join(',')
		res.status(400)
		throw new Error(msg)
	} else {
		next()
	}
}
	



router.route('/manufacturer').get(protect, getManufacturer).post(protect, validateManufacturer, addManufacturer)
router.route('/supplier').get(protect, getSupplier).post(protect, addSupplier)
router.route('/manufacturer/:id').get(protect, getManufacturerById).delete(protect, deleteManufacturer).put(protect, updateManufacturer)
router.route('/supplier/:id').get(protect, getSupplierById).delete(protect, deleteSupplier).put(protect, updateSupplier)

router.route('/product').get(protect, getProduct).post(protect, addProduct)
router.route('/product/:id').get(protect, getProductById).delete(protect, deleteProduct).put(protect, updateProduct)

export default router