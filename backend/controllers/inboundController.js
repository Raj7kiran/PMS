import asyncHandler from 'express-async-handler'
import InboundDB from '../models/inboundModel.js'


export const createInbound = asyncHandler(async(req,res) => {
	// const { vendor, order, remarks, receivedDate, expiryDate, receivedQuantity,freeItem, 
	// 	taxPercentage, totalPrice, totalQty, taxOnFree, gst, totallAll } = req.body

	// console.log(req.body)

	const { vendor,order,remarks,expiry,recQty,freeQty,taxPer,inboundTotal,gst } = req.body

	const inboundOrder = await InboundDB.create({vendor, order, remarks, expiryDate: expiry, 
		receivedQuantity: recQty, freeItem: freeQty, taxPercentage: taxPer, inboundTotal, gst, isForwarded: true })

	res.send(inboundOrder)	
})


export const getInbound = asyncHandler(async(req, res) => {
	const inboundOrder = await InboundDB.find({})
	console.log('inboundorder')
	console.log(inboundOrder)
	res.send(inboundOrder)
})