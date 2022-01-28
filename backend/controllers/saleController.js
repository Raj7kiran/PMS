import asyncHandler from 'express-async-handler'
import Sale from '../models/saleModel.js'


export const addSale = asyncHandler(async(req, res) => {
	console.log('backend')
	

	const { title, name, age, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
		itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSaved, isSubmitted } = req. body

		if(saleItems && saleItems.length === 0){
			res.status(400)
			throw new Error('No medicines found')
		} 

		if(isSaved){
			console.log('save')
			const sale = new Sale({
				title, name, age, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
				itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSaved, isSubmitted, savedAt: Date.now()
			})

			const createdSale = await sale.save()
			res.status(201).json(createdSale)

		} else {
			console.log('not save')
			const sale = new Sale({
				title, name, age, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
				itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSaved, isSubmitted, submittedAt: Date.now()
			})

			const createdSale = await sale.save()
			res.status(201).json(createdSale)
		}

})


export const getSales = asyncHandler(async(req,res) => {
	const sales = await Sale.find({})
	res.json(sales)
})

export const getSaleById = asyncHandler(async(req,res) => {
	const sale = await Sale.findById(req.params.id).populate('saleItems.productId','type dose route timing preference mrp tax').populate('doctorID','firstName')

	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})

export const getMySales = asyncHandler(async(req,res) => {
	const sales = await Sale.find({ user: req.user._id })
	res.json(sales)
	
})

export const deleteSaleById = asyncHandler(async(req, res) => {
	const sale = await Sale.findById(req.params.id)

	if(sale){
		await sale.remove()
		res.json({ message: 'Sale Deleted' })
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})


export const updateToSubmit = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
		// if(req.user._id === sale.doctorID){
			sale.isSubmitted = true
			sale.submittedAt = Date.now()
			sale.remarks= remarks

			
			const updatedSale = await sale.save()
			res.json(updatedSale)
		// } else {
		// 	res.status(400)
		// 	throw new Error("You cannot submit it!") 
		// }
		

	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}

})
