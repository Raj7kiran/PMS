import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'


export const addOrderItems = asyncHandler(async(req, res) => {
	const { orderItems, orderTotalPrice } = req.body

	if(orderItems && orderItems.length === 0){
		res.status(400)
		throw new Error('No order Items')
		return
	} else {
		const order = new Order({
			orderItems, user: req.user._id, requestedBy: req.user.firstName, createdAt: Date.now(), orderTotalPrice
		})

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}
})


export const getOrderById = asyncHandler(async(req,res) => {
	const order = await Order.findById(req.params.id).populate('user', 'firstName email phone').populate('orderItems.product','currentStock lowStockValue reOrderValue')

	if(order){
		res.json(order)
	} else{
		res.status(404)
		throw new Error("Order not Found") 
	}
})

export const getMyOrders = asyncHandler(async(req,res) => {
	const orders = await Order.find({ user: req.user._id }).populate('user', 'firstName email phone')
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