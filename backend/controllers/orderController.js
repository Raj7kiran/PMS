import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


export const addOrderItems = asyncHandler(async(req, res) => {
	const orderItems = req.body
	console.log('backend')
	console.log(orderItems)

	const orderTotalPrice = (orderItems.reduce((acc, item) => acc + item.totalPrice, 0 )).toFixed(2)
	console.log(orderTotalPrice)

	if(orderItems && orderItems.length === 0){
		res.status(400)
		throw new Error('No order Items')
		
	} else {
		const order = new Order({
			orderItems, user: req.user._id, requestedBy: req.user.firstName, createdAt: Date.now(), orderTotalPrice
		})

		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})

export const getOrders = asyncHandler(async(req,res) => {
	const orders = await Order.find({}).populate('user', 'firstName').sort({createdAt: -1})
	res.json(orders)
	
})

export const getOrderById = asyncHandler(async(req,res) => {
	const order = await Order.findById(req.params.id).populate('user', 'firstName email phone').populate('orderItems.product','manufacturer tax mrp purchasePrice freeQty discountPrice discount stockDiscount currentStock lowStockValue reOrderValue ')

	if(order){
		res.json(order)
	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})

export const getMyOrders = asyncHandler(async(req,res) => {
	const orders = await Order.find({ user: req.user._id }).populate('user', 'firstName email phone').sort({createdAt: -1})
	res.json(orders)
	
})

export const deleteOrderById = asyncHandler(async(req, res) => {
	const order = await Order.findById(req.params.id)

	if(order){
		await order.remove()
		res.json({ message: 'Order Deleted' })
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})


export const approveOrder = asyncHandler(async(req,res) => {
	const order = await Order.findById(req.params.id)

	if(order){
		if(order.isApproved === true || order.isApproved === false || order.isFinanceApproved === false || order.isFinalApproved === false){
			res.status(400)
			throw new Error('Order is already approved/rejected')
		}

		order.isApproved = true
		
		const approvalDetails = {
			approverName: req.user.firstName,
			approverId: req.user._id,
			approvedAt: Date.now(),
			orderId: req.params.id
		}

		order.approvalDetails.push(approvalDetails)
		
		const updatedOrder = await order.save()
		res.json(updatedOrder)

	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})

export const financeApproveOrder = asyncHandler(async(req,res) => {
	const { remarks } = req.body

	const order = await Order.findById(req.params.id)

	if(order){
		if(order.isFinanceApproved === true || order.isApproved === false || order.isFinanceApproved === false || order.isFinalApproved === false){
			res.status(400)
			throw new Error('Order is already approved/rejected')
		}

		const approvalDetails = {
			approverName: req.user.firstName,
			approverId: req.user._id,
			approvedAt: Date.now(),
			orderId: req.params.id,
			remarks
		}

		order.financeApprovalDetails.push(approvalDetails)
		order.isFinanceApproved = true		
		
		const updatedOrder = await order.save()
		res.json(updatedOrder)

	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})

export const finalApproveOrder = asyncHandler(async(req,res) => {
	const { orderItems, remarks } = req.body

	console.log(orderItems)

	const order = await Order.findById(req.params.id)

	if(order){
		if(order.isFinalApproved === true || order.isApproved === false || order.isFinanceApproved === false || order.isFinalApproved === false){
			res.status(400)
			throw new Error('Order is already approved/rejected')
		}

		const approvalDetails = {
			approverName: req.user.firstName,
			approverId: req.user._id,
			approvedAt: Date.now(),					
			orderId: req.params.id,
			remarks
		}

		order.finalApprovalDetails.push(approvalDetails)
		order.orderItems = orderItems
		order.isFinalApproved = true
		
		const updatedOrder = await order.save()
		res.json(updatedOrder)

	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})

export const getFinalOrders = asyncHandler(async(req, res) => {
	const orders = await Order.find({isFinalApproved: true}).sort({createdAt: -1})
	res.json(orders) 
})

export const rejectOrder = asyncHandler(async(req,res) => {
	const { remarks } = req.body
	const order = await Order.findById(req.params.id)

	if(order){
		if(order.isApproved === false || order.isFinanceApproved === false || order.isFinalApproved === false){
			res.status(400)
			throw new Error('Order is already rejected')
		}

		

		if(order.isFinanceApproved === true && order.isApproved === true){
			if(order.isFinalApproved === true){
				res.status(400)
				throw new Error('Order is already approved')
			}
			const approvalDetails = {
				approverName: req.user.firstName,
				approverId: req.user._id,
				approvedAt: Date.now(),
				orderId: req.params.id,
				remarks
			}
			order.finalApprovalDetails.push(approvalDetails)

			order.isFinalApproved = false
			order.finalApprovedAt = Date.now()

		} else if(order.isApproved === true) {
			if(order.isFinanceApproved === true || order.isFinalApproved === true){
				res.status(400)
				throw new Error('Order is already approved')
			}
			const approvalDetails = {
				approverName: req.user.firstName,
				approverId: req.user._id,
				approvedAt: Date.now(),
				orderId: req.params.id,
				remarks
			}
			order.financeApprovalDetails.push(approvalDetails)

			order.isFinanceApproved = false
			order.financeApprovedAt = Date.now()
			order.isFinalApproved = false
			order.finalApprovedAt = Date.now()

		} else {
			if(order.isApproved === true || order.isFinanceApproved === true || order.isFinalApproved === true){
				res.status(400)
				throw new Error('Order is already approved')
			}
			const approvalDetails = {
				approverName: req.user.firstName,
				approverId: req.user._id,
				approvedAt: Date.now(),
				orderId: req.params.id,
			}
			order.approvalDetails.push(approvalDetails)

			order.isApproved = false
			order.approvedAt = Date.now()
			order.isFinanceApproved = false
			order.financeApprovedAt = Date.now()
			order.isFinalApproved = false
			order.finalApprovedAt = Date.now()
		}		
		
		const updatedOrder = await order.save()
		res.json(updatedOrder)

	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})


export const getOrderByVendor = asyncHandler(async(req,res) => {
		console.log(req.params)
		if(req.params.id == 'all'){
			const orders = await Order.find({isFinalApproved: true}).sort({createdAt: -1})
			res.json(orders) 
		} else {
			res.send({message: 'not all'})
		}
		
})