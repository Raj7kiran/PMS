import asyncHandler from 'express-async-handler'
import Sale from '../models/saleModel.js'


export const addSale = asyncHandler(async(req, res) => {
	console.log('backend')
	

	const { title, name, age, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
		itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, remarks, isSaved, isSubmitted } = req.body

		if(saleItems && saleItems.length === 0){
			res.status(400)
			throw new Error('No medicines found')
		} 

		if(isSaved){
			console.log('save')
			const sale = new Sale({
				title, name, age, createdUserId: req.user._id, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
				itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, isSaved, isSubmitted, savedAt: Date.now()
			})

			const submitDetails = {
				name: req.user.firstName,
				id: req.user._id,
				submittedAt: Date.now(),
				saleId: req.params.id,
				remarks
			}

			sale.submitDetails.push(submitDetails)

			const createdSale = await sale.save()
			res.status(201).json(createdSale)

		} else {
			console.log('not save')
			const sale = new Sale({
				title, name, age, createdUserId: req.user._id, gender, phoneNumber, doctorID, purpose, saleItems, totalQty, 
				itemTotalPrice, itemTotalPriceWithoutTax, totalGST, discountPrice, saleTotal, isSaved, isSubmitted, submittedAt: Date.now()
			})

			const submitDetails = {
				name: req.user.firstName,
				id: req.user._id,
				submittedAt: Date.now(),
				saleId: req.params.id,
				remarks
			}

			sale.submitDetails.push(submitDetails)

			const createdSale = await sale.save()
			res.status(201).json(createdSale)
		}

})


export const getSales = asyncHandler(async(req,res) => {
	const sales = await Sale.find({}).populate('doctorID', 'firstName').sort({createdAt: -1})
	res.json(sales)
})

export const getSaleById = asyncHandler(async(req,res) => {
	const sale = await Sale.findById(req.params.id).populate('saleItems.productId','type dose route timing preference mrp tax binLocation purchasePrice').populate('doctorID','firstName')

	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})

export const getMySales = asyncHandler(async(req,res) => {
	const sales = await Sale.find({ createdUserId: req.user._id }).sort({createdAt: -1})
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

			const submitDetails = {
				name: req.user.firstName,
				id: req.user._id,
				submittedAt: Date.now(),
				saleId: req.params.id,
				remarks
			}

			sale.submitDetails.push(submitDetails)
			sale.isSubmitted = true
			sale.isSentBack = false

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

export const getSubmittedSales = asyncHandler(async(req,res) => {
	const sale = await Sale.find({isSubmitted: true}).populate('doctorID','firstName').sort({createdAt: -1})

	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})


export const updateToPaid = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
			
			sale.isPaid = true
			sale.paidAt = Date.now()
			
			const updatedSale = await sale.save()
			res.json(updatedSale)
			
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}

})

export const updateToReject = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
			const billerDetails = {
				name: req.user.firstName,
				id: req.user._id,
				billedAt: Date.now(),
				saleId: req.params.id,
				remarks
			}

			sale.billerDetails.push(billerDetails)
			
			sale.isRejected = true
			sale.rejectedAt = Date.now()
			
			const updatedSale = await sale.save()
			res.json(updatedSale)
			
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}

})


export const updateToBilled = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
			const billerDetails = {
				name: req.user.firstName,
				id: req.user._id,
				billedAt: Date.now(),
				saleId: req.params.id,
				remarks
			}

			sale.billerDetails.push(billerDetails)		
			sale.isBilled = true
			sale.isSentBack = false
			
			const updatedSale = await sale.save()
			res.json(updatedSale)
			
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}

})

export const getBilledSales = asyncHandler(async(req,res) => {
	const sale = await Sale.find({isBilled: true}).populate('doctorID','firstName').sort({createdAt: -1})

	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}

})

export const updateToCollect = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){

			const collectorDetails = {
				name: req.user.firstName,
				id: req.user._id,
				collectedAt: Date.now(),
				saleId: req.params.id
			}

			sale.collectorDetails.push(collectorDetails)		
			sale.isCollected = true
			sale.isSentBack = false
			
			const updatedSale = await sale.save()
			res.json(updatedSale)
			
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}
})

export const getCollectedSales = asyncHandler(async(req,res) => {
	const sale = await Sale.find({isCollected: true}).populate('doctorID','firstName').sort({createdAt: -1})


	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})

export const updateToDelivered = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
			const deliverDetails = {
				name: req.user.firstName,
				id: req.user._id,
				deliveredAt: Date.now(),
				saleId: req.params.id
			}

			sale.deliverDetails.push(deliverDetails)
			sale.isDelivered = true
			sale.isSentBack = false
			
			const updatedSale = await sale.save()
			res.json(updatedSale)
			
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}
})

export const getDeliveredSales = asyncHandler(async(req,res) => {
	const sale = await Sale.find({isDelivered: true}).populate('doctorID','firstName').sort({createdAt: -1})


	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}
})

export const updateToSendback = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const sale = await Sale.findById(req.params.id)

	if(sale){
			if(sale.isCollected === true){
				const deliverDetails = {
					name: req.user.firstName,
					id: req.user._id,
					deliveredAt: Date.now(),
					saleId: req.params.id
				}

				sale.deliverDetails.push(deliverDetails)
				sale.isSentBack = true
				sale.sentBackAt = Date.now()
				sale.isCollected = false
				const updatedSale = await sale.save()
				res.json(updatedSale)

			} else if (sale.isBilled === true && sale.isCollected === false){
				const collectorDetails = {
					name: req.user.firstName,
					id: req.user._id,
					collectedAt: Date.now(),
					saleId: req.params.id
				}
				sale.collectorDetails.push(collectorDetails)
				sale.isSentBack = true
				sale.sentBackAt = Date.now()
				sale.isBilled = false
				const updatedSale = await sale.save()
				res.json(updatedSale)

			} else if (sale.isSubmitted === true && sale.isBilled === false) {
				
				const billerDetails = {
					name: req.user.firstName,
					id: req.user._id,
					billedAt: Date.now(),
					saleId: req.params.id,
					remarks
				}
				sale.billerDetails.push(billerDetails)
				sale.isSentBack = true
				sale.sentBackAt = Date.now()
				sale.isSubmitted = false
				const updatedSale = await sale.save()
				res.json(updatedSale)
			}
		
						
	} else{
		res.status(404)
		throw new Error("Sale not Found") 
	}

})


export const getPaidSales = asyncHandler(async(req,res) => {
	const sale = await Sale.find({isPaid: true}).populate('doctorID','firstName').sort({createdAt: -1})


	if(sale){
		res.json(sale)
	} else {
		res.status(404)
		throw new Error('Sale not found')
	}

})
